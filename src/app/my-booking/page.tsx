
import { IBooking } from "@/type/MyBooking";
import Image from "next/image";
import {
  MapPin,
  CalendarDays,
  Clock,
  DollarSign,
} from "lucide-react";
import CancelBooking from "@/components/CancelBooking";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getTokenFromServer } from "@/lib/getrTokenFromServer";



  
const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

const email = session?.user?.email as string 
const name = session?.user?.name as string
console.log(name);

const token = await getTokenFromServer()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mybooking/${encodeURIComponent(email)}`, {
    cache: "no-store",
    headers:{
      authorization:`Bearer ${token}`
    }
  });

  if (!res.ok) {
    notFound()
  }

  const myBookings: IBooking[] = await res.json();

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 py-12">
      {/* Page Heading */}
      <div className="mb-10">
        <p className="mb-2 text-[32px] font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
          Your Reservations
        </p>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          My Bookings
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          Keep track of your studio reservations, check booking details,
          and manage your upcoming creative sessions.
        </p>
       
      </div>

      {/* Empty State */}
      {myBookings.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center shadow-sm dark:border-white/10 dark:bg-[#15121c]">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            No Bookings Found
          </h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            You haven&apos;t reserved any studio yet.
            Explore our studios and book your next creative space.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {myBookings.map((mybooking) => {
            // Normalize booking status
            const statusLabel =
              mybooking.status?.trim() || "Unknown";

            const status = statusLabel.toLowerCase();

            // Status badge colors
            const statusStyle =
              status === "pending"
                ? "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                : status === "confirmed"
                ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                : status === "completed"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                : status === "cancelled"
                ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                : "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300";

            return (
              <div
                key={mybooking._id}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg dark:border-white/10 dark:bg-[#15121c] dark:shadow-[0_4px_25px_rgba(0,0,0,0.25)] dark:hover:border-purple-500/40 dark:hover:shadow-[0_8px_30px_rgba(124,58,237,0.12)] sm:flex-row"
              >
                {/* Studio Image */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl sm:h-52 sm:w-72">
                  <Image
                    src={mybooking.imageUrl}
                    alt={mybooking.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Booking Information */}
                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div>
                    {/* Category and Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-gray-400 ">
                        {mybooking.category}
                      </span>

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-semibold ${statusStyle}`}
                      >
                        {statusLabel}
                      </span>
                    </div>

                    {/* Studio Title */}
                    <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                      {mybooking.title}
                    </h2>

                    {/* Location */}
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin size={16} className="text-purple-600 dark:text-purple-400" />
                      {mybooking.location}
                    </p>

                    {/* Overview */}
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {mybooking.overview}
                    </p>
                  </div>

                  {/* Booking Details */}
                  <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <p className="flex items-center gap-1.5">
                      <CalendarDays
                        size={17}
                        className="text-purple-600 dark:text-purple-400"
                      />
                      {mybooking.data.date}
                    </p>

                    <p className="flex items-center gap-1.5">
                      <Clock
                        size={17}
                        className="text-purple-600 dark:text-purple-400"
                      />
                      {mybooking.data.startTime} -{" "}
                      {mybooking.data.endTime}
                    </p>

                    <p className="flex items-center gap-1.5">
                      <DollarSign
                        size={17}
                        className="text-purple-600 dark:text-purple-400"
                      />
                      {mybooking.hourlyRate}/hr
                    </p>

                    <p>
                      Security Deposit: ${mybooking.securityDeposit}
                    </p>
                  </div>

                  {/* Amenities and Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3 dark:border-white/10">
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5">
                      {mybooking.amenities
                        .slice(0, 3)
                        .map((amenity, index) => (
                          <span
                            key={index}
                            className="rounded-md bg-gray-100 px-3 py-1.5 text-xs text-gray-600 dark:bg-white/5 dark:text-gray-300 dark:ring-1 dark:ring-white/10"
                          >
                            {amenity}
                          </span>
                        ))}

                      {mybooking.amenities.length > 3 && (
                        <span className="rounded-md bg-gray-100 px-3 py-1.5 text-xs text-gray-600 dark:bg-white/5 dark:text-gray-300 dark:ring-1 dark:ring-white/10">
                          +{mybooking.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Cancel and Receipt Buttons */}
                    <CancelBooking mybooking={mybooking} />

                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;
