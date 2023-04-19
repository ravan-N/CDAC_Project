package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Organizer;
import com.example.demo.entities.OrganizerReg;

import com.example.demo.entities.Question;
import com.example.demo.entities.User;
import com.example.demo.entities.UserType;
import com.example.demo.services.OrganizerService;
import com.example.demo.services.QuestionService;
import com.example.demo.services.UserService;
import com.example.demo.services.UserTypeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OrganizerController {
	
	@Autowired
	OrganizerService oserv;
	
	@Autowired
	UserService userv;
	
	@Autowired
	UserTypeService utserv;
	
	@Autowired
	QuestionService qserv;
	
	//Organizer registration
	@PostMapping("/regOrganizer")
	public Organizer regOrganizer(@RequestBody OrganizerReg o)
	{
		//System.out.println(o.getUser_name());
		UserType ut = utserv.getTypeId(2);
		Question queid = new Question(o.getQuestion_id());
		User u = new User(o.getUser_name(),o.getPassword(),o.getAnswer(), queid,  ut, 0);
		User saved = userv.saveUser(u);
		Organizer org = new Organizer(o.getOrganization_name(), o.getRegistration_no(), o.getCity(), o.getMobile(), o.getEmail(), saved);
		
		return oserv.saveOrganizer(org);
		
	}

	//Logged in Organizer
	@GetMapping("/getOrganizer")
	public Organizer getOrganizerById(@RequestParam("userid") int id) {
		
		
		User u=userv.getById(id);
		System.out.println(u);
		return oserv.getOrganizer(u);
		
	}
	
}
