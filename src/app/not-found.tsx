
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#faf9fc] px-4 py-12 dark:bg-[#09090b] sm:px-5 sm:py-16">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="relative w-full max-w-xl rounded-3xl border border-purple-200/70 bg-white/80 p-6 text-center shadow-xl shadow-purple-500/5 backdrop-blur-xl sm:p-12 dark:border-purple-500/20 dark:bg-[#151518]/90">

        {/* Icon */}
        <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-[#9b2ae5] dark:bg-purple-500/15">
          <Compass size={32} strokeWidth={1.7} />
        </div>

        {/* 404 */}
        <h1 className="bg-linear-to-r from-[#9b2ae5] to-[#6d1db0] bg-clip-text text-8xl font-extrabold tracking-tighter text-transparent sm:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-500 dark:text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back to creating something amazing.
        </p>

        {/* Button */}
        <div className="mt-9 flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#9b2ae5] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#8120c4] hover:shadow-purple-500/30"
          >
            <ArrowLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
            <ArrowUpRight size={16} className="ml-1 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-purple-100 pt-6 dark:border-purple-500/15">
          <p className="text-[10px] font-medium tracking-normal text-gray-400 sm:text-xs sm:tracking-wide dark:text-gray-500">
            STUDIO<span className="text-[#9b2ae5]">SPACE</span>
            <span className="mx-2">·</span>
            CREATE WITHOUT LIMITS
          </p>
        </div>

      </div>
    </div>
  );
}
