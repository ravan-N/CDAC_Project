package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Booking;
import com.example.demo.entities.Event;
import com.example.demo.entities.Participant;
import com.example.demo.repositories.BookingRepositories;

@Service
public class BookingService {

	@Autowired
	BookingRepositories brepo;
	
	//book event
	public Booking bookEvent(Booking b)
	{
		return brepo.save(b);
	}
	
	//fetch Enrolled Booking
	public Booking getEnrolledBooking(Participant participant_id, Event event_id)
	{
		return brepo.getEnrolledBooking(participant_id,event_id); 
	}
	
	//total Booking
	public int getTotalBookings(Event event_id)
	{

		return brepo.getTotalBookings(event_id);
	}
	
	//Part-Bookings View
	public List<Booking> getBookingsByPartid(Participant participant_id)
	{
		return brepo.getBookingsByPartid(participant_id);
	}
	
	//Org-Booking View
	public List<Booking> getBookingsByEventid(Event event_id)
	{
		return brepo.getBookingsByEventid(event_id);
	}
}
