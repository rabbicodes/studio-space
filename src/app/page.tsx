import AboutUs from "@/components/AboutUs";
import { Banner } from "@/components/Banner";
import BrowseCategories from "@/components/BrowseCategories";
import FeaturedStudioPage from "@/components/FeaturedStudioPage";
import { HostGuarantee } from "@/components/HostGuarantee";
import HowItWorks from "@/components/HowItWorks";


export default function Home() {
  return (
    <main>
      <Banner />
      <HowItWorks/>
      <BrowseCategories/>
      <FeaturedStudioPage/>
      <HostGuarantee />
      <AboutUs/>
    </main>
  );
}
