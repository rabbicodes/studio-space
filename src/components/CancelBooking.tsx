"use client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { IBooking } from "@/type/MyBooking";
import { useRouter } from "next/navigation";

const CancelBooking = ({ mybooking }: { mybooking: IBooking }) => {
  const router = useRouter();
  const handleStatusChange = async (status: string) => {
    const token = await getTokenFromClient()
    try {
      const res = await fetch(
        `http://localhost:8000/mybooking/${mybooking._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization:`Bearer ${token}`
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    router.refresh();
  };
  return (
    <div className="flex flex-wrap items-center gap-3">
 

  <button
    onClick={() => handleStatusChange("Pending")}
    className="rounded-lg border border-purple-600 bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:border-purple-700 hover:bg-purple-700 active:scale-95 cursor-pointer dark:border-purple-500 dark:bg-purple-600 dark:hover:bg-purple-500"
  >
    Receipt
  </button>
   <button
    onClick={() => handleStatusChange("Cancelled")}
    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 active:scale-95 cursor-pointer"
  >
    Cancel Booking
  </button>
</div>
  );
};

export default CancelBooking;
