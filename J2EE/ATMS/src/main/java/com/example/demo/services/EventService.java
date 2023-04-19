package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entities.Category;
import com.example.demo.entities.Event;
import com.example.demo.entities.Organizer;
import com.example.demo.repositories.EventRepositories;

@Service
public class EventService {

	@Autowired
	EventRepositories erepo;
	
	//add event
	public Event addEvent(Event e)
	{
		return erepo.save(e);
	}
	
	//fetching-All Event
	public List<Event> getEventList()
	{
		return erepo.findAll();
	}
	
	//fetching event by id
	public Event getEventById(int event_id)
	{
		return erepo.findById(event_id).get();
	}
	
	//getEventsByOrgid
	public List<Event> getEventsByOrgid(Organizer orgid)
	{
		return erepo.getEventsByOrgid(orgid);
	}
	
	public List<Event> getEventsByCatId(Category catid)
	{
			return erepo.getEventsByCatId(catid);
	}
	
	
//	//delete Event
//	public void removeEventById( int event_id)
//	{
//		erepo.deleteById(event_id);
//	}
	
}
