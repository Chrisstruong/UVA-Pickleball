import Hero from "../components/home/Hero";
import FeatureCards from "@/components/home/FeatureCards";
import AnnoucementsSection from "@/components/home/AnnoucementsSection";
import Gallery from "@/components/home/Gallery";
import SponsorSection from "@/components/home/SponsorSection";

export default function Home() {
  return (  
    <main>
      <Hero />
      <FeatureCards />
      <AnnoucementsSection />
      <Gallery />
      <SponsorSection />
    </main>
  )
}