
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import {
  Plus,
  MapPin,
  
  Building2,
  Users,
  Wallet,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { IBooking } from "@/type/MyBooking";
import UpdateModalForMyLIstPage from "@/components/UpdateModalForMyLIstPage";
import TrashModalForMyListPage from "@/components/TrashModalForMyListPage";
import { notFound } from "next/navigation";
import { getTokenFromServer } from "@/lib/getrTokenFromServer";

const MyStudioListingPage = async () => {
  // Get logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;
  const name = session?.user?.name

  if (!email) {
    throw new Error("User email not found");
  }
const token = await getTokenFromServer();
  // Fetch studio listings
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios/listing/${encodeURIComponent(email)}`,
    {
      cache: "no-store",
      headers:{
        authorization:`Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    notFound()
  }

  const mylists: IBooking[] = await res.json();

  const totalRate = mylists.reduce(
    (total, item) => total + Number(item.hourlyRate || 0),
    0
  );

  const averageRate = mylists.length
    ? (totalRate / mylists.length).toFixed(2)
    : "0.00";

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-500">
              Studio Management
            </p>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              My Studio Listings
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage your studio spaces and keep track s.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            <Plus size={18} />
            Add New Studio
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <Building2 size={24} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total Listings
              </p>

              <h2 className="text-2xl font-bold">
                {mylists.length}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <Wallet size={24} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Average Hourly Rate
              </p>

              <h2 className="text-2xl font-bold">
                ${averageRate}
              </h2>
            </div>
          </div>

        </div>

        {/* Listings Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">

          {/* Table Header */}
          <div className="border-b border-border px-5 py-5 sm:px-6">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold">
                  Your Studio Spaces
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  All listings associated with your account.
                </p>
              </div>

              <span className="w-fit rounded-lg bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-500">
                {mylists.length} Listings
              </span>
            </div>
          </div>

          {mylists.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <Building2
                size={45}
                className="mx-auto mb-4 text-muted-foreground"
              />

              <h3 className="text-xl font-bold">
                No Studio Listings Found
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                You haven&apos;t added any studio spaces yet.
              </p>

              <Link
                href="/add-studio"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700"
              >
                <Plus size={18} />
                Add Your First Studio
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-140 text-left">

                {/* Columns */}
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-4 font-semibold sm:px-4 lg:px-5">
                      Studio
                    </th>

                    <th className="hidden px-3 py-4 font-semibold sm:px-4 lg:table-cell lg:px-5">
                      Owner Email
                    </th>

                    <th className="hidden px-3 py-4 font-semibold sm:px-4 md:table-cell lg:px-5">
                      Location
                    </th>

                    <th className="px-3 py-4 font-semibold sm:px-4 lg:px-5">
                      Rate
                    </th>

                    <th className="hidden px-3 py-4 font-semibold sm:table-cell sm:px-4 lg:px-5">
                      Capacity
                    </th>

                    <th className="px-3 py-4 font-semibold sm:px-4 lg:px-5">
                      Status
                    </th>

                    <th className="px-3 py-4 text-center font-semibold sm:px-4 lg:px-5">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-border">

                  {mylists.map((mylist) => (
                    <tr
                      key={mylist._id}
                      className="transition-colors hover:bg-muted/30"
                    >

                      {/* Studio */}
                      <td className="px-3 py-4 sm:px-4 lg:px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={mylist.imageUrl}
                              alt={mylist.title}
                              fill
                              unoptimized
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <p className="max-w-35 truncate text-sm font-semibold sm:max-w-45">
                              {mylist.title}
                            </p>

                            <p className="mt-1 text-xs text-purple-500">
                              {mylist.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Owner Email */}
                      <td className="hidden px-3 py-4 sm:px-4 lg:table-cell lg:px-5">
                        <div className="max-w-47.5">
                          <p className="truncate text-sm font-medium">
                             {email}
                          </p>

                          <p className="mt-1 text-xs text-purple-500">
                            <span className="text-black dark:text-white">Host name:</span> {name}
                          </p>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="hidden px-3 py-4 sm:px-4 md:table-cell lg:px-5">
                        <div className="flex max-w-40 items-center gap-2 text-sm text-muted-foreground">
                          <MapPin
                            size={15}
                            className="shrink-0 text-purple-500"
                          />

                          <span className="truncate">
                            {mylist.location}
                          </span>
                        </div>
                      </td>

                      {/* Hourly Rate */}
                      <td className="px-3 py-4 sm:px-4 lg:px-5">
                        <p className="whitespace-nowrap text-sm font-bold text-purple-500">
                          ${mylist.hourlyRate}/hr
                        </p>
                      </td>

                      {/* Capacity */}
                      <td className="hidden px-3 py-4 sm:table-cell sm:px-4 lg:px-5">
                        <div className="flex items-center gap-2 text-sm">
                          <Users
                            size={15}
                            className="text-purple-500"
                          />

                          {mylist.maxCapacity}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-4 sm:px-4 lg:px-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                            mylist.status?.toLowerCase() === "approved"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : mylist.status?.toLowerCase() === "rejected"
                              ? "bg-red-500/10 text-red-600 dark:text-red-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {mylist.status || "Pending"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-4 sm:px-4 lg:px-5">
                        <div className="flex items-center justify-center gap-2">

                          <UpdateModalForMyLIstPage
                            listing={mylist}
                          />

                         <TrashModalForMyListPage mylist={mylist}/>
                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Info */}
        {mylists.length > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            Showing {mylists.length} studio listings associated with{" "}
            <span className="font-medium text-purple-500">
              {`${name} | ${email} `}
            </span>
          </p>
        )}

      </div>
    </main>
  );
};

export default MyStudioListingPage;
