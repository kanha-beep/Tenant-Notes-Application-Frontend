import React, { useState } from "react";
import AllNotesButton from "../../Components/Buttons/AllNotesButton.jsx";
import AllUsersButton from "../../Components/Buttons/AllUsersButton.jsx";
import PlanButton from "../../Components/Buttons/PlanButton.jsx";
import HealthButton from "../../Components/Buttons/HealthButton.jsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../../init/instance.js";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function Right({ details }) {
  const [value, setValue] = useState(new Date());

  const downloadUsers = async () => {
    try {
      const res = await api.get("/admin/users/reports");
      let csvContent = "data:text/csv;charset=utf-8,";
      const row = res?.data?.split("\n");
      row.forEach((r) => {
        csvContent += r + "\n";
      });
      const encodeUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodeUri);
      link.setAttribute("download", "Users_Report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log("error download: ", e?.response?.data?.message);
      alert(e?.response?.data?.message);
    }
  };

  const downloadNotes = async () => {
    try {
      const res = await api.get("/notes/reports");
      const csvContent = "data:text/csv;charset=utf-8," + res?.data;
      const encodeUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodeUri);
      link.setAttribute("download", "Notes_Report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  };

  return (
    <div className="h-full">
      <div className="mb-4">
        <h1 className="mb-2 text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-white/70">
          Welcome back! Here's what's happening with your tenant management
          system.
        </p>
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="mb-2 text-white/70">Total Notes</h6>
              <h2 className="mb-0 text-3xl font-bold">
                {details?.totalNotes ?? 0}
              </h2>
            </div>
            <div className="rounded-full bg-white/20 p-3 text-lg font-semibold">
              Notes
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <AllNotesButton />
            <button
              className={cn(
                uiTokens.buttonBase,
                "border border-white/25 bg-white/10 px-3 py-2 text-white hover:bg-white/20"
              )}
              onClick={downloadNotes}
              type="button"
            >
              Download Notes
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-[linear-gradient(135deg,#f093fb_0%,#f5576c_100%)] p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="mb-2 text-white/70">Total Users</h6>
              <h2 className="mb-0 text-3xl font-bold">
                {details?.totalUsers ?? 0}
              </h2>
            </div>
            <div className="rounded-full bg-white/20 p-3 text-lg font-semibold">
              Users
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <AllUsersButton />
            <button
              className={cn(
                uiTokens.buttonBase,
                "border border-white/25 bg-white/10 px-3 py-2 text-white hover:bg-white/20"
              )}
              onClick={downloadUsers}
              type="button"
            >
              Download All Users
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-[rgba(255,255,255,0.95)] p-4 shadow-lg backdrop-blur">
          <h5 className="mb-3 text-lg font-bold text-slate-900">Calendar</h5>
          <Calendar onChange={setValue} value={value} className="w-100" />

          <div className="mt-4 flex flex-wrap gap-2">
            <PlanButton />
            <HealthButton />
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-3xl bg-[rgba(255,255,255,0.95)] p-4 shadow-lg backdrop-blur">
            <h5 className="mb-4 text-lg font-bold text-slate-900">
              Quick Actions
            </h5>
            <div className="grid gap-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-3">
                <div>
                  <h6 className="mb-1 font-semibold">System Health</h6>
                  <small className="text-slate-500">
                    All systems operational
                  </small>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-3">
                <div>
                  <h6 className="mb-1 font-semibold">Active Sessions</h6>
                  <small className="text-slate-500">
                    Users currently online
                  </small>
                </div>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                  {details?.totalUsers ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-3">
                <div>
                  <h6 className="mb-1 font-semibold">Recent Activity</h6>
                  <small className="text-slate-500">Latest user actions</small>
                </div>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                  {details?.totalNotes ?? 0}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[rgba(255,255,255,0.95)] p-4 shadow-lg backdrop-blur">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Tenant admins
            </p>
            {details?.allAdmins?.map((admin) => (
              <ul key={admin?._id} className="mb-2 list-disc pl-5 text-slate-700">
                <li>{admin?.email}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
