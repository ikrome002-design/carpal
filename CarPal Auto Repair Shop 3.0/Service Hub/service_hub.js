/**
 * CarPal Service Hub - JavaScript Implementation
 * Version: 3.0
 * Author: Citrus Labs
 * Description: Complete functionality for Service Hub operations
 */

// ====================================
// Global State Management
// ====================================
const ServiceHubState = {
    currentSection: 'serviceHubMenu',
    currentTab: 'messageCenter',
    currentModalTab: 'details',
    currentWizardStep: 1,
    selectedJob: null,
    selectedVehicle: null,
    otpTimer: null,
    darkMode: false,
    messageTemplates: {
        'work-started': 'Dear {CustomerName},\n\nWe\'re pleased to inform you that work on your {VehiclePlate} has commenced. Our technician {TechnicianName} is currently working on the {ServiceType}.\n\nEstimated completion time: {EstimatedTime}\n\nWe\'ll keep you updated on the progress.\n\nBest regards,\nCarPal Auto Repair Shop',
        'progress': 'Dear {CustomerName},\n\nUpdate on your {VehiclePlate}: {ServiceType} is {ProgressPercentage}% complete.\n\nNext steps: {NextSteps}\nEstimated completion: {EstimatedTime}\n\nBest regards,\nCarPal Auto Repair Shop',
        'waiting-parts': 'Dear {CustomerName},\n\nWe\'re currently waiting for parts for your {VehiclePlate}. Expected arrival: {PartsArrival}\n\nWe\'ll resume work immediately once parts arrive.\n\nBest regards,\nCarPal Auto Repair Shop',
        'quality-check': 'Dear {CustomerName},\n\nGood news! Your {VehiclePlate} has entered our quality check phase. We\'re ensuring everything meets our high standards.\n\nEstimated completion: {EstimatedTime}\n\nBest regards,\nCarPal Auto Repair Shop',
        'almost-complete': 'Dear {CustomerName},\n\nYour {VehiclePlate} service is nearly complete! Final testing in progress.\n\nExpected pickup time: {PickupTime}\n\nBest regards,\nCarPal Auto Repair Shop'
    },
    jobs: [
        {
            id: '2024-001',
            plate: 'KBZ 456T',
            make: 'Toyota',
            model: 'Corolla',
            customer: 'Jane Muthoni',
            phone: '+254 722 123456',
            email: 'jane.muthoni@email.com',
            service: 'Full Service & Oil Change',
            technician: 'John Kamau',
            status: 'scheduled',
            date: 'Today, 2:00 PM'
        },
        {
            id: '2024-002',
            plate: 'KCN 789X',
            make: 'Nissan',
            model: 'X-Trail',
            customer: 'Robert Omondi',
            phone: '+254 733 456789',
            email: 'robert.omondi@email.com',
            service: 'Engine Diagnosis & Repair',
            technician: 'Peter Ochieng',
            status: 'in-progress',
            date: 'Started: 9:00 AM'
        },
        {
            id: '2024-003',
            plate: 'KDA 234M',
            make: 'Mercedes-Benz',
            model: 'C200',
            customer: 'Michael Njoroge',
            phone: '+254 720 111222',
            email: 'michael.njoroge@email.com',
            service: 'Brake System Service',
            technician: 'Mary Wanjiru',
            status: 'scheduled',
            date: 'Tomorrow, 10:00 AM'
        },
        {
            id: '2024-004',
            plate: 'KDB 567P',
            make: 'Honda',
            model: 'CR-V',
            customer: 'Sarah Wambui',
            phone: '+254 721 999888',
            email: 'sarah.wambui@email.com',
            service: 'Suspension Repair',
            technician: 'John Kamau',
            status: 'in-progress',
            date: 'Started: Yesterday'
        }
    ]
};

// ====================================
// Initialize on Page Load
// ====================================
document.addEventListener('DOMContentLoaded', function () {
    initializeServiceHub();
    setupEventListeners();
    initializeDropdowns();
    loadSavedState();
});

// ====================================
// Initialization Functions
// ====================================
function initializeServiceHub() {
    // Show default section
    showSection('serviceHubMenu');

    // Initialize tooltips
    initializeTooltips();

    // Initialize date/time inputs with current values
    initializeDateTimeInputs();

    // Load any saved templates
    loadSavedTemplates();

    // Initialize search functionality
    initializeSearch();
}

