import React, { useState } from 'react';
import { ResourceItem, WeekData } from '../types';
import { 
  BookMarked, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Search,
  Trophy
} from 'lucide-react';

interface VaultViewProps {
  resources: ResourceItem[];
  weeks: WeekData[];
  onAddResource: (res: ResourceItem) => void;
  onDeleteResource: (id: string) => void;
}

export const VaultView: React.FC<VaultViewProps> = ({
  resources,
  weeks,
  onAddResource,
  onDeleteResource,
}) => {
  const [filterWeek, setFilterWeek] = useState<number | 'all'>('all');
  const [search, setSearch] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Fenerbahçe & Taktik');
  const [weekNumber, setWeekNumber] = useState(1);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRes: ResourceItem = {
      id: `res_${Date.now()}`,
      weekNumber,
      title: title.trim(),
      url: url.trim() || undefined,
      category: category.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    onAddResource(newRes);
    setTitle('');
    setUrl('');
    setNotes('');
    setIsAdding(false);
  };

  const filtered = resources.filter((res) => {
    if (filterWeek !== 'all' && res.weekNumber !== filterWeek) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = res.title.toLowerCase().includes(q);
      const matchCat = res.category.toLowerCase().includes(q);
      const matchNotes = res.notes.toLowerCase().includes(q);
      return matchTitle || matchCat || matchNotes;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-yellow-400 font-semibold mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>Sarı Lacivert Kütüphane</span>
            <span aria-hidden="true">·</span>
            <span>Şampiyon Fener Kaynak Arşivi</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Kaynaklar, Taktikler & İlham Havuzu
          </h1>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="self-start sm:self-auto px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 rounded-lg text-xs font-black flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Formu Kapat' : 'Yeni Kaynak Ekle'}</span>
        </button>
      </div>

      {/* Add Resource Form Modal / Collapse */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl border-2 border-yellow-400/40 bg-[#071635] shadow-lg space-y-4"
        >
          <h2 className="text-sm font-extrabold text-yellow-400">
            Yeni Sarı Lacivert Kaynak veya Taktik Notu Ekle
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs text-neutral-300">Başlık *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Kadıköy Ruhu ve Derbi Psikolojisi Analizi"
                className="w-full px-3 py-2 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-300">İlgili Hafta</label>
              <select
                value={weekNumber}
                onChange={(e) => setWeekNumber(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white"
              >
                {weeks.map((w) => (
                  <option key={w.weekNumber} value={w.weekNumber}>
                    Hafta {w.weekNumber}: {w.title.slice(0, 20)}...
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-neutral-300">Bağlantı / URL (İsteğe bağlı)</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-300">Kategori</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Örn: Taktik, Kitap, Maç Analizi, Felsefe"
                className="w-full px-3 py-2 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-neutral-300">Notlar ve Önemli Pasajlar</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Bu kaynaktan aldığın kritik içgörüler ve şampiyonluk ilkeleri..."
              className="w-full p-2.5 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-neutral-950 rounded-lg"
            >
              Kaydet
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterWeek}
            onChange={(e) => setFilterWeek(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-1.5 text-xs bg-[#071635] border border-blue-900 rounded-lg text-white"
          >
            <option value="all">Tüm Haftalar</option>
            {weeks.map((w) => (
              <option key={w.weekNumber} value={w.weekNumber}>
                Hafta {w.weekNumber}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kaynaklarda ara..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#071635] border border-blue-900 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      {/* Resource Cards */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-blue-900 rounded-2xl bg-[#061229]">
          <BookMarked className="w-8 h-8 mx-auto text-neutral-500 mb-2" />
          <p className="text-xs text-neutral-400">Henüz bu filtreye uygun kaynak eklenmemiş.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-blue-900 bg-[#071635] shadow-xs flex flex-col justify-between hover:border-yellow-400/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-yellow-400">
                      Hafta {item.weekNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-neutral-300">{item.category}</span>
                  </div>

                  <button
                    onClick={() => onDeleteResource(item.id)}
                    className="text-neutral-500 hover:text-rose-400 p-1"
                    title="Kaynağı Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white mb-2">
                  {item.title}
                </h3>

                {item.notes && (
                  <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                    {item.notes}
                  </p>
                )}
              </div>

              {item.url && (
                <div className="pt-2 border-t border-blue-900/60">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-yellow-400 hover:text-yellow-300"
                  >
                    <span>Bağlantıyı Aç</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
