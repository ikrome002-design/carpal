/**
 * CarPal by Citrus - Vehicle History JavaScript
 * @description Handles all interactions for the Vehicle History functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown toggles for notifications and user profile
    initDropdowns();
    
    // Initialize main views switching
    initViewSwitching();
    
    // Initialize tab switching within vehicle details
    initTabSwitching();
    
    // Initialize modals
    initModals();
    
    // Initialize forms
    initForms();
    
    // Initialize dark mode toggle
    initDarkMode();
});

/**
 * Initialize dropdown toggles for notifications and user profile
 */
function initDropdowns() {
    // Notifications dropdown
    const notificationsIcon = document.querySelector('.notifications');
    const notificationsDropdown = document.querySelector('.notifications-dropdown');
    
    if (notificationsIcon && notificationsDropdown) {
        notificationsIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationsDropdown.style.display = notificationsDropdown.style.display === 'block' ? 'none' : 'block';
            if (profileDropdown) profileDropdown.style.display = 'none'; // Close profile dropdown
        });
    }
    
    // User profile dropdown
    const userProfileIcon = document.querySelector('.user-profile');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (userProfileIcon && profileDropdown) {
        userProfileIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
            if (notificationsDropdown) notificationsDropdown.style.display = 'none'; // Close notifications dropdown
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        if (notificationsDropdown) notificationsDropdown.style.display = 'none';
        if (profileDropdown) profileDropdown.style.display = 'none';
    });
}

/**
 * Initialize main view switching (list view to detail view)
 */
