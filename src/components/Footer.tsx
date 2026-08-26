import React from 'react';
import { useData } from '../context/DataContext';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Settings, 
  Share2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenShare: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAdmin,
  onOpenShare,
}) => {
  const { siteConfig } = useData();

  return (
    <footer 
      id="main-footer"
      className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs pt-16 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-950">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">{siteConfig.brandName}</h3>
                <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">
                  {siteConfig.brandEnglish}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {siteConfig.tagline}
            </p>

            {/* Social Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={siteConfig.socialLinks.kakao}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20 transition-colors font-bold text-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>카카오톡 채널</span>
              </a>

              <a
                href={siteConfig.socialLinks.blog}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors font-bold text-xs flex items-center gap-1.5"
              >
                <span>네이버 블로그</span>
              </a>

              <button
                onClick={onOpenShare}
                className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 transition-colors font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>SNS 공유</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white">바로가기</h4>
            <ul className="space-y-2">
              {['home:홈으로', 'about:기관 소개 및 비전', 'education:교육 프로그램', 'consulting:기업/개인 컨설팅', 'news:공지 및 소식', 'contact:문의하기 & 오시는 길'].map((item) => {
                const [id, label] = item.split(':');
                return (
                  <li key={id}>
                    <button
                      onClick={() => onNavigate(id)}
                      className="hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Legal & Admin */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-white">운영 및 법적 고지</h4>
            <div className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
              <p>기관명: {siteConfig.brandName} | 대표자: {siteConfig.directorName}</p>
              <p>사업자등록번호: 107-82-49120 | 통신판매업신고: 제2024-서울영등포-0891호</p>
              <p>직업능력개발훈련시설 지정 제2021-09호</p>
              <p>주소: {siteConfig.address}</p>
              <p>대표전화: {siteConfig.contactPhone} | 이메일: {siteConfig.contactEmail}</p>
            </div>

            <div className="pt-2">
              <button
                id="btn-footer-admin"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-900/50 text-slate-300 hover:text-purple-200 border border-slate-700 hover:border-purple-500/50 transition-all font-semibold cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>관리자 CMS 대시보드</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2018-{new Date().getFullYear()} {siteConfig.brandName} ({siteConfig.brandEnglish}). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">개인정보처리방침</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">이용약관</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">이메일무단수집거부</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
