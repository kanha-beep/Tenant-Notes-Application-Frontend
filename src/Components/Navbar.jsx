import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../init/instance.js";
import { createToast } from "../utils/toast.js";

const navLinkClass =
  "rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700";

export default function MyNavbar({ isLoggedIn, setMsg, userRole }) {
  const [owner, setOwner] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const currentOwner = async () => {
      try {
        const res = await api.get("/auth/me");
        setOwner(res.data);
      } catch (e) {
        if ([401, 402, 403].includes(e?.response?.status)) {
          setMsg(createToast(e.response.data, "error"));
        }
      }
    };

    if (isLoggedIn) {
      currentOwner();
    }
  }, [isLoggedIn, setMsg]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [isLoggedIn, userRole]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
            T
          </div>
          {/* <div>
            <p className="text-lg font-bold tracking-[-0.02em] text-slate-950">TenantApp</p>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
              workspace platform
            </p>
          </div> */}
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="text-lg">{isMobileMenuOpen ? "x" : "="}</span>
        </button>

        <div
          className={`w-full items-center justify-between gap-3 lg:flex lg:w-auto ${
            isMobileMenuOpen ? "flex" : "hidden"
          }`}
        >
          <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row lg:items-center">
            {isLoggedIn && userRole === "admin" ? (
              <Link to="/admin/dashboard" className={navLinkClass}>
                Dashboard
              </Link>
            ) : null}

            {isLoggedIn && userRole === "user" ? (
              <Link to="/notes" className={navLinkClass}>
                Dashboard
              </Link>
            ) : null}

            {isLoggedIn ? (
              <Link to={`/users/${owner?._id}`} className={navLinkClass}>
                Profile
              </Link>
            ) : (
              <>
                <Link to="/auth" className={navLinkClass}>
                  Features
                </Link>
                <Link to="/health" className={navLinkClass}>
                  Health
                </Link>
              </>
            )}
          </div>

          <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row lg:items-center">
            {isLoggedIn ? (
              <Link
                to="/logout"
                className="inline-flex items-center justify-center rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </Link>
            ) : (
              <>
                <Link to="/auth" className={navLinkClass}>
                  Sign up
                </Link>
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
