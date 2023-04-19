package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Category;
import com.example.demo.entities.DummyEvent;
import com.example.demo.entities.Event;
import com.example.demo.entities.Organizer;
import com.example.demo.services.EventService;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EventController {

	@Autowired
	EventService eserv;
	
	
	//add event
	@PostMapping("/addEvent")
	public Event addEvent(@RequestBody DummyEvent e)
	{
		//System.out.println(e);
		Category catid = new Category(e.getCategory_id());
		Organizer orgid = new Organizer(e.getOrganizer_id());
		Event ev = new Event(e.getEvent_name(), e.getLocation(), e.getDuration(), e.getOverview(), e.getDifficulty_level(), e.getThing_to_carry(), e.getPickup_location(), e.getDrop_location(), e.getInclusion(), e.getExclusion(), e.getSafety_guideline(), e.getRulebook(), e.getCancellation_policy(), e.getDatetime(), e.getPickup_time(), e.getDrop_time(), e.getPrice(), e.getTotal_seat(), catid, orgid);
		return eserv.addEvent(ev);
	}
	
	//fetching-All Event
	@GetMapping("/getEventList")
	public List<Event> getEventList()
	{
		return eserv.getEventList();
	}
	
	//fetching event by id
	@GetMapping("/getEventById")
	public Event getEventById(@RequestParam("event_id") int event_id)
	{
		return eserv.getEventById(event_id);
	}
	
	//getEventsByOrgid
	@GetMapping("/getEventsByOrgid")
	public List<Event> getEventsByOrgid(@RequestParam("organizer_id") int organizer_id)
	{
		System.out.println("************");
		System.out.println(organizer_id);
		Organizer orgid = new Organizer(organizer_id);
		return eserv.getEventsByOrgid(orgid);
	}
	
	//getEventsByCatId
	@GetMapping("/getEventsByCatId")
	public List<Event> getEventsByCatId(@RequestParam("category_id") int category_id)
	{
		System.out.println("*******");
		System.out.println(category_id);
		System.out.println("*******");
		Category catid = new Category(category_id);
		return eserv.getEventsByCatId(catid);
	}
	
	
	
	
//	//delete Event
//	@DeleteMapping("/removeEventById")
//	public void removeEventById(@RequestParam("event_id") int event_id)
//	{
//		eserv.removeEventById(event_id);
//	}
	
}
