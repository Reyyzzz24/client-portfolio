"use client";

import { motion } from "framer-motion";

export default function WorkContent({ projects }: { projects: any[] }) {
  return (
    <section id="portfolio" className="bg-slate-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Featured Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects?.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Gambar Proyek */}
              <div className="h-64 w-full overflow-hidden">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Detail Proyek */}
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                <a 
                  href={project.project_link || "#"} 
                  className="text-black font-semibold flex items-center hover:underline"
                >
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