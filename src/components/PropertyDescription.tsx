"use client";

import { useState, useRef, useEffect } from "react";

interface PropertyDescriptionProps {
    description: string;
    maxLines?: number;
}

export default function PropertyDescription({
    description,
    maxLines = 7,
}: PropertyDescriptionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (textRef.current) {
            const lineHeight = parseFloat(
                getComputedStyle(textRef.current).lineHeight
            );
            const maxHeight = lineHeight * maxLines;
            setShowSeeMore(textRef.current.scrollHeight > maxHeight);
        }
    }, [description, maxLines]);

    // Format text with line breaks
    const formatText = (text: string) => {
        return text.split("\n").map((line, index) => (
            <span key={index}>
                {line}
                {index < text.split("\n").length - 1 && <br />}
            </span>
        ));
    };

    return (
        <>
            <div className="relative">
                <p
                    ref={textRef}
                    className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: maxLines,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {formatText(description)}
                </p>
                {showSeeMore && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-gray-900 via-white/90 dark:via-gray-900/90 to-transparent pt-8 pb-1">
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="group flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-all duration-200"
                        >
                            <span className="border-b border-transparent group-hover:border-blue-600 dark:group-hover:border-blue-400 transition-all duration-200">
                                See More
                            </span>
                            <svg
                                className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Popup Modal */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setIsExpanded(false)}
                >
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 pb-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Property Details
                            </h3>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                                {description}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="p-6 pt-0">
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="w-full py-3 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black rounded-full font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
