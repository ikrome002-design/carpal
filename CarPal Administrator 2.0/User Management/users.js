/**
 * CarPal by Citrus - User Management JavaScript
 * 
 * This file implements all functionality for the User Management section
 * of the CarPal Administrator Platform.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components and event listeners
    initializeTabNavigation();
    initializeUserActions();
    initializeModalHandlers();
    initializeFormHandlers();
    initializeFilters();
    initializePagination();
    initializeOTPHandlers();
    initializeDarkMode();
});

/**
 * Global variables and state management
 */
const state = {
    currentTab: 'administrator-users',
    currentUser: null, // For tracking the user being viewed/edited
    currentStep: 1, // For multi-step modals like import
    currentPage: 1,
    fileUploaded: false,
    otpCountdown: 60,
    countdownInterval: null,
    darkMode: localStorage.getItem('darkMode') === 'true' || false
};

/**
 * Tab Navigation
 */
function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            
            // Update state
            state.currentTab = tabId;
        });
    });
}

/**
 * User Actions
 */
function initializeUserActions() {
    // View Profile
    document.querySelectorAll('.view-profile').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const userId = this.getAttribute('data-user-id');
            openUserProfile(userId);
        });
    });
    
    // Edit User
    document.querySelectorAll('.edit-user').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const userId = this.getAttribute('data-user-id');
            openEditUserModal(userId);
        });
    });
    
    // Reset Password
    document.querySelectorAll('.reset-password').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const userId = this.getAttribute('data-user-id');
            openResetPasswordModal(userId);
        });
    });
    
    // Suspend User
    document.querySelectorAll('.suspend-user').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const userId = this.getAttribute('data-user-id');
            openSuspendUserModal(userId);
        });
    });
    
    // Reactivate User
    document.querySelectorAll('.reactivate-user').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const userId = this.getAttribute('data-user-id');
            openReactivateUserModal(userId);
        });
    });
    
    // Delete User
    document.querySelectorAll('.delete-user').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const userId = this.getAttribute('data-user-id');
            openDeleteUserModal(userId);
        });
    });

    // Quick action buttons
    document.getElementById('addUserBtn').addEventListener('click', function() {
        openAddUserModal();
    });
    
    document.getElementById('importUsersBtn').addEventListener('click', function() {
        openImportUsersModal();
    });
    
    document.getElementById('exportUsersBtn').addEventListener('click', function() {
        openExportUsersModal();
    });
}

/**
 * Modal Handlers
 */
function initializeModalHandlers() {
    // Close modals when clicking the X button or cancel button
    const closeModalButtons = document.querySelectorAll('.close-modal, [id$="CancelBtn"]');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = findParentModal(this);
            if (modalId) {
                closeModal(modalId);
            }
        });
    });

    // Close modals when clicking outside the modal content
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Action buttons in the profile view
    const profileActionButtons = {
        'editProfileBtn': openEditUserModal,
        'resetPasswordProfileBtn': openResetPasswordModal,
        'suspendUserProfileBtn': openSuspendUserModal,
        'deleteUserProfileBtn': openDeleteUserModal
    };

    for (const [id, handler] of Object.entries(profileActionButtons)) {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', function() {
                handler(state.currentUser);
                closeModal('viewUserProfileModal');
            });
        }
    }

    // Import Users Modal Navigation
    document.getElementById('nextStepBtn').addEventListener('click', function() {
        handleImportStep('next');
    });

    document.getElementById('prevStepBtn').addEventListener('click', function() {
        handleImportStep('prev');
    });

    document.getElementById('uploadNewFileBtn')?.addEventListener('click', function() {
        handleImportStep('prev'); // Go back to upload step
    });

    document.getElementById('importUsersConfirmBtn')?.addEventListener('click', function() {
        // Simulate OTP verification for import
        showNotification('Users imported successfully!', 'success');
        closeModal('importUsersModal');
    });

    // Form submission buttons
    document.getElementById('saveEditBtn')?.addEventListener('click', function() {
        handleEditUserSubmit();
    });

    document.getElementById('confirmResetBtn')?.addEventListener('click', function() {
        handleResetPasswordSubmit();
    });

    document.getElementById('confirmSuspendBtn')?.addEventListener('click', function() {
        handleSuspendUserSubmit();
    });

    document.getElementById('confirmReactivateBtn')?.addEventListener('click', function() {
        handleReactivateUserSubmit();
    });

    document.getElementById('confirmDeleteBtn')?.addEventListener('click', function() {
        if (validateOTPInput('deleteUserModal')) {
            handleDeleteUserSubmit();
        } else {
            showNotification('Please enter a valid OTP code', 'error');
        }
    });

    document.getElementById('createUserBtn')?.addEventListener('click', function() {
        handleAddUserSubmit();
    });

    document.getElementById('generateExportBtn')?.addEventListener('click', function() {
        handleExportUsersSubmit();
    });

    // Password generation button in reset password modal
    document.getElementById('generatePasswordBtn')?.addEventListener('click', function() {
        generateRandomPassword();
    });

    // Reset password method toggle
    const resetMethodRadios = document.querySelectorAll('input[name="resetMethod"]');
    resetMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            toggleTempPasswordSection();
        });
    });
}

/**
 * Form Handlers
 */
