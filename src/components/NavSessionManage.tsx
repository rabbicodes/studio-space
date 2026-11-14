
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@base-ui/react";

interface NavSessionManageProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const NavSessionManage = ({
  mobile = false,
  onNavigate,
}: NavSessionManageProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed!");
        return;
      }

      toast.success("Logout successful!");
      onNavigate?.();
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong during logout!");
    }
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const linkClass = (path: string) =>
    `mb-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
      isActive(path)
        ? "bg-[#9b2ae5]/10 font-semibold text-[#9b2ae5] dark:bg-[#9b2ae5]/20 dark:text-[#c77aff]"
        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
    }`;

  return (
    <div
      className={
        mobile
          ? "flex w-full flex-col gap-2"
          : "flex items-center gap-2"
      }
    >
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className={`group flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pr-3 shadow-sm transition-all duration-300 hover:border-[#9b2ae5]/50 hover:shadow-md dark:border-white/10 dark:bg-[#121116] dark:hover:border-[#9b2ae5]/60 ${
                  mobile ? "w-full justify-start" : "w-auto"
                }`}
              >
                <Avatar className="h-9 w-9 border border-[#9b2ae5]/20">
                  {user.image && <AvatarImage src={user.image} />}

                  <AvatarFallback className="bg-[#9b2ae5]/10 font-semibold text-[#9b2ae5]">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <span className="max-w-40 truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {user.name}
                </span>
              </button>
            }
          />

          <DropdownMenuContent
            align={mobile ? "start" : "end"}
            className={`rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#121116] ${
              mobile ? "w-[calc(100vw-2rem)]" : "w-60"
            }`}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="rounded-xl px-3 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                {user.name}

                <p className="mt-1 truncate text-xs font-normal text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/10" />

              <DropdownMenuItem
                className={linkClass("/dashboard")}
                onSelect={onNavigate}
              >
                <Link href="/dashboard" className="flex w-full items-center justify-between">
                  Dashboard
                  {isActive("/dashboard") && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9b2ae5]" />
                  )}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className={linkClass("/add-studio")}
                onSelect={onNavigate}
              >
                <Link href="/add-studio" className="flex w-full items-center justify-between">
                  Add New Studio
                  {isActive("/add-studio") && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9b2ae5]" />
                  )}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className={linkClass("/my-list")}
                onSelect={onNavigate}
              >
                <Link href="/my-list" className="flex w-full items-center justify-between">
                  My Studio Listings
                  {isActive("/my-list") && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9b2ae5]" />
                  )}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className={linkClass("/my-booking")}
                onSelect={onNavigate}
              >
                <Link href="/my-booking" className="flex w-full items-center justify-between">
                  My Bookings
                  {isActive("/my-booking") && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9b2ae5]" />
                  )}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-white/10" />

            <Button
              onClick={handleLogout}
              className="ml-1 flex w-[calc(100%-8px)] cursor-pointer items-center justify-center rounded-xl bg-[#9b2ae5] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#8120c4] hover:shadow-md hover:shadow-[#9b2ae5]/20"
            >
              Log Out
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className={mobile ? "flex w-full flex-col gap-2" : "flex items-center gap-2"}>
          <Link
            href="/login"
            onClick={onNavigate}
            className="flex h-10 items-center justify-center rounded-xl bg-gray-100 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/15"
          >
            Login
          </Link>

          <Link
            href="/register"
            onClick={onNavigate}
            className="flex h-10 items-center justify-center rounded-xl bg-[#9b2ae5] px-4 text-sm font-bold text-white transition hover:bg-[#8120c4]"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavSessionManage;
