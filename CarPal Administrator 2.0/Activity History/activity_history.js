/**
 * CarPal by Citrus - Activity History JavaScript
 * This file contains all functionality for the Activity History page
 * in the CarPal Administrator dashboard.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initDateRangePicker();
    initFilters();
    initSearch();
    initBulkActions();
    initActivityList();
    initPagination();
    initExportOptions();
    initActivityDetails();
    initExportModal();
    initConfirmationDialogs();
    initDarkMode();
});

/**
 * Mock Activities Data for demonstration
 * In a production environment, this would be fetched from an API
 */
const mockActivities = [
    {
        id: 'ACT20250328-0021',
        timestamp: '2025-03-28T09:45:00',
        actionType: 'login',
        actionIcon: 'fa-sign-in-alt',
        actionClass: 'login-action',
        user: {
            id: 'USR20250101-0001',
            name: 'John Doe',
            role: 'Administrator',
            email: 'john.doe@example.com',
            avatar: 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-30.png'
        },
        description: 'User logged in successfully',
        module: 'Authentication',
        ipAddress: '192.168.1.45',
        device: 'Desktop - Chrome 120.0.6099.130 (Windows)',
        details: {
            additionalInfo: 'Login from recognized device and location'
        }
    },
    {
        id: 'ACT20250328-0023',
        timestamp: '2025-03-28T09:50:00',
        actionType: 'update',
        actionIcon: 'fa-user-edit',
        actionClass: 'user-action',
        user: {
            id: 'USR20250101-0001',
            name: 'John Doe',
            role: 'Administrator',
            email: 'john.doe@example.com',
            avatar: 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-30.png'
        },
        description: 'Updated user account for Jane Smith (ID: USR20250328-0042)',
        module: 'User Management',
        ipAddress: '192.168.1.45',
        device: 'Desktop - Chrome 120.0.6099.130 (Windows)',
        details: {
            before: {
                email: 'jane.smith@oldmail.com',
                phone: '+1 (555) 123-4567',
                role: 'Business User',
                status: 'Active',
                twoFactorAuth: 'Disabled'
            },
            after: {
                email: 'jane.smith@newmail.com',
                phone: '+1 (555) 987-6543',
                role: 'Business Administrator',
                status: 'Active',
                twoFactorAuth: 'Enabled'
            },
            relatedUser: {
                id: 'USR20250328-0042',
                name: 'Jane Smith'
            },
            relatedBusiness: {
                id: 'BIZ20250101-0015',
                name: 'Fast Courier Services'
            },
            relatedActivities: [
                {
                    timestamp: '2025-03-25T11:30:00',
                    description: 'User Jane Smith last login'
                },
                {
                    timestamp: '2025-03-20T09:15:00',
                    description: 'Business Fast Courier Services verified'
                },
                {
                    timestamp: '2025-03-15T14:45:00',
                    description: 'User Jane Smith created'
                }
            ],
            systemNotes: 'This account update was performed by system administrator following the business role upgrade request submitted on March 26, 2025. The change included enabling two-factor authentication as part of the security protocol for business administrator accounts.'
        }
    },
    {
        id: 'ACT20250328-0025',
        timestamp: '2025-03-28T10:15:00',
        actionType: 'approve',
        actionIcon: 'fa-building',
        actionClass: 'business-action',
        user: {
            id: 'USR20250101-0001',
            name: 'John Doe',
            role: 'Administrator',
            email: 'john.doe@example.com',
            avatar: 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-30.png'
        },
        description: 'Approved business verification for Acme Transports Ltd (ID: BIZ20250320-0018)',
        module: 'Business Management',
        ipAddress: '192.168.1.45',
        device: 'Desktop - Chrome 120.0.6099.130 (Windows)'
    },
    {
        id: 'ACT20250328-0028',
        timestamp: '2025-03-28T11:30:00',
        actionType: 'refund',
        actionIcon: 'fa-credit-card',
        actionClass: 'payment-action',
        user: {
            id: 'USR20250101-0001',
            name: 'John Doe',
            role: 'Administrator',
            email: 'john.doe@example.com',
            avatar: 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-30.png'
        },
        description: 'Processed payment refund for transaction #TRX20250327-9842',
        module: 'Financial Management',
        ipAddress: '192.168.1.45',
        device: 'Desktop - Chrome 120.0.6099.130 (Windows)'
    },
    {
        id: 'ACT20250327-0042',
        timestamp: '2025-03-27T15:15:00',
        actionType: 'system',
        actionIcon: 'fa-cogs',
        actionClass: 'system-action',
        user: {
            id: 'SYSTEM',
            name: 'System',
            role: 'System'
        },
        description: 'System update deployed: CarPal v2.4.2',
        module: 'System',
        ipAddress: 'N/A',
        device: 'N/A'
    },
    {
        id: 'ACT20250327-0039',
        timestamp: '2025-03-27T14:45:00',
        actionType: 'settings',
        actionIcon: 'fa-sliders-h',
        actionClass: 'settings-action',
        user: {
            id: 'USR20250101-0001',
            name: 'John Doe',
            role: 'Administrator',
            email: 'john.doe@example.com',
            avatar: 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-30.png'
        },
        description: 'Updated system notification settings',
        module: 'Settings',
        ipAddress: '192.168.1.45',
        device: 'Desktop - Chrome 120.0.6099.130 (Windows)'
    },
    {
        id: 'ACT20250327-0031',
        timestamp: '2025-03-27T10:30:00',
        actionType: 'support',
        actionIcon: 'fa-ticket-alt',
        actionClass: 'support-action',
        user: {
            id: 'USR20250101-0001',
            name: 'John Doe',
            role: 'Administrator',
            email: 'john.doe@example.com',
            avatar: 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-30.png'
        },
        description: 'Resolved support ticket #ST20250327-1234 for Fast Courier Services',
        module: 'Support',
        ipAddress: '192.168.1.45',
        device: 'Desktop - Chrome 120.0.6099.130 (Windows)'
    }
];

