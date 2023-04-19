package com.example.demo.entities;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="booking")
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int booking_id;
	Date date;
	int total_enrollment;
	double total_amount;
	@JsonIgnoreProperties("booking")
	@ManyToOne
	@JoinColumn(name="participant_id")
	Participant participant_id;
	
	@JsonIgnoreProperties("booking")
	@ManyToOne
	@JoinColumn(name="event_id")
	Event event_id;
	
	public Booking() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	//book event
	public Booking(Date date, int total_enrollment, double total_amount, Participant participant_id, Event event_id) {
		super();
		this.date = date;
		this.total_enrollment = total_enrollment;
		this.total_amount = total_amount;
		this.participant_id = participant_id;
		this.event_id = event_id;
	}

	
	//to add booking Enrollement
	public Booking(int booking_id) {
		super();
		this.booking_id = booking_id;
	}


	public int getBooking_id() {
		return booking_id;
	}

	public void setBooking_id(int booking_id) {
		this.booking_id = booking_id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getTotal_enrollment() {
		return total_enrollment;
	}

	public void setTotal_enrollment(int total_enrollment) {
		this.total_enrollment = total_enrollment;
	}

	public double getTotal_amount() {
		return total_amount;
	}

	public void setTotal_amount(double total_amount) {
		this.total_amount = total_amount;
	}

	public Participant getParticipant_id() {
		return participant_id;
	}

	public void setParticipant_id(Participant participant_id) {
		this.participant_id = participant_id;
	}

	public Event getEvent_id() {
		return event_id;
	}

	public void setEvent_id(Event event_id) {
		this.event_id = event_id;
	}
	
	
}
