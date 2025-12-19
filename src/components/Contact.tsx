import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { GITHUB_USERNAME, LINKEDIN_URL, EMAIL } from '../lib/constants';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm font-semibold mb-4">
              Let's Connect
            </span>
            <h2 className="section-title text-slate-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="section-subtitle">
              Have a project idea or want to collaborate? I'd love to hear from you!
            </p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {/* GitHub */}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card p-6 text-center hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-slate-900 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Github className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                GitHub
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                Check out my code
              </p>
              <span className="inline-flex items-center gap-1 text-primary-500 font-medium text-sm group-hover:gap-2 transition-all">
                @{GITHUB_USERNAME} <ArrowRight className="w-4 h-4" />
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card p-6 text-center hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Linkedin className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                LinkedIn
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                Let's connect professionally
              </p>
              <span className="inline-flex items-center gap-1 text-blue-500 font-medium text-sm group-hover:gap-2 transition-all">
                Connect <ArrowRight className="w-4 h-4" />
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group glass-card p-6 text-center hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                Email
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                Drop me a message
              </p>
              <span className="inline-flex items-center gap-1 text-primary-500 font-medium text-sm group-hover:gap-2 transition-all">
                Say Hello <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="glass-card p-8 md:p-12 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
              <MessageCircle className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Looking for a Developer?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <a
                href={`mailto:${EMAIL}?subject=Let's Work Together`}
                className="btn-primary"
              >
                <Mail className="w-5 h-5" />
                Start a Conversation
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
