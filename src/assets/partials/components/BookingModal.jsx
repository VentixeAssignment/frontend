import React, { useEffect, useRef, useState } from 'react'

import { LuDollarSign } from "react-icons/lu";
import { IoCheckmarkSharp } from "react-icons/io5";
import { PiCalendarDot } from "react-icons/pi";
import { FiMapPin } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";



const BookingModal = ({isOpen, onClose, eventId, eventName, eventPrice, eventImageUrl, eventVenue, eventDate, eventTime }) => {
    
    if(!isOpen) return null;

    const formattedStartDate = eventDate
    ? new Date(eventDate).toLocaleDateString('sv-SE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
    : '';

    const formattedStartTime = eventTime
    ? new Date(eventTime).toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
    })
    : '';

    const modalRef = useRef(null);

    useEffect(() => {
        if(modalRef.current) {
            if(isOpen && !modalRef.current.open) {
                modalRef.current.showModal();
            }
            else if(!isOpen && modalRef.current.open) {
                modalRef.current.close();
            }
        }
    }, [isOpen]);

    const [eventBooking, setEventBooking] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [seats, setSeats] = useState(1);    
    const [terms, setTerms] = useState(false);

    const totalPrice = eventPrice * seats;


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!firstName) {
            // Add required message
            return;
        }
        if (!lastName) {
            // Add required message
            return;
        }
        if (!email) {
            // Add required message
            return;
        }
        if (!terms) {
            // Add required message
            return;
        }

        const booking = {
            eventId,
            customerFirstName: firstName,
            customerLastName: lastName,
            customerEmail: email,
            customerPhone: phone || '',
            seats,
            totalPrice,
            termsAndConditions: terms
        }
        bookEvent(booking);
        isOpen = false;
    } 

    const bookEvent = async (booking) => {
        try {
            console.log("Booking event before post:", booking);
            const response =  await fetch('https://localhost:7084/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(booking)
            });
            if (!response.ok) {
              console.error("Failed to book event:", response.statusText);
              return;
            }
            console.log("Booking event response:", response);
            const data = await response.json();
            console.log("Event booked successfully:", data);
            setEventBooking(data);
        }
        catch (error) {
            console.error("Error booking event:", error);
            return;
        }          
    };


  return (
    <dialog key={eventId} className="modal" ref={modalRef} onClose={onClose}>
        

        {eventBooking  
            ? (
                <div className="booking-confirmation">
                    <h3>Booking Confirmed!</h3>
                    <p>Thank you for booking {eventName}.</p>
                    <p>Your booking details:</p>
                    <ul>
                        <li>
                            <span className="tickets">
                                <p>Name:</p>
                                {firstName} {lastName}
                            </span>
                        </li>
                        <li>
                            <span className="tickets">
                                <p>Email:</p>
                                {email}
                            </span>
                        </li>
                        {phone && 
                        <li>
                            <span className="tickets">
                                <p>Phone number:</p>
                                {phone}
                            </span>
                        </li>}
                        <li>
                            <span className="tickets">
                                <p>Tickets:</p>
                                {seats}
                            </span>
                        </li>
                        <li>
                            <span className="total-price">
                                <p>Total Price:</p> 
                                <LuDollarSign size="12px" color="#F26CF9" style={{ strokeWidth: 3 }} />
                                {totalPrice}
                            </span>
                        </li>
                    </ul>
                    <button type="button" className="btn-return" onClick={onClose}>Close</button>

                </div>
            )
            : (
                <>
                <div className="header-modal">
                    <img src={eventImageUrl} alt={eventName} className="event-img-mini" />
                    <div className="event-details-modal">
                        <h2>{eventName}</h2>
                        
                        <div className="specifics">
                            <span className="details">
                                <FiMapPin size="16px" color="#C3C3C4" style={{marginTop: ".8rem"}} />
                                <span className="event-date">{formattedStartDate} kl {formattedStartTime}</span>
                            </span>

                            <span className="details">
                                <PiCalendarDot size="16px" color="#C3C3C4" style={{marginTop: ".8rem"}} />
                                <span className="event-date">{eventVenue}</span>
                            </span>
                        </div>
                    </div>            
                    <button className="btn-close" onClick={onClose}>
                        <FaXmark size="20px" color="#ffffff" />
                    </button>
                </div>  
                <div className="price-details">
                    <span className="price-per-ticket">
                        <p>Price per Seat:</p> 
                        <LuDollarSign size="19px" color="#F26CF9" style={{ strokeWidth: 3 }} />
                        {eventPrice}
                    </span>
                    <span className="tickets">
                        <p>Tickets:</p>
                        {seats}
                    </span>
                    <span className="total-price">
                        <p>Total Price:</p> 
                        <LuDollarSign size="19px" color="#F26CF9" style={{ strokeWidth: 3 }} />
                        {totalPrice}
                    </span>
                </div>

                <div className="booking-form">
                    <form className="form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group-double">
                        <   div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input className="input" type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input className="input" type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="input" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className="form-group-double">
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input className="input" type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seats">Tickets</label>
                                <select className="input" id="seats" name="seats" value={seats} onChange={(e) => setSeats(Number(e.target.value))} required>
                                    {Array.from({ length: 20 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <label className="form-group-terms" htmlFor="terms">
                            <input type="checkbox" id="terms" name="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} required />
                            <span className="checkmark">
                                <IoCheckmarkSharp size="23px" color="#ffffff" />
                            </span>
                            <span>I accept the </span>
                            <p>Terms and Conditions</p>
                        </label>                

                        <button type="submit" className="btn-submit">Confirm Booking</button>
                    </form>            
                </div>
                </>
            )}
    </dialog>
  )
}

export default BookingModal
