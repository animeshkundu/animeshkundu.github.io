import { motion } from 'framer-motion';
import { STATS } from '../lib/constants';

export function About() {
  return (
    <section id="about" className="section-space bg-[#f6f3ee] dark:bg-[#11100f]">
      <div className="section-wrap">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow mb-4">About</span>
            <h2 className="section-title mb-12 max-w-4xl text-[#1a1814] dark:text-[#f2efea] lg:mb-16">
              Crafting tools developers rely on
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
          >
            <div className="space-y-6 text-lg leading-relaxed text-[#625d56] dark:text-[#b7b1a9]">
              <p>
                I build developer productivity tools that work entirely in the browser. 
                No server uploads, no data collection. Just powerful tools that respect your privacy.
              </p>
              <p>
                From network debugging with HAR and SAZ viewers to diagramming with the Mermaid Editor, 
                each project solves a real problem I've encountered. The youtube-audio extension alone 
                helps thousands save bandwidth and battery.
              </p>
              <p className="font-medium text-[#1a1814] dark:text-[#f2efea]">
                Everything I build is open source.
              </p>
              
              <div className="pt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6f6a62] dark:text-[#908a82]">
                  Primary stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {['TypeScript', 'React', 'Python', 'Vite', 'Tailwind'].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#1a1814]/[0.08] bg-white/50 px-3 py-1.5 text-xs font-medium text-[#625d56] dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-[#b7b1a9]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-[#1a1814]/[0.08] bg-[#d8d2ca] dark:border-white/[0.08] dark:bg-white/[0.08] sm:grid-cols-3 lg:grid-cols-1">
              <div className="bg-[#fffdfa] p-6 dark:bg-[#1b1a18] lg:p-8">
                <div className="text-4xl font-semibold tracking-[-0.04em] text-[#1a1814] tabular-nums dark:text-[#f2efea] lg:text-5xl">
                  {STATS.totalStars}+
                </div>
                <div className="mt-2 text-sm text-[#6f6a62] dark:text-[#aaa49c]">
                  GitHub stars
                </div>
              </div>
              
              <div className="bg-[#fffdfa] p-6 dark:bg-[#1b1a18] lg:p-8">
                <div className="text-4xl font-semibold tracking-[-0.04em] text-[#1a1814] tabular-nums dark:text-[#f2efea] lg:text-5xl">
                  {STATS.openSourceProjects}
                </div>
                <div className="mt-2 text-sm text-[#6f6a62] dark:text-[#aaa49c]">
                  Open source projects
                </div>
              </div>
              
              <div className="bg-[#fffdfa] p-6 dark:bg-[#1b1a18] lg:p-8">
                <div className="text-4xl font-semibold tracking-[-0.04em] text-[#1a1814] tabular-nums dark:text-[#f2efea] lg:text-5xl">
                  {STATS.yearsCoding}+
                </div>
                <div className="mt-2 text-sm text-[#6f6a62] dark:text-[#aaa49c]">
                  Years building software
                </div>
              </div>
            </div>
          </motion.div>
      </div>
    </section>
  );
}
