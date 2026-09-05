export type PageTab =
  | 'home'
  | 'features'
  | 'how-it-works'
  | 'preview'
  | 'platforms'
  | 'help'
  | 'about'
  | 'privacy'
  | 'terms';

export interface SocialPlatform {
  id: string;
  name: string;
  category: 'Popular' | 'Social & Video' | 'Messaging' | 'Web & Custom';
  handle: string;
  displayName: string;
  url: string;
  maskedHandle: string;
  iconType: 'instagram' | 'threads' | 'x' | 'facebook' | 'bluesky' | 'pinterest' | 'website';
  accentColor: string;
  description: string;
}

export interface ScreenshotFeature {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  screenKey:
    | 'dashboard'
    | 'profiles'
    | 'qr'
    | 'handle-details'
    | 'add-handle'
    | 'share-all'
    | 'reorder'
    | 'settings'
    | 'edit-profile'
    | 'select-platform';
  imageFileName?: string;
  imageSrc?: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'info' | 'success' | 'action';
}
