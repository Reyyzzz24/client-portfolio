"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function AnimatedNumber({ value }: { value: string }) {
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numericValue]);

  return <>{count}{suffix}</>;
}

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function StatContent() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("stats_data").select("*").order("id");
      if (data) setStats(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return null;

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat) => (
          <motion.div key={stat.id} variants={item} className="flex flex-col items-center">
            <div className="text-5xl md:text-6xl font-bold text-black mb-3">
              <AnimatedNumber value={stat.value} />
            </div>
            <div className="text-gray-500 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}