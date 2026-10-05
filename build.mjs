// Builds the static pages from content below. Run: node build.mjs
// Settings live in site.json (developer name, support email, effective date).
import fs from 'node:fs';

const cfg = JSON.parse(fs.readFileSync(new URL('./site.json', import.meta.url), 'utf8'));
const { developer, brand, email, effective } = cfg;

const NAV = {
  en: [
    ['privacy.html', 'Privacy Policy'],
    ['terms.html', 'Terms of Use'],
    ['support.html', 'Support'],
  ],
  tr: [
    ['privacy.html', 'Gizlilik Politikası'],
    ['terms.html', 'Kullanım Koşulları'],
    ['support.html', 'Destek'],
  ],
};

const navLinks = (lang, file) =>
  NAV[lang].map(([href, label]) => `<a href="${href}"${href === file ? ' aria-current="page"' : ''}>${label}</a>`).join('');

const page = (lang, file, title, body) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} · Kareli Sudoku</title>
<link rel="icon" href="../icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Figtree:wght@400..700&display=swap">
<link rel="stylesheet" href="../style.css">
</head>
<body>
<div class="wrap">
  <header>
    <a class="brand" href="../"><img src="../icon.png" alt=""><b>Kareli</b></a>
    <nav class="lang"><a href="../en/${file}"${lang === 'en' ? ' aria-current="page"' : ''}>English</a><a href="../tr/${file}"${lang === 'tr' ? ' aria-current="page"' : ''}>Türkçe</a></nav>
  </header>
  <nav class="pages" aria-label="${lang === 'tr' ? 'Sayfalar' : 'Pages'}">${navLinks(lang, file)}</nav>
  <main>
${body}
  </main>
  <footer>
    <nav class="foot-links">${navLinks(lang, file)}<a href="mailto:${email}">${email}</a></nav>
    © 2026 ${brand} · Kareli Sudoku
  </footer>
</div>
</body>
</html>
`;

const T = {
  en: {
    privacy: [
      'Privacy Policy',
      `<h1>Privacy Policy</h1>
<p class="meta">Effective ${effective.en}</p>
<p>Kareli Sudoku ("Kareli", "the app") is made by ${developer}. This policy explains what happens to your information when you use the app.</p>
<h2>The short version</h2>
<p><mark>Kareli itself does not collect, store or share personal data.</mark> There is no account, no advertising and no tracking. Photos of book puzzles are read on your device and never uploaded. On Android, the text recognition used for photo import (Google ML Kit) sends Google some technical diagnostics, described below.</p>
<h2>What stays on your device</h2>
<p>The app saves your games, notes, daily results, streak, the techniques you have seen and your settings in the app's own storage on your device. This information is never sent to us or to anyone else. It is deleted when you uninstall the app or clear its data. If your phone's own backup is turned on (for example iCloud or Google backup), the operating system may include this data in your personal backup; we cannot access it.</p>
<h2>Photos of book puzzles</h2>
<p>If you use Take a photo or Choose a photo, you crop the photo on your device and the digits are read on your device: with Apple Vision on iPhone and with Google ML Kit on Android. The photo is never uploaded, and the app deletes its copy right after reading it. The camera is used only when you tap Take a photo, and you can refuse access.</p>
<h2>Google ML Kit (Android only)</h2>
<p>To read digits on Android, Kareli uses Google ML Kit on-device text recognition. ML Kit does not send your photo, but it sends Google technical data for diagnostics and usage analytics: device manufacturer, model and OS version, the app package name and version, a per-installation identifier, performance metrics and error codes. This happens only when you use photo import. Google encrypts this data in transit and does not pass it to third parties; see <a href="https://developers.google.com/ml-kit/android-data-disclosure">Google’s ML Kit data disclosure</a>.</p>
<h2>Network use</h2>
<p>Puzzles are created on your device and the app works offline. The app does not send requests to our servers. When you tap Privacy Policy, Terms of Use or Support in Settings, the page opens in your device's browser and is served by GitHub Pages, which may log basic technical data such as your IP address under GitHub's own privacy statement.</p>
<h2>Sharing your result</h2>
<p>When you tap Share result, your device's share sheet opens with a short text (time, hints, mistakes and coloured squares). You choose where to send it. We do not receive it.</p>
<h2>Permissions</h2>
<p>Kareli asks for camera access only when you tap Take a photo. Choosing a photo uses your phone’s own picker, which shares only the photo you pick. Kareli does not ask for your microphone, contacts or location. On Android it also uses the standard internet permission (for the pages above and the ML Kit diagnostics) and vibration for haptic feedback.</p>
<h2>App stores</h2>
<p>Apple and Google may collect information when you download or update apps, under their own privacy policies. They may share anonymous, aggregated statistics with us (for example the number of downloads or crash counts, if you have chosen to share diagnostics with them). This information does not identify you.</p>
<h2>Children</h2>
<p>Kareli is suitable for all ages. It does not knowingly collect personal data from anyone, including children.</p>
<h2>Your rights</h2>
<p>We do not hold any personal data about you, so there is nothing for us to access, correct or delete. The ML Kit diagnostics on Android are held by Google under its own privacy policy. Under the GDPR and Türkiye's KVKK you can contact us with any question.</p>
<h2>Changes</h2>
<p>If a future version adds a feature that changes this, such as optional cloud sync or purchases, we will update this page and the store listings before that version is released.</p>
<h2>Contact</h2>
<p><a href="mailto:${email}">${email}</a></p>`,
    ],
    terms: [
      'Terms of Use',
      `<h1>Terms of Use</h1>
