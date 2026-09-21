import React, { useState } from 'react';
import { PageTab } from '../../types';
import { BLOG_POSTS } from '../../data/blogData';
import { PLAY_STORE_URL } from '../../utils/navigation';
import { GooglePlayIcon } from '../SocialIcons';
import {
  ShieldCheck,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  ChevronRight,
  Database,
  Smartphone,
  HardDrive,
  Lock,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  AlertTriangle,
  Info,
  Layers,
  FileJson,
  FileText,
  RotateCcw,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface BlogPostDetailProps {
  slug: string;
  onBackToBlogList: () => void;
  onNavigate: (tab: PageTab) => void;
  onNotify?: (text: string, type?: 'info' | 'success' | 'action') => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({
  slug,
  onBackToBlogList,
  onNavigate,
  onNotify
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];

  const handleCopyLink = () => {
    try {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      if (onNotify) {
        onNotify('Article link copied to clipboard!', 'success');
      }
      setTimeout(() => setCopiedLink(false), 2400);
    } catch {
      if (onNotify) {
        onNotify('Unable to copy link', 'info');
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-10" id={`blog-post-${post.slug}`}>
      {/* BREADCRUMBS & BACK BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={onBackToBlogList}
            className="hover:text-blue-600 transition-colors cursor-pointer text-slate-700 font-bold"
          >
            All Articles
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-600 truncate max-w-[200px] sm:max-w-none">{post.title}</span>
        </nav>

        <button
          onClick={onBackToBlogList}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-blue-600 hover:border-blue-200 shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </button>
      </div>

      {/* ARTICLE HERO HEADER */}
      <header className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            {post.category}
          </span>
          <span className="text-xs font-semibold text-slate-400">•</span>
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {post.date}
          </span>
          <span className="text-xs font-semibold text-slate-400">•</span>
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {post.subtitle}
        </p>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              PU
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{post.author}</p>
              <p className="text-xs text-slate-500">{post.authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Copy article link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100/80 border border-blue-200/60 text-xs font-semibold transition-colors cursor-pointer"
              title="Share article"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* ARTICLE SPECIFIC CONTENT */}
      {post.slug === 'backup-and-restore' ? (
        <>
          {/* QUICK NAVIGATION TABLE OF CONTENTS */}
          <section className="bg-slate-50/80 rounded-2xl border border-slate-200/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Bookmark className="w-4 h-4 text-blue-600" />
              <span>Table of Contents</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <a href="#automatic-protection" className="text-slate-600 hover:text-blue-600 transition-colors py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Automatic Protection with Android
              </a>
              <a href="#making-sure-included" className="text-slate-600 hover:text-blue-600 transition-colors py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Making Sure ProfileOS Is Included
              </a>
              <a href="#what-android-protects" className="text-slate-600 hover:text-blue-600 transition-colors py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                What Android Protects &amp; 25MB Limit
              </a>
              <a href="#when-data-comes-back" className="text-slate-600 hover:text-blue-600 transition-colors py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                When Your Data Needs to Come Back
              </a>
              <a href="#manual-export" className="text-slate-600 hover:text-blue-600 transition-colors py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                A Backup You Control: Manual Export
              </a>
              <a href="#comparison-matrix" className="text-slate-600 hover:text-blue-600 transition-colors py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Two Backup Layers: Comparison Matrix
              </a>
              <a href="#before-you-reset" className="text-slate-600 hover:text-blue-600 transition-colors py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Checklist: Before You Reset Your Phone
              </a>
              <a href="#security-and-philosophy" className="text-slate-600 hover:text-blue-600 transition-colors py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Security, Encryption &amp; Philosophy
              </a>
            </div>
          </section>

          {/* MAIN BLOG CONTENT BODY */}
          <article className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs text-slate-800 space-y-10 leading-relaxed">
            {/* INTRODUCTION */}
            <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-700">
              <p>
                ProfileOS is built around a simple principle: <strong className="font-bold text-slate-900">your data should stay yours</strong>.
              </p>
              <p>
                Unlike a traditional cloud-first application, ProfileOS uses a <strong className="font-semibold text-slate-900">local-first architecture</strong>. Your profiles, accounts, links, spaces, settings, and other application data are stored locally on your Android device.
              </p>
              <p>
                That gives you more control and allows ProfileOS to work without requiring your everyday data to live on a ProfileOS cloud server.
              </p>
              <p>
                But local-first also makes backup important.
              </p>
              <p>
                A phone can be lost, damaged, replaced, reset, or have an application removed. That&apos;s why ProfileOS works with Android&apos;s built-in backup system while also providing a way for you to create your own portable copy of your data.
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-blue-950 my-6">
                <p className="font-medium text-sm sm:text-base">
                  There are therefore two complementary ways to protect your ProfileOS data:
                </p>
                <div className="mt-2.5 flex flex-col sm:flex-row gap-3 text-sm font-semibold">
                  <span className="inline-flex items-center gap-1.5 text-blue-900 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
                    <RotateCcw className="w-4 h-4 text-blue-600" />
                    <strong>Android Automatic Backup</strong> for background protection
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-blue-900 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs">
                    <FileJson className="w-4 h-4 text-blue-600" />
                    <strong>ProfileOS Manual Export</strong> for a backup that you control
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
                Automatic Protection with Android
              </h2>
              <p className="text-slate-600">
                Android provides a system called <strong className="font-semibold text-slate-900">Auto Backup for Apps</strong> that allows participating applications to have eligible application data backed up automatically.
              </p>
              <p className="text-slate-600">
                Once Android backup is enabled on your device and ProfileOS is included in the backup, Android manages this process in the background. You don&apos;t need to remember to create a backup every time you make a change in ProfileOS.
              </p>
              <p className="text-slate-600">
                For a local-first application, this provides an important recovery layer.
              </p>
              <p className="text-slate-600">
                Android can back up eligible data stored in the application&apos;s supported storage areas, including its <strong className="font-semibold text-slate-900">database files, shared preferences, and eligible application files</strong>. Since ProfileOS stores its structured application data locally in SQLite, eligible database data can participate in this backup.
              </p>
              <p className="text-slate-600">
                The backup is handled by Android rather than by a separate ProfileOS cloud-sync service.
              </p>

              {/* CALLOUT: AUTOMATIC BUT NOT REAL TIME */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2 mt-4 text-amber-950">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Automatic, but not real-time</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                  There is an important distinction between <strong className="font-semibold">automatic backup</strong> and <strong className="font-semibold">real-time synchronization</strong>. Android does not upload ProfileOS data every time you edit a profile or add a link. Instead, Auto Backup runs when its conditions are satisfied.
                </p>
                <p className="text-xs font-semibold text-amber-900 pt-1">
                  Google documents that the automatic backup process requires, among other things:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-900/90 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    Backup to be enabled
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    At least 24 hours since previous backup
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    The device to be idle
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    Wi-Fi connectivity (or mobile-data backup)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    The application&apos;s data to have changed
                  </li>
                </ul>
                <p className="text-xs text-amber-900/80 pt-1 italic">
                  These conditions commonly result in backups occurring around once a day, but Android does not promise a particular time. Android also avoids repeatedly backing up unchanged application data. So Auto Backup is best understood as automatic periodic protection, not a live copy of your data.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* SECTION 2: MAKING SURE PROFILEOS IS INCLUDED */}
            <section id="making-sure-included" className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Smartphone className="w-4 h-4" />
                <span>Configuration Steps</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Making Sure ProfileOS Is Included
              </h2>
              <p className="text-slate-600">
                Android&apos;s backup interface varies between manufacturers and Android versions, but the usual starting point is:
              </p>

              <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-sm sm:text-base flex items-center justify-between shadow-xs">
                <span className="text-blue-400 font-bold">Settings → Google → Backup</span>
                <span className="text-xs text-slate-400 font-sans hidden sm:inline">(or Settings → System → Backup)</span>
              </div>

              <p className="text-slate-600">
                After enabling backup, open <strong className="font-semibold text-slate-900">Backup details</strong>, <strong className="font-semibold text-slate-900">Manage backup</strong>, or the equivalent section provided by your device. Review the applications and data included in the backup.
              </p>
              <p className="text-slate-600">
                If your device provides individual app controls, make sure <strong className="font-semibold text-slate-900">ProfileOS</strong> is included.
              </p>
              <p className="text-slate-600 text-xs sm:text-sm text-slate-500">
                Some Android versions do not provide exactly the same app-selection interface, so the wording and available controls may differ. If your device provides <strong className="font-semibold text-slate-700">Back up now</strong>, you can also use it to request a backup instead of waiting for the next automatic cycle.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* SECTION 3: WHAT ANDROID PROTECTS & STORAGE */}
            <section id="what-android-protects" className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Database className="w-4 h-4" />
                <span>Scope &amp; Storage Boundaries</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                What Android Protects
              </h2>
              <p className="text-slate-600">
                Android&apos;s default Auto Backup system covers eligible data stored in supported application locations. For ProfileOS, this can include the application&apos;s locally stored:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <Database className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">SQLite Database Data</p>
                    <p className="text-[11px] text-slate-500">Structured tables for profiles, spaces, handles, notes.</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Shared Preferences</p>
                    <p className="text-[11px] text-slate-500">Application settings, custom tokens, and preferences.</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Internal Application Files</p>
                    <p className="text-[11px] text-slate-500">Internal files managed locally by the operating system.</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                  <HardDrive className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Eligible App-Specific Files</p>
                    <p className="text-[11px] text-slate-500">Supported external application data locations.</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm">
                Android does not simply copy every file associated with an application. Temporary data is treated differently. <strong className="font-semibold text-slate-900">Cache files, code-cache files, and files placed in the application&apos;s no-backup directory are excluded by default.</strong> This is useful for things such as cached web images and temporary files because those resources can generally be recreated instead of becoming part of your permanent backup.
              </p>

              {/* WHERE ANDROID STORES BACKUP */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Where Android Stores the Backup</h3>
                <p className="text-slate-600 text-sm">
                  Android Auto Backup is different from manually uploading a file to Google Drive. The backed-up application data is stored in a <strong className="font-semibold text-slate-900">private backup area associated with the user&apos;s Google Drive account</strong>. It is managed by Android&apos;s backup infrastructure rather than appearing as a normal folder or file in the user&apos;s Drive storage.
                </p>
                <div className="p-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono inline-block">
                  You won&apos;t normally find a file like: ProfileOS-backup.json inside your regular Google Drive files.
                </div>
                <p className="text-slate-600 text-xs sm:text-sm">
                  This separation also means the backup is not something you accidentally rename, move, or modify while organizing ordinary Drive documents.
                </p>
              </div>

              {/* THE 25 MB LIMIT */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  The 25 MB Limit
                </h3>
                <p className="text-slate-600 text-sm">
                  Android provides up to <strong className="font-semibold text-slate-900">25 MB of Auto Backup data per app user</strong>. This backup storage does <strong className="font-semibold text-slate-900">not count toward the user&apos;s normal personal Google Drive storage quota</strong>.
                </p>
                <p className="text-slate-600 text-xs sm:text-sm">
                  That is different from a manual ProfileOS export. If you save a JSON or Markdown export to Google Drive yourself, that file is an ordinary Drive file and uses your normal Drive storage. If an application&apos;s eligible backup data exceeds the limit, Android skips the cloud backup rather than deleting the application&apos;s local data.
                </p>
              </div>

              {/* BACKUP IS NOT VERSION HISTORY */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Backup Is Not Version History</h3>
                <p className="text-slate-600 text-sm">
                  Android Auto Backup is designed primarily for recovery, not for maintaining an unlimited history of previous application states. For a given backup dataset, Android keeps the <strong className="font-semibold text-slate-900">most recent backup</strong>. When a new backup is created, the previous backup is replaced.
                </p>
                <p className="text-slate-600 text-xs sm:text-sm">
                  If you want to keep several historical copies of your ProfileOS data—for example, exports from different dates—that is better handled with ProfileOS Manual Export.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* SECTION 4: WHEN YOUR DATA NEEDS TO COME BACK */}
            <section id="when-data-comes-back" className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <RotateCcw className="w-4 h-4" />
                <span>Lifecycle &amp; Recovery Workflow</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                When Your Data Needs to Come Back
              </h2>
              <p className="text-slate-600">
                The value of a backup is ultimately measured by what happens during recovery. Android&apos;s restore process is closely connected to <strong className="font-semibold text-slate-900">application installation and device setup</strong>.
              </p>
              <p className="text-slate-600">
                When setting up a new Android device, Android may present available backup datasets for you to choose from. Once ProfileOS is installed, Android can restore its eligible backed-up application data <strong className="font-semibold text-slate-900">before ProfileOS becomes available to launch</strong>. That means the restoration happens before you open the app for the first time.
              </p>

              {/* RECOVERY FLOW VISUAL PIPELINE */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border border-blue-200/70 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  The Android Automatic Restoration Sequence
                </p>
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 text-xs font-semibold">
                  <div className="p-3 bg-white rounded-xl border border-blue-200 text-center shadow-2xs">
                    <Smartphone className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <span>1. New Android device</span>
                  </div>
                  <div className="hidden md:block text-slate-400">→</div>
                  <div className="p-3 bg-white rounded-xl border border-blue-200 text-center shadow-2xs">
                    <RotateCcw className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                    <span>2. Select backup</span>
                  </div>
                  <div className="hidden md:block text-slate-400">→</div>
                  <div className="p-3 bg-white rounded-xl border border-blue-200 text-center shadow-2xs">
                    <Database className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                    <span>3. Install ProfileOS</span>
                  </div>
                  <div className="hidden md:block text-slate-400">→</div>
                  <div className="p-3 bg-white rounded-xl border border-blue-200 text-center shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                    <span>4. Restore DB data</span>
                  </div>
                  <div className="hidden md:block text-slate-400">→</div>
                  <div className="p-3 bg-white rounded-xl border border-blue-200 text-center shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                    <span>5. Open App Ready</span>
                  </div>
                </div>
              </div>

              {/* CLEARING DATA IS DIFFERENT WARNING */}
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-rose-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Clearing Data Is Different</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-900/90 leading-relaxed">
                  There is an important difference between <strong className="font-semibold">restoring an app</strong> and <strong className="font-semibold">clearing its local data</strong>. Using Android&apos;s <strong className="font-semibold">Clear data</strong> option removes ProfileOS&apos;s local application data. It is not an instruction to immediately download an Android Auto Backup copy.
                </p>
                <p className="text-xs text-rose-900/80">
                  Native Auto Backup is an operating-system recovery mechanism rather than an on-demand restore button inside ProfileOS. For that reason, if you are intentionally clearing ProfileOS data or performing another destructive operation, a manual export is the safer way to create a copy that you can directly control.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* SECTION 5: PROFILEOS MANUAL EXPORT */}
            <section id="manual-export" className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <FileJson className="w-4 h-4" />
                <span>Layer 2: User-Controlled Snapshots</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                A Backup You Control: ProfileOS Manual Export
              </h2>
              <p className="text-slate-600">
                Automatic Android Backup is designed to work quietly in the background. Sometimes, however, you want something more tangible: <strong className="font-semibold text-slate-900">an actual file containing your ProfileOS data that you choose when and where to save</strong>. That&apos;s the purpose of ProfileOS Manual Export.
              </p>
              <p className="text-slate-600">
                Depending on the current ProfileOS version, supported export formats can include <strong className="font-semibold text-slate-900">JSON, Markdown, and other supported formats</strong>. Unlike Android Auto Backup, a manual export is a normal file. You can choose where to store it, keep multiple copies, move it between storage locations, and maintain your own archive.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/60 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                    <FileJson className="w-4 h-4" />
                    <span>JSON for structured data</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    JSON provides a structured, machine-readable representation of your exported data. It is useful when the data needs to be processed by software or maintained as a structured archive.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                    <FileText className="w-4 h-4" />
                    <span>Markdown for readability</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Markdown provides a more human-readable representation of your information. It is useful when you want an archive that can easily be opened and read with a text or Markdown editor.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 text-center font-bold text-xs sm:text-sm text-slate-800">
                In simple terms: <span className="text-blue-600 font-black">JSON is structured.</span> <span className="text-emerald-600 font-black">Markdown is readable.</span>
              </div>

              <div className="pt-3 space-y-2">
                <h3 className="text-base font-bold text-slate-900">When a Manual Export Is Especially Useful</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A manual export is particularly valuable before a major change to your device or application data. For example, before a <strong className="font-semibold text-slate-900">factory reset</strong>, create a fresh ProfileOS export and save it somewhere outside the phone. The same approach is useful when moving to a new device, before uninstalling ProfileOS, or whenever you want to preserve a historical snapshot of your data.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 italic">
                  The key advantage is control: you decide when the snapshot exists and how long you keep it.
                </p>
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* SECTION 6: COMPARISON MATRIX */}
            <section id="comparison-matrix" className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <Layers className="w-4 h-4" />
                <span>Comparative Reference Matrix</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Two Backup Layers, Two Different Purposes
              </h2>
              <p className="text-slate-600 text-sm">
                Android Automatic Backup and ProfileOS Manual Export are not competing systems. They solve different problems:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="py-3 px-4 w-1/3">Feature</th>
                      <th className="py-3 px-4 w-1/3 text-blue-800 bg-blue-50/80">Android Automatic Backup</th>
                      <th className="py-3 px-4 w-1/3 text-slate-800">ProfileOS Manual Export</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Main purpose</td>
                      <td className="py-3 px-4 bg-blue-50/30 text-blue-900">Automatic recovery</td>
                      <td className="py-3 px-4">User-controlled backup</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Runs automatically</td>
                      <td className="py-3 px-4 bg-blue-50/30 text-emerald-700 font-bold">Yes</td>
                      <td className="py-3 px-4 text-slate-500">No</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Creates a normal file</td>
                      <td className="py-3 px-4 bg-blue-50/30 text-slate-500">No</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Yes</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Storage location</td>
                      <td className="py-3 px-4 bg-blue-50/30 text-blue-900">Android-managed backup storage</td>
                      <td className="py-3 px-4">Chosen by the user</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Historical copies</td>
                      <td className="py-3 px-4 bg-blue-50/30 text-slate-500">Not designed for this</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Yes</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">JSON / Markdown</td>
                      <td className="py-3 px-4 bg-blue-50/30 text-slate-500">No</td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">Supported formats*</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Android restore</td>
                      <td className="py-3 px-4 bg-blue-50/30 text-emerald-700 font-bold">Yes</td>
                      <td className="py-3 px-4 text-slate-500">Depends on ProfileOS import</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Real-time sync</td>
                      <td className="py-3 px-4 bg-blue-50/30 text-slate-500">No</td>
                      <td className="py-3 px-4 text-slate-500">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * Available export formats depend on the current ProfileOS version.
              </p>
              <p className="text-slate-700 text-sm font-medium pt-2">
                The practical approach is to use <strong className="font-bold text-slate-900">both</strong>: Android Automatic Backup provides a convenient background safety net, while ProfileOS Manual Export gives you an independent copy that you control.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* SECTION 7: CHECKLIST BEFORE RESET */}
            <section id="before-you-reset" className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Practical Advice</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Before You Reset or Replace Your Phone
              </h2>
              <p className="text-slate-600 text-sm">
                A few simple steps can make a major difference before a factory reset or device replacement:
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                    <span>First, check Android Backup</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed">
                    Go to <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800">Settings → Google → Backup</code> and confirm that backup is enabled. Review <strong className="font-semibold text-slate-800">Backup details</strong> or <strong className="font-semibold text-slate-800">Manage backup</strong> and verify that ProfileOS is included where your device provides app-level backup information. If <strong className="font-semibold text-slate-800">Back up now</strong> is available, you can use it.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                    <span>Then create a ProfileOS export</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed">
                    Open ProfileOS, create a manual export in a supported format (JSON or Markdown), and save the file somewhere outside the phone. Make sure the saved file is accessible before you erase the device.
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium pt-1">
                This gives you both an Android-managed backup and a separate copy under your direct control.
              </p>
            </section>

            <hr className="border-slate-100" />

            {/* SECTION 8: SECURITY & PHILOSOPHY */}
            <section id="security-and-philosophy" className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                  <Lock className="w-4 h-4" />
                  <span>Confidentiality &amp; Encryption</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Security and Privacy
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Because Auto Backup stores application data outside the physical device, Android provides security protections for the backup system.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Google states that backup data is <strong className="font-semibold text-slate-900">encrypted in transit</strong>.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  On Android 9 and later, Android supports <strong className="font-semibold text-slate-900">end-to-end/client-side encryption</strong> for backup when the applicable requirements are met, including the use of a secure device screen lock such as a PIN, pattern, or password.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  The exact encryption protection therefore depends on the Android version and the security configuration of the device. Using a secure screen lock is an important part of protecting your backed-up data.
                </div>
              </div>

              {/* THE PHILOSOPHY CONCLUSION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>The ProfileOS Backup Philosophy</span>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  ProfileOS is designed around keeping your everyday data local rather than requiring a ProfileOS cloud service. Android adds an automatic recovery layer without turning ProfileOS into a real-time cloud-synchronization application. And Manual Export gives you an additional option when you want a copy that you can directly manage yourself.
                </p>
                <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                    <span className="text-xs font-bold text-blue-300 block">1. Local-First</span>
                    <span className="text-xs text-slate-400">Keep your data local.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                    <span className="text-xs font-bold text-emerald-300 block">2. Auto Backup</span>
                    <span className="text-xs text-slate-400">Let Android provide safety.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60">
                    <span className="text-xs font-bold text-purple-300 block">3. Manual Export</span>
                    <span className="text-xs text-slate-400">Create snapshots as needed.</span>
                  </div>
                </div>
                <div className="pt-3 text-center">
                  <p className="text-base sm:text-lg font-black text-white">
                    Your data stays yours. Your backup choices stay in your hands.
                  </p>
                </div>
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
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy link to article</span>
              </button>
            </div>
          </article>
        </>
      ) : (
        /* GENERIC POST BODY FOR OTHER POSTS */
        <article className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs text-slate-800 space-y-8 leading-relaxed">
          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-700">
            <p className="font-medium text-slate-900 text-xl">
              {post.subtitle}
            </p>
            <p>
              {post.excerpt}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200/70 space-y-3">
            <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Core Principle: Zero Telemetry &amp; Full User Control</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Every design decision in ProfileOS is grounded in local-first independence. From our gesture recognition algorithms running at 60fps with zero battery penalty, to our schema-free JSON/Markdown exports, we ensure your identity remains permanently decentralized.
            </p>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-700">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Highlights &amp; Takeaways
            </h2>
            <ul className="space-y-2 list-disc list-inside text-slate-600">
              <li>Profiles and links remain in SQLite on your physical device at all times.</li>
              <li>No analytical trackers, telemetry pings, or background data collection.</li>
              <li>Compatible with all modern Android backup and manual export specifications.</li>
              <li>Instant 229+ platform resolution without needing external web calls.</li>
            </ul>
          </div>

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
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy link to article</span>
            </button>
          </div>
        </article>
      )}

      {/* BOTTOM CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black">Experience Local-First Digital Identity</h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md">
            Download ProfileOS on Android today and keep your 229+ social profiles, spaces, and handles safely stored in your pocket with zero cloud tracking.
          </p>
        </div>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-black text-xs sm:text-sm flex items-center gap-2 shadow-sm hover:shadow-md transition-all shrink-0 cursor-pointer"
        >
          <GooglePlayIcon className="w-4 h-4 shrink-0" />
          <span>Get on Google Play</span>
          <ArrowUpRight className="w-4 h-4 text-slate-500" />
        </a>
      </section>
    </div>
  );
};
