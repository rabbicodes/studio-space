import {
  BadgeCheck,
  Check,
  Headphones,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Assurance = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const assurances: Assurance[] = [
  {
    title: "Liability protection",
    description:
      "Every booking includes clear liability cover, so hosts and creators are protected if something goes wrong on set.",
    icon: ShieldCheck,
  },
  {
    title: "Verified profiles",
    description:
      "Hosts and guests confirm their identity before booking, keeping the marketplace trusted and accountable.",
    icon: BadgeCheck,
  },
  {
    title: "Equipment safety",
    description:
      "Studios list their gear and safety details up front, with clear house rules for handling everything on site.",
    icon: Wrench,
  },
  {
    title: "24/7 host support",
    description:
      "Real people on call around the clock for scheduling issues, access problems, or last-minute changes.",
    icon: Headphones,
  },
];

const commitments = [
  "Cover from booking to wrap",
  "Identity-verified hosts and guests",
  "Real people, around the clock",
] as const;

export function HostGuarantee() {
  return (
    <section
      id="host-guarantee"
      className="relative scroll-mt-20 overflow-hidden bg-neutral-950 py-20 text-white sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-[rgb(155,42,229)]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-[rgb(155,42,229)]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
              <ShieldCheck
                aria-hidden="true"
                className="size-3.5 text-[rgb(155,42,229)]"
              />
              Host guarantee & creator support
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Book with confidence. Host with backup.
            </h2>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-white/70 sm:text-lg">
              StudioSpace protects both sides of every booking — so hosts can
              share their space and creators can focus on the work.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-white/80 sm:text-base">
              {commitments.map((commitment) => (
                <li key={commitment} className="flex items-center gap-3">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgb(155,42,229)]/15 text-[rgb(155,42,229)] ring-1 ring-[rgb(155,42,229)]/30">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  {commitment}
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {assurances.map((assurance) => {
              const Icon = assurance.icon;

              return (
                <li
                  key={assurance.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors duration-300 hover:border-[rgb(155,42,229)]/50 hover:bg-white/[0.08]"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-[10px] bg-[rgb(155,42,229)]/15 text-[rgb(155,42,229)] ring-1 ring-[rgb(155,42,229)]/30 transition-colors duration-300 group-hover:bg-[rgb(155,42,229)] group-hover:text-white">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>

                  <h3 className="mt-5 text-lg font-bold tracking-tight">
                    {assurance.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {assurance.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
