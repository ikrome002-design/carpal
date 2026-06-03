/**
 * CarPal by Citrus - My Profile JavaScript
 * Handles all interactive functionality for the Platform Administrator's profile page
 */

// ======= DOCUMENT READY FUNCTION =======
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all event listeners and page functionality
    initModalControls();
    initBasicInfoForm();
    initProfilePictureControls();
    initContactPreferencesForm();
    initPasswordControls();
    init2FAControls();
    initActivityLogControls();
    initConfirmationDialog();
    initSuccessNotification();
    initDarkModeToggle();
});

// ======= MODAL MANAGEMENT =======
function initModalControls() {
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    
    // Get all buttons that open modals
    const editBasicInfoBtn = document.getElementById('editBasicInfoBtn');
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const removePhotoBtn = document.getElementById('removePhotoBtn');
    const editContactPreferencesBtn = document.getElementById('editContactPreferencesBtn');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const manage2FABtn = document.getElementById('manage2FABtn');
    const viewActivityLogBtn = document.getElementById('viewActivityLogBtn');
    
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    
    // Event listeners for opening modals
    if(editBasicInfoBtn) {
        editBasicInfoBtn.addEventListener('click', function() {
            openModal('editBasicInfoModal');
        });
    }
    
    if(changePhotoBtn) {
        changePhotoBtn.addEventListener('click', function() {
            openModal('profilePictureModal');
        });
    }
    
    if(removePhotoBtn) {
        removePhotoBtn.addEventListener('click', function() {
            showConfirmationDialog(
                'Are you sure you want to remove your profile picture?',
                'This action cannot be undone.',
                function() { removeProfilePicture(); }
            );
        });
    }
    
    if(editContactPreferencesBtn) {
        editContactPreferencesBtn.addEventListener('click', function() {
            openModal('contactPreferencesModal');
        });
    }
    
    if(changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            openModal('changePasswordModal');
        });
    }
    
    if(manage2FABtn) {
        manage2FABtn.addEventListener('click', function() {
            openModal('manage2FAModal');
        });
    }
    
    if(viewActivityLogBtn) {
        viewActivityLogBtn.addEventListener('click', function() {
            openModal('activityLogModal');
        });
    }
    
    // Event listeners for closing modals
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            closeModal(button.closest('.modal').id);
        });
    });
    
    cancelButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            closeModal(button.closest('.modal').id);
        });
    });
    
    // Close modal when clicking outside of modal content
    modals.forEach(function(modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Specific modal action buttons
    const backToProfileBtn = document.getElementById('backToProfileBtn');
    if(backToProfileBtn) {
        backToProfileBtn.addEventListener('click', function() {
            closeModal('activityLogModal');
        });
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling of background
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// ======= BASIC INFORMATION FORM =======
function initBasicInfoForm() {
    const saveBasicInfoBtn = document.getElementById('saveBasicInfoBtn');
    const basicInfoForm = document.getElementById('basicInfoForm');
    
    if(saveBasicInfoBtn && basicInfoForm) {
        saveBasicInfoBtn.addEventListener('click', function() {
            // Validate form
            if(validateBasicInfoForm()) {
                // Show confirmation dialog
                showConfirmationDialog(
                    'Are you sure you want to update your basic information?',
                    '',
                    function() {
                        // Save changes
                        saveBasicInfo();
                    }
                );
            }
        });
    }
}

function validateBasicInfoForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    let isValid = true;
    
    // Simple validation
    if(firstName && firstName.value.trim() === '') {
        markInvalid(firstName, 'First name is required');
        isValid = false;
    } else if(firstName) {
        markValid(firstName);
    }
    
    if(lastName && lastName.value.trim() === '') {
        markInvalid(lastName, 'Last name is required');
        isValid = false;
    } else if(lastName) {
        markValid(lastName);
    }
    
    if(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email.value.trim() === '') {
            markInvalid(email, 'Email address is required');
            isValid = false;
        } else if(!emailRegex.test(email.value.trim())) {
            markInvalid(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            markValid(email);
        }
    }
    
    if(phone) {
        const phoneRegex = /^\+\d{1,4}\s\d{3}\s\d{3}\s\d{3}$/;
        if(phone.value.trim() === '') {
            markInvalid(phone, 'Phone number is required');
            isValid = false;
        } else if(!phoneRegex.test(phone.value.trim())) {
            markInvalid(phone, 'Please enter a valid phone number format: +XXX XXX XXX XXX');
            isValid = false;
        } else {
            markValid(phone);
        }
    }
    
    return isValid;
}

function saveBasicInfo() {
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // In a real app, this would send data to a server
    // For this demo, we'll update the UI directly
    
    // Update Full Name in the profile section
    const fullNameDisplay = document.querySelector('.basic-info-section .info-row:first-child .info-value');
    if(fullNameDisplay) {
        fullNameDisplay.textContent = `${firstName} ${lastName}`;
    }
    
    // Update Email Address
    const emailDisplay = document.querySelector('.basic-info-section .info-row:nth-child(2) .info-value');
    if(emailDisplay) {
        emailDisplay.textContent = email;
    }
    
    // Update Phone Number
    const phoneDisplay = document.querySelector('.basic-info-section .info-row:nth-child(3) .info-value');
    if(phoneDisplay) {
        phoneDisplay.textContent = phone;
    }
    
    // Close the modal
    closeModal('editBasicInfoModal');
    
    // Show success notification
    showSuccessNotification(
        'Your basic information has been updated successfully.',
        ''
    );
    
    // In a real app, you would also update any cached user data or session data
    console.log('Basic info updated:', { firstName, lastName, email, phone });
    
    // Add this action to the activity list
    addToActivityList('Updated basic information');
}

// ======= PROFILE PICTURE MANAGEMENT =======
function initProfilePictureControls() {
    const uploadFromComputerBtn = document.getElementById('uploadFromComputerBtn');
    const takeWebcamPhotoBtn = document.getElementById('takeWebcamPhotoBtn');
    const removeCurrentPhotoBtn = document.getElementById('removeCurrentPhotoBtn');
    const profileImageUpload = document.getElementById('profileImageUpload');
    const applyProfilePictureBtn = document.getElementById('applyProfilePictureBtn');
    
    // Image editing controls
    const cropControl = document.getElementById('cropControl');
    const zoomControl = document.getElementById('zoomControl');
    const rotateControl = document.getElementById('rotateControl');
    
    // Initialize image editing controls
    if(cropControl) {
        cropControl.addEventListener('input', function() {
            updateImagePreview();
        });
    }
    
    if(zoomControl) {
        zoomControl.addEventListener('input', function() {
            updateImagePreview();
        });
    }
    
    if(rotateControl) {
        rotateControl.addEventListener('input', function() {
            updateImagePreview();
        });
    }
    
    // Upload image functionality
    if(uploadFromComputerBtn && profileImageUpload) {
        uploadFromComputerBtn.addEventListener('click', function() {
            profileImageUpload.click();
        });
        
        profileImageUpload.addEventListener('change', function(e) {
            if(e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    const imagePreview = document.getElementById('imagePreview');
                    if(imagePreview) {
                        imagePreview.src = event.target.result;
                    }
                    
                    // Reset controls
                    if(cropControl) cropControl.value = 0;
                    if(zoomControl) zoomControl.value = 0;
                    if(rotateControl) rotateControl.value = 0;
                }
                
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }
    
    // Webcam functionality (simplified, would need a real webcam API in production)
    if(takeWebcamPhotoBtn) {
        takeWebcamPhotoBtn.addEventListener('click', function() {
            alert('Webcam functionality would be implemented with a proper webcam API in production.');
            // In a real implementation, this would open a webcam stream
        });
    }
    
    // Remove current photo from the editor
    if(removeCurrentPhotoBtn) {
        removeCurrentPhotoBtn.addEventListener('click', function() {
            const imagePreview = document.getElementById('imagePreview');
            if(imagePreview) {
                // Set to default avatar
                imagePreview.src = "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png";
            }
            
            // Reset controls
            if(cropControl) cropControl.value = 0;
            if(zoomControl) zoomControl.value = 0;
            if(rotateControl) rotateControl.value = 0;
        });
    }
    
    // Apply profile picture changes
    if(applyProfilePictureBtn) {
        applyProfilePictureBtn.addEventListener('click', function() {
            showConfirmationDialog(
                'Are you sure you want to update your profile picture?',
                '',
                function() {
                    applyProfilePictureChanges();
                }
            );
        });
    }
}

function updateImagePreview() {
    // This would do real-time updates of image with crop/zoom/rotate
    // For simplicity, we're just logging the values here
    const cropValue = document.getElementById('cropControl').value;
    const zoomValue = document.getElementById('zoomControl').value;
    const rotateValue = document.getElementById('rotateControl').value;
    
    console.log('Image editing:', { crop: cropValue, zoom: zoomValue, rotate: rotateValue });
    
    // In a real implementation, this would apply CSS transforms to the preview image
    const imagePreview = document.getElementById('imagePreview');
    if(imagePreview) {
        // Apply rotation - this is the simplest to implement for demo purposes
        imagePreview.style.transform = `rotate(${rotateValue}deg)`;
    }
}

function applyProfilePictureChanges() {
    // Get the edited image from the preview
    const imagePreview = document.getElementById('imagePreview');
    
    // Update both the profile pictures in the UI
    if(imagePreview) {
        const mainProfileImage = document.querySelector('.profile-image');
        if(mainProfileImage) {
            mainProfileImage.src = imagePreview.src;
        }
        
        const headerProfileIcon = document.querySelector('.profile-icon');
        if(headerProfileIcon) {
            headerProfileIcon.src = imagePreview.src;
        }
    }
    
    // Close the modal
    closeModal('profilePictureModal');
    
    // Show success notification
    showSuccessNotification(
        'Your profile picture has been updated successfully.',
        ''
    );
    
    // In a real app, you would upload the image to a server
    console.log('Profile picture updated');
    
    // Add this action to the activity list
    addToActivityList('Updated profile picture');
}

function removeProfilePicture() {
    // Set profile images to default
    const mainProfileImage = document.querySelector('.profile-image');
    if(mainProfileImage) {
        mainProfileImage.src = "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png";
    }
    
    const headerProfileIcon = document.querySelector('.profile-icon');
    if(headerProfileIcon) {
        headerProfileIcon.src = "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-48.png";
    }
    
    // Show success notification
    showSuccessNotification(
        'Your profile picture has been removed.',
        ''
    );
    
    console.log('Profile picture removed');
    
    // Add this action to the activity list
    addToActivityList('Removed profile picture');
}

// ======= CONTACT PREFERENCES FORM =======
function initContactPreferencesForm() {
    const savePreferencesBtn = document.getElementById('savePreferencesBtn');
    const resetPreferencesBtn = document.getElementById('resetPreferencesBtn');
    
    if(savePreferencesBtn) {
        savePreferencesBtn.addEventListener('click', function() {
            showConfirmationDialog(
                'Are you sure you want to update your contact preferences?',
                '',
                function() {
                    saveContactPreferences();
                }
            );
        });
    }
    
    if(resetPreferencesBtn) {
        resetPreferencesBtn.addEventListener('click', function() {
            resetContactPreferencesToDefault();
        });
    }
    
    // Initialize toggle dependencies
    const emailToggle = document.getElementById('emailToggle');
    const smsToggle = document.getElementById('smsToggle');
    const inAppToggle = document.getElementById('inAppToggle');
    const primaryContactMethod = document.getElementById('primaryContactMethod');
    
    if(emailToggle && primaryContactMethod) {
        emailToggle.addEventListener('change', function() {
            if(!this.checked && primaryContactMethod.value === 'email') {
                // If email is disabled but is the primary method, show alert
                alert('You cannot disable email notifications while it is set as your primary contact method.');
                this.checked = true;
            }
        });
    }
    
    if(smsToggle && primaryContactMethod) {
        smsToggle.addEventListener('change', function() {
            if(!this.checked && primaryContactMethod.value === 'sms') {
                // If SMS is disabled but is the primary method, show alert
                alert('You cannot disable SMS notifications while it is set as your primary contact method.');
                this.checked = true;
            }
        });
    }
    
    if(inAppToggle && primaryContactMethod) {
        inAppToggle.addEventListener('change', function() {
            if(!this.checked && primaryContactMethod.value === 'inapp') {
                // If in-app is disabled but is the primary method, show alert
                alert('You cannot disable In-App notifications while it is set as your primary contact method.');
                this.checked = true;
            }
        });
    }
    
    if(primaryContactMethod && emailToggle && smsToggle && inAppToggle) {
        primaryContactMethod.addEventListener('change', function() {
            // Ensure the corresponding toggle is enabled when primary method is selected
            if(this.value === 'email' && !emailToggle.checked) {
                emailToggle.checked = true;
                alert('Email notifications have been enabled to match your primary contact method.');
            } else if(this.value === 'sms' && !smsToggle.checked) {
                smsToggle.checked = true;
                alert('SMS notifications have been enabled to match your primary contact method.');
            } else if(this.value === 'inapp' && !inAppToggle.checked) {
                inAppToggle.checked = true;
                alert('In-App notifications have been enabled to match your primary contact method.');
            }
        });
    }
}

function saveContactPreferences() {
    // Get form values
    const primaryContactMethod = document.getElementById('primaryContactMethod').value;
    const emailEnabled = document.getElementById('emailToggle').checked;
    const smsEnabled = document.getElementById('smsToggle').checked;
    const inAppEnabled = document.getElementById('inAppToggle').checked;
    const alertFrequency = document.querySelector('input[name="alertFrequency"]:checked').value;
    
    // Get notification type settings
    const systemUpdates = document.getElementById('systemUpdatesToggle').checked;
    const securityAlerts = document.getElementById('securityAlertsToggle').checked;
    const userRegistrations = document.getElementById('userRegistrationsToggle').checked;
    const paymentNotifications = document.getElementById('paymentNotificationsToggle').checked;
    const businessUpdates = document.getElementById('businessUpdatesToggle').checked;
    
    // In a real app, this would send data to a server
    // For this demo, we'll update the UI directly
    
    // Update preferred contact method
    const preferredMethodDisplay = document.querySelector('.contact-preferences-section .info-row:first-child .info-value');
    if(preferredMethodDisplay) {
        let methodText = '';
        switch(primaryContactMethod) {
            case 'email':
                methodText = 'Email';
                break;
            case 'sms':
                methodText = 'SMS';
                break;
            case 'inapp':
                methodText = 'In-App';
                break;
        }
        preferredMethodDisplay.textContent = methodText;
    }
    
    // Update email notifications status
    const emailStatusDisplay = document.querySelector('.contact-preferences-section .info-row:nth-child(2) .info-value');
    if(emailStatusDisplay) {
        emailStatusDisplay.textContent = emailEnabled ? 'Enabled' : 'Disabled';
    }
    
    // Update SMS notifications status
    const smsStatusDisplay = document.querySelector('.contact-preferences-section .info-row:nth-child(3) .info-value');
    if(smsStatusDisplay) {
        smsStatusDisplay.textContent = smsEnabled ? 'Enabled' : 'Disabled';
    }
    
    // Update in-app notifications status
    const inAppStatusDisplay = document.querySelector('.contact-preferences-section .info-row:nth-child(4) .info-value');
    if(inAppStatusDisplay) {
        inAppStatusDisplay.textContent = inAppEnabled ? 'Enabled' : 'Disabled';
    }
    
    // Close the modal
    closeModal('contactPreferencesModal');
    
    // Show success notification
    showSuccessNotification(
        'Your contact preferences have been updated successfully.',
        'You will now receive notifications according to your new settings.'
    );
    
    console.log('Contact preferences updated:', {
        primaryContactMethod,
        emailEnabled,
        smsEnabled,
        inAppEnabled,
        alertFrequency,
        systemUpdates,
        securityAlerts,
        userRegistrations,
        paymentNotifications,
        businessUpdates
    });
    
    // Add this action to the activity list
    addToActivityList('Updated contact preferences');
}

function resetContactPreferencesToDefault() {
    // Set default values
    document.getElementById('primaryContactMethod').value = 'email';
    document.getElementById('emailToggle').checked = true;
    document.getElementById('smsToggle').checked = false;
    document.getElementById('inAppToggle').checked = true;
    
    document.getElementById('systemUpdatesToggle').checked = true;
    document.getElementById('securityAlertsToggle').checked = true;
    document.getElementById('userRegistrationsToggle').checked = true;
    document.getElementById('paymentNotificationsToggle').checked = true;
    document.getElementById('businessUpdatesToggle').checked = true;
    
    // Set real-time as default frequency
    const realtimeOption = document.querySelector('input[name="alertFrequency"][value="realtime"]');
    if(realtimeOption) {
        realtimeOption.checked = true;
    }
    
    alert('Contact preferences have been reset to default values. Click "Save Preferences" to apply these changes.');
}

// ======= PASSWORD MANAGEMENT =======
function initPasswordControls() {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const updatePasswordBtn = document.getElementById('updatePasswordBtn');
    
    if(newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
    
    if(updatePasswordBtn) {
        updatePasswordBtn.addEventListener('click', function() {
            if(validatePasswordForm()) {
                showConfirmationDialog(
                    'Are you sure you want to change your password?',
                    'You will need to use your new password the next time you log in.',
                    function() {
                        updatePassword();
                    }
                );
            }
        });
    }
    
    if(confirmPasswordInput && newPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            if(this.value !== newPasswordInput.value) {
                markInvalid(confirmPasswordInput, 'Passwords do not match');
            } else {
                markValid(confirmPasswordInput);
            }
        });
    }
}

function checkPasswordStrength(password) {
    // Get all requirement elements
    const lengthRequirement = document.getElementById('lengthRequirement');
    const uppercaseRequirement = document.getElementById('uppercaseRequirement');
    const lowercaseRequirement = document.getElementById('lowercaseRequirement');
    const numberRequirement = document.getElementById('numberRequirement');
    const specialRequirement = document.getElementById('specialRequirement');
    const strengthIndicator = document.getElementById('strengthIndicator');
    
    // Check each requirement
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    // Update requirement displays
    updateRequirementElement(lengthRequirement, hasLength);
    updateRequirementElement(uppercaseRequirement, hasUppercase);
    updateRequirementElement(lowercaseRequirement, hasLowercase);
    updateRequirementElement(numberRequirement, hasNumber);
    updateRequirementElement(specialRequirement, hasSpecial);
    
    // Calculate strength percentage
    let strengthPercent = 0;
    if(hasLength) strengthPercent += 20;
    if(hasUppercase) strengthPercent += 20;
    if(hasLowercase) strengthPercent += 20;
    if(hasNumber) strengthPercent += 20;
    if(hasSpecial) strengthPercent += 20;
    
    // Update strength indicator
    if(strengthIndicator) {
        strengthIndicator.style.width = strengthPercent + '%';
        
        // Update color based on strength
        if(strengthPercent < 40) {
            strengthIndicator.style.backgroundColor = '#e74c3c'; // weak
        } else if(strengthPercent < 80) {
            strengthIndicator.style.backgroundColor = '#f39c12'; // medium
        } else {
            strengthIndicator.style.backgroundColor = '#2ecc71'; // strong
        }
    }
}

function updateRequirementElement(element, isMet) {
    if(element) {
        if(isMet) {
            element.classList.add('met');
            element.querySelector('i').className = 'fa-solid fa-check';
        } else {
            element.classList.remove('met');
            element.querySelector('i').className = 'fa-solid fa-circle';
        }
    }
}

function validatePasswordForm() {
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    let isValid = true;
    
    // Check if current password is entered
    if(currentPassword && currentPassword.value.trim() === '') {
        markInvalid(currentPassword, 'Current password is required');
        isValid = false;
    } else if(currentPassword) {
        markValid(currentPassword);
    }
    
    // Check if new password meets requirements
    if(newPassword) {
        const hasLength = newPassword.value.length >= 8;
        const hasUppercase = /[A-Z]/.test(newPassword.value);
        const hasLowercase = /[a-z]/.test(newPassword.value);
        const hasNumber = /[0-9]/.test(newPassword.value);
        const hasSpecial = /[^A-Za-z0-9]/.test(newPassword.value);
        
        if(!hasLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
            markInvalid(newPassword, 'Password must meet all the requirements');
            isValid = false;
        } else {
            markValid(newPassword);
        }
    }
    
    // Check if passwords match
    if(confirmPassword && newPassword && confirmPassword.value !== newPassword.value) {
        markInvalid(confirmPassword, 'Passwords do not match');
        isValid = false;
    } else if(confirmPassword) {
        markValid(confirmPassword);
    }
    
    return isValid;
}

function updatePassword() {
    // In a real app, this would send the password update to a server
    // For this demo, we'll just update the UI
    
    // Update last password change date in the profile section
    const lastPasswordChangeDisplay = document.querySelector('.account-security-section .info-row:first-child .info-value');
    if(lastPasswordChangeDisplay) {
        const today = new Date();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        lastPasswordChangeDisplay.textContent = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    }
    
    // Reset form fields
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    // Reset strength indicator
    const strengthIndicator = document.getElementById('strengthIndicator');
    if(strengthIndicator) {
        strengthIndicator.style.width = '0%';
    }
    
    // Reset requirement displays
    const requirements = document.querySelectorAll('.requirement');
    requirements.forEach(function(req) {
        req.classList.remove('met');
        req.querySelector('i').className = 'fa-solid fa-circle';
    });
    
    // Close the modal
    closeModal('changePasswordModal');
    
    // Show success notification
    showSuccessNotification(
        'Your password has been updated successfully.',
        'You will need to use your new password the next time you log in.'
    );
    
    console.log('Password updated');
    
    // Add this action to the activity list
    addToActivityList('Changed account password');
}

// ======= 2FA MANAGEMENT =======
function init2FAControls() {
    const twoFactorToggle = document.getElementById('twoFactorToggle');
    const twoFactorMethodRadios = document.querySelectorAll('input[name="twoFactorMethod"]');
    const complete2FABtn = document.getElementById('complete2FABtn');
    const verificationCode = document.getElementById('verificationCode');
    const downloadCodesBtn = document.querySelector('.download-codes-btn');
    
    if(twoFactorToggle) {
        twoFactorToggle.addEventListener('change', function() {
            if(!this.checked) {
                // If trying to disable 2FA, ask for confirmation
                showConfirmationDialog(
                    'Are you sure you want to disable two-factor authentication?',
                    'This will make your account less secure.',
                    function() {
                        disable2FA();
                    }
                );
                // Revert toggle until confirmation
                twoFactorToggle.checked = true;
            }
        });
    }
    
    if(twoFactorMethodRadios) {
        twoFactorMethodRadios.forEach(function(radio) {
            radio.addEventListener('change', function() {
                update2FAMethodDisplay(this.value);
            });
        });
    }
    
    if(complete2FABtn && verificationCode) {
        complete2FABtn.addEventListener('click', function() {
            if(verificationCode.value.trim() === '') {
                alert('Please enter the verification code to complete setup.');
                return;
            }
            
            // In a real app, this would verify the code with the server
            if(verificationCode.value.trim().length === 6 && /^\d+$/.test(verificationCode.value.trim())) {
                showConfirmationDialog(
                    'Are you sure you want to update your two-factor authentication settings?',
                    '',
                    function() {
                        complete2FASetup();
                    }
                );
            } else {
                alert('Please enter a valid 6-digit verification code.');
            }
        });
    }
    
    if(downloadCodesBtn) {
        downloadCodesBtn.addEventListener('click', function() {
            downloadRecoveryCodes();
        });
    }
}

function update2FAMethodDisplay(method) {
    // In a real app, this would show different setup instructions based on the method
    // For this demo, we'll just show/hide elements
    
    const qrCodeContainer = document.querySelector('.qr-code-container');
    
    if(method === 'app' && qrCodeContainer) {
        qrCodeContainer.style.display = 'block';
    } else if(qrCodeContainer) {
        qrCodeContainer.style.display = 'none';
    }
    
    console.log('Selected 2FA method:', method);
}

function disable2FA() {
    // Update 2FA status in the UI
    const twoFactorStatus = document.querySelector('.account-security-section .info-row:nth-child(2) .info-value .status-badge');
    if(twoFactorStatus) {
        twoFactorStatus.textContent = 'Disabled';
        twoFactorStatus.classList.remove('enabled');
        twoFactorStatus.classList.add('disabled');
    }
    
    // Update toggle in the modal
    const twoFactorToggle = document.getElementById('twoFactorToggle');
    if(twoFactorToggle) {
        twoFactorToggle.checked = false;
    }
    
    // Update status badge in modal
    const modalStatusBadge = document.querySelector('.status-indicator .status-badge');
    if(modalStatusBadge) {
        modalStatusBadge.textContent = 'Disabled';
        modalStatusBadge.classList.remove('enabled');
        modalStatusBadge.classList.add('disabled');
    }
    
    // Close the modal
    closeModal('manage2FAModal');
    
    // Show success notification
    showSuccessNotification(
        'Two-factor authentication has been disabled.',
        'Your account is now less secure. We recommend enabling 2FA for better protection.'
    );
    
    console.log('2FA disabled');
    
    // Add this action to the activity list
    addToActivityList('Disabled two-factor authentication');
}

function complete2FASetup() {
    // Get the selected method
    const selectedMethod = document.querySelector('input[name="twoFactorMethod"]:checked').value;
    
    // Update 2FA status in the UI (in case it was disabled)
    const twoFactorStatus = document.querySelector('.account-security-section .info-row:nth-child(2) .info-value .status-badge');
    if(twoFactorStatus) {
        twoFactorStatus.textContent = 'Enabled';
        twoFactorStatus.classList.remove('disabled');
        twoFactorStatus.classList.add('enabled');
    }
    
    // Update toggle in the modal
    const twoFactorToggle = document.getElementById('twoFactorToggle');
    if(twoFactorToggle) {
        twoFactorToggle.checked = true;
    }
    
    // Update status badge in modal
    const modalStatusBadge = document.querySelector('.status-indicator .status-badge');
    if(modalStatusBadge) {
        modalStatusBadge.textContent = 'Enabled';
        modalStatusBadge.classList.remove('disabled');
        modalStatusBadge.classList.add('enabled');
    }
    
    // Reset verification code field
    document.getElementById('verificationCode').value = '';
    
    // Close the modal
    closeModal('manage2FAModal');
    
    // Show success notification
    showSuccessNotification(
        'Two-factor authentication has been updated successfully.',
        `Your account is now secured with ${getMethodName(selectedMethod)} authentication.`
    );
    
    console.log('2FA setup completed for method:', selectedMethod);
    
    // Add this action to the activity list
    addToActivityList('Updated two-factor authentication settings');
}

function getMethodName(method) {
    switch(method) {
        case 'sms': return 'SMS';
        case 'app': return 'Authenticator App';
        case 'email': return 'Email';
        default: return method;
    }
}

function downloadRecoveryCodes() {
    // In a real app, this would generate a file with the recovery codes
    // For this demo, we'll just alert
    alert('In a real application, this would download a text file containing your recovery codes. Please keep these codes in a safe place.');
}

// ======= ACTIVITY LOG MANAGEMENT =======
function initActivityLogControls() {
    const applyFilterBtn = document.querySelector('.apply-filter-btn');
    const exportLogBtn = document.querySelector('.export-log-btn');
    const clearHistoryBtn = document.querySelector('.clear-history-btn');
    
    if(applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            filterActivityLog();
        });
    }
    
    if(exportLogBtn) {
        exportLogBtn.addEventListener('click', function() {
            exportActivityLog();
        });
    }
    
    if(clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', function() {
            showConfirmationDialog(
                'Are you sure you want to clear all activity history?',
                'This action cannot be undone and all activity records will be permanently deleted.',
                function() {
                    clearActivityHistory();
                }
            );
        });
    }
    
    // Set default date values
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    
    if(startDateInput && endDateInput) {
        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        
        startDateInput.valueAsDate = oneMonthAgo;
        endDateInput.valueAsDate = today;
    }
}

