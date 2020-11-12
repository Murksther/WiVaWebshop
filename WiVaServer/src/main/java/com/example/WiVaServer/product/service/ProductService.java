package com.example.WiVaServer.product.service;

import com.example.WiVaServer.generalapi.exception.BadRequestException;
import com.example.WiVaServer.generalapi.exception.ResourceNotFoundException;
import com.example.WiVaServer.product.model.Product;
import com.example.WiVaServer.product.payload.PagedResponse;
import com.example.WiVaServer.product.payload.ProductRequest;
import com.example.WiVaServer.product.payload.ProductResponse;
import com.example.WiVaServer.product.repository.ProductRepository;
import com.example.WiVaServer.product.util.AppConstants;
import com.example.WiVaServer.product.util.ModelMapper;
import com.example.WiVaServer.user.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

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

        return ModelMapper.mapProductToProductReponse(product);
    }

    public PagedResponse<ProductResponse> getAllProducts(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Products
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Product> products = productRepository.findAll(pageable);

        if(products.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), products.getNumber(),
                    products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
        }

        // Map Products to ProductResponses
        List<Integer> productIds = products.map(Product::getId).getContent();

        List<ProductResponse> productResponses = products.map(product -> {
            return ModelMapper.mapProductToProductReponse(product);
        }).getContent();

        return new PagedResponse<>(productResponses, products.getNumber(),
                products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
    }
    public PagedResponse<ProductResponse> getAvailableProducts(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Products
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Product> products = productRepository.findAvailableProducts(pageable);

        if(products.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), products.getNumber(),
                    products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
        }

        // Map Products to ProductResponses
        List<Integer> productIds = products.map(Product::getId).getContent();

        List<ProductResponse> productResponses = products.map(product -> {
            return ModelMapper.mapProductToProductReponse(product);
        }).getContent();

        return new PagedResponse<>(productResponses, products.getNumber(),
                products.getSize(), products.getTotalElements(), products.getTotalPages(), products.isLast());
    }

    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
}
