import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import MapSection from "@/components/MapSection";
import Facilities from "@/components/Facilities";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <PropertyGrid />
      <MapSection />
      <Facilities />
      <Footer />
    </>
  );
}