function filterActivityLog() {
    // Get filter values
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const activityType = document.getElementById('activityType').value;
    const deviceFilter = document.getElementById('deviceFilter').value;
    
    // In a real app, this would query the server with these filters
    // For this demo, we'll just log the filter values
    console.log('Activity log filters applied:', { startDate, endDate, activityType, deviceFilter });
    
    // Show feedback to user
    alert(`Filters applied! In a real application, this would show activities from ${startDate} to ${endDate}, filtered by ${activityType !== 'all' ? activityType : 'all activity types'} and ${deviceFilter !== 'all' ? deviceFilter : 'all devices'}.`);
}

function exportActivityLog() {
    // In a real app, this would generate and download a file with the activity log
    // For this demo, we'll just alert
    alert('In a real application, this would export your activity log as a CSV or PDF file that you can download.');
}

function clearActivityHistory() {
    // In a real app, this would send a request to clear history on the server
    // For this demo, we'll just clear the table
    
    // Get the table body
    const tableBody = document.querySelector('.activity-table tbody');
    
    // Keep only the most recent entry (today's login)
    if(tableBody) {
        const rows = tableBody.querySelectorAll('tr');
        for(let i = 1; i < rows.length; i++) {
            tableBody.removeChild(rows[i]);
        }
    }
    
    // Close the modal
    closeModal('activityLogModal');
    
    // Show success notification
    showSuccessNotification(
        'Your activity history has been cleared.',
        'All previous activity records have been removed from your account.'
    );
    
    console.log('Activity history cleared');
    
    // This action itself would normally be logged, but since we just cleared history...
    // In a real app, this would still be logged as the first entry in the new history
}

