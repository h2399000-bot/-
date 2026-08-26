export type ProgramCategory = '전체' | '취업역량' | '직무전문' | 'AI·디지털' | '재취업·전직' | '기업위탁';
export type ProgramStatus = '모집중' | '마감임박' | '모집마감' | '상시대기';

export interface Program {
  id: string;
  title: string;
  category: '취업역량' | '직무전문' | 'AI·디지털' | '재취업·전직' | '기업위탁';
  subtitle: string;
  description: string;
  targetAudience: string;
  duration: string;
  schedule: string;
  location: string;
  capacity: number;
  currentApplicants: number;
  status: ProgramStatus;
  curriculum: string[];
  tags: string[];
  imageUrl: string;
  featured: boolean;
  benefits: string[];
  tuition: string;
  createdAt: string;
}

export type NoticeCategory = '전체' | '공지' | '보도자료' | '합격수기' | '채용소식';

export interface Notice {
  id: string;
  title: string;
  category: '공지' | '보도자료' | '합격수기' | '채용소식';
  content: string;
  author: string;
  date: string;
  views: number;
  isPinned: boolean;
  attachmentName?: string;
  externalLink?: string;
  imageUrl?: string;
}

export type ConsultingType = '기업 HRD 컨설팅' | '1:1 취업·커리어 코칭' | 'NCS 기반 직무분석' | '청년·신중년 고용지원' | '기타 맞춤 컨설팅';
export type ConsultingStatus = '접수' | '검토중' | '상담완료' | '보류';

export interface ConsultingRequest {
  id: string;
  clientName: string;
  companyOrAffiliation: string;
  phone: string;
  email: string;
  type: ConsultingType;
  preferredDate: string;
  message: string;
  status: ConsultingStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: string;
  status: '미확인' | '답변완료';
  createdAt: string;
}

export interface ProgramApplication {
  id: string;
  programId: string;
  programTitle: string;
  applicantName: string;
  phone: string;
  email: string;
  birthDate?: string;
  motivation: string;
  status: '접수완료' | '서류검토' | '면접안내' | '최종선발';
  createdAt: string;
}

export interface SiteConfig {
  brandName: string;
  brandEnglish: string;
  tagline: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  accentColor: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  operatingHours: string;
  directorName: string;
  directorGreetingTitle: string;
  directorGreeting: string;
  socialLinks: {
    instagram: string;
    kakao: string;
    blog: string;
    youtube: string;
  };
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    link?: string;
  };
}
