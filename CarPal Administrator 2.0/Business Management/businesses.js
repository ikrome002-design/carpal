/**
 * CarPal by Citrus - Business Management JavaScript
 * 
 * This file contains all the functionality for the Business Management page
 * including tab switching, modal handling, form validation, data operations,
 * and user interactions.
 */

// Wait for the DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeTabs();
    initializeModals();
    initializeDropdowns();
    initializeToggles();
    initializeButtonActions();
    initializeFormValidation();
    initializeDataTables();
    initializeOTPFunctionality();
    initializeFileUpload();
    initializeDarkMode();
});

// ==========================================
// Tab Switching Functionality
// ==========================================

/**
 * Initialize all tab functionality on the page
 */
function initializeTabs() {
    // Business Status Management Tabs
    initializeTabGroup('.tabs-header .tab-btn', '.tab-content');
    
    // Search Module Tabs
    initializeTabGroup('.search-tabs .search-tab-btn', '.search-tab-content');
    
    // User Management Tabs
    initializeTabGroup('.user-management-tabs .user-tab-btn', '.user-tab-content');
    
    // Bulk Operations Tabs
    initializeTabGroup('.bulk-operations-tabs .bulk-tab-btn', '.bulk-tab-content');
}

/**
 * Generic function to initialize a group of tabs
 * @param {string} tabSelector - CSS selector for tab buttons
 * @param {string} contentSelector - CSS selector for tab content
 */
function initializeTabGroup(tabSelector, contentSelector) {
    const tabButtons = document.querySelectorAll(tabSelector);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            
            // Hide all tab content
            const allContent = document.querySelectorAll(contentSelector);
            allContent.forEach(content => content.classList.remove('active'));
            
            // Show the corresponding tab content
            const targetId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ==========================================
// Modal Functionality
// ==========================================

/**
 * Initialize modal functionality
 */
function initializeModals() {
    // Add Business Modal
    setupModal('addBusinessBtn', 'add-business-modal');
    
    // Suspend Business Modal
    setupSuspendBusinessModal();
    
    // OTP Verification Modal
    setupOTPModal();
    
    // Close Buttons for all modals
    const closeButtons = document.querySelectorAll('.close-modal-btn, .cancel-modal-btn');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
}

/**
 * Setup a modal with open button
 * @param {string} buttonId - ID of the button that opens the modal
 * @param {string} modalId - ID of the modal to open
 */
function setupModal(buttonId, modalId) {
    const button = document.getElementById(buttonId);
    const modal = document.getElementById(modalId);
    
    if (button && modal) {
        button.addEventListener('click', () => {
            openModal(modal);
        });
    }
}

/**
 * Setup Suspend Business Modal with business selection
 */
function setupSuspendBusinessModal() {
    const suspendButtons = document.querySelectorAll('.action-btn.suspend');
    const modal = document.getElementById('suspend-business-modal');
    
    if (suspendButtons.length && modal) {
        suspendButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const row = button.closest('tr');
                const businessName = row.querySelector('td:first-child').textContent;
                const businessId = row.querySelector('td:nth-child(2)').textContent;
                
                // Set business info in modal
                const businessNameElement = modal.querySelector('.selected-business-name');
                if (businessNameElement) {
                    businessNameElement.textContent = `${businessName} (${businessId})`;
                }
                
                // Set current date as default for suspension start
                const startDateInput = document.getElementById('suspension-start');
                if (startDateInput) {
                    startDateInput.valueAsDate = new Date();
                }
                
                // Set default end date (30 days from now)
                const endDateInput = document.getElementById('suspension-end');
                if (endDateInput) {
                    const endDate = new Date();
                    endDate.setDate(endDate.getDate() + 30);
                    endDateInput.valueAsDate = endDate;
                }
                
                openModal(modal);
            });
        });
        
        // Setup suspension duration toggle
        const temporaryRadio = document.getElementById('duration-temporary');
        const permanentRadio = document.getElementById('duration-permanent');
        const dateFields = document.getElementById('temporary-duration-fields');
        
        if (temporaryRadio && permanentRadio && dateFields) {
            temporaryRadio.addEventListener('change', () => {
                dateFields.style.display = 'block';
            });
            
            permanentRadio.addEventListener('change', () => {
                dateFields.style.display = 'none';
            });
        }
        
        // Setup notification template change
        const templateSelect = document.getElementById('notification-template');
        const customMessage = document.getElementById('custom-notification');
        
        if (templateSelect && customMessage) {
            templateSelect.addEventListener('change', () => {
                const selectedTemplate = templateSelect.value;
                
                if (selectedTemplate === 'custom') {
                    customMessage.style.display = 'block';
                    customMessage.value = '';
                } else {
                    customMessage.style.display = 'none';
                    
                    // Set predefined template message
                    const templates = {
                        'payment-issue': 'Your account has been temporarily suspended due to payment issues. Please update your payment information to restore access to your account.',
                        'violation-notice': 'Your account has been suspended due to terms of service violations. Please contact our support team for more information.',
                        'general-suspension': 'Your account has been suspended. Please contact our support team for more information.'
                    };
                    
                    customMessage.value = templates[selectedTemplate] || '';
                }
            });
            
            // Trigger initial state
            templateSelect.dispatchEvent(new Event('change'));
        }
        
        // Setup confirmation button
        const confirmButton = modal.querySelector('.confirm-suspension-btn');
        if (confirmButton) {
            confirmButton.addEventListener('click', () => {
                const otpModal = document.getElementById('otp-verification-modal');
                
                // Validate form
                const reason = document.getElementById('suspension-reason').value;
                if (!reason) {
                    alert('Please select a suspension reason.');
                    return;
                }
                
                if (temporaryRadio.checked) {
                    const startDate = document.getElementById('suspension-start').value;
                    const endDate = document.getElementById('suspension-end').value;
                    
                    if (!startDate || !endDate) {
                        alert('Please select both start and end dates for temporary suspension.');
                        return;
                    }
                    
                    if (new Date(startDate) > new Date(endDate)) {
                        alert('End date must be after start date.');
                        return;
                    }
                }
                
                // Close suspend modal and open OTP verification
                closeModal(modal);
                if (otpModal) {
                    openModal(otpModal);
                    startOTPTimer();
                }
            });
        }
    }
}

