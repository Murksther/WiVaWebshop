package com.example.WiVaServer.product.repository;

import com.example.WiVaServer.product.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
