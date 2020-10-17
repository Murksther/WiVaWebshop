package com.example.WiVaServer.product.payload;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class ProductRequest {
    @NotBlank private String name;
    private String description;
    private String usedMaterial;
    @NotBlank @Min(0) private int amountAvailable;
    @NotBlank private double price;

    public String getName() { return name;}
    public void setName() { this.name = name;}
    public String getDescription() { return description;}
    public void setDescription() { this.description = description;}
    public String getUsedMaterial() { return usedMaterial;}
    public void setUsedMaterial() { this.usedMaterial = usedMaterial;}
    public int getAmountAvailable() { return amountAvailable;}
    public void setAmountAvailable() { this.amountAvailable = amountAvailable;}
    public double getPrice() { return price;}
    public void setPrice() { this.price = price;}
}
