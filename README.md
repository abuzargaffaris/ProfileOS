# ProfileOS — Official Application Website & Feature Guide

<p align="center">
  <img src="public/assets/App%20Screenshots/01_ProfileOS_Main_Screen.jpg" alt="ProfileOS Screen Showcase" width="280" style="border-radius: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.15);" />
</p>

<p align="center">
  <strong>"All Your Profiles. One Place."</strong><br />
  The official personal marketing portal, interactive feature showcase, and architecture guide for the <strong>ProfileOS</strong> native Android application by <strong>PrintionUp Studio</strong>.
</p>

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.profileos.app" target="_blank" rel="noopener noreferrer">
    <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" height="64" />
  </a>
</p>

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.profileos.app"><img src="https://img.shields.io/badge/Google_Play-Available_Now-0086F8?style=for-the-badge&logo=google-play&logoColor=white" alt="Google Play" /></a>
  <img src="https://img.shields.io/badge/Platform-Android_8.0+-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Android 8.0+" />
  <img src="https://img.shields.io/badge/Privacy-100%25_Offline-10B981?style=for-the-badge" alt="100% Offline Privacy" />
  <img src="https://img.shields.io/badge/Studio-PrintionUp_Studio-FA5A00?style=for-the-badge" alt="PrintionUp Studio" />
  <img src="https://img.shields.io/badge/Status-Personal_Project-8B5CF6?style=for-the-badge" alt="Personal Project" />
</p>

---

## 📌 Executive Summary

**ProfileOS** is a specialized, privacy-centric mobile utility engineered for creators, freelancers, entrepreneurs, and digital professionals who juggle multiple usernames, social handles, portfolio URLs, and developer accounts. Instead of memorizing handles or digging through dozens of separate apps, ProfileOS consolidates your entire digital presence into one lightning-fast, offline-first command center.

This repository hosts the **official personal showcase website** for ProfileOS. It gives users an interactive preview of the application's interface, touch gestures, dynamic sharing workflows, and offline privacy model.

---

## 📲 Get it on Google Play Store

The official Android app is live on Google Play with zero ads, zero telemetry, and instant setup:

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.profileos.app" target="_blank" rel="noopener noreferrer">
    <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" height="74" />
  </a>
</p>

