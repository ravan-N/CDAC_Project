package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.Organizer;
import com.example.demo.entities.User;

@Transactional
@Repository
public interface OrganizerRepositories extends JpaRepository<Organizer, Integer> {

	//registration
	//save();
	
	//Logged in Participant
	@Query("select  o from Organizer o where user_id=:u ")
	public Organizer getOrganizer(@Param("u")User u);
}
