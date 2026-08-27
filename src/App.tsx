import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { ConsultingSection } from './components/ConsultingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { ProgramApplyModal } from './components/ProgramApplyModal';
import { ConsultingModal } from './components/ConsultingModal';
import { ShareModal } from './components/ShareModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Program, ConsultingType } from './types';
import { ArrowUp, CalendarCheck, Settings } from 'lucide-react';

function MainApp() {
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [applyingProgram, setApplyingProgram] = useState<Program | null>(null);
  const [consultingModalOpen, setConsultingModalOpen] = useState(false);
  const [initialConsultingType, setInitialConsultingType] = useState<ConsultingType>('기업 HRD 컨설팅');
  const [adminOpen, setAdminOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Track active section and scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['home', 'about', 'education', 'consulting', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setCurrentSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenConsultingModal = (type?: ConsultingType) => {
    if (type) setInitialConsultingType(type);
    setConsultingModalOpen(true);
  };

  const handleNavigateToEducationWithKeyword = (keyword?: string) => {
    if (keyword) {
      setSearchKeyword(keyword);
    }
    scrollToSection('education');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-purple-600 selection:text-white">
      
      {/* Top Announcement Bar */}
      <AnnouncementBar onNavigateToEducation={() => scrollToSection('education')} />

      {/* Sticky Main Navigation */}
      <Navbar
        currentSection={currentSection}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenConsulting={() => handleOpenConsultingModal()}
        onOpenShare={() => setShareOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <HeroSection
          onNavigateToEducation={handleNavigateToEducationWithKeyword}
          onOpenConsulting={() => handleOpenConsultingModal()}
          onNavigateToAbout={() => scrollToSection('about')}
        />

        {/* 2. Key Stats & Partners Bar */}
        <StatsSection />

        {/* 3. About Section (Greetings, Vision, Core Values, History Timeline) */}
        <AboutSection />

        {/* 4. Education Programs Section */}
        <EducationSection
          onSelectProgram={(prog) => setSelectedProgram(prog)}
          onApplyProgram={(prog) => setApplyingProgram(prog)}
          initialSearchKeyword={searchKeyword}
        />

        {/* 5. Consulting Section (HRD, 1:1, Outplacement) */}
        <ConsultingSection
          onOpenConsultingModal={handleOpenConsultingModal}
        />

        {/* 6. Contact, Location & FAQ Section */}
        <ContactSection />

      </main>

      {/* Institutional Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenShare={() => setShareOpen(true)}
      />

      {/* Floating Action Pill Buttons (Right Bottom) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        
        {/* Quick Consultation Floating Trigger */}
        <button
          id="floating-btn-consulting"
          onClick={() => handleOpenConsultingModal()}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-900/30 hover:shadow-purple-700/50 hover:scale-105 active:scale-95 transition-all group"
        >
          <CalendarCheck className="w-4 h-4" />
          <span className="hidden sm:inline">무료 맞춤 상담</span>
          <span className="sm:hidden">상담신청</span>
        </button>

        {/* Floating Admin CMS Button */}
        <button
          id="floating-btn-admin"
          onClick={() => setAdminOpen(true)}
          className="p-3 rounded-full bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-600 border border-slate-200 hover:border-purple-300 shadow-lg shadow-slate-900/5 transition-all"
          title="관리자 CMS 대시보드"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            id="floating-btn-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-full bg-white hover:bg-purple-600 text-slate-700 hover:text-white border border-slate-200 hover:border-purple-600 shadow-lg shadow-slate-900/5 transition-all"
            title="맨 위로 이동"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

      </div>

      {/* Modals & Dialogs */}
      
      {/* 1. Program Detail Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onApply={(prog) => {
          setSelectedProgram(null);
          setApplyingProgram(prog);
        }}
        onShare={() => setShareOpen(true)}
      />

      {/* 2. Program Application Form Modal */}
      <ProgramApplyModal
        program={applyingProgram}
        onClose={() => setApplyingProgram(null)}
      />

      {/* 3. Consulting Request Modal */}
      <ConsultingModal
        isOpen={consultingModalOpen}
        onClose={() => setConsultingModalOpen(false)}
        initialType={initialConsultingType}
      />

      {/* 4. Social Share Modal */}
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />

      {/* 5. Full CMS Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
