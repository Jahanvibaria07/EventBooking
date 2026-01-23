package services;

import daos.EventDao;
import entities.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService{
    @Autowired
    private final EventDao eventDao;

    public EventServiceImpl(EventDao eventDao) {
        this.eventDao = eventDao;
    }

    @Override
    public List<Event> findAllEvents() {
        return eventDao.findAll();
    }

    @Override
    public Event addEvent(Event event) {
        return eventDao.save(event);
    }
}
