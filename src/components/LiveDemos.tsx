import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { LIVE_DEMOS } from '../lib/constants';

export function LiveDemos() {
  const [activeDemo, setActiveDemo] = useState(LIVE_DEMOS[0]);

  return (
    <section id="demos" className="section-space bg-[#f6f3ee] dark:bg-[#11100f]">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:mb-16"
        >
          <div>
            <span className="eyebrow mb-4">Live Demos</span>
            <h2 className="section-title text-[#1a1814] dark:text-[#f2efea]">
              Try before you clone
            </h2>
          </div>
          <p className="section-subtitle max-w-xl lg:justify-self-end lg:text-right">
            All tools run entirely in your browser. No installation, no signup, and no data leaving your device.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="mb-5 flex gap-1 overflow-x-auto rounded-2xl border border-[#1a1814]/[0.08] bg-white/50 p-1.5 dark:border-white/[0.08] dark:bg-white/[0.035] sm:w-fit sm:rounded-full">
            {LIVE_DEMOS.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo)}
                className={`min-h-11 whitespace-nowrap rounded-xl px-4 text-sm font-medium transition-colors sm:rounded-full ${
                  activeDemo.id === demo.id
                    ? 'bg-[#1a1814] text-[#fffdfa] shadow-sm dark:bg-[#f2efea] dark:text-[#11100f]'
                    : 'text-[#6f6a62] hover:bg-white/70 hover:text-[#1a1814] dark:text-[#aaa49c] dark:hover:bg-white/[0.06] dark:hover:text-[#f2efea]'
                }`}
              >
                {demo.title}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#1a1814]/[0.09] bg-[#fffdfa] shadow-[0_28px_80px_-48px_rgba(26,24,20,0.5)] dark:border-white/[0.09] dark:bg-[#1b1a18] dark:shadow-[0_28px_80px_-48px_rgba(0,0,0,0.9)]">
            <div className="flex flex-col gap-4 border-b border-[#1a1814]/[0.07] p-5 dark:border-white/[0.07] sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h3 className="font-semibold tracking-[-0.02em] text-[#1a1814] dark:text-[#f2efea]">
                  {activeDemo.title}
                </h3>
                <p className="mt-1 text-base leading-relaxed text-[#6f6a62] dark:text-[#aaa49c]">
                  {activeDemo.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://github.com/animeshkundu/${activeDemo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-xs font-medium text-[#6f6a62] transition-colors hover:bg-[#f6f3ee] hover:text-[#1a1814] dark:text-[#aaa49c] dark:hover:bg-white/[0.06] dark:hover:text-[#f2efea]"
                >
                  Source
                </a>
                <a
                  href={activeDemo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary-700 px-4 text-xs font-semibold text-white transition-colors hover:bg-primary-800 dark:bg-[#ef8b70] dark:text-[#11100f] dark:hover:bg-[#ffad95]"
                >
                  Open <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="relative h-[430px] bg-white sm:h-[560px]">
              <iframe
                key={activeDemo.id}
                src={activeDemo.url}
                className="w-full h-full bg-white"
                title={`${activeDemo.title} Demo`}
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
              />
            </div>
          </div>

          <p className="mt-5 flex items-center gap-2 text-xs text-[#6f6a62] dark:text-[#aaa49c]">
            <span className="size-1.5 rounded-full bg-[#0f766e] dark:bg-[#5eead4]" />
            Data stays in your browser, nothing uploaded
          </p>
        </motion.div>
      </div>
    </section>
  );
}
