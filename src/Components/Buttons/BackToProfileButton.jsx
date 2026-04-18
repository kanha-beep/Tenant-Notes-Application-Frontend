import React from "react";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function BackToProfileButton({navigate, usersId}) {
  return (
    <div className="mt-4 text-center">
      <button
        className={cn(uiTokens.buttonBase, uiTokens.buttonSecondary)}
        onClick={() => navigate(`/users/${usersId}`)}
        type="button"
      >
        Back to Profile
      </button>
    </div>
  );
}
