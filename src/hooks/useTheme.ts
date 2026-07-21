import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'theme';
const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';

type ThemePreference = 'dark' | 'light';

interface ThemeState {
  isDark: boolean;
  preference: ThemePreference | null;
}

function readStoredTheme(): ThemePreference | null {
  if (typeof window === 'undefined') return null;

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
  } catch (error) {
    console.warn('Unable to read the saved theme preference.', error);
    return null;
  }
}

function systemPrefersDark(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(DARK_MODE_QUERY).matches
  );
}

function getInitialTheme(): ThemeState {
  const preference = readStoredTheme();
  return {
    isDark: preference ? preference === 'dark' : systemPrefersDark(),
    preference,
  };
}

function saveTheme(preference: ThemePreference): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch (error) {
    console.warn('Unable to save the theme preference.', error);
  }
}

export function useTheme() {
  const [{ isDark, preference }, setTheme] = useState<ThemeState>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    if (preference) {
      saveTheme(preference);
    }
  }, [isDark, preference]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia(DARK_MODE_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme((current) =>
        current.preference === null ? { ...current, isDark: e.matches } : current,
      );
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggle = () => {
    setTheme((current) => {
      const nextIsDark = !current.isDark;
      return {
        isDark: nextIsDark,
        preference: nextIsDark ? 'dark' : 'light',
      };
    });
  };

  return { isDark, toggle };
}
