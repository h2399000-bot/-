import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FAQ_ITEMS } from '../data/initialData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  Train, 
  Car, 
  Bus,
  MessageSquare
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { siteConfig, submitContactInquiry } = useData();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '교육과정 문의',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('성함, 연락처 및 문의 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactInquiry(formData);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '교육과정 문의',
        message: '',
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>CONTACT & LOCATION</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          한국고용진흥원 <span className="text-purple-600">문의 및 오시는 길</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          궁금하신 사항을 남겨주시면 담당 부서에서 신속하고 친절하게 답변드리겠습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Left: Contact Info & Location */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">기관 대표 연락처</h3>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">대표 전화</span>
                <a href={`tel:${siteConfig.contactPhone}`} className="text-base font-bold text-slate-900 hover:text-purple-600 block">
                  {siteConfig.contactPhone}
                </a>
                <span className="text-[11px] text-slate-400">내선 1: 교육상담 / 내선 2: 기업컨설팅</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">공식 이메일</span>
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-base font-bold text-slate-900 hover:text-purple-600 block">
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">운영 시간</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  {siteConfig.operatingHours}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">본원 주소</span>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  {siteConfig.address}
                </p>
              </div>
            </div>

          </div>

          {/* Transport Info */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3 text-xs text-slate-600 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Train className="w-4 h-4 text-purple-600" />
              <span>대중교통 안내</span>
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-bold text-[10px]">지하철</span>
                <span>5호선·9호선 여의도역 3번 출구 도보 3분</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-bold text-[10px]">버스</span>
                <span>여의도환승센터 하차 후 도보 2분</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-bold text-[10px]">주차</span>
                <span>건물 지하 주차장 2시간 무료 지원</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <h3 className="text-xl font-bold text-slate-900">온라인 간편 문의 폼</h3>
          </div>

          {isSuccess ? (
            <div className="p-8 rounded-2xl bg-purple-50 border border-purple-200 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">문의가 안전하게 접수되었습니다!</h4>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                남겨주신 이메일 또는 연락처로 신속히 답변을 드리겠습니다.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-900/20"
              >
                새 문의 작성하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    이름 / 담당자 <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    연락처 <span className="text-purple-600">*</span>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    문의 분야
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                  >
                    <option value="교육과정 문의">교육과정 / 국비지원 문의</option>
                    <option value="기업 컨설팅 의뢰">기업 컨설팅 & 위탁교육 의뢰</option>
                    <option value="1:1 커리어 코칭">1:1 커리어 & 취업 코칭</option>
                    <option value="산학협력 및 제휴">산학협력 및 비즈니스 제휴</option>
                    <option value="기타 일반 문의">기타 일반 문의</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  문의 제목
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="문의 제목을 간단히 입력해주세요"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  문의 내용 <span className="text-purple-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="구체적인 문의 내용을 남겨주시면 더욱 정확한 안내가 가능합니다."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white resize-none"
                />
              </div>

              <button
                id="btn-submit-contact"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? '전송 중...' : '문의하기 전송'}</span>
              </button>
            </form>
          )}

        </div>

      </div>

      {/* FAQ Accordion */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">자주 묻는 질문 (FAQ)</h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 hover:text-purple-600 flex items-center justify-between gap-4 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-purple-600 font-extrabold text-sm sm:text-base">Q.</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-purple-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200 pt-3 bg-purple-50/50">
                    <div className="flex items-start gap-3">
                      <span className="text-purple-600 font-extrabold text-sm sm:text-base">A.</span>
                      <p>{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
