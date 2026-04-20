import React, { useEffect, useState } from "react";
import api from "../init/instance.js";
import { useNavigate, useParams } from "react-router-dom";
import UpdateButton from "../Components/Buttons/UpdateButton.jsx";
import BackToProfileButton from "../Components/Buttons/BackToProfileButton.jsx";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import { createToast, flashToast } from "../utils/toast.js";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function EditUsersProfile() {
  const { userId } = useParams();
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const currentOwner = async () => {
      try {
        if (!token) {
          return;
        }
        const res = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData({
          username: res.data?.user?.username || "",
          password: "",
        });
      } catch (e) {
        console.log("current AllNotes: ", e.response.data);
      }
    };
    currentOwner();
  }, [token]);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/users/${userId}/edit`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Edited User: ", res.data);
      flashToast("Profile updated successfully.", "success");
      navigate(`/users/${userId}`);
    } catch (e) {
      setMsg(createToast(e.response?.data?.message || "Error updating profile"));
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Msg msg={msg} setMsg={setMsg} />
      <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
        Edit Profile
      </h1>
      <div className="mx-auto max-w-xl">
        <form onSubmit={handleEditUser} className={cn(uiTokens.panel, "space-y-4")}>
          <input
            type="text"
            name="username"
            placeholder="username of User"
            value={data.username}
            onChange={handleChange}
            className={uiTokens.input}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={data.password}
            onChange={handleChange}
            className={uiTokens.input}
          />
          <UpdateButton />
        </form>
      </div>
      <BackToProfileButton navigate={navigate} usersId={userId} />
    </div>
  );
}
