import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Lock, Gauge } from 'lucide-react';
import { STATS } from '../lib/constants';

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[min(960px,100svh)] items-center overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
      <div className="hero-glow hero-glow-primary" aria-hidden="true" />
      <div className="hero-glow hero-glow-accent" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,24,20,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,24,20,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]" aria-hidden="true" />

      <div className="section-wrap relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] lg:gap-10 xl:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-7 inline-flex min-h-9 items-center gap-2.5 rounded-full border border-[#1a1814]/[0.08] bg-white/60 px-3.5 text-xs font-medium text-[#5f5a53] shadow-sm backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#c9c3bb] sm:text-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0f766e] opacity-50 dark:bg-[#5eead4]" />
                <span className="relative inline-flex size-2 rounded-full bg-[#0f766e] dark:bg-[#5eead4]" />
              </span>
              {STATS.totalStars}+ stars on GitHub
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="hero-title mb-7 max-w-[11ch] text-balance text-[#1a1814] dark:text-[#f2efea]"
            >
              I build tools that <span className="gradient-text">developers love.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mb-9 max-w-2xl text-lg leading-relaxed text-[#625d56] dark:text-[#b7b1a9] sm:text-xl lg:text-[1.35rem]"
            >
              Full-stack developer crafting privacy-first web applications.
              From diagram editors to network analyzers, every experience runs entirely in your browser.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mb-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a href="#projects" className="btn-primary">
                Explore Projects
                <ArrowRight className="size-4" />
              </a>
              <a href="#demos" className="btn-secondary">
                Try Live Demos
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="flex flex-wrap gap-x-6 gap-y-3 border-t border-[#1a1814]/[0.08] pt-6 text-sm text-[#6f6a62] dark:border-white/[0.08] dark:text-[#aaa49c]"
            >
              <div className="flex items-center gap-2">
                <Terminal className="size-4" />
                <span>TypeScript & React</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="size-4" />
                <span>Privacy-first</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="size-4" />
                <span>High performance</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
            role="group"
            aria-label="Product principles"
          >
            <div className="absolute -inset-8 rounded-full bg-primary-300/15 blur-3xl dark:bg-primary-500/10" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/60 p-3 shadow-[0_32px_100px_-45px_rgba(26,24,20,0.5)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_32px_100px_-45px_rgba(0,0,0,0.9)] sm:p-4">
              <div className="rounded-[1.65rem] border border-[#1a1814]/[0.07] bg-[#fffdfa] p-6 dark:border-white/[0.07] dark:bg-[#1b1a18] sm:p-8">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="size-2 rounded-full bg-primary-500/70" />
                    <span className="size-2 rounded-full bg-[#d7cfc4]" />
                    <span className="size-2 rounded-full bg-[#0f766e]/60 dark:bg-[#5eead4]/70" />
                  </div>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#6f6a62] dark:text-[#8f8981]">
                    Built for the browser
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { number: '01', title: 'Local by design', detail: 'Your files never leave the device.' },
                    { number: '02', title: 'Fast by default', detail: 'Useful the moment the page opens.' },
                    { number: '03', title: 'Open at the core', detail: 'Source you can inspect and improve.' },
                  ].map((principle) => (
                    <div
                      key={principle.number}
                      className="group flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-colors hover:border-[#1a1814]/[0.06] hover:bg-[#f6f3ee] dark:hover:border-white/[0.06] dark:hover:bg-white/[0.035] sm:p-4"
                    >
                      <span className="mt-0.5 font-mono text-[0.65rem] text-primary-700 dark:text-[#ef8b70]">
                        {principle.number}
                      </span>
                      <div>
                        <p className="font-medium tracking-[-0.02em] text-[#1a1814] dark:text-[#f2efea]">
                          {principle.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[#6f6a62] dark:text-[#aaa49c]">
                          {principle.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#1a1814] px-5 py-4 text-[#fffdfa] dark:bg-[#f2efea] dark:text-[#11100f]">
                  <span className="text-sm font-medium">Thoughtful tools. Zero friction.</span>
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
