/* ChatGPT Status Page JavaScript */
/* Place in: /public_html/js/chatgpt-status.js */

// Service status data
const serviceData = {
    main: {
        status: 'operational',
        message: 'ChatGPT is Operational',
        description: 'All systems are running normally'
    },
    components: {
        web: {
            name: 'ChatGPT Web Interface',
            status: 'operational',
            latency: 145,
            successRate: 99.98,
            history: []
        },
        api: {
            name: 'OpenAI API',
            status: 'operational',
            latency: 89,
            successRate: 99.99,
            history: []
        },
        gpt4: {
            name: 'GPT-4 Model',
            status: 'operational',
            latency: 567,
            successRate: 99.95,
            history: []
        },
        gpt35: {
            name: 'GPT-3.5 Model',
            status: 'operational',
            latency: 234,
            successRate: 99.97,
            history: []
        },
        plugins: {
            name: 'ChatGPT Plugins',
            status: 'operational',
            latency: 312,
            successRate: 99.91,
            history: []
        },
        plus: {
            name: 'ChatGPT Plus',
            status: 'operational',
            latency: 178,
            successRate: 99.96,
            history: []
        }
    },
    regions: {
        northAmerica: { status: 'operational', latency: 145, uptime: 99.99 },
        europe: { status: 'operational', latency: 167, uptime: 99.98 },
        asiaPacific: { status: 'operational', latency: 234, uptime: 99.95 },
        southAmerica: { status: 'operational', latency: 289, uptime: 99.93 }
    }
};

// Chart instance
let uptimeChart = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeStatus();
    initializeCharts();
    initializeComponentGraphs();
    startAutoRefresh();
    initializeAlertForm();
    simulateStatusChanges();
});

// Initialize status display
function initializeStatus() {
    updateMainStatus();
    updateComponentStatus();
    updateRegionalStatus();
    updateStatistics();
}

// Update main status
function updateMainStatus() {
    const statusIndicator = document.getElementById('mainStatus');
    const statusTitle = document.getElementById('statusTitle');
    const statusDescription = document.getElementById('statusDescription');
    
    if (statusIndicator) {
        statusIndicator.className = `status-indicator-large ${getStatusClass(serviceData.main.status)}`;
    }
    
    if (statusTitle) {
        statusTitle.textContent = serviceData.main.message;
    }
    
    if (statusDescription) {
        statusDescription.textContent = serviceData.main.description;
    }
    
    updateLastChecked();
}

// Update component status
function updateComponentStatus() {
    Object.keys(serviceData.components).forEach(key => {
        const component = serviceData.components[key];
        const card = document.querySelector(`[data-component="${key}"]`);
        
        if (card) {
            // Update status
            const statusElement = card.querySelector('.component-status');
            if (statusElement) {
                statusElement.className = `component-status ${component.status}`;
                statusElement.innerHTML = `
                    <span class="status-dot"></span>
                    ${getStatusLabel(component.status)}
                `;
            }
            
            // Update metrics
            const latencyElement = card.querySelector('.metric-value');
            if (latencyElement) {
                latencyElement.textContent = `${component.latency}ms`;
            }
            
            const successRateElements = card.querySelectorAll('.metric-value');
            if (successRateElements[1]) {
                successRateElements[1].textContent = `${component.successRate}%`;
            }
        }
    });
}

// Update regional status
function updateRegionalStatus() {
    const regions = document.querySelectorAll('.region-card');
    const regionKeys = ['northAmerica', 'europe', 'asiaPacific', 'southAmerica'];
    
    regions.forEach((card, index) => {
        if (regionKeys[index]) {
            const regionData = serviceData.regions[regionKeys[index]];
            const statusElement = card.querySelector('.region-status');
            const statsElement = card.querySelector('.region-stats');
            
            if (statusElement) {
                statusElement.className = `region-status ${regionData.status}`;
                statusElement.textContent = getStatusLabel(regionData.status);
            }
            
            if (statsElement) {
                statsElement.innerHTML = `
                    <span>Latency: ${regionData.latency}ms</span>
                    <span>Uptime: ${regionData.uptime}%</span>
                `;
            }
        }
    });
}

// Update statistics
function updateStatistics() {
    // Calculate average response time
    const avgResponseTime = Math.round(
        Object.values(serviceData.components).reduce((sum, comp) => sum + comp.latency, 0) / 
        Object.keys(serviceData.components).length
    );
    
    // Calculate 24h uptime
    const uptime24h = Math.min(...Object.values(serviceData.components).map(c => c.successRate));
    
    // Count affected regions
    const affectedRegions = Object.values(serviceData.regions).filter(r => r.status !== 'operational').length;
    
    // Count active incidents
    const activeIncidents = Object.values(serviceData.components).filter(c => c.status !== 'operational').length;
    
    updateElement('responseTime', `${avgResponseTime}ms`);
    updateElement('uptime24h', `${uptime24h}%`);
    updateElement('affectedRegions', affectedRegions);
    updateElement('activeIncidents', activeIncidents);
}