// Filter and pagination state
let currentState = {
    dateRange: {
        type: 'last7days',
        startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
        endDate: new Date(),
        includeTime: false,
        startTime: '00:00',
        endTime: '23:59'
    },
    filters: {
        category: 'all',
        user: 'all',
        module: 'all'
    },
    search: {
        keyword: '',
        operator: 'contains',
        advancedCriteria: {
            keyword: '',
            operator: 'contains',
            startDate: null,
            endDate: null,
            user: 'all',
            activityType: 'all'
        }
    },
    pagination: {
        currentPage: 1,
        itemsPerPage: 25,
        totalItems: mockActivities.length,
        totalPages: Math.ceil(mockActivities.length / 25)
    },
    bulkSelection: {
        selectedItems: [],
        allSelected: false
    },
    exportFormat: 'csv',
    advancedSearchOpen: false,
    dateRangePickerOpen: false
};

/**
 * Initialize Date Range Picker functionality
 */
function initDateRangePicker() {
    const dateRangeToggle = document.getElementById('dateRangeToggle');
    const dateRangePicker = document.getElementById('dateRangePicker');
    const rangeBtns = document.querySelectorAll('.range-btn');
    const includeTimeCheckbox = document.getElementById('includeTime');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    const applyRangeBtn = document.querySelector('.apply-range-btn');
    const cancelRangeBtn = document.querySelector('.cancel-range-btn');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    // Set default date values
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    startDateInput.valueAsDate = sevenDaysAgo;
    endDateInput.valueAsDate = today;
    
    // Toggle date range picker visibility
    dateRangeToggle.addEventListener('click', () => {
        if (dateRangePicker.style.display === 'block') {
            dateRangePicker.style.display = 'none';
            currentState.dateRangePickerOpen = false;
        } else {
            dateRangePicker.style.display = 'block';
            currentState.dateRangePickerOpen = true;
            
            // Set values based on current state
            if (currentState.dateRange.startDate) {
                startDateInput.valueAsDate = currentState.dateRange.startDate;
            }
            if (currentState.dateRange.endDate) {
                endDateInput.valueAsDate = currentState.dateRange.endDate;
            }
            includeTimeCheckbox.checked = currentState.dateRange.includeTime;
            startTimeInput.value = currentState.dateRange.startTime;
            endTimeInput.value = currentState.dateRange.endTime;
            startTimeInput.disabled = !currentState.dateRange.includeTime;
            endTimeInput.disabled = !currentState.dateRange.includeTime;
            
            // Highlight the active predefined range
            rangeBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.range === currentState.dateRange.type) {
                    btn.classList.add('active');
                }
            });
        }
    });
    
    // Handle predefined range buttons
    rangeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const rangeType = btn.dataset.range;
            
            // Remove active class from all buttons
            rangeBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Set date range based on button
            const today = new Date();
            let startDate = new Date();
            
            switch(rangeType) {
                case 'today':
                    startDate = new Date(today);
                    break;
                case 'yesterday':
                    startDate = new Date(today);
                    startDate.setDate(today.getDate() - 1);
                    break;
                case 'last7days':
                    startDate = new Date(today);
                    startDate.setDate(today.getDate() - 7);
                    break;
                case 'last30days':
                    startDate = new Date(today);
                    startDate.setDate(today.getDate() - 30);
                    break;
                case 'thismonth':
                    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                    break;
                case 'lastmonth':
                    startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                    break;
            }
            
            // Update input fields
            startDateInput.valueAsDate = startDate;
            endDateInput.valueAsDate = today;
        });
    });
    
    // Toggle time inputs based on Include Time checkbox
    includeTimeCheckbox.addEventListener('change', () => {
        startTimeInput.disabled = !includeTimeCheckbox.checked;
        endTimeInput.disabled = !includeTimeCheckbox.checked;
    });
    
    // Apply date range
    applyRangeBtn.addEventListener('click', () => {
        // Get active range type
        let rangeType = 'custom';
        rangeBtns.forEach(btn => {
            if (btn.classList.contains('active')) {
                rangeType = btn.dataset.range;
            }
        });
        
        // Update current state with selected date range
        currentState.dateRange = {
            type: rangeType,
            startDate: startDateInput.valueAsDate,
            endDate: endDateInput.valueAsDate,
            includeTime: includeTimeCheckbox.checked,
            startTime: startTimeInput.value,
            endTime: endTimeInput.value
        };
        
        // Update the date range display text
        updateDateRangeText();
        
        // Hide date range picker
        dateRangePicker.style.display = 'none';
        currentState.dateRangePickerOpen = false;
        
        // Apply filters
        applyFilters();
    });
    
    // Cancel button - close without applying
    cancelRangeBtn.addEventListener('click', () => {
        dateRangePicker.style.display = 'none';
        currentState.dateRangePickerOpen = false;
    });
    
    // Initialize date range text
    updateDateRangeText();
    
    // Close date picker when clicking outside
    document.addEventListener('click', (e) => {
        if (currentState.dateRangePickerOpen && 
            !dateRangePicker.contains(e.target) && 
            e.target !== dateRangeToggle && 
            !dateRangeToggle.contains(e.target)) {
            dateRangePicker.style.display = 'none';
            currentState.dateRangePickerOpen = false;
        }
    });
}

