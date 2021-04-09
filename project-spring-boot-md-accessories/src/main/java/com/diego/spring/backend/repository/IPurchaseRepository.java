package com.diego.spring.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.diego.spring.backend.model.Purchase;

/**
 * Interface of purchase repository that connect with database 
 * @author Diego Moran
 * @version: 1.0
 */
public interface IPurchaseRepository extends JpaRepository<Purchase, Long> {
	
}
