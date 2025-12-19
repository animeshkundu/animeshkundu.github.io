import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the hooks
vi.mock('../hooks', () => ({
  useTheme: () => ({ isDark: false, toggle: vi.fn() }),
  useGitHubRepos: () => ({
    repos: [],
    loading: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText(/I build tools that/)).toBeInTheDocument();
    // Name appears multiple times (nav, footer), so use getAllBy
    expect(screen.getAllByText('Animesh Kundu').length).toBeGreaterThan(0);
  });

  it('renders navigation links', () => {
    render(<App />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByText('Projects')[0]).toBeInTheDocument();
  });

  it('renders the hero section', () => {
    render(<App />);
    expect(screen.getByText(/Full-stack developer/)).toBeInTheDocument();
  });

  it('renders featured projects section', () => {
    render(<App />);
    expect(screen.getByText('Selected Projects')).toBeInTheDocument();
  });

  it('renders live demos section', () => {
    render(<App />);
    expect(screen.getByText('Try before you clone')).toBeInTheDocument();
  });

  it('renders footer with copyright', () => {
    render(<App />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });
});
