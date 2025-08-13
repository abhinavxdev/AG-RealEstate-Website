import React from "react";
import Layout from "../components/layouts/layout";
// import ownerImage from "../components/images/logo.png"; // Placeholder for the owner's image
import officeImage from "../components/images/ag-realtors-office.jpeg"; // Placeholder for the office image
import avatar1 from "../components/images/avataaars1.png";
import avatar2 from "../components/images/avataaars.png";
import avatar3 from "../components/images/avataaars2.png";

const AboutPage = () => {
    const testimonials = [
        {
            name: "Neha Gupta",
            role: "Marketing Manager",
            message:
                "Working with AG Realtors was an absolute breeze! They helped me find the perfect home within my budget and made the entire process smooth, stress-free, and enjoyable.",
            rating: 5,
            image: avatar1,
        },
        {
            name: "Ravi Kumar",
            role: "Business Owner",
            message:
                "I highly recommend AG Realtors to anyone looking to buy or sell property. Their professionalism, expertise, and attention to detail exceeded my expectations.",
            rating: 5,
            image: avatar2,
        },
        {
            name: "Sneha Sharma",
            role: "Interior Designer",
            message:
                "AG Realtors made selling my property a seamless experience. Their marketing strategies and negotiation skills resulted in a quick sale at a great price. Thank you!",
            rating: 5,
            image: avatar1,
        },
        {
            name: "Ajay Patel",
            role: "IT Professional",
            message:
                "I'm extremely satisfied with the service I received from AG Realtors. They understood my requirements and helped me find my dream home. I couldn't be happier!",
            rating: 5,
            image: avatar3,
        },
        {
            name: "Priya Desai",
            role: "Teacher",
            message:
                "From start to finish, AG Realtors provided excellent support and guidance. They listened to my needs and went above and beyond to find the perfect rental property for me.",
            rating: 5,
            image: avatar1,
        },
        {
            name: "Deepak Joshi",
            role: "Financial Analyst",
            message:
                "Choosing AG Realtors was the best decision I made. Their team is knowledgeable, responsive, and dedicated. I wouldn't hesitate to recommend them.",
            rating: 5,
            image: avatar3,
        },
    ];

    return (
        <Layout title="About Us - AG Realtors">
            <div
                className="container-fluid py-5"
                style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}
            >
                <div className="row justify-content-center">
                    {/* Company Overview */}
                    <div className="col-lg-8 col-md-10 text-center">
                        <h2 className="pt-5 text-dark">Company Overview and History</h2>
                        <p style={{ color: "#bc986b" }} className="pb-3 fs-5">
                            Discover Our Journey and Commitment to Excellence
                        </p>
                    </div>

                    <div className="row align-items-center">
                        {/* Left Column: Content */}
                        <div className="col-lg-8">
                            <h4 className="text-dark mb-3">Company Overview</h4>
                            <p style={{ textAlign: "justify" }}>
                                At <strong>AG Realtors</strong>, we are dedicated to providing
                                exceptional real estate services tailored to the unique needs of
                                each client. With a commitment to integrity, professionalism,
                                and excellence, we strive to exceed expectations and deliver
                                outstanding results in every transaction.
                                <br />
                                <br />
                                Founded in 2008, AG Realtors has established itself as a trusted
                                leader in the real estate industry, serving clients across
                                Dwarka and Dwarka Expressway. Our team of experienced
                                professionals brings a wealth of knowledge and expertise to
                                every client interaction, ensuring a seamless and rewarding
                                experience from start to finish.
                            </p>
                        </div>

                        {/* Right Column: Image */}
                        <div className="col-lg-4 text-center">
                            {/* <img
                                src={ownerImage}
                                alt="Owner of AG Realtors"
                                className="img-fluid rounded shadow"
                                style={{ maxWidth: "80%", height: "auto" }}
                            /> */}
                            <p className="mt-3 text-secondary">Mr. Gagan Jain, Founder</p>
                        </div>
                    </div>

                    <div className="row align-items-center mt-5">
                        {/* Left Column: Image */}
                        <div className="col-lg-4 text-center">
                            <img
                                src={officeImage}
                                alt="AG Realtors Office"
                                className="img-fluid rounded shadow"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                            <p className="mt-3 text-secondary">Our Office</p>
                        </div>

                        {/* Right Column: Content */}
                        <div className="col-lg-8">
                            <h4 className="text-dark mb-3">Company History</h4>
                            <p style={{ textAlign: "justify" }}>
                                AG Realtors was founded by <strong>Mr. Gagan Jain</strong> with
                                a vision to create a real estate agency that prioritizes client
                                satisfaction above all else. Since our inception, we have been
                                guided by a commitment to honesty, transparency, and
                                professionalism in all aspects of our business.
                                <br />
                                <br />
                                Over the years, we have built a reputation for excellence,
                                earning the trust and loyalty of our clients through our
                                dedication to delivering exceptional service and results. From
                                helping first-time homebuyers find their dream home to assisting
                                seasoned investors with strategic property acquisitions, we
                                navigate a wide range of real estate transactions with integrity
                                and expertise.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="row justify-content-center py-5">
                    <div className="col-lg-8 col-md-10 text-center">
                        <h2>Meet Our Team</h2>
                        <p style={{ color: "#bc986b" }} className="pb-3 fs-5">
                            Our Experienced Professionals Are Here to Assist You
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-4 text-center">
                        <i
                            className="fa-solid fa-user-tie fa-3x mb-3"
                            style={{ color: "#bc986b" }}
                        ></i>
                        <h5>Mr. Gagan Jain</h5>
                        <p className="text-secondary">Founder & CEO</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <i
                            className="fa-solid fa-user-tie fa-3x mb-3"
                            style={{ color: "#bc986b" }}
                        ></i>
                        <h5>Mr. Sarthak Jain</h5>
                        <p className="text-secondary">Real Estate Consultant</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <i
                            className="fa-solid fa-user-tie fa-3x mb-3"
                            style={{ color: "#bc986b" }}
                        ></i>
                        <h5>Mr. Aditya Jain</h5>
                        <p className="text-secondary">Property Manager</p>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="container-fluid">
                <div className="row justify-content-center py-5">
                    <div className="col-lg-8 col-md-10 text-center">
                        <h2>Our Core Values</h2>
                        <p style={{ color: "#bc986b" }} className="pb-3 fs-5">
                            What Drives Us to Excel
                        </p>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <i
                                className="fa-solid fa-handshake fa-3x mb-3"
                                style={{ color: "#bc986b" }}
                            ></i>
                            <h5>Integrity</h5>
                            <p className="text-secondary">
                                We uphold the highest standards of honesty and transparency in all
                                our dealings.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <i
                                className="fa-solid fa-chart-line fa-3x mb-3"
                                style={{ color: "#bc986b" }}
                            ></i>
                            <h5>Excellence</h5>
                            <p className="text-secondary">
                                We aim to deliver outstanding results and exceed client
                                expectations in every transaction.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <i
                                className="fa-solid fa-people-group fa-3x mb-3"
                                style={{ color: "#bc986b" }}
                            ></i>
                            <h5>Customer Focus</h5>
                            <p className="text-secondary">
                                Our clients are at the heart of everything we do. Your success is
                                our priority.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="container-fluid" style={{ backgroundColor: "#f4f9fe" }}>
                <h2 className="pt-5 text-center">What Our Clients Say</h2>
                <p className="text-center pb-1 fs-5" style={{ color: "#bc986b" }}>
                    Read What Our Satisfied Clients Have to Say About Their Experience
                    with Us
                </p>
                <div className="row">
                    {testimonials.map((testimonial, index) => (
                        <div className="col-12 col-sm-6 col-lg-4 p-4" key={index}>
                            <div
                                className="p-4 shadow-lg"
                                style={{ backgroundColor: "white", borderRadius: "8px" }}
                            >
                                <div className="d-flex mb-3">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        width="50"
                                        height="50"
                                        className="me-2 rounded-circle"
                                    />
                                    <div>
                                        <h5 className="m-0">{testimonial.name}</h5>
                                        <p className="text-muted">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p style={{ textAlign: "justify", color: "#6c757d" }}>
                                    {testimonial.message}
                                </p>
                                <div className="stars text-warning">
                                    {Array(testimonial.rating)
                                        .fill()
                                        .map((_, i) => (
                                            <i className="fa-solid fa-star" key={i}></i>
                                        ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements Section */}
            <div className="container-fluid">
                <div className="row justify-content-center py-5">
                    <div className="col-lg-8 col-md-10 text-center">
                        <h2>Our Achievements</h2>
                        <p style={{ color: "#bc986b" }} className="pb-3 fs-5">
                            A Legacy of Excellence
                        </p>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <i
                                className="fa-solid fa-award fa-3x mb-3"
                                style={{ color: "#bc986b" }}
                            ></i>
                            <h5>10,000+ Satisfied Clients</h5>
                            <p className="text-secondary">
                                We take pride in the long-lasting relationships we’ve built over
                                the years.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <i
                                className="fa-solid fa-building fa-3x mb-3"
                                style={{ color: "#bc986b" }}
                            ></i>
                            <h5>5,000+ Properties Sold</h5>
                            <p className="text-secondary">
                                Helping clients find their dream homes and lucrative investments.
                            </p>
                        </div>
                        <div className="col-md-4">
                            <i
                                className="fa-solid fa-medal fa-3x mb-3"
                                style={{ color: "#bc986b" }}
                            ></i>
                            <h5>15+ Years of Experience</h5>
                            <p className="text-secondary">
                                A legacy built on trust, expertise, and unmatched service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AboutPage;
