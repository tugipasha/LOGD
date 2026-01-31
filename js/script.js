// Audio Manager for transitions
const AudioManager = {
    windSound: null,
    isInitialized: false,

    init() {
        if (this.isInitialized) return;
        // Create an audio element for the wind sound
        // Using a reliable CDN for a short woosh/wind sound
        this.windSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
        this.windSound.volume = 0.4;
        this.isInitialized = true;
    },

    playWind() {
        if (!this.windSound) this.init();
        this.windSound.currentTime = 0;
        this.windSound.play().catch(e => console.log("Audio play blocked until user interaction"));
    }
};

const translations = {
    tr: {
        // Navigation
        nav_home: "Ana Sayfa",
        nav_about: "Hakkımızda",
        nav_events: "Etkinlikler",
        nav_showcase: "Showcase",
        nav_news: "Haberler",
        nav_contact: "İletişim",
        
        // Countdown
        countdown_title: "GGJ Next",
        label_days: "Gün",
        label_hours: "Saat",
        label_mins: "Dak",
        
        // Home Page
        intro_subtitle: "Liseler Oyun Geliştiriciler Derneği",
        main_title: "Liseli oyun geliştiricilerin oyun dünyasına açılan kapısı",
        subtitle: "LOGD, Türkiye’nin dört bir yanındaki liseli oyun geliştiricileri bir araya getirerek öğrenme, üretme ve paylaşma kültürünü güçlendirir.",
        cta_primary: "Etkinliklere Göz At",
        cta_secondary: "Haberleri Gör",
        about_title: "LOGD Nedir?",
        about_description: "Liseli Oyun Geliştiriciler Derneği (LOGD), oyun geliştirmeye ilgi duyan lise öğrencilerini bir araya getiren, kâr amacı gütmeyen bir topluluktur. LOGD; öğrenci topluluklarını destekler, yeni toplulukların kurulmasına yardımcı olur ve genç geliştiricilere oyun sektörüne dair gerçek üretim deneyimleri sunar.",
        communities_title: "Öğrenci Topluluklarımız",
        
        // Events
        gamejam_title: "Game Jams",
        gamejam_desc: "48–72 saat süren oyun geliştirme maratonlarıyla katılımcıların ekip çalışması, yaratıcılık ve problem çözme becerilerini geliştiriyoruz.",
        workshop_title: "Workshops",
        workshop_desc: "Sektör profesyonelleriyle teknik ve yaratıcı atölye çalışmaları düzenliyoruz.",
        meetup_title: "Meet-ups",
        meetup_desc: "Topluluk üyelerinin bir araya gelerek tanıştığı ve bağlantılar kurduğu sosyal buluşmalar.",
        devtalk_title: "Dev Talks",
        devtalk_desc: "Sektör liderleri ve deneyimli geliştiricilerle ilham verici konuşmalar.",
        detail_link: "Detaylı İncele →",
        
        // About Page
        page_about_title: "Biz Kimiz?",
        page_about_subtitle: "LOGD, liseli oyun geliştiriciler için kapsayıcı, üretken ve sürdürülebilir bir ekosistem oluşturmayı hedefler.",
        story_title: "LOGD'nin Hikâyesi",
        story_text: "Liseli Oyun Geliştiriciler Derneği (LOGD), oyun geliştirmeye ilgi duyan lise öğrencilerini bir araya getiren, kâr amacı gütmeyen bir topluluktur. LOGD; öğrenci topluluklarını destekler, yeni toplulukların kurulmasına yardımcı olur ve genç geliştiricilere oyun sektörüne dair gerçek üretim deneyimleri sunar.",
        vision_label: "🎯 Vizyon",
        vision_text: "Genç oyun geliştiriciler için Türkiye’nin en güçlü destek ağı olmak.",
        mission_label: "🚀 Misyon",
        mission_text: "Öğrencilerin öğrenme, üretme ve paylaşma fırsatlarını artırmak; oyun geliştirme kültürünü yaymak ve sektör ile öğrenciler arasında köprü kurmak.",
        team_title: "Yönetim ve Ekip",
        
        // Events Page
        page_events_title: "Birlikte Üretiyoruz",
        page_events_subtitle: "LOGD olarak oyun geliştirmenin her alanını kapsayan etkinlikler düzenliyoruz.",
        events_gamejam_desc: "Katılımcıların kısa sürede sıfırdan oyun geliştirdiği yoğun üretim süreçleri.",
        event_snowyjam_title: "Snowy Jam",
        event_snowyjam_desc: "Numtal Game Dev önderliğinde topluluğumuzdaki 10 okulda 10-14 Ocak tarihleri arasında eş zamanlı olarak düzenlenen Gamejam etkinliğimiz.",
        event_ggjnext_title: "GGJ Next 2025",
        event_ggjnext_desc: "Genç geliştiriciler için dünyanın en büyük game jam organizasyonunun 2025 ayağı. Türkiye'deki ilk fiziksel GGJ Next etkinliği!",
        event_godot_title: "Godot Sponsorluğunda Godot Eğitimi",
        event_godot_desc: "Godot engine ile oyun geliştirme dünyasına adım atmak isteyenler için online dersler, ödevlendirmelerle desteklenen bir eğitim süreci.",
        explore_event: "Bu etkinlik türünü incele →",
        
        // Sponsorship
        sponsorship_title: "Partnerlik & İş Birlikleri",
        sponsorship_text: "LOGD, Global Game Jam NEXT LOGD-IN gibi büyük ölçekli etkinliklerle genç geliştiricilere doğrudan ulaşır ve markalar için sürdürülebilir iş birliği fırsatları sunar.",
        
        // GameJams Detail
        gamejams_page_title: "Game Jams",
        gamejams_page_subtitle: "Oyun Maratonlarının Adresi",
        gamejams_header_title: "Game Jams",
        gamejams_header_subtitle: "Oyun Maratonlarının Adresi",
        what_is_it: "Nedir?",
        gamejams_what_title: "Nedir?",
        gamejams_what_text: "48-72 saat süren yoğun oyun geliştirme süreçlerinde öğrenciler ekipler halinde sıfırdan oyun üretir. LOGD, ulusal ve uluslararası Game Jam organizasyonlarında aktif rol alır. Tempo, yaratıcılık ve ekip ruhunun buluştuğu bu maratonlarda öğrenciler gerçek bir üretim deneyimi yaşar.",
        gamejams_featured_title: "Öne Çıkan Game Jam'ler",
        gamejams_list_item1: "Global Game Jam Next - Türkiye'nin en büyük game jam organizasyonu",
        gamejams_list_item2: "LOGD Yaz Game Jam - Yaz döneminde düzenlenen özel etkinlik",
        gamejams_list_item3: "48 Hour Challenge - Hızlı üretim odaklı maraton",
        gamejams_list_item4: "Tema Bazlı Jam'ler - Farklı oyun türlerine özel etkinlikler",
        gamejams_contact_btn: "İletişime Geç",
        featured_gamejams: "Öne Çıkan Game Jam'ler",
        contact_us: "İletişime Geç",
        
        // Workshops Detail
        workshops_page_title: "Workshops",
        workshops_page_subtitle: "Sektör Profesyonelleriyle Öğrenme",
        workshops_header_title: "Workshops",
        workshops_header_subtitle: "Sektör Profesyonelleriyle Öğrenme",
        workshops_what_title: "Nedir?",
        workshops_what_text: "Sektör profesyonelleriyle atölyeler, teknik eğitimler, röportajlar ve uygulamalı seanslar. Profesyonellerden öğrenme fırsatı sunan interaktif eğitimler ile öğrenciler hem teorik bilgi edinir hem de pratik deneyim kazanır.",
        workshops_topics_title: "Workshop Konuları",
        workshops_list_item1: "Unity ile 2D Oyun Geliştirme Temelleri",
        workshops_list_item2: "Unreal Engine 5 ile 3D Modelleme",
        workshops_list_item3: "Oyun Tasarımı ve Level Design",
        workshops_list_item4: "Character Design ve Animasyon",
        workshops_list_item5: "Oyun Müziği ve Ses Tasarımı",
        workshops_list_item6: "Oyun Ekonomisi ve Monetizasyon",
        workshops_contact_btn: "İletişime Geç",
        workshop_topics: "Workshop Konuları",
        
        // Meetups Detail
        meetups_page_title: "Meet-ups",
        meetups_page_subtitle: "Genç Geliştiricilerin Buluşma Noktası",
        meetups_header_title: "Meet-ups",
        meetups_header_subtitle: "Genç Geliştiricilerin Buluşma Noktası",
        meetups_what_title: "Nedir?",
        meetups_what_text: "Şehrin dört bir yanındaki genç oyun geliştiricilerin sohbet ettiği, tanıştığı ve bağlantı kurduğu buluşmalar. Yeni bağlantılar kurabileceğiniz sıcak buluşmalarda hem networking yapabilir hem de ortak projeler için ekip arkadaşları bulabilirsiniz.",
        meetups_formats_title: "Meet-up Formatları",
        meetups_format_item1: "Kahve & Kod - Rahat sohbet ortamında kodlama",
        meetups_format_item2: "Proje Paylaşımı - Yaptığınız projeleri sunma fırsatı",
        meetups_format_item3: "Networking Gecesi - Sektör profesyonelleriyle tanışma",
        meetups_format_item4: "Oyun Test Günleri - Geliştirdiğiniz oyunları test ettirme",
        meetups_contact_btn: "İletişime Geç",
        meetup_formats: "Meet-up Formats",
        
        // DevTalks Detail
        devtalks_page_title: "Dev Talks",
        devtalks_page_subtitle: "Sektör Liderlerinden İlham",
        devtalks_header_title: "Dev Talks",
        devtalks_header_subtitle: "Sektör Liderlerinden İlham",
        devtalks_what_title: "Nedir?",
        devtalks_what_text: "Başarılı geliştirici ekiplerin ve sektördeki liderlerin öğrencilerle buluştuğu konuşmalar. Sektörün deneyimli isimlerinin ilham veren konuşmalarında kariyer tavsiyeleri, proje geliştirme süreçleri ve sektör içi deneyimler paylaşılır.",
        devtalks_speakers_title: "Önceki Konuşmacılar",
        devtalks_speaker_item1: "Can Aksoy - Oyun Tasarım Direktörü @ Bigger Games",
        devtalks_speaker_item2: "Elif Yılmaz - Lead Programmer @ Gram Games",
        devtalks_speaker_item3: "Murat Demir - CEO @ Peak Games",
        devtalks_speaker_item4: "Selin Kaya - Art Director @ Dream Games",
        devtalks_topics_title: "Dev Talk Konuları",
        devtalks_topic_item1: "Oyun Geliştirmede Kariyer Yolları",
        devtalks_topic_item2: "Bağımsız Oyun Geliştirme Deneyimleri",
        devtalks_topic_item3: "Mobil Oyun Pazarında Başarı Stratejileri",
        devtalks_topic_item4: "Oyun Stüdyosu Kurma Hikâyeleri",
        devtalks_topic_item5: "Uluslararası Pazarda Rekabet",
        devtalks_topic_item6: "Hyper-Casual Oyunların Sırları",
        devtalks_contact_btn: "İletişime Geç",
        previous_speakers: "Önceki Konuşmacılar",
        devtalk_topics: "Dev Talk Konuları",
        
        // Showcase Page
        showcase_page_title: "Showcase",
        showcase_page_subtitle: "LOGD topluluğu tarafından geliştirilen harika oyunlar",
        showcase_coming_soon_title: "Yakında",
        showcase_coming_soon_text: "Yeni oyunlar çok yakında burada görünecek! Topluluğumuzun geliştirdiği projeleri takip edin.",
        showcase_add_game_btn: "Oyununu Ekle",
        showcase_your_project_title: "Projeniz Burada Olabilir",
        showcase_your_project_text: "Geliştirdiğiniz oyunu LOGD showcase'inde sergilemek ister misiniz? Bizimle iletişime geçin!",
        showcase_apply_btn: "Başvur",
        
        // News Page
        news_title: "Haberler",
        news_subtitle: "LOGD topluluğundan son haberler, duyurular ve etkinlik güncellemeleri.",
        news_featured_tag: "⭐ ÖNEMLİ DUYURU",
        news_featured_title: "🎉 LOGD Web Sitesi Yayında!",
        news_featured_date: "📅 28 Şubat 2025 • ✍️ LOGD Yönetim Ekibi",
        news_featured_text1: "Liseler Oyun Geliştirme Derneği'nin resmi web sitesi artık yayında! Türkiye'nin dört bir yanındaki genç oyun geliştiricilerini bir araya getiren platformumuz, şimdi daha profesyonel ve kullanıcı dostu bir arayüzle karşınızda.",
        news_featured_text2: "Yeni web sitemizde neler var? Tüm etkinliklerimizi detaylıca inceleyebilir, haberlerimizi takip edebilir ve hemen üyelik başvurusunda bulunabilirsiniz. Ayrıca karanlık mod desteği ile göz yorulmadan gezinme imkanı sunuyoruz!",
        news_featured_features_title: "Yeni özellikler:",
        news_featured_feature1: "✨ Etkinlik detay sayfaları ve katılım formları",
        news_featured_feature2: "📰 Haber ve duyuru sistemi",
        news_featured_feature3: "💬 Gelişmiş iletişim formları",
        news_featured_feature4: "🌙 Karanlık mod desteği",
        news_featured_btn: "LOGD Hakkında Daha Fazla Bilgi →",
        important_announcement: "⭐ ÖNEMLİ DUYURU",
        latest_news: "Son Haberler",
        
        // Contact Page
        contact_title: "İletişim",
        contact_subtitle: "Sorularınız, önerileriniz veya işbirliği talepleriniz için bizimle iletişime geçin.",
        general_contact: "Genel İletişim",
        contact_form: "İletişim Formu",
        full_name: "Ad Soyad *",
        email: "E-posta *",
        your_message: "Mesajınız *",
        message_placeholder: "Lütfen mesajınızı buraya yazın...",
        send: "Gönder",
        sending: "Gönderiliyor...",
        
        // Footer
        footer_about: "LOGD Hakkında",
        footer_text: "Liseler Oyun Geliştirme Derneği - Türkiye'nin liseli oyun geliştiricileri için en kapsayıcı topluluk. Öğrenme, üretme ve paylaşma kültürünü birlikte büyütüyoruz.",
        footer_quick_menu: "Hızlı Menü",
        footer_legal: "Yasal",
        sponsors_title: "Partnerlerimiz",
        footer_copyright: "© 2026 LOGD - Liseler Oyun Geliştirme Derneği. Tüm hakları saklıdır.",
        social_instagram: "Instagram",
        social_linkedin: "LinkedIn",
        social_twitter: "Twitter",
        social_discord: "Discord",
    },
    en: {
        // Navigation
        nav_home: "Home",
        nav_about: "About",
        nav_events: "Events",
        nav_showcase: "Showcase",
        nav_news: "News",
        nav_contact: "Contact",

        // Countdown
        countdown_title: "GGJ Next",
        label_days: "Days",
        label_hours: "Hrs",
        label_mins: "Mins",
        
        // Home Page
        intro_subtitle: "High Schools Game Developers Association",
        main_title: "The gateway to the world of game development for high school students",
        subtitle: "LOGD brings together high school game developers from all across Türkiye, fostering a culture of learning, creating, and sharing.",
        cta_primary: "Explore Events",
        cta_secondary: "View News",
        about_title: "What is LOGD?",
        about_description: "Liseli Oyun Geliştiriciler Derneği (LOGD) is a non-profit organization that brings together high school students interested in game development. LOGD supports student communities, helps establish new ones, and provides young developers with real-world game development experience.",
        communities_title: "Our Student Communities",
        
        // Events
        gamejam_title: "Game Jams",
        gamejam_desc: "We develop teamwork, creativity and problem solving skills of participants with game development marathons lasting 48-72 hours.",
        workshop_title: "Workshops",
        workshop_desc: "We organize technical and creative workshops with industry professionals.",
        meetup_title: "Meet-ups",
        meetup_desc: "Social gatherings where community members come together and make connections.",
        devtalk_title: "Dev Talks",
        devtalk_desc: "Inspiring talks with industry leaders and experienced developers.",
        detail_link: "Details →",
        
        // About Page
        page_about_title: "Who Are We?",
        page_about_subtitle: "LOGD aims to create an inclusive, productive and sustainable ecosystem for high school game developers.",
        story_title: "The Story of LOGD",
        story_text: "Liseli Oyun Geliştiriciler Derneği (LOGD) is a non-profit community that brings together high school students interested in game development. LOGD; supports student communities, helps establish new ones and offers young developers real production experiences in the game industry.",
        vision_label: "🎯 Vision",
        vision_text: "To be Turkey's strongest support network for young game developers.",
        mission_label: "🚀 Mission",
        mission_text: "Increasing learning, production and sharing opportunities for students; spreading the culture of game development and building a bridge between the industry and students.",
        team_title: "Management and Team",
        
        // Events Page
        page_events_title: "Producing Together",
        page_events_subtitle: "As LOGD, we organize events covering all areas of game development.",
        events_gamejam_desc: "Intensive production processes where participants develop games from scratch in a short time.",
        event_snowyjam_title: "Snowy Jam",
        event_snowyjam_desc: "Our Gamejam event organized simultaneously in 10 schools in our community between 10-14 January under the leadership of Numtal Game Dev.",
        event_ggjnext_title: "GGJ Next 2025",
        event_ggjnext_desc: "The 2025 leg of the world's largest game jam organization for young developers. The first physical GGJ Next event in Turkey!",
        event_godot_title: "Godot Training Sponsored by Godot",
        event_godot_desc: "An educational process supported by online lessons and assignments for those who want to step into the world of game development with Godot engine.",
        explore_event: "Explore this event type →",
        
        // Sponsorship
        sponsorship_title: "Partnership & Collaborations",
        sponsorship_text: "LOGD reaches young developers directly through large-scale events such as Global Game Jam NEXT LOGD-IN and offers sustainable collaboration opportunities for brands.",
        
        // GameJams Detail
        gamejams_page_title: "Game Jams",
        gamejams_page_subtitle: "Address of Game Marathons",
        gamejams_header_title: "Game Jams",
        gamejams_header_subtitle: "Address of Game Marathons",
        what_is_it: "What is it?",
        gamejams_what_title: "What is it?",
        gamejams_what_text: "In intensive game development processes lasting 48-72 hours, students produce games from scratch in teams. LOGD takes an active role in national and international Game Jam organizations. In these marathons where tempo, creativity and team spirit meet, students experience real production.",
        gamejams_featured_title: "Featured Game Jams",
        gamejams_list_item1: "Global Game Jam Next - Turkey's largest game jam organization",
        gamejams_list_item2: "LOGD Summer Game Jam - Special event organized in the summer period",
        gamejams_list_item3: "48 Hour Challenge - Fast production oriented marathon",
        gamejams_list_item4: "Theme Based Jams - Special events for different game genres",
        gamejams_contact_btn: "Contact Us",
        featured_gamejams: "Featured Game Jams",
        contact_us: "Contact Us",
        
        // Workshops Detail
        workshops_page_title: "Workshops",
        workshops_page_subtitle: "Learning with Industry Professionals",
        workshops_header_title: "Workshops",
        workshops_header_subtitle: "Learning with Industry Professionals",
        workshops_what_title: "What is it?",
        workshops_what_text: "Workshops with industry professionals, technical trainings, interviews and applied sessions. Interactive trainings that offer the opportunity to learn from professionals allow students to both gain theoretical knowledge and practical experience.",
        workshops_topics_title: "Workshop Topics",
        workshops_list_item1: "2D Game Development Basics with Unity",
        workshops_list_item2: "3D Modeling with Unreal Engine 5",
        workshops_list_item3: "Game Design and Level Design",
        workshops_list_item4: "Character Design and Animation",
        workshops_list_item5: "Game Music and Sound Design",
        workshops_list_item6: "Game Economy and Monetization",
        workshops_contact_btn: "Contact Us",
        workshop_topics: "Workshop Topics",
        
        // Meetups Detail
        meetups_page_title: "Meet-ups",
        meetups_page_subtitle: "Meeting Point for Young Developers",
        meetups_header_title: "Meet-ups",
        meetups_header_subtitle: "Meeting Point for Young Developers",
        meetups_what_title: "What is it?",
        meetups_what_text: "Gatherings where young game developers from all over the city chat, meet and make connections. In these warm meetings where you can make new connections, you can both network and find teammates for joint projects.",
        meetups_formats_title: "Meet-up Formats",
        meetups_format_item1: "Coffee & Code - Coding in a comfortable chat environment",
        meetups_format_item2: "Project Sharing - Opportunity to present your projects",
        meetups_format_item3: "Networking Night - Meeting industry professionals",
        meetups_format_item4: "Game Test Days - Getting your games tested",
        meetups_contact_btn: "Contact Us",
        meetup_formats: "Meet-up Formats",
        
        // DevTalks Detail
        devtalks_page_title: "Dev Talks",
        devtalks_page_subtitle: "Inspiration from Industry Leaders",
        devtalks_header_title: "Dev Talks",
        devtalks_header_subtitle: "Inspiration from Industry Leaders",
        devtalks_what_title: "What is it?",
        devtalks_what_text: "Talks where successful developer teams and industry leaders meet with students. Inspiring talks from experienced industry names share career advice, project development processes and in-industry experiences.",
        devtalks_speakers_title: "Previous Speakers",
        devtalks_speaker_item1: "Can Aksoy - Game Design Director @ Bigger Games",
        devtalks_speaker_item2: "Elif Yilmaz - Lead Programmer @ Gram Games",
        devtalks_speaker_item3: "Murat Demir - CEO @ Peak Games",
        devtalks_speaker_item4: "Selin Kaya - Art Director @ Dream Games",
        devtalks_topics_title: "Dev Talk Topics",
        devtalks_topic_item1: "Career Paths in Game Development",
        devtalks_topic_item2: "Indie Game Development Experiences",
        devtalks_topic_item3: "Success Strategies in the Mobile Game Market",
        devtalks_topic_item4: "Game Studio Founding Stories",
        devtalks_topic_item5: "Competition in the International Market",
        devtalks_topic_item6: "Secrets of Hyper-Casual Games",
        devtalks_contact_btn: "Contact Us",
        previous_speakers: "Previous Speakers",
        devtalk_topics: "Dev Talk Topics",
        
        // Showcase Page
        showcase_page_title: "Showcase",
        showcase_page_subtitle: "Great games developed by the LOGD community",
        showcase_coming_soon_title: "Coming Soon",
        showcase_coming_soon_text: "New games will appear here very soon! Follow the projects developed by our community.",
        showcase_add_game_btn: "Add Your Game",
        showcase_your_project_title: "Your Project Could Be Here",
        showcase_your_project_text: "Would you like to showcase your game in the LOGD showcase? Contact us!",
        showcase_apply_btn: "Apply",
        
        // News Page
        news_title: "News",
        news_subtitle: "Latest news, announcements and event updates from the LOGD community.",
        news_featured_tag: "⭐ IMPORTANT ANNOUNCEMENT",
        news_featured_title: "🎉 LOGD Website is Live!",
        news_featured_date: "📅 February 28, 2025 • ✍️ LOGD Management Team",
        news_featured_text1: "The official website of the High Schools Game Development Association is now live! Our platform, which brings together young game developers from all over Turkey, is now before you with a more professional and user-friendly interface.",
        news_featured_text2: "What's on our new website? You can examine all our events in detail, follow our news and apply for membership immediately. Also, with dark mode support, we offer browsing without eye fatigue!",
        news_featured_features_title: "New features:",
        news_featured_feature1: "✨ Event detail pages and participation forms",
        news_featured_feature2: "📰 News and announcement system",
        news_featured_feature3: "💬 Advanced communication forms",
        news_featured_feature4: "🌙 Dark mode support",
        news_featured_btn: "More Information About LOGD →",
        important_announcement: "⭐ IMPORTANT ANNOUNCEMENT",
        latest_news: "Latest News",
        
        // Contact Page
        contact_title: "Contact",
        contact_subtitle: "Contact us for your questions, suggestions or collaboration requests.",
        general_contact: "General Contact",
        contact_form: "Contact Form",
        full_name: "Full Name *",
        email: "E-mail *",
        your_message: "Your Message *",
        message_placeholder: "Please write your message here...",
        send: "Send",
        sending: "Sending...",
        
        // Footer
        footer_about: "About LOGD",
        footer_text: "High Schools Game Development Association - The most inclusive community for high school game developers in Turkey. We grow the culture of learning, producing and sharing together.",
        footer_quick_menu: "Quick Menu",
        footer_legal: "Legal",
        sponsors_title: "Our Partners",
        footer_copyright: "© 2026 LOGD - High Schools Game Development Association. All rights reserved.",
        social_instagram: "Instagram",
        social_linkedin: "LinkedIn",
        social_twitter: "Twitter",
        social_discord: "Discord",
    }
};

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    const t = translations[lang];
    
    // Navbar
    document.querySelectorAll('.nav-links a').forEach((link, index) => {
        const keys = ['nav_home', 'nav_about', 'nav_events', 'nav_showcase', 'nav_news', 'nav_contact'];
        if (keys[index]) link.textContent = t[keys[index]];
    });
    
    // Countdown
    const countdownTitle = document.getElementById('countdown-title');
    const labelDays = document.getElementById('label-days');
    const labelHours = document.getElementById('label-hours');
    const labelMins = document.getElementById('label-mins');
    if (countdownTitle) countdownTitle.textContent = t.countdown_title;
    if (labelDays) labelDays.textContent = t.label_days;
    if (labelHours) labelHours.textContent = t.label_hours;
    if (labelMins) labelMins.textContent = t.label_mins;
    
    // Home Page
    const introSubtitle = document.getElementById('intro-subtitle');
    const mainTitle = document.getElementById('main-title');
    const subtitle = document.getElementById('subtitle');
    const ctaPrimary = document.getElementById('cta-primary');
    const ctaSecondary = document.getElementById('cta-secondary');
    const aboutTitle = document.getElementById('about-title');
    const aboutDescription = document.querySelector('.about-text');
    const communitiesTitle = document.getElementById('communities-title');
    
    if (introSubtitle) introSubtitle.textContent = t.intro_subtitle;
    if (mainTitle) mainTitle.textContent = t.main_title;
    if (subtitle) subtitle.textContent = t.subtitle;
    if (ctaPrimary) ctaPrimary.textContent = t.cta_primary;
    if (ctaSecondary) ctaSecondary.textContent = t.cta_secondary;
    if (aboutTitle) aboutTitle.textContent = t.about_title;
    if (aboutDescription) aboutDescription.textContent = t.about_description;
    if (communitiesTitle) communitiesTitle.textContent = t.communities_title;
    
    // Events Page cards
    const pageEventSnowyJamTitle = document.getElementById('page-event-snowyjam-title');
    const pageEventSnowyJamDesc = document.getElementById('page-event-snowyjam-desc');
    const pageEventGGJNextTitle = document.getElementById('page-event-ggjnext-title');
    const pageEventGGJNextDesc = document.getElementById('page-event-ggjnext-desc');
    const pageEventGodotTitle = document.getElementById('page-event-godot-title');
    const pageEventGodotDesc = document.getElementById('page-event-godot-desc');

    if (pageEventSnowyJamTitle) pageEventSnowyJamTitle.textContent = t.event_snowyjam_title;
    if (pageEventSnowyJamDesc) pageEventSnowyJamDesc.textContent = t.event_snowyjam_desc;
    if (pageEventGGJNextTitle) pageEventGGJNextTitle.textContent = t.event_ggjnext_title;
    if (pageEventGGJNextDesc) pageEventGGJNextDesc.textContent = t.event_ggjnext_desc;
    if (pageEventGodotTitle) pageEventGodotTitle.textContent = t.event_godot_title;
    if (pageEventGodotDesc) pageEventGodotDesc.textContent = t.event_godot_desc;

    // Secondary Event IDs (for other pages)
    const snowyJamTitle = document.getElementById('event-snowyjam-title');
    const snowyJamDesc = document.getElementById('event-snowyjam-desc');
    if (snowyJamTitle) snowyJamTitle.textContent = t.event_snowyjam_title;
    if (snowyJamDesc) snowyJamDesc.textContent = t.event_snowyjam_desc;

    const ggjNextTitle = document.getElementById('event-ggjnext-title');
    const ggjNextDesc = document.getElementById('event-ggjnext-desc');
    if (ggjNextTitle) ggjNextTitle.textContent = t.event_ggjnext_title;
    if (ggjNextDesc) ggjNextDesc.textContent = t.event_ggjnext_desc;

    const godotTitle = document.getElementById('event-godot-title');
    const godotDesc = document.getElementById('event-godot-desc');
    if (godotTitle) godotTitle.textContent = t.event_godot_title;
    if (godotDesc) godotDesc.textContent = t.event_godot_desc;

    // About Page Content (Support multiple selector types)
    const aboutPageHeader = document.querySelector('#about .page-header h1') || document.getElementById('about-page-title');
    const aboutPageSubtitle = document.querySelector('#about .page-header p') || document.getElementById('about-page-subtitle');
    if (aboutPageHeader) aboutPageHeader.textContent = t.page_about_title;
    if (aboutPageSubtitle) aboutPageSubtitle.textContent = t.page_about_subtitle;
    
    const storyTitleEl = document.querySelector('#about .event-detail-content h3') || document.getElementById('story-title');
    const storyTextEl = document.querySelector('#about .event-detail-content p') || document.getElementById('story-text');
    if (storyTitleEl) storyTitleEl.textContent = t.story_title;
    if (storyTextEl) storyTextEl.textContent = t.story_text;
    
    const visionLabel = document.querySelectorAll('.vm-card h3')[0] || document.getElementById('vision-label');
    const visionText = document.getElementById('vision-text');
    const missionLabel = document.querySelectorAll('.vm-card h3')[1] || document.getElementById('mission-label');
    const missionText = document.getElementById('mission-text');
    
    if (visionLabel) visionLabel.textContent = t.vision_label;
    if (visionText) visionText.textContent = t.vision_text;
    if (missionLabel) missionLabel.textContent = t.mission_label;
    if (missionText) missionText.textContent = t.mission_text;

    // Sponsorship section
    const sponsorshipTitle = document.getElementById('sponsorship-title');
    const sponsorshipText = document.getElementById('sponsorship-text');
    if (sponsorshipTitle) sponsorshipTitle.textContent = t.sponsorship_title;
    if (sponsorshipText) sponsorshipText.textContent = t.sponsorship_text;

    // Showcase Page
    const showcaseHeader = document.getElementById('showcase-title');
    const showcaseSubtitle = document.getElementById('showcase-subtitle');
    const yourProjectHere = document.getElementById('your-project-here');
    const yourProjectText = document.getElementById('your-project-text');
    const apply = document.getElementById('apply');

    if (showcaseHeader) showcaseHeader.textContent = t.showcase_page_title;
    if (showcaseSubtitle) showcaseSubtitle.textContent = t.showcase_page_subtitle;
    if (yourProjectHere) yourProjectHere.textContent = t.your_project_here;
    if (yourProjectText) yourProjectText.textContent = t.your_project_text;
    if (apply) apply.textContent = t.apply_btn;

    // Showcase Projects Mapping
    const projectIDs = [
        'project-1-tag', 'project-1-title', 'project-1-desc', 'project-1-play', 'project-1-details',
        'project-2-tag', 'project-2-title', 'project-2-desc', 'project-2-play', 'project-2-details',
        'project-3-tag', 'project-3-title', 'project-3-desc', 'project-3-play', 'project-3-details'
    ];
    
    projectIDs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id.includes('play')) el.textContent = t.play_btn;
            else if (id.includes('details')) el.textContent = t.details_btn;
            else el.textContent = t[id.replace(/-/g, '_')];
        }
    });

    // Showcase items (from index.html)
    const showcaseIDs = [
        'showcase-coming-soon-title', 'showcase-coming-soon-text', 'showcase-add-game-btn',
        'showcase-your-project-title', 'showcase-your-project-text', 'showcase-apply-btn'
    ];
    showcaseIDs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = t[id.replace(/-/g, '_')];
    });

    // Game Jams Page
    const gamejamsIDs = [
        'gamejams-header-title', 'gamejams-header-subtitle', 'gamejams-what-title', 'gamejams-what-text',
        'gamejams-featured-title', 'gamejams-list-item1', 'gamejams-list-item2', 'gamejams-list-item3',
        'gamejams-list-item4', 'gamejams-contact-btn'
    ];
    gamejamsIDs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = t[id.replace(/-/g, '_')];
    });
    
    // Workshops Page
    const workshopsIDs = [
        'workshops-header-title', 'workshops-header-subtitle', 'workshops-what-title', 'workshops-what-text',
        'workshops-topics-title', 'workshops-list-item1', 'workshops-list-item2', 'workshops-list-item3',
        'workshops-list-item4', 'workshops-list-item5', 'workshops-list-item6', 'workshops-contact-btn'
    ];
    workshopsIDs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = t[id.replace(/-/g, '_')];
    });
    
    // Meetups Page
    const meetupsIDs = [
        'meetups-header-title', 'meetups-header-subtitle', 'meetups-what-title', 'meetups-what-text',
        'meetups-formats-title', 'meetups-format-item1', 'meetups-format-item2', 'meetups-format-item3',
        'meetups-format-item4', 'meetups-contact-btn'
    ];
    meetupsIDs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = t[id.replace(/-/g, '_')];
    });
    
    // DevTalks Page
    const devtalksIDs = [
        'devtalks-header-title', 'devtalks-header-subtitle', 'devtalks-what-title', 'devtalks-what-text',
        'devtalks-speakers-title', 'devtalks-speaker-item1', 'devtalks-speaker-item2', 'devtalks-speaker-item3',
        'devtalks-speaker-item4', 'devtalks-topics-title', 'devtalks-topic-item1', 'devtalks-topic-item2',
        'devtalks-topic-item3', 'devtalks-topic-item4', 'devtalks-topic-item5', 'devtalks-topic-item6',
        'devtalks-contact-btn'
    ];
    devtalksIDs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = t[id.replace(/-/g, '_')];
    });

    // News Page
    const newsTitle = document.getElementById('news-title');
    const newsSubtitle = document.getElementById('news-subtitle');
    const newsFeaturedTag = document.getElementById('news-featured-tag');
    const newsFeaturedTitle = document.getElementById('news-featured-title');
    const newsFeaturedDate = document.getElementById('news-featured-date');
    const newsFeaturedText1 = document.getElementById('news-featured-text1');
    const newsFeaturedText2 = document.getElementById('news-featured-text2');
    const newsFeaturedFeaturesTitle = document.getElementById('news-featured-features-title');
    const newsFeaturedFeature1 = document.getElementById('news-featured-feature1');
    const newsFeaturedFeature2 = document.getElementById('news-featured-feature2');
    const newsFeaturedFeature3 = document.getElementById('news-featured-feature3');
    const newsFeaturedFeature4 = document.getElementById('news-featured-feature4');
    const newsFeaturedBtn = document.getElementById('news-featured-btn');

    if (newsTitle) newsTitle.textContent = t.news_title;
    if (newsSubtitle) newsSubtitle.textContent = t.news_subtitle;
    if (newsFeaturedTag) newsFeaturedTag.textContent = t.news_featured_tag;
    if (newsFeaturedTitle) newsFeaturedTitle.textContent = t.news_featured_title;
    if (newsFeaturedDate) newsFeaturedDate.textContent = t.news_featured_date;
    if (newsFeaturedText1) newsFeaturedText1.textContent = t.news_featured_text1;
    if (newsFeaturedText2) newsFeaturedText2.textContent = t.news_featured_text2;
    if (newsFeaturedFeaturesTitle) newsFeaturedFeaturesTitle.textContent = t.news_featured_features_title;
    if (newsFeaturedFeature1) newsFeaturedFeature1.textContent = t.news_featured_feature1;
    if (newsFeaturedFeature2) newsFeaturedFeature2.textContent = t.news_featured_feature2;
    if (newsFeaturedFeature3) newsFeaturedFeature3.textContent = t.news_featured_feature3;
    if (newsFeaturedFeature4) newsFeaturedFeature4.textContent = t.news_featured_feature4;
    if (newsFeaturedBtn) newsFeaturedBtn.textContent = t.news_featured_btn;

    // Contact Page
    const contactHeader = document.getElementById('contact-title');
    const contactSubtitle = document.getElementById('contact-subtitle');
    const generalContact = document.getElementById('general-contact');
    const contactForm = document.getElementById('contact-form-title');
    const submitBtn = document.getElementById('submit-contact');
    const messageInput = document.getElementById('contact-message-input');
    const contactEmail = document.getElementById('contact-email');

    if (contactHeader) contactHeader.textContent = t.contact_title;
    if (contactSubtitle) contactSubtitle.textContent = t.contact_subtitle;
    if (generalContact) generalContact.textContent = t.general_contact;
    if (contactForm) contactForm.textContent = t.contact_form;
    if (submitBtn && !submitBtn.disabled) submitBtn.textContent = t.send;
    if (messageInput) messageInput.placeholder = t.message_placeholder;
    if (contactEmail) {
        contactEmail.textContent = 'business@izmirlogt.com';
        contactEmail.href = 'mailto:business@izmirlogt.com';
    }

    // Contact form labels
    const formLabels = document.querySelectorAll('.form-group label');
    if (formLabels[0]) formLabels[0].textContent = t.full_name;
    if (formLabels[1]) formLabels[1].textContent = t.email;
    if (formLabels[2]) formLabels[2].textContent = t.your_message;

    // Footer
    const footerAboutTitle = document.getElementById('footer-about-title');
    const footerMenuTitle = document.getElementById('footer-menu-title');
    const footerLegalTitle = document.getElementById('footer-legal-title');
    const footerText = document.getElementById('footer-text');
    const footerCopyright = document.getElementById('footer-copyright');

    if (footerAboutTitle) footerAboutTitle.textContent = t.footer_about;
    if (footerMenuTitle) footerMenuTitle.textContent = t.footer_quick_menu;
    if (footerLegalTitle) footerLegalTitle.textContent = t.footer_legal;
    if (footerText) footerText.textContent = t.footer_text;
    if (footerCopyright) footerCopyright.textContent = t.footer_copyright;

    const sponsorsTitle = document.getElementById('sponsors-title');
    if (sponsorsTitle) sponsorsTitle.textContent = t.sponsors_title;

    const footerLinks = document.querySelectorAll('.footer-links li a');
    if (footerLinks[0]) footerLinks[0].textContent = t.nav_home;
    if (footerLinks[1]) footerLinks[1].textContent = t.nav_about;
    if (footerLinks[2]) footerLinks[2].textContent = t.nav_events;
    if (footerLinks[3]) footerLinks[3].textContent = t.nav_showcase;
    if (footerLinks[4]) footerLinks[4].textContent = t.nav_news;
    if (footerLinks[5]) footerLinks[5].textContent = t.nav_contact;

    const socialIcons = document.querySelectorAll('.social-icon');
    if (socialIcons[0]) socialIcons[0].title = t.social_instagram;
    if (socialIcons[1]) socialIcons[1].title = t.social_linkedin || t.social_twitter;
    if (socialIcons[2]) socialIcons[2].title = t.social_discord;

    // Update config with new language if SDK exists
    if (window.elementSdk && window.elementSdk.config) {
        const newConfig = { ...translations[lang] };
        window.elementSdk.setConfig(newConfig);
    }
}

