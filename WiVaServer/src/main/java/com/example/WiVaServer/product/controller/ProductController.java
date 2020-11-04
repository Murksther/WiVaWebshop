package com.example.WiVaServer.product.controller;

import com.example.WiVaServer.generalapi.payload.ApiResponse;
import com.example.WiVaServer.product.model.Product;
import com.example.WiVaServer.product.payload.ProductRequest;
import com.example.WiVaServer.product.payload.ProductResponse;
import com.example.WiVaServer.product.service.ProductService;
import com.example.WiVaServer.user.security.CurrentUser;
import com.example.WiVaServer.user.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired private ProductService productService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductRequest productRequest){
        Product product = productService.createProduct(productRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{productId)")
                .buildAndExpand(product.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Product succesfully added"));
    }

    @GetMapping("/{productId}")
    public ProductResponse getProductById(@CurrentUser UserPrincipal currentUser,
                                          @PathVariable int productId) {
        return productService.getProductById(productId, currentUser);
    }
}