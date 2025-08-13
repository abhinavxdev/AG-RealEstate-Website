import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/layouts/layout";
import AdminMenu from "../../components/layouts/adminMenu";

const ManageCategories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:8050/api/categories");
      setCategories(data.categories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  // Create category
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8050/api/categories/create", { name });
      toast.success(data.message);
      setName("");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to create category");
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:8050/api/categories/${id}`);
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout title="Manage Categories">
      <div className="container-fluid py-4" style={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
        <div className="row">
          <AdminMenu />
          <div className="col-lg-9">
            <div className="card shadow-lg border-0">
              <div className="card-header text-white" style={{ backgroundColor: "#494a53" }}>
                <h3 className="mb-0">Manage Categories</h3>
              </div>
              <div className="card-body">
                {/* Add Category Form */}
                <form onSubmit={handleCreate} className="mb-4">
                  <div className="row align-items-end">
                    <div className="col-md-8">
                      <label className="form-label fw-bold">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-4 mt-2 mt-md-0">
                      <button type="submit" className="btn btn-success w-100">
                        <i className="fa-solid fa-plus me-2"></i> Add Category
                      </button>
                    </div>
                  </div>
                </form>

                {/* Category List */}
                <h5 className="fw-bold">Existing Categories</h5>
                {categories.length > 0 ? (
                  <ul className="list-group mt-3">
                    {categories.map((category) => (
                      <li key={category._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-semibold">{category.name}</span>
                        <button className="btn btn-danger btn-sm" disabled onClick={() => handleDelete(category._id)}>
                          <i className="fa-solid fa-trash"></i> Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No categories available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageCategories;
