package com.diego.spring.backend.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.diego.spring.backend.model.Image;

public interface IImageService {

	public Set<String> getAllTypesFromImage();
	
	public Set<String> getTypesImageByCategory(long categoryId);
	
	public ResponseEntity<?> deleteImageById(long id);
	
	public boolean deleteImagesFromCategory(long id);
	
	public List<Image> findAllImages();
	
	public Image findImageById(long id);
	
	public List<Image> findImagesByCategoryId(long id);
	
	public Image findImagesByCategoryAndImageId(long categoryId,  long id);
	
	public Image saveUpdateImage(Image image);
	
	public List<Image> getImageByParamsId(String name, String type, String id);
	
	public ResponseEntity<?> updateCategoryNameNewImage(String categoroyNameNew, String categoroyNameOld);
	
}
