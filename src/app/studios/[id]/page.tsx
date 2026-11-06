
import { IStudio } from "@/type/StudioType";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  DollarSign,
  ShieldCheck,
  Tag,
  Star,
  CheckCircle,
  CalendarCheck,
  ArrowLeft,
} from "lucide-react";
import BookingModals from "@/components/BookingModals";

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
  const studio: IStudio = data.result ?? data;

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
    <main className="min-h-screen bg-white py-10 text-gray-900 dark:bg-[#09090b] dark:text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/studios"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#9b2ae5] dark:text-gray-400"
        >
          <ArrowLeft size={17} />
          Back to Studios
        </Link>

        {/* Studio Image */}
        <div className="relative h-[280px] overflow-hidden rounded-2xl border border-gray-200 sm:h-[450px] dark:border-white/10">
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Studio Header */}
        <section className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#9b2ae5]/10 px-4 py-1.5 text-sm font-medium text-[#9b2ae5] dark:text-[#c77aff]">
              {studio.category}
            </span>

            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span>{studio.rating ?? "Not rated yet"}</span>
            </div>
          </div>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            {studio.title}
          </h1>

          <p className="mt-3 flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <MapPin size={18} />
            {studio.location}
          </p>
        </section>

        {/* Overview */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">
            About This Studio
          </h2>

          <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#151518]">
            <p className="leading-7 text-gray-600 dark:text-gray-400">
              {studio.overview}
            </p>
          </div>
          
        </section>
<section className="mt-12">
          <h2 className="text-2xl font-bold">
            Host Information 
          </h2>

          <div className="mt-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#151518]">
            <p className="leading-7 text-gray-600 dark:text-gray-400">
             Host Name: {studio.username}
            </p>
            <p className="leading-7 text-gray-600 dark:text-gray-400">
             Host Email: {studio.email}
            </p>
          </div>
          
        </section>
        {/* Amenities */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold">
            Studio Amenities
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studio.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#151518]"
              >
                <CheckCircle
                  size={20}
                  className="shrink-0 text-[#9b2ae5] dark:text-[#c77aff]"
                />

                <span className="text-sm font-medium">
                  {amenity}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Workspace Specifications */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">
            Studio Specifications
          </h2>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {/* Specification Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {specifications.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#9b2ae5]/50 dark:border-white/10 dark:bg-[#151518]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#9b2ae5]/10 text-[#9b2ae5] dark:text-[#c77aff]">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.title}
                      </p>

                      <h3 className="mt-1 break-words text-base font-semibold">
                        {item.value}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Booking Card */}
            <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#151518]">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#9b2ae5]/10 text-[#9b2ae5] dark:text-[#c77aff]">
                    <CalendarCheck size={22} />
                  </div>

                  <h3 className="text-lg font-semibold">
                    Book Workspace
                  </h3>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Hourly Rate
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    ${studio.hourlyRate}
                    <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      / hour
                    </span>
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5 dark:border-white/10">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Security Deposit
                  </span>

                  <span className="font-semibold">
                    ${studio.securityDeposit}
                  </span>
                </div>
              </div>

             <BookingModals studio = {studio}/>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
};

export default StudioDetailsPage;
