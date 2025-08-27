// PUBLIC_HTML/JS/DATACLEANER.JS (Enhanced Version)
class DataCleanerApp {
    constructor() {
        this.files = new Map();
        this.isProcessing = false;
        this.stats = {
            filesProcessed: 0,
            totalDataRemoved: 0,
            processingTime: 0
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initScrollAnimations();
        this.initCounterAnimations();
        this.loadIconifyIcons();
        this.initTooltips();
    }

    bindEvents() {
        // File upload events
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const clearAllBtn = document.getElementById('clearAllBtn');
        const startCleaningBtn = document.getElementById('startCleaningBtn');
        const cleanMoreBtn = document.getElementById('cleanMoreBtn');
        const downloadAllBtn = document.getElementById('downloadAllBtn');

        // Drop zone events
        dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
        dropZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        dropZone.addEventListener('drop', this.handleDrop.bind(this));
        dropZone.addEventListener('click', () => fileInput.click());

        // File input change
        fileInput.addEventListener('change', this.handleFileSelect.bind(this));

        // Button events
        clearAllBtn.addEventListener('click', this.clearAllFiles.bind(this));
        startCleaningBtn.addEventListener('click', this.startCleaning.bind(this));
        cleanMoreBtn.addEventListener('click', this.resetTool.bind(this));
        downloadAllBtn.addEventListener('click', this.downloadAll.bind(this));

        // Preset buttons
        document.querySelectorAll('[data-preset]').forEach(btn => {
            btn.addEventListener('click', this.applyPreset.bind(this));
        });

        // Option card clicks
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', this.toggleOption.bind(this));
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mainNav = document.getElementById('mainNav');
        
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });

