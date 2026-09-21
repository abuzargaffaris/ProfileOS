import React from 'react';
import { BlogPost } from '../../../types';
import {
  ShieldCheck,
  Calendar,
  Clock,
  RotateCcw,
  FileJson,
  FileText,
  Smartphone,
  HardDrive,
  Database,
  Layers,
  Info,
  AlertTriangle,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Lock,
  ArrowRight,
  Sliders,
  Share2,
  Copy
} from 'lucide-react';

interface ArticleProps {
  post: BlogPost;
  onCopyLink: () => void;
  copiedLink: boolean;
}

export const BackupAndRestoreArticle: React.FC<ArticleProps> = ({
  post,
  onCopyLink,
  copiedLink
}) => {
  const handleScrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 88;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const tocItems = [
    { id: 'automatic-protection', label: '1. Automatic Protection with Android' },
    { id: 'making-sure-included', label: '2. Making Sure ProfileOS Is Included' },
    { id: 'what-android-protects', label: '3. What Android Protects & 25MB Limit' },
    { id: 'when-data-comes-back', label: '4. When Your Data Needs to Come Back' },
    { id: 'manual-export', label: '5. A Backup You Control: Manual Export' },
    { id: 'comparison-matrix', label: '6. Two Backup Layers: Comparison Matrix' },
    { id: 'before-you-reset', label: '7. Checklist: Before You Reset Your Phone' },
    { id: 'security-and-philosophy', label: '8. Security, Encryption & Philosophy' },
  ];

  return (
    <div className="space-y-8" id="article-backup-and-restore">
      {/* QUICK NAVIGATION TABLE OF CONTENTS */}
      <section className="bg-slate-50/90 rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-3.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Bookmark className="w-4 h-4 text-blue-600" />
            <span>Table of Contents</span>
          </div>
          <span className="text-[11px] font-medium text-slate-400">Quick Navigation</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
          {tocItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScrollToSection(e, item.id)}
              className="group text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 active:bg-blue-100/70 py-1.5 px-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-transparent hover:border-blue-100/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-blue-600 group-hover:scale-125 transition-all shrink-0"></span>
              <span className="truncate">{item.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* MAIN ARTICLE BODY */}
      <article className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs text-slate-800 space-y-10 leading-relaxed">
        {/* INTRODUCTION */}
        <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-700">
          <p>
            ProfileOS is built around a foundational principle: <strong className="font-bold text-slate-900">your data should stay yours</strong>.
          </p>
          <p>
            Unlike a traditional cloud-first application that uploads every contact, note, and handle to a centralized corporate database, ProfileOS uses a <strong className="font-semibold text-slate-900">local-first architecture</strong>. Your profiles, accounts, links, spaces, settings, and other application data are stored locally on your Android device in a fast SQLite database managed by Android Jetpack Room.
          </p>
          <p>
            That gives you total control, zero latency, and guarantees that ProfileOS works without requiring your everyday data to live on an external cloud server.
          </p>
          <p>
            However, local-first also makes backup vitally important. A physical smartphone can be lost, damaged, replaced, reset, or have an application uninstalled. That is why ProfileOS works directly with Android&apos;s built-in backup system while also providing a way for you to create your own portable, unencrypted snapshot of your data at any moment.
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-blue-950 my-6">
            <p className="font-medium text-sm sm:text-base">
              There are two complementary, interlocking ways to protect your ProfileOS data:
            </p>
            <div className="mt-2.5 flex flex-col sm:flex-row gap-3 text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5 text-blue-900 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
                <RotateCcw className="w-4 h-4 text-blue-600" />
                <strong>Android Automatic Backup</strong> for background OS protection
              </span>
              <span className="inline-flex items-center gap-1.5 text-blue-900 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
                <FileJson className="w-4 h-4 text-blue-600" />
                <strong>ProfileOS Manual Export</strong> for portable snapshots you control
              </span>
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* SECTION 1: AUTOMATIC PROTECTION */}
        <section id="automatic-protection" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <RotateCcw className="w-4 h-4" />
            <span>Layer 1: Automatic System Protection</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            1. Automatic Protection with Android
          </h2>
          <p className="text-slate-600">
            Android provides a system called <strong className="font-semibold text-slate-900">Auto Backup for Apps</strong> that allows participating applications to have eligible application data backed up automatically to the user&apos;s Google account.
          </p>
          <p className="text-slate-600">
            Once Android backup is enabled on your device and ProfileOS is included in the backup, Android manages this process in the background. You don&apos;t need to remember to create a backup every time you make a change in ProfileOS.
          </p>
          <p className="text-slate-600">
            For a local-first application, this provides a vital recovery layer. Android can back up eligible data stored in the application&apos;s supported storage areas, including its <strong className="font-semibold text-slate-900">database files, shared preferences, and eligible application files</strong>. Since ProfileOS stores its structured application data locally in SQLite Room, eligible database records participate directly in this OS-level backup.
          </p>

          {/* CALLOUT: AUTOMATIC BUT NOT REAL TIME */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 mt-4 text-amber-950">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Automatic, but not real-time</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
              There is an important distinction between <strong className="font-semibold">automatic backup</strong> and <strong className="font-semibold">real-time synchronization</strong>. Android does not upload ProfileOS data every time you edit a profile or add a link. Instead, Auto Backup runs when its operational conditions are met.
            </p>
            <p className="text-xs font-semibold text-amber-900 pt-1">
              Google documents that the automatic backup process requires, among other things:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-900/90 pt-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                Backup service enabled on the phone
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                At least 24 hours elapsed since previous backup
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                The device is connected to power and idle
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                Wi-Fi connectivity (or mobile-data enabled)
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                Application data has actually changed
              </li>
            </ul>
            <p className="text-xs text-amber-900/80 pt-1 italic">
              These conditions commonly result in backups occurring around once a day (usually overnight while charging), avoiding repeated uploads of unchanged records.
            </p>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 2: CONFIGURATION */}
        <section id="making-sure-included" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Smartphone className="w-4 h-4" />
            <span>Configuration Steps</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            2. Making Sure ProfileOS Is Included
          </h2>
          <p className="text-slate-600">
            Android&apos;s backup interface varies slightly between device manufacturers (Google Pixel, Samsung One UI, Xiaomi HyperOS, OnePlus OxygenOS), but the typical navigation path is:
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs sm:text-sm flex items-center justify-between shadow-xs">
            <span className="text-blue-400 font-bold">Settings → Google → Backup</span>
            <span className="text-xs text-slate-400 font-sans hidden sm:inline">(or Settings → System → Backup)</span>
          </div>

          <p className="text-slate-600">
            After enabling backup, open <strong className="font-semibold text-slate-900">Backup details</strong> or <strong className="font-semibold text-slate-900">App data</strong>. Check the list of applications included in the backup to confirm ProfileOS is active.
          </p>
          <p className="text-slate-600">
            If your device provides a <strong className="font-semibold text-slate-800">&quot;Back up now&quot;</strong> button, you can trigger a manual backup immediately before switching devices or performing a firmware update.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 3: WHAT ANDROID PROTECTS */}
        <section id="what-android-protects" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Database className="w-4 h-4" />
            <span>Scope &amp; Storage Boundaries</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            3. What Android Protects &amp; The 25MB Limit
          </h2>
          <p className="text-slate-600">
            Android Auto Backup covers eligible data stored in supported internal application directories:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <Database className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">SQLite Database Data</p>
                <p className="text-[11px] text-slate-500">Structured tables for profiles, spaces, handles, notes, order.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <Layers className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">Shared Preferences</p>
                <p className="text-[11px] text-slate-500">Application theme, gesture mappings, and share preferences.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">Internal Files</p>
                <p className="text-[11px] text-slate-500">Platform icon metadata and custom template strings.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <HardDrive className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">No-Backup Exclusion</p>
                <p className="text-[11px] text-slate-500">Temporary caches and volatile UI state are properly excluded.</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              <span>The 25MB Per-App Free Quota</span>
            </h4>
            <p>
              Android allocates <strong className="font-semibold text-slate-900">25 megabytes of Auto Backup data per app</strong>. This storage is completely free and does <em>not</em> count against your Google Drive 15GB personal quota. Because ProfileOS is engineered cleanly in SQLite, a database containing 500+ handles and 10 custom profiles typically consumes less than 1.5MB—well beneath the 25MB ceiling.
            </p>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 4: RESTORATION */}
        <section id="when-data-comes-back" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <RotateCcw className="w-4 h-4" />
            <span>Restoration Lifecycle</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            4. When Your Data Needs to Come Back
          </h2>
          <p className="text-slate-600">
            Android automatically restores application data during two primary lifecycle events:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Scenario A: Reinstalling on Same Phone</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                If ProfileOS is uninstalled and subsequently reinstalled from the Play Store on the same device, Android checks if Auto Backup data exists for that package and restores the database files automatically upon launch.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block">Scenario B: Upgrading to a New Phone</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                During the Android Setup Wizard on a brand-new device, signing into your Google Account pulls down all registered application backups. When ProfileOS installs, your profiles, accounts, and custom space layouts appear intact.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 5: MANUAL EXPORT */}
        <section id="manual-export" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <FileJson className="w-4 h-4" />
            <span>Layer 2: User-Controlled Portability</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            5. A Backup You Control: Manual Export
          </h2>
          <p className="text-slate-600">
            While Android Auto Backup is fantastic for automated recovery, you should never have to depend on a single proprietary operating system to hold your digital identity. ProfileOS includes a complete <strong className="font-semibold text-slate-900">Manual Export engine</strong> directly accessible from the app&apos;s Settings menu.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-400">.JSON Export</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Complete Database</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full structured dump of every profile space, color theme, platform ID, encoded URL, handle string, note, and custom share token. Ideal for restoring into ProfileOS on any Android phone.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-800 text-[11px] font-mono text-slate-300">
                filename: profileos-backup-2026-09-21.json
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-400">.MD Export</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Human Readable</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cleanly formatted Markdown document with tables and categorized hyperlinks. Open in Obsidian, Notion, GitHub, or any basic text editor even without ProfileOS installed.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-800 text-[11px] font-mono text-slate-300">
                filename: profileos-profiles-2026-09-21.md
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs sm:text-sm text-blue-900 space-y-1 mt-4">
            <span className="font-bold block">How to create a manual export in ProfileOS:</span>
            <p>
              1. Open ProfileOS on your Android device → Tap <strong>Settings</strong> (gear icon).<br />
              2. Scroll down to <strong>Data &amp; Backup</strong> → Tap <strong>Export Profiles (JSON / Markdown)</strong>.<br />
              3. Choose whether to save the file locally, send via email to yourself, save to Google Drive, or transfer via USB.
            </p>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 6: COMPARISON MATRIX */}
        <section id="comparison-matrix" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Sliders className="w-4 h-4" />
            <span>Architectural Comparison</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            6. Two Backup Layers: Comparison Matrix
          </h2>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 sm:p-4">Feature</th>
                  <th className="p-3.5 sm:p-4 text-blue-700">Android Auto Backup</th>
                  <th className="p-3.5 sm:p-4 text-purple-700">Manual JSON/Markdown Export</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Trigger Mechanism</td>
                  <td className="p-3.5 sm:p-4">Automatic (idle, charging, Wi-Fi)</td>
                  <td className="p-3.5 sm:p-4">On-demand by user</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">User Effort</td>
                  <td className="p-3.5 sm:p-4 text-emerald-600 font-bold">Zero (Set once in OS)</td>
                  <td className="p-3.5 sm:p-4">Manual (Tap export button)</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Storage Location</td>
                  <td className="p-3.5 sm:p-4">Hidden Google Drive app backup</td>
                  <td className="p-3.5 sm:p-4">User-selected (Local, USB, PC, Cloud)</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Quota &amp; Storage Cost</td>
                  <td className="p-3.5 sm:p-4 text-emerald-600 font-bold">Free 25MB (Does not count against quota)</td>
                  <td className="p-3.5 sm:p-4">Standard file size (&lt; 200KB)</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Portability</td>
                  <td className="p-3.5 sm:p-4">Tied to Android + Google Account</td>
                  <td className="p-3.5 sm:p-4 text-purple-600 font-bold">Universal (Any device, OS, or tool)</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Historical Versions</td>
                  <td className="p-3.5 sm:p-4">Latest snapshot only</td>
                  <td className="p-3.5 sm:p-4">Unlimited timestamped archives</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 7: CHECKLIST BEFORE RESET */}
        <section id="before-you-reset" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Pre-Flight Routine</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            7. Checklist: Before You Reset Your Phone
          </h2>
          <p className="text-slate-600">
            If you plan to factory reset your phone, sell it, or trade it in, follow this quick 4-step checklist:
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">Export JSON to an External Storage Device</p>
                <p className="text-xs text-slate-600">Open ProfileOS Settings → Export JSON. Send it to your personal email or save it to an external USB flash drive or computer.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">Trigger &quot;Back Up Now&quot; in Android Settings</p>
                <p className="text-xs text-slate-600">Navigate to Settings → Google → Backup → tap &quot;Back up now&quot; to ensure your latest ProfileOS changes are committed to the cloud.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">Verify Screen Lock Security</p>
                <p className="text-xs text-slate-600">Ensure your phone has a PIN or pattern enabled. Android 9+ uses your device lock secret to generate client-side encryption keys for the backup.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">Restore Seamlessly on New Device</p>
                <p className="text-xs text-slate-600">When setting up your replacement phone, log in with the same Google account or use ProfileOS &quot;Restore from JSON&quot; in Settings to bring back everything in 2 seconds.</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 8: PHILOSOPHY */}
        <section id="security-and-philosophy" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Lock className="w-4 h-4" />
            <span>Security &amp; Encryption</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            8. Security, Encryption &amp; Philosophy
          </h2>
          <p className="text-slate-600">
            Because Auto Backup moves data outside the physical hardware, Android enforces stringent security protections. Google encrypts backup data in transit via TLS. On Android 9 and later, Android supports <strong className="font-semibold text-slate-900">end-to-end / client-side encryption</strong> when a secure lock screen (PIN, password, pattern) is set on the device.
          </p>
          <p className="text-slate-600">
            The encryption key is derived using your screen lock passcode and hardware-backed keystore tokens, ensuring that neither Google nor third parties can inspect your backup payload.
          </p>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4 mt-6">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>The ProfileOS Sovereign Identity Promise</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              ProfileOS was created to prove that modern mobile tools do not need to track you, sell your links, or lock you into centralized SaaS silos. By combining on-device SQLite databases with Android&apos;s native backup infrastructure and universal open-standard exports, your identity remains private, durable, and completely under your command.
            </p>
            <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <span className="text-xs font-bold text-blue-300 block">1. Local-First</span>
                <span className="text-xs text-slate-400">Keep data on-device.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <span className="text-xs font-bold text-emerald-300 block">2. Auto Backup</span>
                <span className="text-xs text-slate-400">Android OS safety net.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                <span className="text-xs font-bold text-purple-300 block">3. Manual Export</span>
                <span className="text-xs text-slate-400">Portable JSON &amp; MD.</span>
              </div>
            </div>
            <p className="text-center text-sm font-bold text-white pt-2">
              Your data stays yours. Your backup choices stay in your hands.
            </p>
          </div>
        </section>

        {/* ARTICLE FOOTER / TAGS */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 mr-1">Tags:</span>
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          <button
            onClick={onCopyLink}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied link!' : 'Copy link to article'}</span>
          </button>
        </div>
      </article>
    </div>
  );
};
