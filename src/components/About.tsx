import { motion } from 'framer-motion';
import { Code2, Briefcase, Coffee, Rocket } from 'lucide-react';
import { STATS } from '../lib/constants';

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                About Me
              </span>
              <h2 className="section-title text-slate-900 dark:text-white mb-6">
                Building Tools That<br />
                <span className="gradient-text">Developers Love</span>
              </h2>
              
              <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  I'm a full-stack developer passionate about creating developer productivity tools 
                  that are both powerful and a joy to use. With {STATS.yearsCoding}+ years of coding experience, 
                  I focus on building applications that solve real problems.
                </p>
                <p>
                  My specialty is creating <strong className="text-slate-900 dark:text-white">privacy-first web applications</strong> that 
                  run entirely in your browser. From network debugging tools like the SAZ and HAR viewers 
                  to creative tools like the Mermaid Editor — I believe your data should stay yours.
                </p>
                <p>
                  When I'm not coding, I enjoy contributing to open source, exploring new technologies, 
                  and sharing knowledge with the developer community.
                </p>
              </div>

              {/* Tech stack */}
              <div className="mt-8">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  Technologies I Work With
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['TypeScript', 'React', 'Python', 'Node.js', 'Vite', 'Tailwind CSS', 'Vitest', 'GitHub Actions'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                  {STATS.totalStars}+
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  GitHub Stars
                </div>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                  {STATS.openSourceProjects}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  Open Source Projects
                </div>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                  {STATS.yearsCoding}+
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  Years Coding
                </div>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                  ∞
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  Cups of Coffee
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
