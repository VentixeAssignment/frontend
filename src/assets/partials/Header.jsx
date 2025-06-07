import React, { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { PiBell } from "react-icons/pi";
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';

const Header = () => {
    const accountApiUrl = import.meta.env.VITE_ACCOUNT_API_URL;
    const authApiUrl = import.meta.env.VITE_AUTH_API_URL;

    const { isLoggedIn, user } = useAuth();

    const location = useLocation();
    

    const title = (pathname) => {
        switch (pathname) {
            case '/events':
                return 'Events Overview';
            case '/bookings':
                return 'Bookings Overview';
            default:
                return 'Events Overview';
        }
    }


  return (
    <header className="header">
        <div className="header-title">
            <h1>{title(location.pathname)}</h1>
        </div>
        <div className="header-search" style={{ gridColumn: isLoggedIn ? '2' : '2 / 4'  }}>
            <input type="text" className="input" placeholder="Search..." />
            <button type="submit" className="head-search-btn">
                <BsSearch size="20" color="#37437D"/>
            </button>
        </div>
        {isLoggedIn && (
            <div className="user-container">
                <button type="button" className="btn-notification">
                    <PiBell size="22" color="#FFFFFF" />
                </button>
                <button type="button" className="btn-settings">
                    <IoSettingsOutline size="22" color="#FFFFFF" />
                </button>
            
                <img src={`${accountApiUrl}${user.profileImageUrl}`} alt="User profile image." className="user-avatar" />
                <div className="user-name">
                    <strong className="name">{user.firstName} {user.lastName}</strong>
                    <small className="email">{user.email}</small>
                </div>
            </div>
        )}
    </header>                                                                       
  )
}

export default Header
