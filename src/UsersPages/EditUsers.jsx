import React, { useState, useEffect } from "react";
import HomePageButton from "../Components/Buttons/HomePageButton.jsx";
import api from "../init/instance.js";
import UpdateButton from "../Components/Buttons/UpdateButton.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function EditUsers({ token }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const authToken = token || localStorage.getItem("tokens");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get(`/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setData(res.data);
      } catch (e) {
        console.log("error in getting user: ", e.response.data);
      }
    };
    getUser();
  }, [authToken, userId]);

  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleEditUsers = async (e) => {
    try {
      e.preventDefault();
      const res = await api.patch(`/admin/users/${userId}/edit`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Updated User: ", res.data);
      navigate(`/admin/users/${userId}`);
    } catch (e) {
      console.log("error NewUsers F:", e.response.data);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
        Edit Users Here
      </h1>
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

          <UpdateButton userId={userId} />
        </form>
        <HomePageButton navigate={navigate} />
      </div>
    </div>
  );
}
