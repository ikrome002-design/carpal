document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    setupTabNavigation();
    
    // Dropdown toggles
    setupDropdowns();
    
    // Admin Menu Navigation
    setupAdminMenu();
    
    // Modal Functionality
    setupModals();
    
    // Toggle Dark Mode
    setupDarkMode();
    
    // Form Submissions
    setupFormSubmissions();
    
    // File Upload Previews
    setupFileUploads();
});

// Tab Navigation
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and hide all content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.style.display = 'none');
            
            // Add active class to current button and show corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).style.display = 'block';
        });
    });
}

// Dropdown toggles
function setupDropdowns() {
    // Notifications dropdown
    const notificationIcon = document.querySelector('.notifications');
    const notificationsDropdown = document.querySelector('.notifications-dropdown');
    
    if (notificationIcon && notificationsDropdown) {
        notificationIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationsDropdown.style.display = notificationsDropdown.style.display === 'block' ? 'none' : 'block';
            profileDropdown.style.display = 'none';
        });
    }
    
    // Profile dropdown
    const profileIcon = document.querySelector('.user-profile');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
            notificationsDropdown.style.display = 'none';
        });
    }
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', () => {
        if (notificationsDropdown) notificationsDropdown.style.display = 'none';
        if (profileDropdown) profileDropdown.style.display = 'none';
    });
}

// Admin Menu Navigation
function setupAdminMenu() {
    const adminMenuButtons = document.querySelectorAll('.admin-menu-btn');
    const adminSections = document.querySelectorAll('.admin-section');
    
    adminMenuButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and hide all sections
            adminMenuButtons.forEach(btn => btn.classList.remove('active'));
            adminSections.forEach(section => section.style.display = 'none');
            
            // Add active class to current button and show corresponding section
            button.classList.add('active');
            const sectionId = button.getAttribute('data-section');
            document.getElementById(`${sectionId}-section`).style.display = 'block';
        });
    });
    
    // Return to Staff View button
    const returnToStaffBtn = document.querySelector('.return-staff-btn');
    
    if (returnToStaffBtn) {
        returnToStaffBtn.addEventListener('click', () => {
            document.getElementById('admin-dashboard-tab').style.display = 'none';
            document.querySelector('.tab-btn[data-tab="profile"]').click();
        });
    }
}

// Modal Functionality
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-btn, .modal .btn-cancel, .modal .ok-btn');
    
    // Show modals based on trigger buttons
    
    // Add Holiday Modal
    const addHolidayBtn = document.querySelector('.add-holiday-btn');
    const addHolidayModal = document.getElementById('add-holiday-modal');
    
    if (addHolidayBtn && addHolidayModal) {
        addHolidayBtn.addEventListener('click', () => {
            addHolidayModal.style.display = 'flex';
        });
    }
    
    // Add Staff Modal
    const addStaffBtn = document.querySelector('.add-staff-btn');
    const addStaffModal = document.getElementById('add-staff-modal');
    
    if (addStaffBtn && addStaffModal) {
        addStaffBtn.addEventListener('click', () => {
            addStaffModal.style.display = 'flex';
        });
    }
    
    // Create Role Modal
    const createRoleBtn = document.querySelector('.create-role-btn');
    const createRoleModal = document.getElementById('create-role-modal');
    
    if (createRoleBtn && createRoleModal) {
        createRoleBtn.addEventListener('click', () => {
            createRoleModal.style.display = 'flex';
        });
    }
    
    // Admin Authentication
    const adminAccessBtn = document.querySelector('.tab-btn.admin-access');
    const requestCodeBtn = document.querySelector('.request-code-btn');
    const verifyBtn = document.querySelector('.verify-btn');
    const verificationEmailModal = document.getElementById('verification-email-modal');
    
    if (adminAccessBtn && requestCodeBtn && verificationEmailModal) {
        requestCodeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            verificationEmailModal.style.display = 'flex';
        });
    }
    
    if (verifyBtn) {
        verifyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate successful verification
            document.getElementById('admin-tab').style.display = 'none';
            document.getElementById('admin-dashboard-tab').style.display = 'block';
            
            // Set the first admin menu item as active
            document.querySelector('.admin-menu-btn').classList.add('active');
            document.getElementById('shop-profile-section').style.display = 'block';
        });
    }
    
    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // Close modal when clicking outside of modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Toggle Dark Mode
