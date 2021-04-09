package com.diego.spring.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.diego.spring.backend.model.Image;

/**
 * Interface of product repository that connect with database 
 * @author Diego Moran
 * @version: 1.0
 */
public interface IImageRepository extends JpaRepository<Image, Long> {

	/**
	 * Returns list of images by categoryId
	 * @return List
	 * @param id
	 */
	List<Image> findByCategoryId(long id);
	
	/**
	 * Returns a image by categoryId and imageId
	 * @return Image
	 * @param categoryId
	 * @param id
	 */
	Image findByCategoryIdAndId(long categoryId, long id);
	
	/**
	 * Returns a image by imageId
	 * @return Image
	 * @param id
	 */
	Image findById(long id);
	
	/**
	 * Delete all image with specific categoryId
	 * @return Long
	 * @param id
	 */
	Long deleteByCategoryId(long id);
	
	/**
	 * Search images by specific parameters
	 * @return List
	 * @param name
	 * @param type
	 * @param categoryId
	 */
	@Query("SELECT m FROM Image m WHERE m.name LIKE %:name%  AND m.type LIKE %:type% AND CAST( m.categoryId AS string) LIKE %:categoryId%")
	List<Image> searchByThreeParams(@Param("name") String name, @Param("type") String type, @Param("categoryId") String categoryId);
	
	/**
	 * Update categoryName from all images by categoryName
	 * @param categoryNameNew
	 * @param categoryNameOld
	 */
	@Modifying
	@Query("update Image i set i.categoryName = :categoryNameNew WHERE i.categoryName = :categoryNameOld")
    void setCatecoryNameNew(@Param("categoryNameNew") String categoryNameNew, @Param("categoryNameOld") String categoryNameOld);
}
