import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, Search, RefreshCw, Calendar, ArrowUpDown, Filter } from 'lucide-react';
import { useGitHubRepos } from '../hooks';
import { getLanguageColor, filterRepositories, sortRepositories } from '../lib/github';
import { GITHUB_USERNAME } from '../lib/constants';

const LANGUAGE_FILTERS = ['All', 'TypeScript', 'Python', 'JavaScript', 'Other'];
const SORT_OPTIONS = [
  { value: 'updated', label: 'Recently Updated' },
  { value: 'stars', label: 'Most Stars' },
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
    <section id="repositories" className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-full text-sm font-semibold mb-4">
            Dynamic
          </span>
          <h2 className="section-title text-slate-900 dark:text-white mb-4">
            All Repositories
          </h2>
          <p className="section-subtitle">
            Automatically fetched from GitHub — always up to date
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {/* Language Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="w-4 h-4 text-slate-400" />
              {LANGUAGE_FILTERS.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setFilter(lang)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    filter === lang
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <RefreshCw className="w-10 h-10 text-primary-500" />
            </motion.div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading repositories...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="btn-primary"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAndSortedRepos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-600 dark:text-slate-400">
              No repositories found matching your criteria.
            </p>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && !error && filteredAndSortedRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAndSortedRepos.map((repo, index) => (
              <motion.article
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  {repo.language && (
                    <span
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: `${getLanguageColor(repo.language)}20`,
                        color: getLanguageColor(repo.language),
                      }}
                    >
                      {repo.language}
                    </span>
                  )}
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                  {repo.name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                  {repo.description || 'No description available'}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(repo.updated_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {repo.has_pages && (
                      <a
                        href={`https://animeshkundu.github.io/${repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                        aria-label="View Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Count */}
        {!loading && !error && filteredAndSortedRepos.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm"
          >
            Showing {filteredAndSortedRepos.length} of {repos.length} repositories
          </motion.p>
        )}
      </div>
    </section>
  );
}