function setupDarkMode() {
    const darkModeToggle = document.querySelector('.theme-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Toggle moon/sun icon
            const icon = darkModeToggle.querySelector('i');
            if (icon.classList.contains('fa-moon')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
}

// Form Submissions
function setupFormSubmissions() {
    const forms = document.querySelectorAll('form');
    const successModal = document.getElementById('success-modal');
    const successMessageText = document.getElementById('success-message-text');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Different success messages based on form
            let successMessage = 'Your changes have been saved successfully.';
            
            if (form.classList.contains('feedback-form')) {
                successMessage = 'Your feedback has been submitted successfully.';
            } else if (form.classList.contains('new-staff-form')) {
                successMessage = 'New staff member has been added successfully.';
            } else if (form.classList.contains('role-form')) {
                successMessage = 'New role has been created successfully.';
            } else if (form.classList.contains('holiday-form')) {
                successMessage = 'Holiday has been added to the schedule.';
            }
            
            // Update success message and show modal
            if (successMessageText) {
                successMessageText.textContent = successMessage;
            }
            
            if (successModal) {
                successModal.style.display = 'flex';
            }
            
            // Reset the form
            form.reset();
            
            // Close any open modal
            const parentModal = form.closest('.modal');
            if (parentModal) {
                parentModal.style.display = 'none';
            }
        });
    });
}

// File Upload Previews
function setupFileUploads() {
    // Profile picture upload
    setupFileUploadPreview('.change-picture-btn', 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png');
    
    // Business logo upload
    setupFileUploadPreview('.change-logo-btn', 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Random Logo\\logo.png');
    
    // Shop logo upload
    setupFileUploadPreview('.upload-logo-btn', 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Random Logo\\logo.png');
    
    // File attachment display
    const fileInput = document.getElementById('feedback-attachment');
    const fileInfo = document.querySelector('.file-info');
    
    if (fileInput && fileInfo) {
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                fileInfo.textContent = fileInput.files[0].name;
            } else {
                fileInfo.textContent = 'No file selected';
            }
        });
    }
}

function setupFileUploadPreview(buttonSelector, defaultImagePath) {
    const uploadBtn = document.querySelector(buttonSelector);
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            // Create temporary file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            
            fileInput.addEventListener('change', () => {
                if (fileInput.files.length > 0) {
                    // In a real application, we would handle the file upload here
                    // For this demo, we'll just update the image preview with the default
                    const imgContainer = uploadBtn.closest('.profile-picture-container, .business-logo-container, .shop-logo-container');
                    if (imgContainer) {
                        const img = imgContainer.querySelector('img');
                        if (img) {
                            // In a real implementation, we would use URL.createObjectURL(fileInput.files[0])
                            // but for this demo, we'll just use the default image
                            img.src = defaultImagePath;
                        }
                    }
                }
            });
            
            fileInput.click();
        });
    }
}

// Additional JavaScript for Admin Sections

document.addEventListener('DOMContentLoaded', function() {
    // Modal triggers for admin sections
    setupAdminModals();
    
    // Event listeners for admin section actions
    setupAdminEventListeners();
});

// Setup Admin Modal Triggers
function setupAdminModals() {
    // Schedule & Appointments modals
    setupModalTrigger('.add-service-duration-btn', 'add-service-duration-modal');
    setupModalTrigger('.schedule-holiday-btn', 'add-holiday-modal');
    
    // Inventory Control modals
    setupModalTrigger('.supplier-btn', 'add-supplier-modal');
    setupModalTrigger('.edit-supplier', 'add-supplier-modal');
    setupDeleteModalTrigger('.delete-supplier', 'delete-supplier-modal');
    
    // Billing & Payments modals
    setupModalTrigger('.add-payment-method-btn', 'add-payment-method-modal');
    setupModalTrigger('.edit-payment', 'add-payment-method-modal');
    setupModalTrigger('.configure-tariffs-btn', 'configure-tariff-modal');
    setupModalTrigger('.add-insurance-btn', 'add-insurance-modal');
    setupModalTrigger('.edit-insurance', 'add-insurance-modal');
    setupDeleteModalTrigger('.delete-insurance', 'delete-insurance-modal');
}

// Helper function to setup modal triggers
function setupModalTrigger(triggerSelector, modalId) {
    const triggers = document.querySelectorAll(triggerSelector);
    const modal = document.getElementById(modalId);
    
    if (triggers.length && modal) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
            });
        });
    }
}

// Helper function for delete confirmation modals
function setupDeleteModalTrigger(triggerSelector, modalId) {
    const triggers = document.querySelectorAll(triggerSelector);
    const modal = document.getElementById(modalId);
    
    if (triggers.length && modal) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
                
                // Store reference to the item that triggered the delete modal
                modal.dataset.targetItem = e.target.closest('tr').dataset.id || '';
            });
        });
        
        // Delete button action
        const deleteBtn = modal.querySelector('.btn-delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                // In a real implementation, we would handle the deletion with an API call
                // using the modal.dataset.targetItem to identify what to delete
                
                // For this demo, we'll just close the modal and show a success message
                modal.style.display = 'none';
                
                const successModal = document.getElementById('success-modal');
                const successMessage = document.getElementById('success-message-text');
                
                if (successModal && successMessage) {
                    if (modalId === 'delete-supplier-modal') {
                        successMessage.textContent = 'Supplier has been deleted successfully.';
                    } else if (modalId === 'delete-insurance-modal') {
                        successMessage.textContent = 'Insurance company has been deleted successfully.';
                    }
                    
                    successModal.style.display = 'flex';
                }
            });
        }
    }
}

