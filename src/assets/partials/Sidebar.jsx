import React from 'react'
import { GoCheckbox } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";

import { BsGrid, 
        BsStar,     
        } from "react-icons/bs";

import { PiInvoice, 
        PiEnvelopeOpenLight,
        PiCalendarDots,
        PiTicket,
        PiCurrencyCircleDollar ,
        PiImages,
        } from "react-icons/pi";
import { NavLink } from 'react-router-dom';


        
const Sidebar = () => {
  return (
    <aside className="sidebar">
        <div className="ventixe-logo">
            <img src="/src/assets/images/ventixe-logo.svg" alt="Ventixe logo" className="logo" />
            <span className="logo-text">Ventixe</span>
        </div>
        
        <nav className="menu">
            <ul >
                {/* <li className="menu-group">
                    <BsGrid size="19" color="#37437D"/>
                    <a href="#" className="menu-item">Dashboard</a>
                </li> */}
                <li className="menu-group">
                    <PiTicket size="20" color="#37437D"/>
                    <NavLink to="/" className="menu-item">
                        Events
                    </NavLink>
                </li>
                <li className="menu-group">
                    <GoCheckbox size="19" color="#37437D"/>
                    <NavLink to="/" className="menu-item">
                        Bookings
                    </NavLink>
                </li>
                {/* <li className="menu-group">
                    <PiInvoice size="21" color="#37437D"/>
                    <a href="#" className="menu-item">Invoice</a>
                </li>
                <li className="menu-group">
                    <PiEnvelopeOpenLight size="21" color="#37437D"/>
                    <a href="#" className="menu-item">Inbox</a>
                </li>
                <li className="menu-group">
                    <PiCalendarDots size="20" color="#37437D"/>
                    <a href="#" className="menu-item">Calendar</a>
                </li> */}
                {/* <li className="menu-group">
                    <PiCurrencyCircleDollar size="21" color="#37437D"/>
                    <a href="#" className="menu-item">Financials</a>
                </li>
                <li className="menu-group">
                    <PiImages size="20" color="#37437D"/>
                    <a href="#" className="menu-item">Gallery</a>
                </li>
                <li className="menu-group">
                    <BsStar size="20" color="#37437D"/>
                    <a href="#" className="menu-item">Feedback</a>
                </li> */}
            </ul>
        </nav>

        <button type="button" className="btn-signout">
            <IoLogOutOutline size="20" color="#37437D" /> 
            <p className="btn-signout-text">Sign Out</p>
        </button>
    </aside>
  )
}

export default Sidebar
