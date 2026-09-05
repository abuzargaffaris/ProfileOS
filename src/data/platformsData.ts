import { SocialPlatform } from '../types';

export const OFFICIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Popular',
    handle: '@printionupstudio',
    displayName: 'PrintionUp Studio',
    url: 'https://www.instagram.com/printionupstudio',
    maskedHandle: '@pr••••io',
    iconType: 'instagram',
    accentColor: '#E1306C',
    description: 'Visual identity, design showcases, and studio highlights',
  },
  {
    id: 'threads',
    name: 'Threads',
    category: 'Popular',
    handle: '@printionupstudio',
    displayName: 'PrintionUp Studio',
    url: 'https://www.threads.com/@printionupstudio',
    maskedHandle: '@pr••••io',
    iconType: 'threads',
    accentColor: '#000000',
    description: 'Real-time studio updates, design notes, and conversations',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    category: 'Popular',
    handle: '@printionupstd',
    displayName: 'PrintionUp Studio',
    url: 'https://x.com/printionupstd',
    maskedHandle: '@pr••••td',
    iconType: 'x',
    accentColor: '#0F1419',
    description: 'Announcements, product updates, and industry insights',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Social & Video',
    handle: 'PrintionUp Studio',
    displayName: 'PrintionUp Studio',
    url: 'https://www.facebook.com/share/1KB57XrtVj/',
    maskedHandle: 'pri••••io',
    iconType: 'facebook',
    accentColor: '#1877F2',
    description: 'Community news, project releases, and official page',
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    category: 'Popular',
    handle: '@printionupstudio.bsky.social',
    displayName: 'PrintionUp Studio',
    url: 'https://bsky.app/profile/printionupstudio.bsky.social',
    maskedHandle: '@pr••••al',
    iconType: 'bluesky',
    accentColor: '#1185FE',
    description: 'Decentralized social stream and design discourse',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    category: 'Social & Video',
    handle: 'PrintionUp Studio',
    displayName: 'PrintionUp Studio',
    url: 'https://pin.it/3acx5HGdB',
    maskedHandle: 'pri••••io',
    iconType: 'pinterest',
    accentColor: '#E60023',
    description: 'Inspirational moodboards, typography, and creative pins',
  },
];

export const FORMATTED_OUTPUT_SAMPLES = {
  customTemplate: `Instagram (@printionupstudio):
https://www.instagram.com/printionupstudio

Threads (@printionupstudio):
https://www.threads.com/@printionupstudio

X (@printionupstd):
https://x.com/printionupstd

Facebook:
https://www.facebook.com/share/1KB57XrtVj/

Bluesky:
https://bsky.app/profile/printionupstudio.bsky.social

Pinterest:
https://pin.it/3acx5HGdB`,

  markdown: `### PrintionUp Studio Profiles
- **Instagram**: [@printionupstudio](https://www.instagram.com/printionupstudio)
- **Threads**: [@printionupstudio](https://www.threads.com/@printionupstudio)
- **X (Twitter)**: [@printionupstd](https://x.com/printionupstd)
- **Facebook**: [PrintionUp Studio](https://www.facebook.com/share/1KB57XrtVj/)
- **Bluesky**: [@printionupstudio.bsky.social](https://bsky.app/profile/printionupstudio.bsky.social)
- **Pinterest**: [PrintionUp Studio](https://pin.it/3acx5HGdB)`,

  json: JSON.stringify(
    {
      profile: "PrintionUp Studio",
      totalHandles: 6,
      accounts: [
        { platform: "Instagram", handle: "@printionupstudio", url: "https://www.instagram.com/printionupstudio" },
        { platform: "Threads", handle: "@printionupstudio", url: "https://www.threads.com/@printionupstudio" },
        { platform: "X (Twitter)", handle: "@printionupstd", url: "https://x.com/printionupstd" },
        { platform: "Facebook", displayName: "PrintionUp Studio", url: "https://www.facebook.com/share/1KB57XrtVj/" },
        { platform: "Bluesky", handle: "@printionupstudio.bsky.social", url: "https://bsky.app/profile/printionupstudio.bsky.social" },
        { platform: "Pinterest", displayName: "PrintionUp Studio", url: "https://pin.it/3acx5HGdB" }
      ]
    },
    null,
    2
  ),
};
