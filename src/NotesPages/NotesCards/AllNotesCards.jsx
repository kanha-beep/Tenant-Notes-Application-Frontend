import React, { useState } from "react";
import ViewButton from "../../Components/Buttons/ViewButton.jsx";

function formatDateTime(value) {
  if (!value) return "Not set";
  return new Date(value).toLocaleString();
}

export default function AllNotesCards({
  n,
  navigate,
  userRole,
}) {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  const isCompleted = Boolean(n?.check);
  const isOverdue = !isCompleted && n?.dueAt && new Date(n.dueAt).getTime() < Date.now();
  const hasUserFeedback = Boolean(n?.userFeedback?.trim());
  const showAdminNotes = userRole === "admin" && toShowAdmin === "notes";

  return (
    <div className="col-12 col-lg-6 mb-4">
      <div className={`card shadow-sm h-100 position-relative ${isOverdue ? "border border-danger border-2" : ""}`}>
        <div className="card-body">
          {isOverdue ? (
            <div className="alert alert-danger py-2 px-3 mb-3 fw-semibold" role="alert">
              Overdue task. Deadline was {formatDateTime(n?.dueAt)}
            </div>
          ) : null}

          <div className={`badge mb-3 ${
            isCompleted ? "bg-success" : isOverdue ? "bg-danger" : "bg-warning text-dark"
          }`}>
            {isCompleted ? "Completed" : isOverdue ? "Deadline missed" : "Pending"}
          </div>

          {userRole === "admin" && toShowAdmin === "users" ? (
            <>
              <h5 className="card-title">{n?.username}</h5>
              <div className="mb-3">
                <small className="text-muted d-block">ID: {n?._id}</small>
                <small className="text-primary fw-semibold">{n?.tenant}</small>
              </div>
              <ViewButton n={n} navigate={navigate} />
            </>
          ) : (
            <>
              <h5 className="card-title">{n?.title}</h5>
              <div className="mb-3">
                <small className="text-muted d-block">Owner: {n?.user?.username || "Unknown"}</small>
                <small className="text-muted d-block">Created: {formatDateTime(n?.createdAt)}</small>
                <small className="text-muted d-block">Deadline: {formatDateTime(n?.dueAt)}</small>
                {n?.completedAt ? (
                  <small className="text-success d-block">Completed at: {formatDateTime(n?.completedAt)}</small>
                ) : null}
                <small className="text-primary fw-semibold">{n?.tenant?.name}</small>
              </div>
              {showAdminNotes && hasUserFeedback ? (
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={() => setShowCommentPopup((prev) => !prev)}
                  >
                    Comment popup
                  </button>
                  {showCommentPopup ? (
                    <div className="card shadow border-success mt-2">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                          <h6 className="mb-0 text-success">User feedback</h6>
                          <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setShowCommentPopup(false)}
                          />
                        </div>
                        <p className="mb-2" style={{ whiteSpace: "pre-wrap" }}>{n.userFeedback}</p>
                        {n?.feedbackAt ? (
                          <small className="text-muted d-block mb-3">Shared at: {formatDateTime(n.feedbackAt)}</small>
                        ) : null}
                        <button
                          type="button"
                          className="btn btn-sm btn-success"
                          onClick={() => navigate(`/notes/${n?._id}`)}
                        >
                          View full task
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <ViewButton n={n} navigate={navigate} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
