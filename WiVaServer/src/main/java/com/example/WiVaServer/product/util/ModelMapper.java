package com.example.WiVaServer.product.util;

import com.example.WiVaServer.product.model.Product;
import com.example.WiVaServer.product.payload.ProductResponse;


public class ModelMapper {

    public static ProductResponse mapProductToProductReponse(Product product) {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(product.getId());
        productResponse.setName(product.getName());
        productResponse.setDescription(product.getDescription());
        productResponse.setUsedMaterial(product.getUsedMaterial());
        productResponse.setPrice(product.getPrice());
        productResponse.setAvailableUnits(product.getAvailableUnits());

        return productResponse;
    }
}
