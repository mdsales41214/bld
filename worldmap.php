  <!-- Industry Filter Tabs -->
        <div class="industry-tabs">
            <button class="industry-tab active" data-industry="all">
                <span class="tab-icon">🌍</span>
                All Industries <span class="count live-counter" id="all-count">(12.4M)</span>
            </button>
            <button class="industry-tab" data-industry="marketing">
                <span class="tab-icon">📈</span>
                Marketing <span class="count live-counter" id="marketing-count">(2.1M)</span>
            </button>
            <button class="industry-tab" data-industry="software">
                <span class="tab-icon">💻</span>
                Software/SaaS <span class="count live-counter" id="software-count">(1.8M)</span>
            </button>
            <button class="industry-tab" data-industry="recruitment">
                <span class="tab-icon">👥</span>
                Recruitment <span class="count live-counter" id="recruitment-count">(1.5M)</span>
            </button>
            <button class="industry-tab" data-industry="consulting">
                <span class="tab-icon">📊</span>
                Consulting <span class="count live-counter" id="consulting-count">(1.3M)</span>
            </button>
            <button class="industry-tab" data-industry="realestate">
                <span class="tab-icon">🏠</span>
                Real Estate <span class="count live-counter" id="realestate-count">(2.2M)</span>
            </button>
            <button class="industry-tab" data-industry="finance">
                <span class="tab-icon">💰</span>
                Finance <span class="count live-counter" id="finance-count">(1.7M)</span>
            </button>
            <button class="industry-tab" data-industry="healthcare">
                <span class="tab-icon">⚕️</span>
                Healthcare <span class="count live-counter" id="healthcare-count">(1.8M)</span>
            </button>
        </div>
        
        <!-- Country Cards will be dynamically generated -->
        <div class="country-grid">
            <!-- JavaScript will populate this -->
        </div>
        
        <!-- Stats Summary -->
        <div class="stats-summary">
            <div class="summary-stat">
                <div class="summary-value live-counter" id="total-leads-summary">12.4M</div>
                <div class="summary-label">Total Leads Available</div>
                <div class="summary-trend">
                    <span class="trend-arrow">↗</span>
                    <span class="live-counter" id="daily-added">1.2k</span> added today
                </div>
            </div>
            <div class="summary-stat">
                <div class="summary-value">45</div>
                <div class="summary-label">Countries Covered</div>
                <div class="summary-trend">
                    <span class="trend-arrow">↗</span>
                    Global expansion
                </div>
            </div>
            <div class="summary-stat">
                <div class="summary-value">8</div>
                <div class="summary-label">Major Industries</div>
                <div class="summary-trend">
                    <span class="trend-arrow">↗</span>
                    Complete coverage
                </div>
            </div>
            <div class="summary-stat">
                <div class="summary-value">Weekly</div>
                <div class="summary-label">Data Updates</div>
                <div class="summary-trend">
                    <span class="trend-arrow">↗</span>
                    Fresh data guaranteed
                </div>
            </div>
        </div>
        
        <!-- See More Countries -->
        <div class="more-countries">
            <button class="see-more-btn">
                View All 45 Countries
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    </div>

    <!-- Country Detail Modal -->
    <div class="modal-overlay" id="modalOverlay"></div>
    <div class="country-detail" id="countryDetail">
        <button class="close-modal" id="closeModal">×</button>
        <div class="detail-content">
            <!-- Content will be dynamically inserted -->
        </div>
    </div>
</section>