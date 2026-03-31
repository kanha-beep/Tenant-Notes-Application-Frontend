import { Link } from "react-router-dom";

const featureCards = [
  {
    title: "Tenant management",
    description:
      "Organize each company with cleaner boundaries, clearer ownership, and less dashboard clutter.",
    tone: "from-sky-500/15 to-cyan-400/10",
    icon: "TN",
  },
  {
    title: "Notes that stay useful",
    description:
      "Turn updates, decisions, and internal context into a shared knowledge layer your team can actually navigate.",
    tone: "from-emerald-500/15 to-teal-400/10",
    icon: "NT",
  },
  {
    title: "Admin visibility",
    description:
      "Give admins a stronger overview of people, activity, and operations from one polished surface.",
    tone: "from-violet-500/15 to-fuchsia-400/10",
    icon: "AD",
  },
];

const productStats = [
  { value: "Teams", label: "structured by role" },
  { value: "Notes", label: "centralized in one place" },
  { value: "Admins", label: "with better oversight" },
];

const sections = [
  {
    title: "Editorial-style clarity",
    text: "Inspired by modern publishing products, the layout uses stronger hierarchy, cleaner spacing, and more readable content blocks.",
  },
  {
    title: "SaaS-style conversion",
    text: "The page guides users toward the two real actions that matter here: entering the workspace and checking system status.",
  },
  {
    title: "Tailwind-first structure",
    text: "Everything is built with utility classes so the homepage stays easier to evolve inside your React app.",
  },
];

export default function Home() {
  return (
    <main className="w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <section className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.12),transparent_26%),linear-gradient(180deg,#f8fbff_0%,#ffffff_72%)]" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
              Modern tenant workspace
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl">
              A sharper homepage for tenant, notes, and team operations.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Designed with Tailwind CSS and guided by current blogging software
              patterns, this homepage mixes product storytelling with a cleaner
              admin-software feel so the app looks modern without losing its purpose.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Open workspace
              </Link>
              <Link
                to="/health"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:border-sky-200 hover:text-sky-700"
              >
                Check system health
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {productStats.map((item) => (
                <article
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
                >
                  <p className="text-2xl font-extrabold text-slate-900">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_26px_70px_rgba(15,23,42,0.22)]">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-300">
                    Product snapshot
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-white">
                    One system for teams and tenant records
                  </h2>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Active
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-sky-400/10 p-4 ring-1 ring-sky-300/20">
                  <p className="text-sm text-sky-200">Users and roles</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Built for admins, owners, and everyday users.
                  </p>
                </div>
                <div className="rounded-2xl bg-violet-400/10 p-4 ring-1 ring-violet-300/20">
                  <p className="text-sm text-violet-200">Operational notes</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Capture updates without losing accountability.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white/6 p-4 ring-1 ring-white/10">
                <p className="text-sm text-slate-300">Why this direction works</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
                  <li>Cleaner than a plain hero banner.</li>
                  <li>More relevant to your product than a generic blog clone.</li>
                  <li>Balances modern SaaS design with real app context.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {featureCards.map((card) => (
            <article
              key={card.title}
              className={`rounded-[1.6rem] border border-slate-200 bg-gradient-to-br ${card.tone} p-6 shadow-sm`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-900 shadow-sm">
                {card.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
              Design direction
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-950">
              Modern inspiration, adapted to your actual app.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              The structure takes cues from current writing platforms that use calm
              layout, layered cards, and strong content hierarchy, but it stays focused
              on tenants, notes, and admin workflows instead of pretending this is a newsletter product.
            </p>
          </div>

          <div className="grid gap-4">
            {sections.map((section, index) => (
              <article
                key={section.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{section.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
