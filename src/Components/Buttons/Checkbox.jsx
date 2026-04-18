import React from "react";

export default function Checkbox({ check, setCheck, toShowAdmin }) {
  const userRole = localStorage.getItem("role");
  const checkbox = (
    <input
      type="checkbox"
      checked={check}
      onChange={(e) => {
        setCheck(e.target.checked);
      }}
      className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
    />
  );
  return (
    <div>
      {userRole === "user" && checkbox}
      {userRole === "admin" && toShowAdmin === "notes" && checkbox}
      {userRole === "admin" && toShowAdmin === "users" && checkbox}
    </div>
  );
}
