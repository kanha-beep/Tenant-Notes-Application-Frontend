import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function HomePageButton({ navigate, userRole, toShowAdmin }) {
  console.log("now amdin will see: ", userRole, toShowAdmin);
  const buttonClass = cn(uiTokens.buttonBase, uiTokens.buttonSecondary, "px-3 py-2 ml-3");
  return (
    <div>
      {userRole === "user" ? (
        <button
          className={buttonClass}
          onClick={() => {
            navigate(`/notes`, {state: "notes"});
          }}
          type="button"
        >
          Home Page
        </button>
      ) : toShowAdmin === "users" ? (
        <button
          className={buttonClass}
          onClick={() => {
            navigate(`/admin/users`, {state: "users"});
          }}
          type="button"
        >
          Home Page
        </button>
      ) : (
        <button
          className={buttonClass}
          onClick={() => {
            navigate(`/notes`, {state: "notes"});
          }}
          type="button"
        >
          Home Page
        </button>
      )}
      {/* <button
        className="btn btn-outline-primary"
        onClick={() => {
          if (userRole === "admin") navigate(`/admin/users`);
          else navigate(`/notes`);
        }}
      >
        Home Page
      </button> */}
    </div>
  );
}
