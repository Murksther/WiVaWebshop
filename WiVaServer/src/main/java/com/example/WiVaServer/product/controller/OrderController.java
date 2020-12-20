package com.example.WiVaServer.product.controller;

import com.example.WiVaServer.general.payload.ApiResponse;
import com.example.WiVaServer.product.model.Order;
import com.example.WiVaServer.product.payload.OrderRequest;
import com.example.WiVaServer.product.service.OrderService;
import com.example.WiVaServer.user.security.CurrentUser;
import com.example.WiVaServer.user.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ApiResponse placeOrder(@CurrentUser UserPrincipal currentUser,
                                        @Valid @RequestBody OrderRequest orderRequest){
        Order order = orderService.createOrder(currentUser, orderRequest);

        return new ApiResponse(true, "Order Created Successfully");
    }
}
