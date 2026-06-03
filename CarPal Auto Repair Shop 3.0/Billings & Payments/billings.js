/**
 * ============================================
 * CarPal Billings & Payments - JavaScript
 * Version: 1.0
 * Author: CarPal by Citrus Labs
 * Description: Complete billing and payment management system
 * ============================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initializeApp();
});

/**
 * Main Application Initialization
 */
function initializeApp() {
    // Initialize core modules
    TabManager.init();
    ModalManager.init();
    InvoiceManager.init();
    FormManager.init();
    PaymentManager.init();
    RefundManager.init();
    ReportManager.init();
    NotificationManager.init();
    DarkModeManager.init();
    SearchFilterManager.init();
    PaginationManager.init();
}

/**
 * ============================================
 * Tab Manager Module
 * ============================================
 */
const TabManager = {
    init() {
        this.attachEventListeners();
    },

    attachEventListeners() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.switchTab(e.target);
            });
        });
    },

    switchTab(clickedTab) {
        // Remove active class from all tabs and panes
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        // Add active class to clicked tab
        clickedTab.classList.add('active');

        // Show corresponding pane
        const targetPane = clickedTab.getAttribute('data-tab');
        const pane = document.getElementById(targetPane);
        if (pane) {
            pane.classList.add('active');

            // Load tab-specific data
            this.loadTabData(targetPane);
        }
    },

    loadTabData(tabName) {
        switch (tabName) {
            case 'customer-billings':
                InvoiceManager.loadCustomerInvoices();
                break;
            case 'carpal-billings':
                PaymentManager.loadPlatformInvoices();
                break;
            case 'refunds':
                RefundManager.loadRefundRequests();
                break;
            case 'reports':
                ReportManager.loadReportData();
                break;
            case 'payment-history':
                PaymentManager.loadPaymentHistory();
                break;
        }
    }
};

/**
 * ============================================
 * Modal Manager Module
 * ============================================
 */
const ModalManager = {
    activeModals: [],

    init() {
        this.attachCloseHandlers();
        this.attachOutsideClickHandlers();
    },

    attachCloseHandlers() {
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    },

    attachOutsideClickHandlers() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    },

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
            this.activeModals.push(modalId);
            document.body.style.overflow = 'hidden';
        }
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);

            const index = this.activeModals.indexOf(modalId);
            if (index > -1) {
                this.activeModals.splice(index, 1);
            }

            if (this.activeModals.length === 0) {
                document.body.style.overflow = '';
            }
        }
    }
};

/**
 * ============================================
 * Invoice Manager Module
 * ============================================
 */