function initViewSwitching() {
    // View buttons in the vehicle list table
    const viewDetailBtns = document.querySelectorAll('.view-detail-btn');
    const vehicleHistoryMain = document.getElementById('vehicle-history-main');
    const vehicleHistoryDetail = document.getElementById('vehicle-history-detail');
    
    if (viewDetailBtns.length && vehicleHistoryMain && vehicleHistoryDetail) {
        // Handle clicking on view detail buttons
        viewDetailBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                vehicleHistoryMain.style.display = 'none';
                vehicleHistoryDetail.style.display = 'block';
                
                // Set vehicle data (in a real app, this would fetch data from server)
                const vehicleId = btn.getAttribute('data-id');
                document.getElementById('vehicle-plate').textContent = vehicleId.replace('-', ' ');
                
                // For demo purposes, we're using hardcoded data
                // In a real app, you would fetch this data from your backend
            });
        });
        
        // Handle back to list button
        const backToListBtn = document.getElementById('back-to-list');
        if (backToListBtn) {
            backToListBtn.addEventListener('click', () => {
                vehicleHistoryDetail.style.display = 'none';
                vehicleHistoryMain.style.display = 'block';
            });
        }
        
        // Handle return to dashboard
        const returnDashboardBtn = document.querySelector('.return-dashboard-btn');
        if (returnDashboardBtn) {
            returnDashboardBtn.addEventListener('click', () => {
                window.location.href = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Auto Repair Shop 3.0\\Dashboard\\dashboard.html';
            });
        }
    }
    
    // View service detail buttons
    const viewServiceBtns = document.querySelectorAll('.view-service-btn');
    const serviceDetailView = document.getElementById('service-detail-view');
    
    if (viewServiceBtns.length && serviceDetailView) {
        viewServiceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                vehicleHistoryDetail.style.display = 'none';
                serviceDetailView.style.display = 'block';
                
                // Set service data (in a real app, this would fetch data from server)
                const serviceId = btn.getAttribute('data-id');
                // For demo purposes, we're using hardcoded data displayed in the HTML
            });
        });
        
        // Handle back button from service detail to vehicle detail
        const backToVehicleBtn = document.getElementById('back-to-vehicle');
        if (backToVehicleBtn) {
            backToVehicleBtn.addEventListener('click', () => {
                serviceDetailView.style.display = 'none';
                vehicleHistoryDetail.style.display = 'block';
            });
        }
    }
    
    // View check-in form buttons
    const viewCheckinBtns = document.querySelectorAll('.view-checkin-btn');
    const checkinDetailView = document.getElementById('checkin-detail-view');
    
    if (viewCheckinBtns.length && checkinDetailView) {
        viewCheckinBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                vehicleHistoryDetail.style.display = 'none';
                checkinDetailView.style.display = 'block';
            });
        });
        
        // Handle back button from check-in detail to vehicle detail
        const backToCheckinListBtn = document.getElementById('back-to-checkin-list');
        if (backToCheckinListBtn) {
            backToCheckinListBtn.addEventListener('click', () => {
                checkinDetailView.style.display = 'none';
                vehicleHistoryDetail.style.display = 'block';
                
                // Make sure the check-in tab is active
                const tabBtns = document.querySelectorAll('.tab-btn');
                const tabContents = document.querySelectorAll('.tab-content');
                
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                document.querySelector('[data-tab="check-in-forms"]').classList.add('active');
                document.getElementById('check-in-forms').classList.add('active');
            });
        }
    }
    
    // View check-out form buttons
    const viewCheckoutBtns = document.querySelectorAll('.view-checkout-btn');
    const checkoutDetailView = document.getElementById('checkout-detail-view');
    
    if (viewCheckoutBtns.length && checkoutDetailView) {
        viewCheckoutBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                vehicleHistoryDetail.style.display = 'none';
                checkoutDetailView.style.display = 'block';
            });
        });
        
        // Handle back button from check-out detail to vehicle detail
        const backToCheckoutListBtn = document.getElementById('back-to-checkout-list');
        if (backToCheckoutListBtn) {
            backToCheckoutListBtn.addEventListener('click', () => {
                checkoutDetailView.style.display = 'none';
                vehicleHistoryDetail.style.display = 'block';
                
                // Make sure the check-out tab is active
                const tabBtns = document.querySelectorAll('.tab-btn');
                const tabContents = document.querySelectorAll('.tab-content');
                
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                document.querySelector('[data-tab="check-out-forms"]').classList.add('active');
                document.getElementById('check-out-forms').classList.add('active');
            });
        }
    }
    
    // View invoice buttons
    const viewInvoiceBtns = document.querySelectorAll('.view-invoice-btn');
    const invoiceDetailView = document.getElementById('invoice-detail-view');
    
    if (viewInvoiceBtns.length && invoiceDetailView) {
        viewInvoiceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                vehicleHistoryDetail.style.display = 'none';
                invoiceDetailView.style.display = 'block';
            });
        });
        
        // Handle back button from invoice detail to vehicle detail
        const backToInvoiceListBtn = document.getElementById('back-to-invoice-list');
        if (backToInvoiceListBtn) {
            backToInvoiceListBtn.addEventListener('click', () => {
                invoiceDetailView.style.display = 'none';
                vehicleHistoryDetail.style.display = 'block';
                
                // Make sure the invoices tab is active
                const tabBtns = document.querySelectorAll('.tab-btn');
                const tabContents = document.querySelectorAll('.tab-content');
                
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                document.querySelector('[data-tab="invoices"]').classList.add('active');
                document.getElementById('invoices').classList.add('active');
            });
        }
    }
}

/**
 * Initialize tab switching functionality
 */
function initTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length && tabContents.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding tab content
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

/**
 * Initialize modals functionality
 */
