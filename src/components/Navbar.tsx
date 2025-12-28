"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

interface LatestProperty {
    title: string;
    slug: string;
}

interface CompanyInfo {
    name: string;
    logo: string;
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [latestProperty, setLatestProperty] = useState<LatestProperty | null>(null);
    const [company, setCompany] = useState<CompanyInfo | null>(null);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

        async function fetchLatestProperty() {
            try {
                const res = await fetch(
                    `${strapiUrl}/api/properties?populate=*&sort=publishedAt:desc&pagination[limit]=1`
                );
                const json = await res.json();
                if (json.data && json.data[0]) {
                    setLatestProperty({
                        title: json.data[0].title,
                        slug: json.data[0].slug,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch latest property:", error);
            }
        }

        async function fetchCompany() {
            try {
                const res = await fetch(
                    `${strapiUrl}/api/company?populate=logo`
                );
                const json = await res.json();
                if (json.data) {
                    const data = json.data;
                    let logoUrl = "";
                    if (data.logo) {
                        if (data.logo.url) {
                            logoUrl = data.logo.url;
                        } else if (data.logo.data?.attributes?.url) {
                            logoUrl = data.logo.data.attributes.url;
                        }
                    }
                    const fullLogoUrl = logoUrl
                        ? (logoUrl.startsWith('http') ? logoUrl : `${strapiUrl}${logoUrl}`)
                        : "";
                    setCompany({
                        name: data.name || "BINTARO JAYA",
                        logo: fullLogoUrl,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch company info:", error);
            }
        }

        fetchLatestProperty();
        fetchCompany();
    }, []);

    return (
        <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-sm leading-tight text-gray-900 dark:text-white">
                    {/* Dynamic Company Logo from Strapi */}
                    {company?.logo ? (
                        <img
                            src={company.logo}
                            alt={company.name || "Logo"}
                            className="w-10 h-10 object-contain"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    )}
                    <div>
                        {company?.name ? (
                            company.name.split(' ').map((word, index) => (
                                <span key={index} className="block">{word}</span>
                            ))
                        ) : (
                            <>
                                <span className="block">BINTARO</span>
                                <span className="block">JAYA</span>
                            </>
                        )}
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6 text-sm text-gray-700 dark:text-gray-300">
                    <Link href="/properties" className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                        Properties
                    </Link>
                    {latestProperty ? (
                        <Link href={`/properties/${latestProperty.slug}`} className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                            {latestProperty.title}
                            <span className="bg-black dark:bg-white text-white dark:text-black text-[10px] px-1.5 py-0.5 rounded">New</span>
                        </Link>
                    ) : (
                        <span className="flex items-center gap-1 text-gray-400">
                            Loading...
                        </span>
                    )}
                    <Link href="/facilities" className="hover:text-gray-900 dark:hover:text-white transition-colors">Facilities</Link>
                    <Link href="/kpr" className="hover:text-gray-900 dark:hover:text-white transition-colors">Hitung KPR</Link>
                    <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</Link>
                </nav>

                {/* Desktop Right Section */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {theme === "dark" ? (
                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>

                    {/* WhatsApp Button */}
                    <a
                        href="https://wa.me/6281808187943?text=Halo%2C%20mau%20tanya%20info%20rumah%20yang%20tersedia.%0AApakah%20masih%20ada%20unit%20dan%20promo%20saat%20ini%3F"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Chat WhatsApp
                    </a>
                </div>

                {/* Mobile Right Section */}
                <div className="flex md:hidden items-center gap-2">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {theme === "dark" ? (
                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <nav className="flex flex-col px-4 py-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <Link href="/properties" className="flex items-center justify-between hover:text-gray-900 dark:hover:text-white">
                            Properties
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                        {latestProperty ? (
                            <Link href={`/properties/${latestProperty.slug}`} className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white">
                                {latestProperty.title}
                                <span className="bg-black dark:bg-white text-white dark:text-black text-[10px] px-1.5 py-0.5 rounded">New</span>
                            </Link>
                        ) : (
                            <span className="flex items-center gap-2 text-gray-400">
                                Loading...
                            </span>
                        )}
                        <Link href="/facilities" className="hover:text-gray-900 dark:hover:text-white">Facilities</Link>
                        <Link href="/kpr" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between hover:text-gray-900 dark:hover:text-white">
                            Hitung KPR
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-900 dark:hover:text-white">Contact</Link>
                        <a
                            href="https://wa.me/6281808187943?text=Halo%2C%20mau%20tanya%20info%20rumah%20yang%20tersedia.%0AApakah%20masih%20ada%20unit%20dan%20promo%20saat%20ini%3F"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm w-full mt-2 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Chat WhatsApp
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