const InvoiceManager = {
    currentInvoice: null,
    serviceItems: [],

    init() {
        this.setupEventListeners();
        this.loadCustomerInvoices();
    },

    setupEventListeners() {
        // Invoice form submit
        const invoiceForm = document.querySelector('#create-invoice-form form');
        if (invoiceForm) {
            invoiceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateInvoice();
            });
        }

        // Service item calculations
        this.setupServiceItemCalculations();
    },

    setupServiceItemCalculations() {
        document.addEventListener('input', (e) => {
            if (e.target.matches('.service-item-row input[type="number"]')) {
                this.calculateServiceTotals();
            }
        });
    },

    loadCustomerInvoices() {
        // Simulate loading invoice data
        console.log('Loading customer invoices...');
        // In production, this would fetch from API
    },

    calculateServiceTotals() {
        let subtotal = 0;

        document.querySelectorAll('.service-item-row').forEach(row => {
            const quantity = parseFloat(row.querySelector('input[type="number"][min="1"]')?.value) || 0;
            const unitPrice = parseFloat(row.querySelector('input[placeholder="0.00"]')?.value) || 0;
            const lineTotal = quantity * unitPrice;

            const lineTotalInput = row.querySelector('input[readonly]');
            if (lineTotalInput) {
                lineTotalInput.value = lineTotal.toFixed(2);
            }

            subtotal += lineTotal;
        });

        // Calculate service charge based on amount ranges
        const serviceCharge = this.calculateServiceCharge(subtotal);
        const total = subtotal + serviceCharge;

        // Update display
        this.updateTotalDisplay(subtotal, serviceCharge, total);
    },

    calculateServiceCharge(amount) {
        // Service charge calculation based on navigation map
        if (amount >= 10 && amount <= 24999) {
            return amount * 0.10; // 10% for KES 10-24,999
        } else if (amount >= 25000 && amount <= 49999) {
            return 2500; // Fixed KES 2,500 for KES 25,000-49,999
        } else if (amount >= 50000 && amount <= 99999) {
            return 5000; // Fixed KES 5,000 for KES 50,000-99,999
        } else if (amount >= 100000) {
            return 15000; // Fixed KES 15,000 for KES 100,000+
        }
        return 0;
    },

    updateTotalDisplay(subtotal, serviceCharge, total) {
        const infoGrid = document.querySelector('.info-section .info-grid');
        if (infoGrid) {
            const spans = infoGrid.querySelectorAll('span');
            if (spans[1]) spans[1].textContent = `KES. ${subtotal.toFixed(2).toLocaleString()}`;
            if (spans[3]) spans[3].textContent = `KES. ${serviceCharge.toFixed(2).toLocaleString()}`;
            if (spans[5]) spans[5].innerHTML = `<strong>KES. ${total.toFixed(2).toLocaleString()}</strong>`;
        }
    },

    generateInvoice() {
        // Collect form data
        const formData = this.collectFormData();

        // Validate form
        if (!this.validateInvoiceForm(formData)) {
            return;
        }

        // Generate invoice number
        const invoiceNumber = this.generateInvoiceNumber();

        // Save invoice
        this.saveInvoice({
            ...formData,
            invoiceNumber: invoiceNumber,
            date: new Date().toISOString(),
            status: formData.markAsPaid ? 'Paid' : 'Unpaid'
        });

        // Show success message
        NotificationManager.showSuccess(`Invoice ${invoiceNumber} generated successfully!`);

        // Send to customer if option selected
        if (formData.sendToCustomer) {
            this.emailInvoiceToCustomer(invoiceNumber, formData.email);
        }

        // Reset form and hide
        this.resetInvoiceForm();
        hideCreateInvoiceForm();
    },

    collectFormData() {
        const form = document.querySelector('#create-invoice-form form');
        const formData = {
            // Vehicle info
            searchMethod: form.querySelector('#search-method').value,
            licensePlate: form.querySelector('input[placeholder*="KDB"]').value,

            // Customer info
            customerName: form.querySelector('input[placeholder="Enter customer name"]').value,
            phone: form.querySelector('input[type="tel"]').value,
            email: form.querySelector('input[type="email"]').value,
            vehicleDetails: form.querySelector('input[placeholder*="Make, Model"]').value,

            // Payment details
            paymentMethod: form.querySelector('select option[selected]')?.parentElement.value || 'M-Pesa',
            dueDate: form.querySelector('input[type="date"]').value,

            // Options
            sendToCustomer: form.querySelector('#send-to-customer').checked,
            markAsPaid: form.querySelector('#mark-as-paid').checked,

            // Service items
            serviceItems: this.collectServiceItems()
        };

        return formData;
    },

    collectServiceItems() {
        const items = [];
        document.querySelectorAll('.service-item-row').forEach(row => {
            const description = row.querySelector('input[placeholder*="Engine Oil"]').value;
            const quantity = row.querySelector('input[min="1"]').value;
            const unitPrice = row.querySelector('input[placeholder="0.00"]:not([readonly])').value;
            const lineTotal = row.querySelector('input[readonly]').value;

            if (description && quantity && unitPrice) {
                items.push({
                    description,
                    quantity: parseFloat(quantity),
                    unitPrice: parseFloat(unitPrice),
                    lineTotal: parseFloat(lineTotal)
                });
            }
        });
        return items;
    },

    validateInvoiceForm(formData) {
        const errors = [];

        if (!formData.customerName) errors.push('Customer name is required');
        if (!formData.phone) errors.push('Phone number is required');
        if (!formData.licensePlate) errors.push('License plate is required');
        if (formData.serviceItems.length === 0) errors.push('At least one service item is required');

        if (errors.length > 0) {
            NotificationManager.showError(errors.join('<br>'));
            return false;
        }

        return true;
    },

    generateInvoiceNumber() {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `#${year}-${random}`;
    },

    saveInvoice(invoiceData) {
        // In production, this would save to backend
        console.log('Saving invoice:', invoiceData);

        // Store in localStorage for demo
        const invoices = JSON.parse(localStorage.getItem('carpal_invoices') || '[]');
        invoices.push(invoiceData);
        localStorage.setItem('carpal_invoices', JSON.stringify(invoices));
    },

    emailInvoiceToCustomer(invoiceNumber, email) {
        // Simulate email sending
        console.log(`Sending invoice ${invoiceNumber} to ${email}`);
        NotificationManager.showInfo(`Invoice sent to ${email}`);
    },

    resetInvoiceForm() {
        document.querySelector('#create-invoice-form form').reset();
        document.querySelectorAll('.service-item-row:not(:first-child)').forEach(row => {
            row.remove();
        });
        this.calculateServiceTotals();
    }
};

