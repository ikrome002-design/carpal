document.addEventListener('DOMContentLoaded', function() {
    // Data Policy, Privacy Policy, and Terms & Conditions content
    const policyContent = {
        dataPolicy: `
            <h2>CarPal Auto Repair Shop Account – Data Policy</h2>
            <p><strong>Effective Date:</strong> January 11th, 2025<br>
            <strong>Last Updated:</strong> March 21st, 2025</p>
            
            <p>At CarPal, we prioritize the security and privacy of your data while ensuring compliance with Kenya's <strong>Data Protection Act, 2019</strong> and international data privacy standards. This Data Policy outlines how we collect, use, and protect your information as an Auto Repair Shop account holder.</p>
            
            <p>For inquiries, contact us at:<br>
            📧 <strong>Email:</strong> legal@citruslabs.co.ke<br>
            📬 <strong>Mailing Address:</strong> P.O. Box 23983 - 00100<br>
            📞 <strong>Phone:</strong> +254 112 400 000</p>
            
            <h3>1. Introduction</h3>
            <p>CarPal is a digital platform designed to streamline auto repair shop operations. This policy applies to all data collected from business accounts, vehicle owners, and transactions conducted through the platform.</p>
            
            <p><strong>Key Definitions:</strong></p>
            <ul>
                <li><strong>Personal Data:</strong> Any information relating to an identifiable individual.</li>
                <li><strong>Business Account Data:</strong> Information related to the repair shop and its staff.</li>
                <li><strong>Service Data:</strong> Information collected during vehicle check-ins, service history, and invoices.</li>
            </ul>
            
            <h3>2. Data Collection</h3>
            <p>We collect the following types of data:</p>
            
            <h4>Vehicle Data</h4>
            <ul>
                <li>Basic vehicle information (make, model, year, plate number).</li>
                <li>Service history and past repairs.</li>
                <li>Assessment details, including photos of vehicle condition.</li>
            </ul>
            
            <h4>Customer Data</h4>
            <ul>
                <li>Personal details (name, ID number).</li>
                <li>Contact details (email, phone number).</li>
                <li>Communication preferences for service updates.</li>
            </ul>
            
            <h4>Payment Data</h4>
            <ul>
                <li>M-Pesa transaction details for invoice processing.</li>
                <li>Invoice and payment records.</li>
            </ul>
            
            <h4>Business Account Data</h4>
            <ul>
                <li>Business registration details and tax information.</li>
                <li>Staff access logs and audit records.</li>
            </ul>
            
            <h3>3. How We Use Your Data</h3>
            <p>Your data is used strictly for operational purposes, including:</p>
            
            <h4>Service Provision</h4>
            <ul>
                <li>Vehicle check-in and check-out processes.</li>
                <li>Generating invoices and tracking payments.</li>
                <li>Repair documentation and customer approvals.</li>
            </ul>
            
            <h4>Analytics & Personalization</h4>
            <ul>
                <li>Enhancing service efficiency and user experience.</li>
                <li>Generating business performance reports.</li>
            </ul>
            
            <h4>Automated Communications</h4>
            <ul>
                <li>Sending repair updates via SMS and email.</li>
                <li>Providing notifications on invoices and payments.</li>
            </ul>
            
            <h4>Third-Party Data Sharing</h4>
            <p>We may share limited data with:</p>
            <ul>
                <li><strong>Insurance companies</strong> for claims processing.</li>
                <li><strong>Service providers</strong> (e.g., towing services) when necessary.</li>
                <li><strong>Legal authorities</strong> when required by law.</li>
            </ul>
            
            <h3>4. Data Security</h3>
            <p>We implement stringent security measures, including:</p>
            
            <h4>Access Controls</h4>
            <ul>
                <li>Role-based access restrictions.</li>
                <li>Multi-factor authentication for business accounts.</li>
                <li>Continuous activity monitoring to detect unauthorized access.</li>
            </ul>
            
            <h4>Storage & Encryption</h4>
            <ul>
                <li>All data is stored in secure, encrypted databases.</li>
                <li>Sensitive financial and personal information is encrypted end-to-end.</li>
            </ul>
            
            <h4>Retention & Deletion Policy</h4>
            <ul>
                <li><strong>Active accounts:</strong> Data is retained for service continuity.</li>
                <li><strong>Inactive accounts:</strong> Data is archived after 12 months of inactivity.</li>
                <li><strong>Deletion requests:</strong> Business accounts can request permanent data removal.</li>
            </ul>
            
            <h3>5. User Rights</h3>
            <p>As per the <strong>Kenya Data Protection Act, 2019</strong>, you have the right to:</p>
            
            <ul>
                <li><strong>Access your data:</strong> Request a copy of the data we hold.</li>
                <li><strong>Rectify inaccuracies:</strong> Update or correct incorrect information.</li>
                <li><strong>Request deletion:</strong> Have your data erased under lawful conditions.</li>
                <li><strong>Restrict processing:</strong> Limit how your data is used.</li>
                <li><strong>Data portability:</strong> Request a structured format of your data for transfer.</li>
            </ul>
            
            <p>Requests are processed within <strong>30 days</strong> upon verification of identity.</p>
            
            <h3>6. Compliance & Legal Framework</h3>
            <p>CarPal adheres to:</p>
            <ul>
                <li><strong>Kenya's Data Protection Act, 2019</strong> for lawful data handling.</li>
                <li><strong>International data security standards</strong> (ISO 27001).</li>
                <li><strong>Regular audits</strong> to ensure compliance and data protection best practices.</li>
            </ul>
            
            <h3>7. Contact & Complaints</h3>
            <p>For data privacy concerns or complaints:</p>
            <ul>
                <li>Contact our <strong>Data Protection Officer (DPO)</strong> at <strong>legal@citruslabs.co.ke</strong>.</li>
                <li>File a complaint with Kenya's <strong>Office of the Data Protection Commissioner (ODPC)</strong> if unsatisfied with our response.</li>
            </ul>
            
            <p>By using CarPal, you acknowledge that you have read and understood this Data Policy. We are committed to protecting your privacy while ensuring seamless business operations for auto repair professionals.</p>
            
            <p>🔒 <strong>Your Data. Your Control. Your Security.</strong></p>
        `,
        privacyPolicy: `
            <h2>CarPal Auto Repair Shop Privacy Policy</h2>
            <p><strong>Effective Date:</strong> January 11th, 2025<br>
            <strong>Last Updated:</strong> March 21st, 2025</p>
            
            <p><strong>Contact Information:</strong><br>
            <strong>Email:</strong> legal@citruslabs.co.ke<br>
            <strong>Mailing Address:</strong> P.O. Box 23983 - 00100<br>
            <strong>Phone:</strong> +254 112 400 000</p>
            
            <h3>1. Introduction</h3>
            
            <h4>1.1 Who We Are</h4>
            <p>CarPal is a digital platform by Citrus Labs that facilitates auto repair shop management by connecting businesses with customers and streamlining service operations.</p>
            
            <h4>1.2 Scope of Policy</h4>
            <p>This Privacy Policy applies to all users of the CarPal Auto Repair Shop account and explains how we collect, use, share, and protect personal information.</p>
            
            <h4>1.3 Consent to Policy</h4>
            <p>By using CarPal, you consent to the collection, processing, and sharing of your personal data as outlined in this policy.</p>
            
            <h4>1.4 Key Terms</h4>
            <ul>
                <li>"We," "Us," "Our" refer to Citrus Labs and CarPal.</li>
                <li>"You," "Your" refer to Auto Repair Shop account users.</li>
                <li>"Personal Data" refers to any identifiable information related to an individual or business.</li>
            </ul>
            
            <h3>2. Information We Collect</h3>
            
            <h4>2.1 Auto Repair Shop Information</h4>
            <ul>
                <li>Account details (business name, registration number, and location).</li>
                <li>Staff information (employee names, roles, and access permissions).</li>
                <li>Business contact details (phone number, email, and mailing address).</li>
            </ul>
            
            <h4>2.2 Customer Information</h4>
            <ul>
                <li>Personal identifiers (customer names and ID numbers).</li>
                <li>Contact information (phone numbers, email addresses).</li>
                <li>Communication preferences.</li>
            </ul>
            
            <h4>2.3 Vehicle Information</h4>
            <ul>
                <li>Vehicle details (make, model, registration number).</li>
                <li>Service records and repair history.</li>
                <li>Vehicle photos and assessment reports.</li>
            </ul>
            
            <h4>2.4 Payment Information</h4>
            <ul>
                <li>M-Pesa details for payment verification.</li>
                <li>Transaction records (dates, amounts, reference numbers).</li>
                <li>Invoice data (billing details and charges).</li>
            </ul>
            
            <h4>2.5 Automatically Collected Information</h4>
            <ul>
                <li>Device information (IP address, browser type).</li>
                <li>Log data (time and duration of platform usage).</li>
                <li>Usage data (interactions within the platform).</li>
                <li>Cookies and similar technologies to enhance user experience.</li>
            </ul>
            
            <h3>3. How We Use Information</h3>
            
            <h4>3.1 Providing & Improving Services</h4>
            <ul>
                <li>Managing auto repair shop accounts.</li>
                <li>Facilitating vehicle check-ins, service tracking, and invoicing.</li>
                <li>Enhancing platform functionality based on user activity.</li>
            </ul>
            
            <h4>3.2 Communications & Updates</h4>
            <ul>
                <li>Sending appointment confirmations, service reminders, and promotions.</li>
                <li>Providing customer support and responding to inquiries.</li>
                <li>Sending policy updates and notifications.</li>
            </ul>
            
            <h4>3.3 Analytics & Reporting</h4>
            <ul>
                <li>Monitoring business performance.</li>
                <li>Generating reports for auto repair shop management.</li>
                <li>Improving service offerings based on usage trends.</li>
            </ul>
            
            <h4>3.4 Legal Obligations</h4>
            <ul>
                <li>Complying with data protection regulations.</li>
                <li>Responding to legal requests and government inquiries.</li>
            </ul>
            
            <h3>4. Information Sharing</h3>
            
            <h4>4.1 Service Providers</h4>
            <p>We may share data with trusted third-party service providers that help us operate CarPal.</p>
            
            <h4>4.2 Insurance Companies</h4>
            <p>Vehicle service records may be shared with insurance providers for claim processing.</p>
            
            <h4>4.3 Legal Requirements</h4>
            <p>We may disclose data when required by law or in response to legal proceedings.</p>
            
            <h4>4.4 Business Transfers</h4>
            <p>In the event of a merger or acquisition, data may be transferred as part of the business assets.</p>
            
            <h4>4.5 With Consent</h4>
            <p>We will request explicit consent before sharing personal information beyond these cases.</p>
            
            <h3>5. Data Security</h3>
            
            <h4>5.1 Security Measures</h4>
            <ul>
                <li>Use of encryption to protect sensitive data.</li>
                <li>Role-based access control for staff accounts.</li>
                <li>Regular security audits and system updates.</li>
            </ul>
            
            <h4>5.2 Data Storage</h4>
            <ul>
                <li>Secure servers with restricted access.</li>
                <li>Cloud-based backups for data integrity.</li>
            </ul>
            
            <h4>5.3 Data Retention</h4>
            <ul>
                <li>Active account data is stored indefinitely.</li>
                <li>Inactive account data is retained for five years before deletion.</li>
            </ul>
            
            <h4>5.4 Breach Notification</h4>
            <p>In case of a data breach, affected users will be notified promptly in compliance with legal obligations.</p>
            
            <h3>6. Your Choices & Rights</h3>
            
            <h4>6.1 Accessing Your Information</h4>
            <p>You may request a copy of the data we hold about you.</p>
            
            <h4>6.2 Updating Your Information</h4>
            <p>You can update your details via account settings or customer support.</p>
            
            <h4>6.3 Deleting Your Information</h4>
            <p>You may request data deletion, subject to legal and business requirements.</p>
            
            <h4>6.4 Opting Out of Communications</h4>
            <p>You can unsubscribe from marketing emails and SMS notifications.</p>
            
            <h4>6.5 Filing Complaints</h4>
            <p>You may lodge complaints with our Privacy Officer or the Office of the Data Protection Commissioner.</p>
            
            <h3>7. Policy Updates</h3>
            
            <h4>7.1 Change Process</h4>
            <p>We may update this policy periodically. Significant changes will be communicated in advance.</p>
            
            <h4>7.2 Notification of Changes</h4>
            <p>Users will be notified via email or platform notifications.</p>
            
            <h4>7.3 Prior Versions</h4>
            <p>Archived versions of past policies will be available upon request.</p>
            
            <h3>8. Contact Us</h3>
            <p>For any questions or concerns regarding this policy, you can reach us via:</p>
            
            <ul>
                <li><strong>Support Email:</strong> legal@citruslabs.co.ke</li>
                <li><strong>Phone Support:</strong> +254 112 400 000</li>
                <li><strong>Privacy Officer:</strong> Citrus Labs Legal Team</li>
                <li><strong>Physical Address:</strong> P.O. Box 23983 - 00100, Nairobi, Kenya</li>
            </ul>
            
            <p>By using CarPal, you acknowledge that you have read and understood this Privacy Policy.</p>
        `,
        termsConditions: `
            <h2>TERMS AND CONDITIONS</h2>
            <p><strong>Effective Date:</strong> January 11th, 2025<br>
            <strong>Last Updated:</strong> March 21st, 2025</p>
            
            <p><strong>Contact Information:</strong><br>
            <strong>Email:</strong> legal@citruslabs.co.ke<br>
            <strong>Mailing Address:</strong> P.O. Box 23983 - 00100<br>
            <strong>Phone:</strong> +254 112 400 000</p>
            
            <h3>1. INTRODUCTION</h3>
            
            <h4>1.1 Acceptance of Terms</h4>
            <p>By accessing and using CarPal's Auto Repair Shop account, you agree to be bound by these Terms and Conditions. If you do not agree, you must discontinue use immediately.</p>
            
            <h4>1.2 Purpose of Service</h4>
            <p>CarPal provides a digital platform for auto repair shops to manage customer interactions, process transactions, and streamline service offerings.</p>
            
            <h4>1.3 Effective Date</h4>
            <p>These Terms are effective from January 11th, 2025, and may be updated as needed.</p>
            
            <h3>2. DEFINITIONS</h3>
            
            <h4>2.1 CarPal Platform</h4>
            <p>CarPal is an online platform that connects auto repair shops with customers, facilitating service transactions.</p>
            
            <h4>2.2 User Types</h4>
            <ul>
                <li><strong>Auto Repair Shop Account Holder:</strong> Businesses registered on CarPal.</li>
                <li><strong>Customer:</strong> Individuals using CarPal to access auto repair services.</li>
            </ul>
            
            <h4>2.3 Service Definitions</h4>
            <p>Includes listing services, customer management, invoicing, and payment processing.</p>
            
            <h3>3. ACCOUNT TERMS</h3>
            
            <h4>3.1 Registration Requirements</h4>
            <p>Businesses must provide accurate details, including valid business registration and contact information.</p>
            
            <h4>3.2 User Roles & Permissions</h4>
            <p>Only authorized personnel should access and manage business accounts.</p>
            
            <h4>3.3 Account Security</h4>
            <p>Account holders are responsible for maintaining the confidentiality of login credentials.</p>
            
            <h4>3.4 Password Requirements</h4>
            <p>Passwords must be secure and updated periodically.</p>
            
            <h4>3.5 Two-Factor Authentication</h4>
            <p>Users may be required to enable 2FA for enhanced security.</p>
            
            <h3>4. SERVICE TERMS</h3>
            
            <h4>4.1 Scope of Services</h4>
            <p>CarPal facilitates bookings, payments, and service management for auto repair businesses.</p>
            
            <h4>4.2 Service Availability</h4>
            <p>CarPal aims for maximum uptime but does not guarantee uninterrupted service.</p>
            
            <h4>4.3 Service Modifications</h4>
            <p>CarPal may update or modify services at its discretion.</p>
            
            <h4>4.4 Maintenance Policy</h4>
            <p>Scheduled maintenance may lead to temporary service interruptions.</p>
            
            <h3>5. BILLING & PAYMENTS</h3>
            
            <h4>5.1 Fee Structure</h4>
            <p>CarPal charges service fees based on transaction value.</p>
            
            <h4>5.2 Service Charge Tiers</h4>
            <ul>
                <li><strong>KES 10-24,999:</strong> 10% fee</li>
                <li><strong>KES 25,000-49,999:</strong> KES 2,500</li>
                <li><strong>KES 50,000-99,999:</strong> KES 5,000</li>
                <li><strong>KES 100,000+:</strong> KES 15,000</li>
            </ul>
            
            <h4>5.3 Payment Terms</h4>
            <p>Payments must be completed within agreed periods to avoid penalties.</p>
            
            <h4>5.4 M-Pesa Integration</h4>
            <p>Payments are processed through M-Pesa, with necessary verification measures.</p>
            
            <h4>5.5 Refund Policy</h4>
            <p>Refunds are subject to CarPal's discretion and applicable policies.</p>
            
            <h4>5.6 Late Payment Consequences</h4>
            <p>Delayed payments may result in:</p>
            <ul>
                <li>Service suspension</li>
                <li>Late fees</li>
                <li>Restricted access</li>
                <li>Legal action</li>
            </ul>
            
            <h3>6. USER RESPONSIBILITIES</h3>
            
            <h4>6.1 Providing Accurate Information</h4>
            <p>Users must ensure that all provided data is accurate and up to date.</p>
            
            <h4>6.2 Customer Data Handling</h4>
            <p>Businesses are responsible for securing customer data in compliance with data protection laws.</p>
            
            <h4>6.3 Prohibited Uses</h4>
            <p>Users may not engage in fraudulent, illegal, or abusive activities on the platform.</p>
            
            <h4>6.4 Data Backup Responsibility</h4>
            <p>CarPal does not guarantee data recovery; users should maintain backups.</p>
            
            <h4>6.5 Compliance With Laws</h4>
            <p>Users must adhere to all applicable laws governing business operations.</p>
            
            <h3>7. LIMITATIONS & LIABILITIES</h3>
            
            <h4>7.1 Warranty Disclaimer</h4>
            <p>CarPal is provided "as-is" without warranties of any kind.</p>
            
            <h4>7.2 Liability Limitations</h4>
            <p>CarPal is not liable for business losses, data breaches, or service interruptions.</p>
            
            <h4>7.3 Service Interruptions</h4>
            <p>CarPal is not responsible for temporary disruptions due to maintenance or technical issues.</p>
            
            <h4>7.4 Third-Party Services</h4>
            <p>Users interacting with third-party services through CarPal do so at their own risk.</p>
            
            <h3>8. INTELLECTUAL PROPERTY</h3>
            
            <h4>8.1 Ownership of Platform</h4>
            <p>CarPal retains ownership of all intellectual property associated with the platform.</p>
            
            <h4>8.2 User-Generated Content</h4>
            <p>Users grant CarPal a non-exclusive license to use submitted content for platform operations.</p>
            
            <h4>8.3 License Grant</h4>
            <p>By using CarPal, users agree to grant CarPal necessary rights to process business data.</p>
            
            <h4>8.4 Feedback Rights</h4>
            <p>CarPal may use user feedback without compensation.</p>
            
            <h3>9. TERMINATION RIGHTS</h3>
            
            <h4>9.1 Termination by User</h4>
            <p>Users may terminate their account by providing written notice.</p>
            
            <h4>9.2 Termination by CarPal</h4>
            <p>CarPal may suspend or terminate accounts violating these Terms.</p>
            
            <h4>9.3 Effects of Termination</h4>
            <p>Upon termination, users lose access to their CarPal accounts.</p>
            
            <h4>9.4 Data Retention After Termination</h4>
            <p>CarPal may retain limited user data as required by law.</p>
            
            <h3>10. DISPUTE RESOLUTION</h3>
            
            <h4>10.1 Governing Law</h4>
            <p>These Terms are governed by the laws of Kenya.</p>
            
            <h4>10.2 Arbitration Process</h4>
            <p>Disputes will be resolved through arbitration before pursuing legal action.</p>
            
            <h4>10.3 Dispute Notice Requirements</h4>
            <p>Users must notify CarPal in writing before initiating disputes.</p>
            
            <h4>10.4 Class Action Waiver</h4>
            <p>Users waive the right to participate in class-action lawsuits against CarPal.</p>
            
            <h3>11. CHANGES TO TERMS</h3>
            
            <h4>11.1 Modification Process</h4>
            <p>CarPal reserves the right to update these Terms at any time.</p>
            
            <h4>11.2 Notification Methods</h4>
            <p>Users will be notified of changes via email or in-app notifications.</p>
            
            <h4>11.3 Continued Use Agreement</h4>
            <p>Continued use after updates constitutes acceptance of revised Terms.</p>
            
            <h3>12. CONTACT INFORMATION</h3>
            <p>For any inquiries, users may contact:</p>
            <ul>
                <li><strong>Email:</strong> legal@citruslabs.co.ke</li>
                <li><strong>Phone:</strong> +254 112 400 000</li>
                <li><strong>Address:</strong> P.O. Box 23983 - 00100</li>
            </ul>
            
            <p>By using CarPal, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
        `
    };

    // Simulated sales personnel data
    const salesPersonnel = {
        "ABC123": { name: "John Doe", id: "EMP001" },
        "XYZ456": { name: "Jane Smith", id: "EMP002" },
        "DEF789": { name: "Robert Johnson", id: "EMP003" }
    };

    // DOM elements
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const policyLinks = document.querySelectorAll('.policy-link');
    const policyContentElement = document.getElementById('policy-content');
    const modal = document.getElementById('policy-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Update active states for buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content, hide others
            tabContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Form navigation
    function showFormStep(stepId) {
        formSteps.forEach(step => {
            if (step.id === stepId) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Next step buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const nextStepId = this.getAttribute('data-next');
            
            // Validate current step (simplified for demonstration)
            if (validateStep(currentStep.id)) {
                showFormStep(nextStepId);
            }
        });
    });

    // Previous step buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStepId = this.getAttribute('data-prev');
            showFormStep(prevStepId);
        });
    });

    // Validate step function
    function validateStep(stepId) {
        let isValid = true;
        
        switch(stepId) {
            case 'step-email':
                const email = document.getElementById('email').value;
                const emailError = document.getElementById('email-error');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!emailRegex.test(email)) {
                    emailError.textContent = 'Please enter a valid email address';
                    emailError.classList.add('show');
                    isValid = false;
                } else {
                    emailError.classList.remove('show');
                }
                break;
                
            case 'step-phone':
                const phone = document.getElementById('phone').value;
                const phoneError = document.getElementById('phone-error');
                const phoneRegex = /^\+?\d{10,15}$/;
                
                if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                    phoneError.textContent = 'Please enter a valid phone number';
                    phoneError.classList.add('show');
                    isValid = false;
                } else {
                    phoneError.classList.remove('show');
                }
                break;
                
            case 'step-password':
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirm-password').value;
                const passwordError = document.getElementById('password-error');
                const confirmPasswordError = document.getElementById('confirm-password-error');
                
                // Check if passwords match
                if (password !== confirmPassword) {
                    confirmPasswordError.textContent = 'Passwords do not match';
                    confirmPasswordError.classList.add('show');
                    isValid = false;
                } else {
                    confirmPasswordError.classList.remove('show');
                }
                
                // Check password strength
                const lengthValid = password.length >= 8;
                const uppercaseValid = /[A-Z]/.test(password);
                const numberValid = /[0-9]/.test(password);
                const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                
                document.getElementById('req-length').classList.toggle('valid', lengthValid);
                document.getElementById('req-uppercase').classList.toggle('valid', uppercaseValid);
                document.getElementById('req-number').classList.toggle('valid', numberValid);
                document.getElementById('req-special').classList.toggle('valid', specialValid);
                
                if (!(lengthValid && uppercaseValid && numberValid && specialValid)) {
                    passwordError.textContent = 'Password does not meet all requirements';
                    passwordError.classList.add('show');
                    isValid = false;
                } else {
                    passwordError.classList.remove('show');
                }
                break;
        }
        
        return isValid;
    }

    // Send verification email button
    const sendVerificationButton = document.getElementById('send-verification');
    if (sendVerificationButton) {
        sendVerificationButton.addEventListener('click', function() {
            if (validateStep('step-password')) {
                const email = document.getElementById('email').value;
                document.getElementById('display-email').textContent = email;
                showFormStep('step-verify-email');
                
                // Simulate email verification (for demo purposes)
                setTimeout(() => {
                    showFormStep('step-sales-confirmation');
                }, 3000);
            }
        });
    }

    // Resend verification email button
    const resendVerificationButton = document.getElementById('resend-verification');
    if (resendVerificationButton) {
        resendVerificationButton.addEventListener('click', function() {
            alert('Verification email resent.');
        });
    }

    // Sales code verification
    const confirmSalesCodeButton = document.getElementById('confirm-sales-code');
    if (confirmSalesCodeButton) {
        confirmSalesCodeButton.addEventListener('click', function() {
            const salesCode = document.getElementById('sales-code').value;
            const salesCodeError = document.getElementById('sales-code-error');
            const validCodeSection = document.getElementById('valid-code-section');
            
            if (salesPersonnel[salesCode]) {
                // Valid sales code
                salesCodeError.classList.remove('show');
                validCodeSection.classList.remove('hidden');
                
                // Display sales personnel info
                document.getElementById('sales-name').textContent = salesPersonnel[salesCode].name;
                document.getElementById('sales-id').textContent = salesPersonnel[salesCode].id;
                
                // Proceed to policy agreement step
                showFormStep('step-policy-agreement');
            } else {
                // Invalid sales code
                salesCodeError.textContent = 'Invalid sales code. Please try again or request a new code.';
                salesCodeError.classList.add('show');
                validCodeSection.classList.add('hidden');
            }
        });
    }

    // Request new sales code
    const requestCodeButton = document.getElementById('request-code');
    if (requestCodeButton) {
        requestCodeButton.addEventListener('click', function() {
            alert('A new sales code has been requested. Please check your email for further instructions.');
        });
    }

    // Policy links
    policyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and add to the clicked one
            policyLinks.forEach(policyLink => policyLink.classList.remove('active'));
            this.classList.add('active');
            
            // Get the policy type from the link's id
            const policyType = this.id.split('-link')[0];
            
            // Display the corresponding policy content
            policyContentElement.innerHTML = policyContent[policyType];
        });
    });

    // Modal close button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Show policy in modal
    function showPolicyInModal(policyType, title) {
        modalTitle.textContent = title;
        modalBody.innerHTML = policyContent[policyType];
        modal.style.display = 'block';
    }

    // Agree to all policies
    const agreeAllCheckbox = document.getElementById('agree-all');
    const completeSignupButton = document.getElementById('complete-signup');
    
    if (completeSignupButton) {
        completeSignupButton.addEventListener('click', function() {
            const policyError = document.getElementById('policy-error');
            
            if (agreeAllCheckbox.checked) {
                policyError.classList.remove('show');
                showFormStep('step-account-created');
                
                // Simulate redirection to dashboard
                setTimeout(() => {
                    window.location.href = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Auto Repair Shop\\Dashboard\\dashboard.html';
                }, 3000);
            } else {
                policyError.textContent = 'You must agree to all policies to proceed';
                policyError.classList.add('show');
            }
        });
    }

    // Decline all button
    const declineAllButton = document.getElementById('decline-all');
    if (declineAllButton) {
        declineAllButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to decline? This will cancel your registration process.')) {
                // Reset and return to the beginning
                document.getElementById('create-account-form').reset();
                showFormStep('step-email');
                
                // Switch to the Create Account tab
                tabButtons.forEach(btn => {
                    if (btn.getAttribute('data-target') === 'create-account') {
                        btn.click();
                    }
                });
            }
        });
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const emailError = document.getElementById('login-email-error');
            const passwordError = document.getElementById('login-password-error');
            let isValid = true;
            
            // Simple validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.classList.add('show');
                isValid = false;
            } else {
                emailError.classList.remove('show');
            }
            
            if (password.length < 8) {
                passwordError.textContent = 'Password must be at least 8 characters';
                passwordError.classList.add('show');
                isValid = false;
            } else {
                passwordError.classList.remove('show');
            }
            
            if (isValid) {
                // Simulate successful login
                alert('Login successful! Redirecting to dashboard...');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Auto Repair Shop\\Dashboard\\dashboard.html';
                }, 1000);
            }
        });
    }

    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide login form, show forgot password form
            document.getElementById('login').classList.remove('active');
            document.getElementById('forgot-password').classList.add('active');
            showFormStep('step-reset-email');
        });
    }

    // Back to login button
    const backToLoginButtons = document.querySelectorAll('#back-to-login, #back-to-login-2');
    backToLoginButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function() {
                // Hide forgot password form, show login form
                document.getElementById('forgot-password').classList.remove('active');
                document.getElementById('login').classList.add('active');
            });
        }
    });

    // Send reset link button
    const sendResetLinkButton = document.getElementById('send-reset-link');
    if (sendResetLinkButton) {
        sendResetLinkButton.addEventListener('click', function() {
            const email = document.getElementById('reset-email').value;
            const resetEmailError = document.getElementById('reset-email-error');
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                resetEmailError.textContent = 'Please enter a valid email address';
                resetEmailError.classList.add('show');
            } else {
                resetEmailError.classList.remove('show');
                
                // Display the email sent step
                document.getElementById('display-reset-email').textContent = email;
                showFormStep('step-reset-link-sent');
            }
        });
    }

    // Resend reset link button
    const resendResetLinkButton = document.getElementById('resend-reset-link');
    if (resendResetLinkButton) {
        resendResetLinkButton.addEventListener('click', function() {
            alert('Password reset link has been resent.');
        });
    }

    // Initialize - show first step of Create Account form
    showFormStep('step-email');

    // Make the first tab active by default
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
});