import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Lock, Gauge } from 'lucide-react';
import { STATS } from '../lib/constants';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#faf8f5] dark:bg-dark-bg-base">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} 
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32 relative z-10">
        <div className="max-w-4xl">
          {/* Status badge - understated */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 dark:bg-[#2a2a2a] rounded text-sm text-primary-700 dark:text-dark-primary font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            {STATS.totalStars}+ stars on GitHub
          </motion.div>

          {/* Main heading - editorial style */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1a1814] dark:text-dark-text-primary mb-6 leading-[1.1]"
          >
            I build tools that
            <br />
            <span className="gradient-text">developers love</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#1a1814]/60 dark:text-dark-text-secondary max-w-xl mb-10 leading-relaxed"
          >
            Full-stack developer crafting privacy-first web applications. 
            From diagram editors to network analyzers, all running entirely in your browser.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a href="#projects" className="btn-primary">
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#demos" className="btn-secondary">
              Try Live Demos
            </a>
          </motion.div>

          {/* Feature list - minimal style */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-6 text-sm text-[#1a1814]/50 dark:text-[#a0a0a0]"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>TypeScript & React</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Privacy-first</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              <span>High performance</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side accent - geometric element */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-gradient-to-b from-primary-400 to-accent-500" />
    </section>
  );
}