/**
 * ============================================
 * Payment Manager Module
 * ============================================
 */
const PaymentManager = {
    init() {
        this.setupMPesaIntegration();
    },

    setupMPesaIntegration() {
        // Setup M-Pesa payment handlers
        console.log('M-Pesa integration initialized');
    },

    loadPlatformInvoices() {
        console.log('Loading platform invoices...');
        // Load CarPal platform invoices
    },

    loadPaymentHistory() {
        console.log('Loading payment history...');
        // Load payment records
    },

    processPayment(invoiceId, amount, method) {
        return new Promise((resolve, reject) => {
            // Simulate payment processing
            setTimeout(() => {
                const success = Math.random() > 0.1; // 90% success rate
                if (success) {
                    resolve({
                        status: 'success',
                        transactionId: 'TXN' + Date.now(),
                        amount: amount
                    });
                } else {
                    reject({
                        status: 'failed',
                        error: 'Payment processing failed'
                    });
                }
            }, 2000);
        });
    },

    verifyMPesaPayment(transactionCode) {
        // Simulate M-Pesa verification
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    verified: true,
                    amount: 59500,
                    date: new Date().toISOString()
                });
            }, 2000);
        });
    }
};

/**
 * ============================================
 * Refund Manager Module
 * ============================================
 */
const RefundManager = {
    init() {
        this.setupRefundForm();
    },

    setupRefundForm() {
        const refundForm = document.querySelector('#refund-request-form form');
        if (refundForm) {
            refundForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitRefundRequest();
            });
        }
    },

    loadRefundRequests() {
        console.log('Loading refund requests...');
        // Load refund data
    },

    submitRefundRequest() {
        const formData = {
            customerName: document.querySelector('#refund-request-form input[placeholder*="customer name"]').value,
            invoiceRef: document.querySelector('#refund-request-form input[placeholder*="#2025"]').value,
            amount: document.querySelector('#refund-request-form input[type="number"]').value,
            reason: document.querySelector('#refund-request-form select').value,
            comments: document.querySelector('#refund-request-form textarea').value
        };

        if (this.validateRefundForm(formData)) {
            this.processRefundRequest(formData);
        }
    },

    validateRefundForm(data) {
        if (!data.customerName || !data.invoiceRef || !data.amount || !data.reason) {
            NotificationManager.showError('Please fill all required fields');
            return false;
        }
        return true;
    },

    processRefundRequest(data) {
        // Save refund request
        console.log('Processing refund request:', data);

        NotificationManager.showSuccess('Refund request submitted successfully!');
        hideRefundForm();
        this.loadRefundRequests();
    }
};

/**
 * ============================================
 * Report Manager Module
 * ============================================
 */
