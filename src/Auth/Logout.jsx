import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/instance.js";

export default function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/auth/logout");
      } catch (error) {
        console.log("Logout request failed", error?.response?.data?.message);
      } finally {
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("toShowAdmin");
        setIsLoggedIn(false);
        navigate(`/auth`);
      }
    };

    logout();
  }, []);
  return null;
}
