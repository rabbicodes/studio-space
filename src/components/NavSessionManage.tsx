"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useRouter } from "next/navigation";
import { toast } from "sonner";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@base-ui/react";

const NavSessionManage = () => {
    const router = useRouter();

const handleLogout = async () => {
  const { error } = await authClient.signOut();

  if (error) {
    toast.error(error.message || "Logout failed!");
    return;
  }

  toast.success("Logout successful!");
  router.replace("/");
};
  const { data: session, isPending } = authClient.useSession();
  

  const user = session?.user;

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hidden items-center gap-2 md:flex">
      {user ? (
        <div>
        

 <DropdownMenu >
      <DropdownMenuTrigger render={ <button type="button" className="flex items-center gap-2">
      <Avatar>
  <AvatarImage src={user?.image as string} />
  <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}.</AvatarFallback>
</Avatar>
    </button> } />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
          <DropdownMenuItem><Link href='/add-studio'>Add New Studio</Link></DropdownMenuItem>
          <DropdownMenuItem>My Studio Listings</DropdownMenuItem>
          <DropdownMenuItem><Link href='/my-booking'>My Bookings</Link></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Button onClick={handleLogout} className='bg-[rgb(155,42,229)] cursor-pointer px-4 py-2 text-white rounded-[10px] ml-3'>Log Out</Button>
        
        
      </DropdownMenuContent>
    </DropdownMenu>
        </div>
      ) : (
        <>
          <Link href="/login" className="px-4 py-2">
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-[10px] bg-[rgb(155,42,229)] px-4 py-2 font-bold text-white"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default NavSessionManage;