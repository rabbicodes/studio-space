
import { IStudio } from "@/type/StudioType";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, Star } from "lucide-react";

const StudiosPage = async () => {
  const res = await fetch("http://localhost:8000/studios");

  if (!res.ok) {
    throw new Error("Data failed to fetch");
  }

  const data = await res.json();

  const studios: IStudio[] = Array.isArray(data)
    ? data
    : data.result;

  return (
    <section className="relative isolate -mt-16 min-h-screen overflow-hidden bg-[#faf9fc] px-4 py-16 text-[#18151d] dark:bg-[#09090b] dark:text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 mt-15 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Explore{" "}
            <span className="text-[#9b2ae5]">Studios</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
            Discover the perfect creative space for your next project.
          </p>
        </div>

        {/* Studio Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <div
              key={studio._id}
              className="group overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9b2ae5]/50 hover:shadow-[0_10px_40px_rgba(155,42,229,0.12)] dark:border-white/10 dark:bg-[#151518]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={studio.imageUrl}
                  alt={studio.title}
                  width={500}
                  height={350}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full border border-purple-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#8120c4] backdrop-blur-md dark:border-[#9b2ae5]/30 dark:bg-black/70 dark:text-[#c77aff]">
                  {studio.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="space-y-4 p-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-[#18151d] transition-colors group-hover:text-[#9b2ae5] dark:text-white dark:group-hover:text-[#c77aff]">
                  {studio.title}
                </h2>

                <div className="flex items-center justify-between gap-2">
                  <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin
                      size={16}
                      className="shrink-0 text-[#9b2ae5]"
                    />
                    {studio.location}
                  </p>

                  <p className="flex shrink-0 items-center gap-1 text-sm font-medium text-yellow-500">
                    <Star size={15} fill="currentColor" />
                    {studio.rating ?? "New"}
                  </p>
                </div>

                {/* Price and Details */}
                <div className="flex items-center justify-between border-t border-purple-100 pt-4 dark:border-white/10">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Hourly Rate
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#9b2ae5] dark:text-[#c77aff]">
                      ${studio.hourlyRate}
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        /hour
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="flex items-center gap-2 rounded-lg bg-[#9b2ae5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8120c4]"
                  >
                    View Details
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {studios.length === 0 && (
          <div className="rounded-2xl border border-purple-100 bg-white py-20 text-center text-gray-500 dark:border-white/10 dark:bg-[#151518] dark:text-gray-400">
            <p className="text-lg font-semibold">No Studios Found</p>
            <p className="mt-2 text-sm">
              No studios are available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudiosPage;
