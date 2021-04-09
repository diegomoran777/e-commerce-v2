package com.diego.spring.backend.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

/**
 * Class entity of Image
 * @author Diego Moran
 * @version: 1.0
 */
@Entity
public class Image implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO, generator="identity")
	@GenericGenerator(name = "identity", strategy = "native")
	private long id;
	
	@Column(name = "name", length= 70, nullable = false)
	private String name;
	
	@Column(name = "type", length= 70, nullable = false)
	private String type;
	
	@Column(name = "description", length= 100)
	private String description;
	
	@Column(name = "photo")
	private String photo;
	
	@Column(name = "categoryId")
	private long categoryId;
	
	@Column(name = "categoryName", length= 70)
	private String categoryName;
	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
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
	
	
	

}
