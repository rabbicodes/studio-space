import { getTokenFromServer } from '@/lib/getrTokenFromServer';
import { IStudio } from '@/type/StudioType';
import {
  ArrowUpRight,
  MapPin,
  Star,
  
  
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';



const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  const token = await getTokenFromServer()
  const res = await fetch(`http://localhost:8000/studios/category/${category}`,{
    headers:{
      authorization:`Bearer ${token}`
    }
  });
  if (!res.ok) {
    notFound()
  }
  const CategoriesData: IStudio[] = await res.json();

  const categoryName = decodeURIComponent(category);
  

  return (
    <section className="relative isolate -mt-16 min-h-screen overflow-hidden bg-[#faf9fc] px-4 py-16 text-[#18151d] dark:bg-[#09090b] dark:text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12 mt-15 text-center">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="transition-colors hover:text-[#9b2ae5] dark:hover:text-[#c77aff]">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/studios" className="transition-colors hover:text-[#9b2ae5] dark:hover:text-[#c77aff]">
              Studios
            </Link>
            <ChevronRight size={14} />
            <span className="font-semibold text-[#9b2ae5] dark:text-[#c77aff]">
              {categoryName}
            </span>
          </nav>



          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Explore{" "}
            <span className="bg-linear-to-r from-[#9b2ae5] to-[#c77aff] bg-clip-text text-transparent">
              {categoryName}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400">
            Discover the perfect creative space for your next project.
          </p>

          {/* Count + Back */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-semibold text-[#8120c4] dark:border-[#9b2ae5]/30 dark:bg-[#9b2ae5]/10 dark:text-[#c77aff]">
              {CategoriesData.length} {CategoriesData.length === 1 ? "studio" : "studios"} available
            </span>

            <Link
              href="/studios"
              className="flex items-center gap-1.5 rounded-full border border-purple-200 px-4 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:border-[#9b2ae5] hover:text-[#9b2ae5] dark:border-white/10 dark:text-gray-400 dark:hover:border-[#c77aff] dark:hover:text-[#c77aff]"
            >
              <ArrowLeft size={14} />
              All categories
            </Link>
          </div>
        </div>

        {/* Studio Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CategoriesData.map((studio) => (
            <div
              key={studio._id}
              className="group relative overflow-hidden rounded-3xl border border-purple-200/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#9b2ae5]/60 hover:shadow-2xl hover:shadow-[#9b2ae5]/20 dark:border-[#9b2ae5]/20 dark:bg-[#151518] dark:shadow-none dark:hover:border-[#9b2ae5]/60 dark:hover:shadow-[#9b2ae5]/20"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={studio.imageUrl}
                  alt={studio.title}
                  width={500}
                  height={350}
                  unoptimized
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Image overlay */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                <span className="absolute left-4 top-4 rounded-full border border-purple-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#8120c4] backdrop-blur-md dark:border-[#9b2ae5]/30 dark:bg-black/60 dark:text-[#c77aff]">
                  {studio.category}
                </span>

                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-[#18151d] backdrop-blur-md dark:bg-black/60 dark:text-white">
                  <Star size={13} className="text-yellow-500" fill="currentColor" />
                  {studio.rating ?? "New"}
                </span>
              </div>

              {/* Card Content */}
              <div className="relative space-y-4 p-6">
                {/* Soft glow */}
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-purple-200/50 blur-3xl transition-all duration-500 group-hover:scale-125 dark:bg-[#9b2ae5]/15" />

                <h2 className="relative line-clamp-1 text-xl font-bold tracking-tight text-[#18151d] transition-colors duration-300 group-hover:text-[#9b2ae5] dark:text-white dark:group-hover:text-[#c77aff]">
                  {studio.title}
                </h2>

                <p className="relative flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={16} className="shrink-0 text-[#9b2ae5] dark:text-[#c77aff]" />
                  <span className="line-clamp-1">{studio.location}</span>
                </p>

                {/* Price and Details */}
                <div className="relative flex items-center justify-between border-t border-purple-100 pt-5 dark:border-[#9b2ae5]/15">
                  <div>
                    <p className="text-xs text-gray-500">Hourly Rate</p>

                    <p className="mt-1 text-2xl font-bold text-[#9b2ae5] dark:text-[#c77aff]">
                      ${studio.hourlyRate}
                      <span className="ml-0.5 text-xs font-normal text-gray-500 dark:text-gray-400">
                        /hour
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="group/btn flex items-center gap-2 rounded-xl bg-linear-to-br from-[#9b2ae5] to-[#6d1db0] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#9b2ae5]/25 outline-none transition-all duration-300 hover:shadow-[#9b2ae5]/45 focus-visible:ring-2 focus-visible:ring-[#9b2ae5] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
                  >
                    View Details
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {CategoriesData.length === 0 && (
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

export default CategoryPage;