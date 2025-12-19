import { Heart, Github } from 'lucide-react';
import { GITHUB_USERNAME, LINKEDIN_URL, EMAIL } from '../lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div>
              <a href="#" className="text-2xl font-bold gradient-text inline-block mb-4">
                Animesh Kundu
              </a>
              <p className="text-slate-500 leading-relaxed">
                Full-stack developer building developer tools that are powerful, 
                privacy-first, and a joy to use.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#projects" className="hover:text-white transition-colors">
                    Featured Projects
                  </a>
                </li>
                <li>
                  <a href="#demos" className="hover:text-white transition-colors">
                    Live Demos
                  </a>
                </li>
                <li>
                  <a href="#repositories" className="hover:text-white transition-colors">
                    All Repositories
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Me
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="hover:text-white transition-colors"
                  >
                    {EMAIL}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-center sm:text-left">
                © {currentYear} Animesh Kundu. All rights reserved.
              </p>
              <p className="text-sm flex items-center gap-1.5">
                Built with <Heart className="w-4 h-4 text-red-500 fill-current" /> using React & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