function setupEventListeners() {
    // Setup modal close on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Setup search input listeners
    document.querySelectorAll('.search-bar input').forEach(input => {
        input.addEventListener('input', debounce(handleSearch, 300));
    });

    // Setup filter change listeners
    document.querySelectorAll('.filter-options select').forEach(select => {
        select.addEventListener('change', applyFilters);
    });

    // Setup message character counter
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', updateCharacterCount);
    });

    // Setup keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// ====================================
// Section Navigation Functions
// ====================================
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.service-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('serviceHubMenu').style.display = 'none';

    // Show requested section
    if (sectionId === 'serviceHubMenu') {
        document.getElementById('serviceHubMenu').style.display = 'block';
    } else {
        document.getElementById(sectionId).style.display = 'block';
    }

    ServiceHubState.currentSection = sectionId;

    // Update breadcrumb if needed
    updateBreadcrumb(sectionId);
}

// ====================================
// Tab Navigation Functions
// ====================================
function switchTab(tabId) {
    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    // Remove active from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabId).classList.add('active');

    // Set active button
    document.querySelector(`[onclick="switchTab('${tabId}')"]`).classList.add('active');

    ServiceHubState.currentTab = tabId;
}

// ====================================
// Modal Management Functions
// ====================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Reset forms if needed
        if (modalId === 'newAppointmentModal') {
            resetWizard();
        }
        if (modalId === 'otpModal') {
            clearOTPTimer();
        }
    }
}

// ====================================
// New Appointment Wizard Functions
// ====================================
function openNewAppointmentModal() {
    openModal('newAppointmentModal');
    resetWizard();
    showWizardStep(1);
}

function resetWizard() {
    ServiceHubState.currentWizardStep = 1;
    showWizardStep(1);

    // Clear all form inputs
    document.querySelectorAll('#newAppointmentModal input').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });

    document.querySelectorAll('#newAppointmentModal select').forEach(select => {
        select.selectedIndex = 0;
    });

    document.querySelectorAll('#newAppointmentModal textarea').forEach(textarea => {
        textarea.value = '';
    });
}

function showWizardStep(step) {
    // Hide all steps
    for (let i = 1; i <= 5; i++) {
        const stepContent = document.getElementById(`step${i}`);
        if (stepContent) {
            stepContent.style.display = 'none';
        }
    }

    // Show current step
    const currentStep = document.getElementById(`step${step}`);
    if (currentStep) {
        currentStep.style.display = 'block';
    }

    // Update step indicators
    document.querySelectorAll('.wizard-steps .step').forEach((el, index) => {
        if (index < step) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });

    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (step === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    } else if (step === 5) {
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        prevBtn.style.display = 'inline-flex';
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }

    ServiceHubState.currentWizardStep = step;
}

function changeStep(direction) {
    const currentStep = ServiceHubState.currentWizardStep;
    const newStep = currentStep + direction;

    // Validate current step before moving
    if (direction > 0 && !validateWizardStep(currentStep)) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (newStep >= 1 && newStep <= 5) {
        showWizardStep(newStep);
    }
}

function validateWizardStep(step) {
    const stepContent = document.getElementById(`step${step}`);
    const requiredFields = stepContent.querySelectorAll('[required]');

    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            field.classList.add('error');
            return false;
        }
        field.classList.remove('error');
    }

    return true;
}

function submitAppointment() {
    // Validate final step
    if (!validateWizardStep(5)) {
        showNotification('Please complete all required fields', 'error');
        return;
    }

    // Collect all form data
    const appointmentData = collectAppointmentData();

    // Simulate API call
    setTimeout(() => {
        // Add new job to state
        const newJob = {
            id: generateJobId(),
            ...appointmentData,
            status: 'scheduled',
            date: appointmentData.preferredDate + ' ' + appointmentData.timeSlot
        };

        ServiceHubState.jobs.push(newJob);

        // Show success message
        showNotification('Appointment successfully created! Job ID: ' + newJob.id, 'success');

        // Send customer notification
        sendCustomerNotification(newJob);

        // Close modal
        closeModal('newAppointmentModal');

        // Refresh job list if on that page
        if (ServiceHubState.currentSection === 'jobSchedulingSection') {
            refreshJobList();
        }
    }, 1000);
}

