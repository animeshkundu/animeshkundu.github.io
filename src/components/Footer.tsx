import { Link, useLocation } from 'react-router-dom';
import { Github, Facebook } from 'lucide-react';
import { GITHUB_USERNAME, LINKEDIN_URL, FACEBOOK_URL, EMAIL } from '../lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="py-12 bg-[#1a1814] dark:bg-[#0a0a0a] text-[#faf8f5]/60 dark:text-dark-text-tertiary">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <Link to="/" className="text-base font-semibold text-[#faf8f5] dark:text-dark-text-primary">
              Animesh Kundu
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/projects" className="hover:text-[#faf8f5] dark:hover:text-[#e8e6e3] transition-colors">
                Projects
              </Link>
              {isHomePage ? (
                <>
                  <a href="#demos" className="hover:text-[#faf8f5] dark:hover:text-[#e8e6e3] transition-colors">
                    Demos
                  </a>
                  <a href="#about" className="hover:text-[#faf8f5] dark:hover:text-[#e8e6e3] transition-colors">
                    About
                  </a>
                  <a href="#contact" className="hover:text-[#faf8f5] dark:hover:text-[#e8e6e3] transition-colors">
                    Contact
                  </a>
                </>
              ) : (
                <Link to="/" className="hover:text-[#faf8f5] dark:hover:text-[#e8e6e3] transition-colors">
                  Home
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8 border-t border-[#faf8f5]/10 dark:border-[#2a2a2a]">
            <p className="text-sm">
              © {currentYear} Animesh Kundu
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#faf8f5] dark:hover:text-[#e8e6e3] transition-colors inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#faf8f5] dark:hover:text-[#e8e6e3] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#faf8f5] dark:hover:text-[#e8e6e3] transition-colors inline-flex items-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="hover:text-[#faf8f5] dark:hover:text-[#e8e6e3] transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
