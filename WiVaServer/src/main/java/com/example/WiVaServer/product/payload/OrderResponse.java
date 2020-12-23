package com.example.WiVaServer.product.payload;

import com.example.WiVaServer.product.model.Order;
import com.example.WiVaServer.product.model.OrderedProduct;
import com.example.WiVaServer.user.model.Address;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class OrderResponse {

    private Long id;
    private double orderPrice;
    private double deliveryCosts;
    private Order.OrderStatus orderStatus;
    private Order.TypeOfTransfer typeOfTransfer;
    private Instant momentOfOrder;
    private String customerName;
    private Address address;
    private List<OrderedProductResponse> orderedProducts = new ArrayList<>();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getOrderPrice() { return orderPrice; }
    public void setOrderPrice(double orderPrice) { this.orderPrice = orderPrice; }

    public double getDeliveryCosts() { return deliveryCosts; }
    public void setDeliveryCosts(double deliveryCosts) {this.deliveryCosts = deliveryCosts;}

    public Order.OrderStatus getOrderStatus() { return orderStatus; }
    public void setOrderStatus(Order.OrderStatus orderStatus) { this.orderStatus = orderStatus; }

    public Order.TypeOfTransfer getTypeOfTransfer() { return typeOfTransfer; }
    public void setTypeOfTransfer(Order.TypeOfTransfer typeOfTransfer) { this.typeOfTransfer = typeOfTransfer; }

    public Instant getMomentOfOrder() { return momentOfOrder; }
    public void setMomentOfOrder(Instant momentOfOrder) { this.momentOfOrder = momentOfOrder; }

    public String getCustomerName() {return customerName; }
    public void setCustomerName(String customerName) {this.customerName = customerName;}

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public List<OrderedProductResponse> getOrderedProducts() { return orderedProducts; }
    public void setOrderedProducts(List<OrderedProductResponse> orderedProducts) { this.orderedProducts = orderedProducts; }
}
