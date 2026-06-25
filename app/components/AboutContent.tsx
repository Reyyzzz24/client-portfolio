"use client";

import { motion } from "framer-motion";

interface AboutProps {
  about: {
    photo_url: string;
    desc1: string;
    desc2: string;
    desc3: string;
  };
}

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
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

export default function AboutContent({ about }: AboutProps) {
  return (
    <section
      id="about"
      className="bg-white py-20 px-6 md:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Image */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full h-[400px] md:h-[500px]"
        >
          <motion.img
            src={about.photo_url}
            alt="About Me"
            className="w-full h-full object-cover rounded-[2rem]"
            whileHover={{
              scale: 1.02,
            }}
            transition={{
              duration: 0.4,
            }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="space-y-6"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
          >
            About Me
          </motion.h2>

          <div className="space-y-5 text-gray-600 leading-relaxed">
            <motion.p variants={fadeUp}>
              {about.desc1}
            </motion.p>

            <motion.p variants={fadeUp}>
              {about.desc2}
            </motion.p>

            <motion.p variants={fadeUp}>
              {about.desc3}
            </motion.p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}