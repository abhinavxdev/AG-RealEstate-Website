import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layouts/layout';

const CareersPage = () => {
  return (
    <Layout title="Careers at AG Realtors">
      <div className="container py-5">
        <h1 className="text-center mb-4">Join Our Team</h1>
        <p className="text-center text-muted mb-5">Explore exciting career opportunities with AG Realtors</p>

        {/* About AG Realtors */}
        <section className="mb-5">
          <h2>About AG Realtors</h2>
          <p>
            At AG Realtors, we are dedicated to providing exceptional real estate services tailored to the unique needs of each client. Our commitment to integrity, professionalism, and excellence has established us as a trusted leader in the real estate industry.
          </p>
        </section>

        {/* Why Work With Us */}
        <section className="mb-5">
          <h2>Why Work With Us</h2>
          <ul>
            <li>
              <strong>Professional Growth:</strong> We offer continuous learning and development opportunities to help you advance in your career.
            </li>
            <li>
              <strong>Collaborative Environment:</strong> Join a team that values collaboration, innovation, and mutual support.
            </li>
            <li>
              <strong>Competitive Compensation:</strong> We provide attractive salary packages and performance-based incentives.
            </li>
            <li>
              <strong>Community Engagement:</strong> Be part of initiatives that give back to the community and make a positive impact.
            </li>
          </ul>
        </section>

        {/* Current Opportunities */}
        <section className="mb-5">
          <h2>Current Opportunities</h2>
          <p>We are currently seeking passionate professionals for the following positions:</p>
          <ul>
            <li>
              <strong>Real Estate Agent</strong>
              <p>Assist clients in buying, selling, and renting properties, providing expert guidance throughout the process.</p>
            </li>
            <li>
              <strong>Property Manager</strong>
              <p>Oversee the daily operations of residential and commercial properties, ensuring optimal performance and tenant satisfaction.</p>
            </li>
            <li>
              <strong>Marketing Specialist</strong>
              <p>Develop and implement marketing strategies to promote our listings and services effectively.</p>
            </li>
            <li>
              <strong>Administrative Assistant</strong>
              <p>Provide administrative support to our team, ensuring smooth and efficient office operations.</p>
            </li>
          </ul>
        </section>

        {/* How to Apply */}
        <section className="mb-5">
          <h2>How to Apply</h2>
          <p>
            If you are interested in joining our dynamic team, please send your resume and a cover letter to{' '}
            <Link to="mailto:mail.agrealtors@gmail.com" style={{ color: "#bc986b" }}>mail.agrealtors@gmail.com</Link>. In your cover letter, specify the position you are applying for and explain why you would be a great fit for our agency.
          </p>
        </section>

        {/* Equal Opportunity Employer */}
        <section className="mb-5">
          <h2>Equal Opportunity Employer</h2>
          <p>
            AG Realtors is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default CareersPage;
