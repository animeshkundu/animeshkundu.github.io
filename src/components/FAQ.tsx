import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What do you build?',
    answer:
      'Developer tools that run in the browser. Mermaid Editor for diagrams, HAR/SAZ viewers for network debugging, Gist Preview for GitHub gists, and youtube-audio for Firefox.',
  },
  {
    question: 'Is my data safe with these tools?',
    answer:
      'Yes. All processing happens in your browser. Nothing is uploaded to any server. This is a core design principle for every tool I build.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'TypeScript, React 19, Vite, Python, Tailwind CSS. All projects have comprehensive tests and CI/CD with GitHub Actions.',
  },
  {
    question: 'Can I contribute?',
    answer:
      'Absolutely. Everything is open source. Open issues, submit PRs, or suggest features on GitHub.',
  },
  {
    question: 'How can I reach you?',
    answer:
      'Email anik.edu@gmail.com or connect on LinkedIn. Happy to discuss projects or collaborations.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white dark:bg-[#121110]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-3 block">
              FAQ
            </span>
            <h2 className="section-title text-[#1a1814] dark:text-[#faf8f5]">
              Common questions
            </h2>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="divide-y divide-[#1a1814]/8 dark:divide-[#faf8f5]/8"
          >
            {faqs.map((faq, index) => (
              <div key={index} className="py-5">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-start justify-between gap-4 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-base font-medium text-[#1a1814] dark:text-[#faf8f5] group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {faq.question}
                  </h3>
                  <span className="flex-shrink-0 mt-0.5">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#1a1814]/30 dark:text-[#faf8f5]/30" />
                    )}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 text-sm text-[#1a1814]/60 dark:text-[#faf8f5]/60 leading-relaxed">
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
