package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.User;

@Transactional
@Repository
public interface UserRepositories extends JpaRepository<User, Integer> {
 
	//login check
	@Query("select u from User u where user_name = :user_name and password = :password")
	public Optional<User> checkLogin(@Param("user_name") String user_name, @Param("password") String password);
	
	//registration
	//save();
	
	//Logged in Participant and User
	//findById();
	
	//Admin-Organizer Approval
	@Query("select u from User u where status=0 ")
	public List<User> getAllByStatus();
	@Modifying
	@Query("update User u set u.status=1 where u.user_id=:id")
	public int changeStatus(@Param("id")int id);
	
	//Forgot Password-getQuestions
	@Query("select u from User u where user_name=:uname")
	public User getQuestionByUserName(@Param("uname") String uname);
	
	//Forgot Password-resetPassword
	@Modifying
	@Query("update User u set password=:password where user_id=:id")
	public int resetPassword(@Param("id") int id, @Param("password") String password);
	
	//Update Profile
	@Modifying
	@Query("update  User set user_name = :uname,password = :password where user_id=:id ")
	public int updateUserNameAndPassword(@Param("uname") String uname, @Param("password") String password, @Param("id") int id);
	
}
