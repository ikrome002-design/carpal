/**
 * CarPal by Citrus - Security Module
 * JavaScript functionality for the security page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initTabNavigation();
    initDashboardActions();
    initModals();
    initFilters();
    initToggles();
    initPagination();
    initDarkMode();
    initPermissionsMatrix();
    initUserSelection();
    initFormDependencies();
    
    // Set current date for date pickers
    setDefaultDates();
});

/**
 * Initialize tab navigation
 */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Log tab change for audit
            console.log(`Tab changed to: ${tabId}`);
        });
    });
    
    // Initialize related tab navigation within modals
    const relatedTabs = document.querySelectorAll('.related-tab');
    
    relatedTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const parentSection = this.closest('.related-entries-section');
            
            // Remove active class from all tabs and content in this section
            parentSection.querySelectorAll('.related-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            parentSection.querySelectorAll('.related-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const contentId = this.getAttribute('data-tab');
            parentSection.querySelector(`#${contentId}`).classList.add('active');
        });
    });
}

/**
 * Initialize dashboard quick actions
 */
function initDashboardActions() {
    // Manual Backup Button
    const manualBackupBtn = document.getElementById('manualBackupBtn');
    if (manualBackupBtn) {
        manualBackupBtn.addEventListener('click', function() {
            openModal('manualBackupModal');
        });
    }
    
    // Manual Backup Tab Button
    const manualBackupTabBtn = document.getElementById('manualBackupTabBtn');
    if (manualBackupTabBtn) {
        manualBackupTabBtn.addEventListener('click', function() {
            openModal('manualBackupModal');
        });
    }
    
    // Security Scan Button
    const securityScanBtn = document.getElementById('securityScanBtn');
    if (securityScanBtn) {
        securityScanBtn.addEventListener('click', function() {
            initiateSecurityScan();
        });
    }
    
    // View All Logs Button
    const viewAllLogsBtn = document.getElementById('viewAllLogsBtn');
    if (viewAllLogsBtn) {
        viewAllLogsBtn.addEventListener('click', function() {
            // Activate the Audit Logs tab
            const auditLogsTab = document.querySelector('.tab-btn[data-tab="audit-logs"]');
            if (auditLogsTab) {
                auditLogsTab.click();
            }
        });
    }
    
    // Initialize action buttons in Access Monitoring tab
    initAccessMonitoringActions();
    
    // Initialize action buttons in Backup tab
    initBackupActions();
    
    // Initialize action buttons in Security Permissions tab
    initPermissionsActions();
}

/**
 * Initialize access monitoring actions
 */
function initAccessMonitoringActions() {
    // Lock Account Button
    const lockAccountBtn = document.getElementById('lockAccountBtn');
    if (lockAccountBtn) {
        lockAccountBtn.addEventListener('click', function() {
            // Check if there's a selected user to lock
            const selectedSession = document.querySelector('.login-entry.selected');
            if (selectedSession) {
                const sessionId = selectedSession.getAttribute('data-session-id');
                const userId = selectedSession.querySelector('td:first-child').textContent;
                populateLockAccountModal(sessionId, userId);
                openModal('lockAccountModal');
            } else {
                showNotification('Please select a user to lock', 'warning');
            }
        });
    }
    
    // View Session Buttons
    const viewSessionBtns = document.querySelectorAll('.view-session-btn');
    viewSessionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sessionRow = this.closest('.login-entry');
            const sessionId = sessionRow.getAttribute('data-session-id');
            viewSessionDetails(sessionId);
            
            // Select this row
            document.querySelectorAll('.login-entry').forEach(row => {
                row.classList.remove('selected');
            });
            sessionRow.classList.add('selected');
        });
    });
    
    // Flag Action Buttons
    const flagActionBtns = document.querySelectorAll('.flag-action-btn');
    flagActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const flagCard = this.closest('.flag-card');
            const flagType = flagCard.querySelector('h4').textContent;
            reviewFlaggedActivity(flagType);
        });
    });
    
    // Other action buttons
    const otherActionBtns = {
        'sendNotificationBtn': sendSecurityNotification,
        'resetPasswordBtn': initiatePasswordReset,
        'addWatchlistBtn': addToWatchlist
    };
    
    for (const [btnId, action] of Object.entries(otherActionBtns)) {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', function() {
                const selectedSession = document.querySelector('.login-entry.selected');
                if (selectedSession) {
                    const sessionId = selectedSession.getAttribute('data-session-id');
                    const userId = selectedSession.querySelector('td:first-child').textContent;
                    action(sessionId, userId);
                } else {
                    showNotification('Please select a user first', 'warning');
                }
            });
        }
    }
}

/**
 * Initialize backup actions
 */
function initBackupActions() {
    // Save Backup Configuration Button
    const saveBackupConfigBtn = document.getElementById('saveBackupConfigBtn');
    if (saveBackupConfigBtn) {
        saveBackupConfigBtn.addEventListener('click', function() {
            saveBackupConfiguration();
        });
    }
    
    // Test Backup Configuration Button
    const testBackupConfigBtn = document.getElementById('testBackupConfigBtn');
    if (testBackupConfigBtn) {
        testBackupConfigBtn.addEventListener('click', function() {
            testBackupConfiguration();
        });
    }
    
    // View Backup Buttons
    const viewBackupBtns = document.querySelectorAll('.view-backup-btn');
    viewBackupBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const backupRow = this.closest('.backup-entry');
            const backupId = backupRow.getAttribute('data-backup-id');
            viewBackupDetails(backupId);
        });
    });
    
    // Refresh Backups Button
    const refreshBackupsBtn = document.getElementById('refreshBackupsBtn');
    if (refreshBackupsBtn) {
        refreshBackupsBtn.addEventListener('click', function() {
            refreshBackupData();
        });
    }
}

/**
 * Initialize permissions actions
 */
function initPermissionsActions() {
    // Create Role Button
    const createRoleBtn = document.getElementById('createRoleBtn');
    if (createRoleBtn) {
        createRoleBtn.addEventListener('click', function() {
            openModal('createRoleModal');
        });
    }
    
    // Role action buttons
    document.querySelectorAll('.view-role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const roleRow = this.closest('.role-entry');
            const roleId = roleRow.getAttribute('data-role-id');
            viewRoleDetails(roleId);
        });
    });
    
    document.querySelectorAll('.edit-role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const roleRow = this.closest('.role-entry');
            const roleId = roleRow.getAttribute('data-role-id');
            editRole(roleId);
        });
    });
    
    document.querySelectorAll('.clone-role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const roleRow = this.closest('.role-entry');
            const roleId = roleRow.getAttribute('data-role-id');
            cloneRole(roleId);
        });
    });
    
    // Permission Role Filter
    const permissionRoleFilter = document.getElementById('permissionRoleFilter');
    if (permissionRoleFilter) {
        permissionRoleFilter.addEventListener('change', function() {
            loadRolePermissions(this.value);
        });
    }
    
    // Save Permissions Button
    const savePermissionsBtn = document.getElementById('savePermissionsBtn');
    if (savePermissionsBtn) {
        savePermissionsBtn.addEventListener('click', function() {
            saveRolePermissions();
        });
    }
    
    // Reset Permissions Button
    const resetPermissionsBtn = document.getElementById('resetPermissionsBtn');
    if (resetPermissionsBtn) {
        resetPermissionsBtn.addEventListener('click', function() {
            resetPermissionChanges();
        });
    }
    
    // Apply Template Button
    const applyTemplateBtn = document.querySelector('.apply-template-btn');
    if (applyTemplateBtn) {
        applyTemplateBtn.addEventListener('click', function() {
            const templateValue = document.getElementById('permissionTemplate').value;
            if (templateValue) {
                applyPermissionTemplate(templateValue);
            } else {
                showNotification('Please select a template', 'warning');
            }
        });
    }
    
    // Bulk Update Option Buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const actionType = this.textContent.trim();
            handleBulkPermissionAction(actionType);
        });
    });
}

