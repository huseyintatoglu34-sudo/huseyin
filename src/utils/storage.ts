import { JourneyStore, TemplateId, ResourceItem, UserProfile, UserSession } from '../types';
import { generateTemplateWeeks } from '../data/templates';

const STORAGE_KEY = 'hafta30_fener_journey_v2';

const defaultSession: UserSession = {
  isLoggedIn: true,
  name: 'Hüseyin',
  email: 'huseyintatoglu34@gmail.com',
  isGfbMember: true,
  gfbMemberNo: 'GFB-1907-VIP',
  isVip: true,
  vipTitle: 'GFB VIP Efsane Üye',
  joinedDate: '1907-05-03',
};

const defaultProfile: UserProfile = {
  name: 'Hüseyin',
  visionStatement: '30 Hafta Boyunca Sarı Lacivert Ruhuyla, Tavizsiz Disiplinle Zirveye! ŞAMPİYON FENER!',
  startDate: new Date().toISOString().split('T')[0],
  activeTemplate: 'fenerbahce_champion',
};

const defaultResources: ResourceItem[] = [
  {
    id: 'res_1',
    weekNumber: 1,
    title: 'Fenerbahçe Şampiyonluk Karakteri & Zihinsel Dayanıklılık',
    url: 'https://www.fenerbahce.org',
    notes: 'Kadıköy ruhu: Asla pes etmeme, son ana kadar mücadele ve sarı lacivert adanmışlık.',
    category: 'Fenerbahçe Felsefesi',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'res_2',
    weekNumber: 3,
    title: 'GFB Tribün Ruhu & Birlik Gücü',
    url: 'https://gencfb.org',
    notes: 'Koşulsuz sevgi, birlikte kazanma inancı ve yüksek motivasyon.',
    category: 'GFB Kültürü',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'res_3',
    weekNumber: 7,
    title: 'Deep Work & Yüksek Saha Presi Disiplini',
    url: 'https://calnewport.com/books/deep-work/',
    notes: 'Kesintisiz 90 dakikalık odak blokları ile yüksek değerli çıktı üretimi.',
    category: 'Üretkenlik & Taktik',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'res_4',
    weekNumber: 14,
    title: 'Büyük Derbi Soğukkanlılığı & Zirve Baskısı Yönetimi',
    url: 'https://en.wikipedia.org/wiki/Fenerbah%C3%A7e_S.K.',
    notes: 'Baskı altında dağılmama, stratejiye sadakat ve soğukkanlı bitiricilik.',
    category: 'Psikoloji & Direnç',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'res_5',
    weekNumber: 29,
    title: 'Kupa & Şampiyonluk Ruhu (O Sene Bu Sene)',
    url: 'https://www.fenerbahce.org',
    notes: '30 haftalık emeğin taçlanması: Şampiyon Fener!',
    category: 'Şampiyonluk',
    createdAt: new Date().toISOString(),
  },
];

export function getInitialStore(templateId: TemplateId = 'fenerbahce_champion'): JourneyStore {
  return {
    session: defaultSession,
    profile: {
      ...defaultProfile,
      activeTemplate: templateId,
    },
    activeWeek: 1,
    weeks: generateTemplateWeeks(templateId),
    resources: defaultResources,
    theme: 'dark',
  };
}

export function loadStore(): JourneyStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialStore('fenerbahce_champion');
      saveStore(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.weeks || parsed.weeks.length !== 30) {
      const initial = getInitialStore('fenerbahce_champion');
      return initial;
    }
    if (!parsed.session) {
      parsed.session = defaultSession;
    }
    return parsed;
  } catch (e) {
    console.error('Error loading store from localStorage:', e);
    return getInitialStore('fenerbahce_champion');
  }
}

export function saveStore(store: JourneyStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to save store to localStorage:', e);
  }
}

export function exportStoreToJson(store: JourneyStore): void {
  const jsonStr = JSON.stringify(store, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `hafta30_yedek_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importStoreFromJson(jsonString: string): JourneyStore {
  const parsed = JSON.parse(jsonString);
  if (!parsed.weeks || !Array.isArray(parsed.weeks) || parsed.weeks.length !== 30) {
    throw new Error('Geçersiz Hafta 30 yedek dosyası: 30 haftalık veri bulunamadı.');
  }
  return parsed as JourneyStore;
}
