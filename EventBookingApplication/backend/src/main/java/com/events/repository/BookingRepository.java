package com.eventbooking.repository;

import com.eventbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Ready for future queries:
    // List<Booking> findByUserName(String userName);
    // List<Booking> findByEventId(Long eventId);
}

