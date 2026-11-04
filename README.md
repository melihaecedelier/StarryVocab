# 🧠 VocabCraft — Akıllı Kelime Defteri & Flashcard Uygulaması

Modern JavaScript (React + Vite + Tailwind CSS) ile geliştirilmiş, **LocalStorage** tabanlı, sesli telaffuz destekli ve interaktif flashcard (hafıza kartı) çalışma moduna sahip yeni nesil kelime öğrenme ve pratik platformu.

---

## 📌 Proje Genel Bakışı

**VocabCraft**, dil öğrenenlerin yeni kelimeleri CEFR seviyelerine (A1 - C2) göre kategorize ederek kaydetmelerini, Web Speech API ile anında doğru telaffuzlarını dinlemelerini ve 3D çevrilebilir flashcard modunda hafızalarını test etmelerini sağlar. Veritabanı ihtiyacı olmadan tüm veriler tarayıcının **LocalStorage** hafızasında güvenle saklanır; sayfa yenilense veya kapatılsa dahi veriler kaybolmaz.

### ✨ Öne Çıkan Özellikler

* **📊 Canlı İstatistikler & İlerleme Çubuğu:** Toplam kelime sayısı, öğrenilenler yüzdesi ve pratik bekleyen kelimelerin dinamik takibi.
* **🔊 Sesli Telaffuz (Web Speech API):** Her kelimenin yanında bulunan ses butonuna tıklanarak İngilizce anadilde seslendirme dinleme.
* **🃏 3D Flashcard Çalışma Modu:**
  * Kartın ön yüzünde İngilizce kelime ve seviye rozeti; tıklandığında 3D çevrilerek arkadaki Türkçe anlam ve örnek cümle görünümü.
  * *"Tekrar Et"* veya *"Biliyorum"* aksiyonları ile anlık öğrenme durumunu güncelleme.
  * Oturum sonunda kutlama konfetisi (`canvas-confetti`) ve başarı özeti.
* **🔍 Gelişmiş Arama & Filtreleme:**
  * Canlı arama kutusu (kelime, Türkçe anlam ve örnek cümle içinde anında filtreler).
  * CEFR Seviye Filtreleri (Tümü, A1, A2, B1, B2, C1, C2).
  * Durum Filtreleri (Tümü, Öğrenilenler, Tekrar Edilecekler).
  * Sıralama (En Yeni, En Eski, Alfabetik A-Z, CEFR Seviyesine Göre).
