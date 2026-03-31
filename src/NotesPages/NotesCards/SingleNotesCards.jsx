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
}) {
  const userRole = localStorage.getItem("role");
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  const isOverdue = !n?.check && n?.dueAt && new Date(n.dueAt).getTime() < Date.now();

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
        </div>

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
          <Checkbox
            check={check}
            setCheck={setCheck}
            toShowAdmin={toShowAdmin}
          />
        </div>
      </div>
    </div>
  );
}
