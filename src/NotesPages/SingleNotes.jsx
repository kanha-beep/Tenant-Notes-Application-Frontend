/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/instance.js";
import SingleNotesCards from "./NotesCards/SingleNotesCards.jsx";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import { createToast, flashToast } from "../utils/toast.js";

export default function Notes() {
  const [msg, setMsg] = useState("");
  const { noteId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const userRole = localStorage.getItem("role");
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
        console.log("error Notes 1: ", e.response.data.message);
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
      console.log("check: notes ", res.data);
      setNotes(res.data);

      if (userRole === "user" && check) {
        flashToast("Task completed and comment sent to admin.", "success");
        navigate("/notes");
        return;
      }

      flashToast("Task updated successfully.", "success");
    } catch (e) {
      setMsg(createToast(e.response?.data?.message || "Error updating task"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container-fluid">
      <Msg msg={msg} setMsg={setMsg} />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          {notes && (
            <div
              key={notes._id}
              className="card shadow-lg mb-4"
              style={{
                minHeight: "20rem",
                borderRadius: "20px",
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center">
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
            </div>
          )}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <button
            onClick={() => navigate("/notes")}
            className="btn btn-primary btn-lg"
          >
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
}
