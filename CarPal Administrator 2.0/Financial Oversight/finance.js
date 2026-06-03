/**
 * CarPal by Citrus - Finance Module JavaScript
 * This file contains all the JS functionality for the Finance page of the CarPal application
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTabNavigation();
    initQuickActions();
    initDarkModeToggle();
    initSearchFilters();
    initPagination();
    initButtonHandlers();
    initDatePickers();
    initModalHandlers();
    initDataVisualizationPlaceholders();

    // Show the first tab by default
    // First tab is already active from HTML but we'll ensure it's shown
    showActiveTab();
});

/**
 * Tab Navigation
 */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-buttons .tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show the corresponding tab content
            showActiveTab();
        });
    });

    // Handle secondary tabs like view buttons in Revenue Source Analysis
    const viewButtons = document.querySelectorAll('.view-selector .view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all view buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real implementation, this would update the chart data
            // For now, we just display a message
            console.log('View changed to: ' + this.textContent.trim());
        });
    });

    // Handle Growth Trend chart type selection
    const chartTypeButtons = document.querySelectorAll('.chart-type-selector .chart-type-btn');
    chartTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all chart type buttons
            chartTypeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real implementation, this would update the chart data
            // For now, we just display a message
            console.log('Chart type changed to: ' + this.textContent.trim());
        });
    });

    // Handle invoice audit filter buttons
    const filterButtons = document.querySelectorAll('.status-filters .filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real implementation, this would filter the table
            console.log('Filter changed to: ' + this.textContent.trim());
        });
    });

    // Handle date range buttons
    const rangeButtons = document.querySelectorAll('.preset-ranges .range-btn');
    rangeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all range buttons
            rangeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide custom date inputs if "Custom" is selected
            const customRangePicker = document.querySelector('.custom-range-picker');
            if (this.textContent.trim() === 'Custom') {
                customRangePicker.style.display = 'flex';
            } else {
                customRangePicker.style.display = 'none';
            }
            
            // In a real implementation, this would update the date range
            console.log('Date range changed to: ' + this.textContent.trim());
        });
    });
}

/**
 * Show the active tab content based on the active tab button
 */
function showActiveTab() {
    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Get the active tab button
    const activeTabButton = document.querySelector('.tab-buttons .tab-btn.active');
    if (activeTabButton) {
        // Get the tab ID from the button's data-tab attribute
        const tabId = activeTabButton.getAttribute('data-tab');
        
        // Show the corresponding tab content
        const activeTabContent = document.getElementById(tabId);
        if (activeTabContent) {
            activeTabContent.classList.add('active');
        }
    }
}

/**
 * Quick Actions initialization
 */
