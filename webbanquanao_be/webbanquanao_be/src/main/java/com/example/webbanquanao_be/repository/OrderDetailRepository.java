package com.example.webbanquanao_be.repository;

import com.example.webbanquanao_be.entity.Order_Details;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "OrderDetail")
public interface OrderDetailRepository extends JpaRepository<Order_Details,Long> {
}
