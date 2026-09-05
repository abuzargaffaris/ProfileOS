import React, { useState, useEffect, useRef } from 'react';
import { SCREENSHOTS_CATALOG } from '../data/screenshotsData';
import { ScreenshotFeature, PageTab } from '../types';
import { getAssetUrl } from '../utils/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  CheckCircle2,
  Smartphone,
  ExternalLink,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';

interface ScreenshotsCarouselProps {
  onNavigate?: (tab: PageTab) => void;
  onOpenQrDemo?: () => void;
}

export const ScreenshotsCarousel: React.FC<ScreenshotsCarouselProps> = ({
  onNavigate,
  onOpenQrDemo
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxScreen, setLightboxScreen] = useState<ScreenshotFeature | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch swipe gesture refs
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const total = SCREENSHOTS_CATALOG.length;
  const currentScreen = SCREENSHOTS_CATALOG[activeIndex];

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.touches[0].clientX - touchStartX.current;
    const diffY = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(diffX) > 10 && Math.abs(diffX) > Math.abs(diffY)) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX.current;
    const diffY = touchEndY - touchStartY.current;

    // Minimum swipe threshold 40px, and horizontal distance must exceed vertical distance
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        // Swiped Left -> go to next screen
        handleNext();
      } else {
        // Swiped Right -> go to previous screen
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleClickPhone = () => {
    if (isSwiping.current) {
      isSwiping.current = false;
      return;
    }
    setLightboxScreen(currentScreen);
  };

  const currentLightboxIndex = lightboxScreen
    ? SCREENSHOTS_CATALOG.findIndex(s => s.id === lightboxScreen.id)
    : -1;

  // Touch swipe for modal
  const modalTouchStartX = useRef<number | null>(null);
  const modalTouchStartY = useRef<number | null>(null);

  const handleModalTouchStart = (e: React.TouchEvent) => {
    modalTouchStartX.current = e.touches[0].clientX;
    modalTouchStartY.current = e.touches[0].clientY;
  };

  const handleModalTouchEnd = (e: React.TouchEvent) => {
    if (modalTouchStartX.current === null || modalTouchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - modalTouchStartX.current;
    const diffY = e.changedTouches[0].clientY - modalTouchStartY.current;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        if (currentLightboxIndex < total - 1) {
          setLightboxScreen(SCREENSHOTS_CATALOG[currentLightboxIndex + 1]);
        } else {
          setLightboxScreen(SCREENSHOTS_CATALOG[0]);
        }
      } else {
        if (currentLightboxIndex > 0) {
          setLightboxScreen(SCREENSHOTS_CATALOG[currentLightboxIndex - 1]);
        } else {
          setLightboxScreen(SCREENSHOTS_CATALOG[total - 1]);
        }
      }
    }
    modalTouchStartX.current = null;
    modalTouchStartY.current = null;
  };

  const handleLightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentLightboxIndex > 0) {
      setLightboxScreen(SCREENSHOTS_CATALOG[currentLightboxIndex - 1]);
    } else {
      setLightboxScreen(SCREENSHOTS_CATALOG[total - 1]);
    }
  };

  const handleLightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentLightboxIndex < total - 1) {
      setLightboxScreen(SCREENSHOTS_CATALOG[currentLightboxIndex + 1]);
    } else {
      setLightboxScreen(SCREENSHOTS_CATALOG[0]);
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 4200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, activeIndex]);

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      id="app-screenshots-carousel-section"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="bg-white rounded-[36px] border border-slate-200/80 shadow-md p-6 sm:p-10 lg:p-12 overflow-hidden relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3B82F6] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200/80 whitespace-nowrap">
                <Smartphone className="w-3.5 h-3.5 flex-shrink-0" />
                Live Interface Tour
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap">
                {activeIndex + 1} / {total}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Inside ProfileOS: <span className="text-[#3B82F6]">Crafted for Zero Friction</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore authentic on-device screens showing lightning-fast handle access, instant QR codes, seamless profile switching, and multi-format sharing.
            </p>
          </div>

          {/* Carousel Control Buttons - Hidden on phone screens, visible on md+ screens */}
          <div className="hidden md:flex items-center gap-2 pt-1 md:pt-0 self-start md:self-end">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              title={isAutoPlaying ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
              aria-label="Toggle Auto-Rotation"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/60 shadow-2xs"
              aria-label="Previous Screenshot"
              title="Previous Screenshot"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs shadow-blue-200"
              aria-label="Next Screenshot"
              title="Next Screenshot"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Interactive Carousel Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Focused Phone Screen Representation with Touch Swipe */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center">
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={handleClickPhone}
              className="group relative cursor-pointer select-none touch-pan-y"
              title="Swipe left or right, or click to inspect high-resolution screenshot"
            >
              {/* Outer Device Frame */}
              <div className="w-[240px] sm:w-[280px] aspect-[9/20] rounded-[36px] sm:rounded-[42px] overflow-hidden border-[7px] sm:border-[8px] border-slate-950 shadow-2xl bg-black relative transform group-hover:scale-[1.02] transition-all duration-300 ring-1 ring-slate-800">
                {/* Physical Side Hardware Buttons */}
                <div className="absolute -left-[8px] top-20 w-[2px] h-7 bg-slate-700/80 rounded-l-xs" />
                <div className="absolute -left-[8px] top-30 w-[2px] h-7 bg-slate-700/80 rounded-l-xs" />
                <div className="absolute -right-[8px] top-24 w-[2px] h-9 bg-slate-700/80 rounded-r-xs" />

                {/* Phone Speaker & Camera Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-slate-950 rounded-full z-20 flex items-center justify-center gap-1.5 border border-slate-800/80 shadow-xs pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
                  <div className="w-2.5 h-0.5 rounded-full bg-slate-800" />
                </div>

                {/* Screenshot Image */}
                <img
                  key={currentScreen.id}
                  src={getAssetUrl(currentScreen.imageSrc || `screenshots/${currentScreen.screenKey}.png`)}
                  alt={currentScreen.title}
                  className="w-full h-full object-cover object-top block transition-opacity duration-300 animate-in fade-in"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = 'true';
                      target.src = getAssetUrl(`assets/App Screenshots/${currentScreen.title}.png`);
                    }
                  }}
                />

                {/* Realistic Screen Glare reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08] pointer-events-none z-10" />

                {/* Hover Overlay with Inspect Badge */}
                <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-30">
                  <span className="px-4 py-2 rounded-full bg-[#3B82F6] text-white font-bold text-xs shadow-lg flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                    Inspect High-Res
                  </span>
                </div>
              </div>

              {/* Glow underneath */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-blue-500/20 blur-xl rounded-full pointer-events-none" />
            </div>

            {/* Mobile Swipe Guidance Badge - only visible on phone screens */}
            <div className="md:hidden flex items-center justify-center gap-2 mt-4 text-xs font-semibold text-slate-500 bg-slate-100/90 px-3.5 py-1.5 rounded-full border border-slate-200/80 select-none shadow-2xs">
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Swipe left or right to switch screens</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Right Column: Screen Metadata & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                  {currentScreen.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {currentScreen.title}
              </h3>

              <p className="text-sm sm:text-base font-semibold text-slate-700">
                {currentScreen.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentScreen.description}
              </p>
            </div>

            {/* Key Screen Capabilities - Hidden on mobile/tablet to keep the carousel card clean and compact; accessible on all devices inside 'Inspect This Screen' */}
            <div className="hidden lg:block space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Screen Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentScreen.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip & Action Triggers */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-100 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2.5 text-xs">
              <span className="font-bold text-slate-700 whitespace-nowrap">Quick Jump</span>
              <span className="text-[11px] text-slate-400 whitespace-nowrap">Swipe to browse all 10 screens</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
              {SCREENSHOTS_CATALOG.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border flex-shrink-0 ${
                    activeIndex === idx
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs scale-[1.02]'
                      : 'bg-slate-50 hover:bg-white text-slate-600 hover:text-slate-900 border-slate-200/80'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      activeIndex === idx ? 'bg-[#3B82F6]' : 'bg-slate-400'
                    }`}
                  />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Triggers - Positioned below Quick Jump */}
          <div className="grid grid-cols-2 sm:flex sm:justify-end gap-2 sm:gap-3 pt-3 border-t border-slate-100/80">
            <button
              onClick={() => setLightboxScreen(currentScreen)}
              className="min-h-[44px] px-3 sm:px-5 py-2.5 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-colors cursor-pointer shadow-xs shadow-blue-200 whitespace-nowrap"
            >
              <Maximize2 className="w-4 h-4 flex-shrink-0" />
              <span>Inspect Screen</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('preview')}
                className="min-h-[44px] px-3 sm:px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-colors cursor-pointer shadow-2xs group whitespace-nowrap"
              >
                <span>All 10 Screens</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0 text-[#3B82F6] group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Resolution Screen Inspection */}
      {lightboxScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setLightboxScreen(null)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-2xl w-full p-6 relative max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Top Close & Nav Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B82F6] bg-blue-50 px-3 py-1 rounded-full">
                  {lightboxScreen.category}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleLightboxPrev}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous Screen"
                  aria-label="Previous Screen"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleLightboxNext}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                  title="Next Screen"
                  aria-label="Next Screen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLightboxScreen(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer ml-1"
                  aria-label="Close Screen Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Title & Subtitle */}
            <div className="mb-4">
              <h3 className="text-2xl font-black text-slate-900">{lightboxScreen.title}</h3>
              <p className="text-sm font-medium text-slate-500">{lightboxScreen.subtitle}</p>
            </div>

            {/* High Resolution App Screenshot */}
            <div
              onTouchStart={handleModalTouchStart}
              onTouchEnd={handleModalTouchEnd}
              className="bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200/80 mb-5 flex flex-col items-center justify-center relative overflow-hidden touch-pan-y"
            >
              {/* Subtle background stage glow */}
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
                    src={getAssetUrl(lightboxScreen.imageSrc || `screenshots/${lightboxScreen.screenKey}.png`)}
                    alt={lightboxScreen.title}
                    className="w-full h-full object-cover object-top block"
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = getAssetUrl(`assets/App Screenshots/${lightboxScreen.title}.png`);
                      }
                    }}
                  />

                  {/* Realistic Screen Glare reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08] pointer-events-none z-10" />
                </div>

                {/* Glow underneath phone like showcase page */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-6 bg-blue-500/20 blur-xl rounded-full pointer-events-none" />
              </div>

              <div className="mt-4">
                <a
                  href={encodeURI(lightboxScreen.imageSrc || `/assets/App Screenshots/${lightboxScreen.imageFileName}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-[#3B82F6] border border-slate-200/90 text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs hover:shadow-sm cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Size Image</span>
                </a>
              </div>
            </div>

            {/* Screen Description & Key Screen Capabilities */}
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lightboxScreen.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Key Screen Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lightboxScreen.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
