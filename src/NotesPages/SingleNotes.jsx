/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/instance.js";
import SingleNotesCards from "./NotesCards/SingleNotesCards.jsx";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";
import { createToast } from "../utils/toast.js";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function Notes() {
  const [msg, setMsg] = useState("");
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState(null);
  const [check, setCheck] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getOneNotes = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/notes/${noteId}`);
        setNotes(res.data);
      } catch (e) {
        setMsg(createToast(e.response.data.message));
      } finally {
        setIsLoading(false);
      }
    };
    getOneNotes();
  }, [noteId]);

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
          {isLoading ? <LoadingSpinner size="small" text="Note loading..." /> : null}
          {notes && (
            <div key={notes._id} className={cn(uiTokens.panel, "mb-4")}>
              <SingleNotesCards
                n={notes}
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
