import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Lock, Gauge } from 'lucide-react';
import { FEATURED_PROJECTS, STATS } from '../lib/constants';

const heroProjects = FEATURED_PROJECTS.filter((project) => project.featured).slice(0, 3);

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[min(920px,100svh)] items-center overflow-hidden bg-[#faf8f5] pt-20 dark:bg-dark-bg-base">
      <div className="hero-grid absolute inset-0 -z-20" />
      <div className="absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-primary-300/25 blur-3xl dark:bg-primary-700/10" />
      <div className="absolute -right-28 bottom-0 -z-10 h-96 w-96 rounded-full bg-accent-300/20 blur-3xl dark:bg-accent-800/15" />

      <div className="container relative z-10 mx-auto px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:gap-12 xl:gap-20">
          <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-700 shadow-sm backdrop-blur dark:border-primary-900/60 dark:bg-white/5 dark:text-dark-primary"
          >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            {STATS.totalStars}+ stars on GitHub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 text-[clamp(3.6rem,6.2vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-[#1a1814] dark:text-dark-text-primary"
          >
            I build tools that
            <br />
            <span className="gradient-text">developers love</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10 max-w-2xl text-lg leading-relaxed text-[#1a1814]/65 dark:text-dark-text-secondary sm:text-xl"
          >
              Full-stack developer crafting privacy-first web applications.
            From diagram editors to network analyzers, all running entirely in your browser.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <a href="#projects" className="btn-primary">
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#demos" className="btn-secondary">
              Try Live Demos
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-3 text-sm text-[#1a1814]/55 dark:text-[#a0a0a0]"
          >
              <div className="flex items-center gap-2 rounded-full border border-[#1a1814]/10 bg-white/55 px-3 py-2 dark:border-white/10 dark:bg-white/5">
              <Terminal className="w-4 h-4" />
              <span>TypeScript & React</span>
            </div>
              <div className="flex items-center gap-2 rounded-full border border-[#1a1814]/10 bg-white/55 px-3 py-2 dark:border-white/10 dark:bg-white/5">
              <Lock className="w-4 h-4" />
              <span>Privacy-first</span>
            </div>
              <div className="flex items-center gap-2 rounded-full border border-[#1a1814]/10 bg-white/55 px-3 py-2 dark:border-white/10 dark:bg-white/5">
              <Gauge className="w-4 h-4" />
              <span>High performance</span>
            </div>
          </motion.div>
        </div>

          <motion.div
            initial={{ opacity: 0, x: 24, rotate: 1 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative hidden lg:block"
            aria-hidden="true"
          >
            <div className="absolute -inset-5 rounded-[2.5rem] border border-[#1a1814]/5 bg-white/40 dark:border-white/5 dark:bg-white/[0.02]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#181713] p-3 text-white shadow-[0_35px_80px_-30px_rgba(34,29,22,0.55)]">
              <div className="rounded-[1.4rem] border border-white/10 bg-[#211f1a]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b58]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#f7ba45]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#44c67b]" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    open-source.workbench
                  </span>
                </div>

                <div className="p-6">
                  <div className="mb-7 flex items-end justify-between">
                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-300">
                        Shipping in public
                      </p>
                      <p className="text-2xl font-medium tracking-tight text-white">
                        Tools with a pulse.
                      </p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-xs text-white/60">
                      {heroProjects.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {heroProjects.map((project, index) => (
                      <div
                        key={project.id}
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-4 py-4"
                      >
                        <span className="font-mono text-xs text-white/30">0{index + 1}</span>
                        <div>
                          <p className="text-sm font-medium text-white/90">{project.title}</p>
                          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-white/35">
                            {project.language}
                          </p>
                        </div>
                        <span className="h-2 w-2 rounded-full bg-accent-400 shadow-[0_0_16px_rgba(41,214,196,0.8)]" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                    <span>{STATS.openSourceProjects} projects</span>
                    <span className="text-primary-300">Always open source</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-9 rounded-2xl border border-[#1a1814]/10 bg-[#fffdf9] px-5 py-4 shadow-xl dark:border-white/10 dark:bg-[#27241f]">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1a1814]/40 dark:text-white/40">
                Built for
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1a1814] dark:text-white/90">
                Speed · privacy · utility
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
