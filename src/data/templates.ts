import { PhaseInfo, TemplateMeta, WeekData, TemplateId, PhaseNumber } from '../types';

export const PHASES_CONFIG: PhaseInfo[] = [
  {
    number: 1,
    name: 'Temeller & Alışkanlık Mimarisi',
    range: 'Hafta 1 - 6',
    description: 'Öz-farkındalık, günlük rutinlerin oturtulması, dijital detoks ve net vizyon inşası.',
    color: 'emerald',
  },
  {
    number: 2,
    name: 'Gelişim & Derin Odaklanma',
    range: 'Hafta 7 - 14',
    description: 'Becerilerin derinleşmesi, zaman bloklama, konsantrasyon ve ivme kazanımı.',
    color: 'blue',
  },
  {
    number: 3,
    name: 'Dayanıklılık & Uygulama',
    range: 'Hafta 15 - 22',
    description: 'Sürtünmelerle baş etme, gerçek dünya projeleri, süreklilik ve zihinsel direnç.',
    color: 'amber',
  },
  {
    number: 4,
    name: 'Ustalaşma & Sistem Optimizasyonu',
    range: 'Hafta 23 - 28',
    description: 'Süreçlerin otomatikleştirilmesi, ileri teknikler ve yüksek verimli sonuçlar.',
    color: 'purple',
  },
  {
    number: 5,
    name: 'Zirve Çıktısı & Gelecek Vizyonu',
    range: 'Hafta 29 - 30',
    description: 'Büyük teslim, 30 haftalık dönüşüm sentezi ve sonraki yolculuğun planlanması.',
    color: 'rose',
  },
];

export const TEMPLATES_META: TemplateMeta[] = [
  {
    id: 'fenerbahce_champion',
    title: 'Sarı Lacivert Şampiyonluk Sezonu',
    tagline: '30 Haftada Şampiyon Fener Ruhuyla Zirveye',
    description: 'Fenerbahçe disiplini, Kadıköy kararlılığı ve 30 haftalık tavizsiz şampiyonluk yolculuğu.',
    icon: 'Trophy',
  },
  {
    id: 'personal_growth',
    title: 'Kişisel Gelişim & Yaşam Mimarisi',
    tagline: 'Zihniyet, Öz-Disiplin ve Yaşam Dönüşümü',
    description: '30 haftada daha berrak bir zihin, güçlü günlük alışkanlıklar ve dönüştürücü yaşam hedefleri.',
    icon: 'Sparkles',
  },
  {
    id: 'software_dev',
    title: 'Yazılım & Mühendislik Kariyeri',
    tagline: 'Temellerden Üretime ve Portföy Projelerine',
    description: 'Algoritmalar, modern mimariler, tam kapsamlı projeler ve teknik mülakat hazırlığı.',
    icon: 'Code',
  },
  {
    id: 'fitness_health',
    title: 'Fit & Güçlü Beden Maratonu',
    tagline: 'Kondisyon, Güç, Beslenme ve Zindelik',
    description: 'Sürdürülebilir spor disiplini, beslenme protokolü ve 30 haftalık fiziksel değişim.',
    icon: 'Activity',
  },
  {
    id: 'language_b2',
    title: 'Yabancı Dil Ustalığı (B2 Seviyesi)',
    tagline: 'Sıfırdan Akıcı Konuşma ve Düşünme',
    description: 'Gramer temellerinden günlük konuşma, dinleme, okuma ve sunum akıcılığına uzanan 30 hafta.',
    icon: 'Globe',
  },
  {
    id: 'custom',
    title: 'Özel Kendi 30 Haftan',
    tagline: 'Kendi Yolculuğunu Sıfırdan Şekillendir',
    description: 'Kendi hedeflerin, özel haftalık çıktıların ve kendine has alışkanlık listelerin.',
    icon: 'Compass',
  },
];

function getPhaseForWeek(w: number): PhaseNumber {
  if (w <= 6) return 1;
  if (w <= 14) return 2;
  if (w <= 22) return 3;
  if (w <= 28) return 4;
  return 5;
}

const defaultHabitNames = [
  '7+ Saat Kaliteli Uyku',
  '30 Dk Odaklı Blok Çalışma',
  '2.5 Litre Su Tüketimi',
  '20 Sayfa Kitap / Kaynak Okuma',
  '15 Dk Yürüyüş / Hareket',
];

export function generateTemplateWeeks(templateId: TemplateId): WeekData[] {
  if (templateId === 'fenerbahce_champion') {
    return generateFenerbahceWeeks();
  }
  if (templateId === 'software_dev') {
    return generateSoftwareDevWeeks();
  }
  if (templateId === 'fitness_health') {
    return generateFitnessWeeks();
  }
  if (templateId === 'language_b2') {
    return generateLanguageWeeks();
  }
  if (templateId === 'custom') {
    return generateBlankCustomWeeks();
  }
  return generatePersonalGrowthWeeks();
}

