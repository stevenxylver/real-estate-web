"use client";

import { useState } from "react";

type ImageGalleryProps = {
    mainImage: string | null;
    thumbnailImages: string[];
    allImages: string[];
    title: string;
};

export default function ImageGallery({
    mainImage,
    thumbnailImages,
    allImages,
    title,
}: ImageGalleryProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openModal = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? allImages.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) =>
            prev === allImages.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <>
            <div className="space-y-4">
                {/* Main Image */}
                <div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 cursor-pointer"
                    onClick={() => openModal(0)}
                >
                    {mainImage ? (
                        <img
                            src={mainImage}
                            alt={title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg
                                className="w-16 h-16"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    )}
                    {/* Image Counter Badge */}
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        1 / {allImages.length || 1}
                    </div>
                    {/* Zoom Icon */}
                    <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full">
                        <svg
                            className="w-5 h-5 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-4 gap-2">
                    {thumbnailImages.length > 0 ? (
                        thumbnailImages.map((imgSrc, i) => (
                            <div
                                key={i}
                                className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => openModal(i + 1)}
                            >
                                <img
                                    src={imgSrc}
                                    alt={`${title} - ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))
                    ) : (
                        [1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="relative aspect-square rounded-xl overflow-hidden bg-gray-200"
                            >
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal/Lightbox */}
            {isModalOpen && allImages.length > 0 && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    onClick={closeModal}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                        onClick={closeModal}
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Previous Button */}
                    <button
                        className="absolute left-4 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    {/* Image */}
                    <div
                        className="max-w-5xl max-h-[85vh] px-16"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={allImages[currentImageIndex]}
                            alt={`${title} - ${currentImageIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg"
                        />
                        {/* Image Counter */}
                        <div className="text-center text-white mt-4 text-sm">
                            {currentImageIndex + 1} / {allImages.length}
                        </div>
                    </div>

                    {/* Next Button */}
                    <button
                        className="absolute right-4 text-white hover:text-gray-300 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}
