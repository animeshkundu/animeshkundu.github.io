import type { Repository } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_KEY = 'github_repos_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CacheData {
  timestamp: number;
  data: Repository[];
}

export async function fetchRepositories(username: string): Promise<Repository[]> {
  // Check cache first
  const cached = getCachedRepos();
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');
        const resetDate = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000) : null;
        throw new Error(
          resetDate
            ? `GitHub API rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}.`
            : 'GitHub API rate limit exceeded. Please try again later.'
        );
      }
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    const repos: Repository[] = await response.json();
    
    // Filter out forked repos and the portfolio repo itself
    const filteredRepos = repos.filter(
      (repo) => !repo.fork && !repo.archived
    );

    // Cache the results
    cacheRepos(filteredRepos);

    return filteredRepos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

function cacheRepos(repos: Repository[]): void {
  const cacheData: CacheData = {
    timestamp: Date.now(),
    data: repos,
  };

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to cache repositories:', error);
  }
}

function getCachedRepos(): Repository[] | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const cacheData: CacheData = JSON.parse(cached);
    const age = Date.now() - cacheData.timestamp;

    if (age < CACHE_DURATION) {
      return cacheData.data;
    }

    sessionStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error('Failed to retrieve cached repositories:', error);
    return null;
  }
}

export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    CoffeeScript: '#244776',
  };

  return colors[language || ''] || '#6366f1';
}

export function filterRepositories(
  repos: Repository[],
  filter: string
): Repository[] {
  if (filter === 'all') {
    return repos;
  }

  if (filter === 'other') {
    return repos.filter((repo) => {
      const lang = repo.language;
      return lang && lang !== 'TypeScript' && lang !== 'Python' && lang !== 'JavaScript';
    });
  }

  return repos.filter((repo) => repo.language === filter);
}

export function sortRepositories(
  repos: Repository[],
  sortBy: 'updated' | 'stars' | 'name'
): Repository[] {
  return [...repos].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.stargazers_count - a.stargazers_count;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'updated':
      default:
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });
}

export function getRepositoryDemoUrl(repo: Repository): string | null {
  if (repo.homepage) {
    const trimmed = repo.homepage.trim();
    if (trimmed) {
      return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    }
  }

  if (repo.has_pages) {
    return `https://animeshkundu.github.io/${repo.name}`;
  }

  return null;
}
