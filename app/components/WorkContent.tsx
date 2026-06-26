"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Skeleton from "./ui/Skeleton";

export default function WorkContent() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("portfolio_projects").select("*").order("id");
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-8">
              <Skeleton className="h-64 w-full mb-6 rounded-2xl" />
              <Skeleton className="h-8 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section id="portfolio" className="bg-slate-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16">
          Featured Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-64 w-full overflow-hidden">
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">{project.category}</span>
                </div>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{project.description}</p>
                <a href={project.project_link || "#"} className="text-black font-semibold flex items-center hover:underline">
                  View Project →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}