function addToActivityList(description) {
    // Get the activity list
    const activityList = document.querySelector('.activity-list ul');
    
    if(activityList) {
        // Create new list item
        const newActivity = document.createElement('li');
        
        // Get current time
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const timeString = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}, ${hours}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        
        // Create activity time span
        const timeSpan = document.createElement('span');
        timeSpan.className = 'activity-time';
        timeSpan.textContent = timeString;
        
        // Create activity description span
        const descSpan = document.createElement('span');
        descSpan.className = 'activity-description';
        descSpan.textContent = description;
        
        // Add spans to list item
        newActivity.appendChild(timeSpan);
        newActivity.appendChild(descSpan);
        
        // Insert at the top of the list
        if(activityList.firstChild) {
            activityList.insertBefore(newActivity, activityList.firstChild);
        } else {
            activityList.appendChild(newActivity);
        }
        
        // Remove the last item if there are more than 3
        if(activityList.children.length > 3) {
            activityList.removeChild(activityList.lastChild);
        }
        
        // Update last login info 
        // Note: In a real app, only login activities would update this
        if(description.includes('login')) {
            const lastLoginDisplay = document.querySelector('.activity-summary-section .info-row:first-child .info-value');
            if(lastLoginDisplay) {
                lastLoginDisplay.textContent = timeString;
            }
        }
    }
}

