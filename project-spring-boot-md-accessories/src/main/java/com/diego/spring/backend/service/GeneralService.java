package com.diego.spring.backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.diego.spring.backend.model.Category;
import com.diego.spring.backend.model.Product;
import com.diego.spring.backend.model.ProductByUserCart;
import com.diego.spring.backend.model.Purchase;
import com.diego.spring.backend.model.Sale;
import com.diego.spring.backend.model.UserProgram;
import com.diego.spring.backend.repository.IProductRepository;
import com.diego.spring.backend.repository.IPurchaseRepository;
import com.diego.spring.backend.repository.ISaleRepository;
import com.diego.spring.backend.repository.IProductByUserCartRepository;
import com.diego.spring.backend.repository.ICategoryRepository;
import com.diego.spring.backend.repository.IUserProgramRepository;

/**
 * Class that manages the functions of the repositories 
 * @author Diego Moran
 * @version: 1.0
 */
@Service
@Transactional
public class GeneralService implements IService {
	
	@Autowired
	ICategoryRepository repoCategory;
	
	@Autowired
	IProductRepository repoProduct;
	
	@Autowired
	IUserProgramRepository repoUser;
	
	@Autowired
	IProductByUserCartRepository repoProductCart;
	
	@Autowired
	ISaleRepository repoSale;
	
	@Autowired
	IPurchaseRepository repoPurchase;
	

	/**
	 * Returns all types products
	 * @return Set of types
	 */
	@Override 
	public Set<String> getAllTypes() {
		//repoProduct.findAll().forEach(product -> this.types.getTypes().add(product.getType())); 
		return repoProduct.findAll().stream()
				.map(p -> p.getType()).collect(Collectors.toSet());
	}

	/**
	 * Returns specific types products
	 * @return Set of types
	 * @param categoryId
	 */
	@Override 
	public Set<String> getTypesByCategory(long categoryId) {
		return repoProduct.findByCategoryId(categoryId).stream()
			.map(product -> product.getType()).collect(Collectors.toSet());
	}

