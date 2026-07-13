import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const testimonials = [
  {
    quote:
      "We stopped losing track of assigned work. Admins now have a clean flow and users know exactly what needs attention.",
    name: "Riya Sharma",
    role: "Operations Lead",
  },
  {
    quote:
      "The tenant separation feels reliable, and the note workflow is simple enough that new team members pick it up quickly.",
    name: "Aman Verma",
    role: "Workspace Admin",
  },
  {
    quote:
      "The experience is direct and practical. It helps our team assign, follow up, and close tasks without extra noise.",
    name: "Neha Kapoor",
    role: "Team Manager",
  },
];

export default function Home() {
  const [homepage, setHomepage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHomepage = async () => {
      try {
        const response = await fetch(`${API_BASE}/homepage`);

        if (!response.ok) {
          throw new Error("Failed to load homepage");
        }

        const data = await response.json();
        setHomepage(data);
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    loadHomepage();
  }, []);

  const serviceCards = useMemo(() => {
    if (!homepage) return [];

    return [
      {
        title: "Tenant-based access",
        description:
          homepage.workflow?.[0]?.description ||
          "Keep every workspace separated with tenant-aware access and login flow.",
      },
      {
        title: "User management",
        description:
          homepage.admin?.features?.[1]?.description ||
          "Create, update, review, and manage team members from one admin space.",
      },
      {
        title: "Task assignment",
        description:
          homepage.workflow?.[2]?.description ||
          "Assign notes as work items and keep execution visible across the tenant.",
      },
    ];
  }, [homepage]);

  const featureCards = useMemo(() => {
    if (!homepage) return [];

    return [
      {
        label: "Admin control",
        title: homepage.admin?.features?.[0]?.title || "Dashboard totals",
        description:
          homepage.admin?.features?.[0]?.description ||
          "See tenant-wide numbers and monitor activity from a central dashboard.",
      },
      {
        label: "Operational flow",
        title: homepage.admin?.features?.[2]?.title || "Assigned note management",
        description:
          homepage.admin?.features?.[2]?.description ||
          "Create and track assigned notes with clear ownership and deadlines.",
      },
      {
        label: "User experience",
        title: homepage.user?.features?.[2]?.title || "Completion and feedback",
        description:
          homepage.user?.features?.[2]?.description ||
          "Let users complete tasks, add feedback, and keep admins informed.",
      },
      {
        label: "Business rules",
        title: homepage.evidence?.[1]?.title || "Plan control",
        description:
          homepage.evidence?.[1]?.description ||
          "Support free and paid plan handling with practical limits and upgrades.",
      },
    ];
  }, [homepage]);

  if (!homepage && !error) {
    return (
      <main className="min-h-screen bg-[#f4f7fb] px-4 py-4 max-[760px]:px-3">
        <section className="grid min-h-[calc(100vh-32px)] place-items-center rounded-[2rem] border border-slate-200 bg-white text-slate-600 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
          Loading homepage...
        </section>
      </main>
    );
  }

  if (!homepage) {
    return (
      <main className="min-h-screen bg-[#f4f7fb] px-4 py-4 max-[760px]:px-3">
        <section className="grid min-h-[calc(100vh-32px)] place-items-center rounded-[2rem] border border-slate-200 bg-white px-4 text-center text-slate-600 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
          <div>
            <p>{error}</p>
            <p>Start the API and refresh the page.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-4 py-4 text-slate-900 max-[760px]:px-3">
      <div className="mx-auto max-w-7xl space-y-5">
        <section className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_55%,#0f766e_100%)] px-6 py-6 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.26),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(110,231,183,0.18),transparent_28%)]" />

          <header className="relative z-10 flex flex-wrap items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/12 text-lg font-black">
              T
            </div>
            <div>
              <p className="text-base font-bold">{homepage.brand.name}</p>
              <p className="text-sm text-slate-200">{homepage.brand.subtitle}</p>
            </div>
          </header>

          <div className="relative z-10 mt-12">
            <div>
              <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,5vw,5.4rem)] font-black leading-[0.98] tracking-[-0.05em]">
                Welcome to multi tenant software, manage your users and notes as a pro
              </h1>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-white px-5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5"
                  href="/auth"
                >
                  Login to workspace
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="rounded-[2rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-8"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                Our services
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950">
                What the platform helps your team do
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {homepage.intro.description}
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {serviceCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(148,163,184,0.16)]"
              >
                <h3 className="text-xl font-black tracking-[-0.03em] text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="features"
          className="rounded-[2rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-8"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
              Features
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950">
              Useful features without extra clutter
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.7rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{card.label}</p>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-slate-950">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="testimonials"
          className="rounded-[2rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-8"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                Testimonials
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950">
                What teams like about the product
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              A simple workflow matters more when teams need clarity, accountability, and clean tenant separation.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-[1.7rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] p-6"
              >
                <p className="text-base leading-7 text-slate-700">"{item.quote}"</p>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <strong className="block text-base font-black tracking-[-0.02em] text-slate-950">
                    {item.name}
                  </strong>
                  <span className="mt-1 block text-sm text-slate-500">{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
