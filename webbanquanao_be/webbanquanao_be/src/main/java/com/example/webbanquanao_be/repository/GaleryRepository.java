package com.example.webbanquanao_be.repository;


import com.example.webbanquanao_be.entity.Galery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(path = "galery")
public interface GaleryRepository extends JpaRepository<Galery,Integer> {
}
