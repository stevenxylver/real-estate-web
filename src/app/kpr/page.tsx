"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState, useMemo } from "react";

export default function KPRCalculatorPage() {
    const [propertyPrice, setPropertyPrice] = useState<number>(500000000);
    const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
    const [interestRate, setInterestRate] = useState<number>(7.5);
    const [loanTerm, setLoanTerm] = useState<number>(15);

    const calculations = useMemo(() => {
        const downPayment = (propertyPrice * downPaymentPercent) / 100;
        const loanAmount = propertyPrice - downPayment;
        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
        let monthlyPayment = 0;
        if (monthlyInterestRate > 0) {
            monthlyPayment =
                (loanAmount *
                    (monthlyInterestRate *
                        Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
                (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        } else {
            monthlyPayment = loanAmount / numberOfPayments;
        }

        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - loanAmount;

        return {
            downPayment,
            loanAmount,
            monthlyPayment,
            totalPayment,
            totalInterest,
            numberOfPayments,
        };
    }, [propertyPrice, downPaymentPercent, interestRate, loanTerm]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">

                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Kalkulator Cicilan KPR
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Hitung estimasi cicilan KPR bulanan Anda dengan mudah.
                            Sesuaikan harga properti, uang muka, suku bunga, dan
                            tenor sesuai kebutuhan Anda.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-blue-600 dark:text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </span>
                                Detail Pembiayaan
                            </h2>

                            <div className="space-y-6">
                                {/* Property Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Harga Properti
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
                                            Rp
                                        </span>
                                        <input
                                            type="number"
                                            value={propertyPrice}
                                            onChange={(e) =>
                                                setPropertyPrice(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            min="0"
                                            step="10000000"
                                        />
                                    </div>
                                    <input
                                        type="range"
                                        min="100000000"
                                        max="5000000000"
                                        step="50000000"
                                        value={propertyPrice}
                                        onChange={(e) =>
                                            setPropertyPrice(Number(e.target.value))
                                        }
                                        className="w-full mt-3 accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span>Rp 100 Jt</span>
                                        <span>Rp 5 M</span>
                                    </div>
                                </div>

                                {/* Down Payment */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Uang Muka (DP):{" "}
                                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                            {downPaymentPercent}%
                                        </span>
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="50"
                                        step="5"
                                        value={downPaymentPercent}
                                        onChange={(e) =>
                                            setDownPaymentPercent(
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-full accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span>5%</span>
                                        <span>50%</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        Uang Muka:{" "}
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {formatCurrency(calculations.downPayment)}
                                        </span>
                                    </p>
                                </div>

                                {/* Interest Rate */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Suku Bunga per Tahun:{" "}
                                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                            {interestRate}%
                                        </span>
                                    </label>
                                    <input
                                        type="range"
                                        min="3"
                                        max="15"
                                        step="0.25"
                                        value={interestRate}
                                        onChange={(e) =>
                                            setInterestRate(Number(e.target.value))
                                        }
                                        className="w-full accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span>3%</span>
                                        <span>15%</span>
                                    </div>
                                </div>

                                {/* Loan Term */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Jangka Waktu Kredit:{" "}
                                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                            {loanTerm} Tahun
                                        </span>
                                    </label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[5, 10, 15, 20].map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => setLoanTerm(term)}
                                                className={`py-3 rounded-xl font-medium transition-all ${loanTerm === term
                                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                    }`}
                                            >
                                                {term} Thn
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="space-y-6">
                            {/* Monthly Payment Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                                <div className="relative">
                                    <p className="text-blue-100 text-sm mb-2">
                                        Estimasi Cicilan per Bulan
                                    </p>
                                    <p className="text-4xl md:text-5xl font-bold mb-4">
                                        {formatCurrency(calculations.monthlyPayment)}
                                    </p>
                                    <p className="text-blue-200 text-sm">
                                        untuk {loanTerm} tahun ({calculations.numberOfPayments} bulan)
                                    </p>
                                </div>
                            </div>

                            {/* Details Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                    Rincian Pembiayaan
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Harga Properti
                                        </span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {formatCurrency(propertyPrice)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Uang Muka ({downPaymentPercent}%)
                                        </span>
                                        <span className="font-semibold text-green-600 dark:text-green-400">
                                            - {formatCurrency(calculations.downPayment)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Jumlah Pinjaman
                                        </span>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {formatCurrency(calculations.loanAmount)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            Total Bunga
                                        </span>
                                        <span className="font-semibold text-orange-600 dark:text-orange-400">
                                            {formatCurrency(calculations.totalInterest)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-gray-700/50 -mx-8 px-8 rounded-2xl">
                                        <span className="text-gray-900 dark:text-white font-medium">
                                            Total Pembayaran
                                        </span>
                                        <span className="font-bold text-xl text-gray-900 dark:text-white">
                                            {formatCurrency(calculations.totalPayment)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Card */}
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-xl p-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold mb-1">
                                            Butuh konsultasi lebih lanjut?
                                        </p>
                                        <p className="text-green-100 text-sm">
                                            Tim kami siap membantu Anda
                                        </p>
                                    </div>
                                    <a
                                        href="https://wa.me/6281808187943?text=Halo%2C%20saya%20ingin%20konsultasi%20mengenai%20KPR%20untuk%20properti."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-green-600 px-4 py-2 rounded-full font-medium hover:bg-green-50 transition-colors"
                                    >
                                        Chat
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-amber-600 dark:text-amber-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </span>
                            Informasi Penting
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                        Estimasi Saja
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Hasil perhitungan ini hanya estimasi. Cicilan
                                        sebenarnya dapat berbeda tergantung kebijakan bank.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-5 h-5 text-purple-600 dark:text-purple-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                        Suku Bunga
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Suku bunga dapat berubah sesuai kebijakan Bank
                                        Indonesia dan bank pemberi kredit.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-5 h-5 text-green-600 dark:text-green-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                        Biaya Tambahan
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Belum termasuk biaya administrasi, asuransi,
                                        provisi, dan biaya-biaya lainnya.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-5 h-5 text-orange-600 dark:text-orange-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                        Metode Perhitungan
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Menggunakan metode anuitas (cicilan tetap)
                                        selama masa kredit.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}
