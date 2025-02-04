package com.example.webbanquanao_be.repository;


import com.example.webbanquanao_be.entity.Delivery_Method;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "deliverymethod")
public interface DeliveryMethodRepository extends JpaRepository<Delivery_Method,Integer> {
}
