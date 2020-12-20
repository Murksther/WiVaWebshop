package com.example.WiVaServer.product.model;

import com.example.WiVaServer.user.model.Address;
import com.example.WiVaServer.user.model.User;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders" )
public class Order {
    public enum OrderStatus{OPEN, PAYED, BEINGBUILD, READYFORPICKUP, READYFORDELIVERY, DELIVERED, CANCELLED}
    public enum TypeOfTransfer{DELIVERY, PICKUP}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(0)
    private double orderPrice;

    @NotNull
    @Min(0)
    private double deliveryCosts;

    @NotNull
    private OrderStatus orderStatus;

    @NotNull
    private TypeOfTransfer typeOfTransfer;

    @NotNull
    private Instant momentOfOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true )
    @Size(min = 1) //TODO check if we can add a max
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 10)
    private List<OrderedProduct> orderedProducts = new ArrayList<>();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getOrderPrice() { return orderPrice; }
    public void setOrderPrice(double orderPrice) { this.orderPrice = orderPrice; }

    public double getDeliveryCosts() { return deliveryCosts; }
    public void setDeliveryCosts(double deliveryCosts) { this.deliveryCosts = deliveryCosts; }

    public TypeOfTransfer getTypeOfTransfer() { return typeOfTransfer; }
    public void setTypeOfTransfer(TypeOfTransfer typeOfTransfer) { this.typeOfTransfer = typeOfTransfer; }

    public OrderStatus getOrderStatus() { return orderStatus; }
    public void setOrderStatus(OrderStatus orderStatus) { this.orderStatus = orderStatus; }

    public Instant getOrderDateTime() { return momentOfOrder; }
    public void setOrderDateTime(Instant orderDateTime) { this.momentOfOrder = orderDateTime; }

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public List<OrderedProduct> getOrderedProducts() { return orderedProducts; }
    public void setOrderedProducts(List<OrderedProduct> orderedProducts) { this.orderedProducts = orderedProducts; }

    public void addOrderedProduct(OrderedProduct orderedProduct){
        orderedProducts.add(orderedProduct);
        orderedProduct.setOrder(this);
    }
}

