/* AI Status Checker JavaScript */
/* Place in: /public_html/js/aistatus.js */

// AI Services Data
const aiServices = [
    // Chat AI
    { name: 'ChatGPT', category: 'chat', icon: '💬', status: 'operational', responseTime: 234, uptime: 99.9, url: 'https://chat.openai.com' },
    { name: 'Claude', category: 'chat', icon: '🤖', status: 'operational', responseTime: 189, uptime: 100, url: 'https://claude.ai' },
    { name: 'Gemini', category: 'chat', icon: '✨', status: 'operational', responseTime: 312, uptime: 99.8, url: 'https://gemini.google.com' },
    { name: 'Copilot', category: 'chat', icon: '🚁', status: 'operational', responseTime: 267, uptime: 99.7, url: 'https://copilot.microsoft.com' },
    { name: 'Perplexity', category: 'chat', icon: '🔍', status: 'operational', responseTime: 198, uptime: 99.9, url: 'https://www.perplexity.ai' },
    { name: 'Poe', category: 'chat', icon: '🎭', status: 'operational', responseTime: 245, uptime: 99.6, url: 'https://poe.com' },
    
    // Image AI
    { name: 'Midjourney', category: 'image', icon: '🎨', status: 'operational', responseTime: 567, uptime: 99.5, url: 'https://www.midjourney.com' },
    { name: 'DALL-E', category: 'image', icon: '🖼️', status: 'operational', responseTime: 892, uptime: 99.3, url: 'https://openai.com/dall-e' },
    { name: 'Stable Diffusion', category: 'image', icon: '🌊', status: 'operational', responseTime: 445, uptime: 99.7, url: 'https://stability.ai' },
    { name: 'Leonardo AI', category: 'image', icon: '🎭', status: 'operational', responseTime: 523, uptime: 99.4, url: 'https://leonardo.ai' },
    { name: 'Runway', category: 'image', icon: '✈️', status: 'operational', responseTime: 678, uptime: 99.2, url: 'https://runwayml.com' },
    
    // Code AI
    { name: 'GitHub Copilot', category: 'code', icon: '👨‍💻', status: 'operational', responseTime: 145, uptime: 99.95, url: 'https://github.com/features/copilot' },
    { name: 'Replit AI', category: 'code', icon: '🔧', status: 'operational', responseTime: 167, uptime: 99.8, url: 'https://replit.com' },
    { name: 'Cursor', category: 'code', icon: '📝', status: 'operational', responseTime: 123, uptime: 99.9, url: 'https://cursor.sh' },
    { name: 'Tabnine', category: 'code', icon: '⚡', status: 'operational', responseTime: 98, uptime: 99.85, url: 'https://www.tabnine.com' },
    { name: 'Amazon CodeWhisperer', category: 'code', icon: '🌟', status: 'operational', responseTime: 156, uptime: 99.7, url: 'https://aws.amazon.com/codewhisperer' },
    
    // APIs
    { name: 'OpenAI API', category: 'api', icon: '🔌', status: 'operational', responseTime: 89, uptime: 99.99, url: 'https://platform.openai.com' },
    { name: 'Anthropic API', category: 'api', icon: '🔗', status: 'operational', responseTime: 76, uptime: 99.98, url: 'https://www.anthropic.com' },
    { name: 'Cohere API', category: 'api', icon: '🌐', status: 'operational', responseTime: 92, uptime: 99.95, url: 'https://cohere.ai' },
    { name: 'Hugging Face', category: 'api', icon: '🤗', status: 'operational', responseTime: 134, uptime: 99.9, url: 'https://huggingface.co' },
    { name: 'Replicate', category: 'api', icon: '🔄', status: 'operational', responseTime: 112, uptime: 99.92, url: 'https://replicate.com' },
    
    // Other
    { name: 'Character AI', category: 'other', icon: '👥', status: 'operational', responseTime: 256, uptime: 99.6, url: 'https://character.ai' },
    { name: 'Jasper', category: 'other', icon: '✍️', status: 'operational', responseTime: 289, uptime: 99.5, url: 'https://www.jasper.ai' },
    { name: 'Notion AI', category: 'other', icon: '📔', status: 'operational', responseTime: 178, uptime: 99.8, url: 'https://www.notion.so' },
    { name: 'Grammarly', category: 'other', icon: '📝', status: 'operational', responseTime: 145, uptime: 99.9, url: 'https://www.grammarly.com' },
    { name: 'Copy.ai', category: 'other', icon: '📋', status: 'operational', responseTime: 223, uptime: 99.7, url: 'https://www.copy.ai' },
    { name: 'Writesonic', category: 'other', icon: '🚀', status: 'operational', responseTime: 198, uptime: 99.6, url: 'https://writesonic.com' },
    { name: 'Synthesia', category: 'other', icon: '🎬', status: 'operational', responseTime: 456, uptime: 99.4, url: 'https://www.synthesia.io' }
];

