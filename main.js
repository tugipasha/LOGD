const defaultConfig = {
            main_title: "Liseli geliştiricilerin oyun dünyasına açılan kapısı",
            subtitle: "Türkiye'nin dört bir yanındaki genç oyun geliştiricileri bir araya getiriyor, öğrenme ve üretme kültürünü büyütüyoruz.",
            cta_primary: "Etkinliklere Göz At",
            cta_secondary: "Haberleri Gör",
            about_title: "LOGD Nedir?",
            vision_text: "Genç oyun geliştiriciler için Türkiye'nin en büyük destek ağı olmak.",
            mission_text: "Öğrencilerin öğrenme, üretme ve paylaşma fırsatlarını artırmak. Oyun geliştirme kültürünü yaymak. Sektörle öğrenciler arasındaki köprüyü güçlendirmek.",
            news_title: "Haberler",
            contact_email: "info@logd.org.tr",
            footer_text: "Liseler Oyun Geliştirme Derneği - Türkiye'nin liseli oyun geliştiricileri için en kapsayıcı topluluk. Öğrenme, üretme ve paylaşma kültürünü birlikte büyütüyoruz.",
            background_color: "#FAFAFA",
            primary_color: "#5856D6",
            secondary_color: "#7648EE",
            text_color: "#1A1A1A",
            accent_color: "#3AAFFF"
        };

        let currentRecordCount = 0;
        const dataHandler = {
            onDataChanged(data) {
                currentRecordCount = data.length;
            }
        };

        async function onConfigChange(config) {
            const elements = {
                'main-title': config.main_title,
                'subtitle': config.subtitle,
                'cta-primary': config.cta_primary,
                'cta-secondary': config.cta_secondary,
                'about-title': config.about_title,
                'vision-text': config.vision_text,
                'mission-text': config.mission_text,
                'news-title': config.news_title,
                'footer-text': config.footer_text
            };

            Object.entries(elements).forEach(([id, value]) => {
                const el = document.getElementById(id);
                if (el) el.textContent = value || defaultConfig[id.replace(/-/g, '_')];
            });

            const contactEmailEl = document.getElementById('contact-email');
            if (contactEmailEl) {
                contactEmailEl.textContent = config.contact_email || defaultConfig.contact_email;
                contactEmailEl.href = `mailto:${config.contact_email || defaultConfig.contact_email}`;
            }

            const backgroundColor = config.background_color || defaultConfig.background_color;
            const primaryColor = config.primary_color || defaultConfig.primary_color;
            const secondaryColor = config.secondary_color || defaultConfig.secondary_color;
            const textColor = config.text_color || defaultConfig.text_color;

            document.body.style.background = backgroundColor;
            document.body.style.color = textColor;

            const gradientSelectors = '.logo, .hero-content h1, .stat-number, .section-title';
            document.querySelectorAll(gradientSelectors).forEach(el => {
                el.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
                el.style.webkitBackgroundClip = 'text';
                el.style.webkitTextFillColor = 'transparent';
                el.style.backgroundClip = 'text';
            });

            document.querySelectorAll('.btn-primary').forEach(btn => {
                btn.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
            });

            document.querySelectorAll('.btn-secondary').forEach(btn => {
                btn.style.color = primaryColor;
                btn.style.borderColor = primaryColor;
            });

            document.querySelectorAll('.footer, .page-header').forEach(el => {
                el.style.background = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;
            });
        }

        function navigateTo(page) {
            const currentPage = document.querySelector('.page.active');
            
            if (currentPage && currentPage.id !== page) {
                currentPage.classList.add('fade-out');
                setTimeout(() => {
                    currentPage.classList.remove('active', 'fade-out');
                    
                    const pageEl = document.getElementById(page);
                    if (pageEl) pageEl.classList.add('active');
                    
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }, 400);
            } else {
                const pageEl = document.getElementById(page);
                if (pageEl) pageEl.classList.add('active');
            }
            
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            const navLink = document.querySelector(`.nav-links a[data-page="${page}"]`);
            if (navLink) navLink.classList.add('active');
        }

        function showMessage(containerId, message, isError = false) {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `<div class="${isError ? 'error-message' : 'success-message'}">${message}</div>`;
                setTimeout(() => container.innerHTML = '', 5000);
            }
        }

        // Contact form handler
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (currentRecordCount >= 999) {
                    showMessage('contact-message', 'Maksimum 999 mesaj limitine ulaşıldı. Lütfen e-posta ile iletişime geçiniz.', true);
                    return;
                }

                const submitBtn = document.getElementById('submit-contact');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Gönderiliyor...';

                const formData = {
                    id: Date.now().toString(),
                    name: document.getElementById('contact-name').value,
                    email: document.getElementById('contact-email-input').value,
                    message: document.getElementById('contact-message-input').value,
                    type: 'contact',
                    school: '',
                    grade: '',
                    role: '',
                    discord_id: '',
                    description: '',
                    created_at: new Date().toISOString()
                };

                const result = await window.dataSdk.create(formData);

                if (result.isOk) {
                    showMessage('contact-message', '✅ Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
                    contactForm.reset();
                } else {
                    showMessage('contact-message', '❌ Bir hata oluştu. Lütfen tekrar deneyin.', true);
                }

                submitBtn.disabled = false;
                submitBtn.textContent = 'Gönder';
            });
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [
                    {
                        get: () => config.background_color || defaultConfig.background_color,
                        set: (value) => {
                            config.background_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ background_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.primary_color || defaultConfig.primary_color,
                        set: (value) => {
                            config.primary_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ primary_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.secondary_color || defaultConfig.secondary_color,
                        set: (value) => {
                            config.secondary_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ secondary_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.text_color || defaultConfig.text_color,
                        set: (value) => {
                            config.text_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ text_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.accent_color || defaultConfig.accent_color,
                        set: (value) => {
                            config.accent_color = value;
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ accent_color: value });
                            }
                        }
                    }
                ],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ["main_title", config.main_title || defaultConfig.main_title],
                ["subtitle", config.subtitle || defaultConfig.subtitle],
                ["cta_primary", config.cta_primary || defaultConfig.cta_primary],
                ["cta_secondary", config.cta_secondary || defaultConfig.cta_secondary],
                ["about_title", config.about_title || defaultConfig.about_title],
                ["vision_text", config.vision_text || defaultConfig.vision_text],
                ["mission_text", config.mission_text || defaultConfig.mission_text],
                ["news_title", config.news_title || defaultConfig.news_title],
                ["contact_email", config.contact_email || defaultConfig.contact_email],
                ["footer_text", config.footer_text || defaultConfig.footer_text]
            ]);
        }

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

        async function initializeApp() {
            if (window.dataSdk) {
                const initResult = await window.dataSdk.init(dataHandler);
                if (!initResult.isOk) {
                    console.error("Data SDK initialization failed");
                }
            }

            if (window.elementSdk) {
                window.elementSdk.init({
                    defaultConfig,
                    onConfigChange,
                    mapToCapabilities,
                    mapToEditPanelValues
                });
            }
        }

        initializeApp();
