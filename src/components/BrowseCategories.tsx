import { IStudio } from "@/type/StudioType";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { getTokenFromServer } from "@/lib/getrTokenFromServer";

const BrowseCategories = async () => {
  const token = await getTokenFromServer()
  const res = await fetch("http://localhost:8000/studios",{
    headers:{
      authorization:`Bearer ${token}`
    }
  });

  if (!res.ok) {
    notFound()
  }

  const studios: IStudio[] = await res.json();

  // Group by category
  const categories = Object.values(
    studios.reduce<
      Record<string, { category: string; overview: string; count: number }>
    >((acc, studio) => {
      if (!acc[studio.category]) {
        acc[studio.category] = {
          category: studio.category,
          overview: studio.overview,
          count: 0,
        };
      }

      acc[studio.category].count += 1;

      return acc;
    }, {})
  );

  



  return (
    <section className="space-y-12 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <Badge
          variant="outline"
          className="mb-4 gap-2 border-purple-500/30 bg-purple-500/10 px-3 py-1 text-purple-700 dark:text-purple-300"
        >
          
          {categories.length}{" "}
          {categories.length === 1 ? "Category" : "Categories"}
        </Badge>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Browse Studios by{" "}
          <span className="bg-linear-to-r from-purple-600 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-fuchsia-400 dark:to-violet-400">
            Category
          </span>
        </h2>

        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          Discover creative spaces designed for your projects, from
          photography and podcasts to music sessions and art workshops.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ category, overview, count }, index) => {
          

          return (
            <Link
              key={category}
              href={`/studios/category/${encodeURIComponent(category)}`}
              style={{ animationDelay: `${index * 100}ms` }}
              className="group block h-full cursor-pointer animate-[fadeUp_0.7s_ease-out_both] rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-4 motion-reduce:animate-none"
            >
              <Card className="relative h-full overflow-hidden rounded-2xl border border-purple-200/60 bg-white transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-purple-400 group-hover:shadow-xl group-hover:shadow-purple-500/10 dark:border-purple-900/40 dark:bg-[#15121c]">
                {/* Background Decoration */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition-all duration-500 group-hover:bg-purple-500/20" />

                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    
                  

                    {/* Studio Count */}
                    <Badge
                      variant="outline"
                      className="border-purple-500/30 bg-purple-500/10 px-3 py-1 text-purple-700 dark:text-purple-300"
                    >
                      {count} {count === 1 ? "Studio" : "Studios"}
                    </Badge>
                  </div>
                </CardHeader>

                {/* Category Content */}
                <CardContent className="relative space-y-3">
                  <CardTitle className="text-xl font-bold tracking-tight transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {category}
                  </CardTitle>

                  <CardDescription className="line-clamp-2 min-h-10 text-sm leading-6">
                    {overview}
                  </CardDescription>
                </CardContent>

                {/* Footer */}
                <CardFooter className="relative mt-auto border-t border-purple-100 pt-4 dark:border-purple-900/40">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-sm font-semibold text-purple-600 transition-colors duration-300 dark:text-purple-400">
                      Explore Studios
                    </span>

                  </div>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BrowseCategories;