function collectAppointmentData() {
    // Collect data from all wizard steps
    return {
        // Customer Info
        customerName: document.querySelector('#step1 input[placeholder*="full name"]').value,
        phone: document.querySelector('#step1 input[type="tel"]').value,
        email: document.querySelector('#step1 input[type="email"]').value,
        idNumber: document.querySelector('#step1 input[placeholder*="ID"]').value,
        address: document.querySelector('#step1 textarea').value,

        // Vehicle Info
        plate: document.querySelector('#step2 input[placeholder*="License"]').value,
        make: document.querySelector('#step2 input[placeholder*="Make"]').value,
        model: document.querySelector('#step2 input[placeholder*="Model"]').value,
        year: document.querySelector('#step2 input[placeholder*="Year"]').value,
        color: document.querySelector('#step2 input[placeholder*="Color"]').value,
        mileage: document.querySelector('#step2 input[placeholder*="Mileage"]').value,

        // Service Details
        serviceType: document.querySelector('#step3 select').value,
        problemDescription: document.querySelector('#step3 textarea').value,
        urgency: document.querySelector('#step3 select[required]').value,

        // Scheduling
        preferredDate: document.querySelector('#step4 input[type="date"]').value,
        timeSlot: document.querySelector('#step4 select').value,
        technician: document.querySelector('#step4 select[required]').value,

        // Communication
        smsEnabled: document.querySelector('#sms-pref').checked,
        emailEnabled: document.querySelector('#email-pref').checked,
        whatsappEnabled: document.querySelector('#whatsapp-pref').checked,
        callEnabled: document.querySelector('#call-pref').checked
    };
}

// ====================================
// Job Details Modal Functions
// ====================================
function openJobDetailsModal(jobId) {
    const job = ServiceHubState.jobs.find(j => j.id === jobId);
    if (job) {
        ServiceHubState.selectedJob = job;
        populateJobDetails(job);
        openModal('jobDetailsModal');
        switchModalTab('details');
    }
}

function populateJobDetails(job) {
    // Update modal header
    document.querySelector('#jobDetailsModal h2').textContent = `Job Details - #${job.id}`;

    // Populate Details tab
    document.querySelector('.job-vehicle-info h3').textContent = `${job.plate} - ${job.make} ${job.model}`;

    // Update customer info
    const customerInfo = document.querySelector('#details .info-section:first-of-type .info-grid');
    customerInfo.innerHTML = `
        <span class="info-label">Full Name:</span>
        <span>${job.customer}</span>
        <span class="info-label">Phone Number:</span>
        <span>${job.phone}</span>
        <span class="info-label">Email:</span>
        <span>${job.email || 'Not provided'}</span>
        <span class="info-label">Address:</span>
        <span>${job.address || 'Not provided'}</span>
        <span class="info-label">ID Number:</span>
        <span>${job.idNumber || 'Not provided'}</span>
    `;

    // Populate other tabs dynamically
    populateBillingTab(job);
    populateAssessmentTab(job);
    populateImagesTab(job);
    populateDocumentsTab(job);
    populateNotesTab(job);
}

function switchModalTab(tabId) {
    // Hide all modal tab panes
    document.querySelectorAll('.modal-tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    // Remove active from all modal tabs
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabId).classList.add('active');

    // Set active tab button
    document.querySelector(`[onclick="switchModalTab('${tabId}')"]`).classList.add('active');

    ServiceHubState.currentModalTab = tabId;
}

// ====================================
// Update Progress Modal Functions
// ====================================
function openUpdateProgressModal(vehiclePlate) {
    const job = ServiceHubState.jobs.find(j => j.plate === vehiclePlate);
    if (job) {
        ServiceHubState.selectedVehicle = vehiclePlate;

        // Populate modal with vehicle info
        document.getElementById('updateVehiclePlate').textContent = job.plate;
        document.getElementById('updateCustomerName').textContent = job.customer;
        document.getElementById('updateCustomerPhone').textContent = job.phone;

        openModal('updateProgressModal');
    }
}

function loadTemplate() {
    const templateSelect = document.getElementById('updateTemplate');
    const template = ServiceHubState.messageTemplates[templateSelect.value];

    if (template && ServiceHubState.selectedJob) {
        const job = ServiceHubState.selectedJob;
        let message = template
            .replace('{CustomerName}', job.customer)
            .replace('{VehiclePlate}', job.plate)
            .replace('{ServiceType}', job.service)
            .replace('{TechnicianName}', job.technician)
            .replace('{EstimatedTime}', 'Today by 5 PM');

        document.getElementById('messagePreview').textContent = message;
    }
}

