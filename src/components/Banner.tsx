"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { A11y, Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "/images/banner/photography-studio.jpg",
    eyebrow: "Photography studios",
    title: "Shoot in a space that matches your vision.",
    description:
      "Book cyc walls, natural-light studios, and fully equipped photography spaces by the hour — with transparent pricing and real-time availability.",
  },
  {
    image: "/images/banner/music-studio.jpg",
    eyebrow: "Music & recording",
    title: "Find your frequency.",
    description:
      "From treated podcast lounges to full recording suites, reserve a room that makes your next session sound exactly right.",
  },
  {
    image: "/images/banner/podcast-studio.jpg",
    eyebrow: "Podcast & content",
    title: "Press record. Make it matter.",
    description:
      "Quiet, camera-ready spaces for podcasts, voiceover, and content days — inspected, verified, and ready when inspiration hits.",
  },
] as const;

const highlights = [
  "Verified spaces",
  "Transparent pricing",
  "Real-time booking",
] as const;

// Mirrors the navbar Register button (purple `rgb(155,42,229)`, bold, rounded-[10px]),
// scaled up for the hero.
const primaryButton =
  "h-12 rounded-[10px] bg-[rgb(155,42,229)] px-7 text-sm font-bold text-white hover:bg-[rgb(138,30,208)] focus-visible:ring-[rgb(155,42,229)]/40";

export function Banner() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      aria-label="Featured creative spaces"
      className="relative isolate overflow-hidden bg-neutral-950 text-white"
    >
      <h1 className="sr-only">
        StudioSpace — book creative studio spaces by the hour
      </h1>

      <Swiper
        modules={[Autoplay, EffectFade, A11y, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-[620px] w-full sm:h-[680px] lg:h-[720px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.image} className="relative h-full w-full">
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl pb-28 pt-16 sm:pt-20">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.18em] text-white/85 uppercase backdrop-blur">
                  {slide.eyebrow}
                </span>

                <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h2>

                <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
                  {slide.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/studios"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      primaryButton,
                    )}
                  >
                    Explore Studios
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>

                <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/70 sm:text-sm">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-1.5">
                      <Check
                        aria-hidden="true"
                        className="size-3.5 text-[rgb(155,42,229)]"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pb-6 sm:px-6 lg:px-8">
          <div className="pointer-events-auto flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Go to slide ${index + 1}: ${slide.eyebrow}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "w-10 bg-[rgb(155,42,229)]"
                    : "w-5 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "rounded-full border border-[rgb(155,42,229)]/70 text-white hover:bg-[rgb(155,42,229)] hover:text-white",
              )}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "rounded-full border border-[rgb(155,42,229)]/70 text-white hover:bg-[rgb(155,42,229)] hover:text-white",
              )}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
