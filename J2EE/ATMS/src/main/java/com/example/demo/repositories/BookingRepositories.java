package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entities.Booking;
import com.example.demo.entities.Event;
import com.example.demo.entities.Participant;

@Transactional
@Repository
public interface BookingRepositories extends JpaRepository<Booking, Integer> {
	
	//book event
	//save();
	
	//fetch Enrolled Booking
	@Query("select b from Booking b where participant_id = :participant_id and event_id = :event_id")
	public Booking getEnrolledBooking(@Param("participant_id") Participant participant_id,  @Param("event_id") Event event_id);
	
	//getTotalBookings
	@Query("select sum(b.total_enrollment) from Booking b group by b.event_id having event_id =:event_id")
	public int getTotalBookings(@Param("event_id") Event event_id);
	
	//Part-Bookings View
	@Query("select b from Booking b where participant_id = :participant_id")
	public List<Booking> getBookingsByPartid(@Param("participant_id") Participant participant_id);
	
	//Org-Booking View
	@Query("select b from Booking b where event_id = :event_id")
	public List<Booking> getBookingsByEventid(@Param("event_id")Event event_id);
	
}
