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
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <nav
        className={`mx-auto max-w-7xl overflow-hidden rounded-[1.35rem] border backdrop-blur-xl transition-all duration-300 ${
          scrolled || isOpen
            ? 'border-[#1a1814]/10 bg-[#fffdfa]/[0.92] shadow-[0_18px_50px_-30px_rgba(26,24,20,0.45)] dark:border-white/10 dark:bg-[#171614]/[0.92] dark:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)]'
            : 'border-[#1a1814]/[0.07] bg-[#fffdfa]/75 dark:border-white/[0.07] dark:bg-[#171614]/75'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-14 items-center justify-between px-3 sm:h-16 sm:px-5">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full px-2 text-sm font-semibold tracking-[-0.02em] text-[#1a1814] transition-opacity hover:opacity-65 dark:text-[#f2efea] sm:text-base"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-[#1a1814] text-[0.625rem] font-semibold text-[#fffdfa] dark:bg-[#f2efea] dark:text-[#11100f]">
              AK
            </span>
            Animesh Kundu
          </Link>

          <div className="hidden items-center rounded-full bg-[#1a1814]/[0.035] p-1 dark:bg-white/[0.05] md:flex">
            {isHomePage ? (
              <>
                {homeNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-full px-3 text-xs font-medium text-[#1a1814]/60 transition-colors hover:bg-white/70 hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.07] dark:hover:text-[#f2efea] lg:px-4 lg:text-sm"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  to="/projects"
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-xs font-medium text-[#1a1814]/60 transition-colors hover:bg-white/70 hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.07] dark:hover:text-[#f2efea] lg:px-4 lg:text-sm"
                >
                  All Projects
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-[#1a1814]/60 transition-colors hover:bg-white/70 hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.07] dark:hover:text-[#f2efea]"
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/project')
                      ? 'bg-white/70 text-primary-700 dark:bg-white/[0.07] dark:text-[#ef8b70]'
                      : 'text-[#1a1814]/60 hover:bg-white/70 hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.07] dark:hover:text-[#f2efea]'
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
              className="inline-flex size-11 items-center justify-center rounded-full text-[#6f6a62] transition-colors hover:bg-[#1a1814]/[0.05] hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.07] dark:hover:text-[#f2efea]"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-11 items-center justify-center rounded-full text-[#6f6a62] transition-colors hover:bg-[#1a1814]/[0.05] hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.07] dark:hover:text-[#f2efea] lg:inline-flex"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-11 items-center justify-center rounded-full text-[#6f6a62] transition-colors hover:bg-[#1a1814]/[0.05] hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.07] dark:hover:text-[#f2efea] xl:inline-flex"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <button
              onClick={toggle}
              className="ml-1 inline-flex size-11 items-center justify-center rounded-full border border-[#1a1814]/10 bg-white/60 text-[#1a1814]/60 transition-all hover:border-[#1a1814]/20 hover:text-[#1a1814] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#b7b1a9] dark:hover:border-white/20 dark:hover:text-[#f2efea]"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggle}
              className="inline-flex size-11 items-center justify-center rounded-full text-[#1a1814]/60 transition-colors hover:bg-[#1a1814]/[0.05] dark:text-[#b7b1a9] dark:hover:bg-white/[0.07]"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex size-11 items-center justify-center rounded-full text-[#1a1814]/60 transition-colors hover:bg-[#1a1814]/[0.05] dark:text-[#b7b1a9] dark:hover:bg-white/[0.07]"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              id="mobile-navigation"
              className="max-h-[calc(100svh-5.5rem)] overflow-y-auto overscroll-contain md:hidden"
            >
              <div className="space-y-1 border-t border-[#1a1814]/[0.07] px-3 py-3 dark:border-white/[0.07]">
                <Link
                  to="/"
                  className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-[#1a1814]/70 transition-colors hover:bg-[#1a1814]/[0.04] hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.06] dark:hover:text-[#f2efea]"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/projects"
                  className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-[#1a1814]/70 transition-colors hover:bg-[#1a1814]/[0.04] hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.06] dark:hover:text-[#f2efea]"
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
                        className="flex min-h-11 items-center rounded-xl px-3 text-sm font-medium text-[#1a1814]/70 transition-colors hover:bg-[#1a1814]/[0.04] hover:text-[#1a1814] dark:text-[#b7b1a9] dark:hover:bg-white/[0.06] dark:hover:text-[#f2efea]"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                  </>
                )}
                <div className="mt-3 flex flex-wrap gap-1 border-t border-[#1a1814]/[0.07] pt-3 dark:border-white/[0.07]">
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-[#1a1814]/70 dark:text-[#b7b1a9]"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-[#1a1814]/70 dark:text-[#b7b1a9]"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-[#1a1814]/70 dark:text-[#b7b1a9]"
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
