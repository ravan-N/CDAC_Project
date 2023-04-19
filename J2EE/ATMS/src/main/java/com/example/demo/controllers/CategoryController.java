package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Category;
import com.example.demo.services.CategoryService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CategoryController {

	@Autowired
	CategoryService cserv;
	
	//Fetching Category list
	@GetMapping("/getCategoryList")
	public List<Category> getCategoryList()
	{
		return cserv.getCategoryList();
	}
	
	
//	//add Category
//	@PostMapping("/addCategory")
//	public String addCategory(@RequestBody String cat_name)
//	{
//		return cserv.addCategory(cat_name);
//	}
}
