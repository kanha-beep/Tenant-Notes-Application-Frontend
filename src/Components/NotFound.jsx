import { Link } from "react-router-dom";
import { cn, uiTokens } from "../utils/uiTokens.js";

export default function NotFound() {
  return (
    <main className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_52%,#f8fbff_100%)] px-4 py-10 text-slate-900 shadow-[0_24px_70px_rgba(148,163,184,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.10),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_24%)]" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
        <section className={cn(uiTokens.panel, "w-full max-w-3xl text-center")}>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-950 text-2xl font-black text-white shadow-[0_16px_32px_rgba(15,23,42,0.18)]">
            404
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            Page not found
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.03em] text-slate-950 sm:text-5xl">
            This page does not exist in TenantApp.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            The link may be broken, the route may have changed, or the page was never created.
            You can go back to the homepage, sign in, or check system health from here.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className={cn(uiTokens.buttonBase, uiTokens.buttonPrimary)}>
              Go home
            </Link>
            <Link to="/auth" className={cn(uiTokens.buttonBase, uiTokens.buttonAccent)}>
              Open login
            </Link>
            <Link to="/health" className={cn(uiTokens.buttonBase, uiTokens.buttonSecondary)}>
              System health
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