/**
 * Initialize modal dialogs
 */
function initModals() {
    // Close modal buttons
    const closeModalBtns = document.querySelectorAll('.close-modal, .modal-footer button:not(.primary-btn)');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close modals when clicking outside the content
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Initialize specific modal actions
    initLogEntryModal();
    initExportLogsModal();
    initManualBackupModal();
    initLockAccountModal();
    initCreateRoleModal();
}

/**
 * Initialize Log Entry Details Modal
 */
function initLogEntryModal() {
    // View Entry Buttons
    const viewEntryBtns = document.querySelectorAll('.view-entry-btn');
    viewEntryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const logRow = this.closest('.log-entry');
            const entryId = logRow.getAttribute('data-entry-id');
            loadLogEntryDetails(entryId);
            openModal('logEntryDetailsModal');
        });
    });
    
    // Close Log Entry Button
    const closeLogEntryBtn = document.getElementById('closeLogEntryBtn');
    if (closeLogEntryBtn) {
        closeLogEntryBtn.addEventListener('click', function() {
            closeModal('logEntryDetailsModal');
        });
    }
    
    // Entry action buttons
    const entryActionBtns = document.querySelectorAll('.entry-actions-section .action-btn');
    entryActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            const entryId = document.getElementById('logIdValue').textContent;
            handleLogEntryAction(action, entryId);
        });
    });
}

/**
 * Initialize Export Logs Modal
 */
function initExportLogsModal() {
    // Export Logs Button
    const exportLogsBtn = document.getElementById('exportLogsBtn');
    if (exportLogsBtn) {
        exportLogsBtn.addEventListener('click', function() {
            // Set default date range to last 30 days
            const today = new Date();
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(today.getDate() - 30);
            
            document.getElementById('exportStartDate').valueAsDate = thirtyDaysAgo;
            document.getElementById('exportEndDate').valueAsDate = today;
            
            openModal('exportLogsModal');
        });
    }
    
    // Export Access Logs Button
    const exportAccessLogsBtn = document.getElementById('exportAccessLogsBtn');
    if (exportAccessLogsBtn) {
        exportAccessLogsBtn.addEventListener('click', function() {
            // Set default date range to last 30 days
            const today = new Date();
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(today.getDate() - 30);
            
            document.getElementById('exportStartDate').valueAsDate = thirtyDaysAgo;
            document.getElementById('exportEndDate').valueAsDate = today;
            
            openModal('exportLogsModal');
        });
    }
    
    // Delivery Method Radio Buttons
    const deliveryMethodRadios = document.querySelectorAll('input[name="deliveryMethod"]');
    deliveryMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Enable/disable relevant fields based on delivery method
            const emailAddressInput = document.getElementById('emailAddress');
            const scheduleOptions = document.querySelector('.schedule-options');
            
            // Reset disabled state
            emailAddressInput.disabled = true;
            scheduleOptions.classList.add('disabled');
            document.getElementById('scheduleFrequency').disabled = true;
            document.getElementById('scheduleTime').disabled = true;
            
            // Set based on selection
            if (this.value === 'email') {
                emailAddressInput.disabled = false;
            } else if (this.value === 'schedule') {
                scheduleOptions.classList.remove('disabled');
                document.getElementById('scheduleFrequency').disabled = false;
                document.getElementById('scheduleTime').disabled = false;
            }
        });
    });
    
    // Generate Export Button
    const generateExportBtn = document.getElementById('generateExportBtn');
    if (generateExportBtn) {
        generateExportBtn.addEventListener('click', function() {
            generateLogExport();
        });
    }
    
    // Cancel Export Button
    const cancelExportBtn = document.getElementById('cancelExportBtn');
    if (cancelExportBtn) {
        cancelExportBtn.addEventListener('click', function() {
            closeModal('exportLogsModal');
        });
    }
}

/**
 * Initialize Manual Backup Modal
 */
function initManualBackupModal() {
    // Backup Type Radio Buttons
    const backupTypeRadios = document.querySelectorAll('input[name="backupType"]');
    backupTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const moduleCheckboxes = document.querySelector('.module-checkboxes');
            
            // Reset disabled state
            moduleCheckboxes.classList.add('disabled');
            document.querySelectorAll('.module-checkboxes input[type="checkbox"]').forEach(checkbox => {
                checkbox.disabled = true;
            });
            
            // Enable module checkboxes if specific modules selected
            if (this.value === 'specific') {
                moduleCheckboxes.classList.remove('disabled');
                document.querySelectorAll('.module-checkboxes input[type="checkbox"]').forEach(checkbox => {
                    checkbox.disabled = false;
                });
            }
        });
    });
    
    // Backup Destination Radio Buttons
    const backupDestRadios = document.querySelectorAll('input[name="backupDestination"]');
    backupDestRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const customLocationPath = document.getElementById('customLocationPath');
            
            // Reset disabled state
            customLocationPath.disabled = true;
            
            // Enable custom location if selected
            if (this.value === 'custom') {
                customLocationPath.disabled = false;
            }
        });
    });
    
    // Start Backup Button
    const startBackupBtn = document.getElementById('startBackupBtn');
    if (startBackupBtn) {
        startBackupBtn.addEventListener('click', function() {
            startManualBackup();
        });
    }
    
    // Cancel Backup Button
    const cancelBackupBtn = document.getElementById('cancelBackupBtn');
    if (cancelBackupBtn) {
        cancelBackupBtn.addEventListener('click', function() {
            closeModal('manualBackupModal');
        });
    }
}

/**
 * Initialize Lock Account Modal
 */
function initLockAccountModal() {
    // Lock Reason Dropdown
    const lockReasonSelect = document.getElementById('lockReason');
    if (lockReasonSelect) {
        lockReasonSelect.addEventListener('change', function() {
            const customReasonField = document.getElementById('customReason');
            
            // Enable custom reason field only if "Other" is selected
            customReasonField.disabled = this.value !== 'other';
        });
    }
    
    // Lock Duration Radio Buttons
    const lockDurationRadios = document.querySelectorAll('input[name="lockDuration"]');
    lockDurationRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const durationSelector = document.querySelector('.duration-selector');
            const inputs = durationSelector.querySelectorAll('select');
            
            // Enable/disable duration selectors based on selection
            inputs.forEach(input => {
                input.disabled = this.value === 'permanent';
            });
        });
    });
    
    // Notification Template Dropdown
    const notificationTemplateSelect = document.getElementById('notificationTemplate');
    if (notificationTemplateSelect) {
        notificationTemplateSelect.addEventListener('change', function() {
            const customMessageField = document.getElementById('customMessage');
            
            // Enable custom message field only if "Custom Message" is selected
            customMessageField.disabled = this.value !== 'custom';
        });
    }
    
    // Notify User Toggle
    const notifyUserToggle = document.getElementById('notifyUserToggle');
    if (notifyUserToggle) {
        notifyUserToggle.addEventListener('change', function() {
            const notificationOptions = document.getElementById('notificationTemplate');
            const customMessageField = document.getElementById('customMessage');
            
            // Enable/disable notification options based on toggle
            notificationOptions.disabled = !this.checked;
            customMessageField.disabled = !this.checked || notificationOptions.value !== 'custom';
        });
    }
    
    // Confirm Lock Button
    const confirmLockBtn = document.getElementById('confirmLockBtn');
    if (confirmLockBtn) {
        confirmLockBtn.addEventListener('click', function() {
            lockUserAccount();
        });
    }
    
    // Cancel Lock Button
    const cancelLockBtn = document.getElementById('cancelLockBtn');
    if (cancelLockBtn) {
        cancelLockBtn.addEventListener('click', function() {
            closeModal('lockAccountModal');
        });
    }
}

/**
 * Initialize Create Role Modal
 */
