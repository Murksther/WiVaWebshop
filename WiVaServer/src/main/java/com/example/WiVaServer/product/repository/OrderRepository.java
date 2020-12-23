package com.example.WiVaServer.product.repository;

import com.example.WiVaServer.product.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findById(int orderId);
}
