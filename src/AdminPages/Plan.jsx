import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plan.css";
import api from "../init/instance.js";
import Msg from "../Components/AlertBoxes/Msg.jsx";
import { createToast } from "../utils/toast.js";
import { cn, uiTokens } from "../utils/uiTokens.js";

const PLAN_OPTIONS = [
  {
    id: "free",
    name: "Free",
    badge: "Starter",
    noteLimit: "10 notes",
    seats: 5,
    accent: "from-slate-700 to-slate-500",
    ring: "ring-slate-200",
    description: "A clean setup for very small teams testing the workspace.",
    features: [
      "Up to 10 notes in the workspace",
      "5 included seats",
      "Basic admin controls",
      "Standard response window",
    ],
  },
  {
    id: "team",
    name: "Team",
    badge: "Popular",
    noteLimit: "Unlimited notes",
    seats: 25,
    accent: "from-sky-600 to-cyan-500",
    ring: "ring-sky-200",
    description: "Best for active operations teams managing regular work.",
    features: [
      "Unlimited notes",
      "25 team seats",
      "Faster SLA targeting",
      "Better room for scaling your staff",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    badge: "Advanced",
    noteLimit: "Unlimited notes",
    seats: 250,
    accent: "from-amber-500 to-orange-500",
    ring: "ring-amber-200",
    description: "Built for larger organizations that need room, speed, and control.",
    features: [
      "Unlimited notes",
      "250 seats",
      "Custom SLA targets",
      "High-capacity admin operations",
    ],
  },
];

function normalizePlan(plan) {
  if (plan === "enterprise" || plan === "team" || plan === "free") {
    return plan;
  }
  return "team";
}

export default function Plan() {
  const [userRole, setUserRole] = useState("");
  const [roleMsg, setRoleMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [planState, setPlanState] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({ plan: "team", seats: 25, slaHours: 24 });

  const selectedPlanMeta = useMemo(() => {
    return PLAN_OPTIONS.find((option) => option.id === data.plan) || PLAN_OPTIONS[1];
  }, [data.plan]);

  const currentPlanMeta = useMemo(() => {
    return PLAN_OPTIONS.find((option) => option.id === planState?.plan) || null;
  }, [planState]);

  const getPlan = async () => {
    try {
      const res = await api.get("/admin/plan");
      setPlanState(res.data);
      setData({
        plan: normalizePlan(res.data.plan),
        seats: res.data.billing?.seats || 25,
        slaHours: res.data.settings?.slaHours || 24,
      });
    } catch (e) {
      console.log("error plan", e.response?.data?.message);
      setUserRole(e.response?.data?.user || "");
      setRoleMsg(createToast(e.response?.data?.message || "Unable to load billing page", "error"));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: name === "plan" ? value : Number(value) }));
  };

  const handleSelectPlan = (planId) => {
    const option = PLAN_OPTIONS.find((item) => item.id === planId);
    if (!option) return;
    setData((prev) => ({
      ...prev,
      plan: option.id,
      seats: prev.plan === option.id ? prev.seats : option.seats,
    }));
  };

  const handleBuyPlan = async (e) => {
    try {
      e.preventDefault();
      setIsSaving(true);
      const res = await api.post("/admin/plan", data);
      setPlanState(res.data);
      setMsg(createToast("Plan updated successfully", "success"));
    } catch (e) {
      console.log("error Plan F:", e.response?.data);
      setMsg(createToast(e.response?.data?.message || "Unable to update plan", "error"));
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    getPlan();
  }, []);

  return (
    <div className="plan-shell min-h-screen">
      <Msg msg={msg} setMsg={setMsg} />
      <Msg msg={roleMsg} setMsg={setRoleMsg} />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="plan-hero relative overflow-hidden rounded-[2rem] border border-white/60 px-6 py-8 shadow-[0_30px_80px_rgba(15,23,42,0.14)] sm:px-8 lg:px-10">
          <div className="plan-hero-glow plan-hero-glow-one" />
          <div className="plan-hero-glow plan-hero-glow-two" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="plan-kicker">Billing workspace</p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Modern plan control for growing tenant teams
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Upgrade seats, tune SLA targets, and keep your note limits aligned with how your team actually works.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="plan-stat-card">
                  <span className="plan-stat-label">Current plan</span>
                  <strong className="plan-stat-value">
                    {planState?.plan ? planState.plan.toUpperCase() : "Loading"}
                  </strong>
                </div>
                <div className="plan-stat-card">
                  <span className="plan-stat-label">Included seats</span>
                  <strong className="plan-stat-value">{planState?.billing?.seats ?? "--"}</strong>
                </div>
                <div className="plan-stat-card">
                  <span className="plan-stat-label">Note policy</span>
                  <strong className="plan-stat-value">
                    {planState?.noteLimit === "unlimited" ? "Unlimited" : `${planState?.noteLimit ?? "--"} notes`}
                  </strong>
                </div>
              </div>
            </div>

            <aside className="plan-summary-card">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Workspace status
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">
                    {currentPlanMeta?.name || "Current subscription"}
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {planState?.billing?.status || "active"}
                </span>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="plan-summary-row">
                  <span>Renewal date</span>
                  <strong>
                    {planState?.billing?.renewalDate
                      ? new Date(planState.billing.renewalDate).toLocaleDateString()
                      : "Not scheduled"}
                  </strong>
                </div>
                <div className="plan-summary-row">
                  <span>SLA target</span>
                  <strong>{planState?.settings?.slaHours ?? "--"} hours</strong>
                </div>
                <div className="plan-summary-row">
                  <span>Recommended next step</span>
                  <strong>
                    {planState?.noteLimit === "unlimited"
                      ? "Keep scaling your team"
                      : "Upgrade before note capacity fills up"}
                  </strong>
                </div>
              </div>

              <div className="mt-6 rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  SLA and usage
                </p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="plan-summary-row">
                    <span>SLA compliance</span>
                    <strong>50%</strong>
                  </div>
                  <div className="plan-summary-row">
                    <span>Breaches</span>
                    <strong>2</strong>
                  </div>
                  <div className="plan-summary-row">
                    <span>Plan</span>
                    <strong>free</strong>
                  </div>
                  <div className="plan-summary-row">
                    <span>Seats</span>
                    <strong>7/5</strong>
                  </div>
                  <div className="plan-summary-row">
                    <span>Note usage</span>
                    <strong>6/10</strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className={cn(uiTokens.panel, "border border-white/70")}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Choose a plan
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950">
                    Plans designed like modern software billing
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-slate-500">
                  Pick a plan first, then fine-tune seats and SLA targets in the control panel.
                </p>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {PLAN_OPTIONS.map((option) => {
                  const isSelected = data.plan === option.id;
                  const isCurrent = planState?.plan === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelectPlan(option.id)}
                      className={cn(
                        "group rounded-[1.6rem] border bg-white p-5 text-left transition duration-300",
                        isSelected
                          ? `ring-4 ${option.ring} border-slate-900 shadow-[0_22px_45px_rgba(15,23,42,0.12)]`
                          : "border-slate-200 shadow-sm hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_35px_rgba(148,163,184,0.18)]"
                      )}
                    >
                      <div className={`inline-flex rounded-full bg-gradient-to-r ${option.accent} px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white`}>
                        {option.badge}
                      </div>
                      <div className="mt-4 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-2xl font-black tracking-[-0.03em] text-slate-950">
                            {option.name}
                          </h3>
                          <p className="mt-1 text-sm font-semibold text-slate-500">{option.noteLimit}</p>
                        </div>
                        {isCurrent ? (
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                            Current
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{option.description}</p>
                      <ul className="mt-5 space-y-2 text-sm text-slate-700">
                        {option.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="plan-info-card">
                <p className="plan-info-title">Operational fit</p>
                <p className="plan-info-copy">
                  Free is best for testing, Team is ideal for daily management, and Enterprise is for large operations.
                </p>
              </div>
              <div className="plan-info-card">
                <p className="plan-info-title">Seat planning</p>
                <p className="plan-info-copy">
                  Start from the included seat target, then increase only when your tenant actually needs it.
                </p>
              </div>
              <div className="plan-info-card">
                <p className="plan-info-title">SLA tuning</p>
                <p className="plan-info-copy">
                  Shorter SLA windows make sense when you have a stable process and an active admin team.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={cn(uiTokens.panel, "plan-form-panel")}>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Plan configuration
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-slate-950">
                Update billing details
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Choose the plan, confirm team seats, and set the SLA target your workspace should follow.
              </p>

              <form onSubmit={handleBuyPlan} className="mt-6 space-y-5">
                <label className="block">
                  <span className={uiTokens.label}>Selected plan</span>
                  <select
                    onChange={handleChange}
                    name="plan"
                    value={data.plan}
                    className={uiTokens.input}
                  >
                    <option value="free">Free</option>
                    <option value="team">Team</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className={uiTokens.label}>Seats</span>
                    <input
                      type="number"
                      min="1"
                      onChange={handleChange}
                      placeholder="Seats"
                      name="seats"
                      value={data.seats}
                      className={uiTokens.input}
                    />
                    <small className="mt-2 block text-xs text-slate-500">
                      Suggested for {selectedPlanMeta.name}: {selectedPlanMeta.seats} seats
                    </small>
                  </label>

                  <label className="block">
                    <span className={uiTokens.label}>SLA hours</span>
                    <input
                      type="number"
                      min="1"
                      onChange={handleChange}
                      placeholder="24"
                      name="slaHours"
                      value={data.slaHours}
                      className={uiTokens.input}
                    />
                    <small className="mt-2 block text-xs text-slate-500">
                      Lower values signal faster operational expectations
                    </small>
                  </label>
                </div>

                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-700">What this update will do</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>Plan: {selectedPlanMeta.name}</li>
                    <li>Seats configured: {data.seats}</li>
                    <li>Note policy: {selectedPlanMeta.noteLimit}</li>
                    <li>SLA target: {data.slaHours} hours</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className={cn(uiTokens.buttonBase, uiTokens.buttonAccent, "w-full")}
                >
                  {isSaving ? "Updating plan..." : "Save billing changes"}
                </button>
              </form>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {userRole === "user" ? (
                <button
                  type="button"
                  onClick={() => navigate("/notes")}
                  className={cn(uiTokens.buttonBase, uiTokens.buttonSecondary, "w-full")}
                >
                  Back to notes
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className={cn(uiTokens.buttonBase, uiTokens.buttonPrimary, "w-full")}
              >
                Go to dashboard
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