// 0. Fenerbahçe Champion Track (30 Weeks)
function generateFenerbahceWeeks(): WeekData[] {
  const fenerTitles = [
    { t: 'Sezon Önü Kampı & Şampiyonluk Yemini', sub: 'Büyük hedefler sağlam temellerle başlar. Sarı lacivert disiplin manifestosu.', c: 'Sezon Başlangıcı', d: '30 Haftalık Şampiyon Fener Bildirgesi ve Antrenman Takvimi hazırlandı.' },
    { t: 'Kadıköy Ruhu & İç Saha Yenilmezliği', sub: 'Kendi alanında ve zihninde tavizsiz bir disiplin kalesi inşa et.', c: 'Öz-Disiplin', d: 'Günlük tavizsiz çalışma protokolü ve odak saati takvimi sabitlendi.' },
    { t: 'Takım Oyunu & Zihinsel Dayanıklılık', sub: 'Bireysel yetenek maç kazandırır, sarı lacivert karakter şampiyon yapar.', c: 'Zihniyet', d: 'Haftalık 5 günlük eksiksiz alışkanlık zinciri kuruldu.' },
    { t: 'Taktiksel Derinlik & Odak Blokları', sub: 'Dağınık çabaları bırakıp en kritik zafer hamlesine odaklan.', c: 'Taktik', d: '90 dakikalık kesintisiz 5 derin odak seansı tamamlandı.' },
    { t: 'Deplasman Baskısı & Soğukkanlılık', sub: 'Zorlu koşullarda bile çizgini bozmadan hedefe kilitlen.', c: 'Direnç', d: 'Konfor alanının dışına çıkılan 3 kritik zorlu görev tamamlandı.' },
    { t: 'Faz 1: İlk 6 Hafta Şampiyonluk Liderliği', sub: 'İlk virajı kayıpsız geçtik. Şampiyon Fener temposu oturuyor.', c: 'Faz Kapanışı', d: 'Faz 1 Şampiyonluk Performans Raporu ve Faz 2 stratejisi çıkarıldı.' },
    { t: 'Yüksek Pres & Erteleme Hastalığını Yenme', sub: 'Hedeflerinin üzerine tam saha presle git, zaman kaybetme.', c: 'Hücum Disiplini', d: 'Ertelediğin en zorlu 2 proje bitirildi.' },
    { t: 'Fiziksel Kondisyon & Sarı Lacivert Enerji', sub: 'Şampiyonluk sadece zihinle değil, yüksek fiziksel güçle kazanılır.', c: 'Zindelik', d: 'Haftalık 10.000 adım ve 4 antrenman seansı eksiksiz yapıldı.' },
    { t: 'Büyük Derbi Haftası: Zirveye Odaklanma', sub: 'Büyük maçlar büyük karakterleri sever. Şampiyon Fener duruşu.', c: 'Derbi Ruh', d: 'Kariyerindeki veya yaşamındaki en kritik sunum/görev başarıyla teslim edildi.' },
    { t: 'Taktiksel Analiz & Hatalardan Ders Çıkarma', sub: 'Yenilgiyi kabul etmeyen ama eksiklerini dürüstçe gören akıl.', c: 'Analiz', d: 'Son 9 haftanın gelişim ve kör nokta analizi yapıldı.' },
    { t: 'Savunma Güvenliği: Dikkat Dağıtıcıları Engelleme', sub: 'Kalenizi temiz tutun. Gereksiz uyaranlara geçit yok.', c: 'Savunma', d: 'Sosyal medya ve dikkat dağıtıcılara karşı sıfır tolerans kuralı uygulandı.' },
    { t: 'Hızlı Hücum: Karar Alma Hızını Artırma', sub: 'Düşünce ile eylem arasındaki süreyi kısalt. Anında harekete geç.', c: 'Hız & Eylem', d: 'Karar verme süresi 2 dakikaya indirilen 5 aksiyon alındı.' },
    { t: 'Takım Liderliği & Çevrene İlham Verme', sub: 'Bir Fenerli bulunduğu her ortama enerji, kalite ve vizyon katar.', c: 'Liderlik', d: 'Çalışma veya sosyal çevrende birisine değer katan mentörlük yapıldı.' },
    { t: 'Faz 2: İlk Yarıyı Zirvede Bitirme (Yarı Yol Zaferi)', sub: '14 hafta geride kaldı. Şampiyonluk kupası ufukta parlıyor.', c: 'Yarı Yol', d: '14 Haftalık Şampiyon Fener ara değerlendirme karnesi çıkarıldı.' },
    { t: 'İkinci Yarı Başlıyor: Rehavete Sıfır Tolerans', sub: 'Asıl şampiyonluk yarışın ikinci yarısında kazanılır.', c: 'Uyanış', d: 'Yeni hedeflerle güncellenmiş ikinci yarı takvimi onaylandı.' },
    { t: 'Zirve Baskısını Yönetme & Stoik Sükunet', sub: 'Zirvedeyken herkes seni izler; soğukkanlılığını asla kaybetme.', c: 'Psikoloji', d: 'Günlük 15 dakika zihinsel sükunet ve nefes rutini uygulandı.' },
    { t: 'GFB Ruhu: Asla Pes Etmeyen İtici Güç', sub: 'Tribünlerin coşkusuyla, içindeki inançla son ana kadar mücadele.', c: 'Tutku', d: 'Karşılaşılan en büyük kriz başarıyla çözüldü.' },
    { t: 'Saha Dışı Düzen: Profesyonel Yaşam Mimarisi', sub: 'Büyük sporcular saha dışında da şampiyon gibi yaşar.', c: 'Yaşam Mimarisi', d: 'Uyku, beslenme ve çalışma alanı profesyonel lige yükseltildi.' },
    { t: 'Kritik Viraj: Puan Kaybına Tahammül Yok', sub: 'Her gün final, her saat şampiyonluk maçı ciddiyetinde.', c: 'Kararlılık', d: 'Bu haftaki 3 ana hedefin tümü %100 eksiksiz tamamlandı.' },
    { t: 'Taktiksel Esneklik: Değişen Şartlara Uyum', sub: 'Rakip ne yaparsa yapsın oyunu sen yönet.', c: 'Strateji', d: 'Plan dışı gelişen durumlar için B planı devreye alındı.' },
    { t: 'Şampiyonluk İnancı & Görselleştirme', sub: 'Kupayı kaldırdığın anı zihninde her sabah yaşa.', c: 'Vizyon', d: 'Gelecek 10 haftanın zafer haritası hazırlandı.' },
    { t: 'Faz 3 Kapanışı: Son Viraja Lider Giriş', sub: '22 hafta tamam. Artık Şampiyon Fener gücünü herkes görüyor.', c: 'Faz Kapanışı', d: 'Faz 3 dayanıklılık raporu ve son 8 hafta planı hazırlandı.' },
    { t: 'Şampiyonluk Havası: Son Düzlük Disiplini', sub: 'Son 8 haftada tempoyu iki katına çıkarıyoruz.', c: 'Vites Artırma', d: 'Günlük odak çalışma süresi 2 saate çıkarıldı.' },
    { t: 'Kusursuz Bitiricilik: Detaylarda Zirve', sub: 'Topu 90\'a takmak gibi; her görevi en yüksek kalitede bitir.', c: 'Ustalık', d: 'Büyük projenin ilk versiyonu eksiksiz tamamlandı.' },
    { t: 'Büyük Taraftar Desteği: Başarıyı Paylaşma', sub: 'Yolculuğunda arkanda duranları unutma, teşekkür et.', c: 'Vefa', d: 'Sana destek olan en az 3 kişiye teşekkür hediyesi veya notu iletildi.' },
    { t: 'Son Taktik Provasi: Kupaya Bir Adım', sub: 'Hata payı sıfır. Tüm detaylar gözden geçirildi.', c: 'Kalite Kontrol', d: 'Final çıktısının son provası yapıldı.' },
    { t: 'Kadıköy\'de Zafer Şarkıları: İnanç Zirvede', sub: 'O kupa buraya gelecek! Sarı lacivert inançla son hücum.', c: 'Zafer İnancı', d: 'Tüm hedeflerin son kontrolleri tamamlandı.' },
    { t: 'Faz 4 Kapanışı: Şampiyonluk Maçı Hazırlığı', sub: '28 haftalık alın teri. Önümüzde sadece şampiyonluk turu var.', c: 'Büyük Eşik', d: 'Büyük teslim sunumu ve kutlama hazırlığı tamamlandı.' },
    { t: 'O Sene Bu Sene: ŞAMPİYON FENER! (Kupa Haftası)', sub: '30 haftalık mücadelenin, inancın ve adanmışlığın muhteşem zaferi.', c: 'ŞAMPİYONLUK', d: '30 Haftalık Büyük Eser / Hedef Çıktısı başarıyla teslim edildi. ŞAMPİYON FENER!' },
    { t: 'Sarı Lacivert Efsane: Şampiyonun Yeni Sezon Vizyonu', sub: 'Bir şampiyonluk biter, bir sonraki şampiyonluğun hazırlığı başlar.', c: 'Gelecek Efsane', d: 'Şampiyonluk Sertifikası, 30 Haftalık Zafer Kitapçığı ve Yeni Sezon Planı.' },
  ];

  return fenerTitles.map((item, idx) => {
    const weekNumber = idx + 1;
    return {
      weekNumber,
      phase: getPhaseForWeek(weekNumber),
      title: item.t,
      subtitle: item.sub,
      category: item.c,
      quote: {
        text: 'Fenerbahçe bir tutkudur, vazgeçilmez bir sevdadır; pes etmek kitabında yazmaz!',
        author: 'Şampiyon Fener Ruhu',
      },
      deliverable: item.d,
      deliverableCompleted: false,
      externalLink: weekNumber === 3 ? {
        title: '3. Hafta Özel Oyunu (oyun-ten-omega.vercel.app)',
        url: 'https://oyun-ten-omega.vercel.app/',
      } : undefined,
      objectives: weekNumber === 3 ? [
        { id: '1', text: `${item.t} kapsamında haftalık kritik aksiyonu tamamla.`, completed: false },
        { id: '2', text: '3. Hafta Oyun Alanına Gir: https://oyun-ten-omega.vercel.app/', completed: false },
        { id: '3', text: 'Sarı lacivert odakla derin çalışma seansını uygula ve alışkanlık zincirini koru.', completed: false },
      ] : [
        { id: '1', text: `${item.t} kapsamında haftalık kritik aksiyonu tamamla.`, completed: false },
        { id: '2', text: 'Sarı lacivert odakla 5 gün boyunca derin çalışma seansını uygula.', completed: false },
        { id: '3', text: 'Şampiyonluk disipliniyle haftalık alışkanlık zincirini koru.', completed: false },
      ],
      habits: [
        'Sarı Lacivert Sabah Rutini',
        '60 Dk Şampiyonluk Odağı (Deep Work)',
        'Fiziksel Antrenman / 8000+ Adım',
        '2.5 Litre Su & Sağlıklı Beslenme',
        'Günün Kazanım Günlüğü (Şampiyon Fener)',
      ].map((name, hIdx) => ({
        id: `h_${weekNumber}_${hIdx}`,
        name,
        days: [false, false, false, false, false, false, false],
      })),
      reflection: {
        wins: '',
        challenges: '',
        learnings: '',
        energyRating: 5,
        satisfactionRating: 5,
      },
      notes: '',
      status: weekNumber === 1 ? 'in_progress' : 'not_started',
    };
  });
}


