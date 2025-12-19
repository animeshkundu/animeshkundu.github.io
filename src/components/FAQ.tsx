import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What type of projects does Animesh Kundu specialize in?',
    answer:
      'I specialize in developer productivity tools, web applications, browser extensions, and Python utilities. Notable projects include the Mermaid Editor for diagrams, HAR/SAZ viewers for network debugging, Gist Preview for GitHub gists, and the popular youtube-audio Firefox extension with 167+ stars that saves bandwidth by disabling video playback.',
  },
  {
    question: 'Are the web tools safe to use with sensitive data?',
    answer:
      'Absolutely! All web tools like SAZ Viewer, HAR Viewer, Mermaid Editor, and Gist Preview are designed to work 100% client-side. Your data never leaves your browser — all processing happens locally, ensuring complete privacy and security for sensitive network debugging data or proprietary diagrams.',
  },
  {
    question: 'What technologies does Animesh Kundu use?',
    answer:
      'I primarily work with TypeScript, React, Python, and JavaScript. Modern projects use React 19, Vite, Tailwind CSS, and comprehensive testing with Vitest. All projects follow best practices for code quality, testing (90%+ coverage), and CI/CD with GitHub Actions.',
  },
  {
    question: 'What is the most popular open source project?',
    answer:
      'The youtube-audio Firefox extension is the most popular with 167+ stars and 39 forks on GitHub. It allows users to listen to audio-only streams from YouTube, saving bandwidth and battery life — particularly useful for music listening while working.',
  },
  {
    question: 'Can I contribute to these open source projects?',
    answer:
      'Yes! All projects are open source and contributions are welcome. Feel free to open issues, submit pull requests, or suggest new features on GitHub. Check out the contributing guidelines in each repository for more information.',
  },
  {
    question: 'How can I contact Animesh for collaboration?',
    answer:
      'You can reach out via email at anik.edu@gmail.com, connect on LinkedIn, or open an issue/discussion on GitHub. I\'m always open to discussing new projects, collaboration opportunities, or interesting technical challenges.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-sm font-semibold mb-4">
              FAQ
            </span>
            <h2 className="section-title text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle">
              Quick answers to common questions about my work and approach
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-8">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 mt-1">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-primary-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
