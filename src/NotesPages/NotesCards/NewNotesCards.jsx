import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../init/instance.js";
import PlanButton from "../../Components/Buttons/PlanButton.jsx";
import CreateButton from "../../Components/Buttons/CreateButton.jsx";
import HomePageButton from "../../Components/Buttons/HomePageButton.jsx";
import Msg from "../../Components/AlertBoxes/Msg.jsx";
import { createToast, flashToast } from "../../utils/toast.js";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function NewNotesCards() {
  const userRole = localStorage.getItem("role");
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

  const handleCreateNote = async (e) => {
    try {
      e.preventDefault();
      const res = await api.post("/notes/new", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("NewNotes: ", res.data);
      flashToast("Note created successfully.", "success");
      navigate("/notes");
    } catch (e) {
      setMsg(createToast(e.response.data));
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Msg msg={msg} setMsg={setMsg} action={<PlanButton />} />
      <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
        Add Notes Here by Admin
      </h1>
      <form onSubmit={handleCreateNote} className={cn(uiTokens.panel, "space-y-4")}>
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
        <CreateButton />
      </form>
      <div className="mt-6 text-center">
        <HomePageButton userRole={userRole} navigate={navigate} />
      </div>
    </div>
  );
}
