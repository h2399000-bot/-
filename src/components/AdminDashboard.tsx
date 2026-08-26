import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Program, 
  Notice, 
  ConsultingRequest, 
  ContactInquiry, 
  ProgramApplication, 
  SiteConfig,
  ProgramCategory,
  ProgramStatus,
  NoticeCategory,
  ConsultingType,
  ConsultingStatus
} from '../types';
import { 
  X, 
  LayoutDashboard, 
  GraduationCap, 
  Megaphone, 
  Briefcase, 
  MessageSquare, 
  Sliders, 
  Globe, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  Save, 
  RotateCcw, 
  Eye, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Clock, 
  Search,
  ExternalLink,
  ShieldAlert,
  Image as ImageIcon
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    siteConfig,
    programs,
    notices,
    consultingRequests,
    inquiries,
    applications,
    updateSiteConfig,
    addProgram,
    updateProgram,
    deleteProgram,
    addNotice,
    updateNotice,
    deleteNotice,
    updateConsultingStatus,
    deleteConsultingRequest,
    updateInquiryStatus,
    deleteInquiry,
    resetToInitialData,
  } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'notices' | 'consulting' | 'applications' | 'inquiries' | 'customizer' | 'seo'>('overview');

  // Program Edit Modal State
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isCreatingProgram, setIsCreatingProgram] = useState(false);
  const [programForm, setProgramForm] = useState<Omit<Program, 'id' | 'createdAt'>>({
    title: '',
    category: 'AI·디지털',
    subtitle: '',
    description: '',
    targetAudience: '',
    duration: '',
    schedule: '',
    location: '한국고용진흥원 여의도 본원',
    capacity: 30,
    currentApplicants: 0,
    status: '모집중',
    curriculum: ['모듈 1: 기초 핵심', '모듈 2: 실무 프로젝트'],
    tags: ['국비지원', '취업연계'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    benefits: ['100% 국비지원', '1:1 취업코칭'],
    tuition: '전액 국비지원',
  });

  // Notice Edit Modal State
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [isCreatingNotice, setIsCreatingNotice] = useState(false);
  const [noticeForm, setNoticeForm] = useState<Omit<Notice, 'id' | 'views' | 'date'>>({
    title: '',
    category: '공지',
    content: '',
    author: '교육운영본부',
    isPinned: false,
    attachmentName: '',
  });

  // Customizer State
  const [customizerConfig, setCustomizerConfig] = useState<SiteConfig>(siteConfig);
  const [configSaved, setConfigSaved] = useState(false);

  if (!isOpen) return null;

  // Handlers for Program CRUD
  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProgram) {
      await updateProgram(editingProgram.id, programForm);
      setEditingProgram(null);
    } else {
      await addProgram(programForm);
      setIsCreatingProgram(false);
    }
    // reset form
    setProgramForm({
      title: '',
      category: 'AI·디지털',
      subtitle: '',
      description: '',
      targetAudience: '',
      duration: '',
      schedule: '',
      location: '한국고용진흥원 여의도 본원',
      capacity: 30,
      currentApplicants: 0,
      status: '모집중',
      curriculum: ['모듈 1: 기초 핵심', '모듈 2: 실무 프로젝트'],
      tags: ['국비지원'],
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      featured: false,
      benefits: ['100% 국비지원'],
      tuition: '전액 국비지원',
    });
  };

  const handleOpenEditProgram = (prog: Program) => {
    setEditingProgram(prog);
    setProgramForm({
      title: prog.title,
      category: prog.category,
      subtitle: prog.subtitle,
      description: prog.description,
      targetAudience: prog.targetAudience,
      duration: prog.duration,
      schedule: prog.schedule,
      location: prog.location,
      capacity: prog.capacity,
      currentApplicants: prog.currentApplicants,
      status: prog.status,
      curriculum: [...prog.curriculum],
      tags: [...prog.tags],
      imageUrl: prog.imageUrl,
      featured: prog.featured,
      benefits: [...prog.benefits],
      tuition: prog.tuition,
    });
  };

  // Handlers for Notice CRUD
  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNotice) {
      await updateNotice(editingNotice.id, noticeForm);
      setEditingNotice(null);
    } else {
      await addNotice(noticeForm);
      setIsCreatingNotice(false);
    }
  };

  const handleOpenEditNotice = (not: Notice) => {
    setEditingNotice(not);
    setNoticeForm({
      title: not.title,
      category: not.category,
      content: not.content,
      author: not.author,
      isPinned: not.isPinned,
      attachmentName: not.attachmentName || '',
    });
  };

  // Save Site Customizer
  const handleSaveCustomizer = async () => {
    await updateSiteConfig(customizerConfig);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 2500);
  };

  // Export Leads to CSV
  const handleExportConsultingCSV = () => {
    const headers = ['ID', '신청자', '소속/회사', '연락처', '이메일', '상담분야', '희망일자', '상태', '신청일자', '요청내용'];
    const rows = consultingRequests.map(r => [
      r.id,
      r.clientName,
      r.companyOrAffiliation,
      r.phone,
      r.email,
      r.type,
      r.preferredDate,
      r.status,
      r.createdAt,
      `"${r.message.replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `한국고용진흥원_컨설팅신청_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      id="modal-admin-dashboard"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-6xl bg-[#0a0a0a] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-4 flex flex-col h-[92vh]"
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#111111] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-950">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">한국고용진흥원 CMS 통합 관리자</h2>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                교육 콘텐츠, 공지사항, 컨설팅 접수 리드, 사이트 테마 및 SEO를 실시간으로 제어합니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('정말 기본 샘플 데이터로 복원하시겠습니까? 현재 변경사항이 초기화됩니다.')) {
                  resetToInitialData();
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18181b] text-zinc-400 hover:text-white border border-zinc-800 text-xs font-semibold"
              title="기본 샘플 데이터로 리셋"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>데이터 복원(Reset)</span>
            </button>

            <button
              id="btn-close-admin-modal"
              onClick={onClose}
              className="p-2 rounded-xl bg-[#18181b] text-zinc-400 hover:text-white border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Main Layout (Sidebar + Content) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Navigation Sidebar */}
          <div className="w-full md:w-56 bg-[#0e0e0e] border-r border-zinc-800 p-3 space-y-1 overflow-x-auto md:overflow-y-auto flex md:flex-col shrink-0">
            {[
              { id: 'overview', label: '대시보드 개요', icon: LayoutDashboard, badge: null },
              { id: 'programs', label: '교육 프로그램 관리', icon: GraduationCap, badge: programs.length },
              { id: 'notices', label: '공지/소식 관리', icon: Megaphone, badge: notices.length },
              { id: 'consulting', label: '컨설팅 접수 현황', icon: Briefcase, badge: consultingRequests.length },
              { id: 'applications', label: '온라인 수강 신청', icon: CheckCircle2, badge: applications.length },
              { id: 'inquiries', label: '온라인 문의함', icon: MessageSquare, badge: inquiries.length },
              { id: 'customizer', label: '사이트 테마 커스텀', icon: Sliders, badge: null },
              { id: 'seo', label: 'SEO & 마케팅 도구', icon: Globe, badge: null },
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`admin-tab-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setEditingProgram(null);
                    setIsCreatingProgram(false);
                    setEditingNotice(null);
                    setIsCreatingNotice(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-950'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-purple-800 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Main Body Content Panel */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#050505]">
            
            {/* 1. TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Stats quick overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0e0e0e] border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 font-bold block mb-1">운영 중인 교육과정</span>
                    <span className="text-2xl font-black text-white">{programs.length}개</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0e0e0e] border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 font-bold block mb-1">등록된 공지/소식</span>
                    <span className="text-2xl font-black text-white">{notices.length}건</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0e0e0e] border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 font-bold block mb-1">컨설팅 상담 접수</span>
                    <span className="text-2xl font-black text-purple-400">{consultingRequests.length}건</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0e0e0e] border border-zinc-800">
                    <span className="text-[11px] text-zinc-400 font-bold block mb-1">수강 신청 누적</span>
                    <span className="text-2xl font-black text-emerald-400">{applications.length}건</span>
                  </div>
                </div>

                {/* Recent Inquiries & Consulting preview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Recent Consulting */}
                  <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-sm text-white">최근 컨설팅 상담 신청</h3>
                      <button 
                        onClick={() => setActiveTab('consulting')}
                        className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                      >
                        전체보기 ({consultingRequests.length})
                      </button>
                    </div>

                    {consultingRequests.length === 0 ? (
                      <p className="text-xs text-zinc-500 py-6 text-center">신규 접수된 컨설팅 요청이 없습니다.</p>
                    ) : (
                      <div className="space-y-2">
                        {consultingRequests.slice(0, 3).map((req) => (
                          <div key={req.id} className="p-3 rounded-xl bg-[#141414] border border-zinc-800 flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-white block">{req.clientName} ({req.companyOrAffiliation || '개인'})</span>
                              <span className="text-[11px] text-purple-400">{req.type} • {req.phone}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-bold">
                              {req.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Course Applications */}
                  <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-sm text-white">최근 수강 신청 내역</h3>
                      <button 
                        onClick={() => setActiveTab('applications')}
                        className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                      >
                        전체보기 ({applications.length})
                      </button>
                    </div>

                    {applications.length === 0 ? (
                      <p className="text-xs text-zinc-500 py-6 text-center">신규 수강 신청 내역이 없습니다.</p>
                    ) : (
                      <div className="space-y-2">
                        {applications.slice(0, 3).map((app) => (
                          <div key={app.id} className="p-3 rounded-xl bg-[#141414] border border-zinc-800 flex items-center justify-between text-xs">
                            <div className="truncate mr-2">
                              <span className="font-bold text-white block truncate">{app.applicantName} - {app.programTitle}</span>
                              <span className="text-[11px] text-zinc-400">{app.phone} • {app.createdAt.split('T')[0]}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold shrink-0">
                              {app.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Quick Quick Actions */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-800/40 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">새 교육 프로그램 또는 공지사항 등록</h4>
                    <p className="text-xs text-zinc-300">신규 커리큘럼을 게시하거나 홈페이지 주요 공지사항을 즉시 업로드하세요.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveTab('programs');
                        setIsCreatingProgram(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>새 교육과정 추가</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('notices');
                        setIsCreatingNotice(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#141414] hover:bg-[#202020] text-white text-xs font-bold border border-zinc-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>새 공지 등록</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* 2. TAB: PROGRAMS CRUD */}
            {activeTab === 'programs' && (
              <div className="space-y-4">
                
                {/* Header with New Button */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="text-base font-bold text-white">교육 프로그램 콘텐츠 관리</h3>
                    <p className="text-xs text-zinc-400">총 {programs.length}개의 교육 과정이 등록되어 있습니다.</p>
                  </div>
                  <button
                    id="btn-admin-add-program"
                    onClick={() => {
                      setEditingProgram(null);
                      setIsCreatingProgram(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>신규 과정 등록</span>
                  </button>
                </div>

                {/* Form Modal/Section for Add/Edit Program */}
                {(isCreatingProgram || editingProgram) && (
                  <form onSubmit={handleSaveProgram} className="p-5 rounded-2xl bg-[#0e0e0e] border border-purple-600/60 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <h4 className="font-bold text-sm text-purple-300">
                        {editingProgram ? '교육 프로그램 수정' : '신규 교육 프로그램 등록'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProgram(null);
                          setIsCreatingProgram(false);
                        }}
                        className="text-xs text-zinc-400 hover:text-white"
                      >
                        취소
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">과정명</label>
                        <input
                          type="text"
                          required
                          value={programForm.title}
                          onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                          placeholder="과정명을 입력하세요"
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">카테고리</label>
                        <select
                          value={programForm.category}
                          onChange={(e) => setProgramForm({ ...programForm, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        >
                          <option value="AI·디지털">AI·디지털</option>
                          <option value="취업역량">취업역량</option>
                          <option value="직무전문">직무전문</option>
                          <option value="재취업·전직">재취업·전직</option>
                          <option value="기업위탁">기업위탁</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">부제목 / 한줄 설명</label>
                      <input
                        type="text"
                        value={programForm.subtitle}
                        onChange={(e) => setProgramForm({ ...programForm, subtitle: e.target.value })}
                        placeholder="핵심 기술 및 목표 요약"
                        className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">상세 설명</label>
                      <textarea
                        rows={3}
                        value={programForm.description}
                        onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                        placeholder="과정의 상세 개요와 특징을 작성하세요"
                        className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">교육 기간</label>
                        <input
                          type="text"
                          value={programForm.duration}
                          onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })}
                          placeholder="예: 총 320시간 (3개월)"
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">모집 정원 (명)</label>
                        <input
                          type="number"
                          value={programForm.capacity}
                          onChange={(e) => setProgramForm({ ...programForm, capacity: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">모집 상태</label>
                        <select
                          value={programForm.status}
                          onChange={(e) => setProgramForm({ ...programForm, status: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        >
                          <option value="모집중">모집중</option>
                          <option value="마감임박">마감임박</option>
                          <option value="상시대기">상시대기</option>
                          <option value="모집마감">모집마감</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">수강료 정보</label>
                        <input
                          type="text"
                          value={programForm.tuition}
                          onChange={(e) => setProgramForm({ ...programForm, tuition: e.target.value })}
                          placeholder="예: 전액 국비지원 (자부담 0원)"
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">대표 이미지 URL</label>
                        <input
                          type="text"
                          value={programForm.imageUrl}
                          onChange={(e) => setProgramForm({ ...programForm, imageUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProgram(null);
                          setIsCreatingProgram(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#141414] text-zinc-400 text-xs font-bold"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>저장하기</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Programs List Table */}
                <div className="bg-[#0e0e0e] border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/80">
                  {programs.map((prog) => (
                    <div key={prog.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-purple-950/10">
                      <div className="flex items-center gap-3">
                        <img 
                          src={prog.imageUrl} 
                          alt="" 
                          className="w-12 h-12 rounded-xl object-cover shrink-0 bg-[#141414]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-bold">
                              {prog.category}
                            </span>
                            <span className="text-xs font-bold text-white line-clamp-1">{prog.title}</span>
                          </div>
                          <span className="text-[11px] text-zinc-400 block mt-0.5">
                            {prog.duration} • {prog.status} • 정원 {prog.capacity}명 ({prog.tuition})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleOpenEditProgram(prog)}
                          className="px-3 py-1.5 rounded-lg bg-[#141414] text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>수정</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`'${prog.title}' 과정을 삭제하시겠습니까?`)) {
                              deleteProgram(prog.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/30 text-red-400 hover:bg-red-900/50 border border-red-900/50"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* 3. TAB: NOTICES CRUD */}
            {activeTab === 'notices' && (
              <div className="space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="text-base font-bold text-white">공지사항 및 보도자료 관리</h3>
                    <p className="text-xs text-zinc-400">총 {notices.length}개의 게시글이 등록되어 있습니다.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingNotice(null);
                      setIsCreatingNotice(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>새 게시글 등록</span>
                  </button>
                </div>

                {/* Form for Notice Add/Edit */}
                {(isCreatingNotice || editingNotice) && (
                  <form onSubmit={handleSaveNotice} className="p-5 rounded-2xl bg-[#0e0e0e] border border-purple-600/60 space-y-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <h4 className="font-bold text-sm text-purple-300">
                        {editingNotice ? '게시글 수정' : '새 게시글 작성'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNotice(null);
                          setIsCreatingNotice(false);
                        }}
                        className="text-xs text-zinc-400 hover:text-white"
                      >
                        취소
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-zinc-300 mb-1">제목</label>
                        <input
                          type="text"
                          required
                          value={noticeForm.title}
                          onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                          placeholder="공지사항 제목"
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">카테고리</label>
                        <select
                          value={noticeForm.category}
                          onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        >
                          <option value="공지">공지</option>
                          <option value="보도자료">보도자료</option>
                          <option value="합격수기">합격수기</option>
                          <option value="채용소식">채용소식</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">본문 내용</label>
                      <textarea
                        rows={6}
                        required
                        value={noticeForm.content}
                        onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                        placeholder="공지 본문 내용을 상세히 입력하세요."
                        className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">작성 부서 / 작성자</label>
                        <input
                          type="text"
                          value={noticeForm.author}
                          onChange={(e) => setNoticeForm({ ...noticeForm, author: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">첨부파일명 (선택)</label>
                        <input
                          type="text"
                          value={noticeForm.attachmentName}
                          onChange={(e) => setNoticeForm({ ...noticeForm, attachmentName: e.target.value })}
                          placeholder="예: 2026_상반기_모집요강.pdf"
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="check-pin-notice"
                        checked={noticeForm.isPinned}
                        onChange={(e) => setNoticeForm({ ...noticeForm, isPinned: e.target.checked })}
                        className="w-4 h-4 rounded text-purple-600 bg-[#141414] border-zinc-800"
                      />
                      <label htmlFor="check-pin-notice" className="text-xs text-zinc-300 font-bold">
                        상단 고정 공지로 등록 (Pinned)
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNotice(null);
                          setIsCreatingNotice(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#141414] text-zinc-400 text-xs font-bold"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>저장하기</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Notices List */}
                <div className="bg-[#0e0e0e] border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/80">
                  {notices.map((not) => (
                    <div key={not.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-purple-950/10">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {not.isPinned && (
                            <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-bold border border-purple-800">
                              상단고정
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded bg-[#141414] text-zinc-300 text-[10px] font-bold border border-zinc-800">
                            {not.category}
                          </span>
                          <span className="text-xs font-bold text-white line-clamp-1">{not.title}</span>
                        </div>
                        <span className="text-[11px] text-zinc-500">
                          작성자: {not.author} • 등록일: {not.date} • 조회수: {not.views}회
                        </span>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleOpenEditNotice(not)}
                          className="px-3 py-1.5 rounded-lg bg-[#141414] text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>수정</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`'${not.title}' 게시글을 삭제하시겠습니까?`)) {
                              deleteNotice(not.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/30 text-red-400 hover:bg-red-900/50 border border-red-900/50"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* 4. TAB: CONSULTING REQUESTS CRM */}
            {activeTab === 'consulting' && (
              <div className="space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="text-base font-bold text-white">맞춤형 컨설팅 신청 현황 CRM</h3>
                    <p className="text-xs text-zinc-400">기업 및 개인의 컨설팅 상담 신청 내역 ({consultingRequests.length}건)</p>
                  </div>
                  <button
                    onClick={handleExportConsultingCSV}
                    className="px-3.5 py-2 rounded-xl bg-[#141414] hover:bg-[#202020] text-purple-300 border border-zinc-800 text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV 다운로드</span>
                  </button>
                </div>

                {consultingRequests.length === 0 ? (
                  <div className="p-12 text-center text-zinc-500 text-xs bg-[#0e0e0e] rounded-2xl border border-zinc-800">
                    접수된 컨설팅 요청이 없습니다.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {consultingRequests.map((req) => (
                      <div key={req.id} className="p-4 rounded-2xl bg-[#0e0e0e] border border-zinc-800 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{req.clientName}</span>
                            <span className="text-xs text-zinc-400">({req.companyOrAffiliation || '개인'})</span>
                            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-bold border border-purple-800">
                              {req.type}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-zinc-400">상태 변경:</span>
                            <select
                              value={req.status}
                              onChange={(e) => updateConsultingStatus(req.id, e.target.value as any)}
                              className="px-2 py-1 rounded-lg bg-[#141414] border border-zinc-700 text-xs text-purple-300 font-bold focus:outline-none"
                            >
                              <option value="접수">접수</option>
                              <option value="검토중">검토중</option>
                              <option value="상담완료">상담완료</option>
                              <option value="보류">보류</option>
                            </select>
                            <button
                              onClick={() => {
                                if (window.confirm('이 신청 내역을 삭제하시겠습니까?')) {
                                  deleteConsultingRequest(req.id);
                                }
                              }}
                              className="p-1 rounded bg-[#141414] text-zinc-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-zinc-300 bg-[#141414] p-2.5 rounded-xl">
                          <div><strong>연락처:</strong> <a href={`tel:${req.phone}`} className="text-purple-400 hover:underline">{req.phone}</a></div>
                          <div><strong>이메일:</strong> {req.email || '-'}</div>
                          <div><strong>상담희망일:</strong> {req.preferredDate || '미지정'}</div>
                        </div>

                        {req.message && (
                          <div className="text-xs text-zinc-300 bg-[#141414]/60 p-2.5 rounded-xl border border-zinc-800/50 whitespace-pre-line">
                            <strong className="text-zinc-400 block mb-0.5">요청 및 문의 내용:</strong>
                            {req.message}
                          </div>
                        )}

                        <div className="text-[10px] text-zinc-500 text-right">
                          신청 접수 일시: {new Date(req.createdAt).toLocaleString('ko-KR')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* 5. TAB: APPLICATIONS CRM */}
            {activeTab === 'applications' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-zinc-800">
                  <h3 className="text-base font-bold text-white">온라인 수강 신청 접수 대장</h3>
                  <p className="text-xs text-zinc-400">교육 과정별 온라인 지원자 명단 ({applications.length}명)</p>
                </div>

                {applications.length === 0 ? (
                  <div className="p-12 text-center text-zinc-500 text-xs bg-[#0e0e0e] rounded-2xl border border-zinc-800">
                    접수된 온라인 수강 신청 내역이 없습니다.
                  </div>
                ) : (
                  <div className="bg-[#0e0e0e] border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/80">
                    {applications.map((app) => (
                      <div key={app.id} className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-sm text-white">{app.applicantName}</span>
                            <span className="text-xs text-purple-400 ml-2 font-medium">[{app.programTitle}]</span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                            {app.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-zinc-400 bg-[#141414] p-2.5 rounded-xl">
                          <div>연락처: <span className="text-white font-semibold">{app.phone}</span></div>
                          <div>이메일: <span className="text-white font-semibold">{app.email || '-'}</span></div>
                          <div>생년월일: <span className="text-white font-semibold">{app.birthDate || '-'}</span></div>
                        </div>

                        {app.motivation && (
                          <p className="text-xs text-zinc-300 bg-[#141414]/60 p-2 rounded-lg">
                            <span className="text-zinc-400 font-bold">지원동기:</span> {app.motivation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 6. TAB: INQUIRIES CRM */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-zinc-800">
                  <h3 className="text-base font-bold text-white">온라인 간편 문의함</h3>
                  <p className="text-xs text-zinc-400">웹사이트 방문자가 남긴 일반 및 교육 문의 ({inquiries.length}건)</p>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-12 text-center text-zinc-500 text-xs bg-[#0e0e0e] rounded-2xl border border-zinc-800">
                    접수된 문의 내역이 없습니다.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-4 rounded-2xl bg-[#0e0e0e] border border-zinc-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{inq.name}</span>
                            <span className="px-2 py-0.5 rounded bg-[#141414] text-purple-300 text-[10px] font-bold border border-zinc-800">
                              {inq.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                              className="px-2 py-1 rounded-lg bg-[#141414] border border-zinc-700 text-xs text-zinc-300 font-bold"
                            >
                              <option value="미확인">미확인</option>
                              <option value="답변완료">답변완료</option>
                            </select>
                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              className="p-1 rounded bg-[#141414] text-zinc-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-zinc-400">
                          연락처: <span className="text-white">{inq.phone}</span> | 이메일: <span className="text-white">{inq.email || '-'}</span>
                        </div>

                        {inq.subject && (
                          <h4 className="text-xs font-bold text-purple-300">
                            제목: {inq.subject}
                          </h4>
                        )}

                        <p className="text-xs text-zinc-300 bg-[#141414]/60 p-3 rounded-xl whitespace-pre-line">
                          {inq.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 7. TAB: SITE CUSTOMIZER */}
            {activeTab === 'customizer' && (
              <div className="space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div>
                    <h3 className="text-base font-bold text-white">사이트 실시간 커스텀 설정창</h3>
                    <p className="text-xs text-zinc-400">브랜드명, 슬로건, 연락처, 대표 인사말, 공지 배너를 수정하고 즉시 반영합니다.</p>
                  </div>
                  <button
                    id="btn-save-customizer-config"
                    onClick={handleSaveCustomizer}
                    className={`px-5 py-2 rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all ${
                      configSaved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950'
                    }`}
                  >
                    {configSaved ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>저장 완료!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>전체 설정 저장</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-6 bg-[#0e0e0e] p-5 rounded-2xl border border-zinc-800">
                  
                  {/* Brand & Basic Info */}
                  <div>
                    <h4 className="font-bold text-sm text-purple-300 mb-3">1. 기본 기관 정보 및 브랜딩</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">기관명 (한글)</label>
                        <input
                          type="text"
                          value={customizerConfig.brandName}
                          onChange={(e) => setCustomizerConfig({ ...customizerConfig, brandName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">영문 기관명</label>
                        <input
                          type="text"
                          value={customizerConfig.brandEnglish}
                          onChange={(e) => setCustomizerConfig({ ...customizerConfig, brandEnglish: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs font-bold text-zinc-300 mb-1">대표 슬로건 / 태그라인</label>
                      <input
                        type="text"
                        value={customizerConfig.tagline}
                        onChange={(e) => setCustomizerConfig({ ...customizerConfig, tagline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Hero Headings */}
                  <div className="pt-4 border-t border-zinc-800">
                    <h4 className="font-bold text-sm text-purple-300 mb-3">2. 히어로 메인 타이틀 & 문구</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">헤드라인 1번째 줄</label>
                        <input
                          type="text"
                          value={customizerConfig.heroTitle}
                          onChange={(e) => setCustomizerConfig({ ...customizerConfig, heroTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">헤드라인 2번째 줄 (보라빛 강조)</label>
                        <input
                          type="text"
                          value={customizerConfig.heroHighlight}
                          onChange={(e) => setCustomizerConfig({ ...customizerConfig, heroHighlight: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs font-bold text-zinc-300 mb-1">히어로 서브 설명</label>
                      <textarea
                        rows={2}
                        value={customizerConfig.heroSubtitle}
                        onChange={(e) => setCustomizerConfig({ ...customizerConfig, heroSubtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Announcement Bar */}
                  <div className="pt-4 border-t border-zinc-800">
                    <h4 className="font-bold text-sm text-purple-300 mb-3">3. 상단 띠배너 공지 (Announcement Bar)</h4>
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="checkbox"
                        id="toggle-announcement-enabled"
                        checked={customizerConfig.announcementBar?.enabled}
                        onChange={(e) => setCustomizerConfig({
                          ...customizerConfig,
                          announcementBar: { ...customizerConfig.announcementBar, enabled: e.target.checked }
                        })}
                        className="w-4 h-4 rounded text-purple-600 bg-[#141414] border-zinc-800"
                      />
                      <label htmlFor="toggle-announcement-enabled" className="text-xs text-zinc-300 font-bold">
                        상단 공지 띠배너 활성화
                      </label>
                    </div>

                    <input
                      type="text"
                      value={customizerConfig.announcementBar?.text}
                      onChange={(e) => setCustomizerConfig({
                        ...customizerConfig,
                        announcementBar: { ...customizerConfig.announcementBar, text: e.target.value }
                      })}
                      placeholder="상단 배너에 표시할 공지 문구를 입력하세요"
                      className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                    />
                  </div>

                  {/* Contact & Hours */}
                  <div className="pt-4 border-t border-zinc-800">
                    <h4 className="font-bold text-sm text-purple-300 mb-3">4. 대표 연락처 및 운영 정보</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">대표 전화</label>
                        <input
                          type="text"
                          value={customizerConfig.contactPhone}
                          onChange={(e) => setCustomizerConfig({ ...customizerConfig, contactPhone: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">공식 이메일</label>
                        <input
                          type="email"
                          value={customizerConfig.contactEmail}
                          onChange={(e) => setCustomizerConfig({ ...customizerConfig, contactEmail: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">본원 주소</label>
                        <input
                          type="text"
                          value={customizerConfig.address}
                          onChange={(e) => setCustomizerConfig({ ...customizerConfig, address: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">운영 시간 안내</label>
                        <input
                          type="text"
                          value={customizerConfig.operatingHours}
                          onChange={(e) => setCustomizerConfig({ ...customizerConfig, operatingHours: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Director's Greeting */}
                  <div className="pt-4 border-t border-zinc-800">
                    <h4 className="font-bold text-sm text-purple-300 mb-3">5. 원장 인사말 섹션</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">원장 성함 및 직함</label>
                        <input
                          type="text"
                          value={customizerConfig.directorName}
                          onChange={(e) => setCustomizerConfig({ ...customizerConfig, directorName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-300 mb-1">인사말 헤드라인</label>
                        <input
                          type="text"
                          value={customizerConfig.directorGreetingTitle}
                          onChange={(e) => setCustomizerConfig({ ...customizerConfig, directorGreetingTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-300 mb-1">인사말 전문</label>
                      <textarea
                        rows={4}
                        value={customizerConfig.directorGreeting}
                        onChange={(e) => setCustomizerConfig({ ...customizerConfig, directorGreeting: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                      />
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* 8. TAB: SEO & MARKETING */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                
                <div className="pb-3 border-b border-zinc-800">
                  <h3 className="text-base font-bold text-white">검색 엔진 최적화(SEO) & SNS 마케팅 도구</h3>
                  <p className="text-xs text-zinc-400">포털 사이트 검색 등록용 메타 태그, 오픈그래프(OG) 카드 및 XML 사이트맵을 관리합니다.</p>
                </div>

                {/* OpenGraph Live Card Preview */}
                <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-zinc-800 space-y-4">
                  <h4 className="font-bold text-sm text-purple-300 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>카카오톡 / 페이스북 공유 시 미리보기 (OpenGraph Simulator)</span>
                  </h4>

                  <div className="max-w-md mx-auto rounded-2xl overflow-hidden border border-zinc-700 bg-[#141414] shadow-2xl">
                    <div className="h-44 bg-purple-950 relative overflow-hidden flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80" 
                        alt="OG Preview" 
                        className="w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="px-2 py-0.5 rounded bg-purple-600 text-white text-[10px] font-bold">
                          {customizerConfig.brandName}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-[10px] text-purple-400 font-bold uppercase block">k-epi.or.kr</span>
                      <h5 className="font-bold text-sm text-white line-clamp-1">{customizerConfig.seoTitle}</h5>
                      <p className="text-xs text-zinc-400 line-clamp-2">{customizerConfig.seoDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Meta Tags Form */}
                <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-zinc-800 space-y-4">
                  <h4 className="font-bold text-sm text-white">메타 태그 설정</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">SEO Title (브라우저 제목 태그)</label>
                    <input
                      type="text"
                      value={customizerConfig.seoTitle}
                      onChange={(e) => setCustomizerConfig({ ...customizerConfig, seoTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Meta Description (검색 설명문)</label>
                    <textarea
                      rows={2}
                      value={customizerConfig.seoDescription}
                      onChange={(e) => setCustomizerConfig({ ...customizerConfig, seoDescription: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Keywords (검색 키워드 태그, 쉼표 구분)</label>
                    <input
                      type="text"
                      value={customizerConfig.seoKeywords}
                      onChange={(e) => setCustomizerConfig({ ...customizerConfig, seoKeywords: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-zinc-800 text-white text-xs"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSaveCustomizer}
                      className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>SEO 설정 적용</span>
                    </button>
                  </div>
                </div>

                {/* Sitemap & Robots.txt Auto-Generation Box */}
                <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-zinc-800 space-y-3">
                  <h4 className="font-bold text-sm text-white">자동 생성된 사이트맵 (sitemap.xml)</h4>
                  <p className="text-xs text-zinc-400">구글 서치콘솔 및 네이버 웹마스터도구 등록용 XML 형식 사이트맵입니다.</p>
                  <pre className="p-3.5 rounded-xl bg-[#050505] border border-zinc-800 text-[11px] text-purple-300 overflow-x-auto font-mono">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://k-epi.or.kr/</loc><priority>1.0</priority></url>
  <url><loc>https://k-epi.or.kr/#about</loc><priority>0.8</priority></url>
  <url><loc>https://k-epi.or.kr/#education</loc><priority>0.9</priority></url>
  <url><loc>https://k-epi.or.kr/#consulting</loc><priority>0.9</priority></url>
  <url><loc>https://k-epi.or.kr/#news</loc><priority>0.7</priority></url>
  <url><loc>https://k-epi.or.kr/#contact</loc><priority>0.8</priority></url>
</urlset>`}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://k-epi.or.kr/</loc><priority>1.0</priority></url>\n  <url><loc>https://k-epi.or.kr/#about</loc><priority>0.8</priority></url>\n  <url><loc>https://k-epi.or.kr/#education</loc><priority>0.9</priority></url>\n  <url><loc>https://k-epi.or.kr/#consulting</loc><priority>0.9</priority></url>\n  <url><loc>https://k-epi.or.kr/#news</loc><priority>0.7</priority></url>\n  <url><loc>https://k-epi.or.kr/#contact</loc><priority>0.8</priority></url>\n</urlset>`);
                      alert('sitemap.xml 코드가 클립보드에 복사되었습니다.');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#141414] text-purple-300 border border-zinc-800 text-xs font-bold"
                  >
                    사이트맵 코드 복사하기
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