function initCreateRoleModal() {
    // Base Role Dropdown
    const baseRoleSelect = document.getElementById('baseRole');
    if (baseRoleSelect) {
        baseRoleSelect.addEventListener('change', function() {
            if (this.value) {
                loadBaseRolePermissions(this.value);
            }
        });
    }
    
    // Add Selected Users Button
    const addSelectedUsersBtn = document.getElementById('addSelectedUsers');
    if (addSelectedUsersBtn) {
        addSelectedUsersBtn.addEventListener('click', function() {
            moveSelectedUsers('available', 'selected');
        });
    }
    
    // Remove Selected Users Button
    const removeSelectedUsersBtn = document.getElementById('removeSelectedUsers');
    if (removeSelectedUsersBtn) {
        removeSelectedUsersBtn.addEventListener('click', function() {
            moveSelectedUsers('selected', 'available');
        });
    }
    
    // User Search Input
    const userSearchInput = document.getElementById('userSearchInput');
    if (userSearchInput) {
        userSearchInput.addEventListener('input', function() {
            filterUsersList(this.value);
        });
    }
    
    // Create Role Button (Inside Modal)
    const createRoleBtnModal = document.querySelector('#createRoleModal .primary-btn');
    if (createRoleBtnModal) {
        createRoleBtnModal.addEventListener('click', function() {
            createNewRole();
        });
    }
    
    // Cancel Create Role Button
    const cancelCreateRoleBtn = document.getElementById('cancelCreateRoleBtn');
    if (cancelCreateRoleBtn) {
        cancelCreateRoleBtn.addEventListener('click', function() {
            closeModal('createRoleModal');
        });
    }
}

/**
 * Initialize filters and search functionality
 */
function initFilters() {
    // Audit Logs Filters
    const applyLogFiltersBtn = document.getElementById('applyLogFiltersBtn');
    if (applyLogFiltersBtn) {
        applyLogFiltersBtn.addEventListener('click', function() {
            applyAuditLogFilters();
        });
    }
    
    // Access Monitoring Filters
    const applyAccessFiltersBtn = document.getElementById('applyAccessFiltersBtn');
    if (applyAccessFiltersBtn) {
        applyAccessFiltersBtn.addEventListener('click', function() {
            applyAccessMonitoringFilters();
        });
    }
    
    // Refresh Logs Button
    const refreshLogsBtns = document.querySelectorAll('#refreshLogsBtn, #refreshAccessLogsBtn, #refreshRolesBtn');
    refreshLogsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            refreshCurrentTabData();
        });
    });
}

/**
 * Initialize toggle switches and other form element dependencies
 */
function initToggles() {
    // Audit Changes Toggle
    const auditChangesToggle = document.getElementById('auditChangesToggle');
    if (auditChangesToggle) {
        auditChangesToggle.addEventListener('change', function() {
            // Update audit settings
            const auditEnabled = this.checked;
            updateAuditSettings(auditEnabled);
        });
    }
}

/**
 * Initialize form dependencies
 */
function initFormDependencies() {
    // Backup Frequency Change
    const backupFrequency = document.getElementById('backupFrequency');
    if (backupFrequency) {
        backupFrequency.addEventListener('change', function() {
            const dayField = document.getElementById('backupDay');
            
            // Show/hide day selection based on frequency
            if (this.value === 'daily') {
                dayField.closest('.form-group').style.display = 'none';
            } else {
                dayField.closest('.form-group').style.display = 'block';
            }
        });
    }
}

/**
 * Initialize the permissions matrix
 */
function initPermissionsMatrix() {
    // Module checkboxes in permissions-table
    const permissionCheckboxes = document.querySelectorAll('.permissions-table input[type="checkbox"]');
    permissionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Track changes for the Reset button
            trackPermissionChanges();
        });
    });
}

/**
 * Initialize user selection functionality
 */
function initUserSelection() {
    // User checkboxes in the available-users and selected-users sections
    const userCheckboxes = document.querySelectorAll('.user-item input[type="checkbox"]');
    userCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Update UI to reflect selection
            const userItem = this.closest('.user-item');
            if (this.checked) {
                userItem.classList.add('selected');
            } else {
                userItem.classList.remove('selected');
            }
        });
    });
}

/**
 * Initialize pagination
 */
function initPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    paginationBtns.forEach(btn => {
        if (!btn.disabled) {
            btn.addEventListener('click', function() {
                const isPrevious = this.textContent.includes('Previous');
                navigatePage(isPrevious);
            });
        }
    });
}

/**
 * Initialize dark mode toggle
 */
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            // Update icon
            const icon = this.querySelector('i');
            if (isDarkMode) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
        
        // Apply saved preference on load
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

/**
 * Set default dates for date pickers
 */
function setDefaultDates() {
    // Set current date as default for all date pickers
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    const startDateInputs = document.querySelectorAll('input[id$="StartDate"]');
    const endDateInputs = document.querySelectorAll('input[id$="EndDate"]');
    
    startDateInputs.forEach(input => {
        input.valueAsDate = thirtyDaysAgo;
    });
    
    endDateInputs.forEach(input => {
        input.valueAsDate = today;
    });
}

/****************************
 * MODAL MANAGEMENT FUNCTIONS
 ****************************/

/**
 * Open a modal dialog
 * @param {string} modalId - The ID of the modal to open
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

/**
 * Close a modal dialog
 * @param {string} modalId - The ID of the modal to close
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        
        // Reset form if present
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

/**
 * Populate the lock account modal with user information
 * @param {string} sessionId - The session ID
 * @param {string} userId - The user ID
 */
function populateLockAccountModal(sessionId, userId) {
    // In a real implementation, this would fetch user details from the server
    // For demo purposes, we'll use the data from the session row
    
    document.getElementById('lockAccountUsername').textContent = userId;
    
    // Find user's row to get additional information
    const sessionRow = document.querySelector(`.login-entry[data-session-id="${sessionId}"]`);
    if (sessionRow) {
        const loginTime = sessionRow.querySelector('td:nth-child(2)').textContent;
        document.getElementById('lockAccountLastLogin').textContent = loginTime;
        
        // Set full name (simulated)
        const nameParts = userId.split('@')[0].split('.');
        const fullName = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
        document.getElementById('lockAccountName').textContent = fullName;
        
        // Set role (simulated based on email domain)
        const emailDomain = userId.split('@')[1];
        if (emailDomain === 'citruslabs.co.ke') {
            document.getElementById('lockAccountRole').textContent = 'Platform Administrator';
        } else {
            document.getElementById('lockAccountRole').textContent = 'Business User';
        }
    }
}

/******************************
 * DATA LOADING/SAVING FUNCTIONS
 ******************************/

/**
 * Load log entry details
 * @param {string} entryId - The ID of the log entry
 */
function loadLogEntryDetails(entryId) {
    // In a real implementation, this would fetch entry details from the server
    // For demo purposes, we'll use the data from the table row
    
    const entryRow = document.querySelector(`.log-entry[data-entry-id="${entryId}"]`);
    if (!entryRow) return;
    
    // Populate the modal with data from the table row
    const cells = entryRow.querySelectorAll('td');
    
    document.getElementById('logIdValue').textContent = entryId;
    document.getElementById('logTimestampValue').textContent = cells[0].textContent;
    document.getElementById('logUserValue').textContent = cells[1].textContent;
    document.getElementById('logActionTypeValue').textContent = cells[2].textContent;
    document.getElementById('logModuleValue').textContent = cells[3].textContent;
    document.getElementById('logDescriptionValue').textContent = cells[4].textContent;
    
    // Set IP address (simulated)
    document.getElementById('logIpValue').textContent = '196.201.xxx.xxx';
    
    // For demo purposes, populate the related entries
    // In a real implementation, these would be fetched from the server
    console.log(`Loading log entry details for ID: ${entryId}`);
}

/**
 * Apply audit log filters
 */
