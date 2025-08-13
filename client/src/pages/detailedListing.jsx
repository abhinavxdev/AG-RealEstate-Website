import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/layouts/layout";
import ImageGallery from "../components/layouts/imageGallery";
import dealer from "../components/images/dealer.jpg"
import logo from "../components/images/logo.svg"
import defaultIMG from "../components/images/default-image.png";
import "./main.css"

const DetailedListing = () => {
  const { slug } = useParams(); // Get slug from URL
  const [listing, setListing] = useState(null);
  const [similarListings, setSimilarListings] = useState([]);
  const [wishlist, setWishlist] = useState([]);

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

  // Fetch the single listing by slug
  const fetchListing = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8050/api/listings/${slug}`
      );
      if (data.success) {
        setListing(data.listing);
        fetchSimilarListings(data.listing.category._id, data.listing._id);
      } else {
        toast.error("Failed to fetch listing details");
      }
    } catch (error) {
      console.error("Error fetching listing:", error.message);
      toast.error("Error fetching listing details");
    }
  };

  // Fetch similar listings based on category
  const fetchSimilarListings = async (categoryId, listingId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8050/api/listings/similar/${categoryId}/${listingId}`
      );
      if (data.success) {
        setSimilarListings(data.listings);
      }
    } catch (error) {
      console.error("Error fetching similar listings:", error.message);
    }
  };

  // Load wishlist from local storage
  const loadWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  };

  // Toggle wishlist functionality
  const toggleWishlist = () => {
    let updatedWishlist = [...wishlist];
    const isInWishlist = wishlist.some((item) => item._id === listing._id);

    if (isInWishlist) {
      updatedWishlist = updatedWishlist.filter((item) => item._id !== listing._id);
      toast.success("Removed from Wishlist");
    } else {
      updatedWishlist.push(listing);
      toast.success("Added to Wishlist");
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  useEffect(() => {
    fetchListing();
    loadWishlist();
  }, [slug]);

  if (!listing) {
    return (
      <Layout title="Loading...">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Loading listing details...</h2>
        </div>
      </Layout>
    );
  }


  // Sanitize description
  const sanitizedDescription = DOMPurify.sanitize(listing.description);

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

  return (
    <Layout title={listing ? listing.name : "Loading..."}>
      <div className="pt-3" style={{ backgroundColor: "#f0f0f0" }}>

        {/* About Container Starts  */}
        <div className="container-fluid px-4 card-about">
          <div className="row">
            <div
              className="col-12 col-lg-8 px-4 py-4"
              style={{ backgroundColor: "white", borderRadius: 6 }}
            >

              <div>
                <ImageGallery images={listing.images} />
              </div>

              {/* Breadcrumb & Heading Section  */}
              <div>
                <nav style={{ "--bs-breadcrumb-divider": "'>'" }}>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item"><NavLink to="/" className="text-dark">Home</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">{listing.location}</li>
                  </ol>
                </nav>
                <h2 className="text-dark">{listing.name}</h2>
                <p style={{ color: "#bc986b" }}><i className="fa-solid fa-location-dot me-2"></i>{listing.location}</p>
              </div>

              {/* ---------------------- Top About Features ---------------------- */}
              <div className="row card-about-feature my-3">
                <div className="col-6 col-sm-3 pt-3">
                  <div>Area</div>
                  <div>
                    <i className="fa-solid fa-crop-simple me-2 fs-3 mt-1" style={{ color: "#bc986b" }} />
                    {listing.area} Sq Ft
                  </div>
                </div>
                <div className="col-6 col-sm-3 pt-3">
                  <div>Bedrooms</div>
                  <div>
                    <i className="fa-solid fa-bed me-2 fs-3 mt-1" style={{ color: "#bc986b" }} />
                    {listing.bedrooms}
                  </div>
                </div>
                <div className="col-6 col-sm-3 pt-3">
                  <div>Bathrooms</div>
                  <div>
                    <i className="fa-solid fa-bath me-2 fs-3 mt-1" style={{ color: "#bc986b" }} />{listing.bathrooms}
                  </div>
                </div>
                <div className="col-6 col-sm-3 pt-3">
                  <div>Garage</div>
                  <div>
                    <i className="fa-solid fa-warehouse me-2 fs-3 mt-1" style={{ color: "#bc986b" }} />{listing.garage}
                  </div>
                </div>
              </div>

              {/* ---------------------- Wishlist Button ---------------------- */}
              <div className="text-center">
                <button
                  className={wishlist.some((item) => item._id === listing._id) ? "btn btn-outline-danger fw-bold w-100 mt-3" : "btn btn-danger fw-bold w-100 mt-3"}
                  onClick={toggleWishlist}
                >
                  <i className={`fa-solid fa-heart me-2 ${wishlist.some((item) => item._id === listing._id) ? "text-danger" : "text-white"}`} />
                  {wishlist.some((item) => item._id === listing._id) ? "Added to Wishlist" : "Add to Wishlist"}
                </button>
              </div>


              {/* ---------------------- Description ---------------------- */}
              <div className="card-about-head fs-5 mb-2 mt-4" style={{ color: "#bc986b" }}>Description</div>
              <div
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                style={{ textAlign: "justify" }}
              ></div>
              <p />
              <p />
              <div className="card-about-head fs-5 mt-4">Amenities</div>
              <div className="row">
                {listing.amenities &&
                  Array.from({ length: 3 }).map((_, colIndex) => (
                    <div key={colIndex} className="col-12 col-sm-4 px-0">
                      <ul className="m-0">
                        {listing.amenities
                          .slice(colIndex * 4, colIndex * 4 + 4) // Get 4 items per column
                          .map((amenity, index) => (
                            <li key={index}>
                              <i className="fa-solid fa-circle-check me-2 mt-3" />
                              {amenity}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>

              {/* ---------------------- Property on Map ---------------------- */}
              <div className="card-about-head fs-5 mt-3">Property on Map</div>
              <div className="mb-2 mt-3" style={{ height: "26rem" }}>
                <iframe
                  src={listing.mapLocation}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: 8 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-4 d-none d-lg-block about-right-form">
              <form onSubmit={handleSubmit} style={{ backgroundColor: "#31323c", borderRadius: 6 }}>
                <div className="row p-4">
                  <p className="h1 text-light">Contact Us:</p>
                  <div className="col-12 mb-3">
                    <input
                      className="w-100 py-2 ps-2"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      className="w-100 py-2 ps-2"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <input
                      className="w-100 py-2 ps-2"
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                      placeholder="Your Phone"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <textarea
                      className="ps-2 pt-1 w-100"
                      name="message"
                      rows={3}
                      placeholder="I'm Interested in"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn col-12 mb-1"
                      style={{
                        backgroundColor: "#bc986b",
                        height: "2.6rem",
                        color: "white",
                        borderRadius: 0
                      }}
                    >
                      SUBMIT
                    </button>
                    <button
                      type="button"
                      className="btn col-12 mb-1"
                      style={{
                        backgroundColor: "white",
                        height: "2.6rem",
                        color: "#bc986b",
                        borderRadius: 0
                      }}
                    >
                      <Link to="https://wa.me/7011190976">
                        <i className="fa-brands fa-whatsapp" /> Whatsapp
                      </Link>
                    </button>
                    <button
                      type="button"
                      className="btn col-12 mb-1"
                      style={{
                        backgroundColor: "white",
                        height: "2.6rem",
                        color: "#bc986b",
                        borderRadius: 0
                      }}
                    >
                      <Link to="tel:+917011190976">
                        <i className="fa-solid fa-phone" /> +91 70111 90976
                      </Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* ---------------------- About Agent ---------------------- */}
            <div
              className="col-12 col-lg-8 mt-4 pt-4 pb-2 px-4"
              style={{ backgroundColor: "white", borderRadius: 6 }}
            >
              <div className="row">
                <div className="col-12 col-sm-6">
                  <img src={logo} alt="" style={{ width: "100%", height: "100%" }} />
                </div>
                <div className="col-12 col-sm-6">
                  <h3 className="m-0 mt-3 pt-1">Gagan Jain</h3>
                  <p className="ps-1 mb-2 card-about-head">AG Realtors</p>
                  <ul className="ps-1">
                    <li>
                      <i className="fa-solid fa-mobile-screen me-2" />
                      <a href="tel:+919717616777">+91 9717-616-777</a>
                    </li>
                    <li>
                      <i className="fa-solid fa-phone me-2" />
                      <a href="tel:+917011190976">+91 7011-190-976</a>
                    </li>
                    <li>
                      <i className="fa-solid fa-envelope me-2" />
                      <a href="mailto:mail.agrealtors@gmail.com">
                        mail.agrealtors@gmail.com
                      </a>
                    </li>
                    <li>
                      <i className="fa-solid fa-location-dot me-2" />
                      Office - 123, Sunview Apartment, Sector 11 Dwarka, New Delhi -
                      110075.
                    </li>
                    <li className="d-flex justify-content-evenly">
                      <a href="https://wa.me/9717616777" target="_blank"><i className="fa-brands fa-whatsapp me-3 fs-4 mt-3" /></a>
                      <a href="https://www.instagram.com/ag_realtors/" target="_blank"><i className="fa-brands fa-instagram me-3 fs-4 mt-3" /></a>
                      <a href="https://www.youtube.com/@AG-Realtors" target="_blank"><i className="fa-brands fa-youtube me-3 fs-4 mt-3" /></a>
                      <a href="https://www.facebook.com/agrealtorsdwarka" target="_blank"><i className="fa-brands fa-facebook me-3 fs-4 mt-3" /></a>
                      <a href="mailto:mail.agrealtors@gmail.com" target="_blank"><i className="fa-solid fa-envelope me-3 fs-4 mt-3" /></a>
                    </li>
                  </ul>
                  <p />
                </div>
              </div>
            </div>
            {/* ---------------------- Contact Form ---------------------- */}
            <div
              className="col-12 col-lg-8 mt-4 py-4 card-form"
              style={{ backgroundColor: "#31323c", borderRadius: 6 }}
            >
              <div className="my-3 px-4">
                <p className="h1 text-light">Contact Us:</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row px-4">
                  <div className="col-12 col-sm-4 mb-3">
                    <input
                      className="w-100 py-2 ps-2"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-12 col-sm-4 mb-3">
                    <input
                      className="w-100 py-2 ps-2"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="col-12 col-sm-4 mb-3">
                    <input
                      className="w-100 py-2 ps-2"
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                      placeholder="Your Phone"
                    />
                  </div>
                  <div className="col-12 col-sm-12 mb-3">
                    <textarea
                      className="ps-2 w-100"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="I'm Interested in"
                    />
                  </div>
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn me-2 col-12 col-sm-4 mb-1"
                      style={{
                        backgroundColor: "#bc986b",
                        height: "3rem",
                        color: "white",
                        borderRadius: 0
                      }}
                    >
                      SUBMIT
                    </button>
                    <button
                      type="button"
                      className="btn me-2 col-12 col-sm-3 mb-1"
                      style={{
                        backgroundColor: "white",
                        height: "3rem",
                        color: "#bc986b",
                        borderRadius: 0
                      }}
                    >
                      <Link to="https://wa.me/7011190976">
                        <i className="fa-brands fa-whatsapp" /> Whatsapp
                      </Link>
                    </button>
                    <button
                      type="button"
                      className="btn me-2 col-12 col-sm-4 mb-1"
                      style={{
                        backgroundColor: "white",
                        height: "3rem",
                        color: "#bc986b",
                        borderRadius: 0
                      }}
                    >
                      <Link to="tel:+917011190976">
                        <i className="fa-solid fa-phone" /> +91 70111 90976
                      </Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* ---------------------- Similar Properties ---------------------- */}

            {listing && (
              <div>
                {/* Similar Properties Section */}
                <div
                  className="col-12 col-lg-8 my-4 pt-3 pb-3 px-4"
                  style={{ backgroundColor: "white", borderRadius: 6 }}
                >
                  <div className="card-about-head fs-5 py-2 mx-2">Similar Properties</div>
                  <div className="row">
                    {similarListings.map((similar) => (
                      <div key={similar._id} className="col-12 col-sm-6">
                        <div className="card my-2">
                          <Link to={`/listings/${similar.slug}`}>
                            <img
                              src={
                                similar.images?.[0]
                                  ? `http://localhost:8050${similar.images[0]}` // Use the stored file path
                                  : defaultIMG // Fallback if no image
                              }
                              alt={listing.name}
                              crossOrigin="anonymous"
                              className="card-img-top"
                              style={{
                                height: "250px",
                                objectFit: "cover",
                                borderRadius: "6px 6px 0 0",
                              }}
                            />
                            <div className="card-body">
                              <h5 className="card-title text-dark">{similar.name}</h5>
                              <p className="card-text latest-prop-col">
                                {sanitizeAndSliceDescription(similar.description, 100)}...
                              </p>
                              <p className="latest-prop-loc">
                                <i className="fa-solid fa-location-dot me-2" />
                                {similar.location}
                              </p>
                              <div className="row">
                                <div className="col-6">
                                  <i className="fa-solid fa-crop-simple me-2" />
                                  {similar.area} Sq Ft
                                </div>
                                <div className="col-6">
                                  <i className="fa-solid fa-bed me-2" />
                                  {similar.bedrooms} Bedrooms
                                </div>
                                <div className="col-6">
                                  <i className="fa-solid fa-bath me-2" />
                                  {similar.bathrooms} Bathrooms
                                </div>
                                <div className="col-6">
                                  <i className="fa-solid fa-warehouse me-2" />
                                  {similar.garage} Garage
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


      </div>
    </Layout>
  )

};

export default DetailedListing;
