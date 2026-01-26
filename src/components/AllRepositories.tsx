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
    <section id="repositories" className="py-20 lg:py-28 bg-white dark:bg-[#1a1a1a]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-primary-600 dark:text-dark-primary mb-3 block">
            Repositories
          </span>
          <h2 className="section-title text-[#1a1814] dark:text-[#e8e6e3] mb-4">
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
          className="mb-8 flex flex-col gap-4 items-start md:flex-row md:flex-wrap md:items-center"
        >
          {/* Search */}
          <div className="relative w-full md:flex-1 md:min-w-[200px] md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1814]/30 dark:text-[#a0a0a0]" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-[#1a1814]/10 dark:border-[#3a3a3a] text-[#1a1814] dark:text-[#e8e6e3] placeholder-[#1a1814]/30 dark:placeholder-[#8a8a8a] focus:outline-none focus:border-primary-500 dark:focus:ring-1 dark:focus:ring-primary-500/50 transition-colors text-sm"
            />
          </div>

          {/* Language Filters */}
          <div className="flex flex-wrap gap-1">
            {LANGUAGE_FILTERS.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-3 py-2 sm:py-1.5 text-xs font-medium transition-colors ${
                  filter === lang
                    ? 'bg-[#1a1814] dark:bg-[#e8e6e3] text-[#faf8f5] dark:text-[#1a1814]'
                    : 'text-[#1a1814]/50 dark:text-[#a0a0a0] hover:text-[#1a1814] dark:hover:text-[#e8e6e3]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Sort */}
          <label className="flex items-center gap-2 text-xs text-[#1a1814]/50 dark:text-[#a0a0a0]">
            <span className="lg:hidden">Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 sm:py-1.5 bg-[#faf8f5] dark:bg-[#1e1e1e] border border-[#1a1814]/10 dark:border-[#3a3a3a] text-[#1a1814] dark:text-[#e8e6e3] text-xs focus:outline-none focus:border-primary-500 dark:focus:border-dark-primary dark:focus:ring-1 dark:focus:ring-primary-500/50 cursor-pointer"
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
          <div className="py-16 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <RefreshCw className="w-6 h-6 text-[#1a1814]/30 dark:text-[#5a5a5a]" />
            </motion.div>
            <p className="mt-3 text-sm text-[#1a1814]/50 dark:text-[#a0a0a0]">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-16 text-center">
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={refetch}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#1a1814] dark:bg-[#e8e6e3] text-[#faf8f5] dark:text-[#1a1814]"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAndSortedRepos.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-[#1a1814]/50 dark:text-[#a0a0a0]">
              No repositories match your criteria.
            </p>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && !error && filteredAndSortedRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-4"
          >
            {filteredAndSortedRepos.map((repo, index) => {
              const demoUrl = getRepositoryDemoUrl(repo);

              return (
                <motion.article
                  key={repo.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="group p-6 sm:p-5 bg-[#faf8f5] dark:bg-[#1e1e1e] border border-[#1a1814]/6 dark:border-[#3a3a3a] hover:border-[#1a1814]/12 dark:hover:border-[#4a4a4a] transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    {repo.language && (
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span className="text-xs text-[#1a1814]/50 dark:text-[#a0a0a0]">
                          {repo.language}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-[#1a1814]/40 dark:text-[#707070]">
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
                  <h3 className="text-base font-medium text-[#1a1814] dark:text-[#e8e6e3] mb-2 group-hover:text-primary-600 dark:group-hover:text-[#f0927a] transition-colors">
                    {repo.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#1a1814]/50 dark:text-[#a0a0a0] mb-4 line-clamp-2">
                    {repo.description || 'No description'}
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-3 text-sm sm:text-xs">
                    {/* Link to project page if exists */}
                    {getProjectBySlug(repo.name) && (
                      <Link
                        to={`/project/${repo.name}`}
                        className="flex items-center gap-1 text-primary-600 dark:text-[#f0927a] hover:text-primary-700 dark:hover:text-[#ffb399] transition-colors font-medium"
                      >
                        Learn more
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#1a1814]/50 dark:text-[#a0a0a0] hover:text-[#1a1814] dark:hover:text-[#e8e6e3] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      Source
                    </a>
                    {demoUrl && (
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[#1a1814]/50 dark:text-[#a0a0a0] hover:text-[#1a1814] dark:hover:text-[#e8e6e3] transition-colors"
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
          <p className="mt-6 text-xs text-[#1a1814]/40 dark:text-[#707070]">
            {filteredAndSortedRepos.length} of {repos.length} repositories
          </p>
        )}
      </div>
    </section>
  );
}
