"use client";

import { motion } from "framer-motion";

interface HeroProps {
    hero: {
        title: string;
        subtitle: string;
        description: string;
        photo_url: string;
    };
    companies: any[];
}

const container = {
    hidden: {},
    show: {
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.15,
        },
    },
};

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

export default function HeroContent({
    hero,
    companies,
}: HeroProps) {
    return (
        <>
            <section className="bg-white py-20 px-6 md:px-8 overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16">

                    {/* Content */}
                    <motion.div
                        className="md:w-1/2"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.h1
                            variants={fadeUp}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-5"
                        >
                            {hero.title}
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="text-xl text-gray-600 mb-5"
                        >
                            {hero.subtitle}
                        </motion.p>

                        <motion.p
                            variants={fadeUp}
                            className="text-gray-500 leading-relaxed max-w-lg mb-10"
                        >
                            {hero.description}
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="flex flex-wrap gap-4"
                        >
                            <button className="bg-black text-white px-6 py-3 rounded-full font-medium transition-colors hover:bg-neutral-800">
                                View Portfolio
                            </button>

                            <button className="border border-gray-300 px-6 py-3 rounded-full font-medium transition-colors hover:bg-gray-50">
                                Hire Me
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.97,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            delay: 0.45,
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-[320px] md:w-[400px] h-[420px] md:h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                    >
                        <motion.img
                            src={hero.photo_url}
                            alt={hero.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.div>
                </div>
            </section>

            <section className="bg-black text-white py-14">
                <div className="max-w-6xl mx-auto px-6">
                    <p className="text-center text-sm tracking-[0.2em] uppercase text-gray-500 mb-10">
                        Trusted by leading companies
                    </p>

                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
                        {companies?.map((company) => (
                            <span
                                key={company.id}
                                className="text-xl md:text-2xl font-semibold opacity-80"
                            >
                                {company.name}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}