"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.match(/image\/(png|jpg|jpeg)/)) {
                setError("Please upload a valid microscopic image (PNG, JPG)");
                return;
            }
            setSelectedFile(file);
            setError(null);
            setResult(null);

            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
        // 1. Pobieramy URL i usuwamy ewentualny ukośnik na końcu, jeśli go dopisałeś w Vercelu
let baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://wendtpiotr-lung-tissue-ai.hf.space";
baseUrl = baseUrl.replace(/\/$/, "");

const response = await fetch(`${baseUrl}/analyze`, {
    method: "POST",
    body: formData,
});


        // 3. Obsługa błędów z informacją zwrotną z serwera
        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(`Analysis failed (${response.status}). ${errorMsg.slice(0, 50)}`);
        }

        const data = await response.json();
        setResult(data);

    } catch (err) {
        console.error("Upload error:", err);
        setError(err.message || "Connection error");
    } finally {
        setLoading(false);
    }
};

    const riskStyles = {
        low: { color: "text-green-400", label: "Healthy / Benign", bg: "bg-green-500/10" },
        medium: { color: "text-yellow-400", label: "Atypical Cells", bg: "bg-yellow-500/10" },
        high: { color: "text-red-400", label: "Malignant / Cancerous", bg: "bg-red-500/10" }
    };

    const currentRisk = result ? riskStyles[result.risk_level] || riskStyles.low : null;

    return (
        <div className="min-h-screen bg-[#030712] text-white">
            <Navbar />

            <section className="relative pt-32 md:pt-48 pb-20 px-4 md:px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10 overflow-hidden">
                    <div className="absolute top-[-5%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-12 md:mb-16">
                        <motion.span className="px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                            AI Histopathology Laboratory
                        </motion.span>
                        <motion.h1 className="text-3xl md:text-6xl font-bold mt-6 mb-4 leading-tight">
                            Lung Tissue Diagnostics
                        </motion.h1>
                        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                            Upload lung biopsy tissue slides for automated cell malignancy detection and visual heat-mapping.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                        {/* Upload Column */}
                        <motion.div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-8">
                            <h2 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-cyan-500 rounded-full" />
                                Tissue Sample Upload
                            </h2>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className={`border-2 border-dashed rounded-2xl p-4 md:p-8 text-center cursor-pointer transition-all duration-300
                                    ${preview ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-gray-700 hover:border-gray-500 hover:bg-gray-800/30'}`}
                            >
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                                {preview ? (
                                    <img src={preview} alt="Preview" className="max-h-64 md:max-h-80 mx-auto rounded-lg shadow-2xl object-contain" />
                                ) : (
                                    <div className="py-10 md:py-16">
                                        <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                        <p className="text-gray-300 font-medium">Select a biopsy slide</p>
                                        <p className="text-[10px] text-gray-500 mt-2 uppercase">PNG/JPG only</p>
                                    </div>
                                )}
                            </div>

                            {selectedFile && !loading && (
                                <button onClick={handleUpload} className="w-full mt-6 md:mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:scale-[1.01] active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/20">
                                    Analyze Cellular Structure
                                </button>
                            )}
                        </motion.div>

                        {/* Results Column */}
                        <motion.div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-8">
                            <h2 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-indigo-500 rounded-full" />
                                Diagnostic Report
                            </h2>
                            <AnimatePresence mode="wait">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                                        <p className="text-cyan-400 text-sm animate-pulse">Scanning...</p>
                                    </div>
                                ) : result ? (
                                    <div className="space-y-6">
                                        <div className="relative group">
                                            <img src={result.heatmap} alt="AI Analysis" className="w-full rounded-xl border border-gray-700 shadow-lg" />
                                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[8px] font-bold text-white uppercase border border-white/10">
                                                AI Heatmap
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="bg-gray-800/30 p-4 rounded-2xl border border-gray-700/50">
                                                <p className="text-gray-500 text-[10px] font-black uppercase">Malignancy Prob.</p>
                                                <p className="text-2xl md:text-3xl font-bold">{result.probability}%</p>
                                            </div>
                                            <div className={`${currentRisk.bg} p-4 rounded-2xl border border-current/10`}>
                                                <p className="text-gray-500 text-[10px] font-black uppercase">Risk Level</p>
                                                <p className={`text-lg md:text-xl font-bold ${currentRisk.color}`}>{currentRisk.label}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-24 text-gray-700">
                                        <p className="text-sm">Awaiting tissue sample...</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
