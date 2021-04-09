package com.diego.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.diego.spring.backend.model.Product;

/**
 * Interface of product repository that connect with database 
 * @author Diego Moran
 * @version: 1.0
 */
public interface IProductRepository extends JpaRepository<Product, Long> {
	/**
	 * Returns list of product by categoryId
	 * @return List
	 * @param id
	 */
	List<Product> findByCategoryId(long id);
	
	/**
	 * Returns a product by categoryId and productId
	 * @return Product
	 * @param categoryId
	 * @param id
	 */
	Product findByCategoryIdAndId(long categoryId, long id);
	
	/**
	 * Returns a product by productId
	 * @return Product
	 * @param id
	 */
	Product findById(long id);
	
	/**
	 * Delete all product with specific categoryId
	 * @return Long
	 * @param id
	 */
	Long deleteByCategoryId(long id);
	
	
	/**
	 * Search products by specific parameters
	 * @return List
	 * @param name
	 * @param numberExtern
	 * @param type
	 * @param categoryId
	 */
	@Query("SELECT m FROM Product m WHERE m.name LIKE %:name% AND m.numberExtern LIKE %:numberExtern% AND m.type LIKE %:type% AND CAST( m.categoryId AS string) LIKE %:categoryId%")
	List<Product> searchByThreeParams(@Param("name") String name, @Param("numberExtern") String numberExtern, @Param("type") String type, @Param("categoryId") String categoryId);
	
	/**
	 * Update categoryName from all products by categoryName
	 * @param categoryNameNew
	 * @param categoryNameOld
	 */
	@Modifying
	@Query("update Product p set p.categoryName = :categoryNameNew WHERE p.categoryName = :categoryNameOld")
    void setCatecoryNameNew(@Param("categoryNameNew") String categoryNameNew, @Param("categoryNameOld") String categoryNameOld);
}
