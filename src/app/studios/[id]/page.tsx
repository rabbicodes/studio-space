
import { IStudio } from "@/type/StudioType";
import Image from "next/image";
import {
  MapPin,
  Users,
  DollarSign,
  ShieldCheck,
  Tag,
  Star,
  CheckCircle,
  Clock,
} from "lucide-react";

interface StudioDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const StudioDetailsPage = async ({
  params,
}: StudioDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/studios/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch studio details");
  }

  const data = await res.json();
  const studio: IStudio = data.result || data;

  if (!studio) {
    throw new Error("Studio not found");
  }

  const specifications = [
    {
      title: "Category",
      value: studio.category,
      icon: Tag,
    },
    {
      title: "Hourly Rate",
      value: `$${studio.hourlyRate} / hour`,
      icon: DollarSign,
    },
    {
      title: "Security Deposit",
      value: `$${studio.securityDeposit}`,
      icon: ShieldCheck,
    },
    {
      title: "Maximum Capacity",
      value: `${studio.maxCapacity} People`,
      icon: Users,
    },
    {
      title: "Location",
      value: studio.location,
      icon: MapPin,
    },
    {
      title: "Rating",
      value: studio.rating ?? "Not rated yet",
      icon: Star,
    },
  ];

  return (
    <section className="min-h-screen bg-[#09090b] px-4 py-12 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Studio Heading */}
        <div className="mb-8">
          <span className="rounded-full border border-[#9b2ae5]/30 bg-[#9b2ae5]/10 px-4 py-2 text-sm text-[#c77aff]">
            {studio.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
            {studio.title}
          </h1>

          <p className="mt-3 flex items-center gap-2 text-gray-400">
            <MapPin size={18} className="text-[#9b2ae5]" />
            {studio.location}
          </p>
        </div>

        {/* Studio Image */}
        <div className="relative h-[280px] overflow-hidden rounded-2xl border border-white/10 sm:h-[450px]">
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="absolute bottom-5 left-5">
            <p className="text-sm text-gray-200">
              Explore Workspace
            </p>
            <h2 className="mt-1 text-2xl font-bold">
              {studio.title}
            </h2>
          </div>
        </div>

        {/* Workspace Specifications */}
        <div className="mt-12">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[3px] text-[#9b2ae5]">
              Workspace Details
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Full Specifications
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specifications.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/10 bg-[#151518] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#9b2ae5]/60"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#9b2ae5]/10 text-[#c77aff] transition group-hover:bg-[#9b2ae5]/20">
                    <Icon size={24} />
                  </div>

                  <p className="text-sm text-gray-400">
                    {item.title}
                  </p>

                  <h3 className="mt-2 break-words text-xl font-semibold text-white">
                    {item.value}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overview */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-[#151518] p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold">
            About This Workspace
          </h2>

          <p className="leading-8 text-gray-400">
            {studio.overview}
          </p>
        </div>

        {/* Amenities */}
        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-[#9b2ae5]">
            What's Included
          </p>

          <h2 className="mb-6 mt-2 text-2xl font-bold">
            Available Amenities
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studio.amenities?.map((amenity, index) => (
              <div
                key={`${amenity}-${index}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#151518] p-5 transition hover:border-[#9b2ae5]/50"
              >
                <CheckCircle
                  size={20}
                  className="shrink-0 text-[#c77aff]"
                />

                <span className="text-gray-300">
                  {amenity}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default StudioDetailsPage;
