import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchRepositories,
  getLanguageColor,
  filterRepositories,
  sortRepositories,
} from '../lib/github';
import type { Repository } from '../types';

const mockRepos: Repository[] = [
  {
    id: 1,
    name: 'repo-one',
    full_name: 'test/repo-one',
    html_url: 'https://github.com/test/repo-one',
    description: 'Test repo one',
    language: 'TypeScript',
    stargazers_count: 100,
    forks_count: 20,
    open_issues_count: 5,
    updated_at: '2025-12-01T00:00:00Z',
    created_at: '2024-01-01T00:00:00Z',
    has_pages: true,
    homepage: null,
    topics: ['react', 'typescript'],
    fork: false,
    archived: false,
  },
  {
    id: 2,
    name: 'repo-two',
    full_name: 'test/repo-two',
    html_url: 'https://github.com/test/repo-two',
    description: 'Test repo two',
    language: 'Python',
    stargazers_count: 50,
    forks_count: 10,
    open_issues_count: 2,
    updated_at: '2025-11-01T00:00:00Z',
    created_at: '2024-02-01T00:00:00Z',
    has_pages: false,
    homepage: null,
    topics: ['python'],
    fork: false,
    archived: false,
  },
  {
    id: 3,
    name: 'alpha-repo',
    full_name: 'test/alpha-repo',
    html_url: 'https://github.com/test/alpha-repo',
    description: 'Alpha repo',
    language: 'JavaScript',
    stargazers_count: 200,
    forks_count: 30,
    open_issues_count: 10,
    updated_at: '2025-10-01T00:00:00Z',
    created_at: '2024-03-01T00:00:00Z',
    has_pages: true,
    homepage: null,
    topics: [],
    fork: false,
    archived: false,
  },
];

describe('github utilities', () => {
  describe('getLanguageColor', () => {
    it('returns correct color for TypeScript', () => {
      expect(getLanguageColor('TypeScript')).toBe('#3178c6');
    });

    it('returns correct color for Python', () => {
      expect(getLanguageColor('Python')).toBe('#3572A5');
    });

    it('returns correct color for JavaScript', () => {
      expect(getLanguageColor('JavaScript')).toBe('#f1e05a');
    });

    it('returns default color for unknown language', () => {
      expect(getLanguageColor('Unknown')).toBe('#6366f1');
    });

    it('returns default color for null', () => {
      expect(getLanguageColor(null)).toBe('#6366f1');
    });
  });

  describe('filterRepositories', () => {
    it('returns all repos when filter is "all"', () => {
      const result = filterRepositories(mockRepos, 'all');
      expect(result).toHaveLength(3);
    });

    it('filters by TypeScript', () => {
      const result = filterRepositories(mockRepos, 'TypeScript');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('repo-one');
    });

    it('filters by Python', () => {
      const result = filterRepositories(mockRepos, 'Python');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('repo-two');
    });

    it('filters other languages', () => {
      const result = filterRepositories(mockRepos, 'other');
      expect(result).toHaveLength(0);
    });
  });

  describe('sortRepositories', () => {
    it('sorts by updated date (default)', () => {
      const result = sortRepositories(mockRepos, 'updated');
      expect(result[0].name).toBe('repo-one');
      expect(result[2].name).toBe('alpha-repo');
    });

    it('sorts by stars', () => {
      const result = sortRepositories(mockRepos, 'stars');
      expect(result[0].name).toBe('alpha-repo');
      expect(result[0].stargazers_count).toBe(200);
    });

    it('sorts by name', () => {
      const result = sortRepositories(mockRepos, 'name');
      expect(result[0].name).toBe('alpha-repo');
      expect(result[2].name).toBe('repo-two');
    });
  });

  describe('fetchRepositories', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      sessionStorage.getItem = vi.fn().mockReturnValue(null);
    });

    it('fetches repos from GitHub API', async () => {
      (globalThis as unknown as { fetch: typeof fetch }).fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockRepos),
      }) as unknown as typeof fetch;

      const repos = await fetchRepositories('testuser');
      expect(repos).toHaveLength(3);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/users/testuser/repos?per_page=100&sort=updated',
        expect.any(Object)
      );
    });

    it('throws error on rate limit', async () => {
      (globalThis as unknown as { fetch: typeof fetch }).fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        headers: new Map([['X-RateLimit-Reset', '1234567890']]),
      }) as unknown as typeof fetch;

      await expect(fetchRepositories('testuser')).rejects.toThrow(/rate limit/i);
    });

    it('throws error on API failure', async () => {
      (globalThis as unknown as { fetch: typeof fetch }).fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      }) as unknown as typeof fetch;

      await expect(fetchRepositories('testuser')).rejects.toThrow(/Failed to fetch/);
    });
  });
});