// ======= CONFIRMATION DIALOG =======
function initConfirmationDialog() {
    // Get confirmation dialog elements
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmWarning = document.getElementById('confirmWarning');
    const cancelConfirmBtn = document.getElementById('cancelConfirmBtn');
    const confirmActionBtn = document.getElementById('confirmActionBtn');
    const closeModalBtn = confirmationModal.querySelector('.close-modal');
    
    // Store callback function
    confirmationModal.confirmCallback = null;
    
    // Set up event listeners
    if(cancelConfirmBtn) {
        cancelConfirmBtn.addEventListener('click', function() {
            closeModal('confirmationModal');
        });
    }
    
    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeModal('confirmationModal');
        });
    }
    
    if(confirmActionBtn) {
        confirmActionBtn.addEventListener('click', function() {
            // Execute callback if exists
            if(typeof confirmationModal.confirmCallback === 'function') {
                confirmationModal.confirmCallback();
            }
            
            // Close the modal
            closeModal('confirmationModal');
        });
    }
    
    // Close on click outside
    confirmationModal.addEventListener('click', function(event) {
        if(event.target === confirmationModal) {
            closeModal('confirmationModal');
        }
    });
}

function showConfirmationDialog(message, warning, callback) {
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmWarning = document.getElementById('confirmWarning');
    
    if(confirmationModal && confirmMessage && confirmWarning) {
        // Set message and warning
        confirmMessage.textContent = message;
        confirmWarning.textContent = warning;
        
        // Store callback
        confirmationModal.confirmCallback = callback;
        
        // Show the modal
        openModal('confirmationModal');
    }
}

