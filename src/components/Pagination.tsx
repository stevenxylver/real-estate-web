"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath?: string;
}

export default function Pagination({ currentPage, totalPages, basePath = "/properties" }: PaginationProps) {
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `${basePath}?${params.toString()}`;
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showPages = 5; // Max pages to show

        if (totalPages <= showPages) {
            // Show all pages if total is less than showPages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <nav className="flex items-center justify-center gap-1 mt-12" aria-label="Pagination">
            {/* Previous Button */}
            <Link
                href={createPageURL(currentPage - 1)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${currentPage === 1
                    ? "pointer-events-none opacity-50 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : 0}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </Link>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
                typeof page === "number" ? (
                    <Link
                        key={index}
                        href={createPageURL(page)}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg border font-medium transition-all duration-200 ${currentPage === page
                            ? "bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white"
                            : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
                            }`}
                        aria-current={currentPage === page ? "page" : undefined}
                    >
                        {page}
                    </Link>
                ) : (
                    <span
                        key={index}
                        className="flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400"
                    >
                        {page}
                    </span>
                )
            ))}

            {/* Next Button */}
            <Link
                href={createPageURL(currentPage + 1)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${currentPage === totalPages
                    ? "pointer-events-none opacity-50 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : 0}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </Link>
        </nav>
    );
}
