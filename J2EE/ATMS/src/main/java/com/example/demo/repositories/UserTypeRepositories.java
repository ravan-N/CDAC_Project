package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.UserType;

@Repository
public interface UserTypeRepositories extends JpaRepository<UserType, Integer> {

	//registration
	//findById()
	
}