const ReportManager = {
    init() {
        this.setupReportFilters();
    },

    setupReportFilters() {
        const generateBtn = document.querySelector('button[onclick="generateReport()"]');
        if (generateBtn) {
            generateBtn.removeAttribute('onclick');
            generateBtn.addEventListener('click', () => this.generateReport());
        }
    },

    loadReportData() {
        console.log('Loading report data...');
    },

    generateReport() {
        const reportType = document.getElementById('report-type').value;
        const dateInputs = document.querySelectorAll('#reports input[type="date"]');
        const startDate = dateInputs[0]?.value;
        const endDate = dateInputs[1]?.value;

        console.log(`Generating ${reportType} from ${startDate} to ${endDate}`);

        // Show loading
        NotificationManager.showInfo('Generating report...');

        // Simulate report generation
        setTimeout(() => {
            NotificationManager.showSuccess('Report generated successfully!');
            this.displayReport(reportType);
        }, 1500);
    },

    displayReport(type) {
        // Update report display area with generated data
        console.log('Displaying report:', type);
    },

    exportReport(format) {
        console.log('Exporting report as:', format);
        NotificationManager.showInfo(`Exporting as ${format}...`);

        setTimeout(() => {
            NotificationManager.showSuccess(`Report exported as ${format}`);
        }, 1000);
    }
};

/**
 * ============================================
 * Notification Manager Module
 * ============================================
 */
