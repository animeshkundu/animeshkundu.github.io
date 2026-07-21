import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTheme } from '../hooks/useTheme';

class MockMediaQueryList extends EventTarget implements MediaQueryList {
  matches: boolean;
  readonly media = '(prefers-color-scheme: dark)';
  onchange: ((this: MediaQueryList, event: MediaQueryListEvent) => unknown) | null = null;

  constructor(matches: boolean) {
    super();
    this.matches = matches;
  }

  addListener(
    _callback: ((this: MediaQueryList, event: MediaQueryListEvent) => unknown) | null,
  ): void {}

  removeListener(
    _callback: ((this: MediaQueryList, event: MediaQueryListEvent) => unknown) | null,
  ): void {}

  setMatches(matches: boolean): void {
    this.matches = matches;
    const event = new Event('change');
    Object.defineProperties(event, {
      matches: { value: matches },
      media: { value: this.media },
    });
    this.dispatchEvent(event);
  }
}

function mockSystemTheme(matches: boolean): MockMediaQueryList {
  const mediaQuery = new MockMediaQueryList(matches);
  vi.mocked(window.matchMedia).mockReturnValue(mediaQuery);
  return mediaQuery;
}

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(window.localStorage.getItem).mockReturnValue(null);
    document.documentElement.classList.remove('dark');
  });

  it('uses and follows the system theme without persisting it', () => {
    const mediaQuery = mockSystemTheme(true);
    const removeEventListener = vi.spyOn(mediaQuery, 'removeEventListener');
    const { result, unmount } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(true);
    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.setItem).not.toHaveBeenCalled();

    act(() => mediaQuery.setMatches(false));

    expect(result.current.isDark).toBe(false);
    expect(document.documentElement).not.toHaveClass('dark');
    expect(window.localStorage.setItem).not.toHaveBeenCalled();

    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('gives a saved light preference precedence over the system theme', () => {
    vi.mocked(window.localStorage.getItem).mockReturnValue('light');
    const mediaQuery = mockSystemTheme(true);
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(false);
    expect(document.documentElement).not.toHaveClass('dark');

    act(() => mediaQuery.setMatches(true));

    expect(result.current.isDark).toBe(false);
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('persists explicit dark and light choices', () => {
    mockSystemTheme(false);
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggle());

    expect(result.current.isDark).toBe(true);
    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.setItem).toHaveBeenLastCalledWith('theme', 'dark');

    act(() => result.current.toggle());

    expect(result.current.isDark).toBe(false);
    expect(document.documentElement).not.toHaveClass('dark');
    expect(window.localStorage.setItem).toHaveBeenLastCalledWith('theme', 'light');
  });

  it('ignores invalid saved values and falls back to the system theme', () => {
    vi.mocked(window.localStorage.getItem).mockReturnValue('sepia');
    mockSystemTheme(true);
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(true);
    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.setItem).not.toHaveBeenCalled();
  });

  it('continues with the system theme when storage cannot be read', () => {
    const storageError = new DOMException('Storage access denied', 'SecurityError');
    vi.mocked(window.localStorage.getItem).mockImplementation(() => {
      throw storageError;
    });
    mockSystemTheme(true);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(true);
    expect(warn).toHaveBeenCalledWith('Unable to read the saved theme preference.', storageError);
    warn.mockRestore();
  });

  it('keeps the selected theme in memory when storage cannot be written', () => {
    const storageError = new DOMException('Storage access denied', 'SecurityError');
    vi.mocked(window.localStorage.setItem).mockImplementation(() => {
      throw storageError;
    });
    mockSystemTheme(false);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggle());

    expect(result.current.isDark).toBe(true);
    expect(document.documentElement).toHaveClass('dark');
    expect(warn).toHaveBeenCalledWith('Unable to save the theme preference.', storageError);
    warn.mockRestore();
  });
});
