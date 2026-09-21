import React from 'react';
import { BlogPost } from '../../../types';
import {
  ShieldCheck,
  Calendar,
  Clock,
  Database,
  Zap,
  BatteryCharging,
  EyeOff,
  ServerOff,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Lock,
  ArrowRight,
  Layers,
  Copy,
  Sliders,
  Smartphone,
  Cpu
} from 'lucide-react';

interface ArticleProps {
  post: BlogPost;
  onCopyLink: () => void;
  copiedLink: boolean;
}

export const LocalFirstArticle: React.FC<ArticleProps> = ({
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
    { id: 'illusion-of-cloud', label: '1. The Illusion of Centralized Link Hubs' },
    { id: 'local-first-engine', label: '2. The SQLite Room Local-First Engine' },
    { id: 'zero-telemetry-manifest', label: '3. What Zero Telemetry Actually Means' },
    { id: 'speed-and-latency', label: '4. Speed Benchmarks: 0ms vs Cloud Roundtrips' },
    { id: 'battery-and-ram', label: '5. Battery Efficiency & Memory Footprint' },
    { id: 'offline-resilience', label: '6. 100% Offline Uptime in High-Stakes Events' },
    { id: 'architecture-matrix', label: '7. Architecture Comparison: Local vs Cloud' },
    { id: 'conclusion', label: '8. The Future of Sovereign Personal Computing' },
  ];

  return (
    <div className="space-y-8" id="article-local-first">
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
            When we set out to build <strong className="font-bold text-slate-900">ProfileOS</strong>, we rejected the dominant paradigm of modern mobile app development: <em className="italic">the centralized cloud backend</em>.
          </p>
          <p>
            For the past decade, software designers have been conditioned to believe that every app needs a remote database, an authentication service, background synchronization servers, analytics pipelines, and user telemetry daemons. Even simple tools like link organizers, digital business cards, and profile managers were transformed into software-as-a-service (SaaS) link-hubs.
          </p>
          <p>
            In this article, we explain the engineering rationale behind our choice to make ProfileOS <strong className="font-semibold text-slate-900">100% Local-First</strong>. We dive into how <strong className="font-semibold text-slate-900">Android SQLite Room</strong> delivers near-instant 0ms response times, why zero telemetry is the ultimate privacy guarantee, and how local data architecture produces unprecedented battery efficiency.
          </p>

          <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-blue-950 my-6">
            <h4 className="font-bold text-sm sm:text-base flex items-center gap-2 text-blue-900 mb-1">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>The Local-First Thesis</span>
            </h4>
            <p className="text-xs sm:text-sm text-blue-900/90 leading-relaxed">
              Software is local-first when your device holds the authoritative master copy of your data. You never wait for a network spinner, your software continues to function indefinitely without an internet connection, and your privacy is mathematically enforced rather than promised in a terms of service document.
            </p>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* SECTION 1: ILLUSION OF CLOUD */}
        <section id="illusion-of-cloud" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <ServerOff className="w-4 h-4" />
            <span>Problem Analysis</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            1. The Illusion of Centralized Link Hubs
          </h2>
          <p className="text-slate-600">
            Consider what happens in conventional &quot;link-in-bio&quot; apps and cloud contact managers. When you launch the application to share your GitHub profile, LinkedIn URL, or WhatsApp handle:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li>
              <strong className="text-slate-900">Mandatory Auth &amp; Session Tokens:</strong> The app connects to an OAuth server or API gateway to validate your login credentials. If your session expired or you have poor connectivity, you are blocked with a loading screen.
            </li>
            <li>
              <strong className="text-slate-900">Network Latency Tax:</strong> Every profile list, every category switch, and every handle query travels across multiple cellular towers to a server cluster thousands of miles away before returning.
            </li>
            <li>
              <strong className="text-slate-900">Data Exploitation:</strong> Centralized services inject tracking pixels, monitor visitor geolocation, analyze click-through rates, and compile behavioral graphs of who you network with and how often.
            </li>
            <li>
              <strong className="text-slate-900">Fragile Uptime:</strong> If the cloud provider has a DNS hiccup, an AWS outage, or decides to discontinue their free tier, your profile hub vanishes into thin air.
            </li>
          </ul>
          <p className="text-slate-600">
            For personal contacts and networking profiles, this cloud architecture represents unnecessary overhead and significant privacy compromise. Your social handles are not changing every second; they are personal reference assets that should live directly on the device in your hand.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 2: SQLITE ROOM */}
        <section id="local-first-engine" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Database className="w-4 h-4" />
            <span>Database Architecture</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            2. The SQLite Room Local-First Engine
          </h2>
          <p className="text-slate-600">
            ProfileOS replaces the remote database with an embedded <strong className="font-semibold text-slate-900">SQLite database abstracted via Android Jetpack Room</strong>. SQLite is one of the most reliable, battle-tested software systems in human history, deployed on billions of devices globally.
          </p>
          <p className="text-slate-600">
            Under the hood, ProfileOS models your digital identities through a clean relational schema:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Spaces &amp; Profiles Table</span>
              <p className="text-xs text-slate-600">Stores individual profile containers (Personal, Work, Creator, Freelance) with color tokens, visual icons, ordering rank, and active status.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Accounts &amp; Handles Table</span>
              <p className="text-xs text-slate-600">Maps 229+ platform identifiers with normalized handles, custom URL overrides, privacy mask flags, bio notes, and category tags.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block">Share Templates Table</span>
              <p className="text-xs text-slate-600">Stores customizable message tokens (Markdown, Plain Text, formatted greeting templates) for instant clipboard formatting.</p>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm">
            Because this database file resides inside the application&apos;s sandboxed internal storage directory (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono text-xs">/data/data/com.printionupstudio.profileos/databases/</code>), read queries execute directly against device flash storage at NVMe/UFS speeds. No TCP handshakes, no TLS negotiation, and no HTTP payload parsing.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 3: ZERO TELEMETRY */}
        <section id="zero-telemetry-manifest" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <EyeOff className="w-4 h-4" />
            <span>Privacy Verification</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            3. What Zero Telemetry Actually Means
          </h2>
          <p className="text-slate-600">
            Many applications claim to be &quot;privacy-first&quot; while shipping with third-party tracking software embedded in their binaries. In ProfileOS, zero telemetry is an architectural fact you can verify yourself:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">Zero Third-Party Analytics SDKs</p>
                <p className="text-[11px] text-slate-500">No Firebase Analytics, no Mixpanel, no Adjust, no AppsFlyer, no Google Tag Manager.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">Zero Crash Trackers with Personal Logs</p>
                <p className="text-[11px] text-slate-500">Crash handlers do not transmit contact handles, profile spaces, or device serials.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">Zero Dangerous OS Permissions</p>
                <p className="text-[11px] text-slate-500">ProfileOS never requests READ_CONTACTS, ACCESS_FINE_LOCATION, or RECORD_AUDIO.</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">Zero Account Creation Requirement</p>
                <p className="text-[11px] text-slate-500">You never provide your email, phone number, or password to start using the app.</p>
              </div>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm">
            When you add a link or copy a handle, your phone does not make an outbound HTTP request. The operation completes entirely within your device&apos;s local memory.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 4: SPEED & LATENCY */}
        <section id="speed-and-latency" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Zap className="w-4 h-4" />
            <span>Performance Metrics</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            4. Speed Benchmarks: 0ms vs Cloud Roundtrips
          </h2>
          <p className="text-slate-600">
            Speed in a mobile app is not just about convenience; in networking and professional situations, it is the difference between effortless communication and awkward waiting.
          </p>

          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">Real-World Action Latency Comparison</span>
            <div className="space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800">
                <span className="text-slate-300 font-medium">ProfileOS: Cold App Launch to Interactive UI</span>
                <span className="text-emerald-400 font-mono font-bold">~120 ms (Instant)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800">
                <span className="text-slate-300 font-medium">Cloud Link App: Cold Launch with Remote Auth Sync</span>
                <span className="text-rose-400 font-mono font-bold">1,800 ms – 3,500 ms</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800">
                <span className="text-slate-300 font-medium">ProfileOS: Switch Space &amp; Query 50 Handles (SQLite)</span>
                <span className="text-emerald-400 font-mono font-bold">1.8 ms (0ms perceived)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-slate-300 font-medium">Cloud Link App: REST API Profile Fetch over 4G/5G</span>
                <span className="text-rose-400 font-mono font-bold">420 ms – 1,100 ms</span>
              </div>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm">
            Because ProfileOS indices are cached in device RAM and queries run against SQLite with compiled PreparedStatements, lookups feel instantaneous to the human eye.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 5: BATTERY & RAM */}
        <section id="battery-and-ram" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <BatteryCharging className="w-4 h-4" />
            <span>Resource Efficiency</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            5. Battery Efficiency &amp; Memory Footprint
          </h2>
          <p className="text-slate-600">
            One of the most insidious consequences of cloud-centric architecture is battery drain. A typical SaaS mobile app maintains background WebSocket connections, listens for push notification beacons, wakes up the radio processor every few minutes to refresh cached states, and keeps memory-hungry JavaScript runtimes resident in RAM.
          </p>
          <p className="text-slate-600">
            ProfileOS was engineered with strict resource limits:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside">
            <li><strong className="text-slate-900">Zero Background WakeLocks:</strong> ProfileOS has no reason to run when you close it. It holds zero wake locks and schedules no persistent background services.</li>
            <li><strong className="text-slate-900">Sub-35MB Idle RAM:</strong> While modern cloud apps consume 150MB to 300MB of resident RAM, ProfileOS stays light, allowing Android to keep other essential apps in cache without aggressive memory pressure.</li>
            <li><strong className="text-slate-900">Zero Radio Energy Waste:</strong> Cellular and Wi-Fi antennas are the highest battery draw components on a phone. By performing lookups locally, ProfileOS leaves the radio modem in sleep state.</li>
          </ul>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 6: OFFLINE RESILIENCE */}
        <section id="offline-resilience" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Sparkles className="w-4 h-4" />
            <span>Real-World Networking</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            6. 100% Offline Uptime in High-Stakes Events
          </h2>
          <p className="text-slate-600">
            Have you ever attended a crowded tech conference with 10,000 attendees? In high-density venues like convention centers, stadiums, and subterranean transit systems, cellular towers experience severe congestion. Wi-Fi networks require captive portal logins that frequently disconnect.
          </p>
          <p className="text-slate-600">
            If your digital identity tool relies on the cloud, it will fail precisely when you need it most. You stand before an important prospective client or investor, and your screen is stuck on a spinning wheel.
          </p>
          <p className="text-slate-600">
            With ProfileOS, you can activate <strong className="font-semibold text-slate-900">Airplane Mode</strong> and the app operates with 100% functionality. You can switch spaces, generate high-contrast optical QR codes, copy links, and execute swipe shortcuts with absolute reliability.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 7: MATRIX */}
        <section id="architecture-matrix" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Sliders className="w-4 h-4" />
            <span>Comparison Matrix</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            7. Architecture Comparison: Local-First vs Cloud
          </h2>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 sm:p-4">Dimension</th>
                  <th className="p-3.5 sm:p-4 text-blue-700">ProfileOS (Local-First)</th>
                  <th className="p-3.5 sm:p-4 text-slate-600">Cloud Link Aggregators</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Data Master Location</td>
                  <td className="p-3.5 sm:p-4 text-emerald-600 font-bold">On-device SQLite database</td>
                  <td className="p-3.5 sm:p-4">Remote corporate cloud server</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Lookup Latency</td>
                  <td className="p-3.5 sm:p-4 text-emerald-600 font-bold">&lt; 3 ms (Flash memory)</td>
                  <td className="p-3.5 sm:p-4">400 ms – 2,000 ms (Cellular network)</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Offline Functionality</td>
                  <td className="p-3.5 sm:p-4 text-emerald-600 font-bold">100% complete features</td>
                  <td className="p-3.5 sm:p-4">Disabled or cached-read only</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Privacy &amp; Telemetry</td>
                  <td className="p-3.5 sm:p-4 text-emerald-600 font-bold">Zero trackers, zero analytics</td>
                  <td className="p-3.5 sm:p-4">Trackers, device fingerprinting, analytics</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Authentication Required</td>
                  <td className="p-3.5 sm:p-4 text-emerald-600 font-bold">None (Launch and use instantly)</td>
                  <td className="p-3.5 sm:p-4">Email, password, or third-party OAuth</td>
                </tr>
                <tr>
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">Service Longevity</td>
                  <td className="p-3.5 sm:p-4 text-emerald-600 font-bold">Permanent (Independent of servers)</td>
                  <td className="p-3.5 sm:p-4">Dies if company pivots or shuts down</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 8: CONCLUSION */}
        <section id="conclusion" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Lock className="w-4 h-4" />
            <span>Conclusion</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            8. The Future of Sovereign Personal Computing
          </h2>
          <p className="text-slate-600">
            Local-first is more than an implementation detail; it is an ethical engineering philosophy. By putting SQLite on Android at the center of ProfileOS, we guarantee that you retain total ownership over your contacts, spaces, and digital identity.
          </p>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-3 mt-4">
            <p className="text-sm font-semibold text-blue-300">Takeaway for Android Users &amp; Developers:</p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              You don&apos;t need to surrender your privacy to share your profiles quickly. With ProfileOS, your data remains safely in your pocket, accessible in microseconds, and completely protected from surveillance.
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
