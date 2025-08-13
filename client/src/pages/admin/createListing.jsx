// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import slugify from "slugify";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Layout from "../../components/layouts/layout";
// import AdminMenu from "../../components/layouts/adminMenu";
// import { useAuth } from "../../context/auth";
// import { Select } from "antd";

// const { Option } = Select;

// const CreateListing = () => {
//   const [auth] = useAuth(); // Access token from auth context
//   const [name, setName] = useState("");
//   const [slug, setSlug] = useState("");
//   const [location, setLocation] = useState("");
//   const [area, setArea] = useState("");
//   const [bedrooms, setBedrooms] = useState(0);
//   const [bathrooms, setBathrooms] = useState(0);
//   const [garage, setGarage] = useState(0);
//   const [description, setDescription] = useState("");
//   const [amenities, setAmenities] = useState("");
//   const [mapLocation, setMapLocation] = useState("");
//   const [images, setImages] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("");

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8050/api/categories");
//         setCategories(data.categories);
//       } catch (error) {
//         toast.error("Failed to load categories");
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Handle dynamic slug generation
//   const handleNameChange = (e) => {
//     const nameValue = e.target.value;
//     setName(nameValue);
//     if (!slug) setSlug(slugify(nameValue, { lower: true }));
//   };

//   const resetForm = () => {
//     setName("");
//     setSlug("");
//     setLocation("");
//     setArea("");
//     setBedrooms(0);
//     setBathrooms(0);
//     setGarage(0);
//     setDescription("");
//     setAmenities("");
//     setMapLocation("");
//     setImages([]);
//     setCategory("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!auth?.token) {
//       toast.error("You need to log in to create a listing.");
//       return;
//     }

//     if (!category) {
//       toast.error("Please select a category.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("slug", slug || slugify(name, { lower: true }));
//     formData.append("location", location);
//     formData.append("area", area);
//     formData.append("bedrooms", bedrooms);
//     formData.append("bathrooms", bathrooms);
//     formData.append("garage", garage);
//     formData.append("description", description);
//     formData.append("amenities", amenities);
//     formData.append("mapLocation", mapLocation);
//     formData.append("category", category);
//     images.forEach((image) => formData.append("images", image));

//     try {
//       const { data } = await axios.post("http://localhost:8050/api/listings/create", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: auth.token,
//         },
//       });

//       toast.success(data.message || "Listing created successfully!");
//       resetForm(); // Clear form fields after successful submission
//     } catch (error) {
//       console.error("Error creating listing:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to create listing. Please try again.");
//     }
//   };

//   return (
//     <Layout title="Admin - Create Listing">
//       <div className="container-fluid py-4">
//         <h2 className="text-center mb-4">Admin Dashboard</h2>
//         <div className="row">
//           <AdminMenu />
//           <div className="col-lg-9">
//             <div className="card shadow-lg p-4">
//               <h4 className="card-title mb-3">Create Property Listing</h4>
//               <form onSubmit={handleSubmit}>
//                 {/* Name and Slug */}
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <label htmlFor="name" className="form-label">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       className="form-control"
//                       placeholder="Property Name"
//                       value={name}
//                       onChange={handleNameChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label htmlFor="slug" className="form-label">
//                       Slug
//                     </label>
//                     <input
//                       type="text"
//                       id="slug"
//                       className="form-control"
//                       placeholder="Slug (auto-generated if left blank)"
//                       value={slug}
//                       onChange={(e) => setSlug(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 {/* Category */}
//                 <div className="mb-3">
//                   <label className="form-label">Category</label>
//                   <Select
//                     placeholder="Select a category"
//                     className="form-control"
//                     value={category}
//                     onChange={(value) => setCategory(value)}
//                     style={{ width: "100%" }}
//                   >
//                     {categories.map((cat) => (
//                       <Option key={cat._id} value={cat._id}>
//                         {cat.name}
//                       </Option>
//                     ))}
//                   </Select>
//                 </div>

