'use client';

import { motion } from 'framer-motion';

export function GlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Planet Horizon Glow */}
      <motion.div
        className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[120%] h-[100%]"
        animate={{
          opacity: [0.6, 0.8, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Main glow circle */}
        <div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,#3B5BFF_0%,transparent_50%)]"
        />
        
        {/* Electric blue rim */}
        <div
          className="absolute inset-0 rounded-full border-t-[100px] border-[#3B5BFF]/30 blur-3xl"
        />
        
        {/* Soft bloom */}
        <div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,#3B5BFF_0%,transparent_40%)] blur-3xl opacity-50"
        />
      </motion.div>
    </div>
  );
}
