import React from 'react';
import { PageTab } from '../types';
import { ProfileOSLogo } from '../components/Logo';
import {
  Sparkles,
  Search,
  Layers,
  FileText,
  Globe2,
  Zap,
  Users2,
  Compass,
  Clock,
  ShieldCheck,
  Share2,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Database,
  Lock
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: PageTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200/80">
          Our Philosophy & Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Find Less. Organize More.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          The story behind ProfileOS, why modern digital identity is scattered, and how we're building the quiet utility to organize it.
        </p>
      </section>

      {/* Main Intro Card */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <button
            onClick={() => onNavigate('home')}
            className="cursor-pointer text-left border-0 bg-transparent p-0 inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
            aria-label="ProfileOS Home"
            title="ProfileOS Home - Back to Homepage"
            id="about-brand-logo-btn"
          >
            <ProfileOSLogo size="md" onClick={() => onNavigate('home')} />
          </button>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          <p>
            The internet has made it easier than ever to build a presence in many different places. Your identity might live across Instagram, Threads, X, GitHub, LinkedIn, TikTok, YouTube, Pinterest, a portfolio, a personal website, and countless other platforms. Each one has its own username, profile URL, app, and way of doing things. Over time, what starts as a handful of accounts can become a collection of digital identities spread across the internet.
          </p>

          <p>
            ProfileOS was created around a simple idea: <strong className="text-slate-900 font-semibold">your digital presence may be distributed across the internet, but managing it shouldn't be.</strong> Instead of remembering where every handle lives or searching through different apps whenever you need to share one, ProfileOS gives those profiles a single, organized place.
          </p>

          <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl text-slate-800">
            It is built around a simple philosophy: <strong className="text-[#3B82F6] font-bold">find less, organize more.</strong> The less time you spend looking for your own links, the more naturally you can use them when the moment to connect actually arrives.
          </div>
        </div>
      </section>

      {/* 01: THE REASON IT EXISTS */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#3B82F6] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
          <Search className="w-3.5 h-3.5" />
          <span>THE REASON IT EXISTS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Because “What's your handle?” shouldn't require a search.
        </h2>
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            There is a strange kind of friction in modern digital life. We can instantly communicate with someone on the other side of the world, yet when someone standing next to us asks for our Instagram, portfolio, or professional profile, we can still find ourselves searching through our phone for the right account.
          </p>
          <p>
            You open one app, check another, remember that the link might be saved in Notes, and then wonder whether the username you're about to send is actually the right one. If you manage several identities, the problem becomes even more noticeable. A personal account can sit only a few taps away from a professional profile, while a studio or creator account may live somewhere completely different.
          </p>
          <p className="text-slate-800 font-medium pt-1">
            ProfileOS exists to make that moment simpler. It takes the profiles and links you already have and puts them into a workspace designed specifically for <strong className="text-slate-900">finding, organizing, copying, and sharing them quickly.</strong>
          </p>
        </div>
      </section>

      {/* 02: THE PROBLEM WITH A SCATTERED DIGITAL IDENTITY */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-100">
          <Layers className="w-3.5 h-3.5" />
          <span>THE PROBLEM WITH A SCATTERED DIGITAL IDENTITY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          The more places you exist, the harder it becomes to keep track of them.
        </h2>
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Your digital identity isn't necessarily one identity anymore. It can be personal, professional, creative, entrepreneurial, or a combination of all of them. You might use one Instagram account for your personal life, another for your work, an X account for professional conversations, GitHub for development, LinkedIn for your career, and a portfolio website for your work. None of these platforms are designed to manage the others, so the responsibility of keeping everything organized usually falls back on you.
          </p>
          <p>
            That often means notes filled with usernames, bookmarks containing profile URLs, messages sent to yourself, copied links sitting in a clipboard, or simply relying on memory. None of these solutions are particularly terrible on their own, but together they create unnecessary friction.
          </p>
          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-100 text-slate-800 font-medium">
            <strong className="text-amber-900 font-bold">ProfileOS brings those scattered pieces into one intentional workspace.</strong> It gives your profiles structure without trying to replace the platforms themselves.
          </div>
        </div>
      </section>

      {/* 03 & 04: COMPARISONS GRID (WHY NOT NOTES / WHY NOT LINK-IN-BIO) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WHY NOT JUST USE A NOTES APP? */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
              <FileText className="w-3.5 h-3.5" />
              <span>WHY NOT JUST USE A NOTES APP?</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Because storing a link and being ready to share it are two different things.
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                A note can remember your Instagram handle. A bookmark can remember your portfolio. Your browser history can eventually find a page you've visited before. But these tools weren't built around the moment when somebody asks you to share your profile.
              </p>
              <p>
                ProfileOS is designed around that moment.
              </p>
              <p>
                Your handles are presented as recognizable profile cards rather than a wall of text. Different identities can be separated into different profiles. Gestures can turn a card into an action. Sharing templates can turn the same collection of accounts into different formats. A profile URL can become a QR code when you're standing in front of someone instead of messaging them.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-semibold text-slate-800 mt-2">
            The difference is subtle but important: <span className="text-[#3B82F6] font-bold">ProfileOS isn't simply trying to remember your links. It's designed to make them useful when you need them.</span>
          </div>
        </div>

        {/* WHY NOT A LINK-IN-BIO PAGE? */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
              <Globe2 className="w-3.5 h-3.5" />
              <span>WHY NOT A LINK-IN-BIO PAGE?</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Because ProfileOS isn't about showing everyone everything.
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                Link-in-bio tools are useful when you want to create a public destination and send people there. ProfileOS solves a different problem.
              </p>
              <p>
                Sometimes you don't want another public page. You don't want to send someone to a landing page and ask them to choose from a collection of buttons. You simply want to give them the exact profile, handle, or URL they're asking for.
              </p>
              <p>
                ProfileOS is therefore designed as a <strong className="text-slate-900 font-semibold">personal utility rather than a public directory</strong>. It helps you manage the links behind your digital presence instead of creating another destination that sits between you and the person you're trying to connect with.
              </p>
              <p>
                When you need your Instagram handle, you get your Instagram handle. When you need your portfolio, you get your portfolio. When you want to share everything, you can share everything.
              </p>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs font-bold text-indigo-900 mt-2">
            The tool stays out of the way.
          </div>
        </div>
      </section>

      {/* 05: BUILT FOR THE MOMENT OF SHARING */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FB923C] bg-orange-50 px-3.5 py-1 rounded-full border border-orange-100">
          <Zap className="w-3.5 h-3.5" />
          <span>BUILT FOR THE MOMENT OF SHARING</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          The most important part happens in a few seconds.
        </h2>
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Imagine you're at a conference and someone asks for your profile. You're meeting a potential client who wants your portfolio. A creator you've just met wants to connect on another platform. A friend asks for your handle.
          </p>
          <p>
            These moments don't need another workflow.
          </p>
          <p>
            With ProfileOS, your profiles are already organized. You find the one you want and use the gesture designed for that moment. <strong className="text-slate-900 font-semibold">Swipe right and the handle is copied. Swipe left and your configured sharing template is ready.</strong> If you're connecting face-to-face, generate a QR code and let the other person scan it.
          </p>
          <p>
            The goal isn't to make these moments more complicated with more options. It is to make them feel almost automatic.
          </p>
          <div className="text-center py-4 bg-orange-50/60 rounded-2xl border border-orange-100">
            <span className="text-base sm:text-lg font-black text-orange-600 tracking-wide">
              Open. Find. Swipe. Share.
            </span>
          </div>
        </div>
      </section>

      {/* 06: DESIGNED FOR MORE THAN ONE YOU */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
          <Users2 className="w-3.5 h-3.5" />
          <span>DESIGNED FOR MORE THAN ONE YOU</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          One person can have many digital identities.
        </h2>
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            The idea of a single online identity doesn't always fit the way people actually live and work online. A freelancer may have a personal Instagram, a professional LinkedIn, a portfolio, a GitHub profile, and a separate account for creative work. A studio may have its own social channels while the person behind it maintains completely different personal profiles.
          </p>
          <p>
            ProfileOS treats those differences as something worth organizing rather than something to work around.
          </p>
          <p>
            Separate profiles allow you to keep collections of accounts together according to how you actually use them. Personal can stay personal. Work can stay work. A creator identity can have its own space. A studio can have its own collection of channels.
          </p>
          <p className="text-slate-900 font-bold">
            Your digital presence can be many things without becoming one big, confusing list.
          </p>
        </div>
      </section>

      {/* 07 & 08: THE APPROACH & SMALL FRICTIONS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* THE PROFILEOS APPROACH */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#3B82F6] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              <Compass className="w-3.5 h-3.5" />
              <span>THE PROFILEOS APPROACH</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              A utility, not another destination.
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                ProfileOS isn't trying to become the place where you post, scroll, follow people, or consume content. It doesn't need to compete with Instagram, X, Threads, GitHub, LinkedIn, or any other platform you already use.
              </p>
              <p>
                Those platforms are where your profiles live.
              </p>
              <p className="text-slate-900 font-semibold">
                ProfileOS is where you manage your way into them.
              </p>
              <p>
                That distinction shapes the entire product. The interface is focused on quick recognition, organization, and action rather than engagement. There is no feed competing for your attention and no reason to stay longer than necessary.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-mono font-bold text-slate-700 space-y-1">
            <div>• You open ProfileOS because you need something.</div>
            <div>• You find it.</div>
            <div>• You share it.</div>
            <div>• You move on.</div>
          </div>
        </div>

        {/* SMALL FRICTIONS ADD UP */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100">
              <Clock className="w-3.5 h-3.5" />
              <span>SMALL FRICTIONS ADD UP</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              A few seconds saved can change the experience completely.
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                Searching for a handle might only take thirty seconds. Finding a URL in Notes might only take a minute. Switching between three apps might not feel like a serious problem.
              </p>
              <p>
                But these moments happen repeatedly.
              </p>
              <p>
                Every time you stop a conversation to search for a link, every time you wonder which account is the correct one, every time you manually retype a username, or every time you rebuild the same collection of links for another person, you're spending attention on something that should be simple.
              </p>
              <p>
                ProfileOS is built around removing those tiny interruptions.
              </p>
            </div>
          </div>

          <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-100 text-xs font-semibold text-rose-900">
            It isn't about saving hours every week. It's about removing the little moments of friction that shouldn't have been there in the first place.
          </div>
        </div>
      </section>

      {/* 09: PRIVACY, BY DESIGN */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PRIVACY, BY DESIGN</span>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Your Profiles Belong on Your Device.
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            ProfileOS is built around a simple principle: <strong className="text-slate-900 font-bold">the information you use to manage your digital identity should remain under your control.</strong>
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Your saved profiles, handles, usernames, links, notes, categories, preferences, and other ProfileOS data are designed to be stored primarily on your personal device. You don't need to create a cloud account just to organize the profiles you already own.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            ProfileOS does <strong className="text-slate-900 font-semibold">not operate a cloud account system or cloud database for your saved ProfileOS data</strong>, and we do not sell or rent your personal information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Card 1 */}
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100/80 text-[#3B82F6] flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Local First. Personal by Default.
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              At the heart of ProfileOS is a local <strong className="text-slate-800 font-semibold">SQLite database powered through Android Room</strong>, allowing your saved ProfileOS information to be managed directly on your device rather than relying on a remote database for your everyday profile organization.
            </p>
            <p className="text-xs text-slate-500 pt-1 leading-relaxed">
              There is no need for your profile collection to travel through a server simply because you want to look up your own Instagram handle or portfolio URL.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No Tracking. No Telemetry. No Unnecessary Cloud Layer.
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ProfileOS is designed as a focused personal utility, not a tracking platform. The app does not use your saved profiles as a source of behavioral analytics, and it is designed without remote user telemetry or tracking infrastructure for your ProfileOS data.
            </p>
            <p className="text-xs text-slate-500 pt-1 leading-relaxed">
              Your profiles are there for <strong className="text-slate-800 font-semibold">you to organize, manage, and share when you choose.</strong>
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Your Data. Your Device. Your Control.
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whether you're managing a personal identity, professional accounts, creator profiles, or a brand, ProfileOS keeps the information you save close to where you actually use it.
            </p>
          </div>
        </div>

        {/* Highlight Callout */}
        <div className="p-5 bg-gradient-to-r from-emerald-50/80 via-slate-50 to-blue-50/80 rounded-2xl border border-emerald-100 text-slate-800 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>No account required for the core experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>No cloud database for your saved profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>No selling or renting your personal information</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Just a local-first workspace for your digital presence</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10: PRIVACY SHOULD BE PART OF THE EXPERIENCE */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-100">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PRIVACY SHOULD BE PART OF THE EXPERIENCE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Your digital profiles are yours.
        </h2>
        <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          <p>
            Your handles and profile links may seem harmless, but they can also reveal different parts of your personal and professional identity. That's why ProfileOS takes a privacy-first approach to the way your profiles are presented and managed.
          </p>
          <p>
            Private Masking Mode allows sensitive handle information to be visually obscured when you're presenting, recording, screen-sharing, or simply showing your phone in public. Instead of exposing the complete handle, ProfileOS can display a masked version while keeping the profile available for use.
          </p>
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-slate-800 font-medium">
            The broader philosophy is simple: <strong className="text-emerald-900 font-bold">your profile organizer should work for you without turning your personal profile information into the product.</strong>
          </div>
          <p className="text-xs text-slate-500 italic">
            Where the app's implementation supports it, ProfileOS is designed around local, personal use without requiring an account for the core experience. The exact technical details are documented in the Privacy Policy.
          </p>
        </div>
      </section>

      {/* 10 & 11: WHY THIS MATTERS & BUILT FROM A SIMPLE IDEA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* WHY THIS MATTERS */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-50 px-3.5 py-1 rounded-full border border-sky-100">
              <Share2 className="w-3.5 h-3.5" />
              <span>WHY THIS MATTERS</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Your digital presence is part of how people find you.
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                Today, a person's online presence can represent far more than social activity. It can be a portfolio, a professional identity, a creative outlet, a business, a community, or simply a way for people to stay connected.
              </p>
              <p>
                Those identities are valuable, but they're also fragmented by design. Every platform creates its own account, URL, username, and interface.
              </p>
              <p>
                ProfileOS doesn't try to change that reality.
              </p>
            </div>
          </div>

          <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100 text-xs font-bold text-sky-900">
            It gives you a way to manage it. By bringing your profiles into one place, ProfileOS turns a collection of unrelated accounts into something you can actually organize and control.
          </div>
        </div>

        {/* BUILT FROM A SIMPLE IDEA */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-700 bg-violet-50 px-3.5 py-1 rounded-full border border-violet-100">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>BUILT FROM A SIMPLE IDEA</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              One small problem was enough.
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                ProfileOS doesn't need a complicated origin story.
              </p>
              <p>
                The idea begins with a familiar experience: <strong className="text-slate-900 font-semibold">knowing you have a profile, but having to search for it before you can share it.</strong>
              </p>
              <p>
                That small problem reveals a larger one. As our online presence grows, the tools we use to manage it haven't necessarily grown with it. We have platforms for publishing, platforms for networking, platforms for messaging, platforms for building, and platforms for sharing — but very few tools focused on simply managing the collection of profiles that make up our digital identity.
              </p>
            </div>
          </div>

          <div className="p-4 bg-violet-50/70 rounded-2xl border border-violet-100 text-xs font-bold text-violet-900">
            ProfileOS was created to explore that missing layer. A focused place between you and all the places you exist online.
          </div>
        </div>
      </section>

      {/* 12: THE DIFFERENCE */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-950 px-3.5 py-1 rounded-full border border-blue-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>THE DIFFERENCE</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          ProfileOS doesn't replace your online world. It organizes your place in it.
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          <p>You don't need another social network.</p>
          <p>You don't need another feed.</p>
          <p>You don't need another public page just to tell someone your handle.</p>
          <p className="text-white font-semibold pt-1">
            You need to know where your profiles are, keep different identities organized, and be able to share the right one when the moment comes.
          </p>
        </div>
        <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-sm font-semibold text-blue-200">
          Simple enough to disappear into your routine. Useful enough that you'll wonder how you managed without it.
        </div>
      </section>

      {/* 13: THE PROFILEOS PHILOSOPHY */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm space-y-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#3B82F6] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>THE PROFILEOS PHILOSOPHY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
          Find Less. Organize More. Share Without Friction.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          ProfileOS is ultimately built around one belief: <strong className="text-slate-900 font-semibold">the tools we use should reduce friction, not create more of it.</strong>
        </p>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Your social platforms can remain where they are. Your websites can remain where they are. Your professional profiles, creator accounts, and studio channels can continue to exist independently. ProfileOS simply gives all of them a place where you can see them, organize them, and reach for them when you need them.
        </p>

        <div className="pt-4 max-w-xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-orange-50 p-6 rounded-2xl border border-slate-100 space-y-2">
            <p className="text-sm text-slate-600 font-medium">
              Because when someone asks, <span className="text-slate-900 font-bold">“What's your handle?”</span>, the answer shouldn't be a search.
            </p>
            <p className="text-xl sm:text-2xl font-black text-[#3B82F6]">
              It should be a swipe.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('preview')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold shadow-md shadow-blue-200/50 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span>Explore App Screens</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('features')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            <span>View Core Features</span>
          </button>
        </div>
      </section>
    </div>
  );
};