| Metric / Specification | Detail |
| :--- | :--- |
| **Official Store Link** | [**play.google.com/store/apps/details?id=com.profileos.app**](https://play.google.com/store/apps/details?id=com.profileos.app) |
| **Package Identifier** | `com.profileos.app` |
| **Platform Compatibility** | Android 8.0 (Oreo / API Level 26) through Android 15+ |
| **Data Storage Architecture** | 100% On-Device Local SQLite / Room Database |
| **Internet & Cloud Permissions** | None (Operates completely offline with zero server sync) |
| **Device Permissions Required** | **Zero** (No camera, contacts, microphone, or storage permissions) |
| **Monetization & Analytics** | 100% Free • Zero Ads • Zero Third-Party Tracking SDKs |
| **Creator & Engineering Lead** | **PrintionUp Studio** |

---

## 🚀 Complete Application Features Breakdown

ProfileOS is designed around four core pillars: **Speed**, **Clarity**, **Organization**, and **Privacy**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                              PROFILEOS                                 │
│                                                                        │
│   ┌─────────────────────┐   ┌───────────────────┐   ┌──────────────┐   │
│   │ Multi-Profile       │   │ Natural Gestures  │   │ Dynamic      │   │
│   │ Identity Separation │──▶│ Engine            │──▶│ Share        │   │
│   │ (Personal / Work)   │   │ (Swipe L / R)     │   │ Formats      │   │
│   └─────────────────────┘   └───────────────────┘   └──────────────┘   │
│              │                        │                    │           │
│              ▼                        ▼                    ▼           │
│   ┌─────────────────────┐   ┌───────────────────┐   ┌──────────────┐   │
│   │ 229+ Platform       │   │ High-Contrast     │   │ Private      │   │
│   │ Catalog Engine      │   │ Offline QR Codes  │   │ Masking Mode │   │
│   └─────────────────────┘   └───────────────────┘   └──────────────┘   │
│                                       │                                │
│                                       ▼                                │
│                   100% ON-DEVICE ZERO TELEMETRY VAULT                  │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. 🗂️ Multi-Identity Profile Separation
Keep distinct aspects of your personal and professional life separated into isolated workspaces:
- **Independent Workspaces**: Create dedicated profiles for **Personal**, **Work / Freelance**, **PrintionUp Studio**, or specific client projects.
- **Isolated Handle Collections**: Each profile contains its own distinct handles, URLs, and sharing templates. Never accidentally hand out a personal gamer tag when closing a client contract.
- **One-Tap Identity Switcher**: Jump between identities in milliseconds with glanceable handle-count badges.
- **Custom Visual Branding**: Assign custom avatar initials, studio badges, gradient banners, and taglines to each profile.

### 2. ⚡ The Dual-Direction Gesture Engine
Sharing a handle shouldn't require opening menus or navigating sheets. ProfileOS introduces fluid swipe interactions:
- **👉 Swipe Right (Instant Handle Copy)**: Copies the clean handle (e.g. `@printionupstudio` or `printionupstudio`) directly to the system clipboard with tactile haptic feedback.
- **👈 Swipe Left (Dynamic Template Copy)**: Copies your custom-formatted sharing template (e.g. `Instagram: @printionupstudio • https://instagram.com/printionupstudio`) in a single gesture.
- **👆 Tap (Handle Details & Action Suite)**: Opens a comprehensive bottom sheet with options to open in browser, launch QR display, edit details, or reassign profiles.

### 3. 🛡️ Private Masking Mode (Screen-Share / Streamer Shield)
Designed for live streamers, presenters, content creators, and remote workers:
- **Visual On-Screen Obfuscation**: Obscures sensitive username characters across all cards (e.g., transforming `@printionupstudio` into `@pr••••io`).
- **Safe Public Demonstrations**: Display your active workspace, categories, and setup on stage or on stream without revealing private handles.
- **One-Tap Toggle**: Instantly toggle masking on or off from the main workspace toolbar.

### 4. 🔲 High-Contrast Offline QR Presentation
Instantly connect during real-world meetups, conferences, and networking events:
- **Zero-Latency QR Rendering**: Generates crisp, scannable SVG QR codes for any configured profile handle or custom URL without requiring an internet connection.
- **Full-Screen Scanning Modal**: High-contrast black-and-white presentation optimized for rapid scanning by any smartphone camera or QR reader.
- **Direct Actions**: Quick "Copy Link" and "Share" buttons accompanied by live URL verification indicators.

### 5. 📝 Dynamic Sharing & Multi-Format Exporter
Share one handle or your entire workspace formatted precisely for any context:
- **Dynamic Variable Tokens**:
  - `[platform_name]` → Injects the platform's proper name (e.g., "Instagram", "GitHub").
  - `[username]` → Injects your specific username or handle.
  - `[account_url]` → Injects the fully resolved web link.
- **Preconfigured Output Formats**:
  - **Plain Text / Quick Message**: Clean list formatted for WhatsApp, Slack, SMS, or direct messages.
  - **Markdown Format**: Ready-to-paste markdown links for GitHub READMEs, personal documentation, and blogs.
  - **Structured JSON**: Machine-readable JSON array for personal portfolio websites, API configurations, and developer tools.
  - **Custom Template**: User-defined formatting string saved for instant one-swipe retrieval.
- **"Share All" Action Sheet**: Distribute your entire profile catalogue in a single tap via Android's native share sheet.

### 6. 🌐 229+ Platform Catalog & Custom Web Links
ProfileOS comes preloaded with URL schemas, icons, and validation rules for over 229 creator and developer services:
- **Popular & Social**: Instagram, Threads, X (Twitter), Facebook, TikTok, YouTube, LinkedIn, Bluesky, Pinterest, Snapchat.
- **Developer & Tech**: GitHub, GitLab, Stack Overflow, Discord, Reddit, CodePen, Mastodon, Notion, Hacker News, Dev.to.
- **Design & Creative**: Figma, Behance, Dribbble, ArtStation, Patreon, Unsplash, VSCO.
- **Audio & Music**: Spotify, Apple Music, SoundCloud, Bandcamp, Tidal, Deezer.
- **Messaging & Communication**: Telegram, WhatsApp, Signal, Slack, Messenger, Matrix.
- **Video & Streaming**: Twitch, Kick, Steam, Vimeo, Rumble.
- **Publishing & Newsletters**: Substack, Medium, Ghost, Dev.to, Hashnode.
- **Finance & Support**: PayPal.me, Buy Me a Coffee, Ko-fi, Cash App, Venmo.
- **Lifestyle & Sports**: Strava, AllTrails, Goodreads, Letterboxd.
- **Custom Web & Deep Links**: Add any personal domain (`https://...`), custom portfolio link, or custom app URI schema (`app://...`).

### 7. ↕️ Reordering & Custom Hierarchy Mode
- **Custom Sorting**: Put your top 3 daily accounts right at the top for thumb-friendly ergonomics.
- **Reordering Mode**: Dedicated sorting controls with persistent ordering saved in local storage.
- **Category Filtering**: Filter cards in real time by category pills (All, Popular, Social & Video, Developer, etc.).

### 8. 🎨 Tactile Ergonomics & Personalization
- **Theme Modes**: Refined light interface with high-contrast slate typography.
- **Compact Card Density**: Toggle between relaxed cards and a dense, compact layout for viewing more handles without scrolling.
- **Tactile Haptic Engine**: Custom haptic feedback patterns for swipe thresholds, clipboard copy confirmations, and reorder events.
- **Browser Behavior Settings**: Choose whether links launch in your default system browser or in an in-app browser overlay.

### 9. 🔒 100% On-Device Privacy Standard
- **No Cloud Synchronization**: Your handles, profiles, and links reside exclusively in your device's protected local database.
- **Zero Account Creation**: No passwords, no phone numbers, no emails, and no third-party logins (Google, Apple, etc.) required.
- **Zero Analytics SDKs**: No Google Analytics, no Firebase Crashlytics, no Facebook SDK, and no advertising trackers.
- **Data Portability**: Complete export of all workspaces into a human-readable JSON backup file with instant restore capabilities.

---

## 📱 10-Screen Native Android Catalog

Every core screen of the Android application is documented and viewable through the website's interactive showcase:

| # | Screen Name | Category | Primary Workflow & Action |
| :---: | :--- | :--- | :--- |
| **01** | **ProfileOS Main Workspace** | Core Dashboard | Glanceable cards, category pills, swipe-to-copy, Private Masking toggle |
| **02** | **Profiles Management** | Organization | Multi-identity switcher (Personal, Studio, Work) with handle counts |
| **03** | **Instant QR Presentation** | Sharing | Camera-ready scannable QR display with one-tap link copy and status check |
| **04** | **Handle Details & Actions** | Handle Sheet | Open in browser, reassign profile, edit URL schemas, custom token share |
| **05** | **Add Social Handle** | Input & Setup | 229+ service picker, smart handle suggestions, live preview card |
| **06** | **Share All Handles** | Export | One-tap bulk share in Markdown, JSON, or custom dynamic templates |
| **07** | **Reordering Mode** | Ergonomics | Reorder handles up or down to keep essential profiles in quick reach |
| **08** | **Personalize Workspace** | Settings | Accent color, compact density, haptic feedback, swipe preferences |
| **09** | **Edit Profile Identity** | Identity | Profile banner gradient, avatar initials, workspace name, bio & stats |
| **10** | **Platform Catalogue** | Directory | Categorized search and browse across 229+ recognized creator networks |

---

## 🖥️ Interactive Showcase Website Capabilities

This website provides a high-fidelity web simulation of the ProfileOS experience:

- **Interactive Android Mockup**: Experience the native device frame with live Private Masking toggle (`@pr••••io` vs `@printionupstudio`).
- **Live Swipe-to-Copy Simulation**: Test the swipe-right handle copy and swipe-left template copy interactions in your browser.
- **Instant QR Code Generator**: Generate and download scannable QR codes for any selected handle in real time.
- **One-Tap Clipboard Engine**: Experience the non-intrusive notification toasts and instant clipboard integration.
- **Dynamic Template Exporter**: Test live template switching between **Markdown**, **JSON**, and tokenized custom formats.
- **Responsive 10-Screen Carousel & Lightbox**: Full touch-swipe gesture support to inspect all high-resolution Android app screenshots.
- **Exhaustive Legal Portals**: Fully structured 12-section Offline Privacy Policy, 16-section Terms of Service, and interactive Help Center.

---

## 🛠️ Showcase Website Tech Stack

| Component | Specification |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript 5.x](https://www.typescriptlang.org/) |
| **Bundler & Dev Server** | [Vite 6](https://vite.dev/) |
| **CSS Framework** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Component Icons** | [Lucide React](https://lucide.dev/) (consistent vector iconography) |
| **Motion & Micro-interactions** | [Motion (Framer)](https://motion.dev/) |
| **QR Code Engine** | [qrcode.react](https://www.npmjs.com/package/qrcode.react) |

---

## 📁 Repository Layout

```
├── public/
│   └── assets/
│       └── App Screenshots/      # Authentic 10-screen Android captures
├── src/
│   ├── components/
│   │   ├── demos/
│   │   │   ├── CopyDemo.tsx             # One-tap clipboard copy simulation
│   │   │   ├── InteractiveAppMockup.tsx # Android device mockup with Private Masking
│   │   │   ├── QrModalDemo.tsx          # Real-time QR presentation dialog
│   │   │   ├── ShareTemplateDemo.tsx    # Multi-format template export switcher
│   │   │   └── SwipeDemo.tsx            # Gesture swipe-to-copy demonstration
│   │   ├── Footer.tsx                   # Brand manifesto, social channels & Play Store CTA
│   │   ├── Logo.tsx                     # Vector ProfileOS brand marks
│   │   ├── Navbar.tsx                   # Responsive header with direct Home navigation
│   │   ├── ScreenshotGallery.tsx        # 10-screen visual grid with high-res modal
│   │   ├── ScreenshotsCarousel.tsx      # Interactive showcase carousel with swipe
│   │   ├── SocialIcons.tsx              # Vector platform brand icons
│   │   └── Toast.tsx                    # Non-intrusive action feedback toasts
│   ├── data/
│   │   ├── platformsData.ts             # Supported catalog & studio social links
│   │   └── screenshotsData.ts           # Metadata for the 10 core application screens
│   ├── pages/
│   │   ├── AboutPage.tsx                # Studio story, philosophy & manifesto
│   │   ├── AppPreviewPage.tsx           # Full 10-screen visual walkthrough
│   │   ├── FeaturesPage.tsx             # In-depth breakdown of features & interactions
│   │   ├── HelpCenterPage.tsx           # Categorized FAQ and troubleshooting
│   │   ├── HomePage.tsx                 # Landing page with hero, showcase & demos
│   │   ├── HowItWorksPage.tsx           # 4-step user workflow walkthrough
│   │   ├── PlatformsPage.tsx            # Directory of 229+ supported platforms
│   │   ├── PrivacyPolicyPage.tsx        # 12-section offline privacy policy
│   │   └── TermsPage.tsx                # 16-section Terms of Service
│   ├── App.tsx                          # App shell, tab state & hash synchronization
│   ├── index.css                        # Tailwind CSS v4 entry & styling
│   ├── main.tsx                         # React 19 application entry point
│   └── types.ts                         # Shared TypeScript definitions
├── index.html                           # Entry HTML with Open Graph & SEO metadata
├── metadata.json                        # Applet metadata
├── package.json                         # Project dependencies and npm scripts
├── tsconfig.json                        # TypeScript compiler configuration
└── vite.config.ts                       # Vite bundler configuration
```

---

## 🔗 Official PrintionUp Studio Channels

Stay connected with the creator of ProfileOS across verified channels:

- 📷 **Instagram**: [@printionupstudio](https://www.instagram.com/printionupstudio)
- 🧵 **Threads**: [@printionupstudio](https://www.threads.com/@printionupstudio)
- 𝕏 **X (Twitter)**: [@printionupstd](https://x.com/printionupstd)
- 📘 **Facebook**: [PrintionUp Studio](https://www.facebook.com/share/1KB57XrtVj/)
- 🦋 **Bluesky**: [@printionupstudio.bsky.social](https://bsky.app/profile/printionupstudio.bsky.social)
- 📌 **Pinterest**: [PrintionUp Studio](https://pin.it/3acx5HGdB)
- ▶️ **Google Play Store**: [ProfileOS on Google Play](https://play.google.com/store/apps/details?id=com.profileos.app)

---

## 📄 Personal Ownership & Legal Notice

© 2026 ProfileOS. All rights reserved.  
Conceived, designed, and personally engineered by **PrintionUp Studio**.  
Google Play and the Google Play logo are trademarks of Google LLC.
