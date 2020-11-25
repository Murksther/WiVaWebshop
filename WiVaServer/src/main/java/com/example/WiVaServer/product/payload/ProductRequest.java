package com.example.WiVaServer.product.payload;

import com.example.WiVaServer.product.controller.ImageController;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.IOException;
import java.util.List;

public class ProductRequest {
    @NotBlank private String name;
    private String description;
    private String usedMaterial;
    @NotNull @Min(0) private int availableUnits;
    @NotNull private double price;
    @Size(min = 1, max = 4) private List<String> images;

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
    public List<String> getImages() {return images;}
    public void setImages(List<String> images){ this.images = images;}

    public int getLengthImageList(){return images.size();}

    public String getImageURL(int imageNumber) throws IOException {
        String imageBase64 = images.get(imageNumber);
        String imageURL = ImageController.postImageToServer(imageBase64);
        return imageURL;
    }
}
