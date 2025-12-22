import Navbar from "@/components/Navbar";
import Facilities from "@/components/Facilities";
import Footer from "@/components/Footer";

export default function FacilitiesPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">
                <Facilities />
            </main>
            <Footer />
        </>
    );
}
