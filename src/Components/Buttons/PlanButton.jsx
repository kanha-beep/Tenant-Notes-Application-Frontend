import React from "react";
import { useNavigate } from "react-router-dom";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function PlanButton() {
  const navigate = useNavigate();

  return (
    <button
      className={cn(uiTokens.buttonBase, uiTokens.buttonAccent, "px-3 py-2")}
      onClick={() => navigate("/admin/plan")}
      type="button"
    >
      Plan Buy
    </button>
  );
}
