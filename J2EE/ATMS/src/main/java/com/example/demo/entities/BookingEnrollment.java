package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="booking_enrollment")
public class BookingEnrollment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int enrollment_no;
	String fname, lname, gender;
	int age;
	@JsonIgnoreProperties("booking_enrollment")
	@ManyToOne
	@JoinColumn(name="booking_id")
	Booking booking_id;
	
	public BookingEnrollment() {
		//super();
		// TODO Auto-generated constructor stub
	}

	public BookingEnrollment(String fname, String lname, String gender, int age, Booking booking_id) {
		super();
		this.fname = fname;
		this.lname = lname;
		this.gender = gender;
		this.age = age;
		this.booking_id = booking_id;
	}

	public int getEnrollment_no() {
		return enrollment_no;
	}

	public void setEnrollment_no(int enrollment_no) {
		this.enrollment_no = enrollment_no;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Booking getBooking_id() {
		return booking_id;
	}

	public void setBooking_id(Booking booking_id) {
		this.booking_id = booking_id;
	}
	
	
	
}
