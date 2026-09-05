import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'motion/react';
import { Copy, Check, Sparkles, ArrowRight, ArrowLeft, RefreshCw, Link as LinkIcon } from 'lucide-react';
import { SocialIcon } from '../SocialIcons';
import { copyToClipboard } from '../../utils/clipboard';

interface SwipeDemoProps {
  onNotify?: (text: string, type?: 'info' | 'success') => void;
}

export const SwipeDemo: React.FC<SwipeDemoProps> = ({ onNotify }) => {
  const [copiedAction, setCopiedAction] = useState<'right' | 'left' | null>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);

  // Background color indicators based on swipe direction
  const rightOpacity = useTransform(x, [10, 70], [0, 1]);
  const leftOpacity = useTransform(x, [-70, -10], [1, 0]);
  const rightScale = useTransform(x, [10, 70], [0.85, 1]);
  const leftScale = useTransform(x, [-70, -10], [1, 0.85]);

  const handleDragEnd = async (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 60;

    if (offset > threshold || velocity > 350) {
      // Swiped Right -> Copy Profile Link
      setCopiedAction('right');
      const url = 'https://www.instagram.com/printionupstudio';
      await copyToClipboard(url);
      if (onNotify) {
        onNotify(`Copied link (Instagram): ${url}`, 'success');
      }
      // Rubber-band return bounce
      await controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 500, damping: 20, mass: 0.6 }
      });
      setTimeout(() => setCopiedAction(null), 2500);
    } else if (offset < -threshold || velocity < -350) {
      // Swiped Left -> Copy Template / Link
      setCopiedAction('left');
      const template = 'Instagram (@printionupstudio): https://www.instagram.com/printionupstudio';
      await copyToClipboard(template);
      if (onNotify) {
        onNotify('Copied template (Instagram @printionupstudio)', 'success');
      }
      // Rubber-band return bounce
      await controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 500, damping: 20, mass: 0.6 }
      });
      setTimeout(() => setCopiedAction(null), 2500);
    } else {
      // Rubber-band return bounce if threshold not met
      controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 600, damping: 22, mass: 0.7 }
      });
    }
  };

  const resetDemo = () => {
    setCopiedAction(null);
    controls.start({ x: 0, transition: { type: 'spring', stiffness: 500, damping: 20 } });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm p-4 sm:p-6 relative select-none">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1.5 text-[#3B82F6] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Gesture Demo
        </span>
        <button
          onClick={resetDemo}
          className="text-slate-400 hover:text-slate-700 flex items-center gap-1 cursor-pointer transition-colors"
          title="Reset card position"
        >
          <RefreshCw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Gesture helper indicators */}
      <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-medium text-slate-500 mb-2 px-1">
        <span className="flex items-center gap-1 text-emerald-600">
          <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Swipe Right: <strong>Copy Link</strong></span>
        </span>
        <span className="flex items-center gap-1 text-[#3B82F6]">
          <span>Swipe Left: <strong>Copy Template</strong></span>
          <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
        </span>
      </div>

      {/* Swipe Track Container with Rubber Band Physics */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-100 p-1">
        {/* Background Action Indicators */}
        <motion.div
          style={{ opacity: rightOpacity, scale: rightScale }}
          className="absolute inset-y-0 left-0 w-1/2 bg-emerald-500 text-white flex items-center justify-start pl-4 font-bold text-xs gap-1.5 rounded-l-xl z-0"
        >
          <LinkIcon className="w-4 h-4" />
          <span>Copy Link</span>
        </motion.div>

        <motion.div
          style={{ opacity: leftOpacity, scale: leftScale }}
          className="absolute inset-y-0 right-0 w-1/2 bg-[#3B82F6] text-white flex items-center justify-end pr-4 font-bold text-xs gap-1.5 rounded-r-xl z-0"
        >
          <span>Copy Template</span>
          <Copy className="w-4 h-4" />
        </motion.div>

        {/* Draggable Card with rubber-band spring */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.45}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
          whileTap={{ cursor: 'grabbing' }}
          className="relative z-10 bg-white rounded-xl border border-slate-200 shadow-sm p-3.5 flex items-center justify-between cursor-grab active:cursor-grabbing hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center gap-3 pointer-events-none">
            {/* Instagram Gradient Icon Box */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] p-[2px] flex items-center justify-center text-white shadow-xs">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-[#E1306C]">
                <SocialIcon name="instagram" size={22} />
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">Instagram</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Popular
                </span>
              </div>
              <p className="text-xs font-mono font-medium text-slate-500">@printionupstudio</p>
              <p className="text-[11px] text-slate-400">PrintionUp Studio</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-none">
            {copiedAction ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 animate-in zoom-in">
                <Check className="w-3.5 h-3.5" />
                {copiedAction === 'right' ? 'Link Copied!' : 'Template Copied!'}
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">
                ⇄ Drag Me
              </span>
            )}
          </div>
        </motion.div>
      </div>

      <p className="text-[11px] text-slate-400 mt-2.5 text-center">
        * Release after swiping to experience the snappy rubber-band bounce effect.
      </p>
    </div>
  );
};
