// check_out.js - Vehicle Check-Out functionality for CarPal by Citrus

document.addEventListener('DOMContentLoaded', function() {
    // Global variables for tracking the current state
    let currentVehicleId = null;
    let selectedParts = [];
    let uploadedPhotos = [];
    let cameraStream = null;

    // Initialize UI components and event listeners
    initUI();

    // Main function to initialize UI and event listeners
    function initUI() {
        // Initialize the sidebar and toggle functionality
        initSidebar();
        
        // Initialize dropdown menus
        initDropdowns();
        
        // Initialize dark mode toggle
        initDarkMode();
        
        // Initialize search functionality
        initSearchFunctionality();
        
        // Initialize vehicle selection and check-out flow
        initVehicleCheckOut();
        
        // Initialize modals
        initModals();
    }

    // Sidebar functionality
    function initSidebar() {
        // This would handle sidebar collapse/expand if needed
    }

    // Initialize dropdowns (notifications and profile)
    function initDropdowns() {
        const notificationsIcon = document.querySelector('.notifications i');
        const profileIcon = document.querySelector('.user-profile img');
        const notificationsDropdown = document.querySelector('.notifications-dropdown');
        const profileDropdown = document.querySelector('.profile-dropdown');

        // Toggle notifications dropdown
        if (notificationsIcon) {
            notificationsIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                notificationsDropdown.style.display = notificationsDropdown.style.display === 'block' ? 'none' : 'block';
                
                // Hide other dropdowns
                if (profileDropdown) {
                    profileDropdown.style.display = 'none';
                }
            });
        }

        // Toggle profile dropdown
        if (profileIcon) {
            profileIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
                
                // Hide other dropdowns
                if (notificationsDropdown) {
                    notificationsDropdown.style.display = 'none';
                }
            });
        }

        // Close dropdowns when clicking elsewhere
        document.addEventListener('click', function() {
            if (notificationsDropdown) {
                notificationsDropdown.style.display = 'none';
            }
            if (profileDropdown) {
                profileDropdown.style.display = 'none';
            }
        });
    }

    // Dark mode toggle
    function initDarkMode() {
        const themeToggle = document.querySelector('.theme-toggle i');
        
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                
                // Update icon
                if (document.body.classList.contains('dark-mode')) {
                    themeToggle.classList.remove('fa-moon');
                    themeToggle.classList.add('fa-sun');
                } else {
                    themeToggle.classList.remove('fa-sun');
                    themeToggle.classList.add('fa-moon');
                }
                
                // Save preference to localStorage
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });
            
            // Check if dark mode preference exists
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
                themeToggle.classList.remove('fa-moon');
                themeToggle.classList.add('fa-sun');
            }
        }
    }

    // Initialize search functionality
    function initSearchFunctionality() {
        const searchVehicleBtn = document.getElementById('search-vehicle-btn');
        const licensePlateInput = document.getElementById('license-plate');
        const customerNameInput = document.getElementById('customer-name');
        const dateFromInput = document.getElementById('date-from');
        const dateToInput = document.getElementById('date-to');
        
        if (searchVehicleBtn) {
            searchVehicleBtn.addEventListener('click', function() {
                // Get search values
                const licensePlate = licensePlateInput ? licensePlateInput.value.trim() : '';
                const customerName = customerNameInput ? customerNameInput.value.trim() : '';
                const dateFrom = dateFromInput ? dateFromInput.value : '';
                const dateTo = dateToInput ? dateToInput.value : '';
                
                // Perform search (in a real app, this would be an API call)
                searchVehicles(licensePlate, customerName, dateFrom, dateTo);
            });
        }
    }

    // Main vehicle check-out flow
    function initVehicleCheckOut() {
        // Initialize vehicle selection buttons
        initVehicleSelection();
        
        // Initialize check-out form functionality
        initCheckOutForm();
        
        // Initialize review check-out functionality
        initReviewCheckOut();
        
        // Initialize approve check-out functionality
        initApproveCheckOut();
        
        // Initialize post-repair assessment functionality
        initPostRepairAssessment();
        
        // Initialize complete assessment functionality
        initCompleteAssessment();
    }

    // Initialize vehicle selection
    function initVehicleSelection() {
        // Add event listeners to vehicle selection buttons
        const selectVehicleBtns = document.querySelectorAll('.select-vehicle-btn');
        const backToSearchBtn = document.getElementById('back-to-search-btn');
        
        // Select vehicle buttons
        selectVehicleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const vehicleId = this.getAttribute('data-vehicle-id');
                selectVehicle(vehicleId);
            });
        });
        
        // Back to search button
        if (backToSearchBtn) {
            backToSearchBtn.addEventListener('click', function() {
                showSection('search-vehicle-section');
                showSection('vehicle-results-section');
                hideSection('vehicle-details-section');
            });
        }
        
        // Initialize "Initiate Check-Out" button
        const initiateCheckoutBtn = document.getElementById('initiate-checkout-btn');
        if (initiateCheckoutBtn) {
            initiateCheckoutBtn.addEventListener('click', function() {
                hideSection('vehicle-details-section');
                showSection('checkout-form-section');
            });
        }
        
        // Initialize "View Check-In Form" button
        const viewCheckinBtn = document.getElementById('view-checkin-btn');
        if (viewCheckinBtn) {
            viewCheckinBtn.addEventListener('click', function() {
                showModal('checkin-modal');
            });
        }
        
        // Initialize "View Service History" button
        const viewServiceHistoryBtn = document.getElementById('view-service-history-btn');
        if (viewServiceHistoryBtn) {
            viewServiceHistoryBtn.addEventListener('click', function() {
                showModal('service-history-modal');
            });
        }
    }

    // Initialize check-out form functionality
    function initCheckOutForm() {
        // Add Task button
        const addTaskBtn = document.getElementById('add-task-btn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', function() {
                addNewTask();
            });
        }
        
        // Use Parts from Inventory button
        const usePartsBtn = document.getElementById('use-parts-btn');
        if (usePartsBtn) {
            usePartsBtn.addEventListener('click', function() {
                showModal('parts-inventory-modal');
            });
        }
        
        // Photo upload buttons
        const takePhotoBtn = document.getElementById('take-photo-btn');
        const uploadPhotoBtn = document.getElementById('upload-photo-btn');
        
        if (takePhotoBtn) {
            takePhotoBtn.addEventListener('click', function() {
                showModal('photo-upload-modal');
                // Initialize camera tab as active
                document.querySelector('.camera-section').style.display = 'block';
                document.querySelector('.upload-section').style.display = 'none';
            });
        }
        
        if (uploadPhotoBtn) {
            uploadPhotoBtn.addEventListener('click', function() {
                showModal('photo-upload-modal');
                // Initialize upload tab as active
                document.querySelector('.camera-section').style.display = 'none';
                document.querySelector('.upload-section').style.display = 'block';
            });
        }
        
        // Save Draft button
        const saveDraftBtn = document.getElementById('save-draft-btn');
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', function() {
                saveCheckOutDraft();
            });
        }
        
        // Review Form button
        const reviewFormBtn = document.getElementById('review-form-btn');
        if (reviewFormBtn) {
            reviewFormBtn.addEventListener('click', function() {
                hideSection('checkout-form-section');
                populateReviewSection();
                showSection('review-checkout-section');
            });
        }
        
        // Cancel button
        const cancelCheckoutBtn = document.getElementById('cancel-checkout-btn');
        if (cancelCheckoutBtn) {
            cancelCheckoutBtn.addEventListener('click', function() {
                hideSection('checkout-form-section');
                showSection('vehicle-details-section');
            });
        }
    }

    // Initialize review check-out functionality
    function initReviewCheckOut() {
        // Edit Details button
        const editDetailsBtn = document.getElementById('edit-details-btn');
        if (editDetailsBtn) {
            editDetailsBtn.addEventListener('click', function() {
                hideSection('review-checkout-section');
                showSection('checkout-form-section');
            });
        }
        
        // Add More Photos button
        const addPhotosBtn = document.getElementById('add-photos-btn');
        if (addPhotosBtn) {
            addPhotosBtn.addEventListener('click', function() {
                showModal('photo-upload-modal');
            });
        }
        
        // Approve Check-Out button
        const approveCheckoutBtn = document.getElementById('approve-checkout-btn');
        if (approveCheckoutBtn) {
            approveCheckoutBtn.addEventListener('click', function() {
                hideSection('review-checkout-section');
                showSection('approve-checkout-section');
                
                // Set current date/time in the checkout date field
                const checkoutDateField = document.getElementById('checkout-date');
                if (checkoutDateField) {
                    const now = new Date();
                    const formattedDate = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm
                    checkoutDateField.value = formattedDate;
                }
            });
        }
        
        // Return to Edit button
        const returnToEditBtn = document.getElementById('return-to-edit-btn');
        if (returnToEditBtn) {
            returnToEditBtn.addEventListener('click', function() {
                hideSection('review-checkout-section');
                showSection('checkout-form-section');
            });
        }
    }

    // Initialize approve check-out functionality
    function initApproveCheckOut() {
        // Manual override checkbox
        const manualOverrideCheckbox = document.getElementById('manual-override');
        const checkoutDateField = document.getElementById('checkout-date');
        
        if (manualOverrideCheckbox && checkoutDateField) {
            manualOverrideCheckbox.addEventListener('change', function() {
                checkoutDateField.readOnly = !this.checked;
            });
        }
        
        // Complete Check-Out button
        const completeCheckoutBtn = document.getElementById('complete-checkout-btn');
        if (completeCheckoutBtn) {
            completeCheckoutBtn.addEventListener('click', function() {
                hideSection('approve-checkout-section');
                showSection('post-repair-section');
                
                // Pre-fill post-repair assessment form with vehicle data
                populatePostRepairForm();
            });
        }
        
        // Back button
        const backToReviewBtn = document.getElementById('back-to-review-btn');
        if (backToReviewBtn) {
            backToReviewBtn.addEventListener('click', function() {
                hideSection('approve-checkout-section');
                showSection('review-checkout-section');
            });
        }
        
        // Checkin form link
        const checkinFormLink = document.getElementById('checkin-form-link');
        if (checkinFormLink) {
            checkinFormLink.addEventListener('click', function(e) {
                e.preventDefault();
                showModal('checkin-modal');
            });
        }
    }

    // Initialize post-repair assessment functionality
    function initPostRepairAssessment() {
        // Send OTP button
        const sendOtpBtn = document.getElementById('send-otp-btn');
        if (sendOtpBtn) {
            sendOtpBtn.addEventListener('click', function() {
                sendOTP();
            });
        }
        
        // Complete Assessment button
        const completeAssessmentBtn = document.getElementById('complete-assessment-btn');
        if (completeAssessmentBtn) {
            completeAssessmentBtn.addEventListener('click', function() {
                // Validate required fields before proceeding
                if (validatePostRepairForm()) {
                    hideSection('post-repair-section');
                    showSection('complete-assessment-section');
                }
            });
        }
        
        // Back button
        const backFromAssessmentBtn = document.getElementById('back-from-assessment-btn');
        if (backFromAssessmentBtn) {
            backFromAssessmentBtn.addEventListener('click', function() {
                hideSection('post-repair-section');
                showSection('approve-checkout-section');
            });
        }
    }

    // Initialize complete assessment functionality
    function initCompleteAssessment() {
        // Return to Dashboard button
        const returnToDashboardBtn = document.getElementById('return-to-dashboard-btn');
        if (returnToDashboardBtn) {
            returnToDashboardBtn.addEventListener('click', function() {
                window.location.href = "C:/Users/nderu/Documents/Development/Product/CarPal/CarPal Auto Repair Shop 3.0/Dashboard/dashboard.html";
            });
        }
        
        // Check-Out Another Vehicle button
        const checkoutAnotherBtn = document.getElementById('checkout-another-btn');
        if (checkoutAnotherBtn) {
            checkoutAnotherBtn.addEventListener('click', function() {
                resetCheckOutFlow();
                showSection('search-vehicle-section');
                showSection('vehicle-results-section');
                hideSection('complete-assessment-section');
            });
        }
        
        // View Vehicle History button
        const viewVehicleHistoryBtn = document.getElementById('view-vehicle-history-btn');
        if (viewVehicleHistoryBtn) {
            viewVehicleHistoryBtn.addEventListener('click', function() {
                window.location.href = "C:/Users/nderu/Documents/Development/Product/CarPal/CarPal Auto Repair Shop 3.0/Vehicle History/history.html";
            });
        }
    }

    // Initialize modal functionality
    function initModals() {
        // Close buttons for all modals
        const closeButtons = document.querySelectorAll('.close-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    hideModal(modal.id);
                }
            });
        });
        
        // Initialize parts inventory modal
        initPartsInventoryModal();
        
        // Initialize photo upload modal
        initPhotoUploadModal();
    }

    // Initialize parts inventory modal
    function initPartsInventoryModal() {
        // Part selection checkboxes
        const partCheckboxes = document.querySelectorAll('.part-select');
        partCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateSelectedPartsList();
            });
        });
        
        // Quantity inputs
        const qtyInputs = document.querySelectorAll('.qty-input');
        qtyInputs.forEach(input => {
            input.addEventListener('change', function() {
                updateSelectedPartsList();
            });
        });
        
        // Search parts button
        const searchPartsBtn = document.getElementById('search-parts-btn');
        if (searchPartsBtn) {
            searchPartsBtn.addEventListener('click', function() {
                searchParts();
            });
        }
        
        // Confirm parts button
        const confirmPartsBtn = document.getElementById('confirm-parts-btn');
        if (confirmPartsBtn) {
            confirmPartsBtn.addEventListener('click', function() {
                confirmSelectedParts();
            });
        }
        
        // Cancel parts button
        const cancelPartsBtn = document.getElementById('cancel-parts-btn');
        if (cancelPartsBtn) {
            cancelPartsBtn.addEventListener('click', function() {
                hideModal('parts-inventory-modal');
            });
        }
        
        // Return to form button in inventory update modal
        const returnToFormBtn = document.getElementById('return-to-form-btn');
        if (returnToFormBtn) {
            returnToFormBtn.addEventListener('click', function() {
                hideModal('inventory-update-modal');
            });
        }
    }

    // Initialize photo upload modal
    function initPhotoUploadModal() {
        // Start camera button
        const startCameraBtn = document.getElementById('start-camera-btn');
        if (startCameraBtn) {
            startCameraBtn.addEventListener('click', function() {
                startCamera();
            });
        }
        
        // Capture photo button
        const capturePhotoBtn = document.getElementById('capture-photo-btn');
        if (capturePhotoBtn) {
            capturePhotoBtn.addEventListener('click', function() {
                capturePhoto();
            });
        }
        
        // Retake photo button
        const retakePhotoBtn = document.getElementById('retake-photo-btn');
        if (retakePhotoBtn) {
            retakePhotoBtn.addEventListener('click', function() {
                startCamera();
            });
        }
        
        // Upload area
        const uploadArea = document.getElementById('upload-area');
        const fileUpload = document.getElementById('file-upload');
        
        if (uploadArea && fileUpload) {
            uploadArea.addEventListener('click', function() {
                fileUpload.click();
            });
            
            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.add('drag-over');
            });
            
            uploadArea.addEventListener('dragleave', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.remove('drag-over');
            });
            
            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.remove('drag-over');
                
                if (e.dataTransfer.files.length) {
                    fileUpload.files = e.dataTransfer.files;
                    handleFileUpload(e.dataTransfer.files[0]);
                }
            });
            
            fileUpload.addEventListener('change', function() {
                if (this.files.length) {
                    handleFileUpload(this.files[0]);
                }
            });
        }
        
        // Save photo button
        const savePhotoBtn = document.getElementById('save-photo-btn');
        if (savePhotoBtn) {
            savePhotoBtn.addEventListener('click', function() {
                saveUploadedPhoto();
            });
        }
        
        // Cancel photo button
        const cancelPhotoBtn = document.getElementById('cancel-photo-btn');
        if (cancelPhotoBtn) {
            cancelPhotoBtn.addEventListener('click', function() {
                hideModal('photo-upload-modal');
                
                // If there's an active camera stream, stop it
                if (cameraStream) {
                    const tracks = cameraStream.getTracks();
                    tracks.forEach(track => track.stop());
                    cameraStream = null;
                }
            });
        }
    }

    // Search vehicles (simulate API call)
    function searchVehicles(licensePlate, customerName, dateFrom, dateTo) {
        // In a real app, this would make an API call to search for vehicles
        console.log('Searching for vehicles with criteria:', { licensePlate, customerName, dateFrom, dateTo });
        
        // For demo purposes, we'll just show the results section
        showSection('vehicle-results-section');
        
        // If needed, populate the table with search results
        // Simulated for the demo using existing data
    }

    // Select a vehicle for check-out
    function selectVehicle(vehicleId) {
        // Set the current vehicle ID
        currentVehicleId = vehicleId;
        
        // Hide search sections
        hideSection('search-vehicle-section');
        hideSection('vehicle-results-section');
        
        // Show vehicle details section
        showSection('vehicle-details-section');
        
        // Fetch and display vehicle details (simulated)
        fetchVehicleDetails(vehicleId);
    }

    // Fetch vehicle details (simulated)
    function fetchVehicleDetails(vehicleId) {
        // In a real app, this would fetch data from an API
        console.log('Fetching details for vehicle ID:', vehicleId);
        
        // Simulate different vehicles based on ID
        let vehicleData;
        
        switch(vehicleId) {
            case 'V001':
                vehicleData = {
                    licensePlate: 'KDG458Y',
                    makeModel: 'Toyota Camry',
                    year: '2020',
                    vin: '4T1BF1FK5LU123456',
                    checkinDate: 'Mar 23, 2025 09:15 AM',
                    serviceStatus: 'Completed',
                    serviceType: 'Brake Replacement, Oil Change',
                    repairOrder: 'RO-10542',
                    customerName: 'John Smith',
                    customerPhone: '(555) 123-4567',
                    customerEmail: 'john.smith@example.com'
                };
                break;
            case 'V002':
                vehicleData = {
                    licensePlate: 'KCY567K',
                    makeModel: 'Honda CR-V',
                    year: '2019',
                    vin: '5J6RW1H85KL003421',
                    checkinDate: 'Mar 22, 2025 11:30 AM',
                    serviceStatus: 'Completed',
                    serviceType: 'Transmission Service, Tire Rotation',
                    repairOrder: 'RO-10541',
                    customerName: 'Sarah Davis',
                    customerPhone: '(555) 234-5678',
                    customerEmail: 'sarah.davis@example.com'
                };
                break;
            case 'V003':
                vehicleData = {
                    licensePlate: 'KDL891M',
                    makeModel: 'Ford F-150',
                    year: '2021',
                    vin: '1FTEW1EP7MKE12345',
                    checkinDate: 'Mar 20, 2025 02:45 PM',
                    serviceStatus: 'In Service',
                    serviceType: 'Engine Diagnostic, Suspension Repair',
                    repairOrder: 'RO-10540',
                    customerName: 'Michael Chen',
                    customerPhone: '(555) 345-6789',
                    customerEmail: 'michael.chen@example.com'
                };
                break;
            case 'V004':
                vehicleData = {
                    licensePlate: 'KBT234P',
                    makeModel: 'BMW X5',
                    year: '2022',
                    vin: 'WBAKJ4C55MCH12345',
                    checkinDate: 'Mar 19, 2025 10:00 AM',
                    serviceStatus: 'Completed',
                    serviceType: 'ABS Service, Brake Fluid Flush',
                    repairOrder: 'RO-10539',
                    customerName: 'Emily Johnson',
                    customerPhone: '(555) 456-7890',
                    customerEmail: 'emily.johnson@example.com'
                };
                break;
            default:
                vehicleData = {
                    licensePlate: 'Unknown',
                    makeModel: 'Unknown',
                    year: 'Unknown',
                    vin: 'Unknown',
                    checkinDate: 'Unknown',
                    serviceStatus: 'Unknown',
                    serviceType: 'Unknown',
                    repairOrder: 'Unknown',
                    customerName: 'Unknown',
                    customerPhone: 'Unknown',
                    customerEmail: 'Unknown'
                };
        }
        
        // Populate the vehicle details in the UI
        document.getElementById('summary-license-plate').textContent = vehicleData.licensePlate;
        document.getElementById('summary-make-model').textContent = vehicleData.makeModel;
        document.getElementById('summary-year').textContent = vehicleData.year;
        document.getElementById('summary-vin').textContent = vehicleData.vin;
        document.getElementById('summary-checkin-date').textContent = vehicleData.checkinDate;
        document.getElementById('summary-service-status').textContent = vehicleData.serviceStatus;
        document.getElementById('summary-service-type').textContent = vehicleData.serviceType;
        document.getElementById('summary-repair-order').textContent = vehicleData.repairOrder;
        document.getElementById('summary-customer-name').textContent = vehicleData.customerName;
        document.getElementById('summary-customer-phone').textContent = vehicleData.customerPhone;
        document.getElementById('summary-customer-email').textContent = vehicleData.customerEmail;
        
        // Update class for service status
        const statusElement = document.getElementById('summary-service-status');
        if (statusElement) {
            statusElement.className = '';
            if (vehicleData.serviceStatus === 'Completed') {
                statusElement.classList.add('status-completed');
            } else if (vehicleData.serviceStatus === 'In Service') {
                statusElement.classList.add('status-in-service');
            }
        }
    }

    // Add a new task to the service tasks list
    function addNewTask() {
        const tasksList = document.getElementById('service-tasks-list');
        const taskCount = tasksList.querySelectorAll('.task-item').length;
        const newTaskId = 'task-' + (taskCount + 1);
        
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = newTaskId;
        checkbox.checked = true;
        
        const label = document.createElement('label');
        label.htmlFor = newTaskId;
        label.textContent = 'New task (click to edit)';
        label.contentEditable = true;
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);
        
        tasksList.appendChild(taskItem);
        
        // Focus on the new label for editing
        label.focus();
    }

    // Save check-out draft
    function saveCheckOutDraft() {
        // In a real app, this would save the form data to a database
        showNotification('Check-out form draft saved successfully', 'success');
    }

    // Populate the review section with form data
    function populateReviewSection() {
        // Vehicle information
        document.getElementById('review-license-plate').textContent = document.getElementById('summary-license-plate').textContent;
        document.getElementById('review-make-model').textContent = 
            document.getElementById('summary-make-model').textContent + ' (' + document.getElementById('summary-year').textContent + ')';
        document.getElementById('review-vin').textContent = document.getElementById('summary-vin').textContent;
        document.getElementById('review-customer').textContent = document.getElementById('summary-customer-name').textContent;
        
        // Service details
        // Get completed tasks
        const tasksHTML = Array.from(document.querySelectorAll('#service-tasks-list .task-item'))
            .filter(task => task.querySelector('input[type="checkbox"]').checked)
            .map(task => `<li>${task.querySelector('label').textContent}</li>`)
            .join('');
        
        document.getElementById('review-tasks').innerHTML = tasksHTML;
        
        // Get parts replaced
        const partsHTML = Array.from(document.querySelectorAll('#parts-replaced-list .part-item'))
            .map(part => `<li>${part.querySelector('.part-name').textContent}</li>`)
            .join('');
        
        document.getElementById('review-parts').innerHTML = partsHTML;
        
        // Additional services
        document.getElementById('review-additional-services').textContent = 
            document.getElementById('additional-services').value || 'No additional services provided.';
        
        // Service notes
        document.getElementById('review-service-notes').textContent = 
            document.getElementById('completion-notes').value || 'No service notes provided.';
        
        // Vehicle condition
        document.getElementById('review-exterior').textContent = 
            document.getElementById('exterior-condition').value || 'Minor scratch on front passenger door (pre-existing)';
        document.getElementById('review-interior').textContent = 
            document.getElementById('interior-condition').value || 'Good condition, no issues';
        document.getElementById('review-mileage').textContent = 
            document.getElementById('current-mileage').value ? document.getElementById('current-mileage').value + ' km' : '35,704 km';
        
        // Photos
        const reviewPhotosContainer = document.getElementById('review-photos');
        reviewPhotosContainer.innerHTML = '';
        
        if (uploadedPhotos.length > 0) {
            uploadedPhotos.forEach(photo => {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                
                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = photo.description;
                
                const caption = document.createElement('span');
                caption.className = 'photo-caption';
                caption.textContent = photo.description;
                
                photoItem.appendChild(img);
                photoItem.appendChild(caption);
                
                reviewPhotosContainer.appendChild(photoItem);
            });
        } else {
            // Add default photos if none were uploaded
            reviewPhotosContainer.innerHTML = `
                <div class="photo-item">
                    <img src="/api/placeholder/200/150" alt="Front Brakes">
                    <span class="photo-caption">Front Brakes - After Repair</span>
                </div>
                <div class="photo-item">
                    <img src="/api/placeholder/200/150" alt="Vehicle Exterior">
                    <span class="photo-caption">Vehicle Exterior - Front</span>
                </div>
            `;
        }
    }

    // Populate the post-repair assessment form
    function populatePostRepairForm() {
        // Vehicle & Business information
        document.getElementById('pra-vehicle').value = document.getElementById('summary-make-model').textContent + 
            ' (' + document.getElementById('summary-year').textContent + ') - ' + 
            document.getElementById('summary-license-plate').textContent;
        
        document.getElementById('pra-business-user').value = 'Admin User (admin@carpal.com)';
        
        document.getElementById('pra-repair-order').value = document.getElementById('summary-repair-order').textContent;
        
        const checkinDate = document.getElementById('summary-checkin-date').textContent;
        const checkoutDate = document.getElementById('checkout-date').value;
        const formattedCheckoutDate = new Date(checkoutDate).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        document.getElementById('pra-checkin-checkout').value = `${checkinDate} to ${formattedCheckoutDate}`;
        
        document.getElementById('pra-customer').value = document.getElementById('summary-customer-name').textContent + 
            ' | ' + document.getElementById('summary-customer-phone').textContent + 
            ' | ' + document.getElementById('summary-customer-email').textContent;
        
        // Completed repairs - autofill with tasks from check-out form
        const tasksText = Array.from(document.querySelectorAll('#service-tasks-list .task-item'))
            .filter(task => task.querySelector('input[type="checkbox"]').checked)
            .map(task => task.querySelector('label').textContent)
            .join(', ');
        
        document.getElementById('pra-completed-repairs').value = tasksText;
        
        // Set current timestamp for the photo timestamp field
        const photoTimestamp = document.getElementById('photo-timestamp');
        if (photoTimestamp) {
            const now = new Date();
            photoTimestamp.textContent = now.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }
    }

    // Validate post-repair form
    function validatePostRepairForm() {
        const requiredFields = [
            { id: 'pra-completed-repairs', name: 'Completed Repairs' },
            { id: 'pra-inspection-notes', name: 'Inspection Notes' },
            { id: 'pra-manager', name: 'Service Manager Sign-Off' },
            { id: 'pra-id-number', name: 'Personal ID Number' },
            { id: 'pra-otp', name: 'OTP PIN' }
        ];
        
        let isValid = true;
        let errorMessage = 'Please fill in the following required fields:';
        
        requiredFields.forEach(field => {
            const element = document.getElementById(field.id);
            if (!element || !element.value.trim()) {
                isValid = false;
                errorMessage += `\n- ${field.name}`;
            }
        });
        
        if (!isValid) {
            alert(errorMessage);
        }
        
        return isValid;
    }

    // Reset check-out flow for a new vehicle
    function resetCheckOutFlow() {
        // Reset vehicle ID
        currentVehicleId = null;
        
        // Reset selected parts
        selectedParts = [];
        
        // Reset uploaded photos
        uploadedPhotos = [];
        
        // Hide all sections except search
        hideSection('vehicle-details-section');
        hideSection('checkout-form-section');
        hideSection('review-checkout-section');
        hideSection('approve-checkout-section');
        hideSection('post-repair-section');
        hideSection('complete-assessment-section');
        
        // Reset form fields
        document.querySelectorAll('input, textarea').forEach(field => {
            if (field.type === 'checkbox') {
                field.checked = false;
            } else if (field.type !== 'button' && field.type !== 'submit') {
                field.value = '';
            }
        });
        
        // Reset check-boxes in tasks list
        document.querySelectorAll('#service-tasks-list .task-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
    }

    // Update selected parts list in the parts inventory modal
    function updateSelectedPartsList() {
        const selectedPartsList = document.getElementById('selected-parts-list');
        const noPartsMessage = document.querySelector('.no-parts-message');
        
        // Clear previous list
        selectedParts = [];
        
        // Get checked parts
        const checkedParts = document.querySelectorAll('.part-select:checked');
        
        if (checkedParts.length === 0) {
            if (noPartsMessage) {
                noPartsMessage.style.display = 'block';
            } else {
                selectedPartsList.innerHTML = '<p class="no-parts-message">No parts selected yet</p>';
            }
            return;
        }
        
        // Hide no parts message
        if (noPartsMessage) {
            noPartsMessage.style.display = 'none';
        }
        
        // Create new list HTML
        let partsHTML = '';
        
        checkedParts.forEach(part => {
            const partId = part.getAttribute('data-part-id');
            const row = part.closest('tr');
            
            if (row) {
                const partName = row.cells[1].textContent;
                const partNumber = row.cells[2].textContent;
                const qtyInput = row.querySelector('.qty-input');
                const quantity = qtyInput ? qtyInput.value : 1;
                
                // Add to selected parts array
                selectedParts.push({
                    id: partId,
                    name: partName,
                    number: partNumber,
                    quantity: quantity
                });
                
                // Add to HTML
                partsHTML += `
                    <div class="selected-part-item">
                        <span class="part-name">${partName}</span>
                        <span class="part-details">
                            <span class="part-number">${partNumber}</span>
                            <span class="part-quantity">Qty: ${quantity}</span>
                        </span>
                    </div>
                `;
            }
        });
        
        // Update DOM
        selectedPartsList.innerHTML = partsHTML;
    }

    // Search parts in inventory
    function searchParts() {
        const searchValue = document.getElementById('parts-search').value.toLowerCase();
        
        if (!searchValue) {
            // If search is empty, show all parts
            document.querySelectorAll('#parts-inventory-table tbody tr').forEach(row => {
                row.style.display = '';
            });
            return;
        }
        
        // Filter the table
        document.querySelectorAll('#parts-inventory-table tbody tr').forEach(row => {
            const partName = row.cells[1].textContent.toLowerCase();
            const partId = row.cells[2].textContent.toLowerCase();
            
            if (partName.includes(searchValue) || partId.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Confirm selected parts and add to check-out form
    function confirmSelectedParts() {
        if (selectedParts.length === 0) {
            alert('Please select at least one part.');
            return;
        }
        
        // Update parts replaced list in the check-out form
        const partsReplacedList = document.getElementById('parts-replaced-list');
        
        // Create parts HTML
        let partsHTML = '';
        
        selectedParts.forEach(part => {
            partsHTML += `
                <div class="part-item">
                    <span class="part-name">${part.name}${part.quantity > 1 ? ' (' + part.quantity + ' units)' : ''}</span>
                    <span class="part-id">Part #${part.number}</span>
                </div>
            `;
        });
        
        // Update DOM
        partsReplacedList.innerHTML = partsHTML;
        
        // Hide parts inventory modal
        hideModal('parts-inventory-modal');
        
        // Show inventory update modal
        showModal('inventory-update-modal');
        
        // Populate updated items table
        populateInventoryUpdateTable();
    }

    // Populate inventory update table
    function populateInventoryUpdateTable() {
        const updatedItemsList = document.getElementById('updated-items-list');
        
        if (!updatedItemsList) return;
        
        // Clear previous content
        updatedItemsList.innerHTML = '';
        
        // Add rows for each selected part
        selectedParts.forEach(part => {
            const row = document.createElement('tr');
            
            // Calculate remaining stock (simulated)
            let originalStock = 0;
            const partRows = document.querySelectorAll('#parts-inventory-table tbody tr');
            partRows.forEach(partRow => {
                const partCheckbox = partRow.querySelector('.part-select');
                if (partCheckbox && partCheckbox.getAttribute('data-part-id') === part.id) {
                    originalStock = parseInt(partRow.cells[3].textContent);
                }
            });
            
            const remainingStock = originalStock - part.quantity;
            
            // Create row content
            row.innerHTML = `
                <td>${part.name}</td>
                <td>${part.number}</td>
                <td>${part.quantity}</td>
                <td>${remainingStock}</td>
            `;
            
            updatedItemsList.appendChild(row);
        });
        
        // Show low stock alerts if any
        const lowStockAlerts = document.getElementById('low-stock-alerts');
        
        if (lowStockAlerts) {
            // Check for low stock items (less than 5)
            const lowStockItems = selectedParts.filter(part => {
                let originalStock = 0;
                const partRows = document.querySelectorAll('#parts-inventory-table tbody tr');
                partRows.forEach(partRow => {
                    const partCheckbox = partRow.querySelector('.part-select');
                    if (partCheckbox && partCheckbox.getAttribute('data-part-id') === part.id) {
                        originalStock = parseInt(partRow.cells[3].textContent);
                    }
                });
                
                return (originalStock - part.quantity) < 5;
            });
            
            if (lowStockItems.length > 0) {
                let alertsHTML = `
                    <h3>Low Stock Alerts</h3>
                    <div class="low-stock-items">
                `;
                
                lowStockItems.forEach(item => {
                    let originalStock = 0;
                    const partRows = document.querySelectorAll('#parts-inventory-table tbody tr');
                    partRows.forEach(partRow => {
                        const partCheckbox = partRow.querySelector('.part-select');
                        if (partCheckbox && partCheckbox.getAttribute('data-part-id') === item.id) {
                            originalStock = parseInt(partRow.cells[3].textContent);
                        }
                    });
                    
                    const remaining = originalStock - item.quantity;
                    
                    alertsHTML += `
                        <div class="low-stock-item">
                            <i class="fas fa-exclamation-triangle"></i>
                            <span class="item-name">${item.name}</span>
                            <span class="item-stock">Remaining: ${remaining} units</span>
                        </div>
                    `;
                });
                
                alertsHTML += '</div>';
                
                lowStockAlerts.innerHTML = alertsHTML;
                lowStockAlerts.style.display = 'block';
            } else {
                lowStockAlerts.style.display = 'none';
            }
        }
    }

    // Start camera functionality
    function startCamera() {
        const cameraContainer = document.getElementById('camera-container');
        const startCameraBtn = document.getElementById('start-camera-btn');
        const capturePhotoBtn = document.getElementById('capture-photo-btn');
        const retakePhotoBtn = document.getElementById('retake-photo-btn');
        
        // Check if camera container exists
        if (!cameraContainer) return;
        
        // Clear camera container
        cameraContainer.innerHTML = '';
        
        // Create video element
        const video = document.createElement('video');
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
        video.className = 'camera-video';
        
        cameraContainer.appendChild(video);
        
        // Request camera access
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                cameraStream = stream;
                video.srcObject = stream;
                
                // Enable capture button, disable start button
                if (capturePhotoBtn) capturePhotoBtn.disabled = false;
                if (startCameraBtn) startCameraBtn.disabled = true;
                if (retakePhotoBtn) retakePhotoBtn.disabled = true;
            })
            .catch(function(error) {
                console.error('Error accessing camera:', error);
                cameraContainer.innerHTML = `
                    <div class="camera-error">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Camera access denied or unavailable. Please check permissions or try uploading a photo instead.</p>
                    </div>
                `;
            });
    }

    // Capture photo from camera
    function capturePhoto() {
        const cameraContainer = document.getElementById('camera-container');
        const video = cameraContainer.querySelector('video');
        const capturePhotoBtn = document.getElementById('capture-photo-btn');
        const retakePhotoBtn = document.getElementById('retake-photo-btn');
        
        if (!video || !cameraStream) return;
        
        // Create canvas for the snapshot
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to image
        const imageUrl = canvas.toDataURL('image/png');
        
        // Create image element
        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'captured-image';
        
        // Replace video with image
        cameraContainer.innerHTML = '';
        cameraContainer.appendChild(img);
        
        // Update button states
        if (capturePhotoBtn) capturePhotoBtn.disabled = true;
        if (retakePhotoBtn) retakePhotoBtn.disabled = false;
        
        // Stop camera stream
        const tracks = cameraStream.getTracks();
        tracks.forEach(track => track.stop());
        
        // Store image URL for later use
        cameraContainer.dataset.imageUrl = imageUrl;
    }

    // Handle file upload
    function handleFileUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }
        
        const uploadArea = document.getElementById('upload-area');
        
        // Create file reader
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Create image preview
            uploadArea.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded" class="uploaded-image">
            `;
            
            // Store image URL for later use
            uploadArea.dataset.imageUrl = e.target.result;
        };
        
        // Read file as data URL
        reader.readAsDataURL(file);
    }

    // Save uploaded photo
    function saveUploadedPhoto() {
        const cameraContainer = document.getElementById('camera-container');
        const uploadArea = document.getElementById('upload-area');
        const photoDescription = document.getElementById('photo-description').value;
        const vehicleArea = document.getElementById('vehicle-area').value;
        
        // Get image URL from either camera or upload
        let imageUrl = null;
        
        if (cameraContainer && cameraContainer.dataset.imageUrl) {
            imageUrl = cameraContainer.dataset.imageUrl;
        } else if (uploadArea && uploadArea.dataset.imageUrl) {
            imageUrl = uploadArea.dataset.imageUrl;
        }
        
        if (!imageUrl) {
            alert('No photo captured or uploaded. Please take or upload a photo first.');
            return;
        }
        
        if (!photoDescription) {
            alert('Please enter a description for the photo.');
            return;
        }
        
        // Create photo object
        const photo = {
            url: imageUrl,
            description: photoDescription,
            area: vehicleArea,
            timestamp: new Date().toISOString()
        };
        
        // Add to uploaded photos array
        uploadedPhotos.push(photo);
        
        // Add to the photos grid in the form
        const photosGrid = document.getElementById('uploaded-photos');
        
        if (photosGrid) {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            
            photoItem.innerHTML = `
                <img src="${photo.url}" alt="${photo.description}">
                <div class="photo-info">
                    <span class="photo-description">${photo.description}</span>
                    ${photo.area ? `<span class="photo-area">${document.querySelector('#vehicle-area option[value="' + photo.area + '"]').textContent}</span>` : ''}
                </div>
                <button class="remove-photo-btn" data-index="${uploadedPhotos.length - 1}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            photosGrid.appendChild(photoItem);
            
            // Add event listener to remove button
            const removeBtn = photoItem.querySelector('.remove-photo-btn');
            if (removeBtn) {
                removeBtn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    removePhoto(index, this.closest('.photo-item'));
                });
            }
        }
        
        // Hide modal
        hideModal('photo-upload-modal');
        
        // Reset photo form
        resetPhotoForm();
        
        // Show notification
        showNotification('Photo added successfully', 'success');
    }

    // Remove photo from uploaded photos
    function removePhoto(index, element) {
        if (index >= 0 && index < uploadedPhotos.length) {
            // Remove from array
            uploadedPhotos.splice(index, 1);
            
            // Remove from DOM
            if (element) {
                element.remove();
            }
            
            // Update indices for remaining remove buttons
            const removeButtons = document.querySelectorAll('#uploaded-photos .remove-photo-btn');
            removeButtons.forEach((btn, i) => {
                btn.setAttribute('data-index', i);
            });
        }
    }

    // Reset photo form
    function resetPhotoForm() {
        const photoDescription = document.getElementById('photo-description');
        const vehicleArea = document.getElementById('vehicle-area');
        const cameraContainer = document.getElementById('camera-container');
        const uploadArea = document.getElementById('upload-area');
        
        if (photoDescription) photoDescription.value = '';
        if (vehicleArea) vehicleArea.value = '';
        
        if (cameraContainer) {
            cameraContainer.innerHTML = `
                <div class="camera-placeholder">
                    <i class="fas fa-camera"></i>
                    <p>Camera preview will appear here</p>
                </div>
            `;
            delete cameraContainer.dataset.imageUrl;
        }
        
        if (uploadArea) {
            uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drag & drop files here or click to browse</p>
                <input type="file" id="file-upload" accept="image/*" hidden>
            `;
            delete uploadArea.dataset.imageUrl;
        }
        
        // Reset buttons
        const startCameraBtn = document.getElementById('start-camera-btn');
        const capturePhotoBtn = document.getElementById('capture-photo-btn');
        const retakePhotoBtn = document.getElementById('retake-photo-btn');
        
        if (startCameraBtn) startCameraBtn.disabled = false;
        if (capturePhotoBtn) capturePhotoBtn.disabled = true;
        if (retakePhotoBtn) retakePhotoBtn.disabled = true;
    }

    // Send OTP (simulated)
    function sendOTP() {
        const otpBtn = document.getElementById('send-otp-btn');
        
        if (otpBtn) {
            // Disable button to prevent multiple requests
            otpBtn.disabled = true;
            otpBtn.textContent = 'Sending...';
            
            // Simulate API call delay
            setTimeout(function() {
                // Enable button
                otpBtn.disabled = false;
                otpBtn.textContent = 'Resend OTP';
                
                // Show notification
                showNotification('OTP sent to manager\'s phone number', 'success');
                
                // In a real app, this would send an actual OTP to the manager's phone
            }, 2000);
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(function() {
            notification.classList.add('show');
        }, 10);
        
        // Add close event
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                notification.classList.remove('show');
                setTimeout(function() {
                    notification.remove();
                }, 300);
            });
        }
        
        // Auto hide after 5 seconds
        setTimeout(function() {
            notification.classList.remove('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Utility functions for showing/hiding sections and modals
    
    // Show a section by ID
    function showSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('hidden');
        }
    }
    
    // Hide a section by ID
    function hideSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('hidden');
        }
    }
    
    // Show a modal by ID
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    // Hide a modal by ID
    function hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
});