<p class="meta">Effective ${effective.en}</p>
<p>These terms apply to Kareli Sudoku ("the app"), made by ${developer}. By using the app you agree to them.</p>
<h2>Using the app</h2>
<p>We give you a personal, non-exclusive, non-transferable licence to use the app on devices you own or control, for your own non-commercial use. The app is free.</p>
<h2>What you may not do</h2>
<ul>
<li>Copy, modify, sell or redistribute the app or its design, except as the law allows.</li>
<li>Reverse engineer the app, except where the law gives you that right.</li>
<li>Use the app in a way that breaks the law.</li>
</ul>
<h2>Puzzles you enter</h2>
<p>If you copy a puzzle from a book or another source into the app, you are responsible for that use. The content stays on your device.</p>
<h2>Ownership</h2>
<p>The app, its name, logo and design belong to ${developer}. Fonts are used under the SIL Open Font License.</p>
<h2>No warranty</h2>
<p>The app is provided "as is". We work to keep it correct and available, but we do not promise that it will be free of errors or that your saved progress can never be lost.</p>
<h2>Limitation of liability</h2>
<p>To the extent the law allows, ${developer} is not liable for indirect or consequential losses arising from use of the app. Nothing in these terms limits rights you have as a consumer that cannot be limited by law.</p>
<h2>App Store and Google Play</h2>
<p>If you downloaded the app from Apple's App Store, Apple's Licensed Application End User License Agreement (Standard EULA) also applies. Apple is not responsible for the app or its support. If you downloaded it from Google Play, Google Play's terms also apply.</p>
<h2>Changes</h2>
<p>We may update these terms. The effective date above shows the latest version.</p>
<h2>Contact</h2>
<p><a href="mailto:${email}">${email}</a></p>`,
    ],
    support: [
      'Support',
      `<h1>Support</h1>
<p class="meta">Questions, ideas or a bug? Write to us, we usually answer within two working days.</p>
<p><mark><a href="mailto:${email}">${email}</a></mark></p>
<p>For a bug, please tell us your phone model, the app version (Settings → bottom of the page) and what you were doing.</p>
<h2>Frequently asked</h2>
<h3>How do hints work?</h3>
<p>Tap Hint once to see where to look. Tap "Name the technique" to learn which technique applies. Tap "Show the answer" to see the step drawn on the board, then apply it if you want.</p>
<h3>When does the daily puzzle change?</h3>
<p>At midnight in your local time. Everyone gets the same puzzle on the same day. Monday is easy and the week gets harder until expert on Sunday.</p>
<h3>Can I turn off instant mistake checking?</h3>
<p>Yes: Settings → Show mistakes right away. A hint still points out a wrong digit before anything else.</p>
<h3>How do I copy a puzzle from my book?</h3>
<p>Open the From a book tab, tap a cell, then a digit, until all the clues are in. Tap Start solving. Kareli checks that the puzzle has exactly one solution and tells you how hard it is.</p>
<h3>How do I import a puzzle from a photo?</h3>
<p>Open From a book and tap Take a photo or Choose a photo. Crop the square to the outer border of the grid. Kareli reads the digits on your device and fills the board. Check the highlighted cells against your book, fix anything that is wrong, then tap Start solving. Good light and a straight, sharp photo give the best result.</p>
<h3>Where is my progress saved? Can I move it to a new phone?</h3>
<p>Only on your device. There is no account or cloud sync, so progress does not move between devices. Your phone's own backup may restore it.</p>
<h3>How do I change the language or theme?</h3>
<p>Settings → Language (System, English, Türkçe) and Appearance (System, Light, Dark).</p>
<p>See also the <a href="privacy.html">Privacy Policy</a> and <a href="terms.html">Terms of Use</a>.</p>`,
    ],
  },
  tr: {
    privacy: [
      'Gizlilik Politikası',
      `<h1>Gizlilik Politikası</h1>
