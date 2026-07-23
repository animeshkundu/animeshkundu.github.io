import { productionOrigin } from '../data/routes';

const ensureTrailingSlash = (value: string) =>
  value.endsWith('/') ? value : `${value}/`;

export const basePath = ensureTrailingSlash(import.meta.env.BASE_URL || '/');

export const withBase = (path: string) => {
  if (/^(?:https?:|mailto:|tel:|#)/.test(path)) {
    return path;
  }

  const normalizedPath = path.replace(/^\/+/, '');
  return normalizedPath ? `${basePath}${normalizedPath}` : basePath;
};

export const canonicalUrl = (path: string) =>
  new URL(path.replace(/^\/?/, '/'), productionOrigin).toString();
