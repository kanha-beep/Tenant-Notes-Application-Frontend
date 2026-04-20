import api from "../../init/instance.js";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function DeleteButton({
  token,
  n,
  navigate,
  userRole,
  toShowAdmin,
}) {
  const handleDelete = async (id) => {
    if (userRole === "admin" && toShowAdmin === "users") {
      await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/users");
      return;
    }

    if (userRole === "admin" && toShowAdmin === "notes") {
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/notes");
      return;
    }

    if (userRole === "admin") {
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/notes");
    }
  };

  return (
    <div>
      {userRole === "admin" && (
        <button
          className={cn(uiTokens.buttonBase, uiTokens.buttonDanger, "px-3 py-2")}
          onClick={() => handleDelete(n?._id)}
        >
          Delete
        </button>
      )}
    </div>
  );
}
