import React from "react";
import { useNavigate } from "react-router-dom";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function HealthButton() {
  const navigate = useNavigate();

  return (
    <button
      className={cn(uiTokens.buttonBase, uiTokens.buttonSecondary, "px-3 py-2")}
      onClick={() => navigate("/health")}
      type="button"
    >
      Health Check
    </button>
  );
}
