package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Category;

@Repository
public interface CategoryRepositories extends JpaRepository<Category, Integer> {

	//Fetching Category list
	//findAll();
	
//	//add Category
//	@Query("insert into Category (category_name) values (cat_name)")
//	public String addCategory(@Param("cat_name") String cat_name);
}
