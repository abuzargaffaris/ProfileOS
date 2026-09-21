import React, { useState } from 'react';
import { PageTab } from '../../types';
import { BLOG_POSTS } from '../../data/blogData';
import { PLAY_STORE_URL } from '../../utils/navigation';
import { GooglePlayIcon } from '../SocialIcons';
import { BackupAndRestoreArticle } from './articles/BackupAndRestoreArticle';
import { LocalFirstArticle } from './articles/LocalFirstArticle';
import { GestureSharingArticle } from './articles/GestureSharingArticle';
import { PortableIdentityArticle } from './articles/PortableIdentityArticle';
import {
  ShieldCheck,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  ChevronRight,
  ArrowLeft,
  ArrowUpRight,
  Sparkles
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

  // Render article content based on post slug
  const renderArticleContent = () => {
    switch (post.slug) {
      case 'backup-and-restore':
        return (
          <BackupAndRestoreArticle
            post={post}
            onCopyLink={handleCopyLink}
            copiedLink={copiedLink}
          />
        );
      case 'local-first-vs-cloud-profiles':
        return (
          <LocalFirstArticle
            post={post}
            onCopyLink={handleCopyLink}
            copiedLink={copiedLink}
          />
        );
      case 'anatomy-of-a-gesture-speed-profile-sharing':
        return (
          <GestureSharingArticle
            post={post}
            onCopyLink={handleCopyLink}
            copiedLink={copiedLink}
          />
        );
      case 'portable-identity-json-markdown-standard':
        return (
          <PortableIdentityArticle
            post={post}
            onCopyLink={handleCopyLink}
            copiedLink={copiedLink}
          />
        );
      default:
        return (
          <BackupAndRestoreArticle
            post={post}
            onCopyLink={handleCopyLink}
            copiedLink={copiedLink}
          />
        );
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

      {/* ARTICLE BODY */}
      {renderArticleContent()}

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
