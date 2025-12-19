import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Code2, Zap, Shield } from 'lucide-react';
import { STATS } from '../lib/constants';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/30 to-accent-400/30 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -left-20 w-60 h-60 bg-gradient-to-br from-accent-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute -bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-primary-400/20 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-700 shadow-lg mb-8"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {STATS.totalStars}+ Stars on GitHub
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="block text-slate-900 dark:text-white">Hi, I'm</span>
            <span className="block gradient-text">Animesh Kundu</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-slate-600 dark:text-slate-400 font-medium mb-8"
          >
            Full-Stack Developer & Open Source Creator
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Building elegant developer tools that respect privacy and deliver exceptional experiences.
            From diagram editors to network analyzers — all running 100% in your browser.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a href="#projects" className="btn-primary text-lg">
              View Projects
              <ArrowDown className="w-5 h-5" />
            </a>
            <a href="#demos" className="btn-secondary text-lg">
              Try Live Demos
            </a>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700">
              <Code2 className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                TypeScript & React Expert
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Privacy-First Design
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                High-Performance Tools
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-slate-400" />
      </motion.div>
    </section>
  );
}
