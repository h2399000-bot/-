import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CONSULTING_SERVICES, CONSULTING_PROCESS } from '../data/initialData';
import { ConsultingType } from '../types';
import { 
  Building2, 
  UserCheck, 
  Briefcase, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Send,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface ConsultingSectionProps {
  onOpenConsultingModal: (initialType?: ConsultingType) => void;
}

export const ConsultingSection: React.FC<ConsultingSectionProps> = ({ onOpenConsultingModal }) => {
  const { submitConsultingRequest } = useData();
  
  const [formData, setFormData] = useState({
    clientName: '',
    companyOrAffiliation: '',
    phone: '',
    email: '',
    type: '기업 HRD 컨설팅' as ConsultingType,
    preferredDate: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const iconMap: Record<string, React.ElementType> = {
    Building2,
    UserCheck,
    Briefcase,
    Compass,
  };

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
      setFormData({
        clientName: '',
        companyOrAffiliation: '',
        phone: '',
        email: '',
        type: '기업 HRD 컨설팅',
        preferredDate: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="consulting" 
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>HR CONSULTING SOLUTIONS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          기업 및 개인 맞춤형 <span className="text-purple-600">전문 컨설팅 서비스</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          조직의 인재 육성 전략 수립부터 구직자의 1:1 커리어 성공까지 검증된 전문가 그룹이 밀착 지원합니다.
        </p>
      </div>

      {/* 4 Major Consulting Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {CONSULTING_SERVICES.map((srv) => {
          const IconComp = iconMap[srv.icon] || Briefcase;
          return (
            <div
              key={srv.id}
              id={`service-card-${srv.id}`}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-purple-400 transition-all group flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-purple-900/5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-purple-700 font-semibold mb-3">
                  대상: {srv.target}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {srv.description}
                </p>

                <div className="space-y-2 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-600 block mb-1">주요 제공 산출물:</span>
                  <div className="flex flex-wrap gap-2">
                    {srv.deliverables.map((deliv, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white text-purple-700 border border-purple-200 flex items-center gap-1 font-medium shadow-2xs">
                        <FileCheck className="w-3 h-3 text-purple-600" />
                        <span>{deliv}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                id={`btn-apply-consulting-${srv.id}`}
                onClick={() => onOpenConsultingModal(srv.title as ConsultingType)}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-purple-600 text-slate-700 hover:text-white border border-slate-200 hover:border-purple-600 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>이 분야 맞춤 상담 신청하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* 5-Step Consulting Process */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 mb-16 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-purple-700 tracking-wider uppercase block mb-1">Standard Roadmap</span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">체계적인 5단계 컨설팅 프로세스</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {CONSULTING_PROCESS.map((proc, idx) => (
            <div
              key={proc.step}
              id={`process-step-${idx}`}
              className="relative p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black text-purple-600">{proc.step}</span>
                  {idx < 4 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-purple-300" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{proc.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{proc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Interactive Direct Consultation Request Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">Fast Track</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">간편 컨설팅 문의 및 견적 의뢰</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              상담 정보를 남겨주시면 24시간 이내에 전담 수석 컨설턴트가 상세 안내 연락을 드립니다.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-purple-50 border border-purple-200 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">컨설팅 상담 신청이 성공적으로 접수되었습니다!</h4>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                한국고용진흥원 전문가 팀에서 검토 후 남겨주신 연락처로 신속히 안내드리겠습니다.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-900/20"
              >
                추가 문의 작성하기
              </button>
            </div>
          ) : (
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
                    소속 기관 / 기업명 (또는 개인)
                  </label>
                  <input
                    type="text"
                    value={formData.companyOrAffiliation}
                    onChange={(e) => setFormData({ ...formData, companyOrAffiliation: e.target.value })}
                    placeholder="예: (주)한국테크 인사팀 / 개인 취업준비생"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    연락처 (휴대폰) <span className="text-purple-600">*</span>
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
                    placeholder="user@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    컨설팅 희망 분야 <span className="text-purple-600">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ConsultingType })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  >
                    <option value="기업 HRD 컨설팅">기업 HRD 컨설팅 & 직무분석</option>
                    <option value="1:1 취업·커리어 코칭">1:1 취업·이직 커리어 코칭</option>
                    <option value="NCS 기반 직무분석">NCS 기반 직무분석 및 공채도구</option>
                    <option value="청년·신중년 고용지원">청년·신중년 전직 및 고용지원</option>
                    <option value="기타 맞춤 컨설팅">기타 맞춤형 위탁 컨설팅</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    상담 희망 일자
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
                  주요 문의 및 요청 내용
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="기업 규모, 현재 고민 중인 HR 이슈 또는 희망하는 취업 코칭 목표를 간략히 적어주세요."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white resize-none"
                />
              </div>

              <button
                id="btn-submit-quick-consulting"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? '접수 처리 중...' : '컨설팅 무료 상담 신청하기'}</span>
              </button>
            </form>
          )}

        </div>
      </div>

    </section>
  );
};
