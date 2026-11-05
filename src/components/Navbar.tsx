
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import logo from "@/assets/logo.png";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import NavSessionManage from "./NavSessionManage";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
];

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const transparentNavbar = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);




  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        transparentNavbar
          ? "border-b border-transparent bg-transparent text-white"
          : "border-b border-gray-200 bg-gray-200 text-gray-900 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#151518]/95 dark:text-white",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1"
        >
          <Image
            src={logo}
            alt="Studio Space"
            priority
            className="h-13 w-auto object-contain"
          />

          <span
            className={cn(
              "text-[22px] font-bold leading-none tracking-tight md:text-[32px]",
              transparentNavbar
                ? "text-white"
                : "text-gray-900 dark:text-white",
            )}
          >
            Studio{" "}
            <span className="text-[#9b2ae5]">
              Space
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  transparentNavbar
                    ? active
                      ? "bg-white/15 text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                    : active
                      ? "bg-purple-100 text-[#9b2ae5] dark:bg-purple-500/10 dark:text-[#c77aff]"
                      : "text-gray-700 hover:bg-white dark:text-gray-300 dark:hover:bg-white/10",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5">
          <ThemeToggle />

          <NavSessionManage />

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              transparentNavbar
                ? "text-white hover:bg-white/10 hover:text-white"
                : "text-gray-900 hover:bg-white dark:text-white dark:hover:bg-white/10",
              "md:hidden",
            )}
          >
            {menuOpen ? (
              <X aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className={cn(
            "border-t backdrop-blur-xl md:hidden",
            transparentNavbar
              ? "border-white/10 bg-black/95 text-white"
              : "border-gray-200 bg-gray-100 text-gray-900 dark:border-white/10 dark:bg-[#151518] dark:text-white",
          )}
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-medium transition-colors",
                    transparentNavbar
                      ? active
                        ? "bg-white/15 text-white"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                      : active
                        ? "bg-purple-100 text-[#9b2ae5] dark:bg-purple-500/10 dark:text-[#c77aff]"
                        : "text-gray-700 hover:bg-white dark:text-gray-300 dark:hover:bg-white/10",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div
              className={cn(
                "mt-3 flex flex-col gap-2 border-t pt-3",
                transparentNavbar
                  ? "border-white/10"
                  : "border-gray-200 dark:border-white/10",
              )}
            >
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className={buttonVariants({
                  variant: "default",
                })}
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
