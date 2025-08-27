// Invoice Generator JavaScript
class InvoiceGenerator {
    constructor() {
        this.currency = 'EUR';
        this.currencySymbols = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'CAD': '$',
            'AUD': '$',
            'JPY': '¥',
            'CHF': 'CHF',
            'CNY': '¥'
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setCurrentDate();
        this.calculateTotals();
    }
    
    setupEventListeners() {
        // Currency change
        document.getElementById('currencySelect').addEventListener('change', (e) => {
            this.currency = e.target.value;
            this.updateCurrency();
            this.calculateTotals();
        });
        
        // Tax toggle
        document.getElementById('enableTax').addEventListener('change', (e) => {
            const taxSettings = document.getElementById('taxSettings');
            const taxRow = document.querySelector('.tax-row');
            if (e.target.checked) {
                taxSettings.style.display = 'block';
                taxRow.style.display = 'flex';
            } else {
                taxSettings.style.display = 'none';
                taxRow.style.display = 'none';
            }
            this.calculateTotals();
        });
        
        // Discount toggle
        document.getElementById('enableDiscount').addEventListener('change', (e) => {
            const discountSettings = document.getElementById('discountSettings');
            const discountRow = document.querySelector('.discount-row');
            if (e.target.checked) {
                discountSettings.style.display = 'block';
                discountRow.style.display = 'flex';
            } else {
                discountSettings.style.display = 'none';
                discountRow.style.display = 'none';
            }
            this.calculateTotals();
        });
        
        // Tax and discount inputs
        document.getElementById('taxRate').addEventListener('input', () => this.calculateTotals());
        document.getElementById('taxName').addEventListener('input', (e) => {
            document.getElementById('taxLabel').textContent = e.target.value + ':' || 'Tax:';
        });
        document.getElementById('discountValue').addEventListener('input', () => this.calculateTotals());
        document.getElementById('discountType').addEventListener('change', () => this.calculateTotals());
        
        // Logo upload
        document.getElementById('logoUpload').addEventListener('change', (e) => {
            this.handleLogoUpload(e);
        });
        
        // Accent color
        document.getElementById('accentColor').addEventListener('change', (e) => {
            document.documentElement.style.setProperty('--accent-color', e.target.value);
        });
        
        // Add item button
        document.getElementById('addItemBtn').addEventListener('click', () => {
            this.addNewItem();
        });
        
        // Items table events (delegation)
        document.getElementById('itemsTableBody').addEventListener('input', (e) => {
            if (e.target.matches('.item-quantity, .item-rate')) {
                this.updateItemAmount(e.target.closest('.item-row'));
                this.calculateTotals();
            }
        });
        
        document.getElementById('itemsTableBody').addEventListener('click', (e) => {
            if (e.target.closest('.btn-remove-item')) {
                this.removeItem(e.target.closest('.item-row'));
                this.calculateTotals();
            }
        });
        
        // Action buttons
        document.getElementById('previewBtn').addEventListener('click', () => this.previewInvoice());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadPDF());
        document.getElementById('sendBtn').addEventListener('click', () => this.openSendModal());
        
        // Send modal
        document.querySelector('.close').addEventListener('click', () => this.closeSendModal());
        document.getElementById('sendForm').addEventListener('submit', (e) => this.sendInvoice(e));
        
