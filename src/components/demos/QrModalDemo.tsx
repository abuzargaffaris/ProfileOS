import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, QrCode, Copy, Share2, Check } from 'lucide-react';
import { SocialIcon } from '../SocialIcons';
import { SocialPlatform } from '../../types';
import { OFFICIAL_PLATFORMS } from '../../data/platformsData';
import { copyToClipboard } from '../../utils/clipboard';

interface QrModalDemoProps {
  isOpen: boolean;
  onClose: () => void;
  platform?: SocialPlatform | null;
  onNotify?: (text: string, type?: 'info' | 'success') => void;
}

export const QrModalDemo: React.FC<QrModalDemoProps> = ({
  isOpen,
  onClose,
  platform,
  onNotify
}) => {
  const currentPlatform: SocialPlatform = platform || OFFICIAL_PLATFORMS[0];
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const targetUrl = currentPlatform.url;

  useEffect(() => {
    if (!targetUrl) return;
    QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    })
      .then(url => setQrUrl(url))
      .catch(() => {});
  }, [targetUrl]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(targetUrl);
    setCopiedLink(true);
    if (onNotify) {
      onNotify(success ? `Link copied: ${targetUrl}` : 'Link copied', 'success');
    }
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentPlatform.name} — PrintionUp Studio`,
          text: `Visit PrintionUp Studio on ${currentPlatform.name}:`,
          url: targetUrl
        });
        if (onNotify) onNotify('Shared successfully', 'success');
      } catch {
        // User cancelled or error
      }
    } else {
      handleCopyLink();
    }
  };

  const getPlatformIconStyle = () => {
    switch (currentPlatform.id) {
      case 'instagram':
        return {
          outer: 'bg-pink-50/70 border-pink-200/80',
          inner: 'bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] text-white shadow-2xs',
        };
      case 'threads':
        return {
          outer: 'bg-slate-100/70 border-slate-300/80',
          inner: 'bg-black text-white shadow-2xs',
        };
      case 'x':
        return {
          outer: 'bg-slate-100/70 border-slate-300/80',
          inner: 'bg-black text-white shadow-2xs',
        };
      case 'facebook':
        return {
          outer: 'bg-blue-50/70 border-blue-200/80',
          inner: 'bg-[#1877F2] text-white shadow-2xs',
        };
      case 'bluesky':
        return {
          outer: 'bg-sky-50/70 border-sky-200/80',
          inner: 'bg-[#1185FE] text-white shadow-2xs',
        };
      case 'pinterest':
        return {
          outer: 'bg-rose-50/70 border-rose-200/80',
          inner: 'bg-[#E60023] text-white shadow-2xs',
        };
      case 'youtube':
        return {
          outer: 'bg-red-50/70 border-red-200/80',
          inner: 'bg-[#FF0000] text-white shadow-2xs',
        };
      case 'tiktok':
        return {
          outer: 'bg-slate-100/70 border-slate-300/80',
          inner: 'bg-black text-white shadow-2xs',
        };
      default:
        return {
          outer: 'bg-blue-50/70 border-blue-200/80',
          inner: 'bg-[#3B82F6] text-white shadow-2xs',
        };
    }
  };

  const iconStyle = getPlatformIconStyle();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[32px] border border-slate-100 shadow-2xl max-w-sm sm:max-w-md w-full p-6 sm:p-7 relative overflow-hidden text-center max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header matching reference */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3 text-left min-w-0">
            {/* Authentic Squircle App Icon */}
            <div className={`p-1 rounded-[20px] border shrink-0 flex items-center justify-center ${iconStyle.outer}`}>
              <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center ${iconStyle.inner}`}>
                <SocialIcon name={currentPlatform.iconType} size={24} className="text-white" />
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-lg sm:text-xl text-slate-900 leading-snug truncate">
                {currentPlatform.name}
              </h3>
              <p className="text-sm font-mono text-[#2563EB] font-medium truncate mt-0.5">
                {currentPlatform.handle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-700 hover:text-black hover:bg-slate-100 rounded-full transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close QR Modal"
          >
            <X className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>

        {/* QR Display Squircle Card matching reference */}
        <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col items-center justify-center mb-4">
          {qrUrl ? (
            <img
              src={qrUrl}
              alt={`QR Code for ${currentPlatform.name} ${currentPlatform.handle}`}
              className="w-56 h-56 sm:w-64 sm:h-64 object-contain"
            />
          ) : (
            <div className="w-56 h-56 sm:w-64 sm:h-64 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
              <QrCode className="w-12 h-12 animate-pulse" />
            </div>
          )}
        </div>

        {/* Live URL Pill with green dot matching reference */}
        <button
          onClick={handleCopyLink}
          title="Click to copy link"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2F6] hover:bg-slate-200/80 text-xs sm:text-[13px] font-mono text-slate-700 max-w-full truncate mb-3 transition-colors cursor-pointer border border-slate-200/40 shadow-2xs active:scale-98"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0" />
          <span className="truncate">{targetUrl}</span>
          {copiedLink && <span className="text-emerald-600 font-bold ml-1 text-xs">✓</span>}
        </button>

        {/* Caption text matching reference */}
        <p className="text-xs sm:text-sm text-slate-600 font-normal mb-5 leading-relaxed">
          Point any phone camera to instantly visit your profile link.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleNativeShare}
            className="px-4 py-2.5 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] font-bold text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
