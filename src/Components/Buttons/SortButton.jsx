import { uiTokens } from "../../utils/uiTokens.js";

export default function SortButton({
  userRole,
  toShowAdmin,
  sortBy,
  setSortBy,
  compact = false,
}) {
  const getLabel = () => {
    if (userRole === "admin" && toShowAdmin === "users") return "Sort Users";
    if (userRole === "admin" && toShowAdmin === "notes") return "Sort Notes (Admin)";
    return "Sort Notes";
  };

  const getOptions = () => {
    if (userRole === "admin" && toShowAdmin === "users") {
      return [
        { value: "", label: "Select Sort" },
        { value: "username", label: "Username" },
        { value: "email", label: "Email" },
      ];
    }
    return [
      { value: "", label: "Select Sort" },
      { value: "content", label: "Content" },
      { value: "title", label: "Title" },
    ];
  };

  return (
    <div className={`lg:order-1 ${compact ? "lg:w-56" : ""}`}>
      <label className={compact ? "mb-2 block text-sm font-semibold text-slate-700 lg:hidden" : uiTokens.label}>
        {getLabel()}
      </label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={uiTokens.input}
      >
        {getOptions().map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
