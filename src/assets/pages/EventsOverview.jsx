import React from 'react'
import EventCard from '../partials/components/EventCard'


import { BsSearch } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import { TbChevronDown } from "react-icons/tb";
import { PiCalendarDot } from "react-icons/pi";

const EventsOverview = () => {
  return (
    <main className="main-container events-container">
        <div className="list-header">   
            <div className="search-group">
                <input type="text" className="input" placeholder="Search..." />
                <button type="submit" className="event-search-btn">
                    <BsSearch size="20" color="#37437D"/>
                </button>
            </div>
            <button className="btn-filter">
                <IoFilter size="17px" />
            </button>
            <span className="filter-category">
                All Categories
                <TbChevronDown size="14px" />
            </span>
            <span className="filter-date">
                <PiCalendarDot size="14px" />
                This Month
                <TbChevronDown size="14px" />
            </span>
        </div>

        <EventCard />
    </main>
  )
}

export default EventsOverview
