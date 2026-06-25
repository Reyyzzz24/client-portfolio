"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsClient({
  testimonials,
}: {
  testimonials: any[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials?.length) {
    return (
      <div className="text-center text-gray-500 py-12">
        Belum ada testimoni.
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full">
      <div className="relative min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              bg-white
              p-12
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              text-center
            "
          >
            {/* Avatar */}
            <motion.img
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.1,
                duration: 0.4,
              }}
              whileHover={{
                scale: 1.05,
              }}
              src={
                currentTestimonial.avatar_url ||
                "/placeholder-avatar.png"
              }
              alt={
                currentTestimonial.name ||
                "Testimonial"
              }
              className="
                w-16
                h-16
                rounded-full
                mx-auto
                mb-6
                object-cover
                bg-gray-200
              "
            />

            {/* Quote */}
            <motion.p
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.4,
              }}
              className="
                text-gray-700
                text-lg
                italic
                mb-8
                leading-relaxed
                max-w-3xl
                mx-auto
              "
            >
              "{currentTestimonial.quote}"
            </motion.p>

            {/* Name */}
            <motion.h4
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
              }}
              className="font-bold text-lg"
            >
              {currentTestimonial.name}
            </motion.h4>

            {/* Role */}
            <motion.p
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
              }}
              className="text-gray-500 text-sm"
            >
              {currentTestimonial.role}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">

        <motion.button
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={prevSlide}
          className="
            p-3
            rounded-full
            border
            border-gray-200
            hover:bg-black
            hover:text-white
            transition-colors
          "
        >
          <ChevronLeft size={20} />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                h-2 rounded-full transition-all
                ${
                  currentIndex === index
                    ? "w-8 bg-black"
                    : "w-2 bg-gray-300"
                }
              `}
              whileHover={{
                scale: 1.2,
              }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={nextSlide}
          className="
            p-3
            rounded-full
            border
            border-gray-200
            hover:bg-black
            hover:text-white
            transition-colors
          "
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}