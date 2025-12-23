"use client";

import { Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    // Variants for staggered animation
    const listVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: .5, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <nav className="fixed backdrop-blur-2xl top-0 left-0 z-20 w-full h-32 flex justify-center items-center">
            <motion.ul
                className="w-1/2 h-full flex justify-between items-center"
                variants={listVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.section
                    className="w-1/4 h-full flex justify-start items-center"
                    variants={itemVariants}
                >
                    <a href="/" className="text-4xl font-light text-white">
                        PulmoScan.io
                    </a>
                </motion.section>

                <motion.section
                    className="w-3/4 h-full flex justify-end items-center gap-8 text-2xl font-thin text-white"
                    variants={itemVariants}
                >
                    <motion.a
                        href="https://project-monai.github.io/"
                        target="_blank"
                        className="transition-opacity duration-200"
                        variants={itemVariants}
                        whileHover={{ opacity: 1 }}
                        initial={{ opacity: 0.5 }}
                    >
                        Technology
                    </motion.a>
                    <motion.a
                        href="https://github.com/wendtpiotr"
                        target="_blank"
                        className="flex items-center gap-2 transition-opacity duration-200"
                        variants={itemVariants}
                        whileHover={{ opacity: 1 }}
                        initial={{ opacity: 0.5 }}
                    >
                        <Github size={24} /> GitHub
                    </motion.a>
                </motion.section>
            </motion.ul>
        </nav>
    );
}