//                 {/* Location and Area */}
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <label htmlFor="location" className="form-label">
//                       Location
//                     </label>
//                     <input
//                       type="text"
//                       id="location"
//                       className="form-control"
//                       placeholder="Location"
//                       value={location}
//                       onChange={(e) => setLocation(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label htmlFor="area" className="form-label">
//                       Area (Sq Ft)
//                     </label>
//                     <input
//                       type="text"
//                       id="area"
//                       className="form-control"
//                       placeholder="Area in Sq Ft"
//                       value={area}
//                       onChange={(e) => setArea(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Bedrooms, Bathrooms, Garage */}
//                 <div className="row mb-3">
//                   <div className="col-md-4">
//                     <label htmlFor="bedrooms" className="form-label">
//                       Bedrooms
//                     </label>
//                     <input
//                       type="number"
//                       id="bedrooms"
//                       className="form-control"
//                       placeholder="Number of Bedrooms"
//                       value={bedrooms}
//                       onChange={(e) => setBedrooms(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <label htmlFor="bathrooms" className="form-label">
//                       Bathrooms
//                     </label>
//                     <input
//                       type="number"
//                       id="bathrooms"
//                       className="form-control"
//                       placeholder="Number of Bathrooms"
//                       value={bathrooms}
//                       onChange={(e) => setBathrooms(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <label htmlFor="garage" className="form-label">
//                       Garage
//                     </label>
//                     <input
//                       type="number"
//                       id="garage"
//                       className="form-control"
//                       placeholder="Number of Garage Spaces"
//                       value={garage}
//                       onChange={(e) => setGarage(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="mb-3">
//                   <label htmlFor="description" className="form-label">
//                     Description
//                   </label>
//                   <ReactQuill theme="snow" value={description} onChange={setDescription} />
//                 </div>

//                 {/* Amenities */}
//                 <div className="mb-3">
//                   <label htmlFor="amenities" className="form-label">
//                     Amenities
//                   </label>
//                   <input
//                     type="text"
//                     id="amenities"
//                     className="form-control"
//                     placeholder="Comma-separated amenities"
//                     value={amenities}
//                     onChange={(e) => setAmenities(e.target.value)}
//                     required
//                   />
//                 </div>

//                 {/* Map Location */}
//                 <div className="mb-3">
//                   <label htmlFor="mapLocation" className="form-label">
//                     Google Map Location
//                   </label>
//                   <input
//                     type="text"
//                     id="mapLocation"
//                     className="form-control"
//                     placeholder="Google Map Embed URL"
//                     value={mapLocation}
//                     onChange={(e) => setMapLocation(e.target.value)}
//                     required
//                   />
//                 </div>

//                 {/* Categories
//                 <div className="mb-3">
//                   <label htmlFor="mapLocation" className="form-label">
//                     Select Categories
//                   </label>
//                   <Select
//                     className="form-control"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                   >
//                     <option value="">Select Category</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                   </Select>
//                 </div> */}

//                 {/* File Upload */}
//                 <div className="mb-3">
//                   <label htmlFor="images" className="form-label">
//                     Upload Images
//                   </label>
//                   <input
//                     type="file"
//                     id="images"
//                     className="form-control"
//                     multiple
//                     onChange={(e) => setImages([...e.target.files])}
//                     required
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   Submit Listing
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CreateListing;


import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import slugify from "slugify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Layout from "../../components/layouts/layout";
import AdminMenu from "../../components/layouts/adminMenu";
import { useAuth } from "../../context/auth";
import { Select } from "antd";

const { Option } = Select;

