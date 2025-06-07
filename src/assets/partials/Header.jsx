import React from 'react'
import { BsSearch } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { PiBell } from "react-icons/pi";
import { useLocation } from 'react-router-dom';

const Header = () => {

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
            <p>Hello Orlando, welcome back!</p>
        </div>
        <div className="header-search">
            <input type="text" className="input" placeholder="Search..." />
            <button type="submit" className="head-search-btn">
                <BsSearch size="20" color="#37437D"/>
            </button>
        </div>
        <div className="user-container">
            <button type="button" className="btn-notification">
                <PiBell size="22" color="#FFFFFF" />
            </button>
            <button type="button" className="btn-settings">
                <IoSettingsOutline size="22" color="#FFFFFF" />
            </button>
           
            <img src="./src/assets/images/avatar.webp" alt="User Avatar" className="user-avatar" />
            <div className="user-name">
                <strong>Orlando</strong>
                <small>Admin</small>
            </div>
        </div>
    </header>                                                                       
  )
}

export default Header