function previewUpdate() {
    const message = document.getElementById('messagePreview').textContent;
    if (message && message !== 'Select a template to preview the message...') {
        showNotification('Message preview loaded', 'info');
    } else {
        showNotification('Please select a template first', 'warning');
    }
}

function sendUpdate() {
    // Validate message
    const message = document.getElementById('messagePreview').textContent;
    if (!message || message === 'Select a template to preview the message...') {
        showNotification('Please select a template first', 'error');
        return;
    }

    // Check delivery methods
    const sms = document.getElementById('sms-progress').checked;
    const email = document.getElementById('email-progress').checked;
    const whatsapp = document.getElementById('whatsapp-progress').checked;

    if (!sms && !email && !whatsapp) {
        showNotification('Please select at least one delivery method', 'error');
        return;
    }

    // Calculate cost
    let cost = 0;
    if (sms) cost += 5;
    if (whatsapp) cost += 3;

    // Simulate sending
    setTimeout(() => {
        closeModal('updateProgressModal');
        showConfirmationModal({
            sms: sms ? 1 : 0,
            email: email ? 1 : 0,
            whatsapp: whatsapp ? 1 : 0,
            totalCost: cost
        });
    }, 1000);
}

// ====================================
// OTP Verification Functions
// ====================================
function requestOTP(editType) {
    ServiceHubState.otpEditType = editType;
    openModal('otpModal');
}

function sendOTP() {
    // Show OTP input section
    document.getElementById('otpInputSection').style.display = 'block';
    document.getElementById('otpActions').style.display = 'flex';

    // Start timer
    startOTPTimer();

    // Simulate OTP send
    showNotification('OTP code sent to registered phone number', 'success');

    // For demo purposes, console log the OTP
    console.log('Demo OTP: 123456');
}

function startOTPTimer() {
    let timeLeft = 300; // 5 minutes
    const timerElement = document.getElementById('otpTimer');

    ServiceHubState.otpTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft === 0) {
            clearOTPTimer();
            showNotification('OTP expired. Please request a new code.', 'error');
        }

        timeLeft--;
    }, 1000);
}

function clearOTPTimer() {
    if (ServiceHubState.otpTimer) {
        clearInterval(ServiceHubState.otpTimer);
        ServiceHubState.otpTimer = null;
    }
}

function resendOTP() {
    clearOTPTimer();
    sendOTP();
}

function verifyOTP() {
    const otpInput = document.querySelector('#otpInputSection input').value;

    // For demo, accept 123456
    if (otpInput === '123456') {
        showNotification('OTP verified successfully! Edit mode enabled.', 'success');
        closeModal('otpModal');
        enableEditMode(ServiceHubState.otpEditType);
    } else {
        showNotification('Invalid OTP. Please try again.', 'error');
    }
}

function enableEditMode(editType) {
    // Enable editing for the specified section
    const section = document.querySelector(`.info-section:has(.info-label:contains("${editType}"))`);
    if (section) {
        section.classList.add('edit-mode');
        // Convert spans to inputs for editing
        // Implementation depends on specific requirements
    }
}

// ====================================
// Communication Tools Functions
// ====================================
function sendProgressUpdate() {
    const vehiclePlate = document.querySelector('#repairUpdates input[placeholder*="license plate"]').value;

    if (!vehiclePlate) {
        showNotification('Please enter a vehicle license plate', 'error');
        return;
    }

    // Get selected template and message
    const template = document.querySelector('#repairUpdates select').value;
    const message = document.querySelector('#repairUpdates textarea').value;

    if (!template || !message) {
        showNotification('Please select a template and enter a message', 'error');
        return;
    }

    // Check delivery methods
    const sms = document.getElementById('sms-update').checked;
    const email = document.getElementById('email-update').checked;
    const whatsapp = document.getElementById('whatsapp-update').checked;

    if (!sms && !email && !whatsapp) {
        showNotification('Please select at least one delivery method', 'error');
        return;
    }

    // Calculate cost and send
    let cost = 0;
    if (sms) cost += 5;
    if (whatsapp) cost += 3;

    showConfirmationModal({
        sms: sms ? 1 : 0,
        email: email ? 1 : 0,
        whatsapp: whatsapp ? 1 : 0,
        totalCost: cost
    });
}

