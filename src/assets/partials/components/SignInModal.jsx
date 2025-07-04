import React, { useEffect, useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useAuth } from '../../../AuthProvider';



const SignInModal = ({ dialogRef }) => {
    
    const accountApiUrl = import.meta.env.VITE_ACCOUNT_API_URL;
    const authApiUrl = import.meta.env.VITE_AUTH_API_URL;
    
    const { setIsLoggedIn } = useAuth();
    
    // AuthStep is used to determine which step of the authentication process we are in instead of using multiple booleans. 
    // Suggested by ChatGPT.
    const [authStep, setAuthStep] = useState("signin");

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        userName: "", 
        email: "",
        phoneNumber: "",
        streetAddress: "",
        postalCode: "",
        city: "",
        dateOfBirth: "",
        password: "",
        confirmPassword: "",
        termsAndConditions: false
    });
    const [verification, setVerification] = useState({
        email: "",
        code: ""
    });

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
            setForm(prev => ({...prev, dateOfBirth: formattedDate}));
        }
    }, [year, month, day]);

// Handles the sign in submit
    const handleSignIn = (e) => {
        e.preventDefault();
        const { userName, password } = form;

        if (!userName || !password) {
            alert("Please fill in all fields.");
            return;
        }

        fetch(`${authApiUrl}/api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName, password })
        })
        .then(response => response.json())
        .then(data => {
            console.log(typeof data.success, data.success);
            if (data.success) {
                if(data.token) {
                    localStorage.setItem("authToken", data.token);
                    console.log("Token saved to localStorage:", data.token);
                }

                setIsLoggedIn(true);
                setForm({
                    firstName: "",
                    lastName: "",
                    userName: "", 
                    email: "",
                    phoneNumber: "",
                    streetAddress: "",
                    postalCode: "",
                    city: "",
                    dateOfBirth: "",
                    password: "",
                    confirmPassword: "",
                    termsAndConditions: false
                });
                dialogRef?.current?.close();
            } else {
                alert(data.message || "Sign In failed. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error during sign in:", error);
            alert("An error occurred. Please try again later.");
            setForm({
                firstName: "",
                lastName: "",
                userName: "", 
                email: "",
                phoneNumber: "",
                streetAddress: "",
                postalCode: "",
                city: "",
                dateOfBirth: "",
                password: "",
                confirmPassword: "",
                termsAndConditions: false
            });
            dialogRef?.current?.close();
        });
    }

// Handles the sign up submit
    const handleSignUp = (e) => {
        e.preventDefault();
        console.log("handleSignUp called with form:", form);
        const { 
            firstName, 
            lastName, 
            email, phoneNumber, 
            streetAddress, 
            postalCode, 
            city, 
            dateOfBirth, 
            password, 
            confirmPassword, 
            termsAndConditions } = form;

        if (!firstName || !lastName || !email || !phoneNumber || !streetAddress || !postalCode || !city || !dateOfBirth || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (!termsAndConditions) {
            alert("You must accept the terms and conditions.");
            return;
        }
        console.log("Starting fetch.", Array.from(form));

        fetch(`${accountApiUrl}/api/account/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phoneNumber,
                streetAddress,
                postalCode,
                city,
                dateOfBirth,
                password,
                confirmPassword,
                termsAndConditions
            })
        })
        .then(async response => {
            const data = await response.json()

            console.log("Response received:", data);
            if (!response.ok) {
                console.error("Response not ok:", data);
                alert(data.message || "Sign Up failed. Please try again.");
                return;
            }
            return data;
        })
        .then(data => {
            // console.log(typeof data.success, data.success);
            if (data.success) {
                setAuthStep("verify");
                setVerification({ email, code: "" });
                setForm({
                    firstName: "",
                    lastName: "",
                    userName: "", 
                    email: "",
                    phoneNumber: "",
                    streetAddress: "",
                    postalCode: "",
                    city: "",
                    dateOfBirth: "",
                    password: "",
                    confirmPassword: "",
                    termsAndConditions: false
                });
            } else {
                alert(data.message || "Sign Up failed. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error during sign up:", error);
            alert("An error occurred. Please try again later.");
            setForm({
                firstName: "",
                lastName: "",
                userName: "", 
                email: "",
                phoneNumber: "",
                streetAddress: "",
                postalCode: "",
                city: "",
                dateOfBirth: "",
                password: "",
                confirmPassword: "",
                termsAndConditions: false
            });
            dialogRef?.current?.close();
        });
    }