// 1. Personal Growth & Life Architecture Program (30 Weeks)
function generatePersonalGrowthWeeks(): WeekData[] {
  const plans = [
    {
      title: 'Mevcut Durum Analizi & Yaşam Çemberi',
      subtitle: 'Neredeyim, nereye gitmek istiyorum? Dürüst bir başlangıç muhasebesi.',
      category: 'Öz-Farkındalık',
      quote: { text: 'Nereye gittiğini bilmeyen bir gemiye hiçbir rüzgar yardım edemez.', author: 'Seneca' },
      deliverable: '8 Boyutlu Yaşam Çarkı ve 30 Haftalık Büyük Niyet Manifestosu yazıldı.',
      objectives: [
        { id: '1', text: 'Kariyer, sağlık, ilişkiler ve zihin boyutlarını 1-10 puanla.', completed: false },
        { id: '2', text: '30 haftada ulaşmak istediğin en somut 3 ana hedefi belirle.', completed: false },
        { id: '3', text: 'Günün en verimli saatlerini tespit eden 3 günlük zaman günlüğü tut.', completed: false },
      ],
    },
    {
      title: 'Sabah ve Akşam Rutinlerinin Tasarımı',
      subtitle: 'Günü nasıl başlattığın ve nasıl bitirdiğin zihnini belirler.',
      category: 'Rutinler',
      quote: { text: 'Önce biz alışkanlıklarımızı oluştururuz, sonra da alışkanlıklarımız bizi.', author: 'John Dryden' },
      deliverable: 'Uygulanabilir 45 dakikalık sabah ve 30 dakikalık akşam protokolu hazırlandı.',
      objectives: [
        { id: '1', text: 'Uyanır uyanmaz telefona bakmama (ilk 30 dakika kuralı) kararı al.', completed: false },
        { id: '2', text: 'Sabah su, esneme ve günün en önemli 1 görevini belirleme adımlarını ekle.', completed: false },
        { id: '3', text: 'Akşam ekranları kapatma saatini 22:30 olarak sabitle.', completed: false },
      ],
    },
    {
      title: 'Dijital Minimalizm & Bilgi Diyetini Başlatma',
      subtitle: 'Dikkatini çalan gereksiz uyaranları hayatından ayıkla.',
      category: 'Odak',
      quote: { text: 'Dikkatin neredeyse, hayatın oradadır.', author: 'William James' },
      deliverable: 'Sosyal medya süre sınırlamaları konuldu, gereksiz bildirimler tamamen kapatıldı.',
      objectives: [
        { id: '1', text: 'Telefondaki tüm anlamsız bildirimleri sustur.', completed: false },
        { id: '2', text: 'Gereksiz e-posta bültenlerinden tek tek abonelikten çık.', completed: false },
        { id: '3', text: 'Günlük ekran süresini %30 oranında düşür.', completed: false },
      ],
    },
    {
      title: 'Fiziksel Alanın Arındırılması (Kondo Etkisi)',
      subtitle: 'Dış düzen, iç dinginliğin doğrudan aynasıdır.',
      category: 'Çevre Tasarımı',
      quote: { text: 'Sadelik, nihai gelişmişliktir.', author: 'Leonardo da Vinci' },
      deliverable: 'Çalışma masası, dolaplar ve dijital masaüstü tertemiz hale getirildi.',
      objectives: [
        { id: '1', text: 'Çalışma masanda sadece o an üzerinde çalıştığın nesneye yer bırak.', completed: false },
        { id: '2', text: 'Kullanmadığın en az 10 eşyayı bağışla veya geri dönüştür.', completed: false },
        { id: '3', text: 'Bilgisayarında "Downloads" ve masaüstü klasörlerini organize et.', completed: false },
      ],
    },
    {
      title: 'Zaman Bloklama & Eisenhower Matrisi',
      subtitle: 'Acil olan ile önemli olanı birbirinden ayır.',
      category: 'Zaman Yönetimi',
      quote: { text: 'Zamanınızı yönetmek, hayatınızı yönetmektir.', author: 'Peter Drucker' },
      deliverable: 'Haftalık takvimde derin çalışma (Deep Work) blokları rezerve edildi.',
      objectives: [
        { id: '1', text: 'Her gün için 90 dakikalık tek bir kesintisiz çalışma bloğu belirle.', completed: false },
        { id: '2', text: 'Gelen işleri acil/önemli dörtgenine göre sınıflandırma pratiği yap.', completed: false },
        { id: '3', text: 'Tepkisel değil, proaktif bir gün planı oluştur.', completed: false },
      ],
    },
    {
      title: 'Faz 1 Kapanışı & İlk 40 Gün İncelemesi',
      subtitle: 'Temeller oturdu mu? İvme kontrolü ve kutlama.',
      category: 'Değerlendirme',
      quote: { text: 'İlerlemeyi ölçmezseniz, onu yönetemezsiniz.', author: 'Karl Pearson' },
      deliverable: 'Faz 1 kapsamlı değerlendirme raporu ve Faz 2 stratejisi hazırlandı.',
      objectives: [
        { id: '1', text: 'İlk 5 haftanın alışkanlık devamlılık oranını çıkar.', completed: false },
        { id: '2', text: 'Hangi rutinlerin işe yaradığını, hangilerinin tıkandığını yaz.', completed: false },
        { id: '3', text: 'Gelecek 8 haftanın derinleşme temalarını onayla.', completed: false },
      ],
    },
    {
      title: 'Derin Çalışma (Deep Work) Disiplini',
      subtitle: 'Yüzeysel meşguliyetten yüksek değerli üretime geçiş.',
      category: 'Üretkenlik',
      quote: { text: 'Derin çalışma yeteneği 21. yüzyılın süper gücüdür.', author: 'Cal Newport' },
      deliverable: 'Haftada toplam 10 saat kesintisiz derin çalışma gerçekleştirildi.',
      objectives: [
        { id: '1', text: 'Pomodoro veya 60/10 ritmiyle 5 gün üst üste odak seansı tamamla.', completed: false },
        { id: '2', text: 'Çalışma esnasında aklına gelen rastgele fikirleri "akıl defteri"ne yazıp ertele.', completed: false },
        { id: '3', text: 'Zorlu tek bir projede büyük bir kilometre taşını tamamla.', completed: false },
      ],
    },
    {
      title: 'Kişisel Bilgi Yönetimi (İkinci Beyin)',
      subtitle: 'Okuduklarını, öğrendiklerini ve fikirlerini kalıcı sisteme aktar.',
      category: 'Öğrenme',
      quote: { text: 'Zihniniz fikir üretmek içindir, onları tutmak için değil.', author: 'David Allen' },
      deliverable: 'PARA (Projects, Areas, Resources, Archives) yapısına sahip not sistemi kuruldu.',
      objectives: [
        { id: '1', text: 'Kitap özetleri ve ilham veren alıntılar için tek bir dijital/fiziksel not defteri seç.', completed: false },
        { id: '2', text: 'Son 1 ayda öğrendiğin en önemli 5 kavramı kendi cümlelerinle özetle.', completed: false },
        { id: '3', text: 'Notlarını etiketleyerek aranabilir hale getir.', completed: false },
      ],
    },
    {
      title: 'İletişim & Sınır Çizme Sanatı (Zarafetle Hayır Demek)',
      subtitle: 'Kendi hedeflerine "evet" diyebilmek için başkalarının taleplerine "hayır" de.',
      category: 'İlişkiler',
      quote: { text: 'Neye hayır dediğin, neye evet dediğinden daha önemlidir.', author: 'Steve Jobs' },
      deliverable: 'Hedeflerinle örtüşmeyen en az 2 zaman emici taahhütten nazikçe vazgeçildi.',
      objectives: [
        { id: '1', text: 'Gereksiz toplantı veya buluşma davetlerine alternatif öneriyle geri dönüş yap.', completed: false },
        { id: '2', text: 'Kişisel sınırlarını ve müsait olduğun zaman aralıklarını netleştir.', completed: false },
        { id: '3', text: 'Yakın çevrendeki insanlarla hedeflerini paylaşıp destek iste.', completed: false },
      ],
    },
    {
      title: 'Finansal Netlik & Bütçe Mimarisi',
      subtitle: 'Paran nereye gidiyor? Bilinçli harcama ve tasarruf sistemi.',
      category: 'Finans',
      quote: { text: 'Paranın efendisi olamazsanız, onun kölesi olursunuz.', author: 'Publilius Syrus' },
      deliverable: 'Son 3 ayın gelir-gider dökümü ve gelecek 6 ayın bütçe planı çıkarıldı.',
      objectives: [
        { id: '1', text: 'Tüm sabit ve değişken giderleri kategorilere ayır.', completed: false },
        { id: '2', text: 'Gereksiz abonelik ve harcama sızıntılarını iptal et.', completed: false },
        { id: '3', text: 'Acil durum fonu ve kişisel gelişim bütçesi için net oranlar belirle.', completed: false },
      ],
    },
    {
      title: 'Okuma Alışkanlığında Nitelik & Sentez',
      subtitle: 'Sadece tüketme, edindiğin bilgiyi eyleme dönüştür.',
      category: 'Entelektüel',
      quote: { text: 'İyi bir kitap okuduğun zaman hayatın değişir.', author: 'Montaigne' },
      deliverable: 'Bu haftanın kitabından hayata geçirilen 3 somut eylem adımı listelendi.',
      objectives: [
        { id: '1', text: 'Seçtiğin temel bir klasik veya rehber kitabı bu hafta bitir.', completed: false },
        { id: '2', text: 'Kitabın ana tezini tek sayfalık bir şema veya zihin haritasına dönüştür.', completed: false },
        { id: '3', text: 'Öğrendiğin bir prensibi bir arkadaşına veya çalışma arkadaşına anlat.', completed: false },
      ],
    },
    {
      title: 'Duygusal Dayanıklılık & Stoik Yaklaşım',
      subtitle: 'Kontrol edebildiklerine odaklan, kontrol edemediklerini kabul et.',
      category: 'Zihniyet',
      quote: { text: 'Bizi üzen şeyler olaylar değil, olaylara verdiğimiz anlamlardır.', author: 'Epiktetos' },
      deliverable: 'Kişisel "Kontrol Çemberi" analizi ve günlük şükran listesi tamamlandı.',
      objectives: [
        { id: '1', text: 'Seni endişelendiren şeyleri iki sütuna ayır: Kontrolümde / Kontrolüm Dışında.', completed: false },
        { id: '2', text: 'Kontrol edemediğin konular için endişelenmeyi durdurma taahhüdü yaz.', completed: false },
        { id: '3', text: 'Her günün sonunda 3 minnettarlık gerekçesi kaydet.', completed: false },
      ],
    },
    {
      title: 'Geri Bildirim Döngüsü & Akran Değerlendirmesi',
      subtitle: 'Dışarıdan bir gözün samimi değerlendirmesi kör noktaları aydınlatır.',
      category: 'Gelişim',
      quote: { text: 'Geri bildirim şampiyonların kahvaltısıdır.', author: 'Ken Blanchard' },
      deliverable: 'Güvendiğin 2 kişiden güçlü ve gelişime açık yönlerin hakkında geri bildirim alındı.',
      objectives: [
        { id: '1', text: 'Önceden hazırladığın 3 soruyla samimi bir geri bildirim görüşmesi yap.', completed: false },
        { id: '2', text: 'Savunmaya geçmeden sadece dinle ve notlar al.', completed: false },
        { id: '3', text: 'Gelen girdileri 30 haftalık planındaki adımlarla eşleştir.', completed: false },
      ],
    },
    {
      title: 'Faz 2 Kapanışı & Yarı Yol Değerlendirmesi',
      subtitle: 'Yolun tam ortasına geldik: Şimdiye kadarki en büyük dönüm noktası.',
      category: 'Kilometre Taşı',
      quote: { text: 'Yarı yola gelmek başarıldı demektir, ama zafer son adımdadır.', author: 'Konfüçyüs' },
      deliverable: '14 Haftalık Büyük İlerleme Raporu ve 2. Yarı Yol Haritası güncellendi.',
      objectives: [
        { id: '1', text: '1-14. haftalarda tamamlanan hedefleri ve kazanılan alışkanlıkları listele.', completed: false },
        { id: '2', text: 'Kendini ödüllendirecek anlamlı bir kutlama yap.', completed: false },
        { id: '3', text: 'Kalan 16 haftanın hedeflerini mevcut gerçeklere göre kalibre et.', completed: false },
      ],
    },
    {
      title: 'Plato Dönemini Kırmak (İstikrarlı Monotonluk)',
      subtitle: 'İlk heyecan geçtiğinde devam etme disiplini.',
      category: 'Süreklilik',
      quote: { text: 'İlham amatörler içindir; geri kalanımız kalkıp işe koyulur.', author: 'Chuck Close' },
      deliverable: 'Rutinlere taze bir heyecan katan 3 yeni mikromeydan okuma eklendi.',
      objectives: [
        { id: '1', text: 'Sıkıldığın bir görevi oyunlaştırmak için yeni bir metot dene.', completed: false },
        { id: '2', text: 'Kendine "neden başladığını" hatırlatan mektubunu tekrar oku.', completed: false },
        { id: '3', text: 'Hiç istemediğin bir günde bile planlanan görevi aksatmadan yap.', completed: false },
      ],
    },
    {
      title: 'Zorlu Kararlar & Önceliklendirme Matrisi',
      subtitle: 'İyi fırsatlara "hayır" diyerek harika fırsatlara odaklan.',
      category: 'Strateji',
      quote: { text: 'Strateji, ne yapmayacağınıza karar vermektir.', author: 'Michael Porter' },
      deliverable: 'Kişisel "Asla Yapmayacaklarım" (Not-To-Do List) listesi oluşturuldu.',
      objectives: [
        { id: '1', text: 'Enerjini dağıtan yan projeleri geçici olarak dondur.', completed: false },
        { id: '2', text: 'En kritik hedefine odaklanmak için haftalık 5 saati serbest bırak.', completed: false },
        { id: '3', text: 'Karar yorgunluğunu azaltmak için kıyafet ve yemek rutinlerini sadeleştir.', completed: false },
      ],
    },
    {
      title: 'Halk Önünde Üretim & Sorumluluk Paylaşımı',
      subtitle: 'Gelişimi sadece içinde tutma; dış dünyayla paylaşarak sorumluluk yarat.',
      category: 'Görünürlük',
      quote: { text: 'Öğretmek, iki kere öğrenmektir.', author: 'Joseph Joubert' },
      deliverable: 'Öğrendiğin bir konuda kapsamlı bir yazı, sunum veya video yayınlandı.',
      objectives: [
        { id: '1', text: 'Son 16 haftada uzmanlaştığın bir konuyu derle.', completed: false },
        { id: '2', text: 'Bunu LinkedIn, Medium veya bir toplulukta paylaş.', completed: false },
        { id: '3', text: 'Gelen sorulara ve yorumlara yapıcı cevaplar ver.', completed: false },
      ],
    },
    {
      title: 'Zihinsel Modeller ile Düşünme (First Principles)',
      subtitle: 'Sorunları temel bileşenlerine ayırarak çözme yeteneği.',
      category: 'Eleştirel Zihin',
      quote: { text: 'Düşüncenin kalitesi, hayatın kalitesidir.', author: 'Marcus Aurelius' },
      deliverable: 'Kişisel bir problemi "İlk İlkeler" (First Principles) yöntemiyle analiz eden doküman.',
      objectives: [
        { id: '1', text: 'Charlie Munger ve Elon Musk\'ın kullandığı 3 temel zihinsel modeli incele.', completed: false },
        { id: '2', text: 'Takıldığın bir problemi varsayımlarından arındırarak yeniden tanımla.', completed: false },
        { id: '3', text: 'Yeni ve alışılmışın dışında 2 çözüm yolu üret.', completed: false },
      ],
    },
    {
      title: 'Enerji Yönetimi & Biyolojik Saat',
      subtitle: 'Zamanı değil enerjini yönet. Uyku kalitesi ve sirkadiyen ritim.',
      category: 'Sağlık & Enerji',
      quote: { text: 'Enerji, başarının temel para birimidir.', author: 'Jim Loehr' },
      deliverable: 'Sirkadiyen ritme uyumlu ışık, yemek ve çalışma saatleri çizelgesi oluşturuldu.',
      objectives: [
        { id: '1', text: 'Sabah güneşiyle temas etme alışkanlığını 7 gün boyunca kesintisiz uygula.', completed: false },
        { id: '2', text: 'Yatmadan 2 saat önce kafein ve ağır yemek tüketimini kes.', completed: false },
        { id: '3', text: 'Öğleden sonraki enerji düşüşünü hafif bir yürüyüşle yönet.', completed: false },
      ],
    },
    {
      title: 'Ağ Kurma & Değer Katma',
      subtitle: 'İlişkilerinde bir şey istemeden önce değer kat.',
      category: 'Ağ & İlişkiler',
      quote: { text: 'Başkalarının hedeflerine ulaşmasına yardımcı olursanız, istediğiniz her şeye ulaşırsınız.', author: 'Zig Ziglar' },
      deliverable: 'Sektöründe takdir ettiğin 3 kişiye karşılıksız fayda sağlayan kişisel mesajlar iletildi.',
      objectives: [
        { id: '1', text: 'İlham aldığın kişilerin çalışmalarını incele.', completed: false },
        { id: '2', text: 'Onlara değerli bir kaynak, geri bildirim veya teşekkür ilet.', completed: false },
        { id: '3', text: 'Gelişmek istediğin alanda bir mentör veya akran ile bağlantı kur.', completed: false },
      ],
    },
    {
      title: 'Konfor Alanını Kasıtlı Terk Etme',
      subtitle: 'Büyüme sadece rahatsız hissettiğin yerde gerçekleşir.',
      category: 'Cesaret',
      quote: { text: 'Korktuğun şeyin ötesinde hayatın bekliyor.', author: 'Neale Donald Walsch' },
      deliverable: 'Seni en çok tedirgin eden eylemi (soğuk konuşma, zorlu talep vb.) tamamla.',
      objectives: [
        { id: '1', text: 'Normalde ertelediğin en çekingen konuyu seç.', completed: false },
        { id: '2', text: 'Hiç tereddüt etmeden harekete geç.', completed: false },
        { id: '3', text: 'Deneyimden sonra hissettiklerini günlüğe yaz.', completed: false },
      ],
    },
    {
      title: 'Faz 3 Kapanışı & Dayanıklılık Analizi',
      subtitle: '22 haftayı geride bıraktın. Artık bu bir çaba değil, senin kimliğin.',
      category: 'Dönüm Noktası',
      quote: { text: 'Karakter, kimsenin bakmadığı anlarda ne yaptığınızdır.', author: 'John Wooden' },
      deliverable: 'Faz 3 dayanıklılık metrikleri ve Faz 4 ustalaşma hedefleri onaylandı.',
      objectives: [
        { id: '1', text: 'Son 8 haftada aştığın en kritik 3 engeli yaz.', completed: false },
        { id: '2', text: 'Kendinde gözlemlediğin zihinsel ve fiziksel değişimleri not al.', completed: false },
        { id: '3', text: 'Son 8 haftaya girerken hedeflerini en üst seviyeye taşı.', completed: false },
      ],
    },
    {
      title: 'Kişisel Sistemlerin Otomasyonu',
      subtitle: 'Tekrarlayan işleri şablonlaştır, zihnini stratejiye sakla.',
      category: 'Sistem Tasarımı',
      quote: { text: 'Hedeflerinizin seviyesine yükselmezsiniz; sistemlerinizin seviyesine düşersiniz.', author: 'James Clear' },
      deliverable: 'Günlük ve haftalık işler için 3 hazır kontrol listesi (checklist) hazırlandı.',
      objectives: [
        { id: '1', text: 'Sürekli tekrar ettiğin 5 görevi tespit et.', completed: false },
        { id: '2', text: 'Bunlar için adım adım standart çalışma prosedürü (SOP) hazırla.', completed: false },
        { id: '3', text: 'Mümkün olanları dijital araçlarla otomatikleştir.', completed: false },
      ],
    },
    {
      title: 'İleri Seviye Zihinsel Berraklık (Sessizlik Günü)',
      subtitle: 'Gürültüyü keserek en derin sezgilerine kulak ver.',
      category: 'Farkındalık',
      quote: { text: 'Tüm insanlığın sorunları, insanın odasında tek başına sessizce oturamamasından kaynaklanır.', author: 'Blaise Pascal' },
      deliverable: 'Yarım günlük tam dijital ve uyaran detoksu gerçekleştirildi.',
      objectives: [
        { id: '1', text: 'En az 4 saat telefon, bilgisayar, müzik olmadan sadece bir defterle vakit geçir.', completed: false },
        { id: '2', text: 'Uzun bir doğa yürüyüşü yap.', completed: false },
        { id: '3', text: 'Hayatındaki en büyük öncelik hakkında 3 sayfa serbest yazı yaz.', completed: false },
      ],
    },
    {
      title: 'Büyük Çıktı Projesine Hızlı Başlangıç',
      subtitle: '30 haftalık yolculuğun zirve meyvesi için son hazırlıklar.',
      category: 'Üretim',
      quote: { text: 'Başlamak için mükemmel olmak zorunda değilsin, ama mükemmel olmak için başlamak zorundasın.', author: 'Zig Ziglar' },
      deliverable: 'Büyük final projesinin taslağı, ana hatları ve ilk %50 içeriği tamamlandı.',
      objectives: [
        { id: '1', text: '30. haftada gururla sunacağın nihai eseri / portföyü / raporu netleştir.', completed: false },
        { id: '2', text: 'Gerekli tüm kaynak ve materyalleri bir araya getir.', completed: false },
        { id: '3', text: 'Günde 2 saat sadece bu büyük çıktı için odaklan.', completed: false },
      ],
    },
    {
      title: 'Detayların Cilalanması & Kalite Kontrol',
      subtitle: 'İyi ile harika arasındaki fark, ayrıntılarda saklıdır.',
      category: 'Mükemmellik',
      quote: { text: 'Tanrı ayrıntılarda gizlidir.', author: 'Mies van der Rohe' },
      deliverable: 'Büyük projenin ilk tam versiyonu tamamlandı ve titizlikle gözden geçirildi.',
      objectives: [
        { id: '1', text: 'Çıktındaki tüm eksik ve pürüzleri tek tek düzelt.', completed: false },
        { id: '2', text: 'Bir meslektaşından veya uzmandan son eleştirel gözlemini iste.', completed: false },
        { id: '3', text: 'Gelen düzeltmeleri uygulayarak teslim formatına getir.', completed: false },
      ],
    },
    {
      title: 'Kişisel İlke ve Değerler Anayasası',
      subtitle: 'Hayatının geri kalanında sana pusula olacak değişmez kuralların.',
      category: 'Felsefe',
      quote: { text: 'İlkeleri olan bir insan, kalabalıklar karşısında tek başına bile çoğunluktur.', author: 'Wendell Phillips' },
      deliverable: '10 Maddelik Kişisel İlke ve Karar Alma Anayasası yazıldı.',
      objectives: [
        { id: '1', text: 'Hayatta asla taviz vermeyeceğin 5 temel değeri tanımla.', completed: false },
        { id: '2', text: 'Bu değerlerin günlük kararlarda nasıl uygulanacağını formüle et.', completed: false },
        { id: '3', text: 'Bu anayasayı her sabah görebileceğin bir yere as.', completed: false },
      ],
    },
    {
      title: 'Faz 4 Kapanışı & Zirveye Son Adım',
      subtitle: '28 hafta geride kaldı. Önünde sadece final haftaları var.',
      category: 'Hazırlık',
      quote: { text: 'Bitiş çizgisi sadece başlangıç çizgisinin başka bir adıdır.', author: 'Bilinmeyen' },
      deliverable: 'Final teslim sunumu ve kutlama planı hazırlandı.',
      objectives: [
        { id: '1', text: 'Büyük çıktının son rötuşlarını yap.', completed: false },
        { id: '2', text: '30 haftalık sürecin en unutulmaz 5 anını not et.', completed: false },
        { id: '3', text: 'Zihinsel olarak final kutlamasına hazırlan.', completed: false },
      ],
    },
    {
      title: 'Büyük Çıktı & Portföy Teslimi (Zirve)',
      subtitle: 'Aylarca süren emeğin, disiplinin ve sabrın somut zaferi.',
      category: 'Büyük Başarı',
      quote: { text: 'Zafer, pes etmeyenlerindir.', author: 'Mustafa Kemal Atatürk' },
      deliverable: '30 Haftalık Büyük Eser / Hedef Çıktısı başarıyla tamamlandı ve paylaşıldı.',
      objectives: [
        { id: '1', text: 'Nihai projeyi hedeflenen mecrada veya muhatabına sun.', completed: false },
        { id: '2', text: 'Bu ana kadar harcanan emeğin büyüklüğünü takdir et.', completed: false },
        { id: '3', text: 'Sana bu yolda eşlik eden ve destek verenlere teşekkür et.', completed: false },
      ],
    },
    {
      title: '30 Haftalık Dönüşüm Sentezi & Yeni Başlangıç',
      subtitle: 'Hafta 1\'deki sen ile Hafta 30\'daki sen arasındaki muazzam fark.',
      category: 'Gelecek Vizyonu',
      quote: { text: 'Yolculuk varış noktası kadar güzeldir.', author: 'Ralph Waldo Emerson' },
      deliverable: '30 Haftalık Kişisel Dönüşüm Kitapçığı ve Gelecek 1 Yıllık Vizyon Raporu.',
      objectives: [
        { id: '1', text: 'Hafta 1\'deki Yaşam Çarkı ile bugünkü puanlarını karşılaştır.', completed: false },
        { id: '2', text: 'Kalıcı hale gelen en değerli 3 alışkanlığını listele.', completed: false },
        { id: '3', text: 'Gelecek 30 haftalık yeni yolculuğunun ilk tohumunu ek.', completed: false },
      ],
    },
  ];

  return plans.map((p, idx) => {
    const weekNumber = idx + 1;
    return {
      weekNumber,
      phase: getPhaseForWeek(weekNumber),
      title: p.title,
      subtitle: p.subtitle,
      category: p.category,
      quote: p.quote,
      deliverable: p.deliverable,
      deliverableCompleted: false,
      objectives: p.objectives,
      habits: defaultHabitNames.map((name, hIdx) => ({
        id: `h_${weekNumber}_${hIdx}`,
        name,
        days: [false, false, false, false, false, false, false],
      })),
      reflection: {
        wins: '',
        challenges: '',
        learnings: '',
        energyRating: 4,
        satisfactionRating: 4,
      },
      notes: '',
      status: weekNumber === 1 ? 'in_progress' : 'not_started',
    };
  });
}

