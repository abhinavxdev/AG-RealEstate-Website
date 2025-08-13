import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/layouts/layout";
import slide1 from "../components/images/slide-1.png";
import slide2 from "../components/images/slide-2.png";
import slide3 from "../components/images/slide-3.png";
import aboutImage from "../components/images/about-img.jpg";
import apartment from "../components/images/apartment.jpg";
import farmhouses from "../components/images/farmhouses.jpg";
import duplexes from "../components/images/duplexes.jpg";
import villa from "../components/images/villa.jpg";
import office from "../components/images/office.jpg";
import bungalow from "../components/images/bungalow.jpg";
import avatar1 from "../components/images/avataaars1.png";
import avatar2 from "../components/images/avataaars.png";
import avatar3 from "../components/images/avataaars2.png";
import defaultIMG from "../components/images/default-image.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Blur effect
import "./main.css"

function Home() {
    const navigate = useNavigate();
    const [latestListings, setLatestListings] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const services = [
        {
            icon: "fa-house-circle-check",
            title: "Buying a Home",
            description: "Find your dream home effortlessly with us. Let our experts guide you through the process.",
        },
        {
            icon: "fa-house-flag",
            title: "Selling a Property",
            description: "Sell your property hassle-free. Our team ensures maximum exposure and top value for your property.",
        },
        {
            icon: "fa-house-laptop",
            title: "Property Management",
            description: "Leave property management to us. From tenant screening to maintenance, we handle it all efficiently.",
        },
    ];

    const categories = [
        { name: "Apartment", image: apartment, slug: "apartment" },
        { name: "Farmhouse", image: farmhouses, slug: "farmhouse" },
        { name: "Duplexes", image: duplexes, slug: "duplexes" },
        { name: "Villas", image: villa, slug: "villa" },
        { name: "Office", image: office, slug: "office" },
        { name: "Bungalow", image: bungalow, slug: "bunglow" },
    ];

    const fetchLatestListings = async () => {
        try {
            const { data } = await axios.get("http://localhost:8050/api/listings/latest?limit=6");
            if (data?.success) {
                setLatestListings(data.listings); // Use data.listings
            } else {
                toast.error(data.message || "Failed to fetch latest properties.");
            }
        } catch (error) {
            console.error("Error fetching latest listings:", error.message);
            toast.error("Failed to fetch latest properties.");
        }
    };


    useEffect(() => {
        fetchLatestListings();
    }, []);

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

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");

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

    // Function to sanitize and slice description
    const sanitizeAndSliceDescription = (description, limit) => {
        // Sanitize the entire description
        const sanitizedHTML = DOMPurify.sanitize(description);

        // Create a temporary DOM element to extract plain text
        const tempElement = document.createElement("div");
        tempElement.innerHTML = sanitizedHTML;

        // Extract plain text and slice it
        const plainText = tempElement.textContent || tempElement.innerText || "";
        return plainText.slice(0, limit);
    };

    // Load Wishlist from Local Storage
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    // Toggle Wishlist Function
    const toggleWishlist = (listing) => {
        let updatedWishlist = [...wishlist];

        if (wishlist.some((item) => item._id === listing._id)) {
            // Remove from wishlist
            updatedWishlist = updatedWishlist.filter((item) => item._id !== listing._id);
            toast.success("Removed from Wishlist");
        } else {
            // Add to wishlist
            updatedWishlist.push(listing);
            toast.success("Added to Wishlist");
        }

        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };



    return (
        <Layout title="AG Realtors - Best Real Estate Agency in Dwarka">
            <>
                {/* Slider */}
                <div id="carouselExampleSlidesOnly" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {/* Slide 1 */}
                        <div className="carousel-item active" data-bs-interval="4000">
                            <img src={slide1} className="d-block w-100" alt="Slide 1" />
                            <div className="carousel-caption d-flex flex-column justify-content-center h-100" style={{ top: 0 }}>
                                <p className="h2">Find Your Dream Home</p>
                                <p className="d-none d-sm-flex">
                                    Explore our collection of properties to find the ideal home for you. Whether it's a cozy urban apartment
                                    or a spacious suburban retreat, we have what you're looking for.
                                </p>
                                <button
                                    type="button"
                                    className="btn w-25 align-self-center"
                                    style={{ backgroundColor: "#bc986b", color: "white", minWidth: "120px" }}
                                    onClick={() => navigate("/contact-us")}
                                >
                                    Enquire Now!
                                </button>
                            </div>
                        </div>

                        {/* Slide 2 */}
                        <div className="carousel-item" data-bs-interval="4000">
                            <img src={slide2} className="d-block w-100" alt="Slide 2" />
                            <div className="carousel-caption d-flex flex-column justify-content-center h-100" style={{ top: 0 }}>
                                <p className="h2">Expert Guidance at Every Step</p>
                                <p className="d-none d-sm-flex">
                                    Our experienced agents provide personalized guidance through every stage of your real estate journey,
                                    ensuring smooth transactions and satisfactory outcomes.
                                </p>
                                <button
                                    type="button"
                                    className="btn w-25 align-self-center"
                                    style={{ backgroundColor: "#bc986b", color: "white", minWidth: "120px" }}
                                    onClick={() => navigate("/contact-us")}
                                >
                                    Enquire Now!
                                </button>
                            </div>
                        </div>

                        {/* Slide 3 */}
                        <div className="carousel-item" data-bs-interval="4000">
                            <img src={slide3} className="d-block w-100" alt="Slide 3" />
                            <div className="carousel-caption d-flex flex-column justify-content-center h-100" style={{ top: 0 }}>
                                <p className="h2">Unlock Your Investment Potential</p>
                                <p className="d-none d-sm-flex">
                                    Maximize your investment potential with our comprehensive real estate services. From identifying
                                    opportunities to strategic property management, we help you achieve long-term financial growth.
                                </p>
                                <button
                                    type="button"
                                    className="btn w-25 align-self-center"
                                    style={{ backgroundColor: "#bc986b", color: "white", minWidth: "120px" }}
                                    onClick={() => navigate("/contact-us")}
                                >
                                    Enquire Now!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Us Text Section */}
                <div className="container-fluid" style={{ backgroundColor: "#f0f0f0" }}>
                    <div className="row">
                        <div className="col-12 col-lg-7 px-5">
                            <p style={{ color: "#bc986b" }} className="mt-4 fs-5">
                                We are a leading Real Estate Agency in Delhi NCR
                            </p>
                            <h2 className="my-3">About Us!</h2>
                            <p style={{ color: "#424242", textAlign: "justify" }}>
                                At AG Realtors, we're your trusted guides in the world of real estate. With our expert team and personalized
                                approach, we're here to turn your property dreams into reality. Whether you're buying, selling, renting, or
                                investing, we're committed to providing you with exceptional service, expert advice, and a seamless
                                experience from start to finish. <br />
                                <br />
                                Our mission is simple: to help you find your perfect property and navigate the real estate market with
                                confidence. With integrity, professionalism, and a passion for excellence, we're dedicated to exceeding your
                                expectations and building lasting relationships based on trust and results. <br />
                                <br />
                                Discover the difference of working with a real estate agency that puts your needs first. Get in touch with
                                us today and let's make your real estate goals a reality!
                            </p>
                            <div className="col my-4">
                                <button
                                    type="button"
                                    className="btn me-2"
                                    style={{ backgroundColor: "#bc986b", color: "white", borderRadius: "0px" }}
                                    onClick={() => navigate("/contact-us")}
                                >
                                    <i className="fa-solid fa-phone"></i> REQUEST A CALL
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    style={{ backgroundColor: "white", color: "#bc986b", borderRadius: "0px" }}
                                    onClick={() => navigate("/about-us")}
                                >
                                    ABOUT US
                                </button>
                            </div>
                        </div>

                        {/* About Us Image Section */}
                        <div className="col-5 p-0 d-none d-lg-block">
                            <img src={aboutImage} width="100%" height="100%" alt="About Us" />
                        </div>
                    </div>
                </div>

                {/* Our Services */}
                <div className="container-fluid pb-5">
                    <div className="row">
                        <h2 className="mt-5 px-5">Our Services</h2>
                        <p className="px-5 fs-5" style={{ color: "#bc986b" }}>
                            Discover How We Can Help You Achieve Your Real Estate Goals
                        </p>
                        {services.map((service, index) => (
                            <div
                                className="col-10 col-lg-4 col-xl-3 border border-4 mx-5 my-3 p-5"
                                key={index}
                                style={{ borderColor: "#f3f4f986" }}
                            >
                                <span className="border border-3 p-3 rounded-circle">
                                    <i className={`fa-solid ${service.icon} fs-3`} style={{ color: "#bc986b" }}></i>
                                </span>
                                <p className="fs-5 text-dark mt-4">{service.title}</p>
                                <p style={{ color: "#9a9a9a", textAlign: "justify" }}>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Listings by Categories */}
                <div className="container-fluid pb-4" style={{ backgroundColor: "#f3f8fe" }}>
                    <h2 className="pt-5 text-center">Listings by Categories</h2>
                    <p className="text-center pb-1 fs-5" style={{ color: "#bc986b" }}>
                        Explore Properties Organized by Categories to Find Your Perfect Match
                    </p>
                    <div className="row">
                        {categories.map((category, index) => (
                            <div
                                className={`col-12 col-sm-6 ${index === 0 || index === categories.length - 1 ? "col-md-6" : "col-md-3"
                                    } px-2 mt-3`}
                                key={index}
                            >
                                <div
                                    className="p-3 fs-5"
                                    style={{
                                        backgroundImage: `url(${category.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        height: "400px",
                                        borderRadius: "10px",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <Link to={`/categories/${category.slug}`}
                                        className="list-cat-button px-2"
                                        style={{
                                            backgroundColor: "#bc986b",
                                            color: "white",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        {category.name}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Latest Properties */}
                <div className="container py-5">
                    <h2 className="text-center fw-bold mb-5 text-dark">Latest Properties</h2>
                    <div className="row g-4">
                        {latestListings.length > 0 ? (
                            latestListings.map((listing) => {
                                const isInWishlist = wishlist.some((item) => item._id === listing._id);

                                return (
                                    <div key={listing._id} className="col-12 col-md-6 col-lg-4">
                                        <div className="card shadow-sm border-0">
                                            {/* Image Section */}
                                            <div className="position-relative">
                                                <Link to={`/listings/${listing.slug}`}>
                                                    <LazyLoadImage
                                                        src={listing.images?.[0] ? `http://localhost:8050${listing.images[0]}` : defaultIMG}
                                                        crossOrigin="anonymous"
                                                        alt={listing.name}
                                                        className="card-img-top"
                                                        effect="blur"
                                                        wrapperClassName="lazyload-wrapper" // Fixes width issue
                                                        style={{
                                                            width: "100%", // Ensure full width
                                                            height: "250px",
                                                            objectFit: "cover",
                                                            borderRadius: "6px 6px 0 0",
                                                            display: "block", // Prevents extra space issues
                                                        }}
                                                    />
                                                </Link>
                                                <span
                                                    className="badge position-absolute top-0 start-0 m-2"
                                                    style={{
                                                        backgroundColor: "#bc986b",
                                                        color: "white",
                                                        padding: "8px 12px",
                                                        fontSize: "0.9rem",
                                                    }}
                                                >
                                                    {listing.category?.name || "Uncategorized"}
                                                </span>
                                            </div>

                                            {/* Card Body */}
                                            <div className="card-body">
                                                <h5 className="fw-bold text-dark">{listing.name}</h5>
                                                <p className="text-muted">
                                                    {sanitizeAndSliceDescription(listing.description, 90)}...
                                                </p>

                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                    <small className="text-secondary">
                                                        <i
                                                            className="fa-solid fa-location-dot me-2"
                                                            style={{ color: "#bc986b" }}
                                                        ></i>
                                                        {listing.location || "Location not available"}
                                                    </small>
                                                    <Link
                                                        to={`/listings/${listing.slug}`}
                                                        className="btn btn-sm"
                                                        style={{
                                                            backgroundColor: "#bc986b",
                                                            color: "white",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Features Section */}
                                            <div className="p-3 border-top" style={{ fontSize: "0.9rem", background: "#f8f9fa" }}>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <i className="fa-solid fa-crop-simple me-2" style={{ color: "#bc986b" }}></i>
                                                        {listing.area || "N/A"} Sq Ft
                                                    </div>
                                                    <div className="col-6">
                                                        <i className="fa-solid fa-bed me-2" style={{ color: "#bc986b" }}></i>
                                                        {listing.bedrooms || "N/A"} Bedrooms
                                                    </div>
                                                    <div className="col-6">
                                                        <i className="fa-solid fa-bath me-2" style={{ color: "#bc986b" }}></i>
                                                        {listing.bathrooms || "N/A"} Bathrooms
                                                    </div>
                                                    <div className="col-6">
                                                        <i className="fa-solid fa-warehouse me-2" style={{ color: "#bc986b" }}></i>
                                                        {listing.garage || "N/A"} Garage
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Wishlist Button */}
                                            <div className="p-3 border-top text-center">
                                                <button
                                                    className={`btn w-100 fw-bold ${isInWishlist ? "btn-outline-danger" : "btn-danger"}`}
                                                    onClick={() => toggleWishlist(listing)}
                                                >
                                                    <i className={`fa-solid fa-heart me-2 ${isInWishlist ? "text-danger" : "text-white"}`} />
                                                    {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center text-muted">
                                <h5>No latest properties available.</h5>
                            </div>
                        )}
                    </div>
                </div>


                {/* Testimonials */}
                <div className="container-fluid" style={{ backgroundColor: "#f4f9fe" }}>
                    <h2 className="pt-5 text-center">What Our Clients Say</h2>
                    <p className="text-center pb-1 fs-5" style={{ color: "#bc986b" }}>
                        Read What Our Satisfied Clients Have to Say About Their Experience with Us
                    </p>
                    <div className="row">
                        {testimonials.map((testimonial, index) => (
                            <div className="col-12 col-sm-6 col-lg-4 p-4" key={index}>
                                <div className="p-4 shadow-lg" style={{ backgroundColor: "white", borderRadius: "8px" }}>
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
                                    <p style={{ textAlign: "justify", color: "#6c757d" }}>{testimonial.message}</p>
                                    <div className="stars testi-cards text-warning">
                                        {Array(testimonial.rating)
                                            .fill()
                                            .map((_, i) => (
                                                <i className="fa-solid fa-star me-1" key={i}></i>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Get in Touch */}
                <div className="container-fluid py-5" style={{ backgroundColor: "#f4f5f7" }}>
                    <h2 className="pt-5 text-center">Get in Touch</h2>
                    <p style={{ color: "#bc986b" }} className="text-center pb-1 fs-5">
                        Reach Out to Us for Expert Real Estate Assistance and Advice
                    </p>

                    <div className="row">
                        {/* Contact Form */}
                        <div className="col-12 col-lg-6 px-5 py-4">
                            <div className="form px-5 py-4 shadow-lg" style={{ backgroundColor: "#31323c", borderRadius: "8px" }}>
                                <p className="h1 text-light">Please leave your Request</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control py-3"
                                            placeholder="Name*"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="tel"
                                            name="number"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            className="form-control py-3"
                                            placeholder="Phone No.*"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control py-3"
                                            placeholder="Email ID"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            name="message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="form-control py-3"
                                            rows="4"
                                            placeholder="Write your message here..."
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            type="submit"
                                            className="btn w-50 py-2"
                                            style={{ backgroundColor: "#bc986b", color: "white", borderRadius: "0px" }}
                                        >
                                            SUBMIT
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className="col-12 col-lg-6 px-5 py-4" style={{ minHeight: "350px" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.01397837441!2d77.04068353092038!3d28.592171130798466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1bc2ab4cb0ed%3A0x57ecce572fe72f9!2sAG%20Realtors!5e0!3m2!1sen!2sin!4v1735844213601!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: "8px" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="AG Realtors Location"
                                className="shadow-lg bg-body-tertiary"
                            ></iframe>
                        </div>
                    </div>
                </div>

            </>
        </Layout>
    )
}

export default Home;