function initializeFormHandlers() {
    // Toggle business section in Add User modal
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            toggleBusinessSection();
            updateRoleOptions();
        });
    });

    // Toggle business filter in Export User modal
    const exportUserType = document.getElementById('exportUserType');
    if (exportUserType) {
        exportUserType.addEventListener('change', function() {
            toggleBusinessFilter();
        });
    }

    // Category field checkboxes in export modal
    const categoryCheckboxes = [
        'personalInfoFields',
        'accountInfoFields',
        'businessInfoFields',
        'activityInfoFields'
    ];

    categoryCheckboxes.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                toggleCategoryFields(this);
            });
        }
    });

    // File upload handling
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const fileInfo = document.getElementById('fileInfo');
    const removeFileBtn = document.getElementById('removeFileBtn');

    if (fileInput && uploadArea) {
        // File input change event
        fileInput.addEventListener('change', function(e) {
            handleFileUpload(e.target.files[0]);
        });

        // Drag and drop events
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length) {
                handleFileUpload(e.dataTransfer.files[0]);
            }
        });

        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });

        // Remove file button
        if (removeFileBtn) {
            removeFileBtn.addEventListener('click', function() {
                resetFileUpload();
            });
        }
    }
}

/**
 * Filter and Search Handlers
 */
function initializeFilters() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('userSearchInput');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            applySearch(searchInput.value);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applySearch(this.value);
            }
        });
    }

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            applyFilters();
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            resetFilters();
        });
    }
}

/**
 * Pagination Handlers
 */
function initializePagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            
            if (this.classList.contains('page-number')) {
                // Go to specific page
                const page = parseInt(this.textContent);
                goToPage(page);
            } else {
                // Check if this is previous or next button
                const isNext = this.querySelector('.fa-chevron-right');
                if (isNext) {
                    goToPage(state.currentPage + 1);
                } else {
                    goToPage(state.currentPage - 1);
                }
            }
        });
    });
}

/**
 * OTP Input Handlers
 */
function initializeOTPHandlers() {
    const otpInputGroups = document.querySelectorAll('.otp-input-group');
    
    otpInputGroups.forEach(group => {
        const inputs = group.querySelectorAll('input.otp-input');
        
        inputs.forEach((input, index) => {
            input.addEventListener('keyup', function(e) {
                // Move to next input after entering a digit
                if (this.value.length === this.maxLength) {
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                }
                
                // Move back when pressing backspace
                if (e.key === 'Backspace' && index > 0 && this.value.length === 0) {
                    inputs[index - 1].focus();
                }
            });
            
            // Allow only numbers
            input.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9]/g, '');
            });
        });
    });
    
    // OTP resend buttons and timers
    const resendBtns = [
        'resendOtpBtn',
        'resendImportOtpBtn',
        'resendOtpVerificationBtn'
    ];
    
    resendBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function() {
                if (!this.disabled) {
                    resendOTP();
                    startOTPCountdown(this);
                }
            });
        }
    });
}

/**
 * Dark Mode Toggle
 */
function initializeDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        // Set initial state
        if (state.darkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            state.darkMode = document.body.classList.contains('dark-mode');
            
            // Update toggle icon
            if (state.darkMode) {
                this.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                this.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', state.darkMode);
        });
    }
}

/**
 * User Profile Functions
 */
function openUserProfile(userId) {
    // Fetch user data based on userId
    const userData = getUserData(userId);
    state.currentUser = userId;
    
    if (userData) {
        // Update profile view with user data
        document.getElementById('profileName').textContent = userData.name;
        document.getElementById('profileRole').textContent = userData.role;
        document.getElementById('profileFullName').textContent = userData.name;
        document.getElementById('profileEmail').textContent = userData.email;
        document.getElementById('profilePhone').textContent = userData.phone || 'Not provided';
        document.getElementById('profileUserID').textContent = userData.id;
        document.getElementById('profileCreatedDate').textContent = userData.createdDate;
        document.getElementById('profileLastLogin').textContent = userData.lastLogin;
        document.getElementById('profileAssignedRole').textContent = userData.role;
        
        // Update status
        const statusElem = document.getElementById('profileStatus').querySelector('.status-indicator');
        statusElem.className = 'status-indicator ' + userData.status;
        statusElem.textContent = capitalizeFirstLetter(userData.status);
        document.getElementById('profileAccountStatus').textContent = capitalizeFirstLetter(userData.status);
        
        // Set permissions based on role
        setProfilePermissions(userData.role);
        
        // Update profile actions based on user status
        updateProfileActions(userData.status);
        
        // Show the profile modal
        openModal('viewUserProfileModal');
    }
}

function updateProfileActions(status) {
    const suspendBtn = document.getElementById('suspendUserProfileBtn');
    const reactivateBtn = document.createElement('button');
    reactivateBtn.id = 'reactivateUserProfileBtn';
    reactivateBtn.className = 'btn primary-btn';
    reactivateBtn.innerHTML = '<i class="fa-solid fa-user-check"></i> Reactivate User';
    
    if (status === 'suspended' || status === 'inactive') {
        // Replace suspend button with reactivate button
        if (suspendBtn && suspendBtn.parentNode) {
            suspendBtn.parentNode.replaceChild(reactivateBtn, suspendBtn);
            reactivateBtn.addEventListener('click', function() {
                openReactivateUserModal(state.currentUser);
                closeModal('viewUserProfileModal');
            });
        }
    } else {
        // Make sure the suspend button is in place
        const currentReactivateBtn = document.getElementById('reactivateUserProfileBtn');
        if (currentReactivateBtn && currentReactivateBtn.parentNode) {
            currentReactivateBtn.parentNode.replaceChild(suspendBtn, currentReactivateBtn);
        }
    }
}

