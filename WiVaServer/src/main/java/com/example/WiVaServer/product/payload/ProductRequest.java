package com.example.WiVaServer.product.payload;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ProductRequest {
    @NotBlank private String name;
    private String description;
    private String usedMaterial;
    @NotNull @Min(0) private int availableUnits;
    @NotNull private double price;

    public String getName() { return name;}
    public void setName() { this.name = name;}
    public String getDescription() { return description;}
    public void setDescription() { this.description = description;}
    public String getUsedMaterial() { return usedMaterial;}
    public void setUsedMaterial() { this.usedMaterial = usedMaterial;}
    public int getAvailableUnits() { return availableUnits;}
    public void setAvailableUnits() { this.availableUnits = availableUnits;}
    public double getPrice() { return price;}
    public void setPrice() { this.price = price;}
}