// Recent incidents data
const recentIncidents = [
    {
        service: 'ChatGPT',
        time: '2 hours ago',
        description: 'Brief service interruption affecting API responses. Resolved within 15 minutes.',
        resolved: true
    },
    {
        service: 'Midjourney',
        time: '5 hours ago',
        description: 'Slow image generation times due to high demand. Performance restored.',
        resolved: true
    },
    {
        service: 'Claude',
        time: '1 day ago',
        description: 'Scheduled maintenance completed successfully. No user impact.',
        resolved: true
    }
];

// Global variables
let currentFilter = 'all';
let searchTerm = '';
let chart = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeServices();
    initializeFilters();
    initializeSearch();
    initializeChart();
    displayIncidents();
    updateStats();
    startAutoRefresh();
    simulateRandomChanges();
});

// Initialize services grid
function initializeServices() {
    renderServices();
}

// Render services based on filter and search
function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filteredServices = aiServices.filter(service => {
        const matchesFilter = currentFilter === 'all' || service.category === currentFilter;
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });
    
    filteredServices.forEach(service => {
        const card = createServiceCard(service);
        grid.appendChild(card);
    });
    
    // Update overall status
    updateOverallStatus();
}

// Create service card element
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.setAttribute('data-category', service.category);
    
    // Randomly assign some services different statuses for demo
    const statuses = ['operational', 'operational', 'operational', 'degraded', 'down'];
    const randomStatus = Math.random() > 0.9 ? statuses[Math.floor(Math.random() * statuses.length)] : service.status;
    
    card.innerHTML = `
        <div class="service-icon">${service.icon}</div>
        <div class="service-header">
            <div class="service-name">${service.name}</div>
            <div class="service-status">
                <span class="status-dot ${randomStatus}"></span>
                <span class="status-label">${getStatusLabel(randomStatus)}</span>
            </div>
        </div>
        <div class="service-details">
            <div class="detail">
                <span class="detail-label">Response Time</span>
                <span class="detail-value">${service.responseTime}ms</span>
            </div>
            <div class="detail">
                <span class="detail-label">Uptime (24h)</span>
                <span class="detail-value">${service.uptime}%</span>
            </div>
        </div>
    `;
    
    // Add click event
    card.addEventListener('click', () => {
        showServiceDetails(service);
    });
    
    return card;
}

// Get status label text
function getStatusLabel(status) {
    const labels = {
        operational: 'Operational',
        degraded: 'Degraded',
        down: 'Down'
    };
    return labels[status] || 'Unknown';
}

// Initialize filter tabs
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter and re-render
            currentFilter = this.getAttribute('data-filter');
            renderServices();
        });
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchTerm = this.value;
            renderServices();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
}

// Perform search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchTerm = searchInput.value;
        renderServices();
        
        // Show toast
        showToast(`Searching for "${searchTerm}"...`);
    }
}

