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
    <section id="faq" className="section-space bg-[#fffdfa] dark:bg-[#151412]">
      <div className="section-wrap">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow mb-4">FAQ</span>
            <h2 className="section-title text-[#1a1814] dark:text-[#f2efea]">
              Common questions
            </h2>
            <p className="section-subtitle mt-6 max-w-sm">
              A few details about the tools, the process, and how to get involved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="divide-y divide-[#1a1814]/[0.08] border-y border-[#1a1814]/[0.08] dark:divide-white/[0.08] dark:border-white/[0.08]"
          >
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="group flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                >
                  <h3 className="text-base font-medium tracking-[-0.015em] text-[#1a1814] transition-colors group-hover:text-primary-700 dark:text-[#f2efea] dark:group-hover:text-[#ef8b70] sm:text-lg">
                    {faq.question}
                  </h3>
                  <span className="flex size-9 flex-shrink-0 items-center justify-center rounded-full border border-[#1a1814]/[0.08] bg-[#f6f3ee] dark:border-white/[0.08] dark:bg-white/[0.04]">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-primary-600 dark:text-dark-primary" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#1a1814]/30 dark:text-[#5a5a5a]" />
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
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-hidden={openIndex !== index}
                  aria-labelledby={`faq-trigger-${index}`}
                >
                  <p className="max-w-2xl pb-6 pr-12 text-base leading-relaxed text-[#6f6a62] dark:text-[#b7b1a9]">
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
