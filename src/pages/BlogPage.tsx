import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { BlogListView } from '../components/blog/BlogListView';
import { BlogPostDetail } from '../components/blog/BlogPostDetail';
import { getBlogSlugFromUrl, updateUrlForTab } from '../utils/navigation';
import { BLOG_POSTS } from '../data/blogData';

interface BlogPageProps {
  onNavigate: (tab: PageTab) => void;
  onNotify?: (text: string, type?: 'info' | 'success' | 'action') => void;
  initialSlug?: string | null;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onNotify, initialSlug }) => {
  // Start with null (all blogs overview) unless a slug is explicitly present in the URL
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => {
    return initialSlug !== undefined ? initialSlug : getBlogSlugFromUrl();
  });

  // Sync selected article with browser URL
  const handleSelectPost = (slug: string) => {
    setSelectedSlug(slug);
    updateUrlForTab('blog', false, slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document title for the individual post
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (post) {
      document.title = `${post.title} — ProfileOS Blog`;
    }
  };

  const handleBackToList = () => {
    setSelectedSlug(null);
    updateUrlForTab('blog', false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'ProfileOS Blog — Architecture, Privacy & Engineering Insights';
  };

  // Listen to popstate for back/forward browser navigation
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && typeof e.state.slug !== 'undefined') {
        setSelectedSlug(e.state.slug);
        if (e.state.slug) {
          const post = BLOG_POSTS.find(p => p.slug === e.state.slug);
          if (post) {
            document.title = `${post.title} — ProfileOS Blog`;
            return;
          }
        }
        document.title = 'ProfileOS Blog — Architecture, Privacy & Engineering Insights';
        return;
      }

      const slug = getBlogSlugFromUrl();
      setSelectedSlug(slug);
      if (slug) {
        const post = BLOG_POSTS.find(p => p.slug === slug);
        if (post) {
          document.title = `${post.title} — ProfileOS Blog`;
        }
      } else {
        document.title = 'ProfileOS Blog — Architecture, Privacy & Engineering Insights';
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="w-full bg-[#F8FAFB] min-h-screen py-8 sm:py-12" id="blog-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedSlug ? (
          <BlogPostDetail
            slug={selectedSlug}
            onBackToBlogList={handleBackToList}
            onNavigate={onNavigate}
            onNotify={onNotify}
          />
        ) : (
          <BlogListView
            onSelectPost={handleSelectPost}
            onNavigate={onNavigate}
          />
        )}
      </div>
    </div>
  );
};
