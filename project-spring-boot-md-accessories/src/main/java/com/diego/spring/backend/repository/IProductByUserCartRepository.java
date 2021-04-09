package com.diego.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.diego.spring.backend.model.ProductByUserCart;

/**
 * Interface of Cart repository that connect with database 
 * @author Diego Moran
 * @version: 1.0
 */
public interface IProductByUserCartRepository extends  JpaRepository<ProductByUserCart, Long> {
	
	/**
	 * Returns a ProductByUserCart list by userName
	 * @return List
	 * @param userName
	 */
	List<ProductByUserCart> findByUserName(String userName);
	
	/**
	 * Returns a ProductByUserCart list
	 * @return List
	 * @param userName
	 * @param productId
	 */
	List<ProductByUserCart> findByUserNameAndProductId(String userName, long productId);
	
	/**
	 * Delete all productCart by specfic params
	 * @return Long
	 * @param userName
	 * @param productId
	 */
	Long deleteByProductIdAndUserName(long productId, String userName);
	
	/**
	 * Returns a ProductByUserCart by productId
	 * @return ProductByUserCart 
	 * @param id
	 */
	ProductByUserCart findByProductId(long id);
	
	/**
	 * Delete all productCart with specific userName
	 * @return Long
	 * @param userName
	 */
	Long deleteByUserName(String userName);
	
	/**
	 * Delete all productCart with specific producId
	 * @return Long
	 * @param productId
	 */
	Long deleteByProductId(long productId);
	
	
	/**
	 * Update userName from all products by userName
	 * @param userNameNew
	 * @param userNameOld
	 */
	@Modifying
	@Query("update ProductByUserCart p set p.userName = :userNameNew WHERE p.userName = :userNameOld")
    void setUserNameNew(@Param("userNameNew") String userNameNew, @Param("userNameOld") String userNameOld);
}
