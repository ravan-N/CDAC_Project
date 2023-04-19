package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entities.Category;
import com.example.demo.repositories.CategoryRepositories;

@Service
public class CategoryService {
	
	@Autowired
	CategoryRepositories crepo;

	//Fetching Category list
	public List<Category> getCategoryList()
	{
		return crepo.findAll();
	}
	
//	public String addCategory(String cat_name)
//	{
//		return crepo.addCategory(cat_name);
//	}
}
