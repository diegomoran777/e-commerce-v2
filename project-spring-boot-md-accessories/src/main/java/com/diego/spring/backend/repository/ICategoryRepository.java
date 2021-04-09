package com.diego.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.diego.spring.backend.model.Category;

/**
 * Interface of Category repository that connect with database 
 * @author Diego Moran
 * @version: 1.0
 */
public interface ICategoryRepository extends JpaRepository<Category, Long> {
	/**
	 * Returns a category by categoryId
	 * @return Category
	 * @param id
	 */
	Category findById(long id);
	
	/**
	 * Returns list of categories by type
	 * @return List
	 * @param type
	 */
	List<Category> findByType(String type);
	
	/**
	 * Returns a supplier list by specific parameters
	 * @return List suppliers
	 * @param name
	 * @param numberExtern
	 */
	@Query("SELECT m FROM Category m WHERE m.name LIKE %:name% AND  m.type LIKE %:type%")
	List<Category> searchByParam(@Param("name") String name, @Param("type") String type);
}
