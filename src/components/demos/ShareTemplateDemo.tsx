import React, { useState } from 'react';
import { Copy, Check, Sparkles, Code2, Hash, Share2 } from 'lucide-react';
import { FORMATTED_OUTPUT_SAMPLES } from '../../data/platformsData';
import { copyToClipboard } from '../../utils/clipboard';

interface ShareTemplateDemoProps {
  onNotify?: (text: string, type?: 'info' | 'success') => void;
}

export const ShareTemplateDemo: React.FC<ShareTemplateDemoProps> = ({ onNotify }) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'markdown' | 'json'>('custom');
  const [copied, setCopied] = useState(false);

  const currentContent =
    activeTab === 'custom'
      ? FORMATTED_OUTPUT_SAMPLES.customTemplate
      : activeTab === 'markdown'
      ? FORMATTED_OUTPUT_SAMPLES.markdown
      : FORMATTED_OUTPUT_SAMPLES.json;

  const handleCopy = async () => {
    await copyToClipboard(currentContent);
    setCopied(true);
    if (onNotify) {
      onNotify('Example copied to clipboard!', 'success');
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-md p-6 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div>
          <h4 className="font-bold text-slate-900 text-base">Share All Handles</h4>
          <p className="text-xs text-slate-500 font-medium">PrintionUp Studio • 6 accounts encoded</p>
        </div>
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-[#3B82F6] border border-blue-100">
          Export Demo
        </span>
      </div>

      {/* Format Switcher Tabs */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-slate-100/80 rounded-2xl mb-4 text-[11px] sm:text-xs font-bold">
        <button
          onClick={() => setActiveTab('custom')}
          className={`py-2 px-2 sm:px-3 rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer truncate ${
            activeTab === 'custom'
              ? 'bg-[#3B82F6] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">Template</span>
        </button>

        <button
          onClick={() => setActiveTab('markdown')}
          className={`py-2 px-2 sm:px-3 rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer truncate ${
            activeTab === 'markdown'
              ? 'bg-[#3B82F6] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Hash className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">Markdown</span>
        </button>

        <button
          onClick={() => setActiveTab('json')}
          className={`py-2 px-2 sm:px-3 rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer truncate ${
            activeTab === 'json'
              ? 'bg-[#3B82F6] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">JSON</span>
        </button>
      </div>

      {/* Code / Output Container */}
      <div className="relative rounded-2xl bg-slate-950 text-slate-100 p-3 sm:p-4 font-mono text-xs overflow-x-auto max-h-56 leading-relaxed mb-4 border border-slate-800">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 border-b border-slate-800 pb-1.5">
          <span>Live Formatted Preview</span>
          <span className="text-emerald-400 font-semibold">• Live Stream</span>
        </div>
        <pre className="whitespace-pre-wrap select-all font-mono text-slate-200 text-[11px] sm:text-xs">
          {currentContent}
        </pre>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-[11px] text-slate-500 leading-normal">
          Ready to paste into emails, bios, invoices or messaging apps.
        </p>

        <button
          onClick={handleCopy}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all flex-shrink-0 ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Copied Example!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Example</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
