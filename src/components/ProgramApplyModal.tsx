import React, { useState } from 'react';
import { Program } from '../types';
import { useData } from '../context/DataContext';
import { X, Send, CheckCircle2, GraduationCap, Clock, MapPin, Award } from 'lucide-react';

interface ProgramApplyModalProps {
  program: Program | null;
  onClose: () => void;
}

export const ProgramApplyModal: React.FC<ProgramApplyModalProps> = ({ program, onClose }) => {
  const { submitProgramApplication } = useData();

  const [formData, setFormData] = useState({
    applicantName: '',
    phone: '',
    email: '',
    birthDate: '',
    motivation: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!program) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.phone) {
      alert('성함과 연락처는 필수 입력 항목입니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitProgramApplication({
        programId: program.id,
        programTitle: program.title,
        applicantName: formData.applicantName,
        phone: formData.phone,
        email: formData.email,
        birthDate: formData.birthDate,
        motivation: formData.motivation,
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="modal-program-apply"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">수강 신청이 정상 접수되었습니다!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              <strong>[{program.title}]</strong> 과정에 지원해주셔서 감사합니다.<br />
              담당 교육 매니저가 기재해주신 연락처(<strong>{formData.phone}</strong>)로 선발 절차 및 세부 수강 안내를 전달해 드립니다.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-900/20 cursor-pointer"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-purple-700 mb-1">
              <GraduationCap className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Online Application</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">교육과정 온라인 수강 신청</h3>
            
            {/* Selected Course summary chip */}
            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 mb-6">
              <span className="text-[11px] font-bold text-purple-700 block mb-0.5">신청 대상 과정</span>
              <p className="text-sm font-extrabold text-slate-900 line-clamp-1">{program.title}</p>
              <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                <span>{program.duration}</span>
                <span>•</span>
                <span>{program.tuition}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    신청자 성함 <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.applicantName}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                    placeholder="홍길동"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    생년월일 (6자리 또는 8자리)
                  </label>
                  <input
                    type="text"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    placeholder="예: 19980520"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    휴대전화 번호 <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    이메일 주소
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hong@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  지원 동기 및 목표 (선택)
                </label>
                <textarea
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="본 과정을 통해 달성하고자 하는 목표나 희망 취업 분야를 간단히 적어주세요."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white resize-none"
                />
              </div>

              <p className="text-[11px] text-slate-500">
                * 제출해주신 정보는 한국고용진흥원 수강생 관리 및 안내 목적으로만 안전하게 사용됩니다.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? '신청서 제출 중...' : '온라인 수강 신청서 제출'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
