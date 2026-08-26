import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Program, ProgramCategory } from '../types';
import { 
  GraduationCap, 
  Search, 
  Clock, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Tag, 
  Calendar,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface EducationSectionProps {
  onSelectProgram: (program: Program) => void;
  onApplyProgram: (program: Program) => void;
  initialSearchKeyword?: string;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  onSelectProgram,
  onApplyProgram,
  initialSearchKeyword = '',
}) => {
  const { programs } = useData();
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>('전체');
  const [searchTerm, setSearchTerm] = useState(initialSearchKeyword);
  const [selectedStatus, setSelectedStatus] = useState<string>('전체');

  const categories: ProgramCategory[] = ['전체', 'AI·디지털', '취업역량', '직무전문', '재취업·전직', '기업위탁'];

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchCategory = selectedCategory === '전체' || p.category === selectedCategory;
      const matchStatus = selectedStatus === '전체' || p.status === selectedStatus;
      const term = searchTerm.toLowerCase().trim();
      const matchSearch = !term || 
        p.title.toLowerCase().includes(term) ||
        p.subtitle.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags.some(t => t.toLowerCase().includes(term));

      return matchCategory && matchStatus && matchSearch;
    });
  }, [programs, selectedCategory, selectedStatus, searchTerm]);

  const getStatusBadge = (status: Program['status']) => {
    switch (status) {
      case '모집중':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case '마감임박':
        return 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse';
      case '모집마감':
        return 'bg-slate-100 text-slate-500 border-slate-200';
      case '상시대기':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <section 
      id="education" 
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>EDUCATION PROGRAMS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          현장 중심 실무 <span className="text-purple-600">교육 프로그램</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          최신 산업 트렌드를 반영한 국비지원 교육, 직무 부트캠프, 공공기관 취업 대비 및 전직 지원 과정을 만나보세요.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 mb-10 shadow-sm space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`edu-cat-tab-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/20'
                  : 'bg-slate-50 text-slate-600 hover:text-purple-600 hover:bg-purple-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search and Status Selectors */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="input-education-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="과정명, 기술 스택, 키워드 검색..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> 상태:
            </span>
            <select
              id="select-education-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-purple-500 focus:bg-white"
            >
              <option value="전체">모든 상태</option>
              <option value="모집중">모집중</option>
              <option value="마감임박">마감임박</option>
              <option value="상시대기">상시대기</option>
              <option value="모집마감">모집마감</option>
            </select>
          </div>
        </div>

      </div>

      {/* Program Cards Grid */}
      {filteredPrograms.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">검색 조건에 맞는 교육 과정이 없습니다.</h3>
          <p className="text-xs text-slate-500 mb-4">다른 카테고리를 선택하거나 검색어를 변경해보세요.</p>
          <button
            onClick={() => { setSelectedCategory('전체'); setSearchTerm(''); setSelectedStatus('전체'); }}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold shadow-sm"
          >
            검색 필터 초기화
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              id={`program-card-${prog.id}`}
              className="group bg-white border border-slate-200 hover:border-purple-400 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl hover:shadow-purple-900/5 flex flex-col"
            >
              {/* Image & Status Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={prog.imageUrl}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-600/90 text-white backdrop-blur-md shadow-xs">
                    {prog.category}
                  </span>
                  {prog.featured && (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-600/90 text-white backdrop-blur-md shadow-xs">
                      추천
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border backdrop-blur-md ${getStatusBadge(prog.status)}`}>
                    {prog.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-1.5">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {prog.subtitle}
                  </p>

                  {/* Meta Specs */}
                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="truncate">{prog.duration} ({prog.schedule})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="truncate">{prog.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>모집 인원: {prog.currentApplicants}명 / 정원 {prog.capacity}명</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {prog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tuition & CTA Footer */}
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[11px] text-slate-500">수강료 안내</span>
                    <span className="text-xs sm:text-sm font-extrabold text-purple-700">
                      {prog.tuition}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`btn-prog-detail-${prog.id}`}
                      onClick={() => onSelectProgram(prog)}
                      className="py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-purple-50 hover:text-purple-700 border border-slate-200 hover:border-purple-200 transition-all text-center"
                    >
                      상세보기
                    </button>
                    
                    <button
                      id={`btn-prog-apply-${prog.id}`}
                      onClick={() => onApplyProgram(prog)}
                      disabled={prog.status === '모집마감'}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1 ${
                        prog.status === '모집마감'
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/20'
                      }`}
                    >
                      <span>{prog.status === '모집마감' ? '마감됨' : '수강 신청'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
