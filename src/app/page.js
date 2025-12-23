"use client";

import Image from "next/image";
import {motion} from "framer-motion";
import FullBodyXRay from "@/assets/full-body-x-ray-noise.png";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // import at the top


export default function Home() {
    return (
        <>
            {/* Navbar */}
            <Navbar/>
            <section className="relative w-full h-screen bg-gray-950 overflow-hidden text-white">
                <motion.div
                    className="absolute -bottom-1/5 -left-1/7 w-1/3 h-full rounded-xl -rotate-45 bg-gradient-to-r from-orange-600 via-yellow-400 to-blue-500 opacity-25 blur-3xl z-0"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.7, 0.5],
                        x: [0, -20, 0], // subtle horizontal movement
                        y: [0, -10, 0], // subtle vertical movement
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                {/* Full body X-Ray background */}
                <Image
                    src={FullBodyXRay}
                    alt="Full Body X Ray"
                    className="absolute bottom-0 right-0 mx-auto z-10 w-1/2"
                />

                {/* Centered Slogan + CTA */}
                <div className="w-full h-full z-20 flex flex-col justify-center items-center text-center px-4">
                    <motion.h1
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1, ease: "easeOut"}}
                        className="text-6xl md:text-8xl font-light"
                    >
                        Detect Lung Cancer Early
                    </motion.h1>
                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1, delay: 0.5, ease: "easeOut"}}
                        className="mt-6 text-xl md:text-2xl opacity-70 font-thin"
                    >
                        Advanced AI-powered analysis for your scans.
                    </motion.p>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1, delay: 1, ease: "easeOut"}}
                        className="mt-12 z-10"
                    >
                        <Link
                            href="/upload"
                            className="px-8 py-4 w-full h-full bg-gradient-to-r from-orange-600 via-yellow-400 to-blue-500 opacity-50 hover:opacity-100 rounded-full text-white text-xl font-thin shadow-lg hover:scale-105 transition-all duration-300"
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
