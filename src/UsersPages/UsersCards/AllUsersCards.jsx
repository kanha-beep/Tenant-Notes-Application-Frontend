import ViewButton from "../../Components/Buttons/ViewButton.jsx";

function getPresence(user) {
  if (!user?.lastSeenAt) {
    return {
      isOnline: false,
      label: "Offline",
      detail: "No recent activity yet",
    };
  }

  const lastSeenTime = new Date(user.lastSeenAt).getTime();
  const isOnline = Date.now() - lastSeenTime <= 2 * 60 * 1000;

  return {
    isOnline,
    label: isOnline ? "Online" : "Offline",
    detail: isOnline
      ? `Active now (${new Date(user.lastSeenAt).toLocaleTimeString()})`
      : `Last seen ${new Date(user.lastSeenAt).toLocaleString()}`,
  };
}

export default function AllUsersCards({ n, navigate, userRole }) {
  const toShowAdmin = localStorage.getItem("toShowAdmin");
  const presence = getPresence(n);

  return (
    <div className="col-12 col-lg-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <div className={`badge mb-3 ${presence.isOnline ? "bg-success" : "bg-secondary"}`}>
            {presence.label}
          </div>

          {userRole === "admin" && toShowAdmin === "users" && (
            <>
              <h5 className="card-title">{n?.username}</h5>
              <p className="text-muted">{n?.email}</p>
              <div className="mb-3">
                <small className="text-muted d-block">ID: {n?._id}</small>
                <small className="text-muted d-block">{presence.detail}</small>
                <small className="text-primary fw-semibold">{n?.tenant}</small>
              </div>
              <ViewButton n={n} navigate={navigate} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
