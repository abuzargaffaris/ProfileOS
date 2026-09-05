import React from 'react';
import { PageTab } from '../types';
import { SwipeDemo } from '../components/demos/SwipeDemo';
import { CopyDemo } from '../components/demos/CopyDemo';
import { ShareTemplateDemo } from '../components/demos/ShareTemplateDemo';
import {
  Layers,
  Copy,
  Zap,
  Code2,
  QrCode,
  EyeOff,
  Sliders,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface FeaturesPageProps {
  onNavigate: (tab: PageTab) => void;
  onOpenQrDemo: () => void;
  onNotify: (text: string, type?: 'info' | 'success') => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  onNavigate,
  onOpenQrDemo,
  onNotify
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200/80">
          Core Features
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Built Around the Way You Share
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          ProfileOS is designed to make managing your digital profiles feel effortless. From keeping different identities separate to turning a swipe into a copied handle, every feature is built around <strong className="text-slate-900 font-semibold">speed, clarity, organization, and control.</strong>
        </p>
        <p className="text-sm text-slate-500 font-medium">
          Explore the tools that make ProfileOS more than a place to store links.
        </p>
      </div>

      {/* SECTION 1: Profile Organization */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3B82F6] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Layers className="w-3.5 h-3.5" />
            <span>Profile Organization</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Keep Every Profile in Its Place
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your personal accounts don't always belong beside your professional or creator profiles. ProfileOS lets you create separate profiles for different parts of your digital identity — whether that's <strong className="text-slate-900 font-semibold">Personal, Work, Freelance, or PrintionUp Studio</strong>.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Each profile can have its own collection of handles and links, so you always know exactly which identity you're sharing.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Separate collections of handles for each profile</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Organize personal, professional, and creator identities independently</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Switch between profiles whenever you need</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Give each profile its own visual identity</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profiles Switcher Preview</div>
          <div className="p-3.5 bg-white rounded-xl border-2 border-[#FB923C] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FB923C] text-white flex items-center justify-center font-bold text-xs">
                P
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">PrintionUp Studio</div>
                <div className="text-[10px] text-slate-500">6 handles encoded</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100">
              ACTIVE
            </span>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-slate-100 flex items-center justify-between opacity-80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-bold text-xs">
                👤
              </div>
              <div>
                <div className="font-bold text-xs text-slate-900">Personal</div>
                <div className="text-[10px] text-slate-500">4 handles encoded</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
              DEFAULT
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Handle Management */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <CopyDemo onNotify={onNotify} />
        </div>

        <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <Copy className="w-3.5 h-3.5" />
            <span>Handle Management</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Your Handles. At a Glance.
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            No digging through apps to remember which username belongs where.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            ProfileOS turns your accounts into clean, easy-to-scan cards, making it simple to find the profile you need and access its handle or URL when you're ready to share.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Clear cards for your configured social accounts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Platform categories for easier navigation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Quickly find accounts across your profile</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Choose whether copied handles include the @ prefix</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Keep social accounts and custom websites together</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Gesture Engine */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FB923C] bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            <Zap className="w-3.5 h-3.5" />
            <span>Gesture Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Swipe Right. Your Handle Is Ready.
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            This is where ProfileOS gets out of the way.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            When someone asks for your handle, find the profile card and <strong className="text-slate-900 font-semibold">swipe right</strong>. Your handle is copied to the clipboard and ready to share.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Need your full sharing format instead? <strong className="text-slate-900 font-semibold">Swipe left</strong> to copy the template you've configured.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong className="text-slate-900">Swipe right:</strong> Copy the clean handle</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong className="text-slate-900">Swipe left:</strong> Copy your custom sharing template</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Designed around quick, natural gestures</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Haptic feedback makes interactions feel tactile</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm font-bold text-[#FB923C] tracking-tight">
              Less tapping. Less searching. Just swipe.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <SwipeDemo onNotify={onNotify} />
        </div>
      </section>

      {/* SECTION 4: Dynamic Sharing */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            <Code2 className="w-3.5 h-3.5" />
            <span>Dynamic Sharing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Share Your Profiles Your Way
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            Different situations call for different formats.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            Maybe you need a simple text list for a message. Maybe you're adding your profiles to a README or portfolio. Maybe you want a structured JSON version.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            ProfileOS lets you create custom sharing formats using dynamic tokens such as:
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <code className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-mono text-xs font-bold border border-slate-200">
              [platform_name]
            </code>
            <code className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-mono text-xs font-bold border border-slate-200">
              [username]
            </code>
            <code className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-mono text-xs font-bold border border-slate-200">
              [account_url]
            </code>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            Build your format once, then generate it whenever you need it.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Custom text templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Dynamic tokens</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Markdown</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>JSON</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>URLs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Copy formatted profile information without rebuilding it manually</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm font-bold text-purple-700 tracking-tight">
              One profile collection. Multiple ways to share.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <ShareTemplateDemo onNotify={onNotify} />
        </div>
      </section>

      {/* SECTION 5: QR Codes */}
      <section className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Codes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Turn Any Profile Into a QR Code
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Not every connection starts with a keyboard.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            At a meetup, event, conference, business card, or casual conversation, sometimes the easiest way to share a profile is simply to <strong className="text-slate-900 font-semibold">show a QR code</strong>.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            ProfileOS turns a profile URL into a crisp, high-contrast QR code that's easy to display and scan from your phone.
          </p>
          <div className="space-y-2 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Generate a QR code for individual profile links</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>High-contrast presentation for easy scanning</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Useful for networking, events, badges, and meetups</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Quickly switch between profiles and their QR codes</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm font-bold text-indigo-700 tracking-tight">
              Show it. Scan it. Connect.
            </p>
          </div>

          <div className="pt-3">
            <button
              onClick={onOpenQrDemo}
              className="px-6 py-3 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold shadow-md shadow-blue-200/50 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Launch Live QR Demonstration</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-100 p-6 text-center space-y-3">
          <div className="w-32 h-32 mx-auto bg-slate-900 rounded-2xl p-3 flex flex-col items-center justify-center text-white font-mono text-xs font-bold shadow-sm">
            <QrCode className="w-16 h-16 text-white mb-1" />
            <span className="text-[10px] text-slate-300">Scan Profile</span>
          </div>
          <div className="text-xs font-mono text-emerald-600 font-bold">
            • https://www.instagram.com/printionupstudio
          </div>
          <p className="text-[11px] text-slate-400">
            Instant camera scan ready without active internet connection.
          </p>
        </div>
      </section>

      {/* SECTION 6 & 7: Private Masking Mode & Personalization */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Private Masking Mode */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              <EyeOff className="w-3.5 h-3.5" />
              <span>Private Masking Mode</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Keep Sensitive Handles Out of Sight
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sometimes you need to show your profiles without showing every character.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Private Masking Mode lets you visually obscure handles on-screen, for example:
            </p>
            <div className="py-1">
              <span className="font-mono bg-slate-100 text-slate-800 text-sm font-bold px-3 py-1.5 rounded-lg border border-slate-200 inline-block">
                @pr••••io
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              It's useful when you're <strong className="text-slate-900 font-semibold">screen-sharing, presenting your phone, recording content, or showing your profile in a public setting.</strong>
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your profiles remain usable while sensitive handle characters are visually masked.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Obfuscate handles on-screen</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Keep your profile information organized while presenting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Useful for screen-sharing and public viewing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Designed with privacy-conscious situations in mind</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm font-bold text-sky-700 tracking-tight">
              Share the screen without oversharing.
            </p>
          </div>
        </div>

        {/* Personalization & Haptics */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <Sliders className="w-3.5 h-3.5" />
              <span>Personalization & Haptics</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Make ProfileOS Feel Like Yours
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              ProfileOS isn't only about what's stored inside it. You can adjust the experience to suit the way you prefer to use it.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Customize the visual experience and interaction details so your workspace feels comfortable, focused, and familiar.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Light theme options</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Classic Indigo accent styling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Compact card density</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Tactile haptic feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Gesture preferences</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Personal workspace presentation</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm font-bold text-slate-800 tracking-tight">
              Your profiles. Your setup. Your way of sharing.
            </p>
          </div>
        </div>
      </section>

      {/* Next Step CTA */}
      <div className="text-center pt-6">
        <button
          onClick={() => onNavigate('preview')}
          className="px-8 py-4 rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-black text-sm shadow-md shadow-blue-200/50 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>Inspect All 10 Application Screens</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
