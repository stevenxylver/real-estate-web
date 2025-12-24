"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBanners, Banner } from "@/lib/strapi";

export default function Hero() {
    const [slides, setSlides] = useState<Banner[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch banners from Strapi
    useEffect(() => {
        async function fetchBanners() {
            try {
                const banners = await getBanners();
                setSlides(banners);
            } catch (error) {
                console.error("Failed to fetch banners:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBanners();
    }, []);

    useEffect(() => {
        if (!isAutoPlay || slides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlay, slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(true), 10000);
    };

    // Helper component for clickable banner image
    const BannerImage = ({ slide, className }: { slide: Banner; className?: string }) => {
        const imageElement = (
            <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover ${slide.slug ? 'cursor-pointer' : ''}`}
            />
        );

        // Only wrap with Link if slug is provided
        if (slide.slug) {
            return (
                <Link href={`/promo/${slide.slug}`} className="block w-full h-full">
                    {imageElement}
                </Link>
            );
        }

        return imageElement;
    };

    if (isLoading) {
        return (
            <section className="bg-gradient-to-b from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900 py-8 sm:py-12 overflow-hidden transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-2xl lg:max-w-3xl">
                            <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl h-64 sm:h-80 lg:h-96 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (slides.length === 0) {
        return null;
    }

    return (
        <section className="bg-gradient-to-b from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900 py-8 sm:py-12 overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Carousel Container */}
                <div className="relative">
                    {/* Slides Wrapper */}
                    <div className="flex items-center justify-center gap-4 sm:gap-6">
                        {/* Previous Slide (Partial) */}
                        <div className="hidden md:block w-48 lg:w-64 flex-shrink-0 opacity-50 scale-90 transform transition-all duration-500">
                            <div className="rounded-2xl h-64 lg:h-80 overflow-hidden">
                                <BannerImage slide={slides[(currentSlide - 1 + slides.length) % slides.length]} />
                            </div>
                        </div>

                        {/* Main Slide */}
                        <div
                            className="w-full max-w-2xl lg:max-w-3xl flex-shrink-0 transform transition-all duration-500"
                            onMouseEnter={() => setIsAutoPlay(false)}
                            onMouseLeave={() => setIsAutoPlay(true)}
                        >
                            <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl h-64 sm:h-80 lg:h-96">
                                <BannerImage slide={slides[currentSlide]} />
                            </div>
                        </div>

                        {/* Next Slide (Partial) */}
                        <div className="hidden md:block w-48 lg:w-64 flex-shrink-0 opacity-50 scale-90 transform transition-all duration-500">
                            <div className="rounded-2xl h-64 lg:h-80 overflow-hidden">
                                <BannerImage slide={slides[(currentSlide + 1) % slides.length]} />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-2 lg:p-3 rounded-full shadow-lg transition-all z-20 hidden sm:block"
                    >
                        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-2 lg:p-3 rounded-full shadow-lg transition-all z-20 hidden sm:block"
                    >
                        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 ${index === currentSlide
                                ? "w-8 h-2 bg-red-500 rounded-full"
                                : "w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full hover:bg-gray-500 dark:hover:bg-gray-500"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

