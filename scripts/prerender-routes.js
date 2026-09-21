import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_ORIGIN = 'https://abuzargaffaris.github.io/ProfileOS';

const ROUTES = [
  {
    path: 'features',
    title: 'Features & Capabilities — ProfileOS | Offline Identity Manager',
    description: 'Discover ProfileOS features: Swipe Right to copy links, Swipe Left for Smart Share templates, Privacy Shield masking, QR code generation, and 229+ platforms.',
    keywords: 'ProfileOS features, swipe right copy link, swipe left smart share, dynamic share templates, privacy shield mode, offline QR code generator, 229+ platforms, custom link favicon, local SQLite database, Android Room storage'
  },
  {
    path: 'how-it-works',
    title: 'How ProfileOS Works — Quick Guide & Gesture Shortcuts',
    description: 'Learn how ProfileOS keeps your social profiles organized with local SQLite storage, dynamic share tokens, and zero cloud tracking.',
    keywords: 'how ProfileOS works, organize social handles, create profile spaces, swipe right copy link, swipe left share template, offline identity manager tutorial, smart tokens guide'
  },
  {
    path: 'preview',
    title: 'Interactive App Preview & Screens — ProfileOS',
    description: 'Experience the interactive ProfileOS mobile preview. Discover gestures, dark mode, privacy mode, QR code presenter, and instant search.',
    keywords: 'ProfileOS preview, interactive mobile mockup, ProfileOS Android app demo, gestures demo, dark mode offline app, privacy shield demo'
  },
  {
    path: 'platforms',
    title: '229+ Supported Platforms & Custom Links — ProfileOS',
    description: 'Browse all 229+ supported social media, developer, design, and creator platforms in ProfileOS, plus unlimited custom URLs.',
    keywords: 'ProfileOS platforms, 229+ supported social networks, developer links, github, instagram, youtube, custom website favicon, local link library'
  },
  {
    path: 'about',
    title: 'About ProfileOS & PrintionUp Studio — Privacy-First Mission',
    description: 'Read the story behind ProfileOS, built by PrintionUp Studio to give users complete offline ownership of their digital identity without ads or cloud bloat.',
    keywords: 'about ProfileOS, PrintionUp Studio, privacy-first mission, local-first software, com.printionupstudio.profileos, Android offline utility'
  },
  {
    path: 'help',
    title: 'Help Center & Knowledge Base — ProfileOS',
    description: 'Find answers to frequently asked questions about ProfileOS offline storage, gesture shortcuts, backup exports, and privacy protection.',
    keywords: 'ProfileOS help center, FAQ, backup export JSON, offline profile manager questions, gesture shortcuts help'
  },
  {
    path: 'blog',
    title: 'Blog & Engineering Insights — ProfileOS',
    description: 'Explore in-depth articles on ProfileOS local-first architecture, Android Automatic Backup, SQLite Room design, and open JSON/Markdown data standards.',
    keywords: 'ProfileOS blog, local-first architecture, backup and restore, SQLite Room database, zero telemetry, Android Auto Backup for Apps, privacy engineering'
  },
  {
    path: 'blog/backup-and-restore',
    title: 'ProfileOS Backup & Restore: How Your Data Is Protected — ProfileOS Blog',
    description: 'Learn how ProfileOS safeguards your local-first digital identity with Android Automatic Backup and portable JSON/Markdown manual exports. Zero cloud tracking.',
    keywords: 'ProfileOS blog, ProfileOS backup and restore, how ProfileOS protects data, Android Auto Backup for Apps, SQLite Room database backup, ProfileOS manual export, JSON Markdown export, local-first backup philosophy, Android 9 backup client side encryption'
  },
  {
    path: 'privacy',
    title: 'Privacy Policy — 100% On-Device Offline Architecture | ProfileOS',
    description: 'Official Privacy Policy for ProfileOS. We do not collect, transmit, store, or sell any personal data. Everything remains 100% on your device.',
    keywords: 'ProfileOS privacy policy, zero data collection, offline android app privacy, no cloud tracking, local storage privacy'
  },
  {
    path: 'terms',
    title: 'Terms of Service — ProfileOS by PrintionUp Studio',
    description: 'Terms of Service for ProfileOS application and website. Simple, transparent, and user-first.',
    keywords: 'ProfileOS terms of service, PrintionUp Studio terms, user-first license'
  }
];

function prerender() {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf-8');

  for (const route of ROUTES) {
    const routeUrl = `${BASE_ORIGIN}/${route.path}`;

    // Replace meta tags for root-level HTML file (e.g. dist/features.html)
    let fileHtml = baseHtml
      .replace(
        /<title>.*?<\/title>/,
        `<title>${route.title}</title>`
      )
      .replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
        `<meta name="description" content="${route.description}" />`
      )
      .replace(
        /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/,
        `<meta name="keywords" content="${route.keywords}" />`
      )
      .replace(
        /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
        `<meta property="og:title" content="${route.title}" />`
      )
      .replace(
        /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
        `<meta property="og:description" content="${route.description}" />`
      )
      .replace(
        /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
        `<meta property="og:url" content="${routeUrl}" />`
      )
      .replace(
        /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
        `<link rel="canonical" href="${routeUrl}" />`
      )
      .replace(
        /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
        `<meta name="twitter:title" content="${route.title}" />`
      )
      .replace(
        /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
        `<meta name="twitter:description" content="${route.description}" />`
      );

    // Write root-level file: dist/features.html (serves /features on GitHub Pages without trailing slash)
    const flatFilePath = path.join(DIST_DIR, `${route.path}.html`);
    fs.writeFileSync(flatFilePath, fileHtml, 'utf-8');

    // Create subfolder for directory URL (e.g. dist/features/index.html)
    // Needs relative paths prefixed with "../" for assets
    const dirPath = path.join(DIST_DIR, route.path);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let nestedHtml = fileHtml
      .replace(/(src|href)="\.\/assets\//g, '$1="../assets/')
      .replace(/(src|href)="\.\/favicon/g, '$1="../favicon')
      .replace(/(src|href)="\.\/android-chrome/g, '$1="../android-chrome')
      .replace(/(src|href)="\.\/apple-touch-icon/g, '$1="../apple-touch-icon')
      .replace(/(src|href)="\.\/og-image/g, '$1="../og-image');

    const nestedFilePath = path.join(dirPath, 'index.html');
    fs.writeFileSync(nestedFilePath, nestedHtml, 'utf-8');

    console.log(`Prerendered: ${route.path}.html and ${route.path}/index.html`);
  }
}

prerender();
