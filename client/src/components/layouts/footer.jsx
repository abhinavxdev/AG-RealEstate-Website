import React, { useState } from "react";
import logo from "../images/logo-dark.svg";
import "./layout.css";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:8050/api/newsletter", { email });
      if (data.success) {
        toast.success(data.message);
        setEmail(""); // Reset email input after submission
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer>
      <div className="container-fluid footer-container">
        <div className="row">
          {/* Logo and Contact Info */}
          <div className="col-12 col-lg-5 px-5 py-4">
            <div className="foot-logo">
              <img className="w-75" src={logo} alt="AG Realtors Logo" />
            </div>
            <p className="text-light">
              <span className="fs-5">AG Realtors:</span> Your Trusted Real Estate Partner.
            </p>
            <div className="my-2">
              <i className="fa-solid fa-location-dot me-2"></i> 
              Office - 123, Sunview Apartment, Sector 11 Dwarka, New Delhi - 110075.
            </div>
            <div className="my-2">
              <a href="tel:+919717616777" target="_blank" className="footer-link">
                <i className="fa-solid fa-phone me-2"></i>+91 9717-616-777
              </a>
            </div>
            <div className="my-2">
              <a href="mailto:mail.agrealtors@gmail.com" target="_blank" className="footer-link">
                <i className="fa-solid fa-envelope me-2"></i>mail.agrealtors@gmail.com
              </a>
            </div>
            <div>
              <a href="https://wa.me/+917011190976" target="_blank" className="footer-icon">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="https://instagram.com/ag_realtors" target="_blank" className="footer-icon">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@AG-Realtors" target="_blank" className="footer-icon">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="https://www.facebook.com/agrealtorsdwarka" target="_blank" className="footer-icon">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="mailto:mail.agrealtors@gmail.com" target="_blank" className="footer-icon">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-lg-2">
            <h2 className="pt-4 pb-3 text-light">Quick Links</h2>
            <ul className="footer-links">
              <li><NavLink to="/" className="footer-link"><i className="fa-solid fa-angle-right me-2"></i>Home</NavLink></li>
              <li><NavLink to="/about-us" className="footer-link"><i className="fa-solid fa-angle-right me-2"></i>About</NavLink></li>
              <li><NavLink to="/listings" className="footer-link"><i className="fa-solid fa-angle-right me-2"></i>Listings</NavLink></li>
              <li><NavLink to="/career" className="footer-link"><i className="fa-solid fa-angle-right me-2"></i>Career</NavLink></li>
              <li><NavLink to="/terms" className="footer-link"><i className="fa-solid fa-angle-right me-2"></i>Terms</NavLink></li>
              <li><NavLink to="/privacy" className="footer-link"><i className="fa-solid fa-angle-right me-2"></i>Privacy</NavLink></li>
              <li><NavLink to="/contact-us" className="footer-link"><i className="fa-solid fa-angle-right me-2"></i>Contact</NavLink></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="col-12 col-lg-5 pb-4">
            <h2 className="pt-4 pb-3 text-center text-light">Newsletter Signup</h2>
            <p className="opacity-50 text-center text-light">
              Enter your e-mail to get the latest news of AG Realtors
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <input
                className="footer-input"
                placeholder="Your e-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="footer-button mx-0" onClick={handleSubscribe}>
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
