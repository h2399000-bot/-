import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Users, 
  Building2, 
  Bot, 
  Briefcase,
  ChevronRight
} from 'lucide-react';

interface HeroSectionProps {
  onNavigateToEducation: (searchKeyword?: string) => void;
  onOpenConsulting: () => void;
  onNavigateToAbout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToEducation,
  onOpenConsulting,
  onNavigateToAbout,
}) => {
  const { siteConfig, programs } = useData();
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      onNavigateToEducation(searchKeyword.trim());
    } else {
      onNavigateToEducation();
    }
  };

  const quickCategories = [
    { label: '생성형 AI', keyword: 'AI' },
    { label: 'NCS 공공기관', keyword: 'NCS' },
    { label: '국비지원 100%', keyword: '국비지원' },
    { label: '신중년 재취업', keyword: '신중년' },
    { label: '기업 HRD', keyword: '기업' },
  ];

  return (
    <section 
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-radial from-purple-100/50 via-slate-50 to-white"
    >
      {/* Background Ambient Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[450px] bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#7c3aed 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        
        {/* Top Official Badge */}
        <div 
          id="hero-badge-tag"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm animate-in fade-in zoom-in duration-300"
        >
          <Award className="w-4 h-4 text-purple-600" />
          <span>고용노동부 직업훈련 인증기관 & 일자리 창출 유공 표창</span>
          <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
        </div>

        {/* Hero Main Heading */}
        <h1 
          id="hero-title-heading"
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight sm:leading-tight mb-6"
        >
          {siteConfig.heroTitle} <br />
          <span className="purple-gradient-text drop-shadow-xs font-black">
            {siteConfig.heroHighlight}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p 
          id="hero-subtitle-desc"
          className="max-w-2xl text-slate-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mb-10 text-center"
        >
          {siteConfig.heroSubtitle}
        </p>

        {/* Search Bar for Instant Education Query */}
        <form 
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl relative mb-4 group"
        >
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
            <input
              id="input-hero-program-search"
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="관심 있는 교육 과정, 기술 스택, 컨설팅 분야를 검색해보세요 (예: AI, NCS, 무역)"
              className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 shadow-xl shadow-purple-900/5 transition-all"
            />
            <button
              id="btn-hero-search-submit"
              type="submit"
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-900/20 transition-all flex items-center gap-1.5"
            >
              <span>과정 검색</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Quick Tag Recommendations */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs text-slate-500">
          <span className="font-medium text-slate-600">인기 키워드:</span>
          {quickCategories.map((item) => (
            <button
              key={item.keyword}
              type="button"
              onClick={() => onNavigateToEducation(item.keyword)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-purple-50 hover:text-purple-700 border border-slate-200 hover:border-purple-300 font-medium transition-all shadow-2xs"
            >
              #{item.label}
            </button>
          ))}
        </div>

        {/* Main CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="btn-hero-explore-education"
            onClick={() => onNavigateToEducation()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/20 hover:shadow-purple-700/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <span>교육 프로그램 전체보기</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="btn-hero-open-consulting"
            onClick={onOpenConsulting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-purple-400 hover:text-purple-700 transition-all shadow-sm"
          >
            <span>맞춤형 컨설팅 신청</span>
          </button>

          <button
            id="btn-hero-about-institute"
            onClick={onNavigateToAbout}
            className="w-full sm:w-auto text-xs sm:text-sm font-semibold text-slate-500 hover:text-purple-700 px-4 py-2 transition-colors flex items-center justify-center gap-1"
          >
            <span>기관 소개 & 비전</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 4 Feature Value Pillars */}
      <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 z-10">
        
        <div 
          onClick={() => onNavigateToEducation('AI')}
          className="cursor-pointer group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-purple-900/5"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center mb-3 group-hover:bg-purple-600 transition-colors">
            <Bot className="w-5 h-5 text-purple-600 group-hover:text-white" />
          </div>
          <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors mb-1">
            AI & 디지털 신기술 교육
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            생성형 AI, 데이터 분석, 클라우드 등 4차 산업혁명 필수 실무 역량 완성
          </p>
        </div>

        <div 
          onClick={() => onNavigateToEducation('취업역량')}
          className="cursor-pointer group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-purple-900/5"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center mb-3 group-hover:bg-purple-600 transition-colors">
            <Award className="w-5 h-5 text-purple-600 group-hover:text-white" />
          </div>
          <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors mb-1">
            공공기관 & 대기업 취업
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            NCS 직업기초능력, 블라인드 자기소개서, AI 역량검사 및 실전 모의면접
          </p>
        </div>

        <div 
          onClick={onOpenConsulting}
          className="cursor-pointer group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-purple-900/5"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center mb-3 group-hover:bg-purple-600 transition-colors">
            <Building2 className="w-5 h-5 text-purple-600 group-hover:text-white" />
          </div>
          <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors mb-1">
            기업 HRD & 조직 컨설팅
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            직무 역량 모델링, 평가 체계 설계 및 기업 맞춤형 사내 강사 육성
          </p>
        </div>

        <div 
          onClick={() => onNavigateToEducation('신중년')}
          className="cursor-pointer group p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-purple-900/5"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center mb-3 group-hover:bg-purple-600 transition-colors">
            <Users className="w-5 h-5 text-purple-600 group-hover:text-white" />
          </div>
          <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors mb-1">
            신중년 인생 2막 전직
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            4060 세대의 경력을 살린 경영자문, 강사, 스마트스토어 등 전직 솔루션
          </p>
        </div>

      </div>

    </section>
  );
};
