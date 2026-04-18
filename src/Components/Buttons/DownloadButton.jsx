import React from "react";
import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function DownloadButton({ notes }) {
  const handleDownloadUsers = () => {
    const headers = Object.keys(notes).join(",") + "\n";
    const rows = notes.map((obj) => Object.values(obj).join(",")).join("\n");
    const usersArray = headers + rows;
    const blob = new Blob([usersArray], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "allUsersDownload.csv";
    document.body.append(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <button
        className={cn(uiTokens.buttonBase, uiTokens.buttonPrimary, "w-full")}
        onClick={handleDownloadUsers}
        type="button"
      >
        Download All Users Pdf
      </button>
    </div>
  );
}
