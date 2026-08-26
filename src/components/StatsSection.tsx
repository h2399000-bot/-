import React from 'react';
import { STATS, PARTNERS } from '../data/initialData';
import { TrendingUp, Users, Award, Star, CheckCircle, Shield } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const statIcons = [Users, TrendingUp, Award, Star];

  return (
    <section 
      id="stats-section"
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Metric stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div
                key={stat.label}
                id={`stat-card-${idx}`}
                className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-400 transition-all group overflow-hidden shadow-xs hover:shadow-lg hover:shadow-purple-900/5"
              >
                {/* Glow effect */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-200/40 rounded-full blur-xl group-hover:bg-purple-300/40 transition-colors" />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                    {stat.subtext}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-purple-600">
                    {stat.suffix}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-600">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Partners & Government Collaborations */}
        <div className="border-t border-slate-200 pt-10">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-purple-700 tracking-widest uppercase block mb-1">
              Trusted Network & Partners
            </span>
            <h3 className="text-lg font-bold text-slate-800">
              한국고용진흥원과 함께하는 주요 공공기관 및 선도 기업
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {PARTNERS.map((p, i) => (
              <div
                key={p.name}
                id={`partner-badge-${i}`}
                className="px-4 py-3 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 transition-all flex flex-col items-center justify-center text-center group shadow-2xs"
              >
                <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-purple-700 transition-colors">
                  {p.name}
                </span>
                <span className="text-[10px] text-purple-600 font-semibold mt-0.5">
                  {p.type}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