function applyAuditLogFilters() {
    const startDate = document.getElementById('logStartDate').value;
    const endDate = document.getElementById('logEndDate').value;
    const userFilter = document.getElementById('logUserFilter').value;
    const actionFilter = document.getElementById('logActionFilter').value;
    const moduleFilter = document.getElementById('logModuleFilter').value;
    const searchTerm = document.getElementById('logSearchInput').value;
    
    // In a real implementation, this would fetch filtered logs from the server
    console.log('Applying log filters:', { 
        startDate, 
        endDate, 
        userFilter, 
        actionFilter, 
        moduleFilter, 
        searchTerm 
    });
    
    // Show notification
    showNotification('Filters applied successfully', 'success');
    
    // For demo purposes, simulate filtering by hiding non-matching rows
    filterLogEntries(userFilter, actionFilter, moduleFilter, searchTerm);
}

/**
 * Filter log entries based on selected criteria
 */
function filterLogEntries(userFilter, actionFilter, moduleFilter, searchTerm) {
    const logEntries = document.querySelectorAll('.log-entries-table tbody tr');
    
    logEntries.forEach(entry => {
        const user = entry.querySelector('td:nth-child(2)').textContent;
        const action = entry.querySelector('td:nth-child(3)').textContent;
        const module = entry.querySelector('td:nth-child(4)').textContent;
        const details = entry.querySelector('td:nth-child(5)').textContent;
        
        let showEntry = true;
        
        // Apply user filter
        if (userFilter !== 'all') {
            if (userFilter === 'admin' && !user.includes('Mwangi')) showEntry = false;
            if (userFilter === 'support' && !user.includes('Njoroge')) showEntry = false;
            if (userFilter === 'system' && !user.includes('System')) showEntry = false;
        }
        
        // Apply action filter
        if (actionFilter !== 'all') {
            if (actionFilter === 'login' && !action.includes('Login')) showEntry = false;
            if (actionFilter === 'create' && !action.includes('Created')) showEntry = false;
            if (actionFilter === 'update' && !action.includes('Update')) showEntry = false;
            if (actionFilter === 'delete' && !action.includes('Delete')) showEntry = false;
            if (actionFilter === 'export' && !action.includes('Export')) showEntry = false;
        }
        
        // Apply module filter
        if (moduleFilter !== 'all' && !module.toLowerCase().includes(moduleFilter.toLowerCase())) {
            showEntry = false;
        }
        
        // Apply search term
        if (searchTerm && !details.toLowerCase().includes(searchTerm.toLowerCase())) {
            showEntry = false;
        }
        
        // Show/hide entry
        entry.style.display = showEntry ? '' : 'none';
    });
}

/**
 * Apply access monitoring filters
 */
function applyAccessMonitoringFilters() {
    const startDate = document.getElementById('accessStartDate').value;
    const endDate = document.getElementById('accessEndDate').value;
    const userFilter = document.getElementById('accessUserFilter').value;
    const statusFilter = document.getElementById('accessStatusFilter').value;
    const searchTerm = document.getElementById('accessSearchInput').value;
    
    // In a real implementation, this would fetch filtered logs from the server
    console.log('Applying access filters:', { 
        startDate, 
        endDate, 
        userFilter, 
        statusFilter, 
        searchTerm 
    });
    
    // Show notification
    showNotification('Filters applied successfully', 'success');
    
    // For demo purposes, simulate filtering by hiding non-matching rows
    filterAccessEntries(userFilter, statusFilter, searchTerm);
}

/**
 * Filter access monitoring entries based on selected criteria
 */
function filterAccessEntries(userFilter, statusFilter, searchTerm) {
    const accessEntries = document.querySelectorAll('.login-activity-table tbody tr');
    
    accessEntries.forEach(entry => {
        const userId = entry.querySelector('td:nth-child(1)').textContent;
        const statusBadge = entry.querySelector('.status-badge');
        const status = statusBadge ? statusBadge.textContent : '';
        const ipAddress = entry.querySelector('td:nth-child(3)').textContent;
        
        let showEntry = true;
        
        // Apply user filter
        if (userFilter !== 'all') {
            if (userFilter === 'admin' && !userId.includes('john.mwangi')) showEntry = false;
            if (userFilter === 'support' && !userId.includes('jane.njoroge')) showEntry = false;
            if (userFilter === 'business' && !userId.includes('metrocabs')) showEntry = false;
        }
        
        // Apply status filter
        if (statusFilter !== 'all') {
            if (statusFilter === 'success' && !status.includes('Success')) showEntry = false;
            if (statusFilter === 'failed' && !status.includes('Failed')) showEntry = false;
            if (statusFilter === 'suspicious' && !status.includes('Off-hours') && !status.includes('New Location')) showEntry = false;
        }
        
        // Apply search term
        if (searchTerm && !userId.toLowerCase().includes(searchTerm.toLowerCase()) && 
            !ipAddress.toLowerCase().includes(searchTerm.toLowerCase())) {
            showEntry = false;
        }
        
        // Show/hide entry
        entry.style.display = showEntry ? '' : 'none';
    });
}

/**
 * Load role permissions
 * @param {string} roleId - The ID of the role
 */
function loadRolePermissions(roleId) {
    // In a real implementation, this would fetch role permissions from the server
    console.log(`Loading permissions for role ID: ${roleId}`);
    
    // For demo purposes, simulate different permission sets based on role
    const permissionSets = {
        '1': { // Platform Administrator
            dashboard: { view: true, create: true, edit: true, delete: true, export: true, admin: true },
            users: { view: true, create: true, edit: true, delete: true, export: true, admin: true },
            businesses: { view: true, create: true, edit: true, delete: true, export: true, admin: true },
            finance: { view: true, create: true, edit: true, delete: true, export: true, admin: true },
            security: { view: true, create: true, edit: true, delete: true, export: true, admin: true },
            support: { view: true, create: true, edit: true, delete: true, export: true, admin: true }
        },
        '2': { // Finance Manager
            dashboard: { view: true, create: false, edit: false, delete: false, export: true, admin: false },
            users: { view: true, create: false, edit: false, delete: false, export: false, admin: false },
            businesses: { view: true, create: false, edit: false, delete: false, export: false, admin: false },
            finance: { view: true, create: true, edit: true, delete: false, export: true, admin: true },
            security: { view: false, create: false, edit: false, delete: false, export: false, admin: false },
            support: { view: false, create: false, edit: false, delete: false, export: false, admin: false }
        },
        '3': { // Support Staff
            dashboard: { view: true, create: false, edit: false, delete: false, export: true, admin: false },
            users: { view: true, create: false, edit: false, delete: false, export: false, admin: false },
            businesses: { view: true, create: false, edit: false, delete: false, export: false, admin: false },
            finance: { view: false, create: false, edit: false, delete: false, export: false, admin: false },
            security: { view: false, create: false, edit: false, delete: false, export: false, admin: false },
            support: { view: true, create: true, edit: true, delete: false, export: true, admin: false }
        },
        '4': { // Business Manager
            dashboard: { view: true, create: false, edit: false, delete: false, export: true, admin: false },
            users: { view: true, create: false, edit: false, delete: false, export: false, admin: false },
            businesses: { view: true, create: true, edit: true, delete: false, export: true, admin: true },
            finance: { view: true, create: false, edit: false, delete: false, export: true, admin: false },
            security: { view: false, create: false, edit: false, delete: false, export: false, admin: false },
            support: { view: true, create: false, edit: false, delete: false, export: false, admin: false }
        },
        '5': { // User Manager
            dashboard: { view: true, create: false, edit: false, delete: false, export: true, admin: false },
            users: { view: true, create: true, edit: true, delete: true, export: true, admin: true },
            businesses: { view: false, create: false, edit: false, delete: false, export: false, admin: false },
            finance: { view: false, create: false, edit: false, delete: false, export: false, admin: false },
            security: { view: false, create: false, edit: false, delete: false, export: false, admin: false },
            support: { view: false, create: false, edit: false, delete: false, export: false, admin: false }
        },
        '6': { // Read-Only Analyst
            dashboard: { view: true, create: false, edit: false, delete: false, export: true, admin: false },
            users: { view: true, create: false, edit: false, delete: false, export: true, admin: false },
            businesses: { view: true, create: false, edit: false, delete: false, export: true, admin: false },
            finance: { view: true, create: false, edit: false, delete: false, export: true, admin: false },
            security: { view: true, create: false, edit: false, delete: false, export: true, admin: false },
            support: { view: true, create: false, edit: false, delete: false, export: true, admin: false }
        }
    };
    
    if (permissionSets[roleId]) {
        updatePermissionsCheckboxes(permissionSets[roleId]);
    }
}

