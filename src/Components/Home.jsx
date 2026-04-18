import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const eyebrowClass =
  "m-0 text-[0.84rem] font-bold uppercase tracking-[0] text-[#9fd4b2]";
const primaryActionClass =
  "inline-flex min-h-[46px] items-center justify-center rounded-[8px] border border-transparent bg-[#a6d6b3] px-[18px] text-[1rem] font-bold text-[#182019]";
const secondaryActionClass =
  "inline-flex min-h-[46px] items-center justify-center rounded-[8px] border border-[rgba(247,247,243,0.18)] bg-[rgba(247,247,243,0.12)] px-[18px] text-[1rem] text-[#f7f7f3]";
const sectionTitleClass =
  "mt-[10px] text-[clamp(1.9rem,3vw,3.4rem)] leading-[1.04] text-[#1d221d]";
const sectionBodyClass =
  "mt-[18px] max-w-[650px] text-[1.08rem] leading-[1.7] text-[#576057]";

export default function Home() {
  const [homepage, setHomepage] = useState(null);
  const [error, setError] = useState("");
  const healthUrl = `${API_BASE}/api/health`;
  const homepageDataUrl = `${API_BASE}/api/homepage`;

  useEffect(() => {
    const loadHomepage = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/homepage`);

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

  if (!homepage && !error) {
    return (
      <main className="min-h-screen p-4 max-[760px]:p-3">
        <section className="grid min-h-[calc(100vh-32px)] place-items-center rounded-[8px] bg-[linear-gradient(180deg,rgba(17,23,18,0.16),rgba(17,23,18,0.48)),url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center text-center text-[#f7f7f3]">
          Loading homepage...
        </section>
      </main>
    );
  }

  if (!homepage) {
    return (
      <main className="min-h-screen p-4 max-[760px]:p-3">
        <section className="grid min-h-[calc(100vh-32px)] place-items-center rounded-[8px] bg-[linear-gradient(180deg,rgba(17,23,18,0.16),rgba(17,23,18,0.48)),url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center px-4 text-center text-[#f7f7f3]">
          <div>
            <p>{error}</p>
            <p>Start the API and refresh the page.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 max-[760px]:p-3">
      <section className="relative flex min-h-[86vh] flex-col justify-between overflow-hidden rounded-[8px] bg-[linear-gradient(180deg,rgba(16,20,16,0.18),rgba(16,20,16,0.62)),url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center text-[#f7f7f3] max-[760px]:min-h-[78vh]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,23,18,0.82)_0%,rgba(17,23,18,0.3)_58%),linear-gradient(180deg,rgba(17,23,18,0.1),rgba(17,23,18,0.34))]" />

        <header className="relative z-[1] flex items-center gap-[14px] px-7 pt-6 max-[760px]:flex-wrap max-[760px]:items-start max-[760px]:px-4">
          <div className="grid h-10 w-10 place-items-center rounded-[8px] border border-[rgba(247,247,243,0.18)] bg-[rgba(247,247,243,0.14)] font-bold">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-[0.98rem] font-bold">{homepage.brand.name}</span>
            <span className="text-[0.82rem] text-[rgba(247,247,243,0.78)]">
              {homepage.brand.subtitle}
            </span>
          </div>
          <nav
            className="ml-auto flex flex-wrap gap-[18px] max-[760px]:ml-0 max-[760px]:w-full max-[760px]:gap-3"
            aria-label="Primary"
          >
            <a className="text-[0.94rem] text-[rgba(247,247,243,0.9)]" href="#workflow">
              Workflow
            </a>
            <a className="text-[0.94rem] text-[rgba(247,247,243,0.9)]" href="#admin">
              Admin
            </a>
            <a className="text-[0.94rem] text-[rgba(247,247,243,0.9)]" href="#users">
              Users
            </a>
            <a className="text-[0.94rem] text-[rgba(247,247,243,0.9)]" href="#plans">
              Plans
            </a>
          </nav>
        </header>

        <div className="relative z-[1] max-w-[760px] px-7 pb-10 max-[760px]:px-4">
          <p className={eyebrowClass}>{homepage.hero.badge}</p>
          <h1 className="mt-[10px] text-[clamp(2.3rem,4vw,5rem)] leading-[1.04]">
            {homepage.hero.title}
          </h1>
          <p className="mt-[18px] max-w-[650px] text-[1.08rem] leading-[1.7] text-[rgba(247,247,243,0.82)]">
            {homepage.hero.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a className={primaryActionClass} href="/auth">
              Login to workspace
            </a>
            <a
              className={secondaryActionClass}
              href={healthUrl}
              target="_blank"
              rel="noreferrer"
            >
              Check system health
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 max-[760px]:grid-cols-1">
            {homepage.metrics.map((metric) => (
              <article
                className="min-h-[94px] rounded-[8px] border border-[rgba(247,247,243,0.16)] bg-[rgba(247,247,243,0.1)] p-4"
                key={metric.label}
              >
                <strong className="block text-[1.8rem]">{metric.value}</strong>
                <span className="mt-[6px] block text-[rgba(247,247,243,0.78)]">
                  {metric.label}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-[18px] grid gap-[18px]">
        <section
          className="grid grid-cols-[minmax(0,1fr)_minmax(300px,420px)] gap-[18px] rounded-[8px] border border-[#d7dbd4] bg-[#fafaf6] p-6 max-[1100px]:grid-cols-1 max-[760px]:px-4"
          id="workflow"
        >
          <div>
            <p className={eyebrowClass}>What the software actually does</p>
            <h2 className={sectionTitleClass}>{homepage.intro.title}</h2>
          </div>
          <p className={sectionBodyClass}>{homepage.intro.description}</p>
        </section>

        <section className="grid grid-cols-4 gap-[14px] max-[1100px]:grid-cols-1">
          {homepage.workflow.map((step) => (
            <article
              className="rounded-[8px] border border-[#dde2db] bg-[#f1f3ee] p-[18px]"
              key={step.title}
            >
              <span className="mb-[14px] inline-block text-[0.84rem] font-bold text-[#576057]">
                {step.step}
              </span>
              <h3 className="m-0 text-[1.16rem]">{step.title}</h3>
              <p className="mt-[10px] leading-[1.65] text-[#576057]">
                {step.description}
              </p>
            </article>
          ))}
        </section>

        <section
          className="grid grid-cols-2 items-start gap-[18px] rounded-[8px] border border-[#d7dbd4] bg-[#fafaf6] p-6 max-[1100px]:grid-cols-1 max-[760px]:px-4"
          id="admin"
        >
          <div>
            <p className={eyebrowClass}>Admin workflow</p>
            <h2 className={sectionTitleClass}>{homepage.admin.title}</h2>
            <p className={sectionBodyClass}>{homepage.admin.description}</p>
          </div>
          <div className="grid gap-3">
            {homepage.admin.features.map((feature) => (
              <article
                className="rounded-[8px] border border-[#dde2db] bg-[#f1f3ee] p-[18px]"
                key={feature.title}
              >
                <strong className="text-[1.05rem]">{feature.title}</strong>
                <p className="mt-[10px] leading-[1.65] text-[#576057]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="grid grid-cols-2 items-start gap-[18px] rounded-[8px] border border-[#d7dbd4] bg-[#f7f8f3] p-6 max-[1100px]:grid-cols-1 max-[760px]:px-4"
          id="users"
        >
          <div className="grid gap-3">
            {homepage.user.features.map((feature) => (
              <article
                className="rounded-[8px] border border-[#dde2db] bg-[#f1f3ee] p-[18px]"
                key={feature.title}
              >
                <strong className="text-[1.05rem]">{feature.title}</strong>
                <p className="mt-[10px] leading-[1.65] text-[#576057]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
          <div>
            <p className={eyebrowClass}>User workflow</p>
            <h2 className={sectionTitleClass}>{homepage.user.title}</h2>
            <p className={sectionBodyClass}>{homepage.user.description}</p>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-[14px] max-[1100px]:grid-cols-1">
          {homepage.evidence.map((item) => (
            <article
              className="rounded-[8px] border border-[#dde2db] bg-[#f1f3ee] p-[18px]"
              key={item.title}
            >
              <p className={eyebrowClass}>{item.label}</p>
              <h3 className="m-0 mt-[10px] text-[1.16rem] text-[#1d221d]">
                {item.title}
              </h3>
              <p className="mt-[10px] leading-[1.65] text-[#576057]">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <section
          className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-[18px] rounded-[8px] border border-[#d7dbd4] bg-[#fafaf6] p-6 max-[1100px]:grid-cols-1 max-[760px]:px-4"
          id="plans"
        >
          <div>
            <p className={eyebrowClass}>Plan and reporting</p>
            <h2 className={sectionTitleClass}>{homepage.plan.title}</h2>
            <p className={sectionBodyClass}>{homepage.plan.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-[14px] max-[1100px]:grid-cols-1">
            {homepage.plan.features.map((feature) => (
              <article
                className="rounded-[8px] border border-[#dde2db] bg-[#f1f3ee] p-[18px]"
                key={feature.title}
              >
                <strong className="text-[1.05rem]">{feature.title}</strong>
                <p className="mt-[10px] leading-[1.65] text-[#576057]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-[18px] rounded-[8px] border border-[#d7dbd4] bg-[linear-gradient(180deg,rgba(17,23,18,0.12),rgba(17,23,18,0.34)),url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-6 text-[#f7f7f3] max-[760px]:px-4">
          <p className={eyebrowClass}>Ready to use it</p>
          <h2 className="mt-[10px] text-[clamp(1.9rem,3vw,3.4rem)] leading-[1.04]">
            {homepage.cta.title}
          </h2>
          <p className="mt-[18px] max-w-[650px] text-[1.08rem] leading-[1.7] text-[rgba(247,247,243,0.82)]">
            {homepage.cta.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className={primaryActionClass} href="/auth">
              Open login
            </a>
            <a
              className={secondaryActionClass}
              href={homepageDataUrl}
              target="_blank"
              rel="noreferrer"
            >
              View product data
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
