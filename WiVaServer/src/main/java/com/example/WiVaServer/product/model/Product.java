package com.example.WiVaServer.product.model;

import com.example.WiVaServer.user.model.audit.UserDateAudit;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "products")
public class Product extends UserDateAudit {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) int id;
    @NotBlank @Size(max = 50) private String name;
    private String description;
    private String usedMaterial;
    @NotNull  private int availableUnits;
    @NotNull private double price;
    @NotNull @Min(1) private int amountOfImages;
    @NotNull private String image1;
    private String image2;
    private String image3;
    private String image4;

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
    public void setAmountOfImages(int amountOfImages){this.amountOfImages = amountOfImages;}
    public int getAmountOfImages(){return amountOfImages;}

    public String getImage(int imageNumber){
        switch (imageNumber){
            case 1: return image1;
            case 2: return image2;
            case 3: return image3;
            case 4: return image4;
        }
        return null;
    }
    public void setImage(String imageURL, int imageNumber) {
        switch (imageNumber) {
            case 1:
                this.image1 = imageURL;
                break;
            case 2:
                this.image2 = imageURL;
                break;
            case 3:
                this.image3 = imageURL;
                break;
            case 4:
                this.image4 = imageURL;
                break;
        }
    }
}
