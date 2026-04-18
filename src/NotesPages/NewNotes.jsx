import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/instance.js";
import HomePageButton from "../Components/Buttons/HomePageButton.jsx";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import { createToast, flashToast } from "../utils/toast.js";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function NewNotes() {
  const userRole = localStorage.getItem("role");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({ title: "", content: "", user: "" });

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
      console.log("NewNotes: ........", res.data);
      flashToast("Note created successfully.", "success");
      navigate("/notes");
    } catch (e) {
      console.log("error NewNotes F:", e.response?.data);
      setMsg(createToast(e.response?.data?.message || "Failed to create note"));
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Msg msg={msg} setMsg={setMsg} />
      <div className="mb-6 text-center">
        <h1 className="py-4 text-3xl font-bold text-slate-900">Add Note Here By User</h1>
      </div>

      <form onSubmit={handleCreateNote} className={cn(uiTokens.panel, "space-y-4")}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Title of Note"
          name="title"
          value={data.title}
          className={uiTokens.input}
          required
        />
        <textarea
          onChange={handleChange}
          placeholder="Content of Note"
          name="content"
          value={data.content}
          className={cn(uiTokens.input, "min-h-32 resize-y")}
          rows="4"
          required
        />
        <input
          onChange={handleChange}
          placeholder="User of Note"
          name="user"
          value={data.user}
          className={uiTokens.input}
          required
        />
        <button
          type="submit"
          className={cn(uiTokens.buttonBase, uiTokens.buttonPrimary, "w-full")}
        >
          Create Note
        </button>
      </form>

      <div className="mt-6 text-center">
        <HomePageButton userRole={userRole} navigate={navigate} />
      </div>
    </div>
  );
}
