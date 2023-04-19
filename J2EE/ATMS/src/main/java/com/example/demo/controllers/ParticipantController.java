package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.entities.Participant;
import com.example.demo.entities.ParticipantReg;
import com.example.demo.entities.ParticipantUpdateProfile;
import com.example.demo.entities.Question;
import com.example.demo.entities.User;
import com.example.demo.entities.UserType;
import com.example.demo.services.ParticipantService;
import com.example.demo.services.UserService;
import com.example.demo.services.UserTypeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ParticipantController {
	@Autowired
	ParticipantService pserv;
	
	@Autowired
	UserService userv;
	
	@Autowired
	UserTypeService utserv;
	
	
	//participant registration
	@PostMapping("/regParticipant")
	public Participant regParticipant(@RequestBody ParticipantReg p)
	{
		UserType ut = utserv.getTypeId(1);
		Question queid = new Question(p.getQuestion_id());
		User u = new User(p.getUser_name(),p.getPassword(),p.getAnswer(), queid,  ut, 1);
		User saved = userv.saveUser(u);
		Participant part = new Participant(p.getFirst_name(), p.getLast_name(), p.getGender(), p.getCity(), p.getMobile(), p.getEmail(), p.getBirthdate(), saved);
		//System.out.println(part);
		return pserv.saveParticipant(part);
		
	}
	
	//Logged in Participant
	@GetMapping("/getParticipant")
	public Participant getParticipantById(@RequestParam("userid") int id) {
		
		
		User u=userv.getById(id);
		System.out.println(u);
		return pserv.getParticipant(u);
		
	}
	
	//Update Profile
	@PutMapping("/setParticipantinfo")
	public int updateParticipant(@RequestParam("userid") int id,@RequestBody ParticipantUpdateProfile pup)
	{

		//UserType ut = utserv.getTypeId(1);
		//Question queid = qservice.getQuestionById(2);
		
		//User u = new User(pup.getUser_name(),pup.getPassword(),"rajgad", queid,  ut, 1);
		System.out.println(id);
		User u=userv.getById(id);
		return pserv.updateParticipant(pup.getFirst_name(),pup.getLast_name(),pup.getBirthdate(),pup.getGender(),pup.getCity(),pup.getMobile(),pup.getEmail(),u);
	}
	
}
