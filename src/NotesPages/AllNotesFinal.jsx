import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AllNotes from "./AllNotes.jsx";
import NewButton from "../Components/Buttons/NewButton.jsx";
import PageButtons from "../Components/Buttons/PageButtons.jsx";
import SwitchMode from "../Components/Buttons/SwitchMode.jsx";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import { createToast } from "../utils/toast.js";

const THIRTY_MINUTES_MS = 30 * 60 * 1000;

export default function AllNotesFinal() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [owner, setOwner] = useState([]);
  const token = localStorage.getItem("tokens");
  const userRole = localStorage.getItem("role");
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  const [mode, setMode] = useState(false);
  const [toShowAdmin, setToShowAdmin] = useState(location.state || "notes");

  useEffect(() => {
    if (toShowAdmin) localStorage.setItem("toShowAdmin", toShowAdmin);
  }, [toShowAdmin]);

  const userNotes = useMemo(() => {
    if (userRole !== "user") return [];
    return filterNotes.filter(Boolean);
  }, [filterNotes, userRole]);

  useEffect(() => {
    if (userRole !== "user" || userNotes.length === 0) return;

    const assignmentKey = "seen_task_assignments";
    const rawSeen = localStorage.getItem(assignmentKey);
    const seenAssignments = rawSeen ? JSON.parse(rawSeen) : {};

    const newestUnseen = userNotes.find((note) => !seenAssignments[note._id]);
    if (newestUnseen) {
      setMsg(createToast(`Task updated: ${newestUnseen.title}. Deadline is ${new Date(newestUnseen.dueAt).toLocaleTimeString()}.`, "success"));
      seenAssignments[newestUnseen._id] = Date.now();
      localStorage.setItem(assignmentKey, JSON.stringify(seenAssignments));
    }
  }, [userNotes, userRole]);

  useEffect(() => {
    if (userRole !== "user" || userNotes.length === 0) return;

    const checkReminders = () => {
      const now = Date.now();
      const reminderKey = "task_reminder_history";
      const rawReminderHistory = localStorage.getItem(reminderKey);
      const reminderHistory = rawReminderHistory ? JSON.parse(rawReminderHistory) : {};

      const reminderTarget = userNotes.find((note) => {
        if (note.check) return false;
        const createdTime = new Date(note.createdAt).getTime();
        if (now - createdTime < THIRTY_MINUTES_MS) return false;
        const lastReminder = reminderHistory[note._id] || 0;
        return now - lastReminder >= THIRTY_MINUTES_MS;
      });

      if (reminderTarget) {
        reminderHistory[reminderTarget._id] = now;
        localStorage.setItem(reminderKey, JSON.stringify(reminderHistory));
        setMsg(createToast(`Reminder: ${reminderTarget.title} is still pending. Deadline is ${new Date(reminderTarget.dueAt).toLocaleTimeString()}.`, "error"));
      }
    };

    checkReminders();
    const intervalId = setInterval(checkReminders, 60000);
    return () => clearInterval(intervalId);
  }, [userNotes, userRole]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${mode ? "dark-mode" : ""}`}>
      <Msg msg={msg} setMsg={setMsg} />
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          {/* <h1 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${mode ? "text-white" : "text-gray-800"}`}>
            All Notes
          </h1> */}
          <div className="flex justify-center">
            {/* <SwitchMode mode={mode} setMode={setMode} /> */}
          </div>
        </div>

        <div className="mb-8">
          <NewButton
            navigate={navigate}
            userRole={userRole}
            toShowAdmin={toShowAdmin}
          />
        </div>

        <div className="mb-8">
          <PageButtons
            token={token}
            setFilterNotes={setFilterNotes}
            userRole={userRole}
            setUsers={setUsers}
            setNotes={setNotes}
            filterNotes={filterNotes}
            toShowAdmin={toShowAdmin}
            setToShowAdmin={setToShowAdmin}
          />
        </div>

        <AllNotes
          navigate={navigate}
          owner={owner}
          setOwner={setOwner}
          token={token}
          users={users}
          setUsers={setUsers}
          msg={msg}
          setMsg={setMsg}
          notes={notes}
          setNotes={setNotes}
          filterNotes={filterNotes}
          setFilterNotes={setFilterNotes}
          setIsPage={() => {}}
          toShowAdmin={toShowAdmin}
          setToShowAdmin={setToShowAdmin}
        />
      </div>
    </div>
  );
}
