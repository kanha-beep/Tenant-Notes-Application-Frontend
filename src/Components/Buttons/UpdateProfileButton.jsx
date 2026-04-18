import React from "react";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function UpdateProfileButton() {
  return (
    <button
      className={cn(uiTokens.buttonBase, uiTokens.buttonSecondary, "m-2")}
      type="button"
    >
      Update
    </button>
  );
}
