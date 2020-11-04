package com.example.WiVaServer.product.service;

import com.example.WiVaServer.generalapi.exception.ResourceNotFoundException;
import com.example.WiVaServer.product.model.Product;
import com.example.WiVaServer.product.payload.ProductRequest;
import com.example.WiVaServer.product.payload.ProductResponse;
import com.example.WiVaServer.product.repository.ProductRepository;
import com.example.WiVaServer.product.util.ModelMapper;
import com.example.WiVaServer.user.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProductService {
    @Autowired private ProductRepository productRepository;

    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    public Product createProduct(ProductRequest productRequest){
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setUsedMaterial(productRequest.getUsedMaterial());
        product.setAvailableUnits(productRequest.getAvailableUnits());
        product.setPrice(productRequest.getPrice());

        return productRepository.save(product);
    }

    public ProductResponse getProductById(int productId, UserPrincipal currentUser) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product", "id", productId));

        return ModelMapper.mappProductToProductReponse(product);
    }
}
