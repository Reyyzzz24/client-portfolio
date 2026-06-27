"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Skeleton from "./ui/Skeleton";

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function AboutContent() {
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("about_data").select("*").single();
      if (data) setAbout(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading || !about) {
    return (
      <section id="about" className="bg-white py-20 px-6 md:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Skeleton className="w-full h-[400px] md:h-[500px] rounded-[2rem]" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-1/2" />
            <div className="space-y-5">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="bg-white py-20 px-6 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="w-full h-[400px] md:h-[500px]">
          <motion.img src={about.photo_url} alt="About Me" className="w-full h-full object-cover rounded-[2rem]" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} />
        </motion.div>

        {/* Content */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="space-y-6">
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            About Me
          </motion.h2>

          <div className="space-y-5 text-gray-600 leading-relaxed">
            <motion.p variants={fadeUp}>{about.description_1}</motion.p>
            <motion.p variants={fadeUp}>{about.description_2}</motion.p>
            <motion.p variants={fadeUp}>{about.description_3}</motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}