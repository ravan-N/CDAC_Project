package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Question;
import com.example.demo.repositories.QuestionRepositories;

@Service
public class QuestionService {
	
	@Autowired
	QuestionRepositories qrepo;
	
	
	public List<Question> getQueList()
	{
		return qrepo.findAll();
	}
}
