import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Facebook } from 'lucide-react';
import { GITHUB_USERNAME, LINKEDIN_URL, FACEBOOK_URL, EMAIL } from '../lib/constants';

export function Contact() {
  return (
    <section id="contact" className="section-space bg-[#f6f3ee] dark:bg-[#11100f]">
      <div className="section-wrap">
        <div className="overflow-hidden rounded-[2.25rem] bg-[#1a1814] p-6 text-[#fffdfa] shadow-[0_32px_90px_-42px_rgba(26,24,20,0.55)] dark:border dark:border-white/[0.08] dark:bg-[#1b1a18] sm:p-10 lg:p-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 max-w-3xl lg:mb-14"
          >
            <span className="mb-4 block text-[0.6875rem] font-bold uppercase tracking-[0.19em] text-[#ef8b70]">Contact</span>
            <h2 className="section-title mb-5 text-[#fffdfa] dark:text-[#f2efea]">
              Let's work together
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-[#cbc5bd] dark:text-[#b7b1a9]">
              Open to interesting projects and collaborations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid gap-2 sm:grid-cols-2"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="group flex min-h-24 items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4 transition-colors hover:border-white/[0.16] hover:bg-white/[0.075] sm:p-5"
            >
              <div className="flex items-center gap-4">
                <Mail className="size-5 text-[#ef8b70] transition-colors group-hover:text-[#ffad95]" />
                <div>
                  <div className="font-medium text-[#fffdfa] dark:text-[#f2efea]">Email</div>
                  <div className="mt-1 text-sm text-[#aaa49c]">{EMAIL}</div>
                </div>
              </div>
              <ArrowUpRight className="size-5 text-[#777168] transition-colors group-hover:text-[#ef8b70]" />
            </a>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-24 items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4 transition-colors hover:border-white/[0.16] hover:bg-white/[0.075] sm:p-5"
            >
              <div className="flex items-center gap-4">
                <Github className="size-5 text-[#ef8b70] transition-colors group-hover:text-[#ffad95]" />
                <div>
                  <div className="font-medium text-[#fffdfa] dark:text-[#f2efea]">GitHub</div>
                  <div className="mt-1 text-sm text-[#aaa49c]">@{GITHUB_USERNAME}</div>
                </div>
              </div>
              <ArrowUpRight className="size-5 text-[#777168] transition-colors group-hover:text-[#ef8b70]" />
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-24 items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4 transition-colors hover:border-white/[0.16] hover:bg-white/[0.075] sm:p-5"
            >
              <div className="flex items-center gap-4">
                <Linkedin className="size-5 text-[#ef8b70] transition-colors group-hover:text-[#ffad95]" />
                <div>
                  <div className="font-medium text-[#fffdfa] dark:text-[#f2efea]">LinkedIn</div>
                  <div className="mt-1 text-sm text-[#aaa49c]">Connect professionally</div>
                </div>
              </div>
              <ArrowUpRight className="size-5 text-[#777168] transition-colors group-hover:text-[#ef8b70]" />
            </a>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-24 items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4 transition-colors hover:border-white/[0.16] hover:bg-white/[0.075] sm:p-5"
            >
              <div className="flex items-center gap-4">
                <Facebook className="size-5 text-[#ef8b70] transition-colors group-hover:text-[#ffad95]" />
                <div>
                  <div className="font-medium text-[#fffdfa] dark:text-[#f2efea]">Facebook</div>
                  <div className="mt-1 text-sm text-[#aaa49c]">Personal updates</div>
                </div>
              </div>
              <ArrowUpRight className="size-5 text-[#777168] transition-colors group-hover:text-[#ef8b70]" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
