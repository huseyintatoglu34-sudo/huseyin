import React from 'react';
import { WeekData, UserProfile, UserSession } from '../types';
import { PHASES_CONFIG } from '../data/templates';
import { 
  Trophy, 
  Target, 
  Flame, 
  Award, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  Printer,
  Crown,
  Star
} from 'lucide-react';

interface AnalyticsViewProps {
  weeks: WeekData[];
  profile: UserProfile;
  session: UserSession;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ weeks, profile, session }) => {
  const completedWeeks = weeks.filter((w) => w.status === 'completed');
  const completedCount = completedWeeks.length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  // Objectives calculation
  const totalObjectives = weeks.reduce((acc, w) => acc + w.objectives.length, 0);
  const doneObjectives = weeks.reduce(
    (acc, w) => acc + w.objectives.filter((o) => o.completed).length,
    0
  );
  const objectivesPercent =
    totalObjectives > 0 ? Math.round((doneObjectives / totalObjectives) * 100) : 0;

  // Habits calculation
  let totalHabitCells = 0;
  let doneHabitCells = 0;
  weeks.forEach((w) => {
    w.habits.forEach((h) => {
      totalHabitCells += h.days.length;
      doneHabitCells += h.days.filter(Boolean).length;
    });
  });
  const overallHabitPercent =
    totalHabitCells > 0 ? Math.round((doneHabitCells / totalHabitCells) * 100) : 0;

  // Deliverables count
  const doneDeliverables = weeks.filter((w) => w.deliverableCompleted).length;

  // Average Energy & Satisfaction
  const weeksWithReflection = weeks.filter(
    (w) => w.reflection.energyRating > 0 && w.status !== 'not_started'
  );
  const avgEnergy =
    weeksWithReflection.length > 0
      ? (
          weeksWithReflection.reduce((acc, w) => acc + w.reflection.energyRating, 0) /
          weeksWithReflection.length
        ).toFixed(1)
      : '0.0';

  const avgSatisfaction =
    weeksWithReflection.length > 0
      ? (
          weeksWithReflection.reduce((acc, w) => acc + w.reflection.satisfactionRating, 0) /
          weeksWithReflection.length
        ).toFixed(1)
      : '0.0';

  // Badges calculation (Sarı Lacivert & Şampiyon Fener temalı)
  const badges = [
    {
      id: 'first_step',
      title: 'İlk Düdük & Başlangıç',
      desc: '1. Hafta başarıyla tamamlandı.',
      unlocked: weeks[0]?.status === 'completed',
    },
    {
      id: 'kadikoy_ruhu',
      title: 'Kadıköy Ruhu (Faz 1)',
      desc: 'İlk 6 haftalık sarı lacivert temel tamamlandı.',
      unlocked: weeks.slice(0, 6).every((w) => w.status === 'completed'),
    },
    {
      id: 'derbi_fatihi',
      title: 'Derbi Fatihi (Yarı Yol)',
      desc: '15 hafta geride bırakıldı.',
      unlocked: weeks.slice(0, 15).filter((w) => w.status === 'completed').length >= 15,
    },
    {
      id: 'gfb_sadakat',
      title: 'GFB Sadakat Rozeti',
      desc: 'En az 50 günlük alışkanlık kutusu işaretlendi.',
      unlocked: doneHabitCells >= 50,
    },
    {
      id: 'kupa_avcisi',
      title: 'Kupa Avcısı',
      desc: 'En az 5 somut haftalık teslim tamamlandı.',
      unlocked: doneDeliverables >= 5,
    },
    {
      id: 'sampiyon_fener',
      title: 'ŞAMPİYON FENER! 🏆',
      desc: 'Tüm 30 haftalık şampiyonluk yolculuğu zaferle tamamlandı!',
      unlocked: completedCount === 30,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 text-white">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-yellow-400 font-semibold mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>Sarı Lacivert Şampiyonluk İstatistikleri</span>
            <span aria-hidden="true">·</span>
            <span>Şampiyon Fener!</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            30 Haftalık Sezon Karnesi & Zafer Tablosu
          </h1>
        </div>

        <button
          onClick={() => window.print()}
          className="self-start sm:self-auto px-4 py-2 text-xs font-bold rounded-lg border border-yellow-400/40 bg-[#091b3e] text-yellow-300 hover:bg-[#0c2454] flex items-center gap-1.5 transition-colors no-print"
        >
          <Printer className="w-4 h-4" />
          <span>Karnemi Yazdır / PDF</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border-2 border-yellow-400/30 bg-[#071635] shadow-sm">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>30 Hafta Puanı</span>
            <Calendar className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-yellow-400">
            {completedCount}<span className="text-base text-neutral-400 font-normal">/30</span>
          </div>
          <div className="mt-2 text-xs text-yellow-300 font-semibold">
            %{progressPercent} Zafer Tamamlandı
          </div>
        </div>

        <div className="p-5 rounded-xl border border-blue-900 bg-[#071635] shadow-sm">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Taktiksel Hedefler</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-white">
            {doneObjectives}<span className="text-base text-neutral-400 font-normal">/{totalObjectives}</span>
          </div>
          <div className="mt-2 text-xs text-blue-400 font-semibold">
            %{objectivesPercent} Başarı Oranı
          </div>
        </div>

        <div className="p-5 rounded-xl border border-blue-900 bg-[#071635] shadow-sm">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Alışkanlık Sadakati</span>
            <Flame className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-yellow-400">
            %{overallHabitPercent}
          </div>
          <div className="mt-2 text-xs text-neutral-300 font-medium">
            {doneHabitCells} Sarı Lacivert Gün
          </div>
        </div>

        <div className="p-5 rounded-xl border border-blue-900 bg-[#071635] shadow-sm">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Kupa & Çıktılar</span>
            <Award className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-yellow-300">
            {doneDeliverables}<span className="text-base text-neutral-400 font-normal">/30</span>
          </div>
          <div className="mt-2 text-xs text-yellow-400/90 font-medium">
            Haftalık Büyük Eser
          </div>
        </div>
      </div>

      {/* Phase-by-Phase Breakdown */}
      <section className="p-6 rounded-2xl border border-blue-900 bg-[#071635] shadow-sm space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>Faz Faz Şampiyonluk Yarışı</span>
        </h2>

        <div className="space-y-4">
          {PHASES_CONFIG.map((phase) => {
            const phaseWeeks = weeks.filter((w) => w.phase === phase.number);
            const phaseDone = phaseWeeks.filter((w) => w.status === 'completed').length;
            const phaseTotal = phaseWeeks.length;
            const phasePercent = Math.round((phaseDone / phaseTotal) * 100);

            return (
              <div key={phase.number} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-yellow-300">
                      Faz {phase.number}: {phase.name}
                    </span>
                    <span className="text-neutral-400">({phase.range})</span>
                  </div>
                  <span className="font-mono tabular-nums text-yellow-400 font-bold">
                    {phaseDone}/{phaseTotal} Hafta (%{phasePercent})
                  </span>
                </div>
                <div className="w-full bg-[#030914] rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      phasePercent === 100 ? 'bg-yellow-400' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${phasePercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Energy & Satisfaction Trend */}
      <section className="p-6 rounded-2xl border border-blue-900 bg-[#071635] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white">
              Haftalık Şampiyonluk Enerjisi Dağılımı
            </h2>
            <p className="text-xs text-neutral-400">
              30 haftanın her birinde hissedilen moral, motivasyon ve öz-disiplin puanları.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-yellow-400 font-bold">Ortalama Enerji: {avgEnergy}/5.0</span>
            <span className="text-yellow-300 font-bold">Ortalama Memnuniyet: {avgSatisfaction}/5.0</span>
          </div>
        </div>

        {/* Visual 30-Week Rating Matrix */}
        <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-15 gap-2 pt-2">
          {weeks.map((w) => {
            return (
              <div
                key={w.weekNumber}
                className="p-2 rounded-lg border border-blue-900 bg-[#091b3e] text-center"
              >
                <span className="block text-[10px] font-mono text-neutral-400">H{w.weekNumber}</span>
                <div className="mt-1 flex items-center justify-center gap-1 text-[11px] font-mono tabular-nums font-bold">
                  <span className="text-yellow-400" title="Enerji">
                    {w.reflection.energyRating}★
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Achievement Badges */}
      <section className="p-6 rounded-2xl border-2 border-yellow-400/30 bg-[#071635] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <h2 className="text-base font-black text-white">
              Sarı Lacivert Zafer Rozetleri & Efsaneler
            </h2>
          </div>
          {session.isVip && (
            <span className="text-xs font-black bg-yellow-400 text-neutral-950 px-2 py-0.5 rounded flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 fill-neutral-950" />
              GFB VIP ÜYE
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border transition-all ${
                b.unlocked
                  ? 'border-yellow-400/80 bg-gradient-to-br from-yellow-500/20 via-[#0a1e45] to-[#07142d] shadow-md'
                  : 'border-blue-950 bg-[#061229] opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-extrabold ${b.unlocked ? 'text-yellow-300' : 'text-neutral-500'}`}>
                  {b.title}
                </span>
                {b.unlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
                ) : (
                  <span className="text-[10px] text-neutral-500 uppercase font-mono">Hedef</span>
                )}
              </div>
              <p className="text-xs text-neutral-300">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
