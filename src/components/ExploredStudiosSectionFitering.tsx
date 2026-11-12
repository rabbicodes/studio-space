
"use client"


import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowDownWideNarrow } from "lucide-react";



import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, Star, } from "lucide-react";
import { IStudio } from "@/type/StudioType";

const ExploredStudiosSectionFitering = ({studios}:{studios:IStudio[]}) => {
  const photos = studios.filter(photos=>photos.category==='Photo Studio')
  const films = studios.filter(films=>films.category==='Film Stage')
  const podcasts = studios.filter(podcasts=>podcasts.category==='Podcast Lounge')
  const musics = studios.filter(musics=>musics.category==='Music Suite')
  const workshops = studios.filter(workshops=>workshops.category==='Workshop')
  const others = studios.filter(others=>others.category==='Other')
  
const [position, setPosition] = React.useState("default")

    return (
        <div>
            

    <section className="relative isolate -mt-16 min-h-screen overflow-hidden bg-[#faf9fc] px-4 py-16 text-[#18151d] dark:bg-[#09090b] dark:text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 mt-15 text-center">
         


          <h1 className="text-2xl font-bold sm:text-4xl">
            Explore{" "}
            <span className="text-[#9b2ae5]">Studios</span>
          </h1>

          <p className="mx-auto mb-6 mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
            Discover the perfect creative space for your next project.
          </p>
          <DropdownMenu >
  <DropdownMenuTrigger
    render={
      <Button
        variant="outline"
        className="border-purple-200 bg-white cursor-pointer text-purple-700 hover:bg-purple-50 hover:text-purple-800 dark:border-purple-500/30 dark:bg-[#151518] dark:text-purple-300 dark:hover:bg-purple-500/10"
      >
        
        <ArrowDownWideNarrow size={20} strokeWidth={2}  /> <span className="font-bold text-base text-black dark:text-white sm:text-[18px]">{position}</span> 
       

        
      </Button>
    }
  />
  <DropdownMenuContent
    align="end"
    className="w-48 rounded-xl border border-purple-200/70 bg-white p-2 shadow-xl shadow-purple-500/10 dark:border-purple-500/20 dark:bg-[#151518]"
  >
    <DropdownMenuGroup>
      <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
        Category
      </DropdownMenuLabel>

      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem
          value="default"
          className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 focus:bg-purple-50 focus:text-purple-700 dark:text-gray-300 dark:focus:bg-purple-500/15 dark:focus:text-purple-300"
        >
          Default
        </DropdownMenuRadioItem>

        <DropdownMenuRadioItem
          value="workshop"
          className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 focus:bg-purple-50 focus:text-purple-700 dark:text-gray-300 dark:focus:bg-purple-500/15 dark:focus:text-purple-300"
        >
          Workshop
        </DropdownMenuRadioItem>

        <DropdownMenuRadioItem
          value="photo"
          className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 focus:bg-purple-50 focus:text-purple-700 dark:text-gray-300 dark:focus:bg-purple-500/15 dark:focus:text-purple-300"
        >
          Photo Studio
        </DropdownMenuRadioItem>

        <DropdownMenuRadioItem
          value="film"
          className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 focus:bg-purple-50 focus:text-purple-700 dark:text-gray-300 dark:focus:bg-purple-500/15 dark:focus:text-purple-300"
        >
          Film Stage
        </DropdownMenuRadioItem>

        <DropdownMenuRadioItem
          value="podcast"
          className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 focus:bg-purple-50 focus:text-purple-700 dark:text-gray-300 dark:focus:bg-purple-500/15 dark:focus:text-purple-300"
        >
          Podcast Loungue
        </DropdownMenuRadioItem>

        <DropdownMenuRadioItem
          value="other"
          className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 focus:bg-purple-50 focus:text-purple-700 dark:text-gray-300 dark:focus:bg-purple-500/15 dark:focus:text-purple-300"
        >
          Other
        </DropdownMenuRadioItem>

        <DropdownMenuRadioItem
          value="music"
          className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 focus:bg-purple-50 focus:text-purple-700 dark:text-gray-300 dark:focus:bg-purple-500/15 dark:focus:text-purple-300"
        >
          Music Suite
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
        </div>
        


        {/* Studio Cards */}

        {
          position==='photo'? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo._id}
              className="group overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9b2ae5]/50 hover:shadow-[0_10px_40px_rgba(155,42,229,0.12)] dark:border-white/10 dark:bg-[#151518]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  width={500}
                  height={350}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full border border-purple-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#8120c4] backdrop-blur-md dark:border-[#9b2ae5]/30 dark:bg-black/70 dark:text-[#c77aff]">
                  {photo.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="space-y-4 p-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-[#18151d] transition-colors group-hover:text-[#9b2ae5] dark:text-white dark:group-hover:text-[#c77aff]">
                  {photo.title}
                </h2>

                <div className="flex items-center justify-between gap-2">
                  <p className="flex min-w-0 items-center gap-2 truncate text-sm text-gray-600 dark:text-gray-400">
                    <MapPin
                      size={16}
                      className="shrink-0 text-[#9b2ae5]"
                    />
                    <span className="truncate">{photo.location}</span>
                  </p>

                  <p className="flex shrink-0 items-center gap-1 text-sm font-medium text-yellow-500">
                    <Star size={15} fill="currentColor" />
                    {photo.rating ?? "New"}
                  </p>
                </div>

                {/* Price and Details */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-purple-100 pt-4 dark:border-white/10">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Hourly Rate
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#9b2ae5] dark:text-[#c77aff]">
                      ${photo.hourlyRate}
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        /hour
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${photo._id}`}
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[#9b2ae5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8120c4]"
                  >
                    View Details
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        :position==='film'?<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {films.map((film) => (
            <div
              key={film._id}
              className="group overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9b2ae5]/50 hover:shadow-[0_10px_40px_rgba(155,42,229,0.12)] dark:border-white/10 dark:bg-[#151518]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={film.imageUrl}
                  alt={film.title}
                  width={500}
                  height={350}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full border border-purple-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#8120c4] backdrop-blur-md dark:border-[#9b2ae5]/30 dark:bg-black/70 dark:text-[#c77aff]">
                  {film.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="space-y-4 p-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-[#18151d] transition-colors group-hover:text-[#9b2ae5] dark:text-white dark:group-hover:text-[#c77aff]">
                  {film.title}
                </h2>

                <div className="flex items-center justify-between gap-2">
                  <p className="flex min-w-0 items-center gap-2 truncate text-sm text-gray-600 dark:text-gray-400">
                    <MapPin
                      size={16}
                      className="shrink-0 text-[#9b2ae5]"
                    />
                    <span className="truncate">{film.location}</span>
                  </p>

                  <p className="flex shrink-0 items-center gap-1 text-sm font-medium text-yellow-500">
                    <Star size={15} fill="currentColor" />
                    {film.rating ?? "New"}
                  </p>
                </div>

                {/* Price and Details */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-purple-100 pt-4 dark:border-white/10">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Hourly Rate
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#9b2ae5] dark:text-[#c77aff]">
                      ${film.hourlyRate}
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        /hour
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${film._id}`}
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[#9b2ae5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8120c4]"
                  >
                    View Details
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        :position==='podcast'? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {podcasts.map((podcast) => (
            <div
              key={podcast._id}
              className="group overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9b2ae5]/50 hover:shadow-[0_10px_40px_rgba(155,42,229,0.12)] dark:border-white/10 dark:bg-[#151518]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={podcast.imageUrl}
                  alt={podcast.title}
                  width={500}
                  height={350}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full border border-purple-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#8120c4] backdrop-blur-md dark:border-[#9b2ae5]/30 dark:bg-black/70 dark:text-[#c77aff]">
                  {podcast.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="space-y-4 p-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-[#18151d] transition-colors group-hover:text-[#9b2ae5] dark:text-white dark:group-hover:text-[#c77aff]">
                  {podcast.title}
                </h2>

                <div className="flex items-center justify-between gap-2">
                  <p className="flex min-w-0 items-center gap-2 truncate text-sm text-gray-600 dark:text-gray-400">
                    <MapPin
                      size={16}
                      className="shrink-0 text-[#9b2ae5]"
                    />
                    <span className="truncate">{podcast.location}</span>
                  </p>

                  <p className="flex shrink-0 items-center gap-1 text-sm font-medium text-yellow-500">
                    <Star size={15} fill="currentColor" />
                    {podcast.rating ?? "New"}
                  </p>
                </div>

                {/* Price and Details */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-purple-100 pt-4 dark:border-white/10">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Hourly Rate
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#9b2ae5] dark:text-[#c77aff]">
                      ${podcast.hourlyRate}
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        /hour
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${podcast._id}`}
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[#9b2ae5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8120c4]"
                  >
                    View Details
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        :position==='music'?<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {musics.map((music) => (
            <div
              key={music._id}
              className="group overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9b2ae5]/50 hover:shadow-[0_10px_40px_rgba(155,42,229,0.12)] dark:border-white/10 dark:bg-[#151518]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={music.imageUrl}
                  alt={music.title}
                  width={500}
                  height={350}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full border border-purple-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#8120c4] backdrop-blur-md dark:border-[#9b2ae5]/30 dark:bg-black/70 dark:text-[#c77aff]">
                  {music.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="space-y-4 p-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-[#18151d] transition-colors group-hover:text-[#9b2ae5] dark:text-white dark:group-hover:text-[#c77aff]">
                  {music.title}
                </h2>

                <div className="flex items-center justify-between gap-2">
                  <p className="flex min-w-0 items-center gap-2 truncate text-sm text-gray-600 dark:text-gray-400">
                    <MapPin
                      size={16}
                      className="shrink-0 text-[#9b2ae5]"
                    />
                    <span className="truncate">{music.location}</span>
                  </p>

                  <p className="flex shrink-0 items-center gap-1 text-sm font-medium text-yellow-500">
                    <Star size={15} fill="currentColor" />
                    {music.rating ?? "New"}
                  </p>
                </div>

                {/* Price and Details */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-purple-100 pt-4 dark:border-white/10">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Hourly Rate
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#9b2ae5] dark:text-[#c77aff]">
                      ${music.hourlyRate}
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        /hour
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${music._id}`}
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[#9b2ae5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8120c4]"
                  >
                    View Details
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>:position==='workshop'?<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map((workshop) => (
            <div
              key={workshop._id}
              className="group overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9b2ae5]/50 hover:shadow-[0_10px_40px_rgba(155,42,229,0.12)] dark:border-white/10 dark:bg-[#151518]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={workshop.imageUrl}
                  alt={workshop.title}
                  width={500}
                  height={350}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full border border-purple-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#8120c4] backdrop-blur-md dark:border-[#9b2ae5]/30 dark:bg-black/70 dark:text-[#c77aff]">
                  {workshop.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="space-y-4 p-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-[#18151d] transition-colors group-hover:text-[#9b2ae5] dark:text-white dark:group-hover:text-[#c77aff]">
                  {workshop.title}
                </h2>

                <div className="flex items-center justify-between gap-2">
                  <p className="flex min-w-0 items-center gap-2 truncate text-sm text-gray-600 dark:text-gray-400">
                    <MapPin
                      size={16}
                      className="shrink-0 text-[#9b2ae5]"
                    />
                    <span className="truncate">{workshop.location}</span>
                  </p>

                  <p className="flex shrink-0 items-center gap-1 text-sm font-medium text-yellow-500">
                    <Star size={15} fill="currentColor" />
                    {workshop.rating ?? "New"}
                  </p>
                </div>

                {/* Price and Details */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-purple-100 pt-4 dark:border-white/10">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Hourly Rate
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#9b2ae5] dark:text-[#c77aff]">
                      ${workshop.hourlyRate}
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        /hour
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${workshop._id}`}
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[#9b2ae5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8120c4]"
                  >
                    View Details
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>:position==='other'?<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other) => (
            <div
              key={other._id}
              className="group overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#9b2ae5]/50 hover:shadow-[0_10px_40px_rgba(155,42,229,0.12)] dark:border-white/10 dark:bg-[#151518]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={other.imageUrl}
                  alt={other.title}
                  width={500}
                  height={350}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full border border-purple-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#8120c4] backdrop-blur-md dark:border-[#9b2ae5]/30 dark:bg-black/70 dark:text-[#c77aff]">
                  {other.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="space-y-4 p-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-[#18151d] transition-colors group-hover:text-[#9b2ae5] dark:text-white dark:group-hover:text-[#c77aff]">
                  {other.title}
                </h2>

                <div className="flex items-center justify-between gap-2">
                  <p className="flex min-w-0 items-center gap-2 truncate text-sm text-gray-600 dark:text-gray-400">
                    <MapPin
                      size={16}
                      className="shrink-0 text-[#9b2ae5]"
                    />
                    <span className="truncate">{other.location}</span>
                  </p>

                  <p className="flex shrink-0 items-center gap-1 text-sm font-medium text-yellow-500">
                    <Star size={15} fill="currentColor" />
                    {other.rating ?? "New"}
                  </p>
                </div>

                {/* Price and Details */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-purple-100 pt-4 dark:border-white/10">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Hourly Rate
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#9b2ae5] dark:text-[#c77aff]">
                      ${other.hourlyRate}
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        /hour
                      </span>
                    </p>
                  </div>

                  <Link
                    href={`/studios/${other._id}`}
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[#9b2ae5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8120c4]"
                  >
                    View Details
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>: position==='default'? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                  <p className="flex min-w-0 items-center gap-2 truncate text-sm text-gray-600 dark:text-gray-400">
                    <MapPin
                      size={16}
                      className="shrink-0 text-[#9b2ae5]"
                    />
                    <span className="truncate">{studio.location}</span>
                  </p>

                  <p className="flex shrink-0 items-center gap-1 text-sm font-medium text-yellow-500">
                    <Star size={15} fill="currentColor" />
                    {studio.rating ?? "New"}
                  </p>
                </div>

                {/* Price and Details */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-purple-100 pt-4 dark:border-white/10">
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
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[#9b2ae5] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8120c4]"
                  >
                    View Details
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>:''
        } 
        






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
        </div>
    );
};

export default ExploredStudiosSectionFitering;