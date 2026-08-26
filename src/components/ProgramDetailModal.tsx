import React from 'react';
import { Program } from '../types';
import { 
  X, 
  Clock, 
  MapPin, 
  Users, 
  Award, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Share2,
  BookOpen
} from 'lucide-react';

interface ProgramDetailModalProps {
  program: Program | null;
  onClose: () => void;
  onApply: (program: Program) => void;
  onShare: () => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  onApply,
  onShare,
}) => {
  if (!program) return null;

  return (
    <div 
      id="modal-program-detail"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Image */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={program.imageUrl}
            alt={program.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="space-y-1">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-600 text-white shadow">
                {program.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {program.title}
              </h2>
            </div>
            <button
              onClick={onShare}
              className="p-2.5 rounded-xl bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition-colors cursor-pointer"
              title="과정 공유"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* Subtitle & Description */}
          <div>
            <h4 className="text-sm sm:text-base font-bold text-purple-700 mb-2">
              {program.subtitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {program.description}
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-purple-600 shrink-0" />
              <span><strong>교육 시간:</strong> {program.duration} ({program.schedule})</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
              <span><strong>교육 장소:</strong> {program.location}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Users className="w-4 h-4 text-purple-600 shrink-0" />
              <span><strong>모집 정원:</strong> {program.currentApplicants}명 / {program.capacity}명 ({program.status})</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Award className="w-4 h-4 text-purple-600 shrink-0" />
              <span><strong>수강료:</strong> {program.tuition}</span>
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span>추천 수강 대상</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 bg-purple-50 p-3 rounded-xl border border-purple-100">
              {program.targetAudience}
            </p>
          </div>

          {/* Detailed Curriculum Modules */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>상세 커리큘럼 로드맵</span>
            </h4>
            <div className="space-y-2">
              {program.curriculum.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800"
                >
                  <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          {program.benefits && program.benefits.length > 0 && (
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                <span>수강생 특별 혜택 및 취업 연계</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {program.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-500 block">수강 비용</span>
            <span className="text-sm sm:text-base font-extrabold text-purple-700">{program.tuition}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(program);
              }}
              disabled={program.status === '모집마감'}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center gap-1.5 transition-all cursor-pointer ${
                program.status === '모집마감'
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/20'
              }`}
            >
              <span>{program.status === '모집마감' ? '모집 마감됨' : '지금 온라인 수강 신청'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
