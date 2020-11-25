package com.example.WiVaServer.product.util;

import com.example.WiVaServer.product.model.Product;
import com.example.WiVaServer.product.payload.ProductResponse;

import java.util.ArrayList;
import java.util.List;


public class ModelMapper {

    public static ProductResponse mapProductToProductReponse(Product product) {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(product.getId());
        productResponse.setName(product.getName());
        productResponse.setDescription(product.getDescription());
        productResponse.setUsedMaterial(product.getUsedMaterial());
        productResponse.setPrice(product.getPrice());
        productResponse.setAvailableUnits(product.getAvailableUnits());
        productResponse.setImages(mergeImages(product));

        return productResponse;
    }

    private static List<String> mergeImages(Product product){
        List<String> imageList = new ArrayList<>();

        for(int i = 0; i < product.getAmountOfImages();i++)
            imageList.add(product.getImage((i+1))
        );

        return imageList;
    }
}
