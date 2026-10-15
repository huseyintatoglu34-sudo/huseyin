import React, { useState } from 'react';
import { 
  WeekData, 
  UserProfile,
  UserSession 
} from '../types';
import { PHASES_CONFIG } from '../data/templates';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Search,
  Trophy,
  Crown,
  Star,
  Flame,
  Award,
  Sparkles,
  Gamepad2,
  ExternalLink,
  FolderOpen
} from 'lucide-react';
import bannerImg from '../assets/images/fener_stadium_banner_1790838257948.jpg';

interface WeekGridProps {
  weeks: WeekData[];
  activeWeek: number;
  profile: UserProfile;
  session: UserSession;
  onSelectWeek: (weekNum: number) => void;
  onToggleWeekComplete: (weekNum: number, e: React.MouseEvent) => void;
}

export const WeekGrid: React.FC<WeekGridProps> = ({
  weeks,
  activeWeek,
  profile,
  session,
  onSelectWeek,
  onToggleWeekComplete,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<number | 'all' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const completedCount = weeks.filter((w) => w.status === 'completed').length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  // Total objectives completed
  let totalObjs = 0;
  let completedObjs = 0;
  let totalHabitChecks = 0;
  let checkedHabits = 0;

  weeks.forEach((w) => {
    totalObjs += w.objectives.length;
    completedObjs += w.objectives.filter((o) => o.completed).length;
    w.habits.forEach((h) => {
      totalHabitChecks += h.days.length;
      checkedHabits += h.days.filter(Boolean).length;
    });
  });

  const objPercent = totalObjs > 0 ? Math.round((completedObjs / totalObjs) * 100) : 0;
  const habitPercent = totalHabitChecks > 0 ? Math.round((checkedHabits / totalHabitChecks) * 100) : 0;

  // Filtered weeks
  const filteredWeeks = weeks.filter((w) => {
    if (selectedPhase === 'completed') {
      if (w.status !== 'completed') return false;
    } else if (selectedPhase !== 'all') {
      if (w.phase !== selectedPhase) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = w.title.toLowerCase().includes(q);
      const matchCategory = w.category.toLowerCase().includes(q);
      const matchSubtitle = w.subtitle.toLowerCase().includes(q);
      const matchWeek = `hafta ${w.weekNumber}`.includes(q) || `${w.weekNumber}` === q;
      return matchTitle || matchCategory || matchSubtitle || matchWeek;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Presence Card (Yellow & Navy Stadium Banner) */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-yellow-400/40 bg-[#071329] shadow-xl">
        <div className="relative h-72 sm:h-80 w-full overflow-hidden">
          <img 
            src={bannerImg} 
            alt="Sarı Lacivert 30 Haftalık Şampiyonluk Yolu" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105" 
          />
          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040b18] via-[#07142c]/75 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
            <div className="max-w-3xl space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-yellow-400">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-yellow-400/20 border border-yellow-400/40">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                  ŞAMPİYON FENER!
                </span>
                <span aria-hidden="true">·</span>
                <span>Sarı Lacivert 30 Hafta</span>
                <span aria-hidden="true">·</span>
                <span>{session.name}</span>
                {session.isVip && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 text-yellow-300 font-extrabold bg-yellow-400/25 px-2 py-0.5 rounded">
                      <Crown className="w-3 h-3 text-yellow-400" />
                      GFB VIP ÜYELİK
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-sm text-balance">
                {profile.visionStatement}
              </h1>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-yellow-400/20">
              <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs sm:text-sm">
                <div>
                  <span className="text-neutral-400 block text-[11px] font-medium">Şampiyonluk Yolu</span>
                  <span className="font-extrabold text-lg font-mono tabular-nums text-yellow-400">
                    {completedCount}/30 <span className="text-xs font-bold text-neutral-300">%{progressPercent}</span>
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px] font-medium">Aktif Hafta</span>
                  <span className="font-extrabold text-lg font-mono tabular-nums text-white flex items-center gap-1">
                    <span>Hafta {activeWeek}</span>
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-neutral-400 block text-[11px] font-medium">Hedef Başarısı</span>
                  <span className="font-extrabold text-lg font-mono tabular-nums text-yellow-300">
                    {completedObjs}/{totalObjs} <span className="text-xs font-normal text-neutral-300">%{objPercent}</span>
                  </span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-neutral-400 block text-[11px] font-medium">Alışkanlık Zinciri</span>
                  <span className="font-extrabold text-lg font-mono tabular-nums text-yellow-400">
                    %{habitPercent}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelectWeek(activeWeek)}
                className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg shadow-yellow-400/20 transition-transform active:scale-95 whitespace-nowrap"
              >
                <span>Hafta {activeWeek}'e Odaklan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 30-Week Micro Timeline Bar (Yellow-Navy) */}
        <div className="p-4 sm:p-5 bg-[#050e21] border-t border-yellow-400/20">
          <div className="flex items-center justify-between mb-2 text-xs text-neutral-300">
            <span className="font-bold flex items-center gap-1.5 text-yellow-400">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              <span>30 Haftalık Sarı Lacivert Fikstür: Şampiyon Fener</span>
            </span>
            <span className="font-mono tabular-nums text-neutral-400">
              {completedCount} hafta zaferle bitti · {30 - completedCount} hafta kaldı
            </span>
          </div>
          <div className="grid grid-cols-15 sm:grid-cols-30 gap-1">
            {weeks.map((w) => {
              const isDone = w.status === 'completed';
              const isActive = w.weekNumber === activeWeek;
              return (
                <button
                  key={w.weekNumber}
                  onClick={() => onSelectWeek(w.weekNumber)}
                  title={`Hafta ${w.weekNumber}: ${w.title}`}
                  className={`h-5 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-all ${
                    isDone
                      ? 'bg-yellow-400 text-neutral-950 hover:bg-yellow-300'
                      : isActive
                      ? 'bg-blue-600 text-white ring-2 ring-yellow-400 ring-offset-1 ring-offset-[#071329]'
                      : 'bg-[#091b3e] text-neutral-400 hover:bg-[#0d2757] hover:text-white'
                  }`}
                >
                  {w.weekNumber}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* GFB VIP Banner if VIP */}
      {session.isVip && (
        <section className="p-4 rounded-xl border-2 border-yellow-400/60 bg-gradient-to-r from-yellow-500/20 via-[#0a1e45] to-[#071530] flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center font-black shadow-md shrink-0">
              <Crown className="w-5 h-5 fill-neutral-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-yellow-400">GFB VIP AYRICALIĞI AKTİF</span>
                <span className="text-[10px] font-mono bg-yellow-400 text-neutral-950 font-bold px-1.5 py-0.2 rounded">
                  {session.gfbMemberNo || 'VIP ÜYE'}
                </span>
              </div>
              <p className="text-xs text-neutral-200 mt-0.5">
                Genç Fenerbahçeliler ruhuyla 30 haftalık şampiyonluk serüveninde tüm özel çıktı ve taktik içeriklere tam erişimdesiniz.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-xs font-bold text-yellow-300 bg-yellow-400/20 px-3 py-1.5 rounded-lg border border-yellow-400/40">
            Şampiyon Fener! 💛💙
          </div>
        </section>
      )}

      {/* Filter and Phase Selection Segmented Controls */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Phase Segmented Buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#061229] border border-blue-900/60 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedPhase('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedPhase === 'all'
                  ? 'bg-yellow-400 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Tüm Haftalar (30)
            </button>

            {PHASES_CONFIG.map((p) => (
              <button
                key={p.number}
                onClick={() => setSelectedPhase(p.number)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedPhase === p.number
                    ? 'bg-yellow-400 text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Faz {p.number} ({p.range})
              </button>
            ))}

            <button
              onClick={() => setSelectedPhase('completed')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedPhase === 'completed'
                  ? 'bg-yellow-400 text-neutral-950 shadow-md font-bold'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Tamamlanan Zaferler ({completedCount})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Fikstürde veya konuda ara..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#071530] border border-blue-900 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>

        {/* Phase Summary Banner if single phase selected */}
        {typeof selectedPhase === 'number' && (
          <div className="p-4 rounded-xl border border-yellow-400/30 bg-[#071635]">
            <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 mb-1">
              <span>Faz {selectedPhase}</span>
              <span aria-hidden="true">·</span>
              <span>{PHASES_CONFIG[selectedPhase - 1].range}</span>
              <span aria-hidden="true">·</span>
              <span>Şampiyon Fener Sezon Planı</span>
            </div>
            <h2 className="text-base font-extrabold text-white">
              {PHASES_CONFIG[selectedPhase - 1].name}
            </h2>
            <p className="text-xs text-neutral-300 mt-0.5">
              {PHASES_CONFIG[selectedPhase - 1].description}
            </p>
          </div>
        )}
      </section>

      {/* 30 Weeks Grid View */}
      {filteredWeeks.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-blue-900 rounded-2xl bg-[#061229]">
          <p className="text-neutral-400 text-sm">Aranan kritere uygun hafta bulunamadı.</p>
          <button 
            onClick={() => { setSelectedPhase('all'); setSearchQuery(''); }}
            className="mt-3 px-3 py-1.5 text-xs text-yellow-400 hover:underline"
          >
            Filtreleri Temizle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWeeks.map((week) => {
            const isCompleted = week.status === 'completed';
            const isActive = week.weekNumber === activeWeek;
            const objsDone = week.objectives.filter((o) => o.completed).length;
            const objsTotal = week.objectives.length;
            const habitChecksDone = week.habits.reduce(
              (acc, h) => acc + h.days.filter(Boolean).length, 
              0
            );
            const habitChecksTotal = week.habits.length * 7;
            const habitWeekPercent = habitChecksTotal > 0 ? Math.round((habitChecksDone / habitChecksTotal) * 100) : 0;

            return (
              <div
                key={week.weekNumber}
                onClick={() => onSelectWeek(week.weekNumber)}
                className={`group relative flex flex-col justify-between p-5 rounded-xl border text-left cursor-pointer transition-all duration-150 ${
                  isActive
                    ? 'border-yellow-400 bg-[#091b3e] shadow-lg ring-1 ring-yellow-400'
                    : isCompleted
                    ? 'border-blue-900 bg-[#07142d] hover:border-yellow-400/60'
                    : 'border-blue-950 bg-[#061229] hover:border-blue-800'
                }`}
              >
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-center justify-between gap-2 text-xs text-neutral-400 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-yellow-400">
                        Hafta {week.weekNumber}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Faz {week.phase}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate max-w-[120px] text-neutral-300">{week.category}</span>
                    </div>

                    {/* Quick status toggle button */}
                    <button
                      onClick={(e) => onToggleWeekComplete(week.weekNumber, e)}
                      title={isCompleted ? "Tamamlanmadı yap" : "Zaferle tamamla"}
                      className={`p-1 rounded-md transition-colors ${
                        isCompleted 
                          ? 'text-yellow-400 hover:bg-yellow-400/20'
                          : 'text-neutral-500 hover:text-yellow-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
                      ) : isActive ? (
                        <span className="flex h-2.5 w-2.5 rounded-full bg-yellow-400 animate-ping" />
                      ) : (
                        <Circle className="w-4 h-4 text-neutral-600" />
                      )}
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-1">
                    {week.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="mt-1 text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {week.subtitle}
                  </p>
                </div>

                {/* Card Bottom Metrics */}
                <div className="mt-4 pt-3 border-t border-blue-900/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Görev & Taktik</span>
                    <span className="font-mono tabular-nums text-yellow-300 font-bold">
                      {objsDone}/{objsTotal} Tamamlandı
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#030914] rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        isCompleted ? 'bg-yellow-400' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${objsTotal > 0 ? (objsDone / objsTotal) * 100 : 0}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                    <span className="truncate max-w-[170px]" title={week.deliverable}>
                      {week.deliverableCompleted ? '✓ Teslim Alındı' : 'Çıktı: ' + week.deliverable.slice(0, 24) + '...'}
                    </span>
                    <span className="font-mono tabular-nums text-yellow-400/90 font-medium">
                      %{habitWeekPercent} Alışkanlık
                    </span>
                  </div>

                  {/* Direct Link Button (Week 3 Game or Week 4 Google Drive) */}
                  {(week.externalLink || week.weekNumber === 3 || week.weekNumber === 4) && (() => {
                    const url = week.externalLink?.url || (week.weekNumber === 4 
                      ? 'https://drive.google.com/drive/folders/1OCd7AC6bTzR9f0uH4nkOQW4dJcXZrlBq?usp=sharing' 
                      : 'https://oyun-ten-omega.vercel.app/');
                    const isDrive = url.includes('drive.google.com') || week.weekNumber === 4;
                    const btnLabel = isDrive ? '4. Hafta Drive: Klasörü Aç' : '3. Hafta Oyunu: Giriş Yap';

                    return (
                      <div className="pt-2 border-t border-yellow-400/20">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-yellow-400/20 hover:bg-yellow-400 text-yellow-300 hover:text-neutral-950 border border-yellow-400/50 flex items-center justify-between text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            {isDrive ? <FolderOpen className="w-3.5 h-3.5 shrink-0" /> : <Gamepad2 className="w-3.5 h-3.5 shrink-0" />}
                            <span>{btnLabel}</span>
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      </div>
                    );
                  })()}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Şampiyon Fener Rally Footer Banner */}
      <section className="p-6 rounded-2xl border-2 border-yellow-400/30 bg-[#071738] flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-yellow-400 text-neutral-950 font-black text-base shadow-md">
            FENER
          </div>
          <div>
            <h3 className="font-black text-base text-yellow-400">
              ŞAMPİYON FENER! 💛💙
            </h3>
            <p className="text-xs text-neutral-300">
              30 haftanın sonunda Kadıköy'de kupa kalkacak; tavizsiz adanmışlıkla devam!
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectWeek(activeWeek)}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-bold rounded-lg text-xs whitespace-nowrap shadow-sm"
        >
          Aktif Haftaya Gir
        </button>
      </section>

    </div>
  );
};
