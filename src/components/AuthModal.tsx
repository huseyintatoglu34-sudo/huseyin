import React, { useState } from 'react';
import { UserSession } from '../types';
import { 
  X, 
  Crown, 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  UserPlus, 
  Star, 
  Sparkles,
  Award
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: UserSession;
  onLogin: (session: UserSession) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  session,
  onLogin,
  onLogout,
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState(session.name || 'Hüseyin');
  const [email, setEmail] = useState(session.email || 'huseyintatoglu34@gmail.com');
  const [isGfb, setIsGfb] = useState(session.isGfbMember ?? true);
  const [gfbNo, setGfbNo] = useState(session.gfbMemberNo || 'GFB-1907-34');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isVip = isGfb; // GFB üyelerine anında VIP üyelik verilir!
    onLogin({
      isLoggedIn: true,
      name: name.trim() || 'Fenerbahçeli',
      email: email.trim(),
      isGfbMember: isGfb,
      gfbMemberNo: isGfb ? (gfbNo.trim() || 'GFB-1907-VIP') : undefined,
      isVip,
      vipTitle: isVip ? 'GFB VIP Efsane Üye' : undefined,
      joinedDate: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#08152e] border-2 border-yellow-400/60 rounded-2xl p-6 sm:p-7 text-white shadow-2xl overflow-hidden">
        
        {/* Subtle decorative yellow-navy ambient glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-yellow-400/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-blue-600/25 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {session.isLoggedIn ? (
          /* LOGGED IN VIEW */
          <div className="space-y-6">
            <div className="text-center space-y-1.5 pt-2">
              <div className="inline-flex p-3 rounded-full bg-yellow-400/20 text-yellow-300 ring-2 ring-yellow-400/50 mb-1">
                <Crown className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-extrabold text-yellow-400 tracking-tight">
                {session.name}
              </h2>
              <p className="text-xs text-neutral-300">{session.email}</p>
            </div>

            {/* GFB VIP Badge Status Card */}
            {session.isVip ? (
              <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/10 border border-yellow-400/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-yellow-300 font-bold text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>GFB VIP ÜYELİK AKTİF</span>
                  </div>
                  <span className="text-[10px] font-mono bg-yellow-400 text-neutral-950 font-extrabold px-2 py-0.5 rounded">
                    {session.gfbMemberNo || 'VIP'}
                  </span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  Tebrikler! Genç Fenerbahçeliler (GFB) üyeliğiniz sayesinde <strong>30 Haftalık Şampiyon Fener VIP</strong> ayrıcalıklarına tam erişim hakkına sahipsiniz.
                </p>
                <div className="text-[11px] text-yellow-200/90 font-medium flex items-center gap-1.5 pt-1">
                  <span>✓ 30 Haftalık Şampiyonluk Müfredatı</span>
                  <span>·</span>
                  <span>✓ Altın VIP Rozeti</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-800 space-y-2 text-xs">
                <p className="text-neutral-300">
                  Standart Üye olarak giriş yapıldı. GFB üyesi olarak <strong>VIP Üyelik</strong> kazanmak için ayarlarınızı güncelleyebilirsiniz.
                </p>
                <button
                  onClick={() => {
                    onLogin({
                      ...session,
                      isGfbMember: true,
                      gfbMemberNo: 'GFB-1907-VIP',
                      isVip: true,
                      vipTitle: 'GFB VIP Efsane Üye',
                    });
                  }}
                  className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-bold rounded-lg transition-colors text-xs flex items-center justify-center gap-1.5"
                >
                  <Crown className="w-4 h-4" />
                  <span>GFB'ye Katıl ve VIP Üyelik Al</span>
                </button>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 bg-rose-600/90 hover:bg-rose-600 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        ) : (
          /* LOGIN / REGISTER FORM */
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <div className="text-center space-y-1 mb-4">
              <div className="inline-flex p-2.5 rounded-full bg-yellow-400 text-neutral-950 mb-1 font-extrabold text-sm shadow-md">
                1907
              </div>
              <h2 className="text-xl font-black text-yellow-400 tracking-tight">
                {isRegisterMode ? 'Sarı Lacivert Kayıt Ol' : 'Sarı Lacivert Giriş Yap'}
              </h2>
              <p className="text-xs text-neutral-300">
                30 Haftalık Şampiyon Fener Yolculuğuna Katıl
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-neutral-300 font-semibold block mb-1">
                  Adınız & Soyadınız
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Hüseyin Tatoğlu"
                  className="w-full px-3 py-2 text-xs bg-[#0b1c3d] border border-blue-800/80 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-300 font-semibold block mb-1">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@fener.com"
                  className="w-full px-3 py-2 text-xs bg-[#0b1c3d] border border-blue-800/80 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400"
                />
              </div>

              {/* GFB Membership Toggle & VIP Perk */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-yellow-500/15 via-blue-900/30 to-yellow-500/10 border-2 border-yellow-400/40 space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGfb}
                    onChange={(e) => setIsGfb(e.target.checked)}
                    className="w-4 h-4 text-yellow-400 rounded accent-yellow-400 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className="text-xs font-extrabold text-yellow-300 flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-yellow-400" />
                      GFB (Genç Fenerbahçeliler) Üyesiyim
                    </span>
                    <span className="text-[11px] text-neutral-300 block">
                      GFB üyelerine anında <strong>VIP Üyelik</strong> tanımlanır!
                    </span>
                  </div>
                </label>

                {isGfb && (
                  <div className="pt-2 border-t border-yellow-400/20 space-y-1.5">
                    <label className="text-[11px] text-yellow-200 block font-medium">
                      GFB Üye / Kart No (İsteğe Bağlı):
                    </label>
                    <input
                      type="text"
                      value={gfbNo}
                      onChange={(e) => setGfbNo(e.target.value)}
                      placeholder="GFB-1907-XXXX"
                      className="w-full px-3 py-1.5 text-xs bg-[#071329] border border-yellow-400/50 rounded-lg text-yellow-300 placeholder:text-neutral-600 focus:outline-none font-mono"
                    />
                    <div className="text-[10px] text-yellow-400/90 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                      <span>Altın VIP statüsü ve tüm haftalık çıktılar aktif edilecek.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-neutral-950 font-extrabold rounded-lg text-xs tracking-wide uppercase transition-colors shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2 mt-4"
            >
              {isRegisterMode ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              <span>{isRegisterMode ? 'Kayıt Ol ve Başla' : 'Sarı Lacivert Giriş Yap'}</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-xs text-neutral-400 hover:text-yellow-300 transition-colors"
              >
                {isRegisterMode 
                  ? 'Zaten hesabınız var mı? Giriş Yapın' 
                  : 'Hesabınız yok mu? Yeni Sarı Lacivert Hesap Oluşturun'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