function initModals() {
    // Photo Gallery Modal
    const galleryLinks = document.querySelectorAll('#link-gallery, .view-all-photos-btn');
    const photoGalleryModal = document.getElementById('photo-gallery-modal');
    
    if (galleryLinks.length && photoGalleryModal) {
        galleryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                photoGalleryModal.style.display = 'flex';
                initPhotoGallery();
            });
        });
    }
    
    // Create Service Modal
    const createServiceBtn = document.getElementById('create-service-btn');
    const createServiceModal = document.getElementById('create-service-modal');
    
    if (createServiceBtn && createServiceModal) {
        createServiceBtn.addEventListener('click', () => {
            createServiceModal.style.display = 'flex';
        });
    }
    
    // Generate Report Modal
    const generateReportBtn = document.getElementById('generate-report-btn');
    const generateReportModal = document.getElementById('generate-report-modal');
    
    if (generateReportBtn && generateReportModal) {
        generateReportBtn.addEventListener('click', () => {
            generateReportModal.style.display = 'flex';
        });
    }
    
    // Export History Modal
    const exportHistoryBtn = document.getElementById('export-history-btn');
    const exportHistoryModal = document.getElementById('export-history-modal');
    
    if (exportHistoryBtn && exportHistoryModal) {
        exportHistoryBtn.addEventListener('click', () => {
            exportHistoryModal.style.display = 'flex';
        });
    }
    
    // Report Preview Modal
    const reportPreviewModal = document.getElementById('report-preview-modal');
    const generateReportForm = document.getElementById('report-form');
    
    if (generateReportForm && reportPreviewModal) {
        generateReportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            generateReportModal.style.display = 'none';
            reportPreviewModal.style.display = 'flex';
        });
    }
    
    // Close buttons for all modals
    const closeButtons = document.querySelectorAll('.close-btn');
    const modals = document.querySelectorAll('.modal');
    
    if (closeButtons.length && modals.length) {
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modals.forEach(modal => {
                    modal.style.display = 'none';
                });
            });
        });
        
        // Close when clicking outside modal content
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }
    
    // Cancel buttons
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    
    if (cancelButtons.length) {
        cancelButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modals.forEach(modal => {
                    modal.style.display = 'none';
                });
            });
        });
    }
}

/**
 * Initialize photo gallery functionality
 */
function initPhotoGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const currentPhoto = document.getElementById('current-photo');
    const photoDescription = document.getElementById('photo-description');
    const prevButton = document.getElementById('prev-photo-btn');
    const nextButton = document.getElementById('next-photo-btn');
    
    if (thumbnails.length && currentPhoto && photoDescription && prevButton && nextButton) {
        let currentIndex = 0;
        const maxIndex = thumbnails.length - 1;
        
        // Simulated photos data (in a real app, this would come from the server)
        const photosData = [
            {
                src: "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png",
                description: "Engine after service - March 18, 2025"
            },
            {
                src: "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png",
                description: "New air filter installed - March 18, 2025"
            },
            {
                src: "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png",
                description: "Brake pads condition - March 18, 2025"
            },
            {
                src: "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png",
                description: "Tire condition after rotation - March 18, 2025"
            },
            {
                src: "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png",
                description: "Battery condition - March 18, 2025"
            },
            {
                src: "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png",
                description: "Fluid levels - March 18, 2025"
            },
            {
                src: "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png",
                description: "Vehicle exterior - March 18, 2025"
            },
            {
                src: "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-100-2.png",
                description: "Vehicle interior - March 18, 2025"
            }
        ];
        
        // Update current photo display
        function updateCurrentPhoto(index) {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to current thumbnail
            thumbnails[index].classList.add('active');
            
            // Update main photo
            currentPhoto.src = photosData[index].src;
            photoDescription.textContent = photosData[index].description;
            
            // Update current index
            currentIndex = index;
        }
        
        // Click handlers for thumbnails
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                updateCurrentPhoto(index);
            });
        });
        
        // Previous photo button
        prevButton.addEventListener('click', () => {
            const newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
            updateCurrentPhoto(newIndex);
        });
        
        // Next photo button
        nextButton.addEventListener('click', () => {
            const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            updateCurrentPhoto(newIndex);
        });
        
        // Photo download, print, and email buttons
        const downloadBtn = document.getElementById('download-photo-btn');
        const printBtn = document.getElementById('print-photo-btn');
        const emailBtn = document.getElementById('email-photo-btn');
        
        if (downloadBtn && printBtn && emailBtn) {
            downloadBtn.addEventListener('click', () => {
                alert('Photo download functionality would be implemented here');
            });
            
            printBtn.addEventListener('click', () => {
                alert('Photo print functionality would be implemented here');
            });
            
            emailBtn.addEventListener('click', () => {
                alert('Photo email functionality would be implemented here');
            });
        }
    }
}

