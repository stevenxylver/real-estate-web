import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import { getProperties } from "@/lib/strapi";
import { Suspense } from "react";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface Property {
    slug: string;
    title: string;
    priceStart: number;
    bedrooms: number;
    bathrooms: number;
    location: string;
    status_sale: string;
    image?: string;
    luastanah?: number;
    luasbangunan?: number;
    brosur?: string;
}

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

async function PropertiesContent({ page }: { page: number }) {
    const { data, meta } = await getProperties(page, 6);

    // mapping dari response Strapi → object yang gampang dipakai
    // Note: Strapi v5 returns flat structure (no `attributes` wrapper)
    const properties: Property[] = (data || []).map((item: any) => {
        // Handle both Strapi v4 (item.attributes) and v5 (flat structure)
        const p = item.attributes || item;

        // Handle image for both Strapi v4 and v5 formats
        const imageUrl = p.image?.data?.attributes?.url || p.image?.url || p.image?.[0]?.url;
        const brosurUrl = p.brosur?.data?.attributes?.url || p.brosur?.url;

        // Build full URL - don't add base URL if it's already a full URL (Cloudinary)
        const fullImageUrl = imageUrl
            ? (imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`)
            : undefined;
        const fullBrosurUrl = brosurUrl
            ? (brosurUrl.startsWith('http') ? brosurUrl : `${STRAPI_URL}${brosurUrl}`)
            : undefined;

        return {
            slug: p.slug,
            title: p.title,
            priceStart: p.priceStart,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            location: p.location,
            status_sale: p.status_sale || p.status,
            image: fullImageUrl,
            luastanah: p.luastanah,
            luasbangunan: p.luasbangunan,
            brosur: fullBrosurUrl,
        };
    });

    const { pagination } = meta;

    return (
        <>
            {/* Mobile */}
            <div className="sm:hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
                    {properties.map((property) => (
                        <div key={property.slug} className="flex-shrink-0 w-72 snap-start">
                            <PropertyCard {...property} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property.slug} {...property} />
                ))}
            </div>

            {/* Pagination */}
            <Suspense fallback={null}>
                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pageCount}
                />
            </Suspense>

            {/* Results Info */}
            <div className="text-center mt-6 text-sm text-gray-500">
                Showing {properties.length} of {pagination.total} properties
            </div>
        </>
    );
}

export default async function PropertiesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;

    return (
        <>
            <Navbar />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                    <div className="max-w-lg">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            Temukan Hunian Impian Anda
                        </h2>
                        <p className="text-sm text-gray-500">
                            Setiap rumah menawarkan keunggulan desain, kualitas, dan lokasi strategis yang bernilai tinggi.
                        </p>
                    </div>
                </div>

                <Suspense fallback={
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                }>
                    <PropertiesContent page={currentPage} />
                </Suspense>
            </section>
            <Footer />
        </>
    );
}