function markAsCompleted() {
    const vehiclePlate = document.querySelector('#completionNotices input[placeholder*="license plate"]').value;

    if (!vehiclePlate) {
        showNotification('Please enter a vehicle license plate', 'error');
        return;
    }

    // Update job status
    const job = ServiceHubState.jobs.find(j => j.plate === vehiclePlate);
    if (job) {
        job.status = 'completed';

        // Generate billing PDF
        generateBillingPDF(job);

        // Send completion notice
        sendCompletionNotice(job);

        showNotification(`Vehicle ${vehiclePlate} marked as completed!`, 'success');

        // Show confirmation modal
        showConfirmationModal({
            sms: 1,
            email: 1,
            whatsapp: 0,
            totalCost: 5
        });
    }
}

function sendCustomMessage() {
    const recipientType = document.querySelector('#customMessages select').value;
    const message = document.querySelector('#customMessages textarea').value;

    if (!message) {
        showNotification('Please enter a message', 'error');
        return;
    }

    // Get selected recipients
    const selectedRecipients = document.querySelectorAll('.customer-item input:checked');
    if (selectedRecipients.length === 0) {
        showNotification('Please select at least one recipient', 'error');
        return;
    }

    // Send message
    showConfirmationModal({
        sms: selectedRecipients.length,
        email: 0,
        whatsapp: 0,
        totalCost: selectedRecipients.length * 5
    });
}

// ====================================
// Template Management Functions
// ====================================
function openTemplateEditor(mode = 'create') {
    ServiceHubState.templateEditMode = mode;

    if (mode === 'create') {
        // Clear form for new template
        document.querySelectorAll('#templateEditorModal input, #templateEditorModal textarea').forEach(field => {
            field.value = '';
        });
    }

    openModal('templateEditorModal');
}

function insertVariable(variable) {
    const activeTextarea = document.activeElement;
    if (activeTextarea && activeTextarea.tagName === 'TEXTAREA') {
        const start = activeTextarea.selectionStart;
        const end = activeTextarea.selectionEnd;
        const text = activeTextarea.value;

        activeTextarea.value = text.substring(0, start) + variable + text.substring(end);
        activeTextarea.selectionStart = activeTextarea.selectionEnd = start + variable.length;
        activeTextarea.focus();
    }
}

// ====================================
// Confirmation Modal Functions
// ====================================
function showConfirmationModal(stats) {
    // Update stats in modal
    document.querySelector('.message-stats').innerHTML = `
        <div class="stat-item">
            <span class="stat-label">Total Recipients:</span>
            <span>${stats.sms + stats.email + stats.whatsapp}</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">SMS Sent:</span>
            <span>${stats.sms} (KES. ${stats.sms * 5}.00)</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Email Sent:</span>
            <span>${stats.email} (Free)</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">WhatsApp Sent:</span>
            <span>${stats.whatsapp} (KES. ${stats.whatsapp * 3}.00)</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Total Cost:</span>
            <span>KES. ${stats.totalCost}.00</span>
        </div>
    `;

    openModal('confirmationModal');
}

function viewMessageHistory() {
    closeModal('confirmationModal');
    switchTab('messageCenter');
}

// ====================================
// Utility Functions
// ====================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : type === 'warning' ? '#FF9800' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

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

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();

    // Filter jobs
    const filteredJobs = ServiceHubState.jobs.filter(job => {
        return job.plate.toLowerCase().includes(searchTerm) ||
            job.customer.toLowerCase().includes(searchTerm) ||
            job.id.toLowerCase().includes(searchTerm);
    });

    // Update display
    refreshJobList(filteredJobs);
}

function applyFilters() {
    // Get filter values
    const statusFilter = document.querySelector('.filter-options select[value*="status"]')?.value;
    const dateFilter = document.querySelector('.filter-options select[value*="date"]')?.value;
    const technicianFilter = document.querySelector('.filter-options select[value*="technician"]')?.value;

    // Apply filters to jobs
    let filteredJobs = [...ServiceHubState.jobs];

    if (statusFilter) {
        filteredJobs = filteredJobs.filter(job => job.status === statusFilter);
    }

    if (technicianFilter) {
        filteredJobs = filteredJobs.filter(job => job.technician.toLowerCase().includes(technicianFilter));
    }

    // Update display
    refreshJobList(filteredJobs);
}

