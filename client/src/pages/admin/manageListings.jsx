import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import Layout from "../../components/layouts/layout";
import AdminMenu from "../../components/layouts/adminMenu";

const ManageListings = () => {
    const [listings, setListings] = useState([]);

    // Fetch all listings
    const fetchListings = async () => {
        try {
            const { data } = await axios.get("http://localhost:8050/api/listings");
            if (data?.success) {
                setListings(data.listings);
            } else {
                toast.error("No listings found.");
            }
        } catch (error) {
            console.error("Error fetching listings:", error);
            toast.error("Failed to fetch listings.");
        }
    };

    // Delete a listing
    const deleteListing = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;

        try {
            const { data } = await axios.delete(`http://localhost:8050/api/listings/${id}`);
            if (data.success) {
                toast.success("Listing deleted successfully");
                setListings((prevListings) => prevListings.filter((listing) => listing._id !== id));
            } else {
                toast.error("Failed to delete listing");
            }
        } catch (error) {
            console.error("Error deleting listing:", error);
            toast.error("Error deleting listing");
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    // Sanitize & Slice Description
    const sanitizeAndSliceDescription = (description, limit) => {
        const sanitizedHTML = DOMPurify.sanitize(description);
        const tempElement = document.createElement("div");
        tempElement.innerHTML = sanitizedHTML;
        return (tempElement.textContent || tempElement.innerText || "").slice(0, limit);
    };

    return (
        <Layout title="Admin - Manage Listings">
            <div className="container-fluid py-4" style={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
                <div className="row">
                    <AdminMenu />

                    <div className="col-lg-9">
                        <div className="card shadow-lg border-0">
                            <div className="card-header text-white" style={{ backgroundColor: "#494a53" }}>
                                <h3 className="mb-0">Manage Listings</h3>
                            </div>
                            <div className="card-body">
                                {listings.length > 0 ? (
                                    <div className="row g-4">
                                        {listings.map((listing) => (
                                            <div key={listing._id} className="col-12 col-md-6 col-lg-4">
                                                <div className="card shadow-sm border-0 h-100">
                                                    {/* Image Section */}
                                                    <div style={{ position: "relative" }}>
                                                        <span
                                                            className="badge bg-secondary text-light"
                                                            style={{
                                                                position: "absolute",
                                                                top: "10px",
                                                                right: "10px",
                                                                padding: "6px 12px",
                                                                fontSize: "0.85rem",
                                                                fontWeight: "500",
                                                            }}
                                                        >
                                                            {listing.category?.name || "Uncategorized"}
                                                        </span>
                                                    </div>

                                                    {/* Card Content */}
                                                    <div className="card-body">
                                                        <h5 className="card-title text-dark fw-bold">{listing.name}</h5>
                                                        <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                                                            {sanitizeAndSliceDescription(listing.description, 100)}...
                                                        </p>

                                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                                            <span className="text-muted" style={{ fontSize: "0.85rem" }}>
                                                                <i className="fa-solid fa-location-dot me-2" style={{ color: "#bc986b" }} />
                                                                {listing.location || "Location not available"}
                                                            </span>
                                                            <Link
                                                                to={`/listings/${listing.slug}`}
                                                                className="btn btn-sm text-light"
                                                                style={{backgroundColor: "#bc986b"}}
                                                            >
                                                                View Details
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    {/* Features & Actions */}
                                                    <div className="card-footer bg-white border-top">
                                                        <div className="row g-1 text-muted small">
                                                            <div className="col-6">
                                                                <i className="fa-solid fa-crop-simple me-2" style={{ color: "#bc986b" }} />
                                                                {listing.area || "N/A"} Sq Ft
                                                            </div>
                                                            <div className="col-6">
                                                                <i className="fa-solid fa-bed me-2"
                                                                    style={{ color: "#bc986b" }} />
                                                                {listing.bedrooms || "N/A"} Bedrooms
                                                            </div>
                                                            <div className="col-6">
                                                                <i className="fa-solid fa-bath me-2"
                                                                    style={{ color: "#bc986b" }} />
                                                                {listing.bathrooms || "N/A"} Bathrooms
                                                            </div>
                                                            <div className="col-6">
                                                                <i className="fa-solid fa-warehouse me-2"
                                                                    style={{ color: "#bc986b" }} />
                                                                {listing.garage || "N/A"} Garage
                                                            </div>
                                                        </div>

                                                        {/* DELETE BUTTON */}
                                                        <div className="mt-3 text-center">
                                                            <button
                                                                className="btn btn-danger btn-sm w-100"
                                                                onClick={() => deleteListing(listing._id)}
                                                            >
                                                                <i className="fa-solid fa-trash me-2"></i> Delete Listing
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <h5 className="text-center">No listings available.</h5>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ManageListings;
