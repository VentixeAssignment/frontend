import React, { useEffect, useState } from 'react'
import { PiCalendarDot,
        PiTicket
        } from "react-icons/pi";

import { LuDollarSign } from "react-icons/lu";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';





const EventCard = () => {

const [events, setEvents] = useState([]);
const navigate = useNavigate();
useEffect(() => {
    fetchEvents();
}, [])


const fetchEvents = async () => {
    try {
        const response = await fetch('https://localhost:7157/api/events');

        if(!response.ok) {
            console.error("Something went wrong connection to api to fetch events:", response.statusText);
        }

        const data = await response.json();

        if(data && data.length > 0) {
            console.log("Events fetched successfully:", data);
            setEvents(data);
        }
        else {
            console.warn("No events found or data is empty.");
        }
    }
    catch (error) {
        console.error("Error fetching events:", error);
    }
}

const handleClick = (id) => {
    navigate(`event-details/${id}`);
}

  return (
    <ul className="event-list">
        {events.length === 0 
            ? 
                <li className="no-events">
                    <p>No events available at the moment. Please come back later!</p>
                </li>
            
            : events.map(event => {
                const date = new Date(event.start);
                const formattedDate = date.toLocaleDateString('sv-SE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                const formattedTime = date.toLocaleTimeString('sv-SE', {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                return (
                <li className="event-list-item" key={event.id} onClick={() => handleClick(event.id)}>            
                    <div className="event-card">    
                        <img src={`https://localhost:7157${event.eventImageUrl}`} className="event-img-mini" alt={event.eventName} />
                        
                        <div className="event-info">
                            <span className="event-category">{event.categories.map(category => category.categoryName)}</span>
                            <h3 className="event-title">{event.eventName}</h3>
                            <p className="event-description">{event.description}</p>
                        </div>

                        <div className="event-location">
                            <div className="event-location-details">
                                <FiMapPin size="16px" color="#C3C3C4" />
                                <span className="event-location">{event.venue}, {event.city}, {event.country}</span>
                            </div>

                            <div className="event-date-details">
                                <PiCalendarDot size="16px" color="#C3C3C4" />
                                <span className="event-date">{`${formattedDate} - ${formattedTime}`}</span>
                            </div>
                        </div>

                        <div className="event-tickets">
                            <span className="ticket">
                                <PiTicket size="27px" color="#F26CF9"/>
                            </span>
                            <div className="ticket-status">
                                <span className="tickets-left">{event.seatsLeft}</span>
                                <span>Tickets Left</span>
                            </div>
                            <span className="event-price">
                                <LuDollarSign size="18px" color="#F26CF9" style={{ strokeWidth: 3 }} />
                                {event.price}
                            </span>
                        </div>
                    </div>
                </li>
            )})
        }

        


        
    </ul>
  )
}

export default EventCard
