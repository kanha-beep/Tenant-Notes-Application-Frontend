import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function CreateButton() {
  return (
    <button
      type="submit"
      className={cn(uiTokens.buttonBase, uiTokens.buttonAccent, "mb-3")}
    >
      <span>Create User</span>
    </button>
  );
}
