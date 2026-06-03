/**
 * CarPal Platform Administrator - Login Functionality
 * This JavaScript file handles all dynamic functionality for the login page
 * including email validation, form submissions, modal controls, and dark mode toggle.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const emailForm = document.getElementById('email-form');
    const emailSection = document.getElementById('email-section');
    const emailSentSection = document.getElementById('email-sent-section');
    const traditionalLoginSection = document.getElementById('traditional-login-section');
    const mfaSection = document.getElementById('mfa-section');
    const passwordForm = document.getElementById('password-form');
    const mfaForm = document.getElementById('mfa-form');
    const codeForm = document.getElementById('code-form');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const supportOptionsModal = document.getElementById('supportOptionsModal');
    const troubleshootTipsModal = document.getElementById('troubleshootTipsModal');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resendLink = document.getElementById('resend-link');
    const supportContact = document.getElementById('support-contact');
    const troubleshootTips = document.getElementById('troubleshoot-tips');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const mfaCancelButton = document.querySelector('.btn-cancel-mfa');
    
    // Initialize page
    initializePage();
    
    /**
     * Initialize the page with all necessary setups and event listeners
     */
    function initializePage() {
        setupDarkModePreference();
        setupEventListeners();
        
        // For demo purposes, show the traditional login section instead of email section
        // Comment this out if you want to show the default email validation flow
        emailSection.style.display = 'none';
        traditionalLoginSection.style.display = 'block';
    }
    
    /**
     * Setup all event listeners
     */
    function setupEventListeners() {
        // Email form submission
        emailForm.addEventListener('submit', handleEmailFormSubmit);
        
        // Traditional login form submission
        passwordForm.addEventListener('submit', handlePasswordFormSubmit);
        
        // MFA form submission
        mfaForm.addEventListener('submit', handleMFAFormSubmit);
        
        // Validation code form submission
        codeForm.addEventListener('submit', handleCodeFormSubmit);
        
        // Forgot password form submission
        forgotPasswordForm.addEventListener('submit', handleForgotPasswordFormSubmit);
        
        // Resend validation link
        resendLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleResendLink();
        });
        
        // Toggle password visibility
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', togglePasswordVisibility);
        });
        
        // Dark mode toggle
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        // Support contact
        supportContact.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(supportOptionsModal);
        });
        
        // Troubleshooting tips
        troubleshootTips.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(troubleshootTipsModal);
        });
        
        // Forgot password link
        document.querySelector('.forgot-password-link').addEventListener('click', function(e) {
            e.preventDefault();
            showModal(forgotPasswordModal);
        });
        
        // Close modals
        closeModalButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                hideModal(modal);
            });
        });
        
        // Cancel MFA verification
        if (mfaCancelButton) {
            mfaCancelButton.addEventListener('click', function() {
                mfaSection.style.display = 'none';
                traditionalLoginSection.style.display = 'block';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal')) {
                hideModal(e.target);
            }
        });
    }
    
    /**
     * Handle email form submission
     * @param {Event} e - The submit event
     */
    function handleEmailFormSubmit(e) {
        e.preventDefault();
        
        const workEmail = document.getElementById('workEmail');
        const emailValue = workEmail.value.trim();
        
        if (!validateEmail(emailValue)) {
            showError(workEmail, 'Please enter a valid email address');
            return;
        }
        
        // Show loading indicator
        showLoadingIndicator();
        
        // Simulate sending validation link (would be an API call in production)
        setTimeout(function() {
            hideLoadingIndicator();
            
            // Show email sent section
            emailSection.style.display = 'none';
            emailSentSection.style.display = 'block';
            
            // Clear form
            emailForm.reset();
        }, 1500);
    }
    
    /**
     * Handle traditional login form submission
     * @param {Event} e - The submit event
     */
    function handlePasswordFormSubmit(e) {
        e.preventDefault();
        
        const loginEmail = document.getElementById('loginEmail');
        const password = document.getElementById('password');
        const emailValue = loginEmail.value.trim();
        const passwordValue = password.value;
        
        // Validate form
        let isValid = true;
        
        if (!validateEmail(emailValue)) {
            showError(loginEmail, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(loginEmail);
        }
        
        if (!passwordValue) {
            showError(password, 'Please enter your password');
            isValid = false;
        } else {
            clearError(password);
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading indicator
        showLoadingIndicator();
        
        // Simulate login process (would be an API call in production)
        setTimeout(function() {
            hideLoadingIndicator();
            
            // For demo purposes: 50% chance to show MFA, 50% chance to login directly
            // In a real application, this would be determined by the server
            if (Math.random() > 0.5) {
                // Show MFA section
                traditionalLoginSection.style.display = 'none';
                mfaSection.style.display = 'block';
            } else {
                // Redirect to dashboard
                window.location.href = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\Administrator Dashboard\\dashboard.html';
            }
        }, 1500);
    }
    
    /**
     * Handle MFA form submission
     * @param {Event} e - The submit event
     */
    function handleMFAFormSubmit(e) {
        e.preventDefault();
        
        const mfaCode = document.getElementById('mfaCode');
        const codeValue = mfaCode.value.trim();
        
        if (!codeValue) {
            showError(mfaCode, 'Please enter the verification code');
            return;
        }
        
        // Show loading indicator
        showLoadingIndicator();
        
        // Simulate MFA validation (would be an API call in production)
        setTimeout(function() {
            hideLoadingIndicator();
            
            // Redirect to dashboard
            window.location.href = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\Administrator Dashboard\\dashboard.html';
        }, 1500);
    }
    
    /**
     * Handle validation code form submission
     * @param {Event} e - The submit event
     */
    function handleCodeFormSubmit(e) {
        e.preventDefault();
        
        const validationCode = document.getElementById('validationCode');
        const codeValue = validationCode.value.trim();
        
        if (!codeValue) {
            showError(validationCode, 'Please enter the validation code');
            return;
        }
        
        // Show loading indicator
        showLoadingIndicator();
        
        // Simulate code validation (would be an API call in production)
        setTimeout(function() {
            hideLoadingIndicator();
            
            // Redirect to dashboard
            window.location.href = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\Administrator Dashboard\\dashboard.html';
        }, 1500);
    }
    
    /**
     * Handle forgot password form submission
     * @param {Event} e - The submit event
     */
    function handleForgotPasswordFormSubmit(e) {
        e.preventDefault();
        
        const resetEmail = document.getElementById('resetEmail');
        const emailValue = resetEmail.value.trim();
        
        if (!validateEmail(emailValue)) {
            showError(resetEmail, 'Please enter a valid email address');
            return;
        }
        
        // Show loading indicator
        showLoadingIndicator();
        
        // Simulate sending reset link (would be an API call in production)
        setTimeout(function() {
            hideLoadingIndicator();
            
            // Show success message
            forgotPasswordForm.style.display = 'none';
            document.getElementById('reset-success').style.display = 'block';
            
            // Clear form
            forgotPasswordForm.reset();
            
            // Hide modal after delay
            setTimeout(function() {
                hideModal(forgotPasswordModal);
                
                // Reset modal for next use
                forgotPasswordForm.style.display = 'block';
                document.getElementById('reset-success').style.display = 'none';
            }, 3000);
        }, 1500);
    }
    
    /**
     * Handle resend validation link
     */
    function handleResendLink() {
        // Show loading indicator
        showLoadingIndicator();
        
        // Simulate resending link (would be an API call in production)
        setTimeout(function() {
            hideLoadingIndicator();
            
            // Show temporary success message
            const resendOption = document.querySelector('.resend-option');
            const originalContent = resendOption.innerHTML;
            
            resendOption.innerHTML = '<p class="success-text"><i class="fas fa-check-circle"></i> Validation link resent successfully!</p>';
            
            // Restore original content after delay
            setTimeout(function() {
                resendOption.innerHTML = originalContent;
                
                // Re-attach event listener
                document.getElementById('resend-link').addEventListener('click', function(e) {
                    e.preventDefault();
                    handleResendLink();
                });
            }, 3000);
        }, 1500);
    }
    
    /**
     * Toggle password visibility
     */
    function togglePasswordVisibility() {
        const passwordInput = this.previousElementSibling;
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    /**
     * Toggle dark mode
     */
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    }
    
    /**
     * Setup dark mode based on user preference
     */
    function setupDarkModePreference() {
        const darkMode = localStorage.getItem('darkMode');
        
        if (darkMode === 'enabled') {
            document.body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    /**
     * Show a modal
     * @param {HTMLElement} modal - The modal to show
     */
    function showModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    /**
     * Hide a modal
     * @param {HTMLElement} modal - The modal to hide
     */
    function hideModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    /**
     * Show loading indicator
     */
    function showLoadingIndicator() {
        loadingIndicator.style.display = 'flex';
    }
    
    /**
     * Hide loading indicator
     */
    function hideLoadingIndicator() {
        loadingIndicator.style.display = 'none';
    }
    
    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean} - Whether the email is valid
     */
    function validateEmail(email) {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Show error message for a field
     * @param {HTMLElement} field - The field with error
     * @param {string} message - Error message to display
     */
    function showError(field, message) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            field.classList.add('error');
        }
    }
    
    /**
     * Clear error message for a field
     * @param {HTMLElement} field - The field to clear error
     */
    function clearError(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            field.classList.remove('error');
        }
    }
    
    /**
     * Initialize form state based on URL parameters (if any)
     * Useful for when redirecting back after email validation
     */
    function initializeFormState() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (token) {
            // Token exists in URL, verify it
            showLoadingIndicator();
            
            // Simulate token verification (would be an API call in production)
            setTimeout(function() {
                hideLoadingIndicator();
                
                // Redirect to dashboard on success
                window.location.href = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\Administrator Dashboard\\dashboard.html';
            }, 1500);
        }
    }
    
    // Check URL parameters on page load
    initializeFormState();
});