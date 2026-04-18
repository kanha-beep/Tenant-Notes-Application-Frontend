import React from "react";
import { Link } from "react-router-dom";

export default function Left() {
  return (
    <div className="h-full rounded-3xl bg-[rgba(255,255,255,0.95)] p-4 shadow-lg backdrop-blur">
      <div className="mb-4 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-sky-600">
          <span className="text-lg font-bold text-white">Admin</span>
        </div>
        <h5 className="mb-1 mt-3 text-xl font-bold text-slate-900">
          Admin Panel
        </h5>
        <p className="text-sm text-slate-500">System Administrator</p>
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100"
          to="/admin/dashboard"
        >
          <span>Home</span>
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100"
          to="/admin/users"
        >
          <span>Users</span>
          <span className="font-medium">Users</span>
        </Link>
        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100"
          to="/notes"
        >
          <span>Notes</span>
          <span className="font-medium">Notes</span>
        </Link>
        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100"
          to="/admin/plan"
        >
          <span>Plan</span>
          <span className="font-medium">Analytics</span>
        </Link>
        <Link
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100"
          to="/health"
        >
          <span>Health</span>
          <span className="font-medium">Settings</span>
        </Link>
      </nav>
    </div>
  );
}
