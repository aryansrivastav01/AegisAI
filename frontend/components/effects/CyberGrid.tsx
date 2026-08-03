"use client";

import { motion } from "framer-motion";

export default function CyberGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.18,
        backgroundPosition: [
          "0px 0px",
          "0px 120px",
        ],
      }}
      transition={{
        opacity: {
          duration: 1.2,
        },
        backgroundPosition: {
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        },
      }}
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(circle at center, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, black 40%, transparent 100%)",
      }}
    />
  );
}