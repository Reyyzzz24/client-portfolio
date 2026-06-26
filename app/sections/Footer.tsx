"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Globe } from "lucide-react";

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.from("social_links").select("*");
      if (data) setSocialLinks(data);
    }
    fetchData();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "FaLinkedin": return <FaLinkedin size={24} />;
      case "FaInstagram": return <FaInstagram size={24} />;
      case "FaGithub": return <FaGithub size={24} />;
      case "Globe": return <Globe size={24} />;
      default: return null;
    }
  };

  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex gap-6 mb-8">
          {socialLinks.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
              {getIcon(link.icon_type)}
            </a>
          ))}
        </div>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Gherryan Washesya Syagara. All rights reserved.
        </p>
      </div>
    </footer>
  );
}