const CreateListing = () => {
  const [auth] = useAuth(); // Access token from auth context
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [garage, setGarage] = useState(0);
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]); // To store multiple amenities
  const [newAmenity, setNewAmenity] = useState(""); // For adding new amenity
  const [mapLocation, setMapLocation] = useState("");
  const [images, setImages] = useState([]); // Image uploads
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:8050/api/categories");
        setCategories(data.categories);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Add a new amenity
  const handleAddAmenity = () => {
    if (newAmenity.trim() !== "") {
      setAmenities([...amenities, newAmenity]);
      setNewAmenity(""); // Clear input field after adding
    } else {
      toast.error("Amenity cannot be empty!");
    }
  };

  // Remove an amenity
  const handleRemoveAmenity = (index) => {
    const updatedAmenities = amenities.filter((_, i) => i !== index);
    setAmenities(updatedAmenities);
  };

  // Generate slug dynamically
  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    if (!slug) setSlug(slugify(nameValue, { lower: true }));
  };

  // Reset form
  const resetForm = () => {
    setName("");
    setSlug("");
    setLocation("");
    setArea("");
    setBedrooms(0);
    setBathrooms(0);
    setGarage(0);
    setDescription("");
    setAmenities([]);
    setNewAmenity("");
    setMapLocation("");
    setImages([]);
    setCategory("");
  };

  const handleFileChange = (e) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 2 * 1024 * 1024; // 2MB limit
  
    const files = Array.from(e.target.files); // Convert FileList to Array
  
    // Validate files
    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert(`File ${file.name} is not a valid image type (Only JPG, PNG, WEBP allowed)`);
        return false;
      }
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large (Max 2MB allowed)`);
        return false;
      }
      return true;
    });
  
    setImages(validFiles); // Only set valid files
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth?.token) {
      toast.error("You need to log in to create a listing.");
      return;
    }

    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug || slugify(name, { lower: true }));
    formData.append("location", location);
    formData.append("area", area);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("garage", garage);
    formData.append("description", description);
    formData.append("amenities", JSON.stringify(amenities)); // Pass amenities as JSON string
    formData.append("mapLocation", mapLocation);
    formData.append("category", category);
    images.forEach((image) => formData.append("images", image));

    try {
      const { data } = await axios.post("http://localhost:8050/api/listings/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: auth.token,
        },
      });

      toast.success(data.message || "Listing created successfully!");
      resetForm(); // Clear form fields after successful submission
    } catch (error) {
      console.error("Error creating listing:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to create listing. Please try again.");
    }
  };

  return (
    <Layout title="Admin - Create Listing">
      <div className="container-fluid py-4">
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <div className="row">
          <AdminMenu />
          <div className="col-lg-9">
            <div className="card shadow-lg p-4">
              <h4 className="card-title mb-3">Create Property Listing</h4>
              <form onSubmit={handleSubmit}>
                {/* Name and Slug */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Property Name"
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="slug" className="form-label">
                      Slug
                    </label>
                    <input
                      type="text"
                      id="slug"
                      className="form-control"
                      placeholder="Slug (auto-generated if left blank)"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <Select
                    placeholder="Select a category"
                    className="form-control"
                    value={category}
                    onChange={(value) => setCategory(value)}
                    style={{ width: "100%" }}
                  >
                    {categories.map((cat) => (
                      <Option key={cat._id} value={cat._id}>
                        {cat.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Location and Area */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="form-control"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="area" className="form-label">
                      Area (Sq Ft)
                    </label>
                    <input
                      type="number"
                      id="area"
                      className="form-control"
                      placeholder="Area in Sq Ft"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Bedrooms, Bathrooms, Garage */}
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="bedrooms" className="form-label">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      id="bedrooms"
                      className="form-control"
                      placeholder="Number of Bedrooms"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="bathrooms" className="form-label">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      id="bathrooms"
                      className="form-control"
                      placeholder="Number of Bathrooms"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="garage" className="form-label">
                      Garage
                    </label>
                    <input
                      type="number"
                      id="garage"
                      className="form-control"
                      placeholder="Number of Garage Spaces"
                      value={garage}
                      onChange={(e) => setGarage(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <ReactQuill theme="snow" value={description} onChange={setDescription} />
                </div>

                {/* Amenities */}
                <div className="mb-3">
                  <label htmlFor="amenities" className="form-label">Amenities</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      id="amenities"
                      className="form-control"
                      placeholder="Add a new amenity"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                    />
                    <button type="button" className="btn btn-secondary" onClick={handleAddAmenity}>
                      Add
                    </button>
                  </div>
                  <ul className="list-group">
                    {amenities.map((amenity, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {amenity}
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveAmenity(index)}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Map Location */}
                <div className="mb-3">
                  <label htmlFor="mapLocation" className="form-label">
                    Google Map Location
                  </label>
                  <input
                    type="text"
                    id="mapLocation"
                    className="form-control"
                    placeholder="Google Map Embed URL"
                    value={mapLocation}
                    onChange={(e) => setMapLocation(e.target.value)}
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="mb-3">
                  <label htmlFor="images" className="form-label">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="images"
                    className="form-control"
                    multiple
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit Listing
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateListing;
