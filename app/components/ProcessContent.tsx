"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const icon = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

export default function ProcessContent() {
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("process_data").select("*").order("id");
      if (data) setSteps(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return null;

  return (
    <section id="process" className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }} className="text-4xl md:text-5xl font-bold text-center mb-20">
          My Process
        </motion.h2>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4">
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: "left" }} className="hidden md:block absolute top-[40px] left-0 w-full h-[1px] bg-gray-200 -z-0" />

          {steps.map((step) => {
            const IconComponent = (Icons as any)[step.icon_name];
            return (
              <motion.div key={step.id} variants={item} className="relative z-10 flex flex-col items-center text-center w-full md:w-1/5">
                <motion.div variants={icon} className="bg-black p-5 rounded-full mb-6">
                  {IconComponent && <IconComponent size={24} color="white" />}
                </motion.div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[150px]">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}