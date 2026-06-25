"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard, User, Briefcase, Workflow, Layers,
    BarChart3, MessageSquare, Lightbulb, PanelLeftOpen, PanelLeftClose, Settings, LogOut
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const menuItems = [
    { name: "Hero", icon: LayoutDashboard },
    { name: "About", icon: User },
    { name: "Services", icon: Briefcase },
    { name: "Process", icon: Workflow },
    { name: "Works", icon: Layers },
    { name: "Stat", icon: BarChart3 },
    { name: "Testimonials", icon: MessageSquare },
    { name: "Insights", icon: Lightbulb },
    { name: "Footer", icon: Settings },
];

export default function Sidebar({ activeItem, setActiveItem, isOpen, setIsOpen, user }: any) {

    const [showLogout, setShowLogout] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/auth/login';
    };

    return (
        <motion.aside
            layout
            animate={{ width: isOpen ? 256 : 80 }}
            transition={{ duration: 0.3 }}
            className="h-screen bg-zinc-50 p-4 flex flex-col border-r border-zinc-200 rounded-3xl overflow-hidden"
        >
            <div className="relative h-12 mb-8 flex items-center justify-between">
                {isOpen && <h2 className="text-lg font-semibold">Admin Page</h2>}
                <button onClick={() => setIsOpen(!isOpen)} className="p-2.5 rounded-xl text-zinc-500 hover:bg-white">
                    {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                </button>
            </div>

            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        onClick={() => setActiveItem(item.name)}
                        className={`group flex items-center p-3 rounded-2xl cursor-pointer ${activeItem === item.name ? "bg-black text-white" : "text-zinc-500 hover:bg-white hover:text-zinc-900"}`}
                    >
                        <item.icon className="w-5 h-5 shrink-0" />
                        {isOpen && <span className="ml-4 text-sm font-medium">{item.name}</span>}
                    </div>
                ))}
                <div className="relative bg-white rounded-2xl border border-zinc-200 mt-55">
                    <button
                        onClick={() => setShowLogout(!showLogout)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-zinc-50 rounded-xl transition-all"
                    >
                        <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-white shrink-0">
                            <User size={16} />
                        </div>
                        {isOpen && (
                            <div className="text-left overflow-hidden">
                                <p className="text-xs font-bold text-zinc-900 truncate">{user?.full_name || "Memuat..."}</p>
                                <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
                            </div>
                        )}
                    </button>

                    {showLogout && (
                        <div
                            onMouseLeave={() => setShowLogout(false)}
                            className="absolute bottom-full left-0 mb-2 w-full bg-white border border-zinc-200 rounded-2xl shadow-xl p-2 z-50"
                        >
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </motion.aside>
    );
}