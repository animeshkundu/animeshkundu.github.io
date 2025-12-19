import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { LIVE_DEMOS } from '../lib/constants';

export function LiveDemos() {
  const [activeDemo, setActiveDemo] = useState(LIVE_DEMOS[0]);

  return (
    <section id="demos" className="py-20 lg:py-28 bg-[#faf8f5] dark:bg-[#0f0e0c]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-3 block">
            Live Demos
          </span>
          <h2 className="section-title text-[#1a1814] dark:text-[#faf8f5] mb-4">
            Try before you clone
          </h2>
          <p className="section-subtitle text-left mx-0 max-w-lg">
            All tools run entirely in your browser. No installation, no signup.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {/* Demo Tabs - understated */}
          <div className="flex flex-wrap gap-2 mb-6">
            {LIVE_DEMOS.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeDemo.id === demo.id
                    ? 'bg-[#1a1814] dark:bg-[#faf8f5] text-[#faf8f5] dark:text-[#1a1814]'
                    : 'bg-transparent text-[#1a1814]/60 dark:text-[#faf8f5]/60 hover:text-[#1a1814] dark:hover:text-[#faf8f5]'
                }`}
              >
                {demo.title}
              </button>
            ))}
          </div>

          {/* Demo Container */}
          <div className="bg-white dark:bg-[#1a1814] border border-[#1a1814]/6 dark:border-[#faf8f5]/6">
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-[#1a1814]/6 dark:border-[#faf8f5]/6">
              <div>
                <h3 className="font-medium text-[#1a1814] dark:text-[#faf8f5]">
                  {activeDemo.title}
                </h3>
                <p className="text-xs text-[#1a1814]/50 dark:text-[#faf8f5]/50 mt-0.5">
                  {activeDemo.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`https://github.com/animeshkundu/${activeDemo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#1a1814]/50 dark:text-[#faf8f5]/50 hover:text-[#1a1814] dark:hover:text-[#faf8f5] transition-colors"
                >
                  Source
                </a>
                <a
                  href={activeDemo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white text-xs font-medium hover:bg-primary-700 transition-colors"
                >
                  Open <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* iframe Container */}
            <div className="relative" style={{ height: '500px' }}>
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

          {/* Privacy note */}
          <p className="mt-4 text-xs text-[#1a1814]/40 dark:text-[#faf8f5]/40 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Data stays in your browser — nothing uploaded
          </p>
        </motion.div>
      </div>
    </section>
  );
}
