// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the form
    initializeForm();
    
    // Toggle Notifications Dropdown
    const notificationsIcon = document.getElementById('notificationsIcon');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    
    notificationsIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationsDropdown.style.display = notificationsDropdown.style.display === 'block' ? 'none' : 'block';
        
        // Hide profile dropdown if open
        if (profileDropdown.style.display === 'block') {
            profileDropdown.style.display = 'none';
        }
    });
    
    // Toggle User Profile Dropdown
    const userProfileIcon = document.getElementById('userProfileIcon');
    const profileDropdown = document.getElementById('profileDropdown');
    
    userProfileIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        
        // Hide notifications dropdown if open
        if (notificationsDropdown.style.display === 'block') {
            notificationsDropdown.style.display = 'none';
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        notificationsDropdown.style.display = 'none';
        profileDropdown.style.display = 'none';
    });
    
    // Prevent closing when clicking inside dropdowns
    notificationsDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    profileDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check if dark mode preference is saved in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.replace('fa-moon', 'fa-sun');
    }
    
    darkModeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            darkModeToggle.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        } else {
            document.body.classList.add('dark-mode');
            darkModeToggle.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        }
    });
});

/**
 * Initialize the multi-step form
 */
function initializeForm() {
    // Get all steps
    const steps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('check-in-progress');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    
    // Set initial progress (20% for first step)
    progressBar.style.width = '20%';
    
    // Vehicle Selection (Step 1)
    const newVehicleOption = document.getElementById('new-vehicle-option');
    const existingVehicleOption = document.getElementById('existing-vehicle-option');
    const step1NextBtn = document.getElementById('step1-next');
    const backToDashboardBtn = document.getElementById('back-to-dashboard');
    
    // Step navigation buttons
    const step2PrevBtn = document.getElementById('step2-prev');
    const step2NextBtn = document.getElementById('step2-next');
    const step3PrevBtn = document.getElementById('step3-prev');
    const step3NextBtn = document.getElementById('step3-next');
    const step4PrevBtn = document.getElementById('step4-prev');
    const step4NextBtn = document.getElementById('step4-next');
    const step5PrevBtn = document.getElementById('step5-prev');
    const submitCheckInBtn = document.getElementById('submit-check-in');
    const saveAssessmentProgressBtn = document.getElementById('save-assessment-progress');
    
    // Vehicle forms
    const newVehicleForm = document.querySelector('.new-vehicle-form');
    const existingVehicleForm = document.querySelector('.existing-vehicle-form');
    
    // License plate quick search
    const licensePlateSearch = document.getElementById('license-plate-search');
    const searchButton = document.getElementById('search-button');
    
    // Vehicle option selection
    let selectedVehicleType = null;
    
    newVehicleOption.addEventListener('click', function() {
        selectedVehicleType = 'new';
        newVehicleOption.classList.add('selected');
        existingVehicleOption.classList.remove('selected');
        step1NextBtn.disabled = false;
    });
    
    existingVehicleOption.addEventListener('click', function() {
        selectedVehicleType = 'existing';
        existingVehicleOption.classList.add('selected');
        newVehicleOption.classList.remove('selected');
        step1NextBtn.disabled = false;
    });
    
    // License plate search functionality
    searchButton.addEventListener('click', function() {
        const licensePlate = licensePlateSearch.value.trim();
        if (licensePlate) {
            selectedVehicleType = 'existing';
            existingVehicleOption.classList.add('selected');
            newVehicleOption.classList.remove('selected');
            step1NextBtn.disabled = false;
            // Here you would typically search for the license plate in the database
            console.log('Searching for license plate:', licensePlate);
        }
    });
    
    licensePlateSearch.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
    
    // Back to dashboard button
    backToDashboardBtn.addEventListener('click', function() {
        window.location.href = 'C:/Users/nderu/Documents/Development/Product/CarPal/CarPal Auto Repair Shop 3.0/Dashboard/dashboard.html';
    });
    
    // Step 1 Next button
    step1NextBtn.addEventListener('click', function() {
        goToStep(2);
        
        // Show the appropriate form based on selection
        if (selectedVehicleType === 'new') {
            newVehicleForm.style.display = 'block';
            existingVehicleForm.style.display = 'none';
        } else {
            newVehicleForm.style.display = 'none';
            existingVehicleForm.style.display = 'block';
        }
    });
    
    // Step 2 Previous button
    step2PrevBtn.addEventListener('click', function() {
        goToStep(1);
    });
    
    // Step 2 Next button
    step2NextBtn.addEventListener('click', function() {
        goToStep(3);
    });
    
    // Step 3 Previous button
    step3PrevBtn.addEventListener('click', function() {
        goToStep(2);
    });
    
    // Step 3 Next button
    step3NextBtn.addEventListener('click', function() {
        goToStep(4);
    });
    
    // Step 4 Previous button
    step4PrevBtn.addEventListener('click', function() {
        goToStep(3);
    });
    
    // Step 4 Next button
    step4NextBtn.addEventListener('click', function() {
        goToStep(5);
        populateReviewData();
    });
    
    // Step 5 Previous button
    step5PrevBtn.addEventListener('click', function() {
        goToStep(4);
    });
    
    // Save Assessment Progress button
    saveAssessmentProgressBtn.addEventListener('click', function() {
        // Simulate saving progress
        showNotification('Assessment progress saved successfully!');
    });
    
    // Submit form button
    submitCheckInBtn.addEventListener('click', function() {
        // Validate the form
        const otpPin = document.getElementById('otp-pin').value;
        const customerId = document.getElementById('customer-id').value;
        const acceptTerms = document.getElementById('accept-terms').checked;
        
        if (!otpPin || !customerId || !acceptTerms) {
            showNotification('Please fill in all required fields and accept the terms and conditions.', 'error');
            return;
        }
        
        // Show confirmation modal
        const confirmationModal = document.getElementById('confirmation-modal');
        confirmationModal.style.display = 'flex';
    });
    
    // Confirmation modal buttons
    const viewAnotherVehicleBtn = document.getElementById('view-another-vehicle');
    const returnToDashboardBtn = document.getElementById('return-to-dashboard');
    
    viewAnotherVehicleBtn.addEventListener('click', function() {
        window.location.reload();
    });
    
    returnToDashboardBtn.addEventListener('click', function() {
        window.location.href = 'C:/Users/nderu/Documents/Development/Product/CarPal/CarPal Auto Repair Shop 3.0/Dashboard/dashboard.html';
    });
    
    // Initialize assessment tabs
    initializeAssessmentTabs();
    
    // Initialize toggle switches
    initializeToggleSwitches();
    
    // Initialize photo buttons
    initializePhotoButtons();
    
    // Initialize payee type selection
    initializePayeeTypeSelection();
    
    // Initialize existing vehicle search
    initializeExistingVehicleSearch();
    
    // Add Component button
    const addComponentBtn = document.getElementById('add-component-btn');
    addComponentBtn.addEventListener('click', function() {
        addAdditionalComponent();
    });
    
    // Terms and conditions link
    const viewTermsLink = document.getElementById('view-terms');
    const termsModal = document.getElementById('terms-modal');
    const acceptTermsBtn = document.getElementById('accept-terms-btn');
    
    viewTermsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'flex';
    });
    
    acceptTermsBtn.addEventListener('click', function() {
        document.getElementById('accept-terms').checked = true;
        termsModal.style.display = 'none';
    });
    
    // View Service History
    const viewServiceHistoryBtn = document.getElementById('view-service-history');
    const serviceHistoryModal = document.getElementById('service-history-modal');
    
    viewServiceHistoryBtn.addEventListener('click', function(e) {
        e.preventDefault();
        serviceHistoryModal.style.display = 'flex';
    });
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.close-btn');
    
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Find the parent modal
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // View Full Assessment link
    const viewFullAssessmentLink = document.getElementById('view-full-assessment');
    
    viewFullAssessmentLink.addEventListener('click', function(e) {
        e.preventDefault();
        goToStep(3);
    });
    
    // Edit buttons on review page
    const editButtons = document.querySelectorAll('.btn-edit');
    
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            
            switch (section) {
                case 'vehicle-info':
                    goToStep(2);
                    break;
                case 'assessment':
                    goToStep(3);
                    break;
                case 'payee-info':
                    goToStep(4);
                    break;
            }
        });
    });
    
    /**
     * Navigate to the specified step
     * @param {number} stepNumber - The step number to navigate to
     */
    function goToStep(stepNumber) {
        // Hide all steps
        steps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Show the selected step
        document.getElementById(`${getStepId(stepNumber)}-step`).classList.add('active');
        
        // Update progress bar
        const progressPercentage = stepNumber * 20;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update progress steps
        progressSteps.forEach((step, index) => {
            if (index < stepNumber) {
                step.classList.add('completed');
                step.classList.add('active');
            } else if (index === stepNumber - 1) {
                step.classList.remove('completed');
                step.classList.add('active');
            } else {
                step.classList.remove('completed');
                step.classList.remove('active');
            }
        });
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    /**
     * Get the step ID based on the step number
     * @param {number} stepNumber - The step number
     * @returns {string} - The step ID
     */
    function getStepId(stepNumber) {
        const stepIds = ['vehicle-selection', 'vehicle-info', 'assessment', 'payee-info', 'review'];
        return stepIds[stepNumber - 1];
    }
}