<p class="meta">Yürürlük tarihi: ${effective.tr}</p>
<p>Kareli Sudoku ("Kareli", "uygulama") ${developer} tarafından geliştirilmiştir. Bu politika, uygulamayı kullanırken bilgilerine ne olduğunu açıklar.</p>
<h2>Kısaca</h2>
<p><mark>Kareli kendisi kişisel veri toplamaz, saklamaz veya paylaşmaz.</mark> Hesap, reklam ve takip yoktur. Kitap bulmacalarının fotoğrafları cihazında okunur ve hiçbir yere yüklenmez. Android'de fotoğraftan aktarma için kullanılan metin tanıma (Google ML Kit) Google'a bazı teknik tanılama verileri gönderir; aşağıda anlatılıyor.</p>
<h2>Cihazında kalanlar</h2>
<p>Uygulama oyunlarını, notlarını, günlük sonuçlarını, serini, gördüğün teknikleri ve ayarlarını cihazındaki kendi depolama alanında saklar. Bu bilgiler bize ya da başka birine asla gönderilmez. Uygulamayı silince veya verilerini temizleyince silinir. Telefonunun kendi yedeklemesi açıksa (iCloud veya Google yedeklemesi gibi) işletim sistemi bu verileri kişisel yedeğine ekleyebilir; biz bu yedeğe erişemeyiz.</p>
<h2>Kitap bulmacalarının fotoğrafları</h2>
<p>Fotoğraf çek veya Galeriden seç'i kullanırsan fotoğrafı cihazında kırparsın ve rakamlar cihazında okunur: iPhone'da Apple Vision, Android'de Google ML Kit ile. Fotoğraf hiçbir yere yüklenmez, uygulama kendi kopyasını okuduktan hemen sonra siler. Kamera yalnızca Fotoğraf çek'e dokunduğunda kullanılır ve izni vermeyebilirsin.</p>
<h2>Google ML Kit (yalnızca Android)</h2>
<p>Kareli, Android'de rakamları okumak için Google ML Kit'in cihaz üzerinde çalışan metin tanımasını kullanır. ML Kit fotoğrafını göndermez, ancak tanılama ve kullanım analizi için Google'a teknik veriler gönderir: cihaz üreticisi, modeli ve işletim sistemi sürümü, uygulama paket adı ve sürümü, kuruluma özel bir kimlik, performans ölçümleri ve hata kodları. Bu yalnızca fotoğraftan aktarmayı kullandığında olur. Google bu verileri şifreli iletir ve üçüncü taraflara aktarmaz; ayrıntılar için <a href="https://developers.google.com/ml-kit/android-data-disclosure">Google'ın ML Kit veri beyanı</a>.</p>
<h2>İnternet kullanımı</h2>
<p>Bulmacalar cihazında üretilir ve uygulama internetsiz çalışır. Uygulama sunucularımıza istek göndermez. Ayarlar'da Gizlilik politikası, Kullanım koşulları veya Destek'e dokunduğunda sayfa cihazının tarayıcısında açılır. Bu sayfalar GitHub Pages üzerinden sunulur; GitHub kendi gizlilik bildirimi kapsamında IP adresi gibi temel teknik verileri kaydedebilir.</p>
<h2>Sonucunu paylaşmak</h2>
<p>Sonucu paylaş'a dokunduğunda cihazının paylaşım menüsü kısa bir metinle (süre, ipucu, hata ve renkli kareler) açılır. Nereye göndereceğini sen seçersin. Bu metin bize ulaşmaz.</p>
<h2>İzinler</h2>
<p>Kareli kamera iznini yalnızca Fotoğraf çek'e dokunduğunda ister. Galeriden seçmek telefonun kendi seçicisiyle yapılır ve yalnızca seçtiğin fotoğraf paylaşılır. Kareli mikrofona, rehbere veya konuma erişim istemez. Android'de ayrıca standart internet iznini (yukarıdaki sayfalar ve ML Kit tanılama verileri için) ve dokunsal geri bildirim için titreşimi kullanır.</p>
<h2>Uygulama mağazaları</h2>
<p>Apple ve Google, uygulama indirip güncellediğinde kendi gizlilik politikaları kapsamında bilgi toplayabilir. Bizimle anonim ve toplu istatistikler paylaşabilirler (örneğin indirme sayısı veya, onlarla tanılama verisi paylaşmayı seçtiysen çökme sayıları). Bu bilgiler seni tanımlamaz.</p>
<h2>Çocuklar</h2>
<p>Kareli her yaşa uygundur. Çocuklar dahil kimseden bilerek kişisel veri toplamaz.</p>
<h2>Hakların</h2>
<p>Hakkında kişisel veri tutmadığımız için erişilecek, düzeltilecek veya silinecek bir veri yoktur. Android'deki ML Kit tanılama verileri Google'ın kendi gizlilik politikası kapsamında Google'da tutulur. KVKK ve GDPR kapsamındaki her soru için bize yazabilirsin.</p>
<h2>Değişiklikler</h2>
<p>İleride bulut eşitleme veya satın alma gibi bunu değiştiren bir özellik eklenirse, o sürüm yayınlanmadan önce bu sayfayı ve mağaza bilgilerini güncelleriz.</p>
<h2>İletişim</h2>
<p><a href="mailto:${email}">${email}</a></p>`,
    ],
    terms: [
      'Kullanım Koşulları',
      `<h1>Kullanım Koşulları</h1>
