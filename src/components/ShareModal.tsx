import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, Copy, Check, Share2, MessageCircle, Globe } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title }) => {
  const { siteConfig } = useData();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://k-epi.or.kr';
  const shareTitle = title || `${siteConfig.brandName} - ${siteConfig.tagline}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const input = document.createElement('input');
      input.value = currentUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareKakao = () => {
    window.open(`https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareNative = () => {
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: siteConfig.heroSubtitle,
        url: currentUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div 
      id="modal-social-share"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl p-6 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-purple-700">
            <Share2 className="w-5 h-5" />
            <h3 className="text-lg font-black text-slate-900">웹사이트 및 콘텐츠 공유</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-6">
          한국고용진흥원의 교육 프로그램과 혁신 컨설팅 정보를 지인 및 팀원들과 공유해보세요.
        </p>

        {/* Social Share Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <button
            onClick={shareKakao}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-700 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shadow-sm">
              Talk
            </div>
            <span className="text-[11px] font-medium text-slate-700">카카오톡</span>
          </button>

          <button
            onClick={shareTwitter}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm shadow-sm">
              𝕏
            </div>
            <span className="text-[11px] font-medium text-slate-700">트위터/X</span>
          </button>

          <button
            onClick={shareFacebook}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              f
            </div>
            <span className="text-[11px] font-medium text-slate-700">페이스북</span>
          </button>

          <button
            onClick={shareNative}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-medium text-slate-700">더보기</span>
          </button>
        </div>

        {/* Link Copy Bar */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
            URL 직접 복사
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 select-all focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>복사됨!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>복사</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
