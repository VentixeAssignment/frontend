import React, { use, useEffect, useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";



const SignInModal = ({ dialogRef }) => {

    const apiUrl = import.meta.env.VITE_ACCOUNT_API_URL;

    const [isSignUp, setIsSignUp] = useState(true);
    const [terms, setTerms] = useState(false);

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [daysInMonth, setDaysInMonth] = useState([]);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
    const monthNames = [
        { name: "January", value: 1 },
        { name: "February", value: 2 },
        { name: "March", value: 3 },
        { name: "April", value: 4 },
        { name: "May", value: 5 },
        { name: "June", value: 6 },
        { name: "July", value: 7 },
        { name: "August", value: 8 },
        { name: "September", value: 9 },
        { name: "October", value: 10 },
        { name: "November", value: 11 },
        { name: "December", value: 12 }
    ]

    // Controls days of month including leap years. Created with help from ChatGPT.
    useEffect(() => 
    {
        if(!year || !month)
        {
            setDaysInMonth([]);
            return;
        }

        const yearInt = parseInt(year);
        const monthInt = parseInt(month);
        let daysInt = 31;

        if ([4, 6, 9, 11].includes(monthInt)) {
            daysInt = 30;
        }
        else if (monthInt === 2) {
            if ((yearInt % 4 === 0 && yearInt % 100 !== 0) || (yearInt % 400 === 0)) {
                daysInt = 29; 
            } else {
                daysInt = 28;
            }
        }

        const daysArray = Array.from({ length: daysInt }, (_, i) => i + 1);
        setDaysInMonth(daysArray);
    }, [year, month, day]);    


    // Setting the right format for date of birth. Created with help from ChatGPT.
    useEffect(() => {
        if (year && month && day) {
            const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
    }, [year, month, day]);


    const handleSubmit = (e) => {
        e.preventDefault();        

        dialogRef?.current?.close();
    } 

  return (
    <>    
        <dialog ref={dialogRef} className="modal">
            <div className="modal-content">
                <div className="header-modal">
                    <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
                    <button className="btn-close" onClick={() => dialogRef?.current?.close()}>
                        <FaXmark size="20px" color="#ffffff" />
                    </button>
                </div>
                <div className="modal-form">
                    <form className="signin-form" novalidate>
                        {!isSignUp 
                            ? (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" name="email" className="input" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" name="password" className="input" required />
                                    </div>
                                    <button type="submit" className="btn-signin">Sign In</button>
                                </>
                            )
                            : (
                                <>
                                    <div className="form-group-multi">
                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text" id="firstName" name="firstName" className="input" required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text" id="lastName" name="lastName" className="input" required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" name="email" className="input" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input type="text" id="phoneNumber" name="phoneNumber" className="input" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="streetAddress">Street Address</label>
                                        <input type="text" id="streetAddress" name="streetAddress" className="input" required />
                                    </div>

                                    <div className="form-group-multi">
                                        <div className="form-group">
                                            <label htmlFor="postalCode">Postal Code</label>
                                            <input type="text" id="postalCode" name="postalCode" className="input" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city">City</label>
                                            <input type="text" id="city" name="city" className="input" required />
                                        </div>
                                    </div>

                                    <div className="form-group-multi">
                                        <div className="form-group">
                                            <label htmlFor="year">Birth Year</label>
                                            <select id="year" name="year" className="input" value={year} onChange={(e) => setYear(e.target.value)} required>
                                                <option value="">Year</option>
                                                {years.map((year) => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="month">Birth Month</label>
                                            <select id="month" name="month" className="input" value={month} onChange={(e) => setMonth(e.target.value)} required>
                                                <option value="">Month</option>
                                                {monthNames.map((month) => (
                                                    <option key={month.value} value={month.value}>{month.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                       
                                        <div className="form-group">
                                            <label htmlFor="day">Birth Day</label>
                                            <select id="day" name="day" className="input" value={day} onChange={(e) => setDay(e.target.value)} required>
                                                <option value="">Day</option>
                                                {daysInMonth.map((day) => (
                                                    <option key={day} value={day}>{String(day).padStart(2, "0")}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group-multi">
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password" name="password" className="input" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input type="password" id="confirmPassword" name="confirmPassword" className="input" required />
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

                                    <button type="submit" className="btn-signup-submit" onClick={handleSubmit}>Sign Up</button>
                                </>
                            )}
                    </form>
                </div>
                
                <small>Don't have an account? 
                    <button className="btn-signup" onClick={() => isSignUp ? setIsSignUp(false) : setIsSignUp(true)}>
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </small>
            </div>
        </dialog>
    </>
  )
}

export default SignInModal