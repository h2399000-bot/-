import React from 'react';
import { Notice } from '../types';
import { X, Calendar, User, Eye, Download, Share2, Pin } from 'lucide-react';

interface NoticeDetailModalProps {
  notice: Notice | null;
  onClose: () => void;
  onShare: () => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  notice,
  onClose,
  onShare,
}) => {
  if (!notice) return null;

  return (
    <div 
      id="modal-notice-detail"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges & Meta */}
        <div className="flex items-center gap-2 mb-3">
          {notice.isPinned && (
            <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1">
              <Pin className="w-3 h-3" />
              <span>주요 공지</span>
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded bg-slate-100 text-purple-700 border border-slate-200 text-xs font-bold">
            {notice.category}
          </span>
        </div>

        <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug mb-4">
          {notice.title}
        </h2>

        {/* Meta details bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-600" />
              <span>{notice.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>{notice.date}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>조회수 {notice.views}회</span>
            </span>
            <button
              onClick={onShare}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 cursor-pointer"
              title="공유"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-8 min-h-[140px]">
          {notice.content}
        </div>

        {/* Attachment box if present */}
        {notice.attachmentName && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 truncate">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[11px] text-slate-500 block">첨부파일</span>
                <span className="text-xs font-bold text-slate-900 truncate block">{notice.attachmentName}</span>
              </div>
            </div>
            <button 
              onClick={() => alert(`[안내] '${notice.attachmentName}' 파일 다운로드를 요청했습니다.`)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shrink-0 shadow-md shadow-purple-900/20 cursor-pointer"
            >
              다운로드
            </button>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            목록으로 닫기
          </button>
        </div>

      </div>
    </div>
  );
};
