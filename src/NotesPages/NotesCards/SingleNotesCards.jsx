import DeleteButton from "../../Components/Buttons/DeleteButton.jsx";
import EditButton from "../../Components/Buttons/EditButton.jsx";
import HomePageButton from "../../Components/Buttons/HomePageButton.jsx";
import Checkbox from "../../Components/Buttons/Checkbox.jsx";

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
  const isOverdue = !n?.check && n?.dueAt && new Date(n.dueAt).getTime() < Date.now();
  const showAdminTaskView = userRole === "admin" && toShowAdmin === "notes";
  const showUserFeedbackForm = userRole === "user";

  return (
    <div className="d-flex justify-content-center p-4">
      <div className={`card shadow-lg p-4 ${isOverdue ? "border border-danger border-2" : ""}`} style={{ maxWidth: "600px", width: "100%" }}>
        {isOverdue ? (
          <div className="alert alert-danger fw-semibold" role="alert">
            This task is overdue. Deadline was {formatDateTime(n?.dueAt)}.
          </div>
        ) : null}

        <div className="border-start border-primary border-4 ps-3 mb-4">
          <h1 className="h3 fw-bold text-dark mb-2">{n?.title}</h1>
          <div className="d-flex align-items-center gap-3 small text-muted">
            <span>{n?.user?.username}</span>
            <span>{n?.tenant?.name}</span>
          </div>
        </div>

        <div className="bg-light rounded p-4 mb-4">
          <h5 className="fw-semibold text-secondary mb-3">Content</h5>
          <p className="text-dark" style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{n?.content}</p>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <div className="bg-primary bg-opacity-10 rounded p-3">
              <div className="fw-semibold text-primary mb-2">Owner</div>
              <p className="text-primary mb-0">{n?.user?.username}</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="bg-info bg-opacity-10 rounded p-3">
              <div className="fw-semibold text-info mb-2">Tenant</div>
              <p className="text-info mb-0">{n?.tenant?.name}</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className={`rounded p-3 ${isOverdue ? "bg-danger bg-opacity-10 border border-danger" : "bg-warning bg-opacity-10"}`}>
              <div className="fw-semibold mb-2">Deadline</div>
              <p className="mb-0">{formatDateTime(n?.dueAt)}</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className={`rounded p-3 ${n?.completedAt ? "bg-success bg-opacity-10" : isOverdue ? "bg-danger bg-opacity-10 border border-danger" : "bg-secondary bg-opacity-10"}`}>
              <div className="fw-semibold mb-2">Status time</div>
              <p className="mb-0">
                {n?.completedAt
                  ? `Completed at ${formatDateTime(n?.completedAt)}`
                  : isOverdue
                    ? "Task is overdue"
                    : "Task still in progress"}
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="bg-dark bg-opacity-10 rounded p-3">
              <div className="fw-semibold mb-2">Created on</div>
              <p className="mb-0">{formatDateTime(n?.createdAt)}</p>
            </div>
          </div>
          {n?.userFeedback ? (
            <div className="col-12">
              <div className="bg-success bg-opacity-10 rounded p-3 border border-success-subtle">
                <div className="fw-semibold text-success mb-2">User comment</div>
                <p className="mb-2" style={{ whiteSpace: "pre-wrap" }}>{n.userFeedback}</p>
                {n?.feedbackAt ? (
                  <small className="text-muted">Shared at {formatDateTime(n.feedbackAt)}</small>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        {showUserFeedbackForm ? (
          <div className="bg-light rounded p-4 mb-4 border">
            <h5 className="fw-semibold text-secondary mb-3">Reply to admin</h5>
            <label className="form-label fw-medium">Optional comment for admin</label>
            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Write feedback, blocker, or completion note here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
              <label className="d-flex align-items-center gap-2 fw-medium m-0">
                <Checkbox
                  check={check}
                  setCheck={setCheck}
                  toShowAdmin={toShowAdmin}
                />
                <span>Mark this task as completed</span>
              </label>
              <button
                type="button"
                className="btn btn-primary"
                disabled={isSaving}
                onClick={onSubmitTask}
              >
                {isSaving ? "Saving..." : "Send update to admin"}
              </button>
            </div>
          </div>
        ) : null}

        <div className="d-flex align-items-center flex-wrap gap-2 pt-3">
          <DeleteButton
            token={token}
            n={n}
            navigate={navigate}
            userRole={userRole}
            toShowAdmin={toShowAdmin}
          />
          <EditButton
            navigate={navigate}
            userId={noteId}
            noteId={noteId}
            userRole={userRole}
          />
          <HomePageButton
            navigate={navigate}
            toShowAdmin={toShowAdmin}
            userRole={userRole}
          />
          {showAdminTaskView ? (
            <>
              <label className="d-flex align-items-center gap-2 m-0">
                <Checkbox
                  check={check}
                  setCheck={setCheck}
                  toShowAdmin={toShowAdmin}
                />
                <span className="small text-muted">Completed</span>
              </label>
              <button
                type="button"
                className="btn btn-outline-primary"
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