function refreshJobList(jobs = ServiceHubState.jobs) {
    const jobListContainer = document.querySelector('.job-list');
    if (!jobListContainer) return;

    jobListContainer.innerHTML = jobs.map(job => `
        <div class="job-card">
            <div class="job-header">
                <span class="job-status ${job.status}">${job.status.replace('-', ' ')}</span>
                <span class="job-date">${job.date}</span>
            </div>
            <div class="job-details">
                <h3>${job.plate} - ${job.make} ${job.model}</h3>
                <p><strong>Customer:</strong> ${job.customer}</p>
                <p><strong>Service:</strong> ${job.service}</p>
                <p><strong>Technician:</strong> ${job.technician}</p>
                <p><strong>Job ID:</strong> #${job.id}</p>
            </div>
            <div class="job-actions">
                <button class="btn-view-job" onclick="openJobDetailsModal('${job.id}')">
                    <i class="fas fa-eye"></i>
                    View Details
                </button>
                <button class="btn-update-job" onclick="openUpdateProgressModal('${job.plate}')">
                    <i class="fas fa-sync"></i>
                    Update Progress
                </button>
            </div>
        </div>
    `).join('');
}

function updateCharacterCount(e) {
    const textarea = e.target;
    const maxLength = 500;
    const currentLength = textarea.value.length;

    // Find associated character count display
    const charCount = textarea.parentElement.querySelector('small');
    if (charCount) {
        charCount.textContent = `Characters: ${currentLength}/${maxLength}`;

        if (currentLength > maxLength) {
            charCount.style.color = 'red';
        } else {
            charCount.style.color = '';
        }
    }
}

function generateJobId() {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${year}-${random}`;
}

function generateBillingPDF(job) {
    // Simulate PDF generation
    console.log('Generating billing PDF for job:', job.id);

    // In real implementation, this would call a PDF generation service
    const pdfData = {
        fileName: `${job.plate}_${job.id}_${new Date().toISOString().split('T')[0]}.pdf`,
        content: {
            invoice: 'Invoice data...',
            supportingDocs: 'Supporting documents...',
            images: 'Before/after images...'
        }
    };

    return pdfData;
}

function sendCompletionNotice(job) {
    // Simulate sending completion notice
    console.log('Sending completion notice for:', job.customer);

    // In real implementation, this would call notification service
    return true;
}

function sendCustomerNotification(job) {
    // Simulate sending customer notification
    console.log('Sending appointment confirmation to:', job.customer);

    // In real implementation, this would call notification service
    return true;
}

// ====================================
// Dark Mode Toggle
// ====================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    ServiceHubState.darkMode = !ServiceHubState.darkMode;

    // Save preference
    localStorage.setItem('darkMode', ServiceHubState.darkMode);

    // Update icon
    const icon = document.querySelector('.theme-toggle i');
    icon.className = ServiceHubState.darkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// ====================================
// Dropdown Management
// ====================================
function initializeDropdowns() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.notifications') && !e.target.closest('.user-profile')) {
            document.querySelectorAll('.notifications-dropdown, .profile-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });

    // Toggle dropdowns
    document.querySelector('.notifications').addEventListener('click', function (e) {
        e.stopPropagation();
        const dropdown = this.querySelector('.notifications-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.querySelector('.user-profile').addEventListener('click', function (e) {
        e.stopPropagation();
        const dropdown = this.querySelector('.profile-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
}

// ====================================
// Additional Helper Functions
// ====================================
function initializeTooltips() {
    // Add tooltips to buttons with title attributes
    document.querySelectorAll('[title]').forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.title;
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 10000;
        pointer-events: none;
    `;

    document.body.appendChild(tooltip);

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

function hideTooltip() {
    document.querySelectorAll('.tooltip').forEach(tooltip => tooltip.remove());
}

function initializeDateTimeInputs() {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = today;
        if (!input.value) {
            input.value = today;
        }
    });

    // Set current time for datetime inputs
    const now = new Date().toISOString().slice(0, 16);
    document.querySelectorAll('input[type="datetime-local"]').forEach(input => {
        input.min = now;
        if (!input.value) {
            input.value = now;
        }
    });
}

