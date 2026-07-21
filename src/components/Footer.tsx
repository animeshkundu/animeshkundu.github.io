import { Link, useLocation } from 'react-router-dom';
import { Github, Facebook } from 'lucide-react';
import { GITHUB_USERNAME, LINKEDIN_URL, FACEBOOK_URL, EMAIL } from '../lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="border-t border-[#1a1814]/[0.08] bg-[#f6f3ee] py-10 text-[#6f6a62] dark:border-white/[0.08] dark:bg-[#11100f] dark:text-[#aaa49c]">
      <div className="section-wrap">
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="inline-flex min-h-11 items-center text-base font-semibold tracking-[-0.02em] text-[#1a1814] transition-opacity hover:opacity-60 dark:text-[#f2efea]">
              Animesh Kundu
            </Link>
            <div className="flex flex-wrap items-center gap-x-5 text-sm">
              <Link to="/projects" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-[#1a1814] dark:hover:text-[#f2efea]">
                Projects
              </Link>
              {isHomePage ? (
                <>
                  <a href="#demos" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-[#1a1814] dark:hover:text-[#f2efea]">
                    Demos
                  </a>
                  <a href="#about" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-[#1a1814] dark:hover:text-[#f2efea]">
                    About
                  </a>
                  <a href="#contact" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-[#1a1814] dark:hover:text-[#f2efea]">
                    Contact
                  </a>
                </>
              ) : (
                <Link to="/" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-[#1a1814] dark:hover:text-[#f2efea]">
                  Home
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#1a1814]/[0.08] pt-7 dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              © {currentYear} Animesh Kundu
            </p>
            <div className="flex flex-wrap items-center gap-x-5 text-sm">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center gap-2 transition-colors hover:text-[#1a1814] dark:hover:text-[#f2efea]"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-[#1a1814] dark:hover:text-[#f2efea]"
              >
                LinkedIn
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center gap-2 transition-colors hover:text-[#1a1814] dark:hover:text-[#f2efea]"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-[#1a1814] dark:hover:text-[#f2efea]"
              >
                Email
              </a>
            </div>
        </div>
      </div>
    </footer>
  );
}
