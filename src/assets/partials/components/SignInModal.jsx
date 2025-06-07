import React from 'react'
import { FaXmark } from "react-icons/fa6";


const SignInModal = ({ dialogRef }) => {
  return (
    <>
        <dialog ref={dialogRef} className="modal">
            <div className="header-modal">
                <h2>Sign In</h2>
                <button className="btn-close" onClick={() => dialogRef?.current?.close()}>
                    <FaXmark size="20px" color="#ffffff" />
                </button>
            </div>
            <form className="modal-form" novalidate>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className="input" required />
                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </dialog>
    </>
  )
}

export default SignInModal