"use client";

import Image from "next/image";
import {motion} from "framer-motion";
import FullBodyXRay from "@/assets/full-body-x-ray-noise.png";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Navbar/>
            <section className="relative w-full h-screen bg-gray-950 overflow-hidden text-white flex flex-col justify-center">
                {/* Background Glow */}
                <motion.div
                    className="absolute -bottom-1/4 -left-1/4 w-[200%] md:w-1/3 h-full rounded-xl -rotate-45 bg-gradient-to-r from-orange-600 via-yellow-400 to-blue-500 opacity-20 blur-3xl z-0"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* X-Ray Image - Adjusted for mobile */}
                <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-2/3 md:h-full z-10 opacity-40 md:opacity-100 pointer-events-none">
                    <Image
                        src={FullBodyXRay}
                        alt="Full Body X Ray"
                        fill
                        className="object-contain object-bottom md:object-right-bottom"
                        priority
                    />
                </div>

                {/* Main Content */}
                <div className="container mx-auto z-20 flex flex-col items-center text-center px-6">
                    <motion.h1
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1}}
                        className="text-4xl sm:text-6xl md:text-8xl font-light leading-tight"
                    >
                        Detect Lung <br className="hidden md:block" /> Cancer Early
                    </motion.h1>

                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1, delay: 0.5}}
                        className="mt-6 text-lg md:text-2xl opacity-70 font-thin max-w-xl"
                    >
                        Advanced AI-powered analysis for your scans. Professional histopathology insights in seconds.
                    </motion.p>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1, delay: 1}}
                        className="mt-10"
                    >
                        <Link
                            href="/upload"
                            className="inline-block px-10 py-4 bg-gradient-to-r from-orange-600/60 via-yellow-400/60 to-blue-500/60 hover:from-orange-600 hover:to-blue-500 rounded-full text-white text-lg md:text-xl font-light shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/10"
                        >
                            Check Your Scan
                        </Link>
                    </motion.div>
                </div>
            </section>
            <Footer/>
        </>
    );
}