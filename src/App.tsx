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
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { QrModalDemo } from './components/demos/QrModalDemo';
import { ToastContainer } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedQrPlatform, setSelectedQrPlatform] = useState<SocialPlatform | undefined>(undefined);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Enforce home page by default on open & refresh, and synchronize navigation
  useEffect(() => {
    // 1. Always enforce 'home' page on initial open and refresh
    setActiveTab('home');

    // Clean up any stale hash from previous sessions or reloads
    if (window.location.hash && window.location.hash !== '' && window.location.hash !== '#') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

    // 2. Handle runtime back/forward browser navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash || hash === 'home') {
        setActiveTab('home');
      } else if (
        [
          'features',
          'how-it-works',
          'preview',
          'platforms',
          'help',
          'about',
          'privacy',
          'terms'
        ].includes(hash)
      ) {
        setActiveTab(hash as PageTab);
      }
    };

    // 3. Clear hash on beforeunload so page reload always opens on home
    const handleBeforeUnload = () => {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleNavigate = (tab: PageTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      window.location.hash = tab;
    }
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
