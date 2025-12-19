import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { GITHUB_USERNAME, LINKEDIN_URL, EMAIL } from '../lib/constants';

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white dark:bg-[#1a1a1a]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary-600 dark:text-[#f0927a] mb-3 block">
              Contact
            </span>
            <h2 className="section-title text-[#1a1814] dark:text-[#e8e6e3] mb-4">
              Let's work together
            </h2>
            <p className="section-subtitle text-left mx-0">
              Open to interesting projects and collaborations.
            </p>
          </motion.div>

          {/* Contact Links - simple list */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center justify-between py-4 border-b border-[#1a1814]/8 dark:border-[#3a3a3a] hover:border-primary-500 dark:hover:border-[#f0927a] transition-colors"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#1a1814]/40 dark:text-[#707070] group-hover:text-primary-600 dark:group-hover:text-[#f0927a] transition-colors" />
                <div>
                  <div className="font-medium text-[#1a1814] dark:text-[#e8e6e3]">Email</div>
                  <div className="text-sm text-[#1a1814]/50 dark:text-[#8a8a8a]">{EMAIL}</div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#1a1814]/30 dark:text-[#5a5a5a] group-hover:text-primary-600 dark:group-hover:text-[#f0927a] transition-colors" />
            </a>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 border-b border-[#1a1814]/8 dark:border-[#3a3a3a] hover:border-primary-500 dark:hover:border-[#f0927a] transition-colors"
            >
              <div className="flex items-center gap-4">
                <Github className="w-5 h-5 text-[#1a1814]/40 dark:text-[#707070] group-hover:text-primary-600 dark:group-hover:text-[#f0927a] transition-colors" />
                <div>
                  <div className="font-medium text-[#1a1814] dark:text-[#e8e6e3]">GitHub</div>
                  <div className="text-sm text-[#1a1814]/50 dark:text-[#8a8a8a]">@{GITHUB_USERNAME}</div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#1a1814]/30 dark:text-[#5a5a5a] group-hover:text-primary-600 dark:group-hover:text-[#f0927a] transition-colors" />
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-4 border-b border-[#1a1814]/8 dark:border-[#3a3a3a] hover:border-primary-500 dark:hover:border-[#f0927a] transition-colors"
            >
              <div className="flex items-center gap-4">
                <Linkedin className="w-5 h-5 text-[#1a1814]/40 dark:text-[#707070] group-hover:text-primary-600 dark:group-hover:text-[#f0927a] transition-colors" />
                <div>
                  <div className="font-medium text-[#1a1814] dark:text-[#e8e6e3]">LinkedIn</div>
                  <div className="text-sm text-[#1a1814]/50 dark:text-[#8a8a8a]">Connect professionally</div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#1a1814]/30 dark:text-[#5a5a5a] group-hover:text-primary-600 dark:group-hover:text-[#f0927a] transition-colors" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
