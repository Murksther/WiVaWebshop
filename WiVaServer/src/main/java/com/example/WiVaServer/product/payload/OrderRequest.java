package com.example.WiVaServer.product.payload;

import com.example.WiVaServer.user.payload.AddressRequest;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.*;

public class OrderRequest {

    @NotBlank
    private String typeOfTransfer;

    @Valid
    private AddressRequest address;

    @NotNull
    @Size(min = 1)
    @Valid
    private List<OrderedProductSummary> orderedProducts;

    public String getTypeOfTransfer() { return typeOfTransfer; }
    public void setTypeOfTransfer(String typeOfTransfer) { this.typeOfTransfer = typeOfTransfer; }

    public AddressRequest getAddress() { return address; }
    public void setAddress(AddressRequest address) { this.address = address; }

    public List<OrderedProductSummary> getOrderedProductSummary() { return orderedProducts; }
    public void setOrderedProductSummary(List<OrderedProductSummary> orderedProductSummary) {
        this.orderedProducts = orderedProductSummary;
    }
    public List<Integer> getOrderedProductsIds() {
        List<Integer> ids = new ArrayList<>();
        orderedProducts.forEach(orderedProductSummary -> ids.add(orderedProductSummary.getProductId()));
        return ids;
    }
}