        // Auto-save functionality
        this.setupAutoSave();
    }
    
    setCurrentDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('invoiceDate').value = today;
        
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];
    }
    
    updateCurrency() {
        const symbol = this.currencySymbols[this.currency];
        document.querySelectorAll('.currency-symbol').forEach(el => {
            el.textContent = symbol;
        });
    }
    
    formatCurrency(amount) {
        const symbol = this.currencySymbols[this.currency] || this.currency;
        return `${symbol}${parseFloat(amount).toFixed(2)}`;
    }
    
    addNewItem() {
        const tbody = document.getElementById('itemsTableBody');
        const newRow = document.createElement('tr');
        newRow.className = 'item-row';
        newRow.innerHTML = `
            <td>
                <input type="text" placeholder="Description of service or product" class="item-description">
            </td>
            <td>
                <input type="number" value="1" class="item-quantity" min="0" step="0.01">
            </td>
            <td>
                <input type="number" value="0" class="item-rate" min="0" step="0.01">
            </td>
            <td class="item-amount">${this.formatCurrency(0)}</td>
            <td>
                <button type="button" class="btn-remove-item">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(newRow);
    }
    
    removeItem(row) {
        row.remove();
    }
    
    updateItemAmount(row) {
        const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
        const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
        const amount = quantity * rate;
        row.querySelector('.item-amount').textContent = this.formatCurrency(amount);
    }
    
    calculateTotals() {
        let subtotal = 0;
        
        // Calculate subtotal
        document.querySelectorAll('.item-row').forEach(row => {
            const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
            const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
            subtotal += quantity * rate;
            this.updateItemAmount(row);
        });
        
        // Apply discount
        let discountAmount = 0;
        if (document.getElementById('enableDiscount').checked) {
            const discountValue = parseFloat(document.getElementById('discountValue').value) || 0;
            const discountType = document.getElementById('discountType').value;
            
            if (discountType === 'percentage') {
                discountAmount = (subtotal * discountValue) / 100;
            } else {
                discountAmount = discountValue;
            }
        }
        
        const afterDiscount = subtotal - discountAmount;
        
        // Apply tax
        let taxAmount = 0;
        if (document.getElementById('enableTax').checked) {
            const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
            taxAmount = (afterDiscount * taxRate) / 100;
        }
        
        const total = afterDiscount + taxAmount;
        
        // Update display
        document.getElementById('subtotal').textContent = this.formatCurrency(subtotal);
        document.getElementById('discountAmount').textContent = '-' + this.formatCurrency(discountAmount);
        document.getElementById('taxAmount').textContent = this.formatCurrency(taxAmount);
        document.getElementById('totalAmount').textContent = this.formatCurrency(total);
    }
    
    handleLogoUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const logoPreview = document.getElementById('logoPreview');
                const companyLogo = document.getElementById('companyLogo');
                
                logoPreview.innerHTML = `<img src="${e.target.result}" alt="Logo Preview">`;
                companyLogo.innerHTML = `<img src="${e.target.result}" alt="Company Logo">`;
            };
            reader.readAsDataURL(file);
        }
    }
    
    previewInvoice() {
        window.print();
    }
    
    downloadPDF() {
        // For a simple implementation, we'll use window.print()
        // In a production environment, you'd want to use a library like jsPDF or html2pdf
        window.print();
        
        // Alternative implementation with html2pdf (requires including the library)
        /*
        const element = document.getElementById('invoicePreview');
        const opt = {
            margin: 1,
            filename: `invoice-${document.getElementById('invoiceNumber').value}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
        */
    }
    
    openSendModal() {
        const clientEmail = document.getElementById('clientEmail').value;
        const companyName = document.getElementById('companyName').value || 'Your Company';
        const invoiceNumber = document.getElementById('invoiceNumber').value || 'INV-001';
        
        document.getElementById('sendToEmail').value = clientEmail;
        document.getElementById('emailSubject').value = `Invoice ${invoiceNumber} from ${companyName}`;
        document.getElementById('sendModal').style.display = 'block';
    }
    
    closeSendModal() {
        document.getElementById('sendModal').style.display = 'none';
    }
    
    sendInvoice(event) {
        event.preventDefault();
        
        // In a real application, you would send this data to your backend
        const formData = new FormData(event.target);
        const invoiceData = this.getInvoiceData();
        
        // Simulate sending
        alert('Invoice sent successfully! (This is a demo - no actual email was sent)');
        this.closeSendModal();
        
        // Here you would typically make an AJAX request to your backend
        /*
        fetch('/send-invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailData: Object.fromEntries(formData),
                invoiceData: invoiceData
            })
        });
        */
    }
    
    getInvoiceData() {
        // Collect all invoice data
        const items = [];
        document.querySelectorAll('.item-row').forEach(row => {
            items.push({
                description: row.querySelector('.item-description').value,
                quantity: row.querySelector('.item-quantity').value,
                rate: row.querySelector('.item-rate').value,
                amount: row.querySelector('.item-amount').textContent
            });
        });
        
        return {
            company: {
                name: document.getElementById('companyName').value,
                address: document.getElementById('companyAddress').value,
                phone: document.getElementById('companyPhone').value,
                email: document.getElementById('companyEmail').value
            },
            client: {
                name: document.getElementById('clientName').value,
                address: document.getElementById('clientAddress').value,
                phone: document.getElementById('clientPhone').value,
                email: document.getElementById('clientEmail').value
            },
            invoice: {
                number: document.getElementById('invoiceNumber').value,
                date: document.getElementById('invoiceDate').value,
                dueDate: document.getElementById('dueDate').value,
                notes: document.getElementById('invoiceNotes').value,
                paymentInfo: document.getElementById('paymentInfo').value
            },
            items: items,
            totals: {
                subtotal: document.getElementById('subtotal').textContent,
                discount: document.getElementById('discountAmount').textContent,
                tax: document.getElementById('taxAmount').textContent,
                total: document.getElementById('totalAmount').textContent
            }
        };
    }
    
    setupAutoSave() {
        // Auto-save invoice data to localStorage
        const saveData = () => {
            const data = this.getInvoiceData();
            localStorage.setItem('invoiceData', JSON.stringify(data));
        };
        
        // Save data every 10 seconds
        setInterval(saveData, 10000);
        
        // Load saved data on page load
        this.loadSavedData();
    }
    
    loadSavedData() {
        const savedData = localStorage.getItem('invoiceData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                // Restore form data
                Object.keys(data.company).forEach(key => {
                    const element = document.getElementById(`company${key.charAt(0).toUpperCase() + key.slice(1)}`);
                    if (element) element.value = data.company[key];
                });
                
                Object.keys(data.client).forEach(key => {
                    const element = document.getElementById(`client${key.charAt(0).toUpperCase() + key.slice(1)}`);
                    if (element) element.value = data.client[key];
                });
                
                Object.keys(data.invoice).forEach(key => {
                    const element = document.getElementById(`invoice${key.charAt(0).toUpperCase() + key.slice(1)}`);
                    if (element) element.value = data.invoice[key];
                });
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InvoiceGenerator();
});

// Modal close functionality
window.onclick = function(event) {
    const modal = document.getElementById('sendModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}