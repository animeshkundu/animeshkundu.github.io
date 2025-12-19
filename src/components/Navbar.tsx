import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Github, Linkedin } from 'lucide-react';
import { useTheme } from '../hooks';
import { GITHUB_USERNAME, LINKEDIN_URL } from '../lib/constants';

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#demos', label: 'Demos' },
  { href: '#repositories', label: 'Repos' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#faf8f5]/95 dark:bg-[#121212]/95 backdrop-blur-sm border-b border-[#1a1814]/6 dark:border-[#3a3a3a]/80'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 sm:px-8 lg:px-12" aria-label="Main navigation">
        <div className="flex justify-between items-center h-14 lg:h-16">
          {/* Logo - simple text */}
          <a
            href="#"
            className="text-base lg:text-lg font-semibold text-[#1a1814] dark:text-[#e8e6e3] tracking-tight"
          >
            Animesh Kundu
          </a>

          {/* Desktop Navigation - minimal */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#1a1814]/60 dark:text-[#b8b6b3] hover:text-[#1a1814] dark:hover:text-[#e8e6e3] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a1814]/50 dark:text-[#b8b6b3] hover:text-[#1a1814] dark:hover:text-[#e8e6e3] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1a1814]/50 dark:text-[#b8b6b3] hover:text-[#1a1814] dark:hover:text-[#e8e6e3] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <button
              onClick={toggle}
              className="text-[#1a1814]/50 dark:text-[#b8b6b3] hover:text-[#1a1814] dark:hover:text-[#e8e6e3] transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggle}
              className="text-[#1a1814]/60 dark:text-[#b8b6b3]"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1a1814]/60 dark:text-[#b8b6b3]"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
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
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-[#1a1814]/6 dark:border-[#3a3a3a]/80">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block py-2 text-[#1a1814]/70 dark:text-[#b8b6b3] hover:text-[#1a1814] dark:hover:text-[#e8e6e3] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex gap-4 pt-4 border-t border-[#1a1814]/6 dark:border-[#3a3a3a]/80 mt-4">
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#1a1814]/70 dark:text-[#b8b6b3]"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#1a1814]/70 dark:text-[#b8b6b3]"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
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
