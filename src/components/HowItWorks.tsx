import {
  CalendarClock,
  Clapperboard,
  Search,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    title: "Discover Spaces",
    description:
      "Filter by space type, location, size, and availability to shortlist the studios that fit your shoot.",
    icon: Search,
  },
  {
    title: "Select Shoot Hours",
    description:
      "Pick your date and time slots with live availability and transparent hourly pricing — no back-and-forth.",
    icon: CalendarClock,
  },
  {
    title: "Book Instantly",
    description:
      "Confirm and pay securely in a few clicks. Your slot is locked in the moment you check out.",
    icon: Zap,
  },
  {
    title: "Create & Produce",
    description:
      "Show up, shoot, and wrap. Manage your booking, add-ons, and receipts from your dashboard.",
    icon: Clapperboard,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(155,42,229)]/20 bg-[rgb(155,42,229)]/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[rgb(155,42,229)] uppercase">
            <Sparkles aria-hidden="true" className="size-3.5" />
            How booking works
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            From idea to shoot in four steps.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            Discover a space, lock in your hours, and get straight to creating —
            with transparent pricing and real-time availability at every step.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-6 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-[rgb(155,42,229)]/0 via-[rgb(155,42,229)]/40 to-[rgb(155,42,229)]/0 lg:block"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <li key={step.title} className="relative">
                <div className="group h-full rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(155,42,229)]/40 hover:shadow-[0_18px_45px_-24px_rgba(155,42,229,0.55)]">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-12 items-center justify-center rounded-[10px] bg-[rgb(155,42,229)]/10 text-[rgb(155,42,229)] ring-1 ring-[rgb(155,42,229)]/20 transition-colors duration-300 group-hover:bg-[rgb(155,42,229)] group-hover:text-white">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold tracking-tight">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <span
            aria-hidden="true"
            className="inline-flex size-1.5 rounded-full bg-[rgb(155,42,229)]"
          />
          Every booking is confirmed instantly — no waiting on host approval.
        </p>
      </div>
    </section>
  );
}
