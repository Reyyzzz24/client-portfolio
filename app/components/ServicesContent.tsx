"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Skeleton from "./ui/Skeleton";

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ServicesContent() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("services_data").select("*").order("id");
      if (data) setServices(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-50 py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mx-auto mb-16" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-8 rounded-3xl flex flex-col items-center">
                <Skeleton className="h-16 w-16 rounded-2xl mb-6" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="bg-slate-50 py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl font-bold text-center mb-16">
          What I Do
        </motion.h2>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const IconComponent = Icons[service.icon_name as keyof typeof Icons] as LucideIcon | undefined;
            return (
              <motion.div key={service.id} variants={card} whileHover={{ y: -4 }} transition={{ duration: 0.25 }} className="group bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl flex flex-col items-center text-center">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.25 }} className="bg-black p-4 rounded-2xl mb-6">
                  {IconComponent && <IconComponent size={32} color="white" />}
                </motion.div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}