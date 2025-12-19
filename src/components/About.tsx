import { motion } from 'framer-motion';
import { STATS } from '../lib/constants';

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#faf8f5] dark:bg-[#121212]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary-600 dark:text-[#f0927a] mb-3 block">
              About
            </span>
            <h2 className="section-title text-[#1a1814] dark:text-[#e8e6e3] mb-8">
              Crafting tools developers rely on
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid lg:grid-cols-3 gap-12 lg:gap-16"
          >
            {/* Main content */}
            <div className="lg:col-span-2 space-y-5 text-[#1a1814]/70 dark:text-[#b8b6b3] leading-relaxed">
              <p>
                I build developer productivity tools that work entirely in the browser. 
                No server uploads, no data collection — just powerful tools that respect your privacy.
              </p>
              <p>
                From network debugging with HAR and SAZ viewers to diagramming with the Mermaid Editor, 
                each project solves a real problem I've encountered. The youtube-audio extension alone 
                helps thousands save bandwidth and battery.
              </p>
              <p className="text-[#1a1814] dark:text-[#e8e6e3] font-medium">
                Everything I build is open source.
              </p>
              
              {/* Technologies */}
              <div className="pt-6">
                <p className="text-sm text-[#1a1814]/50 dark:text-[#8a8a8a] mb-3">
                  Primary stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {['TypeScript', 'React', 'Python', 'Vite', 'Tailwind'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#1a1814]/4 dark:bg-[#2a2a2a] text-[#1a1814]/70 dark:text-[#b8b6b3] text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats - simple numbers */}
            <div className="space-y-6">
              <div>
                <div className="text-3xl lg:text-4xl font-semibold text-[#1a1814] dark:text-[#e8e6e3] tabular-nums">
                  {STATS.totalStars}+
                </div>
                <div className="text-sm text-[#1a1814]/50 dark:text-[#8a8a8a] mt-1">
                  GitHub stars
                </div>
              </div>
              
              <div>
                <div className="text-3xl lg:text-4xl font-semibold text-[#1a1814] dark:text-[#e8e6e3] tabular-nums">
                  {STATS.openSourceProjects}
                </div>
                <div className="text-sm text-[#1a1814]/50 dark:text-[#8a8a8a] mt-1">
                  Open source projects
                </div>
              </div>
              
              <div>
                <div className="text-3xl lg:text-4xl font-semibold text-[#1a1814] dark:text-[#e8e6e3] tabular-nums">
                  {STATS.yearsCoding}+
                </div>
                <div className="text-sm text-[#1a1814]/50 dark:text-[#8a8a8a] mt-1">
                  Years building software
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
