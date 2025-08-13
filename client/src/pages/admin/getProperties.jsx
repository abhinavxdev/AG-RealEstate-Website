import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/layout";
import AdminMenu from "../../components/layouts/adminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment"; // For date formatting

const AdminProperties = () => {
    const [properties, setProperties] = useState([]);

    // Fetch all properties
    const fetchProperties = async () => {
        try {
            const { data } = await axios.get("http://localhost:8050/api/properties");
            if (data.success) {
                setProperties(data.properties);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch properties");
        }
    };

    // Delete a property
    const deleteProperty = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        try {
            const { data } = await axios.delete(`http://localhost:8050/api/properties/${id}`);
            if (data.success) {
                toast.success("Property deleted successfully");
                fetchProperties(); // Refresh the list
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete property");
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <Layout title="Manage Properties">
            <div className="container-fluid py-4" style={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
                <div className="row">
                    {/* Admin Menu */}
                    <AdminMenu />

                    {/* Properties List - Card Layout */}
                    <div className="col-lg-9">
                        <div className="card shadow-lg border-0">
                            <div className="card-header text-white" style={{ backgroundColor: "#494a53" }}>
                                <h3 className="mb-0">Manage Submitted Properties</h3>
                            </div>
                            <div className="card-body">
                                {properties.length > 0 ? (
                                    <div className="row">
                                        {properties.map((property) => (
                                            <div className="col-md-6 mb-4" key={property._id}>
                                                <div className="card border-left-primary shadow h-100">
                                                    <div className="card-body">
                                                        <h5 className="card-title font-weight-bold">{property.ownerName}</h5>
                                                        <p className="mb-1"><strong>Phone:</strong> {property.phone}</p>
                                                        <p className="mb-1"><strong>Email:</strong> {property.email}</p>
                                                        <p className="mb-1"><strong>Type:</strong> {property.propertyType}</p>
                                                        <p className="mb-1"><strong>Location:</strong> {property.location}</p>
                                                        <p className="mb-1"><strong>Price:</strong> ₹{property.price.toLocaleString("en-IN")}</p>
                                                        <p className="mb-1"><strong>Description:</strong> {property.description.substring(0, 50)}...</p>
                                                        <p className="mb-2 text-muted">
                                                            <small><strong>Submitted on:</strong> {moment(property.createdAt).format("DD MMM YYYY, h:mm A")}</small>
                                                        </p>
                                                        <button 
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => deleteProperty(property._id)}
                                                            disabled
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-muted">No properties found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminProperties;