/**
 * Update permissions checkboxes in the UI
 * @param {Object} permissions - The permissions object
 */
function updatePermissionsCheckboxes(permissions) {
    // Get all rows in the permissions table
    const rows = document.querySelectorAll('.permissions-table tbody tr');
    
    // Update checkboxes based on the module
    rows.forEach((row, index) => {
        const module = row.querySelector('td:first-child').textContent.toLowerCase();
        const checkboxes = row.querySelectorAll('input[type="checkbox"]');
        
        // Get permissions for this module
        const modulePermissions = permissions[module] || {};
        
        // Set checkbox states
        checkboxes[0].checked = modulePermissions.view || false;     // View
        checkboxes[1].checked = modulePermissions.create || false;    // Create
        checkboxes[2].checked = modulePermissions.edit || false;     // Edit
        checkboxes[3].checked = modulePermissions.delete || false;    // Delete
        checkboxes[4].checked = modulePermissions.export || false;    // Export
        checkboxes[5].checked = modulePermissions.admin || false;     // Admin
    });
}

/**
 * Load base role permissions for new role creation
 * @param {string} roleId - The ID of the base role
 */
function loadBaseRolePermissions(roleId) {
    // In a real implementation, this would fetch role permissions from the server
    console.log(`Loading base role permissions for ID: ${roleId}`);
    
    // For demo purposes, set some module checkboxes based on the selected role
    const moduleCheckboxes = document.querySelectorAll('.module-access input[type="checkbox"]');
    
    // Reset all checkboxes
    moduleCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Check appropriate checkboxes based on the selected role
    switch (roleId) {
        case '1': // Platform Administrator
            moduleCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            break;
        case '2': // Finance Manager
            document.getElementById('moduleDashboard').checked = true;
            document.getElementById('moduleFinance').checked = true;
            break;
        case '3': // Support Staff
            document.getElementById('moduleDashboard').checked = true;
            document.getElementById('moduleSupport').checked = true;
            break;
        case '4': // Business Manager
            document.getElementById('moduleDashboard').checked = true;
            document.getElementById('moduleBusinesses').checked = true;
            break;
        case '5': // User Manager
            document.getElementById('moduleDashboard').checked = true;
            document.getElementById('moduleUsers').checked = true;
            break;
        case '6': // Read-Only Analyst
            document.getElementById('moduleDashboard').checked = true;
            break;
    }
    
    // Also update the operation permissions
    const permCheckboxes = {
        'permView': true,
        'permCreate': roleId !== '6',  // Not for Read-Only
        'permEdit': roleId !== '6',    // Not for Read-Only
        'permDelete': roleId === '1',  // Only for admin
        'permExport': true,
        'permApprove': ['1', '2', '4'].includes(roleId), // For Admin, Finance, Business
        'permAdmin': roleId === '1'    // Only for admin
    };
    
    for (const [permId, checked] of Object.entries(permCheckboxes)) {
        const checkbox = document.getElementById(permId);
        if (checkbox) {
            checkbox.checked = checked;
        }
    }
    
    // Set data access level
    const dataAccessLevel = document.getElementById('dataAccessLevel');
    if (dataAccessLevel) {
        if (roleId === '1') {
            dataAccessLevel.value = 'all';
        } else if (['2', '4', '5'].includes(roleId)) {
            dataAccessLevel.value = 'department';
        } else {
            dataAccessLevel.value = 'assigned';
        }
    }
    
    // Set sensitive data access
    const sensitiveDataAccess = document.getElementById('sensitiveDataAccess');
    if (sensitiveDataAccess) {
        if (roleId === '1') {
            sensitiveDataAccess.value = 'full';
        } else if (['2', '4'].includes(roleId)) {
            sensitiveDataAccess.value = 'partial';
        } else {
            sensitiveDataAccess.value = 'none';
        }
    }
}

/**
 * Save backup configuration
 */
function saveBackupConfiguration() {
    // Get all backup configuration settings
    const config = {
        frequency: document.getElementById('backupFrequency').value,
        time: document.getElementById('backupTime').value,
        day: document.getElementById('backupDay').value,
        storageLocation: document.getElementById('storageLocation').value,
        secondaryStorage: document.getElementById('secondaryStorage').value,
        encryptBackups: document.getElementById('encryptBackups').checked,
        keepDaily: document.getElementById('keepDaily').value,
        keepWeekly: document.getElementById('keepWeekly').value,
        keepMonthly: document.getElementById('keepMonthly').value
    };
    
    // In a real implementation, this would save the configuration to the server
    console.log('Saving backup configuration:', config);
    
    // Show notification
    showNotification('Backup configuration saved successfully', 'success');
}

/**
 * Save role permissions
 */
function saveRolePermissions() {
    const roleId = document.getElementById('permissionRoleFilter').value;
    const auditChanges = document.getElementById('auditChangesToggle').checked;
    
    // Get all permission checkboxes
    const permissions = {};
    const rows = document.querySelectorAll('.permissions-table tbody tr');
    
    rows.forEach(row => {
        const module = row.querySelector('td:first-child').textContent.toLowerCase();
        const checkboxes = row.querySelectorAll('input[type="checkbox"]');
        
        permissions[module] = {
            view: checkboxes[0].checked,
            create: checkboxes[1].checked,
            edit: checkboxes[2].checked,
            delete: checkboxes[3].checked,
            export: checkboxes[4].checked,
            admin: checkboxes[5].checked
        };
    });
    
    // In a real implementation, this would save the permissions to the server
    console.log('Saving permissions for role ID:', roleId);
    console.log('Permissions:', permissions);
    console.log('Audit changes:', auditChanges);
    
    // Show notification
    showNotification('Permissions saved successfully', 'success');
    
    // Reset tracking for the Reset button
    resetPermissionChangeTracking();
}

/**
 * Track permission changes for the Reset button
 */
function trackPermissionChanges() {
    // In a real implementation, this would track changes to enable the Reset button
    console.log('Permission changes tracked');
    
    // Enable the Reset button
    const resetButton = document.getElementById('resetPermissionsBtn');
    if (resetButton) {
        resetButton.disabled = false;
    }
}

/**
 * Reset permission changes
 */
function resetPermissionChanges() {
    // Get the current role ID
    const roleId = document.getElementById('permissionRoleFilter').value;
    
    // In a real implementation, this would reload the original permissions from the server
    console.log('Resetting permission changes for role ID:', roleId);
    
    // For demo purposes, reload the role permissions
    loadRolePermissions(roleId);
    
    // Reset tracking for the Reset button
    resetPermissionChangeTracking();
    
    // Show notification
    showNotification('Permissions reset to original values', 'info');
}

/**
 * Reset permission change tracking
 */
function resetPermissionChangeTracking() {
    // In a real implementation, this would reset the change tracking
    
    // Disable the Reset button
    const resetButton = document.getElementById('resetPermissionsBtn');
    if (resetButton) {
        resetButton.disabled = true;
    }
}

/**
 * Apply permission template
 * @param {string} template - The template to apply
 */
