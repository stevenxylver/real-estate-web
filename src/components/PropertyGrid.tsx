import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { getProperties } from "@/lib/strapi";

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

export default async function PropertyGrid() {
    const { data } = await getProperties();

    // Mapping dari response Strapi → object yang gampang dipakai
    // Handle both Strapi v4 (item.attributes) and v5 (flat structure)
    const properties: Property[] = (data || []).map((item: any) => {
        const p = item.attributes || item;

        // Handle image for both Strapi v4 and v5 formats
        const imageUrl = p.image?.data?.attributes?.url || p.image?.url || p.image?.[0]?.url;
        const brosurUrl = p.brosur?.data?.attributes?.url || p.brosur?.url;

        // Build full URL - don't add base URL if it's already a full URL (Cloudinary)
        const fullImageUrl = imageUrl
            ? (imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`)
            : undefined;
        let fullBrosurUrl = brosurUrl
            ? (brosurUrl.startsWith('http') ? brosurUrl : `${STRAPI_URL}${brosurUrl}`)
            : undefined;

        // Fix Cloudinary PDF URLs - add fl_attachment for download
        if (fullBrosurUrl && fullBrosurUrl.includes('cloudinary.com') && fullBrosurUrl.toLowerCase().endsWith('.pdf')) {
            fullBrosurUrl = fullBrosurUrl.replace('/upload/', '/upload/fl_attachment/');
        }

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

    // Show first 3 on mobile, 6 on desktop
    const mobileProperties = properties.slice(0, 3);
    const desktopProperties = properties.slice(0, 6);

    return (
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
                <Link
                    href="/properties"
                    className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-50 whitespace-nowrap self-start"
                >
                    See All Properties
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            {/* Mobile: Horizontal scroll with 3 cards */}
            <div className="sm:hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
                    {mobileProperties.map((property) => (
                        <div key={property.slug} className="flex-shrink-0 w-72 snap-start">
                            <PropertyCard
                                slug={property.slug}
                                title={property.title}
                                priceStart={property.priceStart}
                                bedrooms={property.bedrooms}
                                bathrooms={property.bathrooms}
                                location={property.location}
                                status_sale={property.status_sale}
                                image={property.image}
                                luastanah={property.luastanah}
                                luasbangunan={property.luasbangunan}
                                brosur={property.brosur}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {desktopProperties.map((property) => (
                    <PropertyCard
                        key={property.slug}
                        slug={property.slug}
                        title={property.title}
                        priceStart={property.priceStart}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        location={property.location}
                        status_sale={property.status_sale}
                        image={property.image}
                        luastanah={property.luastanah}
                        luasbangunan={property.luasbangunan}
                        brosur={property.brosur}
                    />
                ))}
            </div>
        </section>
    );
}
