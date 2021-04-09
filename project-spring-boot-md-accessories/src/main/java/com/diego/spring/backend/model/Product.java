package com.diego.spring.backend.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

/**
 * Class entity of Product
 * @author Diego Moran
 * @version: 1.0
 */
@Entity
public class Product implements Serializable, Comparable<Product> {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO, generator="identity")
	@GenericGenerator(name = "identity", strategy = "native")
	private long id;
	
	@Column(name = "numberExtern", length= 70)
	private String numberExtern;
	
	@Column(name = "name", length= 50, nullable = false)
	private String name;
	
	@Column(name = "type", length= 70, nullable = false)
	private String type;
	
	@Column(name = "description", length= 70)
	private String description;
	
	@OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name= "product_id")
	private List<Photo> photos;
	
	@Column(name = "price")
	private float price;
	
	@Column(name = "categoryId")
	private long categoryId;
	
	@Column(name = "categoryName", length= 70)
	private String categoryName;
	
	@Transient
	private int amount;


	public void addPhoto(Photo photo) {
		this.photos.add(photo);
	}

	public List<Photo> getPhotos() {
		return photos;
	}

	public void setPhotos(List<Photo> photos) {
		this.photos = photos;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getNumberExtern() {
		return numberExtern;
	}

	public void setNumberExtern(String numberExtern) {
		this.numberExtern = numberExtern;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	@Override
	public int hashCode() {
		return toString().hashCode();
	}
	
	@Override
	public boolean equals(Object  obj) {
		if(this==obj) {
			return true;
		}
		
		if(!(obj instanceof Product)) {
			return false;
		}
		Product other=(Product) obj;
		return getNumberExtern().equals(other.getName()) && getName().equals(other.getName()); 
	}


	@Override
	public int compareTo(Product product) {
		return (int) (this.getId() - product.getId());
	}
	
	@Override
	public String toString() {
		return "Name: " + getName() + "numberExtern: "+ getNumberExtern(); 
	}
	
	
	
}
