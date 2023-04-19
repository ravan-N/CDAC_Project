package com.example.demo.entities;

import java.sql.Date;

public class DummyBooking {

	Date date;
	int total_enrollment;
	double total_amount;
	int participant_id, event_id;
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
	public int getParticipant_id() {
		return participant_id;
	}
	public void setParticipant_id(int participant_id) {
		this.participant_id = participant_id;
	}
	public int getEvent_id() {
		return event_id;
	}
	public void setEvent_id(int event_id) {
		this.event_id = event_id;
	}
	
	
}
