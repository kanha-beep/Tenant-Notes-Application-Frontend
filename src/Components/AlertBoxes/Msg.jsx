import { useEffect, useMemo, useState } from "react";
import { createToast } from "../../utils/toast.js";

const TOAST_DURATION = 5000;

export default function Msg({ msg, setMsg, action }) {
  const toast = useMemo(() => createToast(msg), [msg]);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast) return undefined;

    setProgress(100);

    const startTimer = setTimeout(() => setProgress(0), 30);
    const closeTimer = setTimeout(() => {
      if (setMsg) setMsg("");
    }, TOAST_DURATION);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(closeTimer);
    };
  }, [toast, setMsg]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const containerClasses = isSuccess
    ? "border-emerald-400/60 bg-emerald-600"
    : "border-rose-400/60 bg-rose-600";
  const progressClasses = isSuccess ? "bg-emerald-200" : "bg-rose-200";

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[1200] w-[min(92vw,24rem)]">
      <div
        className={`pointer-events-auto overflow-hidden rounded-2xl border shadow-[0_18px_45px_rgba(15,23,42,0.25)] ${containerClasses}`}
      >
        <div className="flex items-start gap-3 px-4 py-3 text-white">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold capitalize">
              {isSuccess ? "Success" : "Error"}
            </p>
            <p className="mt-1 text-sm leading-6 text-white/95">{toast.text}</p>
            {action ? <div className="mt-3">{action}</div> : null}
          </div>

          <button
            type="button"
            onClick={() => setMsg?.("")}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg font-semibold text-white transition hover:bg-white/20"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>

        <div className="h-1.5 w-full bg-black/10">
          <div
            className={`h-full transition-[width] duration-[5000ms] ease-linear ${progressClasses}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
