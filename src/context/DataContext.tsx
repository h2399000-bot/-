import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Program, 
  Notice, 
  ConsultingRequest, 
  ContactInquiry, 
  ProgramApplication, 
  SiteConfig 
} from '../types';
import { 
  DEFAULT_SITE_CONFIG, 
  DEFAULT_PROGRAMS, 
  DEFAULT_NOTICES 
} from '../data/initialData';
import { db } from '../firebase/config';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';

interface DataContextType {
  siteConfig: SiteConfig;
  programs: Program[];
  notices: Notice[];
  consultingRequests: ConsultingRequest[];
  inquiries: ContactInquiry[];
  applications: ProgramApplication[];
  isLoading: boolean;
  isFirebaseConnected: boolean;
  // Actions
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => Promise<void>;
  addProgram: (program: Omit<Program, 'id' | 'createdAt'>) => Promise<string>;
  updateProgram: (id: string, program: Partial<Program>) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;
  addNotice: (notice: Omit<Notice, 'id' | 'views' | 'date'>) => Promise<string>;
  updateNotice: (id: string, notice: Partial<Notice>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
  incrementNoticeViews: (id: string) => void;
  submitConsultingRequest: (req: Omit<ConsultingRequest, 'id' | 'status' | 'createdAt'>) => Promise<string>;
  updateConsultingStatus: (id: string, status: ConsultingRequest['status'], adminNotes?: string) => Promise<void>;
  deleteConsultingRequest: (id: string) => Promise<void>;
  submitContactInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>) => Promise<string>;
  updateInquiryStatus: (id: string, status: ContactInquiry['status']) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  submitProgramApplication: (app: Omit<ProgramApplication, 'id' | 'status' | 'createdAt'>) => Promise<string>;
  resetToInitialData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

const STORAGE_KEYS = {
  CONFIG: 'kepi_site_config_v1',
  PROGRAMS: 'kepi_programs_v1',
  NOTICES: 'kepi_notices_v1',
  CONSULTING: 'kepi_consulting_v1',
  INQUIRIES: 'kepi_inquiries_v1',
  APPLICATIONS: 'kepi_applications_v1',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) } : DEFAULT_SITE_CONFIG;
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  });

  const [programs, setPrograms] = useState<Program[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
      return saved ? JSON.parse(saved) : DEFAULT_PROGRAMS;
    } catch {
      return DEFAULT_PROGRAMS;
    }
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
      return saved ? JSON.parse(saved) : DEFAULT_NOTICES;
    } catch {
      return DEFAULT_NOTICES;
    }
  });

  const [consultingRequests, setConsultingRequests] = useState<ConsultingRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONSULTING);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [applications, setApplications] = useState<ProgramApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  // Firestore Sync Listeners
  useEffect(() => {
    let unsubscribeConfig: () => void;
    let unsubscribePrograms: () => void;
    let unsubscribeNotices: () => void;
    let unsubscribeConsulting: () => void;
    let unsubscribeInquiries: () => void;
    let unsubscribeApps: () => void;

    try {
      // 1. Site Config listener
      const configDocRef = doc(db, 'settings', 'general');
      unsubscribeConfig = onSnapshot(configDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as SiteConfig;
          setSiteConfig(prev => ({ ...prev, ...data }));
          localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(data));
          setIsFirebaseConnected(true);
        }
      }, () => {
        // Fallback gracefully to local storage
      });

      // 2. Programs listener
      const programsCol = collection(db, 'programs');
      unsubscribePrograms = onSnapshot(programsCol, (snapshot) => {
        if (!snapshot.empty) {
          const items: Program[] = [];
          snapshot.forEach((docSnap) => {
            items.push({ id: docSnap.id, ...(docSnap.data() as Omit<Program, 'id'>) });
          });
          setPrograms(items);
          localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(items));
          setIsFirebaseConnected(true);
        }
      }, () => {
        // Fallback to local
      });

      // 3. Notices listener
      const noticesCol = collection(db, 'notices');
      unsubscribeNotices = onSnapshot(noticesCol, (snapshot) => {
        if (!snapshot.empty) {
          const items: Notice[] = [];
          snapshot.forEach((docSnap) => {
            items.push({ id: docSnap.id, ...(docSnap.data() as Omit<Notice, 'id'>) });
          });
          setNotices(items);
          localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(items));
          setIsFirebaseConnected(true);
        }
      }, () => {});

      // 4. Consulting listener
      const consultingCol = collection(db, 'consulting_requests');
      unsubscribeConsulting = onSnapshot(consultingCol, (snapshot) => {
        if (!snapshot.empty) {
          const items: ConsultingRequest[] = [];
          snapshot.forEach((docSnap) => {
            items.push({ id: docSnap.id, ...(docSnap.data() as Omit<ConsultingRequest, 'id'>) });
          });
          items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setConsultingRequests(items);
          localStorage.setItem(STORAGE_KEYS.CONSULTING, JSON.stringify(items));
        }
      }, () => {});

      // 5. Inquiries listener
      const inquiriesCol = collection(db, 'inquiries');
      unsubscribeInquiries = onSnapshot(inquiriesCol, (snapshot) => {
        if (!snapshot.empty) {
          const items: ContactInquiry[] = [];
          snapshot.forEach((docSnap) => {
            items.push({ id: docSnap.id, ...(docSnap.data() as Omit<ContactInquiry, 'id'>) });
          });
          items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setInquiries(items);
          localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(items));
        }
      }, () => {});

      // 6. Applications listener
      const appsCol = collection(db, 'applications');
      unsubscribeApps = onSnapshot(appsCol, (snapshot) => {
        if (!snapshot.empty) {
          const items: ProgramApplication[] = [];
          snapshot.forEach((docSnap) => {
            items.push({ id: docSnap.id, ...(docSnap.data() as Omit<ProgramApplication, 'id'>) });
          });
          items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setApplications(items);
          localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(items));
        }
      }, () => {});

    } catch (e) {
      console.warn('Firebase sync initialization notice:', e);
    }

    return () => {
      if (unsubscribeConfig) unsubscribeConfig();
      if (unsubscribePrograms) unsubscribePrograms();
      if (unsubscribeNotices) unsubscribeNotices();
      if (unsubscribeConsulting) unsubscribeConsulting();
      if (unsubscribeInquiries) unsubscribeInquiries();
      if (unsubscribeApps) unsubscribeApps();
    };
  }, []);

  // Update site config
  const updateSiteConfig = async (newConfig: Partial<SiteConfig>) => {
    const updated = { ...siteConfig, ...newConfig };
    setSiteConfig(updated);
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'settings', 'general'), updated, { merge: true });
    } catch (e) {
      console.warn('Firebase config update fallback to local', e);
    }
  };

  // Program operations
  const addProgram = async (prog: Omit<Program, 'id' | 'createdAt'>) => {
    const newId = 'prog-' + Date.now();
    const newProgram: Program = {
      ...prog,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newProgram, ...programs];
    setPrograms(updated);
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'programs', newId), newProgram);
    } catch (e) {
      console.warn('Firestore program write fallback to local', e);
    }
    return newId;
  };

  const updateProgram = async (id: string, partial: Partial<Program>) => {
    const updated = programs.map(p => p.id === id ? { ...p, ...partial } : p);
    setPrograms(updated);
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(updated));
    try {
      await updateDoc(doc(db, 'programs', id), partial);
    } catch (e) {
      console.warn('Firestore program update fallback to local', e);
    }
  };

  const deleteProgram = async (id: string) => {
    const updated = programs.filter(p => p.id !== id);
    setPrograms(updated);
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'programs', id));
    } catch (e) {
      console.warn('Firestore program delete fallback to local', e);
    }
  };

  // Notice operations
  const addNotice = async (not: Omit<Notice, 'id' | 'views' | 'date'>) => {
    const newId = 'not-' + Date.now();
    const newNotice: Notice = {
      ...not,
      id: newId,
      views: 0,
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [newNotice, ...notices];
    setNotices(updated);
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'notices', newId), newNotice);
    } catch (e) {
      console.warn('Firestore notice write fallback to local', e);
    }
    return newId;
  };

  const updateNotice = async (id: string, partial: Partial<Notice>) => {
    const updated = notices.map(n => n.id === id ? { ...n, ...partial } : n);
    setNotices(updated);
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(updated));
    try {
      await updateDoc(doc(db, 'notices', id), partial);
    } catch (e) {
      console.warn('Firestore notice update fallback to local', e);
    }
  };

  const deleteNotice = async (id: string) => {
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'notices', id));
    } catch (e) {
      console.warn('Firestore notice delete fallback to local', e);
    }
  };

  const incrementNoticeViews = (id: string) => {
    const updated = notices.map(n => n.id === id ? { ...n, views: n.views + 1 } : n);
    setNotices(updated);
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(updated));
    try {
      const target = updated.find(n => n.id === id);
      if (target) {
        updateDoc(doc(db, 'notices', id), { views: target.views });
      }
    } catch {}
  };

  // Consulting inquiries
  const submitConsultingRequest = async (req: Omit<ConsultingRequest, 'id' | 'status' | 'createdAt'>) => {
    const newId = 'req-' + Date.now();
    const newRequest: ConsultingRequest = {
      ...req,
      id: newId,
      status: '접수',
      createdAt: new Date().toISOString(),
    };
    const updated = [newRequest, ...consultingRequests];
    setConsultingRequests(updated);
    localStorage.setItem(STORAGE_KEYS.CONSULTING, JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'consulting_requests', newId), newRequest);
    } catch (e) {
      console.warn('Firestore consulting write fallback to local', e);
    }
    return newId;
  };

  const updateConsultingStatus = async (id: string, status: ConsultingRequest['status'], adminNotes?: string) => {
    const updated = consultingRequests.map(r => r.id === id ? { ...r, status, ...(adminNotes ? { adminNotes } : {}) } : r);
    setConsultingRequests(updated);
    localStorage.setItem(STORAGE_KEYS.CONSULTING, JSON.stringify(updated));
    try {
      await updateDoc(doc(db, 'consulting_requests', id), { status, ...(adminNotes ? { adminNotes } : {}) });
    } catch (e) {
      console.warn('Firestore consulting update fallback to local', e);
    }
  };

  const deleteConsultingRequest = async (id: string) => {
    const updated = consultingRequests.filter(r => r.id !== id);
    setConsultingRequests(updated);
    localStorage.setItem(STORAGE_KEYS.CONSULTING, JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'consulting_requests', id));
    } catch {}
  };

  // Contact Inquiries
  const submitContactInquiry = async (inq: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>) => {
    const newId = 'inq-' + Date.now();
    const newInquiry: ContactInquiry = {
      ...inq,
      id: newId,
      status: '미확인',
      createdAt: new Date().toISOString(),
    };
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'inquiries', newId), newInquiry);
    } catch (e) {
      console.warn('Firestore inquiry write fallback to local', e);
    }
    return newId;
  };

  const updateInquiryStatus = async (id: string, status: ContactInquiry['status']) => {
    const updated = inquiries.map(i => i.id === id ? { ...i, status } : i);
    setInquiries(updated);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    try {
      await updateDoc(doc(db, 'inquiries', id), { status });
    } catch {}
  };

  const deleteInquiry = async (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch {}
  };

  // Course applications
  const submitProgramApplication = async (appData: Omit<ProgramApplication, 'id' | 'status' | 'createdAt'>) => {
    const newId = 'app-' + Date.now();
    const newApp: ProgramApplication = {
      ...appData,
      id: newId,
      status: '접수완료',
      createdAt: new Date().toISOString(),
    };
    const updated = [newApp, ...applications];
    setApplications(updated);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));

    // Increase currentApplicants on program
    const targetProg = programs.find(p => p.id === appData.programId);
    if (targetProg) {
      const nextCount = (targetProg.currentApplicants || 0) + 1;
      updateProgram(targetProg.id, { 
        currentApplicants: nextCount,
        status: nextCount >= targetProg.capacity ? '마감임박' : targetProg.status
      });
    }

    try {
      await setDoc(doc(db, 'applications', newId), newApp);
    } catch (e) {
      console.warn('Firestore application write fallback to local', e);
    }
    return newId;
  };

  // Reset to initial demo data
  const resetToInitialData = async () => {
    setIsLoading(true);
    setSiteConfig(DEFAULT_SITE_CONFIG);
    setPrograms(DEFAULT_PROGRAMS);
    setNotices(DEFAULT_NOTICES);
    setConsultingRequests([]);
    setInquiries([]);
    setApplications([]);

    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_SITE_CONFIG));
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(DEFAULT_PROGRAMS));
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(DEFAULT_NOTICES));
    localStorage.setItem(STORAGE_KEYS.CONSULTING, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify([]));

    try {
      await setDoc(doc(db, 'settings', 'general'), DEFAULT_SITE_CONFIG);
      for (const prog of DEFAULT_PROGRAMS) {
        await setDoc(doc(db, 'programs', prog.id), prog);
      }
      for (const not of DEFAULT_NOTICES) {
        await setDoc(doc(db, 'notices', not.id), not);
      }
    } catch (e) {
      console.warn('Error during Firestore batch reset:', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{
      siteConfig,
      programs,
      notices,
      consultingRequests,
      inquiries,
      applications,
      isLoading,
      isFirebaseConnected,
      updateSiteConfig,
      addProgram,
      updateProgram,
      deleteProgram,
      addNotice,
      updateNotice,
      deleteNotice,
      incrementNoticeViews,
      submitConsultingRequest,
      updateConsultingStatus,
      deleteConsultingRequest,
      submitContactInquiry,
      updateInquiryStatus,
      deleteInquiry,
      submitProgramApplication,
      resetToInitialData,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