/**
 * Open a modal
 * @param {HTMLElement} modal - The modal element to open
 */
function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

/**
 * Close a modal
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// ==========================================
// Dropdown Functionality
// ==========================================

/**
 * Initialize dropdown functionality
 */
function initializeDropdowns() {
    // User profile dropdown
    const profileIcon = document.getElementById('profile-icon');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            profileDropdown.style.display = 'none';
        });
        
        // Prevent closing when clicking inside dropdown
        profileDropdown.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }
}

// ==========================================
// Toggle Functionality
// ==========================================

/**
 * Initialize toggle functionality
 */
function initializeToggles() {
    // Notification toggle
    const notificationToggle = document.getElementById('notify-status-changes');
    if (notificationToggle) {
        notificationToggle.addEventListener('change', () => {
            // Save preference to local storage
            localStorage.setItem('notify-status-changes', notificationToggle.checked);
        });
        
        // Load saved preference
        const savedPreference = localStorage.getItem('notify-status-changes');
        if (savedPreference !== null) {
            notificationToggle.checked = savedPreference === 'true';
        }
    }
}

// ==========================================
// Button Actions
// ==========================================

/**
 * Initialize all button actions
 */
function initializeButtonActions() {
    // Analytics dashboard buttons
    setupViewDetailsButtons();
    
    // Business table action buttons
    setupBusinessTableActions();
    
    // Status update buttons
    setupStatusUpdateButtons();
    
    // Permissions and settings buttons
    setupPermissionsButtons();
    setupSettingsButtons();
    
    // Search buttons
    setupSearchButtons();
    
    // User management buttons
    setupUserManagementButtons();
    
    // Bulk operation buttons
    setupBulkOperationButtons();
    
    // Add Business Modal buttons
    setupAddBusinessButtons();
}

/**
 * Setup analytics dashboard buttons
 */
function setupViewDetailsButtons() {
    // View Details buttons
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn, .view-report-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cardTitle = button.closest('.analytics-card').querySelector('h3').textContent;
            alert(`Viewing ${cardTitle} details. This would navigate to a detailed report in a production environment.`);
        });
    });
}

/**
 * Setup business table action buttons
 */
function setupBusinessTableActions() {
    // View business buttons
    const viewButtons = document.querySelectorAll('.action-btn.view');
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const businessName = row.querySelector('td:first-child').textContent;
            const businessId = row.querySelector('td:nth-child(2)').textContent;
            
            // Populate the account details panel
            populateAccountDetails(businessName, businessId);
            
            // Scroll to account details section
            document.getElementById('account-details-panel').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Edit business buttons
    const editButtons = document.querySelectorAll('.action-btn.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const businessName = row.querySelector('td:first-child').textContent;
            alert(`Edit functionality for ${businessName} would open in a production environment.`);
        });
    });
    
    // Reactivate buttons
    const reactivateButtons = document.querySelectorAll('.action-btn.reactivate');
    reactivateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const businessName = row.querySelector('td:first-child').textContent;
            
            if (confirm(`Are you sure you want to reactivate ${businessName}?`)) {
                alert(`${businessName} has been reactivated.`);
                
                // In a real application, this would update the database and refresh the view
                addStatusUpdate(businessName, 'Inactive', 'Active', 'Admin User');
            }
        });
    });
    
    // Reinstate buttons
    const reinstateButtons = document.querySelectorAll('.action-btn.reinstate');
    reinstateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const businessName = row.querySelector('td:first-child').textContent;
            
            if (confirm(`Are you sure you want to reinstate ${businessName}?`)) {
                const otpModal = document.getElementById('otp-verification-modal');
                if (otpModal) {
                    openModal(otpModal);
                    startOTPTimer();
                    
                    // Store business to reinstate for after verification
                    sessionStorage.setItem('business-to-reinstate', businessName);
                }
            }
        });
    });
    
    // Contact buttons
    const contactButtons = document.querySelectorAll('.action-btn.contact');
    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const businessName = row.querySelector('td:first-child').textContent;
            alert(`Contact functionality for ${businessName} would open in a production environment.`);
        });
    });
    
    // Extend buttons
    const extendButtons = document.querySelectorAll('.action-btn.extend');
    extendButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const businessName = row.querySelector('td:first-child').textContent;
            alert(`Extend suspension functionality for ${businessName} would open in a production environment.`);
        });
    });
    
    // Pagination buttons
    setupPaginationButtons();
}

