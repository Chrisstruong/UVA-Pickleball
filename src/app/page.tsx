import Hero from "../components/home/Hero";
import FeatureCards from "@/components/home/FeatureCards";
import AnnoucementsSection from "@/components/home/AnnoucementsSection";

export default function Home() {
  return (  
    <main>
      <Hero />
      <FeatureCards />
      <AnnoucementsSection />
    </main>
  )
}