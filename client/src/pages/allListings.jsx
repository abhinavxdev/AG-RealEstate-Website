import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layouts/layout";
import axios from "axios";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import CategoryMenu from "../components/layouts/categoryMenu";
import defaultIMG from "../components/images/default-image.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Blur effect
import "./main.css"

const AllListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  // Fetch Listings from Backend
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get("http://localhost:8050/api/listings");
        if (data?.success) {
          setListings(data.listings);
        } else {
          toast.error("Failed to fetch listings.");
        }
      } catch (error) {
        toast.error("Failed to fetch listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Wishlist Toggle
  const toggleWishlist = (listing) => {
    let updatedWishlist = [...wishlist];

    if (wishlist.some((item) => item._id === listing._id)) {
      updatedWishlist = updatedWishlist.filter((item) => item._id !== listing._id);
      toast.success("Removed from Wishlist");
    } else {
      updatedWishlist.push(listing);
      toast.success("Added to Wishlist");
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="container text-center py-5">
          <h2>Loading Listings...</h2>
        </div>
      </Layout>
    );
  }

  // Sanitize Description and Limit Length
  const sanitizeAndSliceDescription = (description, limit) => {
    const sanitizedHTML = DOMPurify.sanitize(description);
    const tempElement = document.createElement("div");
    tempElement.innerHTML = sanitizedHTML;
    return (tempElement.textContent || tempElement.innerText || "").slice(0, limit);
  };

  return (
    <Layout title="All Listings">
      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold text-dark">Explore Our Listings</h2>
        <div className="row">
          {/* Category Navigation */}
          <CategoryMenu />

          {/* Listings Section */}
          <div className="col-12 col-md-8">
            <div className="row g-4">
              {listings.length > 0 ? (
                listings.map((listing) => {
                  const isInWishlist = wishlist.some((item) => item._id === listing._id);

                  return (
                    <div key={listing._id} className="col-12 col-md-6">
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
                            style={{ backgroundColor: "#bc986b", color: "white", padding: "8px 12px", fontSize: "0.9rem" }}
                          >
                            {listing.category?.name || "Uncategorized"}
                          </span>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                          <h5 className="fw-bold text-dark">{listing.name}</h5>
                          <p className="text-muted">{sanitizeAndSliceDescription(listing.description, 90)}...</p>

                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <small className="text-secondary">
                              <i className="fa-solid fa-location-dot me-2" style={{ color: "#bc986b" }}></i>
                              {listing.location || "Location not available"}
                            </small>
                            <Link
                              to={`/listings/${listing.slug}`}
                              className="btn btn-sm"
                              style={{ backgroundColor: "#bc986b", color: "white", fontWeight: "600" }}
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
                            className={isInWishlist ? "btn btn-outline-danger w-100 fw-bold" : "btn btn-danger w-100 fw-bold"}
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
                  <h5>No listings found.</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllListings;
