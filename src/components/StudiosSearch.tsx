
"use client";

import { IStudio } from "@/type/StudioType";
import { Search, X, Building2,  } from "lucide-react";
import { useState } from "react";

const StudiosSearch = ({ studios }: { studios: IStudio[] }) => {
  const [search, setSearch] = useState("");

  // Search Filtering Logic
  const filtersearch = studios.filter((studio) => {
    const searchValue = search.toLowerCase().trim();

    return (
      studio.title.toLowerCase().includes(searchValue) ||
      studio.category.toLowerCase().includes(searchValue) ||
      studio.location.toLowerCase().includes(searchValue) ||
      studio.amenities.some((amenity) =>
        amenity.toLowerCase().includes(searchValue)
      )
    );
  });

  return (
    <section className="w-full space-y-6">

      {/* Search Input */}
      <div className="relative w-full max-w-2xl mx-auto mb-9 group">

        {/* Purple Glow */}
        <div className="absolute inset-0 rounded-2xl bg-[#9b2ae5]/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center">

          {/* Search Icon */}
          <Search className="absolute left-5 size-5 text-muted-foreground group-focus-within:text-[#9b2ae5] transition-colors pointer-events-none" />

          {/* Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search studios, categories, location..."
            className="w-full h-14 pl-14 pr-36 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none shadow-sm transition-all duration-200 focus:border-[#9b2ae5] focus:ring-4 focus:ring-[#9b2ae5]/10"
          />

          {/* Found Count */}
          <div className="absolute right-12 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#9b2ae5]/10">

            <Building2 className="size-3.5 text-[#9b2ae5] " />

            <span className="text-xs font-semibold text-[#9b2ae5] dark:text-white whitespace-nowrap">
              {filtersearch.length} Found {filtersearch.length!==studios.length &&<span>in {studios.length} studios</span>}
            </span>

          </div>
          

          {/* Clear Search */}
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 p-1.5 rounded-full text-muted-foreground hover:text-[#9b2ae5] hover:bg-[#9b2ae5]/10 transition-colors"
            >
              <X className="size-4" />
            </button>
          )}

        </div>
        <div>
            {
                
            }
        </div>
      </div>

      {/* Search Empty State */}


    </section>
  );
};

export default StudiosSearch;
