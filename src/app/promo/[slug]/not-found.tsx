import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function PromoNotFound() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        Promo Tidak Ditemukan
                    </h1>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Maaf, promo yang Anda cari tidak tersedia atau sudah berakhir.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Home
                    </Link>
                </div>
            </main>
        </>
    );
}
