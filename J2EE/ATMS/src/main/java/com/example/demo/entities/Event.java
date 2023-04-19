package com.example.demo.entities;

import java.sql.Blob;
import java.sql.Date;
import java.sql.Time;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@Table(name="event")
public class Event {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int event_id;
	String event_name, location, duration, overview, difficulty_level, thing_to_carry;
	String pickup_location, drop_location, inclusion, exclusion, safety_guideline, rulebook, cancellation_policy;
	Date datetime, pickup_time, drop_time;
	double price;
	byte[] routemap;
	int total_seat;
	
	@JsonIgnoreProperties("event")
	@ManyToOne
	@JoinColumn(name="category_id")
	Category category_id;
	
	@JsonIgnoreProperties("event")
	@ManyToOne
	@JoinColumn(name="organizer_id")
	Organizer organizer_id;
	
	public Event() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	//fetch image
	public Event(String event_name, String location, String duration, String overview, String difficulty_level,
			String thing_to_carry, String pickup_location, String drop_location, String inclusion, String exclusion,
			String safety_guideline, String rulebook, String cancellation_policy, Date datetime, Date pickup_time,
			Date drop_time, double price, byte[] routemap, int total_seat, Category category_id, Organizer organizer_id) {
		super();
		this.event_name = event_name;
		this.location = location;
		this.duration = duration;
		this.overview = overview;
		this.difficulty_level = difficulty_level;
		this.thing_to_carry = thing_to_carry;
		this.pickup_location = pickup_location;
		this.drop_location = drop_location;
		this.inclusion = inclusion;
		this.exclusion = exclusion;
		this.safety_guideline = safety_guideline;
		this.rulebook = rulebook;
		this.cancellation_policy = cancellation_policy;
		this.datetime = datetime;
		this.pickup_time = pickup_time;
		this.drop_time = drop_time;
		this.price = price;
		this.routemap = routemap;
		this.total_seat = total_seat;
		this.category_id = category_id;
		this.organizer_id = organizer_id;
	}
	
	//booking
	public Event(int event_id) {
		super();
		this.event_id = event_id;
	}
	
	//add event
	public Event(String event_name, String location, String duration, String overview, String difficulty_level,
			String thing_to_carry, String pickup_location, String drop_location, String inclusion, String exclusion,
			String safety_guideline, String rulebook, String cancellation_policy, Date datetime, Date pickup_time,
			Date drop_time, double price, int total_seat, Category category_id, Organizer organizer_id) {
		super();
		this.event_name = event_name;
		this.location = location;
		this.duration = duration;
		this.overview = overview;
		this.difficulty_level = difficulty_level;
		this.thing_to_carry = thing_to_carry;
		this.pickup_location = pickup_location;
		this.drop_location = drop_location;
		this.inclusion = inclusion;
		this.exclusion = exclusion;
		this.safety_guideline = safety_guideline;
		this.rulebook = rulebook;
		this.cancellation_policy = cancellation_policy;
		this.datetime = datetime;
		this.pickup_time = pickup_time;
		this.drop_time = drop_time;
		this.price = price;
		this.total_seat = total_seat;
		this.category_id = category_id;
		this.organizer_id = organizer_id;
	}


	public int getEvent_id() {
		return event_id;
	}

	public void setEvent_id(int event_id) {
		this.event_id = event_id;
	}

	public String getEvent_name() {
		return event_name;
	}

	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getDifficulty_level() {
		return difficulty_level;
	}

	public void setDifficulty_level(String difficulty_level) {
		this.difficulty_level = difficulty_level;
	}

	public String getThing_to_carry() {
		return thing_to_carry;
	}

	public void setThing_to_carry(String thing_to_carry) {
		this.thing_to_carry = thing_to_carry;
	}

	public String getPickup_location() {
		return pickup_location;
	}

	public void setPickup_location(String pickup_location) {
		this.pickup_location = pickup_location;
	}

	public String getDrop_location() {
		return drop_location;
	}

	public void setDrop_location(String drop_location) {
		this.drop_location = drop_location;
	}

	public String getInclusion() {
		return inclusion;
	}

	public void setInclusion(String inclusion) {
		this.inclusion = inclusion;
	}

	public String getExclusion() {
		return exclusion;
	}

	public void setExclusion(String exclusion) {
		this.exclusion = exclusion;
	}

	public String getSafety_guideline() {
		return safety_guideline;
	}

	public void setSafety_guideline(String safety_guideline) {
		this.safety_guideline = safety_guideline;
	}

	public String getRulebook() {
		return rulebook;
	}

	public void setRulebook(String rulebook) {
		this.rulebook = rulebook;
	}

	public String getCancellation_policy() {
		return cancellation_policy;
	}

	public void setCancellation_policy(String cancellation_policy) {
		this.cancellation_policy = cancellation_policy;
	}

	public Date getDatetime() {
		return datetime;
	}

	public void setDatetime(Date datetime) {
		this.datetime = datetime;
	}

	public Date getPickup_time() {
		return pickup_time;
	}

	public void setPickup_time(Date pickup_time) {
		this.pickup_time = pickup_time;
	}

	public Date getDrop_time() {
		return drop_time;
	}

	public void setDrop_time(Date drop_time) {
		this.drop_time = drop_time;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}


	public byte[] getRoutemap() {
		return routemap;
	}

	public void setRoutemap(byte[] routemap) {
		this.routemap = routemap;
	}

	public int getTotal_seat() {
		return total_seat;
	}

	public void setTotal_seat(int total_seat) {
		this.total_seat = total_seat;
	}

	public Category getCategory_id() {
		return category_id;
	}

	public void setCategory_id(Category category_id) {
		this.category_id = category_id;
	}

	public Organizer getOrganizer_id() {
		return organizer_id;
	}

	public void setOrganizer_id(Organizer organizer_id) {
		this.organizer_id = organizer_id;
	}

	@Override
	public String toString() {
		return "Event [event_id=" + event_id + ", event_name=" + event_name + ", location=" + location + ", duration="
				+ duration + ", overview=" + overview + ", difficulty_level=" + difficulty_level + ", thing_to_carry="
				+ thing_to_carry + ", pickup_location=" + pickup_location + ", drop_location=" + drop_location
				+ ", inclusion=" + inclusion + ", exclusion=" + exclusion + ", safety_guideline=" + safety_guideline
				+ ", rulebook=" + rulebook + ", cancellation_policy=" + cancellation_policy + ", datetime=" + datetime
				+ ", pickup_time=" + pickup_time + ", drop_time=" + drop_time + ", price=" + price + /*", routemap="
				+ routemap + */", total_seat=" + total_seat + ", category_id=" + category_id + ", organizer_id="
				+ organizer_id + "]";
	}

	
	
	
	
}