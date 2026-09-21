import { PageTab } from '../types';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.printionupstudio.profileos';
export const SITE_ORIGIN = 'https://abuzargaffaris.github.io';
export const REPO_NAME = 'ProfileOS';

export const VALID_TABS: PageTab[] = [
  'home',
  'features',
  'how-it-works',
  'preview',
  'platforms',
  'help',
  'about',
  'blog',
  'privacy',
  'terms',
];

/**
 * Calculates the repository base URL path (e.g. '/ProfileOS' on GitHub Pages or '' on custom domains/localhost)
 */
export function getBaseUrlPath(): string {
  if (typeof window === 'undefined') return `/${REPO_NAME}`;
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);

  // If on *.github.io or path starts with repository name
  if (
    window.location.hostname.includes('github.io') ||
    (segments.length > 0 && segments[0].toLowerCase() === REPO_NAME.toLowerCase())
  ) {
    return `/${REPO_NAME}`;
  }

  return '';
}

/**
 * Generates the clean absolute or base-relative URL path for a given tab
 * e.g.
 * - home: '/ProfileOS/' on GitHub Pages, '/' on custom domain
 * - features: '/ProfileOS/features' on GitHub Pages, '/features' on custom domain
 */
export function getUrlForTab(tab: PageTab, slug?: string): string {
  const basePath = getBaseUrlPath();
  if (tab === 'home') {
    return basePath ? `${basePath}/` : '/';
  }
  if (tab === 'blog' && slug) {
    return basePath ? `${basePath}/blog/${slug}` : `/blog/${slug}`;
  }
  return basePath ? `${basePath}/${tab}` : `/${tab}`;
}

/**
 * Generates the canonical full HTTPS URL for a given tab (for SEO, Schema.org, OpenGraph)
 * e.g. https://abuzargaffaris.github.io/ProfileOS/features
 */
export function getFullUrlForTab(tab: PageTab, slug?: string): string {
  if (tab === 'home') {
    return `${SITE_ORIGIN}/${REPO_NAME}/`;
  }
  if (tab === 'blog' && slug) {
    return `${SITE_ORIGIN}/${REPO_NAME}/blog/${slug}`;
  }
  return `${SITE_ORIGIN}/${REPO_NAME}/${tab}`;
}

/**
 * Extracts blog slug if current URL is /blog/:slug
 */
export function getBlogSlugFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParam = urlParams.get('p') || urlParams.get('tab');
    if (redirectParam) {
      const parts = decodeURIComponent(redirectParam).replace(/^\/+/, '').split('/');
      if (parts[0].toLowerCase() === 'blog' && parts[1]) {
        return parts[1];
      }
    }
  } catch {
    // Ignore
  }

  const segments = window.location.pathname.split('/').filter(Boolean);
  const blogIdx = segments.findIndex(s => s.toLowerCase() === 'blog');
  if (blogIdx !== -1 && segments[blogIdx + 1]) {
    return segments[blogIdx + 1];
  }

  if (window.location.hash) {
    const hashParts = window.location.hash.replace(/^#\/?/, '').split('/');
    if (hashParts[0].toLowerCase() === 'blog' && hashParts[1]) {
      return hashParts[1];
    }
  }

  return null;
}

/**
 * Extracts the active tab from current URL pathname, 404-redirect query, or legacy hash
 */
export function getTabFromUrl(): PageTab {
  if (typeof window === 'undefined') return 'home';

  // 0. Check history state if set by previous navigation
  try {
    if (window.history?.state?.tab && VALID_TABS.includes(window.history.state.tab)) {
      return window.history.state.tab;
    }
  } catch {
    // Ignore
  }

  // 1. Check if redirected from GitHub Pages 404.html (e.g. ?p=/features or ?tab=features)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParam = urlParams.get('p') || urlParams.get('tab');
    if (redirectParam) {
      const clean = decodeURIComponent(redirectParam).replace(/^\/+/, '').split('/')[0].toLowerCase();
      if (VALID_TABS.includes(clean as PageTab)) {
        return clean as PageTab;
      }
    }
  } catch {
    // Ignore URL parse errors
  }

  // 2. Check path segments for any valid tab (e.g. /ProfileOS/blog/backup-and-restore or /features)
  const segments = window.location.pathname.split('/').filter(Boolean);
  for (let i = segments.length - 1; i >= 0; i--) {
    const seg = segments[i].toLowerCase();
    if (VALID_TABS.includes(seg as PageTab)) {
      return seg as PageTab;
    }
  }

  // 3. Fallback for legacy bookmarks containing hash (e.g. #features or #blog)
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
 * (e.g. '/ProfileOS/screenshots/...' on GitHub Pages, or '/screenshots/...' on localhost)
 * Handles idempotency so multiple calls never duplicate the base path or URL encode twice.
 */
export function getAssetUrl(relativePath: string): string {
  if (!relativePath) return '';
  // Return early for external URLs or data/blob URLs
  if (
    relativePath.startsWith('http://') ||
    relativePath.startsWith('https://') ||
    relativePath.startsWith('data:') ||
    relativePath.startsWith('blob:')
  ) {
    return relativePath;
  }

  const basePath = typeof window !== 'undefined' ? getBaseUrlPath().replace(/\/+$/, '') : '';

  // Decode first to prevent %20 -> %2520 double encoding
  let clean = relativePath;
  try {
    clean = decodeURI(clean);
  } catch {
    // Keep as is if decode fails
  }

  // If already prefixed with basePath, strip it so we don't duplicate it
  if (basePath && clean.startsWith(basePath)) {
    clean = clean.slice(basePath.length);
  }

  // Strip leading slashes
  clean = clean.replace(/^\/+/, '');

  const resolved = basePath ? `${basePath}/${clean}` : `/${clean}`;
  return encodeURI(resolved);
}

/**
 * Updates the browser URL to clean path without '#' symbol
 * E.g.
 * - home -> https://username.github.io/ProfileOS/
 * - features -> https://username.github.io/ProfileOS/features
 */
export function updateUrlForTab(tab: PageTab, replace = false, slug?: string): void {
  const targetPath = getUrlForTab(tab, slug);

  // Preserve non-internal search params, clean up '?p=' and '?tab='
  let searchStr = '';
  try {
    const params = new URLSearchParams(window.location.search);
    params.delete('p');
    params.delete('tab');
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
      window.history.replaceState({ tab, slug }, '', finalUrl);
    } else {
      window.history.pushState({ tab, slug }, '', finalUrl);
    }
  } catch {
    // Safe fallback if sandboxed iframe blocks history
  }
}