const NotificationManager = {
    init() {
        this.createNotificationContainer();
    },

    createNotificationContainer() {
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(container);
        }
    },

    showNotification(message, type = 'info', duration = 3000) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');

        const colors = {
            success: '#4CAF50',
            error: '#F44336',
            warning: '#FF9800',
            info: '#2196F3'
        };

        notification.style.cssText = `
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            min-width: 250px;
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' :
                type === 'error' ? 'exclamation-circle' :
                    type === 'warning' ? 'exclamation-triangle' :
                        'info-circle'}"></i>
            <span>${message}</span>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    },

    showSuccess(message) {
        this.showNotification(message, 'success');
    },

    showError(message) {
        this.showNotification(message, 'error', 5000);
    },

    showWarning(message) {
        this.showNotification(message, 'warning', 4000);
    },

    showInfo(message) {
        this.showNotification(message, 'info');
    }
};

/**
 * ============================================
 * Form Manager Module
 * ============================================
 */
const FormManager = {
    init() {
        this.setupFormValidation();
        this.setupDynamicFields();
    },

    setupFormValidation() {
        // Add real-time validation
        document.querySelectorAll('input[required], select[required]').forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
        });
    },

    validateField(field) {
        if (field.hasAttribute('required') && !field.value) {
            field.style.borderColor = 'var(--danger-red)';
            return false;
        }
        field.style.borderColor = '';
        return true;
    },

    setupDynamicFields() {
        // Setup dynamic form behaviors
        console.log('Dynamic form fields initialized');
    }
};

/**
 * ============================================
 * Search & Filter Manager Module
 * ============================================
 */
const SearchFilterManager = {
    init() {
        this.setupSearchHandlers();
        this.setupFilterHandlers();
    },

    setupSearchHandlers() {
        const searchInputs = document.querySelectorAll('.search-bar input, .history-search');
        searchInputs.forEach(input => {
            input.addEventListener('input', debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));
        });
    },

    setupFilterHandlers() {
        document.querySelectorAll('.filter-options select').forEach(select => {
            select.addEventListener('change', () => {
                this.applyFilters();
            });
        });
    },

    performSearch(query) {
        console.log('Searching for:', query);
        // Implement search logic
    },

    applyFilters() {
        console.log('Applying filters...');
        // Implement filter logic
    }
};

/**
 * ============================================
 * Pagination Manager Module
 * ============================================
 */
const PaginationManager = {
    currentPage: 1,
    itemsPerPage: 10,

    init() {
        this.setupPaginationHandlers();
    },

    setupPaginationHandlers() {
        document.querySelectorAll('.btn-page').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!btn.hasAttribute('disabled')) {
                    const pageNum = btn.textContent.trim();
                    if (pageNum.match(/\d+/)) {
                        this.goToPage(parseInt(pageNum));
                    } else if (btn.querySelector('.fa-chevron-left')) {
                        this.previousPage();
                    } else if (btn.querySelector('.fa-chevron-right')) {
                        this.nextPage();
                    }
                }
            });
        });
    },

    goToPage(pageNum) {
        this.currentPage = pageNum;
        this.updatePaginationDisplay();
        this.loadPageData();
    },

    previousPage() {
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1);
        }
    },

    nextPage() {
        this.goToPage(this.currentPage + 1);
    },

    updatePaginationDisplay() {
        document.querySelectorAll('.btn-page').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim() == this.currentPage) {
                btn.classList.add('active');
            }
        });
    },

    loadPageData() {
        console.log(`Loading page ${this.currentPage}`);
        // Load data for current page
    }
};

/**
 * ============================================
 * Dark Mode Manager Module
 * ============================================
 */
const DarkModeManager = {
    init() {
        this.loadDarkModePreference();
        this.setupToggleHandler();
    },

    loadDarkModePreference() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            this.updateToggleIcon(true);
        }
    },

    setupToggleHandler() {
        const toggleBtn = document.querySelector('.theme-toggle i');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }
    },

    toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        this.updateToggleIcon(isDarkMode);
    },

    updateToggleIcon(isDarkMode) {
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
};

/**
 * ============================================
 * Global Functions (Called from HTML)
 * ============================================
 */

// Invoice Functions
function showCreateInvoiceForm() {
    document.getElementById('create-invoice-form').style.display = 'block';
}

function hideCreateInvoiceForm() {
    document.getElementById('create-invoice-form').style.display = 'none';
}

function viewInvoice(invoiceId) {
    console.log('Viewing invoice:', invoiceId);
    ModalManager.openModal('invoice-detail-modal');
}

function emailInvoice(invoiceId) {
    console.log('Email invoice:', invoiceId);
    ModalManager.openModal('email-purpose-modal');
}

function downloadInvoice(invoiceId) {
    console.log('Download invoice:', invoiceId);
    ModalManager.openModal('download-purpose-modal');
}

function sendReminder(invoiceId) {
    console.log('Sending reminder for invoice:', invoiceId);
    NotificationManager.showSuccess('Payment reminder sent successfully!');
}

// Service Item Functions
function addServiceItem() {
    const serviceItemsContainer = document.getElementById('service-items');
    const newRow = document.querySelector('.service-item-row').cloneNode(true);

    // Clear values in cloned row
    newRow.querySelectorAll('input').forEach(input => {
        if (!input.hasAttribute('readonly')) {
            input.value = input.type === 'number' && input.min === '1' ? '1' : '';
        } else {
            input.value = '0.00';
        }
    });

    serviceItemsContainer.appendChild(newRow);
}

// Modal Functions
function closeModal(modalId) {
    ModalManager.closeModal(modalId);
}

function markAsPaid() {
    ModalManager.closeModal('invoice-detail-modal');
    ModalManager.openModal('payment-details-modal');
}

function editInvoice() {
    console.log('Editing invoice...');
    NotificationManager.showInfo('Edit mode activated');
}

// Download Functions
function showDownloadOptions() {
    ModalManager.closeModal('invoice-detail-modal');
    ModalManager.openModal('download-purpose-modal');
}

function showGeneralDownloadOptions() {
    ModalManager.closeModal('download-purpose-modal');
    ModalManager.openModal('general-download-modal');
}

function showBillingDownloadOptions() {
    ModalManager.closeModal('download-purpose-modal');
    ModalManager.openModal('billing-download-modal');
}

function processGeneralDownload() {
    const options = {
        invoiceOnly: document.getElementById('dl-invoice-only').checked,
        serviceHistory: document.getElementById('dl-service-history').checked,
        supportingDocs: document.getElementById('dl-supporting-docs').checked,
        watermark: true // Always true for general purpose
    };

    console.log('Processing general download with options:', options);
    NotificationManager.showInfo('Generating download with watermark...');

    setTimeout(() => {
        NotificationManager.showSuccess('Download ready!');
        ModalManager.closeModal('general-download-modal');
        // Trigger actual download
    }, 2000);
}

function processBillingDownload() {
    const notifyOwner = document.getElementById('notify-vehicle-owner').checked;

    console.log('Processing billing download...');
    NotificationManager.showInfo('Generating official billing documentation...');

    setTimeout(() => {
        NotificationManager.showSuccess('Billing documentation generated!');
        if (notifyOwner) {
            NotificationManager.showInfo('Email notification sent to vehicle owner');
        }
        ModalManager.closeModal('billing-download-modal');
    }, 2000);
}

// Email Functions
function showEmailOptions() {
    ModalManager.closeModal('invoice-detail-modal');
    ModalManager.openModal('email-purpose-modal');
}

function showGeneralEmailOptions() {
    ModalManager.closeModal('email-purpose-modal');
    // Create and show general email form modal
    NotificationManager.showInfo('Opening general email options...');
}

function showBillingEmailOptions() {
    ModalManager.closeModal('email-purpose-modal');
    // Create and show billing email form modal
    NotificationManager.showInfo('Preparing official billing email...');
}

function sendPaymentReminder() {
    console.log('Sending payment reminder...');
    NotificationManager.showSuccess('Payment reminder sent to customer!');
}

// Platform Invoice Functions
function viewPlatformInvoice(invoiceId) {
    console.log('Viewing platform invoice:', invoiceId);
    ModalManager.openModal('platform-invoice-modal');
}

function payNow(invoiceId) {
    console.log('Initiating payment for:', invoiceId);
    initiateMpesaPayment();
}

function downloadReceipt(invoiceId) {
    console.log('Downloading receipt for:', invoiceId);
    NotificationManager.showSuccess('Receipt downloaded successfully!');
}

function initiateMpesaPayment() {
    NotificationManager.showInfo('Opening M-Pesa payment...');

    // Simulate M-Pesa payment process
    setTimeout(() => {
        const confirmed = confirm('Complete M-Pesa payment?\n\nPaybill: 522123\nAccount: CP-2025-W03\nAmount: KES 59,500');

        if (confirmed) {
            NotificationManager.showInfo('Verifying payment...');
            setTimeout(() => {
                NotificationManager.showSuccess('Payment confirmed! Thank you.');
                ModalManager.closeModal('platform-invoice-modal');
            }, 3000);
        }
    }, 1000);
}

function downloadPlatformInvoice() {
    console.log('Downloading platform invoice...');
    NotificationManager.showSuccess('Invoice downloaded successfully!');
}

// Refund Functions
function showRefundForm() {
    document.getElementById('refund-request-form').style.display = 'block';
}

function hideRefundForm() {
    document.getElementById('refund-request-form').style.display = 'none';
}

function viewRefundRequest(refundId) {
    console.log('Viewing refund request:', refundId);
    NotificationManager.showInfo('Loading refund details...');
}

function approveRefund(refundId) {
    const confirmed = confirm(`Approve refund request ${refundId}?`);
    if (confirmed) {
        NotificationManager.showSuccess('Refund approved and processed!');
        RefundManager.loadRefundRequests();
    }
}

function rejectRefund(refundId) {
    const reason = prompt(`Rejection reason for refund ${refundId}:`);
    if (reason) {
        NotificationManager.showWarning('Refund request rejected');
        RefundManager.loadRefundRequests();
    }
}

// Payment History Functions
function viewPaymentDetails(paymentId) {
    console.log('Viewing payment details:', paymentId);
    NotificationManager.showInfo('Loading payment details...');
}

function printReceipt(paymentId) {
    console.log('Printing receipt for:', paymentId);
    window.print();
}

function emailReceipt(paymentId) {
    const email = prompt('Enter customer email address:');
    if (email) {
        console.log(`Sending receipt ${paymentId} to ${email}`);
        NotificationManager.showSuccess(`Receipt sent to ${email}`);
    }
}

// Report Functions
function generateReport() {
    ReportManager.generateReport();
}

// Dark Mode Function
function toggleDarkMode() {
    DarkModeManager.toggleDarkMode();
}

/**
 * ============================================
 * Utility Functions
 * ============================================
 */

// Debounce function for search
function debounce(func, wait) {
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

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone (Kenya format)
function validatePhone(phone) {
    const re = /^(\+254|0)[7][0-9]{8}$/;
    return re.test(phone.replace(/\s/g, ''));
}

/**
 * ============================================
 * Add CSS for notifications
 * ============================================
 */
const notificationStyles = `
<style>
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);

// Initialize notification container on load
NotificationManager.init();

console.log('CarPal Billings & Payments JavaScript loaded successfully!');