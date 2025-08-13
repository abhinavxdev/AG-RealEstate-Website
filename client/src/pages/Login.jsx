// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import Layout from "../components/layouts/layout";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/auth";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8050/api/auth/login", {
//         email,
//         password,
//       });
//       if (res && res.data.success) {
//         toast.success(res.data.message);
//         setAuth({
//           ...auth,
//           user: res.data.user,
//           token: res.data.token,
//         });
//         localStorage.setItem("auth", JSON.stringify(res.data));
//         navigate(location.state?.from || "/");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <Layout title="Login - AG Realtors">
//       <div className="container d-flex justify-content-center align-items-center vh-100">
//         <div className="card shadow-lg p-4 border-0" style={{ width: "400px" }}>
//           <h2 className="text-center mb-3">Login</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="form-control"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="btn btn-primary w-100 mb-2"
//               style={{ backgroundColor: "#bc986b", border: "none" }}
//             >
//               Login
//             </button>
//             <NavLink to="/register" className="btn btn-outline-primary w-100 mb-2">
//               Register
//             </NavLink>
//             <NavLink to="/forgot-password" className="btn btn-outline-secondary w-100">
//               Forgot Password
//             </NavLink>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Layout from "../components/layouts/layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8050/api/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        // Set auth state and save token to localStorage
        setAuth({
          ...auth,
          user: res.data.user,
          token: `Bearer ${res.data.token}`, // Add "Bearer" prefix
        });
        localStorage.setItem("auth", JSON.stringify({
          user: res.data.user,
          token: `Bearer ${res.data.token}`,
        }));
        navigate(location.state?.from || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - AG Realtors">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-lg p-4 border-0" style={{ width: "400px" }}>
          <h2 className="text-center mb-3">Login</h2>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-2"
              style={{ backgroundColor: "#bc986b", border: "none" }}
            >
              Login
            </button>
            <NavLink to="/register" className="btn btn-outline-primary w-100 mb-2">
              Register
            </NavLink>
            <NavLink to="/forgot-password" className="btn btn-outline-secondary w-100">
              Forgot Password
            </NavLink>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
