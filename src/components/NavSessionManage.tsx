
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

const NavSessionManage = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Logout failed!");
      return;
    }

    toast.success("Logout successful!");
    router.replace("/");
  };

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  

  return (
    <div className="hidden items-center gap-2 md:flex">
      {user ? (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  className="group flex items-center cursor-pointer gap-2 rounded-full border border-gray-200 bg-white p-1 pr-3 shadow-sm transition-all duration-300 hover:border-[#9b2ae5]/50 hover:shadow-md dark:border-white/10 dark:bg-[#121116] dark:hover:border-[#9b2ae5]/60"
                >
                  <Avatar className="h-9 w-9 border border-[#9b2ae5]/20">
                    {user?.image && <AvatarImage src={user.image} />}
                    <AvatarFallback className="bg-[#9b2ae5]/10 font-semibold text-[#9b2ae5]">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <span className="max-w-28 truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {user?.name}
                  </span>
                </button>
              }
            />

            <DropdownMenuContent
              align="end"
              className="w-60 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#121116]"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="rounded-xl px-3 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.name}
                  <p className="mt-1 truncate text-xs font-normal text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-gray-200 dark:bg-white/10" />

                <DropdownMenuItem
                  className={`mb-1 cursor-pointer rounded-xl px-3 py-2.5 transition-colors ${
                    isActive("/dashboard")
                      ? "bg-[#9b2ae5]/10 font-semibold text-[#9b2ae5] focus:bg-[#9b2ae5]/15 focus:text-[#9b2ae5] dark:bg-[#9b2ae5]/20 dark:text-[#c77aff] dark:focus:bg-[#9b2ae5]/25 dark:focus:text-[#c77aff]"
                      : "text-gray-700 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:focus:bg-white/5 dark:focus:text-white"
                  }`}
                >
                  <Link href="/dashboard" className="flex w-full items-center justify-between">
                    Dashboard
                    {isActive("/dashboard") && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9b2ae5]" />
                    )}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={`mb-1 cursor-pointer rounded-xl px-3 py-2.5 transition-colors ${
                    isActive("/add-studio")
                      ? "bg-[#9b2ae5]/10 font-semibold text-[#9b2ae5] focus:bg-[#9b2ae5]/15 focus:text-[#9b2ae5] dark:bg-[#9b2ae5]/20 dark:text-[#c77aff] dark:focus:bg-[#9b2ae5]/25 dark:focus:text-[#c77aff]"
                      : "text-gray-700 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:focus:bg-white/5 dark:focus:text-white"
                  }`}
                >
                  <Link href="/add-studio" className="flex w-full items-center justify-between">
                    Add New Studio
                    {isActive("/add-studio") && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9b2ae5]" />
                    )}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={`mb-1 cursor-pointer rounded-xl px-3 py-2.5 transition-colors ${
                    isActive("/my-list")
                      ? "bg-[#9b2ae5]/10 font-semibold text-[#9b2ae5] focus:bg-[#9b2ae5]/15 focus:text-[#9b2ae5] dark:bg-[#9b2ae5]/20 dark:text-[#c77aff] dark:focus:bg-[#9b2ae5]/25 dark:focus:text-[#c77aff]"
                      : "text-gray-700 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:focus:bg-white/5 dark:focus:text-white"
                  }`}
                >
                  <Link href="/my-list" className="flex w-full items-center justify-between">
                    My Studio Listings
                    {isActive("/my-list") && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9b2ae5]" />
                    )}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={`cursor-pointer rounded-xl px-3 py-2.5 transition-colors ${
                    isActive("/my-booking")
                      ? "bg-[#9b2ae5]/10 font-semibold text-[#9b2ae5] focus:bg-[#9b2ae5]/15 focus:text-[#9b2ae5] dark:bg-[#9b2ae5]/20 dark:text-[#c77aff] dark:focus:bg-[#9b2ae5]/25 dark:focus:text-[#c77aff]"
                      : "text-gray-700 focus:bg-gray-100 focus:text-gray-900 dark:text-gray-300 dark:focus:bg-white/5 dark:focus:text-white"
                  }`}
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
        </div>
      ) : (
        <>
          <Link
            href="/login"
            className="rounded-xl px-4 py-2 text-sm   font-medium bg-gray-100 text-gray-700 "
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-[#9b2ae5] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#8120c4]"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default NavSessionManage;
