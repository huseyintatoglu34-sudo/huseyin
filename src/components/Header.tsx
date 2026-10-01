import React from 'react';
import { 
  LayoutGrid, 
  Calendar, 
  BarChart3, 
  BookMarked, 
  Settings, 
  Sun, 
  Moon, 
  Crown, 
  LogIn, 
  LogOut, 
  Trophy,
  Flame
} from 'lucide-react';
import { UserSession } from '../types';

interface HeaderProps {
  currentTab: 'grid' | 'detail' | 'analytics' | 'vault' | 'settings';
  setCurrentTab: (tab: 'grid' | 'detail' | 'analytics' | 'vault' | 'settings') => void;
  activeWeek: number;
  completedWeeksCount: number;
  session: UserSession;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onTriggerChampionCheer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  activeWeek,
  completedWeeksCount,
  session,
  onOpenAuthModal,
  onLogout,
  onTriggerChampionCheer,
}) => {
  const percent = Math.round((completedWeeksCount / 30) * 100);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-yellow-400/25 bg-[#061229]/95 backdrop-blur-md text-white transition-colors no-print shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single Wordmark with Yellow & Navy Badge */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentTab('grid')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-[#071329] flex items-center justify-center font-black text-sm shadow-md group-hover:bg-yellow-300 transition-colors">
              1907
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                  Hafta 30
                </span>
                <span className="text-[11px] font-bold text-yellow-400 tracking-wide">
                  Şampiyon Fener 💛💙
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Single-Line, Text with subtle yellow hover) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentTab('grid')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'grid'
                ? 'bg-yellow-400/15 text-yellow-300 font-bold border border-yellow-400/30'
                : 'text-neutral-300 hover:text-yellow-300 hover:bg-white/5'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-yellow-400" />
            <span>30 Hafta Haritası</span>
          </button>

          <button
            onClick={() => setCurrentTab('detail')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'detail'
                ? 'bg-yellow-400/15 text-yellow-300 font-bold border border-yellow-400/30'
                : 'text-neutral-300 hover:text-yellow-300 hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4 text-yellow-400" />
            <span>Hafta {activeWeek} Detayı</span>
          </button>

          <button
            onClick={() => setCurrentTab('analytics')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'analytics'
                ? 'bg-yellow-400/15 text-yellow-300 font-bold border border-yellow-400/30'
                : 'text-neutral-300 hover:text-yellow-300 hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-yellow-400" />
            <span>Şampiyonluk Analitiği</span>
          </button>

          <button
            onClick={() => setCurrentTab('vault')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'vault'
                ? 'bg-yellow-400/15 text-yellow-300 font-bold border border-yellow-400/30'
                : 'text-neutral-300 hover:text-yellow-300 hover:bg-white/5'
            }`}
          >
            <BookMarked className="w-4 h-4 text-yellow-400" />
            <span>Kaynaklar & Notlar</span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'settings'
                ? 'bg-yellow-400/15 text-yellow-300 font-bold border border-yellow-400/30'
                : 'text-neutral-300 hover:text-yellow-300 hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4 text-yellow-400" />
            <span>Ayarlar</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Champion rally button, login/logout, GFB VIP Badge) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Şampiyon Fener Cheer Button */}
          <button
            onClick={onTriggerChampionCheer}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 rounded-lg text-xs font-black shadow-sm transition-transform active:scale-95 whitespace-nowrap"
            title="Şampiyon Fener Tezahüratı"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Şampiyon Fener!</span>
          </button>

          {/* Quick Jump to Active Week */}
          <button
            onClick={() => setCurrentTab('detail')}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-yellow-300 bg-[#0a1e45] border border-yellow-400/40 rounded-lg hover:bg-[#0e2759] transition-colors whitespace-nowrap"
            title="Aktif Haftaya Git"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <span>Hafta {activeWeek}</span>
            <span className="text-yellow-400/80 hidden sm:inline">%{percent}</span>
          </button>

          {/* User Auth: Login / VIP Status / Logout */}
          {session.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#091b3e] border border-yellow-400/50 hover:bg-[#0c2454] transition-colors text-left"
                title="Hesap ve GFB VIP Durumu"
              >
                {session.isVip && (
                  <span className="flex items-center gap-1 text-[10px] font-black bg-yellow-400 text-neutral-950 px-1.5 py-0.5 rounded shadow-xs uppercase">
                    <Crown className="w-3 h-3 fill-neutral-950" />
                    GFB VIP
                  </span>
                )}
                <span className="text-xs font-bold text-white max-w-[80px] sm:max-w-[120px] truncate">
                  {session.name}
                </span>
              </button>

              {/* Quick Logout Button */}
              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Çıkış Yap"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 text-xs font-extrabold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>Giriş Yap</span>
            </button>
          )}

        </div>

      </div>

      {/* Mobile Navigation Row */}
      <div className="md:hidden flex items-center justify-around border-t border-yellow-400/20 px-2 py-1.5 bg-[#050e21] overflow-x-auto text-xs">
        <button
          onClick={() => setCurrentTab('grid')}
          className={`px-2 py-1 font-medium rounded ${
            currentTab === 'grid' ? 'text-yellow-400 font-bold' : 'text-neutral-400'
          }`}
        >
          Harita
        </button>
        <button
          onClick={() => setCurrentTab('detail')}
          className={`px-2 py-1 font-medium rounded ${
            currentTab === 'detail' ? 'text-yellow-400 font-bold' : 'text-neutral-400'
          }`}
        >
          Hafta {activeWeek}
        </button>
        <button
          onClick={() => setCurrentTab('analytics')}
          className={`px-2 py-1 font-medium rounded ${
            currentTab === 'analytics' ? 'text-yellow-400 font-bold' : 'text-neutral-400'
          }`}
        >
          Analitik
        </button>
        <button
          onClick={() => setCurrentTab('vault')}
          className={`px-2 py-1 font-medium rounded ${
            currentTab === 'vault' ? 'text-yellow-400 font-bold' : 'text-neutral-400'
          }`}
        >
          Kaynaklar
        </button>
        <button
          onClick={() => setCurrentTab('settings')}
          className={`px-2 py-1 font-medium rounded ${
            currentTab === 'settings' ? 'text-yellow-400 font-bold' : 'text-neutral-400'
          }`}
        >
          Ayarlar
        </button>
      </div>
    </header>
  );
};