function initQuickActions() {
    // Handle Generate Report button click
    const generateReportBtn = document.querySelector('.generate-report-btn');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function() {
            // Simulate navigating to the Financial Reports Export tab
            const reportsExportTab = document.querySelector('.tab-btn[data-tab="financial-reports-export"]');
            if (reportsExportTab) {
                reportsExportTab.click();
                // Scroll to the Custom Report Generation section
                const reportGenSection = document.querySelector('#financial-reports-export .tab-section:first-child');
                if (reportGenSection) {
                    reportGenSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Handle Reconcile Payments button click
    const reconcilePaymentsBtn = document.querySelector('.reconcile-payments-btn');
    if (reconcilePaymentsBtn) {
        reconcilePaymentsBtn.addEventListener('click', function() {
            // Simulate navigating to the Payment Reconciliation tab
            const reconciliationTab = document.querySelector('.tab-btn[data-tab="payment-reconciliation"]');
            if (reconciliationTab) {
                reconciliationTab.click();
                // Scroll to the Payment Matching section
                const matchingSection = document.querySelector('#payment-reconciliation .tab-section:first-child');
                if (matchingSection) {
                    matchingSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Handle View Alerts button click
    const viewAlertsBtn = document.querySelector('.view-alerts-btn');
    if (viewAlertsBtn) {
        viewAlertsBtn.addEventListener('click', function() {
            // In a real implementation, this would show a modal with alerts
            alert('Alert details would be shown in a modal window.');
        });
    }
}

/**
 * Dark Mode Toggle
 */
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        // Check if user preference is stored
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Apply dark mode if user preference is set to dark
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.querySelector('i').classList.remove('fa-moon');
            darkModeToggle.querySelector('i').classList.add('fa-sun');
        }
        
        darkModeToggle.addEventListener('click', function() {
            // Toggle dark mode class on body
            document.body.classList.toggle('dark-mode');
            
            // Update icon
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('darkMode', 'true');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
}

/**
 * Search and Filter Functionality
 */
function initSearchFilters() {
    // Transaction search
    const transactionSearchInput = document.querySelector('#payment-tracking .search-input');
    const searchBtn = document.querySelector('#payment-tracking .search-btn');
    
    if (transactionSearchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(transactionSearchInput.value, 'transactions');
        });
        
        transactionSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value, 'transactions');
            }
        });
    }
    
    // Invoice search
    const invoiceSearchInput = document.querySelector('#invoice-audits .search-input');
    const advancedSearchBtn = document.querySelector('#invoice-audits .advanced-search-btn');
    
    if (invoiceSearchInput && advancedSearchBtn) {
        advancedSearchBtn.addEventListener('click', function() {
            // In a real implementation, this would show advanced search options
            console.log('Advanced search for: ' + invoiceSearchInput.value);
        });
        
        invoiceSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value, 'invoices');
            }
        });
    }
    
    // Audit log search
    const auditSearchInput = document.querySelector('#invoice-audits .audit-filter-controls .search-input');
    const filterApplyBtn = document.querySelector('#invoice-audits .filter-apply-btn');
    
    if (auditSearchInput && filterApplyBtn) {
        filterApplyBtn.addEventListener('click', function() {
            // Get selected filters
            const actionFilter = document.querySelector('#invoice-audits .audit-filter-controls select:first-of-type').value;
            const userFilter = document.querySelector('#invoice-audits .audit-filter-controls select:last-of-type').value;
            
            // In a real implementation, this would apply the filters
            console.log('Search for: ' + auditSearchInput.value + ' with action: ' + actionFilter + ' and user: ' + userFilter);
        });
    }
    
    // Filter select controls
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // In a real implementation, this would apply the filter
            console.log('Filter changed to: ' + this.value);
        });
    });

    // Advanced filter button
    const advancedFilterBtn = document.querySelector('.advanced-filter-btn');
    if (advancedFilterBtn) {
        advancedFilterBtn.addEventListener('click', function() {
            // In a real implementation, this would show advanced filter options
            alert('Advanced filter options would be shown in a modal window.');
        });
    }
}

/**
 * Mock search function
 */
function performSearch(query, type) {
    if (!query.trim()) {
        return;
    }
    
    console.log('Searching for: ' + query + ' in ' + type);
    // In a real implementation, this would filter the table based on the search query
    alert('Searching for: "' + query + '" in ' + type);
}

/**
 * Pagination Controls
 */
function initPagination() {
    // Transaction table pagination
    initTablePagination('payment-tracking');
    
    // Invoice table pagination
    initTablePagination('invoice-audits');
}

/**
 * Initialize pagination for a specific table
 */
function initTablePagination(tabId) {
    const prevBtn = document.querySelector(`#${tabId} .pagination-btn.prev`);
    const nextBtn = document.querySelector(`#${tabId} .pagination-btn.next`);
    const pageInfo = document.querySelector(`#${tabId} .pagination-info`);
    
    if (prevBtn && nextBtn && pageInfo) {
        // Extract current page and total pages
        const pageText = pageInfo.textContent;
        const match = pageText.match(/Page (\d+) of (\d+)/);
        
        if (match) {
            let currentPage = parseInt(match[1]);
            const totalPages = parseInt(match[2]);
            
            prevBtn.addEventListener('click', function() {
                if (currentPage > 1) {
                    currentPage--;
                    updatePageInfo();
                }
            });
            
            nextBtn.addEventListener('click', function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePageInfo();
                }
            });
            
            function updatePageInfo() {
                pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
                
                // Disable/enable buttons based on current page
                prevBtn.disabled = currentPage === 1;
                nextBtn.disabled = currentPage === totalPages;
                
                // In a real implementation, this would fetch the data for the new page
                console.log(`Loading page ${currentPage} for ${tabId}`);
            }
            
            // Initial button state
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
        }
    }
}