function setProfilePermissions(role) {
    let permissionGroups = 'Standard Access';
    let accessLevel = 'Limited';
    
    // Set permissions based on role
    switch (role) {
        case 'Super Admin':
            permissionGroups = 'All Access';
            accessLevel = 'Global';
            break;
        case 'Admin':
            permissionGroups = 'Administrative Access';
            accessLevel = 'Global';
            break;
        case 'Support Manager':
            permissionGroups = 'Support Management';
            accessLevel = 'Support';
            break;
        case 'Finance Manager':
            permissionGroups = 'Financial Management';
            accessLevel = 'Finance';
            break;
        case 'Business Admin':
            permissionGroups = 'Business Management';
            accessLevel = 'Business';
            break;
        default:
            permissionGroups = 'Role-Specific Access';
            accessLevel = 'Limited';
    }
    
    document.getElementById('profilePermissionGroups').textContent = permissionGroups;
    document.getElementById('profileAccessLevel').textContent = accessLevel;
}

/**
 * Edit User Functions
 */
function openEditUserModal(userId) {
    // Fetch user data based on userId
    const userData = getUserData(userId);
    state.currentUser = userId;
    
    if (userData) {
        // Fill form with user data
        const nameParts = userData.name.split(' ');
        document.getElementById('editFirstName').value = nameParts[0] || '';
        document.getElementById('editLastName').value = nameParts.slice(1).join(' ') || '';
        document.getElementById('editEmail').value = userData.email || '';
        document.getElementById('editPhone').value = userData.phone || '';
        
        // Set role and status
        setSelectValue('editRole', getRoleValue(userData.role));
        setSelectValue('editStatus', userData.status);
        
        // Set permissions based on role
        updatePermissionsForRole(getRoleValue(userData.role));
        
        // Show the edit modal
        openModal('editUserModal');
    }
}

function handleEditUserSubmit() {
    // Get form data
    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;
    const email = document.getElementById('editEmail').value;
    const role = document.getElementById('editRole').value;
    const status = document.getElementById('editStatus').value;
    
    // Basic validation
    if (!firstName || !lastName || !email) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Check if this is a sensitive change that would require OTP
    const userData = getUserData(state.currentUser);
    const roleChanged = getRoleValue(userData.role) !== role;
    const statusChanged = userData.status !== status;
    
    if (roleChanged || statusChanged) {
        // Show OTP verification for sensitive changes
        openModal('otpVerificationModal');
        startOTPCountdown(document.getElementById('resendOtpVerificationBtn'));
        
        // Set up verification completion handler
        document.getElementById('verifyOtpBtn').onclick = function() {
            if (validateOTPInput('otpVerificationModal')) {
                saveUserChanges();
                closeModal('otpVerificationModal');
            } else {
                showNotification('Please enter a valid OTP code', 'error');
            }
        };
    } else {
        // Save changes without verification
        saveUserChanges();
    }
}

function saveUserChanges() {
    // Simulate saving changes
    showNotification('User updated successfully!', 'success');
    closeModal('editUserModal');
    
    // In a real app, you would submit to an API
    // For demo purposes, we'll update the UI to show the changes
    updateUserInTable(state.currentUser);
}

function updateUserInTable(userId) {
    // Get updated data from form
    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;
    const fullName = `${firstName} ${lastName}`;
    const email = document.getElementById('editEmail').value;
    const role = document.getElementById('editRole').options[document.getElementById('editRole').selectedIndex].text;
    const status = document.getElementById('editStatus').value;
    
    // Find user row in the table
    const userRows = document.querySelectorAll(`[data-user-id="${userId}"]`);
    if (userRows.length > 0) {
        // Get the parent row of the user action
        const userRow = userRows[0].closest('tr');
        if (userRow) {
            // Update user data in the table
            userRow.querySelector('.user-name').textContent = fullName;
            userRow.querySelector('.user-email').textContent = email;
            userRow.querySelector('.user-role').textContent = role;
            
            // Update status
            const statusElem = userRow.querySelector('.status-indicator');
            statusElem.className = 'status-indicator ' + status;
            statusElem.textContent = capitalizeFirstLetter(status);
            
            // Update action menu based on status
            updateActionMenu(userRow, status);
        }
    }
}

function updateActionMenu(userRow, status) {
    const actionMenu = userRow.querySelector('.action-menu');
    if (actionMenu) {
        // Get user ID
        const userId = actionMenu.querySelector('[data-user-id]').getAttribute('data-user-id');
        
        // Template for suspend button
        const suspendBtn = `
            <button class="action-item suspend-user" data-user-id="${userId}">
                <i class="fa-solid fa-ban"></i> Suspend User
            </button>
        `;
        
        // Template for reactivate button
        const reactivateBtn = `
            <button class="action-item reactivate-user" data-user-id="${userId}">
                <i class="fa-solid fa-user-check"></i> Reactivate User
            </button>
        `;
        
        // Update the buttons based on status
        if (status === 'active') {
            // Replace reactivate button with suspend button if it exists
            const existingReactivate = actionMenu.querySelector('.reactivate-user');
            if (existingReactivate) {
                existingReactivate.outerHTML = suspendBtn;
            }
        } else {
            // Replace suspend button with reactivate button if it exists
            const existingSuspend = actionMenu.querySelector('.suspend-user');
            if (existingSuspend) {
                existingSuspend.outerHTML = reactivateBtn;
            }
        }
        
        // Re-initialize action buttons
        initializeUserActions();
    }
}

