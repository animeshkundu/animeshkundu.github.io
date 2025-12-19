import { useState, useEffect, useCallback } from 'react';
import type { Repository } from '../types';
import { fetchRepositories } from '../lib/github';

interface UseGitHubReposReturn {
  repos: Repository[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGitHubRepos(username: string): UseGitHubReposReturn {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRepos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchRepositories(username);
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load repositories');
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadRepos();
  }, [loadRepos]);

  return { repos, loading, error, refetch: loadRepos };
}
