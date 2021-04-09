package com.diego.spring.backend.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.diego.spring.backend.dto.BodyRequest;
import com.diego.spring.backend.model.Image;
import com.diego.spring.backend.service.ImageService;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = {"*"})
public class ControllerRestImage {
	
	@Autowired
	ImageService service;
	
	/**
	 * Get all images
	 * @return {@link List}
	 */
	@GetMapping("/images")
	public List<Image> getImages(){
		return service.findAllImages();
	}
	
	/**
	 * Get image by id
	 * @param image
	 * @return {@link List}
	 */
	@PostMapping("/getimageid")
	public List<Image> getImageById(@RequestBody Image image){
		return Arrays.asList(service.findImageById(image.getId()));
	}
	
	/**
	 * Get image by id
	 * @param image
	 * @return {@link Image}
	 */
	@PostMapping("/get-image")
	public Image getImage(@RequestBody Image image){
		return service.findImageById(image.getId());
	}
	
	/**
	 * Delete image by id
	 * @param id
	 * @return {@link ResponseEntity}
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteImageById(@PathVariable long id){
		return service.deleteImageById(id);  
	}
	
	/**
	 * Get images by categoryId
	 * @param image
	 * @return {@link List}
	 */
	@PostMapping("/bycategoryid")
	public List<Image> getImagesByCategoryID(@RequestBody Image image){
		return service.findImagesByCategoryId(image.getId());
	}
	
	/**
	 * Get image by categoryId and imageId
	 * @param image
	 * @return {@link List}
	 */
	@PostMapping("/bycategory-imageid")
	public List<Image> getImagesByCategoryAndImageId(@RequestBody Image image){
		return Arrays.asList(service.findImagesByCategoryAndImageId(image.getCategoryId(), image.getId()));
	}
	
	/**
	 * Save and update image
	 * @param image
	 * @return {@link ResponseEntity<image>}
	 */
	@PostMapping("/save-update")
	public ResponseEntity<Image> saveUpdateImage(Image image){
		return ResponseEntity.ok().body(service.saveUpdateImage(image));
	}
	
	/**
	 * Get all types of image
	 * @return {@link Set}
	 */
	@GetMapping("/types")
	public Set<String> getAllTypes(){
		return service.getAllTypesFromImage();
	}
	
	/**
	 * Get all types of imageId
	 * @param id
	 * @return {@link Set}
	 */
	@GetMapping("/types/{id}")
	public Set<String> getTypesById(@PathVariable long id){
		return service.getTypesImageByCategory(id);
	}
	
	/**
	 * Get image by param and CategoryId
	 * @param {@link RequestBody}
	 * @return {@link List}
	 */
	@PostMapping("/search-by-paramsid")
	public List<Image> getImagesByParamsId(@RequestBody BodyRequest body) {
		return service.getImageByParamsId(body.getSearchByName(), body.getSearchByType(), body.getCategoryId());
	}
	
	@PostMapping("/update-new-categoryname")
	public ResponseEntity<?> updateNewCategoryNameOnLists(@RequestBody Map<String, String> res) {
		return service.updateCategoryNameNewImage(res.get("categoryNameNew"), res.get("categoryNameOld"));
	}
}
