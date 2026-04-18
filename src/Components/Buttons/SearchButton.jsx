import { cn, uiTokens } from "../../utils/uiTokens.js";

export default function SearchButton({
  userRole,
  search,
  setSearch,
  onSearch,
}) {
  return (
    <div className="lg:order-2">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_10rem]">
        <div>
          <label className={uiTokens.label}>
            {userRole === "admin" ? "Search Users" : "Search Notes"}
          </label>
          <input
            type="text"
            placeholder={
              userRole === "admin" ? "Search user..." : "Search notes by title..."
            }
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className={uiTokens.input}
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={onSearch}
            className={cn(uiTokens.buttonBase, uiTokens.buttonPrimary, "w-full")}
            type="button"
          >
            <span>Search</span>
          </button>
        </div>
      </div>
      {search && (
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          <span>
            Searching for: <strong>{search}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