/**
 * Setup pagination buttons
 */
function setupPaginationButtons() {
    const prevButtons = document.querySelectorAll('.pagination-btn.prev');
    const nextButtons = document.querySelectorAll('.pagination-btn.next');
    
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageIndicator = button.parentElement.querySelector('.page-indicator');
            const currentText = pageIndicator.textContent;
            const match = currentText.match(/Page (\d+) of (\d+)/);
            
            if (match) {
                const currentPage = parseInt(match[1]);
                const totalPages = parseInt(match[2]);
                
                if (currentPage > 1) {
                    const newPage = currentPage - 1;
                    pageIndicator.textContent = `Page ${newPage} of ${totalPages}`;
                    
                    // In a real application, this would load the previous page of data
                    alert(`Loading page ${newPage} of businesses...`);
                }
            }
        });
    });
    
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageIndicator = button.parentElement.querySelector('.page-indicator');
            const currentText = pageIndicator.textContent;
            const match = currentText.match(/Page (\d+) of (\d+)/);
            
            if (match) {
                const currentPage = parseInt(match[1]);
                const totalPages = parseInt(match[2]);
                
                if (currentPage < totalPages) {
                    const newPage = currentPage + 1;
                    pageIndicator.textContent = `Page ${newPage} of ${totalPages}`;
                    
                    // In a real application, this would load the next page of data
                    alert(`Loading page ${newPage} of businesses...`);
                }
            }
        });
    });
}

/**
 * Setup status update buttons
 */
function setupStatusUpdateButtons() {
    const bulkUpdateBtn = document.querySelector('.bulk-update-btn');
    if (bulkUpdateBtn) {
        bulkUpdateBtn.addEventListener('click', () => {
            const bulkStatusUpdateBtn = document.getElementById('bulkStatusUpdateBtn');
            bulkStatusUpdateBtn.click(); // Trigger the bulk status update button at the top
        });
    }
    
    const bulkStatusUpdateBtn = document.getElementById('bulkStatusUpdateBtn');
    if (bulkStatusUpdateBtn) {
        bulkStatusUpdateBtn.addEventListener('click', () => {
            alert('Bulk status update functionality would open in a production environment.');
        });
    }
}

/**
 * Setup permissions buttons
 */
function setupPermissionsButtons() {
    // Edit role buttons
    const editRoleButtons = document.querySelectorAll('.edit-role-btn');
    editRoleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const roleName = button.id.replace('role-', '');
            alert(`Edit ${roleName} role functionality would open in a production environment.`);
        });
    });
    
    // Add custom permission button
    const addCustomPermissionBtn = document.querySelector('.add-custom-permission-btn');
    if (addCustomPermissionBtn) {
        addCustomPermissionBtn.addEventListener('click', () => {
            alert('Add custom permission functionality would open in a production environment.');
        });
    }
}

/**
 * Setup settings buttons
 */
function setupSettingsButtons() {
    // Save settings button
    const saveSettingsBtn = document.querySelector('.save-settings-btn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            alert('Settings saved successfully!');
        });
    }
    
    // Reset settings button
    const resetSettingsBtn = document.querySelector('.reset-settings-btn');
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all settings to default values?')) {
                alert('Settings have been reset to defaults.');
                // In a real application, this would reset form values to defaults
            }
        });
    }
}

/**
 * Setup search buttons
 */
function setupSearchButtons() {
    // Business search
    setupSearchForm('business-search');
    
    // User search
    setupSearchForm('user-search');
}

/**
 * Setup a search form
 * @param {string} formId - ID of the search form
 */
function setupSearchForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const searchBtn = form.querySelector('.search-btn');
    const resetBtn = form.querySelector('.reset-search-btn');
    const saveBtn = form.querySelector('.save-search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert(`Performing ${formId.replace('-', ' ')}. This would retrieve matching records in a production environment.`);
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert(`Search criteria saved. You can access this saved search in a production environment.`);
        });
    }
}

/**
 * Setup user management buttons
 */
