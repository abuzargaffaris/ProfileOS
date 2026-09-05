import React, { useState } from 'react';
import { 
  FileText, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Shield,
  HardDrive,
  Globe,
  Share2,
  QrCode,
  AlertTriangle,
  Scale,
  RefreshCw,
  Mail,
  Search,
  Printer,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldAlert,
  UserCheck,
  FileCheck2,
  Lock,
  Layers,
  Info,
  X,
  FileDown
} from 'lucide-react';
import { PageTab } from '../types';

interface TermsPageProps {
  onNavigate: (tab: PageTab) => void;
}

type TermsCategoryFilter = 'all' | 'key' | 'storage' | 'conduct' | 'liability' | 'legal';

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<TermsCategoryFilter>('all');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedFullText, setCopiedFullText] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const FULL_TERMS_TEXT = `ProfileOS — Terms of Service
Effective Date: September 2026
Official Legal Agreement

ProfileOS ("ProfileOS," the "Application," the "App," "we," "us," or "our") is a personal digital identity and profile management application that helps you organize usernames, social handles, profile links, websites, and related information in one place.

Please read these Terms of Service ("Terms") carefully before downloading, installing, accessing, or using ProfileOS. By downloading, installing, accessing, or using ProfileOS, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use the Application.

===================================================================

1. Acceptance of Terms
By downloading, installing, accessing, or using ProfileOS, you confirm that:
1. You are at least 13 years old, or the minimum age required by applicable law in your jurisdiction.
2. You have read, understood, and agree to these Terms and the ProfileOS Privacy Policy.
3. You have the legal capacity to enter into these Terms.
4. You will use ProfileOS in compliance with applicable laws and regulations.
If you use ProfileOS on behalf of a company, organization, or other legal entity, you represent that you have authority to accept these Terms on its behalf.

2. Description of ProfileOS
ProfileOS is a local-first digital identity and profile management application.
Depending on the version of the Application, ProfileOS may provide features that allow you to:
- Store and organize usernames, social handles, profile URLs, websites, and other digital identity information.
- Create and manage separate Profile Spaces or collections.
- Categorize, pin, search, edit, and organize saved profiles and links.
- Quickly copy saved handles, usernames, URLs, and other information to your clipboard.
- Generate formatted text and shareable content.
- Generate QR codes from URLs, handles, usernames, or other information you choose.
- Share information using your device's native sharing functionality.
- Open saved URLs in an in-app browser or your device's external browser.
- Retrieve publicly available account names or webpage titles associated with saved URLs.
- Retrieve website favicon or icon images to improve the visual organization of saved links.
- Export or back up your locally stored information in supported formats.
Features may differ depending on your device, operating system, application version, or region.

3. Local Storage and Internet Access
3.1 Local Storage: ProfileOS is designed around local storage. Information you save in the Application, including usernames, handles, URLs, notes, categories, Profile Spaces, preferences, and similar user-created information, is primarily stored on your device. ProfileOS does not require you to create a ProfileOS account or maintain a ProfileOS cloud account to use its core functionality.
3.2 Limited Internet Access: Although your saved information is primarily stored locally, certain ProfileOS features require an internet connection. ProfileOS may access the internet only for limited metadata-related functionality, including: fetching website favicons or icons, fetching publicly available account names, and fetching publicly available webpage titles. If an internet connection is unavailable, the affected metadata may not be displayed.
3.3 No ProfileOS Cloud Storage: ProfileOS does not upload your complete locally stored profile database to a ProfileOS cloud server as part of the normal operation of the Application.

4. Metadata and Favicon Retrieval
ProfileOS may retrieve publicly available information associated with URLs that you add to or interact with in the Application (account names, webpage titles, website favicons, website icons). ProfileOS does not guarantee that retrieved metadata is accurate, complete, current, available, correctly associated, official, or verified by ProfileOS.

5. Your Data and Backups
5.1 Your Content: You retain ownership of the information and content you enter, create, import, or store in ProfileOS.
5.2 Responsibility for Backups: Because ProfileOS primarily stores your information locally, you are responsible for maintaining backups of information you consider important. We recommend regularly using available export functionality.

6. Clipboard, QR Codes, and Sharing
Information copied to your clipboard may be accessible according to operating system behavior. Anyone who scans a QR code may access the information encoded within it. Once information leaves ProfileOS through copying, exporting, or sharing, ProfileOS does not control how that information is used or stored.

7. Third-Party Websites and Services
ProfileOS is not affiliated with, endorsed by, sponsored by, or officially connected to any third-party platform unless expressly stated otherwise. Third-party trademarks remain the property of their respective owners.

8. Account and Handle Ownership
ProfileOS is an organizational tool and does not verify ownership of usernames, handles, domains, accounts, or profiles saved in the Application.

9. Acceptable Use
You agree not to use ProfileOS to violate applicable laws, facilitate fraud, scams, phishing, harassment, stalking, distribute malware, circumvent security mechanisms, or reverse-engineer the Application.

10. Intellectual Property
ProfileOS software, source code, visual design, and branding are protected by applicable intellectual-property laws. You retain ownership of content that you provide to ProfileOS.

11. Application Security
You are responsible for maintaining reasonable security of your device (passcodes, OS updates, physical access, export backups). ProfileOS is not a password manager or secure vault.

12. No Professional Advice
ProfileOS does not provide legal, financial, medical, cybersecurity, or identity-verification advice.

13. Disclaimer of Warranties
TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PROFILEOS IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND.

14. Limitation of Liability
PROFILEOS AND ITS DEVELOPERS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE APPLICATION.

15. Application Updates and Changes
We may modify, update, improve, suspend, or discontinue ProfileOS or any part of the Application at any time.

16. Changes to These Terms
We may update these Terms from time to time. Continued use of ProfileOS constitutes acceptance of revised Terms.

17. Suspension and Termination
You may stop using ProfileOS at any time by deleting the Application from your device.

18. Governing Law
These Terms will be governed by the laws applicable in the jurisdiction where the ProfileOS developer or operating entity is legally established.

19. Severability
If any provision of these Terms is determined to be unlawful, invalid, or unenforceable, the remaining provisions will continue in full force.

20. Entire Agreement
These Terms, together with the ProfileOS Privacy Policy, constitute the entire agreement.

21. Contact Information
ProfileOS Support: printionupstudio@gmail.com

22. Acknowledgment
By using ProfileOS, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
`;

  const handleCopySummary = async () => {
    const summaryText = `ProfileOS Terms of Service Summary:
- Acceptance: You must be at least 13 years old and agree to these Terms and the Privacy Policy.
- Local-First Architecture: Profiles, handles, URLs, and notes are primarily stored directly on your device with no mandatory cloud account.
- Limited Internet Use: Online access is strictly for fetching website favicons, public account names, and webpage titles.
- Data Ownership & Backups: You own your data; you are responsible for maintaining backups via export tools.
- Acceptable Use: Prohibits unlawful activity, malware, fraud, harassment, and abuse of third-party APIs.
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
      const blob = new Blob([FULL_TERMS_TEXT], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ProfileOS_Terms_of_Service.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setActionFeedback('Terms document downloaded (.txt)!');
      setTimeout(() => setActionFeedback(null), 3000);
    } catch (err) {
      console.error('Download failed', err);
      setActionFeedback('Downloaded document');
      setTimeout(() => setActionFeedback(null), 2500);
    }
  };

  const handleCopyFullText = async () => {
    try {
      await navigator.clipboard.writeText(FULL_TERMS_TEXT);
      setCopiedFullText(true);
      setActionFeedback('Full Terms of Service copied to clipboard!');
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
  <title>ProfileOS - Terms of Service</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    h1 { color: #0f172a; font-size: 28px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; }
    h2 { color: #1e293b; font-size: 18px; margin-top: 28px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    h3 { color: #334155; font-size: 15px; margin-top: 18px; }
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
  <div class="badge">ProfileOS Official Legal Agreement</div>
  <h1>Terms of Service</h1>
  <p><strong>Effective Date:</strong> September 2026 • <strong>Application:</strong> ProfileOS (Local-First Identity Management)</p>
  <div class="header-box">
    <p>ProfileOS ("ProfileOS," the "Application," the "App," "we," "us," or "our") is a personal digital identity and profile management application that helps you organize usernames, social handles, profile links, websites, and related information in one place.</p>
    <p>Please read these Terms of Service ("Terms") carefully before downloading, installing, accessing, or using ProfileOS.</p>
  </div>
  <pre style="white-space: pre-wrap; font-family: inherit; font-size: 13.5px; line-height: 1.6; color: #334155;">${FULL_TERMS_TEXT.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ProfileOS_Terms_of_Service.html';
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
    // Open the visual Print / PDF modal for instant user feedback and options
    setIsPrintModalOpen(true);
    setActionFeedback('Print & PDF dialog opened');

    // Also attempt native print in case the browser allows it
    try {
      if (typeof window !== 'undefined' && typeof window.print === 'function') {
        window.print();
      }
    } catch (err) {
      console.warn('Native window.print() suppressed in container:', err);
    }
  };

  // Section categorization mapping
  const sectionCategories: Record<number, TermsCategoryFilter[]> = {
    1: ['key', 'legal'],
    2: ['key', 'storage'],
    3: ['key', 'storage'],
    4: ['storage'],
    5: ['key', 'storage'],
    6: ['storage', 'conduct'],
    7: ['conduct', 'liability'],
    8: ['conduct', 'legal'],
    9: ['key', 'conduct'],
    10: ['key', 'legal'],
    11: ['storage', 'liability'],
    12: ['liability'],
    13: ['key', 'liability'],
    14: ['key', 'liability'],
    15: ['legal'],
    16: ['legal'],
    17: ['legal'],
    18: ['legal'],
    19: ['legal'],
    20: ['legal'],
    21: ['key', 'legal'],
    22: ['key', 'legal']
  };

  const shouldShowSection = (sectionNumber: number, sectionTitle: string, sectionContent: string) => {
    if (activeCategory !== 'all') {
      const cats = sectionCategories[sectionNumber] || [];
      if (!cats.includes(activeCategory)) return false;
    }

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
              title="Copy quick terms summary to clipboard"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Summary Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handleDownloadText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-slate-200/80"
              title="Download full Terms of Service as text file"
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
          <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Official Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Official ProfileOS Terms • Effective as of September 2026 • Local-First Architecture
        </p>
      </div>

      {/* Quick Metrics & Key Pillars Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:grid-cols-2">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-blue-600">
            <UserCheck className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Eligibility</span>
          </div>
          <p className="text-sm sm:text-base font-black text-slate-900">13+ Years</p>
          <p className="text-[11px] text-slate-500 leading-tight">Legal capacity required</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-emerald-600">
            <HardDrive className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Storage</span>
          </div>
          <p className="text-sm sm:text-base font-black text-slate-900">Local-First</p>
          <p className="text-[11px] text-slate-500 leading-tight">No cloud database mandatory</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-purple-600">
            <Globe className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Network</span>
          </div>
          <p className="text-sm sm:text-base font-black text-slate-900">Metadata Only</p>
          <p className="text-[11px] text-slate-500 leading-tight">Favicons, titles &amp; names</p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <div className="flex items-center gap-2 text-amber-600">
            <Shield className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Ownership</span>
          </div>
          <p className="text-sm sm:text-base font-black text-slate-900">You Own Data</p>
          <p className="text-[11px] text-slate-500 leading-tight">User maintains own backups</p>
        </div>
      </div>

      {/* Main Introduction Card */}
      <div className="bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/40 rounded-3xl border border-blue-100 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-[#2563EB]" />
          <span>About These Terms of Service</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong>ProfileOS</strong> (&quot;ProfileOS,&quot; the &quot;Application,&quot; the &quot;App,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a personal digital identity and profile management application that helps you organize usernames, social handles, profile links, websites, and related information in one place.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Please read these Terms of Service (&quot;Terms&quot;) carefully before downloading, installing, accessing, or using ProfileOS. By downloading, installing, accessing, or using ProfileOS, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use the Application.
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
              placeholder="Search terms (e.g., acceptance, backups, acceptable use, liability, warranties)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
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
              { id: 'storage', label: 'Storage & Network' },
              { id: 'conduct', label: 'Conduct & Content' },
              { id: 'liability', label: 'Liability & Warranties' },
              { id: 'legal', label: 'Legal Terms' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as TermsCategoryFilter)}
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
        
        {/* 1. Acceptance of Terms */}
        {shouldShowSection(1, "Acceptance of Terms", "13 years old minimum age Privacy Policy legal capacity authority") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">1</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Acceptance of Terms</h2>
              </div>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">Binding Agreement</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              By downloading, installing, accessing, or using ProfileOS, you confirm that:
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                <span>You are at least <strong>13 years old</strong>, or the minimum age required by applicable law in your jurisdiction.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                <span>You have read, understood, and agree to these Terms and the ProfileOS Privacy Policy.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                <span>You have the legal capacity to enter into these Terms.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
                <span>You will use ProfileOS in compliance with applicable laws and regulations.</span>
              </div>
            </div>
            <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-200/70 text-xs sm:text-sm text-slate-800">
              If you use ProfileOS on behalf of a company, organization, or other legal entity, you represent that you have authority to accept these Terms on its behalf.
            </div>
          </section>
        )}

        {/* 2. Description of ProfileOS */}
        {shouldShowSection(2, "Description of ProfileOS", "local-first digital identity profile management application features Profile Spaces QR codes export") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">2</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Description of ProfileOS</h2>
              </div>
              <Layers className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS is a <strong>local-first digital identity and profile management application</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Depending on the version of the Application, ProfileOS may provide features that allow you to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              {[
                'Store and organize usernames, social handles, profile URLs, websites, and other digital identity information.',
                'Create and manage separate Profile Spaces or collections.',
                'Categorize, pin, search, edit, and organize saved profiles and links.',
                'Quickly copy saved handles, usernames, URLs, and other information to your clipboard.',
                'Generate formatted text and shareable content.',
                'Generate QR codes from URLs, handles, usernames, or other information you choose.',
                'Share information using your device’s native sharing functionality.',
                'Open saved URLs in an in-app browser or your device’s external browser.',
                'Retrieve publicly available account names or webpage titles associated with saved URLs.',
                'Retrieve website favicon or icon images to improve the visual organization of saved links.',
                'Export or back up your locally stored information in supported formats.'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 italic">
              Features may differ depending on your device, operating system, application version, or region.
            </p>
          </section>
        )}

        {/* 3. Local Storage and Internet Access */}
        {shouldShowSection(3, "Local Storage and Internet Access", "Local Storage Limited Internet Access No ProfileOS Cloud Storage metadata favicons") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">3</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Local Storage and Internet Access</h2>
              </div>
              <HardDrive className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-4">
              {/* 3.1 Local Storage */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <h3 className="text-sm font-black text-slate-900">3.1 Local Storage</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  ProfileOS is designed around <strong>local storage</strong>.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Information you save in the Application, including usernames, handles, URLs, notes, categories, Profile Spaces, preferences, and similar user-created information, is primarily stored on your device.
                </p>
                <p className="text-xs sm:text-sm font-semibold text-blue-900">
                  ProfileOS does not require you to create a ProfileOS account or maintain a ProfileOS cloud account to use its core functionality.
                </p>
              </div>

              {/* 3.2 Limited Internet Access */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <h3 className="text-sm font-black text-slate-900">3.2 Limited Internet Access</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Although your saved information is primarily stored locally, certain ProfileOS features require an internet connection.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  ProfileOS may access the internet <strong>only for limited metadata-related functionality</strong>, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>Fetching website favicons or website icons.</li>
                  <li>Fetching publicly available account names.</li>
                  <li>Fetching publicly available webpage titles.</li>
                </ul>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  These requests may be made directly to the relevant website or through a third-party service used to retrieve the requested metadata.
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  If an internet connection is unavailable, blocked, or a third-party service does not respond, the affected metadata may not be displayed or may remain unavailable.
                </p>
              </div>

              {/* 3.3 No ProfileOS Cloud Storage */}
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200/80 space-y-2">
                <h3 className="text-sm font-black text-slate-900">3.3 No ProfileOS Cloud Storage</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  ProfileOS does not upload your complete locally stored profile database to a ProfileOS cloud server as part of the normal operation of the Application.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Your saved handles, usernames, notes, categories, and other locally stored information remain on your device unless you explicitly export, share, or otherwise transfer that information using functionality provided by the Application or your device.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 4. Metadata and Favicon Retrieval */}
        {shouldShowSection(4, "Metadata and Favicon Retrieval", "Account profile names Webpage titles Website favicons Accurate Complete Current Verified") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">4</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Metadata and Favicon Retrieval</h2>
              </div>
              <Globe className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS may retrieve publicly available information associated with URLs that you add to or interact with in the Application. This may include:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-slate-800">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-center">Account / profile names</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-center">Webpage titles</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-center">Website favicons</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-center">Website icons</div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              This information is provided for convenience and presentation purposes. ProfileOS does not guarantee that retrieved metadata is:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Accurate</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Complete</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Current</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Available</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Correctly associated</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Official</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60 col-span-2">• Verified by ProfileOS</div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              A displayed account name, favicon, website title, or other metadata does <strong>not</strong> mean that ProfileOS has verified the ownership, authenticity, or affiliation of the associated account, website, person, company, or organization.
            </p>
            <p className="text-xs text-slate-500">
              Third-party websites and metadata services may change their content, APIs, access rules, or availability at any time.
            </p>
          </section>
        )}

        {/* 5. Your Data and Backups */}
        {shouldShowSection(5, "Your Data and Backups", "Your Content Responsibility for Backups uninstall clear application data corrupted") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">5</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Your Data and Backups</h2>
              </div>
              <Shield className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3">
              {/* 5.1 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <h3 className="text-sm font-black text-slate-900">5.1 Your Content</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  You retain ownership of the information and content you enter, create, import, or store in ProfileOS, subject to any rights belonging to third parties.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  This may include usernames, handles, URLs, notes, labels, categories, templates, and other information you provide.
                </p>
              </div>

              {/* 5.2 */}
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2">
                <h3 className="text-sm font-black text-slate-900">5.2 Responsibility for Backups</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Because ProfileOS primarily stores your information locally, <strong>you are responsible for maintaining backups of information you consider important</strong>.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  You may lose locally stored information if, for example:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                  <li>You uninstall ProfileOS.</li>
                  <li>You clear the Application&apos;s data.</li>
                  <li>You reset or replace your device.</li>
                  <li>Your device is lost, damaged, or stolen.</li>
                  <li>Your device&apos;s storage becomes corrupted.</li>
                  <li>An operating-system or device event affects the Application&apos;s local storage.</li>
                </ul>
                <p className="text-xs sm:text-sm font-semibold text-amber-950 pt-1">
                  ProfileOS does not guarantee that lost or corrupted local data can be recovered. We recommend regularly using the available export or backup functionality to preserve important information.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 6. Clipboard, QR Codes, and Sharing */}
        {shouldShowSection(6, "Clipboard, QR Codes, and Sharing", "clipboard QR codes sharing third-party applications sensitive confidential") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">6</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Clipboard, QR Codes, and Sharing</h2>
              </div>
              <Share2 className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS may provide features for copying information to your clipboard, generating QR codes, and sharing information through your device. You understand that:
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              {[
                'Information copied to your clipboard may potentially be accessible to other applications or services according to your device’s operating-system behavior.',
                'QR codes may contain information that you choose to encode.',
                'Anyone who receives or scans a QR code may be able to access the information encoded within it.',
                'Shared information may be transmitted through third-party applications or services.',
                'Once information leaves ProfileOS through copying, exporting, or sharing, ProfileOS does not control how that information is used or stored.'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="font-bold text-blue-600 flex-shrink-0">{idx + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200/80 text-xs sm:text-sm text-rose-950 font-medium">
              You are responsible for reviewing information before copying, exporting, generating a QR code, or sharing it. Do not use ProfileOS to generate or share confidential, sensitive, or security-critical information unless you understand the associated risks.
            </div>
          </section>
        )}

        {/* 7. Third-Party Websites and Services */}
        {shouldShowSection(7, "Third-Party Websites and Services", "affiliated endorsed sponsored platforms social-media external browser") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">7</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Third-Party Websites and Services</h2>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS may contain links to or interact with third-party websites, platforms, APIs, favicon services, metadata services, and other external services. Examples may include social-media platforms, developer platforms, messaging services, and websites operated by third parties.
            </p>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-900">
              ProfileOS is <strong>not affiliated with, endorsed by, sponsored by, or officially connected to any third-party platform unless expressly stated otherwise</strong>.
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Third-party names, trademarks, logos, icons, and other materials remain the property of their respective owners. Your use of a third-party website or service is subject to that provider&apos;s own terms, policies, and privacy practices.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS does not control and is not responsible for:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Third-party content</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Third-party availability</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Changes to websites/APIs</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Changes to URLs</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Third-party privacy practices</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Third-party security</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Account suspension/deletion</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Third-party metadata</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Service interruptions</div>
            </div>
            <p className="text-xs text-slate-500">
              When you open a link using an external browser or other third-party application, you are leaving ProfileOS and interacting with that third party.
            </p>
          </section>
        )}

        {/* 8. Account and Handle Ownership */}
        {shouldShowSection(8, "Account and Handle Ownership", "organizational tool verify ownership usernames handles domains accounts") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">8</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Account and Handle Ownership</h2>
              </div>
              <UserCheck className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS is an organizational tool and does not verify ownership of usernames, handles, domains, accounts, or profiles saved in the Application. Saving a username, handle, URL, or profile in ProfileOS does not:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Grant you ownership of that account or handle.</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Confirm that you own the associated account.</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Confirm that an account belongs to a particular person or organization.</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Establish a relationship between you and the associated platform, person, company, or organization.</div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You are responsible for ensuring that your use of usernames, handles, URLs, trademarks, names, logos, and other third-party information complies with applicable laws and the rules of the relevant platform.
            </p>
          </section>
        )}

        {/* 9. Acceptable Use */}
        {shouldShowSection(9, "Acceptable Use", "lawful fraud scams phishing harassment stalking malware reverse-engineer abuse") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">9</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Acceptable Use</h2>
              </div>
              <ShieldAlert className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You may use ProfileOS for lawful personal, professional, educational, or organizational purposes. You agree not to use ProfileOS to:
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {[
                'Violate applicable laws or regulations.',
                'Facilitate fraud, scams, phishing, harassment, stalking, or other harmful activity.',
                'Distribute malware or intentionally malicious links.',
                'Facilitate unauthorized access to accounts, systems, networks, or services.',
                'Store or distribute content that you do not have the legal right to possess or share.',
                'Deceptively impersonate another person, organization, brand, or service.',
                'Abuse, overload, interfere with, or disrupt third-party services accessed through ProfileOS.',
                'Use automated scripts or tools to abuse favicon, metadata, or other third-party services used by the Application.',
                'Circumvent technical limitations or security mechanisms of the Application.',
                'Reverse-engineer, decompile, disassemble, or modify the Application except where expressly permitted by applicable law or an applicable open-source license.',
                'Use the Application in a manner that could damage, disable, overburden, or impair ProfileOS or services connected to it.'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0 mt-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              You are responsible for all information you choose to store, generate, copy, export, publish, or share using ProfileOS.
            </p>
          </section>
        )}

        {/* 10. Intellectual Property */}
        {shouldShowSection(10, "Intellectual Property", "ProfileOS Intellectual Property User Content Third-Party Materials copyright branding") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">10</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Intellectual Property</h2>
              </div>
              <Sparkles className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3">
              {/* 10.1 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <h3 className="text-sm font-black text-slate-900">10.1 ProfileOS Intellectual Property</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Unless otherwise stated, ProfileOS and its software, source code, architecture, user interface, visual design, graphics, animations, documentation, branding, and original content are owned by or licensed to the ProfileOS developers.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  These materials are protected by applicable intellectual-property laws. These Terms do not transfer ownership of ProfileOS or its intellectual property to you.
                </p>
              </div>

              {/* 10.2 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <h3 className="text-sm font-black text-slate-900">10.2 User Content</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  You retain ownership of content that you provide to ProfileOS.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  You grant ProfileOS only the permissions reasonably necessary for the Application to provide the features you use, such as displaying, organizing, copying, exporting, generating QR codes from, or sharing your content at your direction.
                </p>
              </div>

              {/* 10.3 */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                <h3 className="text-sm font-black text-slate-900">10.3 Third-Party Materials</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Third-party trademarks, names, logos, icons, websites, and other materials displayed or referenced through ProfileOS belong to their respective owners.
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Their appearance in the Application does not imply endorsement or affiliation.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 11. Application Security */}
        {shouldShowSection(11, "Application Security", "passcodes authentication security updates physical access password manager secure vault") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">11</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Application Security</h2>
              </div>
              <Lock className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS is designed to provide local organization and management of your digital identity information. However, no software or device can be guaranteed to be completely secure.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You are responsible for maintaining reasonable security of your device, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Device passcodes or authentication.</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Operating-system security updates.</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Physical access to your device.</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">• Security of exported backups.</div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 sm:col-span-2">• Security of information you share with other applications or people.</div>
            </div>
            <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-xs sm:text-sm text-amber-950 font-medium">
              ProfileOS should not be treated as a password manager, authentication system, identity-verification service, or secure vault unless a specific feature is expressly described as such.
            </div>
          </section>
        )}

        {/* 12. No Professional Advice */}
        {shouldShowSection(12, "No Professional Advice", "productivity organization legal financial medical cybersecurity identity-verification") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">12</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">No Professional Advice</h2>
              </div>
              <Info className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              ProfileOS is a productivity and organization application.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              It does not provide legal, financial, medical, cybersecurity, identity-verification, or other professional advice.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Information displayed through ProfileOS, including third-party account names, webpage titles, favicons, and metadata, should not be treated as verified or authoritative information.
            </p>
          </section>
        )}

        {/* 13. Disclaimer of Warranties */}
        {shouldShowSection(13, "Disclaimer of Warranties", "AS IS AS AVAILABLE DISCLAIM WARRANTIES MERCHANTABILITY FITNESS FOR A PARTICULAR PURPOSE NON-INFRINGEMENT") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">13</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Disclaimer of Warranties</h2>
              </div>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 text-xs sm:text-sm leading-relaxed space-y-2 font-mono">
              <p className="font-bold text-white uppercase tracking-wider">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PROFILEOS IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.
              </p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM WARRANTIES INCLUDING, BUT NOT LIMITED TO: MERCHANTABILITY; FITNESS FOR A PARTICULAR PURPOSE; NON-INFRINGEMENT; AVAILABILITY; ACCURACY; RELIABILITY; SECURITY; PERFORMANCE; AND ERROR-FREE OR UNINTERRUPTED OPERATION.
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We do not guarantee that:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• ProfileOS will always be available.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• The Application will operate without errors.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Every feature will work on every device/OS version.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Locally stored data will never be lost or corrupted.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Metadata will always be retrieved successfully.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Retrieved account names or webpage titles will be accurate.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Favicons will always be available or correct.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Third-party websites or services will remain available.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• URLs saved in ProfileOS will remain active or lead to same destination.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• QR codes will be readable by every scanning device.</div>
            </div>
            <p className="text-xs text-slate-500 italic">
              Some jurisdictions do not allow certain warranty exclusions, so some of these limitations may not apply to you.
            </p>
          </section>
        )}

        {/* 14. Limitation of Liability */}
        {shouldShowSection(14, "Limitation of Liability", "LIMITATION OF LIABILITY INDIRECT INCIDENTAL SPECIAL CONSEQUENTIAL PUNITIVE DAMAGES") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">14</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Limitation of Liability</h2>
              </div>
              <Scale className="w-4 h-4 text-slate-400" />
            </div>
            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 text-xs sm:text-sm leading-relaxed space-y-2 font-mono">
              <p className="font-bold text-white uppercase tracking-wider">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PROFILEOS AND ITS DEVELOPERS, OWNERS, CONTRIBUTORS, LICENSORS, AND DISTRIBUTORS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES ARISING FROM OR RELATED TO YOUR USE OF, OR INABILITY TO USE, PROFILEOS.
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              This includes, without limitation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Loss or corruption of locally stored data.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Loss of exported or backed-up data.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Device failure or operating-system changes.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Broken or changed URLs.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Incorrect third-party metadata or failed favicons.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Third-party website or service problems.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Misuse of QR codes.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">• Information shared through third-party apps.</div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/60 sm:col-span-2">• Unauthorized access resulting from your device, backups, or sharing practices.</div>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              To the extent liability cannot legally be excluded, our liability will be limited to the maximum extent permitted by applicable law.
            </p>
          </section>
        )}

        {/* 15. Application Updates and Changes */}
        {shouldShowSection(15, "Application Updates and Changes", "modify update improve suspend discontinue features export formats") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">15</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Application Updates and Changes</h2>
              </div>
              <RefreshCw className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We may modify, update, improve, suspend, or discontinue ProfileOS or any part of the Application at any time. Changes may include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">• Adding or removing features.</div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">• Changing the user interface.</div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">• Changing supported export formats.</div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">• Changing metadata or favicon retrieval methods.</div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">• Removing third-party integrations.</div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">• Fixing bugs or security issues.</div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">• Changing technical requirements.</div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-200/60">• Ending support for older operating-system versions.</div>
            </div>
            <p className="text-xs text-slate-500">
              We do not guarantee that ProfileOS will remain compatible with every device, operating-system version, website, API, or third-party platform indefinitely.
            </p>
          </section>
        )}

        {/* 16. Changes to These Terms */}
        {shouldShowSection(16, "Changes to These Terms", "update Last Updated revised Terms continued use acceptance") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">16</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Changes to These Terms</h2>
              </div>
              <FileText className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We may update these Terms from time to time.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              When changes are made, we may update the <strong>Last Updated</strong> date and, where appropriate, provide additional notice through the Application or another reasonable method.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Your continued use of ProfileOS after revised Terms become effective constitutes acceptance of the revised Terms to the extent permitted by applicable law.
            </p>
            <p className="text-xs sm:text-sm font-semibold text-rose-900">
              If you do not agree with the revised Terms, you should stop using ProfileOS and delete the Application.
            </p>
          </section>
        )}

        {/* 17. Suspension and Termination */}
        {shouldShowSection(17, "Suspension and Termination", "stop using delete Application discontinue restrict access violate") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">17</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Suspension and Termination</h2>
              </div>
              <ShieldAlert className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You may stop using ProfileOS at any time by deleting the Application from your device.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We may discontinue ProfileOS, restrict access to particular features, or stop distributing particular versions of the Application when reasonably necessary for technical, legal, security, operational, or business reasons.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you violate these Terms, we may restrict access to future versions or features to the extent permitted by applicable law.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
              Because ProfileOS primarily stores information locally, discontinuation of the Application does not necessarily mean that information already stored on your device will automatically be deleted.
            </p>
          </section>
        )}

        {/* 18. Governing Law */}
        {shouldShowSection(18, "Governing Law", "jurisdiction developer operating entity legally established") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">18</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Governing Law</h2>
              </div>
              <Scale className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              These Terms will be governed by the laws applicable in the jurisdiction where the ProfileOS developer or operating entity is legally established, unless applicable law requires otherwise.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Nothing in these Terms is intended to remove or limit rights or protections that cannot legally be excluded under the laws applicable to you.
            </p>
          </section>
        )}

        {/* 19. Severability */}
        {shouldShowSection(19, "Severability", "unlawful invalid unenforceable minimum extent full force effect") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">19</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Severability</h2>
              </div>
              <FileCheck2 className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If any provision of these Terms is determined to be unlawful, invalid, or unenforceable, that provision will be interpreted or modified to the minimum extent necessary to make it enforceable, where legally permitted.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              The remaining provisions will continue in full force and effect.
            </p>
          </section>
        )}

        {/* 20. Entire Agreement */}
        {shouldShowSection(20, "Entire Agreement", "Privacy Policy legal notices agreement between you and ProfileOS") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">20</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Entire Agreement</h2>
              </div>
              <FileText className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              These Terms, together with the ProfileOS Privacy Policy and any other legal notices expressly incorporated into these Terms, constitute the agreement between you and ProfileOS regarding your use of the Application.
            </p>
          </section>
        )}

        {/* 21. Contact Information */}
        {shouldShowSection(21, "Contact Information", "support email printionupstudio@gmail.com feedback legal questions") && (
          <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-[#2563EB] font-black text-xs flex items-center justify-center">21</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">Contact Information</h2>
              </div>
              <Mail className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              If you have questions, feedback, legal concerns, or support requests regarding ProfileOS or these Terms, please contact:
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <p className="text-sm font-black text-slate-900">ProfileOS</p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                <Mail className="w-4 h-4 text-blue-600" />
                <span><strong>Support Email:</strong> <a href="mailto:printionupstudio@gmail.com" className="text-blue-600 hover:underline font-semibold">printionupstudio@gmail.com</a></span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              For privacy-related questions, please refer to the ProfileOS Privacy Policy or contact us using the address above.
            </p>
          </section>
        )}

        {/* 22. Acknowledgment */}
        {shouldShowSection(22, "Acknowledgment", "digital identity organized on your device read and understood") && (
          <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-500 text-white font-black text-xs flex items-center justify-center">22</span>
              <h2 className="text-lg sm:text-xl font-black text-white">Acknowledgment</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              By using ProfileOS, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
            </p>
            <div className="pt-2 border-t border-slate-800 text-sm sm:text-base font-bold text-blue-400">
              ProfileOS — Your digital identity, organized on your device.
            </div>
          </section>
        )}

      </div>

      {/* Footer Navigation Bar */}
      <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('privacy')}
            className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Read Privacy Policy</span>
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
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
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
                  <p className="text-xs text-slate-500">ProfileOS Terms of Service (Official Legal Copy)</p>
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

              {/* Document Text Preview Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Document Text Preview:</span>
                  <span>22 Sections</span>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-h-48 overflow-y-auto text-[11px] font-mono text-slate-700 whitespace-pre-wrap leading-relaxed select-all">
                  {FULL_TERMS_TEXT}
                </div>
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

