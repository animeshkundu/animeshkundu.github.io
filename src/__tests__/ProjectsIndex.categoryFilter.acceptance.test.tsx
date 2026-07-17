import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ProjectsIndex } from '../components/ProjectsIndex';

/**
 * Acceptance test for the category filter chips on the /projects grid.
 *
 * The capability under test: an interactive row of accessible <button> filter
 * chips (an "All" chip plus one chip per non-empty category) that narrows the
 * visible project grid to the selected category, with "All" restoring the full
 * multi-section grid.
 *
 * On the untouched base branch categories render only as read-only <h2>
 * section headings, so the filter-chip <button> elements do not exist and this
 * spec FAILS. Once the chips + selection state + conditional rendering are
 * implemented it PASSES.
 *
 * Project titles used as fixtures (from src/lib/projects.ts):
 *   - "Mermaid Editor" -> web-tools
 *   - "PyFlix"         -> python-utilities
 *   - "Flake"          -> php
 */
function renderIndex() {
  return render(
    <MemoryRouter>
      <ProjectsIndex />
    </MemoryRouter>
  );
}

describe('ProjectsIndex category filter chips', () => {
  it('renders an accessible "All" filter chip button', () => {
    renderIndex();
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  it('renders a per-category filter chip button', () => {
    renderIndex();
    expect(
      screen.getByRole('button', { name: 'Python Utilities' })
    ).toBeInTheDocument();
  });

  it('shows the full grid across categories by default', () => {
    renderIndex();
    // A Web Tools card and a Python Utilities card are both visible on load.
    expect(
      screen.getByRole('heading', { name: 'Mermaid Editor' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PyFlix' })).toBeInTheDocument();
    // A PHP-exclusive card is also visible in the default "All" view.
    expect(screen.getByRole('heading', { name: 'Flake' })).toBeInTheDocument();
  });

  it('narrows the grid to only the selected category when a chip is clicked', async () => {
    const user = userEvent.setup();
    renderIndex();

    await user.click(screen.getByRole('button', { name: 'Python Utilities' }));

    // The selected category's cards remain visible...
    expect(screen.getByRole('heading', { name: 'PyFlix' })).toBeInTheDocument();
    // ...while cards exclusive to other categories are removed from the grid.
    expect(
      screen.queryByRole('heading', { name: 'Flake' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Mermaid Editor' })
    ).not.toBeInTheDocument();
  });

  it('restores the full grid when the "All" chip is clicked', async () => {
    const user = userEvent.setup();
    renderIndex();

    await user.click(screen.getByRole('button', { name: 'Python Utilities' }));
    expect(
      screen.queryByRole('heading', { name: 'Flake' })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'All' }));

    // Previously hidden other-category cards are visible again.
    expect(screen.getByRole('heading', { name: 'Flake' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Mermaid Editor' })
    ).toBeInTheDocument();
  });
});
