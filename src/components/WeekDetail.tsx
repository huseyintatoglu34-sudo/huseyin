import React, { useState } from 'react';
import { WeekData, Objective, HabitItem, UserSession } from '../types';
import { PHASES_CONFIG } from '../data/templates';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Quote, 
  Target, 
  Flame, 
  Smile, 
  FileText, 
  Award,
  Sparkles,
  Edit2,
  Check,
  Trophy,
  Crown
} from 'lucide-react';

interface WeekDetailProps {
  week: WeekData;
  activeWeekNumber: number;
  session: UserSession;
  onUpdateWeek: (updatedWeek: WeekData) => void;
  onNavigateWeek: (weekNum: number) => void;
  onSetActiveWeek: (weekNum: number) => void;
}

const DAYS_SHORT = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

export const WeekDetail: React.FC<WeekDetailProps> = ({
  week,
  activeWeekNumber,
  session,
  onUpdateWeek,
  onNavigateWeek,
  onSetActiveWeek,
}) => {
  const [newObjectiveText, setNewObjectiveText] = useState('');
  const [newHabitText, setNewHabitText] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(week.title);
  const [subtitleInput, setSubtitleInput] = useState(week.subtitle);

  const phaseInfo = PHASES_CONFIG[week.phase - 1];
  const isCurrentActive = week.weekNumber === activeWeekNumber;
  const isDone = week.status === 'completed';

  // Toggle week status
  const handleToggleStatus = () => {
    const nextStatus = isDone ? 'in_progress' : 'completed';
    onUpdateWeek({
      ...week,
      status: nextStatus,
      completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined,
    });
  };

  // Objectives handling
  const handleToggleObjective = (id: string) => {
    const updated = week.objectives.map((o) =>
      o.id === id ? { ...o, completed: !o.completed } : o
    );
    onUpdateWeek({ ...week, objectives: updated });
  };

  const handleAddObjective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObjectiveText.trim()) return;
    const newObj: Objective = {
      id: Date.now().toString(),
      text: newObjectiveText.trim(),
      completed: false,
    };
    onUpdateWeek({
      ...week,
      objectives: [...week.objectives, newObj],
    });
    setNewObjectiveText('');
  };

  const handleDeleteObjective = (id: string) => {
    onUpdateWeek({
      ...week,
      objectives: week.objectives.filter((o) => o.id !== id),
    });
  };

  // Habits handling
  const handleToggleHabitDay = (habitId: string, dayIndex: number) => {
    const updated = week.habits.map((h) => {
      if (h.id !== habitId) return h;
      const nextDays = [...h.days];
      nextDays[dayIndex] = !nextDays[dayIndex];
      return { ...h, days: nextDays };
    });
    onUpdateWeek({ ...week, habits: updated });
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitText.trim()) return;
    const newHabit: HabitItem = {
      id: `h_${week.weekNumber}_${Date.now()}`,
      name: newHabitText.trim(),
      days: [false, false, false, false, false, false, false],
    };
    onUpdateWeek({
      ...week,
      habits: [...week.habits, newHabit],
    });
    setNewHabitText('');
  };

  const handleDeleteHabit = (habitId: string) => {
    onUpdateWeek({
      ...week,
      habits: week.habits.filter((h) => h.id !== habitId),
    });
  };

  // Deliverable toggle
  const handleToggleDeliverable = () => {
    onUpdateWeek({
      ...week,
      deliverableCompleted: !week.deliverableCompleted,
    });
  };

  // Reflection handling
  const handleReflectionChange = (
    field: 'wins' | 'challenges' | 'learnings' | 'energyRating' | 'satisfactionRating',
    val: string | number
  ) => {
    onUpdateWeek({
      ...week,
      reflection: {
        ...week.reflection,
        [field]: val,
      },
    });
  };

  // Notes handling
  const handleNotesChange = (val: string) => {
    onUpdateWeek({
      ...week,
      notes: val,
    });
  };

  // Save Title edit
  const handleSaveTitleEdit = () => {
    onUpdateWeek({
      ...week,
      title: titleInput,
      subtitle: subtitleInput,
    });
    setIsEditingTitle(false);
  };

  // Stats calculation
  const completedObjs = week.objectives.filter((o) => o.completed).length;
  const totalObjs = week.objectives.length;
  const totalHabitChecks = week.habits.reduce(
    (acc, h) => acc + h.days.filter(Boolean).length,
    0
  );
  const maxHabitChecks = week.habits.length * 7;
  const habitRate = maxHabitChecks > 0 ? Math.round((totalHabitChecks / maxHabitChecks) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 text-white">
      
      {/* Week Navigator Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-blue-900 bg-[#071530] shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateWeek(week.weekNumber - 1)}
            disabled={week.weekNumber <= 1}
            className="p-1.5 rounded-lg border border-blue-800 text-neutral-300 hover:text-white hover:bg-blue-900/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Önceki Hafta"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="px-2">
            <span className="text-[11px] text-yellow-400 font-semibold block">Şampiyonluk Sezonu</span>
            <span className="font-extrabold text-sm text-white">
              Hafta {week.weekNumber} / 30
            </span>
          </div>

          <button
            onClick={() => onNavigateWeek(week.weekNumber + 1)}
            disabled={week.weekNumber >= 30}
            className="p-1.5 rounded-lg border border-blue-800 text-neutral-300 hover:text-white hover:bg-blue-900/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Sonraki Hafta"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {!isCurrentActive && (
            <button
              onClick={() => onSetActiveWeek(week.weekNumber)}
              className="px-3 py-1.5 text-xs font-semibold text-neutral-300 bg-[#091f48] hover:bg-[#0c2961] border border-blue-800 rounded-lg transition-colors whitespace-nowrap"
            >
              Aktif Hafta Yap
            </button>
          )}

          <button
            onClick={handleToggleStatus}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              isDone
                ? 'bg-yellow-400 text-neutral-950 hover:bg-yellow-300 shadow-md'
                : 'bg-blue-900 text-white hover:bg-blue-800 border border-blue-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isDone ? 'Zaferle Tamamlandı (Şampiyon Fener)' : 'Haftayı Tamamla'}</span>
          </button>
        </div>
      </div>

      {/* Week Header & Overview Card */}
      <section className="p-6 sm:p-8 rounded-2xl border-2 border-yellow-400/30 bg-[#071635] shadow-md space-y-6">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-neutral-400 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-yellow-400">
                Faz {week.phase}: {phaseInfo.name}
              </span>
              <span aria-hidden="true">·</span>
              <span>{week.category}</span>
              <span aria-hidden="true">·</span>
              <span>Hafta {week.weekNumber}</span>
            </div>

            <button
              onClick={() => {
                setIsEditingTitle(!isEditingTitle);
                setTitleInput(week.title);
                setSubtitleInput(week.subtitle);
              }}
              className="text-xs text-neutral-400 hover:text-yellow-400 flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditingTitle ? 'İptal' : 'Düzenle'}</span>
            </button>
          </div>

          {isEditingTitle ? (
            <div className="space-y-3 mt-3">
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full text-xl font-bold bg-[#0b1c3d] border border-yellow-400/50 rounded-lg p-2.5 text-white"
                placeholder="Hafta Başlığı"
              />
              <textarea
                value={subtitleInput}
                onChange={(e) => setSubtitleInput(e.target.value)}
                rows={2}
                className="w-full text-xs text-neutral-200 bg-[#0b1c3d] border border-yellow-400/50 rounded-lg p-2.5"
                placeholder="Haftalık Odak Açıklaması"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingTitle(false)}
                  className="px-3 py-1 text-xs text-neutral-400 hover:text-white"
                >
                  Vazgeç
                </button>
                <button
                  onClick={handleSaveTitleEdit}
                  className="px-3 py-1 text-xs font-bold bg-yellow-400 text-neutral-950 rounded-md hover:bg-yellow-300"
                >
                  Kaydet
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>{week.title}</span>
              </h1>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed max-w-3xl">
                {week.subtitle}
              </p>
            </div>
          )}
        </div>

        {/* Quote box */}
        {week.quote && (
          <div className="p-4 rounded-xl bg-[#091b3e] border border-yellow-400/30 flex items-start gap-3">
            <Quote className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="italic text-neutral-200 leading-relaxed">
                "{week.quote.text}"
              </p>
              <p className="mt-1 font-bold text-yellow-400 text-right">
                — {week.quote.author}
              </p>
            </div>
          </div>
        )}

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-blue-900/80 text-xs">
          <div>
            <span className="text-neutral-400 block text-[11px]">Hedef Durumu</span>
            <span className="font-extrabold text-sm font-mono tabular-nums text-yellow-400">
              {completedObjs}/{totalObjs} Görev ({totalObjs > 0 ? Math.round((completedObjs / totalObjs) * 100) : 0}%)
            </span>
          </div>
          <div>
            <span className="text-neutral-400 block text-[11px]">Sarı Lacivert Alışkanlık</span>
            <span className="font-extrabold text-sm font-mono tabular-nums text-white">
              %{habitRate} ({totalHabitChecks}/{maxHabitChecks} Gün)
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-neutral-400 block text-[11px]">Haftalık Çıktı</span>
            <span className={`font-bold text-xs ${week.deliverableCompleted ? 'text-yellow-400' : 'text-neutral-400'}`}>
              {week.deliverableCompleted ? '✓ Teslim Edildi (Şampiyon Fener)' : '○ Bekleniyor'}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 1: Key Objectives & Tasks */}
      <section className="p-6 rounded-2xl border border-blue-900 bg-[#071635] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">
              Haftalık Taktiksel Hedefler & Görevler
            </h2>
          </div>
          <span className="text-xs font-mono tabular-nums text-yellow-400 font-bold">
            {completedObjs}/{totalObjs} Zafer
          </span>
        </div>

        {/* Task Progress Bar */}
        <div className="w-full bg-[#030914] rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-yellow-400 transition-all duration-300"
            style={{ width: `${totalObjs > 0 ? (completedObjs / totalObjs) * 100 : 0}%` }}
          />
        </div>

        {/* Task list */}
        <div className="space-y-2 pt-2">
          {week.objectives.map((obj) => (
            <div
              key={obj.id}
              className={`flex items-start justify-between gap-3 p-3 rounded-lg border transition-colors ${
                obj.completed
                  ? 'bg-[#050e21] border-yellow-400/40 text-neutral-400'
                  : 'bg-[#091b3e] border-blue-900 hover:border-yellow-400/50'
              }`}
            >
              <button
                onClick={() => handleToggleObjective(obj.id)}
                className="mt-0.5 text-neutral-400 hover:text-yellow-400 transition-colors"
              >
                {obj.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
                ) : (
                  <Circle className="w-5 h-5 text-neutral-600" />
                )}
              </button>

              <span
                onClick={() => handleToggleObjective(obj.id)}
                className={`flex-1 text-xs sm:text-sm leading-relaxed cursor-pointer select-none ${
                  obj.completed
                    ? 'line-through text-neutral-500'
                    : 'text-neutral-200'
                }`}
              >
                {obj.text}
              </span>

              <button
                onClick={() => handleDeleteObjective(obj.id)}
                className="text-neutral-500 hover:text-rose-400 p-1 rounded transition-colors"
                title="Görevi Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Objective Form */}
        <form onSubmit={handleAddObjective} className="flex gap-2 pt-2">
          <input
            type="text"
            value={newObjectiveText}
            onChange={(e) => setNewObjectiveText(e.target.value)}
            placeholder="Bu haftaya yeni bir şampiyonluk görevi ekle..."
            className="flex-1 px-3 py-2 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
          />
          <button
            type="submit"
            className="px-3.5 py-2 text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-neutral-950 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Ekle</span>
          </button>
        </form>
      </section>

      {/* SECTION 2: 7-Day Habit Tracker Matrix */}
      <section className="p-6 rounded-2xl border border-blue-900 bg-[#071635] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">
              7 Günlük Sarı Lacivert Alışkanlık Matrisi
            </h2>
          </div>
          <span className="text-xs font-mono tabular-nums text-yellow-400 font-bold">
            %{habitRate} Sadakat
          </span>
        </div>

        <p className="text-xs text-neutral-400">
          Pazartesiden Pazara sarı lacivert disiplini bozmadan kutuları işaretle; Şampiyon Fener azmiyle zinciri kırma!
        </p>

        {/* Habit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-blue-900 text-neutral-400">
                <th className="py-2.5 pr-4 font-medium">Alışkanlık</th>
                {DAYS_SHORT.map((day, idx) => (
                  <th key={idx} className="py-2.5 px-2 text-center font-bold text-yellow-300 w-10">
                    {day}
                  </th>
                ))}
                <th className="py-2.5 px-3 text-right font-medium w-16">Skor</th>
                <th className="py-2.5 pl-2 text-right w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/50">
              {week.habits.map((habit) => {
                const habitDoneDays = habit.days.filter(Boolean).length;

                return (
                  <tr key={habit.id} className="hover:bg-blue-900/20">
                    <td className="py-3 pr-4 font-semibold text-neutral-200 truncate max-w-[200px]">
                      {habit.name}
                    </td>

                    {habit.days.map((isDayDone, dayIdx) => (
                      <td key={dayIdx} className="py-3 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleHabitDay(habit.id, dayIdx)}
                          className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                            isDayDone
                              ? 'bg-yellow-400 text-neutral-950 font-black shadow-md hover:bg-yellow-300'
                              : 'bg-[#091b3e] text-neutral-500 hover:bg-[#0d2757] hover:text-white'
                          }`}
                          title={`${DAYS_SHORT[dayIdx]}: ${habit.name}`}
                        >
                          {isDayDone ? <Check className="w-4 h-4 stroke-[3]" /> : '·'}
                        </button>
                      </td>
                    ))}

                    <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-yellow-400">
                      {habitDoneDays}/7
                    </td>

                    <td className="py-3 pl-2 text-right">
                      <button
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="text-neutral-500 hover:text-rose-400 p-1 rounded"
                        title="Alışkanlığı Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Add Habit Form */}
        <form onSubmit={handleAddHabit} className="flex gap-2 pt-2 border-t border-blue-900">
          <input
            type="text"
            value={newHabitText}
            onChange={(e) => setNewHabitText(e.target.value)}
            placeholder="Bu haftaya yeni bir sarı lacivert alışkanlık ekle..."
            className="flex-1 px-3 py-2 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
          />
          <button
            type="submit"
            className="px-3.5 py-2 text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-neutral-950 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Alışkanlık Ekle</span>
          </button>
        </form>
      </section>

      {/* SECTION 3: Weekly Deliverable */}
      <section className="p-6 rounded-2xl border-2 border-yellow-400/40 bg-[#071635] shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-bold text-white">
            Haftalık Somut Çıktı & Zafer Teslimi
          </h2>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#091f48] border border-yellow-400/30">
          <button
            onClick={handleToggleDeliverable}
            className="mt-0.5 text-yellow-400 hover:text-yellow-300"
          >
            {week.deliverableCompleted ? (
              <CheckCircle2 className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />
            ) : (
              <Circle className="w-6 h-6 text-neutral-500" />
            )}
          </button>

          <div className="flex-1">
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">
              Bu Haftanın Eseri:
            </span>
            <p className={`mt-0.5 text-sm ${week.deliverableCompleted ? 'line-through text-neutral-400' : 'text-neutral-100 font-semibold'}`}>
              {week.deliverable}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Reflection & Journal */}
      <section className="p-6 rounded-2xl border border-blue-900 bg-[#071635] shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">
              Haftalık Değerlendirme & Şampiyonluk Günlüğü
            </h2>
          </div>

          {/* Energy Rating */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400">Enerji:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleReflectionChange('energyRating', star)}
                    className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs ${
                      week.reflection.energyRating >= star
                        ? 'bg-yellow-400 text-neutral-950 font-black'
                        : 'bg-[#091b3e] text-neutral-600'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400">Memnuniyet:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleReflectionChange('satisfactionRating', star)}
                    className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs ${
                      week.reflection.satisfactionRating >= star
                        ? 'bg-yellow-400 text-neutral-950 font-black'
                        : 'bg-[#091b3e] text-neutral-600'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Reflection Prompts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-yellow-300">
              1. Bu Haftanın Zaferleri & Kazanımları
            </label>
            <textarea
              rows={4}
              value={week.reflection.wins}
              onChange={(e) => handleReflectionChange('wins', e.target.value)}
              placeholder="Neleri başardın? Şampiyon Fener ruhuyla aldığın zaferler..."
              className="w-full p-2.5 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400 leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-yellow-300">
              2. Karşılaşılan Engeller & Krizler
            </label>
            <textarea
              rows={4}
              value={week.reflection.challenges}
              onChange={(e) => handleReflectionChange('challenges', e.target.value)}
              placeholder="Hangi noktalarda zorlandın? Aşılması gereken sürtünmeler..."
              className="w-full p-2.5 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400 leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-yellow-300">
              3. Gelecek Hafta Taktik Dersleri
            </label>
            <textarea
              rows={4}
              value={week.reflection.learnings}
              onChange={(e) => handleReflectionChange('learnings', e.target.value)}
              placeholder="Gelecek haftaki maç için oyun planında neleri değiştireceksin?..."
              className="w-full p-2.5 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400 leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: Freeform Notes */}
      <section className="p-6 rounded-2xl border border-blue-900 bg-[#071635] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-bold text-white">
              Sarı Lacivert Taktik & Karalama Defteri
            </h2>
          </div>
          <span className="text-[11px] text-neutral-400">Otomatik Kaydedilir</span>
        </div>

        <textarea
          rows={5}
          value={week.notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Bu haftaya dair aklına gelen stratejiler, maç notları, fikirler ve şampiyonluk karalamaları..."
          className="w-full p-3 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400 leading-relaxed font-mono"
        />
      </section>

    </div>
  );
};
