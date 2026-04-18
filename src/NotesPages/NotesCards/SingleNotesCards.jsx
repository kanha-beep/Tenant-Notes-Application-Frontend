import DeleteButton from "../../Components/Buttons/DeleteButton.jsx";
import EditButton from "../../Components/Buttons/EditButton.jsx";
import HomePageButton from "../../Components/Buttons/HomePageButton.jsx";
import Checkbox from "../../Components/Buttons/Checkbox.jsx";
import { cn, uiTokens } from "../../utils/uiTokens.js";

function formatDateTime(value) {
  if (!value) return "Not set";
  return new Date(value).toLocaleString();
}

export default function SingleNotesCards({
  token,
  navigate,
  n,
  setCheck,
  check,
  noteId,
  feedback,
  setFeedback,
  onSubmitTask,
  isSaving,
}) {
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  const isOverdue =
    !n?.check && n?.dueAt && new Date(n.dueAt).getTime() < Date.now();
  const showAdminTaskView = userRole === "admin" && toShowAdmin === "notes";
  const showUserFeedbackForm = userRole === "user";

  return (
    <div className="flex justify-center p-4">
      <div
        className={`w-full max-w-[600px] rounded-2xl border bg-white p-4 shadow-lg ${
          isOverdue ? "border-red-500 ring-2 ring-red-200" : "border-slate-200"
        }`}
      >
        {isOverdue ? (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            This task is overdue. Deadline was {formatDateTime(n?.dueAt)}.
          </div>
        ) : null}

        <div className="mb-4 border-l-4 border-sky-500 pl-3">
          <h1 className="mb-2 text-2xl font-bold text-slate-900">{n?.title}</h1>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span>{n?.user?.username}</span>
            <span>{n?.tenant?.name}</span>
          </div>
        </div>

        <div className="mb-4 rounded-xl bg-slate-50 p-4">
          <h5 className="mb-3 text-lg font-semibold text-slate-700">Content</h5>
          <p className="whitespace-pre-wrap leading-7 text-slate-800">{n?.content}</p>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-sky-50 p-3">
            <div className="mb-2 font-semibold text-sky-700">Owner</div>
            <p className="mb-0 text-sky-700">{n?.user?.username}</p>
          </div>
          <div className="rounded-xl bg-cyan-50 p-3">
            <div className="mb-2 font-semibold text-cyan-700">Tenant</div>
            <p className="mb-0 text-cyan-700">{n?.tenant?.name}</p>
          </div>
          <div
            className={`rounded-xl p-3 ${
              isOverdue
                ? "border border-red-300 bg-red-50"
                : "bg-amber-50"
            }`}
          >
            <div className="mb-2 font-semibold text-slate-700">Deadline</div>
            <p className="mb-0">{formatDateTime(n?.dueAt)}</p>
          </div>
          <div
            className={`rounded-xl p-3 ${
              n?.completedAt
                ? "bg-emerald-50"
                : isOverdue
                  ? "border border-red-300 bg-red-50"
                  : "bg-slate-100"
            }`}
          >
            <div className="mb-2 font-semibold text-slate-700">Status time</div>
            <p className="mb-0">
              {n?.completedAt
                ? `Completed at ${formatDateTime(n?.completedAt)}`
                : isOverdue
                  ? "Task is overdue"
                  : "Task still in progress"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-100 p-3 md:col-span-1">
            <div className="mb-2 font-semibold text-slate-700">Created on</div>
            <p className="mb-0">{formatDateTime(n?.createdAt)}</p>
          </div>
          {n?.userFeedback ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 md:col-span-2">
              <div className="mb-2 font-semibold text-emerald-700">User comment</div>
              <p className="mb-2 whitespace-pre-wrap">{n.userFeedback}</p>
              {n?.feedbackAt ? (
                <small className="text-slate-500">
                  Shared at {formatDateTime(n.feedbackAt)}
                </small>
              ) : null}
            </div>
          ) : null}
        </div>

        {showUserFeedbackForm ? (
          <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h5 className="mb-3 text-lg font-semibold text-slate-700">
              Reply to admin
            </h5>
            <label className={uiTokens.label}>Optional comment for admin</label>
            <textarea
              className={cn(uiTokens.input, "mb-3 min-h-28 resize-y")}
              rows="4"
              placeholder="Write feedback, blocker, or completion note here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="m-0 flex items-center gap-2 font-medium">
                <Checkbox check={check} setCheck={setCheck} toShowAdmin={toShowAdmin} />
                <span>Mark this task as completed</span>
              </label>
              <button
                type="button"
                className={cn(uiTokens.buttonBase, uiTokens.buttonPrimary)}
                disabled={isSaving}
                onClick={onSubmitTask}
              >
                {isSaving ? "Saving..." : "Send update to admin"}
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3">
          <DeleteButton
            token={token}
            n={n}
            navigate={navigate}
            userRole={userRole}
            toShowAdmin={toShowAdmin}
          />
          <EditButton navigate={navigate} userId={noteId} noteId={noteId} />
          <HomePageButton
            navigate={navigate}
            toShowAdmin={toShowAdmin}
            userRole={userRole}
          />
          {showAdminTaskView ? (
            <>
              <label className="m-0 flex items-center gap-2">
                <Checkbox check={check} setCheck={setCheck} toShowAdmin={toShowAdmin} />
                <span className="text-sm text-slate-500">Completed</span>
              </label>
              <button
                type="button"
                className={cn(uiTokens.buttonBase, uiTokens.buttonSecondary)}
                disabled={isSaving}
                onClick={onSubmitTask}
              >
                {isSaving ? "Saving..." : "Save status"}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
