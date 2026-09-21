import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'backup-and-restore',
    title: 'ProfileOS Backup & Restore: How Your Data Is Protected',
    subtitle: 'Understanding local-first architecture, Android Auto Backup for Apps, and portable manual exports.',
    author: 'PrintionUp Studio',
    authorRole: 'Core Engineering & Architecture',
    date: 'September 2026',
    readTime: '9 min read',
    category: 'Architecture & Privacy',
    tags: ['Local-First', 'Backup & Restore', 'Android Auto Backup', 'Manual Export', 'Data Ownership', 'SQLite Room'],
    excerpt: 'ProfileOS is built around a foundational principle: your data should stay yours. Learn how Android Auto Backup and manual JSON/Markdown exports work together to protect your digital profiles with zero cloud tracking.',
    featured: true
  },
  {
    slug: 'local-first-vs-cloud-profiles',
    title: 'Why We Chose Local-First: The Architecture of Zero-Telemetry Profiles',
    subtitle: 'How SQLite Room and on-device indexing outperform centralized cloud identity databases in speed, security, and battery efficiency.',
    author: 'PrintionUp Studio',
    authorRole: 'Security & Systems Team',
    date: 'August 2026',
    readTime: '8 min read',
    category: 'Engineering',
    tags: ['Architecture', 'SQLite Room', 'Zero Telemetry', 'Offline-First', 'Privacy'],
    excerpt: 'Most link-sharing and identity tools turn your contacts into cloud telemetry. Discover why storing 229+ platforms directly in SQLite on Android guarantees 0ms latency, 100% offline uptime, and absolute privacy.',
    featured: false
  },
  {
    slug: 'anatomy-of-a-gesture-speed-profile-sharing',
    title: 'Speed of Contact: Mastering Gesture Shortcuts & Instant QR Switching',
    subtitle: 'Designing 4-directional touch interactions for high-stakes networking environments.',
    author: 'PrintionUp Studio',
    authorRole: 'Product & Interaction Design',
    date: 'July 2026',
    readTime: '7 min read',
    category: 'Product & UX',
    tags: ['Gestures', 'QR Codes', 'Networking', 'UX Design', 'Efficiency'],
    excerpt: 'When meeting someone at an event or conference, fiddling through browser bookmarks or social apps takes 20+ seconds. Learn how ProfileOS uses double-taps, swipe directions, and instant QR generation to connect in under 2 seconds.',
    featured: false
  },
  {
    slug: 'portable-identity-json-markdown-standard',
    title: 'The Open Standard for Portable Social Profiles: JSON & Markdown',
    subtitle: 'Why proprietary vendor lock-in is dangerous for digital creators, and how ProfileOS exports keep your data permanently open.',
    author: 'PrintionUp Studio',
    authorRole: 'Open Data Initiative',
    date: 'June 2026',
    readTime: '8 min read',
    category: 'Data Ownership',
    tags: ['Open Standards', 'JSON Export', 'Markdown', 'Data Portability', 'Privacy'],
    excerpt: 'If a link aggregation service shuts down tomorrow, where does your social graph go? Explore ProfileOS open JSON and Markdown schemas designed for universal human readability and frictionless importing.',
    featured: false
  }
];
