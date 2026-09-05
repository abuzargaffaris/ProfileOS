import React, { useState } from 'react';
import { getAssetUrl } from '../utils/navigation';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const ProfileOSLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  onClick
}) => {
  const [imgError, setImgError] = useState(false);
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  // Height configurations per breakpoint / size
  const sizeHeights: Record<string, number> = {
    sm: 28,
    md: 36,
    lg: 42,
    xl: 48
  };

  const currentHeight = sizeHeights[size] || 36;

  // Candidates for logo asset path to guarantee finding the image on any host
  const candidates = [
    getAssetUrl('ProfileOS Homepage Logo.png'),
    getAssetUrl('ProfileOS Logo.png'),
    getAssetUrl('logo.png'),
    getAssetUrl('logo-trimmed.png'),
    getAssetUrl('logo.svg')
  ];

  const handleImageError = () => {
    if (currentSrcIndex < candidates.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    } else {
      setImgError(true);
    }
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative inline-flex items-center select-none ${
        onClick ? 'cursor-pointer hover:opacity-95' : 'cursor-default'
      } ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {!imgError ? (
        <div className="relative flex items-center">
          {/* Native high-performance image with anti-extraction protection */}
          <img
            src={candidates[currentSrcIndex]}
            alt="ProfileOS Logo"
            onError={handleImageError}
            loading="eager"
            draggable={false}
            className="w-auto block object-contain pointer-events-none select-none transition-opacity duration-200"
            style={{
              height: `${currentHeight}px`,
              maxWidth: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              pointerEvents: 'none'
            }}
          />

          {/* Transparent Anti-Extraction Shield Overlay */}
          <div
            onClick={onClick}
            className={`absolute inset-0 z-20 bg-transparent ${
              onClick ? 'cursor-pointer' : 'cursor-default'
            }`}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onCopy={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none'
            }}
          />
        </div>
      ) : (
        /* Fallback rendering */
        <div className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
            <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">
            Profile<span className="text-orange-500 font-black">OS</span>
          </span>
        </div>
      )}
    </div>
  );
};

export const Logo = ProfileOSLogo;
