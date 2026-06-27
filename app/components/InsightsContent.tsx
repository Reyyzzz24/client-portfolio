"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

export default function InsightsContent() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from("insights_posts").select("*").order("date", { ascending: false });
      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Implementasi Skeleton
  if (loading) {
    return (
      <section className="bg-white py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <Skeleton className="h-52 w-full" />
                <div className="p-6">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-16 w-full mb-5" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-4xl md:text-5xl font-bold text-center mb-16">
          Latest Insights
        </motion.h2>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.article key={post.id} variants={card} whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl">
              <div className="h-52 overflow-hidden">
                <motion.img src={post.image_url} alt={post.title} className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">{formatDate(post.date)}</p>
                <h3 className="text-xl font-bold mb-3 leading-snug">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{post.description}</p>
                <motion.a href={post.read_more_link || "#"} whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="inline-flex items-center gap-2 font-semibold text-sm text-black">
                  Read More <ArrowRight size={16} />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}