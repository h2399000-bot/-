import React from 'react';
import { useData } from '../context/DataContext';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface AnnouncementBarProps {
  onNavigateToEducation: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onNavigateToEducation }) => {
  const { siteConfig, updateSiteConfig } = useData();
  const { announcementBar } = siteConfig;

  if (!announcementBar?.enabled) return null;

  return (
    <div 
      id="announcement-bar"
      className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-purple-100 px-4 py-2 text-xs sm:text-sm border-b border-purple-800 z-50 flex items-center justify-between shadow-sm"
    >
      <div className="flex-1 flex items-center justify-center gap-2 text-center truncate">
        <Sparkles className="w-4 h-4 text-purple-300 shrink-0 animate-pulse" />
        <span className="font-medium tracking-tight truncate text-white">{announcementBar.text}</span>
        <button
          id="btn-announcement-action"
          onClick={onNavigateToEducation}
          className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-purple-900 bg-purple-200 hover:bg-white px-2.5 py-0.5 rounded-full transition-colors shrink-0 shadow-sm"
        >
          <span>자세히 보기</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <button
        id="btn-close-announcement"
        onClick={() => updateSiteConfig({ announcementBar: { ...announcementBar, enabled: false } })}
        className="text-purple-300 hover:text-white p-1 ml-2 transition-colors"
        title="공지 닫기"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
