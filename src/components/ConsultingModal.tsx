import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ConsultingType } from '../types';
import { X, Send, CheckCircle2, Briefcase, Calendar } from 'lucide-react';

interface ConsultingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: ConsultingType;
}

export const ConsultingModal: React.FC<ConsultingModalProps> = ({
  isOpen,
  onClose,
  initialType = '기업 HRD 컨설팅',
}) => {
  const { submitConsultingRequest } = useData();

  const [formData, setFormData] = useState({
    clientName: '',
    companyOrAffiliation: '',
    phone: '',
    email: '',
    type: initialType,
    preferredDate: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialType) {
      setFormData(prev => ({ ...prev, type: initialType }));
    }
  }, [initialType]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.phone) {
      alert('성함과 연락처를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitConsultingRequest(formData);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      id="modal-consulting-request"
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

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">맞춤형 컨설팅 신청이 완료되었습니다!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              신청해주신 컨설팅 분야(<strong>{formData.type}</strong>)에 맞춰 한국고용진흥원 수석 컨설턴트가 24시간 내에 상담 일정을 확정해 연락드립니다.
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
              <Briefcase className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Expert Consultation</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">맞춤형 HR & 커리어 컨설팅 신청</h3>
            <p className="text-xs text-slate-500 mb-6">
              기업 맞춤형 직무 설계, 사내 교육체계 구축 및 1:1 심층 취업 코칭을 지원합니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    신청자 성함 / 담당자명 <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="홍길동"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    소속 기관 / 기업명
                  </label>
                  <input
                    type="text"
                    value={formData.companyOrAffiliation}
                    onChange={(e) => setFormData({ ...formData, companyOrAffiliation: e.target.value })}
                    placeholder="(주)회사명 또는 개인"
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
                    placeholder="010-0000-0000"
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
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    희망 컨설팅 분야 <span className="text-purple-600">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ConsultingType })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  >
                    <option value="기업 HRD 컨설팅">기업 HRD & 직무역량 체계</option>
                    <option value="1:1 취업·커리어 코칭">1:1 취업 & 이직 커리어 코칭</option>
                    <option value="NCS 기반 직무분석">공공기관 NCS 채용 및 평가도구</option>
                    <option value="청년·신중년 고용지원">신중년 & 퇴직자 전직지원</option>
                    <option value="기타 맞춤 컨설팅">기타 맞춤형 자문</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    상담 희망일
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  상담 요청 사항 및 배경
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="현재 기업의 주요 HR 당면과제나 개인 커리어 고민을 남겨주시면 상담 시 솔루션을 준비해드립니다."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? '접수 처리 중...' : '컨설팅 신청서 제출하기'}</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
