'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroNavbar() {
  const [activeItem, setActiveItem] = useState('Home');

  const navItems = ['Home', 'Services', 'Projects', 'About', 'Blog'];

  return (
    <motion.nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="px-2 py-2 rounded-full bg-[#05060F]/80 backdrop-blur-xl border border-white/10 flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item}
            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            onClick={() => setActiveItem(item)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeItem === item
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item}
          </Link>
        ))}
        
        <div className="w-px h-6 bg-white/10 mx-2" />
        
        <Link
          href="/contact"
          className="px-5 py-2 rounded-full bg-[#3B5BFF] text-white text-sm font-medium hover:bg-[#3B5BFF]/80 transition-all duration-300 flex items-center gap-2"
        >
          Contact Us
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.nav>
  );
}
