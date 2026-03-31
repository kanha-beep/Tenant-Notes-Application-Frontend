import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function UpdateButton() {
  return (
    <button
      type="submit"
      className={cn(uiTokens.buttonBase, uiTokens.buttonSecondary)}
    >
      <span>Update</span>
    </button>
  );
}
