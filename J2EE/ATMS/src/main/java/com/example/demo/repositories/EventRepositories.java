package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entities.Category;
import com.example.demo.entities.Event;
import com.example.demo.entities.Organizer;

@Transactional
@Repository
public interface EventRepositories extends JpaRepository<Event, Integer> {
	
	//add Event
	//save();
	
	//fetching-All Event
	//findAll();
	
	//fetching event by id
	//findById();
	
	//getEventsByOrgid
	@Query("select e from Event e where organizer_id =:orgid and datetime > curdate()")
	public List<Event> getEventsByOrgid(@Param("orgid")Organizer orgid);
	
	//getEventsByCatId
	@Query("select e from Event e where category_id=:catid and datetime > curdate()")
	public List<Event> getEventsByCatId(@Param("catid")Category catid);
	
	//delete Event
	//deleteById();
}