<p class="meta">Yürürlük tarihi: ${effective.tr}</p>
<p>Bu koşullar ${developer} tarafından geliştirilen Kareli Sudoku ("uygulama") için geçerlidir. Uygulamayı kullanarak bu koşulları kabul etmiş olursun.</p>
<h2>Kullanım hakkı</h2>
<p>Sana, sahip olduğun veya kontrol ettiğin cihazlarda, ticari olmayan kişisel kullanımın için kişisel, münhasır olmayan ve devredilemez bir kullanım lisansı veriyoruz. Uygulama ücretsizdir.</p>
<h2>Yapmaman gerekenler</h2>
<ul>
<li>Yasanın izin verdiği durumlar dışında uygulamayı veya tasarımını kopyalamak, değiştirmek, satmak ya da dağıtmak.</li>
<li>Yasanın sana bu hakkı tanıdığı durumlar dışında uygulamaya tersine mühendislik uygulamak.</li>
<li>Uygulamayı yasalara aykırı biçimde kullanmak.</li>
</ul>
<h2>Girdiğin bulmacalar</h2>
<p>Bir kitaptan veya başka bir kaynaktan uygulamaya bulmaca aktarırsan bu kullanımdan sen sorumlusun. Bu içerik cihazında kalır.</p>
<h2>Mülkiyet</h2>
<p>Uygulamanın, adının, logosunun ve tasarımının tüm hakları ${developer} adına saklıdır. Yazı tipleri SIL Open Font License kapsamında kullanılmaktadır.</p>
<h2>Garanti verilmemesi</h2>
<p>Uygulama "olduğu gibi" sunulur. Doğru ve erişilebilir olması için çalışıyoruz, ancak hatasız olacağını veya kayıtlı ilerlemenin hiçbir zaman kaybolmayacağını taahhüt etmiyoruz.</p>
<h2>Sorumluluğun sınırlandırılması</h2>
<p>Yasanın izin verdiği ölçüde ${developer}, uygulamanın kullanımından doğan dolaylı zararlardan sorumlu değildir. Bu koşullardaki hiçbir hüküm, tüketici olarak yasayla sınırlanamayan haklarını kısıtlamaz.</p>
<h2>App Store ve Google Play</h2>
<p>Uygulamayı Apple App Store'dan indirdiysen Apple'ın Lisanslı Uygulama Son Kullanıcı Lisans Sözleşmesi (Standart EULA) de geçerlidir. Apple uygulamadan veya desteğinden sorumlu değildir. Google Play'den indirdiysen Google Play koşulları da geçerlidir.</p>
<h2>Değişiklikler</h2>
<p>Bu koşulları güncelleyebiliriz. Yukarıdaki yürürlük tarihi en son sürümü gösterir.</p>
<h2>İletişim</h2>
<p><a href="mailto:${email}">${email}</a></p>`,
    ],
    support: [
      'Destek',
      `<h1>Destek</h1>