* **🌓 Koyu / Açık Tema (Dark Mode):** Göz yormayan şık karanlık mod desteği (tercih LocalStorage'da tutulur).
* **💾 Veri Yedekleme & İçe Aktarma:** Tüm kelime havuzunu tek tıkla `.json` dosyası olarak indirme ve farklı cihazlara yükleyebilme.

---

## 📸 Ekran Görüntüsü

> Projeyi çalıştırdıktan sonra tarayıcınızdan bir ekran görüntüsü alıp `public/screenshot.png` olarak projeye kaydedebilir ve bu alanda görüntüleyebilirsiniz.

![VocabCraft Ekran Görüntüsü](./public/screenshot.png)

---

## 🛠️ Kullanılan Teknolojiler

| Alan | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Kütüphane / Framework** | **React 18** | Bileşen (component) tabanlı modern UI mimarisi |
| **Geliştirme Aracı** | **Vite** | Ultra hızlı derleme ve sıcak modül yenileme (HMR) |
| **Stil & Tasarım** | **Tailwind CSS** | Yardımcı sınıf tabanlı, responsive ve modern stil altyapısı |
| **İkon Seti** | **Lucide React** | Minimalist ve tutarlı vektörel arayüz ikonları |
| **Efektler** | **Canvas-Confetti** | Pratik tamamlama animasyonları |
| **Veri Saklama** | **Browser LocalStorage** | Sunucusuz, kalıcı istemci taraflı veri yönetimi |
| **Ses Motoru** | **Web Speech API** | Tarayıcı yerel metin okuma (Text-to-Speech) |

---

## 🤖 Yapay Zeka (AI) İle Geliştirme Süreci

Bu proje geliştirilirken **Gemini / Antigravity** yapay zeka asistanından projenin her aşamasında aktif bir pair-programmer olarak faydalanılmıştır:

### 1. Fikir ve Planlama Aşaması
* **AI Desteği:** Yönergedeki gereksinimler doğrultusunda 3 farklı proje konsepti türetildi. En işlevsel ve görsel olarak zengin olan *VocabCraft* fikri seçildi.
* **Örnek İstemi:** *"React ve LocalStorage kullanarak jüriyi etkileyecek, modern bir kelime takip uygulaması için veri modeli ve bileşen hiyerarşisi oluştur."*
* **Çıktı:** `Word` veri şeması (id, word, translation, example, level, isLearned, createdAt) ve UI ekran planı belirlendi.

### 2. Bileşen Üretimi ve Kodlama
* **AI Desteği:** `WordCard`, `FilterBar`, `StatsBar`, `FlashcardModal` gibi modüler React bileşenleri yazdırıldı.
* **Örnek İstemi:** *"Web Speech API kullanarak bir butona tıklandığında kelimeyi İngilizce okuyan ve 3D flip card animasyonuna sahip bir Flashcard bileşeni geliştir."*

### 3. Stil, UX ve Hata Ayıklama
* **AI Desteği:** Tailwind CSS ile açık/koyu mod geçişi yapılandırıldı. Windows ve Vite derleme uyumluluğundaki symlink çözümleri (`resolve.preserveSymlinks`) AI yardımıyla giderildi.

---

## 🚀 Kurulum ve Yerel Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler:
* **Node.js** (v18 veya üzeri önerilir)
* **npm** veya **yarn / pnpm**

### Adımlar:

1. **Depoyu Klonlayın veya İndirin:**
   ```bash
   git clone <github-repo-linkiniz>
   cd vocabcraft
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```
   Tarayıcınızda açmak için terminalde gösterilen adrese (genellikle `http://localhost:5173`) gidin.

4. **Üretim (Production) Derlemesi Almak İçin:**
   ```bash
   npm run build
   ```
   Çıktı `dist/` klasöründe hazır hale gelecektir.

---

## 🌐 Canlıya Alma (Deployment) Rehberi

Projenin `vite.config.js` dosyasında `base: './'` ayarlandığı için Vercel, Netlify veya GitHub Pages platformlarında sorunsuz çalışır:

### Vercel ile Yayınlama (Önerilen - 1 Dakika):
1. [vercel.com](https://vercel.com) adresine gidin ve GitHub hesabınızla giriş yapın.
2. **"Add New Project"** butonuna tıklayın ve GitHub'a yüklediğiniz `vocabcraft` deposunu seçin.
3. Framework Preset olarak **Vite** otomatik algılanacaktır.
4. **"Deploy"** butonuna basın. Birkaç saniye içinde canlı URL'niz hazır olacaktır!

### Netlify ile Yayınlama:
1. [netlify.com](https://app.netlify.com) adresinde oturum açın.
2. **"Add new site" -> "Import an existing project"** adımlarını seçip GitHub deponuzu bağlayın.
3. Build command: `npm run build`, Publish directory: `dist` olarak bırakın ve **Deploy**'a tıklayın.

---

## 📋 Proje Teslim Bilgileri

* **GitHub Deposu (Public):** `https://github.com/<kullanici-adiniz>/vocabcraft`
* **Canlı Demo (Live URL):** `https://<proje-adiniz>.vercel.app`
* **Geliştirici:** Ad Soyad / Öğrenci No

---

*Bu proje, modern web teknolojileri ve yapay zeka destekli yazılım geliştirme pratikleri uygulanarak hazırlanmıştır.*
