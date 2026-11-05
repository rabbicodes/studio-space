"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import logo from "@/assets/logo.png";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
       
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src={logo}
            alt=""
            priority
            className="h-7 w-auto md:h-9"
          />
          <span className="text-[22px] font-bold leading-none tracking-tight md:text-[32px]">
            Studio <span className="text-[rgb(155,42,229)]">Space</span>
          </span>
        </Link>
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
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className='px-4 py-2 '
          >
            Login
          </Link>
         <Link href='/register'
         className="px-4 py-2 bg-[rgb(155,42,229)] text-white font-bold rounded-[10px]">Register
         </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "md:hidden",
          )}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border/60 bg-background md:hidden"
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
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className={buttonVariants({ variant: "default" })}
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
