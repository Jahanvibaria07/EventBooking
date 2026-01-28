package com.events.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.events.repository.*;
import com.events.model.*;
import java.time.LocalDateTime;

@Service
public class BookingService {

    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;

    public BookingService(EventRepository eventRepository, BookingRepository bookingRepository) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
    }

    @Transactional
    public Booking bookTicket(Long eventId, String email, int seats) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getAvailableSeats() < seats) {
            throw new RuntimeException("Not enough seats available");
        }

        event.setAvailableSeats(event.getAvailableSeats() - seats);

        Booking booking = new Booking();
        booking.setUserEmail(email);
        booking.setSeatsBooked(seats);
        booking.setEvent(event);
        booking.setBookingTime(LocalDateTime.now());

        eventRepository.save(event);
        return bookingRepository.save(booking);
    }
}
