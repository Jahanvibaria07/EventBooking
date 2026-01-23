package services;

import daos.BookingDao;
import daos.EventDao;
import entities.Booking;
import entities.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingServiceImpl implements BookingService{
     @Autowired
    private final BookingDao bookingDao;
     @Autowired
    private final EventDao eventDao;

    public BookingServiceImpl(BookingDao bookingDao, EventDao eventDao) {
        this.bookingDao = bookingDao;
        this.eventDao = eventDao;
    }

    @Override
    public Booking bookTicket(Booking booking) {
        Event event = eventDao.findById(booking.getEventId()).orElseThrow();

        event.setAvailableSeats(
                event.getAvailableSeats() - booking.getSeats()
        );
        eventDao.save(event);

        booking.setTotalAmount(
                booking.getSeats() * event.getPrice()
        );

        booking.setStatus("CONFIRMED");  // 👈 STRING STATUS

        return bookingDao.save(booking);
    }
}
