import DeleteButton from "../../Components/Buttons/DeleteButton.jsx";
import EditButton from "../../Components/Buttons/EditButton.jsx";
import HomePageButton from "../../Components/Buttons/HomePageButton.jsx";
import Checkbox from "../../Components/Buttons/Checkbox.jsx";
import { cn, uiTokens } from "../../utils/uiTokens.js";

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

export default function SingleUsersCards({
  users,
  token,
  navigate,
  n,
  userRole,
  setCheck,
  check,
  toShowAdmin,
  userId,
  noteId,
}) {
  const presence = getPresence(users);

  return (
    <div className="flex justify-center p-4">
      <div className={cn(uiTokens.panel, "max-w-xl w-full p-8")}>
        {userRole === "admin" && toShowAdmin === "users" && (
          <>
            <div className="mb-6 border-l-4 border-blue-500 pl-6">
              <h1 className="mb-2 text-2xl font-bold text-gray-800">
                {n?.username}
              </h1>
              <p className="text-gray-600">{n?.email}</p>
            </div>
            <div className="mb-6 grid grid-cols-1 gap-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-blue-600">ID</span>
                  <span className="font-semibold text-blue-800">User ID</span>
                </div>
                <p className="rounded border bg-white px-3 py-2 font-mono text-sm">
                  {users?._id}
                </p>
              </div>
              <div
                className={`rounded-lg p-4 ${
                  presence.isOnline ? "bg-emerald-50" : "bg-slate-100"
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`inline-block h-3 w-3 rounded-full ${
                      presence.isOnline ? "bg-emerald-500" : "bg-slate-400"
                    }`}
                  />
                  <span
                    className={`font-semibold ${
                      presence.isOnline ? "text-emerald-700" : "text-slate-700"
                    }`}
                  >
                    Presence
                  </span>
                </div>
                <p
                  className={`mb-1 font-semibold ${
                    presence.isOnline ? "text-emerald-700" : "text-slate-600"
                  }`}
                >
                  {presence.label}
                </p>
                <small className="text-slate-500">{presence.detail}</small>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-purple-600">Tenant</span>
                  <span className="font-semibold text-purple-800">Tenant</span>
                </div>
                <p className="font-semibold text-purple-700">{users?.tenant}</p>
              </div>
            </div>
          </>
        )}

        {userRole === "admin" && toShowAdmin === "notes" && (
          <>
            <div className="mb-6 border-l-4 border-purple-500 pl-6">
              <h1 className="mb-2 text-2xl font-bold text-gray-800">{n?.title}</h1>
            </div>

            <div className="mb-6 rounded-xl bg-gray-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-700">Content</h3>
              <p className="leading-relaxed text-gray-800">{n?.content}</p>
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-6">
          <DeleteButton
            token={token}
            n={users}
            navigate={navigate}
            userId={userId}
            toShowAdmin={toShowAdmin}
            userRole={userRole}
          />
          <EditButton navigate={navigate} userId={userId} noteId={noteId} />
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
