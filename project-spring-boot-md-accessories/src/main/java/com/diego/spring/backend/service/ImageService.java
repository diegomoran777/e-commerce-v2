package com.diego.spring.backend.service;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.diego.spring.backend.dto.Types;
import com.diego.spring.backend.model.Image;
import com.diego.spring.backend.repository.IImageRepository;

/**
 * Class that manages the functions of the repositories 
 * @author Diego Moran
 * @version: 1.0
 */
@Service
@Transactional
public class ImageService implements IImageService {
	
	@Autowired
	IImageRepository repo;
	
	private Types types = new Types();

	/**
	 * Returns all types images
	 * @return Set of types
	 */
	@Override
	public Set<String> getAllTypesFromImage() {
		this.types.getTypes().clear();
		repo.findAll().forEach(image -> this.types.getTypes().add(image.getType())); 
		return this.types.getTypes();
	}

	/**
	 * Returns specific types images
	 * @return Set of types
	 * @param categoryId
	 */
	@Override
	public Set<String> getTypesImageByCategory(long categoryId) {
		this.types.getTypes().clear();
		repo.findByCategoryId(categoryId).forEach(image -> this.types.getTypes().add(image.getType()));
		return this.types.getTypes();
	}

	/**
	 * Returns a boolean value if can delete a image by id
	 * @return ResponseEntity
	 * @param id
	 */
	@Override
	public ResponseEntity<?> deleteImageById(long id) {
		try {
			repo.deleteById(id);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Returns a boolean value if can delete all image by category id
	 * @return ResponseEntity
	 * @param id
	 */
	@Override
	public boolean deleteImagesFromCategory(long id) {
		try {
			repo.deleteByCategoryId(id);
			return true;
		} catch (Exception e) {
			System.out.println("Fallo borrar imagenes de una categoria");
			return false;
		}
	}
	
	/**
	 * Returns all images
	 * @return List of images
	 */
	@Override
	public List<Image> findAllImages() {
		return repo.findAll();
	}

	/**
	 * Returns a image by id
	 * @return Image
	 * @param id
	 */
	@Override
	public Image findImageById(long id) {
		return repo.findById(id);
	}

	/**
	 * Returns a list of images by categoryId
	 * @return Image list
	 * @param id
	 */
	@Override
	public List<Image> findImagesByCategoryId(long id) {
		return repo.findByCategoryId(id);
	}

	/**
	 * Returns a image by categoryId and imageId
	 * @return Image
	 * @param categoryId
	 * @param id
	 */
	@Override
	public Image findImagesByCategoryAndImageId(long categoryId, long id) {
		return repo.findByCategoryIdAndId(categoryId, id);
	}

	/**
	 * Returns a image which will be deleted
	 * @return Image
	 * @param image
	 */
	@Override
	public Image saveUpdateImage(Image image) {
		return repo.save(image);
	}

	/**
	 * Returns a image list by parameters
	 * @return Image list
	 * @param name
	 * @param type
	 * @param categoryId
	 */
	@Override
	public List<Image> getImageByParamsId(String name, String type, String categoryId) {
		return repo.searchByThreeParams(name, type, categoryId);
	}
	
	/**
	 * Update categoryName from all images by categoryName
	 * @param categoryNameNew
	 * @param categoryNameOld
	 */
	@Override
	public ResponseEntity<?> updateCategoryNameNewImage(String categoryNameNew, String categoryNameOld) {
		try {
			repo.setCatecoryNameNew(categoryNameNew, categoryNameOld);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

}
