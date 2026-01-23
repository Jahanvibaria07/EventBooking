package services;

import entities.Event;

import java.util.List;

public interface EventService {

    List<Event> findAllEvents();
    Event addEvent(Event event);
}
