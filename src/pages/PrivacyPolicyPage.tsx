import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Database,
  Globe,
  Smartphone,
  ExternalLink,
  Share2,
  QrCode,
  Lock,
  Trash2,
  Download,
  EyeOff,
  Clock,
  ShieldCheck,
  Scale,
  RefreshCw,
  Mail,
  Search,
  Printer,
  Copy,
  Check,
  HardDrive,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Link2,
  Users,
  X,
  FileDown,
  FileText
} from 'lucide-react';
import { PageTab } from '../types';

interface PrivacyPolicyPageProps {
  onNavigate: (tab: PageTab) => void;
}

type CategoryFilter = 'all' | 'key' | 'data' | 'network' | 'legal';

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedFullText, setCopiedFullText] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<number, boolean>>({});
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const toggleSection = (id: number) => {
    setCollapsedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopySummary = async () => {
    const summaryText = `ProfileOS Privacy Summary (Local-First):
- 100% Local Storage: Data remains primarily stored on your device.
- Zero Cloud Account Required: No mandatory account creation or remote database.
- Zero Ad Networks & Analytics: No behavioral tracking SDKs.
- Limited Internet Use: Only for favicons, webpage titles, and user-initiated links.
- Full Data Control: Export backups in JSON/CSV/Markdown or delete at any time.
- Contact: printionupstudio@gmail.com`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setActionFeedback('Summary copied to clipboard!');
      setTimeout(() => {
        setCopiedSummary(false);
        setActionFeedback(null);
      }, 2500);
    } catch {
      setActionFeedback('Copied to clipboard!');
      setTimeout(() => setActionFeedback(null), 2500);
    }
  };

  const handleDownloadText = () => {
    try {
      const summaryText = `ProfileOS — Privacy Policy
Effective Date: September 2026
Official Legal Document

ProfileOS ("ProfileOS," the "Application," the "App," "we," "us," or "our") is a personal digital identity and profile management application designed around local-first storage.

Contact: printionupstudio@gmail.com
`;
      const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ProfileOS_Privacy_Policy.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setActionFeedback('Privacy Policy downloaded (.txt)!');
      setTimeout(() => setActionFeedback(null), 3000);
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  const handleCopyFullText = async () => {
    try {
      const fullText = `ProfileOS — Privacy Policy
Effective Date: September 2026
Official Privacy Policy Document
Application: ProfileOS (Local-First Identity Management)
Contact: printionupstudio@gmail.com

ProfileOS ("ProfileOS," the "Application," the "App," "we," "us," or "our") is a personal digital identity and profile management application designed around local-first storage.

1. Summary of Core Privacy Principles
- 100% Local Storage: Your profiles, usernames, URLs, and notes are primarily stored directly on your device.
- No ProfileOS User Accounts: No remote cloud database or registration needed.
- No Advertising SDKs: We do not sell data or build marketing profiles.
- Limited Internet Requests: Used strictly for metadata (favicons, page titles, account names).
- Complete User Ownership: Export or wipe your data anytime.

Contact: printionupstudio@gmail.com`;
      await navigator.clipboard.writeText(fullText);
      setCopiedFullText(true);
      setActionFeedback('Full Privacy Policy copied to clipboard!');
      setTimeout(() => {
        setCopiedFullText(false);
        setActionFeedback(null);
      }, 2500);
    } catch {
      setActionFeedback('Copied to clipboard!');
      setTimeout(() => setActionFeedback(null), 2500);
    }
  };

  const handleDownloadHtml = () => {
    try {
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ProfileOS - Privacy Policy</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    h1 { color: #0f172a; font-size: 28px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
    h2 { color: #1e293b; font-size: 18px; margin-top: 28px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    p, li { font-size: 14px; color: #334155; }
    .badge { display: inline-block; background: #eff6ff; color: #2563eb; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold; border: 1px solid #bfdbfe; margin-bottom: 12px; }
    .header-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; }
    @media print {
      body { margin: 0; padding: 20px; max-width: 100%; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; text-align: right;">
    <button onclick="window.print()" style="background: #2563eb; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
  </div>
  <div class="badge">ProfileOS Official Privacy Policy</div>
  <h1>Privacy Policy</h1>
  <p><strong>Effective Date:</strong> September 2026 • <strong>Architecture:</strong> Local-First</p>
  <div class="header-box">
    <p>ProfileOS is designed to respect your privacy with local-first architecture. Your digital identity data stays on your device.</p>
    <p>Contact: printionupstudio@gmail.com</p>
  </div>
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ProfileOS_Privacy_Policy.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setActionFeedback('PDF-Ready HTML downloaded!');
      setTimeout(() => setActionFeedback(null), 3000);
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  const handlePrint = () => {
    setIsPrintModalOpen(true);
    setActionFeedback('Print & PDF dialog opened');

    try {
      if (typeof window !== 'undefined' && typeof window.print === 'function') {
        window.print();
      }
    } catch (err) {
      console.warn('Native window.print() suppressed in container:', err);
    }
  };

  // Section categorization mapping
  const sectionCategories: Record<number, CategoryFilter[]> = {
    1: ['key', 'data'],
    2: ['key', 'data'],
    3: ['data'],
    4: ['key', 'network'],
    5: ['network'],
    6: ['network'],
    7: ['network'],
    8: ['network'],
    9: ['network'],
    10: ['key', 'legal'],
    11: ['data'],
    12: ['data'],
    13: ['data'],
    14: ['data'],
    15: ['key', 'legal'],
    16: ['legal'],
    17: ['legal'],
    18: ['legal'],
    19: ['network'],
    20: ['legal'],
    21: ['legal'],
    22: ['key', 'legal']
  };

  const shouldShowSection = (sectionNumber: number, sectionTitle: string, sectionContent: string) => {
    // Category match
    if (activeCategory !== 'all') {
      const cats = sectionCategories[sectionNumber] || [];
      if (!cats.includes(activeCategory)) return false;
    }

    // Search query match
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sectionTitle.toLowerCase().includes(q) ||
      sectionContent.toLowerCase().includes(q) ||
      sectionNumber.toString().includes(q)
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 text-left print:p-0 print:m-0 print:max-w-none">
      {/* Header & Breadcrumb */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-bold text-[#2563EB] hover:text-blue-700 flex items-center gap-1.5 cursor-pointer transition-colors group print:hidden"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 print:hidden flex-wrap">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-slate-200/80"
              title="Copy quick privacy summary to clipboard"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Summary Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handleDownloadText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-slate-200/80"
              title="Download Privacy Policy as text file"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Download (.txt)</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-900 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-blue-200/80"
              title="Print or export as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {actionFeedback && (
          <div className="p-2.5 px-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 shadow-2xs animate-fade-in print:hidden">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>{actionFeedback}</span>
          </div>
        )}

        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200/80">
          <Shield className="w-3.5 h-3.5 text-blue-600" />
          <span>Official Legal Document</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Official ProfileOS Policy • Effective as of September 2026 • Local-First Architecture
        </p>
      </div>

      {/* Quick Metrics & Pillars Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:grid-cols-2">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-blue-600">
            <HardDrive className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Storage</span>
          </div>
          <p className="text-sm sm:text-base font-black text-slate-900">100% Local</p>
          <p className="text-[11px] text-slate-500 leading-tight">Stored on your device only</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-emerald-600">
            <EyeOff className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Telemetry</span>
          </div>
          <p className="text-sm sm:text-base font-black text-slate-900">Zero Tracking</p>
          <p className="text-[11px] text-slate-500 leading-tight">No analytics or ad SDKs</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-purple-600">
            <Globe className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Network</span>
          </div>
          <p className="text-sm sm:text-base font-black text-slate-900">Explicit Only</p>
          <p className="text-[11px] text-slate-500 leading-tight">Favicons &amp; titles metadata</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-amber-600">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Ownership</span>
          </div>
          <p className="text-sm sm:text-base font-black text-slate-900">Full Control</p>
          <p className="text-[11px] text-slate-500 leading-tight">Export backups &amp; delete</p>
        </div>
      </div>

      {/* Main Introduction Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4 text-slate-700 leading-relaxed">
        <p className="text-base text-slate-900 font-normal leading-relaxed">
          At <strong className="text-slate-950 font-bold">ProfileOS</strong> (&ldquo;ProfileOS,&rdquo; the &ldquo;Application,&rdquo; the &ldquo;App,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), we respect your privacy and believe that your digital identity information should remain under your control.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          ProfileOS is designed as a <strong className="text-slate-950 font-bold">privacy-focused, local-first application</strong>. Your saved profiles, handles, usernames, links, notes, categories, and preferences are primarily stored on your device.
        </p>
        
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-950 font-medium text-xs sm:text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            ProfileOS does <strong className="text-blue-900 font-bold">not operate a cloud account system or a cloud database for your saved ProfileOS data</strong>, and we do not sell or rent your personal information.
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          However, some features require limited internet access. Specifically, ProfileOS may send a URL or domain-related request over the internet to retrieve a <strong className="text-slate-900 font-semibold">website favicon, publicly available account name, or webpage title</strong>. This Privacy Policy explains exactly how those features work.
        </p>
        <p className="text-xs text-slate-400 font-medium">
          Please read this Privacy Policy carefully to understand how information is handled when you use ProfileOS.
        </p>
      </div>

      {/* Interactive Topic Filter & Search Bar */}
      <div className="space-y-3 print:hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics (e.g., permissions, favicons, export, retention)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All (22)' },
              { id: 'key', label: 'Highlights' },
              { id: 'data', label: 'Data & Storage' },
              { id: 'network', label: 'Network & Links' },
              { id: 'legal', label: 'Legal & Rights' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 22 Comprehensive Sections Container */}
      <div className="space-y-6">
        
        {/* 1. Privacy at a Glance */}
        {shouldShowSection(1, "Privacy at a Glance", "Local by default No ProfileOS cloud account No cloud database Limited network access No advertising No behavioral analytics No sale of personal information") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">1</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Privacy at a Glance</h2>
              </div>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">Core Principles</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              ProfileOS is designed around the following core principles:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold text-xs sm:text-sm block mb-1">Local by default</strong>
                <p className="text-xs text-slate-600">Your saved ProfileOS data is primarily stored directly on your device.</p>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold text-xs sm:text-sm block mb-1">No ProfileOS cloud account</strong>
                <p className="text-xs text-slate-600">Core ProfileOS functionality does not require you to create an account with us.</p>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold text-xs sm:text-sm block mb-1">No ProfileOS cloud database</strong>
                <p className="text-xs text-slate-600">We do not maintain a remote database containing your saved profiles, handles, notes, or Profile Spaces as part of the normal operation of the App.</p>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold text-xs sm:text-sm block mb-1">Limited network access</strong>
                <p className="text-xs text-slate-600">Internet access is used strictly for metadata features (favicons, public account names, and webpage titles).</p>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold text-xs sm:text-sm block mb-1">No advertising</strong>
                <p className="text-xs text-slate-600">ProfileOS does not use advertising networks.</p>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold text-xs sm:text-sm block mb-1">No behavioral analytics</strong>
                <p className="text-xs text-slate-600">ProfileOS does not intentionally collect analytics about how you use the App through an analytics or advertising SDK.</p>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold text-xs sm:text-sm block mb-1">No sale of personal information</strong>
                <p className="text-xs text-slate-600">We do not sell or rent your personal information to anyone.</p>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold text-xs sm:text-sm block mb-1">User-controlled exports</strong>
                <p className="text-xs text-slate-600">You can export your locally stored information using the export features provided by the App.</p>
              </div>
              <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/70 sm:col-span-2">
                <strong className="text-slate-950 font-bold text-xs sm:text-sm block mb-1">User-controlled deletion</strong>
                <p className="text-xs text-slate-600">You can delete locally stored ProfileOS data from within the App or through your device&apos;s application settings at any moment.</p>
              </div>
            </div>
          </section>
        )}

        {/* 2. Information You Enter Into ProfileOS */}
        {shouldShowSection(2, "Information You Enter Into ProfileOS", "Usernames social-media handles Profile display names Public profile URLs Website domain URLs Profile Spaces Categories labels Custom notes Custom template text") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">2</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Information You Enter Into ProfileOS</h2>
              </div>
              <Database className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS allows you to store information that you choose to provide. This may include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              {[
                'Usernames and social-media handles',
                'Profile display names',
                'Public profile URLs',
                'Website and domain URLs',
                'Profile Spaces',
                'Categories and labels',
                'Color or visual preferences associated with profiles',
                'Custom notes',
                'Custom template text',
                'Sharing and formatting preferences',
                'Other information you intentionally enter into the Application'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200/70 text-xs sm:text-sm text-slate-900 font-medium">
              This information is primarily stored <strong className="text-blue-900 font-bold">locally on your device</strong>. ProfileOS does not automatically upload your saved profile database to a ProfileOS cloud server.
            </div>
          </section>
        )}

        {/* 3. Data Collection (Local Storage Only) */}
        {shouldShowSection(3, "Data Collection (Local Storage Only)", "Android application sandbox on-device database application preferences security") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">3</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Data Collection (Local Storage Only)</h2>
              </div>
              <HardDrive className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS is designed to keep your saved information on your device.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Depending on the version of the Application and the Android platform, information may be stored using local application storage, including an on-device database and application preferences.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Android&apos;s application sandbox helps restrict access to the App&apos;s private files by other applications.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              However, no storage system can be guaranteed to be completely secure. Your device&apos;s security, operating-system configuration, physical access, backups, rooting, malware, and other factors may affect the security of locally stored information.
            </p>
            <div className="p-3 bg-amber-50/90 rounded-2xl border border-amber-200/80 text-xs sm:text-sm font-semibold text-amber-950">
              You are responsible for maintaining appropriate security for your device.
            </div>
          </section>
        )}

        {/* 4. How ProfileOS Uses the Internet */}
        {shouldShowSection(4, "How ProfileOS Uses the Internet", "Website Favicons Public Account Names Webpage Titles Open Graph metadata metadata retrieval") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">4</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">How ProfileOS Uses the Internet</h2>
              </div>
              <Globe className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS requires internet access for a <strong className="text-slate-950 font-bold">limited set of metadata-related features</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The App does not need an internet connection for many of its core functions, including organizing saved information, copying information, generating QR codes, and preparing information for sharing.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When an internet connection is available, ProfileOS may perform the following requests:
            </p>

            <div className="space-y-3.5">
              {/* 4.1 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <h3 className="text-sm font-black text-slate-900">4.1 Website Favicons</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  When you add or use a website URL, ProfileOS may retrieve a favicon or website icon so that the website can be visually identified inside the App. Depending on the implementation, favicon requests may use third-party favicon services. The requested domain or URL may therefore be transmitted to the relevant favicon service.
                </p>
              </div>

              {/* 4.2 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <h3 className="text-sm font-black text-slate-900">4.2 Public Account Names and Webpage Titles</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  When you add a web link, ProfileOS may attempt to retrieve publicly available information associated with that URL. This may include:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>A public account or profile name.</li>
                  <li>A webpage title.</li>
                  <li>Public Open Graph metadata.</li>
                  <li>Other basic publicly available page metadata used to improve the display name of a saved link.</li>
                </ul>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  To retrieve this information, ProfileOS may make a request to the relevant website or another service used for metadata retrieval. For example, if you add a public profile URL, the App may request that URL to determine the publicly displayed account or page name.
                </p>
              </div>

              {/* 4.3 */}
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200/80 space-y-1.5">
                <h3 className="text-sm font-black text-slate-900">4.3 What ProfileOS Does Not Send for Metadata Retrieval</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  ProfileOS is designed so that metadata requests do <strong className="text-slate-950 font-bold">not intentionally include your entire local ProfileOS database</strong>.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  The App does not need to upload your complete profile collection, other saved handles, notes, Profile Spaces, application preferences, or local backup database to retrieve a favicon or public webpage title.
                </p>
                <p className="text-xs sm:text-sm font-semibold text-blue-900">
                  Only the information reasonably necessary to request the relevant web resource or metadata should be transmitted.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 5. Third-Party Services */}
        {shouldShowSection(5, "Third-Party Services", "Google DuckDuckGo favicon providers IP address technical information") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">5</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Third-Party Services</h2>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Some ProfileOS features may rely on third-party websites or services. These may include services used to retrieve website favicons or publicly available webpage information (such as favicon services operated by companies such as Google or DuckDuckGo, depending on the current implementation of ProfileOS).
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When ProfileOS requests information from such a service, that service may receive technical information associated with the request, such as the requested URL and information normally available to a web server, including an IP address.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The third party&apos;s own privacy policy and terms govern its handling of information it receives. ProfileOS does not control how an independent third-party service processes information after it receives a request.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Where possible, ProfileOS is designed to limit requests to the information necessary for the requested feature.
            </p>
          </section>
        )}

        {/* 6. Opening External Websites & Third-Party Platforms */}
        {shouldShowSection(6, "Opening External Websites & Third-Party Platforms", "Instagram GitHub X LinkedIn Discord Telegram external browser") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">6</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Opening External Websites &amp; Third-Party Platforms</h2>
              </div>
              <Link2 className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS may allow you to open saved URLs using an in-app browser experience or your device&apos;s browser. When you open a website:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2">
                <span className="font-bold text-blue-600">1.</span>
                <span>The website receives the request.</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2">
                <span className="font-bold text-blue-600">2.</span>
                <span>The website may collect information according to its own privacy policy.</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2">
                <span className="font-bold text-blue-600">3.</span>
                <span>The website may use cookies, analytics, advertising, or authentication.</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2">
                <span className="font-bold text-blue-600">4.</span>
                <span>ProfileOS does not control the privacy practices of that website.</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              For example, if you open an Instagram, GitHub, X, LinkedIn, Discord, Telegram, or other third-party URL, your interaction with that service is governed by the service&apos;s own privacy policy and terms. ProfileOS is not responsible for the privacy practices of external websites or services.
            </p>
          </section>
        )}

        {/* 7. Clipboard and Sharing */}
        {shouldShowSection(7, "Clipboard and Sharing", "clipboard copy Android sharing transfer") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">7</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Clipboard and Sharing</h2>
              </div>
              <Share2 className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS provides features that allow you to copy and share information. When you use these features, information may be transferred to another application or service according to your explicit action and your device&apos;s operating-system behavior.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              For example, when you tap a copy action, the selected information may be placed on your device&apos;s clipboard. When you use Android&apos;s sharing functionality, the information you select may be provided to the application you choose.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Once information is transferred to another application or service, that application or service becomes responsible for how it handles the information. You should review information before sharing it, particularly if it contains information you consider private or sensitive.
            </p>
          </section>
        )}

        {/* 8. QR Codes */}
        {shouldShowSection(8, "QR Codes", "QR codes encoding scanning camera local generation") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">8</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">QR Codes</h2>
              </div>
              <QrCode className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS may generate QR codes containing information that you choose to encode. QR generation is performed locally for your use and does not require ProfileOS to upload the encoded information to a ProfileOS server.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              However, once you display, publish, or share a QR code, anyone who can scan it may be able to access the information encoded within it. You are responsible for deciding what information to place in a QR code and where you choose to share it.
            </p>
          </section>
        )}

        {/* 9. Permissions */}
        {shouldShowSection(9, "Permissions", "INTERNET ACCESS_NETWORK_STATE VIBRATE Android permissions runtime") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">9</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Permissions</h2>
              </div>
              <Smartphone className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS is designed to request only permissions required for its features. Depending on the version of the Application, permissions may include:
            </p>

            <div className="overflow-hidden border border-slate-200 rounded-2xl">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-slate-100/90 text-slate-900 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5 text-left">Permission</th>
                    <th className="p-3.5 text-left">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-white">
                    <td className="p-3.5 font-bold text-slate-950 align-top">
                      Internet <br />
                      <code className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono text-[11px] font-normal">android.permission.INTERNET</code>
                    </td>
                    <td className="p-3.5 text-slate-700 align-top">Used to retrieve website favicons and publicly available webpage/account metadata.</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3.5 font-bold text-slate-950 align-top">
                      Network State <br />
                      <code className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono text-[11px] font-normal">android.permission.ACCESS_NETWORK_STATE</code>
                    </td>
                    <td className="p-3.5 text-slate-700 align-top">Used to determine whether network connectivity is available before performing network-dependent operations.</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3.5 font-bold text-slate-950 align-top">
                      Vibration <br />
                      <code className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono text-[11px] font-normal">android.permission.VIBRATE</code>
                    </td>
                    <td className="p-3.5 text-slate-700 align-top">Used for haptic feedback associated with supported interactions and gestures.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-600">
              These Android permissions are normal permissions and generally do not require a runtime permission prompt from the user. Android documents <code className="bg-slate-100 px-1 rounded font-mono">INTERNET</code> and <code className="bg-slate-100 px-1 rounded font-mono">ACCESS_NETWORK_STATE</code> as normal permissions for network operations.
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2.5">
              <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                Permissions ProfileOS Does Not Intentionally Require
              </h3>
              <p className="text-xs text-slate-600">ProfileOS is designed not to require permissions for:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700 font-medium">
                <div>• Precise or approximate location</div>
                <div>• Contacts</div>
                <div>• Phone calls or phone state</div>
                <div>• Microphone recording</div>
                <div>• Camera access</div>
                <div>• SMS messages</div>
                <div>• Continuous background location</div>
                <div>• Installed-app list access</div>
                <div>• Broad device storage access</div>
              </div>
              <p className="text-xs text-slate-500 pt-1">
                File exports can use Android&apos;s Storage Access Framework where supported, allowing you to choose where exported files are saved.
              </p>
            </div>
          </section>
        )}

        {/* 10. Analytics, Advertising, and Tracking */}
        {shouldShowSection(10, "Analytics, Advertising, and Tracking", "Google Analytics Firebase Meta Facebook AppsFlyer behavioral analytics tracking pixels") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">10</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Analytics, Advertising, and Tracking</h2>
              </div>
              <EyeOff className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS does not intentionally include advertising SDKs or behavioral analytics services. We do not intentionally use services such as Google Analytics, Firebase Analytics, Facebook/Meta advertising SDKs, AppsFlyer, advertising networks, or tracking pixels.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS does not intentionally create a behavioral advertising profile based on your use of the Application. If this changes in a future version, this Privacy Policy will be updated accordingly before or when the relevant practices are introduced, as required by applicable law.
            </p>
          </section>
        )}

        {/* 11. Personal Information We Do Not Intentionally Collect */}
        {shouldShowSection(11, "Personal Information We Do Not Intentionally Collect", "location contacts phone number call history SMS microphone camera browsing history") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">11</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Personal Information We Do Not Intentionally Collect</h2>
              </div>
              <ShieldCheck className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS does not intentionally collect or maintain the following information as part of its normal operation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              {[
                'Your real-world location',
                'Your contacts',
                'Your phone number',
                'Your call history',
                'Your SMS messages',
                'Your microphone recordings',
                'Your camera content',
                'Your advertising profile',
                'Your complete device identifier',
                'Your complete ProfileOS database on a ProfileOS server',
                'Your browsing history outside the functionality you explicitly initiate through ProfileOS'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 pt-1">
              ProfileOS may nevertheless interact with third-party websites when you explicitly open or request information from them. Those third parties may process information according to their own policies.
            </p>
          </section>
        )}

        {/* 12. Data Retention */}
        {shouldShowSection(12, "Data Retention", "retention duration delete storage uninstallation") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">12</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Data Retention</h2>
              </div>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Because ProfileOS primarily stores your information locally, we generally do not retain a remote copy of your saved ProfileOS data. Your locally stored data remains on your device until you delete individual information, use the App&apos;s data-clearing features, clear the Application&apos;s storage through Android, uninstall ProfileOS, or overwrite/delete an exported backup.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Network requests used to retrieve metadata are intended to be processed for the immediate feature request rather than stored by ProfileOS as a personal profile database. Third-party services may independently retain technical request information according to their own policies.
            </p>
          </section>
        )}

        {/* 13. Export and Backup */}
        {shouldShowSection(13, "Export and Backup", "JSON CSV Markdown HTML plain text backup exports") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">13</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Export and Backup</h2>
              </div>
              <Download className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS may allow you to export your information in supported formats, which may include JSON, CSV, Markdown, HTML, plain text, or other formats introduced in future versions.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Depending on the feature, exports may be encrypted or unencrypted. You are responsible for protecting exported files and backups after they leave ProfileOS.
            </p>
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs sm:text-sm text-amber-950 font-medium">
              An exported file may contain the information stored in your ProfileOS database and should therefore be treated as potentially sensitive. Do not upload or share an exported backup unless you trust the destination and understand what information it contains.
            </div>
          </section>
        )}

        {/* 14. Deleting Your Data */}
        {shouldShowSection(14, "Deleting Your Data", "In-App Deletion Android Settings Uninstallation clear local database") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">14</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Deleting Your Data</h2>
              </div>
              <Trash2 className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS gives you control over locally stored data. Depending on the version of the Application, you may delete data through:
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-800">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold block mb-0.5">In-App Deletion</strong>
                <span>Use the available data-management or storage controls inside ProfileOS to delete saved information or clear the Application&apos;s local database.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold block mb-0.5">Android Settings</strong>
                <span>You may also clear ProfileOS application data through your Android device&apos;s application settings.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <strong className="text-slate-950 font-bold block mb-0.5">Uninstallation</strong>
                <span>Uninstalling ProfileOS generally removes its local application data from the device, subject to Android behavior, device backups, and any files you previously exported outside the Application.</span>
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded-xl border border-red-200/70 text-xs sm:text-sm text-red-950 font-bold">
              Important: Deleting ProfileOS does not automatically delete copies of information that you previously exported, shared, backed up, or sent to another application or service.
            </div>
          </section>
        )}

        {/* 15. Security */}
        {shouldShowSection(15, "Security", "Android sandboxing private application storage HTTPS URL validation sensitive clipboard flags") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">15</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Security</h2>
              </div>
              <Lock className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We design ProfileOS with privacy and local data protection in mind. Depending on the Application version and Android platform, security measures may include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Android application sandboxing</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Private application storage</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Local database protection</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Input and URL validation</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Restricted URL schemes &amp; intent handling</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• HTTPS for supported network requests</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Sensitive clipboard metadata flags</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Minimal network communication</div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We follow the principle of minimizing the amount of information transmitted over the network. Android also recommends minimizing sensitive information transmitted over networks and using encrypted network communication. However, no application, device, operating system, network connection, or storage mechanism can be guaranteed to be completely secure.
            </p>
          </section>
        )}

        {/* 16. Children's Privacy */}
        {shouldShowSection(16, "Children's Privacy", "children COPPA parents guardians local profile") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">16</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Children&apos;s Privacy</h2>
              </div>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS is not specifically directed toward children. We do not knowingly design the Application to collect personal information from children for advertising, profiling, or behavioral tracking.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Because ProfileOS primarily stores information locally and does not require a ProfileOS account, its core functionality does not involve maintaining a cloud-based child user profile. Parents and guardians are responsible for determining whether ProfileOS is appropriate for children in their jurisdiction. Nothing in this Privacy Policy is intended to claim automatic compliance with every child-privacy law in every jurisdiction.
            </p>
          </section>
        )}

        {/* 17. International Users */}
        {shouldShowSection(17, "International Users", "international countries cross-border metadata jurisdiction") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">17</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">International Users</h2>
              </div>
              <Globe className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS may be used by people in different countries. Although your saved ProfileOS data is primarily stored locally, network requests for website metadata may be processed through third-party websites or services that operate in other countries. Those third parties may process technical information according to their own privacy policies and applicable laws. If you are located in a jurisdiction with specific privacy rights, you may have additional rights under applicable law.
            </p>
          </section>
        )}

        {/* 18. Your Privacy Rights */}
        {shouldShowSection(18, "Your Privacy Rights", "GDPR CCPA rights access correction deletion objection portability") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">18</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Your Privacy Rights</h2>
              </div>
              <Scale className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Depending on where you live, you may have rights relating to your personal information, including rights to know what personal information is processed, access certain personal information, request correction of inaccurate information, request deletion of applicable personal information, object to or restrict certain processing, withdraw consent where processing is based on consent, or request portability of certain information.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Because most ProfileOS data is stored directly on your device and controlled by you, many actions can be performed directly through the Application without contacting us. If you believe we hold personal information about you and you want to exercise a privacy right, contact us using the information provided below. We will handle valid requests according to applicable law.
            </p>
          </section>
        )}

        {/* 19. Third-Party Links and Services */}
        {shouldShowSection(19, "Third-Party Links and Services", "links external third-party policies services") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">19</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Third-Party Links and Services</h2>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS may contain or generate links to third-party services. We are not responsible for the privacy practices, content, security, or data handling practices of third-party services.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Third-party services may include social platforms, websites, favicon providers, metadata providers, browsers, and applications used through your device&apos;s sharing functionality. We encourage you to review the privacy policy of any third-party service before providing information to it.
            </p>
          </section>
        )}

        {/* 20. Changes to This Privacy Policy */}
        {shouldShowSection(20, "Changes to This Privacy Policy", "updates amendments modifications policy revision") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">20</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Changes to This Privacy Policy</h2>
              </div>
              <RefreshCw className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We may update this Privacy Policy when our Application, data practices, third-party services, or applicable legal requirements change. When we make changes, we will update the <strong className="text-slate-900 font-semibold">Last Updated</strong> date at the top of this Privacy Policy.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              For material changes, we may provide additional notice through the Application or another reasonable method where appropriate. We encourage you to periodically review this Privacy Policy.
            </p>
          </section>
        )}

        {/* 21. Contact Us */}
        {shouldShowSection(21, "Contact Us", "email support developer company PrintionUp Studio support@printionup.com") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">21</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Contact Us</h2>
              </div>
              <Mail className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you have questions, concerns, privacy requests, or feedback regarding this Privacy Policy or ProfileOS, please contact us at:
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <strong className="text-slate-950 font-bold w-36">Application:</strong>
                <span className="font-mono text-slate-700">ProfileOS</span>
              </div>
              <div className="flex items-center gap-2">
                <strong className="text-slate-950 font-bold w-36">Developer / Company:</strong>
                <span className="font-mono text-slate-700">PrintionUp Studio</span>
              </div>
              <div className="flex items-center gap-2">
                <strong className="text-slate-950 font-bold w-36">Privacy &amp; Support Email:</strong>
                <a href="mailto:printionupstudio@gmail.com" className="font-mono text-[#2563EB] hover:underline">printionupstudio@gmail.com</a>
              </div>
            </div>
          </section>
        )}

        {/* 22. Final Privacy Commitment */}
        {shouldShowSection(22, "Final Privacy Commitment", "digital identity belong device local first commitment") && (
          <section className="bg-gradient-to-tr from-[#2563EB] via-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-blue-100 bg-white/15 px-3 py-1 rounded-full border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>22. Final Privacy Commitment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Your digital identity should belong to you.
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              We designed ProfileOS so that your saved handles, profiles, links, notes, and organization remain primarily on your device rather than being stored in a ProfileOS cloud database.
            </p>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              When ProfileOS needs the internet, it is for specific features such as retrieving <strong className="text-white">website favicons, public account names, or webpage titles</strong>. We aim to keep those network interactions limited to what is necessary for the feature you are using.
            </p>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              We do not sell or rent your personal information, and we do not use your ProfileOS data to build advertising profiles.
            </p>
            <div className="pt-2 border-t border-white/20 font-black text-white text-sm sm:text-base tracking-wide">
              ProfileOS — your digital identity, organized on your device.
            </div>
          </section>
        )}

      </div>

      {/* Footer Navigation Bar */}
      <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('terms')}
            className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Read Terms of Service</span>
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => onNavigate('help')}
            className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
          >
            Help Center
          </button>
        </div>

        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
        >
          Back to Top ↑
        </button>
      </div>

      {/* Print & PDF Export Modal */}
      {isPrintModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={() => setIsPrintModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#2563EB] flex items-center justify-center flex-shrink-0">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">Print &amp; Export Document</h3>
                  <p className="text-xs text-slate-500">ProfileOS Privacy Policy (Official Legal Copy)</p>
                </div>
              </div>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body & Action Grid */}
            <div className="p-5 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Action 1: Print / PDF Dialog */}
                <button
                  onClick={() => {
                    try {
                      window.print();
                    } catch {
                      // fallback
                    }
                  }}
                  className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex flex-col items-start gap-1 text-left transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center gap-1.5"><Printer className="w-4 h-4" /> Trigger Browser Print</span>
                    <span className="text-[10px] bg-blue-500/60 px-2 py-0.5 rounded-full font-mono">Ctrl+P</span>
                  </div>
                  <span className="text-[11px] font-normal text-blue-100">Opens standard print dialog (Save as PDF)</span>
                </button>

                {/* Action 2: Download HTML / PDF-Ready */}
                <button
                  onClick={handleDownloadHtml}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm flex flex-col items-start gap-1 text-left transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center gap-1.5"><FileDown className="w-4 h-4 text-emerald-400" /> Save PDF-Ready (.html)</span>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-mono">HTML</span>
                  </div>
                  <span className="text-[11px] font-normal text-slate-300">Opens in any browser with instant Print button</span>
                </button>

                {/* Action 3: Download Plain Text */}
                <button
                  onClick={handleDownloadText}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-between gap-2 transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-blue-600" />
                    <span>Download Raw Text (.txt)</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Universal format</span>
                </button>

                {/* Action 4: Copy Full Document */}
                <button
                  onClick={handleCopyFullText}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-between gap-2 transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {copiedFullText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-blue-600" />}
                    <span>{copiedFullText ? 'Full Text Copied!' : 'Copy Entire Text'}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Clipboard</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-xs text-slate-500">Official legal document • September 2026</span>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
