
import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

const outfit = Host_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioSpace",
  description: "Find your perfect creative workspace",
};

const themeScript = `
  (function () {
    try {
      const savedTheme = localStorage.getItem("theme");
      const theme = savedTheme === "light" ? "light" : "dark";

      const root = document.documentElement;

      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