/**
 * Update the date range text displayed in the toggle button
 */
function updateDateRangeText() {
    const dateRangeToggle = document.getElementById('dateRangeToggle');
    const dateRangeSpan = dateRangeToggle.querySelector('span');
    
    switch(currentState.dateRange.type) {
        case 'today':
            dateRangeSpan.textContent = 'Today';
            break;
        case 'yesterday':
            dateRangeSpan.textContent = 'Yesterday';
            break;
        case 'last7days':
            dateRangeSpan.textContent = 'Last 7 Days';
            break;
        case 'last30days':
            dateRangeSpan.textContent = 'Last 30 Days';
            break;
        case 'thismonth':
            dateRangeSpan.textContent = 'This Month';
            break;
        case 'lastmonth':
            dateRangeSpan.textContent = 'Last Month';
            break;
        case 'custom':
            const startDate = formatDate(currentState.dateRange.startDate);
            const endDate = formatDate(currentState.dateRange.endDate);
            dateRangeSpan.textContent = `${startDate} - ${endDate}`;
            break;
    }
}

/**
 * Format date to MM/DD/YYYY
 */
function formatDate(date) {
    if (!date) return '';
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

/**
 * Format date and time for display
 */
function formatDateTime(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
    };
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    
    const dateFormatted = date.toLocaleDateString('en-US', options);
    const timeFormatted = date.toLocaleTimeString('en-US', timeOptions);
    
    return { 
        date: dateFormatted,
        time: timeFormatted,
        full: `${dateFormatted} ${timeFormatted}`
    };
}

/**
 * Initialize filter controls
 */
function initFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const userFilter = document.getElementById('userFilter');
    const moduleFilter = document.getElementById('moduleFilter');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');
    
    // Apply filters
    applyFiltersBtn.addEventListener('click', () => {
        currentState.filters = {
            category: categoryFilter.value,
            user: userFilter.value,
            module: moduleFilter.value
        };
        
        // Reset to first page
        currentState.pagination.currentPage = 1;
        
        // Apply filters
        applyFilters();
    });
    
    // Reset filters
    resetFiltersBtn.addEventListener('click', () => {
        // Reset filter inputs
        categoryFilter.value = 'all';
        userFilter.value = 'all';
        moduleFilter.value = 'all';
        
        // Reset filter state
        currentState.filters = {
            category: 'all',
            user: 'all',
            module: 'all'
        };
        
        // Reset to first page
        currentState.pagination.currentPage = 1;
        
        // Apply filters
        applyFilters();
    });
}

/**
 * Initialize search functionality
 */