function setupUserManagementButtons() {
    // Add user form
    const addUserForm = document.querySelector('#add-user .user-form');
    if (addUserForm) {
        const submitBtn = addUserForm.querySelector('.submit-btn');
        const cancelBtn = addUserForm.querySelector('.cancel-btn');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', (event) => {
                event.preventDefault();
                
                // Simple validation
                const firstName = document.getElementById('add-user-first-name').value;
                const lastName = document.getElementById('add-user-last-name').value;
                const email = document.getElementById('add-user-email').value;
                const phone = document.getElementById('add-user-phone').value;
                
                if (!firstName || !lastName || !email || !phone) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                alert('User added successfully!');
                addUserForm.reset();
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', (event) => {
                event.preventDefault();
                addUserForm.reset();
            });
        }
    }
    
    // User selection for editing
    const editUserSelect = document.getElementById('edit-user-select');
    if (editUserSelect) {
        editUserSelect.addEventListener('change', () => {
            const userId = editUserSelect.value;
            if (userId) {
                const editUserForm = document.getElementById('edit-user-form');
                const emptyState = editUserForm.querySelector('.empty-state');
                
                if (emptyState) {
                    emptyState.style.display = 'none';
                }
                
                // In a real application, this would load the user data from the server
                // For demonstration, we'll create a mock form
                editUserForm.innerHTML = `
                    <div class="form-row">
                        <div class="form-field">
                            <label for="edit-user-first-name">First Name</label>
                            <input type="text" id="edit-user-first-name" value="John" required>
                        </div>
                        <div class="form-field">
                            <label for="edit-user-last-name">Last Name</label>
                            <input type="text" id="edit-user-last-name" value="Doe" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label for="edit-user-email">Email</label>
                            <input type="email" id="edit-user-email" value="john.doe@example.com" required>
                        </div>
                        <div class="form-field">
                            <label for="edit-user-phone">Phone</label>
                            <input type="tel" id="edit-user-phone" value="+254712345678" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label for="edit-user-business">Business</label>
                            <select id="edit-user-business" required>
                                <option value="bus-10025" selected>AutoFix Kenya</option>
                                <option value="bus-10026">Nairobi Car Parts</option>
                                <option value="bus-10027">Mombasa Auto Service</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label for="edit-user-role">Role</label>
                            <select id="edit-user-role" required>
                                <option value="admin" selected>Admin</option>
                                <option value="manager">Manager</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button class="submit-btn">Save Changes</button>
                        <button class="cancel-btn">Cancel</button>
                    </div>
                `;
                
                // Add event listeners to new buttons
                const saveBtn = editUserForm.querySelector('.submit-btn');
                const cancelBtn = editUserForm.querySelector('.cancel-btn');
                
                if (saveBtn) {
                    saveBtn.addEventListener('click', () => {
                        alert('User updated successfully!');
                    });
                }
                
                if (cancelBtn) {
                    cancelBtn.addEventListener('click', () => {
                        editUserSelect.value = '';
                        editUserForm.innerHTML = `
                            <div class="empty-state">
                                <p>Select a user from the dropdown to edit details</p>
                            </div>
                        `;
                    });
                }
            }
        });
    }
    
    // Save permissions matrix
    const saveMatrixBtn = document.querySelector('.save-matrix-btn');
    if (saveMatrixBtn) {
        saveMatrixBtn.addEventListener('click', () => {
            alert('Permission matrix saved successfully!');
        });
    }
    
    // Reset permissions matrix
    const resetMatrixBtn = document.querySelector('.reset-matrix-btn');
    if (resetMatrixBtn) {
        resetMatrixBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset the permission matrix to default values?')) {
                // In a real application, this would reset checkboxes to default values
                alert('Permission matrix has been reset to defaults.');
            }
        });
    }
    
    // Apply role changes
    const applyRolesBtn = document.querySelector('.apply-roles-btn');
    if (applyRolesBtn) {
        applyRolesBtn.addEventListener('click', () => {
            alert('Role changes applied successfully!');
        });
    }
    
    // Add new role
    const addRoleBtn = document.querySelector('.add-role-btn');
    if (addRoleBtn) {
        addRoleBtn.addEventListener('click', () => {
            alert('Add new role functionality would open in a production environment.');
        });
    }
}

/**
 * Setup bulk operation buttons
 */
function setupBulkOperationButtons() {
    // Import data button
    const importDataBtn = document.getElementById('importDataBtn');
    if (importDataBtn) {
        importDataBtn.addEventListener('click', () => {
            const bulkOperationsTab = document.querySelector('.bulk-tab-btn[data-tab="import-operations"]');
            if (bulkOperationsTab) {
                bulkOperationsTab.click();
            }
            
            document.querySelector('.bulk-data-operations').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Export data button
    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', () => {
            const bulkOperationsTab = document.querySelector('.bulk-tab-btn[data-tab="export-operations"]');
            if (bulkOperationsTab) {
                bulkOperationsTab.click();
            }
            
            document.querySelector('.bulk-data-operations').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Excel and CSV import buttons
    const importButtons = document.querySelectorAll('.import-excel-btn, .import-csv-btn');
    importButtons.forEach(button => {
        button.addEventListener('click', () => {
            const fileInput = document.getElementById('bulk-file-upload');
            if (fileInput) {
                fileInput.click();
            }
        });
    });
    
    // Excel and CSV export buttons
    const exportExcelBtn = document.querySelector('.export-excel-btn');
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', () => {
            alert('Exporting as Excel. This would generate an Excel file in a production environment.');
        });
    }
    
    const exportCsvBtn = document.querySelector('.export-csv-btn');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            alert('Exporting as CSV. This would generate a CSV file in a production environment.');
        });
    }
    
    // Generate export button
    const generateExportBtn = document.querySelector('.generate-export-btn');
    if (generateExportBtn) {
        generateExportBtn.addEventListener('click', () => {
            // Check if at least one checkbox is selected
            const checkboxes = document.querySelectorAll('.data-selection-options input[type="checkbox"]');
            let hasChecked = false;
            
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    hasChecked = true;
                }
            });
            
            if (!hasChecked) {
                alert('Please select at least one data category to export.');
                return;
            }
            
            alert('Export generated successfully! This would download a file in a production environment.');
        });
    }
    
    // Template links
    const templateLinks = document.querySelectorAll('.template-link');
    templateLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const templateType = link.textContent;
            alert(`Downloading ${templateType}. This would download the template in a production environment.`);
        });
    });
}

