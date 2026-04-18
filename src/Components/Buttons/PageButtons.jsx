import React, { useEffect, useState } from "react";

import api from "../../init/instance.js";
import SortButton from "./SortButton.jsx";
import SearchButton from "./SearchButton.jsx";

export default function PageButtons({
  token,
  setFilterNotes,
  userRole,
  setFilterUsers,
  toShowAdmin,
}) {
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [totalNotesOfCompany, setTotalNotesOfCompany] = useState(0);

  const handlePage = async () => {
    if (userRole === "user") {
      const res = await api.get(
        `/notes?page=${page}&search=${search}&sort=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotalNotes(res.data.totalNotes);
      setFilterNotes(res.data.userNotes);
    } else {
      try {
        if (toShowAdmin === "users") {
          const res = await api.get(
            `/admin/users?page=${page}&search=${search}&sort=${sortBy}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPage(res.data.page);
          setTotalPages(res.data.totalPages);
          setTotalUsers(res.data.totalNoOfUsers);
          setFilterUsers(res.data.users);
          setFilterNotes([]);
          setSearch("");
        } else {
          const res = await api.get(
            `/notes?page=${page}&search=${search}&sort=${sortBy}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPage(res.data.page);
          setTotalPages(res.data.totalPages);
          setTotalNotes(res.data.totalNotes);
          setFilterNotes(res.data.adminNotes);
          setTotalNotesOfCompany(res?.data?.totalNotesOfCompany);
        }
      } catch (e) {
        console.log("error in pagination: ", e.response.data);
      }
    }
  };

  useEffect(() => {
    handlePage();
  }, [page, sortBy, toShowAdmin]);

  useEffect(() => {
    setPage(1);
  }, [toShowAdmin]);

  const isUsers = userRole === "admin" && toShowAdmin === "users";
  const totalCount = isUsers ? totalUsers : totalNotes;
  const itemType = isUsers ? "Users" : "Notes";

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <SearchButton
          userRole={userRole}
          search={search}
          setSearch={setSearch}
          onSearch={handlePage}
        />
        <SortButton
          userRole={userRole}
          toShowAdmin={toShowAdmin}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-0 text-sm text-slate-600">
              <span className="mr-2 inline-flex">{isUsers ? "Users" : "Notes"}</span>
              Total{" "}
              <span>
                {itemType.toLowerCase()} {userRole === "user" && totalCount}
                {userRole === "admin" &&
                  toShowAdmin === "notes" &&
                  totalNotesOfCompany}
              </span>{" "}
              {userRole === "admin" && toShowAdmin === "users" && totalCount}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <small className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </small>
            <nav className="w-full">
              <ul className="mb-0 flex flex-wrap items-center gap-2">
                <li>
                  <button
                    className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    type="button"
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, page - 2) + i;
                  if (pageNum > totalPages) return null;
                  return (
                    <li key={pageNum}>
                      <button
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold ${
                          pageNum === page
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-600"
                        }`}
                        onClick={() => setPage(pageNum)}
                        type="button"
                      >
                        {pageNum}
                      </button>
                    </li>
                  );
                })}

                <li>
                  <button
                    className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    type="button"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
