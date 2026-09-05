import React, { useState } from 'react';
import { User, Briefcase, Sparkles, Plus, Check, Globe } from 'lucide-react';
import { SocialIcon } from '../SocialIcons';

interface ProfileCreateDemoProps {
  onNotify?: (text: string, type?: 'info' | 'success') => void;
}

interface DemoAccount {
  platform: string;
  handle: string;
  icon: string;
  type: string;
}

const PRESET_WORKSPACES = [
  { id: 'personal', name: 'Personal', icon: User, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { id: 'work', name: 'Work / Pro', icon: Briefcase, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { id: 'creator', name: 'Creator / Studio', icon: Sparkles, color: 'text-amber-600 bg-amber-50 border-amber-200' },
];

const SAMPLE_ACCOUNTS_BY_PROFILE: Record<string, DemoAccount[]> = {
  personal: [
    { platform: 'Instagram', handle: '@abuzar.g', icon: 'instagram', type: 'Social' },
    { platform: 'Threads', handle: '@abuzar.g', icon: 'threads', type: 'Social' },
    { platform: 'Spotify', handle: 'abuzar-music', icon: 'spotify', type: 'Media' },
  ],
  work: [
    { platform: 'LinkedIn', handle: 'abuzargaffari', icon: 'linkedin', type: 'Professional' },
    { platform: 'GitHub', handle: 'theabuzargaffari', icon: 'github', type: 'Development' },
    { platform: 'Email', handle: 'theabuzargaffari@gmail.com', icon: 'gmail', type: 'Contact' },
  ],
  creator: [
    { platform: 'YouTube', handle: '@PrintionUp', icon: 'youtube', type: 'Video' },
    { platform: 'X / Twitter', handle: '@PrintionUp', icon: 'x', type: 'Social' },
    { platform: 'Behance', handle: 'printionupstudio', icon: 'behance', type: 'Portfolio' },
  ]
};

export const ProfileCreateDemo: React.FC<ProfileCreateDemoProps> = ({ onNotify }) => {
  const [selectedProfile, setSelectedProfile] = useState<'personal' | 'work' | 'creator'>('personal');
  const [accounts, setAccounts] = useState<Record<string, DemoAccount[]>>(SAMPLE_ACCOUNTS_BY_PROFILE);
  const [newHandle, setNewHandle] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('Instagram');

  const currentAccounts = accounts[selectedProfile] || [];

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHandle.trim()) return;

    const formattedHandle = newHandle.startsWith('@') ? newHandle.trim() : `@${newHandle.trim()}`;
    const newAcc: DemoAccount = {
      platform: selectedPlatform,
      handle: formattedHandle,
      icon: selectedPlatform.toLowerCase().replace(/[^a-z0-9]/g, ''),
      type: 'Custom'
    };

    setAccounts(prev => ({
      ...prev,
      [selectedProfile]: [newAcc, ...prev[selectedProfile]]
    }));

    setNewHandle('');
    if (onNotify) {
      onNotify(`Added ${formattedHandle} to ${selectedProfile.toUpperCase()} profile!`, 'success');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-6 space-y-4">
      {/* Profile Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#3B82F6]">Profile Workspace</span>
          <h4 className="font-black text-slate-900 text-base">Active Profile: {PRESET_WORKSPACES.find(p => p.id === selectedProfile)?.name}</h4>
        </div>

        {/* Profile Tabs */}
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl gap-1 self-start sm:self-auto">
          {PRESET_WORKSPACES.map(p => {
            const Icon = p.icon;
            const isActive = selectedProfile === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProfile(p.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#3B82F6]' : 'text-slate-400'}`} />
                <span>{p.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleAddAccount} className="flex gap-2">
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="Instagram">Instagram</option>
          <option value="X / Twitter">X (Twitter)</option>
          <option value="GitHub">GitHub</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="YouTube">YouTube</option>
          <option value="TikTok">TikTok</option>
        </select>
        <input
          type="text"
          value={newHandle}
          onChange={(e) => setNewHandle(e.target.value)}
          placeholder="Enter username (e.g. @yourname)..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          type="submit"
          disabled={!newHandle.trim()}
          className="px-3.5 py-2 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </form>

      {/* Account List in Selected Profile */}
      <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
        {currentAccounts.map((acc, idx) => (
          <div
            key={`${acc.platform}-${idx}`}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-800 shrink-0">
                <SocialIcon name={acc.icon} size={15} />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-slate-900 block truncate">{acc.platform}</span>
                <span className="font-mono text-[11px] text-slate-500 truncate block">{acc.handle}</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 text-[10px] font-bold text-slate-600 shrink-0">
              {selectedProfile.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
