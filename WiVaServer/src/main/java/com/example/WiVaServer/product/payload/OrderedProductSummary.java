package com.example.WiVaServer.product.payload;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class OrderedProductSummary {

    @NotNull
    private int productId;

    @NotNull
    @Min(1)
    private int amountOrdered;

    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public int getAmountOrdered() { return amountOrdered; }
    public void setAmountOrdered(int amountOrdered) { this.amountOrdered = amountOrdered; }
}
