import React from 'react';
import { ProfileOSLogo } from './Logo';
import { PageTab } from '../types';
import { SocialIcon, GooglePlayIcon } from './SocialIcons';
import { OFFICIAL_PLATFORMS } from '../data/platformsData';
import { Shield, Sparkles, ExternalLink, ArrowRight, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (tab: PageTab) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-100 pt-12 pb-8 mt-12 sm:mt-16 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-slate-100">
          {/* Brand & Philosophy Column */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="cursor-pointer text-left border-0 bg-transparent p-0 inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
              aria-label="ProfileOS Home"
              title="ProfileOS Home"
              id="footer-brand-logo-btn"
            >
              <ProfileOSLogo size="lg" onClick={() => handleNav('home')} />
            </button>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              <strong>All Your Profiles. One Place.</strong>
              <br />
              ProfileOS is the dedicated workspace built for creators, professionals, and studios to
              organize social handles, format multi-account exports, and share links instantly.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Offline-first architecture • 100% On-device privacy</span>
            </div>

            <div className="pt-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.profileos.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-black text-white text-xs font-bold shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer group border border-slate-800"
                id="footer-google-play-btn"
                title="Get ProfileOS on Google Play"
              >
                <GooglePlayIcon className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex items-baseline gap-1 leading-none">
                  <span className="text-[10px] font-medium text-slate-300">Get it on</span>
                  <span className="text-xs font-black text-white tracking-tight">Google Play</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-0.5" />
              </a>
            </div>
          </div>

          {/* Product & Navigation */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-4">
              Product Overview
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('features')}
                  className="hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Core Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('preview')}
                  className="hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  App Preview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('platforms')}
                  className="hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Supported Platforms
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Philosophy */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-4">
              Brand & Company
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  About ProfileOS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('help')}
                  className="hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Official Social Channels */}
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 mb-4">
              Official Channels
            </h4>
            <div className="space-y-2 text-xs">
              {OFFICIAL_PLATFORMS.map(p => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-slate-600 hover:text-[#3B82F6] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <SocialIcon name={p.iconType} size={14} className="text-slate-400 group-hover:text-[#3B82F6]" />
                    <span>{p.name}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            <span>© 2026 ProfileOS. All rights reserved.</span>
          </div>

          <div className="text-center sm:text-right">
            <button
              onClick={() => handleNav('about')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-blue-50/80 text-slate-600 hover:text-[#3B82F6] border border-slate-200/80 hover:border-blue-200/80 text-xs font-semibold transition-all shadow-2xs hover:shadow-xs cursor-pointer group whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6] group-hover:rotate-12 transition-transform" />
              <span>Built for Modern Creators</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#3B82F6] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
