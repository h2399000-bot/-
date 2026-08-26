import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  ShieldCheck, 
  PhoneCall, 
  Menu, 
  X, 
  Settings, 
  Share2, 
  Sparkles,
  ExternalLink,
  GraduationCap,
  Building2,
  CalendarCheck
} from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenConsulting: () => void;
  onOpenShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  onOpenAdmin,
  onOpenConsulting,
  onOpenShare,
}) => {
  const { siteConfig, isFirebaseConnected } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'about', label: '기관 소개' },
    { id: 'education', label: '교육 사업' },
    { id: 'consulting', label: '컨설팅' },
    { id: 'news', label: '공지/소식' },
    { id: 'contact', label: '문의하기' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          id="btn-logo-home"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-900/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
                {siteConfig.brandName}
              </span>
              <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                공식
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium tracking-wider block uppercase">
              {siteConfig.brandEnglish}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                  isActive
                    ? 'text-purple-700 bg-purple-50 border border-purple-200 shadow-xs'
                    : 'text-slate-600 hover:text-purple-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-purple-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Phone + Share + Admin + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Quick Call */}
          <a
            id="nav-phone-link"
            href={`tel:${siteConfig.contactPhone}`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 hover:text-purple-700 hover:bg-purple-50 hover:border-purple-200 transition-all"
            title="대표전화 바로걸기"
          >
            <PhoneCall className="w-3.5 h-3.5 text-purple-600" />
            <span>{siteConfig.contactPhone}</span>
          </a>

          {/* Social Share Button */}
          <button
            id="btn-nav-share"
            onClick={onOpenShare}
            className="p-2 rounded-lg text-slate-600 hover:text-purple-700 bg-slate-100 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 transition-all"
            title="사이트 공유하기"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Admin CMS Button */}
          <button
            id="btn-nav-admin"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 hover:text-purple-900 transition-all shadow-xs group"
            title="관리자 CMS 대시보드 열기"
          >
            <Settings className="w-3.5 h-3.5 text-purple-600 group-hover:rotate-45 transition-transform" />
            <span>관리자 CMS</span>
            {isFirebaseConnected && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Cloud DB 실시간 연결됨" />
            )}
          </button>

          {/* Consultation CTA */}
          <button
            id="btn-nav-consulting-cta"
            onClick={onOpenConsulting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/20 hover:shadow-purple-700/30 active:scale-95 transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>상담 신청</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            id="btn-mobile-admin-quick"
            onClick={onOpenAdmin}
            className="p-2 rounded-lg text-purple-700 bg-purple-50 border border-purple-200"
            title="관리자 CMS"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          <button
            id="btn-toggle-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 bg-slate-100 border border-slate-200 hover:text-purple-600 focus:outline-none"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-drawer-menu"
          className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full py-2.5 px-3 rounded-lg text-sm font-semibold text-left transition-colors flex items-center justify-between ${
                  currentSection === item.id
                    ? 'text-purple-700 bg-purple-50 border border-purple-200'
                    : 'text-slate-700 hover:text-purple-600 bg-slate-50 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{item.label}</span>
                {currentSection === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <button
              id="btn-mobile-consulting-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsulting();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md shadow-purple-900/20"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>맞춤형 컨설팅 & 교육 신청</span>
            </button>

            <div className="flex gap-2">
              <button
                id="btn-mobile-share"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShare();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-600" />
                <span>공유하기</span>
              </button>

              <button
                id="btn-mobile-admin"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>관리자 CMS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
