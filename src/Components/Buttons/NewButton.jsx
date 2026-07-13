import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function NewButton({ navigate, userRole, toShowAdmin, compact = false }) {
  const getButtonText = () => {
    if (userRole === "admin" && toShowAdmin === "users") return "Add User";
    if (userRole === "admin" && toShowAdmin === "notes") return "Add Note";
    return "Add New";
  };

  return (
    <div className={compact ? "" : "col-12 col-md-6 col-lg-4 order-lg-3 mb-3"}>
      {userRole !== "user" && (
        <button
          className={cn(
            uiTokens.buttonBase,
            uiTokens.buttonPrimary,
            compact ? "w-full lg:w-auto whitespace-nowrap" : "w-50"
          )}
          onClick={() => {
            if (userRole === "admin") {
              if (toShowAdmin === "users") navigate(`/admin/users/new`);
              if (toShowAdmin === "notes") navigate(`/notes/new`);
            } else {
              navigate("/notes/new");
            }
          }}
        >
          <span>{getButtonText()}</span>
        </button>
      )}
    </div>
  );
}
