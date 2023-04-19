package com.example.demo.repositories;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import com.example.demo.entities.Participant;
import com.example.demo.entities.User;

@Transactional
@Repository
public interface ParticipantRepositories extends JpaRepository<Participant, Integer> {

	//registration
	//save()
	
	//Logged in Participant
	@Query("select  p from Participant p where user_id=:u ")
	public Participant getParticipant(@Param("u")User u);
	
	//Update Profile
	@Modifying
	@Query("update  Participant set first_name = :fname,last_name = :lname,birthdate=:birthdate, gender=:gender,city=:city,mobile=:mobile,email=:email where user_id=:u ")
	public int updateParticipant(@Param("fname")String fname,@Param("lname")String lname,@Param("birthdate")Date birthdate,@Param("gender")String gender,@Param("city")String city,@Param("mobile")String mobile,@Param("email")String email,@Param("u")User u);
}
