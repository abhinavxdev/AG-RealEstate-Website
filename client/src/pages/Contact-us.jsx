import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layouts/layout";
import toast from "react-hot-toast";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8050/api/contact/contact-us",
        formData
      );
      if (res?.data?.success) {
        toast.success("Your message has been sent successfully!");
        setFormData({ name: "", email: "", number: "", message: "" });
      } else {
        toast.error(res?.data?.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout title={"Contact Us"}>
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}
      >
        <div className="row justify-content-center">
          {/* Heading */}
          <div className="col-12 text-center mb-4">
            <h1 className="display-5 fw-bold" style={{ color: "#494a53" }}>
              Contact Us
            </h1>
            <p className="text-muted">
              We’d love to hear from you. Fill out the form or use the
              information below to get in touch.
            </p>
          </div>

          {/* Contact Information */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
            <div className="card shadow-lg p-4 border-0 h-100">
              <h4
                className="text-center text-white py-2"
                style={{ backgroundColor: "#494a53", borderRadius: "4px" }}
              >
                Contact Information
              </h4>
              <div className="card-body text-center">
                <p>
                  <i
                    className="fa-solid fa-location-dot me-2"
                    style={{ color: "#bc986b" }}
                  ></i>
                  <strong>Office:</strong> 123, Sunview Apartment, Sector 11
                  Dwarka, New Delhi - 110075
                </p>
                <p>
                  <i
                    className="fa-solid fa-envelope me-2"
                    style={{ color: "#bc986b" }}
                  ></i>
                  <strong>Email:</strong>{" "}
                  <Link
                    to="mailto:mail.agrealtors@gmail.com"
                    className="text-decoration-none"
                  >
                    mail.agrealtors@gmail.com
                  </Link>
                </p>
                <p>
                  <i
                    className="fa-solid fa-phone me-2"
                    style={{ color: "#bc986b" }}
                  ></i>
                  <strong>Phone:</strong>{" "}
                  <Link to="tel:+919717616777" className="text-decoration-none">
                    +91 9717-616-777
                  </Link>
                </p>
                {/* Google Map */}
                <div className="mt-3">
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.01397837441!2d77.04068353092038!3d28.592171130798466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1bc2ab4cb0ed%3A0x57ecce572fe72f9!2sAG%20Realtors!5e0!3m2!1sen!2sin!4v1735844213601!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
            <div className="card shadow-lg p-4 border-0 h-100">
              <h4
                className="text-center text-white py-2"
                style={{ backgroundColor: "#494a53", borderRadius: "4px" }}
              >
                Send Us a Message
              </h4>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="number" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      className="form-control"
                      id="number"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control"
                      id="message"
                      rows="4"
                      placeholder="Write your message here"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn text-white w-100"
                    style={{ backgroundColor: "#bc986b" }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
