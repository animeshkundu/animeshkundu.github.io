import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Search, RefreshCw } from 'lucide-react';
import { useGitHubRepos } from '../hooks';
import { getLanguageColor, filterRepositories, sortRepositories } from '../lib/github';
import { GITHUB_USERNAME } from '../lib/constants';

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
    <section id="repositories" className="py-20 lg:py-28 bg-white dark:bg-[#121110]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-3 block">
            Repositories
          </span>
          <h2 className="section-title text-[#1a1814] dark:text-[#faf8f5] mb-4">
            All projects
          </h2>
          <p className="section-subtitle text-left mx-0 max-w-lg">
            Fetched from GitHub. Always current.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-4 items-center"
        >
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1814]/30 dark:text-[#faf8f5]/30" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-[#1a1814]/10 dark:border-[#faf8f5]/10 text-[#1a1814] dark:text-[#faf8f5] placeholder-[#1a1814]/30 dark:placeholder-[#faf8f5]/30 focus:outline-none focus:border-primary-500 transition-colors text-sm"
            />
          </div>

          {/* Language Filters */}
          <div className="flex flex-wrap gap-1">
            {LANGUAGE_FILTERS.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === lang
                    ? 'bg-[#1a1814] dark:bg-[#faf8f5] text-[#faf8f5] dark:text-[#1a1814]'
                    : 'text-[#1a1814]/50 dark:text-[#faf8f5]/50 hover:text-[#1a1814] dark:hover:text-[#faf8f5]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1.5 bg-transparent border border-[#1a1814]/10 dark:border-[#faf8f5]/10 text-[#1a1814] dark:text-[#faf8f5] text-xs focus:outline-none focus:border-primary-500 cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <RefreshCw className="w-6 h-6 text-[#1a1814]/30 dark:text-[#faf8f5]/30" />
            </motion.div>
            <p className="mt-3 text-sm text-[#1a1814]/50 dark:text-[#faf8f5]/50">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-16 text-center">
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1a1814] dark:bg-[#faf8f5] text-[#faf8f5] dark:text-[#1a1814]"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAndSortedRepos.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-[#1a1814]/50 dark:text-[#faf8f5]/50">
              No repositories match your criteria.
            </p>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && !error && filteredAndSortedRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredAndSortedRepos.map((repo, index) => (
              <motion.article
                key={repo.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="group p-5 bg-[#faf8f5] dark:bg-[#1a1814] border border-[#1a1814]/6 dark:border-[#faf8f5]/6 hover:border-[#1a1814]/12 dark:hover:border-[#faf8f5]/12 transition-colors"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  {repo.language && (
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span className="text-xs text-[#1a1814]/50 dark:text-[#faf8f5]/50">
                        {repo.language}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-[#1a1814]/40 dark:text-[#faf8f5]/40">
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
                <h3 className="text-base font-medium text-[#1a1814] dark:text-[#faf8f5] mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {repo.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#1a1814]/50 dark:text-[#faf8f5]/50 mb-4 line-clamp-2">
                  {repo.description || 'No description'}
                </p>

                {/* Links */}
                <div className="flex items-center gap-3 text-xs">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#1a1814]/50 dark:text-[#faf8f5]/50 hover:text-[#1a1814] dark:hover:text-[#faf8f5] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source
                  </a>
                  {repo.has_pages && (
                    <a
                      href={`https://animeshkundu.github.io/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Demo
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Count */}
        {!loading && !error && filteredAndSortedRepos.length > 0 && (
          <p className="mt-6 text-xs text-[#1a1814]/40 dark:text-[#faf8f5]/40">
            {filteredAndSortedRepos.length} of {repos.length} repositories
          </p>
        )}
      </div>
    </section>
  );
}
