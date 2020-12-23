package com.example.WiVaServer.product.payload;

public class OrderedProductResponse extends ProductResponse{
    private int amountOrdered;

    public int getAmountOrdered() { return amountOrdered; }
    public void setAmountOrdered(int amountOrdered) { this.amountOrdered = amountOrdered; }
}
