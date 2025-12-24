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
        <section className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 md:py-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white text-center mb-8 sm:mb-12 leading-tight">
                    <span className="sm:hidden">Hubungi Tim Kami</span>
                    <span className="hidden sm:inline">Temukan Lokasi Kami dan Hubungi Tim Kami</span>
                </h2>

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
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-gray-900/50 max-w-sm w-full text-center">
                            {/* Decorative Background */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 dark:from-green-900 dark:to-green-800 rounded-full opacity-50 blur-xl"></div>
                                </div>
                                {/* Profile Image */}
                                <div className="relative w-24 h-24 mx-auto">
                                    <img
                                        src={contactInfo?.image || "/Liendra2.png"}
                                        alt={contactInfo?.name || "Specialist"}
                                        className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                                    />
                                </div>
                            </div>

                            {/* Name & Title */}
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {contactInfo?.name || "Support Specialist"}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                {contactInfo?.title || "Customer Support"}
                            </p>

                            {/* Description */}
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
                                Siap membantu Anda menemukan hunian terbaik dengan solusi tepat dan proses yang mudah.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-center gap-3">
                                {/* Call Schedule Button */}
                                <a
                                    href="/contact"
                                    className="flex-1 bg-green-100 dark:bg-green-900/50 hover:bg-green-200 dark:hover:bg-green-800/50 text-green-700 dark:text-green-400 font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                                >
                                    Buat Janji Konsultasi
                                </a>

                                {/* WhatsApp Button */}
                                <a
                                    href={contactInfo?.nophone ? `https://wa.me/${contactInfo.nophone.replace(/\D/g, '')}?text=Halo%2C%20mau%20tanya%20info%20rumah%20yang%20tersedia.%0AApakah%20masih%20ada%20unit%20dan%20promo%20saat%20ini%3F` : "https://wa.me/6281808187943?text=Halo%2C%20mau%20tanya%20info%20rumah%20yang%20tersedia.%0AApakah%20masih%20ada%20unit%20dan%20promo%20saat%20ini%3F"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
