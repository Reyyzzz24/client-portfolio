"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.2,
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

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-slate-50 py-20 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.3,
          }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Let's Work Together
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="
              text-gray-500
              mb-12
              max-w-lg
              mx-auto
              leading-relaxed
            "
          >
            Ready to bring your next project to life?
            I'd love to hear about your ideas and
            discuss how we can create something
            amazing together.
          </motion.p>

          {/* Form */}
          <motion.div
            variants={fadeUp}
            whileHover={{
              y: -2,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              bg-white
              p-8
              md:p-12
              rounded-3xl
              border
              border-gray-100
              shadow-sm
            "
          >
            <motion.form
              variants={container}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <motion.input
                  variants={fadeUp}
                  type="text"
                  placeholder="Your Name"
                  whileFocus={{
                    scale: 1.01,
                  }}
                  className="
                    w-full
                    bg-gray-50
                    border
                    border-gray-100
                    p-4
                    rounded-xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-black
                    transition-all
                  "
                />

                <motion.input
                  variants={fadeUp}
                  type="email"
                  placeholder="Your Email"
                  whileFocus={{
                    scale: 1.01,
                  }}
                  className="
                    w-full
                    bg-gray-50
                    border
                    border-gray-100
                    p-4
                    rounded-xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-black
                    transition-all
                  "
                />
              </div>

              <motion.textarea
                variants={fadeUp}
                placeholder="Tell me about your project..."
                rows={5}
                className="
                  w-full
                  bg-gray-50
                  border
                  border-gray-100
                  p-4
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black
                  transition-all
                "
              />

              <motion.button
                variants={fadeUp}
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                className="
                  w-full
                  bg-black
                  text-white
                  py-4
                  rounded-xl
                  font-semibold
                  hover:bg-neutral-800
                  transition-colors
                "
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}