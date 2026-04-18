import React from "react";
import { useNavigate } from "react-router-dom";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function ViewButton({ n }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  const buttonClass = cn(
    uiTokens.buttonBase,
    uiTokens.buttonSecondary,
    "my-1 px-3 py-2"
  );

  return (
    <div>
      {userRole === "user" && (
        <button
          onClick={() => {
            navigate(`/notes/${n?._id}`);
          }}
          className={buttonClass}
          type="button"
        >
          <span>View Note</span>
        </button>
      )}
      {userRole === "admin" && toShowAdmin === "notes" && (
        <button
          onClick={() => {
            navigate(`/notes/${n?._id}`);
          }}
          className={buttonClass}
          type="button"
        >
          <span>View</span>
          <span>View Note</span>
        </button>
      )}
      {userRole === "admin" && toShowAdmin === "users" && (
        <button
          onClick={() => {
            navigate(`/admin/users/${n?._id}`);
          }}
          className={buttonClass}
          type="button"
        >
          <span>User</span>
          <span>View User</span>
        </button>
      )}
    </div>
  );
}