function loadSavedTemplates() {
    const savedTemplates = localStorage.getItem('messageTemplates');
    if (savedTemplates) {
        Object.assign(ServiceHubState.messageTemplates, JSON.parse(savedTemplates));
    }
}

function saveTemplate(templateName, templateContent) {
    ServiceHubState.messageTemplates[templateName] = templateContent;
    localStorage.setItem('messageTemplates', JSON.stringify(ServiceHubState.messageTemplates));
}

function initializeSearch() {
    // Add search functionality to all search inputs
    document.querySelectorAll('.search-bar input').forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleSearch(e);
            }
        });
    });
}

function loadSavedState() {
    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        toggleDarkMode();
    }

    // Load other saved preferences
    const savedSection = localStorage.getItem('lastSection');
    if (savedSection) {
        showSection(savedSection);
    }
}

function updateBreadcrumb(sectionId) {
    // Update breadcrumb navigation if exists
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        const sectionNames = {
            'serviceHubMenu': 'Service Hub',
            'jobSchedulingSection': 'Job Scheduling & Tracking',
            'communicationSection': 'Customer Communication Tools'
        };

        breadcrumb.innerHTML = `
            <a href="#" onclick="showSection('serviceHubMenu')">Service Hub</a>
            ${sectionId !== 'serviceHubMenu' ? ` > ${sectionNames[sectionId]}` : ''}
        `;
    }
}

function handleKeyboardShortcuts(e) {
    // Ctrl+S to save
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        // Save current form or template
        const activeModal = document.querySelector('.modal[style*="flex"]');
        if (activeModal) {
            activeModal.querySelector('.btn-primary')?.click();
        }
    }

    // Escape to close modal
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal[style*="flex"]');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }

    // Ctrl+N for new appointment
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        if (ServiceHubState.currentSection === 'jobSchedulingSection') {
            openNewAppointmentModal();
        }
    }
}

// ====================================
// Populate Additional Tab Functions
// ====================================
function populateBillingTab(job) {
    // Generate sample billing data
    const billing = {
        laborCost: 5000,
        serviceFee: 2000,
        diagnosticFee: 1500,
        parts: [
            { name: 'Engine Oil (5L)', quantity: 1, price: 3500 },
            { name: 'Oil Filter', quantity: 1, price: 800 },
            { name: 'Air Filter', quantity: 1, price: 1200 }
        ]
    };

    const subtotal = billing.laborCost + billing.serviceFee + billing.diagnosticFee +
        billing.parts.reduce((sum, part) => sum + part.price, 0);
    const platformFee = subtotal * 0.05;
    const vat = subtotal * 0.16;
    const serviceTax = subtotal * 0.02;
    const total = subtotal + platformFee + vat + serviceTax;

    // Update billing display
    const billingTab = document.getElementById('billing');
    if (billingTab) {
        billingTab.querySelector('.info-grid').innerHTML = `
            <span class="info-label">Subtotal:</span>
            <span>KES. ${subtotal.toFixed(2)}</span>
            <span class="info-label">VAT (16%):</span>
            <span>KES. ${vat.toFixed(2)}</span>
            <span class="info-label">Service Tax (2%):</span>
            <span>KES. ${serviceTax.toFixed(2)}</span>
            <span class="info-label"><strong>Total Amount:</strong></span>
            <span><strong>KES. ${total.toFixed(2)}</strong></span>
        `;
    }
}

function populateAssessmentTab(job) {
    // Assessment data would come from database
    console.log('Loading assessment data for job:', job.id);
}

function populateImagesTab(job) {
    // Load repair images for the job
    console.log('Loading images for job:', job.id);
}

function populateDocumentsTab(job) {
    // Load supporting documents for the job
    console.log('Loading documents for job:', job.id);
}

function populateNotesTab(job) {
    // Load technician notes for the job
    console.log('Loading notes for job:', job.id);
}

// ====================================
// Export Functions (if using modules)
// ====================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSection,
        switchTab,
        openModal,
        closeModal,
        openNewAppointmentModal,
        changeStep,
        submitAppointment,
        openJobDetailsModal,
        switchModalTab,
        openUpdateProgressModal,
        loadTemplate,
        sendUpdate,
        requestOTP,
        sendOTP,
        verifyOTP,
        sendProgressUpdate,
        markAsCompleted,
        sendCustomMessage,
        openTemplateEditor,
        insertVariable,
        toggleDarkMode,
        showNotification
    };
}