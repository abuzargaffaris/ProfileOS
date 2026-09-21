import React from 'react';
import { BlogPost } from '../../../types';
import {
  ShieldCheck,
  Calendar,
  Clock,
  Zap,
  Sliders,
  QrCode,
  Copy,
  Share2,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Layers,
  ArrowRight,
  Smartphone,
  Check,
  MousePointerClick
} from 'lucide-react';

interface ArticleProps {
  post: BlogPost;
  onCopyLink: () => void;
  copiedLink: boolean;
}

export const GestureSharingArticle: React.FC<ArticleProps> = ({
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
    { id: 'networking-friction', label: '1. The 30-Second Friction in Modern Networking' },
    { id: 'four-directional-gestures', label: '2. The 4-Directional Gesture System' },
    { id: 'haptics-and-physics', label: '3. Physics, Velocity & Haptic Confirmation' },
    { id: 'on-demand-qr', label: '4. The On-Demand Optical QR Matrix' },
    { id: 'smart-share-templates', label: '5. Dynamic Share Templates & Token Substitution' },
    { id: 'spaces-workflow', label: '6. Context Switching: Personal vs Professional Spaces' },
    { id: 'real-world-playbook', label: '7. The Networking Playbook: 3 Real Scenarios' },
    { id: 'conclusion', label: '8. Speed as a Design Superpower' },
  ];

  return (
    <div className="space-y-8" id="article-gesture-sharing">
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
            You are at a bustling developer summit, design conference, or venture capital mixer. You strike up an engaging conversation with someone you want to collaborate with. Then comes the inevitable moment:
          </p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 italic border-l-4 border-blue-600 pl-4 py-1">
            &quot;What&apos;s the best way to connect with you?&quot;
          </p>
          <p>
            In most cases, what follows is 30 to 45 seconds of painful technological friction. You unlock your phone, search for LinkedIn or X, wait for the network to load, find your profile QR code, or spell out your username character-by-character while ambient room noise drowns you out.
          </p>
          <p>
            We built <strong className="font-semibold text-slate-900">ProfileOS</strong> to compress that exchange down to <strong className="font-bold text-slate-900">under two seconds</strong>. By designing a dedicated 4-directional gesture system combined with instant on-device QR generation and dynamic share templates, ProfileOS turns your phone into an instrument of effortless connection.
          </p>
        </div>

        <hr className="border-slate-100" />

        {/* SECTION 1: THE 30-SECOND FRICTION */}
        <section id="networking-friction" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Zap className="w-4 h-4" />
            <span>The Problem</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            1. The 30-Second Friction in Modern Networking
          </h2>
          <p className="text-slate-600">
            Why is sharing a profile handle so slow on modern mobile operating systems? Because modern smartphones are general-purpose computers, not optimized contact instruments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 space-y-1.5 text-rose-950">
              <span className="font-bold text-xs uppercase tracking-wider text-rose-800 block">Fragmented Apps</span>
              <p className="text-xs text-rose-900/80">Your GitHub is in one app, your LinkedIn in another, your Portfolio in Chrome bookmarks, and your Telegram in a third.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1.5 text-amber-950">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-800 block">Spelling Errors</span>
              <p className="text-xs text-amber-900/80">Underscores, double letters, and numbers are frequently misheard in loud conference environments, leading to lost contacts.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-1.5 text-slate-800">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700 block">Network Drops</span>
              <p className="text-xs text-slate-600">Heavy convention center Wi-Fi traffic blocks standard link-in-bio web pages from rendering quickly.</p>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm">
            To solve this, ProfileOS treats every handle as a prime gesture target that requires zero typing and zero server dependencies.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 2: 4-DIRECTIONAL GESTURES */}
        <section id="four-directional-gestures" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Sliders className="w-4 h-4" />
            <span>Interaction Design</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            2. The 4-Directional Gesture System
          </h2>
          <p className="text-slate-600">
            Every platform card in ProfileOS supports intuitive multi-touch interactions. Rather than hiding actions behind nested three-dot overflow menus, ProfileOS maps the four primary physical gestures directly to common networking intentions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="p-5 rounded-2xl bg-white border-2 border-blue-500/30 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                  👉 Swipe Right
                </span>
                <Copy className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Instant Clipboard Copy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Swiping a card to the right immediately copies either the raw handle (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 text-[11px]">@username</code>) or the full normalized URL (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 text-[11px]">https://github.com/username</code>) directly into Android&apos;s clipboard, accompanied by a sharp haptic pulse.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-indigo-500/30 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                  👈 Swipe Left
                </span>
                <Share2 className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Smart Share Template</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Swiping left launches the Smart Share sheet. Instead of sharing a bare URL, ProfileOS populates a polished text card with platform branding, formatted links, and your custom bio message ready to send via WhatsApp, Signal, or Email.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500/30 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  👆 Swipe Up / Double-Tap
                </span>
                <QrCode className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Instant Optical QR Presenter</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Double-tapping or swiping up immediately expands a full-screen, high-contrast QR code modal. The device screen temporarily boosts brightness so the other person&apos;s camera can capture it in under 0.5 seconds.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-purple-500/30 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                  👇 Long-Press / Tap
                </span>
                <MousePointerClick className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Direct App Launch / Deep Link</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tapping the card launches the native target application installed on your device (e.g. opens the official X, LinkedIn, or YouTube app directly to your profile) or falls back to your default browser.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 3: HAPTICS & PHYSICS */}
        <section id="haptics-and-physics" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Smartphone className="w-4 h-4" />
            <span>Feedback Engineering</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            3. Physics, Velocity &amp; Haptic Confirmation
          </h2>
          <p className="text-slate-600">
            A gesture without tactile feedback feels disconnected. In ProfileOS, every swipe gesture uses a spring-physics interpolator calibrated for natural finger travel:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li><strong className="text-slate-900">Threshold Trigger at 72dp:</strong> Prevents accidental swipes during vertical list scrolling while ensuring intentional swipes register effortlessly.</li>
            <li><strong className="text-slate-900">15ms Transient Haptic Tick:</strong> Uses Android&apos;s <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">VibrationEffect.EFFECT_CLICK</code> to produce a crisp tactile response at the exact moment the threshold is crossed. You know the handle was copied without even looking at your screen.</li>
            <li><strong className="text-slate-900">Visual Reveal Layer:</strong> The underlying action icon (Copy, Share, QR) scales proportionally with swipe displacement, providing clear peripheral cues.</li>
          </ul>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 4: ON-DEMAND QR MATRIX */}
        <section id="on-demand-qr" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <QrCode className="w-4 h-4" />
            <span>Optical Engineering</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            4. The On-Demand Optical QR Matrix
          </h2>
          <p className="text-slate-600">
            Optical scanning is the fastest cross-platform bridge between an Android phone and an iPhone. ProfileOS features an embedded on-device QR matrix generator:
          </p>

          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Key Optical Optimization Parameters:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="font-bold text-white block mb-0.5">Error Correction Level M (15%)</span>
                <span className="text-slate-300">Allows embedding the platform logo in the center without hindering camera decode performance.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="font-bold text-white block mb-0.5">Adaptive Screen Brightness</span>
                <span className="text-slate-300">Temporarily maximizes screen luminance while modal is open, ensuring clean capture under harsh conference lighting.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="font-bold text-white block mb-0.5">High-Contrast White Padding</span>
                <span className="text-slate-300">Enforces a 4-module quiet zone margin to prevent ambient dark-mode backgrounds from bleeding into scan lines.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <span className="font-bold text-white block mb-0.5">Zero Network Delay</span>
                <span className="text-slate-300">Rendered in &lt; 5ms locally using vector canvas primitives with zero external web requests.</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 5: SMART SHARE TEMPLATES */}
        <section id="smart-share-templates" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Share2 className="w-4 h-4" />
            <span>Message Formatting</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            5. Dynamic Share Templates &amp; Token Substitution
          </h2>
          <p className="text-slate-600">
            When you send a link in a messaging app, context matters. Sending a raw URL looks robotic, but typing a custom greeting every time is tedious.
          </p>
          <p className="text-slate-600">
            ProfileOS Smart Share Templates allow you to define standardized tokenized templates:
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2">
            <div className="text-slate-500 font-sans font-bold text-[11px] uppercase tracking-wider">Example Template String:</div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-800">
              Great meeting you! Here is my {'{platform}'}: {'{url}'} (Handle: {'{handle}'})
            </div>
            <div className="text-slate-500 font-sans font-bold text-[11px] uppercase tracking-wider pt-2">Evaluated Clipboard Output:</div>
            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-sans">
              Great meeting you! Here is my GitHub: https://github.com/abuzargaffaris (Handle: @abuzargaffaris)
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 6: SPACES WORKFLOW */}
        <section id="spaces-workflow" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Layers className="w-4 h-4" />
            <span>Identity Segregation</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            6. Context Switching: Personal vs Professional Spaces
          </h2>
          <p className="text-slate-600">
            Your personal digital identity should never be accidentally broadcast in a professional environment. ProfileOS introduces <strong className="font-semibold text-slate-900">Spaces</strong>—independent profile containers with dedicated handle collections:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-blue-600 block">💼 Work / Corporate</span>
              <p className="text-slate-600">LinkedIn, Professional Email, Corporate GitHub, Portfolio website.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-purple-600 block">🎨 Creator / Studio</span>
              <p className="text-slate-600">PrintionUp Studio, YouTube, Behance, Dribbble, Gumroad shop.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-emerald-600 block">👤 Personal / Social</span>
              <p className="text-slate-600">Instagram, Spotify, Signal, WhatsApp, personal blog.</p>
            </div>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm">
            Switching spaces is a single tap at the top of the screen. You instantly switch context without ever re-sorting or filtering individual accounts.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 7: PLAYBOOK */}
        <section id="real-world-playbook" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Sparkles className="w-4 h-4" />
            <span>Actionable Playbook</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            7. The Networking Playbook: 3 Real Scenarios
          </h2>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Scenario 1: The Elevator Pitch (2 Seconds)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                You meet someone on the convention escalator. Unlock phone → Double tap your LinkedIn card → Present QR code. They scan it with their camera and your profile opens instantly in their browser. Total time: 1.8 seconds.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Scenario 2: The Hackathon Team Assembly</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connecting with a developer squad. Switch to &quot;Dev Space&quot; → Swipe right on GitHub (copied) → Paste into Discord channel → Swipe left on Telegram → Send direct invite. No mistyped usernames.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">Scenario 3: The Privacy-Sensitive Interaction</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Meeting an acquaintance where you only want to share a temporary or secondary handle. Switch to &quot;Social Space&quot; with Privacy Shield enabled. Sensitive phone numbers or corporate emails remain masked and hidden.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 8: CONCLUSION */}
        <section id="conclusion" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <CheckCircle2 className="w-4 h-4" />
            <span>Conclusion</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            8. Speed as a Design Superpower
          </h2>
          <p className="text-slate-600">
            Speed is not just an efficiency metric; it changes human behavior. When sharing your identity is frictionless, you connect more often, follow up more consistently, and project effortless professional polish.
          </p>
          <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950">
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              ProfileOS proves that a mobile identity manager should get out of the way and let human conversations take center stage.
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
