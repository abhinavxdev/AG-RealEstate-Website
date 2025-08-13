import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";
import "./layout.css";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <div className="container-fluid bg-white">
      {/* Upper Navbar */}
      <div className="row">
        <div className="col">
          <nav className="navbar d-none d-lg-flex sticky-top nav justify-content-evenly upper-head border-bottom py-1">
            <div className="col-2">
              <li className="nav-item border-end text-end">
                <a href="tel:+919717616777" target="_blank" className="nav-link">
                  <i
                    className="fa-solid fa-phone me-2"
                    style={{ color: "#bc986b" }}
                  />
                  +91 9717-616-777
                </a>
              </li>
            </div>
            <div className="col-3">
              <li className="nav-item">
                <a href="mailto:mail.agrealtors@gmail.com" target="_blank" className="nav-link">
                  <i
                    className="fa-regular fa-envelope me-2"
                    style={{ color: "#bc986b" }}
                  />
                  mail.agrealtors@gmail.com
                </a>
              </li>
            </div>
            <span className="col-5" />
            <div className="col-2 fs-5">
              <a href="https://wa.me/+917011190976" target="_blank">
                <i className="fa-brands fa-whatsapp me-3" />
              </a>
              <a href="https://instagram.com/ag_realtors" target="_blank">
                <i className="fa-brands fa-instagram me-3" />
              </a>
              <a href="https://www.youtube.com/@AG-Realtors" target="_blank">
                <i className="fa-brands fa-youtube me-3" />
              </a>
              <a href="https://www.facebook.com/agrealtorsdwarka/" target="_blank">
                <i className="fa-brands fa-facebook me-3" />
              </a>
              <a href="mailto:mail.agrealtors@gmail.com" target="_blank">
                <i className="fa-solid fa-envelope" />
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="row mb-2 mb-lg-0">
        <div className="col">
          <nav className="navbar navbar-expand-lg sticky-top nav justify-content-evenly lower-head py-0">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar"
            >
              <span className="navbar-toggler-icon" />
            </button>

            {/* Logo */}
            <NavLink to="/" className="navbar-brand">
              <img src={logo} alt="logo" style={{ width: "12rem" }} />
            </NavLink>

            {/* Phone for Mobile View */}
            <div className="d-lg-none">
              <a href="tel:+919717616777" className="nav-link">
                <i className="fa-solid fa-phone" />
              </a>
            </div>

            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="nav container justify-content-evenly navbar-nav me-auto">
                <li className="nav-item text-center">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <NavLink to="/about-us" className="nav-link">
                    About
                  </NavLink>
                </li>
                <li className="nav-item text-center dropdown">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Properties
                    <i className="fa-solid fa-angle-down ms-2" />
                  </a>
                  <div className="dropdown-menu">
                    <NavLink to="/categories/apartment" className="dropdown-item nav-link text-center mb-1">
                      Apartment
                    </NavLink>
                    <NavLink to="/categories/farmhouse" className="dropdown-item nav-link text-center mb-1">
                      Farmhouse
                    </NavLink>
                    <NavLink to="/categories/duplex" className="dropdown-item nav-link text-center mb-1">
                      Duplex
                    </NavLink>
                    <NavLink to="/categories/villas" className="dropdown-item nav-link text-center mb-1">
                      Villas
                    </NavLink>
                    <NavLink to="/categories/office" className="dropdown-item nav-link text-center mb-1">
                      Office
                    </NavLink>
                    <NavLink to="/categories/bunglow" className="dropdown-item nav-link text-center mb-1">
                      Bunglow
                    </NavLink>
                    <NavLink to="/listings" className="dropdown-item nav-link text-center mb-1">
                      Other's
                    </NavLink>
                  </div>
                </li>
                <li className="nav-item text-center">
                  <NavLink to="/listings" className="nav-link">
                    Listings
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <NavLink to="/contact-us" className="nav-link">
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <NavLink to="/wishlist" className="nav-link">
                    Wishlist
                  </NavLink>
                </li>
                <li className="nav-item text-center">
                  <div>
                    {!auth?.user ? (
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    ) : (
                      <div className="dropdown d-inline">
                        <a
                          className="nav-link"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          {auth?.user?.name}
                          <i className="fa-solid fa-angle-down ms-2" />
                        </a>
                        <ul className="dropdown-menu text-center">
                          <li>
                            <NavLink
                              className="dropdown-item nav-link"
                              to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                }`}
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item nav-link"
                              to="/login"
                              onClick={handleLogout}
                            >
                              Logout
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
                <button
                  type="button"
                  className="btn"
                  style={{ backgroundColor: "#bc986b" }}
                >
                  <NavLink to="/submit-property" className="text-white">
                    SUBMIT PROPERTY
                  </NavLink>
                </button>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
