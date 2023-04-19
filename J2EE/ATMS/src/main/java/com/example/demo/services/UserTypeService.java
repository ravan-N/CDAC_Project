package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.UserType;
import com.example.demo.repositories.UserTypeRepositories;

@Service
public class UserTypeService {

	@Autowired
	UserTypeRepositories utrepo;
	
	public UserType getTypeId(int id)
	{
		return utrepo.findById(id).get();
	}
	
}
