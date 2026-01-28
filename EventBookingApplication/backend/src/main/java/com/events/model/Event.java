package com.eventbooking.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "events",
        indexes = {
                @Index(name = "idx_event_name", columnList = "name"),
                @Index(name = "idx_event_location", columnList = "location")
        }
)
@Getter
@Setter
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Event name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Location is required")
    @Column(nullable = false)
    private String location;

    @Min(value = 1, message = "Total seats must be at least 1")
    @Column(nullable = false)
    private int totalSeats;

    @Min(value = 0, message = "Available seats cannot be negative")
    @Column(nullable = false)
    private int availableSeats;

    @Version
    private Long version;

    public void reserveSeats(int seats) {
        if (seats <= 0) {
            throw new IllegalArgumentException("Seats to reserve must be positive");
        }
        if (this.availableSeats < seats) {
            throw new IllegalStateException("Not enough seats available");
        }
        this.availableSeats -= seats;
    }
}

