"use client";

import { useState, useEffect } from "react";
import { getContactInfo, ContactInfo } from "@/lib/strapi";

export default function MapSection() {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

    useEffect(() => {
        async function fetchContactInfo() {
            const info = await getContactInfo();
            setContactInfo(info);
        }
        fetchContactInfo();
    }, []);

    return (
        <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 items-center">
                    {/* Left - Map */}
                    <div className="w-full lg:w-2/3">
                        <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
                            {/* Google Maps Embed */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8!2d106.7032821!3d-6.2760967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbf85472eacf%3A0xa2b43db4087a9005!2sNew%20Marketing%20Gallery%20Bintaro%20Jaya!5e0!3m2!1sen!2sid!4v1702800000000!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Right - Specialist Card */}
                    <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
                        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl max-w-sm w-full text-center">
                            {/* Decorative Background */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-50 blur-xl"></div>
                                </div>
                                {/* Profile Image */}
                                <div className="relative w-24 h-24 mx-auto">
                                    <img
                                        src={contactInfo?.image || "/Liendra2.png"}
                                        alt={contactInfo?.name || "Specialist"}
                                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>
                            </div>

                            {/* Name & Title */}
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                                {contactInfo?.name || "Support Specialist"}
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                {contactInfo?.title || "Customer Support"}
                            </p>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                Give your property a new lease of life with our innovative solutions.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-center gap-3">
                                {/* Call Schedule Button */}
                                <a
                                    href={contactInfo?.nophone ? `https://wa.me/${contactInfo.nophone.replace(/\D/g, '')}` : "https://wa.me/6281808187943"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                                >
                                    Create Schedule
                                </a>

                                {/* Message Button */}
                                <a
                                    href={contactInfo?.email ? `mailto:${contactInfo.email}` : "mailto:info@bintarojaya.com"}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-xl transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