/**
 * Setup Add Business Modal buttons
 */
function setupAddBusinessButtons() {
    const createBusinessBtn = document.querySelector('.create-business-btn');
    if (createBusinessBtn) {
        createBusinessBtn.addEventListener('click', () => {
            // Validate form
            const businessName = document.getElementById('business-name').value;
            const registrationNumber = document.getElementById('registration-number').value;
            const taxId = document.getElementById('tax-id').value;
            
            if (!businessName || !registrationNumber || !taxId) {
                alert('Please fill in all required registration information.');
                return;
            }
            
            // Open OTP verification
            const modal = document.getElementById('add-business-modal');
            const otpModal = document.getElementById('otp-verification-modal');
            
            closeModal(modal);
            if (otpModal) {
                openModal(otpModal);
                startOTPTimer();
                
                // Store operation type for after verification
                sessionStorage.setItem('otp-operation', 'add-business');
            }
        });
    }
    
    const saveDraftBtn = document.querySelector('.save-draft-btn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            alert('Business information saved as draft.');
            
            const modal = document.getElementById('add-business-modal');
            closeModal(modal);
        });
    }
}

// ==========================================
// Form Validation
// ==========================================

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    // Add validation for required fields
    const requiredInputs = document.querySelectorAll('input[required], select[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('invalid', (event) => {
            event.preventDefault();
            input.classList.add('invalid');
            
            // Show validation message
            const formField = input.closest('.form-field');
            if (formField) {
                let errorMessage = input.getAttribute('data-error-message') || 'This field is required.';
                
                // Check if error message element already exists
                let errorElement = formField.querySelector('.error-message');
                if (!errorElement) {
                    errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    formField.appendChild(errorElement);
                }
                
                errorElement.textContent = errorMessage;
            }
        });
        
        // Clear validation error on input
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
            
            // Remove error message
            const formField = input.closest('.form-field');
            if (formField) {
                const errorElement = formField.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            }
        });
    });
}

// ==========================================
// Data Tables and Filtering
// ==========================================

/**
 * Initialize data tables functionality
 */
function initializeDataTables() {
    // Setup table filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.closest('.data-table-container');
            if (container) {
                const searchInput = container.querySelector('.search-input');
                const filterDropdown = container.querySelector('.filter-dropdown');
                
                let searchTerm = '';
                let filterValue = '';
                
                if (searchInput) {
                    searchTerm = searchInput.value.toLowerCase();
                }
                
                if (filterDropdown) {
                    filterValue = filterDropdown.value;
                }
                
                alert(`Filtering table with search term: "${searchTerm}" and filter value: "${filterValue || 'All'}"`);
                
                // In a real application, this would filter the table data
            }
        });
    });
    
    // Setup search input real-time filtering
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                const container = input.closest('.data-table-container');
                if (container) {
                    const filterButton = container.querySelector('.filter-btn');
                    if (filterButton) {
                        filterButton.click();
                    }
                }
            }
        });
    });
}

// ==========================================
// Account Details Panel
// ==========================================

/**
 * Populate the account details panel with business information
 * @param {string} businessName - The name of the business
 * @param {string} businessId - The ID of the business
 */
