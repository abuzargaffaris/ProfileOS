import React, { useState } from 'react';
import { PageTab, SocialPlatform } from '../types';
import { OFFICIAL_PLATFORMS } from '../data/platformsData';
import { SocialIcon } from '../components/SocialIcons';
import { copyToClipboard } from '../utils/clipboard';
import {
  ExternalLink,
  Copy,
  Check,
  Search,
  Globe,
  Sparkles,
  QrCode,
  ArrowRight
} from 'lucide-react';

interface PlatformsPageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQrDemo: (platform?: SocialPlatform) => void;
  onNotify: (text: string, type?: 'info' | 'success') => void;
}

export const PlatformsPage: React.FC<PlatformsPageProps> = ({
  onNavigate,
  onOpenQrDemo,
  onNotify
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const handleCopyHandle = async (platform: SocialPlatform, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await copyToClipboard(platform.handle);
    setCopiedId(platform.id);
    if (onNotify) onNotify(`Copied ${platform.handle}`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const ALL_CATALOG_PLATFORMS = [
    // Popular & Mainstream
    { name: 'Instagram', category: 'Popular', urlSchema: 'instagram.com/{username}', icon: 'instagram', color: '#E1306C', example: '@username' },
    { name: 'Threads', category: 'Popular', urlSchema: 'threads.com/@{username}', icon: 'threads', color: '#000000', example: '@username' },
    { name: 'X (Twitter)', category: 'Popular', urlSchema: 'x.com/{username}', icon: 'x', color: '#0F1419', example: '@username' },
    { name: 'Facebook', category: 'Popular', urlSchema: 'facebook.com/{username}', icon: 'facebook', color: '#1877F2', example: 'username' },
    { name: 'TikTok', category: 'Popular', urlSchema: 'tiktok.com/@{username}', icon: 'tiktok', color: '#000000', example: '@creator' },
    { name: 'YouTube', category: 'Popular', urlSchema: 'youtube.com/@{channel}', icon: 'youtube', color: '#FF0000', example: '@channel' },
    { name: 'LinkedIn', category: 'Popular', urlSchema: 'linkedin.com/in/{username}', icon: 'linkedin', color: '#0A66C2', example: 'in/username' },
    { name: 'Bluesky', category: 'Popular', urlSchema: 'bsky.app/profile/{handle}', icon: 'bluesky', color: '#1185FE', example: '@user.bsky.social' },
    { name: 'Pinterest', category: 'Popular', urlSchema: 'pinterest.com/{username}', icon: 'pinterest', color: '#E60023', example: 'username' },
    { name: 'Snapchat', category: 'Popular', urlSchema: 'snapchat.com/add/{username}', icon: 'snapchat', color: '#FFFC00', example: 'username' },

    // Developer & Tech
    { name: 'GitHub', category: 'Developer & Tech', urlSchema: 'github.com/{username}', icon: 'github', color: '#24292F', example: 'octocat' },
    { name: 'GitLab', category: 'Developer & Tech', urlSchema: 'gitlab.com/{username}', icon: 'gitlab', color: '#FC6D26', example: 'username' },
    { name: 'Stack Overflow', category: 'Developer & Tech', urlSchema: 'stackoverflow.com/users/{id}', icon: 'stackoverflow', color: '#F48024', example: 'users/12345' },
    { name: 'Discord', category: 'Developer & Tech', urlSchema: 'discord.gg/{invite}', icon: 'discord', color: '#5865F2', example: 'discord.gg/hub' },
    { name: 'Reddit', category: 'Developer & Tech', urlSchema: 'reddit.com/user/{username}', icon: 'reddit', color: '#FF4500', example: 'u/username' },
    { name: 'CodePen', category: 'Developer & Tech', urlSchema: 'codepen.io/{username}', icon: 'codepen', color: '#000000', example: 'pen_coder' },
    { name: 'Mastodon', category: 'Developer & Tech', urlSchema: '{instance}/@{username}', icon: 'mastodon', color: '#6364FF', example: '@user@mastodon.social' },
    { name: 'Notion', category: 'Developer & Tech', urlSchema: 'notion.site/{workspace}', icon: 'notion', color: '#000000', example: 'workspace.notion.site' },

    // Design & Creative
    { name: 'Figma', category: 'Design & Creative', urlSchema: 'figma.com/@{handle}', icon: 'figma', color: '#F24E1E', example: '@designer' },
    { name: 'Behance', category: 'Design & Creative', urlSchema: 'behance.net/{username}', icon: 'behance', color: '#1769FF', example: 'username' },
    { name: 'Dribbble', category: 'Design & Creative', urlSchema: 'dribbble.com/{username}', icon: 'dribbble', color: '#EA4C89', example: 'username' },
    { name: 'Patreon', category: 'Design & Creative', urlSchema: 'patreon.com/{creator}', icon: 'patreon', color: '#FF424D', example: 'creator' },

    // Messaging & Chat
    { name: 'Telegram', category: 'Messaging & Chat', urlSchema: 't.me/{username}', icon: 'telegram', color: '#26A5E4', example: '@username' },
    { name: 'WhatsApp', category: 'Messaging & Chat', urlSchema: 'wa.me/{phone_number}', icon: 'whatsapp', color: '#25D366', example: '+1234567890' },
    { name: 'Signal', category: 'Messaging & Chat', urlSchema: 'signal.me/#p/{phone}', icon: 'signal', color: '#3A76F0', example: '+1234567890' },
    { name: 'Slack', category: 'Messaging & Chat', urlSchema: '{workspace}.slack.com', icon: 'slack', color: '#4A154B', example: 'team.slack.com' },

    // Video & Streaming
    { name: 'Twitch', category: 'Video & Streaming', urlSchema: 'twitch.tv/{streamer}', icon: 'twitch', color: '#9146FF', example: 'streamer' },
    { name: 'Kick', category: 'Video & Streaming', urlSchema: 'kick.com/{streamer}', icon: 'kick', color: '#53FC18', example: 'streamer' },
    { name: 'Steam', category: 'Video & Streaming', urlSchema: 'steamcommunity.com/id/{custom_id}', icon: 'steam', color: '#171A21', example: 'gamer_tag' },

    // Audio & Music
    { name: 'Spotify', category: 'Audio & Music', urlSchema: 'open.spotify.com/artist/{id}', icon: 'spotify', color: '#1DB954', example: 'artist/0TnOYis...' },
    { name: 'Apple Music', category: 'Audio & Music', urlSchema: 'music.apple.com/artist/{id}', icon: 'applemusic', color: '#FA243C', example: 'artist/12345' },
    { name: 'SoundCloud', category: 'Audio & Music', urlSchema: 'soundcloud.com/{artist}', icon: 'soundcloud', color: '#FF5500', example: 'artist_name' },

    // Publishing & Writing
    { name: 'Substack', category: 'Publishing & Writing', urlSchema: '{subdomain}.substack.com', icon: 'substack', color: '#FF6719', example: 'newsletter.substack.com' },
    { name: 'Medium', category: 'Publishing & Writing', urlSchema: 'medium.com/@{username}', icon: 'medium', color: '#000000', example: '@writer' },

    // Finance & Support
    { name: 'PayPal', category: 'Finance & Support', urlSchema: 'paypal.me/{username}', icon: 'paypal', color: '#003087', example: 'paypal.me/name' },
    { name: 'Buy Me a Coffee', category: 'Finance & Support', urlSchema: 'buymeacoffee.com/{username}', icon: 'buymeacoffee', color: '#FFDD00', example: 'creator' },

    // Fitness & Lifestyle
    { name: 'Strava', category: 'Lifestyle & Sports', urlSchema: 'strava.com/athletes/{id}', icon: 'strava', color: '#FC4C02', example: 'athletes/12345' },
    { name: 'Custom Website / Portfolio', category: 'Custom & Web', urlSchema: 'https://{your-domain}.com', icon: 'website', color: '#2563EB', example: 'https://mywebsite.com' },
    { name: 'Custom Deep Link', category: 'Custom & Web', urlSchema: 'app://{custom_route}', icon: 'globe', color: '#4F46E5', example: 'app://profile/123' },
  ];

  const categories = [
    'All',
    'Popular',
    'Developer & Tech',
    'Design & Creative',
    'Messaging & Chat',
    'Video & Streaming',
    'Audio & Music',
    'Publishing & Writing',
    'Finance & Support',
    'Lifestyle & Sports',
    'Custom & Web'
  ];

  const filteredCatalog = ALL_CATALOG_PLATFORMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.urlSchema.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
          Platforms & Ecosystem
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Supported Social Platforms
        </h1>
        <p className="text-base text-slate-600">
          ProfileOS supports 229+ social networks, creator platforms, video services, messaging protocols, and custom websites.
        </p>
      </div>

      {/* SECTION 1: Official Studio Channels */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              PrintionUp Studio Official Accounts
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Live links to the official PrintionUp Studio channels configured inside ProfileOS.
            </p>
          </div>
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            6 Official Accounts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OFFICIAL_PLATFORMS.map(platform => {
            const isCopied = copiedId === platform.id;
            return (
              <div
                key={platform.id}
                className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-slate-200 p-4 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 shadow-2xs flex items-center justify-center text-slate-800">
                    <SocialIcon name={platform.iconType} size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900 truncate">
                        {platform.name}
                      </span>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {platform.category}
                      </span>
                    </div>
                    <p className="text-xs font-mono font-bold text-slate-700 truncate">
                      {platform.handle}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">{platform.displayName}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500">{platform.description}</p>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  <button
                    onClick={e => handleCopyHandle(platform, e)}
                    className="flex-1 py-2 px-3 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onOpenQrDemo(platform)}
                    className="p-2 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer transition-colors shadow-2xs"
                    title={`View ${platform.name} QR Code`}
                  >
                    <QrCode className="w-3.5 h-3.5 text-slate-600" />
                  </button>

                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs shadow-blue-200/50"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: 229+ Platforms Directory */}
      <section className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-8 lg:p-10 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                229+ Platform Catalog & URL Formats
              </h2>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50/90 px-3 py-1 rounded-full border border-blue-200/80 whitespace-nowrap shrink-0 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                {searchTerm || activeCategory !== 'All'
                  ? `${filteredCatalog.length} Matching`
                  : `${filteredCatalog.length} Presets Available`}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
              ProfileOS automatically validates username patterns, adds protocol prefixes, and formats clean links across 229+ supported platforms.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search platform or schema..."
              className="w-full pl-9 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none touch-pan-x -mx-1 px-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredCatalog.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-800 shadow-2xs group-hover:scale-105 transition-transform shrink-0"
                    style={{ color: item.color }}
                  >
                    <SocialIcon name={item.icon} size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {item.name}
                      </span>
                    </div>
                    <div
                      className="text-[11px] font-mono text-slate-500 truncate mt-0.5"
                      title={item.urlSchema}
                    >
                      {item.urlSchema}
                    </div>
                  </div>
                </div>

                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200/80 text-slate-600 shrink-0 whitespace-nowrap">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 text-[11px]">
                <span className="text-slate-400 font-mono text-[10px] truncate max-w-[55%]">
                  e.g. <span className="text-slate-600 font-semibold">{item.example}</span>
                </span>
                <button
                  onClick={async () => {
                    await copyToClipboard(`https://${item.urlSchema.replace('{username}', 'demo').replace('{handle}', 'demo').replace('{channel}', 'demo').replace('{subdomain}', 'demo').replace('{creator}', 'demo')}`);
                    if (onNotify) onNotify(`Copied format for ${item.name}`, 'success');
                  }}
                  className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Format</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCatalog.length === 0 && (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <Globe className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-semibold">No platforms matching "{searchTerm}"</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
              }}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Custom Website Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center font-bold shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Custom Websites & Deep Links</h4>
              <p className="text-xs text-slate-600">
                Add any custom portfolio, blog, or internal company portal with custom labels.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('preview')}
            className="px-5 py-2.5 rounded-full bg-[#3B82F6] text-white text-xs font-bold flex-shrink-0 cursor-pointer hover:bg-[#2563EB] transition-colors shadow-xs shadow-blue-200/50"
          >
            See in App Preview
          </button>
        </div>
      </section>
    </div>
  );
};
