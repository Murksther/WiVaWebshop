package com.example.WiVaServer.product.payload;

public class ProductResponse {
    private int id;
    private String name;
    private String description;
    private String usedMaterial;
    private int availableUnits;
    private double price;

    public int getId() { return id;}
    public void setId(int id) { this.id = id;}
    public String getName() { return name;}
    public void setName(String name) { this.name = name;}
    public String getDescription() { return description;}
    public void setDescription(String description) { this.description = description;}
    public String getUsedMaterial() { return usedMaterial;}
    public void setUsedMaterial(String usedMaterial) { this.usedMaterial = usedMaterial;}
    public int getAvailableUnits() { return availableUnits;}
    public void setAvailableUnits(int availableUnits) { this.availableUnits = availableUnits;}
    public double getPrice() { return price;}
    public void setPrice(double price) { this.price = price;}
}