// 2. Software Developer Track
function generateSoftwareDevWeeks(): WeekData[] {
  const titles = [
    { t: 'Ortam Kurulumu & Git / GitHub Ustalığı', c: 'Araçlar & Temeller' },
    { t: 'Algoritmik Düşünme & Veri Yapıları (Array, Map, Set)', c: 'Bilgisayar Bilimleri' },
    { t: 'Modern JavaScript (ESNext, Asenkron Programlama & Promises)', c: 'Frontend Temel' },
    { t: 'TypeScript Tip Güvenliği & Arayüzler (Interfaces & Generics)', c: 'TypeScript' },
    { t: 'React Temelleri: Bileşenler, Props & State Yönetimi', c: 'React' },
    { t: 'Faz 1: İlk İnteraktif Single Page Application (SPA) Teslimi', c: 'Kilometre Taşı' },
    { t: 'Modern CSS, Tailwind CSS & Responsive Tasarım İlkeleri', c: 'UI / UX' },
    { t: 'React Hooks Derinlemesine (useMemo, useCallback, Custom Hooks)', c: 'İleri React' },
    { t: 'Backend Temelleri: Node.js, Express & RESTful API Mimarisi', c: 'Backend' },
    { t: 'İlişkisel Veritabanları & SQL Temelleri (PostgreSQL & Drizzle ORM)', c: 'Veritabanı' },
    { t: 'Kimlik Doğrulama & Yetkilendirme (JWT, Session & OAuth 2.0)', c: 'Güvenlik' },
    { t: 'Full-Stack Entegrasyon: Frontend ile Backend Bağlantısı', c: 'Full-Stack' },
    { t: 'Hata Yönetimi, Validasyon (Zod) & API Dokümantasyonu (Swagger)', c: 'Kalite' },
    { t: 'Faz 2: Tam Fonksiyonel Full-Stack CRUD Uygulaması Teslimi', c: 'Kilometre Taşı' },
    { t: 'Yazılım Testleri: Birim Testleri (Vitest/Jest) & Integration Tests', c: 'Test Mühendisliği' },
    { t: 'End-to-End Test Otomasyonu (Playwright) & CI/CD Pipelines (GitHub Actions)', c: 'DevOps' },
    { t: 'Büyük Portföy Projesi 1: Mimari Tasarım & Veritabanı Şeması', c: 'Büyük Proje' },
    { t: 'Büyük Portföy Projesi 1: Gerçek Zamanlı Özellikler (WebSockets)', c: 'Realtime' },
    { t: 'Büyük Portföy Projesi 1: Cloud Dağıtımı & Docker Konteynerizasyonu', c: 'Deployment' },
    { t: 'Performans Optimizasyonu (Lighthouse, Lazy Loading, Caching)', c: 'Performans' },
    { t: 'İleri Seviye Veri Yapıları & Ağaçlar / Grafikler', c: 'LeetCode & Problem' },
    { t: 'Faz 3: İlk Üretim Seviyesi SaaS Portföy Projesinin Lansmanı', c: 'Kilometre Taşı' },
    { t: 'Mikroservisler & Mesaj Kuyrukları Kavramları (RabbitMQ / Redis)', c: 'Sistem Tasarımı' },
    { t: 'Sistem Tasarımı Mülakat Pratikleri (Scalability, Sharding, Load Balancer)', c: 'System Design' },
    { t: 'Büyük Portföy Projesi 2: AI Entegrasyonu & Modern LLM API Çağrıları', c: 'AI Mühendisliği' },
    { t: 'Açık Kaynak Kod Katkısı & Topluluk İncelemesi', c: 'Açık Kaynak' },
    { t: 'Teknik CV, LinkedIn & GitHub Profilinin Profesyonel Revizyonu', c: 'Kariyer' },
    { t: 'Faz 4: Mock Mülakatlar & Davranışsal Soru (STAR) Hazırlığı', c: 'Mülakat Hazırlığı' },
    { t: 'Canlı Portföy Web Sitesi Lansmanı & İş Başvuruları Başlangıcı', c: 'Kariyer Lansmanı' },
    { t: '30 Haftalık Mühendislik Dönüşümü & Gelecek 1 Yılın Kariyer Vizyonu', c: 'Zirve & Gelecek' },
  ];

  return titles.map((item, idx) => {
    const weekNumber = idx + 1;
    return {
      weekNumber,
      phase: getPhaseForWeek(weekNumber),
      title: item.t,
      subtitle: `${item.c} alanında haftalık hedeflenen teknik kazanım ve proje çıktısı.`,
      category: item.c,
      quote: {
        text: 'İyi kod, kendisini en iyi şekilde açıklayan ve bakım maliyeti en düşük olan koddur.',
        author: 'Martin Fowler',
      },
      deliverable: `Hafta ${weekNumber} teknik kod çıktısı GitHub reposuna başarıyla yüklendi.`,
      deliverableCompleted: false,
      objectives: [
        { id: '1', text: `${item.t} ile ilgili en az 10 saat pratik kodlama yap.`, completed: false },
        { id: '2', text: 'Konuyla ilgili teknik makale oku ve not defterine ekle.', completed: false },
        { id: '3', text: 'GitHub reposuna temiz commit mesajlarıyla push et.', completed: false },
      ],
      habits: [
        'En Az 1 Git Commit',
        '60 Dk Odaklı Kodlama',
        '1 Algoritma / LeetCode Çözümü',
        'Teknik Dokümantasyon Okuma',
        '2.5 Litre Su & Esneme',
      ].map((name, hIdx) => ({
        id: `h_${weekNumber}_${hIdx}`,
        name,
        days: [false, false, false, false, false, false, false],
      })),
      reflection: {
        wins: '',
        challenges: '',
        learnings: '',
        energyRating: 4,
        satisfactionRating: 4,
      },
      notes: '',
      status: weekNumber === 1 ? 'in_progress' : 'not_started',
    };
  });
}

