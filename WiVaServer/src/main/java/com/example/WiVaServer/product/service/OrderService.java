package com.example.WiVaServer.product.service;

import be.woutschoovaerts.mollie.Client;
import be.woutschoovaerts.mollie.ClientBuilder;
import be.woutschoovaerts.mollie.data.common.Amount;
import be.woutschoovaerts.mollie.data.payment.PaymentRequest;
import be.woutschoovaerts.mollie.data.payment.PaymentResponse;
import be.woutschoovaerts.mollie.exception.MollieException;
import com.example.WiVaServer.general.exception.ForbiddenException;
import com.example.WiVaServer.general.exception.NotAcceptableException;
import com.example.WiVaServer.general.exception.ResourceNotFoundException;
import com.example.WiVaServer.general.util.ModelMapper;
import com.example.WiVaServer.product.model.Order;
import com.example.WiVaServer.product.model.OrderedProduct;
import com.example.WiVaServer.product.model.Product;
import com.example.WiVaServer.product.payload.OrderRequest;
import com.example.WiVaServer.product.payload.OrderResponse;
import com.example.WiVaServer.product.repository.OrderRepository;
import com.example.WiVaServer.product.repository.ProductRepository;
import com.example.WiVaServer.user.model.Address;
import com.example.WiVaServer.user.model.User;
import com.example.WiVaServer.user.payload.AddressRequest;
import com.example.WiVaServer.user.repository.AddressRepository;
import com.example.WiVaServer.user.repository.UserRepository;
import com.example.WiVaServer.user.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.MalformedURLException;
import java.net.URI;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import static com.example.WiVaServer.general.util.AppConstants.MOLLIE_KEY;

@Service
public class OrderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AddressRepository addressRepository;

    private final Client client = new ClientBuilder()
            .withApiKey(MOLLIE_KEY)
            .build();

    public PaymentResponse createPaymentURI(Order order, URI redirectURI) throws MollieException {
        PaymentRequest paymentRequest = new PaymentRequest();
        String value = BigDecimal.valueOf(order.getOrderPrice() + order.getDeliveryCosts())
                .setScale(2, RoundingMode.HALF_UP)
                .toString();
        Amount amount = new Amount("EUR", value);
        paymentRequest.setAmount(amount);

        String description = "Payment of " + amount.getCurrency() + amount.getValue() + " for order: " + order.getId();
        paymentRequest.setDescription(description);

        try {
            paymentRequest.setRedirectUrl(Optional.ofNullable(redirectURI.toURL().toString()));
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        return client.payments().createPayment(paymentRequest);
    }

    public Order createOrder(UserPrincipal userPrincipal, OrderRequest orderRequest){
        Order order = new Order();
        Order.TypeOfTransfer typeOfTransfer = Order.TypeOfTransfer.valueOf(orderRequest.getTypeOfTransfer().toUpperCase());
        order.setOrderStatus(Order.OrderStatus.OPEN);
        order.setTypeOfTransfer(typeOfTransfer);
        order.setDeliveryCosts(typeOfTransfer);
        order.setMomentOfOrder(Instant.now());

        AddressRequest addressRequest = orderRequest.getAddress();
        if (addressRequest != null){
            Optional<Address> address = addressRepository.findByPostalCodeAndHouseNumberAndSuffix(addressRequest.getPostalCode(),
                    addressRequest.getHouseNumber(), addressRequest.getSuffix());
            address.ifPresent(order::setAddress);
        }

        User user = userRepository.findByUsername(userPrincipal.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", userPrincipal.getUsername()));
        order.setUser(user);

        AtomicReference<Double> totalOrderPrice = new AtomicReference<>((double) 0);

        List<Product> adjustedProducts = new ArrayList<>();

        orderRequest.getOrderedProductSummary().forEach(orderedProductSummary -> {
            Product product = productRepository.findById(orderedProductSummary.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "productID", orderedProductSummary.getProductId()));
            if (product.getAvailableUnits() >= orderedProductSummary.getAmountOrdered()) {
                order.addOrderedProduct(new OrderedProduct(orderedProductSummary.getAmountOrdered(), product));
                product.setAvailableUnits(product.getAvailableUnits()-orderedProductSummary.getAmountOrdered());
                adjustedProducts.add(product);
                totalOrderPrice.updateAndGet(v -> v + product.getPrice() * orderedProductSummary.getAmountOrdered());
            }
            else{
                orderRepository.delete(order);
                throw new NotAcceptableException("Product", "productID", product.getAvailableUnits());
            }
        });

        order.setOrderPrice(totalOrderPrice.get());
        return orderRepository.save(order);
    }

    public OrderResponse getOrderById (Long orderId, UserPrincipal currentUser) throws MollieException {
        Order order = orderRepository.findById(orderId).orElseThrow(
                () -> new ResourceNotFoundException("Order", "id", orderId));

        if(currentUser.getAuthorities().stream().filter(role -> "ROLE_ADMIN".equals(role.getAuthority())).findAny().orElse(null) == null
                && !order.getUser().getId().equals(currentUser.getId())){
            throw new ForbiddenException("User has no access to requested order");
        }
        if (order.updatePaymentStatus()) {
            orderRepository.save(order);
        }
        return ModelMapper.mapOrderToOrderResponse(order);

    }

}
