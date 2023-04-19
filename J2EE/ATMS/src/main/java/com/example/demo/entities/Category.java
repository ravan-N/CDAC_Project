package com.example.demo.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="category")
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int category_id;
	String category_name;
	
	@JsonIgnoreProperties("category")
	@OneToMany(mappedBy = "category_id", cascade = CascadeType.ALL)
	Set<Event> event;
	
	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	//addEvent
	public Category(int category_id) {
		
		this.category_id = category_id;
	}

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	
	

}
