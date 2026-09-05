import React, { useEffect, useRef, useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

// Protected internal branding asset source
const BRAND_ASSET_URI = '/ProfileOS Homepage Logo.png';

export const ProfileOSLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  onClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Height configurations per breakpoint / size
  const sizeHeights: Record<string, number> = {
    sm: 28,
    md: 36,
    lg: 42,
    xl: 48
  };

  const currentHeight = sizeHeights[size] || 36;

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (!isMounted) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const naturalWidth = img.naturalWidth || 1555;
      const naturalHeight = img.naturalHeight || 367;
      const aspectRatio = naturalWidth / naturalHeight;

      const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 3) : 2;
      const targetHeight = currentHeight;
      const targetWidth = Math.round(targetHeight * aspectRatio);

      // Set physical resolution scaled by DPR for sharp anti-aliased rendering
      canvas.width = targetWidth * dpr;
      canvas.height = targetHeight * dpr;

      // Set CSS display dimensions
      canvas.style.width = `${targetWidth}px`;
      canvas.style.height = `${targetHeight}px`;

      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Clear & draw image onto canvas
      ctx.clearRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      setIsLoaded(true);
    };

    img.onerror = () => {
      if (isMounted) setHasError(true);
    };

    img.src = BRAND_ASSET_URI;

    return () => {
      isMounted = false;
    };
  }, [currentHeight]);

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
      {!hasError ? (
        <div className="relative flex items-center">
          {/* Protected Canvas Rendering (No direct <img> tag for right-click save/extraction) */}
          <canvas
            ref={canvasRef}
            className={`transition-opacity duration-200 pointer-events-none ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none'
            }}
          />

          {/* Loading placeholder skeleton */}
          {!isLoaded && (
            <div
              className="animate-pulse bg-slate-200/70 rounded-md"
              style={{
                height: `${currentHeight}px`,
                width: `${Math.round(currentHeight * 4.2)}px`
              }}
            />
          )}

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
