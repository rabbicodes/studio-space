import logo from '@/assets/logo.png'
import logo2 from '@/assets/logo2.png'
import Link from "next/link";
import {
  
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/#about-us" },
    { name: "Add Your Studio", href: "/add-studio" },
  ];

  const categories = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Workshop",
  ];

  return (
    <footer className="border-t mx-auto max-w-7xl border-gray-200 bg-gray-50 text-gray-700 dark:border-white/10 dark:bg-[#111015] dark:text-gray-300">
      <div className=" px-5 py-14 md:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand & Mission */}
          <div>
        <Link href="/" className="flex shrink-0 items-center gap-2">

          {/* Light Mode - Normal Navbar */}
          <Image
            src={logo2}
            alt="Studio Space"
            priority
            className=
              "h-13 w-auto object-contain dark:hidden"
        
          />

          {/* Dark Mode OR Transparent Navbar */}
          <Image
            src={logo}
            alt="Studio Space"
            priority
            className=
              "h-13 w-auto object-contain hidden dark:block"
            
          />

          <span
            className=
              "text-[22px] font-bold leading-none tracking-tight md:text-[32px] text-gray-900 dark:text-white"
    
          >
            Studio
            <span className="text-[#9b2ae5]">
              Space
            </span>
          </span>
        </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-600 dark:text-gray-400">
              Your creative vision deserves the perfect space. Discover,
              book, and share inspiring studios for photography, filmmaking,
              podcasting, music, and more.
            </p>

            <div className="mt-5 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin size={17} className="mt-0.5 shrink-0 text-[#9b2ae5]" />
              <span>Bangladesh</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-[#9b2ae5] dark:text-gray-400 dark:hover:text-[#c77aff]"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Popular Categories
            </h3>

            <ul className="mt-5 space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category)}`}
                    className="text-sm text-gray-600 transition-colors hover:text-[#9b2ae5] dark:text-gray-400 dark:hover:text-[#c77aff]"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Stay Connected
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for the latest studio updates,
              creative ideas, and special offers.
            </p>

            <form className="mt-5 flex items-center gap-2">
              <div className="relative min-w-0 flex-1">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#9b2ae5] focus:ring-2 focus:ring-[#9b2ae5]/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <button
                type="button"
                className="flex h-11 shrink-0 items-center justify-center rounded-xl bg-[#9b2ae5] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#8120c4]"
              >
                Subscribe
              </button>
            </form>

            {/* Social Links */}
            <h4 className="mt-7 text-sm font-semibold text-gray-900 dark:text-white">
              Follow Us
            </h4>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:border-[#9b2ae5] hover:bg-[#9b2ae5] hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
              >
                <FaFacebookF size={17} />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:border-[#9b2ae5] hover:bg-[#9b2ae5] hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
              >
                <FaInstagram size={19} />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex size-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:border-[#9b2ae5] hover:bg-[#9b2ae5] hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
              >
                <FaYoutube size={20} />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex size-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:border-[#9b2ae5] hover:bg-[#9b2ae5] hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
              >
                <FaXTwitter size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-7 text-center dark:border-white/10 sm:flex-row sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/terms"
              className="text-gray-500 transition-colors hover:text-[#9b2ae5] dark:text-gray-400 dark:hover:text-[#c77aff]"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/privacy"
              className="text-gray-500 transition-colors hover:text-[#9b2ae5] dark:text-gray-400 dark:hover:text-[#c77aff]"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400 dark:text-gray-500">
          Made for creators with creativity.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
