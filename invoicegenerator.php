<?php include_once 'header.php'; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Invoice Generator - Create Invoices Online Free</title>
    <meta name="description" content="Create professional invoices online for free. Easy-to-use invoice generator with customizable templates, automatic calculations, and instant PDF download.">
    <link rel="stylesheet" href="css/invoicegenerator.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
     <!-- Include Header -->
    <?php include($_SERVER['DOCUMENT_ROOT'] . '/includes/header.html'); ?>
    <div class="invoice-generator-wrapper">
        <!-- Main Content -->
        <div class="generator-main">
            <div class="container">
                <div class="row">
                    <!-- Control Panel -->
                    <div class="col-md-4">
                        <div class="control-panel">
                            <div class="panel-section">
                                <h3><i class="fas fa-cog"></i> Settings</h3>
                                
                        <button class="btn btn-preview" id="previewBtn">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                        <button class="btn btn-download" id="downloadBtn">
                            <i class="fas fa-download"></i> Download PDF
                        </button>
                        <button class="btn btn-send" id="sendBtn">
                            <i class="fas fa-paper-plane"></i> Send Invoice
                        </button>
    
                                
                                <!-- Template Selection -->
                                <div class="form-group">
                                    <label>Template</label>
                                    <select id="templateSelect" class="form-control">
                                        <option value="modern">Modern Template</option>
                                        <option value="classic">Classic Template</option>
                                        <option value="minimal">Minimal Template</option>
                                        <option value="corporate">Corporate Template</option>
                                    </select>
                                </div>

                                <!-- Currency Selection -->
                                <div class="form-group">
                                    <label>Currency</label>
                                    <select id="currencySelect" class="form-control">
                                        <option value="USD">USD - United States Dollar</option>
                                        <option value="EUR" selected>EUR - Euro</option>
                                        <option value="GBP">GBP - British Pound</option>
                                        <option value="CAD">CAD - Canadian Dollar</option>
                                        <option value="AUD">AUD - Australian Dollar</option>
                                        <option value="JPY">JPY - Japanese Yen</option>
                                        <option value="CHF">CHF - Swiss Franc</option>
                                        <option value="CNY">CNY - Chinese Yuan</option>
                                    </select>
                                </div>

                                <!-- Tax Settings -->
                                <div class="form-group">
                                    <label>
                                        <input type="checkbox" id="enableTax"> Enable Tax
                                    </label>
                                    <div id="taxSettings" style="display: none;">
                                        <input type="text" id="taxName" placeholder="Tax Name (e.g., VAT)" class="form-control">
                                        <input type="number" id="taxRate" placeholder="Tax Rate %" class="form-control" step="0.01">
                                    </div>
                                </div>

                                <!-- Discount Settings -->
                                <div class="form-group">
                                    <label>
                                        <input type="checkbox" id="enableDiscount"> Enable Discount
                                    </label>
                                    <div id="discountSettings" style="display: none;">
                                        <select id="discountType" class="form-control">
                                            <option value="percentage">Percentage</option>
                                            <option value="fixed">Fixed Amount</option>
                                        </select>
                                        <input type="number" id="discountValue" placeholder="Discount Value" class="form-control" step="0.01">
                                    </div>
                                </div>

                                <!-- Logo Upload -->
                                <div class="form-group">
                                    <label>Company Logo</label>
                                    <div class="logo-upload">
                                        <input type="file" id="logoUpload" accept="image/*" style="display: none;">
                                        <button type="button" class="btn btn-outline" onclick="document.getElementById('logoUpload').click()">
                                            <i class="fas fa-upload"></i> Upload Logo
                                        </button>
                                        <div id="logoPreview"></div>
                                    </div>
                                </div>

                                <!-- Color Scheme -->
                                <div class="form-group">
                                    <label>Accent Color</label>
                                    <input type="color" id="accentColor" value="#3498db" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Invoice Preview -->
                    <div class="col-md-8">
                        <div class="invoice-container">
                            <div class="invoice-paper" id="invoicePreview">
                                <!-- Invoice Header -->
                                <div class="invoice-header">
                                    <div class="company-info">
                                        <div id="companyLogo"></div>
                                        <div class="company-details">
                                            <textarea id="companyName" placeholder="Your Company Name" class="editable company-name">Your Company Name</textarea>
                                            <textarea id="companyAddress" placeholder="Company Address&#10;City, State ZIP&#10;Country" class="editable">Company Address
