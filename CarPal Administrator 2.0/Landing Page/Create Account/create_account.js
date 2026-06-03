document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('account-creation-form');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const supportLink = document.querySelector('.help-support-link');
    const supportOptionsPopup = document.getElementById('supportOptionsPopup');
    const closePopupBtn = document.querySelector('.close-popup');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Password Elements
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthIndicator = document.getElementById('strength-indicator');
    const strengthText = document.getElementById('strength-text');
    const passwordToggleBtns = document.querySelectorAll('.toggle-password');
    const passwordMatchStatus = document.getElementById('password-match-status');
    
    // Password Requirements Elements
    const lengthCheck = document.getElementById('length-check');
    const uppercaseCheck = document.getElementById('uppercase-check');
    const lowercaseCheck = document.getElementById('lowercase-check');
    const numberCheck = document.getElementById('number-check');
    const specialCheck = document.getElementById('special-check');
    
    // Security Questions
    const securityQuestion1 = document.getElementById('securityQuestion1');
    const securityQuestion2 = document.getElementById('securityQuestion2');
    
    // Email Validation
    const workEmailInput = document.getElementById('workEmail');
    const emailValidationStatus = document.getElementById('email-validation-status');
    
    // Legal Agreement Modal Elements
    const modalLinks = document.querySelectorAll('[data-modal]');
    const closeModalBtns = document.querySelectorAll('.close-modal, .btn-close-modal');
    
    // CAPTCHA Elements
    const captchaBox = document.getElementById('captcha-box');
    
    // Contact Support and Live Chat Links
    const contactSupportLink = document.getElementById('contactSupportLink');
    const liveChatLink = document.getElementById('liveChatLink');
    
    // Initialize the page
    init();
    
    function init() {
        // Initialize CAPTCHA
        generateCaptcha();
        
        // Load legal documents
        loadLegalDocuments();
        
        // Check for dark mode preference
        checkDarkMode();
        
        // Add event listeners
        addEventListeners();
    }
    
    function addEventListeners() {
        // Form submission
        form.addEventListener('submit', handleFormSubmission);
        
        // Password strength & validation
        passwordInput.addEventListener('input', checkPasswordStrength);
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);
        
        // Toggle password visibility
        passwordToggleBtns.forEach(btn => {
            btn.addEventListener('click', togglePasswordVisibility);
        });
        
        // Email validation
        workEmailInput.addEventListener('blur', validateEmail);
        
        // Security question validation
        securityQuestion1.addEventListener('change', () => validateSecurityQuestions(1));
        securityQuestion2.addEventListener('change', () => validateSecurityQuestions(2));
        
        // Support popup
        supportLink.addEventListener('click', toggleSupportPopup);
        closePopupBtn.addEventListener('click', toggleSupportPopup);
        
        // Modal events
        modalLinks.forEach(link => {
            link.addEventListener('click', openModal);
        });
        
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        // Dark mode toggle
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        // Support links
        contactSupportLink.addEventListener('click', openContactSupportForm);
        liveChatLink.addEventListener('click', openLiveChat);
        
        // Window click to close modals/popups
        window.addEventListener('click', (e) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (e.target === modal) {
                    closeModalById(modal.id);
                }
            });
            
            if (e.target === supportOptionsPopup) {
                toggleSupportPopup();
            }
        });
    }
    
    // Form Validation and Submission
    function handleFormSubmission(e) {
        e.preventDefault();
        
        // Reset all error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        // Validate form
        if (validateForm()) {
            // Show loading indicator
            loadingIndicator.style.display = 'flex';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Hide loading indicator
                loadingIndicator.style.display = 'none';
                
                // Redirect to admin review page or show success message
                showAdminReviewMessage();
            }, 2000);
        }
    }
    
    function validateForm() {
        let isValid = true;
        
        // Personal Info Validation
        isValid = validatePersonalInfo() && isValid;
        
        // Security Info Validation
        isValid = validateSecurityInfo() && isValid;
        
        // Legal Agreements Validation
        isValid = validateLegalAgreements() && isValid;
        
        // CAPTCHA Validation
        isValid = validateCaptcha() && isValid;
        
        return isValid;
    }
    
    function validatePersonalInfo() {
        let isValid = true;
        
        // First Name
        const firstName = document.getElementById('firstName');
        const firstNameError = document.getElementById('firstName-error');
        if (!firstName.value.trim()) {
            firstNameError.textContent = 'First name is required';
            firstName.classList.add('input-error');
            isValid = false;
        } else {
            firstName.classList.remove('input-error');
        }
        
        // Last Name
        const lastName = document.getElementById('lastName');
        const lastNameError = document.getElementById('lastName-error');
        if (!lastName.value.trim()) {
            lastNameError.textContent = 'Last name is required';
            lastName.classList.add('input-error');
            isValid = false;
        } else {
            lastName.classList.remove('input-error');
        }
        
        // Staff ID
        const staffId = document.getElementById('staffId');
        const staffIdError = document.getElementById('staffId-error');
        if (!staffId.value.trim()) {
            staffIdError.textContent = 'Staff ID is required';
            staffId.classList.add('input-error');
            isValid = false;
        } else {
            staffId.classList.remove('input-error');
        }
        
        // Work Email (already validated on blur)
        if (emailValidationStatus.classList.contains('invalid')) {
            isValid = false;
        }
        
        // Job Title
        const jobTitle = document.getElementById('jobTitle');
        const jobTitleError = document.getElementById('jobTitle-error');
        if (!jobTitle.value.trim()) {
            jobTitleError.textContent = 'Job title is required';
            jobTitle.classList.add('input-error');
            isValid = false;
        } else {
            jobTitle.classList.remove('input-error');
        }
        
        // Department
        const department = document.getElementById('department');
        const departmentError = document.getElementById('department-error');
        if (!department.value.trim()) {
            departmentError.textContent = 'Department is required';
            department.classList.add('input-error');
            isValid = false;
        } else {
            department.classList.remove('input-error');
        }
        
        return isValid;
    }
    
    function validateSecurityInfo() {
        let isValid = true;
        
        // Password
        const password = document.getElementById('password');
        const passwordError = document.getElementById('password-error');
        if (!password.value) {
            passwordError.textContent = 'Password is required';
            password.classList.add('input-error');
            isValid = false;
        } else if (getPasswordStrength(password.value) < 2) {
            passwordError.textContent = 'Password is too weak';
            password.classList.add('input-error');
            isValid = false;
        } else {
            password.classList.remove('input-error');
        }
        
        // Confirm Password
        const confirmPassword = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPassword-error');
        if (!confirmPassword.value) {
            confirmPasswordError.textContent = 'Confirm password is required';
            confirmPassword.classList.add('input-error');
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPassword.classList.add('input-error');
            isValid = false;
        } else {
            confirmPassword.classList.remove('input-error');
        }
        
        // Security Questions and Answers
        const securityQuestion1 = document.getElementById('securityQuestion1');
        const securityQuestion1Error = document.getElementById('securityQuestion1-error');
        const securityAnswer1 = document.getElementById('securityAnswer1');
        const securityAnswer1Error = document.getElementById('securityAnswer1-error');
        
        if (!securityQuestion1.value) {
            securityQuestion1Error.textContent = 'Security question is required';
            securityQuestion1.classList.add('input-error');
            isValid = false;
        } else {
            securityQuestion1.classList.remove('input-error');
        }
        
        if (!securityAnswer1.value.trim()) {
            securityAnswer1Error.textContent = 'Answer is required';
            securityAnswer1.classList.add('input-error');
            isValid = false;
        } else {
            securityAnswer1.classList.remove('input-error');
        }
        
        const securityQuestion2 = document.getElementById('securityQuestion2');
        const securityQuestion2Error = document.getElementById('securityQuestion2-error');
        const securityAnswer2 = document.getElementById('securityAnswer2');
        const securityAnswer2Error = document.getElementById('securityAnswer2-error');
        
        if (!securityQuestion2.value) {
            securityQuestion2Error.textContent = 'Security question is required';
            securityQuestion2.classList.add('input-error');
            isValid = false;
        } else if (securityQuestion1.value === securityQuestion2.value) {
            securityQuestion2Error.textContent = 'Please select a different question';
            securityQuestion2.classList.add('input-error');
            isValid = false;
        } else {
            securityQuestion2.classList.remove('input-error');
        }
        
        if (!securityAnswer2.value.trim()) {
            securityAnswer2Error.textContent = 'Answer is required';
            securityAnswer2.classList.add('input-error');
            isValid = false;
        } else {
            securityAnswer2.classList.remove('input-error');
        }
        
        return isValid;
    }
    
    function validateLegalAgreements() {
        let isValid = true;
        
        // Terms Agreement
        const termsAgreement = document.getElementById('termsAgreement');
        const termsAgreementError = document.getElementById('termsAgreement-error');
        if (!termsAgreement.checked) {
            termsAgreementError.textContent = 'You must agree to the Terms & Conditions';
            isValid = false;
        } else {
            termsAgreementError.textContent = '';
        }
        
        // Privacy Agreement
        const privacyAgreement = document.getElementById('privacyAgreement');
        const privacyAgreementError = document.getElementById('privacyAgreement-error');
        if (!privacyAgreement.checked) {
            privacyAgreementError.textContent = 'You must agree to the Privacy Policy';
            isValid = false;
        } else {
            privacyAgreementError.textContent = '';
        }
        
        // Data Policy Agreement
        const dataPolicyAgreement = document.getElementById('dataPolicyAgreement');
        const dataPolicyAgreementError = document.getElementById('dataPolicyAgreement-error');
        if (!dataPolicyAgreement.checked) {
            dataPolicyAgreementError.textContent = 'You must agree to the Data Policy';
            isValid = false;
        } else {
            dataPolicyAgreementError.textContent = '';
        }
        
        return isValid;
    }
    
    // Password Strength and Validation
    function checkPasswordStrength() {
        const password = passwordInput.value;
        const strength = getPasswordStrength(password);
        
        // Update strength bar
        strengthIndicator.style.width = `${(strength / 4) * 100}%`;
        
        // Update strength text and color
        if (strength === 0) {
            strengthText.textContent = 'Password strength';
            strengthIndicator.style.backgroundColor = '#ccc';
        } else if (strength === 1) {
            strengthText.textContent = 'Weak';
            strengthIndicator.style.backgroundColor = '#ff4d4d';
        } else if (strength === 2) {
            strengthText.textContent = 'Medium';
            strengthIndicator.style.backgroundColor = '#ffa64d';
        } else if (strength === 3) {
            strengthText.textContent = 'Strong';
            strengthIndicator.style.backgroundColor = '#2ecc71';
        } else {
            strengthText.textContent = 'Very Strong';
            strengthIndicator.style.backgroundColor = '#27ae60';
        }
        
        // Update requirement checks
        lengthCheck.classList.toggle('met', password.length >= 8);
        uppercaseCheck.classList.toggle('met', /[A-Z]/.test(password));
        lowercaseCheck.classList.toggle('met', /[a-z]/.test(password));
        numberCheck.classList.toggle('met', /[0-9]/.test(password));
        specialCheck.classList.toggle('met', /[^A-Za-z0-9]/.test(password));
        
        // Check match with confirm password
        checkPasswordMatch();
    }
    
    function getPasswordStrength(password) {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        
        // Complexity checks
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
        
        // Add strength for each complexity criteria met
        if (hasUppercase && hasLowercase) strength++;
        if (hasNumbers) strength++;
        if (hasSpecialChars) strength++;
        
        return strength;
    }
    
    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (!confirmPassword) {
            passwordMatchStatus.textContent = '';
            passwordMatchStatus.className = 'match-status';
            return;
        }
        
        if (password === confirmPassword) {
            passwordMatchStatus.textContent = 'Passwords match';
            passwordMatchStatus.className = 'match-status valid';
        } else {
            passwordMatchStatus.textContent = 'Passwords do not match';
            passwordMatchStatus.className = 'match-status invalid';
        }
    }
    
    function togglePasswordVisibility(e) {
        const button = e.currentTarget;
        const inputField = button.parentElement.querySelector('input');
        const icon = button.querySelector('i');
        
        if (inputField.type === 'password') {
            inputField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            inputField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
    
    // Email Validation
    function validateEmail() {
        const email = workEmailInput.value.trim();
        const emailError = document.getElementById('workEmail-error');
        
        if (!email) {
            emailValidationStatus.textContent = '';
            emailValidationStatus.className = 'email-validation-status';
            emailError.textContent = 'Work email is required';
            workEmailInput.classList.add('input-error');
            return;
        }
        
        const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isCompanyEmail = email.endsWith('@citruslabs.co.ke') || email.endsWith('@citrus-labs.com');
        
        if (!isValidFormat) {
            emailValidationStatus.textContent = 'Invalid email format';
            emailValidationStatus.className = 'email-validation-status invalid';
            emailError.textContent = '';
            workEmailInput.classList.add('input-error');
        } else if (!isCompanyEmail) {
            emailValidationStatus.textContent = 'Must be a Citrus Labs email';
            emailValidationStatus.className = 'email-validation-status invalid';
            emailError.textContent = '';
            workEmailInput.classList.add('input-error');
        } else {
            emailValidationStatus.textContent = 'Valid company email';
            emailValidationStatus.className = 'email-validation-status valid';
            emailError.textContent = '';
            workEmailInput.classList.remove('input-error');
        }
    }
    
    // Security Questions Validation
    function validateSecurityQuestions(questionNum) {
        if (questionNum === 1 || questionNum === undefined) {
            const question1 = document.getElementById('securityQuestion1');
            const error1 = document.getElementById('securityQuestion1-error');
            
            if (!question1.value) {
                error1.textContent = 'Please select a security question';
                question1.classList.add('input-error');
            } else {
                error1.textContent = '';
                question1.classList.remove('input-error');
            }
        }
        
        if (questionNum === 2 || questionNum === undefined) {
            const question1 = document.getElementById('securityQuestion1');
            const question2 = document.getElementById('securityQuestion2');
            const error2 = document.getElementById('securityQuestion2-error');
            
            if (!question2.value) {
                error2.textContent = 'Please select a security question';
                question2.classList.add('input-error');
            } else if (question1.value && question1.value === question2.value) {
                error2.textContent = 'Please select a different question';
                question2.classList.add('input-error');
            } else {
                error2.textContent = '';
                question2.classList.remove('input-error');
            }
        }
    }
    
    // CAPTCHA Generation and Validation
    function generateCaptcha() {
        const captchaText = generateRandomCaptchaText(6);
        
        // Store CAPTCHA text for later validation
        captchaBox.dataset.captchaText = captchaText;
        
        // Create CAPTCHA content
        captchaBox.innerHTML = `
            <div class="captcha-text">${generateDistortedCaptcha(captchaText)}</div>
            <button type="button" class="refresh-captcha" id="refreshCaptcha">
                <i class="fas fa-sync-alt"></i>
            </button>
            <input type="text" id="captchaInput" placeholder="Enter the text above" required>
        `;
        
        // Add event listener to refresh button
        document.getElementById('refreshCaptcha').addEventListener('click', generateCaptcha);
    }
    
    function generateRandomCaptchaText(length) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    function generateDistortedCaptcha(text) {
        let html = '';
        for (let i = 0; i < text.length; i++) {
            const rotation = Math.random() * 20 - 10;
            const fontSize = Math.floor(Math.random() * 10) + 20;
            html += `<span style="display:inline-block; transform:rotate(${rotation}deg); font-size:${fontSize}px;">${text[i]}</span>`;
        }
        return html;
    }
    
    function validateCaptcha() {
        const captchaInput = document.getElementById('captchaInput');
        const captchaError = document.getElementById('captcha-error');
        
        if (!captchaInput || !captchaInput.value) {
            captchaError.textContent = 'Please complete the CAPTCHA verification';
            return false;
        }
        
        const enteredText = captchaInput.value.trim();
        const originalText = captchaBox.dataset.captchaText;
        
        if (enteredText.toLowerCase() !== originalText.toLowerCase()) {
            captchaError.textContent = 'CAPTCHA verification failed. Please try again.';
            generateCaptcha(); // Regenerate CAPTCHA
            return false;
        }
        
        captchaError.textContent = '';
        return true;
    }
    
    // Modal Handling
    function openModal(e) {
        e.preventDefault();
        const modalId = e.currentTarget.dataset.modal;
        document.getElementById(modalId).style.display = 'block';
    }
    
    function closeModal(e) {
        const modalId = e.currentTarget.dataset.modal;
        closeModalById(modalId);
    }
    
    function closeModalById(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
    
    // Support Popup Handling
    function toggleSupportPopup(e) {
        if (e) e.preventDefault();
        supportOptionsPopup.style.display = supportOptionsPopup.style.display === 'block' ? 'none' : 'block';
    }
    
    // Load Legal Documents
    function loadLegalDocuments() {
        // Simulate loading terms and conditions
        setTimeout(() => {
            document.getElementById('terms-content').innerHTML = `
                <h3>1. Introduction</h3>
                <p>These Terms and Conditions govern your use of CarPal by Citrus Labs. By using CarPal, you agree to these terms in full.</p>
                
                <h3>2. Definitions</h3>
                <p>"CarPal" means the car pooling platform provided by Citrus Labs.</p>
                <p>"User" means any person who uses CarPal in any capacity.</p>
                
                <h3>3. Account Registration</h3>
                <p>To use CarPal as an administrator, you must create an account. You agree to provide accurate information and keep your account credentials secure.</p>
                
                <h3>4. Responsibilities</h3>
                <p>As an administrator, you are responsible for managing user data, resolving conflicts, and ensuring compliance with all applicable policies.</p>
                
                <h3>5. Termination</h3>
                <p>Citrus Labs reserves the right to terminate or suspend accounts at its discretion.</p>
                
                <h3>6. Changes to Terms</h3>
                <p>Citrus Labs may modify these terms at any time. Continued use of CarPal after changes constitutes acceptance of the new terms.</p>
                
                <h3>7. Governing Law</h3>
                <p>These terms shall be governed by and construed in accordance with the laws of Kenya.</p>
            `;
        }, 500);
        
        // Simulate loading privacy policy
        setTimeout(() => {
            document.getElementById('privacy-content').innerHTML = `
                <h3>1. Information Collection</h3>
                <p>Citrus Labs collects personal information including name, email, and employment details for account management and platform functionality.</p>
                
                <h3>2. Use of Information</h3>
                <p>We use collected information to provide and improve CarPal services, communicate with users, and ensure security.</p>
                
                <h3>3. Information Sharing</h3>
                <p>Citrus Labs does not sell personal information. We may share information with third-party service providers who assist in platform operations.</p>
                
                <h3>4. Data Security</h3>
                <p>We implement reasonable security measures to protect personal information from unauthorized access or disclosure.</p>
                
                <h3>5. User Rights</h3>
                <p>Users have the right to access, correct, or delete their personal information by contacting Citrus Labs support.</p>
                
                <h3>6. Cookies and Tracking</h3>
                <p>CarPal uses cookies and similar technologies to enhance user experience and collect usage information.</p>
                
                <h3>7. Changes to Privacy Policy</h3>
                <p>Citrus Labs may update this privacy policy. Users will be notified of significant changes.</p>
            `;
        }, 600);
        
        // Simulate loading data policy
        setTimeout(() => {
            document.getElementById('data-policy-content').innerHTML = `
                <h3>1. Data Collection Scope</h3>
                <p>CarPal collects and processes data necessary for the operation of a carpooling platform, including user profiles, vehicle information, trip details, and usage statistics.</p>
                
                <h3>2. Data Storage</h3>
                <p>All data is stored on secure servers and retained only for the period necessary to fulfill the purposes for which it was collected.</p>
                
                <h3>3. Administrative Access</h3>
                <p>Administrator accounts have privileged access to user data. This access is granted solely for platform management purposes and subject to audit.</p>
                
                <h3>4. Data Export and Deletion</h3>
                <p>Platform administrators can export or delete user data upon valid request in compliance with applicable laws.</p>
                
                <h3>5. Security Measures</h3>
                <p>Citrus Labs implements encryption, access controls, and regular security assessments to protect data integrity.</p>
                
                <h3>6. Breach Notification</h3>
                <p>In the event of a data breach, Citrus Labs will notify affected users and authorities as required by law.</p>
                
                <h3>7. Compliance</h3>
                <p>CarPal's data handling practices comply with the Data Protection Act of Kenya and other applicable regulations.</p>
            `;
        }, 700);
    }
    
    // Dark Mode Handling
    function checkDarkMode() {
        const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
        if (darkModeEnabled) {
            document.body.classList.add('dark-mode');
            updateDarkModeIcon(true);
        }
    }
    
    function toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        updateDarkModeIcon(isDarkMode);
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    }
    
    function updateDarkModeIcon(isDarkMode) {
        const icon = darkModeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Support Links Functions
    function openContactSupportForm(e) {
        e.preventDefault();
        // Simulate opening contact form in a new window/tab
        window.open('contact_support.html', '_blank');
        toggleSupportPopup();
    }
    
    function openLiveChat(e) {
        e.preventDefault();
        // Simulate opening live chat
        alert('Live chat feature would open here.');
        toggleSupportPopup();
    }
    
    // Admin Review Message
    function showAdminReviewMessage() {
        // Create a message container
        const messageContainer = document.createElement('div');
        messageContainer.className = 'admin-review-message';
        
        // Set message content
        messageContainer.innerHTML = `
            <div class="message-icon">
                <i class="fas fa-user-clock"></i>
            </div>
            <h2>Account Pending Approval</h2>
            <p>Your administrator account request has been submitted and is awaiting review.</p>
            <p>You will receive an email notification when your account has been approved or rejected.</p>
            <div class="message-actions">
                <button id="backToLoginBtn" class="btn-login">Back to Login</button>
            </div>
        `;
        
        // Replace form with message
        const formContainer = document.querySelector('.create-account-container');
        formContainer.innerHTML = '';
        formContainer.appendChild(messageContainer);
        
        // Add event listener to login button
        document.getElementById('backToLoginBtn').addEventListener('click', () => {
            window.location.href = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\Landing Page\\Log In\\log_in.html';
        });
        
        // Simulate sending email notification
        console.log('Email notification sent to administrator for account review');
    }
});