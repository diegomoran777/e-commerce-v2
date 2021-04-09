package com.diego.spring.backend.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

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

import com.diego.spring.backend.model.Category;
import com.diego.spring.backend.service.GeneralService;
import com.diego.spring.backend.service.ImageService;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = {"*"})
public class ControllerRestCategory {
	
	
	@Autowired
	GeneralService service;
	
	@Autowired
	ImageService imageService; 
	
	/**
	 * Get all category
	 * @return {@link List}
	 */
	@GetMapping("/categories")
	public List<Category> getCategories(){
		return service.findAllCategories();
	}
	
	/**
	 * Get all category
	 * @return {@link List}
	 */
	@GetMapping("/categories-by-type/{type}")
	public List<Category> getCategoriesByType(@PathVariable String type){
		return service.findByType(type);
	}
	
	/**
	 * Get category by id
	 * @param supplier {@link RequestBody}}
	 * @return {@link List}
	 */
	@PostMapping("/getcategoryid")
	public List<Category> getCategoryById(@RequestBody Category category){
		return Arrays.asList(service.findCategoryById(category.getId()));
	}
	
	/**
	 * Get category by id
	 * @param category {@link RequestBody}
	 * @return {@link category}
	 */
	@PostMapping("/get-category")
	public Category getCategory(@RequestBody Category category){
		return service.findCategoryById(category.getId());
	}
	
	/**
	 * Delete category by id
	 * @param id
	 * @return {@link ResponseEntity}
	 */
	@DeleteMapping("/category-products/{id}")
	public ResponseEntity<?> deleteCategoryProductsById(@PathVariable long id){
		return service.deleteProductsFromCategory(id) ? service.deleteCategoryById(id) : ResponseEntity.ok().body(false); 
	}
	
	/**
	 * Delete category by id
	 * @param id
	 * @return {@link ResponseEntity}
	 */
	@DeleteMapping("/category-images/{id}")
	public ResponseEntity<?> deleteCategoryImagesById(@PathVariable long id){
		return imageService.deleteImagesFromCategory(id) ? service.deleteCategoryById(id) : ResponseEntity.ok().body(false); 
	}
	
	/**
	 * Save or update category
	 * @param category
	 * @return {@link ResponseEntity}
	 */
	@PostMapping("/save-update")
	public ResponseEntity<Category> saveUpdateCategory(Category category){
		return ResponseEntity.ok().body(service.saveUpdateCategory(category));
	}
	
	/**
	 * Get category by category parameters
	 * @param {@link {@link RequestBody}
	 * @return {@link List}
	 */
	@PostMapping("/search-by-params")
	public List<Category> getCategoriesByParams(@RequestBody Map<String, String> response) {
		return service.getCategoriesByParams(response.get("searchByName"), response.get("searchByType"));
	}
	
}
