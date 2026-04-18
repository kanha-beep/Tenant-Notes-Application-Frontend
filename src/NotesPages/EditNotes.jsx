import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/instance.js";
import UpdateButton from "../Components/Buttons/UpdateButton.jsx";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import { createToast, flashToast } from "../utils/toast.js";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function EditNotes() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${noteId}/edit`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (e) {
        setMsg(createToast(e.response?.data?.message || "Error fetching note"));
      }
    };
    fetchNote();
  }, [noteId, token]);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/notes/${noteId}/edit`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Edited Note: ", res.data);
      flashToast("Note updated successfully.", "success");
      navigate(`/notes/${noteId}`);
    } catch (e) {
      setMsg(createToast(e.response?.data?.message || "Error updating note"));
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Msg msg={msg} setMsg={setMsg} />
      <div className="mb-6 text-center">
        <h1 className="py-4 text-3xl font-bold text-slate-900">Edit Note</h1>
      </div>

      <form onSubmit={handleEditNote} className={cn(uiTokens.panel, "space-y-4")}>
        <input
          type="text"
          name="title"
          placeholder="Title of Note"
          value={data.title}
          onChange={handleChange}
          className={uiTokens.input}
          required
        />
        <textarea
          name="content"
          placeholder="Content of Note"
          value={data.content}
          onChange={handleChange}
          className={cn(uiTokens.input, "min-h-32 resize-y")}
          rows="4"
          required
        />
        <UpdateButton />
      </form>

      <div className="mt-6 text-center">
        <button
          className={cn(uiTokens.buttonBase, uiTokens.buttonSecondary)}
          onClick={() => navigate("/notes")}
          type="button"
        >
          Back to Notes
        </button>
      </div>
    </div>
  );
}
