package com.example.WiVaServer.product.model;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "orderedProduct" , uniqueConstraints = {
    @UniqueConstraint(columnNames = {
            "product_id",
            "order_id"
    })
})

public class OrderedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(1)
    private int amountOrdered;

    @NotNull
    @Min(0)
    private double unitPrice;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    public OrderedProduct(){}

    public OrderedProduct(int amountOrdered, Product product){
        this.amountOrdered = amountOrdered;
        this.product = product;
        this.unitPrice = product.getPrice();
    }

    public Long getId() { return id;}
    public void setId(Long id) {this.id = id; }

    public int getAmountOrdered() { return amountOrdered; }
    public void setAmountOrdered(int amountOrdered) { this.amountOrdered = amountOrdered; }

    public double getUnitPrice() { return unitPrice; }
    public void setUnitPrice(double unitPrice) { this.unitPrice = unitPrice; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }
}
