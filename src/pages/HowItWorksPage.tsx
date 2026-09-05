import React from 'react';
import { PageTab } from '../types';
import {
  Layers,
  User,
  Briefcase,
  Sparkles,
  Building2,
  ArrowRight,
  Repeat,
  Zap,
  CheckCircle2,
  QrCode,
  Share2,
  ShieldCheck,
  Smartphone,
  Check
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQrDemo: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate, onOpenQrDemo }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* HERO HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-bold shadow-2xs">
          <Layers className="w-3.5 h-3.5" />
          <span>Spaces &amp; Profiles Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Different Identities. One Organized Workspace.
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
          Your online presence isn't always one thing. You might have a personal identity, a professional presence, a freelance portfolio, or a creator account — each with its own collection of social profiles and links.
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          ProfileOS gives you a simple way to keep those identities separate while managing them from the same app.
        </p>
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-slate-800 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
          Instead of putting every account into one long list, you can create{' '}
          <span className="text-[#2563EB] font-bold">
            Spaces and Profiles around the way you actually use your digital presence.
          </span>
        </div>
      </section>

      {/* SECTION 1: WHAT IS A SPACE? */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <span>WHAT IS A SPACE?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            A Space Is a Home for an Identity.
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            A Space represents a distinct context in your digital life. It can be your personal presence, your professional work, a creative project, or a brand you manage.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Think of a Space as the boundary around a particular collection of profiles. The accounts inside it belong together because they represent the same purpose or identity.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            For example, you might have a <strong className="text-slate-900 font-bold">Personal</strong> Space for the accounts you share with friends, a <strong className="text-slate-900 font-bold">Freelance</strong> Space for your professional presence, and a <strong className="text-slate-900 font-bold">Creator</strong> Space for the social channels representing your creative work.
          </p>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">
            The purpose isn't to create unnecessary complexity. It's to make sure the{' '}
            <strong className="text-[#2563EB]">right collection of profiles is available at the right moment.</strong>
          </div>
        </div>

        {/* Space Mockup Visual */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Example Spaces in ProfileOS</div>
          
          <div className="p-3.5 bg-white rounded-2xl border-2 border-blue-500 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">Personal Space</div>
                <div className="text-xs text-slate-500">Friends, everyday socials</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              ACTIVE
            </span>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">Freelance &amp; Work</div>
                <div className="text-xs text-slate-500">Portfolio, GitHub, LinkedIn</div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              SWITCH
            </span>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">Creator Space</div>
                <div className="text-xs text-slate-500">YouTube, TikTok, Substack</div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              SWITCH
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT IS A PROFILE? */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Connected Accounts Inside Profile</div>
          
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-500 text-white font-bold text-xs flex items-center justify-center">IG</div>
              <div>
                <div className="text-xs font-bold text-slate-900">Instagram</div>
                <div className="text-[11px] text-slate-500">@username</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Social</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">X</div>
              <div>
                <div className="text-xs font-bold text-slate-900">X (Twitter)</div>
                <div className="text-[11px] text-slate-500">@username</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Social</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">GH</div>
              <div>
                <div className="text-xs font-bold text-slate-900">GitHub</div>
                <div className="text-[11px] text-slate-500">github.com/username</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Dev</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">🌐</div>
              <div>
                <div className="text-xs font-bold text-slate-900">Website &amp; Portfolio</div>
                <div className="text-[11px] text-slate-500">https://yourportfolio.me</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Web</span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4 order-1 lg:order-2 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <span>WHAT IS A PROFILE?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            A Profile Is Your Shareable Identity.
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Inside a Space, your Profile brings together the accounts and links that represent that identity.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            A profile can contain your social handles, websites, portfolio links, creator platforms, and other URLs you regularly need to share.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Instead of thinking about each account separately, ProfileOS lets you see the collection as one organized presence.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Your Instagram can sit alongside your Threads, X, GitHub, website, or other profiles — all belonging to the same context.
          </p>
          <div className="pt-2">
            <h3 className="text-base sm:text-lg font-black text-[#2563EB]">
              One identity. Everything connected to it.
            </h3>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY SEPARATE THEM? */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-orange-400 bg-orange-950/60 px-3 py-1 rounded-full border border-orange-800/80">
          <span>WHY SEPARATE THEM?</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Because Context Matters.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-2.5">
            <div className="text-sm font-bold text-orange-300">Scenario A: Professional Conversation</div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Imagine you're talking to a potential client and they ask where they can see your work. You probably don't want to hand them a collection containing every personal account you use.
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-2.5">
            <div className="text-sm font-bold text-blue-300">Scenario B: Meeting Friends &amp; Casual Networking</div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Or you're meeting friends and someone asks for your social handle. Your professional Creator accounts may not be what you want to share in that moment.
            </p>
          </div>
        </div>
        <div className="space-y-3 pt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            Separating your Spaces and Profiles gives you control over <strong className="text-white font-bold">which part of your digital presence you're working with.</strong>
          </p>
          <p>
            You don't have to remember which accounts belong together. The organization is already there.
          </p>
        </div>
      </section>

      {/* SECTION 4: 4 SPACES IN DETAIL */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            4 Tailored Contexts
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Spaces Designed for How You Live &amp; Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PERSONAL */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                PERSONAL
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Your Everyday Digital Identity.
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Use a Personal Space for the accounts you use in everyday life. Keep your personal social profiles together without mixing them with accounts that represent your work or business.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              When you switch to your Personal profile, you know exactly what you're looking at and what you're ready to share.
            </p>
          </div>

          {/* WORK & FREELANCE */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                WORK &amp; FREELANCE
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Keep Your Professional Presence Focused.
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Your professional identity may include LinkedIn, GitHub, a portfolio, a personal website, or other work-related platforms.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Keeping these accounts together creates a focused workspace for professional conversations, client interactions, applications, networking, and sharing your work.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              When someone asks for your professional profile, you're already in the right place.
            </p>
          </div>

          {/* CREATOR */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs hover:border-purple-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                CREATOR
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Everything Behind Your Creative Identity.
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Creators often exist across several platforms at once. One account may be where you publish, another where you interact with your community, and another where people discover your work.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              A Creator Space brings those channels together so your audience-facing identity is easy to manage and share.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              You can keep your creator profiles separate from your personal accounts while still accessing everything from the same ProfileOS experience.
            </p>
          </div>

          {/* BUSINESS & BRAND */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs hover:border-orange-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                BUSINESS &amp; BRAND
              </span>
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Give Your Brand Its Own Space.
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              If you manage social accounts for a studio, business, project, or creative brand, a dedicated Space keeps those channels clearly separated from your personal identity.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              For example, your studio Space could contain Instagram, Threads, X, Facebook, Bluesky, Pinterest, your website, and other brand-related links.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              That way, when you're representing the studio, you're working from the studio's collection rather than searching through your personal profiles.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: SWITCH WHEN THE CONTEXT CHANGES */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          <Repeat className="w-3.5 h-3.5" />
          <span>SWITCH WHEN THE CONTEXT CHANGES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          The Right Profile for the Right Moment.
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Spaces and Profiles are most useful when your context changes.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-500">Working with a client</div>
            <div className="text-sm font-black text-slate-900">Switch to Work →</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-500">Sharing your personal Instagram</div>
            <div className="text-sm font-black text-slate-900">Switch to Personal →</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-500">Networking as a creator</div>
            <div className="text-sm font-black text-slate-900">Switch to Creator →</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-500">Representing your studio</div>
            <div className="text-sm font-black text-slate-900">Switch to Studio →</div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-sm sm:text-base font-bold text-slate-900">
          The accounts don't need to move.{' '}
          <span className="text-[#2563EB]">You simply move to the profile that represents the moment.</span>
        </div>
      </section>

      {/* SECTION 6: KEEP IT SIMPLE */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-4 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>KEEP IT SIMPLE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          You Don't Need a Space for Everything.
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Spaces aren't meant to turn ProfileOS into another organizational system you have to maintain.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          If you only have one digital identity, one profile may be all you need.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Create another Space when there is a meaningful reason to separate accounts — different audiences, different purposes, or different identities.
        </p>
        <div className="pt-2">
          <h3 className="text-base sm:text-lg font-black text-emerald-700">
            Separate what needs separation. Keep everything else simple.
          </h3>
        </div>
      </section>

      {/* SECTION 7: SPACES + SWIPE ACTIONS */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          <Zap className="w-3.5 h-3.5" />
          <span>SPACES + SWIPE ACTIONS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Organization Meets Speed.
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          The real benefit of Spaces and Profiles becomes clear when they're combined with ProfileOS's swipe-based sharing.
        </p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          First, switch to the identity you want to share. Then find the appropriate profile card and use the gesture you need.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 space-y-2">
            <div className="text-xs font-bold text-blue-700 uppercase">Swipe Right →</div>
            <div className="font-bold text-sm text-slate-900">Copy the Handle</div>
            <p className="text-xs text-slate-600">Instantly copies clean handle text to clipboard.</p>
          </div>

          <div className="bg-orange-50/70 p-5 rounded-2xl border border-orange-200 space-y-2">
            <div className="text-xs font-bold text-orange-700 uppercase">← Swipe Left</div>
            <div className="font-bold text-sm text-slate-900">Copy Sharing Template</div>
            <p className="text-xs text-slate-600">Copies your configured sharing template.</p>
          </div>

          <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-200 space-y-2">
            <div className="text-xs font-bold text-purple-700 uppercase">Tap Card / QR</div>
            <div className="font-bold text-sm text-slate-900">Generate QR Code</div>
            <p className="text-xs text-slate-600">Shows instant QR code when connecting in person.</p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm sm:text-base font-semibold text-slate-800">
          Your organization determines <strong className="text-slate-950">what you're sharing</strong>, while the gesture determines <strong className="text-slate-950">how you're sharing it.</strong>
        </div>
      </section>

      {/* SECTION 8: A SIMPLE MENTAL MODEL */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          <span>A SIMPLE MENTAL MODEL</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Space → Profile → Handle → Share
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Think of ProfileOS as a simple hierarchy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">1</div>
            <div className="font-bold text-sm text-slate-900">Space</div>
            <p className="text-xs text-slate-600">Defines the context</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">2</div>
            <div className="font-bold text-sm text-slate-900">Profile</div>
            <p className="text-xs text-slate-600">Represents that identity</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center">3</div>
            <div className="font-bold text-sm text-slate-900">Handles &amp; Links</div>
            <p className="text-xs text-slate-600">Make up the digital presence</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">4</div>
            <div className="font-bold text-sm text-slate-900">Swipe / Share</div>
            <p className="text-xs text-slate-600">Gets information where it needs to go</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 font-normal">
          Once that structure makes sense, ProfileOS becomes easy to navigate — even as your online presence grows.
        </p>
      </section>

      {/* SECTION 9: THE BEST PART */}
      <section className="bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white bg-white/20 px-3 py-1 rounded-full border border-white/30 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>THE BEST PART</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Your Digital Identities Don't Have to Compete for Attention.
        </h2>
        <p className="text-sm sm:text-base text-blue-50 leading-relaxed max-w-3xl">
          Having multiple online identities shouldn't mean having multiple systems to manage them.
        </p>
        <p className="text-sm sm:text-base text-blue-50 leading-relaxed max-w-3xl">
          ProfileOS lets you keep different parts of your digital presence distinct while giving you one consistent way to organize and share them.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-xs text-center">
            <div className="font-bold text-sm text-white">Personal</div>
            <div className="text-xs text-blue-100">stays personal</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-xs text-center">
            <div className="font-bold text-sm text-white">Work</div>
            <div className="text-xs text-blue-100">stays professional</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-xs text-center">
            <div className="font-bold text-sm text-white">Creator</div>
            <div className="text-xs text-blue-100">stays creative</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/15 backdrop-blur-xs text-center">
            <div className="font-bold text-sm text-white">Studio</div>
            <div className="text-xs text-blue-100">stays on-brand</div>
          </div>
        </div>

        <div className="pt-2">
          <h3 className="text-lg sm:text-2xl font-black text-white">
            Different identities. Different Spaces. One ProfileOS.
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4 border-t border-white/20">
          <button
            onClick={onOpenQrDemo}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#2563EB] hover:bg-blue-50 text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <QrCode className="w-4 h-4" />
            <span>Try Interactive QR Demo</span>
          </button>

          <button
            onClick={() => onNavigate('features')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-950/50 hover:bg-blue-950/80 text-white text-xs font-bold border border-white/30 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>Explore All Features</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
