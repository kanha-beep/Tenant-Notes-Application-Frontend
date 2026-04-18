/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import api from "../init/instance.js";
import AllUsersCards from "./UsersCards/AllUsersCards.jsx";

export default function AllUsers({
  navigate,
  token,
  setUsers,
  filterTenant,
  setFilterUsers,
  filterUsers,
  toShowAdmin,
  setToShowAdmin,
}) {
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    let intervalId;

    const getAllUsers = async () => {
      try {
        const res = await api.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
        setFilterUsers(res.data?.users);
        setToShowAdmin("users");
      } catch (e) {
        console.log("error in AllUsers:", e.response);
      }
    };

    getAllUsers();
    intervalId = setInterval(getAllUsers, 30000);

    return () => clearInterval(intervalId);
  }, [token]);

  useEffect(() => {
    if (!filterUsers) return;
    const filtered = filterUsers.filter((n) => n.tenant?.name === filterTenant);
    setFilterUsers(filtered);
  }, [filterTenant, token]);

  return (
    <div className="mt-4">
      {userRole === "admin" &&
      toShowAdmin === "users" &&
      filterUsers?.length > 0 ? (
        <div className="lg:-mx-2 lg:flex lg:flex-wrap">
          {filterUsers?.map((u) => (
            <AllUsersCards
              key={u._id}
              n={u}
              navigate={navigate}
              userRole={userRole}
              filterUsers={filterUsers}
            />
          ))}
        </div>
      ) : (
        <div className="py-5 text-center">
          <p className="text-slate-500">Loading Users...</p>
        </div>
      )}
    </div>
  );
}
