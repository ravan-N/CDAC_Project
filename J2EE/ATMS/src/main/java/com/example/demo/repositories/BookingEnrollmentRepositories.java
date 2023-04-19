package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.BookingEnrollment;

@Transactional
@Repository
public interface BookingEnrollmentRepositories extends JpaRepository<BookingEnrollment, Integer> {

	//to add 
	//save();
}
