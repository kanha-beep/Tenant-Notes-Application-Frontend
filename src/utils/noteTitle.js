export function formatNoteTitle(title) {
  const raw = String(title || "").trim();
  if (!raw) return "";

  const legacyMatch = raw.match(/^\[[^\]]+\]\s+\[[^\]]+\]\s+(.+?)\s+::/);
  if (legacyMatch?.[1]) {
    return legacyMatch[1].trim();
  }

  return raw;
}