// Initialize uptime chart
function initializeChart() {
    const ctx = document.getElementById('uptimeChart');
    if (!ctx) return;
    
    const hours = Array.from({length: 24}, (_, i) => {
        const hour = new Date();
        hour.setHours(hour.getHours() - (23 - i));
        return hour.getHours() + ':00';
    });
    
    const data = {
        labels: hours,
        datasets: [{
            label: 'Overall Uptime %',
            data: Array.from({length: 24}, () => 98 + Math.random() * 2),
            borderColor: '#3A8DFF',
            backgroundColor: 'rgba(58, 141, 255, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 95,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    };
    
    if (typeof Chart !== 'undefined') {
        chart = new Chart(ctx, config);
    }
}

// Display recent incidents
function displayIncidents() {
    const incidentsList = document.getElementById('incidentsList');
    if (!incidentsList) return;
    
    if (recentIncidents.length === 0) {
        incidentsList.innerHTML = '<div class="no-incidents">No recent incidents reported</div>';
        return;
    }
    
    incidentsList.innerHTML = '';
    recentIncidents.forEach(incident => {
        const item = document.createElement('div');
        item.className = `incident-item ${incident.resolved ? 'resolved' : ''}`;
        item.innerHTML = `
            <div class="incident-header">
                <span class="incident-service">${incident.service}</span>
                <span class="incident-time">${incident.time}</span>
            </div>
            <div class="incident-description">${incident.description}</div>
        `;
        incidentsList.appendChild(item);
    });
}

// Update statistics
function updateStats() {
    // Calculate stats
    const operationalCount = aiServices.filter(s => s.status === 'operational').length;
    const avgUptime = (aiServices.reduce((acc, s) => acc + s.uptime, 0) / aiServices.length).toFixed(1);
    const avgResponse = Math.round(aiServices.reduce((acc, s) => acc + s.responseTime, 0) / aiServices.length);
    
    // Update DOM
    updateElement('avgUptime', avgUptime + '%');
    updateElement('avgResponse', avgResponse + 'ms');
    updateElement('currentIncidents', recentIncidents.filter(i => !i.resolved).length);
    updateElement('servicesCount', aiServices.length);
}

// Update overall status indicator
function updateOverallStatus() {
    const statusIndicator = document.getElementById('mainStatus');
    const statusText = document.getElementById('statusText');
    
    if (!statusIndicator || !statusText) return;
    
    const hasIssues = aiServices.some(s => s.status !== 'operational');
    
    if (hasIssues) {
        statusIndicator.className = 'status-indicator warning';
        statusText.textContent = 'Some Services Degraded';
    } else {
        statusIndicator.className = 'status-indicator pulse';
        statusText.textContent = 'All Systems Operational';
    }
    
    // Update last checked time
    updateElement('lastUpdate', 'just now');
}

// Helper function to update element text
function updateElement(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

// Show service details (placeholder for modal/expansion)
function showServiceDetails(service) {
    showToast(`${service.name} - Status: ${getStatusLabel(service.status)}`);
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Auto-refresh data
function startAutoRefresh() {
    setInterval(() => {
        updateElement('lastUpdate', formatTimeAgo(new Date()));
    }, 60000); // Update every minute
}

// Format time ago
function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    return Math.floor(seconds / 86400) + ' days ago';
}

// Simulate random status changes for demo
function simulateRandomChanges() {
    setInterval(() => {
        // Randomly change a service status
        if (Math.random() > 0.95) {
            const randomIndex = Math.floor(Math.random() * aiServices.length);
            const statuses = ['operational', 'degraded', 'down'];
            aiServices[randomIndex].status = statuses[Math.floor(Math.random() * statuses.length)];
            
            // Update response times
            aiServices[randomIndex].responseTime = Math.floor(50 + Math.random() * 500);
            
            renderServices();
        }
        
        // Update chart data
        if (chart && Math.random() > 0.8) {
            chart.data.datasets[0].data = Array.from({length: 24}, () => 98 + Math.random() * 2);
            chart.update();
        }
    }, 5000); // Every 5 seconds
}