export const uiTokens = {
  buttonBase:
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]",
  buttonPrimary:
    "bg-slate-950 text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 hover:bg-slate-800 focus:ring-slate-200",
  buttonSecondary:
    "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 focus:ring-sky-100",
  buttonDanger:
    "bg-red-500 text-white shadow-[0_10px_24px_rgba(239,68,68,0.18)] hover:-translate-y-0.5 hover:bg-red-600 focus:ring-red-100",
  buttonAccent:
    "bg-gradient-to-r from-sky-600 to-cyan-500 text-white shadow-[0_12px_30px_rgba(14,165,233,0.22)] hover:-translate-y-0.5 focus:ring-sky-100",
  buttonGhost:
    "text-slate-600 hover:bg-white hover:text-slate-900 focus:ring-slate-100",
  input:
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100",
  label: "mb-2 block text-sm font-semibold text-slate-700",
  panel:
    "rounded-[1.85rem] border border-white/70 bg-white/80 p-6 text-slate-900 shadow-[0_20px_60px_rgba(148,163,184,0.18)] backdrop-blur-xl sm:p-8",
};

export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}
