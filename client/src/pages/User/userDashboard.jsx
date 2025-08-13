import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/layouts/userMenu";
import toast from "react-hot-toast";

const UserDashboard = () => {
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
    navigate("/");
  };

  const editProfile = () => {
    navigate("/dashboard/user/edit-profile")
  }

  return (
    <Layout title="User Dashboard">
      <div
        className="container-fluid py-4"
        style={{
          backgroundColor: "#f4f5f7",
          minHeight: "100vh",
        }}
      >
        <div className="row">
          <UserMenu />

          {/* User Details Section */}
          <div className="col-lg-9 col-md-8">
            <div className="card shadow-sm p-4 border-0 bg-white">
              <div
                className="card-header text-white text-center"
                style={{ backgroundColor: "#494a53" }}
              >
                <h4>User Details</h4>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <strong>Name: </strong> {auth?.user?.name}
                </p>
                <p className="card-text">
                  <strong>Email: </strong> {auth?.user?.email}
                </p>
                <p className="card-text">
                  <strong>Contact: </strong> {auth?.user?.phone}
                </p>
                <p className="card-text">
                  <strong>Address: </strong> {auth?.user?.address}
                </p>
                <div className="text-center mt-4">
                  <button className="btn btn-primary me-3" onClick={editProfile}>
                    <i className="fa-solid fa-user-edit me-2"></i>
                    Edit Profile
                  </button>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    <i className="fa-solid fa-sign-out-alt me-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
