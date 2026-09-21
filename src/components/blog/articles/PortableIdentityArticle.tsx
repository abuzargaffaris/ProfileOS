import React from 'react';
import { BlogPost } from '../../../types';
import {
  FileJson,
  FileText,
  Calendar,
  Clock,
  Lock,
  Code2,
  Terminal,
  Bookmark,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Download,
  Upload,
  ArrowRight,
  Copy,
  Layers,
  Check
} from 'lucide-react';

interface ArticleProps {
  post: BlogPost;
  onCopyLink: () => void;
  copiedLink: boolean;
}

export const PortableIdentityArticle: React.FC<ArticleProps> = ({
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
    { id: 'vendor-lockin-crisis', label: '1. The Digital Enclosure of Social Profiles' },
    { id: 'principle-of-data-sovereignty', label: '2. The Principle of Data Sovereignty' },
    { id: 'json-schema-specification', label: '3. The ProfileOS Universal JSON Schema' },
    { id: 'markdown-export-standard', label: '4. Markdown: Identity as Living Documentation' },
    { id: 'developer-automation', label: '5. Automating Websites with ProfileOS Exports' },
    { id: 'ten-year-test', label: '6. The 10-Year Test for Personal Software' },
    { id: 'how-to-export-restore', label: '7. Step-by-Step Export & Import Workflow' },
    { id: 'conclusion', label: '8. Own Your Identity Forever' },
  ];

  return (
    <div className="space-y-8" id="article-portable-identity">
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
            Where does your digital identity live?
          </p>
          <p>
            If you are like most internet creators, engineers, and professionals, your online presence is fractured across dozens of platforms: GitHub, LinkedIn, X, Mastodon, YouTube, Substack, Discord, Figma, and Behance. To tie these together, millions of people use centralized bio-link platforms.
          </p>
          <p>
            Yet almost none of those platforms provide a simple, machine-readable export of your data. If you decide to leave their service, your curated links, categorized spaces, custom bio descriptions, and handle order are held hostage behind a proprietary wall.
          </p>
          <p>
            At <strong className="font-semibold text-slate-900">ProfileOS</strong>, we believe in open standards. Your digital identity is too valuable to be locked inside someone else&apos;s cloud silo. That is why ProfileOS is built from the ground up around universal <strong className="font-bold text-slate-900">JSON &amp; Markdown portable exports</strong>.
          </p>
        </div>

        <hr className="border-slate-100" />

        {/* SECTION 1: VENDOR LOCK-IN CRISIS */}
        <section id="vendor-lockin-crisis" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Lock className="w-4 h-4" />
            <span>The Risk</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            1. The Digital Enclosure of Social Profiles
          </h2>
          <p className="text-slate-600">
            Digital platforms follow a predictable lifecycle known in tech as &quot;platform decay&quot;:
          </p>
          <ol className="space-y-2.5 text-xs sm:text-sm text-slate-600 list-decimal list-inside">
            <li><strong className="text-slate-900">Stage 1 (Acquisition):</strong> They offer a free, slick link-in-bio tool to attract millions of users.</li>
            <li><strong className="text-slate-900">Stage 2 (Monetization):</strong> They introduce paywalls for basic features like custom styling, analytics, or redirect links.</li>
            <li><strong className="text-slate-900">Stage 3 (Enclosure):</strong> They restrict exports, inject ads onto your personal profile, and monetize the visitors you sent to them.</li>
          </ol>
          <p className="text-slate-600">
            If you don&apos;t have a local, standardized backup of your entire profile graph, migrating to a new tool means manually copying dozens of URLs, passwords, and handles one by one.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 2: PRINCIPLE OF DATA SOVEREIGNTY */}
        <section id="principle-of-data-sovereignty" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <ShieldCheck className="w-4 h-4" />
            <span>Ethical Foundation</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            2. The Principle of Data Sovereignty
          </h2>
          <p className="text-slate-600">
            Data sovereignty means you have the fundamental technical right to access, export, modify, and delete your data without requiring permission from any corporation.
          </p>
          <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950 space-y-2">
            <h4 className="font-bold text-sm text-blue-900">The ProfileOS Portability Contract:</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-blue-900/90 list-disc list-inside">
              <li>Exports are 100% complete — nothing is held back behind a paywall.</li>
              <li>Exports use open, non-proprietary file formats: standard JSON and UTF-8 Markdown.</li>
              <li>You can export at any time with a single tap, even with zero internet connectivity.</li>
              <li>Any JSON file exported from ProfileOS can be imported back into ProfileOS on any Android phone.</li>
            </ul>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 3: JSON SCHEMA SPECIFICATION */}
        <section id="json-schema-specification" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <FileJson className="w-4 h-4" />
            <span>Technical Specification</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            3. The ProfileOS Universal JSON Schema
          </h2>
          <p className="text-slate-600">
            When you export your data from ProfileOS as JSON, you receive a clean, structured JSON file that follows a versioned schema. Here is an authentic representation of what that structure looks like:
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
            <pre className="leading-relaxed">
{`{
  "schemaVersion": "1.2.0",
  "exportedAt": "2026-09-21T10:30:00Z",
  "appVersion": "com.printionupstudio.profileos/2.4.0",
  "profiles": [
    {
      "id": "prof_work_01",
      "name": "PrintionUp Studio",
      "colorTheme": "#FB923C",
      "isDefault": true,
      "accounts": [
        {
          "platformId": "github",
          "category": "Developer",
          "handle": "abuzargaffaris",
          "url": "https://github.com/abuzargaffaris",
          "isPinned": true,
          "notes": "Open-source Android and local-first software"
        },
        {
          "platformId": "linkedin",
          "category": "Professional",
          "handle": "abuzargaffari",
          "url": "https://linkedin.com/in/abuzargaffari",
          "isPinned": true
        }
      ]
    }
  ]
}`}
            </pre>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm">
            Because this format is pure JSON, it is completely vendor-agnostic. You can parse it in Python with <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">json.loads()</code>, in Node.js with <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">JSON.parse()</code>, or in Go with standard structs.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 4: MARKDOWN EXPORT STANDARD */}
        <section id="markdown-export-standard" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <FileText className="w-4 h-4" />
            <span>Human-Readable Export</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            4. Markdown: Identity as Living Documentation
          </h2>
          <p className="text-slate-600">
            Machine-readable JSON is essential for backup and programmatic tools, but humans read documents. That is why ProfileOS also exports your identity as a beautifully formatted <strong className="font-semibold text-slate-900">Markdown (.md) file</strong>.
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
            <pre className="leading-relaxed">
{`# ProfileOS — Digital Identity Export
> Generated on September 21, 2026 • Local-First Sovereign Archive

## Space: PrintionUp Studio
| Platform | Handle | URL | Category |
| :--- | :--- | :--- | :--- |
| **GitHub** | \`@abuzargaffaris\` | https://github.com/abuzargaffaris | Developer |
| **LinkedIn** | \`@abuzargaffari\` | https://linkedin.com/in/abuzargaffari | Professional |
| **Play Store** | \`ProfileOS\` | https://play.google.com/store/apps/details?id=... | Software |

*Zero trackers. 100% on-device data sovereignty.*`}
            </pre>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm">
            You can drop this file directly into your personal <strong className="text-slate-900">Obsidian vault</strong>, import it into <strong className="text-slate-900">Notion</strong>, commit it to a private <strong className="text-slate-900">Git repository</strong>, or print it out on paper.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 5: DEVELOPER AUTOMATION */}
        <section id="developer-automation" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Terminal className="w-4 h-4" />
            <span>Developer Workflows</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            5. Automating Websites with ProfileOS Exports
          </h2>
          <p className="text-slate-600">
            Developers can leverage ProfileOS exports to power automated workflows. For example, you can write a tiny 10-line Node.js or Python script that reads your <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono">profileos-backup.json</code> and automatically regenerates the social link footer on your personal portfolio website or updates your GitHub profile README.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-2">
            <span className="text-slate-400 block font-sans font-bold">Python automation snippet:</span>
            <pre className="text-blue-300">
{`import json

with open("profileos-backup.json") as f:
    data = json.load(f)

for profile in data["profiles"]:
    print(f"## {profile['name']}")
    for account in profile["accounts"]:
        print(f"- [{account['platformId']}]({account['url']})")`}
            </pre>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm">
            Your phone becomes the single source of truth for your online presence, seamlessly propagating changes to your desktop tools and static sites.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 6: THE 10-YEAR TEST */}
        <section id="ten-year-test" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Sparkles className="w-4 h-4" />
            <span>Longevity Test</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            6. The 10-Year Test for Personal Software
          </h2>
          <p className="text-slate-600">
            Ask yourself this simple question: <strong className="font-semibold text-slate-900">&quot;Will I be able to open my data 10 years from now?&quot;</strong>
          </p>
          <p className="text-slate-600">
            If your data is trapped in a proprietary closed-source cloud database, the probability of it surviving a decade is virtually zero. Companies go bankrupt, APIs are deprecated, business models pivot, and servers are decommissioned.
          </p>
          <p className="text-slate-600">
            Plain text and standard JSON, on the other hand, have survived decades and will survive decades more. A JSON or Markdown file written today will be fully readable on any computer in the year 2036.
          </p>
        </section>

        <hr className="border-slate-100" />

        {/* SECTION 7: STEP BY STEP WORKFLOW */}
        <section id="how-to-export-restore" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Download className="w-4 h-4" />
            <span>Practical Guide</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            7. Step-by-Step Export &amp; Import Workflow
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <Download className="w-4 h-4" />
                How to Export:
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                1. Open ProfileOS → Tap <strong>Settings</strong> (gear icon).<br />
                2. Tap <strong>Data &amp; Backup</strong> → <strong>Export Profiles</strong>.<br />
                3. Select <strong>JSON</strong> (for database backup) or <strong>Markdown</strong> (for documents).<br />
                4. Save to Downloads, Drive, or share via email.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                <Upload className="w-4 h-4" />
                How to Restore / Import:
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                1. On any Android device with ProfileOS installed, open <strong>Settings</strong>.<br />
                2. Tap <strong>Restore from JSON</strong>.<br />
                3. Pick your exported <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] font-mono">.json</code> file via the system file picker.<br />
                4. ProfileOS validates the schema and repopulates all tables instantly.
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
            8. Own Your Identity Forever
          </h2>
          <p className="text-slate-600">
            In an era of centralized platform lock-in, ProfileOS stands for user autonomy. Your social graph, handles, and professional identities belong to you—not to us, and not to any cloud provider.
          </p>
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-2">
            <p className="text-sm font-bold text-blue-400">The Local-First Standard:</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              Export whenever you want. Restore wherever you want. Keep your digital identity permanently decentralized.
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
