package com.diego.spring.backend.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

/**
 * Class entity of Purchases from users
 * @author Diego Moran
 * @version: 1.0
 */
@Entity
public class Purchase implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO, generator="identity")
	@GenericGenerator(name = "identity", strategy = "native")
	private long id;
	
	@Column(name = "purchase_detail")
	private String purchase_detail;
	
	@Column(name = "total")
	private float total;
	
	@Column(name = "installments")
	private long installments;
	
	@Column(name = "date_approved")
	private String date_approved;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "payment_method_id")
	private String Payment_method_id;
	
	@Column(name = "payment_type_id")
	private String payment_type_id;
	

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPurchase_detail() {
		return purchase_detail;
	}

	public void setPurchase_detail(String purchase_detail) {
		this.purchase_detail = purchase_detail;
	}

	public float getTotal() {
		return total;
	}

	public void setTotal(float total) {
		this.total = total;
	}

	public long getInstallments() {
		return installments;
	}

	public void setInstallments(long installments) {
		this.installments = installments;
	}

	public String getDate_approved() {
		return date_approved;
	}

	public void setDate_approved(String date_approved) {
		this.date_approved = date_approved;
	}

	public String getPayment_method_id() {
		return Payment_method_id;
	}

	public void setPayment_method_id(String payment_method_id) {
		Payment_method_id = payment_method_id;
	}

	public String getPayment_type_id() {
		return payment_type_id;
	}

	public void setPayment_type_id(String payment_type_id) {
		this.payment_type_id = payment_type_id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
	
	
	

}