function applyPermissionTemplate(template) {
    console.log('Applying permission template:', template);
    
    // For demo purposes, simulate applying different templates
    switch (template) {
        case 'minimal':
            applyMinimalTemplate();
            break;
        case 'standard':
            applyStandardTemplate();
            break;
        case 'support':
            applySupportTemplate();
            break;
        case 'manager':
            applyManagerTemplate();
            break;
        case 'admin':
            applyAdminTemplate();
            break;
    }
    
    // Show notification
    showNotification(`Applied ${template} permission template`, 'success');
    
    // Track changes for the Reset button
    trackPermissionChanges();
}

/**
 * Apply minimal permission template
 */
function applyMinimalTemplate() {
    // Reset all checkboxes
    document.querySelectorAll('.permissions-table input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Set view-only permissions for Dashboard
    const dashboardRow = document.querySelector('.permissions-table tbody tr:nth-child(1)');
    if (dashboardRow) {
        dashboardRow.querySelector('td:nth-child(2) input').checked = true; // View
        dashboardRow.querySelector('td:nth-child(6) input').checked = true; // Export
    }
}

/**
 * Apply standard user template
 */
function applyStandardTemplate() {
    // Reset all checkboxes
    document.querySelectorAll('.permissions-table input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Set standard user permissions
    const rows = document.querySelectorAll('.permissions-table tbody tr');
    
    rows.forEach((row, index) => {
        const module = row.querySelector('td:first-child').textContent.toLowerCase();
        
        // View permission for all modules
        row.querySelector('td:nth-child(2) input').checked = true; // View
        
        // Export permission for some modules
        if (['dashboard', 'users', 'businesses'].includes(module)) {
            row.querySelector('td:nth-child(6) input').checked = true; // Export
        }
        
        // Create and Edit for Support module only
        if (module === 'support') {
            row.querySelector('td:nth-child(3) input').checked = true; // Create
            row.querySelector('td:nth-child(4) input').checked = true; // Edit
        }
    });
}

/**
 * Apply support staff template
 */
function applySupportTemplate() {
    // Reset all checkboxes
    document.querySelectorAll('.permissions-table input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Set support staff permissions
    const rows = document.querySelectorAll('.permissions-table tbody tr');
    
    rows.forEach((row, index) => {
        const module = row.querySelector('td:first-child').textContent.toLowerCase();
        
        // View permission for most modules
        if (['dashboard', 'users', 'businesses', 'support'].includes(module)) {
            row.querySelector('td:nth-child(2) input').checked = true; // View
        }
        
        // Export permission for some modules
        if (['dashboard', 'support'].includes(module)) {
            row.querySelector('td:nth-child(6) input').checked = true; // Export
        }
        
        // Full permissions for Support module
        if (module === 'support') {
            row.querySelector('td:nth-child(3) input').checked = true; // Create
            row.querySelector('td:nth-child(4) input').checked = true; // Edit
            row.querySelector('td:nth-child(6) input').checked = true; // Export
        }
    });
}

/**
 * Apply department manager template
 */
function applyManagerTemplate() {
    // Reset all checkboxes
    document.querySelectorAll('.permissions-table input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Set department manager permissions
    const rows = document.querySelectorAll('.permissions-table tbody tr');
    
    rows.forEach((row, index) => {
        const module = row.querySelector('td:first-child').textContent.toLowerCase();
        
        // View permission for all modules
        row.querySelector('td:nth-child(2) input').checked = true; // View
        
        // Export permission for most modules
        if (!['security'].includes(module)) {
            row.querySelector('td:nth-child(6) input').checked = true; // Export
        }
        
        // Create and Edit for most modules
        if (!['finance', 'security'].includes(module)) {
            row.querySelector('td:nth-child(3) input').checked = true; // Create
            row.querySelector('td:nth-child(4) input').checked = true; // Edit
        }
        
        // Admin for their primary module (assuming Businesses)
        if (module === 'businesses') {
            row.querySelector('td:nth-child(7) input').checked = true; // Admin
        }
    });
}

/**
 * Apply administrator template
 */
function applyAdminTemplate() {
    // Set all checkboxes to checked
    document.querySelectorAll('.permissions-table input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
}

/**
 * Handle bulk permission action
 * @param {string} actionType - The action type
 */
function handleBulkPermissionAction(actionType) {
    console.log('Bulk permission action:', actionType);
    
    switch (actionType) {
        case 'Apply Security Template':
            // Show security template dropdown by simulating a click
            document.getElementById('permissionTemplate').focus();
            break;
        
        case 'Copy Role Permissions':
            // In a real implementation, this would open a dialog to select a role to copy from
            const sourceRoleId = prompt('Enter the ID of the role to copy permissions from:');
            if (sourceRoleId && ['1', '2', '3', '4', '5', '6'].includes(sourceRoleId)) {
                loadRolePermissions(sourceRoleId);
                showNotification(`Copied permissions from role ID ${sourceRoleId}`, 'success');
            } else if (sourceRoleId) {
                showNotification('Invalid role ID', 'error');
            }
            break;
        
        case 'Restrict Sensitive Data':
            // In a real implementation, this would restrict access to sensitive data
            // For demo purposes, uncheck admin permissions and delete permissions
            document.querySelectorAll('.permissions-table td:nth-child(5) input, .permissions-table td:nth-child(7) input').forEach(checkbox => {
                checkbox.checked = false;
            });
            showNotification('Sensitive data access restricted', 'success');
            break;
    }
    
    // Track changes for the Reset button
    trackPermissionChanges();
}

/**
 * Update audit settings
 * @param {boolean} enabled - Whether auditing is enabled
 */
function updateAuditSettings(enabled) {
    // In a real implementation, this would update the audit settings on the server
    console.log('Updating audit settings:', { enabled });
    
    // Show notification
    if (enabled) {
        showNotification('Permission change auditing enabled', 'success');
    } else {
        showNotification('Permission change auditing disabled', 'warning');
    }
}

/**********************************
 * USER INTERACTION EVENT HANDLERS
 **********************************/

/**
 * Move selected users between available and selected lists
 * @param {string} sourceId - The source list ID ('available' or 'selected')
 * @param {string} targetId - The target list ID ('available' or 'selected')
 */
function moveSelectedUsers(sourceId, targetId) {
    const sourceList = document.querySelector(`.${sourceId}-users .users-list`);
    const targetList = document.querySelector(`.${targetId}-users .users-list`);
    
    if (!sourceList || !targetList) return;
    
    // Get all checked checkboxes in the source list
    const selectedItems = sourceList.querySelectorAll('input[type="checkbox"]:checked');
    
    // Move each selected item to the target list
    selectedItems.forEach(checkbox => {
        const userItem = checkbox.closest('.user-item');
        const clonedItem = userItem.cloneNode(true);
        
        // Uncheck the checkbox in the cloned item
        clonedItem.querySelector('input[type="checkbox"]').checked = false;
        
        // Append to target list
        targetList.appendChild(clonedItem);
        
        // Remove from source list
        sourceList.removeChild(userItem);
    });
    
    // Initialize event listeners for the new items
    initUserSelection();
}

/**
 * Filter users list based on search term
 * @param {string} searchTerm - The search term
 */
function filterUsersList(searchTerm) {
    const userItems = document.querySelectorAll('.user-item');
    
    userItems.forEach(item => {
        const labelText = item.querySelector('label').textContent.toLowerCase();
        
        if (searchTerm && !labelText.includes(searchTerm.toLowerCase())) {
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    });
}

/**
 * Navigate to a different page
 * @param {boolean} isPrevious - Whether to go to the previous page
 */
function navigatePage(isPrevious) {
    // In a real implementation, this would navigate to a different page of data
    // For demo purposes, we'll just show a notification
    
    if (isPrevious) {
        showNotification('Navigated to previous page', 'info');
    } else {
        showNotification('Navigated to next page', 'info');
    }
}

/**
 * Refresh current tab data
 */
function refreshCurrentTabData() {
    // Get the active tab
    const activeTab = document.querySelector('.tab-btn.active');
    if (!activeTab) return;
    
    const tabId = activeTab.getAttribute('data-tab');
    
    // In a real implementation, this would refresh the data for the current tab
    console.log(`Refreshing data for tab: ${tabId}`);
    
    // Show notification
    showNotification('Data refreshed successfully', 'success');
}

/**
 * View session details
 * @param {string} sessionId - The session ID
 */
function viewSessionDetails(sessionId) {
    // In a real implementation, this would show session details
    console.log(`Viewing session details for ID: ${sessionId}`);
    
    // For demo purposes, show a notification
    showNotification(`Session details viewed for ID: ${sessionId}`, 'info');
}

/**
 * View backup details
 * @param {string} backupId - The backup ID
 */
function viewBackupDetails(backupId) {
    // In a real implementation, this would show backup details
    console.log(`Viewing backup details for ID: ${backupId}`);
    
    // For demo purposes, show a notification
    showNotification(`Backup details viewed for ID: ${backupId}`, 'info');
}

/**
 * View role details
 * @param {string} roleId - The role ID
 */
function viewRoleDetails(roleId) {
    // In a real implementation, this would show role details
    console.log(`Viewing role details for ID: ${roleId}`);
    
    // For demo purposes, show a notification
    showNotification(`Role details viewed for ID: ${roleId}`, 'info');
}

/**
 * Edit role
 * @param {string} roleId - The role ID
 */
function editRole(roleId) {
    // In a real implementation, this would open an edit role dialog
    console.log(`Editing role ID: ${roleId}`);
    
    // For demo purposes, simulate opening the create role modal with pre-filled data
    document.getElementById('createRoleModal').querySelector('.modal-header h2').textContent = 'Edit Role';
    
    // Set role name and description based on ID
    const roleNames = {
        '1': 'Platform Administrator',
        '2': 'Finance Manager',
        '3': 'Support Staff',
        '4': 'Business Manager',
        '5': 'User Manager',
        '6': 'Read-Only Analyst'
    };
    
    const roleDescriptions = {
        '1': 'Full access to all platform features and settings',
        '2': 'Access to financial reports and payments',
        '3': 'Access to customer support tools and limited user management',
        '4': 'Access to business management features',
        '5': 'Access to user management features only',
        '6': 'View-only access to reports and analytics'
    };
    
    document.getElementById('roleName').value = roleNames[roleId] || '';
    document.getElementById('roleDescription').value = roleDescriptions[roleId] || '';
    
    // Load permissions
    loadBaseRolePermissions(roleId);
    
    // Change create button text
    document.querySelector('#createRoleModal .primary-btn').textContent = 'Save Changes';
    
    // Open the modal
    openModal('createRoleModal');
}

/**
 * Clone role
 * @param {string} roleId - The role ID
 */
function cloneRole(roleId) {
    // In a real implementation, this would clone a role
    console.log(`Cloning role ID: ${roleId}`);
    
    // For demo purposes, simulate opening the create role modal with pre-filled data
    document.getElementById('createRoleModal').querySelector('.modal-header h2').textContent = 'Create Role (Clone)';
    
    // Set role name and description based on ID
    const roleNames = {
        '1': 'Platform Administrator',
        '2': 'Finance Manager',
        '3': 'Support Staff',
        '4': 'Business Manager',
        '5': 'User Manager',
        '6': 'Read-Only Analyst'
    };
    
    const roleDescriptions = {
        '1': 'Full access to all platform features and settings',
        '2': 'Access to financial reports and payments',
        '3': 'Access to customer support tools and limited user management',
        '4': 'Access to business management features',
        '5': 'Access to user management features only',
        '6': 'View-only access to reports and analytics'
    };
    
    document.getElementById('roleName').value = `${roleNames[roleId]} (Copy)` || '';
    document.getElementById('roleDescription').value = roleDescriptions[roleId] || '';
    
    // Set base role
    document.getElementById('baseRole').value = roleId;
    
    // Load permissions
    loadBaseRolePermissions(roleId);
    
    // Change create button text
    document.querySelector('#createRoleModal .primary-btn').textContent = 'Create Role';
    
    // Open the modal
    openModal('createRoleModal');
}

/**
 * Handle log entry action
 * @param {string} action - The action to perform
 * @param {string} entryId - The log entry ID
 */
function handleLogEntryAction(action, entryId) {
    // In a real implementation, this would perform the action on the log entry
    console.log(`Performing action "${action}" on log entry ID: ${entryId}`);
    
    // For demo purposes, show a notification
    showNotification(`Action "${action}" performed on log entry ID: ${entryId}`, 'success');
    
    // Close the modal
    closeModal('logEntryDetailsModal');
}

/**
 * Review flagged activity
 * @param {string} flagType - The type of flag
 */
function reviewFlaggedActivity(flagType) {
    // In a real implementation, this would show details for the flagged activity
    console.log(`Reviewing flagged activity: ${flagType}`);
    
    // For demo purposes, show a notification
    showNotification(`Reviewing flagged activity: ${flagType}`, 'info');
}

/**
 * Send security notification
 * @param {string} sessionId - The session ID
 * @param {string} userId - The user ID
 */
function sendSecurityNotification(sessionId, userId) {
    // In a real implementation, this would send a security notification
    console.log(`Sending security notification to user: ${userId} (Session ID: ${sessionId})`);
    
    // For demo purposes, show a notification
    showNotification(`Security notification sent to ${userId}`, 'success');
}

/**
 * Initiate password reset
 * @param {string} sessionId - The session ID
 * @param {string} userId - The user ID
 */
function initiatePasswordReset(sessionId, userId) {
    // In a real implementation, this would initiate a password reset
    console.log(`Initiating password reset for user: ${userId} (Session ID: ${sessionId})`);
    
    // For demo purposes, show a notification
    showNotification(`Password reset initiated for ${userId}`, 'success');
}

/**
 * Add to watchlist
 * @param {string} sessionId - The session ID
 * @param {string} userId - The user ID
 */
function addToWatchlist(sessionId, userId) {
    // In a real implementation, this would add the user to a watchlist
    console.log(`Adding user to watchlist: ${userId} (Session ID: ${sessionId})`);
    
    // For demo purposes, show a notification
    showNotification(`Added ${userId} to security watchlist`, 'success');
}

/**
 * Initiate security scan
 */
function initiateSecurityScan() {
    // In a real implementation, this would initiate a security scan
    console.log('Initiating security scan');
    
    // For demo purposes, simulate a scan with a loading indicator
    showNotification('Security scan initiated...', 'info');
    
    // Simulate scan completion after 3 seconds
    setTimeout(() => {
        showNotification('Security scan completed. No threats detected.', 'success');
    }, 3000);
}

/**
 * Test backup configuration
 */
function testBackupConfiguration() {
    // In a real implementation, this would test the backup configuration
    console.log('Testing backup configuration');
    
    // For demo purposes, simulate a test with a loading indicator
    showNotification('Testing backup configuration...', 'info');
    
    // Simulate test completion after 2 seconds
    setTimeout(() => {
        showNotification('Backup configuration test successful.', 'success');
    }, 2000);
}

/**
 * Refresh backup data
 */
function refreshBackupData() {
    // In a real implementation, this would refresh the backup data
    console.log('Refreshing backup data');
    
    // For demo purposes, show a notification
    showNotification('Backup data refreshed successfully', 'success');
}

/**
 * Generate log export
 */
function generateLogExport() {
    // Get export format
    const format = document.querySelector('input[name="exportFormat"]:checked').value;
    
    // Get date range
    const startDate = document.getElementById('exportStartDate').value;
    const endDate = document.getElementById('exportEndDate').value;
    
    // Get delivery method
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;
    
    // Get included fields
    const includedFields = [];
    document.querySelectorAll('input[type="checkbox"][name^="include"]:checked').forEach(checkbox => {
        includedFields.push(checkbox.name.replace('include', ''));
    });
    
    // Get filter criteria
    const userFilter = document.getElementById('exportUserFilter').value;
    const actionFilter = document.getElementById('exportActionFilter').value;
    const moduleFilter = document.getElementById('exportModuleFilter').value;
    
    // Create export config object
    const exportConfig = {
        format,
        startDate,
        endDate,
        deliveryMethod,
        includedFields,
        filters: {
            user: userFilter,
            action: actionFilter,
            module: moduleFilter
        }
    };
    
    // Add delivery-specific details
    if (deliveryMethod === 'email') {
        exportConfig.emailAddress = document.getElementById('emailAddress').value;
    } else if (deliveryMethod === 'schedule') {
        exportConfig.schedule = {
            frequency: document.getElementById('scheduleFrequency').value,
            time: document.getElementById('scheduleTime').value
        };
    }
    
    // In a real implementation, this would generate and deliver the export
    console.log('Generating log export with config:', exportConfig);
    
    // For demo purposes, show a notification
    if (deliveryMethod === 'download') {
        showNotification(`${format.toUpperCase()} export generated and ready for download`, 'success');
    } else if (deliveryMethod === 'email') {
        showNotification(`${format.toUpperCase()} export will be emailed to ${exportConfig.emailAddress}`, 'success');
    } else if (deliveryMethod === 'schedule') {
        showNotification(`${format.toUpperCase()} export scheduled (${exportConfig.schedule.frequency} at ${exportConfig.schedule.time})`, 'success');
    }
    
    // Close the modal
    closeModal('exportLogsModal');
}

/**
 * Start manual backup
 */
function startManualBackup() {
    // Get backup type
    const backupType = document.querySelector('input[name="backupType"]:checked').value;
    
    // Get backup destination
    const backupDestination = document.querySelector('input[name="backupDestination"]:checked').value;
    
    // Get advanced options
    const encryptBackup = document.getElementById('encryptBackupToggle').checked;
    const compressionLevel = document.getElementById('compressionLevel').value;
    const verifyAfterCompletion = document.getElementById('verificationToggle').checked;
    
    // Create backup config object
    const backupConfig = {
        type: backupType,
        destination: backupDestination,
        encrypt: encryptBackup,
        compression: compressionLevel,
        verify: verifyAfterCompletion
    };
    
    // Add type-specific details
    if (backupType === 'specific') {
        backupConfig.modules = [];
        document.querySelectorAll('.module-checkboxes input[type="checkbox"]:checked').forEach(checkbox => {
            backupConfig.modules.push(checkbox.name.replace('backup', ''));
        });
    }
    
    // Add destination-specific details
    if (backupDestination === 'custom') {
        backupConfig.customPath = document.getElementById('customLocationPath').value;
    }
    
    // In a real implementation, this would start the backup process
    console.log('Starting manual backup with config:', backupConfig);
    
    // For demo purposes, show a notification and close the modal
    showNotification('Manual backup started. This may take several minutes.', 'info');
    closeModal('manualBackupModal');
    
    // Simulate backup completion after 5 seconds
    setTimeout(() => {
        showNotification('Manual backup completed successfully.', 'success');
    }, 5000);
}

/**
 * Lock user account
 */
function lockUserAccount() {
    // Get account username
    const username = document.getElementById('lockAccountUsername').textContent;
    
    // Get lock reason
    const lockReason = document.getElementById('lockReason').value;
    let reason = lockReason;
    
    if (lockReason === 'other') {
        reason = document.getElementById('customReason').value;
    }
    
    // Get lock duration
    const lockDuration = document.querySelector('input[name="lockDuration"]:checked').value;
    let duration = 'permanent';
    
    if (lockDuration === 'temporary') {
        const durationValue = document.getElementById('lockDurationValue').value;
        const durationUnit = document.getElementById('lockDurationUnit').value;
        duration = `${durationValue} ${durationUnit}`;
    }
    
    // Get notification options
    const notifyUser = document.getElementById('notifyUserToggle').checked;
    let notificationTemplate = '';
    
    if (notifyUser) {
        notificationTemplate = document.getElementById('notificationTemplate').value;
        if (notificationTemplate === 'custom') {
            notificationTemplate = document.getElementById('customMessage').value;
        }
    }
    
    // Create lock config object
    const lockConfig = {
        username,
        reason,
        duration,
        notifyUser,
        notificationTemplate,
        internalNotes: document.getElementById('internalNotes').value
    };
    
    // In a real implementation, this would lock the user account
    console.log('Locking user account with config:', lockConfig);
    
    // For demo purposes, show a notification and close the modal
    showNotification(`Account ${username} locked successfully.`, 'success');
    closeModal('lockAccountModal');
}

/**
 * Create new role
 */
function createNewRole() {
    // Get role information
    const roleName = document.getElementById('roleName').value;
    const roleDescription = document.getElementById('roleDescription').value;
    const baseRole = document.getElementById('baseRole').value;
    
    // Get module access
    const moduleAccess = [];
    document.querySelectorAll('.module-access input[type="checkbox"]:checked').forEach(checkbox => {
        moduleAccess.push(checkbox.name.replace('module', ''));
    });
    
    // Get operation permissions
    const operationPermissions = {};
    document.querySelectorAll('.operation-permissions input[type="checkbox"]').forEach(checkbox => {
        operationPermissions[checkbox.name.replace('perm', '').toLowerCase()] = checkbox.checked;
    });
    
    // Get data access levels
    const dataAccessLevel = document.getElementById('dataAccessLevel').value;
    const sensitiveDataAccess = document.getElementById('sensitiveDataAccess').value;
    
    // Get selected users
    const selectedUsers = [];
    document.querySelectorAll('.selected-users .user-item label').forEach(label => {
        selectedUsers.push(label.textContent);
    });
    
    // Create role config object
    const roleConfig = {
        name: roleName,
        description: roleDescription,
        baseRole,
        moduleAccess,
        operationPermissions,
        dataAccessLevel,
        sensitiveDataAccess,
        users: selectedUsers
    };
    
    // In a real implementation, this would create the new role
    console.log('Creating new role with config:', roleConfig);
    
    // Check if this is an edit operation
    const isEdit = document.getElementById('createRoleModal').querySelector('.modal-header h2').textContent.includes('Edit');
    
    // For demo purposes, show a notification and close the modal
    if (isEdit) {
        showNotification(`Role "${roleName}" updated successfully.`, 'success');
    } else {
        showNotification(`Role "${roleName}" created successfully.`, 'success');
    }
    
    closeModal('createRoleModal');
}

/**
 * Show notification
 * @param {string} message - The notification message
 * @param {string} type - The notification type ('success', 'error', 'warning', 'info')
 */
function showNotification(message, type = 'info') {
    // Check if notifications container exists
    let notificationsContainer = document.querySelector('.notifications-container');
    
    // Create container if it doesn't exist
    if (!notificationsContainer) {
        notificationsContainer = document.createElement('div');
        notificationsContainer.className = 'notifications-container';
        notificationsContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(notificationsContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        background-color: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        margin-bottom: 10px;
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s, transform 0.3s;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 300px;
        max-width: 400px;
    `;
    
    // Add message
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    notification.appendChild(messageSpan);
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 10px;
    `;
    closeBtn.onclick = function() {
        removeNotification(notification);
    };
    notification.appendChild(closeBtn);
    
    // Add to container
    notificationsContainer.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

/**
 * Remove notification
 * @param {HTMLElement} notification - The notification element
 */
function removeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/**
 * Get notification color based on type
 * @param {string} type - The notification type
 * @returns {string} The color for the notification
 */
function getNotificationColor(type) {
    switch (type) {
        case 'success':
            return '#2ecc71';
        case 'error':
            return '#e74c3c';
        case 'warning':
            return '#f39c12';
        case 'info':
        default:
            return '#3498db';
    }
}