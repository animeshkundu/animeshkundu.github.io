import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Lock, Gauge } from 'lucide-react';
import { STATS } from '../lib/constants';

const capabilities = [
  { label: 'TypeScript & React', icon: Terminal },
  { label: 'Privacy-first', icon: Lock },
  { label: 'High performance', icon: Gauge },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#faf8f5] dark:bg-dark-bg-base"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-900/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-16 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 mx-auto px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)] lg:gap-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-200/70 bg-primary-50/80 px-3.5 py-2 text-sm font-medium text-primary-700 shadow-sm dark:border-dark-border dark:bg-[#242424] dark:text-dark-primary"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-500" />
              {STATS.totalStars}+ stars on GitHub
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-7 text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-[#1a1814] dark:text-dark-text-primary sm:text-6xl md:text-7xl lg:text-[5rem]"
            >
              I build tools that{' '}
              <span className="gradient-text block">developers love</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10 max-w-2xl text-lg leading-relaxed text-[#1a1814]/65 dark:text-dark-text-secondary md:text-xl"
            >
              Full-stack developer crafting privacy-first web applications. From diagram editors to network
              analyzers, all running entirely in your browser.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-14 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <a href="#projects" className="btn-primary min-h-11">
                Explore Projects
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <a href="#demos" className="btn-secondary min-h-11">
                Try Live Demos
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ul
                aria-label="Core capabilities"
                className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#1a1814]/55 dark:text-[#a0a0a0]"
              >
                {capabilities.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex items-center gap-2">
                    <Icon aria-hidden="true" className="h-4 w-4 text-primary-600 dark:text-dark-primary" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative mx-auto w-full max-w-md lg:mx-0"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-4 -rotate-2 rounded-2xl border border-primary-200/50 bg-primary-100/30 dark:border-dark-border dark:bg-dark-bg-surface/40"
            />
            <div className="relative rounded-2xl border border-[#1a1814]/10 bg-white/75 p-7 shadow-xl shadow-[#1a1814]/5 backdrop-blur-sm dark:border-dark-border dark:bg-[#191919]/90 dark:shadow-black/25 sm:p-8">
              <div className="mb-8 flex items-center justify-between border-b border-[#1a1814]/10 pb-5 dark:border-dark-border">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-dark-primary">
                    Built for real work
                  </p>
                  <p className="text-xl font-semibold tracking-tight text-[#1a1814] dark:text-dark-text-primary">
                    Browser-first software
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700 dark:bg-[#2a2a2a] dark:text-dark-primary"
                >
                  <Terminal className="h-5 w-5" />
                </span>
              </div>

              <dl className="space-y-6">
                <div className="grid grid-cols-[2rem_1fr] gap-3">
                  <dt className="font-mono text-sm text-primary-600 dark:text-dark-primary">01</dt>
                  <dd>
                    <p className="font-medium text-[#1a1814] dark:text-dark-text-primary">Private by default</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#1a1814]/55 dark:text-dark-text-secondary">
                      Your files stay on your device.
                    </p>
                  </dd>
                </div>
                <div className="grid grid-cols-[2rem_1fr] gap-3">
                  <dt className="font-mono text-sm text-primary-600 dark:text-dark-primary">02</dt>
                  <dd>
                    <p className="font-medium text-[#1a1814] dark:text-dark-text-primary">Fast by design</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#1a1814]/55 dark:text-dark-text-secondary">
                      Focused interfaces with no waiting.
                    </p>
                  </dd>
                </div>
                <div className="grid grid-cols-[2rem_1fr] gap-3">
                  <dt className="font-mono text-sm text-primary-600 dark:text-dark-primary">03</dt>
                  <dd>
                    <p className="font-medium text-[#1a1814] dark:text-dark-text-primary">Open source</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#1a1814]/55 dark:text-dark-text-secondary">
                      Useful tools, built in the open.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 hidden h-48 w-1 -translate-y-1/2 bg-gradient-to-b from-primary-400 to-accent-500 lg:block"
      />
    </section>
  );
}
