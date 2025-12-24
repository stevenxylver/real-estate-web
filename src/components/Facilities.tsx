"use client";

import { useState, useEffect } from "react";
import { Facility } from "@/lib/strapi";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const categories = [
    "All",
    "Retail",
    "Healthcare",
    "Hotel & Recreation",
    "Education",
    "Office & Banking",
    "Place of Worship"
];

export default function Facilities() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        async function fetchFacilities() {
            try {
                const res = await fetch(`${STRAPI_URL}/api/facilities?populate=image`);
                if (res.ok) {
                    const json = await res.json();
                    const data: Facility[] = (json.data || []).map((item: any) => {
                        const imageUrl = item.image?.url || item.image?.data?.attributes?.url;
                        // Check if URL is already a full URL (Cloudinary) or needs STRAPI_URL prefix
                        const fullImageUrl = imageUrl
                            ? (imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`)
                            : "";
                        return {
                            id: item.id,
                            name: item.name || "",
                            description: item.description || "",
                            location: item.location || "",
                            type: item.type || "",
                            image: fullImageUrl,
                        };
                    });
                    if (data.length > 0) {
                        setFacilities(data);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch facilities:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchFacilities();
    }, []);

    // Reset to page 1 when category changes
    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const filteredfacilities = activeCategory === "All"
        ? facilities
        : facilities.filter(p => p.type === activeCategory);

    // Pagination calculations
    const totalPages = Math.ceil(filteredfacilities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFacilities = filteredfacilities.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="bg-white dark:bg-gray-900 py-10 sm:py-16 md:py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white text-center mb-6 sm:mb-10 md:mb-12 leading-tight">
                    Nikmati Kemudahan Hidup Modern Dengan Fasilitas Lengkap di Sekitar Anda
                </h2>

                {/* Filter Tabs - Horizontal scroll on mobile */}
                <div className="mb-6 sm:mb-10">
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-max sm:min-w-0">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${activeCategory === category
                                        ? "bg-black dark:bg-white text-white dark:text-black"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile: Horizontal scroll cards */}
                <div className="sm:hidden overflow-x-auto -mx-4 px-4 pb-4">
                    <div className="flex gap-4 min-w-max">
                        {filteredfacilities.map((facility) => (
                            <div key={facility.id} className="group w-72 flex-shrink-0">
                                {/* Image */}
                                <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[4/3]">
                                    <img
                                        src={facility.image}
                                        alt={facility.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="text-base font-bold text-black dark:text-white mb-1.5">
                                    {facility.name}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
                                    {facility.description}
                                </p>

                                {/* Footer - Stacked on mobile */}
                                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="inline-flex items-center gap-1">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {facility.location}m²
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                        {facility.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop: Grid layout */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {paginatedFacilities.map((facility) => (
                        <div key={facility.id} className="group">
                            {/* Image */}
                            <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
                                <img
                                    src={facility.image}
                                    alt={facility.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-2">
                                {facility.name}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                {facility.description}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="inline-flex items-center gap-1.5">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {facility.location} m²
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                    {facility.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav className="flex items-center justify-center gap-1 mt-12" aria-label="Pagination">
                        {/* Previous Button */}
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${currentPage === 1
                                ? "opacity-50 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`flex items-center justify-center w-10 h-10 rounded-lg border font-medium transition-all duration-200 ${currentPage === page
                                    ? "bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white"
                                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${currentPage === totalPages
                                ? "opacity-50 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                )}
            </div>
        </section>
    );
}
