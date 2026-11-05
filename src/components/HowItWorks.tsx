
"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  CalendarClock,
  Check,
  Clapperboard,
  Search,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/Reveal";

import { cn } from "@/lib/utils";

type Step = {
  id: string;
  title: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  points: readonly string[];
};

const steps: Step[] = [
  {
    id: "discover",
    title: "Discover Spaces",
    summary: "Shortlist spaces that fit the brief.",
    description:
      "Filter by space type, location, size, and availability to shortlist the studios that fit your shoot.",
    icon: Search,
    points: [
      "Browse photography, music, podcast, and film spaces",
      "Compare hourly rates and amenities side by side",
      "Save your favourites for the next session",
    ],
  },
  {
    id: "select-hours",
    title: "Select Shoot Hours",
    summary: "Lock in the dates that work.",
    description:
      "Pick your date and time slots with live availability and transparent hourly pricing — no back-and-forth.",
    icon: CalendarClock,
    points: [
      "See live availability for every studio",
      "Choose hourly, half-day, or full-day blocks",
      "Know the full price before you commit",
    ],
  },
  {
    id: "book",
    title: "Book Instantly",
    summary: "Confirm in a few clicks.",
    description:
      "Confirm and pay securely in a few clicks. Your slot is locked in the moment you check out.",
    icon: Zap,
    points: [
      "Secure checkout with clear, upfront pricing",
      "Instant confirmation — no waiting on approval",
      "Receipts and booking details in your dashboard",
    ],
  },
  {
    id: "produce",
    title: "Create & Produce",
    summary: "Show up and make it.",
    description:
      "Show up, shoot, and wrap. Manage your booking, add-ons, and receipts from your dashboard.",
    icon: Clapperboard,
    points: [
      "Access details and house rules up front",
      "Add extras like lighting or backdrops",
      "Manage changes and invoices in one place",
    ],
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(steps[0].id);

  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === active),
  );

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <RevealGroup className="flex flex-wrap items-end justify-between gap-6">
          <RevealItem className="max-w-2xl">
            <Badge
              variant="outline"
              className="h-6 gap-1.5 rounded-full border-[rgb(155,42,229)]/25 bg-[rgb(155,42,229)]/10 px-3 text-[11px] font-semibold tracking-[0.18em] text-[rgb(155,42,229)] uppercase"
            >
              <Sparkles aria-hidden="true" className="size-3.5" />
              How booking works
            </Badge>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              From idea to shoot in four steps.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              Walk the booking flow step by step — transparent pricing and
              real-time availability from discovery to wrap.
            </p>
          </RevealItem>
        </RevealGroup>

        {/* Progress Bar */}
        <RevealGroup className="mt-8">
          <RevealItem className="flex items-center gap-4">
            <Progress
              value={((activeIndex + 1) / steps.length) * 100}
              aria-label={`Booking step ${activeIndex + 1} of ${steps.length}`}
              className="w-full flex-1 gap-0 **:data-[slot=progress-indicator]:bg-[rgb(155,42,229)] **:data-[slot=progress-track]:h-1.5 **:data-[slot=progress-track]:bg-[rgb(155,42,229)]/15"
            />

            <span className="shrink-0 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase tabular-nums">
              Step {activeIndex + 1} / {steps.length}
            </span>
          </RevealItem>
        </RevealGroup>

        <p aria-live="polite" className="sr-only">
          Step {activeIndex + 1} of {steps.length}: {steps[activeIndex].title}
        </p>

        {/* Steps */}
        <Tabs
          value={active}
          onValueChange={(value) => setActive(String(value))}
          orientation="vertical"
          className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start"
        >
          {/* Step List */}
          <RevealList className="flex flex-col items-stretch gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <RevealListItem key={step.id}>
                  <TabsList
                    className="h-auto w-full flex-col items-stretch gap-2 rounded-none bg-transparent p-0"
                  >
                    <TabsTrigger
                      value={step.id}
                      className={cn(
                        "h-auto w-full justify-start gap-4 rounded-[10px] border border-border/70 bg-card px-4 py-4 text-left whitespace-normal",
                        "hover:border-[rgb(155,42,229)]/30 hover:bg-card",
                        "data-active:border-[rgb(155,42,229)]/50 data-active:bg-[rgb(155,42,229)]/5 data-active:shadow-none",
                        "after:hidden",
                      )}
                    >
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[rgb(155,42,229)]/10 text-xs font-bold text-[rgb(155,42,229)] tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="flex flex-1 flex-col gap-0.5">
                        <span className="text-base font-bold">
                          {step.title}
                        </span>

                        <span className="text-xs font-normal text-muted-foreground">
                          {step.summary}
                        </span>
                      </span>

                      <Icon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-[rgb(155,42,229)]"
                      />
                    </TabsTrigger>
                  </TabsList>
                </RevealListItem>
              );
            })}
          </RevealList>

          {/* Active Step Card */}
          <div className="relative min-w-0">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <TabsContent key={step.id} value={step.id}>
                  <RevealGroup>
                    <RevealItem>
                      <Card className="gap-5 rounded-2xl border border-border/70 bg-card py-6 ring-0">
                        <CardHeader>
                          <RevealGroup className="flex flex-col gap-5">
                            <RevealItem>
                              <div className="flex items-start justify-between gap-4">
                                <span className="inline-flex size-12 items-center justify-center rounded-[10px] bg-[rgb(155,42,229)] text-white">
                                  <Icon
                                    aria-hidden="true"
                                    className="size-5"
                                  />
                                </span>

                                <Badge
                                  variant="outline"
                                  className="rounded-full border-[rgb(155,42,229)]/25 bg-[rgb(155,42,229)]/10 px-3 text-[11px] font-semibold tracking-[0.16em] text-[rgb(155,42,229)] uppercase"
                                >
                                  Step {String(index + 1).padStart(2, "0")}
                                </Badge>
                              </div>
                            </RevealItem>

                            <RevealItem>
                              <CardTitle className="text-xl font-bold tracking-tight sm:text-2xl">
                                {step.title}
                              </CardTitle>
                            </RevealItem>

                            <RevealItem>
                              <CardDescription className="text-sm leading-relaxed">
                                {step.description}
                              </CardDescription>
                            </RevealItem>
                          </RevealGroup>
                        </CardHeader>

                        <CardContent>
                          <RevealList className="space-y-2.5 text-sm">
                            {step.points.map((point) => (
                              <RevealListItem
                                key={point}
                                className="flex items-start gap-2.5"
                              >
                                <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[rgb(155,42,229)]/10 text-[rgb(155,42,229)]">
                                  <Check
                                    aria-hidden="true"
                                    className="size-3"
                                  />
                                </span>

                                {point}
                              </RevealListItem>
                            ))}
                          </RevealList>

                          <RevealGroup className="mt-6">
                            <RevealItem>
                              <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-5">
                                <span className="text-xs text-muted-foreground">
                                  {activeIndex + 1} of {steps.length} steps
                                </span>

                                {index < steps.length - 1 ? (
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      setActive(steps[index + 1].id)
                                    }
                                    className="h-10 rounded-[10px] bg-[rgb(155,42,229)] px-5 text-sm font-bold text-white hover:bg-[rgb(138,30,208)]"
                                  >
                                    Next: {steps[index + 1].title}

                                    <ArrowRight
                                      aria-hidden="true"
                                      className="size-4"
                                    />
                                  </Button>
                                ) : (
                                  <Link
                                    href="/studios"
                                    className={cn(
                                      buttonVariants({ size: "lg" }),
                                      "h-10 rounded-[10px] bg-[rgb(155,42,229)] px-5 text-sm font-bold text-white hover:bg-[rgb(138,30,208)]",
                                    )}
                                  >
                                    Explore Studios

                                    <ArrowRight
                                      aria-hidden="true"
                                      className="size-4"
                                    />
                                  </Link>
                                )}
                              </div>
                            </RevealItem>
                          </RevealGroup>
                        </CardContent>
                      </Card>
                    </RevealItem>
                  </RevealGroup>
                </TabsContent>
              );
            })}
          </div>
        </Tabs>

        {/* Bottom Description */}
        <RevealGroup className="mt-6">
          <RevealItem>
            <p className="text-sm text-muted-foreground">
              Select a step to explore it and follow the booking flow from
              discovery to production.
            </p>
          </RevealItem>
        </RevealGroup>

      </div>
    </section>
  );
}
