import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Notice, NoticeCategory } from '../types';
import { 
  Megaphone, 
  Search, 
  Pin, 
  Eye, 
  Calendar, 
  User, 
  ArrowRight, 
  FileText,
  ChevronRight
} from 'lucide-react';

interface NewsSectionProps {
  onSelectNotice: (notice: Notice) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onSelectNotice }) => {
  const { notices, incrementNoticeViews } = useData();
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory>('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: NoticeCategory[] = ['전체', '공지', '보도자료', '합격수기', '채용소식'];

  const filteredNotices = useMemo(() => {
    return notices.filter((n) => {
      const matchCategory = selectedCategory === '전체' || n.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchSearch = !term ||
        n.title.toLowerCase().includes(term) ||
        n.content.toLowerCase().includes(term) ||
        n.author.toLowerCase().includes(term);

      return matchCategory && matchSearch;
    });
  }, [notices, selectedCategory, searchTerm]);

  // Sort pinned to the top
  const sortedNotices = useMemo(() => {
    return [...filteredNotices].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [filteredNotices]);

  const handleNoticeClick = (notice: Notice) => {
    incrementNoticeViews(notice.id);
    onSelectNotice(notice);
  };

  const getCategoryBadge = (cat: Notice['category']) => {
    switch (cat) {
      case '공지':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case '보도자료':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '합격수기':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case '채용소식':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <section 
      id="news" 
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
          <Megaphone className="w-3.5 h-3.5" />
          <span>NEWS & NOTICES</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          한국고용진흥원 <span className="text-purple-600">공지 및 소식</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          최신 교육과정 공고, 보도자료, 수료생 합격 후기 및 채용 소식을 실시간으로 확인하세요.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`notice-cat-${cat}`}
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

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="제목, 내용, 작성자 검색..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Notices Table / List */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600">
          <div className="col-span-1 text-center">구분</div>
          <div className="col-span-2 text-center">카테고리</div>
          <div className="col-span-6">제목</div>
          <div className="col-span-1 text-center">작성자</div>
          <div className="col-span-1 text-center">등록일</div>
          <div className="col-span-1 text-center">조회수</div>
        </div>

        {sortedNotices.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            등록된 게시글이 없습니다.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sortedNotices.map((not) => (
              <div
                key={not.id}
                id={`notice-row-${not.id}`}
                onClick={() => handleNoticeClick(not)}
                className={`group px-5 sm:px-6 py-4 cursor-pointer transition-all hover:bg-purple-50/50 flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center ${
                  not.isPinned ? 'bg-purple-50/30' : ''
                }`}
              >
                {/* Pin or ID */}
                <div className="hidden md:flex col-span-1 justify-center">
                  {not.isPinned ? (
                    <span className="p-1 rounded bg-purple-100 text-purple-700 border border-purple-200">
                      <Pin className="w-3.5 h-3.5 rotate-45" />
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">#{not.id.slice(-3)}</span>
                  )}
                </div>

                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-2 md:mb-0 md:col-span-2 md:justify-center">
                  {not.isPinned && (
                    <span className="md:hidden p-1 rounded bg-purple-100 text-purple-700 border border-purple-200">
                      <Pin className="w-3 h-3" />
                    </span>
                  )}
                  <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getCategoryBadge(not.category)}`}>
                    {not.category}
                  </span>
                </div>

                {/* Title & Preview */}
                <div className="md:col-span-6">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1 flex items-center gap-2">
                    <span>{not.title}</span>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1 md:hidden">
                    {not.content.replace(/\n/g, ' ')}
                  </p>
                </div>

                {/* Author */}
                <div className="hidden md:block col-span-1 text-center text-xs text-slate-500">
                  {not.author}
                </div>

                {/* Date */}
                <div className="hidden md:block col-span-1 text-center text-xs text-slate-500">
                  {not.date}
                </div>

                {/* Views */}
                <div className="hidden md:flex col-span-1 justify-center items-center gap-1 text-xs text-slate-500">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>{not.views}</span>
                </div>

                {/* Mobile Meta Row */}
                <div className="flex md:hidden items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <span>{not.author}</span>
                    <span>{not.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{not.views}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </section>
  );
};
