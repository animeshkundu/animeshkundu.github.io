import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Search, RefreshCw, ArrowRight } from 'lucide-react';
import { useGitHubRepos } from '../hooks';
import { getLanguageColor, filterRepositories, sortRepositories, getRepositoryDemoUrl } from '../lib/github';
import { GITHUB_USERNAME } from '../lib/constants';
import { getProjectBySlug } from '../lib/projects';

const LANGUAGE_FILTERS = ['All', 'TypeScript', 'Python', 'JavaScript', 'Other'];
const SORT_OPTIONS = [
  { value: 'updated', label: 'Recent' },
  { value: 'stars', label: 'Stars' },
  { value: 'name', label: 'Name' },
] as const;

export function AllRepositories() {
  const { repos, loading, error, refetch } = useGitHubRepos(GITHUB_USERNAME);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedRepos = useMemo(() => {
    let result = filterRepositories(repos, filter === 'All' ? 'all' : filter === 'Other' ? 'other' : filter);
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(query) ||
          repo.description?.toLowerCase().includes(query) ||
          repo.topics?.some((topic) => topic.toLowerCase().includes(query))
      );
    }
    
    return sortRepositories(result, sortBy);
  }, [repos, filter, sortBy, searchQuery]);

  return (
    <section id="repositories" className="section-space bg-[#fffdfa] dark:bg-[#151412]">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:mb-14"
        >
          <div>
            <span className="eyebrow mb-4">Repositories</span>
            <h2 className="section-title text-[#1a1814] dark:text-[#f2efea]">
              All projects
            </h2>
          </div>
          <p className="section-subtitle max-w-lg lg:justify-self-end lg:text-right">
            A live catalogue fetched from GitHub, so the work is always current.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col gap-2 rounded-[1.4rem] border border-[#1a1814]/[0.08] bg-[#f6f3ee] p-2 dark:border-white/[0.08] dark:bg-[#1b1a18] md:flex-row md:flex-wrap md:items-center"
        >
          <div className="relative w-full md:flex-1 md:min-w-[200px] md:max-w-sm">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6f6a62] dark:text-[#908a82]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search repositories"
              className="min-h-12 w-full rounded-2xl border border-transparent bg-white/60 py-2 pl-11 pr-4 text-sm text-[#1a1814] placeholder-[#6f6a62] transition-colors focus:border-primary-500 focus:outline-none dark:bg-white/[0.04] dark:text-[#f2efea] dark:placeholder-[#908a82]"
            />
          </div>

          <div className="flex w-full flex-wrap gap-1 md:w-auto">
            {LANGUAGE_FILTERS.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`min-h-11 min-w-11 rounded-xl px-3 text-xs font-medium transition-colors ${
                  filter === lang
                    ? 'bg-[#1a1814] text-[#fffdfa] dark:bg-[#f2efea] dark:text-[#11100f]'
                    : 'text-[#6f6a62] hover:bg-white/70 hover:text-[#1a1814] dark:text-[#aaa49c] dark:hover:bg-white/[0.06] dark:hover:text-[#f2efea]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <label className="flex min-h-11 items-center gap-2 px-2 text-xs text-[#6f6a62] dark:text-[#aaa49c]">
            <span className="lg:hidden">Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="min-h-11 cursor-pointer rounded-xl border border-[#1a1814]/10 bg-white/60 px-3 text-xs text-[#1a1814] focus:border-primary-500 focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-[#f2efea]"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center" role="status">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <RefreshCw className="size-6 text-[#6f6a62] dark:text-[#908a82]" />
            </motion.div>
            <p className="mt-3 text-sm text-[#6f6a62] dark:text-[#aaa49c]">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-3xl border border-red-500/20 bg-red-50/70 py-16 text-center dark:bg-red-500/[0.06]" role="alert">
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1a1814] px-5 text-sm font-medium text-[#fffdfa] dark:bg-[#f2efea] dark:text-[#11100f]"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAndSortedRepos.length === 0 && (
          <div className="rounded-3xl border border-[#1a1814]/[0.08] py-16 text-center dark:border-white/[0.08]">
            <p className="text-sm text-[#6f6a62] dark:text-[#aaa49c]">
              No repositories match your criteria.
            </p>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && !error && filteredAndSortedRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredAndSortedRepos.map((repo, index) => {
              const demoUrl = getRepositoryDemoUrl(repo, GITHUB_USERNAME);

              return (
                <motion.article
                  key={repo.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="group flex min-h-60 flex-col rounded-[1.5rem] border border-[#1a1814]/[0.08] bg-[#f6f3ee] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1a1814]/15 hover:bg-white dark:border-white/[0.08] dark:bg-[#1b1a18] dark:hover:border-white/15 dark:hover:bg-[#201f1c]"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    {repo.language && (
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span className="text-xs text-[#746e66] dark:text-[#aaa49c]">
                          {repo.language}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-[#6f6a62] dark:text-[#908a82]">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-semibold tracking-[-0.025em] text-[#1a1814] transition-colors group-hover:text-primary-700 dark:text-[#f2efea] dark:group-hover:text-[#ef8b70]">
                    {repo.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-5 line-clamp-2 flex-1 text-base leading-relaxed text-[#6f6a62] dark:text-[#aaa49c]">
                    {repo.description || 'No description'}
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-1 text-xs">
                    {/* Link to project page if exists */}
                    {getProjectBySlug(repo.name) && (
                      <Link
                        to={`/project/${repo.name}`}
                        className="inline-flex min-h-11 items-center gap-1 rounded-full px-2.5 font-medium text-primary-700 transition-colors hover:bg-primary-50 dark:text-[#ef8b70] dark:hover:bg-primary-500/10"
                      >
                        Learn more
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1 rounded-full px-2.5 text-[#6f6a62] transition-colors hover:bg-white hover:text-[#1a1814] dark:text-[#aaa49c] dark:hover:bg-white/[0.06] dark:hover:text-[#f2efea]"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Source
                    </a>
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1 rounded-full px-2.5 text-[#6f6a62] transition-colors hover:bg-white hover:text-[#1a1814] dark:text-[#aaa49c] dark:hover:bg-white/[0.06] dark:hover:text-[#f2efea]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}

        {/* Count */}
        {!loading && !error && filteredAndSortedRepos.length > 0 && (
          <p className="mt-7 text-xs text-[#6f6a62] dark:text-[#908a82]">
            {filteredAndSortedRepos.length} of {repos.length} repositories
          </p>
        )}
      </div>
    </section>
  );
}