/**
 * Button Event Handlers
 */
function initButtonHandlers() {
    // View Details Buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the transaction ID from the row
            const row = this.closest('tr');
            const transactionId = row.querySelector('td:first-child').textContent;
            
            // In a real implementation, this would open a modal with transaction details
            alert(`Viewing details for transaction: ${transactionId}`);
        });
    });
    
    // View Invoice Buttons
    const viewInvoiceButtons = document.querySelectorAll('.view-invoice-btn');
    viewInvoiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the invoice number from the row
            const row = this.closest('tr');
            const invoiceNumber = row.querySelector('td:first-child').textContent;
            
            // In a real implementation, this would open a modal with invoice details
            alert(`Viewing invoice: ${invoiceNumber}`);
        });
    });
    
    // Resolve and Validate Buttons
    const actionButtons = document.querySelectorAll('.resolve-btn, .validate-now-btn, .fix-issues-btn, .view-progress-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the ID from the row
            const row = this.closest('tr');
            const id = row.querySelector('td:first-child').textContent;
            
            // Different message based on button class
            let action = "";
            if (this.classList.contains('resolve-btn')) {
                action = "Resolving";
            } else if (this.classList.contains('validate-now-btn')) {
                action = "Validating";
            } else if (this.classList.contains('fix-issues-btn')) {
                action = "Fixing issues for";
            } else if (this.classList.contains('view-progress-btn')) {
                action = "Viewing progress for";
            }
            
            // In a real implementation, this would open a modal or perform the action
            alert(`${action} ${id}`);
        });
    });
    
    // Discrepancy Management Buttons
    const resolveAllBtn = document.querySelector('.resolve-all-btn');
    const escalateBtn = document.querySelector('.escalate-btn');
    const configureAlertsBtn = document.querySelector('.configure-alerts-btn');
    
    if (resolveAllBtn) {
        resolveAllBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to resolve all minor issues?')) {
                // In a real implementation, this would resolve all minor issues
                alert('All minor issues have been resolved.');
            }
        });
    }
    
    if (escalateBtn) {
        escalateBtn.addEventListener('click', function() {
            // In a real implementation, this would escalate critical issues
            alert('Critical issues have been escalated to management.');
        });
    }
    
    if (configureAlertsBtn) {
        configureAlertsBtn.addEventListener('click', function() {
            // In a real implementation, this would open alert configuration
            alert('Alert configuration dialog would open here.');
        });
    }
    
    // Payment Matching Buttons
    const autoMatchBtn = document.querySelector('.auto-match-btn');
    const refreshDataBtn = document.querySelector('.refresh-data-btn');
    
    if (autoMatchBtn) {
        autoMatchBtn.addEventListener('click', function() {
            // In a real implementation, this would auto-match payments
            alert('Auto-matching all payments...');
        });
    }
    
    if (refreshDataBtn) {
        refreshDataBtn.addEventListener('click', function() {
            // In a real implementation, this would refresh the data
            alert('Refreshing payment data...');
        });
    }
    
    // Match Payment Buttons
    const matchPaymentButtons = document.querySelectorAll('.match-payment-btn');
    matchPaymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the payment ID from the row
            const row = this.closest('tr');
            const paymentId = row.querySelector('td:first-child').textContent;
            
            // In a real implementation, this would open a matching interface
            alert(`Matching payment: ${paymentId}`);
        });
    });
    
    // M-Pesa Import Buttons
    const importStatementBtn = document.querySelector('.import-statement-btn');
    const apiImportBtn = document.querySelector('.api-import-btn');
    const manualEntryBtn = document.querySelector('.manual-entry-btn');
    
    if (importStatementBtn) {
        importStatementBtn.addEventListener('click', function() {
            // In a real implementation, this would open a file upload dialog
            alert('File upload dialog for M-Pesa statement would open here.');
        });
    }
    
    if (apiImportBtn) {
        apiImportBtn.addEventListener('click', function() {
            // In a real implementation, this would initiate API import
            alert('Initiating API import of M-Pesa transactions...');
        });
    }
    
    if (manualEntryBtn) {
        manualEntryBtn.addEventListener('click', function() {
            // In a real implementation, this would open manual entry form
            alert('Manual entry form for M-Pesa transactions would open here.');
        });
    }
    
    // Report Generation Buttons
    const generateReportBtns = document.querySelectorAll('.generate-report-btn, .export-unreconciled-btn, .schedule-report-btn');
    generateReportBtns.forEach(button => {
        button.addEventListener('click', function() {
            let action = "";
            if (this.classList.contains('generate-report-btn')) {
                action = "Generating report";
            } else if (this.classList.contains('export-unreconciled-btn')) {
                action = "Exporting unreconciled transactions";
            } else if (this.classList.contains('schedule-report-btn')) {
                action = "Opening schedule report dialog";
            }
            
            // In a real implementation, this would perform the action
            alert(action);
        });
    });
    
    // Configure Format Buttons
    const configureFormatBtns = document.querySelectorAll('.configure-format-btn');
    configureFormatBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Get the format type from the heading
            const formatCard = this.closest('.format-card');
            const formatType = formatCard.querySelector('h3').textContent;
            
            // In a real implementation, this would open format configuration
            alert(`Configuring ${formatType} options...`);
        });
    });
    
    // Save Preference Button
    const savePreferenceBtn = document.querySelector('.save-preference-btn');
    if (savePreferenceBtn) {
        savePreferenceBtn.addEventListener('click', function() {
            // Get the selected format
            const selectedFormat = document.querySelector('input[name="default-format"]:checked').nextElementSibling.textContent;
            
            // In a real implementation, this would save the preference
            alert(`Default format set to: ${selectedFormat}`);
        });
    }
    
    // Scheduled Reports Buttons
    const createScheduleBtn = document.querySelector('.create-schedule-btn');
    const manageRecipientsBtn = document.querySelector('.manage-recipients-btn');
    const viewHistoryBtn = document.querySelector('.view-history-btn');
    
    if (createScheduleBtn) {
        createScheduleBtn.addEventListener('click', function() {
            // In a real implementation, this would open schedule creation
            alert('Create new schedule dialog would open here.');
        });
    }
    
    if (manageRecipientsBtn) {
        manageRecipientsBtn.addEventListener('click', function() {
            // In a real implementation, this would open recipient management
            alert('Recipient management interface would open here.');
        });
    }
    
    if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', function() {
            // In a real implementation, this would open schedule history
            alert('Schedule history would be displayed here.');
        });
    }
    
    // Edit and Run Schedule Buttons
    const editScheduleBtns = document.querySelectorAll('.edit-schedule-btn');
    const runNowBtns = document.querySelectorAll('.run-now-btn');
    
    editScheduleBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Get the report name from the row
            const row = this.closest('tr');
            const reportName = row.querySelector('td:first-child').textContent;
            
            // In a real implementation, this would open schedule editing
            alert(`Editing schedule for: ${reportName}`);
        });
    });
    
    runNowBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Get the report name from the row
            const row = this.closest('tr');
            const reportName = row.querySelector('td:first-child').textContent;
            
            // In a real implementation, this would run the report now
            alert(`Running report now: ${reportName}`);
        });
    });
    
    // Manage Groups Button
    const manageGroupsBtn = document.querySelector('.manage-groups-btn');
    if (manageGroupsBtn) {
        manageGroupsBtn.addEventListener('click', function() {
            // In a real implementation, this would open group management
            alert('Recipient group management interface would open here.');
        });
    }
    
    // Field Configuration Button
    const fieldConfigBtn = document.querySelector('.field-config-btn');
    if (fieldConfigBtn) {
        fieldConfigBtn.addEventListener('click', function() {
            // In a real implementation, this would open field configuration
            alert('Field ordering and grouping interface would open here.');
        });
    }
    
    // Advanced Filters Button
    const advancedFiltersBtn = document.querySelector('.advanced-filters-btn');
    if (advancedFiltersBtn) {
        advancedFiltersBtn.addEventListener('click', function() {
            // In a real implementation, this would open advanced filters
            alert('Advanced filter options would open here.');
        });
    }
    
    // Apply Range Button
    const applyRangeBtn = document.querySelector('.apply-range-btn');
    if (applyRangeBtn) {
        applyRangeBtn.addEventListener('click', function() {
            // Get the date range values
            const startDate = document.querySelector('.date-input-group:first-of-type .date-input').value;
            const endDate = document.querySelector('.date-input-group:last-of-type .date-input').value;
            
            if (startDate && endDate) {
                // In a real implementation, this would apply the custom date range
                alert(`Applying custom date range: ${startDate} to ${endDate}`);
            } else {
                alert('Please select both start and end dates.');
            }
        });
    }
    
    // Audit Report Actions
    const generateAuditReportBtn = document.querySelector('.generate-audit-report-btn');
    const exportLogBtn = document.querySelector('.export-log-btn');
    
    if (generateAuditReportBtn) {
        generateAuditReportBtn.addEventListener('click', function() {
            // In a real implementation, this would generate audit report
            alert('Generating comprehensive audit report...');
        });
    }
    
    if (exportLogBtn) {
        exportLogBtn.addEventListener('click', function() {
            // In a real implementation, this would export audit log
            alert('Exporting audit log...');
        });
    }
}

