import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../init/instance.js";
import GoHomeButton from "../Components/Buttons/GoHomeButton.jsx";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import { createToast } from "../utils/toast.js";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function CurrentOwnerProfile() {
  const { userId } = useParams();
  const [owner, setOwner] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const currentOwner = async () => {
      try {
        if (!token) {
          return;
        }
        const res = await api.get(`/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOwner(res.data.user);
      } catch (e) {
        setMsg(createToast(e.response?.data?.message || "Error loading profile"));
      }
    };
    currentOwner();
  }, [token]);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
      <Msg msg={msg} setMsg={setMsg} />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-5 text-center">
          <div className="mb-3 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <span className="text-lg font-bold text-white">User</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            {owner && (
              <div className={cn(uiTokens.panel, "rounded-[2rem] p-8")}>
                <div className="mb-4 text-center">
                  <div className="mb-3 inline-flex h-24 w-24 items-center justify-center rounded-full bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
                    <span className="text-4xl font-bold text-white">
                      {owner?.username?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="mb-1 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-2xl font-bold text-transparent">
                    {owner?.username}
                  </h3>
                  <p className="text-slate-500">
                    Member since {new Date().getFullYear()}
                  </p>
                </div>

                <div className="mb-4 grid gap-3">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="mb-2 flex items-center">
                      <small className="font-medium text-slate-500">User ID</small>
                    </div>
                    <p className="mb-0 font-mono text-sm text-slate-800">
                      {owner?._id}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="mb-2 flex items-center">
                      <small className="font-medium text-slate-500">Username</small>
                    </div>
                    <p className="mb-0 font-bold text-sky-700">{owner?.username}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-3">
                    <div className="mb-2 flex items-center">
                      <small className="font-medium text-slate-500">Organization</small>
                    </div>
                    <p className="mb-0 font-bold text-emerald-700">
                      {owner?.tenant?.name}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2">
                  <button
                    className={cn(uiTokens.buttonBase, uiTokens.buttonAccent, "w-full")}
                    onClick={() => navigate(`/users/${owner?._id}/edit`)}
                    type="button"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center">
          <GoHomeButton navigate={navigate} />
        </div>
      </div>
    </div>
  );
}
