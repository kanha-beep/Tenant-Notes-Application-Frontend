/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import AllUsersCards from "./UsersCards/AllUsersCards.jsx";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";

export default function AllUsers({
  navigate,
  setUsers,
  filterTenant,
  setFilterUsers,
  filterUsers,
  toShowAdmin,
  setToShowAdmin,
  isLoading,
  isLoaded,
  totalCount,
}) {
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (userRole === "admin") {
      setToShowAdmin("users");
    }
  }, []);

  useEffect(() => {
    if (!filterUsers) return;
    const filtered = filterUsers.filter((n) => n.tenant?.name === filterTenant);
    setFilterUsers(filtered);
  }, [filterTenant]);

  return (
    <div className="mt-4">
      {isLoading ? (
        <LoadingSpinner text="All users loading..." />
      ) : null}
      {!isLoading && isLoaded && totalCount === 0 ? (
        <div className="py-5 text-center">
          <p className="text-slate-500">No users found.</p>
        </div>
      ) : null}
      {!isLoading &&
      userRole === "admin" &&
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
      ) : null}
    </div>
  );
}
