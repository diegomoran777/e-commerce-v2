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
import com.diego.spring.backend.model.Sale;
import com.diego.spring.backend.service.GeneralService;

@RestController
@RequestMapping("/api/sale")
@CrossOrigin(origins = {"*"})
public class ControllerRestSale {

	@Autowired
	GeneralService service;
	
	/**
	 * Get all sales
	 * @return {@link List}
	 */
	@GetMapping("/sales")
	public List<Sale> getSales(){
		return service.getSales();
	}
	
	/**
	 * Get sale by id
	 * @param sale
	 * @return {@link List}
	 */
	@PostMapping("/get-sale")
	public List<Sale> getSaleById(@RequestBody Sale sale){
		return Arrays.asList(service.findSaleBYId(sale.getId()));
	}
	
	/**
	 * Delete sale by id
	 * @param id
	 * @return {@link ResponseEntity}
	 */
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteSaleById(@PathVariable long id){
		return service.deleteSaleById(id);  
	}
	
	
	/**
	 * Save and update sale
	 * @param sale
	 * @return {@link ResponseEntity<product>}
	 */
	@PostMapping("/save-update")
	public ResponseEntity<Sale> saveUpdateSale(Sale sale){
		return ResponseEntity.ok().body(service.saveUpdateSale(sale));
	}
	
	/**
	 * Get sale by param
	 * @param {@link RequestBody}
	 * @return {@link List}
	 */
	@PostMapping("/search-by-params")
	public List<Sale> getSalesByParams(@RequestBody Sale sale) {
		return service.getSalesByParams(sale.getDate_approved(), sale.getUserName(), sale.getUserMail());
	}
	
	/**
	 * update new user name on list
	 * @param {@link Map<String, String>}
	 * @return {@link ResponseEntity}
	 */
	@PostMapping("/update-new-username")
	public ResponseEntity<?> updateNewUserNameOnLists(@RequestBody Map<String, String> res) {
		return service.updateUserNameFromSales(res.get("userNameNew"), res.get("userNameOld"));
	}
	
	/**
	 * Get sale by deliver
	 * @param {@link RequestBody}
	 * @return {@link List}
	 */
	@PostMapping("/get-sales-deliver")
	public List<Sale> getSalesByDelivered(@RequestBody Sale sale) {
		return service.findByDelivered(sale.isDelivered());
	}
	
	/**
	 * Get months totals sales by year
	 * @param {@link RequestBody}
	 * @return {@link List}
	 */
	@PostMapping("/get-totals-year")
	public List<Float> getTotalsMonthByYear(@RequestBody String year) {
		return service.getTotalMonthsByYear(year);
	}
}
