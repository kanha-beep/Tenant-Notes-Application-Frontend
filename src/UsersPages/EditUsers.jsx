import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import HomePageButton from "../Components/Buttons/HomePageButton.jsx";
import api from "../init/instance.js";
import UpdateButton from "../Components/Buttons/UpdateButton.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function EditUsers() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/admin/users/${userId}`);
        setData(res.data);
      } catch (e) {
        console.log("error in getting user: ", e.response.data);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [userId]);

  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleEditUsers = async (e) => {
    try {
      e.preventDefault();
      setIsUpdating(true);
      const res = await api.patch(`/admin/users/${userId}/edit`, data);
      console.log("Updated User: ", res.data);
      navigate(`/admin/users/${userId}`);
    } catch (e) {
      console.log("error NewUsers F:", e.response.data);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
        Edit Users Here
      </h1>
      {isLoading ? <LoadingSpinner size="small" text="User loading..." /> : null}
      <div className={cn(uiTokens.panel, "space-y-4")}>
        <form onSubmit={handleEditUsers} className="space-y-4">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Username of User"
            name="username"
            value={data.username}
            className={uiTokens.input}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Email of User"
            name="email"
            value={data.email}
            className={uiTokens.input}
          />
          <input
            type="text"
            onChange={handleChange}
            placeholder="Password of User"
            name="password"
            value={data.password}
            className={uiTokens.input}
          />

          <UpdateButton isLoading={isUpdating} />
        </form>
        <HomePageButton navigate={navigate} />
      </div>
    </div>
  );
}