function initSearch() {
    const searchKeywordInput = document.getElementById('searchKeyword');
    const searchBtn = document.querySelector('.search-btn');
    const advancedSearchToggle = document.querySelector('.advanced-search-toggle');
    const advancedSearchPanel = document.getElementById('advancedSearchPanel');
    const executeSearchBtn = document.querySelector('.execute-search-btn');
    const clearFormBtn = document.querySelector('.clear-form-btn');
    const cancelSearchBtn = document.querySelector('.cancel-search-btn');
    const savedSearchSelect = document.getElementById('savedSearchSelect');
    const loadSearchBtn = document.querySelector('.load-search-btn');
    const saveSearchBtn = document.querySelector('.save-search-btn');
    const deleteSearchBtn = document.querySelector('.delete-search-btn');
    
    // Search button
    searchBtn.addEventListener('click', () => {
        currentState.search.keyword = searchKeywordInput.value.trim();
        
        // Reset to first page
        currentState.pagination.currentPage = 1;
        
        // Apply filters
        applyFilters();
    });
    
    // Advanced search toggle
    advancedSearchToggle.addEventListener('click', () => {
        if (advancedSearchPanel.style.display === 'block') {
            advancedSearchPanel.style.display = 'none';
            currentState.advancedSearchOpen = false;
        } else {
            advancedSearchPanel.style.display = 'block';
            currentState.advancedSearchOpen = true;
            
            // Populate advanced search fields with current criteria
            document.getElementById('advKeyword').value = currentState.search.advancedCriteria.keyword;
            document.getElementById('searchOperator').value = currentState.search.advancedCriteria.operator;
            
            if (currentState.search.advancedCriteria.startDate) {
                document.getElementById('advStartDate').valueAsDate = currentState.search.advancedCriteria.startDate;
            }
            
            if (currentState.search.advancedCriteria.endDate) {
                document.getElementById('advEndDate').valueAsDate = currentState.search.advancedCriteria.endDate;
            }
            
            document.getElementById('advUserSelect').value = currentState.search.advancedCriteria.user;
            document.getElementById('advActivityType').value = currentState.search.advancedCriteria.activityType;
        }
    });
    
    // Execute advanced search
    executeSearchBtn.addEventListener('click', () => {
        // Gather advanced search criteria
        currentState.search.advancedCriteria = {
            keyword: document.getElementById('advKeyword').value.trim(),
            operator: document.getElementById('searchOperator').value,
            startDate: document.getElementById('advStartDate').valueAsDate,
            endDate: document.getElementById('advEndDate').valueAsDate,
            user: document.getElementById('advUserSelect').value,
            activityType: document.getElementById('advActivityType').value
        };
        
        // Apply advanced search
        currentState.search.keyword = currentState.search.advancedCriteria.keyword;
        
        // Reset to first page
        currentState.pagination.currentPage = 1;
        
        // Hide advanced search panel
        advancedSearchPanel.style.display = 'none';
        currentState.advancedSearchOpen = false;
        
        // Update search input to reflect advanced search
        searchKeywordInput.value = currentState.search.keyword;
        
        // Apply filters
        applyFilters();
    });
    
    // Clear advanced search form
    clearFormBtn.addEventListener('click', () => {
        document.getElementById('advKeyword').value = '';
        document.getElementById('searchOperator').value = 'contains';
        document.getElementById('advStartDate').value = '';
        document.getElementById('advEndDate').value = '';
        document.getElementById('advUserSelect').value = 'all';
        document.getElementById('advActivityType').value = 'all';
    });
    
    // Cancel advanced search
    cancelSearchBtn.addEventListener('click', () => {
        advancedSearchPanel.style.display = 'none';
        currentState.advancedSearchOpen = false;
    });
    
    // Load saved search
    loadSearchBtn.addEventListener('click', () => {
        const selectedSearch = savedSearchSelect.value;
        
        if (selectedSearch) {
            // In a real application, this would load from a database or API
            // Here we'll simulate with hardcoded examples
            switch(selectedSearch) {
                case 'login-attempts':
                    currentState.search.advancedCriteria = {
                        keyword: 'login',
                        operator: 'contains',
                        startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
                        endDate: new Date(),
                        user: 'all',
                        activityType: 'login'
                    };
                    break;
                case 'payment-activities':
                    currentState.search.advancedCriteria = {
                        keyword: 'payment',
                        operator: 'contains',
                        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        endDate: new Date(),
                        user: 'all',
                        activityType: 'payment'
                    };
                    break;
                case 'admin-changes':
                    currentState.search.advancedCriteria = {
                        keyword: '',
                        operator: 'contains',
                        startDate: null,
                        endDate: null,
                        user: 'admin',
                        activityType: 'update'
                    };
                    break;
            }
            
            // Populate form with loaded search
            document.getElementById('advKeyword').value = currentState.search.advancedCriteria.keyword;
            document.getElementById('searchOperator').value = currentState.search.advancedCriteria.operator;
            
            if (currentState.search.advancedCriteria.startDate) {
                document.getElementById('advStartDate').valueAsDate = currentState.search.advancedCriteria.startDate;
            } else {
                document.getElementById('advStartDate').value = '';
            }
            
            if (currentState.search.advancedCriteria.endDate) {
                document.getElementById('advEndDate').valueAsDate = currentState.search.advancedCriteria.endDate;
            } else {
                document.getElementById('advEndDate').value = '';
            }
            
            document.getElementById('advUserSelect').value = currentState.search.advancedCriteria.user;
            document.getElementById('advActivityType').value = currentState.search.advancedCriteria.activityType;
        }
    });
    
    // Enable/disable load and delete buttons based on selection
    savedSearchSelect.addEventListener('change', () => {
        const hasSelection = savedSearchSelect.value !== '';
        loadSearchBtn.disabled = !hasSelection;
        deleteSearchBtn.disabled = !hasSelection;
    });
    
    // Save search button
    saveSearchBtn.addEventListener('click', () => {
        // In a real application, this would save to a database or API
        alert('Search saved successfully');
    });
    
    // Delete saved search
    deleteSearchBtn.addEventListener('click', () => {
        // In a real application, this would delete from a database or API
        alert('Saved search deleted successfully');
        savedSearchSelect.value = '';
        loadSearchBtn.disabled = true;
        deleteSearchBtn.disabled = true;
    });
    
    // Enter key for search
    searchKeywordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            currentState.search.keyword = searchKeywordInput.value.trim();
            currentState.pagination.currentPage = 1;
            applyFilters();
        }
    });
    
    // Close advanced search panel when clicking outside
    document.addEventListener('click', (e) => {
        if (currentState.advancedSearchOpen && 
            !advancedSearchPanel.contains(e.target) && 
            e.target !== advancedSearchToggle && 
            !advancedSearchToggle.contains(e.target)) {
            advancedSearchPanel.style.display = 'none';
            currentState.advancedSearchOpen = false;
        }
    });
}

/**
 * Initialize bulk actions for activity selection
 */
