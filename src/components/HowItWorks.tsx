"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import {
  Search,
  CalendarClock,
  CheckCircle2,
  Clapperboard,
  ArrowRight,
  Sparkles,
  MoveDown,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore creative studios built for photography, filmmaking, podcasting, music and more.",
    details: [
      "Browse studio categories",
      "Check locations and facilities",
      "Compare prices and ratings",
    ],
    icon: Search,
  },
  {
    number: "02",
    title: "Select Your Shoot Hours",
    description:
      "Pick the date and time slot that fits your shoot, session or rehearsal.",
    details: [
      "Choose your booking date",
      "Set your start and end time",
      "Check the total price before booking",
    ],
    icon: CalendarClock,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Submit your reservation in a few clicks and track its status from your bookings page.",
    details: [
      "Review your booking summary",
      "Submit your reservation request",
      "Track Pending, Confirmed or Cancelled status",
    ],
    icon: Zap,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Once your booking is confirmed, visit the studio and bring your ideas to life.",
    details: [
      "Arrive at your reserved studio",
      "Use the amenities listed for the space",
      "Focus on making your best work",
    ],
    icon: Clapperboard,
  },
];

// Top, right, bottom and left of the wheel (90° apart)
const wheelPositions = [
  "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
  "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
  "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
];

const STEP_ANGLE = 360 / steps.length;

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const wheelRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(steps.length - 1) * STEP_ANGLE],
  );

  // Keeps each icon tile upright while the wheel turns
  const counterRotation = useTransform(wheelRotation, (value) => -value);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      steps.length - 1,
      Math.max(0, Math.round(latest * (steps.length - 1))),
    );
    setActiveIndex((prev) => (prev === index ? prev : index));
  });

  const activeStep = steps[activeIndex];
  const ActiveIcon = activeStep.icon;

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative h-[400vh] bg-[#faf9fc] text-[#18151d] dark:bg-[#09090b] dark:text-white"
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* pt-20 keeps the content clear of the sticky navbar.
            Change it if your navbar is taller or shorter. */}
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 pb-5 pt-20 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-3 shrink-0 text-center sm:mb-5">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100/70 px-3 py-1.5 text-xs font-medium text-[#9b2ae5] dark:border-purple-500/20 dark:bg-purple-500/10 sm:text-sm [@media(max-height:700px)]:hidden">
              <Sparkles size={14} />
              Simple Process
            </div>

            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              How It <span className="text-[#9b2ae5]">Works</span>
            </h2>

            <p className="mx-auto mt-2 hidden max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400 sm:block [@media(max-height:720px)]:hidden">
              From discovering the right space to booking your next shoot,
              everything takes four simple steps.
            </p>
          </div>

          {/* Wheel and card */}
          <div className="grid min-h-0 flex-1 grid-cols-1 items-center justify-items-center gap-6 lg:grid-cols-2 lg:gap-12">
            {/* Wheel (desktop only) */}
            <div className="hidden min-h-0 w-full flex-col items-center justify-center lg:flex">
              <div className="relative my-6 flex aspect-square w-[min(320px,42dvh)] items-center justify-center">
                {/* Rings */}
                <div className="absolute inset-0 rounded-full border border-dashed border-purple-300 dark:border-purple-500/30" />
                <div className="absolute inset-[11%] rounded-full border border-purple-200 dark:border-purple-500/20" />
                <div className="absolute inset-[24%] rounded-full border border-purple-200/70 dark:border-purple-500/20" />

                {/* Rotating wheel */}
                <motion.div
                  style={{ rotate: wheelRotation }}
                  className="absolute inset-0 rounded-full"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-purple-300/60 dark:border-purple-500/40" />

                  {steps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.number}
                        className={cn("absolute z-20", wheelPositions[index])}
                      >
                        <motion.div
                          style={{ rotate: counterRotation }}
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg transition-colors duration-500",
                            activeIndex === index
                              ? "border-[#9b2ae5] bg-[#9b2ae5] text-white shadow-purple-500/30"
                              : "border-purple-200 bg-white text-[#9b2ae5] dark:border-purple-500/30 dark:bg-[#18151d] dark:text-purple-300",
                          )}
                        >
                          <Icon size={22} />
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>

                {/* Center circle */}
                <div className="relative z-10 flex h-[42%] w-[42%] flex-col items-center justify-center rounded-full border border-purple-200 bg-white shadow-xl shadow-purple-500/10 dark:border-purple-500/30 dark:bg-[#151018]">
                  <motion.div
                    key={activeIndex}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <span className="text-3xl font-bold text-[#9b2ae5]">
                      {activeStep.number}
                    </span>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Step
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MoveDown size={16} className="animate-bounce" />
                Scroll to explore
              </div>
            </div>

            {/* Information card */}
            <div className="flex min-h-0 w-full items-center justify-center">
              <div className="w-full max-w-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="rounded-3xl border border-purple-200 bg-white p-5 shadow-xl shadow-purple-500/5 dark:border-white/10 dark:bg-[#151518] sm:p-6"
                  >
                    {/* Top row */}
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full bg-purple-100 px-3 py-1.5 text-xs font-semibold text-[#9b2ae5] dark:bg-purple-500/10">
                        Step {activeStep.number}
                      </span>

                      <div className="flex gap-1.5">
                        {steps.map((step, index) => (
                          <div
                            key={step.number}
                            className={cn(
                              "h-1.5 rounded-full transition-all duration-500",
                              activeIndex === index
                                ? "w-8 bg-[#9b2ae5]"
                                : "w-3 bg-purple-200 dark:bg-white/15",
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Icon and title on one row */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-[#9b2ae5] dark:bg-purple-500/10">
                        <ActiveIcon size={24} />
                      </div>
                      <h3 className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                        {activeStep.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {activeStep.description}
                    </p>

                    {/* Details */}
                    <div className="mt-4 space-y-2.5">
                      {activeStep.details.map((detail, index) => (
                        <motion.div
                          key={detail}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[#9b2ae5] dark:bg-purple-500/10">
                            <CheckCircle2 size={14} />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {detail}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-5 border-t border-gray-200 pt-4 dark:border-white/10">
                      <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {activeIndex + 1} of {steps.length} steps
                        </span>
                        <span>
                          {Math.round(((activeIndex + 1) / steps.length) * 100)}
                          % completed
                        </span>
                      </div>

                      <Link
                        href="/studios"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9b2ae5] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#8522c7] hover:shadow-lg hover:shadow-purple-500/20"
                      >
                        Explore Studios
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;