function populateAccountDetails(businessName, businessId) {
    const panel = document.getElementById('account-details-panel');
    if (!panel) return;
    
    // Remove empty state if present
    const emptyState = panel.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    // Populate with business details
    // In a real application, this would load details from the server
    panel.innerHTML = `
        <h3>Account Details</h3>
        <div class="business-details-container">
            <div class="business-header">
                <h4>${businessName}</h4>
                <span class="business-id">${businessId}</span>
                <span class="status-indicator active">Active</span>
            </div>
            
            <div class="details-section">
                <h5>Business Information</h5>
                <div class="detail-item">
                    <span class="detail-label">Industry:</span>
                    <span class="detail-value">Auto Repair</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Registration Number:</span>
                    <span class="detail-value">REG-KE-2023-5678</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Tax ID:</span>
                    <span class="detail-value">KRA-12345678</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Establishment Date:</span>
                    <span class="detail-value">January 15, 2020</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Business Size:</span>
                    <span class="detail-value">Medium (11-50 employees)</span>
                </div>
            </div>
            
            <div class="details-section">
                <h5>Contact Information</h5>
                <div class="detail-item">
                    <span class="detail-label">Primary Contact:</span>
                    <span class="detail-value">John Doe (Manager)</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">contact@autofixkenya.com</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value">+254 712 345 678</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Address:</span>
                    <span class="detail-value">123 Mombasa Road, Nairobi, Kenya</span>
                </div>
            </div>
            
            <div class="details-section">
                <h5>Subscription Information</h5>
                <div class="detail-item">
                    <span class="detail-label">Current Plan:</span>
                    <span class="detail-value">Premium Plan</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Billing Cycle:</span>
                    <span class="detail-value">Monthly</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Next Billing Date:</span>
                    <span class="detail-value">April 15, 2025</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Payment Method:</span>
                    <span class="detail-value">M-Pesa</span>
                </div>
            </div>
            
            <div class="details-actions">
                <button class="edit-details-btn">Edit Details</button>
                <button class="view-activity-btn">View Activity Log</button>
                <button class="manage-users-btn">Manage Users</button>
            </div>
        </div>
    `;
    
    // Add event listeners to new buttons
    const editDetailsBtn = panel.querySelector('.edit-details-btn');
    if (editDetailsBtn) {
        editDetailsBtn.addEventListener('click', () => {
            alert(`Edit details for ${businessName} would open in a production environment.`);
        });
    }
    
    const viewActivityBtn = panel.querySelector('.view-activity-btn');
    if (viewActivityBtn) {
        viewActivityBtn.addEventListener('click', () => {
            alert(`Activity log for ${businessName} would open in a production environment.`);
        });
    }
    
    const manageUsersBtn = panel.querySelector('.manage-users-btn');
    if (manageUsersBtn) {
        manageUsersBtn.addEventListener('click', () => {
            alert(`User management for ${businessName} would open in a production environment.`);
        });
    }
}

// ==========================================
// Status Updates
// ==========================================

/**
 * Add a status update to the recent updates list
 * @param {string} businessName - The name of the business
 * @param {string} oldStatus - The old status
 * @param {string} newStatus - The new status
 * @param {string} user - The user who made the change
 */
function addStatusUpdate(businessName, oldStatus, newStatus, user) {
    const statusUpdatesList = document.querySelector('.status-updates-list');
    if (!statusUpdatesList) return;
    
    // Create a new update element
    const updateItem = document.createElement('div');
    updateItem.className = 'status-update-item';
    
    // Get current time
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    updateItem.innerHTML = `
        <span class="update-time">Today, ${timeString}</span>
        <span class="update-details">${businessName} status changed from <strong>${oldStatus}</strong> to <strong>${newStatus}</strong></span>
        <span class="update-user">by ${user}</span>
    `;
    
    // Add to top of list
    statusUpdatesList.insertBefore(updateItem, statusUpdatesList.firstChild);
}

// ==========================================
// OTP Verification
// ==========================================

/**
 * Initialize OTP verification functionality
 */
function setupOTPModal() {
    const otpInputs = document.querySelectorAll('.otp-digit');
    if (otpInputs.length) {
        // Add event listeners for digit input
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                // Move to next input after typing a digit
                if (input.value && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            });
            
            input.addEventListener('keydown', (event) => {
                // Handle backspace to go to previous input
                if (event.key === 'Backspace' && !input.value && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });
        
        // Verify button
        const verifyBtn = document.querySelector('.verify-btn');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => {
                let otp = '';
                otpInputs.forEach(input => {
                    otp += input.value;
                });
                
                if (otp.length === 6) {
                    // Check OTP
                    verifyOTP(otp);
                } else {
                    alert('Please enter a complete 6-digit OTP code.');
                }
            });
        }
        
        // Resend OTP button
        const resendBtn = document.querySelector('.resend-otp-btn');
        if (resendBtn) {
            resendBtn.addEventListener('click', () => {
                alert('A new OTP has been sent to your email and phone.');
                startOTPTimer();
                
                // Reset input fields
                otpInputs.forEach(input => {
                    input.value = '';
                });
                otpInputs[0].focus();
            });
        }
    }
}

/**
 * Verify the OTP code
 * @param {string} otp - The OTP code to verify
 */
function verifyOTP(otp) {
    // In a real application, this would verify with the server
    // For demonstration, we'll use a fixed code
    const validOTP = '123456';
    
    if (otp === validOTP) {
        alert('OTP verified successfully!');
        
        // Close OTP modal
        const otpModal = document.getElementById('otp-verification-modal');
        closeModal(otpModal);
        
        // Complete the operation that required OTP
        completeVerifiedOperation();
    } else {
        alert('Invalid OTP. Please try again.');
        
        // Reset input fields
        const otpInputs = document.querySelectorAll('.otp-digit');
        otpInputs.forEach(input => {
            input.value = '';
        });
        otpInputs[0].focus();
    }
}

/**
 * Complete the operation that required OTP verification
 */