	/**
	 * Returns a boolean value if can delete a category by id
	 * @return ResponseEntity
	 * @param id
	 */
	@Override 
	public ResponseEntity<?> deleteCategoryById(long id) {
		try {
			repoCategory.deleteById(id);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Returns a boolean value if can delete a product by id
	 * @return ResponseEntity
	 * @param id
	 */
	@Override 
	public ResponseEntity<?> deleteProductById(long id) {
		try {
			repoProductCart.deleteByProductId(id);
			repoProduct.deleteById(id);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}
	
	/**
	 * Returns a boolean value if can delete all product by category id
	 * @return ResponseEntity
	 * @param id
	 */
	@Override 
	public boolean deleteProductsFromCategory(long id) {
		try {
			repoProduct.findByCategoryId(id).forEach(p -> repoProductCart.deleteByProductId(p.getId()));
			repoProduct.deleteByCategoryId(id);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * Returns a boolean value if can delete a user by id
	 * @return ResponseEntity
	 * @param id
	 */
	@Override 
	public ResponseEntity<?> deleteUserById(long id) {
		try {
			repoUser.deleteById(id);
			repoProductCart.deleteByUserName(repoUser.findById(id).getUserName());
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Returns all Categories
	 * @return List of Categories
	 */
	@Override 
	public List<Category> findAllCategories() {
		return repoCategory.findAll();
	}

	/**
	 * Returns all products
	 * @return List of products
	 */
	@Override 
	public List<Product> findAllProducts() {
		return repoProduct.findAll();
	}

	/**
	 * Returns all users
	 * @return List of users
	 */
	@Override 
	public List<UserProgram> findAllUsers() {
		return repoUser.findByOrderByUserName();
	}

	/**
	 * Returns a Category by id
	 * @return Category
	 * @param id
	 */
	@Override 
	public Category findCategoryById(long id) {
		return repoCategory.findById(id);
	}

	/**
	 * Returns a product by id
	 * @return Product
	 * @param id
	 */
	@Override 
	public Product findProductById(long id) {
		return repoProduct.findById(id);
	}

	/**
	 * Returns a userProgram by userName
	 * @return UserProgram
	 * @param userName
	 */
	@Override 
	public UserProgram findUserByUserName(String userName) {
		return repoUser.findByUserName(userName);
	}

	/**
	 * Returns a list of products by categoryId
	 * @return Product list
	 * @param id
	 */
	@Override 
	public List<Product> findProductsByCategoryId(long id) {
		return repoProduct.findByCategoryId(id);
	}
	
	/**
	 * Returns a product by categoryId and productId
	 * @return Product
	 * @param categoryId
	 * @param id
	 */
	@Override 
	public Product findProductsByCategoryAndProductId(long categoryId,  long id) {
		return repoProduct.findByCategoryIdAndId(categoryId, id);
	}

	/**
	 * Returns a category which will be deleted
	 * @return Category
	 * @param category
	 */
	@Override 
	public Category saveUpdateCategory(Category category) {
		return repoCategory.save(category);
	}

	/**
	 * Returns a product which will be deleted
	 * @return Product
	 * @param product
	 */
	@Override 
	public Product saveUpdateProduct(Product product) {
		return repoProduct.save(product);
	}

	/**
	 * Returns a userProgram which will be deleted
	 * @return UserProgram
	 * @param user
	 */
	@Override
	public UserProgram saveUpdateUser(UserProgram user) {
		return repoUser.save(user);
	}

	/**
	 * Returns a category list by parameters
	 * @return Category list
	 * @param name
	 */
	@Override 
	public List<Category> getCategoriesByParams(String name, String type) {
		return repoCategory.searchByParam(name, type);
	}

	/**
	 * Returns a product list by parameters
	 * @return Product list
	 * @param name
	 * @param numberExtern
	 * @param type
	 * @param categoryId
	 */
	@Override 
	public List<Product> getProductByParamsId(String name, String numberExtern, String type, String categoryId) {
		return repoProduct.searchByThreeParams(name, numberExtern, type, categoryId);
	}
	
	/**
	 * Returns a userProgram list by parameters
	 * @return userProgram list
	 * @param userName
	 * @param role
	 */
	@Override
	public List<UserProgram> getUsersByParams(String userName, String role) {
		return repoUser.searchByTwoParams(userName, role);
	}

	/**
	 * Verify if exists a user by userName
	 * @return Boolean
	 * @param userName
	 */
	@Override
	public boolean existsUserByName(String userName) {
		return repoUser.existsUserProgramByUserName(userName);
	}
	
	/**
	 * Verify if exists a user by email
	 * @return Boolean
	 * @param email
	 */
	@Override
	public boolean existsUserByEmail(String email) {
		return repoUser.existsUserProgramByEmail(email);
	}	

	/**
	 * Get category by type
	 * @return List
	 * @param type
	 */
	@Override
	public List<Category> findByType(String type) {
		return repoCategory.findByType(type);
	}

	/**
	 * Delete all productCart
	 * @return ResponseEntity
	 * @param userName
	 */
	@Override
	public ResponseEntity<?> deleteAllProductsCartByUserName(String userName) {
		try {
			repoProductCart.deleteByUserName(userName);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Delete productCart
	 * @return ResponseEntity
	 * @param userName
	 * @param productId
	 */
	@Override
	public ResponseEntity<?> deleteProductByUserCart(String userName, long productId) {
		try {
			long id =repoProductCart.findByUserNameAndProductId(userName, productId).get(0).getId() ;
			repoProductCart.deleteById(id);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}
	
	/**
	 * Update categoryName from all products by categoryName
	 * @param categoryNameNew
	 * @param categoryNameOld
	 */
	@Override
	public ResponseEntity<?> updateCategoryNameNewProduct(String categoryNameNew, String categoryNameOld) {
		try {
			repoProduct.setCatecoryNameNew(categoryNameNew, categoryNameOld);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Get productsCart by userName
	 * @return List
	 * @param userName
	 */
	@Override
	public Set<Product> getProductsByUserCart(String userName) {
		List<Product> productsList = new ArrayList<Product>();  
		repoProductCart.findByUserName(userName)
		.forEach(p -> productsList.add(repoProduct.findById(p.getProductId())));
		
		productsList.stream().forEach(p -> p.setAmount(Collections.frequency(productsList, p)));
		return productsList.stream().collect(Collectors.toSet());
	}

	/**
	 * Add productCart
	 * @return ResponseEntity
	 * @param productByUserCart
	 */
	@Override
	public ResponseEntity<?> addProductByUserCart(ProductByUserCart productByUserCart) {
		try {
			repoProductCart.save(productByUserCart);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Get products without amounts
	 * @return List
	 * @param userName
	 */
	@Override
	public List<ProductByUserCart> getProductsWithoutAmounts(String userName) {
		return repoProductCart.findByUserName(userName);
	}

	/**
	 * Delete all products By productId
	 * @return ResponseEntity
	 * @param userName
	 * @param productId
	 */
	@Override
	public ResponseEntity<?> deleteAllProductsByProductId(String userName, long productId) {
		try {
			repoProductCart.deleteByProductIdAndUserName(productId, userName);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Updated userName on product cart list
	 * @return {@link ResponseEntity}
	 * @param userNameNew
	 * @param userNameOld
	 */
	@Override
	public ResponseEntity<?> updateUserNameNewOnProductCartList(String userNameNew, String userNameOld) {
		try {
			repoProductCart.setUserNameNew(userNameNew, userNameOld);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Find user by UserEmail
	 * @return {@link ResponseEntity}
	 * @param email String
	 * @return {@link UserProgram}
	 */
	@Override
	public UserProgram findUserByEmail(String email) {
		return repoUser.findByEmail(email);
	}

	/**
	 * Get purchases from user
	 * @param userName String
	 * @return {@link List} {@link Purchase}
	 */
	@Override
	public List<Purchase> getPurchasesFromUser(String userName) {
		return repoUser.findByUserName(userName).getPurchases();
	}

	/**
	 * Get All sales
	 * @return {@link List} {@link Sale}
	 */
	@Override
	public List<Sale> getSales() {
		return repoSale.findAll();
	}

	/**
	 * Delete a sale by id
	 * @param id {@link Long}
	 * @return {@link ResponseEntity} {@link Boolean}
	 */
	@Override
	public ResponseEntity<?> deleteSaleById(long id) {
		try {
			repoSale.deleteById(id);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Save and update the parameter delivered from the sale
	 * @param sale {@link Sale}
	 * @return {@link Sale}
	 */
	@Override
	public Sale saveUpdateSale(Sale sale) {
		if(sale.isDelivered()) {
			sale.setDelivered(false);
		} else {
			sale.setDelivered(true);
		}
		return repoSale.save(sale);
	}

	/**
	 * Get sales by params
	 * @param date {@link String}
	 * @param userName {@link String}
	 * @param userMail {@link String}
	 * @return {@link List} {@link Sale}
	 */
	@Override
	public List<Sale> getSalesByParams(String date, String userName, String userMail) {
		return repoSale.searchByParams(date, userName, userMail);
	}

	/**
	 * Update the userName from the sales
	 * @param userNameNew {@link String}
	 * @param userNameOld {@link String}
	 * @return {@link ResponseEntity} {@link Boolean}
	 */
	@Override
	public ResponseEntity<?> updateUserNameFromSales(String userNameNew, String userNameOld) {
		try {
			repoSale.setUserNameNew(userNameNew, userNameOld);
			return ResponseEntity.ok().body(true);
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}

	/**
	 * Find sale by id
	 * @param id {@link Long}
	 * @return {@link Sale}
	 */
	@Override
	public Sale findSaleBYId(long id) {
		return repoSale.findById(id);
	}

	/**
	 * Find sales if are delivered or not
	 * @param delivered {@link Boolean}
	 * @return {@link List} {@link Sale} 
	 */
	@Override
	public List<Sale> findByDelivered(boolean delivered) {
		return repoSale.findByDelivered(delivered);
	}

	/**
	 * Get sales totals from a specific year
	 * @param year {@link String}
	 * @return {@link List} {@link Float}
	 */
	@Override
	public List<Float> getTotalMonthsByYear(String year) {
		List<Float> totals = new ArrayList<>(12);
		List<Sale> salesByYear = repoSale.findAll().stream()
				.filter(s -> s.getDate_approved().startsWith(year))
				.collect(Collectors.toList());
		
		return calculateTotals(salesByYear, totals);
	}
	
	/**
	 * Calculate totals for each month of the year
	 * @param salesByYear {@link List} {@link Sale}
	 * @param totals {@link List} {@link Float}
	 * @return {@link List} {@link Float}
	 */
	public List<Float> calculateTotals(List<Sale> salesByYear, List<Float> totals) {
		for (int i = 1; i <= 12; i++) {
			float total = 0;
			for (Sale sale : salesByYear) {
				if(LocalDate.parse(sale.getDate_approved().split("T")[0]).getMonthValue() == i) {
					total += sale.getTotal();
				}
			}
			totals.add(total);
		}
		return totals;
	}

	/**
	 * Validate the credentials from user
	 * @param user {@link UserProgram}
	 * @return {@link ResponseEntity} {@link UserProgram} {@link Boolean}
	 */
	@Override
	public ResponseEntity<?> validateUserCredentials(UserProgram user) {
		try {
			String pass = user.getPassword(); 
			UserProgram userLogin = repoUser.findByUserName(user.getUserName());
			
			if(userLogin.getPassword().equals(pass)) {
				UserProgram us = new UserProgram();
				us.setRole(userLogin.getRole());
				us.setUserName(userLogin.getUserName());
				return ResponseEntity.ok().body(us);
			} else {
				return ResponseEntity.ok().body(false);	
			}
		} catch (Exception e) {
			return ResponseEntity.ok().body(false);
		}
	}
	
}

	