// 3. Fitness & Health Track
function generateFitnessWeeks(): WeekData[] {
  const weeks: WeekData[] = [];
  for (let w = 1; w <= 30; w++) {
    const phase = getPhaseForWeek(w);
    let title = `Hafta ${w}: Güç, Dayanıklılık ve Beslenme Protokolü`;
    if (w === 1) title = 'Vücut Analizi, Ölçümler & Temel Form Alışkanlıkları';
    if (w === 6) title = 'Faz 1 Değerlendirmesi: Temel Kondisyon & Form Oturtma';
    if (w === 14) title = 'Faz 2 Yarı Yol Ölçümü: Güç Artışı & Yağ Oranı Kontrolü';
    if (w === 22) title = 'Faz 3 Zirve Dayanıklılık: 10K Koşu veya Kişisel Rekor (PR)';
    if (w === 28) title = 'Faz 4 İleri Seviye Kas Hipertrofisi & Esneklik Zirvesi';
    if (w === 30) title = '30 Haftalık Fiziksel Dönüşüm Final Fotoğrafı & Kutlama';

    weeks.push({
      weekNumber: w,
      phase,
      title,
      subtitle: `30 haftalık zindelik planında ${phase}. fazın kritik gelişim adımı.`,
      category: 'Fitness & Sağlık',
      quote: {
        text: 'Disiplin, ne istediğin ile hemen şimdi ne istediğin arasındaki tercihtir.',
        author: 'Abraham Lincoln',
      },
      deliverable: `Haftalık 4 antrenman seansı ve temiz beslenme planı eksiksiz tamamlandı.`,
      deliverableCompleted: false,
      objectives: [
        { id: '1', text: 'Haftada en az 4 gün planlanan kuvvet / kardiyo antrenmanını uygula.', completed: false },
        { id: '2', text: 'Günlük protein hedefine (1.6g - 2g/kg) sadık kal.', completed: false },
        { id: '3', text: 'Haftalık kilo ve çevre ölçümlerini kaydet.', completed: false },
      ],
      habits: [
        'Planlanan Antrenman Seansı',
        'Günlük Protein & Temiz Kalori',
        '8000+ Günlük Adım',
        '3 Litre Su',
        '8 Saat Kaliteli Uyku',
      ].map((name, hIdx) => ({
        id: `h_${w}_${hIdx}`,
        name,
        days: [false, false, false, false, false, false, false],
      })),
      reflection: {
        wins: '',
        challenges: '',
        learnings: '',
        energyRating: 4,
        satisfactionRating: 4,
      },
      notes: '',
      status: w === 1 ? 'in_progress' : 'not_started',
    });
  }
  return weeks;
}

