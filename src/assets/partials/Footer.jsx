import React from 'react'

import { BsTwitterX } from "react-icons/bs";

import { PiFacebookLogo,
        PiInstagramLogoLight,
        PiYoutubeLogo,
        PiLinkedinLogo 
        } from "react-icons/pi";

        
const Footer = () => {
  return (
    <footer className="footer">
        <span className="copyright">Copyright &copy; 2025 Peterdraw.</span>

        <nav className="footer-nav">
            <ul>
                <li>
                    <a href="#">Privacy Policy</a>
                </li>
                
                <li>
                    <a href="#">Terms and conditions</a>
                </li>

                <li>
                    <a href="#">Contact</a>
                </li>
            </ul>
        </nav>

        <div className="social-media">
            <a href="https://www.facebook.com" target="_blank">
                <PiFacebookLogo size="20" color="#9F9FA1" />
            </a>
            <a href="https://x.com/" target="_blank">
                <BsTwitterX size="18" color="#9F9FA1" />
            </a>
            <a href="#">
                <PiInstagramLogoLight size="20" color="#9F9FA1" />
            </a>
            <a href="https://www.youtube.com" target="_blank">
                <PiYoutubeLogo size="21" color="#9F9FA1" />
            </a>
            <a href="https://www.linkedin.com" target="_blank">
                <PiLinkedinLogo size="20" color="#9F9FA1" />
            </a>
        </div>
    </footer>
  )
}
export default Footer