function initBulkActions() {
    const selectAllCheckbox = document.getElementById('selectAllActivities');
    const bulkActionsMenu = document.getElementById('bulkActionsMenu');
    const selectedCountSpan = document.querySelector('.selected-count');
    const bulkExportBtn = document.querySelector('.bulk-export-btn');
    const bulkDeleteBtn = document.querySelector('.bulk-delete-btn');
    const bulkCancelBtn = document.querySelector('.bulk-cancel-btn');
    
    // Select all checkbox
    selectAllCheckbox.addEventListener('change', () => {
        const allCheckboxes = document.querySelectorAll('.activity-checkbox');
        
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        
        // Update bulk selection state
        if (selectAllCheckbox.checked) {
            currentState.bulkSelection.allSelected = true;
            currentState.bulkSelection.selectedItems = Array.from(allCheckboxes).map(checkbox => checkbox.id);
        } else {
            currentState.bulkSelection.allSelected = false;
            currentState.bulkSelection.selectedItems = [];
        }
        
        // Update bulk actions menu visibility
        updateBulkActionsMenu();
    });
    
    // Bulk export button
    bulkExportBtn.addEventListener('click', () => {
        const exportConfirmDialog = document.getElementById('exportConfirmDialog');
        const exportCountSpan = exportConfirmDialog.querySelector('.export-count');
        
        // Set selected count
        exportCountSpan.textContent = currentState.bulkSelection.selectedItems.length;
        
        // Show export confirmation dialog
        exportConfirmDialog.style.display = 'flex';
    });
    
    // Bulk delete button
    bulkDeleteBtn.addEventListener('click', () => {
        const deleteConfirmDialog = document.getElementById('deleteConfirmDialog');
        const deleteCountSpan = deleteConfirmDialog.querySelector('.delete-count');
        
        // Set selected count
        deleteCountSpan.textContent = currentState.bulkSelection.selectedItems.length;
        
        // Show delete confirmation dialog
        deleteConfirmDialog.style.display = 'flex';
    });
    
    // Bulk cancel button
    bulkCancelBtn.addEventListener('click', () => {
        // Clear all checkboxes
        const allCheckboxes = document.querySelectorAll('.activity-checkbox');
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset select all checkbox
        selectAllCheckbox.checked = false;
        
        // Reset bulk selection state
        currentState.bulkSelection.allSelected = false;
        currentState.bulkSelection.selectedItems = [];
        
        // Hide bulk actions menu
        bulkActionsMenu.style.display = 'none';
    });
}

/**
 * Update bulk actions menu visibility and count
 */
function updateBulkActionsMenu() {
    const bulkActionsMenu = document.getElementById('bulkActionsMenu');
    const selectedCountSpan = document.querySelector('.selected-count');
    
    if (currentState.bulkSelection.selectedItems.length > 0) {
        bulkActionsMenu.style.display = 'flex';
        selectedCountSpan.textContent = `${currentState.bulkSelection.selectedItems.length} items selected`;
    } else {
        bulkActionsMenu.style.display = 'none';
    }
}

/**
 * Initialize activity list with event listeners
 */
function initActivityList() {
    // Delegated event listener for checkboxes
    document.querySelector('.activity-list').addEventListener('change', (e) => {
        if (e.target.classList.contains('activity-checkbox')) {
            const checkbox = e.target;
            const checkboxId = checkbox.id;
            
            // Update selected items list
            if (checkbox.checked) {
                if (!currentState.bulkSelection.selectedItems.includes(checkboxId)) {
                    currentState.bulkSelection.selectedItems.push(checkboxId);
                }
            } else {
                currentState.bulkSelection.selectedItems = currentState.bulkSelection.selectedItems.filter(id => id !== checkboxId);
                
                // Uncheck "Select All" checkbox when any individual checkbox is unchecked
                document.getElementById('selectAllActivities').checked = false;
                currentState.bulkSelection.allSelected = false;
            }
            
            // Update bulk actions menu visibility
            updateBulkActionsMenu();
        }
    });
    
    // Delegated event listener for view details buttons
    document.querySelector('.activity-list').addEventListener('click', (e) => {
        if (e.target.closest('.view-details-btn')) {
            const activityEntry = e.target.closest('.activity-entry');
            const activityId = activityEntry.querySelector('.activity-checkbox').id;
            
            // Find activity by ID in mock data
            const activityData = mockActivities.find(activity => {
                return activity.id === 'ACT20250328-0023'; // For demo, always show details for this activity
            });
            
            if (activityData) {
                showActivityDetails(activityData);
            }
        }
    });
}

/**
 * Show activity details for a specific activity
 */
function showActivityDetails(activity) {
    const activityDetails = document.getElementById('activityDetails');
    
    // Show activity details section
    activityDetails.style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Hide activity dashboard
    document.querySelector('.activity-dashboard').style.display = 'none';
}

/**
 * Initialize pagination controls
 */
