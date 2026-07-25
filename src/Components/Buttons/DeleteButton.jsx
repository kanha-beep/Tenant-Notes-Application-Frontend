import { useState } from "react";
import api from "../../init/instance.js";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function DeleteButton({
  n,
  navigate,
  userRole,
  toShowAdmin,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
<<<<<<< HEAD
    if (isDeleting || !id) {
      return;
    }

    try {
      setIsDeleting(true);

      if (userRole === "admin" && toShowAdmin === "users") {
        await api.delete(`/admin/users/${id}`);
        navigate("/admin/users");
        return;
      }

      if (userRole === "admin" && toShowAdmin === "notes") {
        await api.delete(`/notes/${id}`);
        navigate("/notes");
        return;
      }

      if (userRole === "admin") {
        await api.delete(`/notes/${id}`);
        navigate("/notes");
      }
    } finally {
      setIsDeleting(false);
=======
    if (userRole === "admin" && toShowAdmin === "users") {
      await api.delete(`/admin/users/${id}`);
      navigate("/admin/users");
      return;
    }

    if (userRole === "admin" && toShowAdmin === "notes") {
      await api.delete(`/notes/${id}`);
      navigate("/notes");
      return;
    }

    if (userRole === "admin") {
      await api.delete(`/notes/${id}`);
      navigate("/notes");
>>>>>>> fa36e47 (f)
    }
  };

  return (
    <div>
      {userRole === "admin" && (
        <button
          className={cn(uiTokens.buttonBase, uiTokens.buttonDanger, "px-3 py-2")}
          onClick={() => handleDelete(n?._id)}
          disabled={isDeleting}
          type="button"
        >
          {isDeleting ? "Delete..." : "Delete"}
        </button>
      )}
    </div>
  );
}
