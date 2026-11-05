
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

  // API response যদি সরাসরি array হয়
  const studios: IStudio[] = Array.isArray(data) ? data : data.result;

  return (
    <section className="min-h-screen bg-[#09090b] px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#9b2ae5]">
            Find Your Creative Space
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Explore <span className="text-[#9b2ae5]">Studios</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400">
            Discover the perfect creative space for your next project.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <div
              key={studio._id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151518] transition-all duration-300 hover:-translate-y-1 hover:border-[#9b2ae5]/60 hover:shadow-[0_10px_40px_rgba(155,42,229,0.12)]"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={studio.imageUrl}
                  alt={studio.title}
                  width={500}
                  height={350}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full border border-[#9b2ae5]/30 bg-black/70 px-3 py-1.5 text-xs font-medium text-[#c77aff] backdrop-blur-md">
                  {studio.category}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-white transition-colors group-hover:text-[#c77aff]">
                  {studio.title}
                </h2>

                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin size={16} className="text-[#9b2ae5]" />
                    {studio.location}
                  </p>

                  <p className="flex items-center gap-1 text-sm font-medium text-yellow-400">
                    <Star size={15} fill="currentColor" />
                    {studio.rating ?? "New"}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Hourly Rate</p>
                    <p className="mt-1 text-xl font-bold text-[#c77aff]">
                      ${studio.hourlyRate}
                      <span className="text-xs font-normal text-gray-400">
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

        {studios.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            No Studios Found
          </div>
        )}
      </div>
    </section>
  );
};

export default StudiosPage;