function completeVerifiedOperation() {
    const operation = sessionStorage.getItem('otp-operation');
    
    if (operation === 'add-business') {
        alert('Business added successfully!');
    } else if (operation === 'suspend-business') {
        const businessName = sessionStorage.getItem('business-to-suspend');
        alert(`${businessName} has been suspended.`);
        
        // Add status update
        addStatusUpdate(businessName, 'Active', 'Suspended', 'Admin User');
    } else if (operation === 'reinstate-business') {
        const businessName = sessionStorage.getItem('business-to-reinstate');
        alert(`${businessName} has been reinstated.`);
        
        // Add status update
        addStatusUpdate(businessName, 'Suspended', 'Active', 'Admin User');
    }
    
    // Clear session storage
    sessionStorage.removeItem('otp-operation');
    sessionStorage.removeItem('business-to-suspend');
    sessionStorage.removeItem('business-to-reinstate');
}

/**
 * Start the OTP timer
 */
function startOTPTimer() {
    const timerDisplay = document.querySelector('.timer-display');
    const resendBtn = document.querySelector('.resend-otp-btn');
    
    if (timerDisplay && resendBtn) {
        // Disable resend button during countdown
        resendBtn.disabled = true;
        
        // Set timer to 3 minutes
        let seconds = 3 * 60;
        
        // Update timer every second
        const timerInterval = setInterval(() => {
            seconds--;
            
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            
            timerDisplay.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
            
            if (seconds <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = '0:00';
                resendBtn.disabled = false;
            }
        }, 1000);
    }
}

// ==========================================
// File Upload
// ==========================================

/**
 * Initialize file upload functionality
 */
function initializeFileUpload() {
    const fileUploadArea = document.querySelector('.file-upload-area');
    const fileInput = document.getElementById('bulk-file-upload');
    const selectedFileName = document.querySelector('.file-name');
    const removeFileBtn = document.querySelector('.remove-file-btn');
    const uploadFileBtn = document.querySelector('.upload-file-btn');
    
    if (fileUploadArea && fileInput && selectedFileName) {
        // Click on upload area to select file
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        // Handle drag and drop
        fileUploadArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            fileUploadArea.classList.add('dragover');
        });
        
        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('dragover');
        });
        
        fileUploadArea.addEventListener('drop', (event) => {
            event.preventDefault();
            fileUploadArea.classList.remove('dragover');
            
            if (event.dataTransfer.files.length) {
                fileInput.files = event.dataTransfer.files;
                updateSelectedFile();
            }
        });
        
        // File input change
        fileInput.addEventListener('change', () => {
            updateSelectedFile();
        });
        
        // Remove file button
        if (removeFileBtn) {
            removeFileBtn.addEventListener('click', () => {
                fileInput.value = '';
                updateSelectedFile();
            });
        }
        
        // Upload file button
        if (uploadFileBtn) {
            uploadFileBtn.addEventListener('click', () => {
                if (fileInput.files.length) {
                    const file = fileInput.files[0];
                    alert(`Uploading and validating ${file.name}. This would process the file in a production environment.`);
                } else {
                    alert('Please select a file to upload.');
                }
            });
        }
    }
    
    // Business document uploads
    const documentUploads = document.querySelectorAll('.upload-item input[type="file"]');
    documentUploads.forEach(upload => {
        upload.addEventListener('change', () => {
            if (upload.files.length) {
                const label = upload.previousElementSibling;
                if (label) {
                    label.textContent = `${label.textContent.split(' (')[0]} (${upload.files[0].name})`;
                }
            }
        });
    });
}

/**
 * Update the selected file display
 */
function updateSelectedFile() {
    const fileInput = document.getElementById('bulk-file-upload');
    const selectedFileName = document.querySelector('.file-name');
    const selectedFileContainer = document.querySelector('.selected-file');
    
    if (fileInput && selectedFileName && selectedFileContainer) {
        if (fileInput.files.length) {
            selectedFileName.textContent = fileInput.files[0].name;
            selectedFileContainer.style.display = 'flex';
        } else {
            selectedFileName.textContent = 'No file selected';
            selectedFileContainer.style.display = 'none';
        }
    }
}

// ==========================================
// Dark Mode
// ==========================================

/**
 * Initialize dark mode functionality
 */
function initializeDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        // Check for saved preference
        const savedDarkMode = localStorage.getItem('dark-mode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            updateDarkModeIcon(true);
        }
        
        // Toggle dark mode
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            localStorage.setItem('dark-mode', isDarkMode);
            updateDarkModeIcon(isDarkMode);
        });
    }
}

/**
 * Update the dark mode icon
 * @param {boolean} isDarkMode - Whether dark mode is enabled
 */
function updateDarkModeIcon(isDarkMode) {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.innerHTML = isDarkMode ? 
            '<i class="fa-solid fa-sun"></i>' : 
            '<i class="fa-solid fa-moon"></i>';
    }
}

//  JavaScript for Bulk Status Update functionality

