package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="organizer")
public class Organizer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int organizer_id;
	String organization_name, registration_no, city, mobile, email;
	
	@JsonIgnoreProperties("organizer")
	@OneToOne
	@JoinColumn(name="user_id")
	User user_id;
	
	public Organizer() {
		super();
		// TODO Auto-generated constructor stub
	}

	//Organizer registration
	public Organizer(String organization_name, String registration_no, String city, String mobile, String email,
			User user_id) {
		super();
		this.organization_name = organization_name;
		this.registration_no = registration_no;
		this.city = city;
		this.mobile = mobile;
		this.email = email;
		this.user_id = user_id;
	}

	//addEvent
	public Organizer(int organizer_id) {
		//super();
		this.organizer_id = organizer_id;
	}

	public int getOrganizer_id() {
		return organizer_id;
	}

	public void setOrganizer_id(int organizer_id) {
		this.organizer_id = organizer_id;
	}

	public String getOrganization_name() {
		return organization_name;
	}

	public void setOrganization_name(String organization_name) {
		this.organization_name = organization_name;
	}

	public String getRegistration_no() {
		return registration_no;
	}

	public void setRegistration_no(String registration_no) {
		this.registration_no = registration_no;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public User getUser_id() {
		return user_id;
	}

	public void setUser_id(User user_id) {
		this.user_id = user_id;
	}
	
	
}
