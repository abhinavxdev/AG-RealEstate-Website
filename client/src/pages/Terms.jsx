import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layouts/layout';

const TermsPage = () => {
  return (
    <Layout title="Terms and Conditions - AG Realtors">
      <div className="container py-5">
        <h1 className="text-center mb-4">Terms and Conditions</h1>
        <p className="text-center text-muted mb-5">Effective Date: January 1, 2025</p>

        {/* Introduction */}
        <section className="mb-5">
          <h2>
            <i className="fa-solid fa-file-contract me-3" style={{ color: "#bc986b" }}></i>
            Introduction
          </h2>
          <p>
            Welcome to AG Realtors. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
          </p>
        </section>

        {/* Use of Website */}
        <section className="mb-5">
          <h2>
            <i className="fa-solid fa-user-shield me-3" style={{ color: "#bc986b" }}></i>
            Use of Website
          </h2>
          <p>
            You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of the website.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-5">
          <h2>
            <i className="fa-solid fa-gavel me-3" style={{ color: "#bc986b" }}></i>
            Intellectual Property
          </h2>
          <p>
            All content on this website, including text, graphics, logos, and images, is the property of AG Realtors and is protected by applicable intellectual property laws.
          </p>
        </section>

        {/* Privacy Policy */}
        <section className="mb-5">
          <h2>
            <i className="fa-solid fa-shield-alt me-3" style={{ color: "#bc986b" }}></i>
            Privacy Policy
          </h2>
          <p>
            Your use of our website is also governed by our Privacy Policy. Please review it to understand our practices.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-5">
          <h2>
            <i className="fa-solid fa-handshake me-3" style={{ color: "#bc986b" }}></i>
            Limitation of Liability
          </h2>
          <p>
            AG Realtors shall not be liable for any indirect, incidental, or consequential damages arising out of your use of this website.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-5">
          <h2>
            <i className="fa-solid fa-gavel me-3" style={{ color: "#bc986b" }}></i>
            Governing Law
          </h2>
          <p>
            These terms are governed by the laws of India, and any disputes will be resolved exclusively in the courts of Delhi.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-5">
          <h2>
            <i className="fa-solid fa-file-contract me-3" style={{ color: "#bc986b" }}></i>
            Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Your continued use of the website constitutes acceptance of the updated terms.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2>
            <i className="fa-solid fa-handshake me-3" style={{ color: "#bc986b" }}></i>
            Contact Information
          </h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <ul>
            <li>
              <i className="fa-solid fa-envelope me-2" style={{ color: "#bc986b" }}></i> 
              <Link to="mailto:mail.agrealtors@gmail.com" className="text-decoration-none">
                mail.agrealtors@gmail.com
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-phone me-2" style={{ color: "#bc986b" }}></i> 
              <Link to="tel:+919717616777" className="text-decoration-none">
                +91 9717-616-777
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-map-marker-alt me-2" style={{ color: "#bc986b" }}></i> 
              123, Sunview Apartment, Sector 11, Dwarka, New Delhi - 110075
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default TermsPage;
