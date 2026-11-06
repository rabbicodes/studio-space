
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Compass,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Explore Unique Spaces",
    description:
      "Discover creative studios and workspaces that match your vision and requirements.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking Experience",
    description:
      "Find your ideal studio and book your preferred space through a simple process.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Information",
    description:
      "Explore studio details, facilities, pricing and availability before making a decision.",
  },
];

const AboutUs = () => {
  const directions = [
    { x: -100, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 0 },
  ];

  return (
    <section
      id="about-us"
      className="relative overflow-hidden bg-[#faf8fd] py-20 dark:bg-[#09070e] md:py-28"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#9b2ae5]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#9b2ae5]/20 bg-[#9b2ae5]/5 px-4 py-2">
              <Sparkles size={15} className="text-[#9b2ae5]" />
              <span className="text-sm font-semibold text-[#9b2ae5]">
                GET TO KNOW US
              </span>
            </div>

            <h2 className="max-w-xl text-4xl leading-tight font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-[56px]">
              Your Space, Your
              <span className="block bg-gradient-to-r from-[#9b2ae5] to-[#c77aff] bg-clip-text text-transparent">
                Creative Freedom.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-gray-600 dark:text-gray-400 md:text-lg">
              At StudioSpace, we believe every great idea deserves the right
              environment. We make it easier to discover and book creative
              spaces for photography, music, podcasts, workshops and more.
            </p>

            <p className="mt-4 max-w-xl text-base leading-8 text-gray-600 dark:text-gray-400">
              Whether you are a creator looking for the perfect studio or a
              space owner ready to share your workspace, StudioSpace brings
              both sides together in one convenient platform.
            </p>

            {/* Highlights */}
            <div className="mt-8 space-y-4">
              {[
                "Discover spaces that fit your creative needs",
                "Compare studio facilities and pricing",
                "Book your preferred workspace with ease",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-[#9b2ae5]"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 md:text-base">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/studios"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#9b2ae5] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#9b2ae5]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#8120c4] hover:shadow-xl"
              >
                Explore Studios
                <ArrowUpRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <Link
                href="/add-studio"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-800 transition-all hover:border-[#9b2ae5] hover:text-[#9b2ae5] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-[#9b2ae5]"
              >
                List Your Studio
              </Link>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[540px]"
          >
            <div className="relative rounded-[30px] border border-[#9b2ae5]/15 bg-white p-4 shadow-2xl shadow-[#9b2ae5]/10 dark:border-white/10 dark:bg-[#15111c] md:p-6">

              {/* Main Visual Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#361052] via-[#64239a] to-[#9b2ae5] p-7 text-white md:p-9"
              >
                <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[35px] border-white/10" />
                <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full border-[35px] border-white/10" />

                <div className="relative">
                  <div className="mb-12 flex items-center justify-between">
                    <div className="rounded-xl bg-white/15 p-3 backdrop-blur-sm">
                      <Building2 size={27} />
                    </div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide">
                      FIND YOUR SPACE
                    </span>
                  </div>

                  <p className="text-sm font-medium text-purple-200">
                    A PLACE FOR EVERY IDEA
                  </p>

                  <h3 className="mt-3 max-w-sm text-3xl leading-tight font-bold md:text-4xl">
                    Create More.
                    <br />
                    Dream Bigger.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-purple-100/80">
                    From creative studios to professional workspaces, discover
                    a space where your next big idea can come to life.
                  </p>

                  <div className="mt-9 flex items-center gap-3 border-t border-white/20 pt-6">
                    <div className="rounded-full bg-white/15 p-2.5">
                      <MapPin size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        The Right Space Awaits
                      </p>
                      <p className="mt-1 text-xs text-purple-200">
                        Discover. Choose. Create.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Feature Cards */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -60, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl border border-gray-100 bg-[#faf8fd] p-5 dark:border-white/5 dark:bg-white/[0.04]"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-[#9b2ae5]/10 p-3 text-[#9b2ae5]">
                    <Building2 size={22} />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Diverse Spaces
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Spaces for different creative needs.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 60, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl border border-gray-100 bg-[#faf8fd] p-5 dark:border-white/5 dark:bg-white/[0.04]"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-[#9b2ae5]/10 p-3 text-[#9b2ae5]">
                    <CalendarCheck size={22} />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Simple Booking
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                    A convenient way to reserve your space.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: 40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -right-3 top-24 hidden items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-[#20172a] sm:flex md:-right-8"
            >
              <div className="rounded-xl bg-[#9b2ae5]/10 p-2.5 text-[#9b2ae5]">
                <Sparkles size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Inspire & Create
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Your journey starts here
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Feature Section */}
        <div className="mt-24 border-t border-gray-200 pt-14 dark:border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <p className="text-sm font-semibold tracking-[3px] text-[#9b2ae5]">
              WHY STUDIOSPACE
            </p>
            <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Everything You Need, In One Place
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400 md:text-base">
              We bring studio discovery and booking together to make finding
              your next creative space easier.
            </p>
          </motion.div>

          {/* Animated Feature Cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    x: directions[index].x,
                    y: directions[index].y,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.25 },
                  }}
                  className="group rounded-2xl border border-gray-200/80 bg-white p-7 transition-all duration-300 hover:border-[#9b2ae5]/30 hover:shadow-xl hover:shadow-[#9b2ae5]/5 dark:border-white/10 dark:bg-[#15111c] dark:hover:border-[#9b2ae5]/40"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#9b2ae5]/10 text-[#9b2ae5] transition-all duration-300 group-hover:bg-[#9b2ae5] group-hover:text-white">
                    <Icon size={26} />
                  </div>

                  <span className="text-xs font-bold tracking-widest text-[#9b2ae5]">
                    0{index + 1}
                  </span>

                  <h4 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
