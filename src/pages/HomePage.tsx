import React, { useState } from 'react';
import { PageTab, SocialPlatform } from '../types';
import { InteractiveAppMockup } from '../components/demos/InteractiveAppMockup';
import { ScreenshotsCarousel } from '../components/ScreenshotsCarousel';
import { OFFICIAL_PLATFORMS } from '../data/platformsData';
import { SocialIcon, GooglePlayIcon } from '../components/SocialIcons';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  QrCode,
  Sliders,
  CheckCircle2,
  Share2,
  Copy,
  Layers,
  ArrowUpRight,
  Smartphone,
  EyeOff,
  Globe,
  Download,
  X,
  Check,
  ExternalLink,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

const HOME_FAQS = [
  {
    q: 'Where is my data stored and does ProfileOS use a cloud server?',
    a: 'ProfileOS is 100% local-first. All your profiles, spaces, handles, notes, and preferences are stored exclusively on your device in a local SQLite database managed by Android Room. There is no cloud account system, no telemetry server, and zero external tracking.',
    category: 'privacy'
  },
  {
    q: 'How do the Swipe Right and Swipe Left gesture shortcuts work?',
    a: 'Swipe Right on any profile card in your dashboard to immediately copy its direct URL (e.g., https://instagram.com/yourhandle). Swipe Left to copy your pre-configured Smart Share template with dynamic token substitutions.',
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

interface HomePageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQrDemo: (platform?: SocialPlatform) => void;
  onNotify: (text: string, type?: 'info' | 'success') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenQrDemo, onNotify }) => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [activeFaqCategory, setActiveFaqCategory] = useState<'all' | 'privacy' | 'gestures' | 'tokens' | 'storage'>('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const filteredFaqs = HOME_FAQS.filter(faq => {
    return activeFaqCategory === 'all' || faq.category === activeFaqCategory;
  });

  const handleDownloadAction = (platformName: string) => {
    onNotify(`Starting download: ProfileOS ${platformName}`, 'success');
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 py-4 sm:py-6">
      {/* HERO SECTION */}
      <section className="relative pt-4 pb-8 sm:pt-10 sm:pb-12 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/50 via-indigo-50/40 to-orange-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Product Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Dedicated Profile & Handle Workspace</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15] text-left">
                Your profiles,
                <br />
                <span className="text-[#3B82F6]">ready before they’re requested.</span>
              </h1>

              {/* Subtitle / Tagline */}
              <div className="space-y-3 max-w-xl text-left">
                <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-normal">
                  ProfileOS brings your social handles, websites, and important URLs into one organized workspace. Swipe to copy a handle, tap to open a profile, generate a QR code, or share everything in the format you choose.
                </p>

                <p className="text-xs sm:text-sm font-semibold text-slate-600 italic border-l-2 border-[#3B82F6] pl-3 py-0.5">
                  “Because sharing your profile shouldn't require finding it first.”
                </p>
              </div>

              {/* Key Trust Signals */}
              <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 pt-1 text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5 bg-white px-3 sm:px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% On-Device Privacy</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 sm:px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                  <Zap className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                  <span>229+ Supported Platforms</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 sm:px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
                  <QrCode className="w-4 h-4 text-[#EA580C] flex-shrink-0" />
                  <span>Instant QR Presenter</span>
                </span>
              </div>

              {/* Hero Action Buttons */}
              <div className="space-y-3 pt-2 sm:pt-4">
                {/* 1. Direct Google Play Store Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.profileos.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    onNotify('Opening ProfileOS on Google Play Store', 'info');
                  }}
                  className="w-full px-5 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-slate-950 hover:bg-slate-900 text-white shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 group border border-slate-800 hover:border-slate-700 active:scale-[0.99]"
                  id="hero-google-play-btn"
                >
                  <GooglePlayIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex items-baseline gap-1.5 leading-none">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-300">
                      Get it on
                    </span>
                    <span className="text-sm sm:text-base font-black text-white tracking-tight">
                      Google Play
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-0.5" />
                </a>

                {/* Secondary Row: Explore Screens & 229+ Platforms in ONE single line */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
                  {/* 2. Explore Screens Button */}
                  <button
                    onClick={() => onNavigate('preview')}
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl sm:rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 group min-w-0"
                    id="hero-explore-screens-btn"
                  >
                    <span className="truncate">Explore Screens</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </button>

                  {/* 3. Supported Platforms Button */}
                  <button
                    onClick={() => onNavigate('platforms')}
                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl sm:rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 min-w-0"
                    id="hero-view-platforms-btn"
                  >
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3B82F6] flex-shrink-0" />
                    <span className="truncate">229+ Platforms</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Interactive App Mockup */}
            <div className="lg:col-span-5 flex justify-center w-full">
              <InteractiveAppMockup onOpenQr={onOpenQrDemo} onNotify={onNotify} />
            </div>
          </div>
        </div>
      </section>

      {/* Download App Modal */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setIsDownloadModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#3B82F6] flex items-center justify-center mx-auto shadow-2xs">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Download ProfileOS</h3>
              <p className="text-xs text-slate-500">
                Your private on-device profile & handle manager. Choose your preferred build format.
              </p>
            </div>

            <div className="space-y-3">
              {/* Google Play Store Direct Option */}
              <div className="p-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-all flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">Google Play Store</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-[#2563EB]">
                      Official Store
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Get it on Google Play (Android)</p>
                </div>
                <a
                  href="https://play.google.com/store/apps/details?id=com.profileos.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    onNotify('Opening ProfileOS on Google Play Store', 'info');
                    setIsDownloadModalOpen(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Play Store</span>
                </a>
              </div>

              {/* Android APK Direct */}
              <div className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 bg-slate-50/70 hover:bg-blue-50/30 transition-all flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">Android APK Direct</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      APK v1.0.4
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Direct standalone APK install</p>
                </div>
                <button
                  onClick={() => {
                    handleDownloadAction('Standalone APK v1.0.4');
                    setIsDownloadModalOpen(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>

              {/* Web App / Progressive Web App */}
              <div className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 bg-slate-50/70 hover:bg-blue-50/30 transition-all flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">Web App / PWA</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      Cross-Platform
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Add to home screen on iOS & Desktop</p>
                </div>
                <button
                  onClick={() => {
                    handleDownloadAction('Web PWA');
                    setIsDownloadModalOpen(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch PWA</span>
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% On-Device & Safe
              </span>
              <span>Size: ~14.2 MB</span>
            </div>
          </div>
        </div>
      )}

      {/* PROBLEM & SOLUTION SECTION: WHY PROFILEOS EXISTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm overflow-hidden relative">
          <div className="max-w-3xl mb-10 text-left space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80">
              Why ProfileOS Exists
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Your profiles are everywhere. <span className="text-[#3B82F6]">Finding them shouldn't be.</span>
            </h2>

            <div className="space-y-3 text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
              <p>
                The more places you build your digital presence, the harder it becomes to remember where everything lives. When someone asks for your handle, you shouldn't have to open multiple apps, search old notes, or retype a URL just to share it.
              </p>
              <p className="font-semibold text-slate-900 border-l-2 border-[#3B82F6] pl-3 py-0.5">
                ProfileOS brings your profiles together into one organized workspace — so the right handle is always within reach.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* ✕ The Problem With Scattered Profiles */}
            <div className="bg-[#FFF5F5] rounded-3xl p-6 sm:p-8 border border-rose-100 space-y-5">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-base sm:text-lg">
                <span className="text-lg">✕</span>
                <span>The Problem With Scattered Profiles</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold text-base leading-none mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-900 font-bold">Too much searching:</strong>{' '}
                    <span>Dig through notes, bookmarks, messages, or other apps just to find a username.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold text-base leading-none mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-900 font-bold">Too many formats:</strong>{' '}
                    <span>Handles and profile URLs can look different across platforms, making copying and sharing unnecessarily messy.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold text-base leading-none mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-900 font-bold">Wrong profile, wrong moment:</strong>{' '}
                    <span>Accidentally share a personal account when you meant to send a professional or creator profile.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold text-base leading-none mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-900 font-bold">Manual copy-paste:</strong>{' '}
                    <span>Retyping usernames and URLs invites spelling mistakes, missing characters, and broken links.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold text-base leading-none mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-900 font-bold">Different identities, no separation:</strong>{' '}
                    <span>Personal, professional, freelance, and creator profiles can easily get mixed together.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* ✓ The ProfileOS Way */}
            <div className="bg-[#F0F7FF] rounded-3xl p-6 sm:p-8 border border-blue-100 space-y-5">
              <div className="flex items-center gap-2 text-[#3B82F6] font-bold text-base sm:text-lg">
                <span className="text-lg font-black">✓</span>
                <span>The ProfileOS Way</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold text-base leading-none mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-900 font-bold">One organized workspace:</strong>{' '}
                    <span>Keep your social accounts, websites, and URLs together under the right profile.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold text-base leading-none mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-900 font-bold">Swipe to act:</strong>{' '}
                    <span>Swipe right to copy a handle. Swipe left to copy your configured sharing template.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold text-base leading-none mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-900 font-bold">Share your way:</strong>{' '}
                    <span>Generate and share your profiles as custom text, Markdown, JSON, URLs, and more.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold text-base leading-none mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-900 font-bold">QR in an instant:</strong>{' '}
                    <span>Turn any profile link into a crisp, high-contrast QR code whenever you need to connect in person.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Clean 'Explore All Features' Pill Button */}
          <div className="mt-8 pt-2 flex items-center justify-center text-center">
            <button
              onClick={() => onNavigate('features')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm border border-slate-200 hover:border-blue-300 transition-all group cursor-pointer whitespace-nowrap min-h-[44px]"
              id="why-profileos-explore-features-btn"
            >
              <span>Explore All Features</span>
              <ArrowRight className="w-4 h-4 text-[#3B82F6] group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* APP SCREENSHOTS CAROUSEL SHOWCASE */}
      <ScreenshotsCarousel onNavigate={onNavigate} onOpenQrDemo={() => onOpenQrDemo()} />

      {/* CORE CAPABILITIES HIGHLIGHTS (ENGINEERED FOR SPEED) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80">
            Engineered For Speed
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Everything you need. <span className="text-[#3B82F6]">Nothing you need to hunt for.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            ProfileOS is built for those moments when you need to share a profile <strong className="text-slate-900 font-bold">right now</strong>. From quick swipe actions to instant QR codes, every feature is designed to make finding, copying, organizing, and sharing your profiles feel effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Separate Profiles */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#3B82F6] flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Separate Profiles</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Keep different sides of your digital identity neatly apart. Create dedicated profiles for <strong className="text-slate-900 font-semibold">Personal, Freelance, Work, or Creator</strong> accounts and switch between them whenever you need.
            </p>
          </div>

          {/* Card 2: Swipe, Copy, Done */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FB923C] flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Swipe, Copy, Done</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Turn profile cards into quick actions. <strong className="text-slate-900 font-semibold">Swipe right to copy a handle</strong> or <strong className="text-slate-900 font-semibold">swipe left to copy your custom sharing format</strong> — with tactile feedback designed to make every action feel immediate.
            </p>
          </div>

          {/* Card 3: Dynamic Sharing Templates */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Dynamic Sharing Templates</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Share profiles exactly the way you want. Build custom formats using tokens such as <code className="font-mono text-[11px] bg-slate-100 text-[#3B82F6] px-1 py-0.5 rounded">[platform_name]</code>, <code className="font-mono text-[11px] bg-slate-100 text-[#3B82F6] px-1 py-0.5 rounded">[account_url]</code>, <code className="font-mono text-[11px] bg-slate-100 text-[#3B82F6] px-1 py-0.5 rounded">[display_name]</code> and <code className="font-mono text-[11px] bg-slate-100 text-[#3B82F6] px-1 py-0.5 rounded">[username]</code>, then generate your preferred format without rewriting everything by hand.
            </p>
          </div>

          {/* Card 4: QR Codes, Instantly */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">QR Codes, Instantly</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Need to connect in person? Turn any profile link into a <strong className="text-slate-900 font-semibold">high-contrast, crisp QR code</strong> in an instant — ready for networking, events, badges, meetups, or a quick camera scan.
            </p>
          </div>

          {/* Card 5: Private Masking Mode */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Private Masking Mode</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Sharing your screen doesn't mean sharing everything. Mask sensitive handles on-screen — such as <code className="font-mono text-[11px] bg-slate-100 text-emerald-700 px-1 py-0.5 rounded">@pr••••io</code> — when presenting, screen-sharing, or showing your profiles in public.
            </p>
          </div>

          {/* Card 6: 229+ Platforms, Ready to Go */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">229+ Platforms, Ready to Go</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Start with a broad library of <strong className="text-slate-900 font-semibold">229+ platforms</strong>, complete with preconfigured URL patterns and official icons. From <strong className="text-slate-900 font-semibold">Instagram, Threads, X, YouTube, TikTok, GitHub, and LinkedIn</strong> to your own custom websites, ProfileOS keeps your profiles ready to organize.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('features')}
            className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-bold shadow-2xs hover:shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            <span>Explore All Detailed Features</span>
            <ArrowRight className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
          </button>
        </div>
      </section>

      {/* OFFICIAL PLATFORMS PREVIEW STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">
                Official Studio Channels
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                PrintionUp Studio Profiles in ProfileOS
              </h3>
            </div>

            <button
              onClick={() => onNavigate('platforms')}
              className="text-xs font-bold text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1.5 cursor-pointer"
            >
              <span>View All Supported Platforms</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {OFFICIAL_PLATFORMS.map(platform => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-slate-200 p-3.5 text-center flex flex-col items-center justify-between gap-2 transition-all hover:shadow-xs group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-2xs flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform">
                  <SocialIcon name={platform.iconType} size={20} />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">{platform.name}</div>
                  <div className="text-[10px] font-mono text-slate-500 truncate max-w-[120px]">
                    {platform.handle}
                  </div>
                </div>
                <span className="text-[10px] text-[#3B82F6] font-semibold flex items-center gap-0.5">
                  Visit <ArrowUpRight className="w-2.5 h-2.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / SET IT UP ONCE, SHARE IT IN SECONDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200/80">
            Simple & Fast Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Set it up once. <span className="text-[#3B82F6]">Share it in seconds.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            ProfileOS keeps the whole process simple. Create your profiles, add your links, make them your own, and you're ready to share whenever the moment comes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 01 */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-blue-500/80 tracking-tight">01</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors">
                Create Your Profiles
              </h3>
              <p className="text-xs font-semibold text-slate-800">
                Keep every identity in its own space.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Create separate profiles for your <strong className="text-slate-900 font-semibold">personal, professional, freelance, or Creator</strong> accounts. Switch between them without mixing up the links that belong to each one.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-blue-500/80 tracking-tight">02</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors">
                Add Your Handles
              </h3>
              <p className="text-xs font-semibold text-slate-800">
                Bring your handles and links together.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose from <strong className="text-slate-900 font-semibold">229+ platforms</strong> with ready-to-use URL patterns and icons, or add your own websites and custom links. Keep everything you share regularly in one place.
              </p>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-blue-500/80 tracking-tight">03</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors">
                Make It Yours
              </h3>
              <p className="text-xs font-semibold text-slate-800">
                Set up ProfileOS the way you share.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Customize your <strong className="text-slate-900 font-semibold">swipe actions, sharing templates, and privacy masking</strong> to fit your workflow. Build formats using dynamic tokens and decide exactly what gets copied or displayed.
              </p>
            </div>
          </div>

          {/* Step 04 */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-blue-500/80 tracking-tight">04</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#3B82F6] transition-colors">
                Swipe & Share
              </h3>
              <p className="text-xs font-semibold text-slate-800">
                When it's time to share, you're ready.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Swipe a profile card to <strong className="text-slate-900 font-semibold">copy your handle or sharing template</strong>, generate a QR code for in-person connections, or export your profiles in the format you need — including <strong className="text-slate-900 font-semibold">text, URL, Markdown, and JSON</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('how-it-works')}
            className="text-xs font-bold text-[#3B82F6] hover:text-[#2563EB] inline-flex items-center gap-1.5 cursor-pointer bg-blue-50/60 hover:bg-blue-50 px-5 py-2.5 rounded-full transition-colors"
          >
            <span>Read Step-by-Step Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="home-faqs-section">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200/80">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Got Questions? <span className="text-[#3B82F6]">We've Got Answers.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Everything you need to know regarding local-first data storage, swipe gesture shortcuts, dynamic tokens, and privacy protection.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center">
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
            <div className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-full text-xs font-bold border border-slate-200/60 shadow-2xs">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'privacy', label: 'Privacy' },
                { id: 'gestures', label: 'Gestures' },
                { id: 'tokens', label: 'Tokens' },
                { id: 'storage', label: 'Storage' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveFaqCategory(cat.id as any);
                    setExpandedFaqIndex(0);
                  }}
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

        {/* Accordion Questions List */}
        <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-90 bg-blue-50 text-[#3B82F6]' : ''
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-slate-50/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Link to Help Center */}
        <div className="text-center pt-1">
          <p className="text-xs text-slate-500">
            Have more questions?{' '}
            <button
              onClick={() => onNavigate('help')}
              className="text-[#3B82F6] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Visit our interactive Help Center</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </p>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] rounded-3xl p-6 sm:p-14 text-white text-center shadow-xl relative overflow-hidden border border-blue-400/20">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to Streamline Your Digital Identity?
            </h2>
            <p className="text-xs sm:text-base text-blue-100 leading-relaxed max-w-xl mx-auto">
              Get ProfileOS on your Android device today or explore all interactive screens, gesture shortcuts, and customization tools.
            </p>

            <div className="space-y-3 pt-3 max-w-md mx-auto">
              {/* Primary Direct Google Play Store Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.profileos.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  onNotify('Opening ProfileOS on Google Play Store', 'info');
                }}
                className="w-full px-6 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-slate-950 hover:bg-slate-900 text-white shadow-lg hover:shadow-2xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 group border border-slate-800 hover:border-slate-700 active:scale-[0.99]"
                id="cta-google-play-btn"
              >
                <GooglePlayIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-300">
                    Get it on
                  </span>
                  <span className="text-sm sm:text-base font-black text-white tracking-tight">
                    Google Play
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-0.5" />
              </a>

              {/* Secondary Row: Explore App Screens & Read About ProfileOS */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
                <button
                  onClick={() => onNavigate('preview')}
                  className="w-full px-3 sm:px-4 py-3 rounded-2xl sm:rounded-full bg-white hover:bg-blue-50 text-[#1E40AF] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 min-w-0"
                  id="cta-explore-screens-btn"
                >
                  <span className="truncate">Explore Screens</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="w-full px-3 sm:px-4 py-3 rounded-2xl sm:rounded-full bg-blue-950/40 hover:bg-blue-950/70 text-white font-bold text-xs sm:text-sm border border-white/40 shadow-xs backdrop-blur-xs transition-all cursor-pointer flex items-center justify-center min-w-0"
                  id="cta-read-about-btn"
                >
                  <span className="truncate">About ProfileOS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
