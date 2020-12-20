package com.example.WiVaServer.product.repository;

import com.example.WiVaServer.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findById(int productId);
    List<Product> findByIdIn(List<Long> productId, Sort sort);

    @Query("SELECT product FROM Product product WHERE product.availableUnits > 0")
    Page<Product> findAvailableProducts(Pageable pageable);

    List<Product> findByIdIn(List<Long> orderedProductsIds);
}
