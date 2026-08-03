"use client";

import { motion } from "framer-motion";

const particles = [
  { left: "8%", top: "12%", size: 4, duration: 6, delay: 0 },
  { left: "22%", top: "68%", size: 5, duration: 8, delay: 1 },
  { left: "38%", top: "22%", size: 3, duration: 7, delay: 2 },
  { left: "52%", top: "82%", size: 6, duration: 10, delay: 0.5 },
  { left: "64%", top: "35%", size: 4, duration: 9, delay: 1.5 },
  { left: "78%", top: "16%", size: 5, duration: 7, delay: 2.5 },
  { left: "88%", top: "62%", size: 3, duration: 8, delay: 1 },
  { left: "15%", top: "90%", size: 5, duration: 9, delay: 3 },
  { left: "46%", top: "55%", size: 4, duration: 6, delay: 2 },
  { left: "95%", top: "28%", size: 5, duration: 10, delay: 0 },
];

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

      {particles.map((particle, index) => (

        <motion.div
          key={index}
          initial={{
            opacity: 0.2,
            y: 0,
          }}
          animate={{
            opacity: [0.15, 0.7, 0.15],
            y: [-25, 25, -25],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-cyan-300/40 shadow-[0_0_12px_rgba(34,211,238,.6)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
        />

      ))}

    </div>
  );
}