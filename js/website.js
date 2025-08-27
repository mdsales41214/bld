// script.js - JavaScript for website.php
// Wrapped in IIFE to avoid global namespace conflicts

(function() {
    'use strict';

    // Number Animation Class
    class NumberAnimator {
    constructor() {
        this.animations = new Map();
    }

    animateValue(element, start, end, duration = 2000) {
        if (this.animations.has(element)) {
            cancelAnimationFrame(this.animations.get(element));
        }

        const startTimestamp = Date.now();
        const step = (timestamp) => {
            const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentValue = Math.floor(easeOutExpo * (end - start) + start);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                const animationId = requestAnimationFrame(step);
                this.animations.set(element, animationId);
            } else {
                this.animations.delete(element);
            }
        };
        
        const animationId = requestAnimationFrame(step);
        this.animations.set(element, animationId);
    }

    animatePercentage(element, start, end, duration = 2000) {
        const startTimestamp = Date.now();
        const step = () => {
            const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentValue = (easeOutExpo * (end - start) + start).toFixed(1);
            
            element.textContent = currentValue + '%';
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }
}

// Global animator instance
const animator = new NumberAnimator();

// Website data storage - using let to allow reassignment
let websiteData = [];
let autoRefreshTimer = null;
let countdownInterval = null;
let countdownValue = 60;

// Initialize default data - make sure this is unique
const defaultWebsiteData = [
    { name: 'Netflix', domain: 'Netflix.com', status: 'up', time: '45 mins ago', icon: '🎬' },
    { name: 'Facebook', domain: 'Facebook.com', status: 'up', time: '0 seconds ago', icon: '👥' },
    { name: 'Youtube', domain: 'Youtube.com', status: 'up', time: '1 min ago', icon: '📺' },
    { name: 'Yahoo Mail', domain: 'Mail.yahoo.com', status: 'up', time: '13 mins ago', icon: '📧' },
    { name: 'Google', domain: 'Google.com', status: 'up', time: '36 mins ago', icon: '🔍' },
    { name: 'Outlook', domain: 'Outlook.com', status: 'up', time: '13 mins ago', icon: '📨' },
    { name: 'Steam Community', domain: 'Steamcommunity.com', status: 'up', time: '2 hours 18 mins ago', icon: '🎮' },
    { name: 'Yahoo', domain: 'Yahoo.com', status: 'up', time: '26 mins ago', icon: '🌐' },
    { name: 'WhatsApp', domain: 'Whatsapp.com', status: 'down', time: '3 mins ago', icon: '💬' },
    { name: 'Windows Live', domain: 'Live.com', status: 'down', time: '16 mins ago', icon: '🪟' },
    { name: 'Instagram', domain: 'Instagr.am', status: 'up', time: '0 seconds ago', icon: '📷' },
    { name: 'Gmail', domain: 'Mail.google.com', status: 'up', time: '42 mins ago', icon: '📧' },
    { name: 'Dropbox', domain: 'Dropbox.com', status: 'up', time: '5 mins ago', icon: '📦' },
    { name: 'Battle Net', domain: 'Battle.net', status: 'up', time: '35 mins ago', icon: '⚔️' },
    { name: 'Reddit', domain: 'Reddit.com', status: 'down', time: '34 mins ago', icon: '🤖' },
    { name: 'FanFiction', domain: 'Fanfiction.net', status: 'up', time: '1 hour 1 min ago', icon: '📚' },
    { name: 'Amazon', domain: 'Amazon.com', status: 'up', time: '6 mins ago', icon: '📦' },
    { name: 'Pinterest', domain: 'Pinterest.com', status: 'up', time: '4 hours 52 mins ago', icon: '📌' },
    { name: 'Twitter', domain: 'Twitter.com', status: 'down', time: '17 mins ago', icon: '🐦' },
    { name: 'Tumblr', domain: 'Tumblr.com', status: 'up', time: '41 mins ago', icon: '📝' },
    { name: 'Xbox', domain: 'Xbox.com', status: 'up', time: '2 hours 15 mins ago', icon: '🎯' },
    { name: 'AOL', domain: 'Aol.com', status: 'up', time: '12 mins ago', icon: '📮' },
    { name: 'Minecraft', domain: 'Minecraft.net', status: 'up', time: '26 mins ago', icon: '⛏️' },
    { name: 'Comcast', domain: 'Comcast.com', status: 'down', time: '28 mins ago', icon: '📡' },
    { name: 'PayPal', domain: 'Paypal.com', status: 'up', time: '22 mins ago', icon: '💳' }
];

const latestChecked = [
    { domain: 'rockauto.com', name: 'Rockauto', status: 'up', time: '0 seconds ago' },
    { domain: 'facebook.com', name: 'Facebook', status: 'up', time: '0 seconds ago' },
    { domain: 'sofifa.com', name: 'Sofifa', status: 'up', time: '2 secs ago' },
    { domain: 'turkcell.com.tr', name: 'Turkcell', status: 'up', time: '6 secs ago' },
    { domain: 'character.ai', name: 'Character AI', status: 'up', time: '17 secs ago' }
];

const recentComments = [
    { author: 'Becca Thompson', site: 'regions.com', text: 'Down in Atlanta, GA...' },
    { author: 'Debbie Burton Porter', site: 'ancestry.com', text: 'Down, cannot access....' },
    { author: 'Sheila Merrill', site: 'mail.google.com', text: 'My gmail is down. 12/14/18 9:18 am...' },
    { author: 'Mark Wade', site: 'amazon.com', text: 'Unable to access Amazon.com 6:40p et...' }
];

// Display websites in grid
function displayWebsites(websites = defaultWebsiteData) {
    const grid = document.getElementById('websitesGrid');
    grid.innerHTML = '';
    
    websites.forEach((site, index) => {
        setTimeout(() => {
            const item = createWebsiteItem(site);
            grid.appendChild(item);
            item.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }, index * 50);
    });
    
    updateStatistics(websites);
}

// Create website item element
function createWebsiteItem(site) {
    const div = document.createElement('div');
    div.className = `website-item status-${site.status}`;
    div.innerHTML = `
        <div class="website-icon">${site.icon || '🌐'}</div>
        <div class="website-name">${site.name}</div>
        <div class="website-domain">${site.domain}</div>
        <div class="status-badge">
            <span class="status-indicator"></span>
            ${site.status === 'up' ? '✓ ONLINE' : '✗ OFFLINE'}
        </div>
        <div class="check-time">Checked ${site.time}</div>
    `;
    return div;
}

// Update statistics with animation
function updateStatistics(websites = websiteData) {
    const total = websites.length;
    const upCount = websites.filter(site => site.status === 'up').length;
    const downCount = total - upCount;
    const uptime = total > 0 ? (upCount / total * 100) : 0;
    
    const totalElement = document.getElementById('totalSites');
    const upElement = document.getElementById('sitesUp');
    const downElement = document.getElementById('sitesDown');
    const uptimeElement = document.getElementById('uptimePercentage');
    
    if (totalElement) {
        animator.animateValue(totalElement, 0, total, 1500);
    }
    if (upElement) {
        animator.animateValue(upElement, 0, upCount, 1500);
    }
    if (downElement) {
        animator.animateValue(downElement, 0, downCount, 1500);
    }
    if (uptimeElement) {
        animator.animatePercentage(uptimeElement, 0, uptime, 1500);
    }
}

// Display latest checked sites
function displayLatestChecked() {
    const list = document.getElementById('latestList');
    list.innerHTML = latestChecked.map((site, index) => `
        <div class="latest-item" style="animation-delay: ${index * 0.1}s">
            <span class="latest-domain">${site.domain}</span> - ${site.name}
            <div class="latest-status status-${site.status}">
                Server is ${site.status}. Last checked ${site.time}.
            </div>
        </div>
    `).join('');
}

// Display comments
function displayComments() {
    const comments = document.getElementById('commentsList');
    comments.innerHTML = recentComments.map((comment, index) => `
        <div class="comment-item" style="animation-delay: ${index * 0.1}s">
            <div class="comment-author">
                ${comment.author}
                <span class="comment-site">${comment.site}</span>
            </div>
            <div class="comment-text">${comment.text}</div>
        </div>
    `).join('');
}

// Fetch live data from PHP backend
async function fetchLiveData() {
    const grid = document.getElementById('websitesGrid');
    const refreshBtn = document.querySelector('.refresh-btn');
    
    // Show loading state
    grid.innerHTML = `
        <div class="loading" style="grid-column: 1/-1;">
            <div class="spinner"></div>
            <p>Fetching live data from isitdownrightnow.com...</p>
        </div>
    `;
    
    if (refreshBtn) {
        refreshBtn.classList.add('refreshing');
    }
    
    try {
        // Call PHP backend
        const response = await fetch('website.php?action=fetch');
        const data = await response.json();
        
        if (data.success && data.websites && data.websites.length > 0) {
            websiteData = data.websites.map(site => ({
                ...site,
                icon: getWebsiteIcon(site.name)
            }));
            displayWebsites(websiteData);
            showNotification('Data refreshed successfully!', 'success');
        } else {
            // Use default data if no results
            displayWebsites(defaultWebsiteData);
            showNotification('Using cached data', 'info');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        displayWebsites(defaultWebsiteData);
        showNotification('Failed to fetch live data, showing cached results', 'error');
    } finally {
        if (refreshBtn) {
            setTimeout(() => {
                refreshBtn.classList.remove('refreshing');
            }, 1000);
        }
        resetCountdown();
    }
}

// Check specific website
async function checkWebsite() {
    const input = document.getElementById('domainInput');
    const resultDiv = document.getElementById('searchResult');
    const domain = input.value.trim();
    
    if (!domain) {
        showNotification('Please enter a domain name', 'error');
        return;
    }
    
    resultDiv.innerHTML = '<div class="spinner"></div> Checking...';
    resultDiv.className = 'search-result show';
    
    try {
        const response = await fetch(`website.php?check=${encodeURIComponent(domain)}`);
        const data = await response.json();
        
        if (data.success) {
            const statusClass = data.status === 'up' ? 'success' : 'error';
            const statusIcon = data.status === 'up' ? '✓' : '✗';
            const statusText = data.status === 'up' ? 'ONLINE' : 'OFFLINE';
            
            resultDiv.className = `search-result show ${statusClass}`;
            resultDiv.innerHTML = `
                <strong>${statusIcon} ${domain}</strong> is ${statusText}
                <br><small>Checked at ${new Date(data.checked).toLocaleTimeString()}</small>
            `;
            
            // Add to latest checked
            latestChecked.unshift({
                domain: domain,
                name: domain.split('.')[0],
                status: data.status,
                time: '0 seconds ago'
            });
            latestChecked.splice(5); // Keep only 5 latest
            displayLatestChecked();
        }
    } catch (error) {
        resultDiv.className = 'search-result show error';
        resultDiv.innerHTML = '✗ Error checking website status';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3500);
}

// Get website icon based on name
function getWebsiteIcon(name) {
    const icons = {
        'Netflix': '🎬', 'Facebook': '👥', 'Youtube': '📺', 'Google': '🔍',
        'Amazon': '📦', 'Twitter': '🐦', 'Instagram': '📷', 'WhatsApp': '💬',
        'Reddit': '🤖', 'Gmail': '📧', 'Steam': '🎮', 'Xbox': '🎯',
        'PayPal': '💳', 'Spotify': '🎵', 'Discord': '💬', 'Dropbox': '📦',
        'Pinterest': '📌', 'Tumblr': '📝', 'Minecraft': '⛏️'
    };
    
    for (const [key, icon] of Object.entries(icons)) {
        if (name.toLowerCase().includes(key.toLowerCase())) {
            return icon;
        }
    }
    return '🌐';
}

// Auto-refresh countdown
function startAutoRefresh() {
    stopAutoRefresh();
    countdownValue = 60;
    
    countdownInterval = setInterval(() => {
        countdownValue--;
        const element = document.getElementById('refreshCountdown');
        if (element) {
            element.textContent = `Auto-refresh in ${countdownValue}s`;
        }
        
        if (countdownValue <= 0) {
            fetchLiveData();
        }
    }, 1000);
}

function stopAutoRefresh() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
}

function resetCountdown() {
    stopAutoRefresh();
    startAutoRefresh();
}

// Random status flip for realism
function randomStatusFlip() {
    const items = document.querySelectorAll('.website-item');
    if (items.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * items.length);
    const item = items[randomIndex];
    const badge = item.querySelector('.status-badge');
    const name = item.querySelector('.website-name').textContent;
    
    if (item.classList.contains('status-up')) {
        item.classList.remove('status-up');
        item.classList.add('status-down');
        badge.innerHTML = '<span class="status-indicator"></span> ✗ OFFLINE';
        showNotification(`${name} is now offline`, 'error');
    } else {
        item.classList.remove('status-down');
        item.classList.add('status-up');
        badge.innerHTML = '<span class="status-indicator"></span> ✓ ONLINE';
        showNotification(`${name} is back online`, 'success');
    }
    
    // Update time
    const checkTime = item.querySelector('.check-time');
    if (checkTime) {
        checkTime.textContent = 'Checked 0 seconds ago';
    }
    
    // Update statistics
    const websites = Array.from(document.querySelectorAll('.website-item')).map(el => ({
        status: el.classList.contains('status-up') ? 'up' : 'down'
    }));
    updateStatistics(websites);
}

// Update times dynamically
function updateTimes() {
    document.querySelectorAll('.check-time').forEach(element => {
        const text = element.textContent;
        if (text.includes('0 seconds ago')) {
            element.textContent = 'Checked 1 second ago';
        } else if (text.includes('second ago') && !text.includes('seconds')) {
            const seconds = parseInt(text.match(/\d+/)?.[0] || 0);
            if (seconds < 59) {
                element.textContent = `Checked ${seconds + 1} seconds ago`;
            } else {
                element.textContent = 'Checked 1 min ago';
            }
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Display initial data
    displayWebsites(defaultWebsiteData);
    displayLatestChecked();
    displayComments();
    
    // Start auto-refresh
    startAutoRefresh();
    
    // Update times every second
    setInterval(updateTimes, 1000);
    
    // Random status flip every 15-30 seconds
    setInterval(() => {
        if (Math.random() > 0.7) {
            randomStatusFlip();
        }
    }, 20000);
    
    // Add enter key support for search
    document.getElementById('domainInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkWebsite();
        }
    });
});

    // Handle page visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoRefresh();
        } else {
            startAutoRefresh();
        }
    });

    // Make functions available globally if needed
    window.fetchLiveData = fetchLiveData;
    window.checkWebsite = checkWebsite;

})(); // End of IIFE