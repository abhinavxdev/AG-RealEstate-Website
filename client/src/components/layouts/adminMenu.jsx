import React from "react";
import { NavLink } from "react-router-dom";
import "./layout.css";

const AdminMenu = () => {
  const menuItems = [
    { path: "/dashboard/admin/lead-dashboard", icon: "fa-chart-line", label: "Manage Leads" },
    { path: "/dashboard/admin/user-details", icon: "fa-user-shield", label: "Manage Users" },
    { path: "/dashboard/admin/manage-listings", icon: "fa-list", label: "Manage Listings" },
    { path: "/dashboard/admin/contact-dashboard", icon: "fa-user-circle", label: "Contact Information" },
    { path: "/dashboard/admin/get-properties", icon: "fa-building", label: "Manage Properties" },
    { path: "/dashboard/admin/newsletter-dashboard", icon: "fa-envelope", label: "Newsletter Dashboard" },
    { path: "/dashboard/admin/create-listing", icon: "fa-plus-circle", label: "Create Listings" },
    { path: "/dashboard/admin/create-category", icon: "fa-tags", label: "Create Categories" },
  ];

  return (
    <div className="col-lg-3 col-md-4 mb-4">
      <div className="card shadow-sm border-0 bg-white rounded">
        <div className="card-header text-center text-white fw-semibold" style={{ backgroundColor: "#bc986b" }}>
          <h5 className="m-0">Admin Menu</h5>
        </div>
        <div className="card-body p-3">
          <ul className="list-unstyled">
            {menuItems.map((item, index) => (
              <li key={index} className="mb-3">
                <NavLink to={item.path} className="text-decoration-none d-flex align-items-center menu-link text-dark">
                  <i className={`fa-solid ${item.icon} me-2`} style={{ color: "#bc986b" }}></i>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
