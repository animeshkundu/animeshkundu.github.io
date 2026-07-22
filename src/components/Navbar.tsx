import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Github, Linkedin, Facebook } from 'lucide-react';
import { useTheme } from '../hooks';
import { GITHUB_USERNAME, LINKEDIN_URL, FACEBOOK_URL } from '../lib/constants';

interface NavLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

const homeNavLinks: NavLink[] = [
  { href: '#projects', label: 'Featured' },
  { href: '#demos', label: 'Demos' },
  { href: '#repositories', label: 'Repos' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <nav className="container mx-auto" aria-label="Main navigation">
        <div
          className={`flex h-14 items-center justify-between rounded-full border px-3 transition-all duration-300 sm:px-4 ${
            scrolled
              ? 'border-[#1a1814]/10 bg-[#faf8f5]/95 shadow-[0_12px_35px_-20px_rgba(38,31,24,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[#121212]/92'
              : 'border-[#1a1814]/5 bg-[#faf8f5]/70 backdrop-blur-md dark:border-white/5 dark:bg-[#121212]/65'
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-2.5 pr-3 text-sm font-semibold tracking-tight text-[#1a1814] dark:text-[#e8e6e3] lg:text-base"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1814] font-mono text-[10px] text-white dark:bg-[#e8e6e3] dark:text-[#1a1814]">
              AK
            </span>
            <span>Animesh Kundu</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-[#1a1814]/5 bg-white/55 p-1 md:flex dark:border-white/5 dark:bg-white/[0.03]">
            {isHomePage ? (
              <>
                {homeNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-full px-3 py-2 text-xs text-[#1a1814]/60 transition-colors hover:bg-white hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-[#e8e6e3] lg:px-4"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  to="/projects"
                  className="rounded-full px-3 py-2 text-xs text-[#1a1814]/60 transition-colors hover:bg-white hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-[#e8e6e3] lg:px-4"
                >
                  All Projects
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="rounded-full px-4 py-2 text-xs text-[#1a1814]/60 transition-colors hover:bg-white hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-[#e8e6e3]"
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className={`rounded-full px-4 py-2 text-xs transition-colors ${
                    location.pathname.startsWith('/project')
                      ? 'bg-white text-primary-600 dark:bg-white/5 dark:text-[#f0927a]'
                      : 'text-[#1a1814]/60 hover:bg-white hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-[#e8e6e3]'
                  }`}
                >
                  All Projects
                </Link>
              </>
            )}
          </div>

          <div className="hidden items-center gap-1 md:flex">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-[#1a1814]/45 transition-colors hover:bg-white hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-[#e8e6e3] lg:flex"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-[#1a1814]/45 transition-colors hover:bg-white hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-[#e8e6e3] lg:flex"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-[#1a1814]/45 transition-colors hover:bg-white hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-[#e8e6e3] xl:flex"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1a1814]/10 bg-white/70 text-[#1a1814]/60 transition-all hover:rotate-6 hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:bg-white/5 dark:text-dark-text-secondary dark:hover:border-primary-800 dark:hover:text-dark-primary"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#1a1814]/60 dark:text-dark-text-secondary"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#1a1814]/60 dark:text-dark-text-secondary"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-2 space-y-1 rounded-3xl border border-[#1a1814]/10 bg-[#faf8f5]/98 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#171717]/98">
                <Link
                  to="/"
                  className="block rounded-2xl px-4 py-3 text-[#1a1814]/70 transition-colors hover:bg-white hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-[#e8e6e3]"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className="block rounded-2xl px-4 py-3 text-[#1a1814]/70 transition-colors hover:bg-white hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-[#e8e6e3]"
                  onClick={() => setIsOpen(false)}
                >
                  All Projects
                </Link>
                {isHomePage && (
                  <>
                    {homeNavLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="block rounded-2xl px-4 py-3 text-[#1a1814]/70 transition-colors hover:bg-white hover:text-[#1a1814] dark:text-dark-text-secondary dark:hover:bg-white/5 dark:hover:text-[#e8e6e3]"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                  </>
                )}
                <div className="mt-3 flex flex-wrap gap-4 border-t border-[#1a1814]/6 px-4 pt-4 dark:border-dark-border/80">
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#1a1814]/70 dark:text-dark-text-secondary"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#1a1814]/70 dark:text-dark-text-secondary"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#1a1814]/70 dark:text-dark-text-secondary"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