// ======= SUCCESS NOTIFICATION =======
function initSuccessNotification() {
    const successNotification = document.getElementById('successNotification');
    const dismissSuccessBtn = document.getElementById('dismissSuccessBtn');
    
    if(dismissSuccessBtn) {
        dismissSuccessBtn.addEventListener('click', function() {
            hideSuccessNotification();
        });
    }
}

function showSuccessNotification(message, nextSteps) {
    const successNotification = document.getElementById('successNotification');
    const successMessage = document.getElementById('successMessage');
    const nextStepsElement = document.getElementById('nextSteps');
    
    if(successNotification && successMessage && nextStepsElement) {
        // Set message and next steps
        successMessage.textContent = message;
        nextStepsElement.textContent = nextSteps;
        
        // Show the notification
        successNotification.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        setTimeout(function() {
            hideSuccessNotification();
        }, 5000);
    }
}

function hideSuccessNotification() {
    const successNotification = document.getElementById('successNotification');
    
    if(successNotification) {
        successNotification.style.display = 'none';
    }
}

// ======= DARK MODE TOGGLE =======
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if(darkModeToggle) {
        // Check if user preference exists in localStorage
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Apply dark mode if needed
        if(isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.querySelector('i').className = 'fa-solid fa-sun';
        }
        
        // Set up toggle event
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            const isDarkModeActive = document.body.classList.contains('dark-mode');
            
            // Update icon
            if(isDarkModeActive) {
                darkModeToggle.querySelector('i').className = 'fa-solid fa-sun';
            } else {
                darkModeToggle.querySelector('i').className = 'fa-solid fa-moon';
            }
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', isDarkModeActive);
        });
    }
}

// ======= UTILITY FUNCTIONS =======
function markInvalid(element, message) {
    element.classList.add('is-invalid');
    
    // Check if error message already exists
    let errorElement = element.nextElementSibling;
    if(!errorElement || !errorElement.classList.contains('error-message')) {
        // Create error message element
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        element.parentNode.insertBefore(errorElement, element.nextSibling);
    }
    
    errorElement.textContent = message;
}

function markValid(element) {
    element.classList.remove('is-invalid');
    
    // Remove error message if exists
    const errorElement = element.nextElementSibling;
    if(errorElement && errorElement.classList.contains('error-message')) {
        errorElement.parentNode.removeChild(errorElement);
    }
}