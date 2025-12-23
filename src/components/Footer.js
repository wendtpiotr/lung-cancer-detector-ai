"use client"
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-950 text-white text-center py-10 mt-0 relative overflow-hidden font-light">
            {/* Line Spacer */}
            <div className="w-24 h-1 bg-white mx-auto rounded-full mb-6 opacity-50"></div>

            {/* Navigation Links with motion */}
            <motion.div
                className="flex flex-col md:flex-row justify-center items-center gap-6 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <a href="/" className="hover:underline">Home</a>
                <a href="/upload" className="hover:underline">Upload</a>
                <a
                    href="https://github.com/wendtpiotr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    GitHub
                </a>
            </motion.div>

            {/* Footer Text with subtle fade-in */}
            <motion.p
                className="text-sm md:text-base opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                &copy; {new Date().getFullYear()} PulmoScan.io — Developed by Piotr Wendt
            </motion.p>
        </footer>
    );
}
