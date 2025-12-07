package com.marcos.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.marcos.backend.entities.Van;

public interface VanRepository extends JpaRepository<Van, Long> {
    @Query("SELECT b FROM Van b WHERE " +
            "LOWER(b.brand) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(b.model) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Van> searchByBrandOrModel(@Param("search") String search, Pageable pageable);
}
