import React, { useState, useMemo, useEffect } from 'react';
import { PageTab, SocialPlatform } from '../types';
import { copyToClipboard } from '../utils/clipboard';
import { SwipeDemo } from '../components/demos/SwipeDemo';
import {
  Search,
  BookOpen,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Rocket,
  Users2,
  Quote,
  QrCode,
  ShieldCheck,
  Zap,
  Globe,
  ChevronRight,
  ArrowLeft,
  X,
  Copy,
  Check,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Smartphone,
  Eye,
  EyeOff,
  Layers,
  ArrowRight,
  Clock,
  Download,
  Share2,
  Lock,
  Database,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  FolderOpen,
  User,
  Briefcase,
  Building2,
  Repeat,
  Calendar
} from 'lucide-react';

interface HelpCenterPageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQrDemo?: (platform?: SocialPlatform) => void;
  onNotify?: (text: string, type?: 'info' | 'success' | 'action') => void;
}

export type GuideId =
  | 'beginners-guide'
  | 'best-practices'
  | 'faq'
  | 'smart-tokens'
  | 'whats-new'
  | 'spaces-profiles'
  | 'smart-share-templates'
  | 'instant-qr-engine'
  | 'privacy-shield-mode'
  | 'gesture-shortcuts'
  | 'favicon-branding';

interface GuideData {
  id: GuideId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  category: 'quick' | 'feature';
  tag: string;
  readTime: string;
  summary: string;
}

