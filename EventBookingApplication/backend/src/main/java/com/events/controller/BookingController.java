package com.eventbooking.controller;

import com.eventbooking.dto.BookingRequest;
import com.eventbooking.model.Booking;
import com.eventbooking.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    /**
     * Book tickets for an event
     * Example: POST /api/bookings
     */
    @PostMapping
    public ResponseEntity<Booking> bookTickets(
            @Valid @RequestBody BookingRequest bookingRequest) {

        Booking booking = bookingService.bookTickets(bookingRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }
}

