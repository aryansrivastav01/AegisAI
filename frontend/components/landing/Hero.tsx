"use client";

import { motion } from "framer-motion";

import HeroBadge from "./hero/HeroBadge";
import HeroHeadline from "./hero/HeroHeadline";
import HeroActions from "./hero/HeroActions";
import HeroTrust from "./hero/HeroTrust";
import HeroStats from "./hero/HeroStats";
import HeroDashboard from "./hero/HeroDashboard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">

      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-0 top-20 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute right-0 top-24 h-[480px] w-[480px] rounded-full bg-blue-600/10 blur-[160px]" />

      </div>

      <div className="section grid items-center gap-14 px-6 xl:grid-cols-[1fr_1.05fr]">

        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-2xl"
        >

          <HeroBadge />

          <HeroHeadline />

          <HeroActions />

          <HeroTrust />

          <HeroStats />

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
          }}
          className="relative flex justify-center xl:justify-end"
        >

          {/* Floating Dashboard */}

          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full max-w-[700px]"
          >

            <HeroDashboard />

          </motion.div>

          {/* Glow */}

          <div className="absolute inset-0 -z-10 rounded-full bg-cyan-500/10 blur-[120px]" />

        </motion.div>

      </div>

    </section>
  );
}