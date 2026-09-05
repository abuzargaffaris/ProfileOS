import React, { useState } from 'react';
import { ProfileOSLogo } from './Logo';
import { GooglePlayIcon } from './SocialIcons';
import { PageTab } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  onNavigate: (tab: PageTab) => void;
  onOpenQrDemo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; tab: PageTab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Features', tab: 'features' },
    { label: 'How It Works', tab: 'how-it-works' },
    { label: 'App Preview', tab: 'preview' },
    { label: 'Supported Platforms', tab: 'platforms' },
    { label: 'Help Center', tab: 'help' },
    { label: 'About', tab: 'about' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2 group border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
          id="navbar-brand-logo"
          aria-label="ProfileOS Home"
          title="ProfileOS Home"
        >
          <ProfileOSLogo size="md" onClick={() => handleNavClick('home')} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2" aria-label="Main Navigation">
          {navItems.map(item => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-[#3B82F6]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                id={`nav-link-${item.tab}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.profileos.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4.5 py-2 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-bold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2 group border border-slate-800 hover:border-slate-700"
            id="nav-google-play-btn"
          >
            <GooglePlayIcon className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex items-baseline gap-1 leading-none">
              <span className="text-[10px] font-medium text-slate-300">Get it on</span>
              <span className="text-xs font-black text-white tracking-tight">Google Play</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200"
          id="mobile-drawer-menu"
        >
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between px-1 mb-1">
            <button
              onClick={() => handleNavClick('home')}
              className="cursor-pointer text-left border-0 bg-transparent p-0 focus:outline-none"
              aria-label="ProfileOS Home"
              title="ProfileOS Home"
            >
              <ProfileOSLogo size="sm" onClick={() => handleNavClick('home')} />
            </button>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Navigation
            </span>
          </div>

          {navItems.map(item => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-colors cursor-pointer flex items-center justify-between ${
                  isActive
                    ? 'bg-blue-50 text-[#3B82F6]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.profileos.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-5 py-3 rounded-2xl bg-black hover:bg-slate-900 text-white shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 group border border-slate-800 hover:border-slate-700 active:scale-[0.99]"
              id="mobile-play-store-btn"
            >
              <GooglePlayIcon className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-xs font-semibold text-slate-300">
                  Get it on
                </span>
                <span className="text-sm font-black text-white tracking-tight">
                  Google Play
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-0.5" />
            </a>

            <button
              onClick={() => handleNavClick('preview')}
              className="w-full py-3 rounded-full bg-[#3B82F6] text-white text-xs font-extrabold shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore All 10 Screens</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
