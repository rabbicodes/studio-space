
import { IStudio } from "@/type/StudioType";
import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { getTokenFromServer } from "@/lib/getrTokenFromServer";
import Image from "next/image";

const FeaturedStudioPage = async () => {
  const token = await getTokenFromServer()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featuredStudio`, {
    cache: "no-store",
    headers:{
      authorization:`Bearer ${token}`
    }
  });

  if (!res.ok) {
    notFound()
  }

  const featuredes: IStudio[] = await res.json();

  return (
    <section className="bg-white py-16 dark:bg-[#09090b] sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-purple-600 dark:text-purple-400 sm:text-sm sm:tracking-[3px]">
              Explore Our Collection
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
              Featured <span className="text-purple-600">Studios</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Discover premium creative spaces designed to bring your ideas
              to life.
            </p>
          </div>

          <Link
            href="/studios"
            className="group inline-flex w-fit items-center gap-2 font-semibold text-purple-600 transition hover:text-purple-700 dark:text-purple-400"
          >
            Explore All Studios
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        {/* Featured Studio Cards */}
        {featuredes.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featuredes.map((feature) => (
              <div
                key={feature._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 dark:border-white/10 dark:bg-[#15151b]"
              >
                {/* Studio Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={feature.imageUrl}
                    alt={feature.title}
                    width={200}
                    height={200}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />

                  {/* Category Badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-purple-700 shadow-sm">
                    {feature.category}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-sm">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    {feature.rating ?? "New"}
                  </div>
                </div>

                {/* Studio Information */}
                <div className="p-5">
                  <h3 className="line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                    {feature.title}
                  </h3>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="shrink-0 text-purple-500" />
                    <span className="line-clamp-1">{feature.location}</span>
                  </div>

                  {/* Divider */}
                  <div className="my-5 border-t border-gray-100 dark:border-white/10" />

                  {/* Price and Details Button */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Starting from
                      </p>

                      <p className="mt-1 text-xl font-bold text-purple-600 dark:text-purple-400">
                        ${feature.hourlyRate}
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {" "}/ hr
                        </span>
                      </p>
                    </div>

                    <Link
                      href={`/studios/${feature._id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25"
                    >
                      View Details
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-white/10">
            <p className="text-gray-500 dark:text-gray-400">
              No featured studios available right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedStudioPage;
