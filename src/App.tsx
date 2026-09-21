import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTab, ToastMessage, SocialPlatform } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AppPreviewPage } from './pages/AppPreviewPage';
import { PlatformsPage } from './pages/PlatformsPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { QrModalDemo } from './components/demos/QrModalDemo';
import { ToastContainer } from './components/Toast';
import { getTabFromUrl, updateUrlForTab, getFullUrlForTab, VALID_TABS } from './utils/navigation';

const TAB_METADATA: Record<PageTab, { title: string; description: string; keywords: string }> = {
  home: {
    title: 'ProfileOS — All Your Profiles. One Place.',
    description: 'ProfileOS is the 100% offline, privacy-first digital profile and identity manager for Android. Organize your social handles, portfolio links, and profiles in one clean hub with zero tracking.',
    keywords: 'ProfileOS, profile organizer, digital identity manager, social media links, social handles organizer, offline profile manager, link in bio alternative, Android offline app, QR code profile generator, PrintionUp Studio, local-first link organizer, com.printionupstudio.profileos, offline linktree alternative, private social handle clipboard, swipe to share profiles, offline QR codes for links, room database profile manager, no cloud social link organizer, smart share templates'
  },
  features: {
    title: 'Features & Capabilities — ProfileOS | Offline Identity Manager',
    description: 'Discover ProfileOS features: Swipe Right to copy links, Swipe Left for Smart Share templates, Privacy Shield masking, QR code generation, and 229+ platforms.',
    keywords: 'ProfileOS features, swipe right copy link, swipe left smart share, dynamic share templates, privacy shield mode, offline QR code generator, 229+ platforms, custom link favicon, local SQLite database, Android Room storage'
  },
  preview: {
    title: 'Interactive App Preview & Screens — ProfileOS',
    description: 'Experience the interactive ProfileOS mobile preview. Discover gestures, dark mode, privacy mode, QR code presenter, and instant search.',
    keywords: 'ProfileOS preview, interactive mobile mockup, ProfileOS Android app demo, gestures demo, dark mode offline app, privacy shield demo'
  },
  'how-it-works': {
    title: 'How ProfileOS Works — Quick Guide & Gesture Shortcuts',
    description: 'Learn how ProfileOS keeps your social profiles organized with local SQLite storage, dynamic share tokens, and zero cloud tracking.',
    keywords: 'how ProfileOS works, organize social handles, create profile spaces, swipe right copy link, swipe left share template, offline identity manager tutorial, smart tokens guide'
  },
  platforms: {
    title: '229+ Supported Platforms & Custom Links — ProfileOS',
    description: 'Browse all 229+ supported social media, developer, design, and creator platforms in ProfileOS, plus unlimited custom URLs.',
    keywords: 'ProfileOS platforms, 229+ supported social networks, developer links, github, instagram, youtube, custom website favicon, local link library'
  },
  about: {
    title: 'About ProfileOS & PrintionUp Studio — Privacy-First Mission',
    description: 'Read the story behind ProfileOS, built by PrintionUp Studio to give users complete offline ownership of their digital identity without ads or cloud bloat.',
    keywords: 'about ProfileOS, PrintionUp Studio, privacy-first mission, local-first software, com.printionupstudio.profileos, Android offline utility'
  },
  privacy: {
    title: 'Privacy Policy — 100% On-Device Offline Architecture | ProfileOS',
    description: 'Official Privacy Policy for ProfileOS. We do not collect, transmit, store, or sell any personal data. Everything remains 100% on your device.',
    keywords: 'ProfileOS privacy policy, zero data collection, offline android app privacy, no cloud tracking, local storage privacy'
  },
  terms: {
    title: 'Terms of Service — ProfileOS by PrintionUp Studio',
    description: 'Terms of Service for ProfileOS application and website. Simple, transparent, and user-first.',
    keywords: 'ProfileOS terms of service, PrintionUp Studio terms, user-first license'
  },
  help: {
    title: 'Help Center & Knowledge Base — ProfileOS',
    description: 'Find answers to frequently asked questions about ProfileOS offline storage, gesture shortcuts, backup exports, and privacy protection.',
    keywords: 'ProfileOS help center, FAQ, backup export JSON, offline profile manager questions, gesture shortcuts help'
  },
  blog: {
    title: 'Blog & Engineering Insights — ProfileOS',
    description: 'Explore in-depth articles on ProfileOS local-first architecture, Android Automatic Backup, SQLite Room design, and open JSON/Markdown data standards.',
    keywords: 'ProfileOS blog, local-first architecture, backup and restore, SQLite Room database, zero telemetry, Android Auto Backup for Apps, privacy engineering'
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>(() => getTabFromUrl());
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedQrPlatform, setSelectedQrPlatform] = useState<SocialPlatform | undefined>(undefined);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize document title, description, canonical and og:url for SEO/AEO
  useEffect(() => {
    const meta = TAB_METADATA[activeTab];
    if (meta) {
      document.title = meta.title;
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', meta.description);
      }
      const keywordsTag = document.querySelector('meta[name="keywords"]');
      if (keywordsTag && meta.keywords) {
        keywordsTag.setAttribute('content', meta.keywords);
      }
      const ogTitleTag = document.querySelector('meta[property="og:title"]');
      if (ogTitleTag) {
        ogTitleTag.setAttribute('content', meta.title);
      }
      const ogDescTag = document.querySelector('meta[property="og:description"]');
      if (ogDescTag) {
        ogDescTag.setAttribute('content', meta.description);
      }
      const twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitleTag) {
        twitterTitleTag.setAttribute('content', meta.title);
      }
      const twitterDescTag = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescTag) {
        twitterDescTag.setAttribute('content', meta.description);
      }
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', getFullUrlForTab(activeTab));
      }
      const ogUrlTag = document.querySelector('meta[property="og:url"]');
      if (ogUrlTag) {
        ogUrlTag.setAttribute('content', getFullUrlForTab(activeTab));
      }
    }
  }, [activeTab]);

  // Synchronize clean URLs without '#' symbol and handle browser Back/Forward
  useEffect(() => {
    // 1. Detect tab from current URL and clean up any trailing hash or redirect params
    const initialTab = getTabFromUrl();
    setActiveTab(initialTab);
    updateUrlForTab(initialTab, true);

    // 2. Handle browser back/forward buttons
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.tab && VALID_TABS.includes(e.state.tab)) {
        setActiveTab(e.state.tab);
        return;
      }
      const currentTab = getTabFromUrl();
      setActiveTab(currentTab);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = (tab: PageTab) => {
    setActiveTab(tab);
    updateUrlForTab(tab, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQrModal = (platform?: SocialPlatform) => {
    setSelectedQrPlatform(platform);
    setIsQrModalOpen(true);
  };

  const handleNotify = (text: string, type: 'info' | 'success' | 'action' = 'success') => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, text, type };
    setToasts(prev => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] text-[#0F172A] selection:bg-[#3B82F6] selection:text-white antialiased">
      {/* Sticky Top Header Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenQrDemo={() => handleOpenQrModal()}
      />

      {/* Main Page Content with Smooth Transition */}
      <main className="flex-1 w-full overflow-x-hidden">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="w-full"
        >
          {activeTab === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onOpenQrDemo={handleOpenQrModal}
              onNotify={handleNotify}
            />
          )}

          {activeTab === 'features' && (
            <FeaturesPage
              onNavigate={handleNavigate}
              onOpenQrDemo={() => handleOpenQrModal()}
              onNotify={handleNotify}
            />
          )}

          {activeTab === 'how-it-works' && (
            <HowItWorksPage
              onNavigate={handleNavigate}
              onOpenQrDemo={() => handleOpenQrModal()}
            />
          )}

          {activeTab === 'preview' && (
            <AppPreviewPage
              onNavigate={handleNavigate}
              onOpenQrDemo={() => handleOpenQrModal()}
            />
          )}

          {activeTab === 'platforms' && (
            <PlatformsPage
              onNavigate={handleNavigate}
              onOpenQrDemo={handleOpenQrModal}
              onNotify={handleNotify}
            />
          )}

          {activeTab === 'help' && (
            <HelpCenterPage
              onNavigate={handleNavigate}
              onOpenQrDemo={handleOpenQrModal}
              onNotify={handleNotify}
            />
          )}

          {activeTab === 'about' && <AboutPage onNavigate={handleNavigate} />}

          {activeTab === 'blog' && (
            <BlogPage onNavigate={handleNavigate} onNotify={handleNotify} />
          )}

          {activeTab === 'privacy' && <PrivacyPolicyPage onNavigate={handleNavigate} />}

          {activeTab === 'terms' && <TermsPage onNavigate={handleNavigate} />}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Interactive QR Presentation Modal */}
      <QrModalDemo
        isOpen={isQrModalOpen}
        platform={selectedQrPlatform}
        onClose={() => setIsQrModalOpen(false)}
        onNotify={handleNotify}
      />

      {/* Global Notification Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
