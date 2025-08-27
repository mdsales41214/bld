// Enhanced Live Data Dashboard for BuyLeadData.com
// Fixed freezing issue and improved animations

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    console.log('🚀 Initializing Enhanced Live Data Dashboard...');

    // Country data with proper number formatting
    const countryData = {
        'United States': {
            flag: '🇺🇸',
            baseValue: 4234567,
            industries: {
                all: 4234567,
                marketing: 867432,
                software: 734291,
                recruitment: 467832,
                consulting: 534219,
                realestate: 689123,
                finance: 587654,
                healthcare: 412983
            }
        },
        'United Kingdom': {
            flag: '🇬🇧',
            baseValue: 1823456,
            industries: {
                all: 1823456,
                marketing: 387654,
                software: 324891,
                recruitment: 254673,
                consulting: 284567,
                realestate: 223874,
                finance: 203456,
                healthcare: 154321
            }
        },
        'Germany': {
            flag: '🇩🇪',
            baseValue: 1534789,
            industries: {
                all: 1534789,
                marketing: 287543,
                software: 356789,
                recruitment: 184523,
                consulting: 224671,
                realestate: 204398,
                finance: 173456,
                healthcare: 103409
            }
        },
        'France': {
            flag: '🇫🇷',
            baseValue: 1234567,
            industries: {
                all: 1234567,
                marketing: 245673,
                software: 184329,
                recruitment: 154298,
                consulting: 194567,
                realestate: 164782,
                finance: 144329,
                healthcare: 146589
            }
        },
        'Netherlands': {
            flag: '🇳🇱',
            baseValue: 654321,
            industries: {
                all: 654321,
                marketing: 123456,
                software: 114789,
                recruitment: 87432,
                consulting: 97654,
                realestate: 82341,
                finance: 92187,
                healthcare: 72463
            }
        },
        'Italy': {
            flag: '🇮🇹',
            baseValue: 912345,
            industries: {
                all: 912345,
                marketing: 184672,
                software: 124583,
                recruitment: 113674,
                consulting: 143829,
                realestate: 154672,
                finance: 123456,
                healthcare: 82459
            }
        },
        'Spain': {
            flag: '🇪🇸',
            baseValue: 767834,
            industries: {
                all: 767834,
                marketing: 154329,
                software: 103478,
                recruitment: 92841,
                consulting: 113672,
                realestate: 124583,
                finance: 103456,
                healthcare: 82475
            }
        },
        'Canada': {
            flag: '🇨🇦',
            baseValue: 823456,
            industries: {
                all: 823456,
                marketing: 164738,
                software: 144672,
                recruitment: 103485,
                consulting: 123847,
                realestate: 113629,
                finance: 103456,
                healthcare: 72849
            }
        },
        'Australia': {
            flag: '🇦🇺',
            baseValue: 623745,
            industries: {
                all: 623745,
                marketing: 124738,
                software: 103486,
                recruitment: 82745,
                consulting: 93847,
                realestate: 92756,
                finance: 83456,
                healthcare: 42717
            }
        },
        'Sweden': {
            flag: '🇸🇪',
            baseValue: 367842,
            industries: {
                all: 367842,
                marketing: 73567,
                software: 82394,
                recruitment: 47283,
                consulting: 52748,
                realestate: 42785,
                finance: 37264,
                healthcare: 31801
            }
        },
        'Norway': {
            flag: '🇳🇴',
            baseValue: 294758,
            industries: {
                all: 294758,
                marketing: 58394,
                software: 62847,
                recruitment: 37582,
                consulting: 42758,
                realestate: 37294,
                finance: 32758,
                healthcare: 27125
            }
        },
        'Denmark': {
            flag: '🇩🇰',
            baseValue: 334789,
            industries: {
                all: 334789,
                marketing: 67845,
                software: 73284,
                recruitment: 42758,
                consulting: 47839,
                realestate: 42785,
                finance: 37294,
                healthcare: 27984
            }
        }
    };

    // Current values for live updates
    let currentValues = {};
    Object.keys(countryData).forEach(country => {
        currentValues[country] = {};
        Object.keys(countryData[country].industries).forEach(industry => {
            currentValues[country][industry] = countryData[country].industries[industry];
        });
    });

    // Live counters with large numbers
    const liveCounters = {
        'total-leads': { base: 12834267, variance: 5000, trend: 'up' },
        'growth-rate': { base: 2.3, variance: 0.5, decimals: 1, trend: 'up' },
        'local-regions': { base: 869, variance: 3, trend: 'mixed' },
        'map-total-leads': { base: 12834267, variance: 5000, trend: 'up' },
        'all-count': { base: 12834267, variance: 5000, trend: 'up' },
        'marketing-count': { base: 2156832, variance: 1200, trend: 'up' },
        'software-count': { base: 1847291, variance: 1000, trend: 'up' },
        'recruitment-count': { base: 1523847, variance: 800, trend: 'up' },
        'consulting-count': { base: 1367521, variance: 700, trend: 'up' },
        'realestate-count': { base: 2234987, variance: 1100, trend: 'up' },
        'finance-count': { base: 1789432, variance: 900, trend: 'up' },
        'healthcare-count': { base: 1834756, variance: 950, trend: 'up' },
        'total-leads-summary': { base: 12834267, variance: 5000, trend: 'up' },
        'daily-added': { base: 1247, variance: 50, trend: 'up' }
    };

    let currentIndustry = 'all';
    let liveUpdateIntervals = [];
    let isRunning = false;

    // Helper function to format numbers with commas
    function formatNumber(num, decimals = 0) {
        if (decimals > 0) {
            return num.toFixed(decimals);
        }
        
        return Math.round(num).toLocaleString('en-US');
    }

    // Enhanced smooth number animation
    function animateNumberChange(element, newValue, isIncrease, decimals = 0) {
        element.classList.remove('trend-up', 'trend-down', 'updating');
        
        // Force reflow
        element.offsetHeight;
        
        requestAnimationFrame(() => {
            element.classList.add('updating');
            if (isIncrease) {
                element.classList.add('trend-up');
            } else {
                element.classList.add('trend-down');
            }
            
            setTimeout(() => {
                element.textContent = formatNumber(newValue, decimals);
                
                setTimeout(() => {
                    element.classList.remove('updating', 'trend-up', 'trend-down');
                }, 800);
            }, 200);
        });
    }

    // Update live counter with enhanced animation
    function updateLiveCounter(id) {
        const element = document.getElementById(id);
        const config = liveCounters[id];
        
        if (!element || !config) return;

        const oldValue = config.base;
        let trend = 1;
        
        if (config.trend === 'mixed') {
            // For regions: mostly up, sometimes down
            trend = Math.random() > 0.25 ? 1 : -1;
        } else if (config.trend === 'up') {
            trend = Math.random() > 0.15 ? 1 : -1; // 85% chance up
        }
        
        const changePercent = (Math.random() * 0.008 + 0.001) * trend; // 0.1-0.9% change
        const change = config.base * changePercent;
        const newValue = Math.max(0, config.base + change);
        
        const isIncrease = newValue > oldValue;
        
        // Update base for next calculation
        config.base = newValue;
        
        // Animate the change
        animateNumberChange(element, newValue, isIncrease, config.decimals || 0);
        
        // Update trend arrow for regions
        if (id === 'local-regions') {
            const trendArrow = document.getElementById('regions-trend');
            if (trendArrow) {
                trendArrow.className = `trend-arrow ${isIncrease ? 'trend-up' : 'trend-down'}`;
                trendArrow.textContent = isIncrease ? '↗' : '↘';
            }
        }
    }

    // Start live data updates
    function startLiveUpdates() {
        if (isRunning) return;
        isRunning = true;
        console.log('📊 Starting live data updates...');

        // Update different counters at different intervals
        Object.keys(liveCounters).forEach((id, index) => {
            const interval = setInterval(() => {
                updateLiveCounter(id);
            }, 2500 + (index * 200) + Math.random() * 2000);
            
            liveUpdateIntervals.push(interval);
        });

        // Update country data
        const countryInterval = setInterval(() => {
            updateCountryData();
        }, 4500 + Math.random() * 1500);
        
        liveUpdateIntervals.push(countryInterval);
    }

    // Stop live updates
    function stopLiveUpdates() {
        isRunning = false;
        liveUpdateIntervals.forEach(interval => clearInterval(interval));
        liveUpdateIntervals = [];
        console.log('⏸️ Live data updates stopped');
    }

    // Update country data values
    function updateCountryData() {
        Object.keys(countryData).forEach(country => {
            Object.keys(countryData[country].industries).forEach(industry => {
                const baseValue = countryData[country].industries[industry];
                const variance = baseValue * 0.0008; // 0.08% max change
                const trend = Math.random() > 0.35 ? 1 : -1; // 65% upward trend
                const change = (Math.random() * variance * trend);
                
                const newValue = Math.max(
                    baseValue * 0.97,
                    Math.min(
                        baseValue * 1.03,
                        currentValues[country][industry] + change
                    )
                );
                
                currentValues[country][industry] = newValue;
            });
        });
        
        refreshCountryCards();
    }

    // Refresh country card displays with animation
    function refreshCountryCards() {
        const countryCards = document.querySelectorAll('.country-card');
        countryCards.forEach(card => {
            const countryName = card.querySelector('.country-name')?.textContent;
            const leadCountElement = card.querySelector('.lead-count');
            
            if (countryName && leadCountElement && currentValues[countryName]) {
                const oldValue = parseFloat(leadCountElement.textContent.replace(/,/g, ''));
                const currentValue = currentValues[countryName][currentIndustry];
                
                if (currentValue && Math.abs(currentValue - oldValue) > 10) {
                    const isIncrease = currentValue > oldValue;
                    animateNumberChange(leadCountElement, currentValue, isIncrease);
                }
            }
        });
    }

    // Render country cards with debounced click handling
    function renderCountries() {
        const countryGrid = document.querySelector('.country-grid');
        if (!countryGrid) return;

        countryGrid.innerHTML = '<div class="loading">Loading live data...</div>';
        
        setTimeout(() => {
            let totalLeads = 0;
            const fragment = document.createDocumentFragment();

            Object.entries(countryData).forEach(([country, data]) => {
                const leads = Math.round(currentValues[country][currentIndustry]);
                totalLeads += leads;

                const countryCard = document.createElement('div');
                countryCard.className = 'country-card';
                
                countryCard.innerHTML = `
                    <div class="country-flag">${data.flag}</div>
                    <div class="country-name">${country}</div>
                    <div class="lead-count live-counter">${formatNumber(leads)}</div>
                    <div class="country-industries">
                        ${currentIndustry === 'all' ? 'All Industries' : 
                          currentIndustry.charAt(0).toUpperCase() + currentIndustry.slice(1)}
                    </div>
                    <div class="country-live-indicator">
                        <div class="pulse-dot"></div>
                        <span>Live</span>
                    </div>
                `;

                // Fixed click handling with proper debouncing
                let clickTimeout;
                const handleClick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (clickTimeout) return;
                    
                    clickTimeout = setTimeout(() => {
                        showCountryDetail(country, data);
                        clickTimeout = null;
                    }, 100);
                };

                countryCard.addEventListener('click', handleClick, { passive: false });
                countryCard.addEventListener('touchend', handleClick, { passive: false });

                fragment.appendChild(countryCard);
            });

            countryGrid.innerHTML = '';
            countryGrid.appendChild(fragment);

            // Update total leads display
            const totalElement = document.getElementById('total-leads-summary');
            if (totalElement) {
                totalElement.textContent = formatNumber(totalLeads);
            }
        }, 300);
    }

    // Show country detail modal with fixed implementation
    function showCountryDetail(countryName, data) {
        const modal = document.getElementById('countryDetail');
        const overlay = document.getElementById('modalOverlay');
        const content = modal?.querySelector('.detail-content');

        if (!modal || !overlay || !content) {
            console.warn('Modal elements not found');
            return;
        }

        const leads = Math.round(currentValues[countryName][currentIndustry]);
        
        // Build content safely
        const headerHTML = `
            <div class="detail-header" style="text-align: center; margin-bottom: 30px;">
                <div class="detail-flag" style="font-size: 48px; margin-bottom: 15px;">${data.flag}</div>
                <h3 style="font-size: 24px; font-weight: 700; color: #0B1B3F; margin: 16px 0;">${countryName}</h3>
                <div class="detail-leads" style="font-size: 20px; font-weight: 700; color: #3A8DFF; margin-bottom: 20px;">${formatNumber(leads)} leads</div>
            </div>
        `;
        
        const breakdownItems = Object.entries(data.industries)
            .filter(([key]) => key !== 'all')
            .map(([industry, count]) => {
                const currentValue = Math.round(currentValues[countryName][industry]);
                return `
                    <div class="breakdown-item" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(58, 141, 255, 0.1);">
                        <span class="industry-name" style="font-weight: 600; color: #374151;">${industry.charAt(0).toUpperCase() + industry.slice(1)}</span>
                        <span class="industry-count" style="font-family: 'SF Mono', monospace; font-weight: 700; color: #3A8DFF;">${formatNumber(currentValue)}</span>
                    </div>
                `;
            }).join('');
        
        const breakdownHTML = `
            <div class="detail-breakdown" style="margin: 30px 0;">
                <h4 style="font-size: 18px; font-weight: 600; color: #374151; margin-bottom: 20px; text-align: center;">Live Industry Breakdown:</h4>
                <div class="breakdown-list" style="background: rgba(248, 250, 252, 0.5); border-radius: 12px; padding: 20px;">
                    ${breakdownItems}
                </div>
            </div>
        `;
        
        const ctaHTML = `
            <div class="detail-cta" style="text-align: center; margin-top: 30px;">
                <button class="detail-btn" style="background: linear-gradient(135deg, #3A8DFF 0%, #06B6D4 100%); color: white; border: none; padding: 16px 32px; border-radius: 50px; font-weight: 700; cursor: pointer; width: 100%; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;" onclick="window.open('https://buy.stripe.com/5kQ28q0Ezb8g1WU5Cu6J20M', '_blank')">
                    Get ${countryName} Leads
                </button>
            </div>
        `;

        content.innerHTML = headerHTML + breakdownHTML + ctaHTML;

        // Show modal with proper handling
        requestAnimationFrame(() => {
            overlay.style.display = 'block';
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            console.log(`Modal opened for ${countryName}`);
        });
    }

    // Close modal
    function closeModal() {
        const modal = document.getElementById('countryDetail');
        const overlay = document.getElementById('modalOverlay');
        
        if (modal && overlay) {
            requestAnimationFrame(() => {
                overlay.style.display = 'none';
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                console.log('Modal closed');
            });
        }
    }

    // Setup industry tabs
    function setupIndustryTabs() {
        const tabs = document.querySelectorAll('.industry-tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (tab.classList.contains('active')) return;
                
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                currentIndustry = tab.dataset.industry;
                
                stopLiveUpdates();
                renderCountries();
                
                setTimeout(() => startLiveUpdates(), 1000);
            });
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        const closeBtn = document.getElementById('closeModal');
        const overlay = document.getElementById('modalOverlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeModal();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        const seeMoreBtn = document.querySelector('.see-more-btn');
        if (seeMoreBtn) {
            seeMoreBtn.addEventListener('click', () => {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Visibility API for performance
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopLiveUpdates();
        } else {
            setTimeout(() => startLiveUpdates(), 1000);
        }
    });

    // Initialize dashboard
    function initializeDashboard() {
        console.log('🚀 Initializing Enhanced Live Data Dashboard...');
        
        setupIndustryTabs();
        setupEventListeners();
        renderCountries();
        
        setTimeout(() => {
            startLiveUpdates();
            console.log('📊 Live data updates started');
        }, 1500);
        
        console.log('✅ Dashboard initialized successfully');
    }

    // Start the dashboard
    initializeDashboard();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        stopLiveUpdates();
    });
});