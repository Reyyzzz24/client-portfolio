"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menus = ['Home', 'About', 'Services', 'Process', 'Portfolio', 'Testimonials', 'Contact'];

    return (
        <nav className="bg-white py-6 px-4 md:px-8 relative z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">GWS</h1>

                <div className="hidden md:flex items-center gap-8">
                    {menus.map((menu, index) => (
                        <a key={menu} href={`#${menu.toLowerCase()}`} className={`text-sm transition ${index === 0 ? 'bg-black text-white px-5 py-2 rounded-full' : 'text-gray-600 hover:text-black'}`}>
                            {menu}
                        </a>
                    ))}
                </div>

                <button 
                    className="md:hidden p-2" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="space-y-1.5">
                        <span className={`block w-6 h-0.5 bg-black transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-black transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-black transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </div>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-white md:hidden rounded-3xl shadow-lg"
                    >
                        <div className="flex flex-col p-4 gap-4 justify-center">
                            {menus.map((menu) => (
                                <a 
                                    key={menu} 
                                    href={`#${menu.toLowerCase()}`} 
                                    className="text-gray-600 hover:text-black py-2 border-b border-zinc-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {menu}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;