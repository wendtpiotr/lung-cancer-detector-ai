"use client";

import { Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    const listVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: .5, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <nav className="fixed backdrop-blur-2xl top-0 left-0 z-50 w-full h-24 md:h-32 flex justify-center items-center px-6">
            <motion.ul
                className="w-full md:w-3/4 lg:w-1/2 h-full flex justify-between items-center"
                variants={listVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.section
                    className="flex justify-start items-center"
                    variants={itemVariants}
                >
                    <a href="/" className="text-2xl md:text-4xl font-light text-white whitespace-nowrap">
                        PulmoScan.io
                    </a>
                </motion.section>

                <motion.section
                    className="flex justify-end items-center gap-4 md:gap-8 text-lg md:text-2xl font-thin text-white"
                    variants={itemVariants}
                >
                    <motion.a
                        href="https://www.kaggle.com/"
                        target="_blank"
                        className="transition-opacity duration-200"
                        variants={itemVariants}
                        whileHover={{ opacity: 1 }}
                        initial={{ opacity: 0.5 }}
                    >
                        Tech
                    </motion.a>
                    <motion.a
                        href="https://github.com/wendtpiotr"
                        target="_blank"
                        className="flex items-center gap-2 transition-opacity duration-200"
                        variants={itemVariants}
                        whileHover={{ opacity: 1 }}
                        initial={{ opacity: 0.5 }}
                    >
                        <Github size={20} className="md:w-6 md:h-6" /> <span className="hidden xs:inline">GitHub</span>
                    </motion.a>
                </motion.section>
            </motion.ul>
        </nav>
    );
}