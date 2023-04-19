package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Booking;
import com.example.demo.entities.BookingEnrollment;
import com.example.demo.entities.DummyEnrollement;
import com.example.demo.entities.Participant;
import com.example.demo.services.BookingEnrollmentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BookingEnrollmentController {

	@Autowired
	BookingEnrollmentService beserv;
	
	@PostMapping("/addEnrollments")
	public BookingEnrollment addEnrollments(@RequestBody DummyEnrollement dummy)
	{
		Booking bookid = new Booking(dummy.getBooking_id());
		BookingEnrollment saved = new BookingEnrollment(dummy.getFname(), dummy.getLname(), dummy.getGender(), dummy.getAge(), bookid);
		return beserv.addEnrollments(saved);
	}
	
}
