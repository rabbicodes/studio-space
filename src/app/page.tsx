import { Banner } from "@/components/Banner";
import { HostGuarantee } from "@/components/HostGuarantee";
import HowItWorks from "@/components/HowItWorks";


export default function Home() {
  return (
    <main>
      <Banner />
      <HowItWorks/>
      
      <HostGuarantee />
    </main>
  );
}
