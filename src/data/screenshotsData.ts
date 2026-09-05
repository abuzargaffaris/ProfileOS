import { ScreenshotFeature } from '../types';

export const SCREENSHOTS_CATALOG: ScreenshotFeature[] = [
  {
    id: 'dashboard',
    title: 'ProfileOS Main Workspace',
    subtitle: 'Your profiles and handles in one unified, glanceable dashboard',
    category: 'Core Workspace',
    description: 'A clean, uncluttered interface designed to view all social accounts, filter by category (All, Popular, Social & Video), and quickly access copy, sharing, or QR functions.',
    highlights: [
      'Glanceable profile cards with category pills and handles',
      'Instant Category Switcher: All (6), Popular (4), Social & Video (2)',
      'Quick action triggers: Profile switcher, Share, and Add new handle',
      'Private Masking display toggle support'
    ],
    screenKey: 'dashboard',
    imageFileName: 'dashboard.png',
    imageSrc: 'screenshots/dashboard.png'
  },
  {
    id: 'profiles',
    title: 'Profiles Management',
    subtitle: 'Organize personal, work, and studio identities separately',
    category: 'Organization',
    description: 'Switch between separate profile contexts effortlessly. Keep personal accounts, professional freelance links, and studio identities neatly segregated.',
    highlights: [
      'Multi-profile management (Personal, Work, Studio)',
      'Badge indicators showing handles encoded per profile',
      'One-tap switching with visual active state selection',
      'New profile creation and preset import tools'
    ],
    screenKey: 'profiles',
    imageFileName: 'profiles.png',
    imageSrc: 'screenshots/profiles.png'
  },
  {
    id: 'qr',
    title: 'Instant QR Presentation',
    subtitle: 'Turn any profile handle or URL into a high-contrast QR code',
    category: 'Sharing & Access',
    description: 'Showcase your profile link as an ultra-clear, scannable QR code on demand. Perfect for in-person networking, events, and instant camera scans.',
    highlights: [
      'Real-time QR code rendering for any configured profile',
      'Live URL badge verification with green status dot',
      'One-tap "Copy Link" and "Share" action buttons',
      'Clean bottom-sheet presentation'
    ],
    screenKey: 'qr',
    imageFileName: 'qr.png',
    imageSrc: 'screenshots/qr.png'
  },
  {
    id: 'handle-details',
    title: 'Handle Details & Action Sheet',
    subtitle: 'Open, edit, share, or transfer handles with speed',
    category: 'Handle Actions',
    description: 'Tap any handle to inspect details, open directly in your default browser, share custom dynamic snippets, or modify linking behavior.',
    highlights: [
      'One-tap "Open in Browser" action',
      'Action suite: Share, Edit, and Transfer profile assignments',
      'Configurable link click behavior (Default Browser vs in-app)',
      'Dynamic variable token insertion'
    ],
    screenKey: 'handle-details',
    imageFileName: 'handle-details.png',
    imageSrc: 'screenshots/handle-details.png'
  },
  {
    id: 'add-handle',
    title: 'Add Social Handle',
    subtitle: 'Add profiles and custom URLs in seconds with smart suggestions',
    category: 'Adding & Input',
    description: 'Quickly connect any platform handle or custom URL. Enjoy real-time validation, automatic prefix handling, and instant preview before saving.',
    highlights: [
      'Platform picker with 229+ catalog services',
      'Handle suggestions based on existing usernames',
      'Live card preview showing the rendered profile card',
      'Custom URL and deep-link override support'
    ],
    screenKey: 'add-handle',
    imageFileName: 'add-handle.png',
    imageSrc: 'screenshots/add-handle.png'
  },
  {
    id: 'share-all',
    title: 'Share All Handles',
    subtitle: 'Export your entire profile collection in multiple formats',
    category: 'Export & Share',
    description: 'Generate multi-account shareable texts formatted for Markdown, JSON, or your personalized Custom Template in a single tap.',
    highlights: [
      'Multiple export formats: Markdown, JSON, and Custom Template',
      'Real-time live formatted preview box',
      'One-tap "Copy All" and native "Share via Apps" integrations',
      'Clean typography with platform name and URL pairing'
    ],
    screenKey: 'share-all',
    imageFileName: 'share-all.png',
    imageSrc: 'screenshots/share-all.png'
  },
  {
    id: 'reorder',
    title: 'Reordering Mode',
    subtitle: 'Organize handles in the exact order that fits your workflow',
    category: 'Customization',
    description: 'Easily rearrange handles with intuitive sorting controls so your most frequently accessed accounts sit right at the top.',
    highlights: [
      'Tap arrows to sort handles up or down instantly',
      'Visual reordering mode notification with easy Done exit',
      'Instant persistent ordering in your profile workspace'
    ],
    screenKey: 'reorder',
    imageFileName: 'reorder.png',
    imageSrc: 'screenshots/reorder.png'
  },
  {
    id: 'settings',
    title: 'Personalize Workspace',
    subtitle: 'Appearance, accent palette, haptics, and gestures',
    category: 'Settings',
    description: 'Customize ProfileOS to match your personal aesthetic. Adjust theme mode, accent colors, compact card density, tactile haptic feedback, and swipe gestures.',
    highlights: [
      'Theme Mode & Accent Color palette selection',
      'Compact Card Density toggle for high-density layouts',
      'Tactile Haptic Feedback toggle for responsive touch',
      'Swipe Actions & Gesture customization'
    ],
    screenKey: 'settings',
    imageFileName: 'settings.png',
    imageSrc: 'screenshots/settings.png'
  },
  {
    id: 'edit-profile',
    title: 'Edit Profile Identity',
    subtitle: 'Customize profile banner gradient, avatar icon, bio, and metrics',
    category: 'Identity',
    description: 'Fine-tune each profile workspace with custom banner gradients, identity archetypes, bio descriptions, and active metrics tracking.',
    highlights: [
      'Custom banner gradients & avatar icon picker',
      'Profile Name and Tagline / Bio editor',
      'Glanceable metric pills: Total Handles, Categories, Active URLs',
      'Profile archetype identity management'
    ],
    screenKey: 'edit-profile',
    imageFileName: 'edit-profile.png',
    imageSrc: 'screenshots/edit-profile.png'
  },
  {
    id: 'select-platform',
    title: 'Select Platform Catalogue',
    subtitle: 'Extensive library of popular networks, video, and custom web links',
    category: 'Platforms',
    description: 'Select from an extensive platform directory with preconfigured URL schemas, official icons, and category filters.',
    highlights: [
      'Comprehensive catalog with 229+ supported services',
      'Search platform by name or URL schema',
      'Categorized filters: All, Popular, Social & Video, Messaging',
      'Custom website & deep link flexibility'
    ],
    screenKey: 'select-platform',
    imageFileName: 'select-platform.png',
    imageSrc: 'screenshots/select-platform.png'
  }
];