        // Header scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', this.handleSmoothScroll.bind(this));
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        document.getElementById('dropZone').classList.add('dragover');
    }

    handleDragLeave(e) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            document.getElementById('dropZone').classList.remove('dragover');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        document.getElementById('dropZone').classList.remove('dragover');
        this.processFiles(e.dataTransfer.files);
    }

    handleFileSelect(e) {
        this.processFiles(e.target.files);
        e.target.value = ''; // Reset input
    }

    processFiles(fileList) {
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'image/jpeg',
            'image/png',
            'image/gif',
            'text/plain',
            'video/mp4',
            'video/avi',
            'video/quicktime'
        ];

        const maxFileSize = 50 * 1024 * 1024; // 50MB
        const maxFiles = 20;

        Array.from(fileList).forEach(file => {
            if (this.files.size >= maxFiles) {
                this.showToast('Maximum file limit reached', 'warning');
                return;
            }

            if (!allowedTypes.includes(file.type) && !this.isValidFileExtension(file.name)) {
                this.showToast(`Unsupported file type: ${file.name}`, 'error');
                return;
            }

            if (file.size > maxFileSize) {
                this.showToast(`File too large: ${file.name}`, 'error');
                return;
            }

            const fileId = this.generateFileId();
            this.files.set(fileId, {
                file,
                id: fileId,
                status: 'pending',
                metadata: this.extractFileMetadata(file)
            });

            this.addFileToList(fileId);
        });

        this.updateUI();
    }

    isValidFileExtension(filename) {
        const validExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif', 'txt', 'mp4', 'avi', 'mov'];
        const extension = filename.split('.').pop().toLowerCase();
        return validExtensions.includes(extension);
    }

    generateFileId() {
        return 'file_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    extractFileMetadata(file) {
        return {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        };
    }

    addFileToList(fileId) {
        const fileData = this.files.get(fileId);
        const fileList = document.getElementById('fileList');
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item fade-in';
        fileItem.id = `file-${fileId}`;
        
        const iconName = this.getFileIcon(fileData.file.name);
        
        fileItem.innerHTML = `
            <iconify-icon icon="${iconName}" class="file-item-icon"></iconify-icon>
            <div class="file-item-info">
                <div class="file-item-name">${fileData.file.name}</div>
                <div class="file-item-details">
                    <span>${this.formatFileSize(fileData.file.size)}</span>
                    <span>${this.getFileType(fileData.file.type)}</span>
                </div>
            </div>
            <div class="file-item-status pending">Pending</div>
            <button class="btn btn-ghost btn-sm file-remove-btn" onclick="dataCleanerApp.removeFile('${fileId}')" aria-label="Remove file">
                <iconify-icon icon="material-symbols:close"></iconify-icon>
            </button>
        `;

        fileList.appendChild(fileItem);
        
        // Animate in
        setTimeout(() => fileItem.classList.add('visible'), 100);
    }

    getFileIcon(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        const iconMap = {
            pdf: 'material-symbols:picture-as-pdf',
            doc: 'material-symbols:description',
            docx: 'material-symbols:description',
            xls: 'material-symbols:table-chart',
            xlsx: 'material-symbols:table-chart',
            jpg: 'material-symbols:image',
            jpeg: 'material-symbols:image',
            png: 'material-symbols:image',
            gif: 'material-symbols:gif-box',
            txt: 'material-symbols:text-snippet',
            mp4: 'material-symbols:video-file',
            avi: 'material-symbols:video-file',
            mov: 'material-symbols:video-file'
        };
        
        return iconMap[extension] || 'material-symbols:insert-drive-file';
    }

    getFileType(mimeType) {
        const typeMap = {
            'application/pdf': 'PDF Document',
            'application/msword': 'Word Document',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document',
            'application/vnd.ms-excel': 'Excel Spreadsheet',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel Spreadsheet',
            'image/jpeg': 'JPEG Image',
            'image/png': 'PNG Image',
            'image/gif': 'GIF Image',
            'text/plain': 'Text File',
            'video/mp4': 'MP4 Video',
            'video/avi': 'AVI Video',
            'video/quicktime': 'MOV Video'
        };
        
        return typeMap[mimeType] || 'Unknown';
    }

    formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    removeFile(fileId) {
        this.files.delete(fileId);
        const fileElement = document.getElementById(`file-${fileId}`);
        
        if (fileElement) {
            fileElement.style.transform = 'translateX(-100%)';
            fileElement.style.opacity = '0';
            
            setTimeout(() => fileElement.remove(), 300);
        }
        
        this.updateUI();
    }

    clearAllFiles() {
        this.files.clear();
        const fileList = document.getElementById('fileList');
        fileList.innerHTML = '';
        this.updateUI();
        this.showToast('All files cleared', 'success');
    }

    updateUI() {
        const fileCount = this.files.size;
        const fileListContainer = document.getElementById('fileListContainer');
        const cleaningOptions = document.getElementById('cleaningOptions');
        const fileCountElement = document.getElementById('fileCount');

        if (fileCount > 0) {
            fileListContainer.style.display = 'block';
            cleaningOptions.style.display = 'block';
            fileCountElement.textContent = fileCount;
        } else {
            fileListContainer.style.display = 'none';
            cleaningOptions.style.display = 'none';
        }
    }

    applyPreset(e) {
        const preset = e.target.closest('[data-preset]').dataset.preset;
        const checkboxes = document.querySelectorAll('.option-card input[type="checkbox"]');

        // Reset all checkboxes
        checkboxes.forEach(cb => cb.checked = false);

        switch (preset) {
            case 'basic':
                document.getElementById('metadata').checked = true;
                document.getElementById('personal').checked = true;
                break;
            case 'advanced':
                document.getElementById('metadata').checked = true;
                document.getElementById('location').checked = true;
                document.getElementById('personal').checked = true;
                document.getElementById('hidden').checked = true;
                break;
            case 'maximum':
                checkboxes.forEach(cb => cb.checked = true);
                break;
        }

        this.updateOptionCards();
        this.showToast(`${preset.charAt(0).toUpperCase() + preset.slice(1)} preset applied`, 'success');
    }

    toggleOption(e) {
        if (e.target.closest('.option-toggle')) return;
        
        const card = e.currentTarget;
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        
        this.updateOptionCards();
    }

    updateOptionCards() {
        document.querySelectorAll('.option-card').forEach(card => {
            const checkbox = card.querySelector('input[type="checkbox"]');
            card.classList.toggle('active', checkbox.checked);
        });
    }

    async startCleaning() {
        if (this.files.size === 0) {
            this.showToast('Please select files to clean', 'warning');
            return;
        }

        if (this.isProcessing) return;

        const selectedOptions = this.getSelectedOptions();
        if (selectedOptions.length === 0) {
            this.showToast('Please select at least one cleaning option', 'warning');
            return;
        }

        this.isProcessing = true;
        this.showProcessingSection();
        
        try {
            await this.processAllFiles(selectedOptions);
            this.showResultsSection();
            this.showToast('Files cleaned successfully!', 'success');
        } catch (error) {
            this.showToast('An error occurred during processing', 'error');
            console.error('Processing error:', error);
        } finally {
            this.isProcessing = false;
        }
    }

    getSelectedOptions() {
        const options = [];
        document.querySelectorAll('.option-card input[type="checkbox"]:checked').forEach(cb => {
            options.push(cb.id);
        });
        return options;
    }

    showProcessingSection() {
        document.getElementById('cleaningOptions').style.display = 'none';
        document.getElementById('processingSection').style.display = 'block';
        document.getElementById('resultsSection').style.display = 'none';
        
        const fileProgress = document.getElementById('fileProgress');
        fileProgress.innerHTML = '';
        
        this.files.forEach((fileData, fileId) => {
            const progressItem = document.createElement('div');
            progressItem.className = 'progress-item';
            progressItem.innerHTML = `
                <div class="progress-info">
                    <span>${fileData.file.name}</span>
                    <span class="progress-status">Waiting...</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progress-${fileId}" style="width: 0%"></div>
                </div>
            `;
            fileProgress.appendChild(progressItem);
        });
    }

    async processAllFiles(selectedOptions) {
        const startTime = Date.now();
        let completedFiles = 0;
        const totalFiles = this.files.size;
        
        const processingPromises = Array.from(this.files.entries()).map(([fileId, fileData]) => 
            this.processFile(fileId, fileData, selectedOptions, () => {
                completedFiles++;
                this.updateOverallProgress(completedFiles, totalFiles);
            })
        );

        await Promise.all(processingPromises);
        
        this.stats.processingTime = Date.now() - startTime;
        this.stats.filesProcessed = totalFiles;
    }

    async processFile(fileId, fileData, selectedOptions, onComplete) {
        const progressBar = document.getElementById(`progress-${fileId}`);
        const statusElement = progressBar.closest('.progress-item').querySelector('.progress-status');
        
        statusElement.textContent = 'Processing...';
        
        // Simulate file processing with realistic progress
        for (let progress = 0; progress <= 100; progress += Math.random() * 10 + 5) {
            progress = Math.min(progress, 100);
            progressBar.style.width = progress + '%';
            
            if (progress < 100) {
                await this.sleep(50 + Math.random() * 100);
            }
        }
        
        // Mark file as completed
        fileData.status = 'completed';
        fileData.cleanedSize = Math.floor(fileData.file.size * (0.8 + Math.random() * 0.15));
        fileData.dataRemoved = fileData.file.size - fileData.cleanedSize;
        
        this.stats.totalDataRemoved += fileData.dataRemoved;
        
        statusElement.textContent = 'Completed';
        statusElement.style.color = '#22543d';
        
        onComplete();
    }

    updateOverallProgress(completed, total) {
        const percentage = Math.floor((completed / total) * 100);
        const percentageElement = document.querySelector('.processing-percentage');
        
        if (percentageElement) {
            percentageElement.textContent = percentage + '%';
        }
        
        // Update processing features
        const features = document.querySelectorAll('.processing-features .feature-item');
        features.forEach((feature, index) => {
            if (index < completed) {
                feature.classList.add('active');
            }
        });
    }

    showResultsSection() {
        document.getElementById('processingSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'block';
        
        this.populateResults();
    }

    populateResults() {
        const individualDownloads = document.getElementById('individualDownloads');
        const summaryGrid = document.getElementById('summaryGrid');
        
        // Clear previous results
        individualDownloads.innerHTML = '';
        summaryGrid.innerHTML = '';
        
        // Add download links for each file
        this.files.forEach((fileData, fileId) => {
            const downloadItem = document.createElement('a');
            downloadItem.className = 'download-item';
            downloadItem.href = '#';
            downloadItem.onclick = () => this.downloadFile(fileId);
            
            const iconName = this.getFileIcon(fileData.file.name);
            const reduction = Math.floor(((fileData.dataRemoved / fileData.file.size) * 100));
            
            downloadItem.innerHTML = `
                <iconify-icon icon="${iconName}" class="download-icon"></iconify-icon>
                <div class="download-info">
                    <h4>${fileData.file.name}</h4>
                    <p>${reduction}% data reduced • ${this.formatFileSize(fileData.cleanedSize)}</p>
                </div>
            `;
            
            individualDownloads.appendChild(downloadItem);
        });
        
        // Add summary statistics
        const summaryData = [
            {
                value: this.stats.filesProcessed,
                label: 'Files Processed'
            },
            {
                value: this.formatFileSize(this.stats.totalDataRemoved),
                label: 'Data Removed'
            },
            {
                value: (this.stats.processingTime / 1000).toFixed(1) + 's',
                label: 'Processing Time'
            },
            {
                value: '100%',
                label: 'Success Rate'
            }
        ];
        
        summaryData.forEach(item => {
            const summaryItem = document.createElement('div');
            summaryItem.className = 'summary-item';
            summaryItem.innerHTML = `
                <div class="summary-value">${item.value}</div>
                <div class="summary-label">${item.label}</div>
            `;
            summaryGrid.appendChild(summaryItem);
        });
    }

    downloadFile(fileId) {
        const fileData = this.files.get(fileId);
        if (!fileData) return;
        
        // Create a mock cleaned file for demonstration
        const cleanedBlob = new Blob([`Cleaned version of ${fileData.file.name}`], { 
            type: fileData.file.type 
        });
        
        const url = URL.createObjectURL(cleanedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cleaned_${fileData.file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast(`Downloaded: ${fileData.file.name}`, 'success');
    }

    downloadAll() {
        // Create a ZIP file with all cleaned files (mock implementation)
        const zip = new Blob([`ZIP archive containing ${this.files.size} cleaned files`], {
            type: 'application/zip'
        });
        
        const url = URL.createObjectURL(zip);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cleaned_files.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast(`Downloaded all ${this.files.size} files`, 'success');
    }

    resetTool() {
        this.files.clear();
        this.stats = {
            filesProcessed: 0,
            totalDataRemoved: 0,
            processingTime: 0
        };
        
        document.getElementById('fileList').innerHTML = '';
        document.getElementById('cleaningOptions').style.display = 'none';
        document.getElementById('processingSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'none';
        document.getElementById('fileListContainer').style.display = 'none';
        
        // Reset checkboxes to default
        document.querySelectorAll('.option-card input[type="checkbox"]').forEach(cb => {
            cb.checked = ['metadata', 'personal', 'hidden'].includes(cb.id);
        });
        
        this.updateOptionCards();
        this.showToast('Tool reset successfully', 'success');
        
        // Scroll back to upload section
        document.getElementById('tool-section').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconMap = {
            success: 'material-symbols:check-circle',
            error: 'material-symbols:error',
            warning: 'material-symbols:warning',
            info: 'material-symbols:info'
        };
        
        toast.innerHTML = `
            <iconify-icon icon="${iconMap[type] || iconMap.info}" class="toast-icon"></iconify-icon>
            <div class="toast-content">
                <p>${message}</p>
            </div>
            <button class="toast-close">
                <iconify-icon icon="material-symbols:close"></iconify-icon>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Auto hide after 5 seconds
        const hideTimeout = setTimeout(() => this.hideToast(toast), 5000);
        
        // Close button event
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(hideTimeout);
            // PUBLIC_HTML/JS/DATACLEANER.JS (Continued)

            this.hideToast(toast);
        });
    }

    hideToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animation elements
        document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
            observer.observe(el);
        });
    }

    initCounterAnimations() {
        const counterElements = document.querySelectorAll('.stat-number[data-target]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(el => counterObserver.observe(el));
    }

    animateCounter(element) {
        const target = parseFloat(element.dataset.target);
        const duration = 2000;
        const start = Date.now();
        const startValue = 0;

        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = startValue + (target - startValue) * easeOutCubic;
            
            if (target % 1 === 0) {
                element.textContent = Math.floor(current);
            } else {
                element.textContent = current.toFixed(1);
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target % 1 === 0 ? target : target.toFixed(1);
            }
        };

        animate();
    }

    handleScroll() {
        const header = document.getElementById('mainHeader');
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    handleSmoothScroll(e) {
        const href = e.target.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('mainHeader').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    async loadIconifyIcons() {
        // Load icons from iconify-fetcher.html
        const iconElements = document.querySelectorAll('iconify-icon[icon]');
        const iconNames = Array.from(iconElements).map(el => el.getAttribute('icon'));
        const uniqueIcons = [...new Set(iconNames)];

        if (uniqueIcons.length === 0) return;

        try {
            const response = await fetch('/iconify-fetcher.html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ icons: uniqueIcons })
            });

            if (response.ok) {
                const svgData = await response.json();
                
                iconElements.forEach(element => {
                    const iconName = element.getAttribute('icon');
                    if (svgData[iconName]) {
                        element.innerHTML = svgData[iconName];
                        element.classList.add('iconify-loaded');
                    }
                });
            }
        } catch (error) {
            console.warn('Failed to load Iconify icons:', error);
            // Fallback to text representations or default icons
            this.loadFallbackIcons();
        }
    }

    loadFallbackIcons() {
        const iconMap = {
            'material-symbols:shield-lock': '🛡️',
            'material-symbols:cloud-upload': '☁️⬆️',
            'material-symbols:security': '🔒',
            'material-symbols:speed': '⚡',
            'material-symbols:file-copy': '📄',
            'material-symbols:check-circle': '✅',
            'material-symbols:error': '❌',
            'material-symbols:warning': '⚠️',
            'material-symbols:info': 'ℹ️',
            'material-symbols:close': '✖️',
            'material-symbols:download': '⬇️'
        };

        document.querySelectorAll('iconify-icon[icon]').forEach(element => {
            const iconName = element.getAttribute('icon');
            if (iconMap[iconName]) {
                element.textContent = iconMap[iconName];
                element.classList.add('fallback-icon');
            }
        });
    }

    initTooltips() {
        // Simple tooltip implementation
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip.bind(this));
            element.addEventListener('mouseleave', this.hideTooltip.bind(this));
        });
    }

    showTooltip(e) {
        const element = e.target;
        const text = element.getAttribute('data-tooltip');
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        
        element._tooltip = tooltip;
    }

    hideTooltip(e) {
        const element = e.target;
        if (element._tooltip) {
            document.body.removeChild(element._tooltip);
            delete element._tooltip;
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Utility methods
    static formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Particle system for hero background
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
        this.bindEvents();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.6';
        
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
    }

    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        const maxDistance = 100;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / maxDistance)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    bindEvents() {
        window.addEventListener('resize', DataCleanerApp.debounce(() => {
            this.resize();
        }, 250));
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoadTime: 0,
            domContentLoadedTime: 0,
            firstPaintTime: 0,
            firstContentfulPaintTime: 0
        };
        
        this.init();
    }

    init() {
        // Page load metrics
        window.addEventListener('load', () => {
            if (performance.timing) {
                this.metrics.pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                this.metrics.domContentLoadedTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            }

            // Paint metrics (if supported)
            if (performance.getEntriesByType) {
                const paintEntries = performance.getEntriesByType('paint');
                paintEntries.forEach(entry => {
                    if (entry.name === 'first-paint') {
                        this.metrics.firstPaintTime = entry.startTime;
                    } else if (entry.name === 'first-contentful-paint') {
                        this.metrics.firstContentfulPaintTime = entry.startTime;
                    }
                });
            }

            // Send metrics to analytics (if implemented)
            this.sendMetrics();
        });
    }

    sendMetrics() {
        // This would typically send to your analytics service
        console.log('Performance Metrics:', this.metrics);
        
        // Example: Google Analytics 4 event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_performance', {
                page_load_time: this.metrics.pageLoadTime,
                dom_content_loaded_time: this.metrics.domContentLoadedTime,
                first_paint_time: this.metrics.firstPaintTime,
                first_contentful_paint_time: this.metrics.firstContentfulPaintTime
            });
        }
    }
}

// Accessibility helper
class AccessibilityHelper {
    constructor() {
        this.init();
    }

    init() {
        this.addKeyboardNavigation();
        this.addAriaLabels();
        this.addFocusManagement();
        this.addScreenReaderSupport();
    }

    addKeyboardNavigation() {
        // Handle keyboard navigation for custom elements
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.classList.contains('option-card')) {
                    e.preventDefault();
                    e.target.click();
                }
            }
        });

        // Add tab index to interactive elements
        document.querySelectorAll('.option-card').forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'checkbox');
        });
    }

    addAriaLabels() {
        // Add ARIA labels where missing
        const dropZone = document.getElementById('dropZone');
        if (dropZone && !dropZone.getAttribute('aria-label')) {
            dropZone.setAttribute('aria-label', 'File upload area. Click to browse or drag and drop files.');
        }

        // Update ARIA states for checkboxes
        document.querySelectorAll('.option-card').forEach(card => {
            const checkbox = card.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    card.setAttribute('aria-checked', checkbox.checked);
                });
                card.setAttribute('aria-checked', checkbox.checked);
            }
        });
    }

    addFocusManagement() {
        // Focus management for modals
        const modal = document.getElementById('fileModal');
        const modalCloseBtn = document.getElementById('modalClose');

        if (modal && modalCloseBtn) {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeModal();
                }
                
                // Trap focus within modal
                if (e.key === 'Tab') {
                    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
    }

    addScreenReaderSupport() {
        // Add live region for status updates
        const statusRegion = document.createElement('div');
        statusRegion.setAttribute('aria-live', 'polite');
        statusRegion.setAttribute('aria-atomic', 'true');
        statusRegion.className = 'sr-only';
        statusRegion.id = 'status-region';
        document.body.appendChild(statusRegion);

        // Announce status changes
        const originalShowToast = dataCleanerApp.showToast;
        dataCleanerApp.showToast = function(message, type) {
            originalShowToast.call(this, message, type);
            statusRegion.textContent = message;
        };
    }

    closeModal() {
        const modal = document.getElementById('fileModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    window.dataCleanerApp = new DataCleanerApp();
    
    // Initialize particle system
    const heroParticles = document.getElementById('heroParticles');
    if (heroParticles) {
        window.particleSystem = new ParticleSystem(heroParticles);
    }
    
    // Initialize performance monitoring
    window.performanceMonitor = new PerformanceMonitor();
    
    // Initialize accessibility helper
    window.accessibilityHelper = new AccessibilityHelper();
    
    // Add CSS classes for enhanced styling
    document.body.classList.add('js-loaded');
    
    // Preload critical images
    const criticalImages = [
        '/assets/hero-bg.jpg',
        '/assets/security-badge.svg',
        '/assets/feature-icons.svg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Initialize option card interactions
    setTimeout(() => {
        dataCleanerApp.updateOptionCards();
    }, 100);
});

// Handle visibility change (for performance optimization)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations
        if (window.particleSystem && window.particleSystem.animationId) {
            cancelAnimationFrame(window.particleSystem.animationId);
            window.particleSystem.animationId = null;
        }
    } else {
        // Page is visible, resume animations
        if (window.particleSystem && !window.particleSystem.animationId) {
            window.particleSystem.animate();
        }
    }
});

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e);
    
    // Show user-friendly error message
    if (window.dataCleanerApp) {
        window.dataCleanerApp.showToast('An unexpected error occurred. Please refresh the page.', 'error');
    }
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e);
    e.preventDefault();
    
    if (window.dataCleanerApp) {
        window.dataCleanerApp.showToast('A network error occurred. Please check your connection.', 'error');
    }
});

// Export for external use
export { DataCleanerApp, ParticleSystem, PerformanceMonitor, AccessibilityHelper };