function updatePermissionsForRole(role) {
    // Get all permission checkboxes
    const permissionCheckboxes = document.querySelectorAll('input[name="permissions"]');
    
    // Set permissions based on role
    switch (role) {
        case 'super_admin':
            // Super Admin gets all permissions
            permissionCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
                checkbox.disabled = true; // Can't change super admin permissions
            });
            break;
            
        case 'admin':
            // Admin gets most permissions
            permissionCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
                checkbox.disabled = false;
            });
            break;
            
        case 'support_manager':
            // Support Manager gets support-related permissions
            permissionCheckboxes.forEach(checkbox => {
                const val = checkbox.value;
                checkbox.checked = val.includes('user') || 
                                   val.includes('ticket') || 
                                   val === 'view_businesses';
                checkbox.disabled = false;
            });
            break;
            
        case 'finance_manager':
            // Finance Manager gets finance-related permissions
            permissionCheckboxes.forEach(checkbox => {
                const val = checkbox.value;
                checkbox.checked = val.includes('finance') || 
                                   val.includes('payment') || 
                                   val.includes('invoice') || 
                                   val.includes('report') ||
                                   val === 'view_users' ||
                                   val === 'view_businesses';
                checkbox.disabled = false;
            });
            break;
            
        default:
            // Other roles get basic permissions
            permissionCheckboxes.forEach(checkbox => {
                const val = checkbox.value;
                checkbox.checked = val.startsWith('view_');
                checkbox.disabled = false;
            });
    }
}

/**
 * Reset Password Functions
 */
function openResetPasswordModal(userId) {
    // Fetch user data based on userId
    const userData = getUserData(userId);
    state.currentUser = userId;
    
    if (userData) {
        // Set username in the reset modal
        document.getElementById('resetPasswordUsername').textContent = userData.name;
        
        // Reset form
        document.querySelector('input[name="resetMethod"][value="email"]').checked = true;
        document.getElementById('tempPassword').value = '';
        toggleTempPasswordSection();
        
        // Show the reset password modal
        openModal('resetPasswordModal');
    }
}

function toggleTempPasswordSection() {
    const tempSection = document.querySelector('.temp-password-section');
    const isTemp = document.querySelector('input[name="resetMethod"][value="temp"]').checked;
    
    if (tempSection) {
        if (isTemp) {
            tempSection.classList.remove('hidden');
            generateRandomPassword();
        } else {
            tempSection.classList.add('hidden');
        }
    }
}

function generateRandomPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    // Generate a 12-character password
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('tempPassword').value = password;
}

function handleResetPasswordSubmit() {
    const resetMethod = document.querySelector('input[name="resetMethod"]:checked').value;
    const userData = getUserData(state.currentUser);
    
    if (resetMethod === 'email') {
        showNotification(`Password reset link sent to ${userData.email}`, 'success');
    } else {
        const tempPassword = document.getElementById('tempPassword').value;
        showNotification(`Temporary password set: ${tempPassword}`, 'success');
    }
    
    closeModal('resetPasswordModal');
}

/**
 * Suspend User Functions
 */
function openSuspendUserModal(userId) {
    // Fetch user data based on userId
    const userData = getUserData(userId);
    state.currentUser = userId;
    
    if (userData) {
        // Set username in the suspend modal
        document.getElementById('suspendUsername').textContent = userData.name;
        
        // Reset form
        document.getElementById('suspendReason').value = '';
        document.getElementById('suspendNotes').value = '';
        document.getElementById('notifyUserSuspend').checked = true;
        
        // Show the suspend user modal
        openModal('suspendUserModal');
    }
}

function handleSuspendUserSubmit() {
    const reason = document.getElementById('suspendReason').value;
    
    if (!reason) {
        showNotification('Please select a reason for suspension', 'error');
        return;
    }
    
    // Simulate suspending the user
    showNotification('User suspended successfully!', 'success');
    closeModal('suspendUserModal');
    
    // Update user status in the UI
    const userData = getUserData(state.currentUser);
    userData.status = 'suspended';
    updateUserInTable(state.currentUser);
}

/**
 * Reactivate User Functions
 */
function openReactivateUserModal(userId) {
    // Fetch user data based on userId
    const userData = getUserData(userId);
    state.currentUser = userId;
    
    if (userData) {
        // Set username in the reactivate modal
        document.getElementById('reactivateUsername').textContent = userData.name;
        
        // Reset form
        document.getElementById('notifyUserReactivate').checked = true;
        document.getElementById('resetPasswordReactivate').checked = false;
        document.getElementById('reactivateNotes').value = '';
        
        // Show the reactivate user modal
        openModal('reactivateUserModal');
    }
}

function handleReactivateUserSubmit() {
    // Simulate reactivating the user
    showNotification('User reactivated successfully!', 'success');
    closeModal('reactivateUserModal');
    
    // Update user status in the UI
    const userData = getUserData(state.currentUser);
    userData.status = 'active';
    updateUserInTable(state.currentUser);
}

/**
 * Delete User Functions
 */
function openDeleteUserModal(userId) {
    // Fetch user data based on userId
    const userData = getUserData(userId);
    state.currentUser = userId;
    
    if (userData) {
        // Set username in the delete modal
        document.getElementById('deleteUsername').textContent = userData.name;
        
        // Reset form
        document.querySelector('input[name="dataHandling"][value="delete_all"]').checked = true;
        document.getElementById('deleteReason').value = '';
        document.getElementById('deleteNotes').value = '';
        
        // Reset OTP inputs
        resetOTPInputs('deleteUserModal');
        
        // Show the delete user modal
        openModal('deleteUserModal');
        
        // Start countdown for OTP
        startOTPCountdown(document.getElementById('resendOtpBtn'));
    }
}

