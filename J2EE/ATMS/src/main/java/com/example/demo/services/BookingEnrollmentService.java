package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.BookingEnrollment;
import com.example.demo.repositories.BookingEnrollmentRepositories;

@Service
public class BookingEnrollmentService {
	
	@Autowired
	BookingEnrollmentRepositories berepo;
	
	public BookingEnrollment addEnrollments(BookingEnrollment benroll)
	{
		return berepo.save(benroll);
	}
	
}