function initPagination() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageNumbers = document.querySelector('.page-numbers');
    const perPageSelector = document.getElementById('perPageSelector');
    
    // Previous page button
    prevBtn.addEventListener('click', () => {
        if (currentState.pagination.currentPage > 1) {
            currentState.pagination.currentPage--;
            applyFilters();
        }
    });
    
    // Next page button
    nextBtn.addEventListener('click', () => {
        if (currentState.pagination.currentPage < currentState.pagination.totalPages) {
            currentState.pagination.currentPage++;
            applyFilters();
        }
    });
    
    // Page numbers delegation
    pageNumbers.addEventListener('click', (e) => {
        if (e.target.classList.contains('page-number') && !e.target.classList.contains('active')) {
            const pageText = e.target.textContent;
            
            if (pageText === '...') {
                // Handle ellipsis - show prompt to enter page number
                const pageNum = prompt('Enter page number:');
                if (pageNum && !isNaN(pageNum) && parseInt(pageNum) > 0 && parseInt(pageNum) <= currentState.pagination.totalPages) {
                    currentState.pagination.currentPage = parseInt(pageNum);
                    applyFilters();
                }
            } else {
                currentState.pagination.currentPage = parseInt(pageText);
                applyFilters();
            }
        }
    });
    
    // Items per page selector
    perPageSelector.addEventListener('change', () => {
        currentState.pagination.itemsPerPage = parseInt(perPageSelector.value);
        currentState.pagination.totalPages = Math.ceil(currentState.pagination.totalItems / currentState.pagination.itemsPerPage);
        currentState.pagination.currentPage = 1; // Reset to first page
        applyFilters();
    });
}

/**
 * Update pagination UI based on current state
 */
function updatePaginationUI() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageNumbers = document.querySelector('.page-numbers');
    const paginationInfo = document.querySelector('.pagination-info');
    
    // Update pagination info
    const startItem = (currentState.pagination.currentPage - 1) * currentState.pagination.itemsPerPage + 1;
    const endItem = Math.min(startItem + currentState.pagination.itemsPerPage - 1, currentState.pagination.totalItems);
    paginationInfo.querySelector('span').textContent = `Showing ${startItem}-${endItem} of ${currentState.pagination.totalItems} activities`;
    
    // Disable/enable prev/next buttons
    prevBtn.disabled = currentState.pagination.currentPage === 1;
    nextBtn.disabled = currentState.pagination.currentPage === currentState.pagination.totalPages;
    
    // Generate page numbers
    let pageNumbersHTML = '';
    const maxVisiblePages = 5;
    const totalPages = currentState.pagination.totalPages;
    const currentPage = currentState.pagination.currentPage;
    
    if (totalPages <= maxVisiblePages) {
        // Show all pages
        for (let i = 1; i <= totalPages; i++) {
            pageNumbersHTML += `<li class="page-number ${i === currentPage ? 'active' : ''}">${i}</li>`;
        }
    } else {
        // Show a subset of pages with ellipsis
        
        // Always show first page
        pageNumbersHTML += `<li class="page-number ${currentPage === 1 ? 'active' : ''}">1</li>`;
        
        // Determine start and end of visible page range
        let startVisible = Math.max(2, currentPage - 1);
        let endVisible = Math.min(totalPages - 1, currentPage + 1);
        
        // Adjust for edge cases
        if (currentPage <= 3) {
            // Near start, show more pages after current
            endVisible = Math.min(maxVisiblePages - 1, totalPages - 1);
        } else if (currentPage >= totalPages - 2) {
            // Near end, show more pages before current
            startVisible = Math.max(2, totalPages - maxVisiblePages + 2);
        }
        
        // Add ellipsis before visible range if needed
        if (startVisible > 2) {
            pageNumbersHTML += `<li class="page-number">...</li>`;
        }
        
        // Add visible page numbers
        for (let i = startVisible; i <= endVisible; i++) {
            pageNumbersHTML += `<li class="page-number ${i === currentPage ? 'active' : ''}">${i}</li>`;
        }
        
        // Add ellipsis after visible range if needed
        if (endVisible < totalPages - 1) {
            pageNumbersHTML += `<li class="page-number">...</li>`;
        }
        
        // Always show last page
        pageNumbersHTML += `<li class="page-number ${currentPage === totalPages ? 'active' : ''}">${totalPages}</li>`;
    }
    
    pageNumbers.innerHTML = pageNumbersHTML;
}

/**
 * Initialize export options
 */
function initExportOptions() {
    const exportBtns = document.querySelectorAll('.export-btn');
    
    // Export buttons (CSV, PDF, Excel)
    exportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const format = btn.dataset.format;
            showExportModal(format);
        });
    });
}

/**
 * Show export modal with selected format
 */
function showExportModal(format) {
    const exportModal = document.getElementById('exportModal');
    const formatRadios = exportModal.querySelectorAll('input[name="exportFormat"]');
    
    // Set selected format
    formatRadios.forEach(radio => {
        if (radio.value === format) {
            radio.checked = true;
        }
    });
    
    // Set default date range
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30); // Last 30 days by default
    
    document.getElementById('exportStartDate').valueAsDate = startDate;
    document.getElementById('exportEndDate').valueAsDate = today;
    
    // Show modal
    exportModal.style.display = 'flex';
}

/**
 * Initialize activity details section
 */
function initActivityDetails() {
    const backBtn = document.querySelector('.activity-details .back-btn');
    const exportActivityBtn = document.querySelector('.export-activity-btn');
    const viewModuleBtn = document.querySelector('.view-module-btn');
    
    // Back button
    backBtn.addEventListener('click', () => {
        // Hide details section
        document.getElementById('activityDetails').style.display = 'none';
        
        // Show dashboard
        document.querySelector('.activity-dashboard').style.display = 'grid';
    });
    
    // Export activity button
    exportActivityBtn.addEventListener('click', () => {
        showExportModal('pdf'); // Default to PDF for single activity
    });
    
    // View module button
    viewModuleBtn.addEventListener('click', () => {
        // Navigate to user management page (in real app)
        alert('Navigating to User Management module...');
    });
}

