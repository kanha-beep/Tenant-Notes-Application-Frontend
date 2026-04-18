/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../init/instance.js";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import SingleUsersCards from "./UsersCards/SingleUsersCards.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { createToast, flashToast } from "../utils/toast.js";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function SingleUsers() {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [users, setUsers] = useState(null);
  const [msg, setMsg] = useState("");
  const [noteForm, setNoteForm] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId, noteId } = useParams();
  const toShowAdmin = localStorage.getItem("toShowAdmin");

  useEffect(() => {
    const getOneUser = async () => {
      try {
        const res = await api.get(`/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("get one note AllNotes F: ", res.data);
        setUsers(res.data);
      } catch (e) {
        console.log("error Notes: ", e.response.data.message);
        setMsg(createToast(e.response.data.message));
      }
    };
    getOneUser();
  }, []);

  const handleNoteChange = (e) => {
    setNoteForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateNoteForUser = async (e) => {
    e.preventDefault();
    if (!users?.email) {
      setMsg(createToast("User email not found.", "error"));
      return;
    }

    try {
      setIsSubmitting(true);
      await api.post(
        "/notes/new",
        {
          title: noteForm.title,
          content: noteForm.content,
          userEmail: users.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      flashToast(`Note added for ${users.username}.`, "success");
      setNoteForm({ title: "", content: "" });
      navigate("/notes");
    } catch (e) {
      setMsg(createToast(e.response?.data?.message || "Failed to create note", "error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-3 py-4">
      {/* {userRole === "admin" && toShowAdmin === "users" && (
        <h2 className="mb-4 text-center text-3xl font-black tracking-[-0.03em] text-slate-900">
          Single User
        </h2>
      )} */}
      <Msg msg={msg} setMsg={setMsg} />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="min-w-0">
          {userRole === "admin" && toShowAdmin === "users" && (
            <SingleUsersCards
              users={users}
              token={token}
              navigate={navigate}
              key={users?._id}
              n={users}
              userRole={userRole}
              toShowAdmin={toShowAdmin}
              userId={userId}
              noteId={noteId}
            />
          )}
        </div>

        {userRole === "admin" && toShowAdmin === "users" && users && (
          <section className={cn(uiTokens.panel, "h-fit") }>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
              Add note for this user
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-slate-950">
              Create a note directly from {users.username}&apos;s profile
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This note will be attached to <span className="font-semibold text-slate-900">{users.email}</span> in the backend.
            </p>

            <form onSubmit={handleCreateNoteForUser} className="mt-6 space-y-4">
              <label className="block">
                <span className={uiTokens.label}>Title</span>
                <input
                  type="text"
                  name="title"
                  value={noteForm.title}
                  onChange={handleNoteChange}
                  className={uiTokens.input}
                  placeholder="Enter note title"
                  required
                />
              </label>

              <label className="block">
                <span className={uiTokens.label}>Content</span>
                <textarea
                  name="content"
                  value={noteForm.content}
                  onChange={handleNoteChange}
                  className={cn(uiTokens.input, "min-h-36 resize-y")}
                  placeholder="Write the note for this user"
                  required
                />
              </label>

              <label className="block">
                <span className={uiTokens.label}>User email</span>
                <input
                  type="text"
                  value={users.email}
                  readOnly
                  className={cn(uiTokens.input, "bg-slate-50 text-slate-500")}
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(uiTokens.buttonBase, uiTokens.buttonAccent, "w-full")}
              >
                {isSubmitting ? "Creating note..." : "Create note for user"}
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}
