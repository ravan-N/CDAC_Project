package com.example.demo.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="question")
public class Question {

	@Id
	int question_id;
	String question;
	@JsonIgnoreProperties("question")
	@OneToMany(mappedBy = "question_id",cascade = CascadeType.ALL)
	Set<User> user;
	
	public Question() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	//registration
	public Question(int question_id) {
		
		this.question_id = question_id;
	}

	public Question(int question_id, String question) {
		
		this.question_id = question_id;
		this.question = question;
	}
	public int getQuestion_id() {
		return question_id;
	}
	public void setQuestion_id(int question_id) {
		this.question_id = question_id;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	
}
