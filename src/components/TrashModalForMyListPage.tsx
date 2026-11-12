
"use client";

import { Trash2 } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IBooking } from "@/type/MyBooking";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const TrashModalForMyListPage = ({ mylist }: { mylist: IBooking }) => {
  const router = useRouter();

  const handleDeleteContinue = async () => {
    const token = await getTokenFromClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${mylist._id}`,
        {
          method: "DELETE",
          headers:{
            authorization:`Bearer ${token}`
          }
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to delete studio");
        return;
      }

      toast.success("Studio deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <button
              type="button"
              title="Delete Studio"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
            >
              <Trash2 size={16} />
            </button>
          }
        />

        <AlertDialogContent className="border border-purple-100 bg-white text-gray-900 shadow-2xl shadow-purple-500/10 dark:border-zinc-800 dark:bg-[#151518] dark:text-white sm:max-w-106.25">
          <AlertDialogHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
              <Trash2 size={22} />
            </div>

            <AlertDialogTitle className="text-xl font-bold tracking-tight">
              Delete Studio?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm leading-6 text-gray-500 dark:text-zinc-400">
              Are you absolutely sure? This action cannot be undone. This
              studio will be permanently deleted from your listings.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-3 gap-2 sm:gap-2">
            <AlertDialogCancel className="border-gray-200 bg-white text-gray-700 hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeleteContinue}
              className="border-0 bg-[#9b2ae5] text-white hover:bg-[#8120c4] focus-visible:ring-[#9b2ae5]"
            >
              Delete Studio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TrashModalForMyListPage;
