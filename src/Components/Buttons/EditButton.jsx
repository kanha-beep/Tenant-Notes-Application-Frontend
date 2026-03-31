import { useNavigate } from "react-router-dom";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function EditButton({ userId, noteId }) {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  const buttonClass = cn(uiTokens.buttonBase, uiTokens.buttonPrimary, "px-3 py-2 my-2");

  return (
    <div>
      {userRole === "admin" && toShowAdmin === "users" && (
        <button
          className={buttonClass}
          onClick={() => {
            navigate(`/admin/users/${userId}/edit`, { state: "users" });
          }}
        >
          Edit User
        </button>
      )}

      {userRole === "admin" && (
        <button
          className={buttonClass}
          onClick={() => {
            navigate(`/notes/${noteId}/edit`, { state: "notes" });
          }}
        >
          Edit Note
        </button>
      )}
    </div>
  );
}