// Setup event listeners for admin section actions
function setupAdminEventListeners() {
    // Add custom category
    const addCategoryBtn = document.querySelector('.add-category-btn');
    const customCategoryInput = document.getElementById('custom-category');
    
    if (addCategoryBtn && customCategoryInput) {
        addCategoryBtn.addEventListener('click', () => {
            const categoryName = customCategoryInput.value.trim();
            
            if (categoryName) {
                // Create new category item
                const categoryItem = document.createElement('div');
                categoryItem.className = 'category-item';
                
                // Create unique ID for the checkbox
                const categoryId = 'category-' + categoryName.toLowerCase().replace(/\s+/g, '-');
                
                categoryItem.innerHTML = `
                    <input type="checkbox" id="${categoryId}" checked>
                    <label for="${categoryId}">${categoryName}</label>
                `;
                
                // Add to the categories container
                const categoriesContainer = document.querySelector('.parts-categories');
                if (categoriesContainer) {
                    categoriesContainer.appendChild(categoryItem);
                }
                
                // Clear the input
                customCategoryInput.value = '';
                
                // Show success message
                showSuccessToast('Category added successfully');
            }
        });
    }
    
    // Configure Tariff Model
    const tariffForm = document.querySelector('.tariff-form');
    
    if (tariffForm) {
        tariffForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get selected tariff model
            let selectedModel = '';
            let modelDescription = '';
            
            if (document.getElementById('sharing-tariff').checked) {
                selectedModel = 'Sharing Tariff';
                modelDescription = `${document.getElementById('modal-commission').value}% split between merchant and customer`;
            } else if (document.getElementById('business-centric').checked) {
                selectedModel = 'Business Centric';
                modelDescription = `${document.getElementById('modal-commission').value}% added to customer invoice amount`;
            } else if (document.getElementById('customer-centric').checked) {
                selectedModel = 'Customer Centric';
                modelDescription = `${document.getElementById('modal-commission').value}% deducted from merchant revenue`;
            }
            
            // Update the tariff model info on the main page
            const tariffModelType = document.querySelector('.tariff-model-type');
            const tariffDescription = document.querySelector('.tariff-description');
            
            if (tariffModelType && tariffDescription) {
                tariffModelType.textContent = selectedModel;
                tariffDescription.textContent = modelDescription;
            }
            
            // Update the commission percentage on the main page
            const commissionInput = document.getElementById('commission-percentage');
            if (commissionInput) {
                commissionInput.value = document.getElementById('modal-commission').value;
            }
            
            // Close the modal
            document.getElementById('configure-tariff-modal').style.display = 'none';
            
            // Show success message
            showSuccessToast('Tariff model updated successfully');
        });
    }
    
    // Edit service duration
    const editDurationLinks = document.querySelectorAll('.edit-duration');
    
    editDurationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the service name and duration from the table row
            const row = e.target.closest('tr');
            const serviceName = row.cells[0].textContent;
            const duration = row.cells[1].textContent;
            
            // Populate the add service duration modal
            const serviceNameInput = document.getElementById('service-name');
            const serviceDurationInput = document.getElementById('service-duration');
            
            if (serviceNameInput && serviceDurationInput) {
                serviceNameInput.value = serviceName;
                serviceDurationInput.value = duration;
                
                // Show the modal
                document.getElementById('add-service-duration-modal').style.display = 'flex';
            }
        });
    });
    
    // Edit threshold
    const editThresholdLinks = document.querySelectorAll('.edit-threshold');
    
    editThresholdLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the current threshold value
            const row = e.target.closest('tr');
            const category = row.cells[0].textContent;
            const currentThreshold = row.cells[1].textContent;
            
            // Prompt for new threshold
            const newThreshold = prompt(`Enter new threshold for ${category}:`, currentThreshold);
            
            if (newThreshold !== null && !isNaN(newThreshold) && newThreshold.trim() !== '') {
                // Update the threshold value in the table
                row.cells[1].textContent = newThreshold;
                
                // Show success message
                showSuccessToast('Threshold updated successfully');
            }
        });
    });
}

// Helper function to show a temporary success toast message
function showSuccessToast(message) {
    // Check if a toast container already exists
    let toastContainer = document.querySelector('.toast-container');
    
    // If not, create one
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
        
        // Add styles for toast container
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '9999';
    }
    
    // Create the toast element
    const toast = document.createElement('div');
    toast.className = 'toast success-toast';
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the toast
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.backgroundColor = '#4CAF50';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '4px';
    toast.style.marginTop = '10px';
    toast.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    toast.style.animation = 'fadeIn 0.3s, fadeOut 0.3s 2.7s';
    toast.style.opacity = '0';
    toast.style.maxWidth = '300px';
    
    // Add CSS for animations
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}