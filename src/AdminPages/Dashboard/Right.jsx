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
  const [isDownloadingUsers, setIsDownloadingUsers] = useState(false);
  const [isDownloadingNotes, setIsDownloadingNotes] = useState(false);

  const downloadUsers = async () => {
    try {
      setIsDownloadingUsers(true);
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
    } finally {
      setIsDownloadingUsers(false);
    }
  };

  const downloadNotes = async () => {
    try {
      setIsDownloadingNotes(true);
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
    } finally {
      setIsDownloadingNotes(false);
    }
  };

  return (
    <div className="h-full">
      <div className="mb-2 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-purple-600/60 p-4 text-white shadow-lg h-[5rem] hover:border-gray-500 hover:-translate-y-1 border-purple-700 border-2 transition duration-400 hover:shadow-lg ">
          <div className="flex items-center justify-between">
            <div className="contain w-full flex items-center justify-between">
              <div className="flex gap-3 items-center">
                {/* <h6 className="mb-2 text-white/70">Total Notes</h6> */}
                <h2 className="mb-0 text-3xl font-bold">
                  {(details?.kpis?.totalNotes ?? 0) == 0 ? (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  ) : (
                    <span>{details?.kpis?.totalNotes ?? 0}</span>
                  )}
                </h2>
                <div className="rounded-full bg-white/20 p-2 text-lg font-semibold flex justify-center items-center translate-y-[0.1rem]">
                  Notes
                </div>
              </div>
              <div className="flex gap-3">
                <AllNotesButton />
                <button
                  className={cn(
                    uiTokens.buttonBase,
                    "border border-white/25 bg-white/10 px-3 py-2 text-white hover:bg-white/20",
                  )}
                  onClick={downloadNotes}
                  disabled={isDownloadingNotes}
                  type="button"
                >
                  {isDownloadingNotes ? "Download Notes..." : "Download Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-pink-600/60 p-4 text-white shadow-lg h-[5rem] hover:border-slate-500 hover:shadow-lg hover:-translate-y-1 border-purple-700 border-2 transition duration-400">
          <div className="flex items-center justify-between">
            <div className="contain w-full flex items-center justify-between">
              <div className="contain w-full flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  {/* <h6 className="mb-2 text-white/70">Total Notes</h6> */}
                  <h2 className="mb-0 text-3xl font-bold">
                    {(details?.kpis?.totalUsers ?? 0) == 0 ? (
                      <span className="inline-block h-5 w-5 animate-spin border-white rounded-full border-2 border-t-transparent"></span>
                    ) : (
                      <span>{details?.kpis?.totalUsers ?? 0}</span>
                    )}
                  </h2>
                  <div className="rounded-full bg-white/20 p-2 text-lg font-semibold flex justify-center items-center translate-y-[0.1rem]">
                    Users
                  </div>
                </div>
                <div className="flex gap-3">
                  <AllUsersButton />
                  <button
                    className={cn(
                      uiTokens.buttonBase,
                      "border border-white/25 bg-white/10 px-3 py-2 text-white hover:bg-white/20",
                    )}
                    onClick={downloadUsers}
                    disabled={isDownloadingUsers}
                    type="button"
                  >
                    {isDownloadingUsers
                      ? "Download All Users..."
                      : "Download Users"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <div className="rounded-3xl bg-[rgba(255,255,255,0.95)] p-4 shadow-lg backdrop-blur">
            <h5 className="mb-3 text-lg font-bold text-slate-900">Calendar</h5>
            <Calendar onChange={setValue} value={value} className="w-100" />

            <div className="mt-4 flex flex-wrap gap-2">
              <PlanButton />
              <HealthButton />
            </div>
          </div>

          <div className="rounded-3xl bg-[rgba(255,255,255,0.95)] p-4 shadow-lg backdrop-blur">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              SLA and usage
            </p>
            <div className="space-y-2 text-sm text-slate-700">
              <p>SLA compliance: {details?.sla?.complianceRate ?? 0}%</p>
              <p>Breaches: {details?.sla?.breachCount ?? 0}</p>
              <p>Plan: {details?.billing?.plan ?? "free"}</p>
              <p>
                Seats: {details?.usage?.seatsUsed ?? 0}/
                {details?.usage?.seatsProvisioned ?? 0}
              </p>
              <p>Note usage: {details?.usage?.noteUtilization ?? "0/0"}</p>
            </div>
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
                  {details?.usage?.seatsUsed ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-100 p-3">
                <div>
                  <h6 className="mb-1 font-semibold">Recent Activity</h6>
                  <small className="text-slate-500">Latest user actions</small>
                </div>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                  {details?.activity?.length ?? 0}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[rgba(255,255,255,0.95)] p-4 shadow-lg backdrop-blur">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              AI tenant operations assistant
            </p>
            <div className="space-y-3 text-sm text-slate-700">
              <p>
                {details?.aiAssistant?.headline ||
                  "No workload issues detected."}
              </p>
              {details?.aiAssistant?.overloadedMembers?.map((member) => (
                <div
                  key={member.userId}
                  className="rounded-2xl bg-slate-100 p-3"
                >
                  <p className="font-semibold">{member.username}</p>
                  <p className="text-slate-500">{member.reason}</p>
                </div>
              ))}
              {details?.aiAssistant?.followUpDrafts?.slice(0, 2).map((item) => (
                <div
                  key={item.noteId}
                  className="rounded-2xl border border-slate-200 p-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Draft follow-up
                  </p>
                  <p>{item.draft}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
