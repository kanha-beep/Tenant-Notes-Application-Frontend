import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function EditButton({ userId, noteId }) {
  const navigate = useNavigate();
  const [isRouting, setIsRouting] = useState(false);
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  const buttonClass = cn(uiTokens.buttonBase, uiTokens.buttonPrimary, "px-3 py-2 my-2 ml-5");

  const handleNavigate = (path, state) => {
    if (isRouting) {
      return;
    }
    setIsRouting(true);
    navigate(path, state ? { state } : undefined);
  };

  return (
    <div>
      {userRole === "admin" && toShowAdmin === "users" && (
        <button
          className={buttonClass}
          onClick={() => handleNavigate(`/admin/users/${userId}/edit`, "users")}
          disabled={isRouting}
          type="button"
        >
          {isRouting ? "Edit User..." : "Edit User"}
        </button>
      )}

      {userRole === "admin" && (
        <button
          className={buttonClass}
          onClick={() => handleNavigate(`/notes/${noteId}/edit`, "notes")}
          disabled={isRouting}
          type="button"
        >
          {isRouting ? "Edit..." : "Edit"}
        </button>
      )}
    </div>
  );
}
