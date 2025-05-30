import React from 'react'
import { PiCalendarDot } from "react-icons/pi";
import { FiMapPin } from "react-icons/fi";
import { LuDollarSign } from "react-icons/lu";


const EventDetails = () => {
  return (
    <div className="main-container">
      <div className="event-details-content">        

        <div className="head-content"> 
          <img className="event-image-large" src="src/assets/images/avatar.webp" />

          <div className="event-details">
            <h2>Event Title</h2>

            <div className="specifics">
              <span className="details">
                <FiMapPin size="16px" color="#C3C3C4" />
                <span className="event-date">Datum och tid</span>
              </span>

              <span className="details">
                <PiCalendarDot size="16px" color="#C3C3C4" />
                <span className="event-seats">Location</span>
              </span>
            </div>

            <div className="seat-details">
              <p className="event-seats">Seats left</p>
              <h3>115</h3>
            </div>

            <div className="price-details">
              <p className="event-date">Price per seat</p>
              <span className="price">
                <LuDollarSign size="23px" color="#F26CF9" style={{ strokeWidth: 3 }} />
                60
              </span>
            </div>
          </div>

          <div className="line"></div>

          <div className="about">
            <h5 className="about-title">About Event</h5>
            <p className="event-description">
                This is a brief description of the event. It provides an overview of what attendees can expect.
            </p>
            <button type="button" className="btn-booking">Boka nu</button>
          </div>          
        </div>

        <section class="terms-and-conditions">
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
  )
}

export default EventDetails
