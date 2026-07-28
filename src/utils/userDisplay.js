function toTitleCase(part) {
  return part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : "";
}

export function formatUserDisplayName(username) {
  const raw = String(username || "").trim();
  if (!raw) return "";

  const parts = raw.split(".").filter(Boolean);
  const looksGenerated =
    parts.length >= 4 && /^\d+$/.test(parts[parts.length - 1]);

  if (!looksGenerated) {
    return raw
      .split(/\s+/)
      .filter(Boolean)
      .map(toTitleCase)
      .join(" ");
  }

  return parts
    .slice(0, 2)
    .map(toTitleCase)
    .join(" ");
}

export function formatUserDisplayEmail(email) {
  return String(email || "").trim().toUpperCase();
}
