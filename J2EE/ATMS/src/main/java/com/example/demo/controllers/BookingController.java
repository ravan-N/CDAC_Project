package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Booking;
import com.example.demo.entities.DummyBooking;
import com.example.demo.entities.Event;
import com.example.demo.entities.Participant;
import com.example.demo.services.BookingService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BookingController {

	@Autowired
	BookingService bserv;
	
	//book event
	@PostMapping("/bookEvent")
	public Booking bookEvent(@RequestBody DummyBooking db)
	{
		Participant partid = new Participant(db.getParticipant_id());
		Event eveid = new Event(db.getEvent_id());
		Booking saved = new Booking(db.getDate(), db.getTotal_enrollment(), db.getTotal_amount(),partid,eveid);
		return bserv.bookEvent(saved);
	}
	
	//fetch Enrolled Booking
	@GetMapping("/getenrolled_booking")
	public Booking getEnrolledBooking(@RequestParam("participant_id") int participant_id, @RequestParam("event_id") int event_id)
	{
		
		Participant part_id = new Participant(participant_id);
		Event eve_id = new Event(event_id);
		return bserv.getEnrolledBooking(part_id,eve_id);
	}
	
	//total Booking
	@GetMapping("/getTotalBookings")
	public int getTotalBookings(@RequestParam("event_id") int event_id)
	{
		Event evid = new Event(event_id);
		return bserv.getTotalBookings(evid);
	}
	
	//Part-Bookings View
	@GetMapping("/getBookingsByPartid")
	public List<Booking> getBookingsByPartid(@RequestParam("participant_id")int participant_id )
	{
		Participant part_id = new Participant(participant_id);
		return bserv.getBookingsByPartid(part_id);
	}
	
	//Org-Booking View
	@GetMapping("/getBookingsByEventid")
	public List<Booking> getBookingsByEventid(@RequestParam("event_id") int event_id)
	{
		Event evid = new Event(event_id);
		return bserv.getBookingsByEventid(evid);
	}
	
}
