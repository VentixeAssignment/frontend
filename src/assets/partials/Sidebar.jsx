import React from 'react'
import { GoCheckbox } from "react-icons/go";
import { IoLogOutOutline,
        IoLogInOutline
        } from "react-icons/io5";

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
import { useAuth } from '../../AuthProvider';


        
const Sidebar = ({ signInClicked }) => {

    const authApiUrl = import.meta.env.VITE_AUTH_API_URL;

    const { isLoggedIn, user, setIsLoggedIn, setUser } = useAuth();

    const handleSignOut = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch(`${authApiUrl}/api/auth/signout`, {
            method: 'POST',     
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(!response.ok) {
            console.error("Failed to sign out");
            return;
        }

        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        setUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            profileImageUrl: "",
            phoneNumber: "",
            streetAddress: "",
            postalCode: "",
            city: "",
            dateOfBirth: ""
        });
    }

  return (
    <aside className="sidebar">
        <NavLink to="/" className="ventixe-logo">
            <img src="/assets/images/ventixe-logo.svg" alt="Ventixe logo" className="logo" />
            <span className="logo-text">Ventixe</span>
        </NavLink>
        
        <nav className="menu">
            <ul >
                {/* <li className="menu-group">
                    <BsGrid size="19" color="#37437D"/>
                    <a href="#" className="menu-item">Dashboard</a>
                </li> */}
                <li className="menu-group">
                    <PiTicket className="menu-item" size="20" />
                    <NavLink to="/" className="menu-item">
                        Events
                    </NavLink>
                </li>
                <li className="menu-group">
                    <GoCheckbox className="menu-item" size="19" />
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

        {isLoggedIn 
        ? (
            <button type="button" className="btn-signout" onClick={ handleSignOut }>
                <IoLogOutOutline size="20" color="#37437D" />
                <p className="btn-signout-text">Sign Out</p>
            </button> 
        )
        : (
            <button type="button" className="btn-signout" onClick={ signInClicked }>
                <IoLogInOutline size="22" color="#37437D" />
                <p className="btn-signin-text">Sign In</p>
            </button>
        )}

        
    </aside>
  )
}

export default Sidebar
