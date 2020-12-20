package com.example.WiVaServer.product.service;

import com.example.WiVaServer.general.exception.NotAcceptableException;
import com.example.WiVaServer.general.exception.ResourceNotFoundException;
import com.example.WiVaServer.product.model.Order;
import com.example.WiVaServer.product.model.OrderedProduct;
import com.example.WiVaServer.product.model.Product;
import com.example.WiVaServer.product.payload.OrderRequest;
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

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

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

    public Order createOrder(UserPrincipal userPrincipal, OrderRequest orderRequest){
        Order order = new Order();
        order.setOrderStatus(Order.OrderStatus.OPEN);
        order.setTypeOfTransfer(Order.TypeOfTransfer.valueOf(orderRequest.getTypeOfTransfer().toUpperCase()));
        order.setDeliveryCosts(orderRequest.getDeliveryCosts());
        order.setOrderDateTime(Instant.now());

        AddressRequest addressRequest = orderRequest.getAddress();
        if (addressRequest != null){
            Optional<Address> address = addressRepository.findByPostalCodeAndHouseNumberAndSuffix(addressRequest.getPostalCode(),
                    addressRequest.getHouseNumber(), addressRequest.getSuffix());
            address.ifPresent(foundAddress -> {
                order.setAddress(foundAddress);
            });
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

}