export const HelpCenterPage: React.FC<HelpCenterPageProps> = ({
  onNavigate,
  onOpenQrDemo,
  onNotify
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGuideId, setActiveGuideId] = useState<GuideId | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState<'all' | 'gestures' | 'privacy' | 'tokens' | 'storage'>('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);

  // Playground States
  const [demoMasked, setDemoMasked] = useState(false);
  const [interactiveTemplate, setInteractiveTemplate] = useState('[platform_name] — [display_name] — @[username]');
  const [selectedDemoPlatform, setSelectedDemoPlatform] = useState<'instagram' | 'github' | 'x' | 'linkedin'>('instagram');

  // Handle URL routing or deep linking without '#'
  useEffect(() => {
    const checkGuideFromUrl = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const guideParam = params.get('guide') as GuideId;
        if (guideParam) {
          setActiveGuideId(guideParam);
          return;
        }

        // Legacy hash fallback
        if (window.location.hash) {
          const hash = window.location.hash.replace('#', '');
          if (hash.startsWith('help/')) {
            const guide = hash.replace('help/', '') as GuideId;
            setActiveGuideId(guide);
            return;
          }
        }
      } catch {}
    };

    checkGuideFromUrl();
    window.addEventListener('popstate', checkGuideFromUrl);
    return () => window.removeEventListener('popstate', checkGuideFromUrl);
  }, []);

  const openGuide = (id: GuideId) => {
    setActiveGuideId(id);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('guide', id);
      url.hash = '';
      window.history.pushState({ guide: id }, '', url.toString());
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGuide = () => {
    setActiveGuideId(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('guide');
      url.hash = '';
      window.history.pushState({ guide: null }, '', url.toString());
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Top 5 Quick Cards Data (Strictly matching the screenshot layout: Icon top-left, title, subtitle)
  const quickCards: GuideData[] = [
    {
      id: 'beginners-guide',
      title: "Beginner's Guide",
      subtitle: 'Getting started & spaces',
      icon: BookOpen,
      iconBg: 'bg-amber-100/80',
      iconColor: 'text-amber-600',
      category: 'quick',
      tag: 'Getting Started',
      readTime: '3 min read',
      summary: 'If you are new to ProfileOS, start here. Master organizing your handles, swiping gestures, spaces, private masking, and fast sharing.'
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      subtitle: 'Privacy & organization',
      icon: Lightbulb,
      iconBg: 'bg-emerald-100/80',
      iconColor: 'text-emerald-600',
      category: 'quick',
      tag: 'Workflow & Security',
      readTime: '4 min read',
      summary: 'Practical strategies for organizing profiles by identity, building reusable sharing templates, mastering gestures, and keeping your workspace effortless.'
    },
    {
      id: 'faq',
      title: 'FAQ',
      subtitle: 'Frequently asked questions',
      icon: MessageSquare,
      iconBg: 'bg-purple-100/80',
      iconColor: 'text-purple-600',
      category: 'quick',
      tag: 'Questions & Answers',
      readTime: '5 min read',
      summary: 'Everything you need to know about local SQLite storage, Android Room architecture, zero cloud telemetry, and compatibility.'
    },
    {
      id: 'smart-tokens',
      title: 'Smart Tokens',
      subtitle: 'Dynamic share templates',
      icon: Sparkles,
      iconBg: 'bg-sky-100/80',
      iconColor: 'text-[#3B82F6]',
      category: 'quick',
      tag: 'Dynamic Automation',
      readTime: '3 min read',
      summary: 'Build reusable sharing formats with [platform_name], [display_name], [username], and [account_url] that automatically fill in profile details.'
    },
    {
      id: 'whats-new',
      title: "What's New",
      subtitle: 'Version 1.0.0 release notes',
      icon: Rocket,
      iconBg: 'bg-pink-100/80',
      iconColor: 'text-pink-600',
      category: 'quick',
      tag: 'v1.0.0 Genesis',
      readTime: '2 min read',
      summary: 'Discover all the launch features of ProfileOS v1.0.0, including the 229+ platform catalog, instant QR engine, and gestures.'
    }
  ];

  // Feature Guide List Data (Matching the lower list in the screenshot)
  const featureGuides: GuideData[] = [
    {
      id: 'spaces-profiles',
      title: 'Spaces & Profiles',
      subtitle: 'Organize handles by work, personal & creator spaces',
      icon: Users2,
      iconBg: 'bg-blue-100/80',
      iconColor: 'text-[#3B82F6]',
      category: 'feature',
      tag: 'Identity Partitioning',
      readTime: '3 min read',
      summary: 'Create independent workspaces for Personal, Work, Creator, and Freelance accounts with custom badges and color accents.'
    },
    {
      id: 'smart-share-templates',
      title: 'Smart Share Templates',
      subtitle: 'Dynamic token substitution for bio & introductions',
      icon: Quote,
      iconBg: 'bg-emerald-100/80',
      iconColor: 'text-emerald-600',
      category: 'feature',
      tag: 'Clipboard Automation',
      readTime: '3 min read',
      summary: 'Write reusable message templates that auto-populate profile details upon copying or swiping left.'
    },
    {
      id: 'instant-qr-engine',
      title: 'Instant QR Engine',
      subtitle: 'Zero latency scannable codes with custom color & logo',
      icon: QrCode,
      iconBg: 'bg-amber-100/80',
      iconColor: 'text-amber-600',
      category: 'feature',
      tag: 'Offline Sharing',
      readTime: '2 min read',
      summary: 'Generate high-contrast, platform-branded QR codes directly on device with zero network delays and offline scanning.'
    },
    {
      id: 'privacy-shield-mode',
      title: 'Privacy Shield Mode',
      subtitle: 'Mask handles on screen (@oct••••t) for public privacy',
      icon: ShieldCheck,
      iconBg: 'bg-purple-100/80',
      iconColor: 'text-purple-600',
      category: 'feature',
      tag: 'Screen Obfuscation',
      readTime: '2 min read',
      summary: 'Conceal usernames with real-time character masking to protect sensitive identity information in public or during screen shares.'
    },
    {
      id: 'gesture-shortcuts',
      title: 'Gesture Shortcuts',
      subtitle: 'Swipe Right to copy link, Swipe Left for smart templates',
      icon: Zap,
      iconBg: 'bg-rose-100/80',
      iconColor: 'text-rose-600',
      category: 'feature',
      tag: 'Haptic Interactions',
      readTime: '2 min read',
      summary: 'Perform everyday clipboard actions in milliseconds with physics-calibrated swipe gestures and haptic feedback.'
    },
    {
      id: 'favicon-branding',
      title: 'Favicon & Branding',
      subtitle: '50+ high-res brand icons with custom domain resolution',
      icon: Globe,
      iconBg: 'bg-sky-100/80',
      iconColor: 'text-sky-600',
      category: 'feature',
      tag: 'Visual Identity',
      readTime: '2 min read',
      summary: 'Over 229+ native vector brand assets and automated favicon extraction for custom websites and client portfolios.'
    }
  ];

  // Comprehensive FAQ list
  const faqs = [
    {
      q: 'Where is my data stored and does ProfileOS use a cloud server?',
      a: 'ProfileOS is 100% local-first. All your profiles, spaces, handles, notes, and preferences are stored exclusively on your device in a local SQLite database managed by Android Room. There is no cloud account system, no telemetry server, and zero external tracking.',
      category: 'privacy'
    },
    {
      q: 'How do the Swipe Right and Swipe Left gesture shortcuts work?',
      a: 'Swipe Right on any profile card in your dashboard to immediately copy its direct URL (e.g., https://instagram.com/yourhandle). Swipe Left to copy your pre-configured Smart Share template with token substitutions.',
      category: 'gestures'
    },
    {
      q: 'What variables are supported in Smart Share Templates?',
      a: 'ProfileOS supports 5 core tokens: {username} (raw username), {handle} (@ formatted handle), {url} (direct link), {platform} (platform display name), and {category} (assigned space). These dynamically substitute when swiping left or sharing.',
      category: 'tokens'
    },
    {
      q: 'Can I add custom websites or niche platforms not in the 229+ list?',
      a: 'Yes! Tap the "+" button and choose "Custom Website" or "Custom Link". Enter any URL and label. ProfileOS will automatically fetch the high-resolution favicon and store it locally for instant offline display.',
      category: 'storage'
    },
    {
      q: 'How does Privacy Shield Mode protect me during screen recording?',
      a: 'When Privacy Shield Mode is toggled on, middle characters of usernames are visually replaced with dots (e.g. "@alex_designer" becomes "@al•••••er"). However, copying or generating a QR code still uses the real handle in the background.',
      category: 'privacy'
    },
    {
      q: 'Can I back up or export my ProfileOS collection?',
      a: 'Yes. In the Settings screen, you can export an encrypted JSON backup file of all your spaces and profiles, which you can save to Google Drive, local storage, or transfer to a new device anytime.',
      category: 'storage'
    }
  ];

  // Filtered queries
  const allGuides = useMemo(() => [...quickCards, ...featureGuides], []);

  const filteredQuickCards = useMemo(() => {
    if (!searchQuery.trim()) return quickCards;
    const q = searchQuery.toLowerCase();
    return quickCards.filter(
      card =>
        card.title.toLowerCase().includes(q) ||
        card.subtitle.toLowerCase().includes(q) ||
        card.summary.toLowerCase().includes(q) ||
        card.tag.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredFeatureGuides = useMemo(() => {
    if (!searchQuery.trim()) return featureGuides;
    const q = searchQuery.toLowerCase();
    return featureGuides.filter(
      guide =>
        guide.title.toLowerCase().includes(q) ||
        guide.subtitle.toLowerCase().includes(q) ||
        guide.summary.toLowerCase().includes(q) ||
        guide.tag.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = activeFaqCategory === 'all' || faq.category === activeFaqCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
    });
  }, [searchQuery, activeFaqCategory]);

  const handleCopySnippet = async (text: string, label: string) => {
    await copyToClipboard(text);
    setCopiedToken(label);
    if (onNotify) onNotify(`Copied "${label}" to clipboard`, 'success');
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Demo profile data for live playground
  const demoData = {
    instagram: {
      platform: 'Instagram',
      displayName: 'PrintionUp Studio',
      handle: '@printionupstudio',
      username: 'printionupstudio',
      url: 'https://www.instagram.com/printionupstudio',
      category: 'Creator Space'
    },
    github: {
      platform: 'GitHub',
      displayName: 'PrintionUp Dev',
      handle: '@printionup',
      username: 'printionup',
      url: 'https://github.com/printionup',
      category: 'Work Space'
    },
    x: {
      platform: 'X (Twitter)',
      displayName: 'PrintionUp',
      handle: '@printionup',
      username: 'printionup',
      url: 'https://x.com/printionup',
      category: 'Personal Space'
    },
    linkedin: {
      platform: 'LinkedIn',
      displayName: 'PrintionUp Studio LLC',
      handle: '@printionup-studio',
      username: 'printionup-studio',
      url: 'https://linkedin.com/in/printionup-studio',
      category: 'Work Space'
    }
  };

  const renderedTemplate = useMemo(() => {
    const cur = demoData[selectedDemoPlatform];
    return interactiveTemplate
      .replace(/\[platform_name\]/g, cur.platform)
      .replace(/\{platform_name\}/g, cur.platform)
      .replace(/\{platform\}/g, cur.platform)
      .replace(/\[display_name\]/g, cur.displayName)
      .replace(/\{display_name\}/g, cur.displayName)
      .replace(/\[username\]/g, cur.username)
      .replace(/\{username\}/g, cur.username)
      .replace(/\[account_url\]/g, cur.url)
      .replace(/\{account_url\}/g, cur.url)
      .replace(/\{url\}/g, cur.url)
      .replace(/\[handle\]/g, cur.handle)
      .replace(/\{handle\}/g, cur.handle)
      .replace(/\[category\]/g, cur.category)
      .replace(/\{category\}/g, cur.category);
  }, [interactiveTemplate, selectedDemoPlatform]);

  // If a sub-page is active, render the dedicated Sub-Page view
  if (activeGuideId) {
    const activeGuide = allGuides.find(g => g.id === activeGuideId) || quickCards[0];
    const IconComp = activeGuide.icon;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8" id="help-subpage-view">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <button
            onClick={closeGuide}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-full transition-all cursor-pointer shadow-2xs group"
            id="subpage-back-button"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Help Center</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#3B82F6] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {activeGuide.tag}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeGuide.readTime}</span>
            </span>
          </div>
        </div>

        {/* Sub-page Title & Icon Hero */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${activeGuide.iconBg} ${activeGuide.iconColor} flex items-center justify-center shrink-0`}>
              <IconComp className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {activeGuide.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
                {activeGuide.subtitle}
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium pt-2">
            {activeGuide.summary}
          </p>
        </div>

        {/* Sub-page Detailed Sections based on Guide ID */}
        {activeGuideId === 'beginners-guide' && (
          <div className="space-y-6">
            {/* Intro Lead Banner */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                If you're new to the app, you're in the right place. ProfileOS is designed to solve a simple everyday problem:{' '}
                <strong className="text-slate-900 font-bold">
                  finding and sharing your own social media handles, profile links, websites, and other URLs without searching through multiple apps.
                </strong>
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Instead of keeping your Instagram handle in one place, your portfolio in another, and your other profiles somewhere else, ProfileOS gives you one organized workspace for the links that make up your digital presence.
              </p>
              
              <div className="p-4 sm:p-5 bg-blue-50/70 border border-blue-200/80 rounded-2xl">
                <p className="text-xs text-blue-600 uppercase font-bold tracking-wider">Sharing is simple</p>
                <div className="text-sm sm:text-base font-black text-slate-900 mt-1 flex flex-wrap items-center gap-2">
                  <span className="bg-white px-3 py-1 rounded-lg border border-blue-200 text-slate-800">Find your profile</span>
                  <span className="text-[#3B82F6]">→</span>
                  <span className="bg-white px-3 py-1 rounded-lg border border-blue-200 text-slate-800">Swipe</span>
                  <span className="text-[#3B82F6]">→</span>
                  <span className="bg-white px-3 py-1 rounded-lg border border-blue-200 text-slate-800">Copy</span>
                  <span className="text-[#3B82F6]">→</span>
                  <span className="bg-[#3B82F6] px-3 py-1 rounded-lg text-white font-bold">Share</span>
                </div>
              </div>
            </div>

            {/* Chapter 01 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">01</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Foundation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Understand ProfileOS
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Think of ProfileOS as your digital profile organizer.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ProfileOS doesn't replace Instagram, Threads, X, GitHub, LinkedIn, or any other platform you use. Your accounts continue to live on their respective platforms.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ProfileOS simply gives you a dedicated place to <strong className="text-slate-900">organize the profiles and links that belong to you</strong>.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You can save your social handles, profile URLs, websites, and custom links, organize them into different profiles, and quickly access them whenever you need to share something.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                It's especially useful if you have more than one online identity — for example, a personal profile, a professional profile, and a creator or studio profile.
              </p>
            </div>

            {/* Chapter 02 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">02</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Structure</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Create Your First Profile
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Start with the identity you want to organize.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When you first use ProfileOS, create a profile for the accounts you want to keep together.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You might start with <strong>Personal</strong>, then create another profile for <strong>Work</strong>, <strong>Freelance</strong>, or your <strong>Creator</strong>.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The idea is simple: each ProfileOS profile represents a particular part of your digital presence. If you don't have multiple identities, that's completely fine. You can start with a single profile and add more later as your needs grow.
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">A good place to start</h4>
                <p className="text-xs text-slate-500 font-medium">Create a profile based on how you actually share your accounts:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">Personal</div>
                    <div className="text-[11px] text-slate-500">Your everyday social accounts.</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">Work</div>
                    <div className="text-[11px] text-slate-500">Professional profiles &amp; portfolio links.</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">Creator</div>
                    <div className="text-[11px] text-slate-500">Content platforms &amp; channels.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter 03 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">03</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Directory</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Add Your Handles
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Bring your scattered profiles together.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Once you've created a profile, start adding the accounts and links you regularly share.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ProfileOS includes a library of <strong className="text-slate-900">229+ platforms</strong>, making it easy to find the service you're looking for. Add your username or profile information and keep it alongside the rest of your digital identity.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You can also add <strong>custom websites and URLs</strong>, so you're not limited to social networks.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your ProfileOS collection might contain an Instagram account, an X profile, a GitHub page, a portfolio website, a YouTube channel, or any other link you regularly need.
              </p>
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-amber-900 text-xs space-y-1">
                <div className="font-bold">The goal isn't to add everything.</div>
                <div>Add the profiles and links you actually use and share. A smaller, well-organized collection is often more useful than a huge list you'll never look through.</div>
              </div>
            </div>

            {/* Chapter 04 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">04</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Organization</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Organize Your Profiles
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Make the right link easy to find.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Once you've added your accounts, ProfileOS presents them as recognizable cards so you can quickly scan your profile and identify the account you need.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You can organize your handles within their respective profiles and use the available categories to make larger collections easier to navigate. This becomes especially useful when you have several accounts across different platforms.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs sm:text-sm font-medium italic">
                Instead of remembering: <span className="text-slate-900 font-bold not-italic">"Which username did I use for that account?"</span> you can simply open the appropriate ProfileOS profile and see it.
              </div>
            </div>

            {/* Chapter 05 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">05</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gestures</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Learn the Swipe
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                The quickest way to get your handle ready.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Swiping is at the heart of the ProfileOS experience.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When you need to share a handle, find the appropriate profile card and <strong className="text-slate-900">swipe right</strong>. ProfileOS copies the handle to your clipboard so you can paste it wherever you're communicating.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Need your configured sharing format instead? <strong className="text-slate-900">Swipe left</strong> to copy your custom sharing template.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This means the same profile card can give you two different actions without adding extra buttons or menus to the interface.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl space-y-1">
                  <div className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">Swipe Right</div>
                  <div className="text-sm sm:text-base font-black text-slate-900">👉 Copies Raw Handle</div>
                  <div className="text-xs text-slate-500">Fast username retrieval for direct messaging</div>
                </div>
                <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl space-y-1">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Swipe Left</div>
                  <div className="text-sm sm:text-base font-black text-slate-900">👈 Copies Template</div>
                  <div className="text-xs text-slate-500">Formatted bio or formatted URL with tokens</div>
                </div>
              </div>
            </div>

            {/* Chapter 06 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">06</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tokens</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Create Your Sharing Format
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Decide how your profiles should be shared.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sometimes you only need a username. Other times, you might want to send someone a complete collection of your profiles.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ProfileOS lets you create custom sharing templates using dynamic tokens such as:
              </p>

              <div className="flex flex-wrap gap-2">
                {['[platform_name]', '[username]', '[account_url]', '[display_name]'].map(token => (
                  <span key={token} className="px-3 py-1.5 rounded-xl bg-slate-900 text-blue-300 font-mono text-xs font-bold border border-slate-700">
                    {token}
                  </span>
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                These tokens allow ProfileOS to generate your chosen format from the profile information you've already saved. You can then use the generated content in the format that's most useful for you, including <strong className="text-slate-900">custom text, Markdown, JSON, URLs, and other supported sharing formats.</strong>
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700">
                <strong>Set it up once.</strong> Then let ProfileOS generate the format instead of rebuilding the same list manually every time.
              </div>
            </div>

            {/* Chapter 07 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">07</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">QR Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Share With a QR Code
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                When you're together, don't type. Scan.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Profile links aren't always shared through messages. If you're at a conference, networking event, creator meetup, or simply talking to someone face-to-face, a QR code can be much quicker.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ProfileOS lets you generate a QR code from a profile link so the other person can scan it directly from your phone. Open the profile you want to share, generate its QR code, and let the other person scan it.
              </p>
              
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Your phone becomes the connection point</div>
                <div className="text-sm sm:text-base text-slate-300 font-medium">No typing usernames. No spelling out URLs.</div>
                <div className="text-base sm:text-lg font-black text-white pt-1">Show. Scan. Connect.</div>
              </div>
            </div>

            {/* Chapter 08 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">08</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Privacy</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Use Private Masking Mode
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Show your profile without showing everything.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                There are times when you want to display your ProfileOS workspace without exposing every character of your handles. Private Masking Mode lets you visually obscure sensitive handle information on-screen.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Original:</span>
                  <div className="font-mono text-sm font-bold text-slate-900">@printionupstudio</div>
                </div>
                <span className="text-slate-400 text-sm hidden sm:inline">→</span>
                <div>
                  <span className="text-xs text-purple-600 font-bold">Masked on screen:</span>
                  <div className="font-mono text-sm font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">@pr••••io</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This can be useful while <strong className="text-slate-900">screen-sharing, presenting, recording your screen, or showing your profile in a public setting.</strong> It gives you an additional layer of visual privacy while keeping your ProfileOS workspace usable.
              </p>
            </div>

            {/* Chapter 09 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">09</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Identities</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Manage Different Identities
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Keep personal and professional separate.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                One of the most useful things about ProfileOS is that you don't have to treat all of your online accounts as one collection. If you have multiple identities, create separate profiles for them.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For example, your <strong>Personal</strong> profile might contain your everyday accounts, while your <strong>Studio</strong> profile contains the accounts representing your creative work.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When someone asks for a professional profile, switch to the appropriate ProfileOS profile instead of searching through a mixed list.
              </p>
              <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs text-slate-800 font-semibold">
                🎯 The right identity for the right moment. That's what separate profiles are designed to make easier.
              </div>
            </div>

            {/* Chapter 10 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">10</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Personalization</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Make ProfileOS Your Own
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Adjust the experience to fit you.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Once you've learned the basics, explore the available personalization options.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Depending on your setup, you can customize aspects of the ProfileOS experience such as <strong className="text-slate-900">theme appearance, accent styling, card density, gesture behavior, sharing templates, and tactile feedback.</strong>
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You don't need to customize everything immediately. Start with the defaults, get comfortable with the workflow, and then adjust the experience as you discover what works best for you.
              </p>
            </div>

            {/* Your First ProfileOS Workflow */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="text-xs font-bold uppercase tracking-widest text-blue-400">Summary Routine</div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Your First ProfileOS Workflow
              </h2>
              <p className="text-sm text-slate-300 font-medium">
                That's really all there is to it. The ProfileOS workflow is intentionally simple:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/70 text-xs">
                  <span className="font-black text-blue-400">1.</span>
                  <div><strong>Create</strong> a profile for the identity you want to manage.</div>
                </div>
                <div className="flex items-start gap-2.5 bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/70 text-xs">
                  <span className="font-black text-blue-400">2.</span>
                  <div><strong>Add</strong> the social handles, websites, and URLs you regularly share.</div>
                </div>
                <div className="flex items-start gap-2.5 bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/70 text-xs">
                  <span className="font-black text-blue-400">3.</span>
                  <div><strong>Organize</strong> them so the right profile is easy to find.</div>
                </div>
                <div className="flex items-start gap-2.5 bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/70 text-xs">
                  <span className="font-black text-blue-400">4.</span>
                  <div><strong>Personalize</strong> your gestures and sharing formats.</div>
                </div>
                <div className="flex items-start gap-2.5 bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/70 text-xs">
                  <span className="font-black text-blue-400">5.</span>
                  <div><strong>Swipe</strong> when someone asks for your handle.</div>
                </div>
                <div className="flex items-start gap-2.5 bg-slate-800/90 p-3.5 rounded-2xl border border-slate-700/70 text-xs">
                  <span className="font-black text-blue-400">6.</span>
                  <div><strong>Share</strong> the copied handle, URL, template, or QR code.</div>
                </div>
              </div>

              <p className="text-xs text-slate-400 pt-2 font-medium">
                After your initial setup, ProfileOS becomes less something you have to think about and more something you simply reach for when you need a profile.
              </p>
            </div>

            {/* Quick Real-Life Example & Start Simple */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">A Quick Example</span>
                <h3 className="text-base font-black text-slate-900">Someone asks: “What's your Instagram?”</h3>
                <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                  <div>• You don't need to open Instagram.</div>
                  <div>• You don't need to remember the exact username.</div>
                  <div>• You don't need to search through Notes.</div>
                  <div className="pt-1 font-bold text-slate-900">Open ProfileOS → Find your Instagram card → Swipe right → Paste. Done.</div>
                </div>
              </div>

              <div className="bg-blue-50/80 rounded-3xl border border-blue-200/80 p-6 space-y-3 shadow-xs flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Start Simple</span>
                  <h3 className="text-base font-black text-slate-900">You don't need to organize your entire internet today.</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Start with the profiles you share most often. Add your main social accounts. Add your portfolio. ProfileOS is designed to grow with you without making managing it feel like another job.
                  </p>
                </div>
                <div className="pt-2 border-t border-blue-200/60 text-xs font-black text-slate-900">
                  Your profiles are already out there. ProfileOS simply makes them easier to find.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeGuideId === 'best-practices' && (
          <div className="space-y-6">
            {/* Lead Intro Banner */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                ProfileOS is simple by design, but a little organization up front can make it much more useful over time. The best setup is not the one with the most accounts, templates, or settings — it's the one that makes the profiles you actually share{' '}
                <strong className="text-slate-900 font-bold">
                  easy to find and ready when you need them.
                </strong>
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                This guide covers a few practical ways to keep your ProfileOS workspace clean, useful, and effortless.
              </p>
            </div>

            {/* Chapter 01 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">01</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Strategy</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Organize by Identity
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Separate profiles by purpose, not by platform.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                If you use the same ProfileOS profile for everything, your collection can quickly become another long list to search through. Instead, think about the different identities you represent online.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A <strong>Personal</strong> profile can contain the accounts you share with friends and family. A <strong>Work</strong> or <strong>Freelance</strong> profile can hold your professional presence and portfolio. A <strong>Creator</strong> profile can bring together the channels representing your creative work.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This makes switching profiles meaningful. When you're sharing something professionally, you're already looking at the professional collection rather than sorting through personal accounts first.
              </p>
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-emerald-900 text-xs sm:text-sm space-y-1">
                <div className="font-bold text-xs uppercase tracking-wider text-emerald-700">A useful rule</div>
                <div className="font-bold text-slate-900">If you would share it with a different audience, consider giving it a different ProfileOS profile.</div>
              </div>
            </div>

            {/* Chapter 02 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">02</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Curation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Add the Links You Actually Use
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Keep your workspace useful, not crowded.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ProfileOS supports 229+ platforms, but that doesn't mean you need to add every platform you've ever created an account on.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Start with the profiles you actively use or regularly share. Your main social accounts, professional profiles, portfolio, website, creator channels, and important custom URLs are usually a good foundation.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                An organized collection of useful links is much easier to navigate than a collection filled with inactive accounts.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-xs">
                <div className="font-bold text-slate-900">Think of ProfileOS as your everyday toolkit.</div>
                <div className="text-slate-600">Add what you reach for. Leave out what you don't.</div>
              </div>
            </div>

            {/* Chapter 03 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">03</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Context Boundaries</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Keep Different Identities Separate
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Avoid sharing the wrong profile.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                If you manage multiple identities, separation becomes especially important.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Imagine having a personal Instagram, a professional Instagram, and a Creator account with similar usernames. Keeping all three in one place without any structure increases the chance of selecting the wrong one.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use separate ProfileOS profiles to create clear boundaries between them. Before sharing, take a quick look at the active profile and make sure you're sharing from the right context.
              </p>
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-0.5 text-xs sm:text-sm">
                <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider">The goal is simple</div>
                <div className="font-bold text-white">The right identity should be the easiest identity to share.</div>
              </div>
            </div>

            {/* Chapter 04 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">04</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Efficiency</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Build Your Templates Once
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Don't rewrite the same links every time.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                If you frequently send several profiles together, create a sharing template instead of manually assembling the same list over and over.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use dynamic tokens such as <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-bold">[platform_name]</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-bold">[display_name]</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-bold">[username]</code>, and <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-bold">[account_url]</code> to build a format that matches the way you normally communicate.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You might prefer a simple text format for messages, a Markdown format for a README, or a structured JSON format for a technical workflow. Once you've created the format you like, ProfileOS can generate it from the profile information you've already saved.
              </p>
              <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-xs text-blue-950 font-bold">
                ⚡ Create once. Reuse whenever you share.
              </div>
            </div>

            {/* Chapter 05 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">05</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Muscle Memory</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Make Your Swipes Memorable
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Let the gesture become muscle memory.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ProfileOS is built around two primary swipe actions. <strong>Swipe right to copy your handle. Swipe left to copy your configured template.</strong>
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The more consistently you use the gestures, the less you'll need to think about them. When someone asks for a single handle, use the right swipe. When you need to share a formatted collection, use the left swipe.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                After a little practice, the interaction becomes almost automatic.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center sm:text-left">
                  <div className="text-xs font-bold text-slate-400 uppercase">Swipe Right</div>
                  <div className="text-sm font-black text-slate-900 mt-1">Right for the handle</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center sm:text-left">
                  <div className="text-xs font-bold text-slate-400 uppercase">Swipe Left</div>
                  <div className="text-sm font-black text-slate-900 mt-1">Left for the template</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium">Keep that simple mental model and ProfileOS stays fast.</p>
            </div>

            {/* Chapter 06 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">06</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Quality Check</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Check Your Links When You Add Them
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                A well-organized profile is only useful when its links are correct.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Take a moment to review a profile after adding it. Make sure the username is correct and that custom URLs point to the page you actually want people to visit.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This is particularly useful for accounts with similar usernames or platforms where your public handle and profile URL aren't identical.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A few seconds during setup can prevent an awkward correction later.
              </p>
              <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-amber-900 text-xs font-bold">
                💡 Your future self will thank you.
              </div>
            </div>

            {/* Chapter 07 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">07</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">In-Person</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Use QR Codes When You're Face-to-Face
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Don't make someone type a username when they can scan it.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                QR codes are particularly useful when you're sharing a profile in person.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                At networking events, conferences, creator meetups, presentations, or casual conversations, displaying a QR code can be faster than spelling out a username or asking someone to search for you.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Keep your most useful profile ready to display and let the other person scan it directly from your screen.
              </p>
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">In person, make the connection visual</div>
                <div className="text-sm sm:text-base font-black text-white">Show the code. Let them scan. Keep talking.</div>
              </div>
            </div>

            {/* Chapter 08 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">08</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Visual Shield</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Use Private Masking When You're Showing Your Screen
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Not every screen needs to reveal every detail.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                If you're recording a tutorial, presenting your ProfileOS setup, streaming your phone, or sharing your screen publicly, consider enabling Private Masking Mode when appropriate.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Masking can make sensitive handle characters less visible while you're demonstrating your workspace. It is particularly useful when your screen is being viewed by people who don't need access to every detail of your profiles.
              </p>
              <div className="p-4 bg-purple-50/70 border border-purple-200/80 rounded-2xl text-purple-950 text-xs sm:text-sm font-semibold">
                🛡️ Show the workflow without unnecessarily exposing the information behind it.
              </div>
            </div>

            {/* Chapter 09 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">09</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Maintenance</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Review Your Profiles From Time to Time
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Keep your digital presence current.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your online identity changes. You may change a username, stop using a platform, launch a new website, or create a new professional account.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ProfileOS works best when the information inside it reflects your current digital presence.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every so often, take a quick look through your profiles and remove links you no longer use or update anything that has changed.
              </p>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 font-bold">
                ✨ A few minutes of maintenance keeps everything ready.
              </div>
            </div>

            {/* Chapter 10 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">10</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Simplicity</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Keep Your Setup Simple
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Don't customize just because you can.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ProfileOS offers personalization, templates, profiles, QR codes, masking, and a broad platform library. You don't need to configure everything immediately.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Start with the basics and build from there. Create the profiles you need. Add your most-used accounts. Learn the swipe gestures. Then introduce templates or QR codes when they solve an actual problem for you.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                <div className="text-xs font-bold text-slate-900">The best ProfileOS setup is the one that disappears into your routine.</div>
                <div className="text-xs text-slate-600">If you can open the app, find the right profile, swipe, and share without thinking about the process, your setup is doing its job.</div>
              </div>
            </div>

            {/* Chapter 11 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">11</span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Data Preservation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Export Encrypted Backups
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Keep a private backup of your ProfileOS workspace.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your ProfileOS data is valuable because it represents the digital identity you've carefully organized. If you've spent time creating profiles, adding handles, building templates, and customizing your workspace, having a backup gives you a way to preserve that setup beyond the device you're currently using.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Make a habit of periodically exporting an <strong className="text-slate-900">encrypted backup</strong> of your ProfileOS data and storing it somewhere you personally control. A monthly backup can be a simple way to keep a recent copy available in case you change devices, reset your phone, or need to restore your workspace later.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Because the backup contains your ProfileOS information, treat it like any other private personal data. Store it securely, don't share it publicly, and keep any required password or encryption key somewhere safe and accessible only to you.
              </p>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-1 text-xs sm:text-sm">
                <div className="font-bold text-xs uppercase tracking-wider text-emerald-700">A simple habit worth keeping</div>
                <div className="font-bold text-slate-900">Organize your profiles. Back them up. Keep your digital workspace yours.</div>
              </div>

              <div className="p-4 bg-slate-50 border-l-4 border-emerald-500 rounded-r-2xl text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Best practice:</strong> Export a fresh encrypted backup whenever your ProfileOS setup changes significantly, and consider making <strong>monthly backups</strong> part of your routine.
              </div>
            </div>

            {/* A Simple ProfileOS Routine */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">The ProfileOS Habit</div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                A Simple ProfileOS Routine
              </h2>
              <h3 className="text-sm sm:text-base font-bold text-slate-200">
                Keep it organized. Keep it current. Keep it ready.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The best way to use ProfileOS is to treat it as the <strong className="text-white">single source of truth for the profiles you regularly share</strong>.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Keep different identities separated. Add only the accounts that matter. Build reusable templates for repetitive sharing. Learn the swipe actions until they feel natural. Use QR codes when you're connecting in person, and use Private Masking Mode whenever you need more control over what appears on-screen.
              </p>
              <div className="p-4 bg-slate-800/90 border border-slate-700/80 rounded-2xl text-center sm:text-left space-y-1">
                <div className="text-base sm:text-lg font-black text-emerald-300">
                  Organize once. Maintain occasionally. Share instantly.
                </div>
                <div className="text-xs text-slate-400">That's the ProfileOS habit.</div>
              </div>
            </div>
          </div>
        )}

        {(activeGuideId === 'smart-tokens' || activeGuideId === 'smart-share-templates') && (
          <div className="space-y-6 text-left">
            {/* Lead Overview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Write It Once. Share It Your Way.
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Sharing a profile is rarely just about sending a username. Sometimes you want to send a simple handle. Sometimes you want to introduce yourself with a little context. Sometimes you need a clean format for a message, a portfolio, a collaboration request, or a professional introduction.
              </p>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-slate-900 text-xs sm:text-sm font-semibold">
                <strong className="text-[#2563EB] font-bold">Smart Share Templates</strong> let you decide exactly how your profiles should be shared—then let ProfileOS fill in the details for you.
              </div>
            </div>

            {/* WHAT IS A SMART SHARE TEMPLATE? */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                WHAT IS A SMART SHARE TEMPLATE?
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                A Message That Knows Your Profile
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                A Smart Share Template is a reusable sharing format made from normal text and dynamic tokens. Instead of rewriting the same message every time someone asks for your profile, you create the format once and let ProfileOS generate the finished version whenever you need it.
              </p>
              
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2">
                <div className="text-xs text-slate-500 font-medium">For example, you could create a template like:</div>
                <blockquote className="p-3.5 bg-white rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-[#2563EB] font-bold">
                  Check out my [platform_name]: [account_url]
                </blockquote>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                When you use that template with an Instagram profile, ProfileOS replaces the tokens with the information from that profile.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The result becomes a ready-to-share message without manually typing the platform name, username, or URL every time.
              </p>
            </div>

            {/* THE FOUR SMART TOKENS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  THE FOUR SMART TOKENS
                </div>
                <p className="text-xs sm:text-sm text-slate-600 pt-1">
                  ProfileOS currently supports four tokens, each representing a different piece of profile information.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Token 1 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-block font-mono text-sm font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                      [platform_name]
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      inserts the name of the platform, such as Instagram, GitHub, Threads, or LinkedIn.
                    </p>
                  </div>
                </div>

                {/* Token 2 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-block font-mono text-sm font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                      [display_name]
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      inserts the display name associated with the profile.
                    </p>
                  </div>
                </div>

                {/* Token 3 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-block font-mono text-sm font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                      [username]
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      inserts the username or handle.
                    </p>
                  </div>
                </div>

                {/* Token 4 */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="inline-block font-mono text-sm font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                      [account_url]
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      inserts the direct URL to the account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 font-medium">
                These tokens can be used individually or combined to create exactly the kind of sharing format you prefer.
              </div>
            </div>

            {/* BUILD YOUR OWN SHARING STYLE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                BUILD YOUR OWN SHARING STYLE
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Your Message. Your Format.
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                There isn't one correct way to share a profile.
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-slate-500">You might prefer something minimal:</div>
                  <blockquote className="font-mono text-xs sm:text-sm text-[#2563EB] bg-white p-3 rounded-xl border border-slate-200">
                    Instagram: [username]
                  </blockquote>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-slate-500">Or something more conversational:</div>
                  <blockquote className="font-mono text-xs sm:text-sm text-[#2563EB] bg-white p-3 rounded-xl border border-slate-200">
                    You can find me on [platform_name] as [username].
                  </blockquote>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-slate-500">Or a format that includes the direct profile:</div>
                  <blockquote className="font-mono text-xs sm:text-sm text-[#2563EB] bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <div>[display_name] — [platform_name]</div>
                    <div>[account_url]</div>
                  </blockquote>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                You can make the template short, descriptive, professional, casual, or completely unique to the way you communicate.
              </p>
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs sm:text-sm font-bold text-slate-900">
                The important part is that you don't have to rebuild it every time.
              </div>
            </div>

            {/* CREATE ONCE. REUSE EVERY TIME. */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                CREATE ONCE. REUSE EVERY TIME.
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The real advantage of Smart Share Templates is repetition without the repetitive work.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                If you regularly send your social profiles to clients, friends, collaborators, customers, or new contacts, you can create a sharing format that already sounds like you. Once it's saved, ProfileOS can generate it from the profile information you already have.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                That turns a task you might normally type from memory into a simple action.
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm font-black text-emerald-800">
                Find the profile. Swipe left. Share the generated template.
              </div>
            </div>

            {/* SMART TEMPLATES + SWIPE ACTIONS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                SMART TEMPLATES + SWIPE ACTIONS
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Two Swipes. Two Different Results.
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ProfileOS gives your profile cards two useful sharing actions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-blue-600 uppercase">Swipe Right →</div>
                  <p className="text-xs sm:text-sm text-slate-800 font-semibold">
                    Swipe right when you need the handle or username itself.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="text-xs font-bold text-orange-600 uppercase">← Swipe Left</div>
                  <p className="text-xs sm:text-sm text-slate-800 font-semibold">
                    Swipe left when you want your custom Smart Share Template.
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                That distinction keeps sharing flexible. If someone says, <em className="text-slate-900 font-medium">“What's your GitHub username?”</em>, you can quickly copy the handle. If they ask for your profile link or you want to send a more complete introduction, swipe left and use your prepared format.
              </p>
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs sm:text-sm font-bold text-slate-900">
                The profile stays the same. The way you share it can change.
              </div>
            </div>

            {/* GO BEYOND PLAIN TEXT */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                GO BEYOND PLAIN TEXT
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Smart Share Templates don't have to be limited to one kind of message.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Once your profile information is organized inside ProfileOS, you can use it across different sharing formats, including plain text, URLs, Markdown, and JSON.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                This makes ProfileOS useful whether you're sending something to a person in a chat, preparing structured information, copying a profile into documentation, or simply keeping a consistent format for yourself.
              </p>
              <div className="space-y-1.5 pt-1 text-xs sm:text-sm text-slate-700">
                <p>The goal isn't to make sharing more complicated.</p>
                <p>It's to make the information you already manage <strong className="text-slate-950 font-bold">more reusable</strong>.</p>
              </div>
            </div>

            {/* EXAMPLE: A CREATOR PROFILE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                EXAMPLE: A CREATOR PROFILE
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Imagine you have a creator profile containing Instagram, Threads, TikTok, YouTube, and your personal website.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Instead of creating five different messages every time someone asks where they can find you, you could create a reusable format:
              </p>
              <blockquote className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs sm:text-sm text-purple-900 space-y-1">
                <div>Find me on [platform_name]: [username]</div>
                <div>[account_url]</div>
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                When applied to each profile, ProfileOS generates the appropriate information automatically.
              </p>
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-xs sm:text-sm font-bold text-purple-900">
                One template. Multiple profiles. No repetitive editing.
              </div>
            </div>

            {/* EXAMPLE: A PROFESSIONAL INTRODUCTION */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                EXAMPLE: A PROFESSIONAL INTRODUCTION
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                For a professional identity, you might want something more polished:
              </p>
              <blockquote className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs sm:text-sm text-emerald-900 space-y-1">
                <div>[display_name]</div>
                <div>[platform_name]: [username]</div>
                <div>[account_url]</div>
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The same template can work across different professional platforms while keeping your presentation consistent.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                This is especially useful when your online identity exists across several places and you want every introduction to feel intentional.
              </p>
            </div>

            {/* KEEP YOUR TEMPLATES SIMPLE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                KEEP YOUR TEMPLATES SIMPLE
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                A good template doesn't need to be complicated.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Start with the information you actually share. If you usually send a username and URL, keep it focused on those. If your introductions benefit from your display name or platform name, add those tokens.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Think of templates as <strong className="text-slate-900">shortcuts for communication</strong>, not complicated formatting systems.
              </p>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">
                Create the format once. Let the profile information do the rest.
              </div>
            </div>

            {/* THE SMART SHARE WORKFLOW */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                THE SMART SHARE WORKFLOW
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950 font-bold">Create</strong> your profile and add the information you want to share.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950 font-bold">Build</strong> a template using your preferred text and Smart Tokens.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950 font-bold">Find</strong> the profile whenever you need it.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950 font-bold">Swipe left</strong> to generate your custom sharing format.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950 font-bold">Share</strong> the result wherever it needs to go.
                </div>
              </div>
              <div className="pt-1">
                <h3 className="text-base sm:text-lg font-black text-[#2563EB]">
                  Less typing. More sharing.
                </h3>
              </div>
            </div>

            {/* SMART SHARING, WITHOUT THE REPETITION */}
            <div className="bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-xs">
                SMART SHARING, WITHOUT THE REPETITION
              </div>
              <p className="text-xs sm:text-sm text-blue-50 leading-relaxed">
                Your online profiles may change from context to context, but the way you introduce them doesn't have to be rewritten from scratch.
              </p>
              <p className="text-xs sm:text-sm text-blue-50 leading-relaxed">
                Smart Share Templates give your profile information a reusable voice—one you define once and use whenever the moment comes.
              </p>
              <div className="pt-2">
                <h3 className="text-base sm:text-xl font-black text-white">
                  Your profiles hold the information. Your templates decide how it's shared.
                </h3>
              </div>
            </div>

            {/* Interactive Token Sandbox Live Tester */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white bg-slate-900 px-2.5 py-1 rounded-full">Interactive Sandbox</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Preview Tester</span>
                </div>
                <h2 className="text-xl font-black text-slate-900">Test Your Smart Tokens Live</h2>
                <p className="text-xs text-slate-600 font-medium">
                  Click the token pills or edit the string below to preview how ProfileOS dynamically resolves values for different platforms.
                </p>
              </div>

              {/* Platform Selector */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 mr-2">Test with:</span>
                {(['instagram', 'github', 'x', 'linkedin'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedDemoPlatform(p)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                      selectedDemoPlatform === p
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Template Editor */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Template String</label>
                <input
                  type="text"
                  value={interactiveTemplate}
                  onChange={e => setInteractiveTemplate(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-200 focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none text-xs sm:text-sm font-mono text-slate-900"
                />
              </div>

              {/* Clickable Token Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Insert Smart Tokens (Click to Add):
                </span>
                <div className="flex flex-wrap gap-2">
                  {['[platform_name]', '[display_name]', '[username]', '[account_url]'].map(tok => (
                    <button
                      key={tok}
                      onClick={() => setInteractiveTemplate(prev => prev + ' ' + tok)}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-xs font-mono text-[#2563EB] hover:bg-blue-100 transition-colors cursor-pointer font-bold"
                    >
                      + {tok}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Render Output */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>Resolved Output (What gets copied on Swipe Left):</span>
                  <button
                    onClick={() => handleCopySnippet(renderedTemplate, 'Dynamic Output')}
                    className="flex items-center gap-1 text-blue-400 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                  >
                    {copiedToken === 'Dynamic Output' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Output</span>
                  </button>
                </div>
                <div className="text-sm font-mono font-medium text-emerald-300 bg-slate-800/90 p-3.5 rounded-xl border border-slate-700/60 break-all">
                  {renderedTemplate}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeGuideId === 'whats-new' && (
          <div className="space-y-6 text-left">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    The Beginning of ProfileOS
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Version 1.0.0
                  </h2>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Released: September 2, 2026</span>
                  </span>
                  <span className="px-2.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    Stable
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                ProfileOS <strong className="text-slate-950 font-bold">1.0.0</strong> is the first release of the app, introducing a focused workspace for organizing, managing, and sharing your social profiles, handles, websites, and important URLs — all from one place.
              </p>

              {/* What's Included */}
              <div className="border-t border-slate-100 pt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    What's Included
                  </h3>
                  <span className="text-xs font-bold text-slate-400">9 Core Capabilities</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                      <strong className="font-bold text-[#2563EB] text-sm">Spaces &amp; Profiles</strong>
                    </div>
                    <span className="text-slate-700 leading-relaxed">Separate personal, professional, creator, and studio identities into focused, distraction-free workspaces.</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                      <strong className="font-bold text-[#2563EB] text-sm">229+ Platforms</strong>
                    </div>
                    <span className="text-slate-700 leading-relaxed">Choose from a broad platform library with auto-resolving URLs or add custom websites and arbitrary links.</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <strong className="font-bold text-rose-600 text-sm">Gesture Shortcuts</strong>
                    </div>
                    <span className="text-slate-700 leading-relaxed">Configure swipe actions for <strong>Copy, Link, Template, or Username</strong> for tactile, fast sharing.</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <strong className="font-bold text-emerald-600 text-sm">Smart Share Templates</strong>
                    </div>
                    <span className="text-slate-700 leading-relaxed">Create reusable formats with <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-xs text-blue-600">[platform_name]</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-xs text-blue-600">[display_name]</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-xs text-blue-600">[username]</code>, and <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-xs text-blue-600">[account_url]</code>.</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <strong className="font-bold text-amber-600 text-sm">Instant QR Codes</strong>
                    </div>
                    <span className="text-slate-700 leading-relaxed">Generate clear, high-contrast QR codes on the fly for effortless in-person, camera-based sharing.</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <strong className="font-bold text-purple-600 text-sm">Privacy Shield Mode</strong>
                    </div>
                    <span className="text-slate-700 leading-relaxed">Visually mask sensitive handles with character concealing when presenting or screen sharing.</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-sky-500" />
                      <strong className="font-bold text-sky-600 text-sm">Favicon &amp; Branding</strong>
                    </div>
                    <span className="text-slate-700 leading-relaxed">Identify platforms and custom websites at a glance with built-in branding and automatic favicon fetching.</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <strong className="font-bold text-indigo-600 text-sm">Personalization</strong>
                    </div>
                    <span className="text-slate-700 leading-relaxed">Tune available appearance themes, card styles, gesture behaviors, and tactile haptic preferences.</span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-2 md:col-span-2 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                      <strong className="font-bold text-slate-900 text-sm">Encrypted Backups</strong>
                    </div>
                    <span className="text-slate-700 leading-relaxed">Export your entire ProfileOS workspace as a password-protected, encrypted backup for safe storage and restore.</span>
                  </div>
                </div>
              </div>

              {/* Architecture Highlight */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-[#2563EB] uppercase tracking-wider">Local-First Architecture</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">Zero cloud dependencies. 100% offline-ready with persistent local storage.</div>
                </div>
                <div className="shrink-0 px-3 py-1 bg-white rounded-full border border-blue-200 text-[#2563EB] text-xs font-black">
                  Zero Latency
                </div>
              </div>

              {/* Closing Banner */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  A simple beginning for a faster way to manage your digital identity.
                </p>
                <div className="p-4 bg-gradient-to-r from-[#2563EB] to-indigo-600 rounded-2xl text-white text-center font-black tracking-wide text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span>Create. Organize. Swipe. Share.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeGuideId === 'faq' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-900">Frequently Asked Questions</h2>
                  <p className="text-xs text-slate-500 font-medium sm:hidden">
                    Filter by topic or scroll horizontally
                  </p>
                </div>
                
                {/* Category Tabs */}
                <div className="w-full sm:w-auto overflow-x-auto scrollbar-none touch-pan-x -mx-1 px-1 py-0.5">
                  <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-full text-xs font-bold border border-slate-200/60 shadow-2xs shrink-0">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'privacy', label: 'Privacy' },
                      { id: 'gestures', label: 'Gestures' },
                      { id: 'tokens', label: 'Tokens' },
                      { id: 'storage', label: 'Storage' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveFaqCategory(cat.id as any)}
                        className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          activeFaqCategory === cat.id
                            ? 'bg-white text-slate-900 shadow-xs font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100 border-t border-slate-100 pt-2">
                {filteredFaqs.map((faq, idx) => {
                  const isExpanded = expandedFaqIndex === idx;
                  return (
                    <div key={idx} className="py-3">
                      <button
                        onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                        className="w-full text-left flex items-center justify-between gap-4 cursor-pointer hover:text-[#3B82F6] transition-colors py-2"
                      >
                        <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                        <ChevronRight
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isExpanded ? 'rotate-90 text-[#3B82F6]' : ''
                          }`}
                        />
                      </button>
                      {isExpanded && (
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Spaces & Profiles Dedicated Detailed Guide */}
        {activeGuideId === 'spaces-profiles' && (
          <div className="space-y-6 text-left">
            {/* Lead Overview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Different Identities. One Organized Workspace.
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Your online presence isn't always one thing. You might have a personal identity, a professional presence, a freelance portfolio, or a creator account — each with its own collection of social profiles and links.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                ProfileOS gives you a simple way to keep those identities separate while managing them from the same app.
              </p>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-slate-900 text-xs sm:text-sm font-semibold">
                Instead of putting every account into one long list, you can create{' '}
                <strong className="text-[#2563EB] font-bold">
                  Spaces and Profiles around the way you actually use your digital presence.
                </strong>
              </div>
            </div>

            {/* WHAT IS A SPACE? */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                WHAT IS A SPACE?
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                A Space Is a Home for an Identity.
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                A Space represents a distinct context in your digital life. It can be your personal presence, your professional work, a creative project, or a brand you manage.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Think of a Space as the boundary around a particular collection of profiles. The accounts inside it belong together because they represent the same purpose or identity.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                For example, you might have a <strong className="text-slate-900 font-bold">Personal</strong> Space for the accounts you share with friends, a <strong className="text-slate-900 font-bold">Freelance</strong> Space for your professional presence, and a <strong className="text-slate-900 font-bold">Creator</strong> Space for the social channels representing your creative work.
              </p>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 font-semibold">
                The purpose isn't to create unnecessary complexity. It's to make sure the{' '}
                <strong className="text-[#2563EB]">right collection of profiles is available at the right moment.</strong>
              </div>
            </div>

            {/* WHAT IS A PROFILE? */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                WHAT IS A PROFILE?
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                A Profile Is Your Shareable Identity.
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Inside a Space, your Profile brings together the accounts and links that represent that identity.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                A profile can contain your social handles, websites, portfolio links, creator platforms, and other URLs you regularly need to share.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Instead of thinking about each account separately, ProfileOS lets you see the collection as one organized presence.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Your Instagram can sit alongside your Threads, X, GitHub, website, or other profiles — all belonging to the same context.
              </p>
              <div className="pt-1">
                <h3 className="text-sm sm:text-base font-black text-[#2563EB]">
                  One identity. Everything connected to it.
                </h3>
              </div>
            </div>

            {/* WHY SEPARATE THEM? */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-orange-400 bg-orange-950/60 px-3 py-1 rounded-full border border-orange-800/80">
                WHY SEPARATE THEM?
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Because Context Matters.
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>
                  Imagine you're talking to a potential client and they ask where they can see your work. You probably don't want to hand them a collection containing every personal account you use.
                </p>
                <p>
                  Or you're meeting friends and someone asks for your social handle. Your professional Creator accounts may not be what you want to share in that moment.
                </p>
                <p>
                  Separating your Spaces and Profiles gives you control over <strong className="text-white font-bold">which part of your digital presence you're working with.</strong>
                </p>
                <p>
                  You don't have to remember which accounts belong together. The organization is already there.
                </p>
              </div>
            </div>

            {/* 4 CARDS: PERSONAL, WORK, CREATOR, BUSINESS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* PERSONAL */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    PERSONAL
                  </span>
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Your Everyday Digital Identity.
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Use a Personal Space for the accounts you use in everyday life. Keep your personal social profiles together without mixing them with accounts that represent your work or business.
                </p>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                  When you switch to your Personal profile, you know exactly what you're looking at and what you're ready to share.
                </p>
              </div>

              {/* WORK & FREELANCE */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    WORK &amp; FREELANCE
                  </span>
                  <Briefcase className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Keep Your Professional Presence Focused.
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Your professional identity may include LinkedIn, GitHub, a portfolio, a personal website, or other work-related platforms.
                </p>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                  Keeping these accounts together creates a focused workspace for professional conversations, client interactions, applications, networking, and sharing your work.
                </p>
              </div>

              {/* CREATOR */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                    CREATOR
                  </span>
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Everything Behind Your Creative Identity.
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Creators often exist across several platforms at once. One account may be where you publish, another where you interact with your community, and another where people discover your work.
                </p>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                  A Creator Space brings those channels together so your audience-facing identity is easy to manage and share.
                </p>
              </div>

              {/* BUSINESS & BRAND */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    BUSINESS &amp; BRAND
                  </span>
                  <Building2 className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Give Your Brand Its Own Space.
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  If you manage social accounts for a studio, business, project, or creative brand, a dedicated Space keeps those channels clearly separated from your personal identity.
                </p>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                  For example, your studio Space could contain Instagram, Threads, X, Facebook, Bluesky, Pinterest, your website, and other brand-related links.
                </p>
              </div>
            </div>

            {/* SWITCH WHEN THE CONTEXT CHANGES */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <Repeat className="w-3.5 h-3.5" />
                SWITCH WHEN THE CONTEXT CHANGES
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                The Right Profile for the Right Moment.
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Spaces and Profiles are most useful when your context changes.
              </p>
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span>You're working with a client — switch to Work.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span>You're sharing your personal Instagram — switch to Personal.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span>You're networking as a creator — switch to Creator.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span>You're representing your studio — switch to Studio.</span>
                </div>
              </div>
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs sm:text-sm font-bold text-slate-900 mt-2">
                The accounts don't need to move.{' '}
                <span className="text-[#2563EB]">You simply move to the profile that represents the moment.</span>
              </div>
            </div>

            {/* KEEP IT SIMPLE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                KEEP IT SIMPLE
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                You Don't Need a Space for Everything.
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Spaces aren't meant to turn ProfileOS into another organizational system you have to maintain.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                If you only have one digital identity, one profile may be all you need.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Create another Space when there is a meaningful reason to separate accounts — different audiences, different purposes, or different identities.
              </p>
              <div className="pt-1">
                <h3 className="text-sm sm:text-base font-black text-emerald-700">
                  Separate what needs separation. Keep everything else simple.
                </h3>
              </div>
            </div>

            {/* SPACES + SWIPE ACTIONS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <Zap className="w-3.5 h-3.5" />
                SPACES + SWIPE ACTIONS
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Organization Meets Speed.
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The real benefit of Spaces and Profiles becomes clear when they're combined with ProfileOS's swipe-based sharing.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                First, switch to the identity you want to share. Then find the appropriate profile card and use the gesture you need.
              </p>
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950">Swipe right</strong> to copy the handle.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950">Swipe left</strong> to copy your configured sharing template.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  Generate a <strong className="text-slate-950">QR code</strong> when you're connecting in person.
                </div>
              </div>
              <p className="text-xs text-slate-600 font-semibold pt-1">
                Your organization determines <strong className="text-slate-900">what you're sharing</strong>, while the gesture determines <strong className="text-slate-900">how you're sharing it.</strong>
              </p>
            </div>

            {/* A SIMPLE MENTAL MODEL */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                A SIMPLE MENTAL MODEL
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Space → Profile → Handle → Share
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Think of ProfileOS as a simple hierarchy.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                <li>Your <strong className="text-slate-900">Space</strong> defines the context.</li>
                <li>Your <strong className="text-slate-900">Profile</strong> represents that identity.</li>
                <li>Your <strong className="text-slate-900">Handles and Links</strong> make up the digital presence.</li>
                <li>Your <strong className="text-slate-900">Swipe or Share action</strong> gets the information where it needs to go.</li>
              </ul>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Once that structure makes sense, ProfileOS becomes easy to navigate — even as your online presence grows.
              </p>
            </div>

            {/* THE BEST PART */}
            <div className="bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                THE BEST PART
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                Your Digital Identities Don't Have to Compete for Attention.
              </h2>
              <p className="text-xs sm:text-sm text-blue-50 leading-relaxed">
                Having multiple online identities shouldn't mean having multiple systems to manage them.
              </p>
              <p className="text-xs sm:text-sm text-blue-50 leading-relaxed">
                ProfileOS lets you keep different parts of your digital presence distinct while giving you one consistent way to organize and share them.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="bg-white/10 rounded-xl p-3 border border-white/15 text-center">
                  <div className="font-bold text-xs text-white">Personal</div>
                  <div className="text-[11px] text-blue-100">stays personal</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 border border-white/15 text-center">
                  <div className="font-bold text-xs text-white">Work</div>
                  <div className="text-[11px] text-blue-100">stays professional</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 border border-white/15 text-center">
                  <div className="font-bold text-xs text-white">Creator</div>
                  <div className="text-[11px] text-blue-100">stays creative</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 border border-white/15 text-center">
                  <div className="font-bold text-xs text-white">Studio</div>
                  <div className="text-[11px] text-blue-100">stays on-brand</div>
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-base sm:text-xl font-black text-white">
                  Different identities. Different Spaces. One ProfileOS.
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Instant QR Engine Dedicated Detailed Guide */}
        {activeGuideId === 'instant-qr-engine' && (
          <div className="space-y-6 text-left">
            {/* Lead Overview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Turn Any Profile Into a Scan.
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Not every profile needs to be copied and pasted.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Sometimes you're standing across from someone at an event. Sometimes you're presenting from your phone. Sometimes you simply want to let another person open your profile without typing a username or searching for the right account.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-slate-900 text-xs sm:text-sm font-semibold space-y-2">
                <div>That’s where the <strong className="text-amber-700 font-bold">Instant QR Engine</strong> comes in.</div>
                <p className="text-slate-700 font-normal">
                  ProfileOS can turn a profile into a scannable QR code, giving your digital identity a simple bridge from your screen to someone else's device.
                </p>
              </div>
              {onOpenQrDemo && (
                <div className="pt-1">
                  <button
                    onClick={() => onOpenQrDemo()}
                    className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Launch Live Interactive QR Demo</span>
                  </button>
                </div>
              )}
            </div>

            {/* WHAT IS THE INSTANT QR ENGINE? */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                WHAT IS THE INSTANT QR ENGINE?
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Your Profile, Ready to Scan
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The Instant QR Engine generates a QR code from the profile information you're working with, making it easy to share a profile through a quick camera scan.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Instead of asking someone to remember your username, search for your account, or manually type a URL, you can simply present the QR code.
              </p>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-black text-slate-900">
                Show it. Scan it. Open the profile.
              </div>
            </div>

            {/* WHY QR CODES MATTER */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                WHY QR CODES MATTER
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Built for Real-World Sharing
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Digital profiles are usually shared through digital conversations. QR codes make them just as useful when the conversation is happening face-to-face.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800">
                  <strong className="text-slate-950 block mb-1">At a networking event:</strong>
                  You can show your professional profile.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800">
                  <strong className="text-slate-950 block mb-1">At a creator meetup:</strong>
                  You can display a social account.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800">
                  <strong className="text-slate-950 block mb-1">At a conference:</strong>
                  You can put a profile on a badge or presentation.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800">
                  <strong className="text-slate-950 block mb-1">During a collaboration:</strong>
                  You can let someone scan instead of typing.
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm font-semibold text-slate-900">
                QR codes remove the small but important gap between <strong className="text-amber-800">meeting someone</strong> and <strong className="text-amber-800">connecting with them online</strong>.
              </div>
            </div>

            {/* GENERATE IT WHEN YOU NEED IT */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                GENERATE IT WHEN YOU NEED IT
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                You don't need to prepare a separate QR image for every profile in advance.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Open the profile you want to share and generate its QR code when the moment arrives. ProfileOS keeps the experience centered around the profile you're already managing.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                That means your personal, professional, creator, and studio identities can each have their own shareable QR experience.
              </p>
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs sm:text-sm font-bold text-slate-900">
                One workspace. Multiple identities. A QR when you need one.
              </div>
            </div>

            {/* DESIGNED FOR QUICK SCANNING */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                DESIGNED FOR QUICK SCANNING
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Clear. High-Contrast. Easy to Present.
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                A QR code only works when another device can reliably scan it.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ProfileOS is designed to keep its generated QR codes clear and high-contrast, making them practical for everyday sharing on a phone screen and other presentation contexts.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The idea is simple: don't make the person standing in front of you work for the connection.
              </p>
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-900">
                Put the code on screen and let the camera do the rest.
              </div>
            </div>

            {/* FROM PROFILE CARD TO QR CODE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                FROM PROFILE CARD TO QR CODE
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The QR experience fits naturally into the ProfileOS workflow.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Your profile card already contains the information you want to share. The Instant QR Engine turns that profile into another sharing format without requiring you to leave your workspace or rebuild the information somewhere else.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs text-slate-500 font-medium">Your workflow can look like:</div>
                <div className="font-mono text-xs sm:text-sm font-bold text-[#2563EB] bg-white p-3 rounded-xl border border-slate-200">
                  Create → Organize → Find → Generate QR → Scan → Connect
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Everything starts from the same profile you already manage.
              </p>
            </div>

            {/* PERFECT FOR IN-PERSON MOMENTS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                PERFECT FOR IN-PERSON MOMENTS
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                QR sharing becomes especially useful when typing isn't convenient.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                <p>
                  Imagine exchanging contact information at a conference. Instead of spelling out a username, you can display your profile's QR code.
                </p>
                <p>
                  Imagine giving a presentation where you want people to follow your work. Put the QR code on screen and let attendees scan it.
                </p>
                <p>
                  Imagine wearing a badge at an event. A QR code can give people another way to reach the profile you want them to see.
                </p>
              </div>
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-xs sm:text-sm font-semibold text-purple-900">
                These moments are brief. ProfileOS is designed to make the handoff just as quick.
              </div>
            </div>

            {/* QR IS ONLY ONE WAY TO SHARE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                QR IS ONLY ONE WAY TO SHARE
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                A QR code doesn't replace the other sharing options in ProfileOS. It adds another one.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  When you need the actual handle, <strong className="text-slate-950 font-bold">swipe right</strong>.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  When you want your prepared sharing message, <strong className="text-slate-950 font-bold">swipe left</strong>.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  When you're sharing in person, <strong className="text-slate-950 font-bold">use the QR code</strong>.
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                And when you need structured information, ProfileOS can work with formats such as text, URL, Markdown, and JSON.
              </p>
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs sm:text-sm font-bold text-slate-900">
                Different situations. Different sharing formats. One profile.
              </div>
            </div>

            {/* A BETTER WAY TO CONNECT OFFLINE TO ONLINE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                A BETTER WAY TO CONNECT OFFLINE TO ONLINE
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The internet may be digital, but many of the moments when we share our profiles are not.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The Instant QR Engine gives ProfileOS a simple way to connect those two worlds. Your profile exists inside your workspace, and a scan can turn that profile into an immediate digital connection.
              </p>
              <div className="space-y-1 text-xs sm:text-sm text-slate-700 font-medium pt-1">
                <div>• No searching.</div>
                <div>• No retyping.</div>
                <div>• No trying to remember the exact handle.</div>
              </div>
              <div className="pt-2">
                <h3 className="text-base sm:text-lg font-black text-[#2563EB]">
                  Just scan and go.
                </h3>
              </div>
            </div>

            {/* THE PROFILEOS QR PHILOSOPHY */}
            <div className="bg-gradient-to-tr from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                THE PROFILEOS QR PHILOSOPHY
              </div>
              <p className="text-xs sm:text-sm text-amber-50 leading-relaxed">
                A QR code should feel like a shortcut, not another feature you have to manage.
              </p>
              <p className="text-xs sm:text-sm text-amber-50 leading-relaxed">
                That's why the Instant QR Engine is built around the profile itself. You organize your digital identity once, then choose the sharing method that fits the moment.
              </p>
              <div className="pt-2">
                <h3 className="text-base sm:text-xl font-black text-white">
                  Your profile is the source. QR is the shortcut. The connection is the destination.
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Shield Mode Dedicated Detailed Guide */}
        {activeGuideId === 'privacy-shield-mode' && (
          <div className="space-y-6 text-left">
            {/* Lead Overview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Share Your Screen. Not Everything On It.
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Your digital identity is useful when you need to share it. But there are moments when you don't want every username, handle, or profile visible to everyone looking at your screen.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Maybe you're presenting ProfileOS to a room. Maybe you're recording a tutorial. Maybe you're screen sharing with a client. Or maybe you're simply showing someone how you organize your profiles.
              </p>
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-slate-900 text-xs sm:text-sm font-semibold space-y-1">
                <strong className="text-purple-700 font-bold">Privacy Shield Mode</strong> gives you a simple way to keep sensitive profile details less exposed while keeping your workspace usable.
              </div>
            </div>

            {/* WHAT IS PRIVACY SHIELD MODE? */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                WHAT IS PRIVACY SHIELD MODE?
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Keep Private Details Out of Sight
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Privacy Shield Mode masks sensitive parts of usernames and handles on your ProfileOS cards.
              </p>
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
                <div>
                  <span className="text-xs text-slate-500 font-medium">For example, a username such as:</span>
                  <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-slate-900 bg-white p-3 rounded-xl border border-slate-200">
                    @printionupstudio
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium">can appear as:</span>
                  <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-purple-700 bg-purple-50/70 p-3 rounded-xl border border-purple-200">
                    @pr••••io
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The information is still represented on the card, but the full handle isn't immediately visible to someone viewing your screen.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                It's a small layer of visual privacy designed for moments when your ProfileOS workspace is being seen by other people.
              </p>
            </div>

            {/* BUILT FOR SCREEN SHARING */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                BUILT FOR SCREEN SHARING
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Present Without Broadcasting Every Detail
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Screen sharing changes the context of your phone.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Information that normally feels private can suddenly become visible to an entire meeting, classroom, livestream, recording, or audience.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Privacy Shield Mode is designed for exactly these situations.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                When you need to demonstrate your profiles, walk through your workspace, or present ProfileOS without exposing every full username, masking gives you a cleaner way to do it.
              </p>
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-xs sm:text-sm font-black text-purple-900">
                Show the workspace. Protect the details.
              </div>
            </div>

            {/* USE IT WHEN VISIBILITY CHANGES */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                USE IT WHEN VISIBILITY CHANGES
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Privacy Shield Mode is especially useful when your screen moves from personal viewing to public viewing.
              </p>
              <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-800">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950">During a presentation</strong>, it can keep profile handles visually obscured.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950">While recording a tutorial</strong>, it can reduce unnecessary exposure of account information.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950">When collaborating with someone</strong>, it can let you demonstrate your organization without putting every profile detail on display.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950">When showing your phone nearby</strong>, it gives you another layer of control over what they can immediately read.
                </div>
              </div>
            </div>

            {/* A VISUAL PRIVACY LAYER */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                A VISUAL PRIVACY LAYER
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Privacy Shield Mode isn't meant to replace account security, passwords, authentication, or platform-level privacy controls.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                It's a <strong className="text-slate-950 font-bold">presentation-focused privacy feature</strong>.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Its purpose is much simpler: help prevent full profile handles from being casually exposed when your ProfileOS screen is visible to other people.
              </p>
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-900">
                Think of it as a privacy filter for your digital identity workspace.
              </div>
            </div>

            {/* PRIVATE BY DEFAULT. VISIBLE WHEN YOU CHOOSE. */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                PRIVATE BY DEFAULT. VISIBLE WHEN YOU CHOOSE.
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Your profiles can contain information that is perfectly fine to share in one situation but unnecessary to display in another.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Privacy Shield Mode lets you adapt the way your workspace appears to the situation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800">
                  <strong className="text-slate-950 block mb-1">When you're alone:</strong>
                  You can work with your profiles normally.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800">
                  <strong className="text-slate-950 block mb-1">When presenting:</strong>
                  Enable masking to screen share safely.
                </div>
              </div>
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs sm:text-sm font-bold text-slate-900">
                Same workspace. Different level of visibility.
              </div>
            </div>

            {/* PRIVACY SHIELD + PROFILEOS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                PRIVACY SHIELD + PROFILEOS
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Privacy Shield Mode fits into the broader philosophy behind ProfileOS: your digital identities should be organized around <strong className="text-slate-950 font-bold">your control</strong>.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-purple-700">Separate Spaces</strong> help you keep different identities apart.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-purple-700">Smart Share Templates</strong> let you control how profile information is communicated.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-purple-700">Swipe actions</strong> give you deliberate ways to copy what you need.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-purple-700">Privacy Shield Mode</strong> controls what is visually exposed while you're using the app.
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Together, these features make ProfileOS about more than simply storing handles.
              </p>
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-xs sm:text-sm font-black text-purple-900">
                It's about deciding how, when, and where your digital identity is shared.
              </div>
            </div>

            {/* A SIMPLE MENTAL MODEL */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                A SIMPLE MENTAL MODEL
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950">Private workspace:</strong> See your profiles normally.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950">Public screen:</strong> Mask sensitive handles.
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950">Ready to share:</strong> Use the specific profile information you actually want to send.
                </div>
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-slate-700 pt-1">
                <p>Privacy doesn't have to mean hiding everything.</p>
                <p>Sometimes it simply means <strong className="text-slate-950 font-bold">showing less until you decide otherwise.</strong></p>
              </div>
            </div>

            {/* YOUR PROFILES. YOUR VISIBILITY. */}
            <div className="bg-gradient-to-tr from-purple-700 via-indigo-700 to-purple-800 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                YOUR PROFILES. YOUR VISIBILITY.
              </div>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                Your digital identity doesn't need to be completely hidden to be protected.
              </p>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                Sometimes all it takes is a little distance between what you know is there and what everyone else can immediately see.
              </p>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                Privacy Shield Mode gives ProfileOS that extra layer of discretion—especially when your screen isn't just yours anymore.
              </p>
              <div className="pt-2">
                <h3 className="text-base sm:text-xl font-black text-white">
                  Keep your profiles organized. Keep your private details yours.
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Gesture Shortcuts Dedicated Detailed Guide */}
        {activeGuideId === 'gesture-shortcuts' && (
          <div className="space-y-6 text-left">
            {/* Lead Overview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Make Every Swipe Do More.
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                ProfileOS is built around a simple idea: when you need a profile, you shouldn't have to stop and think about how to get the information you need.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Your profile cards already put your digital identities in one place. <strong className="text-slate-950 font-bold">Gesture Shortcuts</strong> take the next step by turning familiar swipe actions into configurable shortcuts for the information you use most.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Instead of navigating through menus every time, you can decide what your gestures should do.
              </p>
              <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-xs sm:text-sm font-black text-rose-900">
                Swipe. Copy. Move on.
              </div>
            </div>

            {/* Interactive Swipe Simulator */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Interactive Gesture Simulator</h3>
                  <p className="text-xs text-slate-500">Try dragging the card left or right to test haptic gestures.</p>
                </div>
              </div>
              <div className="pt-2">
                <SwipeDemo onNotify={onNotify} />
              </div>
            </div>

            {/* WHAT ARE GESTURE SHORTCUTS? */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                WHAT ARE GESTURE SHORTCUTS?
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Your Most-Used Actions, One Gesture Away
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Gesture Shortcuts let you assign useful actions to the gestures available on your profile cards.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                By default, ProfileOS can make your gestures useful for common sharing tasks. But the real flexibility comes from being able to customize those actions in Settings.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Depending on how you use ProfileOS, you might want a swipe to copy the username, copy the profile link, generate your sharing template, or copy another piece of profile information.
              </p>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-black text-slate-900">
                You choose the shortcut. ProfileOS remembers it.
              </div>
            </div>

            {/* MORE THAN JUST COPY */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                MORE THAN JUST COPY
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Choose What Your Swipe Means
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Everyone shares profiles differently.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Maybe you usually send usernames. Maybe you almost always send direct links. Maybe your Smart Share Template is the fastest way to introduce yourself.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold text-slate-900">
                Gesture Shortcuts are designed around those differences. Available actions can include:
              </p>
              <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-800">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <span className="font-black text-slate-950 min-w-[70px]">Copy —</span>
                  <span>Quickly copy the profile information you need.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <span className="font-black text-slate-950 min-w-[70px]">Link —</span>
                  <span>Copy the direct account URL for the profile.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <span className="font-black text-slate-950 min-w-[70px]">Template —</span>
                  <span>Generate and copy your custom Smart Share Template.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                  <span className="font-black text-slate-950 min-w-[70px]">Username —</span>
                  <span>Copy the profile's username or handle directly.</span>
                </div>
              </div>
              <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-xs sm:text-sm font-semibold text-rose-900">
                The result is a profile card that behaves the way <strong>you</strong> expect it to.
              </div>
            </div>

            {/* CUSTOMIZE IT IN SETTINGS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                CUSTOMIZE IT IN SETTINGS
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Your Gestures. Your Workflow.
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ProfileOS doesn't assume that everyone should use the same gesture configuration.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Open <strong className="text-slate-950 font-bold">Settings</strong> and choose the action you want associated with each available gesture. You can configure your shortcuts around the way you actually share information.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                <p>• If you're constantly sending usernames, make that action easier to reach.</p>
                <p>• If you're sharing profile links more often, configure a gesture for links.</p>
                <p>• If you've built detailed Smart Share Templates, give them a gesture of their own.</p>
              </div>
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs sm:text-sm font-bold text-slate-900">
                The best shortcut is the one that matches your habits.
              </div>
            </div>

            {/* RIGHT SWIPE. LEFT SWIPE. YOUR CHOICE. */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                RIGHT SWIPE. LEFT SWIPE. YOUR CHOICE.
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ProfileOS can provide an intuitive starting point for gestures, such as:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  <span>Swipe right → Username</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-[#2563EB]" />
                  <span>Swipe left → Template</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                But Gesture Shortcuts make the experience more flexible by allowing you to customize these actions from Settings.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                That means the gesture system can evolve with the way you use the app.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Your workflow might start with usernames and templates. Later, you may find that direct links are what you copy most often.
              </p>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900">
                Instead of changing how you use ProfileOS, simply change what the gesture does.
              </div>
            </div>

            {/* DESIGNED FOR MUSCLE MEMORY */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                DESIGNED FOR MUSCLE MEMORY
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Less Thinking. More Doing.
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The best shortcuts eventually become automatic.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                You see the profile you need. You already know which direction to swipe. The information is copied. You're done.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                That's the value of gesture-based interaction: it reduces the number of decisions between <strong className="text-slate-950 font-bold">finding something</strong> and <strong className="text-slate-950 font-bold">using it</strong>.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                With customizable actions, you can build a workflow that feels natural enough to become second nature.
              </p>
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 font-mono text-xs sm:text-sm font-bold text-emerald-900">
                Find → Swipe → Copy → Share.
              </div>
            </div>

            {/* DIFFERENT PROFILES, SAME SIMPLE ACTION */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                DIFFERENT PROFILES, SAME SIMPLE ACTION
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Whether you're working with a personal Instagram account, a professional LinkedIn profile, a creator TikTok account, a GitHub profile, or a custom website, the interaction stays familiar.
              </p>
              <div className="space-y-1 text-xs sm:text-sm text-slate-700 font-medium pt-1">
                <div>• The profile information changes.</div>
                <div>• The platform changes.</div>
                <div>• Your context changes.</div>
                <div className="text-slate-950 font-bold">• But your gesture can remain consistent.</div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                That's what makes Gesture Shortcuts useful across the entire ProfileOS workspace.
              </p>
            </div>

            {/* WHEN EVERY SECOND COUNTS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                WHEN EVERY SECOND COUNTS
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Imagine someone asks:
              </p>
              <blockquote className="p-3.5 bg-slate-50 rounded-2xl border-l-4 border-amber-500 text-xs sm:text-sm italic font-semibold text-slate-800">
                “What's your username?”
              </blockquote>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900">
                Find the profile. Swipe. Copy.
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                Someone asks:
              </p>
              <blockquote className="p-3.5 bg-slate-50 rounded-2xl border-l-4 border-blue-500 text-xs sm:text-sm italic font-semibold text-slate-800">
                “Can you send me your profile?”
              </blockquote>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900">
                Find the profile. Use your link shortcut.
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                You want to introduce yourself with your prepared message?
              </p>
              <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-xs sm:text-sm font-semibold text-purple-900">
                Swipe to your Template action.
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The interaction stays small because the setup has already been done.
              </p>
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm font-black text-amber-900">
                Configure once. Use hundreds of times.
              </div>
            </div>

            {/* GESTURES + SMART SHARE TEMPLATES */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                GESTURES + SMART SHARE TEMPLATES
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Gesture Shortcuts become even more powerful when combined with Smart Share Templates.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Your template already knows how you want to introduce a profile. Your gesture gives you a fast way to trigger it.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                That means you don't have to open a template editor, select information, rebuild the message, and copy it manually.
              </p>
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-900">
                The template handles the format. The gesture handles the speed.
              </div>
            </div>

            {/* A SHORTCUT SYSTEM THAT ADAPTS TO YOU */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                A SHORTCUT SYSTEM THAT ADAPTS TO YOU
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ProfileOS isn't trying to add gestures just for the sake of having gestures.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Every shortcut should answer a simple question:
              </p>
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs sm:text-sm font-black text-blue-900">
                “What do I need to do most often?”
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                If the answer changes, your shortcuts can change too.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                That's why Gesture Shortcuts belong in Settings. They aren't fixed rules—they're part of making ProfileOS feel personal to the way you manage and share your digital identity.
              </p>
            </div>

            {/* THE PROFILEOS GESTURE PHILOSOPHY */}
            <div className="bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-700 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-xs">
                <Zap className="w-3.5 h-3.5" />
                THE PROFILEOS GESTURE PHILOSOPHY
              </div>
              <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
                A good gesture should feel almost invisible.
              </p>
              <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
                You shouldn't need to remember a complicated sequence. You shouldn't need to dig through menus for something you do every day.
              </p>
              <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
                You should be able to see the profile, make the gesture, get the information, and continue with whatever you were doing.
              </p>
              <div className="pt-2">
                <h3 className="text-base sm:text-xl font-black text-white">
                  Your profiles are organized. Your shortcuts are yours. Your swipe does the work.
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Favicon & Branding Dedicated Detailed Guide */}
        {activeGuideId === 'favicon-branding' && (
          <div className="space-y-6 text-left">
            {/* Lead Overview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Every Profile Should Look Like It Belongs There.
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                A profile isn't just a username and a URL. The visual identity behind it matters too.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                When you're managing dozens of profiles across different platforms, recognizing the right account shouldn't require reading every detail. A familiar icon, favicon, or platform mark can give you the visual cue you need before you even read the username.
              </p>
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-slate-900 text-xs sm:text-sm font-semibold space-y-1">
                <strong className="text-sky-700 font-bold">Favicon &amp; Branding</strong> brings that visual layer into ProfileOS, making profile cards easier to recognize, scan, and organize.
              </div>
            </div>

            {/* WHY VISUAL IDENTITY MATTERS */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                WHY VISUAL IDENTITY MATTERS
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Recognize First. Read Second.
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Think about how quickly you recognize Instagram, GitHub, LinkedIn, YouTube, or Threads without reading their names.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ProfileOS uses that same instinct to make your workspace more glanceable.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Platform icons help you immediately understand where a profile belongs, while website favicons can provide a visual identity for custom URLs.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The result is a workspace where profiles don't all look like lines of text.
              </p>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-black text-slate-900">
                You can see where you are before you start reading.
              </div>
            </div>

            {/* PLATFORM ICONS, BUILT INTO THE EXPERIENCE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                PLATFORM ICONS, BUILT INTO THE EXPERIENCE
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Your Platforms Should Feel Familiar.
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ProfileOS supports a large library of platforms, with recognizable platform branding helping each profile card feel distinct.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Whether you're looking at a social account, professional profile, creator platform, or another supported service, its visual identity helps separate it from everything around it.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                This becomes especially useful when several profiles have similar usernames or when you're quickly scanning a large Space.
              </p>
              <div className="p-3.5 bg-sky-50 rounded-2xl border border-sky-200 text-xs sm:text-sm font-bold text-sky-950">
                The icon becomes a visual shortcut.
              </div>
            </div>

            {/* CUSTOM WEBSITES DESERVE BRANDING TOO */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                CUSTOM WEBSITES DESERVE BRANDING TOO
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Not everything you share lives on a social network.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                You might have a portfolio, personal website, product page, studio site, newsletter, or another custom URL.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                That's where favicons become useful.
              </p>
              <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-200 text-xs sm:text-sm font-medium text-indigo-950">
                Instead of treating every custom website as a generic link, ProfileOS can use the site's favicon as a visual reference when available, helping your custom profiles feel more like real destinations rather than plain URLs.
              </div>
            </div>

            {/* MAKE YOUR PROFILE CARDS GLANCEABLE */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                MAKE YOUR PROFILE CARDS GLANCEABLE
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Less Text. More Recognition.
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ProfileOS is designed around quick scanning.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The platform icon, display name, username, and other profile details work together to help you identify the profile you need without opening it or searching through a long list.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold text-slate-900">
                This matters when you're in a hurry.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-slate-800">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  Someone asks for your GitHub. <strong className="text-slate-950 font-bold">You spot the GitHub icon.</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  Someone wants your website. <strong className="text-slate-950 font-bold">You recognize the site's branding.</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  You need the right creator account. <strong className="text-slate-950 font-bold">The visual identity helps you find it.</strong>
                </div>
              </div>
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-900">
                A good card tells you what it is at a glance.
              </div>
            </div>

            {/* BRANDING ACROSS DIFFERENT IDENTITIES */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                BRANDING ACROSS DIFFERENT IDENTITIES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800">
                  <strong className="text-slate-950 block mb-1">Your Personal Space</strong>
                  might contain your everyday social accounts.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800">
                  <strong className="text-slate-950 block mb-1">Your Work Space</strong>
                  might contain professional profiles and client-facing websites.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800">
                  <strong className="text-slate-950 block mb-1">Your Creator Space</strong>
                  might contain publishing and content platforms.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800">
                  <strong className="text-slate-950 block mb-1">Your Studio Space</strong>
                  might contain brand channels and official websites.
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Visual identity helps these different collections feel organized without requiring you to remember every username.
              </p>
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-xs sm:text-sm font-medium text-purple-950">
                The information remains structured, while the branding adds another layer of recognition.
              </div>
            </div>

            {/* YOUR BRAND, NOT JUST THE PLATFORM */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                YOUR BRAND, NOT JUST THE PLATFORM
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Branding isn't only about platform icons.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                When you manage a creator identity, freelance presence, or personal brand, your collection of profiles becomes part of how you present yourself.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ProfileOS gives those profiles a consistent visual home while preserving the identity of the platforms and websites they belong to.
              </p>
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs sm:text-sm font-bold text-amber-950">
                It's the difference between a list of links and a workspace that actually feels like <span className="text-amber-800">your digital world</span>.
              </div>
            </div>

            {/* DESIGNED FOR SPEED */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                DESIGNED FOR SPEED
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Favicon &amp; Branding is ultimately about reducing visual friction.
              </p>
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-medium">
                <div>• You shouldn't have to read every character to find the profile you're looking for.</div>
                <div>• You shouldn't have to open a link just to remember which website it belongs to.</div>
                <div>• And you shouldn't have to treat every profile as an identical block of text.</div>
              </div>
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs sm:text-sm font-bold text-slate-900">
                Visual cues make information faster to recognize.
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                That's especially valuable when ProfileOS is doing what it's designed to do: helping you find the right profile quickly, then swipe to use it.
              </p>
            </div>

            {/* THE PROFILEOS APPROACH */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                THE PROFILEOS APPROACH
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ProfileOS brings together three things that make a profile easy to recognize:
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950 font-bold">Identity</strong> — the display name and username tell you who or what the profile represents.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950 font-bold">Destination</strong> — the platform or website tells you where that identity exists.
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-slate-950 font-bold">Visual cue</strong> — the icon or favicon helps you recognize it instantly.
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Together, they turn profile management into something more visual, organized, and intuitive.
              </p>
              <div className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm font-black text-slate-900">
                Your profiles aren't just links. They are pieces of your digital identity.
              </div>
            </div>

            {/* SEE IT. RECOGNIZE IT. SHARE IT. */}
            <div className="bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-xs">
                <Globe className="w-3.5 h-3.5" />
                SEE IT. RECOGNIZE IT. SHARE IT.
              </div>
              <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                The best interface doesn't make you stop and think about where something is.
              </p>
              <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                It gives you enough visual information to recognize it immediately.
              </p>
              <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                That's the role of Favicon &amp; Branding inside ProfileOS: make every profile easier to distinguish, every platform easier to recognize, and every workspace a little more personal.
              </p>
              <div className="pt-2">
                <h3 className="text-base sm:text-xl font-black text-white">
                  Find the right profile faster. Then swipe and share.
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Generic Feature Guide Deep-Dive Sub-Page */}
        {!['beginners-guide', 'best-practices', 'smart-tokens', 'smart-share-templates', 'whats-new', 'faq', 'spaces-profiles', 'instant-qr-engine', 'privacy-shield-mode', 'gesture-shortcuts', 'favicon-branding'].includes(activeGuideId) && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-xl font-black text-slate-900">How It Works in Detail</h2>
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <p>
                ProfileOS is architected to make <strong>{activeGuide.title}</strong> operate without any server roundtrips, background battery drain, or cloud sync lag.
              </p>
              
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Core Architecture</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Instant on-device execution through Android Room &amp; Jetpack SQLite.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Vector asset rendering ensuring sharp visual presentation at any device DPI.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Zero telemetry and no remote user profile tracking.</span>
                  </li>
                </ul>
              </div>
            </div>

            {activeGuideId === 'instant-qr-engine' && (
              <div className="pt-2">
                <button
                  onClick={() => onOpenQrDemo && onOpenQrDemo()}
                  className="px-5 py-2.5 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Launch Live Interactive QR Demo</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Feedback Section at the bottom of every Sub-Page */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">Was this guide helpful?</h4>
            <p className="text-xs text-slate-500">Your feedback helps us refine documentation and tips.</p>
          </div>

          <div className="flex items-center gap-2">
            {feedbackGiven ? (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                Thank you for your feedback!
              </span>
            ) : (
              <>
                <button
                  onClick={() => setFeedbackGiven('yes')}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Yes, helpful</span>
                </button>
                <button
                  onClick={() => setFeedbackGiven('no')}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ThumbsDown className="w-3.5 h-3.5 text-rose-600" />
                  <span>Could be better</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Related Guides Recommendation Carousel */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
            Other Guides You Might Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {allGuides
              .filter(g => g.id !== activeGuideId)
              .slice(0, 3)
              .map(guide => {
                const RelIcon = guide.icon;
                return (
                  <div
                    key={guide.id}
                    onClick={() => openGuide(guide.id)}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer space-y-2 group"
                  >
                    <div className={`w-8 h-8 rounded-xl ${guide.iconBg} ${guide.iconColor} flex items-center justify-center`}>
                      <RelIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors line-clamp-1">
                        {guide.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 font-medium mt-0.5">
                        {guide.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  // Main Help Center View
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8" id="help-center-page">
      {/* Top Header & Breadcrumb */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-2xs"
            id="help-back-button"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            ProfileOS Help & Guides
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>Help Center</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Search guides, gestures, dynamic smart tokens, privacy mode, and spaces.
          </p>
        </div>
      </section>

      {/* Search Input Bar (Matching Screenshot Search Field) */}
      <section className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search guides, gestures, FAQs..."
            className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border border-slate-200 focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-100 outline-none text-sm text-slate-900 placeholder:text-slate-400 shadow-xs transition-all"
            id="help-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {searchQuery && (
          <div className="mt-2 text-xs font-semibold text-slate-500 px-1">
            Found {filteredQuickCards.length + filteredFeatureGuides.length} results for "{searchQuery}"
          </div>
        )}
      </section>

      {/* TOP 5 QUICK CARDS: Responsive grid adaptive for mobile (2-col), tablet (3-col), and desktop (5-col) */}
      {filteredQuickCards.length > 0 && (
        <section className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredQuickCards.map(card => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => openGuide(card.id)}
                  className="bg-slate-50/90 hover:bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-2xs"
                  id={`top-card-${card.id}`}
                >
                  {/* Top: Icon in soft pastel squircle box */}
                  <div className="mb-3">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom: Title & Subtitle Stack */}
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-snug">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Feature Guide Section (Matching List Style from Screenshot) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Feature Guide
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            {filteredFeatureGuides.length} Core Guides
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
          {filteredFeatureGuides.length > 0 ? (
            filteredFeatureGuides.map(guide => {
              const IconComp = guide.icon;
              return (
                <div
                  key={guide.id}
                  onClick={() => openGuide(guide.id)}
                  className="p-4 sm:p-5 hover:bg-blue-50/40 transition-colors cursor-pointer flex items-center justify-between gap-4 group"
                  id={`feature-row-${guide.id}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-2xl ${guide.iconBg} ${guide.iconColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors truncate">
                          {guide.title}
                        </h3>
                        <span className="hidden sm:inline-block text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {guide.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate font-medium">
                        {guide.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#3B82F6] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              No feature guides match "{searchQuery}".
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Card */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            Still have questions or need a specific platform?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Explore all 229+ supported platforms or review our frequently asked questions on the home page.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="px-5 py-2.5 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            View FAQs on Home
          </button>
          <button
            onClick={() => onNavigate('platforms')}
            className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Explore Platforms
          </button>
        </div>
      </section>
    </div>
  );
};