// 4. Language Track
function generateLanguageWeeks(): WeekData[] {
  const weeks: WeekData[] = [];
  for (let w = 1; w <= 30; w++) {
    const phase = getPhaseForWeek(w);
    let title = `Hafta ${w}: Kelime Dağarcığı, Dinleme ve Akıcı Telaffuz`;
    if (w === 1) title = 'Seviye Tespiti, Ses Bilgisi (Fonetik) & İlk 300 Temel Kelime';
    if (w === 6) title = 'Faz 1 Kapanışı: Günlük Hayatta Kendini İfade Edebilme (A2)';
    if (w === 14) title = 'Faz 2: Karmaşık Zamanlar, Deyimler & Yabancı Dilde Düşünme';
    if (w === 22) title = 'Faz 3: Dizi/Film Anlama, Podcast Dinleme & Tartışma Becerisi';
    if (w === 28) title = 'Faz 4: İş & Akademik Dilde Sunum Yapabilme Yetkinliği';
    if (w === 30) title = '30 Haftalık B2 Sertifikasyonu / 30 Dakikalık Akıcı Konuşma Kaydı';

    weeks.push({
      weekNumber: w,
      phase,
      title,
      subtitle: `Hedef dilde akıcılık kazanımı için 30 haftalık basamak.`,
      category: 'Dil Edinimi',
      quote: {
        text: 'Başka bir dil bilmek, ikinci bir ruha sahip olmaktır.',
        author: 'Şarlman',
      },
      deliverable: `Haftalık 50 yeni kelime kartı ve 15 dakikalık ses kaydı teslim edildi.`,
      deliverableCompleted: false,
      objectives: [
        { id: '1', text: 'Her gün en az 30 dakika hedef dilde aktif dinleme yap.', completed: false },
        { id: '2', text: 'Haftada en az 1 saat anadili olan bir partnerle konuşma pratiği yap.', completed: false },
        { id: '3', text: 'Anki veya flashcard ile 50 yeni kelimeyi kalıcı hafızaya al.', completed: false },
      ],
      habits: [
        '30 Dk Dinleme (Podcast/Dizi)',
        '10 Yeni Kelime & Anki Tekrarı',
        '15 Dk Sesli Okuma Pratiği',
        'Hedef Dilde Günlük Tutma (5 Cümle)',
        'Gramer / Kural İncelemesi',
      ].map((name, hIdx) => ({
        id: `h_${w}_${hIdx}`,
        name,
        days: [false, false, false, false, false, false, false],
      })),
      reflection: {
        wins: '',
        challenges: '',
        learnings: '',
        energyRating: 4,
        satisfactionRating: 4,
      },
      notes: '',
      status: w === 1 ? 'in_progress' : 'not_started',
    });
  }
  return weeks;
}

