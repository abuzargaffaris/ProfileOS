import React, { useState } from 'react';
import { BlogPost, PageTab } from '../../types';
import { BLOG_POSTS } from '../../data/blogData';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  Tag,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Database,
  FileText
} from 'lucide-react';

interface BlogListViewProps {
  onSelectPost: (slug: string) => void;
  onNavigate: (tab: PageTab) => void;
}

export const BlogListView: React.FC<BlogListViewProps> = ({ onSelectPost, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  return (
    <div className="space-y-12" id="blog-list-view">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Blog &amp; Insights</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200/80">
              <BookOpen className="w-3.5 h-3.5" />
              Engineering, Privacy &amp; Architecture
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              ProfileOS Blog
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              In-depth articles on local-first engineering, on-device data sovereignty, backup mechanisms, and gesture interaction design.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles or tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
            <Tag className="w-3.5 h-3.5" />
            Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED POST BANNER (If no active search and category is 'All') */}
      {searchQuery === '' && selectedCategory === 'All' && featuredPost && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Story
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">{featuredPost.date}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-400">{featuredPost.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                {featuredPost.title}
              </h2>

              <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onSelectPost(featuredPost.slug)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer group"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Visual Architecture Box */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4 text-blue-400" />
                <span>Architecture Highlight</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">On-Device Storage</span>
                  <span className="text-emerald-400 font-bold">SQLite Room</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">OS Auto Backup</span>
                  <span className="text-blue-400 font-bold">Encrypted 25MB</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">User Portable File</span>
                  <span className="text-purple-400 font-bold">JSON / Markdown</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-[11px] text-blue-200">
                💡 Zero telemetry. No profile uploads to external cloud servers.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ALL ARTICLES GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`} ({filteredPosts.length})
          </h2>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">No articles found</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                No articles matched &quot;{searchQuery}&quot;. Try searching for another keyword or selecting a different category.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map(post => (
              <article
                key={post.slug}
                onClick={() => onSelectPost(post.slug)}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex flex-col justify-between group space-y-5"
              >
                <div className="space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-[11px] text-slate-400 font-semibold">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    By {post.author}
                  </span>
                  <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
