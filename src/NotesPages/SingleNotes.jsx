/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/instance.js";
import SingleNotesCards from "./NotesCards/SingleNotesCards.jsx";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import { createToast } from "../utils/toast.js";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function Notes() {
  const [msg, setMsg] = useState("");
  const { noteId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [notes, setNotes] = useState(null);
  const [check, setCheck] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getOneNotes = async () => {
      try {
        const res = await api.get(`/notes/${noteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(res.data);
      } catch (e) {
        setMsg(createToast(e.response.data.message));
      }
    };
    getOneNotes();
  }, []);

  useEffect(() => {
    if (notes) {
      setCheck(notes.check);
      setFeedback(notes.userFeedback || "");
    }
  }, [notes]);

  const handleCheckChange = (nextValue) => {
    setCheck(nextValue);
  };

  const handleSubmitTask = async () => {
    try {
      setIsSaving(true);
      const res = await api.patch(`/notes/${noteId}`, {
        check,
        userFeedback: feedback,
      });
      setNotes(res.data);
      navigate("/notes");
    } catch (e) {
      setMsg(createToast(e.response?.data?.message || "Error updating task"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Msg msg={msg} setMsg={setMsg} />
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          {notes && (
            <div key={notes._id} className={cn(uiTokens.panel, "mb-4")}>
              <SingleNotesCards
                n={notes}
                token={token}
                navigate={navigate}
                noteId={noteId}
                check={check}
                setCheck={handleCheckChange}
                feedback={feedback}
                setFeedback={setFeedback}
                onSubmitTask={handleSubmitTask}
                isSaving={isSaving}
              />
            </div>
          )}
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate("/notes")}
          className={cn(uiTokens.buttonBase, uiTokens.buttonPrimary)}
          type="button"
        >
          Home Page
        </button>
      </div>
    </div>
  );
}