// Verify account after sign up
    const handleVerifyAccount = (e) => {
        e.preventDefault();
        console.log("handleVerifyAccount called with verification:", verification);

        const { email, code } = verification;
        if (!code) {
            alert("Please enter the verification code.");
            return;
        }

        fetch(`${accountApiUrl}/api/account/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, code })
        })
        .then(async response => {
            const data = await response.json()

            console.log("Response received:", data);
            if (!response.ok) {
                console.error("Response not ok:", data);
                alert(data.message || "Verification failed.");
                return;
            }
            return data;
        })
        .then(data => {
            if (data.success) {  
                setAuthStep("signin");
                alert("Account successfully verified! You can now sign in.");
            } else {
                alert(data.message || "Verification failed. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error during verification:", error);
            alert("An error occurred. Please try again later.");
            setVerification({ email: "", code: "" });
            dialogRef?.current?.close();
        });
    };


    const handleClose = () => {
        dialogRef?.current?.close();
    };

  return (
    <>    
        <dialog ref={dialogRef} className="modal">
            <div className="modal-content">
                <div className="header-modal">
                    <h2>
                        {authStep === "signin" ? "Sign In" 
                            : authStep === "signup" ? "Sign Up" 
                            : "Verify Account"}
                    </h2>
                    <button className="btn-close" onClick={handleClose}>
                        <FaXmark size="20px" color="#ffffff" />
                    </button>
                </div>
                <div className="modal-form">



                    {/* <form className="form" onSubmit={!isSignUp ? handleSignUp : handleSignIn} noValidate> */}

                    <form className="form" onSubmit={
                        authStep === "signin" ? handleSignIn
                        : authStep === "signup" ? handleSignUp
                        : handleVerifyAccount}
                     noValidate>
                        {authStep === "signin" 
                            ? (                                
                                <>
                                    <div className="form-group">
                                        <label htmlFor="userName">Email</label>
                                        <input type="email" id="userName" value={form.userName} name="userName" className="input"
                                            onChange={(e) => setForm({...form, userName: e.target.value})} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" value={form.password} name="password" className="input" 
                                            onChange={(e) => setForm({...form, password: e.target.value})}required />
                                    </div>
                                    <button type="submit" className="btn-signin-submit">Sign In</button>
                                
                                </>
                            )
                            : authStep === "signup" ? (
                                <> 
                                    <div className="form-group-multi">
                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text" value={form.firstName}id="firstName" name="firstName" className="input" 
                                                onChange={(e) => setForm({...form, firstName: e.target.value})}required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text" value={form.lastName} id="lastName" name="lastName" className="input" 
                                                onChange={(e) => setForm({...form, lastName: e.target.value})}required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" value={form.email} id="email" name="email" className="input" 
                                            onChange={(e) => setForm({...form, email: e.target.value})}required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input type="text" value={form.phoneNumber} id="phoneNumber" name="phoneNumber" className="input" 
                                            onChange={(e) => setForm({...form, phoneNumber: e.target.value})} required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="streetAddress">Street Address</label>
                                        <input type="text" value={form.streetAddress} id="streetAddress" name="streetAddress" className="input"
                                            onChange={(e) => setForm({...form, streetAddress: e.target.value})} required />
                                    </div>

                                    <div className="form-group-multi">
                                        <div className="form-group">
                                            <label htmlFor="postalCode">Postal Code</label>
                                            <input type="text" value={form.postalCode} id="postalCode" name="postalCode" className="input"
                                                onChange={(e) => setForm({...form, postalCode: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city">City</label>
                                            <input type="text" value={form.city} id="city" name="city" className="input" 
                                                onChange={(e) => setForm({...form, city: e.target.value})} required />
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
                                            <input type="password" value={form.password} id="password" name="password" className="input" 
                                                onChange={(e) => setForm({...form, password: e.target.value})} required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <input type="password" value={form.confirmPassword} id="confirmPassword" name="confirmPassword" className="input" 
                                                onChange={(e) => setForm({...form, confirmPassword: e.target.value})} required />
                                        </div>
                                    </div>                                                

                                    <label className="form-group-terms" htmlFor="terms">
                                        <input type="checkbox" id="terms" name="terms" checked={form.termsAndConditions} 
                                            onChange={(e) => setForm({...form, termsAndConditions: e.target.checked})} required />
                                        <span className="checkmark">
                                            <IoCheckmarkSharp size="23px" color="#ffffff" />
                                        </span>
                                        <span>I accept the </span>
                                        <p>Terms and Conditions</p>
                                    </label>
                                    <button type="submit" className="btn-signup-submit">Sign Up</button>
                                </> 
                            )
                            : authStep === "verify" && (
                                <>
                                    <p className="success">Account successfully created!</p>
                                    <div className="form-group">
                                        <label htmlFor="code">Verification Code</label>
                                        <input type="text" id="code" value={verification.code} name="code" className="input"
                                            onChange={(e) => setVerification({...verification, code: e.target.value})} required />
                                    </div>
                                    <button type="submit" className="btn-signin-submit">Verify</button>
                                </>
                            )
                        }
                    </form>
                </div>
                
                {(authStep === "signin" || authStep === "signup") && (
                    <small>
                        {authStep === "signin" ? "Don't have an account?" : "Already have an account?"} 
                        <button type="button" className="btn-signup" 
                            onClick={authStep === "signin" ? () => setAuthStep("signup") : () => setAuthStep("signin")}>
                            
                            {authStep === "signin" ? "Sign Up" : "Sign In"}
                        </button>
                    </small>    
                )}
            </div>
        </dialog>
    </>
  )
}

export default SignInModal