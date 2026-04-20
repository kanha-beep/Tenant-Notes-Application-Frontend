import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../init/instance.js";
import { createToast } from "../utils/toast.js";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function Auth({ setIsLoggedIn, setMsg, msg }) {
  const [isPage, setIsPage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    tenant: "",
    // role: "",
  });

  const url = isPage ? "login" : "register";

  const handleChange = (e) => {
    setUserForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmitAuth = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isPage) {
      try {
        const res = await api.post(`/auth/${url}`, userForm);
        console.log("Sign up done: ", res.data.data);
        setMsg(
          createToast(
            "Account created successfully. Please log in.",
            "success",
          ),
        );
        setIsPage(true);
      } catch (e) {
        if ([401, 402, 403].includes(e?.response?.status)) {
          setMsg(createToast(e.response.data?.message, "error"));
        }
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    try {
      const res = await api.post(`/auth/${url}`, userForm);
      const token = res.data.token;
      const role = res.data.role;
      localStorage.setItem("tokens", token);
      localStorage.setItem("tenant", userForm.tenant);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", res?.data?._id);
      setIsLoggedIn(true);
      setMsg(createToast("Logged in successfully.", "success"));
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/notes");
    } catch (e) {
      setMsg(createToast(e?.response?.data?.message || "Authentication failed.", "error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("error msg in Auth: ", msg);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_52%,#f8fbff_100%)] px-4 py-8 text-slate-900 shadow-[0_24px_70px_rgba(148,163,184,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.10),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_24%)]" />
      <div className="absolute left-8 top-10 h-36 w-36 rounded-full bg-sky-200/50 blur-3xl" />
      <div className="absolute right-8 top-20 h-40 w-40 rounded-full bg-violet-200/45 blur-3xl" />
      <div className="absolute bottom-6 left-1/3 h-32 w-32 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative mx-auto flex min-h-[72vh] max-w-5xl items-center justify-center">
        <section className={uiTokens.panel}>
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 text-2xl font-black text-white shadow-[0_12px_30px_rgba(14,165,233,0.28)]">
              T
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
              TenantApp
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              {isPage ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              {isPage
                ? "Sign in to continue to your workspace."
                : "Register your account with the tenant and role details below."}
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-100 p-1.5">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                className={cn(
                  uiTokens.buttonBase,
                  isPage ? uiTokens.buttonAccent : uiTokens.buttonGhost,
                  "rounded-2xl px-4 py-3",
                )}
                onClick={() => setIsPage(true)}
                disabled={isSubmitting}
              >
                Login
              </button>
              <button
                type="button"
                className={cn(
                  uiTokens.buttonBase,
                  !isPage ? uiTokens.buttonAccent : uiTokens.buttonGhost,
                  "rounded-2xl px-4 py-3",
                )}
                onClick={() => setIsPage(false)}
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitAuth} className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <label className="block">
                <span className={uiTokens.label}>Email</span>
                <input
                  type="text"
                  className={uiTokens.input}
                  placeholder="Enter your email"
                  name="email"
                  value={userForm.email}
                  onChange={handleChange}
                />
              </label>

              <label className="block">
                <span className={uiTokens.label}>Password</span>
                <input
                  type="password"
                  className={uiTokens.input}
                  placeholder="Enter your password"
                  name="password"
                  value={userForm.password}
                  onChange={handleChange}
                />
              </label>

              <label className="block">
                <span className={uiTokens.label}>Tenant</span>
                <select
                  name="tenant"
                  value={userForm.tenant}
                  onChange={handleChange}
                  className={uiTokens.input}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="acme">Acme</option>
                  <option value="globex">Globex</option>
                </select>
              </label>
            </div>

            {!isPage && (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className={uiTokens.label}>Username</span>
                  <input
                    type="text"
                    className={uiTokens.input}
                    placeholder="Enter your username"
                    name="username"
                    value={userForm.username}
                    onChange={handleChange}
                  />
                </label>

                {/* <label className="block">
                  <span className={uiTokens.label}>Role</span>
                  <select
                    name="role"
                    value={userForm.role}
                    onChange={handleChange}
                    className={uiTokens.input}
                  >
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </label> */}
              </div>
            )}

            <button
              type="submit"
              className={cn(uiTokens.buttonBase, uiTokens.buttonAccent, "w-full py-3.5")}
              disabled={isSubmitting}
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white/85" />
              {isSubmitting ? (isPage ? "Logging in..." : "Creating account...") : isPage ? "Login" : "Sign Up"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
