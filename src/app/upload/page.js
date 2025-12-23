"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {motion} from "framer-motion";

export default function UploadPage() {

    return (
        <>
            <Navbar/>
            <section className="relative w-full h-screen bg-gray-950 overflow-hidden text-white">
                <motion.div
                    className="absolute -bottom-1/5 -right-1/7 w-1/3 h-full rounded-xl rotate-45 bg-gradient-to-r from-cyan-400 via-orange-500 to-green-600 opacity-25 blur-3xl z-0"
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
            </section>
            <Footer/>
        </>

    );
}