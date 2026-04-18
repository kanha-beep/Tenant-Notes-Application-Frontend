import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../init/instance.js";
import PlanButton from "../../Components/Buttons/PlanButton.jsx";
import CreateButton from "../../Components/Buttons/CreateButton.jsx";
import HomePageButton from "../../Components/Buttons/HomePageButton.jsx";
import Msg from "../../Components/AlertBoxes/Msg.jsx";
import { createToast, flashToast } from "../../utils/toast.js";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function NewUsersCards() {
  const userRole = localStorage.getItem("role");
  const location = useLocation();
  const toShowAdmin = location?.state || "users";
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({
    title: "",
    content: "",
    email: "",
    username: "",
  });

  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/users/new", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User created successfully:", res.data);
      flashToast("User created successfully.", "success");
      navigate("/admin/users");
    } catch (error) {
      setMsg(
        createToast(error.response?.data?.message || "Failed to create user")
      );
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Msg msg={msg} setMsg={setMsg} action={<PlanButton />} />
      <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
        Add Users Here by Admin
      </h1>
      <form onSubmit={handleCreateUser} className={cn(uiTokens.panel, "space-y-4")}>
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
          placeholder="Title of User"
          name="title"
          value={data.title}
          className={uiTokens.input}
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="Content of User"
          name="content"
          value={data.content}
          className={uiTokens.input}
        />
        <CreateButton navigate={navigate} />
      </form>
      <div className="mt-6 text-center">
        <HomePageButton
          userRole={userRole}
          toShowAdmin={toShowAdmin}
          navigate={navigate}
        />
      </div>
    </div>
  );
}