/**
 * Date Picker Initialization
 */
function initDatePickers() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
        // Set default dates if empty
        if (!input.value) {
            // Default to today for date inputs
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            input.value = `${yyyy}-${mm}-${dd}`;
        }
    });
    
    // By default, hide the custom range picker unless "Custom" is selected
    const customRangePicker = document.querySelector('.custom-range-picker');
    if (customRangePicker) {
        customRangePicker.style.display = 'none';
    }
}

/**
 * Modal Dialog Handlers
 */
function initModalHandlers() {
    // In a complete implementation, this would handle showing and hiding modals
    // For the demo, we're using alert() instead of actual modals
    
    // This is a placeholder for future modal implementation
    function showModal(id, data) {
        console.log(`Showing modal ${id} with data:`, data);
        // In a real implementation, this would show a modal dialog
    }
}

/**
 * Data Visualization Placeholders
 */
function initDataVisualizationPlaceholders() {
    // This would be replaced with actual chart initialization in a real implementation
    // For now, we're just adding a click handler to chart placeholders
    
    const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
    chartPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const chartType = this.textContent.trim();
            alert(`In a real implementation, this would show a ${chartType}`);
        });
    });
}

/**
 * Simulated API calls for data
 * In a real implementation, these would make actual API requests
 */
function fetchTransactions(page = 1, filters = {}) {
    console.log('Fetching transactions:', { page, filters });
    // This would return transaction data from an API
    return simulateAsyncOperation({ page, count: 10, totalPages: 24 });
}

function fetchInvoices(page = 1, filters = {}) {
    console.log('Fetching invoices:', { page, filters });
    // This would return invoice data from an API
    return simulateAsyncOperation({ page, count: 10, totalPages: 18 });
}

function fetchRevenueData(dateRange = {}) {
    console.log('Fetching revenue data:', dateRange);
    // This would return revenue data from an API
    return simulateAsyncOperation({ total: 3542895, growth: 12.5 });
}

// Helper to simulate async operations
function simulateAsyncOperation(data) {
    return new Promise(resolve => {
        setTimeout(() => resolve(data), 500);
    });
}