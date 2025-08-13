import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner.jsx";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:8050/api/auth/admin-auth", {
          headers: {
            Authorization: auth?.token, // Frontend already adds "Bearer"
          },
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Admin route error:", error.message);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  

  return ok ? <Outlet /> : <Spinner path="" />;
}
