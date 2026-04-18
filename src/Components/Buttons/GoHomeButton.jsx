import React from "react";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function GoHomeButton({ navigate }) {
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  const buttonClass = cn(uiTokens.buttonBase, uiTokens.buttonSecondary, "my-2 px-3 py-2");

  return (
    <div>
      {userRole === "users" && (
        <button
          className={buttonClass}
          onClick={() => navigate("/notes", { state: "notes" })}
          type="button"
        >
          User can go Home
        </button>
      )}
      {userRole === "admin" && toShowAdmin === "users" && (
        <button
          className={buttonClass}
          onClick={() => navigate("/admin/users", { state: "users" })}
          type="button"
        >
          Admin can go Home
        </button>
      )}
      {userRole === "admin" && toShowAdmin === "notes" && (
        <button
          className={buttonClass}
          onClick={() => navigate("/admin/users", { state: "users" })}
          type="button"
        >
          Admin can go Home
        </button>
      )}
    </div>
  );
}
