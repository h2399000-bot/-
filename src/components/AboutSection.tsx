import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { CORE_VALUES, HISTORY_ITEMS } from '../data/initialData';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  Zap, 
  Users, 
  Compass, 
  CheckCircle2, 
  Quote,
  Target,
  Sparkles,
  Calendar
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { siteConfig } = useData();
  const [activeTab, setActiveTab] = useState<'greeting' | 'vision' | 'history' | 'organization'>('greeting');

  const valueIconMap: Record<string, React.ElementType> = {
    Award,
    ShieldCheck,
    Zap,
    Users,
  };

  return (
    <section 
      id="about" 
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>ABOUT K-EPI</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          대한민국 고용의 미래를 밝히는 <span className="text-purple-600">한국고용진흥원</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          급변하는 미래 노동시장 환경 속에서 지속 가능한 고용 생태계 조성과 전문 인재 양성을 선도합니다.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
        {[
          { id: 'greeting', label: '원장 인사말' },
          { id: 'vision', label: '비전 & 핵심가치' },
          { id: 'history', label: '주요 연혁' },
          { id: 'organization', label: '조직 및 운영체계' },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`about-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/20'
                : 'bg-white text-slate-600 hover:text-purple-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content 1: Greeting */}
      {activeTab === 'greeting' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm animate-in fade-in duration-300">
          
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative mb-5">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-purple-200 shadow-xl shadow-purple-900/10 relative">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" 
                  alt="한국고용진흥원장"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-3 -right-2 bg-purple-600 text-white p-2 rounded-xl shadow-md">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">{siteConfig.directorName}</h3>
            <p className="text-xs text-purple-600 font-semibold mb-3">한국고용진흥원 원장 / 이사장</p>
            <div className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
              고용노동 정책 자문위원
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-purple-600">
              <Quote className="w-6 h-6 rotate-180" />
              <span className="text-xs font-bold uppercase tracking-widest">Director's Message</span>
            </div>
            <h4 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
              {siteConfig.directorGreetingTitle}
            </h4>
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line border-l-2 border-purple-600 pl-4">
              {siteConfig.directorGreeting}
            </div>
          </div>

        </div>
      )}

      {/* Tab Content 2: Vision & Values */}
      {activeTab === 'vision' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          
          {/* Mission & Vision Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 relative overflow-hidden shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 mb-4">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-purple-600 tracking-wider uppercase block mb-1">MISSION</span>
              <h3 className="text-xl font-black text-slate-900 mb-3">
                혁신적 직업 교육과 맞춤형 HR 솔루션으로 모두의 잠재력을 실현한다
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                사회 진출을 꿈꾸는 청년, 직무 전문성을 높이려는 재직자, 인생의 2막을 준비하는 신중년에게 실질적인 역량 강화 기회를 제공하고 기업의 생산성 향상을 견인합니다.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 relative overflow-hidden shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase block mb-1">VISION 2030</span>
              <h3 className="text-xl font-black text-slate-900 mb-3">
                대한민국 1위 디지털 & 고용 솔루션 혁신 플랫폼
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                신기술 직업훈련 인증률 100%, 산학협력 파트너 1,000개사 구축, 연간 3만 명 이상의 청년·중장년 고용 매칭을 달성하는 글로벌 수준의 고용진흥 전문기관으로 도약합니다.
              </p>
            </div>
          </div>

          {/* 4 Core Values */}
          <div>
            <h3 className="text-center text-xl font-bold text-slate-900 mb-6">한국고용진흥원 4대 핵심 가치</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CORE_VALUES.map((val, idx) => {
                const IconComponent = valueIconMap[val.icon] || Award;
                return (
                  <div
                    key={val.title}
                    id={`core-value-card-${idx}`}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 transition-all group shadow-xs hover:shadow-lg hover:shadow-purple-900/5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors mb-4">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-base text-slate-900 mb-1">{val.title}</h4>
                    <span className="text-[11px] font-semibold text-purple-600 block mb-2">{val.en}</span>
                    <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* Tab Content 3: History Timeline */}
      {activeTab === 'history' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm animate-in fade-in duration-300">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-300 space-y-10">
            {HISTORY_ITEMS.map((h, i) => (
              <div key={h.year} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-purple-600 border-4 border-white group-hover:scale-125 transition-transform shadow-xs" />
                
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                  <span className="text-xl sm:text-2xl font-black text-purple-600">{h.year}</span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">{h.title}</h4>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {h.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Organization */}
      {activeTab === 'organization' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm animate-in fade-in duration-300 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">한국고용진흥원 조직 구성 및 전문 인프라</h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-8 max-w-xl mx-auto">
            고용노동부 인가 전문 인력과 산학 협력 네트워크를 갖춘 체계적인 조직 구성을 통해 최상의 서비스를 제공합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-purple-700 block mb-1">본부 01</span>
              <h4 className="text-base font-bold text-slate-900 mb-2">디지털 신기술 교육사업본부</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                K-디지털 트레이닝, AI/빅데이터 실무 부트캠프, 풀스택 소프트웨어 엔지니어링 과정 총괄 운영
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-purple-700 block mb-1">본부 02</span>
              <h4 className="text-base font-bold text-slate-900 mb-2">기업 HRD & 채용 컨설팅본부</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                중소·중견기업 직무분석, 공공기관 블라인드 채용 문항 개발, 사내강사 양성 및 HR 로드맵 컨설팅
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-purple-700 block mb-1">본부 03</span>
              <h4 className="text-base font-bold text-slate-900 mb-2">취업지원 & 커리어 전직센터</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                1:1 맞춤형 입사지원서 첨삭, 모의면접 코칭, 320개 협약기업 채용 연계 및 신중년 전직지원
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-purple-700 block mb-1">지원 04</span>
              <h4 className="text-base font-bold text-slate-900 mb-2">고용정책 R&D 연구소</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                미래 직무 트렌드 연구, 교수설계 표준 모델 개발, 교재 편찬 및 정부 정책 연구 용역 수행
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
