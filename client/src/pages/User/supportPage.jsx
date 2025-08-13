import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/layout";
import axios from "axios";
import toast from "react-hot-toast";

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8050/api/contact/contact-us",
        { name, email, number, message }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setNumber("");
        setMessage("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title="Support - Contact Us">
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}
      >
        <div className="row justify-content-center">
          {/* Heading */}
          <div className="col-12 text-center mb-4">
            <h1 className="display-5 fw-bold" style={{ color: "#494a53" }}>
              How Can We Help You?
            </h1>
            <p className="text-muted">
              For any queries, feel free to contact us. We are here to help!
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
                  <a
                    href="mailto:mail.agrealtors@gmail.com"
                    className="text-decoration-none"
                  >
                    mail.agrealtors@gmail.com
                  </a>
                </p>
                <p>
                  <i
                    className="fa-solid fa-phone me-2"
                    style={{ color: "#bc986b" }}
                  ></i>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+919717616777" className="text-decoration-none">
                    +91 9717-616-777
                  </a>
                </p>
                {/* Google Map */}
                <div className="mt-5">
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.01397837441!2d77.04068353092038!3d28.592171130798466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1bc2ab4cb0ed%3A0x57ecce572fe72f9!2sAG%20Realtors!5e0!3m2!1sen!2sin!4v1735844213601!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: "4px" }}
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
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="number" className="form-label">
                      Phone Number
                    </label>
                    <input
                      name="number"
                      type="tel"
                      className="form-control"
                      id="number"
                      placeholder="Enter your phone number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      name="message"
                      className="form-control"
                      id="message"
                      rows="4"
                      placeholder="Write your message here"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
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

export default SupportPage;
