'use client'
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
} from "@/components/ui/alert-dialog"
import { IBooking } from "@/type/MyBooking";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const TrashModalForMyListPage = ({mylist}:{mylist:IBooking}) => {
    const router = useRouter()
     const handleDeleteContinue=async()=>{
        const res = await fetch(`http://localhost:8000/studios/${mylist._id}`,{
            method:'DELETE'
        })
        const result = res.json();
        console.log(result);
        router.refresh()
        toast.success('Delete succesfull')
    }
  return (
   
    <div>
    
      <AlertDialog>
  <AlertDialogTrigger render={  <button
        type="button"
        title="Delete Studio"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition hover:bg-red-500 hover:text-white"
      >
        <Trash2 size={16} />
      </button>}>
    Show Dialog
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeleteContinue}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
  );
};

export default TrashModalForMyListPage;
