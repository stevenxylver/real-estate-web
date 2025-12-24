import { notFound } from "next/navigation";
import { getPropertyBySlug } from "@/lib/strapi";
import Navbar from "@/components/Navbar";
import ImageGallery from "@/components/ImageGallery";
import PropertyDescription from "@/components/PropertyDescription";
import Facilities from "@/components/Facilities";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

type PageProps = {
    params: Promise<{ slug: string }>;
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default async function PropertyDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const property = await getPropertyBySlug(slug);

    if (!property) {
        notFound();
    }

    // Helper function to build full URL
    const buildFullUrl = (url: string | undefined | null): string | null => {
        if (!url) return null;
        return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
    };

    // Helper function for PDF URLs - return as-is (no transformation needed)
    const fixPdfUrl = (url: string | null): string | null => {
        return url;
    };

    // Handle image for both Strapi v4 and v5 formats (same as PropertyGrid)
    const imageUrlPath = property.image?.data?.attributes?.url || property.image?.url || property.image?.[0]?.url;
    const imageUrl = buildFullUrl(imageUrlPath);

    // Handle gallery images (Strapi v4 and v5 formats)
    const galleryData = property.gallery?.data || property.gallery || [];
    const galleryImages: string[] = (Array.isArray(galleryData) ? galleryData : [])
        .map((img: any) => {
            const imgUrl = img?.attributes?.url || img?.url;
            return buildFullUrl(imgUrl);
        })
        .filter((url): url is string => url !== null);

    // Combine main image + gallery images for total count
    const allImages = imageUrl ? [imageUrl, ...galleryImages] : galleryImages;

    // Get main display image (use imageUrl or first gallery image)
    const mainImage = imageUrl || galleryImages[0] || null;

    // Get thumbnail images from gallery only (up to 4)
    const thumbnailImages = galleryImages.slice(0, 4);

    // Handle brosur URL - prioritize brosurLink (Google Drive) over brosur (Cloudinary)
    const brosurPath = property.brosur?.data?.attributes?.url || property.brosur?.url;
    const cloudinaryBrosurUrl = fixPdfUrl(buildFullUrl(brosurPath));
    const brosurUrl = property.brosurLink || cloudinaryBrosurUrl;

    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Image Gallery */}
                    <ImageGallery
                        mainImage={mainImage}
                        thumbnailImages={thumbnailImages}
                        allImages={allImages}
                        title={property.title}
                    />

                    {/* Right: Property Details */}
                    <div className="space-y-6">
                        {/* Title & Location */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-2 mt-2 text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span className="text-sm">{property.location}</span>
                                </div>
                            </div>
                            {property.roomvirtual ? (
                                <a
                                    href={property.roomvirtual}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors"
                                >
                                    Virtual Room
                                </a>
                            ) : (
                                <button
                                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-colors opacity-50 cursor-not-allowed"
                                    disabled
                                >
                                    Virtual Room
                                </button>
                            )}
                        </div>

                        {/* Property Stats */}
                        <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-200">
                            {/* Bedroom */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">Bedroom</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {property.bedrooms || 2}
                                </p>
                            </div>
                            {/* Bathroom */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">Bathroom</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {property.bathrooms || 2}
                                </p>
                            </div>
                            {/* Area */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                        />
                                    </svg>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">Luas Tanah</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {property.luastanah || 0} m²
                                </p>
                            </div>
                            {/* Parking */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <svg
                                        className="w-6 h-6 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <p className="text-xs text-gray-500 mb-1">Luas Bangunan</p>
                                <p className="text-lg font-semibold text-gray-900">{property.luasbangunan || 0} m²</p>
                            </div>
                        </div>

                        {/* Property Details */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Property details
                                </h2>
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                            <PropertyDescription
                                description={property.detailproperti || `This spacious and modern ${property.category?.toLowerCase() || "rental"} property is located in a desirable neighbourhood, offering a comfortable and convenient living space.`}
                                maxLines={4}
                            />
                        </div>

                        {/* Price Section */}
                        <div className="bg-[#f5ebe0] rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Price
                                </h3>
                                <span className="text-sm text-gray-600">
                                    Total: <span className="font-semibold text-gray-900">{property.totalunit || 0}</span> units
                                </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                                Starting from{" "}
                                <span className="font-semibold text-gray-900">
                                    Rp {(typeof property.priceStart === 'string' ? parseFloat(property.priceStart) : property.priceStart)?.toLocaleString("en-US") || "0"}
                                </span>
                            </p>

                            {/* Progress Bar */}
                            {(() => {
                                const totalUnit = property.totalunit || 0;
                                const unitLeft = property.unitleft || 0;
                                const soldUnit = totalUnit - unitLeft;
                                const soldPercent = totalUnit > 0 ? Math.round((soldUnit / totalUnit) * 100) : 0;

                                return (
                                    <div className="space-y-2">
                                        <div className="h-2 bg-white rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-orange-300 to-orange-400 rounded-full"
                                                style={{ width: `${soldPercent}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">
                                                {unitLeft} <span className="text-gray-400">units left</span>
                                            </span>
                                            <span className="font-medium text-gray-700">{soldPercent}%</span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Status Badge & Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-medium ${property.status_sale === "For Sale"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                    }`}
                            >
                                {property.status_sale || "For Sale"}
                            </span>
                            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                {property.category}
                            </span>

                            {/* Download Brosur Button */}
                            {brosurUrl ? (
                                <a
                                    href={brosurUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-medium transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download Brosur
                                </a>
                            ) : (
                                <button
                                    disabled
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-400 rounded-full text-sm font-medium cursor-not-allowed"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Brosur
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <Facilities />
                <MapSection />
                <Footer />

            </main>
        </>
    );
}