document.addEventListener('DOMContentLoaded', function() {
    // Reference to the bulk update button and modal
    const bulkUpdateBtn = document.querySelector('.bulk-update-btn');
    const bulkUpdateModal = document.getElementById('bulk-status-update-modal');
    const closeModalBtns = bulkUpdateModal.querySelectorAll('.close-modal-btn, .cancel-modal-btn');
    
    // Show modal when bulk update button is clicked
    bulkUpdateBtn.addEventListener('click', function() {
        bulkUpdateModal.style.display = 'block';
    });
    
    // Hide modal when close buttons are clicked
    closeModalBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            bulkUpdateModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside modal content
    window.addEventListener('click', function(event) {
        if (event.target === bulkUpdateModal) {
            bulkUpdateModal.style.display = 'none';
        }
    });
    
    // Show/hide schedule details based on selection
    const scheduleImmediately = document.getElementById('send-immediately');
    const scheduleLater = document.getElementById('schedule-later');
    const scheduleDetailsPanel = document.getElementById('schedule-details-panel');
    
    scheduleImmediately.addEventListener('change', function() {
        scheduleDetailsPanel.style.display = 'none';
    });
    
    scheduleLater.addEventListener('change', function() {
        scheduleDetailsPanel.style.display = 'block';
    });
    
    // Initialize: hide schedule details panel
    scheduleDetailsPanel.style.display = 'none';
    
    // Select all users checkbox logic
    const selectAllUsers = document.getElementById('select-all-users');
    const userTypeCheckboxes = document.querySelectorAll('#select-shop-owners, #select-technicians, #select-customers');
    
    selectAllUsers.addEventListener('change', function() {
        if (this.checked) {
            userTypeCheckboxes.forEach(function(checkbox) {
                checkbox.checked = true;
                checkbox.disabled = true;
            });
        } else {
            userTypeCheckboxes.forEach(function(checkbox) {
                checkbox.disabled = false;
            });
        }
    });
    
    // Dynamic fields insertion
    const dynamicFieldBtns = document.querySelectorAll('.dynamic-field-btn');
    const messageBody = document.getElementById('message-body');
    
    dynamicFieldBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const field = this.getAttribute('data-field');
            const textarea = messageBody;
            const cursorPos = textarea.selectionStart;
            const textBefore = textarea.value.substring(0, cursorPos);
            const textAfter = textarea.value.substring(cursorPos);
            
            textarea.value = textBefore + field + textAfter;
            
            // Reset focus and cursor position
            textarea.focus();
            textarea.selectionStart = cursorPos + field.length;
            textarea.selectionEnd = cursorPos + field.length;
        });
    });
    
    // Template selection logic
    const messageTemplate = document.getElementById('message-template');
    const messageSubject = document.getElementById('message-subject');
    
    messageTemplate.addEventListener('change', function() {
        switch(this.value) {
            case 'maintenance':
                messageSubject.value = 'Important Update: Scheduled Maintenance';
                messageBody.value = 'Dear {user_name},\n\nWe are writing to inform you that CarPal will be undergoing scheduled maintenance on {maintenance_date} from {start_time} to {end_time} EAT. During this period, the platform may experience brief interruptions or limited functionality.\n\nWe apologize for any inconvenience this may cause to your business operations. Should you have any questions or concerns, please don\'t hesitate to reach out to our support team.\n\nThank you for your understanding and continued partnership.\n\nBest regards,\nThe CarPal Team';
                break;
            case 'outage':
                messageSubject.value = 'Urgent: Service Outage Notification';
                messageBody.value = 'Dear {user_name},\n\nWe are experiencing a service outage affecting the CarPal platform. Our technical team is working to resolve the issue as quickly as possible.\n\nExpected resolution time: {resolution_time}\n\nWe apologize for any inconvenience this may cause to your business operations. We will update you once the service is fully restored.\n\nThank you for your patience and understanding.\n\nBest regards,\nThe CarPal Support Team';
                break;
            case 'update':
                messageSubject.value = 'CarPal Platform Update: New Features Available';
                messageBody.value = 'Dear {user_name},\n\nWe are excited to announce that the latest update to the CarPal platform is now available. This update includes several new features and improvements that will enhance your experience.\n\nKey updates include:\n- Feature 1\n- Feature 2\n- Feature 3\n\nTo start using these new features, simply log in to your account at your convenience.\n\nIf you have any questions or need assistance, please don\'t hesitate to contact our support team.\n\nBest regards,\nThe CarPal Team';
                break;
            case 'promotion':
                messageSubject.value = 'Special Promotion: Limited Time Offer';
                messageBody.value = 'Dear {user_name},\n\nWe are pleased to offer you a special promotion for your {business_name} account. For a limited time, you can enjoy the following benefits:\n\n[Promotion details here]\n\nThis offer is valid until {end_date}. To take advantage of this offer, please [instructions here].\n\nThank you for being a valued partner of CarPal.\n\nBest regards,\nThe CarPal Team';
                break;
            case 'custom':
                messageSubject.value = '';
                messageBody.value = '';
                break;
        }
    });
    
    // Send notification button action
    const sendNotificationBtn = document.querySelector('.send-notification-btn');
    
    sendNotificationBtn.addEventListener('click', function() {
        // Simulate sending notification
        alert('Notifications have been sent to 254 recipients.');
        bulkUpdateModal.style.display = 'none';
    });
});