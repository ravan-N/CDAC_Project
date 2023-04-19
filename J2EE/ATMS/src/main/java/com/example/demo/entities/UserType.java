package com.example.demo.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="user_type")
public class UserType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int user_type_id;
	
	@Column
	String user_type;
	@JsonIgnoreProperties("user_type")
	@OneToMany(mappedBy = "user_type_id",cascade = CascadeType.ALL)
	Set<User> user;
	
	public UserType() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserType(String user_type) {
		super();
		this.user_type = user_type;
	}

	public int getUser_type_id() {
		return user_type_id;
	}

	public void setUser_type_id(int user_type_id) {
		this.user_type_id = user_type_id;
	}

	public String getUser_type() {
		return user_type;
	}

	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}

	
	
}