/**
 * Initialize export modal
 */
function initExportModal() {
    const exportModal = document.getElementById('exportModal');
    const closeBtn = exportModal.querySelector('.close-btn');
    const cancelBtn = exportModal.querySelector('.cancel-btn');
    const generateBtn = exportModal.querySelector('.generate-btn');
    const deliveryOptions = exportModal.querySelectorAll('input[name="deliveryOption"]');
    const emailOptions = exportModal.querySelector('.email-options');
    const scheduleOptions = exportModal.querySelector('.schedule-options');
    
    // Close button
    closeBtn.addEventListener('click', () => {
        exportModal.style.display = 'none';
    });
    
    // Cancel button
    cancelBtn.addEventListener('click', () => {
        exportModal.style.display = 'none';
    });
    
    // Generate button
    generateBtn.addEventListener('click', () => {
        // Get export format
        const format = exportModal.querySelector('input[name="exportFormat"]:checked').value;
        
        // Get delivery option
        const deliveryOption = exportModal.querySelector('input[name="deliveryOption"]:checked').value;
        
        // In a real application, this would make an API request
        alert(`Generating ${format.toUpperCase()} export with ${deliveryOption} delivery...`);
        
        // Hide modal
        exportModal.style.display = 'none';
    });
    
    // Toggle email/schedule options based on delivery option
    deliveryOptions.forEach(option => {
        option.addEventListener('change', () => {
            const deliveryType = option.value;
            
            // Hide both options first
            emailOptions.style.display = 'none';
            scheduleOptions.style.display = 'none';
            
            // Show relevant option
            if (deliveryType === 'email') {
                emailOptions.style.display = 'block';
            } else if (deliveryType === 'schedule') {
                scheduleOptions.style.display = 'block';
            }
        });
    });
    
    // Close modal when clicking outside
    exportModal.addEventListener('click', (e) => {
        if (e.target === exportModal) {
            exportModal.style.display = 'none';
        }
    });
}

/**
 * Initialize confirmation dialogs
 */
function initConfirmationDialogs() {
    const exportConfirmDialog = document.getElementById('exportConfirmDialog');
    const deleteConfirmDialog = document.getElementById('deleteConfirmDialog');
    
    // Export confirmation dialog
    if (exportConfirmDialog) {
        const cancelBtn = exportConfirmDialog.querySelector('.cancel-btn');
        const proceedBtn = exportConfirmDialog.querySelector('.proceed-btn');
        const formatOptions = exportConfirmDialog.querySelectorAll('.dialog-option');
        let selectedFormat = 'csv'; // Default format
        
        // Format options
        formatOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove active class from all options
                formatOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                option.classList.add('active');
                
                // Set selected format
                selectedFormat = option.dataset.format;
            });
        });
        
        // Cancel button
        cancelBtn.addEventListener('click', () => {
            exportConfirmDialog.style.display = 'none';
        });
        
        // Proceed button
        proceedBtn.addEventListener('click', () => {
            // In a real application, this would make an API request
            alert(`Exporting ${currentState.bulkSelection.selectedItems.length} activities to ${selectedFormat.toUpperCase()}...`);
            
            // Hide dialog
            exportConfirmDialog.style.display = 'none';
        });
        
        // Close dialog when clicking outside
        exportConfirmDialog.addEventListener('click', (e) => {
            if (e.target === exportConfirmDialog) {
                exportConfirmDialog.style.display = 'none';
            }
        });
    }
    
    // Delete confirmation dialog
    if (deleteConfirmDialog) {
        const cancelBtn = deleteConfirmDialog.querySelector('.cancel-btn');
        const deleteConfirmBtn = deleteConfirmDialog.querySelector('.delete-confirm-btn');
        
        // Cancel button
        cancelBtn.addEventListener('click', () => {
            deleteConfirmDialog.style.display = 'none';
        });
        
        // Delete confirm button
        deleteConfirmBtn.addEventListener('click', () => {
            // In a real application, this would make an API request
            alert(`Deleting ${currentState.bulkSelection.selectedItems.length} activities...`);
            
            // Hide dialog
            deleteConfirmDialog.style.display = 'none';
            
            // Reset checkboxes and bulk selection
            document.getElementById('selectAllActivities').checked = false;
            document.querySelectorAll('.activity-checkbox').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            currentState.bulkSelection.allSelected = false;
            currentState.bulkSelection.selectedItems = [];
            
            // Hide bulk actions menu
            document.getElementById('bulkActionsMenu').style.display = 'none';
        });
        
        // Close dialog when clicking outside
        deleteConfirmDialog.addEventListener('click', (e) => {
            if (e.target === deleteConfirmDialog) {
                deleteConfirmDialog.style.display = 'none';
            }
        });
    }
}

/**
 * Apply filters, search, and pagination
 */
