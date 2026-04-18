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
    <div className="mb-4 lg:w-1/2 lg:px-2">
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div
          className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            presence.isOnline
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {presence.label}
        </div>

        {userRole === "admin" && toShowAdmin === "users" && (
          <>
            <h5 className="text-xl font-bold text-slate-900">{n?.username}</h5>
            <p className="text-slate-500">{n?.email}</p>
            <div className="mb-3 space-y-1">
              <small className="block text-slate-500">ID: {n?._id}</small>
              <small className="block text-slate-500">{presence.detail}</small>
              <small className="font-semibold text-sky-700">{n?.tenant}</small>
            </div>
            <ViewButton n={n} navigate={navigate} />
          </>
        )}
      </div>
    </div>
  );
}
