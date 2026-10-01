import React, { useState, useEffect } from 'react';
import { 
  JourneyStore, 
  WeekData, 
  UserProfile, 
  TemplateId, 
  ResourceItem,
  UserSession 
} from './types';
import { 
  loadStore, 
  saveStore, 
  exportStoreToJson, 
  importStoreFromJson, 
  getInitialStore 
} from './utils/storage';
import { Header } from './components/Header';
import { WeekGrid } from './components/WeekGrid';
import { WeekDetail } from './components/WeekDetail';
import { AnalyticsView } from './components/AnalyticsView';
import { VaultView } from './components/VaultView';
import { SettingsView } from './components/SettingsView';
import { PrintReport } from './components/PrintReport';
import { AuthModal } from './components/AuthModal';
import { Check, X, Trophy, Crown } from 'lucide-react';

export default function App() {
  const [store, setStore] = useState<JourneyStore>(() => loadStore());
  const [currentTab, setCurrentTab] = useState<'grid' | 'detail' | 'analytics' | 'vault' | 'settings'>('grid');
  const [selectedWeekNumber, setSelectedWeekNumber] = useState<number>(() => store.activeWeek || 1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync theme with DOM
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Persistent save whenever store changes
  const updateStore = (updater: (prev: JourneyStore) => JourneyStore) => {
    setStore((prev) => {
      const next = updater(prev);
      saveStore(next);
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Navigating to week detail
  const handleSelectWeek = (weekNum: number) => {
    setSelectedWeekNumber(weekNum);
    setCurrentTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle week complete from card or header
  const handleToggleWeekComplete = (weekNum: number, e: React.MouseEvent) => {
    e.stopPropagation();
    updateStore((prev) => {
      const updatedWeeks: WeekData[] = prev.weeks.map((w) => {
        if (w.weekNumber === weekNum) {
          const isDone = w.status === 'completed';
          const nextStatus: 'in_progress' | 'completed' = isDone ? 'in_progress' : 'completed';
          return {
            ...w,
            status: nextStatus,
            completedAt: nextStatus === 'completed' ? new Date().toISOString() : undefined,
          };
        }
        return w;
      });

      const toggledWeek = updatedWeeks.find((w) => w.weekNumber === weekNum);
      if (toggledWeek?.status === 'completed') {
        showToast(`Tebrikler! Hafta ${weekNum} zaferle tamamlandı. ŞAMPİYON FENER! 💛💙`);
      }

      return {
        ...prev,
        weeks: updatedWeeks,
      };
    });
  };

  // Update single week contents
  const handleUpdateWeek = (updatedWeek: WeekData) => {
    updateStore((prev) => ({
      ...prev,
      weeks: prev.weeks.map((w) => (w.weekNumber === updatedWeek.weekNumber ? updatedWeek : w)),
    }));
  };

  // Set active week
  const handleSetActiveWeek = (weekNum: number) => {
    updateStore((prev) => ({
      ...prev,
      activeWeek: weekNum,
    }));
    showToast(`Hafta ${weekNum} güncel aktif haftanız olarak belirlendi.`);
  };

  // Profile update
  const handleUpdateProfile = (newProfile: UserProfile) => {
    updateStore((prev) => ({
      ...prev,
      profile: newProfile,
    }));
    showToast('Sarı lacivert profil ve vizyon bilgileri güncellendi.');
  };

  // Session update
  const handleUpdateSession = (newSession: UserSession) => {
    updateStore((prev) => ({
      ...prev,
      session: newSession,
    }));
    showToast('GFB üyelik ve oturum bilgileri güncellendi.');
  };

  // Login handler
  const handleLogin = (newSession: UserSession) => {
    updateStore((prev) => ({
      ...prev,
      session: newSession,
      profile: {
        ...prev.profile,
        name: newSession.name,
      },
    }));
    if (newSession.isVip) {
      showToast(`⭐ Hoş geldin ${newSession.name}! GFB VIP Üyeliğin aktif edildi. ŞAMPİYON FENER! 💛💙`);
    } else {
      showToast(`Sarı Lacivert oturum açıldı. Hoş geldin ${newSession.name}!`);
    }
  };

  // Logout handler
  const handleLogout = () => {
    updateStore((prev) => ({
      ...prev,
      session: {
        isLoggedIn: false,
        name: 'Fenerbahçeli',
        email: '',
        isGfbMember: false,
        isVip: false,
      },
    }));
    showToast('Oturum kapatıldı.');
  };

  // Champion cheer handler
  const handleTriggerChampionCheer = () => {
    showToast('🏆 ŞAMPİYON FENER! O SENE BU SENE! SARI LACİVERT SEVDA! 💛💙');
  };

  // Switch template
  const handleSwitchTemplate = (templateId: TemplateId) => {
    const fresh = getInitialStore(templateId);
    updateStore((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        activeTemplate: templateId,
      },
      weeks: fresh.weeks,
      activeWeek: 1,
    }));
    setSelectedWeekNumber(1);
    setCurrentTab('grid');
    showToast('Yeni 30 haftalık sezon fikstürü yüklendi!');
  };

  // Export JSON
  const handleExportData = () => {
    exportStoreToJson(store);
    showToast('Sarı Lacivert 30 Hafta verileriniz başarıyla indirildi.');
  };

  // Import JSON
  const handleImportData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const imported = importStoreFromJson(text);
        updateStore(() => imported);
        setSelectedWeekNumber(imported.activeWeek || 1);
        showToast('Yedek dosyanız başarıyla yüklendi!');
      } catch (err: any) {
        alert(err.message || 'Dosya okuma hatası.');
      }
    };
    reader.readAsText(file);
  };

  // Reset store
  const handleResetData = () => {
    if (window.confirm('Tüm şampiyonluk sezonu ilerlemenizi sıfırlamak istediğinize emin misiniz?')) {
      const fresh = getInitialStore(store.profile.activeTemplate);
      updateStore(() => fresh);
      setSelectedWeekNumber(1);
      setCurrentTab('grid');
      showToast('Sezon sıfırlandı.');
    }
  };

  // Resources
  const handleAddResource = (res: ResourceItem) => {
    updateStore((prev) => ({
      ...prev,
      resources: [res, ...prev.resources],
    }));
    showToast('Yeni kaynak kütüphanenize eklendi.');
  };

  const handleDeleteResource = (id: string) => {
    updateStore((prev) => ({
      ...prev,
      resources: prev.resources.filter((r) => r.id !== id),
    }));
    showToast('Kaynak silindi.');
  };

  const selectedWeek = store.weeks.find((w) => w.weekNumber === selectedWeekNumber) || store.weeks[0];
  const completedWeeksCount = store.weeks.filter((w) => w.status === 'completed').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#050e21] text-white selection:bg-yellow-400 selection:text-neutral-950 font-sans transition-colors">
      
      {/* Printable Report (only visible during print) */}
      <PrintReport store={store} />

      {/* Top Bar Header with Yellow-Navy & Auth */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activeWeek={store.activeWeek}
        completedWeeksCount={completedWeeksCount}
        session={store.session}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onTriggerChampionCheer={handleTriggerChampionCheer}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 no-print">
        {currentTab === 'grid' && (
          <WeekGrid
            weeks={store.weeks}
            activeWeek={store.activeWeek}
            profile={store.profile}
            session={store.session}
            onSelectWeek={handleSelectWeek}
            onToggleWeekComplete={handleToggleWeekComplete}
          />
        )}

        {currentTab === 'detail' && (
          <WeekDetail
            week={selectedWeek}
            activeWeekNumber={store.activeWeek}
            session={store.session}
            onUpdateWeek={handleUpdateWeek}
            onNavigateWeek={(num) => {
              if (num >= 1 && num <= 30) {
                setSelectedWeekNumber(num);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onSetActiveWeek={handleSetActiveWeek}
          />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsView
            weeks={store.weeks}
            profile={store.profile}
            session={store.session}
          />
        )}

        {currentTab === 'vault' && (
          <VaultView
            resources={store.resources}
            weeks={store.weeks}
            onAddResource={handleAddResource}
            onDeleteResource={handleDeleteResource}
          />
        )}

        {currentTab === 'settings' && (
          <SettingsView
            profile={store.profile}
            session={store.session}
            onUpdateProfile={handleUpdateProfile}
            onUpdateSession={handleUpdateSession}
            onSwitchTemplate={handleSwitchTemplate}
            onExportData={handleExportData}
            onImportData={handleImportData}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Login & Register / GFB VIP Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        session={store.session}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-yellow-400 text-neutral-950 font-bold rounded-xl shadow-2xl text-xs animate-in fade-in slide-in-from-bottom-2 duration-200 border-2 border-yellow-300">
          <Trophy className="w-4 h-4 text-neutral-950" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-2 text-neutral-800 hover:text-black"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Minimalist Yellow-Navy Editorial Footer */}
      <footer className="border-t border-yellow-400/20 py-6 text-center text-xs text-neutral-400 no-print mt-12 bg-[#040b1a]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-yellow-400">Hafta 30</span>
            <span>·</span>
            <span>Sarı Lacivert 30 Haftalık Şampiyonluk Sezonu</span>
            <span>·</span>
            <span className="font-extrabold text-yellow-300">Şampiyon Fener! 💛💙</span>
          </div>
          <div>
            <span>1907 · GFB VIP Ayrıcalıklı Taraftar Platformu</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