/**
 * Initialize forms functionality
 */
function initForms() {
    // New Service Form
    const newServiceForm = document.getElementById('new-service-form');
    if (newServiceForm) {
        newServiceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('New service created successfully! In a real application, this would create a new service entry and redirect to the vehicle check-in process.');
            document.getElementById('create-service-modal').style.display = 'none';
        });
    }
    
    // Report Form
    const reportForm = document.getElementById('report-form');
    // This is handled in the modals section
    
    // Export Form
    const exportForm = document.getElementById('export-form');
    if (exportForm) {
        exportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Vehicle history exported successfully! In a real application, this would generate the requested export files.');
            document.getElementById('export-history-modal').style.display = 'none';
        });
    }
    
    // Email option toggle in export form
    const actionEmail = document.getElementById('action-email');
    const emailInput = document.querySelector('.email-input-group');
    
    if (actionEmail && emailInput) {
        actionEmail.addEventListener('change', () => {
            emailInput.style.display = actionEmail.checked ? 'block' : 'none';
        });
    }
    
    // Report Export Buttons
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const exportExcelBtn = document.getElementById('export-excel-btn');
    const exportCsvBtn = document.getElementById('export-csv-btn');
    
    if (exportPdfBtn && exportExcelBtn && exportCsvBtn) {
        exportPdfBtn.addEventListener('click', () => {
            alert('Report exported as PDF successfully!');
            document.getElementById('report-preview-modal').style.display = 'none';
        });
        
        exportExcelBtn.addEventListener('click', () => {
            alert('Report exported as Excel successfully!');
            document.getElementById('report-preview-modal').style.display = 'none';
        });
        
        exportCsvBtn.addEventListener('click', () => {
            alert('Report exported as CSV successfully!');
            document.getElementById('report-preview-modal').style.display = 'none';
        });
    }
    
    // Print and Email Report Buttons
    const printReportBtn = document.getElementById('print-report-btn');
    const emailReportBtn = document.getElementById('email-report-btn');
    
    if (printReportBtn && emailReportBtn) {
        printReportBtn.addEventListener('click', () => {
            alert('Printing report... In a real application, this would open the print dialog.');
        });
        
        emailReportBtn.addEventListener('click', () => {
            const email = prompt('Enter email address to send the report:');
            if (email) {
                alert(`Report sent to ${email} successfully!`);
                document.getElementById('report-preview-modal').style.display = 'none';
            }
        });
    }
    
    // Service Detail Action Buttons
    const editServiceBtn = document.getElementById('edit-service-btn');
    const printServiceBtn = document.getElementById('print-service-btn');
    const emailServiceBtn = document.getElementById('email-service-btn');
    
    if (editServiceBtn && printServiceBtn && emailServiceBtn) {
        editServiceBtn.addEventListener('click', () => {
            alert('Edit service functionality would be implemented here');
        });
        
        printServiceBtn.addEventListener('click', () => {
            alert('Print service summary functionality would be implemented here');
        });
        
        emailServiceBtn.addEventListener('click', () => {
            const email = prompt('Enter email address to send the service summary:');
            if (email) {
                alert(`Service summary sent to ${email} successfully!`);
            }
        });
    }
    
    // Check-In Form Action Buttons
    const downloadCheckinBtn = document.getElementById('download-checkin-btn');
    const printCheckinBtn = document.getElementById('print-checkin-btn');
    const emailCheckinBtn = document.getElementById('email-checkin-btn');
    
    if (downloadCheckinBtn && printCheckinBtn && emailCheckinBtn) {
        downloadCheckinBtn.addEventListener('click', () => {
            alert('Check-in form PDF downloaded successfully!');
        });
        
        printCheckinBtn.addEventListener('click', () => {
            alert('Printing check-in form... In a real application, this would open the print dialog.');
        });
        
        emailCheckinBtn.addEventListener('click', () => {
            const email = prompt('Enter email address to send the check-in form:');
            if (email) {
                alert(`Check-in form sent to ${email} successfully!`);
            }
        });
    }
    
    // Check-Out Form Action Buttons
    const downloadCheckoutBtn = document.getElementById('download-checkout-btn');
    const printCheckoutBtn = document.getElementById('print-checkout-btn');
    const emailCheckoutBtn = document.getElementById('email-checkout-btn');
    
    if (downloadCheckoutBtn && printCheckoutBtn && emailCheckoutBtn) {
        downloadCheckoutBtn.addEventListener('click', () => {
            alert('Check-out form PDF downloaded successfully!');
        });
        
        printCheckoutBtn.addEventListener('click', () => {
            alert('Printing check-out form... In a real application, this would open the print dialog.');
        });
        
        emailCheckoutBtn.addEventListener('click', () => {
            const email = prompt('Enter email address to send the check-out form:');
            if (email) {
                alert(`Check-out form sent to ${email} successfully!`);
            }
        });
    }
    
    // Invoice Action Buttons
    const downloadInvoicePdfBtn = document.getElementById('download-invoice-pdf-btn');
    const printInvoiceBtn = document.getElementById('print-invoice-btn');
    const emailInvoiceBtn = document.getElementById('email-invoice-btn');
    
    if (downloadInvoicePdfBtn && printInvoiceBtn && emailInvoiceBtn) {
        downloadInvoicePdfBtn.addEventListener('click', () => {
            alert('Invoice PDF downloaded successfully!');
        });
        
        printInvoiceBtn.addEventListener('click', () => {
            alert('Printing invoice... In a real application, this would open the print dialog.');
        });
        
        emailInvoiceBtn.addEventListener('click', () => {
            const email = prompt('Enter email address to send the invoice:');
            if (email) {
                alert(`Invoice sent to ${email} successfully!`);
            }
        });
    }
    
    // Search and Filter Functionality
    const searchBtn = document.querySelector('.search-btn');
    const resetBtn = document.querySelector('.reset-btn');
    
    if (searchBtn && resetBtn) {
        searchBtn.addEventListener('click', () => {
            alert('Search functionality would filter the vehicle list based on the provided criteria');
        });
        
        resetBtn.addEventListener('click', () => {
            // Clear all search and filter inputs
            document.getElementById('license-plate-search').value = '';
            document.getElementById('customer-name-search').value = '';
            document.getElementById('date-from').value = '';
            document.getElementById('date-to').value = '';
            document.getElementById('service-type-filter').value = '';
            document.getElementById('sort-option').value = 'recent';
            
            alert('Search and filter criteria have been reset');
        });
    }
    
    // Tab Filter Button
    const applyFilterBtn = document.querySelector('.apply-filter-btn');
    
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', () => {
            alert('Filter applied to the current tab. In a real application, this would filter the results based on selected criteria.');
        });
    }
    
    // Additional Document Links
    const documentLinks = document.querySelectorAll('.document-link');
    
    if (documentLinks.length) {
        documentLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.id !== 'link-gallery') {
                    e.preventDefault();
                    alert('Document will open in a new tab in a real application');
                }
            });
        });
    }
    
    // Vehicle List Pagination
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    if (paginationButtons.length) {
        paginationButtons.forEach(btn => {
            if (!btn.disabled) {
                btn.addEventListener('click', () => {
                    alert('Pagination would navigate to the next/previous page of vehicles');
                });
            }
        });
    }
}

/**
 * Initialize dark mode toggle functionality
 */
function initDarkMode() {
    const darkModeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('carpal-theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            const isDarkMode = body.classList.contains('dark-mode');
            updateDarkModeIcon(isDarkMode);
            
            // Save preference
            localStorage.setItem('carpal-theme', isDarkMode ? 'dark' : 'light');
        });
    }
}

/**
 * Update the dark mode toggle icon
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function updateDarkModeIcon(isDarkMode) {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        if (isDarkMode) {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}