// SDK Integration Logic
const defaultConfig = {
    language: 'tr',
    ...translations.tr
};

function onConfigChange(newConfig) {
    if (newConfig.language) {
        changeLanguage(newConfig.language);
    }
}

function mapToCapabilities(config) {
    return {
        canEdit: true,
        canDelete: false
    };
}

function mapToEditPanelValues(config) {
    return [
        ["main_title", config.main_title || defaultConfig.main_title],
        ["subtitle", config.subtitle || defaultConfig.subtitle],
        ["cta_primary", config.cta_primary || defaultConfig.cta_primary],
        ["cta_secondary", config.cta_secondary || defaultConfig.cta_secondary],
        ["about_title", config.about_title || defaultConfig.about_title],
        ["footer_text", config.footer_text || defaultConfig.footer_text]
    ];
}

// Countdown Logic
function initCountdown() {
    // Create and inject countdown HTML if it doesn't exist
    if (!document.querySelector('.countdown-hanging-container')) {
        const currentLang = localStorage.getItem('language') || 'tr';
        const t = translations[currentLang];
        
        const countdownHTML = `
            <div class="countdown-hanging-container">
                <div class="chain chain-left"></div>
                <div class="chain chain-right"></div>
                <div class="countdown-sign">
                    <div class="sign-inner">
                        <h3 id="countdown-title">${t.countdown_title}</h3>
                        <div class="timer-grid">
                            <div class="timer-item">
                                <span id="days">00</span>
                                <small id="label-days">${t.label_days}</small>
                            </div>
                            <div class="timer-item">
                                <span id="hours">00</span>
                                <small id="label-hours">${t.label_hours}</small>
                            </div>
                            <div class="timer-item">
                                <span id="minutes">00</span>
                                <small id="label-mins">${t.label_mins}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-transition-overlay">
                <img src="images/logdLogo.png" class="logo-mini" alt="LOGD">
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', countdownHTML);
    }

    const targetDate = new Date('February 13, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            const container = document.querySelector('.countdown-hanging-container');
            if (container) container.style.display = 'none';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 10000); // Update every 10 seconds
}

function initPageTransitions() {
    const links = document.querySelectorAll('a[href$=".html"]');
    const container = document.querySelector('.countdown-hanging-container');
    const overlay = document.querySelector('.page-transition-overlay');

    // Sayfa yüklendiğinde geçiş flag'ini kontrol et
    if (overlay && sessionStorage.getItem('pageTransition') === 'active') {
        // Önce ekran kapalı başlasın (animasyonsuz)
        overlay.classList.add('initial');
        
        // Çok kısa bir süre sonra animasyonu aç ve aşağı doğru kaydır
        setTimeout(() => {
            overlay.classList.remove('initial');
            overlay.classList.add('exit');
            AudioManager.playWind(); // Play sound when curtain opens
            sessionStorage.removeItem('pageTransition'); // Flag'i temizle
        }, 50);
    }

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#' || href === window.location.pathname.split('/').pop()) return;
            
            e.preventDefault();

            // Initialize audio on first user interaction
            AudioManager.init();
            // Play sound when transition starts
            AudioManager.playWind();

            // 1. Tabela düşsün
            if (container) {
                container.classList.add('falling');
            }

            // 2. Perde kapansın
            setTimeout(() => {
                if (overlay) {
                    overlay.classList.remove('exit');
                    overlay.classList.add('active');
                    sessionStorage.setItem('pageTransition', 'active'); // Geçiş flag'ini set et
                }
            }, 500);

            // 3. Sayfa değişsin
            setTimeout(() => {
                window.location.href = href;
            }, 1200);
        });
    });
}

async function initializeApp() {
    initCountdown();
    initPageTransitions();
    // Data SDK initialization
    if (window.dataSdk) {
        try {
            const dataHandler = (data) => {
                console.log("Data SDK update:", data);
            };
            const initResult = await window.dataSdk.init(dataHandler);
            if (!initResult.isOk) {
                console.error("Data SDK initialization failed");
            }
        } catch (e) {
            console.error("Error initializing Data SDK:", e);
        }
    }

    // Element SDK initialization
    if (window.elementSdk) {
        window.elementSdk.init({
            defaultConfig,
            onConfigChange,
            mapToCapabilities,
            mapToEditPanelValues
        });
    }

    // Language selector initialization
    const languageSelector = document.getElementById('language-selector');
    const savedLanguage = localStorage.getItem('language') || 'tr';

    if (languageSelector) {
        languageSelector.value = savedLanguage;
        changeLanguage(savedLanguage);
        
        languageSelector.addEventListener('change', (e) => {
            AudioManager.init(); // Initialize audio on interaction
            changeLanguage(e.target.value);
        });
    }
}

// Hamburger menu logic
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            AudioManager.init(); // Initialize audio on interaction
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            AudioManager.init(); // Initialize audio on interaction
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});

// Contact form handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-contact');
        submitBtn.disabled = true;
        const currentLang = localStorage.getItem('language') || 'tr';
        submitBtn.textContent = translations[currentLang].sending;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://formsubmit.co/ajax/aydintolga008@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const successMsg = currentLang === 'tr' ? '✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.' : '✅ Your message has been sent successfully! We will get back to you as soon as possible.';
                alert(successMsg);
                contactForm.reset();
            } else {
                const errorMsg = currentLang === 'tr' ? '❌ Bir hata oluştu. Lütfen tekrar deneyin.' : '❌ An error occurred. Please try again.';
                alert(errorMsg);
            }
        } catch (error) {
            const errorMsg = currentLang === 'tr' ? '❌ Bir hata oluştu. Lütfen tekrar deneyin.' : '❌ An error occurred. Please try again.';
            alert(errorMsg);
        }

        submitBtn.disabled = false;
        submitBtn.textContent = translations[currentLang].send;
    });
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Simplified navigateTo for backwards compatibility
function navigateTo(pageId) {
    const pageMap = {
        'home': 'index.html',
        'about': 'hakkimizda.html',
        'events': 'etkinlikler.html',
        'showcase': 'showcase.html',
        'news': 'haberler.html',
        'contact': 'iletisim.html'
    };
    if (pageMap[pageId]) {
        window.location.href = pageMap[pageId];
    }
}