City, State ZIP
Country</textarea>
                                            <input type="text" id="companyPhone" placeholder="Phone Number" class="editable">
                                            <input type="email" id="companyEmail" placeholder="Email Address" class="editable">
                                        </div>
                                    </div>
                                    <div class="invoice-title">
                                        <h1>INVOICE</h1>
                                        <div class="invoice-meta">
                                            <div class="invoice-number">
                                                <label>Invoice #</label>
                                                <input type="text" id="invoiceNumber" value="INV-001" class="editable">
                                            </div>
                                            <div class="invoice-date">
                                                <label>Date</label>
                                                <input type="date" id="invoiceDate" class="editable">
                                            </div>
                                            <div class="due-date">
                                                <label>Due Date</label>
                                                <input type="date" id="dueDate" class="editable">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Bill To Section -->
                                <div class="bill-to-section">
                                    <div class="bill-to">
                                        <h3>Bill To:</h3>
                                        <textarea id="clientName" placeholder="Client Name" class="editable client-name">Client Name</textarea>
                                        <textarea id="clientAddress" placeholder="Client Address&#10;City, State ZIP&#10;Country" class="editable">Client Address
City, State ZIP
Country</textarea>
                                        <input type="text" id="clientPhone" placeholder="Phone Number" class="editable">
                                        <input type="email" id="clientEmail" placeholder="Email Address" class="editable">
                                    </div>
                                </div>

                                <!-- Items Table -->
                                <div class="items-section">
                                    <table class="items-table" id="itemsTable">
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Quantity</th>
                                                <th>Rate</th>
                                                <th>Amount</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody id="itemsTableBody">
                                            <tr class="item-row">
                                                <td>
                                                    <input type="text" placeholder="Description of service or product" class="item-description">
                                                </td>
                                                <td>
                                                    <input type="number" value="1" class="item-quantity" min="0" step="0.01">
                                                </td>
                                                <td>
                                                    <input type="number" value="0" class="item-rate" min="0" step="0.01">
                                                </td>
                                                <td class="item-amount">€0.00</td>
                                                <td>
                                                    <button type="button" class="btn-remove-item">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button type="button" class="btn btn-add-item" id="addItemBtn">
                                        <i class="fas fa-plus"></i> Add Item
                                    </button>
                                </div>

                                <!-- Totals Section -->
                                <div class="totals-section">
                                    <div class="totals-table">
                                        <div class="total-row">
                                            <span>Subtotal:</span>
                                            <span id="subtotal">€0.00</span>
                                        </div>
                                        <div class="total-row discount-row" style="display: none;">
                                            <span>Discount:</span>
                                            <span id="discountAmount">-€0.00</span>
                                        </div>
                                        <div class="total-row tax-row" style="display: none;">
                                            <span id="taxLabel">Tax:</span>
                                            <span id="taxAmount">€0.00</span>
                                        </div>
                                        <div class="total-row final-total">
                                            <span>Total:</span>
                                            <span id="totalAmount">€0.00</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Notes Section -->
                                <div class="notes-section">
                                    <h3>Notes:</h3>
                                    <textarea id="invoiceNotes" placeholder="Payment terms, additional notes, or thank you message..." class="editable notes">Thank you for your business!</textarea>
                                </div>

                                <!-- Payment Info -->
                                <div class="payment-info">
                                    <h3>Payment Information:</h3>
                                    <textarea id="paymentInfo" placeholder="Bank details, PayPal, or other payment instructions..." class="editable">Payment due within 30 days.
Bank Transfer: [Your Bank Details]
PayPal: [Your PayPal Email]</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Send Invoice Modal -->
    <div id="sendModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Send Invoice</h2>
            <form id="sendForm">
                <div class="form-group">
                    <label>To Email:</label>
                    <input type="email" id="sendToEmail" required>
                </div>
                <div class="form-group">
                    <label>Subject:</label>
                    <input type="text" id="emailSubject" value="Invoice from Your Company">
                </div>
                <div class="form-group">
                    <label>Message:</label>
                    <textarea id="emailMessage" rows="4">Dear Client,

Please find attached your invoice. Payment is due within 30 days.

Thank you for your business!

Best regards,
Your Company</textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-send">Send Invoice</button>
                    <button type="button" class="btn btn-cancel" onclick="closeSendModal()">Cancel</button>
                </div>
            </form>
        </div>
    </div>
<!-- Include Footer -->
    <?php include($_SERVER['DOCUMENT_ROOT'] . '/includes/footer.html'); ?>
    <script src="js/invoicegenerator.js"></script>
</body>
</html>

<?php include_once 'footer.php'; ?>