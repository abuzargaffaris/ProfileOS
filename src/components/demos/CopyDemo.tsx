import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { SocialIcon } from '../SocialIcons';
import { copyToClipboard } from '../../utils/clipboard';

interface CopyDemoProps {
  onNotify?: (text: string, type?: 'info' | 'success') => void;
}

export const CopyDemo: React.FC<CopyDemoProps> = ({ onNotify }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard('@printionupstudio');
    setCopied(true);
    if (onNotify) {
      onNotify('Copied @printionupstudio to clipboard', 'success');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 w-full max-w-sm mx-auto flex items-center justify-between gap-3 transition-all hover:border-slate-200">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] p-[2px] flex-shrink-0 flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center text-[#E1306C]">
            <SocialIcon name="instagram" size={20} />
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-slate-900 truncate">Instagram</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              Popular
            </span>
          </div>
          <p className="text-xs font-mono text-slate-500 font-medium truncate">@printionupstudio</p>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
          copied
            ? 'bg-emerald-600 text-white shadow-xs'
            : 'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-xs shadow-blue-200/50'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Handle</span>
          </>
        )}
      </button>
    </div>
  );
};