// Initialize charts
function initializeCharts() {
    const ctx = document.getElementById('uptimeChart');
    if (!ctx) return;
    
    // Generate 7 days of data
    const days = [];
    const uptimeData = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }));
        uptimeData.push(99.5 + Math.random() * 0.5);
    }
    
    const config = {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Uptime %',
                data: uptimeData,
                borderColor: '#10A37F',
                backgroundColor: 'rgba(16, 163, 127, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Uptime: ${context.parsed.y.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 99,
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
        uptimeChart = new Chart(ctx, config);
    }
}

// Initialize component graphs
function initializeComponentGraphs() {
    const graphs = document.querySelectorAll('.component-graph');
    
    graphs.forEach(graph => {
        // Create mini sparkline effect
        const bars = 20;
        let graphHTML = '';
        
        for (let i = 0; i < bars; i++) {
            const height = 80 + Math.random() * 20;
            const status = height > 85 ? 'operational' : height > 70 ? 'degraded' : 'down';
            graphHTML += `<div class="graph-bar ${status}" style="height: ${height}%"></div>`;
        }
        
        // We'll keep the gradient for now, but this could be replaced with actual bars
    });
}

// Check status (refresh)
function checkStatus() {
    showToast('Refreshing status...');
    
    // Simulate API call
    setTimeout(() => {
        // Randomly change some values for demo
        Object.keys(serviceData.components).forEach(key => {
            const component = serviceData.components[key];
            component.latency = Math.round(component.latency * (0.9 + Math.random() * 0.2));
            component.successRate = Math.min(100, component.successRate + (Math.random() - 0.5) * 0.1);
        });
        
        updateComponentStatus();
        updateStatistics();
        updateLastChecked();
        showToast('Status updated successfully');
    }, 1000);
}

// Initialize alert form
function initializeAlertForm() {
    const form = document.getElementById('alertForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            const phone = form.querySelector('input[type="tel"]').value;
            const emailAlerts = form.querySelector('input[type="checkbox"]:checked');
            
            // Simulate subscription
            showToast('Successfully subscribed to ChatGPT status alerts!');
            form.reset();
        });
    }
}

// Auto refresh
function startAutoRefresh() {
    // Update last checked every minute
    setInterval(() => {
        updateLastChecked();
    }, 60000);
    
    // Refresh data every 30 seconds
    setInterval(() => {
        checkStatus();
    }, 30000);
}

// Update last checked time
function updateLastChecked() {
    const lastUpdate = document.getElementById('lastUpdate');
    if (lastUpdate) {
        lastUpdate.textContent = 'just now';
    }
}

// Simulate status changes for demo
function simulateStatusChanges() {
    setInterval(() => {
        // Occasionally simulate issues
        if (Math.random() > 0.95) {
            const components = Object.keys(serviceData.components);
            const randomComponent = components[Math.floor(Math.random() * components.length)];
            const statuses = ['operational', 'operational', 'operational', 'degraded'];
            
            serviceData.components[randomComponent].status = 
                statuses[Math.floor(Math.random() * statuses.length)];
            
            updateComponentStatus();
            
            // Update main status if any component has issues
            const hasIssues = Object.values(serviceData.components).some(c => c.status !== 'operational');
            if (hasIssues) {
                serviceData.main.status = 'degraded';
                serviceData.main.message = 'ChatGPT is Experiencing Issues';
                serviceData.main.description = 'Some services may be slow or unavailable';
            } else {
                serviceData.main.status = 'operational';
                serviceData.main.message = 'ChatGPT is Operational';
                serviceData.main.description = 'All systems are running normally';
            }
            
            updateMainStatus();
            updateStatistics();
        }
        
        // Update metrics
        Object.values(serviceData.components).forEach(component => {
            component.latency += Math.round((Math.random() - 0.5) * 20);
            component.latency = Math.max(50, Math.min(1000, component.latency));
        });
        
        updateComponentStatus();
    }, 10000);
}

// Helper functions
function getStatusClass(status) {
    switch(status) {
        case 'operational': return 'pulse';
        case 'degraded': return 'warning';
        case 'down': return 'danger';
        default: return 'pulse';
    }
}

function getStatusLabel(status) {
    switch(status) {
        case 'operational': return 'Operational';
        case 'degraded': return 'Degraded';
        case 'down': return 'Down';
        default: return 'Unknown';
    }
}

function updateElement(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

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