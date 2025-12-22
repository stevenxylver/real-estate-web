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
                    className="text-gray-600 text-sm leading-relaxed"
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
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="text-gray-900 font-medium hover:underline text-sm mt-1"
                    >
                        See More
                    </button>
                )}
            </div>

            {/* Popup Modal */}
            {isExpanded && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setIsExpanded(false)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 pb-0">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Property Details
                            </h3>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                {description}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="p-6 pt-0">
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium transition-colors"
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
