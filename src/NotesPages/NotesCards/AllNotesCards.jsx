import React, { useState } from "react";
import ViewButton from "../../Components/Buttons/ViewButton.jsx";

function formatDateTime(value) {
  if (!value) return "Not set";
  return new Date(value).toLocaleString();
}

export default function AllNotesCards({ n, navigate, userRole }) {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  const isCompleted = Boolean(n?.check);
  const isOverdue =
    !isCompleted && n?.dueAt && new Date(n.dueAt).getTime() < Date.now();
  const hasUserFeedback = Boolean(n?.userFeedback?.trim());
  const showAdminNotes = userRole === "admin" && toShowAdmin === "notes";

  return (
    <div className="mb-4 lg:w-1/2 lg:px-2">
      <div
        className={`relative h-full rounded-2xl border bg-white p-5 shadow-sm ${
          isOverdue ? "border-red-500 ring-2 ring-red-200" : "border-slate-200"
        }`}
      >
        {isOverdue ? (
          <div
            className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
            role="alert"
          >
            Overdue task. Deadline was {formatDateTime(n?.dueAt)}
          </div>
        ) : null}

        <div
          className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            isCompleted
              ? "bg-emerald-100 text-emerald-700"
              : isOverdue
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-800"
          }`}
        >
          {isCompleted ? "Completed" : isOverdue ? "Deadline missed" : "Pending"}
        </div>

        {userRole === "admin" && toShowAdmin === "users" ? (
          <>
            <h5 className="text-xl font-bold text-slate-900">{n?.username}</h5>
            <div className="mb-3 space-y-1">
              <small className="block text-slate-500">ID: {n?._id}</small>
              <small className="font-semibold text-sky-700">{n?.tenant}</small>
            </div>
            <ViewButton n={n} navigate={navigate} />
          </>
        ) : (
          <>
            <h5 className="text-xl font-bold text-slate-900">{n?.title}</h5>
            <div className="mb-3 space-y-1">
              <small className="block text-slate-500">
                Owner: {n?.user?.username || "Unknown"}
              </small>
              <small className="block text-slate-500">
                Created: {formatDateTime(n?.createdAt)}
              </small>
              <small className="block text-slate-500">
                Deadline: {formatDateTime(n?.dueAt)}
              </small>
              {n?.completedAt ? (
                <small className="block text-emerald-700">
                  Completed at: {formatDateTime(n?.completedAt)}
                </small>
              ) : null}
              <small className="font-semibold text-sky-700">
                {n?.tenant?.name}
              </small>
            </div>
            {showAdminNotes && hasUserFeedback ? (
              <div className="mb-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-emerald-700"
                  onClick={() => setShowCommentPopup((prev) => !prev)}
                >
                  Comment popup
                </button>
                {showCommentPopup ? (
                  <div className="mt-2 rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h6 className="mb-0 text-sm font-semibold text-emerald-700">
                        User feedback
                      </h6>
                      <button
                        type="button"
                        className="text-lg leading-none text-slate-400"
                        aria-label="Close"
                        onClick={() => setShowCommentPopup(false)}
                      >
                        x
                      </button>
                    </div>
                    <p className="mb-2 whitespace-pre-wrap text-slate-700">
                      {n.userFeedback}
                    </p>
                    {n?.feedbackAt ? (
                      <small className="mb-3 block text-slate-500">
                        Shared at: {formatDateTime(n.feedbackAt)}
                      </small>
                    ) : null}
                    <button
                      type="button"
                      className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white"
                      onClick={() => navigate(`/notes/${n?._id}`)}
                    >
                      View full task
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
            <ViewButton n={n} navigate={navigate} />
          </>
        )}
      </div>
    </div>
  );
}
