import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../components/layouts/layout";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8050/api/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Forgot Password - AG Realtors">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p-4 border-0" style={{ width: "400px" }}>
          <h2 className="text-center mb-3">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                Security Answer
              </label>
              <input
                type="text"
                id="answer"
                className="form-control"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-2"
              style={{ backgroundColor: "#bc986b", border: "none" }}
            >
              Reset Password
            </button>
            <NavLink to="/login" className="btn btn-outline-primary w-100">
              Login
            </NavLink>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
