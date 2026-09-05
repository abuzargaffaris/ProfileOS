import React from 'react';
import { PageTab } from '../types';
import { ScreenshotGallery } from '../components/ScreenshotGallery';
import { Sparkles, Layers, QrCode, Sliders, Smartphone, CheckCircle2 } from 'lucide-react';

interface AppPreviewPageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQrDemo: () => void;
}

export const AppPreviewPage: React.FC<AppPreviewPageProps> = ({ onNavigate, onOpenQrDemo }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
          Visual Application Showcase
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Explore All 10 Core Application Screens
        </h1>
        <p className="text-base text-slate-600">
          A full visual walkthrough of ProfileOS, derived directly from the official application interface screenshots. Tap any screen to inspect details.
        </p>
      </div>

      {/* Screen Gallery Component */}
      <ScreenshotGallery onOpenQrDemo={onOpenQrDemo} />

      {/* Feature Highlights Grid */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">
            Interface Design Principles
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">
            Built with Purpose and Tactile Precision
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Every screen in ProfileOS is designed around high contrast, rapid visual scanning, and tactile feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              <span>Glanceable Typography</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monospaced handles paired with bold display headings ensure you can identify handles at a glance even in bright sunlight.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FB923C]" />
              <span>Color-Coded Workspaces</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Vibrant orange and indigo accent themes distinguish Studio channels from Personal and Work identity modes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Zero Distractions</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              No feeds, algorithmic recommendations, or ad trackers. Just a fast, quiet utility for organizing your links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
