import { describe, it, expect } from 'vitest';
import { getRepositoryDemoUrl } from '../lib/github';
import type { Repository } from '../types';

/**
 * Regression reproduction for getRepositoryDemoUrl scheme detection.
 *
 * The base implementation decides whether a homepage is already absolute using
 * a bare substring check (`trimmed.startsWith('http')`). That check misclassifies
 * bare domains whose name simply begins with the letters "http" (e.g. "httpie.io"),
 * returning them verbatim and producing a broken relative <a href> in AllRepositories.
 *
 * The correct behavior is to detect a real URL scheme so bare domains are prefixed
 * with "https://" while genuinely absolute URLs (any casing) pass through unchanged.
 *
 * This test asserts the CORRECT behavior and therefore FAILS on the untouched base.
 */

const baseRepo: Repository = {
  id: 42,
  name: 'httpie',
  full_name: 'test/httpie',
  html_url: 'https://github.com/test/httpie',
  description: 'Repo whose homepage domain begins with the letters "http"',
  language: 'Python',
  stargazers_count: 0,
  forks_count: 0,
  open_issues_count: 0,
  updated_at: '2025-12-01T00:00:00Z',
  created_at: '2024-01-01T00:00:00Z',
  has_pages: false,
  homepage: 'httpie.io',
  topics: [],
  fork: false,
  archived: false,
};

describe('getRepositoryDemoUrl scheme detection', () => {
  it('adds https protocol to bare domains starting with the letters http', () => {
    const repo: Repository = { ...baseRepo, homepage: 'httpie.io' };
    expect(getRepositoryDemoUrl(repo, 'testuser')).toBe('https://httpie.io');
  });

  it('prefixes bare domains that literally contain "http" mid-name', () => {
    const repo: Repository = { ...baseRepo, homepage: 'http-example.com' };
    expect(getRepositoryDemoUrl(repo, 'testuser')).toBe('https://http-example.com');
  });

  it('passes through genuinely absolute https URLs unchanged', () => {
    const repo: Repository = { ...baseRepo, homepage: 'https://example.com/repo-one' };
    expect(getRepositoryDemoUrl(repo, 'testuser')).toBe('https://example.com/repo-one');
  });

  it('passes through genuinely absolute http URLs unchanged', () => {
    const repo: Repository = { ...baseRepo, homepage: 'http://example.com/plain' };
    expect(getRepositoryDemoUrl(repo, 'testuser')).toBe('http://example.com/plain');
  });

  it('prefixes ordinary bare domains that do not begin with http', () => {
    const repo: Repository = { ...baseRepo, homepage: 'repo-two.example.com' };
    expect(getRepositoryDemoUrl(repo, 'testuser')).toBe('https://repo-two.example.com');
  });
});