function applyFilters() {
    // In a real application, this would make an API request with the filter parameters
    // For demo purposes, we'll filter the mock activities data client-side
    
    // First, apply date range filter
    let filteredActivities = mockActivities.filter(activity => {
        const activityDate = new Date(activity.timestamp);
        
        // Skip date filter if no dates are set
        if (!currentState.dateRange.startDate || !currentState.dateRange.endDate) {
            return true;
        }
        
        // Create start and end date with time if needed
        let startDate = new Date(currentState.dateRange.startDate);
        let endDate = new Date(currentState.dateRange.endDate);
        
        if (currentState.dateRange.includeTime) {
            const [startHours, startMinutes] = currentState.dateRange.startTime.split(':').map(Number);
            const [endHours, endMinutes] = currentState.dateRange.endTime.split(':').map(Number);
            
            startDate.setHours(startHours, startMinutes, 0, 0);
            endDate.setHours(endHours, endMinutes, 59, 999);
        } else {
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
        }
        
        return activityDate >= startDate && activityDate <= endDate;
    });
    
    // Apply category filter
    if (currentState.filters.category !== 'all') {
        filteredActivities = filteredActivities.filter(activity => {
            return activity.actionType === currentState.filters.category;
        });
    }
    
    // Apply user filter
    if (currentState.filters.user !== 'all') {
        filteredActivities = filteredActivities.filter(activity => {
            if (currentState.filters.user === 'system') {
                return activity.user.id === 'SYSTEM';
            } else {
                return activity.user.role.toLowerCase().includes(currentState.filters.user);
            }
        });
    }
    
    // Apply module filter
    if (currentState.filters.module !== 'all') {
        filteredActivities = filteredActivities.filter(activity => {
            return activity.module.toLowerCase().includes(currentState.filters.module);
        });
    }
    
    // Apply search keyword
    if (currentState.search.keyword) {
        filteredActivities = filteredActivities.filter(activity => {
            const searchTarget = [
                activity.user.name, 
                activity.description, 
                activity.module
            ].join(' ').toLowerCase();
            
            const keyword = currentState.search.keyword.toLowerCase();
            
            // Apply search operator (using advancedCriteria.operator if available)
            const operator = currentState.search.advancedCriteria.operator || 'contains';
            
            switch(operator) {
                case 'contains':
                    return searchTarget.includes(keyword);
                case 'exact':
                    return searchTarget === keyword;
                case 'startsWith':
                    return searchTarget.startsWith(keyword);
                case 'endsWith':
                    return searchTarget.endsWith(keyword);
                default:
                    return searchTarget.includes(keyword);
            }
        });
    }
    
    // Update total count
    currentState.pagination.totalItems = filteredActivities.length;
    currentState.pagination.totalPages = Math.ceil(filteredActivities.length / currentState.pagination.itemsPerPage);
    
    // Make sure current page is valid
    if (currentState.pagination.currentPage > currentState.pagination.totalPages) {
        currentState.pagination.currentPage = currentState.pagination.totalPages || 1;
    }
    
    // Apply pagination
    const startIndex = (currentState.pagination.currentPage - 1) * currentState.pagination.itemsPerPage;
    const endIndex = startIndex + currentState.pagination.itemsPerPage;
    const paginatedActivities = filteredActivities.slice(startIndex, endIndex);
    
    // Update UI
    renderActivityList(paginatedActivities);
    updatePaginationUI();
}

/**
 * Render activity list with filtered data
 */
function renderActivityList(activities) {
    const activityListContainer = document.querySelector('.activity-list');
    
    // Clear existing list
    //activityListContainer.innerHTML = '';
    
    // If no activities found, show message
    if (activities.length === 0) {
        activityListContainer.innerHTML = '<div class="no-activities">No activities found matching your criteria.</div>';
        return;
    }
    
    // In a real implementation, we would render the list dynamically
    // For demo purposes, we'll just log the filtered activities
    console.log('Filtered Activities:', activities);
    
    // We're keeping the existing static HTML for demo purposes
    // Below is an example of how we would dynamically render the list
    
    /*
    let html = '';
    
    activities.forEach((activity, index) => {
        const formattedDate = formatDateTime(activity.timestamp);
        
        html += `
            <div class="activity-entry">
                <div class="entry-checkbox">
                    <input type="checkbox" id="activity${index + 1}" class="activity-checkbox">
                    <label for="activity${index + 1}"></label>
                </div>

                <div class="entry-timestamp">
                    <span class="date">${formattedDate.date}</span>
                    <span class="time">${formattedDate.time}</span>
                </div>

                <div class="entry-icon ${activity.actionClass}">
                    <i class="fas ${activity.actionIcon}"></i>
                </div>

                <div class="entry-details">
                    <div class="user-info">
                        ${activity.user.id === 'SYSTEM' 
                            ? `<span class="system-user">System</span>` 
                            : `
                                <img src="${activity.user.avatar}" alt="User Avatar" class="user-avatar-small">
                                <span class="user-name">${activity.user.name}</span>
                                <span class="user-role">${activity.user.role}</span>
                            `
                        }
                    </div>

                    <div class="activity-description">
                        <p>${activity.description}</p>
                        <span class="module-label">${activity.module}</span>
                    </div>
                </div>

                <div class="entry-actions">
                    <button class="view-details-btn" data-activity-id="${activity.id}">
                        <i class="fas fa-eye"></i>
                        View Details
                    </button>
                </div>
            </div>
        `;
    });
    
    activityListContainer.innerHTML = html;
    */
}

/**
 * Initialize dark mode toggle
 */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for user preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial state
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkModeNow = document.body.classList.contains('dark-mode');
        
        // Update toggle button icon
        darkModeToggle.innerHTML = isDarkModeNow ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('darkMode', isDarkModeNow);
    });
}