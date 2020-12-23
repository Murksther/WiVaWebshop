package com.example.WiVaServer.product.controller;

import be.woutschoovaerts.mollie.data.payment.PaymentResponse;
import be.woutschoovaerts.mollie.exception.MollieException;
import com.example.WiVaServer.general.payload.ApiResponse;
import com.example.WiVaServer.product.model.Order;
import com.example.WiVaServer.product.payload.OrderRequest;
import com.example.WiVaServer.product.payload.OrderResponse;
import com.example.WiVaServer.product.repository.OrderRepository;
import com.example.WiVaServer.product.service.OrderService;
import com.example.WiVaServer.user.security.CurrentUser;
import com.example.WiVaServer.user.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

import java.net.URI;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ApiResponse placeOrder(@CurrentUser UserPrincipal currentUser,
                                        @Valid @RequestBody OrderRequest orderRequest){
        Order order = orderService.createOrder(currentUser, orderRequest);
        try {
            //TODO Fix code below. Doesn't work now keeps redirecting to localhost 5000 so we now use a dirty fix for testing
            URI redirectURI = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("?orderId={orderId}")
                    .buildAndExpand(order.getId()).toUri();

            if (redirectURI.getAuthority().contains("localhost:5000")){
                redirectURI = URI.create("http://localhost:3000/orders?orderId=" + order.getId());
            }

            PaymentResponse paymentResponse = orderService.createPaymentURI(order, redirectURI);
            order.setPaymentId(paymentResponse.getId());
            orderRepository.save(order);
            return new ApiResponse(true, paymentResponse.getLinks().getCheckout().getHref());
        } catch (MollieException e) {
            return new ApiResponse(false, e.getMessage());
        }
    }
    @GetMapping()
    public OrderResponse getOrderById(@CurrentUser UserPrincipal currentUser,
                                      @RequestParam(value = "orderId") Long orderId) throws MollieException {
        return orderService.getOrderById(orderId, currentUser);

    }
}
