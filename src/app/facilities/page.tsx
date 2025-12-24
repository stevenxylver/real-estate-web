import Navbar from "@/components/Navbar";
import Facilities from "@/components/Facilities";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";

export default function FacilitiesPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Facilities />
            </main>
            <MapSection />
            <Footer />

        </>
    );
}