function handleDeleteUserSubmit() {
    const reason = document.getElementById('deleteReason').value;
    
    if (!reason) {
        showNotification('Please select a reason for deletion', 'error');
        return;
    }
    
    // Simulate deleting the user
    showNotification('User deleted successfully!', 'success');
    closeModal('deleteUserModal');
    
    // Remove user from the UI
    const userRows = document.querySelectorAll(`[data-user-id="${state.currentUser}"]`);
    if (userRows.length > 0) {
        const userRow = userRows[0].closest('tr');
        if (userRow) {
            // Fade out and remove
            userRow.style.opacity = '0';
            setTimeout(() => {
                userRow.remove();
                updateUserCounts();
            }, 500);
        }
    }
}

/**
 * Add User Functions
 */
function openAddUserModal() {
    // Reset form
    document.getElementById('addUserForm').reset();
    document.querySelector('input[name="userType"][value="admin"]').checked = true;
    
    // Toggle business section visibility
    toggleBusinessSection();
    updateRoleOptions();
    
    // Show the add user modal
    openModal('addUserModal');
}

function toggleBusinessSection() {
    const businessSection = document.querySelector('.business-section');
    const isBusinessUser = document.querySelector('input[name="userType"][value="business"]').checked;
    
    if (businessSection) {
        businessSection.style.display = isBusinessUser ? 'block' : 'none';
    }
}

function updateRoleOptions() {
    const roleSelect = document.getElementById('addRole');
    const isBusinessUser = document.querySelector('input[name="userType"][value="business"]').checked;
    
    if (roleSelect) {
        // Get option groups
        const adminGroup = roleSelect.querySelector('.admin-roles');
        const businessGroup = roleSelect.querySelector('.business-roles');
        
        // Show/hide options based on user type
        if (isBusinessUser) {
            adminGroup.setAttribute('disabled', 'disabled');
            businessGroup.removeAttribute('disabled');
            // Select first business role
            if (businessGroup.querySelector('option')) {
                roleSelect.value = businessGroup.querySelector('option').value;
            }
        } else {
            businessGroup.setAttribute('disabled', 'disabled');
            adminGroup.removeAttribute('disabled');
            // Select first admin role
            if (adminGroup.querySelector('option')) {
                roleSelect.value = adminGroup.querySelector('option').value;
            }
        }
    }
}

function handleAddUserSubmit() {
    // Get form data
    const userType = document.querySelector('input[name="userType"]:checked').value;
    const firstName = document.getElementById('addFirstName').value;
    const lastName = document.getElementById('addLastName').value;
    const email = document.getElementById('addEmail').value;
    const role = document.getElementById('addRole').value;
    
    // Basic validation
    if (!firstName || !lastName || !email || !role) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // For business users, validate business selection
    if (userType === 'business') {
        const business = document.getElementById('addBusiness').value;
        if (!business) {
            showNotification('Please select a business', 'error');
            return;
        }
    }
    
    // Show OTP verification for adding a new user
    openModal('otpVerificationModal');
    startOTPCountdown(document.getElementById('resendOtpVerificationBtn'));
    
    // Set up verification completion handler
    document.getElementById('verifyOtpBtn').onclick = function() {
        if (validateOTPInput('otpVerificationModal')) {
            createNewUser();
            closeModal('otpVerificationModal');
        } else {
            showNotification('Please enter a valid OTP code', 'error');
        }
    };
}

function createNewUser() {
    // Simulate creating a new user
    showNotification('User created successfully!', 'success');
    closeModal('addUserModal');
    
    // In a real app, you would refresh the user list
    // For demo purposes, we'll increment the counter
    updateUserCounts(1);
}

/**
 * Import Users Functions
 */