/**
 * Initialize assessment tabs
 */
function initializeAssessmentTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Show the selected tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Initialize toggle switches for components
 */
function initializeToggleSwitches() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const componentId = this.id.replace('-available', '');
            const detailElements = document.querySelectorAll(`.${componentId}-details`);
            
            detailElements.forEach(element => {
                element.style.display = this.checked ? 'block' : 'none';
            });
        });
        
        // Trigger change event to set initial state
        toggle.dispatchEvent(new Event('change'));
    });
}

/**
 * Initialize photo buttons for components
 */
function initializePhotoButtons() {
    const photoButtons = document.querySelectorAll('.photo-btn');
    const photoModal = document.getElementById('photo-modal');
    const photoPreview = document.getElementById('photo-preview');
    const previewImage = document.getElementById('preview-image');
    const cameraView = document.getElementById('camera-view');
    const accessCameraBtn = document.getElementById('access-camera');
    const takePhotoBtn = document.getElementById('take-photo');
    const retakePhotoBtn = document.getElementById('retake-photo');
    const savePhotoBtn = document.getElementById('save-photo');
    const cancelPhotoBtn = document.getElementById('cancel-photo');
    const photoFileInput = document.getElementById('photo-file-input');
    
    let currentComponentId = null;
    let stream = null;
    
    photoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const componentId = this.getAttribute('data-component');
            const action = this.getAttribute('data-action');
            currentComponentId = componentId;
            
            // Reset the modal state
            photoPreview.style.display = 'none';
            cameraView.querySelector('.camera-placeholder').style.display = 'flex';
            if (stream) {
                stopCameraStream();
            }
            
            photoModal.style.display = 'flex';
            
            // If action is take, focus on camera tab
            if (action === 'take') {
                accessCameraBtn.click();
            }
        });
    });
    
    // Access camera button
    accessCameraBtn.addEventListener('click', function() {
        // Check if browser supports getUserMedia
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(mediaStream) {
                    stream = mediaStream;
                    
                    // Create video element for camera preview
                    const video = document.createElement('video');
                    video.srcObject = mediaStream;
                    video.id = 'camera-preview';
                    video.autoplay = true;
                    video.style.width = '100%';
                    video.style.height = '100%';
                    
                    // Replace placeholder with video
                    cameraView.innerHTML = '';
                    cameraView.appendChild(video);
                    
                    // Enable take photo button
                    takePhotoBtn.disabled = false;
                })
                .catch(function(error) {
                    console.error('Error accessing camera:', error);
                    showNotification('Could not access camera. Please check permissions.', 'error');
                });
        } else {
            showNotification('Your browser does not support camera access.', 'error');
        }
    });
    
    // Take photo button
    takePhotoBtn.addEventListener('click', function() {
        if (!stream) return;
        
        const video = document.getElementById('camera-preview');
        
        // Create canvas to capture the photo
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get image data URL
        const imageDataUrl = canvas.toDataURL('image/png');
        
        // Display preview
        previewImage.src = imageDataUrl;
        photoPreview.style.display = 'block';
        
        // Hide camera view, show retake button
        takePhotoBtn.style.display = 'none';
        retakePhotoBtn.style.display = 'inline-block';
    });
    
    // Retake photo button
    retakePhotoBtn.addEventListener('click', function() {
        photoPreview.style.display = 'none';
        takePhotoBtn.style.display = 'inline-block';
        retakePhotoBtn.style.display = 'none';
    });
    
    // Photo file input change
    photoFileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                photoPreview.style.display = 'block';
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    // Save photo button
    savePhotoBtn.addEventListener('click', function() {
        const componentPhotosContainer = document.getElementById(`${currentComponentId}-photos`);
        
        if (!componentPhotosContainer) {
            console.error(`Component photos container for ${currentComponentId} not found`);
            return;
        }
        
        const photoCaption = document.getElementById('photo-caption').value;
        
        // Create photo thumbnail
        const photoDiv = document.createElement('div');
        photoDiv.className = 'component-photo-thumbnail';
        
        const photoImg = document.createElement('img');
        photoImg.src = previewImage.src;
        photoImg.alt = photoCaption || `${currentComponentId} photo`;
        photoImg.className = 'component-photo';
        
        photoDiv.appendChild(photoImg);
        
        if (photoCaption) {
            const captionSpan = document.createElement('span');
            captionSpan.className = 'photo-caption';
            captionSpan.textContent = photoCaption;
            photoDiv.appendChild(captionSpan);
        }
        
        componentPhotosContainer.appendChild(photoDiv);
        
        // Close modal
        photoModal.style.display = 'none';
        
        // Reset state
        photoPreview.style.display = 'none';
        document.getElementById('photo-caption').value = '';
        
        if (stream) {
            stopCameraStream();
        }
        
        showNotification('Photo added successfully!');
    });
    
    // Cancel photo button
    cancelPhotoBtn.addEventListener('click', function() {
        photoModal.style.display = 'none';
        photoPreview.style.display = 'none';
        
        if (stream) {
            stopCameraStream();
        }
    });
    
    // Helper function to stop camera stream
    function stopCameraStream() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
            
            // Reset camera view
            const cameraPlaceholder = document.createElement('div');
            cameraPlaceholder.className = 'camera-placeholder';
            cameraPlaceholder.innerHTML = '<i class="fas fa-camera"></i><p>Camera preview will appear here</p>';
            
            cameraView.innerHTML = '';
            cameraView.appendChild(cameraPlaceholder);
            
            takePhotoBtn.disabled = true;
            takePhotoBtn.style.display = 'inline-block';
            retakePhotoBtn.style.display = 'none';
        }
    }
}

