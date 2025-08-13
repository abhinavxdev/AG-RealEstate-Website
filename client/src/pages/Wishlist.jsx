import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layouts/layout";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import defaultIMG from "../components/images/default-image.png";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    // Load Wishlist from Local Storage
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(storedWishlist);
    }, []);

    // Remove from Wishlist
    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter((item) => item._id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        toast.success("Removed from Wishlist");
    };

      // Sanitize Description and Limit Length
  const sanitizeAndSliceDescription = (description, limit) => {
    const sanitizedHTML = DOMPurify.sanitize(description);
    const tempElement = document.createElement("div");
    tempElement.innerHTML = sanitizedHTML;
    return (tempElement.textContent || tempElement.innerText || "").slice(0, limit);
  };

    return (
        <Layout title="Wishlist - AG Realtors">
            <div className="container py-5">
                <h2 className="text-center mb-4 fw-bold text-dark">Your Wishlist Properties</h2>

                {wishlist.length === 0 ? (
                    <p className="text-center fs-5 text-muted">No properties in your wishlist yet.</p>
                ) : (
                    <div className="row g-4">
                        {wishlist.map((listing) => (
                            <div key={listing._id} className="col-12 col-md-4">
                                <div className="card shadow-sm border-0">
                                    {/* Image Section */}
                                    <div className="position-relative">
                                        <Link to={`/listings/${listing.slug}`}>
                                            <img 
                                                src={listing.images?.[0] ? `http://localhost:8050${listing.images[0]}` : defaultIMG} 
                                                alt={listing.name} 
                                                className="card-img-top" 
                                                style={{ height: "250px", objectFit: "cover", borderRadius: "6px 6px 0 0" }} 
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
                                                to={`/listing/${listing._id}`}
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

                                    {/* Remove from Wishlist Button */}
                                    <div className="p-3 border-top text-center">
                                        <button 
                                            className="btn btn-outline-danger w-100 fw-bold" 
                                            onClick={() => removeFromWishlist(listing._id)}
                                        >
                                            <i className="fa-solid fa-trash me-2" />
                                            Remove from Wishlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Wishlist;
