import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from '../components/Hero';

describe('Hero', () => {
  it('presents the homepage introduction as a labeled landmark', () => {
    render(<Hero />);

    const hero = screen.getByRole('region', { name: /I build tools that developers love/i });
    expect(within(hero).getByRole('heading', { level: 1 })).toHaveTextContent(
      'I build tools that developers love',
    );
    expect(within(hero).getByText(/Full-stack developer crafting privacy-first web applications/)).toBeVisible();
  });

  it('links visitors to projects and live demos', () => {
    render(<Hero />);

    expect(screen.getByRole('link', { name: 'Explore Projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Try Live Demos' })).toHaveAttribute('href', '#demos');
  });

  it('exposes its supporting capabilities as a list', () => {
    render(<Hero />);

    const capabilities = screen.getByRole('list', { name: 'Core capabilities' });
    expect(within(capabilities).getAllByRole('listitem')).toHaveLength(3);
  });
});

