import React, { useState, useRef } from 'react';
import { SCREENSHOTS_CATALOG } from '../data/screenshotsData';
import { ScreenshotFeature } from '../types';
import {
  Maximize2,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface ScreenshotGalleryProps {
  onOpenQrDemo: () => void;
}

export const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ onOpenQrDemo }) => {
  const [selectedScreen, setSelectedScreen] = useState<ScreenshotFeature | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const categories = ['All', 'Core Workspace', 'Organization', 'Sharing & Access', 'Settings'];

  const filteredScreens = SCREENSHOTS_CATALOG.filter(screen => {
    if (activeCategory === 'All') return true;
    return screen.category === activeCategory;
  });

  const currentIndex = selectedScreen
    ? filteredScreens.findIndex(s => s.id === selectedScreen.id)
    : -1;

  const handlePrevScreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedScreen(filteredScreens[currentIndex - 1]);
    } else {
      setSelectedScreen(filteredScreens[filteredScreens.length - 1]);
    }
  };

  const handleNextScreen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (currentIndex < filteredScreens.length - 1) {
      setSelectedScreen(filteredScreens[currentIndex + 1]);
    } else {
      setSelectedScreen(filteredScreens[0]);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        handleNextScreen();
      } else {
        handlePrevScreen();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="w-full">
      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#3B82F6] text-white shadow-xs shadow-blue-200/50'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of 10 Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScreens.map((screen, idx) => (
          <div
            key={screen.id}
            onClick={() => setSelectedScreen(screen)}
            className="group bg-white rounded-3xl border border-slate-100 hover:border-[#3B82F6]/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
          >
            {/* Visual Screen Mockup Area displaying real screenshot */}
            <div className="p-4 bg-gradient-to-b from-slate-100 to-slate-50 border-b border-slate-100 relative overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[340px]">
              <div className="absolute top-3 left-3 z-10">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-slate-800 shadow-2xs border border-slate-200/60 backdrop-blur-xs">
                  Screen #{idx + 1}
                </span>
              </div>

              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#3B82F6] text-white shadow-xs flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  Inspect
                </span>
              </div>

              {/* Real App Screenshot in Sleek Phone Shell */}
              <div className="w-[190px] sm:w-[210px] aspect-[9/20] rounded-[30px] overflow-hidden border-[6px] border-slate-950 shadow-xl bg-slate-950 transform group-hover:scale-[1.03] transition-all duration-300 relative ring-1 ring-slate-800/80">
                {/* Camera punch-hole */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-950 rounded-full z-20 ring-1 ring-slate-800/80 flex items-center justify-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-slate-800" />
                  <div className="w-2 h-0.5 rounded-full bg-slate-800" />
                </div>

                <img
                  src={encodeURI(screen.imageSrc || `/assets/App Screenshots/${screen.imageFileName}`)}
                  alt={screen.title}
                  className="w-full h-full object-cover object-top block"
                  loading="lazy"
                />

                {/* Subtle glass glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none z-10" />
              </div>
            </div>

            {/* Screen Content Info */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3B82F6] bg-blue-50 px-2 py-0.5 rounded">
                    {screen.category}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1 group-hover:text-[#3B82F6] transition-colors">
                  {screen.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{screen.description}</p>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-[#3B82F6] font-bold">
                <span>View Full Screen Details</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Lightbox Modal */}
      {selectedScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedScreen(null)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-2xl w-full p-6 sm:p-7 relative max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Top Close & Nav Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] bg-blue-50 px-3 py-1 rounded-full">
                  {selectedScreen.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevScreen}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Previous Screen"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextScreen}
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Next Screen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedScreen(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer ml-1"
                  aria-label="Close Screen Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Title & Subtitle */}
            <div className="mb-5">
              <h3 className="text-2xl font-black text-slate-900">{selectedScreen.title}</h3>
              <p className="text-sm font-medium text-slate-500">{selectedScreen.subtitle}</p>
            </div>

            {/* Real App Screenshot Representation in High Resolution */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200/80 mb-6 flex flex-col items-center justify-center relative overflow-hidden touch-pan-y"
            >
              {/* Subtle background stage glow like showcase page */}
              <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />

              {/* Phone Frame exactly like showcase page */}
              <div className="relative">
                <div className="w-[240px] sm:w-[280px] aspect-[9/20] rounded-[36px] sm:rounded-[42px] overflow-hidden border-[7px] sm:border-[8px] border-slate-950 shadow-2xl bg-black relative ring-1 ring-slate-800">
                  {/* Physical Side Hardware Buttons */}
                  <div className="absolute -left-[8px] top-20 w-[2px] h-7 bg-slate-700/80 rounded-l-xs" />
                  <div className="absolute -left-[8px] top-30 w-[2px] h-7 bg-slate-700/80 rounded-l-xs" />
                  <div className="absolute -right-[8px] top-24 w-[2px] h-9 bg-slate-700/80 rounded-r-xs" />

                  {/* Top Camera Punch-Hole & Speaker Pill */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-950 rounded-full z-20 flex items-center justify-center gap-1.5 border border-slate-800/80 shadow-xs pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
                    <div className="w-2.5 h-0.5 rounded-full bg-slate-800" />
                  </div>

                  {/* Screenshot Image */}
                  <img
                    src={encodeURI(selectedScreen.imageSrc || `/assets/App Screenshots/${selectedScreen.imageFileName}`)}
                    alt={selectedScreen.title}
                    className="w-full h-full object-cover object-top block"
                    loading="eager"
                  />

                  {/* Realistic Screen Glare reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08] pointer-events-none z-10" />
                </div>

                {/* Glow underneath phone like showcase page */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-6 bg-blue-500/20 blur-xl rounded-full pointer-events-none" />
              </div>

              <div className="mt-5">
                <a
                  href={encodeURI(selectedScreen.imageSrc || `/assets/App Screenshots/${selectedScreen.imageFileName}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-[#3B82F6] border border-slate-200/90 text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs hover:shadow-sm cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full High-Res Image</span>
                </a>
              </div>
            </div>

            {/* Description & Key Highlights */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Screen Description
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedScreen.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Capabilities in ProfileOS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedScreen.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