/**
 * Initialize payee type selection
 */
function initializePayeeTypeSelection() {
    const payeeTypes = document.querySelectorAll('input[name="payee-type"]');
    const individualPayeeForm = document.getElementById('individual-payee-form');
    const businessPayeeForm = document.getElementById('business-payee-form');
    const insurancePayeeForm = document.getElementById('insurance-payee-form');
    
    payeeTypes.forEach(radioBtn => {
        radioBtn.addEventListener('change', function() {
            // Hide all forms
            individualPayeeForm.style.display = 'none';
            businessPayeeForm.style.display = 'none';
            insurancePayeeForm.style.display = 'none';
            
            // Show selected form
            switch (this.value) {
                case 'individual':
                    individualPayeeForm.style.display = 'block';
                    break;
                case 'business':
                    businessPayeeForm.style.display = 'block';
                    break;
                case 'insurance':
                    insurancePayeeForm.style.display = 'block';
                    break;
            }
        });
    });
    
    // Show the initial selected form
    const initialSelectedType = document.querySelector('input[name="payee-type"]:checked');
    if (initialSelectedType) {
        initialSelectedType.dispatchEvent(new Event('change'));
    }
}

/**
 * Initialize existing vehicle search functionality
 */
function initializeExistingVehicleSearch() {
    const searchExistingBtn = document.getElementById('search-existing-btn');
    const selectedVehicleDetails = document.getElementById('selected-vehicle-details');
    const searchResultsContainer = document.getElementById('search-results-container');
    
    // Select vehicle buttons
    const selectVehicleButtons = document.querySelectorAll('.select-vehicle-btn');
    
    selectVehicleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hide search results, show vehicle details
            selectedVehicleDetails.style.display = 'block';
            
            // Get the selected vehicle information
            const vehicleInfo = this.previousElementSibling;
            const makeModel = vehicleInfo.querySelector('h4').textContent;
            const licensePlate = vehicleInfo.querySelector('p:nth-child(2)').textContent.split(':')[1].trim();
            const owner = vehicleInfo.querySelector('p:nth-child(3)').textContent.split(':')[1].trim();
            
            // Populate the selected vehicle details
            document.getElementById('summary-make-model').textContent = makeModel;
            document.getElementById('summary-license-plate').textContent = licensePlate;
            document.getElementById('summary-owner-name').textContent = owner;
            
            // Enable the next button
            document.getElementById('step2-next').disabled = false;
        });
    });
    
    // Search button functionality
    searchExistingBtn.addEventListener('click', function() {
        const licensePlate = document.getElementById('search-license-plate').value;
        const ownerName = document.getElementById('search-owner-name').value;
        const lastService = document.getElementById('search-last-service').value;
        
        // Here you would typically perform an API call to search for vehicles
        // For demo purposes, we'll just show a notification
        
        if (!licensePlate && !ownerName && !lastService) {
            showNotification('Please enter at least one search criteria.', 'warning');
            return;
        }
        
        showNotification('Searching for vehicles...', 'info');
        
        // Simulate search delay
        setTimeout(() => {
            // Scroll to results
            searchResultsContainer.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });
    
    // Edit owner details button
    const editOwnerBtn = document.getElementById('edit-owner-btn');
    
    editOwnerBtn.addEventListener('click', function() {
        showNotification('Owner details are now editable.');
        
        // Here you would make the owner details editable
        // For demo purposes, we'll just show a notification
    });
}

/**
 * Add a new additional component to the list
 */
function addAdditionalComponent() {
    const additionalComponentsList = document.getElementById('additional-components-list');
    
    // Generate a unique ID for the new component
    const componentId = 'additional-comp-' + (additionalComponentsList.children.length + 1);
    
    // Create component HTML
    const componentHtml = `
        <div class="additional-component-item">
            <div class="component-header">
                <input type="text" class="component-name" placeholder="Component Name">
                <button class="btn-icon remove-component-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="component-details">
                <div class="form-row">
                    <div class="form-group">
                        <label>Availability</label>
                        <div class="toggle-switch">
                            <input type="checkbox" id="${componentId}-available" checked>
                            <label for="${componentId}-available" class="toggle-label">
                                <span class="toggle-inner"></span>
                                <span class="toggle-switch-label">Available</span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="${componentId}-manufacturer">Manufacturer</label>
                        <input type="text" id="${componentId}-manufacturer" placeholder="Manufacturer">
                    </div>
                    
                    <div class="form-group">
                        <label for="${componentId}-qty">Quantity/Size</label>
                        <input type="text" id="${componentId}-qty" placeholder="Quantity or Size">
                    </div>
                    
                    <div class="form-group">
                        <label for="${componentId}-serial">Serial Number</label>
                        <input type="text" id="${componentId}-serial" placeholder="Serial Number">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="${componentId}-condition">Condition</label>
                        <select id="${componentId}-condition">
                            <option value="excellent">Excellent</option>
                            <option value="good" selected>Good</option>
                            <option value="fair">Fair</option>
                            <option value="poor">Poor</option>
                            <option value="non-functional">Non-functional</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="${componentId}-info">Additional Information</label>
                    <textarea id="${componentId}-info" rows="2" placeholder="Additional notes..."></textarea>
                </div>
                
                <div class="photo-actions">
                    <button class="btn-secondary photo-btn" data-component="${componentId}" data-action="take">
                        <i class="fas fa-camera"></i> Take Photo
                    </button>
                    <button class="btn-secondary photo-btn" data-component="${componentId}" data-action="upload">
                        <i class="fas fa-upload"></i> Upload Photo
                    </button>
                    <div class="component-photos" id="${componentId}-photos">
                        <!-- Photos will be dynamically added here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Create a temporary div to hold the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = componentHtml.trim();
    
    // Get the component element
    const componentElement = tempDiv.firstChild;
    
    // Add event listener to remove button
    const removeButton = componentElement.querySelector('.remove-component-btn');
    removeButton.addEventListener('click', function() {
        componentElement.remove();
    });
    
    // Add event listeners to photo buttons
    const photoButtons = componentElement.querySelectorAll('.photo-btn');
    photoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const componentId = this.getAttribute('data-component');
            const action = this.getAttribute('data-action');
            
            // Show photo modal
            const photoModal = document.getElementById('photo-modal');
            photoModal.style.display = 'flex';
            
            // Set current component ID for photo saving
            currentComponentId = componentId;
        });
    });
    
    // Add event listener to toggle switch
    const toggleSwitch = componentElement.querySelector(`#${componentId}-available`);
    toggleSwitch.addEventListener('change', function() {
        const detailElements = componentElement.querySelectorAll('.component-details .form-row, .component-details .form-group, .component-details .photo-actions');
        detailElements.forEach(element => {
            if (!element.contains(this.parentElement)) {
                element.style.display = this.checked ? 'flex' : 'none';
            }
        });
    });
    
    // Append component to list
    additionalComponentsList.appendChild(componentElement);
    
    // Initialize toggle switch
    toggleSwitch.dispatchEvent(new Event('change'));
}

/**
 * Populate review data from form inputs
 */
function populateReviewData() {
    // Determine which vehicle form is active
    const isNewVehicle = document.querySelector('.new-vehicle-form').style.display === 'block';
    
    // Vehicle details
    if (isNewVehicle) {
        // Get data from new vehicle form
        const make = document.getElementById('vehicle-make').options[document.getElementById('vehicle-make').selectedIndex]?.text || '';
        const model = document.getElementById('vehicle-model').options[document.getElementById('vehicle-model').selectedIndex]?.text || '';
        const year = document.getElementById('vehicle-year').value;
        const licensePlate = document.getElementById('license-plate').value;
        const vin = document.getElementById('vehicle-vin').value;
        const mileage = document.getElementById('current-mileage').value;
        const serviceType = document.getElementById('service-type').options[document.getElementById('service-type').selectedIndex]?.text || '';
        
        // Set review values
        document.getElementById('review-make-model').textContent = `${make} ${model}`;
        document.getElementById('review-year').textContent = year;
        document.getElementById('review-license-plate').textContent = licensePlate;
        document.getElementById('review-vin').textContent = vin;
        document.getElementById('review-mileage').textContent = `${formatNumber(mileage)} km`;
        document.getElementById('review-service-type').textContent = serviceType;
        
        // Owner information
        const ownerName = document.getElementById('owner-name').value;
        const ownerPhone = document.getElementById('owner-phone').value;
        const ownerEmail = document.getElementById('owner-email').value;
        
        document.getElementById('review-owner-name').textContent = ownerName;
        document.getElementById('review-owner-phone').textContent = ownerPhone;
        document.getElementById('review-owner-email').textContent = ownerEmail;
    } else {
        // Use data from existing vehicle form
        // This would typically be pre-populated in a real application
    }
    
    // Payee information
    const payeeType = document.querySelector('input[name="payee-type"]:checked').value;
    let payeeName = '';
    let payeeContact = '';
    
    document.getElementById('review-payee-type').textContent = capitalizeFirstLetter(payeeType);
    
    switch (payeeType) {
        case 'individual':
            payeeName = document.getElementById('individual-name').value;
            payeeContact = document.getElementById('individual-phone').value;
            break;
        case 'business':
            payeeName = document.getElementById('business-name').value;
            payeeContact = document.getElementById('business-phone').value;
            break;
        case 'insurance':
            payeeName = document.getElementById('insurance-provider').options[document.getElementById('insurance-provider').selectedIndex]?.text || '';
            payeeContact = document.getElementById('contact-phone').value;
            break;
    }
    
    document.getElementById('review-payee-name').textContent = payeeName;
    document.getElementById('review-payee-contact').textContent = payeeContact;
    
    // Set current date and time for check-in
    const today = new Date();
    document.getElementById('checkin-date').valueAsDate = today;
    
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    document.getElementById('checkin-time').value = `${hours}:${minutes}`;
}

/**
 * Show a notification to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning, info)
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${getIconForType(type)}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Add close button event
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

/**
 * Get the appropriate icon for notification type
 * @param {string} type - The notification type
 * @returns {string} - The icon class
 */
function getIconForType(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        case 'info':
            return 'fa-info-circle';
        default:
            return 'fa-info-circle';
    }
}

/**
 * Format number with commas
 * @param {number|string} number - The number to format
 * @returns {string} - The formatted number
 */
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Capitalize the first letter of a string
 * @param {string} string - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}