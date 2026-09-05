import { PageTab } from '../types';

export const VALID_TABS: PageTab[] = [
  'home',
  'features',
  'how-it-works',
  'preview',
  'platforms',
  'help',
  'about',
  'privacy',
  'terms',
];

/**
 * Calculates the repository base URL path (e.g. '/ProfileOS' on GitHub Pages or '' on custom domains/localhost)
 */
export function getBaseUrlPath(): string {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);

  // If the last segment is one of our app tabs, remove it to find the base prefix
  if (segments.length > 0 && VALID_TABS.includes(segments[segments.length - 1] as PageTab)) {
    segments.pop();
  }

  return segments.length > 0 ? `/${segments.join('/')}` : '';
}

/**
 * Extracts the active tab from current URL pathname, 404-redirect query, or legacy hash
 */
export function getTabFromUrl(): PageTab {
  // 1. Check if redirected from GitHub Pages 404.html (e.g. ?p=/features)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParam = urlParams.get('p');
    if (redirectParam) {
      const clean = decodeURIComponent(redirectParam).replace(/^\/+/, '').split('/')[0].toLowerCase();
      if (VALID_TABS.includes(clean as PageTab)) {
        return clean as PageTab;
      }
    }
  } catch {
    // Ignore URL parse errors
  }

  // 2. Check path segments
  const segments = window.location.pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const last = segments[segments.length - 1].toLowerCase();
    if (VALID_TABS.includes(last as PageTab)) {
      return last as PageTab;
    }
  }

  // 3. Fallback for legacy bookmarks containing hash (e.g. #features)
  if (window.location.hash) {
    const cleanHash = window.location.hash.replace(/^#\/?/, '').split('/')[0].toLowerCase();
    if (VALID_TABS.includes(cleanHash as PageTab)) {
      return cleanHash as PageTab;
    }
  }

  return 'home';
}

/**
 * Safely resolves any static asset path against the application base URL
 * (e.g. '/ProfileOS/assets/...' on GitHub Pages, or '/assets/...' on localhost)
 */
export function getAssetUrl(relativePath: string): string {
  if (!relativePath) return '';
  // Return early for external URLs or data URLs
  if (
    relativePath.startsWith('http://') ||
    relativePath.startsWith('https://') ||
    relativePath.startsWith('data:') ||
    relativePath.startsWith('blob:')
  ) {
    return relativePath;
  }

  const clean = relativePath.replace(/^\/+/, '');
  const basePath = typeof window !== 'undefined' ? getBaseUrlPath().replace(/\/+$/, '') : '';

  const resolved = basePath ? `${basePath}/${clean}` : `/${clean}`;
  return encodeURI(resolved);
}

/**
 * Updates the browser URL to clean path without '#' symbol
 * E.g.
 * - home -> https://username.github.io/ProfileOS/
 * - features -> https://username.github.io/ProfileOS/features
 */
export function updateUrlForTab(tab: PageTab, replace = false): void {
  const basePath = getBaseUrlPath();
  const targetPath = tab === 'home' ? (basePath ? `${basePath}/` : '/') : `${basePath}/${tab}`;

  // Preserve non-internal search params, clean up '?p='
  let searchStr = '';
  try {
    const params = new URLSearchParams(window.location.search);
    params.delete('p');
    const remaining = params.toString();
    if (remaining) {
      searchStr = `?${remaining}`;
    }
  } catch {
    // Ignore
  }

  const finalUrl = `${targetPath}${searchStr}`;

  try {
    if (replace) {
      window.history.replaceState({ tab }, '', finalUrl);
    } else {
      window.history.pushState({ tab }, '', finalUrl);
    }
  } catch {
    // Safe fallback if sandboxed iframe blocks history
  }
}
