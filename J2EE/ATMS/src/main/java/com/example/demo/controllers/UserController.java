package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.LoginCheck;
import com.example.demo.entities.ParticipantUpdateProfile;
import com.example.demo.entities.ResetPasswordChk;
import com.example.demo.entities.User;
import com.example.demo.services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

	@Autowired
	UserService userv;
	
	//Login Check
	@PostMapping("/checkLogin")
	public User checkLogin(@RequestBody LoginCheck lcheck)
	{
		return userv.checkLogin(lcheck.getUser_name(), lcheck.getPassword());
	}
	
	//registration
	//save()
	
	//Admin-Organizer Approval
	@GetMapping("/getAllUser")
	public List<User> getAllByStatus()
	{
		return userv.getAllByStatus();
	}
	@PutMapping("/changeStatus")
	public int changeStatus(@RequestParam("user_id") int id) {
		return userv.changeStatus(id);
	}
	
	//Forgot Password-getQuestions
	@GetMapping("/getQuestions")
	public User getQuestionByUserName(@RequestParam("username") String name)
	{
		return userv.getQuestionByUserName(name);
	}
	//Forgot Password-resetPassword
	@PutMapping(value="/resetPassword")
	public int resetPasswordById(@RequestParam(value="userid", required = false) int id,@RequestBody ResetPasswordChk Repass)
	{
		System.out.println(id+Repass.getPassword());
		return userv.resetPassword(id,Repass.getPassword());
	}
	
	//Update Profile
	@PutMapping("/setUserinfo")
	public int setUserAndPassword(@RequestParam("userid") int id,@RequestBody ParticipantUpdateProfile pup)
	{
		System.out.println(id+pup.getUser_name()+pup.getPassword());
		int  n = userv.updateUserNameAndPassword(pup.getUser_name(),pup.getPassword(),id);
		
		
		return n;
		
	}
	
}
