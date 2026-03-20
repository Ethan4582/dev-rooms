"use client";

import { motion } from "framer-motion";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[400px]">
      <div className="relative w-24 h-24">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 border-t-2 border-r-2 border-primary/40 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner reverse rotating ring */}
        <motion.div
          className="absolute inset-3 border-b-2 border-l-2 border-tertiary/40 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center pulsing core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(78,222,163,0.8)]"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <motion.p 
          className="font-headline text-[10px] uppercase tracking-[0.4em] text-primary font-bold"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Initializing_Systems
        </motion.p>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-surface-container-highest border border-outline-variant/30"
              animate={{ 
                backgroundColor: ["#252626", "#4edea3", "#252626"],
                borderColor: ["#484848", "#4edea3", "#484848"]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
