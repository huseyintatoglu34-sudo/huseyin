import React, { useState } from 'react';
import { UserProfile, TemplateId, UserSession } from '../types';
import { TEMPLATES_META } from '../data/templates';
import { 
  Crown, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  AlertTriangle,
  Compass,
  Code,
  Activity,
  Globe,
  Trophy,
  Sparkles
} from 'lucide-react';
import avatarImg from '../assets/images/avatar_personal_planner_1790837513371.jpg';

interface SettingsViewProps {
  profile: UserProfile;
  session: UserSession;
  onUpdateProfile: (newProfile: UserProfile) => void;
  onUpdateSession: (newSession: UserSession) => void;
  onSwitchTemplate: (templateId: TemplateId) => void;
  onExportData: () => void;
  onImportData: (file: File) => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  session,
  onUpdateProfile,
  onUpdateSession,
  onSwitchTemplate,
  onExportData,
  onImportData,
  onResetData,
}) => {
  const [name, setName] = useState(profile.name);
  const [vision, setVision] = useState(profile.visionStatement);
  const [startDate, setStartDate] = useState(profile.startDate);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<TemplateId | null>(null);

  // GFB toggle
  const [isGfb, setIsGfb] = useState(session.isGfbMember);
  const [gfbNo, setGfbNo] = useState(session.gfbMemberNo || 'GFB-1907-VIP');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name: name.trim() || 'Fenerbahçeli',
      visionStatement: vision.trim(),
      startDate,
    });

    const isVip = isGfb;
    onUpdateSession({
      ...session,
      name: name.trim() || session.name,
      isGfbMember: isGfb,
      gfbMemberNo: isGfb ? gfbNo : undefined,
      isVip,
      vipTitle: isVip ? 'GFB VIP Efsane Üye' : undefined,
    });

    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportData(file);
      e.target.value = '';
    }
  };

  const getTemplateIcon = (id: TemplateId) => {
    switch (id) {
      case 'fenerbahce_champion':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'personal_growth':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'software_dev':
        return <Code className="w-5 h-5 text-blue-400" />;
      case 'fitness_health':
        return <Activity className="w-5 h-5 text-amber-400" />;
      case 'language_b2':
        return <Globe className="w-5 h-5 text-purple-400" />;
      case 'custom':
        return <Compass className="w-5 h-5 text-neutral-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 text-white">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-yellow-400 font-semibold mb-1">
          <Trophy className="w-3.5 h-3.5" />
          <span>Yolculuk Yönetimi</span>
          <span aria-hidden="true">·</span>
          <span>Sarı Lacivert Ayarlar</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white">
          Kişiselleştirme, GFB VIP Üyelik & Veri Yönetimi
        </h1>
      </div>

      {/* Profile & GFB VIP Card */}
      <section className="p-6 rounded-2xl border-2 border-yellow-400/40 bg-[#071635] shadow-md space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={avatarImg} 
              alt="Profil Avatarı" 
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
            />
            {session.isVip && (
              <div className="absolute -bottom-1 -right-1 p-1 bg-yellow-400 text-neutral-950 rounded-full shadow">
                <Crown className="w-3.5 h-3.5 fill-neutral-950" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">
                {profile.name}
              </h2>
              {session.isVip && (
                <span className="text-[11px] font-black bg-yellow-400 text-neutral-950 px-2 py-0.5 rounded uppercase">
                  GFB VIP
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-300">
              30 Haftalık Şampiyon Fener Yolculuğu · Başlangıç: {profile.startDate}
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 pt-3 border-t border-blue-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-300">
                Adınız & Soyadınız
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-300">
                Sezon Başlangıç Tarihi
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-300">
              30 Haftalık Büyük Vizyon Bildirgesi (Ana Sayfadaki Başlık)
            </label>
            <textarea
              rows={2}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="30 haftada ulaşmak istediğin şampiyonluk zaferi..."
              className="w-full p-2.5 text-xs bg-[#091b3e] border border-blue-800 rounded-lg text-white focus:outline-none focus:border-yellow-400 leading-relaxed font-semibold text-yellow-300"
            />
          </div>

          {/* GFB Membership Status inside Settings */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/15 via-[#091f48] to-[#071635] border border-yellow-400/50 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isGfb}
                onChange={(e) => setIsGfb(e.target.checked)}
                className="w-4 h-4 text-yellow-400 rounded accent-yellow-400 cursor-pointer"
              />
              <div>
                <span className="text-xs font-extrabold text-yellow-400 flex items-center gap-1.5">
                  <Crown className="w-4 h-4" />
                  GFB (Genç Fenerbahçeliler) Üyesiyim → VIP Üyelik Aktif Et
                </span>
                <span className="text-[11px] text-neutral-300 block">
                  GFB üyelerine tüm 30 hafta boyunca özel altın VIP statüsü verilir.
                </span>
              </div>
            </label>

            {isGfb && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-yellow-400/20">
                <div>
                  <label className="text-[11px] text-yellow-200 block mb-1">GFB Üye No:</label>
                  <input
                    type="text"
                    value={gfbNo}
                    onChange={(e) => setGfbNo(e.target.value)}
                    placeholder="GFB-1907-XXXX"
                    className="w-full px-3 py-1.5 text-xs bg-[#071329] border border-yellow-400/50 rounded-lg text-yellow-300 font-mono"
                  />
                </div>
                <div className="flex items-center text-xs text-yellow-300">
                  <span>⭐ VIP Durumu: <strong>Aktif & Tanımlı</strong></span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            {showSavedFeedback ? (
              <span className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                <Check className="w-4 h-4" /> Değişiklikler başarıyla kaydedildi!
              </span>
            ) : (
              <span />
            )}

            <button
              type="submit"
              className="px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-black rounded-lg text-xs transition-colors shadow-sm"
            >
              Profili ve VIP Durumunu Güncelle
            </button>
          </div>
        </form>
      </section>

      {/* 30-Week Program Template Selector */}
      <section className="p-6 rounded-2xl border border-blue-900 bg-[#071635] shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>30 Haftalık Sezon Müfredatı</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Hedefinize uygun 30 haftalık programı seçebilirsiniz. Şablon değiştirmek haftalık görevlerinizi o temaya uyarlar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {TEMPLATES_META.map((tmpl) => {
            const isCurrent = profile.activeTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => setPendingTemplate(tmpl.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isCurrent
                    ? 'border-yellow-400 bg-[#091b3e] ring-1 ring-yellow-400'
                    : 'border-blue-900 bg-[#061229] hover:border-blue-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {getTemplateIcon(tmpl.id)}
                    <span className="text-sm font-bold text-white">
                      {tmpl.title}
                    </span>
                  </div>
                  {isCurrent && (
                    <span className="text-[11px] font-black text-yellow-400">
                      Aktif Plan
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Confirmation alert for template change */}
        {pendingTemplate && pendingTemplate !== profile.activeTemplate && (
          <div className="p-4 rounded-xl border-2 border-yellow-400/60 bg-[#091f48] space-y-2 mt-4">
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Müfredat Değiştirilsin mi?</span>
            </div>
            <p className="text-xs text-neutral-200 leading-relaxed">
              "{TEMPLATES_META.find((t) => t.id === pendingTemplate)?.title}" programına geçmek üzeresiniz. Mevcut haftalık hedefleriniz yeni şablona göre yeniden oluşturulacaktır.
            </p>
            <div className="flex gap-2 pt-1 justify-end">
              <button
                onClick={() => setPendingTemplate(null)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
              >
                İptal Et
              </button>
              <button
                onClick={() => {
                  onSwitchTemplate(pendingTemplate);
                  setPendingTemplate(null);
                }}
                className="px-4 py-1.5 text-xs font-black bg-yellow-400 hover:bg-yellow-300 text-neutral-950 rounded-md transition-colors"
              >
                Yeni Programı Başlat
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Data Backup & Restore */}
      <section className="p-6 rounded-2xl border border-blue-900 bg-[#071635] shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">
            Veri Güvenliği & Yedekleme
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Tüm ilerlemeniz tarayıcınızın yerel hafızasında saklanır. İstediğiniz an JSON yedeğinizi indirebilir veya yükleyebilirsiniz.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            onClick={onExportData}
            className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 rounded-lg text-xs font-extrabold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>JSON Yedek İndir</span>
          </button>

          <label className="px-4 py-2.5 border border-yellow-400/40 bg-[#091b3e] hover:bg-[#0c2454] text-yellow-300 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span>JSON Yedek Yükle</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </section>

      {/* Reset Section */}
      <section className="p-6 rounded-2xl border border-rose-900/60 bg-rose-950/20 space-y-3">
        <h2 className="text-sm font-bold text-rose-400">
          Sezonu Sıfırla
        </h2>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Tüm hedefleri ve işaretli günleri sıfırlar; temiz bir şampiyonluk sezonuna baştan başlarsınız.
        </p>
        <button
          onClick={onResetData}
          className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla ve Baştan Başla</span>
        </button>
      </section>

    </div>
  );
};