function openImportUsersModal() {
    // Reset import modal state
    state.currentStep = 1;
    state.fileUploaded = false;
    
    // Reset all steps
    document.querySelectorAll('.step-indicator').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelectorAll('.import-step-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activate first step
    document.querySelector('.step-indicator[data-step="1"]').classList.add('active');
    document.querySelector('.import-step-content[data-step="1"]').classList.add('active');
    
    // Reset navigation buttons
    document.getElementById('prevStepBtn').style.display = 'none';
    document.getElementById('nextStepBtn').style.display = 'block';
    document.getElementById('importUsersConfirmBtn').style.display = 'none';
    
    // Reset file upload
    resetFileUpload();
    
    // Show the import users modal
    openModal('importUsersModal');
}

function handleImportStep(direction) {
    let nextStep = state.currentStep;
    
    if (direction === 'next') {
        // Validate current step before proceeding
        if (state.currentStep === 2 && !state.fileUploaded) {
            showNotification('Please upload a file first', 'warning');
            return;
        }
        
        nextStep = Math.min(state.currentStep + 1, 4);
    } else if (direction === 'prev') {
        nextStep = Math.max(state.currentStep - 1, 1);
    }
    
    // Update step indicators
    document.querySelectorAll('.step-indicator').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`.step-indicator[data-step="${nextStep}"]`).classList.add('active');
    
    // Update step content
    document.querySelectorAll('.import-step-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelector(`.import-step-content[data-step="${nextStep}"]`).classList.add('active');
    
    // Update navigation buttons
    document.getElementById('prevStepBtn').style.display = nextStep > 1 ? 'block' : 'none';
    document.getElementById('nextStepBtn').style.display = nextStep < 4 ? 'block' : 'none';
    document.getElementById('importUsersConfirmBtn').style.display = nextStep === 4 ? 'block' : 'none';
    
    // For step 4, initialize OTP countdown
    if (nextStep === 4) {
        resetOTPInputs('importUsersModal');
        startOTPCountdown(document.getElementById('resendImportOtpBtn'));
    }
    
    // Update state
    state.currentStep = nextStep;
}

function handleFileUpload(file) {
    if (!file) return;
    
    // Check file type
    const validTypes = ['.csv', '.xlsx', '.xls'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validTypes.includes(fileExt)) {
        showNotification('Please upload a CSV or Excel file', 'error');
        return;
    }
    
    // Update file info display
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = formatFileSize(file.size);
    document.getElementById('uploadArea').style.display = 'none';
    document.getElementById('fileInfo').style.display = 'flex';
    
    // Update state
    state.fileUploaded = true;
    
    // Automatically move to validation step after upload
    handleImportStep('next');
}

function resetFileUpload() {
    document.getElementById('fileInput').value = '';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('fileInfo').style.display = 'none';
    state.fileUploaded = false;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Export Users Functions
 */
function openExportUsersModal() {
    // Reset form
    document.querySelector('input[name="exportFormat"][value="csv"]').checked = true;
    document.getElementById('exportUserType').value = 'all';
    document.getElementById('exportStatus').value = 'all';
    
    // Reset category checkboxes
    document.getElementById('personalInfoFields').checked = true;
    document.getElementById('accountInfoFields').checked = true;
    document.getElementById('businessInfoFields').checked = false;
    document.getElementById('activityInfoFields').checked = false;
    
    // Update field checkboxes
    toggleCategoryFields(document.getElementById('personalInfoFields'));
    toggleCategoryFields(document.getElementById('accountInfoFields'));
    toggleCategoryFields(document.getElementById('businessInfoFields'));
    toggleCategoryFields(document.getElementById('activityInfoFields'));
    
    // Toggle business filter
    toggleBusinessFilter();
    
    // Show the export users modal
    openModal('exportUsersModal');
}

function toggleBusinessFilter() {
    const businessFilter = document.querySelector('.business-filter');
    const userType = document.getElementById('exportUserType').value;
    
    if (businessFilter) {
        businessFilter.style.display = userType === 'business' ? 'block' : 'none';
    }
}

function toggleCategoryFields(checkbox) {
    if (!checkbox) return;
    
    const category = checkbox.id.replace('Fields', '');
    const fields = document.querySelectorAll(`input[name="exportFields"][value^="${category}"], input[name="exportFields"][value="${category}"]`);
    
    fields.forEach(field => {
        field.checked = checkbox.checked;
        field.disabled = !checkbox.checked;
    });
}

function handleExportUsersSubmit() {
    // Get export format
    const format = document.querySelector('input[name="exportFormat"]:checked').value;
    
    // Get selected fields
    const fields = [];
    document.querySelectorAll('input[name="exportFields"]:checked').forEach(field => {
        fields.push(field.value);
    });
    
    if (fields.length === 0) {
        showNotification('Please select at least one field to export', 'error');
        return;
    }
    
    // Simulate export process
    showNotification(`Users exported as ${format.toUpperCase()} file`, 'success');
    closeModal('exportUsersModal');
    
    // In a real app, this would trigger a download
    setTimeout(() => {
        const a = document.createElement('a');
        a.href = '#';
        a.download = `carpal_users_export.${format}`;
        a.click();
    }, 500);
}

/**
 * OTP Verification Functions
 */
function validateOTPInput(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return false;
    
    const inputs = modal.querySelectorAll('.otp-input');
    let otp = '';
    
    inputs.forEach(input => {
        otp += input.value;
    });
    
    // Check if it's a 6-digit code
    return /^\d{6}$/.test(otp);
}

function resetOTPInputs(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const inputs = modal.querySelectorAll('.otp-input');
    inputs.forEach(input => {
        input.value = '';
    });
    
    // Focus on first input
    if (inputs.length > 0) {
        inputs[0].focus();
    }
}

function startOTPCountdown(button) {
    if (!button) return;
    
    // Disable button
    button.disabled = true;
    
    // Get countdown span element
    let countdownSpan;
    if (button.id === 'resendOtpBtn') {
        countdownSpan = document.getElementById('otpCountdown');
    } else if (button.id === 'resendImportOtpBtn') {
        countdownSpan = document.getElementById('importOtpCountdown');
    } else {
        // For OTP verification modal
        const timerText = document.getElementById('otpTimerText');
        if (timerText) {
            countdownSpan = {
                textContent: '60',
                // Update timer display
                set textContent(value) {
                    timerText.textContent = `00:${value.padStart(2, '0')}`;
                    
                    // Update SVG timer
                    const timerFill = document.querySelector('.timer-fill');
                    if (timerFill) {
                        const progress = parseInt(value) / 60 * 100;
                        timerFill.setAttribute('stroke-dasharray', `${progress}, 100`);
                    }
                }
            };
        }
    }
    
    if (!countdownSpan) return;
    
    // Reset state
    state.otpCountdown = 60;
    countdownSpan.textContent = state.otpCountdown.toString();
    
    // Clear existing interval
    if (state.countdownInterval) {
        clearInterval(state.countdownInterval);
    }
    
    // Start countdown
    state.countdownInterval = setInterval(() => {
        state.otpCountdown--;
        countdownSpan.textContent = state.otpCountdown.toString();
        
        if (state.otpCountdown <= 0) {
            // Enable button and clear interval
            button.disabled = false;
            clearInterval(state.countdownInterval);
        }
    }, 1000);
}

function resendOTP() {
    // Simulate sending OTP
    showNotification('A new OTP has been sent to your email', 'success');
    
    // Reset OTP inputs
    const modal = findParentModal(document.activeElement);
    if (modal) {
        resetOTPInputs(modal);
    }
}

/**
 * Filter and Search Functions
 */
function applySearch(query) {
    if (!query.trim()) {
        // Reset search
        showAllUsers();
        return;
    }
    
    // Convert query to lowercase for case-insensitive search
    query = query.trim().toLowerCase();
    
    // Get current tab content
    const tabContent = document.querySelector('.tab-content.active');
    if (!tabContent) return;
    
    // Get all user rows in the current tab
    const userRows = tabContent.querySelectorAll('.user-entry');
    
    userRows.forEach(row => {
        const name = row.querySelector('.user-name').textContent.toLowerCase();
        const email = row.querySelector('.user-email').textContent.toLowerCase();
        const role = row.querySelector('.user-role').textContent.toLowerCase();
        
        // Check if any field contains the query
        const matches = name.includes(query) || email.includes(query) || role.includes(query);
        
        // Show/hide row based on match
        row.style.display = matches ? '' : 'none';
    });
    
    // Update shown records count
    updatePaginationInfo();
}

function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    // Get current tab content
    const tabContent = document.querySelector('.tab-content.active');
    if (!tabContent) return;
    
    // Get all user rows in the current tab
    const userRows = tabContent.querySelectorAll('.user-entry');
    const rowsArray = Array.from(userRows);
    
    // Filter by status
    if (statusFilter !== 'all') {
        rowsArray.forEach(row => {
            const status = row.querySelector('.status-indicator').classList.contains(statusFilter);
            row.style.display = status ? '' : 'none';
        });
    } else {
        // Show all rows
        rowsArray.forEach(row => {
            row.style.display = '';
        });
    }
    
    // Apply date filter (in a real app, you would filter based on actual dates)
    if (dateFilter !== 'all') {
        // For demo purposes, just show a notification
        showNotification(`Date filter applied: ${dateFilter}`, 'info');
    }
    
    // Apply sorting
    const tbody = tabContent.querySelector('tbody');
    if (tbody) {
        const visibleRows = rowsArray.filter(row => row.style.display !== 'none');
        
        // Sort rows based on selected sort option
        visibleRows.sort((a, b) => {
            switch (sortFilter) {
                case 'nameAsc':
                    return a.querySelector('.user-name').textContent.localeCompare(b.querySelector('.user-name').textContent);
                case 'nameDesc':
                    return b.querySelector('.user-name').textContent.localeCompare(a.querySelector('.user-name').textContent);
                case 'dateDesc': // Newest first
                    return new Date(b.querySelector('.user-last-login').textContent) - new Date(a.querySelector('.user-last-login').textContent);
                case 'dateAsc': // Oldest first
                    return new Date(a.querySelector('.user-last-login').textContent) - new Date(b.querySelector('.user-last-login').textContent);
                case 'lastLoginDesc': // Most recent login
                    return new Date(b.querySelector('.user-last-login').textContent) - new Date(a.querySelector('.user-last-login').textContent);
                case 'lastLoginAsc': // Oldest login
                    return new Date(a.querySelector('.user-last-login').textContent) - new Date(b.querySelector('.user-last-login').textContent);
                default:
                    return 0;
            }
        });
        
        // Reorder rows in the DOM
        visibleRows.forEach(row => {
            tbody.appendChild(row);
        });
    }
    
    // Update shown records count
    updatePaginationInfo();
}

function resetFilters() {
    // Reset all filter controls
    document.getElementById('userSearchInput').value = '';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('dateFilter').value = 'all';
    document.getElementById('sortFilter').value = 'nameAsc';
    
    // Show all users
    showAllUsers();
    
    // Update shown records count
    updatePaginationInfo();
}

function showAllUsers() {
    // Get current tab content
    const tabContent = document.querySelector('.tab-content.active');
    if (!tabContent) return;
    
    // Show all user rows
    const userRows = tabContent.querySelectorAll('.user-entry');
    userRows.forEach(row => {
        row.style.display = '';
    });
}

/**
 * Pagination Functions
 */
function goToPage(page) {
    // Update current page
    state.currentPage = page;
    
    // Update pagination buttons
    updatePaginationButtons();
    
    // In a real app, you would load data for the new page
    // For demo purposes, just show a notification
    showNotification(`Navigated to page ${page}`, 'info');
}

function updatePaginationButtons() {
    // Get current tab content
    const tabContent = document.querySelector('.tab-content.active');
    if (!tabContent) return;
    
    // Get pagination elements
    const paginationInfo = tabContent.querySelector('.pagination-info');
    const pageButtons = tabContent.querySelectorAll('.pagination-btn.page-number');
    const prevButton = tabContent.querySelector('.pagination-btn:first-child');
    const nextButton = tabContent.querySelector('.pagination-btn:last-child');
    
    // Update page buttons
    pageButtons.forEach(button => {
        const page = parseInt(button.textContent);
        button.classList.toggle('active', page === state.currentPage);
    });
    
    // Update prev/next buttons
    if (prevButton) {
        prevButton.disabled = state.currentPage === 1;
    }
    
    if (nextButton) {
        nextButton.disabled = state.currentPage === pageButtons.length;
    }
    
    // Update pagination info
    updatePaginationInfo();
}

function updatePaginationInfo() {
    // Get current tab content
    const tabContent = document.querySelector('.tab-content.active');
    if (!tabContent) return;
    
    // Get pagination info element
    const paginationInfo = tabContent.querySelector('.pagination-info');
    if (!paginationInfo) return;
    
    // Count visible rows
    const visibleRows = Array.from(tabContent.querySelectorAll('.user-entry')).filter(row => row.style.display !== 'none');
    const totalItems = visibleRows.length;
    
    // Update pagination info text
    if (totalItems === 0) {
        paginationInfo.textContent = 'No items to display';
    } else {
        const start = (state.currentPage - 1) * 5 + 1;
        const end = Math.min(start + 4, totalItems);
        paginationInfo.textContent = `Showing ${start}-${end} of ${totalItems} items`;
    }
}

/**
 * User Counts Update
 */
function updateUserCounts(increment = 0) {
    // Get stat values
    const totalUsersValue = document.querySelector('.total-users .stat-value');
    const activeUsersValue = document.querySelector('.active-users .stat-value');
    
    if (totalUsersValue && activeUsersValue) {
        // Parse current values
        let totalUsers = parseInt(totalUsersValue.textContent.replace(/,/g, ''));
        let activeUsers = parseInt(activeUsersValue.textContent.replace(/,/g, ''));
        
        // Update counts
        totalUsers += increment;
        activeUsers += increment; // Assuming new users are active by default
        
        // Update UI
        totalUsersValue.textContent = totalUsers.toLocaleString();
        activeUsersValue.textContent = activeUsers.toLocaleString();
    }
}

/**
 * Utility Functions
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        
        // Focus first input if available
        const firstInput = modal.querySelector('input:not([type="hidden"])');
        if (firstInput) {
            setTimeout(() => {
                firstInput.focus();
            }, 100);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        
        // Clear any countdowns
        if (state.countdownInterval) {
            clearInterval(state.countdownInterval);
        }
    }
}

function findParentModal(element) {
    while (element) {
        if (element.classList && element.classList.contains('modal')) {
            return element.id;
        }
        element = element.parentElement;
    }
    return null;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add icon based on type
    let icon = '';
    switch (type) {
        case 'success':
            icon = 'fa-check-circle';
            break;
        case 'error':
            icon = 'fa-exclamation-circle';
            break;
        case 'warning':
            icon = 'fa-exclamation-triangle';
            break;
        default:
            icon = 'fa-info-circle';
    }
    
    // Create icon element
    const iconElement = document.createElement('i');
    iconElement.className = `fas ${icon}`;
    notification.prepend(iconElement);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Add animation class
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setSelectValue(selectId, value) {
    const select = document.getElementById(selectId);
    if (select) {
        select.value = value;
    }
}

function getRoleValue(roleText) {
    // Convert role display text to value
    const roleMap = {
        'Super Admin': 'super_admin',
        'Admin': 'admin',
        'Support Manager': 'support_manager',
        'Finance Manager': 'finance_manager',
        'Support Agent': 'support_agent',
        'Business Admin': 'business_admin',
        'Fleet Manager': 'fleet_manager',
        'Dispatcher': 'dispatcher',
        'Accountant': 'accountant',
        'Staff': 'staff'
    };
    
    return roleMap[roleText] || '';
}

/**
 * Mock Data Functions
 */
function getUserData(userId) {
    // This would normally be a API call
    // For demo purposes, we'll use the data from the table
    const userData = {
        id: userId,
        name: '',
        email: '',
        phone: '+254 712 345 678',
        role: '',
        status: 'active',
        createdDate: '2024-01-15',
        lastLogin: ''
    };
    
    // Find user in the DOM
    const userButton = document.querySelector(`[data-user-id="${userId}"]`);
    if (userButton) {
        const userRow = userButton.closest('tr');
        if (userRow) {
            userData.name = userRow.querySelector('.user-name').textContent;
            userData.email = userRow.querySelector('.user-email').textContent;
            userData.role = userRow.querySelector('.user-role').textContent;
            userData.lastLogin = userRow.querySelector('.user-last-login').textContent;
            
            // Get status
            const statusElem = userRow.querySelector('.status-indicator');
            if (statusElem) {
                // Extract status from class name
                const statusClasses = ['active', 'suspended', 'inactive'];
                for (const statusClass of statusClasses) {
                    if (statusElem.classList.contains(statusClass)) {
                        userData.status = statusClass;
                        break;
                    }
                }
            }
            
            // Get business if it exists
            const businessElem = userRow.querySelector('.user-business');
            if (businessElem) {
                userData.business = businessElem.textContent;
            }
        }
    }
    
    return userData;
}

// Add custom styles for notifications
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 4px;
    background-color: #333;
    color: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s, transform 0.3s;
}

.notification.show {
    opacity: 1;
    transform: translateY(0);
}

.notification.success {
    background-color: #2ecc71;
}

.notification.error {
    background-color: #e74c3c;
}

.notification.warning {
    background-color: #f39c12;
}

.notification.info {
    background-color: #3498db;
}

.notification i {
    font-size: 18px;
}
`;
document.head.appendChild(style);