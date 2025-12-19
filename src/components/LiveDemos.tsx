import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { LIVE_DEMOS } from '../lib/constants';

export function LiveDemos() {
  const [activeDemo, setActiveDemo] = useState(LIVE_DEMOS[0]);

  return (
    <section id="demos" className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
            Interactive
          </span>
          <h2 className="section-title text-slate-900 dark:text-white mb-4">
            Try It Live
          </h2>
          <p className="section-subtitle">
            Experience the tools directly in your browser — no installation required
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Demo Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {LIVE_DEMOS.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeDemo.id === demo.id
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500'
                }`}
              >
                {demo.title}
              </button>
            ))}
          </div>

          {/* Demo Container */}
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-slate-900/50 overflow-hidden border border-slate-200 dark:border-slate-700">
            {/* Browser Chrome */}
            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4 max-w-xl">
                <div className="bg-white dark:bg-slate-900 px-4 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-400 truncate font-mono">
                  {activeDemo.url}
                </div>
              </div>
              <a
                href={activeDemo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                Open <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Demo Description */}
            <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {activeDemo.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {activeDemo.description}
                  </p>
                </div>
                <a
                  href={`https://github.com/animeshkundu/${activeDemo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1"
                >
                  View Source <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* iframe Container */}
            <div className="relative" style={{ height: '600px' }}>
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400"
          >
            🔒 All demos run 100% client-side. Your data never leaves your browser.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
