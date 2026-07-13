import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function UpdateButton({ isLoading = false, label = "Update" }) {
  return (
    <button
      type="submit"
      className={cn(uiTokens.buttonBase, uiTokens.buttonSecondary)}
      disabled={isLoading}
    >
      <span>{isLoading ? `${label}...` : label}</span>
    </button>
  );
}