<p class="meta">Sorun, fikir ya da bir hata mı? Bize yaz, genelde iki iş günü içinde dönüyoruz.</p>
<p><mark><a href="mailto:${email}">${email}</a></mark></p>
<p>Bir hata bildiriyorsan telefon modelini, uygulama sürümünü (Ayarlar → sayfanın en altı) ve ne yaptığını yazman çok yardımcı olur.</p>
<h2>Sık sorulanlar</h2>
<h3>İpuçları nasıl çalışıyor?</h3>
<p>İpucu'na bir kez dokun, nereye bakacağını gör. "Tekniği söyle" ile hangi tekniğin işe yaradığını öğren. "Cevabı göster" ile adım tahtada çizilir, istersen uygula.</p>
<h3>Günün bulmacası ne zaman değişir?</h3>
<p>Kendi saatinle gece yarısı. Aynı gün herkes aynı bulmacayı çözer. Pazartesi kolaydır, hafta ilerledikçe zorlaşır ve pazar uzman seviyesindedir.</p>
<h3>Hataları anında göstermeyi kapatabilir miyim?</h3>
<p>Evet: Ayarlar → Yanlış rakamı hemen göster. İpucu yine de önce yanlış rakamı gösterir.</p>
<h3>Kitabımdaki bulmacayı nasıl aktarırım?</h3>
<p>Kitaptan sekmesini aç, bir hücreye sonra rakama dokunarak bütün ipuçlarını gir. Çözmeye başla'ya dokun. Kareli bulmacanın tek çözümü olduğunu kontrol eder ve ne kadar zor olduğunu söyler.</p>
<h3>Bulmacayı fotoğraftan nasıl aktarırım?</h3>
<p>Kitaptan sekmesini aç, Fotoğraf çek ya da Galeriden seç'e dokun. Kareyi ızgaranın dış çizgisine oturtacak şekilde kırp. Kareli rakamları cihazında okuyup tahtaya yazar. İşaretli hücreleri kitapla karşılaştır, yanlış olanı düzelt, sonra Çözmeye başla'ya dokun. İyi ışık ve düz, net bir fotoğraf en iyi sonucu verir.</p>
<h3>İlerlemem nerede saklanıyor? Yeni telefona taşıyabilir miyim?</h3>
<p>Yalnızca cihazında. Hesap veya bulut eşitleme olmadığı için ilerleme cihazlar arasında taşınmaz. Telefonunun kendi yedeklemesi geri yükleyebilir.</p>
<h3>Dili veya temayı nasıl değiştiririm?</h3>
<p>Ayarlar → Dil (Sistem, English, Türkçe) ve Görünüm (Sistem, Açık, Koyu).</p>
<p><a href="privacy.html">Gizlilik politikası</a> ve <a href="terms.html">Kullanım koşulları</a> sayfalarına da bakabilirsin.</p>`,
    ],
  },
};

for (const lang of ['en', 'tr']) {
  for (const key of ['privacy', 'terms', 'support']) {
    const [title, body] = T[lang][key];
    fs.writeFileSync(new URL(`./${lang}/${key}.html`, import.meta.url), page(lang, `${key}.html`, title, body));
  }
}

const index = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kareli Sudoku</title>
<meta name="description" content="A calm sudoku with hints that teach the technique. No ads, no account.">
<link rel="icon" href="icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Figtree:wght@400..700&display=swap">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="wrap">
  <header>
    <a class="brand" href="./"><img src="icon.png" alt=""><b>Kareli</b></a>
  </header>
  <main>
    <h1>A calm sudoku with <mark>hints that teach</mark></h1>
    <p class="meta">Daily puzzle · Copy puzzles from your book · No ads, no account</p>
    <div class="cards">
      <a href="en/privacy.html"><b>Privacy Policy</b><span>English</span></a>
      <a href="en/terms.html"><b>Terms of Use</b><span>English</span></a>
      <a href="en/support.html"><b>Support</b><span>English</span></a>
    </div>
    <h2 lang="tr">Öğreten ipuçlarıyla sakin bir sudoku</h2>
    <div class="cards" lang="tr">
      <a href="tr/privacy.html"><b>Gizlilik Politikası</b><span>Türkçe</span></a>
      <a href="tr/terms.html"><b>Kullanım Koşulları</b><span>Türkçe</span></a>
      <a href="tr/support.html"><b>Destek</b><span>Türkçe</span></a>
    </div>
  </main>
  <footer>© 2026 ${brand} · <a href="mailto:${email}">${email}</a></footer>
</div>
</body>
</html>
`;
fs.writeFileSync(new URL('./index.html', import.meta.url), index);
console.log('built 7 pages for', developer, email);
