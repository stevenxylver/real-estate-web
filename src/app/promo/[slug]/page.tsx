import { notFound } from "next/navigation";
import { getBannerBySlug } from "@/lib/strapi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function PromoPage({ params }: PageProps) {
    const { slug } = await params;
    const banner = await getBannerBySlug(slug);

    if (!banner) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                {/* Hero Banner Section */}
                <section className="relative">
                    <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                        {/* Content on banner */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
                            <div className="max-w-7xl mx-auto">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                                    {banner.title}
                                </h1>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                            <Link href="/" className="hover:text-red-500 transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-gray-900 font-medium">{banner.title}</span>
                        </nav>

                        {/* Description */}
                        {banner.description ? (
                            <div className="prose prose-lg max-w-none">
                                {/* Handle rich text format from Strapi or plain text */}
                                <div className="text-gray-700 leading-relaxed space-y-4">
                                    {banner.description.split('\n').map((paragraph, index) => (
                                        paragraph.trim() ? (
                                            <p key={index}>{paragraph}</p>
                                        ) : (
                                            <br key={index} />
                                        )
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    Promo {banner.title}
                                </h2>
                                <p className="text-gray-500">
                                    Hubungi kami untuk informasi lebih lanjut mengenai promo ini.
                                </p>
                            </div>
                        )}

                        {/* CTA Button */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/6281808187943?text=Halo%2C%20mau%20tanya%20info%20rumah%20yang%20tersedia.%0AApakah%20masih%20ada%20unit%20dan%20promo%20saat%20ini%3F"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Hubungi via WhatsApp
                            </a>
                            <Link
                                href="/properties"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Lihat Properti
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
