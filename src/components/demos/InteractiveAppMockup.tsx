import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'motion/react';
import {
  Search,
  SlidersHorizontal,
  Settings as SettingsIcon,
  Share2,
  Plus,
  QrCode,
  Copy,
  Check,
  Eye,
  EyeOff,
  ChevronDown,
  Sparkles,
  Link as LinkIcon,
  Infinity as InfinityIcon,
  Star,
  Users
} from 'lucide-react';
import { OFFICIAL_PLATFORMS } from '../../data/platformsData';
import { SocialIcon } from '../SocialIcons';
import { ProfileOSLogo } from '../Logo';
import { SocialPlatform } from '../../types';
import { copyToClipboard } from '../../utils/clipboard';

interface InteractiveAppMockupProps {
  onOpenQr: (platform?: SocialPlatform) => void;
  onNotify?: (text: string, type?: 'info' | 'success') => void;
}

interface PlatformCardRowProps {
  platform: SocialPlatform;
  isMasked: boolean;
  isCopied: boolean;
  onCopyLink: (platform: SocialPlatform, e?: React.MouseEvent) => void;
  onOpenQr: (platform: SocialPlatform) => void;
  onNotify?: (text: string, type?: 'info' | 'success') => void;
}

const PlatformCardRow: React.FC<PlatformCardRowProps> = ({
  platform,
  isMasked,
  isCopied,
  onCopyLink,
  onOpenQr,
  onNotify
}) => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [swipedAction, setSwipedAction] = useState<'right' | 'left' | null>(null);

  // Background indicator opacities based on swipe distance
  const rightOpacity = useTransform(x, [10, 70], [0, 1]);
  const leftOpacity = useTransform(x, [-70, -10], [1, 0]);
  const rightScale = useTransform(x, [10, 70], [0.85, 1]);
  const leftScale = useTransform(x, [-70, -10], [1, 0.85]);

  const handleDragEnd = async (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 55;

    if (offset > threshold || velocity > 350) {
      // Swiped Right -> Copy Link
      setSwipedAction('right');
      await copyToClipboard(platform.url);
      if (onNotify) {
        onNotify(`Copied link (${platform.name}): ${platform.url}`, 'success');
      }
      // Rubber band return animation with spring physics
      await controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 500, damping: 20, mass: 0.6 }
      });
      setTimeout(() => setSwipedAction(null), 2000);
    } else if (offset < -threshold || velocity < -350) {
      // Swiped Left -> Copy Link / Template
      setSwipedAction('left');
      await copyToClipboard(platform.url);
      if (onNotify) {
        onNotify(`Copied link (${platform.name}): ${platform.url}`, 'success');
      }
      // Rubber band return animation with spring physics
      await controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 500, damping: 20, mass: 0.6 }
      });
      setTimeout(() => setSwipedAction(null), 2000);
    } else {
      // Released without threshold - rubber-band spring back to resting place
      controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 600, damping: 22, mass: 0.7 }
      });
    }
  };

  const displayHandle = isMasked ? platform.maskedHandle : platform.handle;

  const getPlatformIconStyle = () => {
    switch (platform.id) {
      case 'instagram':
        return {
          outer: 'bg-pink-50/50 border-pink-200/80',
          inner: 'bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] text-white shadow-2xs',
        };
      case 'threads':
        return {
          outer: 'bg-slate-100/60 border-slate-300/80',
          inner: 'bg-black text-white shadow-2xs',
        };
      case 'x':
        return {
          outer: 'bg-slate-100/60 border-slate-300/80',
          inner: 'bg-black text-white shadow-2xs',
        };
      case 'facebook':
        return {
          outer: 'bg-blue-50/50 border-blue-200/80',
          inner: 'bg-[#1877F2] text-white shadow-2xs',
        };
      case 'bluesky':
        return {
          outer: 'bg-sky-50/50 border-sky-200/80',
          inner: 'bg-[#1185FE] text-white shadow-2xs',
        };
      case 'pinterest':
        return {
          outer: 'bg-rose-50/50 border-rose-200/80',
          inner: 'bg-[#E60023] text-white shadow-2xs',
        };
      case 'youtube':
        return {
          outer: 'bg-red-50/50 border-red-200/80',
          inner: 'bg-[#FF0000] text-white shadow-2xs',
        };
      case 'tiktok':
        return {
          outer: 'bg-slate-100/60 border-slate-300/80',
          inner: 'bg-black text-white shadow-2xs',
        };
      default:
        return {
          outer: 'bg-slate-100/60 border-slate-200/80',
          inner: 'bg-slate-800 text-white shadow-2xs',
        };
    }
  };

  const iconStyle = getPlatformIconStyle();

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-slate-100/90 shadow-2xs group">
      {/* Background Action: Swipe Right (Copy Link - Green) */}
      <motion.div
        style={{ opacity: rightOpacity, scale: rightScale }}
        className="absolute inset-y-0 left-0 w-1/2 bg-emerald-500 text-white flex items-center justify-start pl-4 font-bold text-xs gap-1.5 rounded-l-[24px] z-0"
      >
        <LinkIcon className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">Copy Link</span>
      </motion.div>

      {/* Background Action: Swipe Left (Copy Link - Blue) */}
      <motion.div
        style={{ opacity: leftOpacity, scale: leftScale }}
        className="absolute inset-y-0 right-0 w-1/2 bg-[#3B82F6] text-white flex items-center justify-end pr-4 font-bold text-xs gap-1.5 rounded-r-[24px] z-0"
      >
        <span className="truncate">Copy Link</span>
        <Copy className="w-4 h-4 flex-shrink-0" />
      </motion.div>

      {/* Draggable Card matching attached reference image */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.45}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        whileTap={{ cursor: 'grabbing' }}
        className="relative z-10 bg-white rounded-[24px] border border-slate-100/80 shadow-xs p-3.5 sm:p-4 flex items-center justify-between cursor-grab active:cursor-grabbing hover:border-slate-200 transition-all"
      >
        <div className="flex items-center gap-3.5 min-w-0 pointer-events-none flex-1">
          {/* Authentic App Squircle Icon with gentle outer frame */}
          <div className={`p-1 rounded-[20px] border shrink-0 flex items-center justify-center ${iconStyle.outer}`}>
            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] flex items-center justify-center ${iconStyle.inner}`}>
              <SocialIcon name={platform.iconType} size={22} className="text-white" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[15px] sm:text-base text-slate-900 truncate leading-snug">
                {platform.name}
              </span>
              {platform.category && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#EEF2F6] text-slate-500 shrink-0">
                  {platform.category}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-[13px] font-mono font-medium text-slate-600 truncate mt-0.5">
              {displayHandle}
            </p>
            <p className="text-xs sm:text-[13px] text-slate-400 truncate mt-0.5 font-normal">
              {platform.displayName}
            </p>
          </div>
        </div>

        {/* Right QR Action Button matching attached reference image */}
        <div className="flex items-center flex-shrink-0 ml-3" onPointerDown={e => e.stopPropagation()}>
          <button
            onClick={() => onOpenQr(platform)}
            className="w-11 h-11 rounded-[16px] bg-[#EEF2F6] hover:bg-slate-200/80 text-slate-700 border border-slate-200/40 flex items-center justify-center cursor-pointer transition-colors shadow-2xs active:scale-95"
            title={`Open QR Code for ${platform.name}`}
          >
            {swipedAction ? (
              <Check className="w-5 h-5 text-emerald-600 animate-in zoom-in" />
            ) : (
              <QrCode className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const InteractiveAppMockup: React.FC<InteractiveAppMockupProps> = ({
  onOpenQr,
  onNotify
}) => {
  const [filter, setFilter] = useState<'All' | 'Popular' | 'Social & Video'>('All');
  const [isMasked, setIsMasked] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPlatforms = OFFICIAL_PLATFORMS.filter(item => {
    if (filter === 'Popular') return item.category === 'Popular';
    if (filter === 'Social & Video') return item.category === 'Social & Video';
    return true;
  });

  const handleCopyLink = async (platform: SocialPlatform, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    await copyToClipboard(platform.url);
    setCopiedId(platform.id);
    if (onNotify) {
      onNotify(`Copied link (${platform.name}): ${platform.url}`, 'success');
    }
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden select-none transition-all hover:shadow-2xl">
      {/* Top Device Bar */}
      <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1.5 text-[#3B82F6] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive App Showcase
        </span>
        <button
          onClick={() => setIsMasked(!isMasked)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors text-[11px] font-semibold cursor-pointer shadow-2xs"
          title="Toggle Private Masking Mode"
        >
          {isMasked ? (
            <>
              <EyeOff className="w-3 h-3 text-[#3B82F6]" />
              <span>Masking: ON</span>
            </>
          ) : (
            <>
              <Eye className="w-3 h-3 text-slate-500" />
              <span>Masking: OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Main App Container */}
      <div className="p-4 bg-[#F8FAFB]">
        {/* App Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onNotify?.('ProfileOS Home', 'info');
            }}
            className="cursor-pointer border-0 bg-transparent p-0 inline-flex items-center group focus:outline-none"
            aria-label="ProfileOS Home"
            title="ProfileOS Home - Scroll to top"
          >
            <ProfileOSLogo
              size="sm"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNotify?.('ProfileOS Home', 'info');
              }}
            />
          </button>

          <div className="flex items-center gap-1.5 text-slate-600">
            <div className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
              <SettingsIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Profile Switcher & Main Action Bar */}
        <div className="flex items-center gap-2 mb-3">
          {/* Active Profile Pill */}
          <div className="flex-1 flex items-center justify-between px-3 py-2 rounded-2xl bg-orange-50/80 border border-orange-200/80 text-orange-950">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#FB923C] flex items-center justify-center text-white flex-shrink-0">
                <span className="text-[10px] font-bold">P</span>
              </div>
              <span className="font-bold text-xs text-slate-900 truncate">PrintionUp Studio</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-orange-700 flex-shrink-0" />
          </div>

          {/* Quick Actions */}
          <div
            onClick={() => onOpenQr(OFFICIAL_PLATFORMS[0])}
            className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 cursor-pointer transition-colors shadow-2xs"
            title="Share Profiles QR"
          >
            <Share2 className="w-4 h-4" />
          </div>

          <div
            className="h-9 px-3 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white flex items-center gap-1 font-bold text-xs cursor-pointer transition-colors shadow-xs"
            title="Add handle"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </div>
        </div>

        {/* Filter Pills Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
          <button
            onClick={() => setFilter('All')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'All'
                ? 'bg-[#3B82F6] text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <InfinityIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>All (6)</span>
          </button>
          <button
            onClick={() => setFilter('Popular')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'Popular'
                ? 'bg-[#3B82F6] text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Star className={`w-3.5 h-3.5 flex-shrink-0 ${filter === 'Popular' ? 'fill-white text-white' : 'text-amber-500 fill-amber-500/20'}`} />
            <span>Popular (4)</span>
          </button>
          <button
            onClick={() => setFilter('Social & Video')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              filter === 'Social & Video'
                ? 'bg-[#3B82F6] text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Social & Video (2)</span>
          </button>
        </div>

        {/* Cards List with Interactive Swipe & Rubber-band Physics */}
        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-0.5">
          {filteredPlatforms.map(platform => (
            <PlatformCardRow
              key={platform.id}
              platform={platform}
              isMasked={isMasked}
              isCopied={copiedId === platform.id}
              onCopyLink={handleCopyLink}
              onOpenQr={onOpenQr}
              onNotify={onNotify}
            />
          ))}
        </div>
      </div>

      {/* Clean Footer Bar (without the bottom View QR Code button) */}
      <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex items-center justify-between text-[11px] text-slate-500">
        <span className="font-semibold text-slate-700">3 Profiles • 6 Handles</span>
        <span className="flex items-center gap-1 text-slate-400 font-medium">
          ⇄ Swipe cards or tap icons
        </span>
      </div>
    </div>
  );
};
