import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layouts/layout';

const PrivacyPolicyPage = () => {
  return (
    <Layout title="Privacy Policy - AG Realtors">
      <div className="container py-5">
        <h1 className="text-center mb-4">Privacy Policy</h1>
        <p className="text-center text-muted mb-5">Effective Date: January 1, 2025</p>

        {/* Introduction */}
        <section className="mb-5">
          <h2>
            <i className="fas fa-file-contract me-3" style={{ color: "#bc986b" }}></i>
            Introduction
          </h2>
          <p>
            At AG Realtors, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our website or services.
          </p>
        </section>

        {/* Information Collection */}
        <section className="mb-5">
          <h2>
            <i className="fas fa-user-shield me-3" style={{ color: "#bc986b" }}></i>
            Information We Collect
          </h2>
          <ul>
            <li>Personal details like name, email address, phone number, and address.</li>
            <li>Property preferences or inquiries submitted via our website.</li>
            <li>Browser and usage data through cookies and similar technologies.</li>
          </ul>
        </section>

        {/* Use of Information */}
        <section className="mb-5">
          <h2>
            <i className="fas fa-lock me-3" style={{ color: "#bc986b" }}></i>
            How We Use Your Information
          </h2>
          <p>
            The information collected is used for:
          </p>
          <ul>
            <li>Providing personalized real estate services and recommendations.</li>
            <li>Responding to your inquiries and improving customer experience.</li>
            <li>Sending updates about properties and services you may be interested in.</li>
            <li>Complying with legal requirements and protecting our interests.</li>
          </ul>
        </section>

        {/* Information Protection */}
        <section className="mb-5">
          <h2>
            <i className="fas fa-shield-alt me-3" style={{ color: "#bc986b" }}></i>
            Protection of Your Information
          </h2>
          <p>
            We implement robust data security practices, including encryption and secure servers, to protect your personal information against unauthorized access or misuse.
          </p>
        </section>

        {/* Sharing Personal Information */}
        <section className="mb-5">
          <h2>
            <i className="fas fa-user-secret me-3" style={{ color: "#bc986b" }}></i>
            Sharing Your Personal Information
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to others. Information may be shared with trusted partners to provide services on our behalf or as required by law.
          </p>
        </section>

        {/* Cookie Usage */}
        <section className="mb-5">
          <h2>
            <i className="fas fa-cookie-bite me-3" style={{ color: "#bc986b" }}></i>
            Cookies and Tracking
          </h2>
          <p>
            Our website uses cookies to enhance your browsing experience. You can adjust your browser settings to disable cookies, though this may affect site functionality.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-5">
          <h2>
            <i className="fas fa-user-check me-3" style={{ color: "#bc986b" }}></i>
            Your Rights
          </h2>
          <p>
            You have the right to access, modify, or delete your personal data stored with us. To exercise these rights, please contact us at the details below.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-5">
          <h2>
            <i className="fas fa-envelope me-2" style={{ color: "#bc986b" }}></i>
            Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please get in touch with us:
          </p>
          <ul>
            <li>
              <i className="fas fa-phone me-2" style={{ color: "#bc986b" }}></i>
              Phone: <Link to="tel:+919717616777" className="text-decoration-none">+91 9717-616-777</Link>
            </li>
            <li>
              <i className="fas fa-envelope me-2" style={{ color: "#bc986b" }}></i>
              Email: <Link to="mailto:mail.agrealtors@gmail.com" className="text-decoration-none">mail.agrealtors@gmail.com</Link>
            </li>
            <li>
              <i className="fas fa-map-marker-alt me-2" style={{ color: "#bc986b" }}></i>
              Address: 123, Sunview Apartment, Sector 11 Dwarka, New Delhi - 110075
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
