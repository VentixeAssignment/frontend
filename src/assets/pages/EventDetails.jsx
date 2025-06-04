import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BookingModal from '../partials/components/BookingModal';

import { PiCalendarDot } from "react-icons/pi";
import { FiMapPin } from "react-icons/fi";
import { LuDollarSign } from "react-icons/lu";



const EventDetails = () => {

  const apiUrl = import.meta.env.VITE_EVENT_API_URL;


  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);  

  useEffect(() => {
    const fetchEventDetails = async (eventId) => {
      try 
      {
        const response = await fetch(`${apiUrl}/api/events/event${eventId}`);
        if (!response.ok) {
          console.error("Failed to fetch event details:", response.statusText);
          return;
        }
        
        const data = await response.json();
        console.log("Event details fetched successfully:", data);
        setEvent(data.data);
      } 
      catch (error) 
      {
        console.error("Error fetching event details:", error);
      }
    }

    fetchEventDetails(id);
  }, [id]);

  let formattedStartDate = '';
  let formattedStartTime = '';
  let formattedEndDate = '';
  let formattedEndTime = '';

  if (event) {
    const startDate = new Date(event.start);
    formattedStartDate = startDate.toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    formattedStartTime = startDate.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const endDate = new Date(event.end);
    formattedEndDate = endDate.toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    formattedEndTime = endDate.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }




  return (
    <>
      

      <div className="main-container">
        <div className="event-details-content">        

        { event 
          ? (
            <div className="head-content"> 
              <img className="event-image-large" src={`${eventAzureUrl}${event.eventImageUrl}`} />

              <div className="event-details">
                <h2>{event.eventName}</h2>

                <div className="specifics">
                  <span className="details">
                    <FiMapPin size="16px" color="#C3C3C4" />
                    <span className="event-date">{formattedStartDate} kl {formattedStartTime} - {formattedEndDate} kl {formattedEndTime}</span>
                  </span>

                  <span className="details">
                    <PiCalendarDot size="16px" color="#C3C3C4" />
                    <span className="event-seats">{event.venue}, {event.city}, {event.country}</span>
                  </span>
                </div>

                <div className="seat-details">
                  <p className="event-seats">Seats left</p>
                  <h3>{event.seatsLeft}</h3>
                </div>

                <div className="price-details">
                  <p className="event-date">Price per seat</p>
                  <span className="price">
                    <LuDollarSign size="23px" color="#F26CF9" style={{ strokeWidth: 3 }} />
                    {event.price}
                  </span>
                </div>
              </div>

              <div className="line"></div>

              <div className="about">
                <h5 className="about-title">About {event.eventName}</h5>
                <p className="event-description">
                    {event.description}
                </p>
                
                {(event.seatsLeft <= 0) ? (
                  <button type="button" className="btn-booking disabled" disabled onClick={() => setOpenModal(true)}>Book Now</button>
                ) : (
                  <button type="button" className="btn-booking" onClick={() => setOpenModal(true)}>Book now</button>
                )}

              
              </div>    
              
            </div>
          )
        : ( <h3>Loading events...</h3> )}

          <section className="terms-and-conditions">
            <h3>Terms & Conditions</h3>

            <ol>
              <li>
                <h6>Registration and Payment</h6>
                <ul className="terms-list">
                  <li className="term-items">All bookings are subject to availability.</li>
                  <li className="term-items">Payment must be made in full at the time of booking unless otherwise stated.</li>
                  <li className="term-items">We reserve the right to cancel or refuse any booking at our discretion.</li>
                </ul>
              </li>

              <li>
                <h6>Ticket Transfer and Resale</h6>
                <ul className="terms-list">
                  <li className="term-items">Tickets are non-transferable unless explicitly permitted.</li>
                  <li className="term-items">Reselling tickets for a higher price than the original purchase price is prohibited.</li>
                </ul>
              </li>

              <li>
                <h6>Cancellations and Refunds</h6>
                <ul className="terms-list">
                  <li className="term-items">Cancellations made by the attendee may be subject to cancellation fees.</li>
                  <li className="term-items">Refund policies vary per event and will be clearly stated during the booking process.</li>
                  <li className="term-items">If the event is canceled by the organizer, registered attendees will receive a full refund or a voucher for a future event.</li>
                </ul>
              </li>

              <li>
                <h6>Event Changes</h6>
                <ul className="terms-list">
                  <li className="term-items">The organizer reserves the right to change the event date, time, or venue.</li>
                  <li className="term-items">Registered attendees will be notified promptly of any changes.</li>
                </ul>
              </li>

              <li>
                <h6>Conduct and Liability</h6>
                <ul className="terms-list">
                  <li className="term-items">Attendees must behave respectfully and comply with all event rules and regulations.</li>
                  <li className="term-items">The organizer is not responsible for any personal injury, loss, or damage to personal property during the event.</li>
                </ul>
              </li>

              <li>
                <h6>Data Privacy</h6>
                <ul className="terms-list">
                  <li className="term-items">Personal information collected during registration will be used according to our Privacy Policy and solely for event-related purposes.</li>
                </ul>
              </li>

              <li>
                <h6>Photography and Recording</h6>
                <ul className="terms-list">
                  <li className="term-items">The event may be recorded or photographed for promotional use.</li>
                  <li className="term-items">By attending, you consent to your image being used in such materials unless you inform us otherwise.</li>
                </ul>
              </li>
            </ol>
          </section>


        </div>
      </div>
      <BookingModal 
        isOpen = {openModal}
        onClose = {() => setOpenModal(false)}
        eventId = {id}
        eventName = {event ? event.eventName : 'Loading...'}
        eventPrice = {event ? event.price : 'Loading...'}
        eventImageUrl = {event ? `${apiUrl}${event.eventImageUrl}` : '#'}
        eventVenue = {event ? event.venue : 'Loading...'}
        eventDate = {event ? formattedStartDate : 'Loading...'}
        eventTime = {event ? formattedStartTime : 'Loading...'}
        />
    </>
  )
}

export default EventDetails
