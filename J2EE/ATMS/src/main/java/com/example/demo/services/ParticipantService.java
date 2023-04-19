package com.example.demo.services;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Participant;
import com.example.demo.entities.User;
import com.example.demo.repositories.ParticipantRepositories;

@Service
public class ParticipantService {
	
	@Autowired
	ParticipantRepositories prepo;
	
	//registration
	public Participant saveParticipant(Participant p)
	{
		return prepo.save(p);
	}
	
	//logged in participant
	public Participant getParticipant(User u)
	{
		return prepo.getParticipant(u);
	}
	
	//Update Profile
	public int updateParticipant(String fname,String lname,Date birthdate,String gender,String city,String mobile,String email,User id) {
		return prepo.updateParticipant(fname,lname,birthdate,gender,city,mobile,email,id);
		}
}
