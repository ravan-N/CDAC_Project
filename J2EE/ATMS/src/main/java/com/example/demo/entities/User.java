package com.example.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int user_id;
	String user_name, password, answer;
	
	@JsonIgnoreProperties("user")
	@ManyToOne
	@JoinColumn(name="question_id")
	Question question_id;
	
	@JsonIgnoreProperties("user")
	@ManyToOne
	@JoinColumn(name="user_type_id")
	UserType user_type_id;
	
	int status;
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	//User Registration
	public User(String user_name, String password, String answer, Question question_id, UserType user_type_id,
			int status) {
		//super();
		this.user_name = user_name;
		this.password = password;
		this.answer = answer;
		this.question_id = question_id;
		this.user_type_id = user_type_id;
		this.status = status;
	}
	
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public Question getQuestion_id() {
		return question_id;
	}
	public void setQuestion_id(Question question_id) {
		this.question_id = question_id;
	}
	public UserType getUser_type_id() {
		return user_type_id;
	}
	public void setUser_type_id(UserType user_type_id) {
		this.user_type_id = user_type_id;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	
	
}
