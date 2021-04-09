package com.diego.spring.backend.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.diego.spring.backend.model.Category;
import com.diego.spring.backend.model.Product;
import com.diego.spring.backend.model.ProductByUserCart;
import com.diego.spring.backend.model.Purchase;
import com.diego.spring.backend.model.Sale;
import com.diego.spring.backend.model.UserProgram;

public interface IService {

	public Set<String> getAllTypes();
	
	public Set<String> getTypesByCategory(long categoryId);
	
	public ResponseEntity<?> deleteCategoryById(long id);
	
	public ResponseEntity<?> deleteProductById(long id);
	
	public ResponseEntity<?> deleteUserById(long id);
	
	public ResponseEntity<?> deleteAllProductsCartByUserName(String userName);
	
	public ResponseEntity<?> deleteProductByUserCart(String userName, long productId);
	
	public ResponseEntity<?> deleteAllProductsByProductId(String userName, long productId);
	
	public ResponseEntity<?> updateUserNameNewOnProductCartList(String userNameNew, String userNameOld);
	
	public ResponseEntity<?> updateCategoryNameNewProduct(String categoryNameNew, String categoryNameOld);
	
	public Set<Product> getProductsByUserCart(String userName);
	
	public List<ProductByUserCart> getProductsWithoutAmounts(String userName);
	
	public ResponseEntity<?> addProductByUserCart(ProductByUserCart productByUserCart);
	
	public boolean deleteProductsFromCategory(long id);
	
	public List<Category> findAllCategories();
	
	public List<Category> findByType(String type);
	
	public List<Product> findAllProducts();
	
	public List<UserProgram> findAllUsers();
	
	public boolean existsUserByName(String userName);
	
	public boolean existsUserByEmail(String email);
	
	public Category findCategoryById(long id);
	
	public Product findProductById(long id);
	
	public UserProgram findUserByUserName(String userName);

	public ResponseEntity<?> validateUserCredentials(UserProgram user);
	
	public UserProgram findUserByEmail(String email);
	
	public List<Product> findProductsByCategoryId(long id);
	
	public Product findProductsByCategoryAndProductId(long categoryId,  long id);
	
	public Category saveUpdateCategory(Category supplier);
	
	public Product saveUpdateProduct(Product product);
	
	public UserProgram saveUpdateUser(UserProgram user);
	
	public List<Category> getCategoriesByParams(String name, String type);
	
	public List<Product> getProductByParamsId(String name, String numberExtern, String type, String id);
	
	public List<UserProgram> getUsersByParams(String userName, String role);
	
	public List<Purchase> getPurchasesFromUser(String userName);
	
	public List<Sale> getSales();
	
	public ResponseEntity<?> deleteSaleById(long id);
	
	public Sale saveUpdateSale(Sale sale);
	
	public List<Sale> getSalesByParams(String date, String userName, String userMail);
	
	public ResponseEntity<?> updateUserNameFromSales(String userNew, String userNameOld);
	
	public Sale findSaleBYId(long id);
	
	public List<Sale> findByDelivered(boolean delivered);
	
	public List<Float> getTotalMonthsByYear(String year);
}
