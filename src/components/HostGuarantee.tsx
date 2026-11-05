
"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";

import {
  BadgeCheck,
  Check,
  Headphones,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

type Audience = "hosts" | "creators";

type Assurance = {
  title: string;
  icon: LucideIcon;
  copy: Record<Audience, string>;
};

const assurances: Assurance[] = [
  {
    title: "Liability protection",
    icon: ShieldCheck,
    copy: {
      hosts:
        "Every booking is covered from drop-off to wrap, so a damaged prop or an on-set accident doesn't land on you.",
      creators:
        "Book knowing you're covered if equipment fails or something goes wrong during your session.",
    },
  },
  {
    title: "Verified profiles",
    icon: BadgeCheck,
    copy: {
      hosts:
        "Guests confirm their identity before they can book, so you always know who is walking into your space.",
      creators:
        "Every host is identity-checked and reviewed, so you know the studio and the people behind it are legitimate.",
    },
  },
  {
    title: "Equipment safety",
    icon: Wrench,
    copy: {
      hosts:
        "List your gear, safety notes, and house rules up front so guests know exactly how to use your space.",
      creators:
        "See what's included and how to use it before you arrive — no surprises and no guesswork on set.",
    },
  },
  {
    title: "24/7 host support",
    icon: Headphones,
    copy: {
      hosts:
        "Reach a real person any hour for access issues, last-minute changes, or booking disputes.",
      creators:
        "Reach a real person any hour for access issues, last-minute changes, or cancellations.",
    },
  },
];

const audiences = [
  { id: "hosts", label: "For hosts" },
  { id: "creators", label: "For creators" },
] as const;

const commitments = [
  "Cover from booking to wrap",
  "Identity-verified hosts and guests",
  "Real people, around the clock",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const bottomVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const cardContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
};

const commitmentContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function HostGuarantee() {
  const [audience, setAudience] = useState<Audience>("hosts");

  return (
    <section
      id="host-guarantee"
      className="relative scroll-mt-20 overflow-hidden bg-[#faf9fc] py-20 text-[#18151d] dark:bg-[#09090b] dark:text-white sm:py-24"
    >
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-[rgb(155,42,229)]/10 blur-3xl dark:bg-[rgb(155,42,229)]/20"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-[rgb(155,42,229)]/5 blur-3xl dark:bg-[rgb(155,42,229)]/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Tabs
          value={audience}
          onValueChange={(value) => setAudience(value as Audience)}
          className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
        >
          {/* LEFT CONTENT */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={bottomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Badge
                variant="outline"
                className="h-6 gap-1.5 rounded-full border-purple-200 bg-purple-50 px-3 text-[11px] font-semibold tracking-[0.18em] text-purple-700 uppercase dark:border-white/15 dark:bg-white/5 dark:text-white/80"
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="size-3.5 text-[rgb(155,42,229)]"
                />
                Host guarantee & creator support
              </Badge>
            </motion.div>

            <motion.h2
              variants={bottomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Book with confidence. Host with backup.
            </motion.h2>

            <motion.p
              variants={bottomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-[#68616f] dark:text-white/70 sm:text-lg"
            >
              StudioSpace protects both sides of every booking — so hosts can
              share their space and creators can focus on the work.
            </motion.p>

            {/* Audience Tabs */}
            <motion.div
              variants={bottomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <TabsList className="mt-7 h-auto w-full max-w-xs gap-1 rounded-[10px] border border-purple-100 bg-purple-50 p-1 dark:border-white/15 dark:bg-white/5">
                {audiences.map((item) => (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className={cn(
                      "h-9 flex-1 rounded-lg px-4 text-sm font-bold text-[#77717e] dark:text-white/60",
                      "hover:text-purple-700 dark:hover:text-white",
                      "data-active:bg-[rgb(155,42,229)] data-active:text-white data-active:shadow-none",
                      "after:hidden",
                    )}
                  >
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {/* Commitments */}
            <motion.ul
              variants={commitmentContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 space-y-3 text-sm text-[#49434f] dark:text-white/80 sm:text-base"
            >
              {commitments.map((commitment) => (
                <motion.li
                  key={commitment}
                  variants={bottomVariants}
                  className="flex items-center gap-3"
                >
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[rgb(155,42,229)] ring-1 ring-purple-200 dark:bg-[rgb(155,42,229)]/15 dark:ring-[rgb(155,42,229)]/30">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  {commitment}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative min-w-0"
          >
            {audiences.map((item) => (
              <TabsContent
                key={item.id}
                value={item.id}
                className="mt-0"
              >
                <motion.ul
                  variants={cardContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-4 sm:grid-cols-2"
                >
                  {assurances.map((assurance) => {
                    const Icon = assurance.icon;

                    return (
                      <motion.li
                        key={assurance.title}
                        variants={cardVariants}
                        className="h-full"
                      >
                        <Card className="h-full gap-4 rounded-2xl border border-purple-100 bg-white py-6 text-[#18151d] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:border-[rgb(155,42,229)]/40 dark:hover:bg-white/8">
                          <CardHeader>
                            <span className="inline-flex size-11 items-center justify-center rounded-[10px] bg-purple-100 text-[rgb(155,42,229)] ring-1 ring-purple-200 dark:bg-[rgb(155,42,229)]/15 dark:ring-[rgb(155,42,229)]/30">
                              <Icon
                                aria-hidden="true"
                                className="size-5"
                              />
                            </span>

                            <CardTitle className="mt-1 text-lg font-bold tracking-tight text-[#18151d] dark:text-white">
                              {assurance.title}
                            </CardTitle>

                            <CardDescription className="text-sm leading-relaxed text-[#68616f] dark:text-white/60">
                              {assurance.copy[item.id]}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="mt-auto">
                            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-purple-700 uppercase dark:text-white/40">
                              <span
                                aria-hidden="true"
                                className="inline-flex size-1.5 rounded-full bg-[rgb(155,42,229)]"
                              />
                              {item.label}
                            </span>
                          </CardContent>
                        </Card>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </TabsContent>
            ))}
          </motion.div>
        </Tabs>
      </div>
    </section>
  );
}