// 5. Blank Custom Track
function generateBlankCustomWeeks(): WeekData[] {
  const weeks: WeekData[] = [];
  for (let w = 1; w <= 30; w++) {
    const phase = getPhaseForWeek(w);
    weeks.push({
      weekNumber: w,
      phase,
      title: `Hafta ${w}: Özel Hedef Başlığı`,
      subtitle: `Bu haftaya özel kendi alt hedefini ve odak alanını buraya yazabilirsin.`,
      category: 'Kişisel Hedef',
      quote: {
        text: 'Büyük yolculuklar tek bir adımla başlar.',
        author: 'Lao Tzu',
      },
      deliverable: `Bu hafta tamamlanacak somut ürün veya çıktı.`,
      deliverableCompleted: false,
      objectives: [
        { id: '1', text: 'Bu haftanın en kritik 1. görevi', completed: false },
        { id: '2', text: 'Bu haftanın 2. geliştirici görevi', completed: false },
        { id: '3', text: 'Bu haftanın 3. tamamlayıcı görevi', completed: false },
      ],
      habits: defaultHabitNames.map((name, hIdx) => ({
        id: `h_${w}_${hIdx}`,
        name,
        days: [false, false, false, false, false, false, false],
      })),
      reflection: {
        wins: '',
        challenges: '',
        learnings: '',
        energyRating: 4,
        satisfactionRating: 4,
      },
      notes: '',
      status: w === 1 ? 'in_progress' : 'not_started',
    });
  }
  return weeks;
}
