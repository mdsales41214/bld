<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trendyol Otomatik Fiyat Takibi - FiyatTakipci | Rakip Fiyat Analizi Aracı</title>
    <meta name="description" content="Trendyol, Hepsiburada ve N11'de otomatik fiyat takibi yapın. Rakip fiyat analizi ile Buy Box kazanın. 7 gün ücretsiz deneyin. Günde 1000+ ürün takibi.">
    <meta name="keywords" content="trendyol fiyat takibi, rakip fiyat analizi, otomatik fiyat takibi, trendyol otomatik fiyatlandırma, hepsiburada fiyat takibi, n11 fiyat takibi, buy box kazanma, e-ticaret fiyat takip programı">
    
    <!-- Open Graph -->
    <meta property="og:title" content="FiyatTakipci - Trendyol Otomatik Fiyat Takibi">
    <meta property="og:description" content="Türkiye'nin en hızlı fiyat takip aracı. Trendyol, Hepsiburada, N11'de rakiplerinizi takip edin.">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="tr_TR">
    
    <!-- Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "FiyatTakipci",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "149",
        "priceCurrency": "TRY"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127"
      }
    }
    </script>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #ffffff;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header */
        header {
            background: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: #ff6b35;
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }
        
        .nav-links a {
            color: #4a4a4a;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: #ff6b35;
        }
        
        .cta-button {
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(255, 107, 53, 0.3);
        }
        
        /* Hero Section */
        .hero {
            padding: 4rem 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            line-height: 1.2;
        }
        
        .hero-subtitle {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }
        
        .hero-features {
            display: flex;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .hero-feature {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .checkmark {
            width: 20px;
            height: 20px;
            background: #4ade80;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .hero-cta {
            display: flex;
            gap: 1rem;
            align-items: center;
        }
        
        .primary-btn {
            background: white;
            color: #764ba2;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.3s;
        }
        
        .primary-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
        
        .trust-text {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .demo-image {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .dashboard-preview {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;
            min-height: 300px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .stat-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }
        
        .stat-card {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .stat-label {
            color: #6b7280;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
        }
        
        .stat-value {
            color: #1a1a1a;
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        /* Features Section */
        .features {
            padding: 5rem 0;
            background: #f8f9fa;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 3rem;
        }
        
        .section-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #1a1a1a;
        }
        
        .section-subtitle {
            font-size: 1.2rem;
            color: #6b7280;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }
        
        .feature-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
        }
        
        .feature-title {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: #1a1a1a;
        }
        
        .feature-description {
            color: #6b7280;
            line-height: 1.6;
        }
        
        /* Marketplaces Section */
        .marketplaces {
            padding: 4rem 0;
            background: white;
        }
        
        .marketplace-logos {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }
        
        .marketplace-logo {
            padding: 1.5rem 2rem;
            background: #f8f9fa;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1.2rem;
            color: #4a4a4a;
            transition: all 0.3s;
        }
        
        .marketplace-logo:hover {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            transform: scale(1.05);
        }
        
        /* Pricing Section */
        .pricing {
            padding: 5rem 0;
            background: #f8f9fa;
        }
        
        .pricing-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .pricing-card {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            position: relative;
            transition: transform 0.3s;
        }
        
        .pricing-card.featured {
            transform: scale(1.05);
            box-shadow: 0 12px 24px rgba(0,0,0,0.1);
        }
        
        .pricing-card.featured::before {
            content: 'EN POPÜLER';
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            color: white;
            padding: 0.25rem 1rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
        }
        
        .pricing-card:hover {
            transform: translateY(-5px);
        }
        
        .plan-name {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #1a1a1a;
        }
        
        .plan-price {
            font-size: 3rem;
            font-weight: 700;
            color: #764ba2;
            margin-bottom: 0.5rem;
        }
        
        .plan-price span {
            font-size: 1rem;
            color: #6b7280;
        }
        
        .plan-description {
            color: #6b7280;
            margin-bottom: 2rem;
        }
        
        .plan-features {
            list-style: none;
            margin-bottom: 2rem;
        }
        
        .plan-features li {
            padding: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .plan-button {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .plan-button:hover {
            transform: scale(1.02);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        /* How It Works */
        .how-it-works {
            padding: 5rem 0;
            background: white;
        }
        
        .steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .step {
            text-align: center;
            position: relative;
        }
        
        .step-number {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 auto 1.5rem;
        }
        
        .step-title {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: #1a1a1a;
        }
        
        .step-description {
            color: #6b7280;
        }
        
        /* Testimonials */
        .testimonials {
            padding: 5rem 0;
            background: #f8f9fa;
        }
        
        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .testimonial {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .stars {
            color: #fbbf24;
            margin-bottom: 1rem;
        }
        
        .testimonial-text {
            color: #4a4a4a;
            margin-bottom: 1.5rem;
            font-style: italic;
        }
        
        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .author-avatar {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
        }
        
        .author-info {
            flex: 1;
        }
        
        .author-name {
            font-weight: 600;
            color: #1a1a1a;
        }
        
        .author-role {
            color: #6b7280;
            font-size: 0.875rem;
        }
        
        /* FAQ Section */
        .faq {
            padding: 5rem 0;
            background: white;
        }
        
        .faq-container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .faq-item {
            background: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 1rem;
            overflow: hidden;
        }
        
        .faq-question {
            padding: 1.5rem;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            color: #1a1a1a;
            transition: background 0.3s;
        }
        
        .faq-question:hover {
            background: #e5e7eb;
        }
        
        .faq-answer {
            padding: 0 1.5rem 1.5rem;
            color: #6b7280;
            display: none;
        }
        
        .faq-item.active .faq-answer {
            display: block;
        }
        
        .faq-toggle {
            font-size: 1.5rem;
            transition: transform 0.3s;
        }
        
        .faq-item.active .faq-toggle {
            transform: rotate(45deg);
        }
        
        /* CTA Section */
        .cta-section {
            padding: 5rem 0;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            text-align: center;
        }
        
        .cta-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .cta-subtitle {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }
        
        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        /* Footer */
        footer {
            background: #1a1a1a;
            color: white;
            padding: 3rem 0 1rem;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .footer-column h4 {
            margin-bottom: 1rem;
        }
        
        .footer-column ul {
            list-style: none;
        }
        
        .footer-column a {
            color: #9ca3af;
            text-decoration: none;
            line-height: 2;
            transition: color 0.3s;
        }
        
        .footer-column a:hover {
            color: white;
        }
        
        .footer-bottom {
            border-top: 1px solid #374151;
            padding-top: 2rem;
            text-align: center;
            color: #9ca3af;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero-content {
                grid-template-columns: 1fr;
            }
            
            .hero h1 {
                font-size: 2rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .hero-features {
                flex-direction: column;
                gap: 1rem;
            }
            
            .cta-buttons {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <nav class="container">
            <a href="#" class="logo">FiyatTakipci 📊</a>
            <ul class="nav-links">
                <li><a href="#ozellikler">Özellikler</a></li>
                <li><a href="#fiyatlandirma">Fiyatlandırma</a></li>
                <li><a href="#nasil-calisir">Nasıl Çalışır?</a></li>
                <li><a href="#sss">S.S.S</a></li>
            </ul>
            <a href="#" class="cta-button">Ücretsiz Dene</a>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div>
                    <h1>Trendyol'da Otomatik Fiyat Takibi ile Buy Box'ı Kazanın</h1>
                    <p class="hero-subtitle">Rakiplerinizin fiyatlarını 7/24 takip edin, otomatik fiyatlandırma ile satışlarınızı %40 artırın</p>
                    
                    <div class="hero-features">
                        <div class="hero-feature">
                            <div class="checkmark">✓</div>
                            <span>Günde 1000+ ürün takibi</span>
                        </div>
                        <div class="hero-feature">
                            <div class="checkmark">✓</div>
                            <span>15 dakikada bir güncelleme</span>
                        </div>
                    </div>
                    
                    <div class="hero-cta">
                        <a href="#" class="primary-btn">7 Gün Ücretsiz Dene</a>
                        <p class="trust-text">Kredi kartı gerekmez • 2 dakikada kurulum</p>
                    </div>
                </div>
                
                <div class="demo-image">
                    <div class="dashboard-preview">
                        <div class="stat-row">
                            <div class="stat-card">
                                <div class="stat-label">Takip Edilen Ürün</div>
                                <div class="stat-value" style="color: #667eea;">1,247</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Buy Box Kazanım</div>
                                <div class="stat-value" style="color: #4ade80;">87%</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-label">Günlük Tasarruf</div>
                                <div class="stat-value" style="color: #ff6b35;">₺3,450</div>
                            </div>
                        </div>
                        <div style="background: white; padding: 1rem; border-radius: 8px; flex: 1;">
                            <div style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.5rem;">Fiyat Değişim Grafiği</div>
                            <div style="display: flex; align-items: flex-end; gap: 0.5rem; height: 120px;">
                                <div style="background: #667eea; width: 30px; height: 60%;"></div>
                                <div style="background: #764ba2; width: 30px; height: 80%;"></div>
                                <div style="background: #667eea; width: 30px; height: 70%;"></div>
                                <div style="background: #4ade80; width: 30px; height: 90%;"></div>
                                <div style="background: #667eea; width: 30px; height: 75%;"></div>
                                <div style="background: #764ba2; width: 30px; height: 85%;"></div>
                                <div style="background: #4ade80; width: 30px; height: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Marketplaces Section -->
    <section class="marketplaces">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Tüm Pazaryerlerinde Rakip Takibi</h2>
                <p class="section-subtitle">Türkiye'nin en büyük e-ticaret platformlarında fiyat takibi yapın</p>
            </div>
            
            <div class="marketplace-logos">
                <div class="marketplace-logo">Trendyol</div>
                <div class="marketplace-logo">Hepsiburada</div>
                <div class="marketplace-logo">N11</div>
                <div class="marketplace-logo">Amazon TR</div>
                <div class="marketplace-logo">Çiçeksepeti</div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="ozellikler">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Güçlü Özellikler</h2>
                <p class="section-subtitle">E-ticaret satışlarınızı optimize etmek için ihtiyacınız olan her şey</p>
            </div>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <h3 class="feature-title">Otomatik Buy Box Takibi</h3>
                    <p class="feature-description">Trendyol Buy Box algoritmasını takip edin, rakiplerinizin fiyatlarına göre otomatik pozisyon alın</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3 class="feature-title">15 Dakikada Bir Güncelleme</h3>
                    <p class="feature-description">Fiyat değişikliklerini anında yakalayın, rakiplerinizden önce hareket edin</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">📈</div>
                    <h3 class="feature-title">Detaylı Fiyat Geçmişi</h3>
                    <p class="feature-description">90 güne kadar fiyat geçmişini görün, trend analizleri yapın</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🔔</div>
                    <h3 class="feature-title">Anlık Bildirimler</h3>
                    <p class="feature-description">Rakip fiyat değişikliklerinde SMS ve e-posta bildirimleri alın</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🤖</div>
                    <h3 class="feature-title">Akıllı Fiyatlandırma</h3>
                    <p class="feature-description">Min-max fiyat aralığı belirleyin, sistem otomatik fiyat güncellesin</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h3 class="feature-title">Satış Analizi</h3>
                    <p class="feature-description">Hangi fiyatlarda daha çok sattığınızı görün, kar marjınızı optimize edin</p>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works" id="nasil-calisir">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Nasıl Çalışır?</h2>
                <p class="section-subtitle">3 basit adımda fiyat takibine başlayın</p>
            </div>
            
            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <h3 class="step-title">Ürünlerinizi Ekleyin</h3>
                    <p class="step-description">Trendyol mağaza entegrasyonu ile tüm ürünlerinizi tek tıkla içe aktarın</p>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <h3 class="step-title">Kuralları Belirleyin</h3>
                    <p class="step-description">Minimum ve maksimum fiyat aralıklarınızı, takip stratejinizi ayarlayın</p>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <h3 class="step-title">Otomatik Takip Başlasın</h3>
                    <p class="step-description">Sistem 7/24 rakiplerinizi takip edip, fiyatlarınızı otomatik günceller</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing" id="fiyatlandirma">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Basit ve Şeffaf Fiyatlandırma</h2>
                <p class="section-subtitle">İşletmenize uygun paketi seçin, hemen kullanmaya başlayın</p>
            </div>
            
            <div class="pricing-cards">
                <div class="pricing-card">
                    <h3 class="plan-name">Başlangıç</h3>
                    <div class="plan-price">₺149 <span>/ ay</span></div>
                    <p class="plan-description">Küçük işletmeler için ideal</p>
                    
                    <ul class="plan-features">
                        <li><span class="checkmark">✓</span> 100 ürün takibi</li>
                        <li><span class="checkmark">✓</span> Saatte 1 güncelleme</li>
                        <li><span class="checkmark">✓</span> Trendyol entegrasyonu</li>
                        <li><span class="checkmark">✓</span> E-posta bildirimleri</li>
                        <li><span class="checkmark">✓</span> 7 günlük geçmiş</li>
                    </ul>
                    
                    <button class="plan-button">Paketi Seç</button>
                </div>
                
                <div class="pricing-card featured">
                    <h3 class="plan-name">Profesyonel</h3>
                    <div class="plan-price">₺349 <span>/ ay</span></div>
                    <p class="plan-description">Büyüyen işletmeler için</p>
                    
                    <ul class="plan-features">
                        <li><span class="checkmark">✓</span> 500 ürün takibi</li>
                        <li><span class="checkmark">✓</span> 15 dakikada bir güncelleme</li>
                        <li><span class="checkmark">✓</span> Tüm pazaryeri entegrasyonları</li>
                        <li><span class="checkmark">✓</span> SMS + E-posta bildirimleri</li>
                        <li><span class="checkmark">✓</span> 30 günlük geçmiş</li>
                        <li><span class="checkmark">✓</span> API erişimi</li>
                    </ul>
                    
                    <button class="plan-button">Paketi Seç</button>
                </div>
                
                <div class="pricing-card">
                    <h3 class="plan-name">Kurumsal</h3>
                    <div class="plan-price">₺749 <span>/ ay</span></div>
                    <p class="plan-description">Büyük işletmeler için</p>
                    
                    <ul class="plan-features">
                        <li><span class="checkmark">✓</span> Sınırsız ürün takibi</li>
                        <li><span class="checkmark">✓</span> 5 dakikada bir güncelleme</li>
                        <li><span class="checkmark">✓</span> Özel entegrasyonlar</li>
                        <li><span class="checkmark">✓</span> Whatsapp bildirimleri</li>
                        <li><span class="checkmark">✓</span> 90 günlük geçmiş</li>
                        <li><span class="checkmark">✓</span> Özel destek</li>
                    </ul>
                    
                    <button class="plan-button">İletişime Geç</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Müşterilerimiz Ne Diyor?</h2>
                <p class="section-subtitle">500+ e-ticaret satıcısı FiyatTakipci ile satışlarını artırdı</p>
            </div>
            
            <div class="testimonial-grid">
                <div class="testimonial">
                    <div class="stars">★★★★★</div>
                    <p class="testimonial-text">"FiyatTakipci sayesinde Trendyol'da Buy Box kazanma oranım %40'tan %85'e çıktı. Artık fiyat takibi için saatler harcamıyorum."</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">AY</div>
                        <div class="author-info">
                            <div class="author-name">Ahmet Yılmaz</div>
                            <div class="author-role">Elektronik Satıcısı</div>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial">
                    <div class="stars">★★★★★</div>
                    <p class="testimonial-text">"Otomatik fiyatlandırma özelliği muhteşem. Gece uyurken bile rakiplerimin önünde olduğumu biliyorum."</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">SK</div>
                        <div class="author-info">
                            <div class="author-name">Selin Kara</div>
                            <div class="author-role">Kozmetik Mağazası</div>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial">
                    <div class="stars">★★★★★</div>
                    <p class="testimonial-text">"3 ayda satışlarım %60 arttı. Minimum fiyat koruması sayesinde kar marjım da korunuyor."</p>
                    <div class="testimonial-author">
                        <div class="author-avatar">MÖ</div>
                        <div class="author-info">
                            <div class="author-name">Mehmet Öztürk</div>
                            <div class="author-role">Giyim Satıcısı</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq" id="sss">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Sıkça Sorulan Sorular</h2>
                <p class="section-subtitle">FiyatTakipci hakkında merak edilenler</p>
            </div>
            
            <div class="faq-container">
                <div class="faq-item">
                    <div class="faq-question">
                        FiyatTakipci nasıl çalışır?
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        FiyatTakipci, Trendyol ve diğer pazaryerlerindeki rakip satıcıların fiyatlarını otomatik olarak takip eder. Belirlediğiniz kurallara göre fiyatlarınızı günceller ve Buy Box kazanmanıza yardımcı olur. Sistem 7/24 çalışır ve size anlık bildirimler gönderir.
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        Hangi pazaryerlerini destekliyorsunuz?
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        Trendyol, Hepsiburada, N11, Amazon TR ve Çiçeksepeti'ni destekliyoruz. Yakında GittiGidiyor ve Morhipo entegrasyonları da eklenecek.
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        Minimum fiyat koruması var mı?
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        Evet, her ürün için minimum ve maksimum fiyat belirleyebilirsiniz. Sistem hiçbir zaman belirlediğiniz minimum fiyatın altına inmez, kar marjınız korunur.
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        Ücretsiz deneme süresi var mı?
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        Evet, 7 günlük ücretsiz deneme sunuyoruz. Kredi kartı bilgisi gerekmez. Deneme süresince tüm özellikleri kullanabilirsiniz.
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        API entegrasyonu var mı?
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        Profesyonel ve Kurumsal paketlerimizde REST API sunuyoruz. Kendi sistemlerinizle entegre edebilir, özel çözümler geliştirebilirsiniz.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <h2 class="cta-title">Rakiplerinizin Önüne Geçmeye Hazır mısınız?</h2>
            <p class="cta-subtitle">7 gün ücretsiz deneyin, satışlarınızı artırın</p>
            <div class="cta-buttons">
                <a href="#" class="primary-btn">Hemen Başla</a>
                <a href="#" class="primary-btn" style="background: transparent; border: 2px solid white;">Demo İste</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <h4>FiyatTakipci</h4>
                    <p style="color: #9ca3af; line-height: 1.6;">Türkiye'nin en hızlı ve güvenilir e-ticaret fiyat takip platformu. 500+ satıcının güvendiği çözüm.</p>
                </div>
                
                <div class="footer-column">
                    <h4>Özellikler</h4>
                    <ul>
                        <li><a href="#">Trendyol Fiyat Takibi</a></li>
                        <li><a href="#">Otomatik Fiyatlandırma</a></li>
                        <li><a href="#">Buy Box Optimizasyonu</a></li>
                        <li><a href="#">Rakip Analizi</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h4>Kaynaklar</h4>
                    <ul>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">API Dokümantasyonu</a></li>
                        <li><a href="#">Yardım Merkezi</a></li>
                        <li><a href="#">Video Eğitimler</a></li>
                    </ul>
                </div>
                
                <div class="footer-column">
                    <h4>İletişim</h4>
                    <ul>
                        <li><a href="#">destek@fiyattakipci.com</a></li>
                        <li><a href="#">0850 123 45 67</a></li>
                        <li><a href="#">Canlı Destek</a></li>
                        <li><a href="#">WhatsApp</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 FiyatTakipci. Tüm hakları saklıdır. | <a href="#" style="color: #9ca3af;">Gizlilik Politikası</a> | <a href="#" style="color: #9ca3af;">Kullanım Şartları</a></p>
            </div>
        </div>
    </footer>

    <script>
        // FAQ Toggle
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('active');
            });
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Animated Counter
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.textContent = Math.floor(progress * (end - start) + start).toLocaleString('tr-TR');
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Trigger animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statValues = entry.target.querySelectorAll('.stat-value');
                    statValues.forEach(stat => {
                        const value = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                        animateValue(stat, 0, value, 2000);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.stat-row').forEach(row => {
            observer.observe(row);
        });
    </script>
</body>
</html>