import React from "react";
import { NavLink } from "react-router-dom";
import "./layout.css";

const UserMenu = () => {
  return (
    <div className="col-lg-3 col-md-4 mb-4">
      <div
        className="card shadow-sm border-0 bg-white"
        style={{ borderRadius: "8px" }}
      >
        <div
          className="card-header text-center"
          style={{
            backgroundColor: "#bc986b",
            color: "white",
            fontWeight: "600",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <h5 className="m-0">User Menu</h5>
        </div>
        <div className="card-body">
          <ul className="list-unstyled">
            <li className="mb-3">
              <NavLink
                to="/dashboard/user"
                className="text-decoration-none d-flex align-items-center menu-link"
                style={{ color: "#333" }}
              >
                <i
                  className="fa-solid fa-user-circle me-2"
                  style={{ color: "#bc986b" }}
                ></i>
                Dashboard
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/dashboard/user/edit-profile"
                className="text-decoration-none d-flex align-items-center menu-link"
                style={{ color: "#333" }}
              >
                <i
                  className="fa-solid fa-pen-to-square me-2"
                  style={{ color: "#bc986b" }}
                ></i>
                Edit Profile
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/wishlist"
                className="text-decoration-none d-flex align-items-center menu-link"
                style={{ color: "#333" }}
              >
                <i
                  className="fa-solid fa-heart me-2"
                  style={{ color: "#bc986b" }}
                ></i>
                Your Wishlist
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/submit-property"
                className="text-decoration-none d-flex align-items-center menu-link"
                style={{ color: "#333" }}
              >
                <i
                  className="fa-solid fa-upload me-2"
                  style={{ color: "#bc986b" }}
                ></i>
                Submit Property
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/career"
                className="text-decoration-none d-flex align-items-center menu-link"
                style={{ color: "#333" }}
              >
                <i
                  className="fa-solid fa-briefcase me-2"
                  style={{ color: "#bc986b" }}
                ></i>
                Career
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/dashboard/user/support"
                className="text-decoration-none d-flex align-items-center menu-link"
                style={{ color: "#333" }}
              >
                <i
                  className="fa-solid fa-headset me-2"
                  style={{ color: "#bc986b" }}
                ></i>
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
