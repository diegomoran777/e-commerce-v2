package com.diego.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.diego.spring.backend.model.Sale;

/**
 * Interface of Sale repository that connect with database 
 * @author Diego Moran
 * @version: 1.0
 */
public interface ISaleRepository extends JpaRepository<Sale, Long> {
	
	/**
	 * Returns a sale by id
	 * @return Sale
	 * @param id
	 */
	Sale findById(long id);
	
	/**
	 * Returns a list sale by delivered
	 * @return Sale list
	 * @param delivered
	 */
	List<Sale> findByDelivered(boolean delivered);
	
	/**
	 * Search sales by specific parameters
	 * @return List
	 * @param date_approved
	 * @param userName
	 * @param userMail
	 */
	@Query("SELECT s FROM Sale s WHERE s.date_approved LIKE %:date_approved% AND s.userName LIKE %:userName% AND s.userMail LIKE %:userMail%")
	List<Sale> searchByParams(@Param("date_approved") String date_approved, @Param("userName") String userName, @Param("userMail") String userMail);
	
	/**
	 * Update userName from all sales by userName
	 * @param userNameNew
	 * @param userNameOld
	 */
	@Modifying
	@Query("update Sale s set s.userName = :userNameNew WHERE s.userName = :userNameOld")
    void setUserNameNew(@Param("userNameNew") String userNameNew, @Param("userNameOld") String userNameOld);
}
