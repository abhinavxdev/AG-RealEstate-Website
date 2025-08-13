import React, { useState } from "react";
import Layout from "../components/layouts/layout";
import axios from "axios";
import toast from "react-hot-toast";

const SubmitProperty = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    propertyType: "",
    location: "",
    price: "",
    description: "",
    images: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === "images") {
          for (const file of formData.images) {
            data.append("images", file);
          }
        } else {
          data.append(key, formData[key]);
        }
      }

      const res = await axios.post("http://localhost:8050/api/properties", data);
      if (res.data.success) {
        toast.success("Property Submitted Successfully!");
        setFormData({
          ownerName: "",
          phone: "",
          email: "",
          propertyType: "",
          location: "",
          price: "",
          description: "",
          images: null,
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title="Submit Your Property">
      <div className="container py-5">
        <h1 className="text-center mb-4">Submit Your Property</h1>
        <p className="text-center text-muted mb-5">
          Fill out the form below to list your property with AG Realtors.
        </p>

        {/* Submit Property Form */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg p-4 border-0">
              <h4 className="text-center mb-4">Property Details</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="ownerName" className="form-label">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ownerName"
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="propertyType" className="form-label">
                    Property Type
                  </label>
                  <select
                    className="form-control"
                    name="propertyType"
                    id="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Farmhouse">Farmhouse</option>
                    <option value="Villa">Villa</option>
                    <option value="Office">Office</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price (in INR)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="images" className="form-label">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="images"
                    id="images"
                    multiple
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn text-white w-100"
                  style={{ backgroundColor: "#bc986b" }}
                >
                  Submit Property
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-5">
          <h2 className="text-center">Why Choose Us?</h2>
          <p className="text-center text-muted mb-5">
            Discover why AG Realtors is the right choice for your property
            needs.
          </p>
          <div className="row text-center">
            <div className="col-lg-4">
              <i className="fa-solid fa-award fs-1" style={{ color: "#bc986b" }}></i>
              <h4>Proven Expertise</h4>
              <p>
                With years of experience, we ensure you get the best guidance in
                your real estate journey.
              </p>
            </div>
            <div className="col-lg-4">
              <i
                className="fa-solid fa-people-arrows fs-1"
                style={{ color: "#bc986b" }}
              ></i>
              <h4>Seamless Process</h4>
              <p>
                Enjoy a hassle-free experience with our streamlined property
                submission and management services.
              </p>
            </div>
            <div className="col-lg-4">
              <i
                className="fa-solid fa-handshake fs-1"
                style={{ color: "#bc986b" }}
              ></i>
              <h4>Client Focus</h4>
              <p>
                Your satisfaction is our priority. We go above and beyond to
                meet your expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubmitProperty;
