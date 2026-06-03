/**
 * CarPal by Citrus - Inventory Management JavaScript
 * 
 * This file handles the functionality of the Inventory management page
 * including tab navigation, dropdowns, modals, and data handling.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI components
    initializeUI();
    
    // Load sample data
    loadSampleData();
    
    // Initialize charts
    initializeCharts();
});

/**
 * Initialize UI components and event listeners
 */
function initializeUI() {
    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding pane
            const targetPaneId = button.getAttribute('data-tab');
            document.getElementById(targetPaneId).classList.add('active');
        });
    });
    
    // Notifications Dropdown Toggle
    const notificationsToggle = document.getElementById('notificationsToggle');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    
    notificationsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsDropdown.style.display = notificationsDropdown.style.display === 'block' ? 'none' : 'block';
        // Hide profile dropdown if open
        if (profileDropdown.style.display === 'block') {
            profileDropdown.style.display = 'none';
        }
    });
    
    // User Profile Dropdown Toggle
    const userProfileToggle = document.getElementById('userProfileToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    
    userProfileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        // Hide notifications dropdown if open
        if (notificationsDropdown.style.display === 'block') {
            notificationsDropdown.style.display = 'none';
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        notificationsDropdown.style.display = 'none';
        profileDropdown.style.display = 'none';
    });
    
    // Modal Handlers
    setupModalHandlers();
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleDarkMode);
    
    // Check if dark mode is stored in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Form Handlers
    setupFormHandlers();
    
    // Table Sorting and Filtering
    setupTableFilters();
}

/**
 * Toggle dark mode functionality
 */
function toggleDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

/**
 * Set up modal dialog handlers
 */
function setupModalHandlers() {
    // Add Item Modal
    const addNewItemBtn = document.getElementById('addNewItemBtn');
    const addItemModal = document.getElementById('addItemModal');
    const closeAddItemModal = document.getElementById('closeAddItemModal');
    const cancelAddItem = document.getElementById('cancelAddItem');
    
    addNewItemBtn.addEventListener('click', () => {
        addItemModal.style.display = 'flex';
    });
    
    closeAddItemModal.addEventListener('click', () => {
        addItemModal.style.display = 'none';
    });
    
    cancelAddItem.addEventListener('click', () => {
        addItemModal.style.display = 'none';
    });
    
    // Restock Modal
    const recordRestockBtn = document.getElementById('recordRestockBtn');
    const restockModal = document.getElementById('restockModal');
    const closeRestockModal = document.getElementById('closeRestockModal');
    const cancelRestock = document.getElementById('cancelRestock');
    
    recordRestockBtn.addEventListener('click', () => {
        populateRestockItemDropdown();
        restockModal.style.display = 'flex';
    });
    
    closeRestockModal.addEventListener('click', () => {
        restockModal.style.display = 'none';
    });
    
    cancelRestock.addEventListener('click', () => {
        restockModal.style.display = 'none';
    });
    
    // Manual Adjustment Modal
    const manualAdjustmentBtn = document.getElementById('manualAdjustmentBtn');
    const adjustmentModal = document.getElementById('adjustmentModal');
    const closeAdjustmentModal = document.getElementById('closeAdjustmentModal');
    const cancelAdjustment = document.getElementById('cancelAdjustment');
    
    manualAdjustmentBtn.addEventListener('click', () => {
        populateAdjustItemDropdown();
        adjustmentModal.style.display = 'flex';
    });
    
    closeAdjustmentModal.addEventListener('click', () => {
        adjustmentModal.style.display = 'none';
    });
    
    cancelAdjustment.addEventListener('click', () => {
        adjustmentModal.style.display = 'none';
    });
    
    // Report Generation Modal
    const generateReportBtn = document.getElementById('generateReportBtn');
    const reportModal = document.getElementById('reportModal');
    const closeReportModal = document.getElementById('closeReportModal');
    const cancelReport = document.getElementById('cancelReport');
    
    generateReportBtn.addEventListener('click', () => {
        reportModal.style.display = 'flex';
    });
    
    closeReportModal.addEventListener('click', () => {
        reportModal.style.display = 'none';
    });
    
    cancelReport.addEventListener('click', () => {
        reportModal.style.display = 'none';
    });
    
    // Export Modal
    const exportInventoryCard = document.getElementById('exportInventoryCard');
    const exportModal = document.getElementById('exportModal');
    const closeExportModal = document.getElementById('closeExportModal');
    const cancelExport = document.getElementById('cancelExport');
    
    exportInventoryCard.addEventListener('click', () => {
        exportModal.style.display = 'flex';
    });
    
    closeExportModal.addEventListener('click', () => {
        exportModal.style.display = 'none';
    });
    
    cancelExport.addEventListener('click', () => {
        exportModal.style.display = 'none';
    });
    
    // Success Modal
    const successOkBtn = document.getElementById('successOkBtn');
    const successModal = document.getElementById('successModal');
    
    successOkBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
    
    // Close all modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === addItemModal) {
            addItemModal.style.display = 'none';
        } else if (event.target === restockModal) {
            restockModal.style.display = 'none';
        } else if (event.target === adjustmentModal) {
            adjustmentModal.style.display = 'none';
        } else if (event.target === reportModal) {
            reportModal.style.display = 'none';
        } else if (event.target === exportModal) {
            exportModal.style.display = 'none';
        } else if (event.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // Report Type Change Handler
    const reportDateRange = document.getElementById('reportDateRange');
    const dateRangeCustom = document.querySelector('.date-range-custom');
    
    reportDateRange.addEventListener('change', function() {
        if (this.value === 'custom') {
            dateRangeCustom.style.display = 'flex';
        } else {
            dateRangeCustom.style.display = 'none';
        }
    });
}

/**
 * Set up form submission handlers
 */
function setupFormHandlers() {
    // Add Item Form
    const addItemForm = document.getElementById('addItemForm');
    addItemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showLoadingModal();
        
        // Simulate form processing delay
        setTimeout(() => {
            hideLoadingModal();
            showSuccessModal('Item Added Successfully', 'The new inventory item has been added to your inventory.');
            
            // Clear form and close modal
            addItemForm.reset();
            document.getElementById('addItemModal').style.display = 'none';
            
            // Refresh inventory list
            loadSampleData();
        }, 1000);
    });
    
    // Restock Form
    const restockForm = document.getElementById('restockForm');
    restockForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showLoadingModal();
        
        // Simulate form processing delay
        setTimeout(() => {
            hideLoadingModal();
            showSuccessModal('Restock Recorded', 'The inventory restock has been successfully recorded.');
            
            // Clear form and close modal
            restockForm.reset();
            document.getElementById('restockModal').style.display = 'none';
            
            // Refresh inventory list
            loadSampleData();
        }, 1000);
    });
    
    // Adjustment Form
    const adjustmentForm = document.getElementById('adjustmentForm');
    adjustmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showLoadingModal();
        
        // Simulate form processing delay
        setTimeout(() => {
            hideLoadingModal();
            showSuccessModal('Adjustment Recorded', 'The inventory adjustment has been successfully recorded.');
            
            // Clear form and close modal
            adjustmentForm.reset();
            document.getElementById('adjustmentModal').style.display = 'none';
            
            // Refresh inventory list
            loadSampleData();
        }, 1000);
    });
    
    // Report Form
    const reportForm = document.getElementById('reportForm');
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showLoadingModal();
        
        // Simulate form processing delay
        setTimeout(() => {
            hideLoadingModal();
            showSuccessModal('Report Generated', 'Your inventory report has been generated and is ready to download.');
            
            // Clear form and close modal
            reportForm.reset();
            document.getElementById('reportModal').style.display = 'none';
        }, 2000);
    });
    
    // Export Form
    const exportForm = document.getElementById('exportForm');
    exportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showLoadingModal();
        
        // Simulate form processing delay
        setTimeout(() => {
            hideLoadingModal();
            showSuccessModal('Export Complete', 'Your inventory data has been exported and is ready to download.');
            
            // Clear form and close modal
            exportForm.reset();
            document.getElementById('exportModal').style.display = 'none';
        }, 1500);
    });
}

/**
 * Show loading modal
 */
function showLoadingModal() {
    document.getElementById('loadingModal').style.display = 'flex';
}

/**
 * Hide loading modal
 */
function hideLoadingModal() {
    document.getElementById('loadingModal').style.display = 'none';
}

/**
 * Show success modal with custom title and message
 */
function showSuccessModal(title, message) {
    const successModal = document.getElementById('successModal');
    const successTitle = document.getElementById('successTitle');
    const successMessage = document.getElementById('successMessage');
    
    successTitle.textContent = title;
    successMessage.textContent = message;
    successModal.style.display = 'flex';
}

/**
 * Load sample data into the tables
 */
function loadSampleData() {
    // Inventory List Table
    const inventoryData = [
        { id: 1, name: 'Brake Pads (Front)', category: 'Brakes', sku: 'BP-2023-F', quantity: 15, threshold: 20, status: 'Low Stock' },
        { id: 2, name: 'Brake Pads (Rear)', category: 'Brakes', sku: 'BP-2023-R', quantity: 28, threshold: 20, status: 'In Stock' },
        { id: 3, name: 'Oil Filter', category: 'Filters', sku: 'OF-1010', quantity: 45, threshold: 30, status: 'In Stock' },
        { id: 4, name: 'Air Filter', category: 'Filters', sku: 'AF-2020', quantity: 32, threshold: 25, status: 'In Stock' },
        { id: 5, name: 'Synthetic Motor Oil (5W-30)', category: 'Fluids', sku: 'OIL-5W30', quantity: 120, threshold: 50, status: 'In Stock' },
        { id: 6, name: 'Transmission Fluid', category: 'Fluids', sku: 'TF-1000', quantity: 12, threshold: 15, status: 'Low Stock' },
        { id: 7, name: 'Headlight Bulb (LED)', category: 'Electrical', sku: 'HL-LED', quantity: 8, threshold: 10, status: 'Low Stock' },
        { id: 8, name: 'Battery Terminal Cleaner', category: 'Electrical', sku: 'BTC-200', quantity: 25, threshold: 10, status: 'In Stock' },
        { id: 9, name: 'Spark Plugs (Iridium)', category: 'Engine', sku: 'SP-IRD', quantity: 40, threshold: 20, status: 'In Stock' },
        { id: 10, name: 'Radiator Flush', category: 'Fluids', sku: 'RF-500', quantity: 0, threshold: 10, status: 'Out of Stock' },
        { id: 11, name: 'Cabin Air Filter', category: 'Filters', sku: 'CAF-300', quantity: 5, threshold: 15, status: 'Low Stock' },
        { id: 12, name: 'Wiper Blades (20")', category: 'Body', sku: 'WB-20', quantity: 22, threshold: 15, status: 'In Stock' }
    ];
    
    const inventoryTableBody = document.getElementById('inventoryTableBody');
    inventoryTableBody.innerHTML = '';
    
    inventoryData.forEach(item => {
        const row = document.createElement('tr');
        
        const statusClass = item.status === 'In Stock' ? 'in-stock' : 
                           item.status === 'Low Stock' ? 'low-stock' : 
                           item.status === 'Out of Stock' ? 'out-of-stock' : 'on-order';
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.sku}</td>
            <td>${item.quantity}</td>
            <td>${item.threshold}</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            <td>
                <a href="#" class="action-link edit-item" data-id="${item.id}">Edit</a>
                <a href="#" class="action-link delete-item" data-id="${item.id}">Remove</a>
            </td>
        `;
        
        inventoryTableBody.appendChild(row);
    });
    
    // Add event listeners to the edit and delete links
    document.querySelectorAll('.edit-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const itemId = this.getAttribute('data-id');
            alert('Edit item with ID: ' + itemId);
            // In a real application, this would open the edit modal with the item's data
        });
    });
    
    document.querySelectorAll('.delete-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const itemId = this.getAttribute('data-id');
            if (confirm('Are you sure you want to remove this item?')) {
                // In a real application, this would send a request to delete the item
                alert('Item with ID: ' + itemId + ' removed');
                loadSampleData(); // Refresh the table
            }
        });
    });
    
    // Low Stock Table
    const lowStockItems = inventoryData.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock');
    const lowStockTableBody = document.getElementById('lowStockTableBody');
    lowStockTableBody.innerHTML = '';
    
    lowStockItems.forEach(item => {
        const row = document.createElement('tr');
        
        const statusClass = item.status === 'Low Stock' ? 'low-stock' : 'out-of-stock';
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.threshold}</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            <td>
                <button class="action-btn" onclick="alert('Reorder ${item.name}')">
                    <i class="fas fa-shopping-cart"></i> Reorder
                </button>
            </td>
        `;
        
        lowStockTableBody.appendChild(row);
    });
    
    // Reorder Table
    const reorderItems = inventoryData.filter(item => item.quantity < item.threshold);
    const reorderTableBody = document.getElementById('reorderTableBody');
    reorderTableBody.innerHTML = '';
    
    reorderItems.forEach(item => {
        const row = document.createElement('tr');
        const recommendedOrder = item.threshold * 2 - item.quantity;
        const priority = item.quantity === 0 ? 'High' : item.quantity < (item.threshold / 2) ? 'Medium' : 'Low';
        
        row.innerHTML = `
            <td><input type="checkbox" class="select-item"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${recommendedOrder}</td>
            <td>Supplier Name</td>
            <td>${priority}</td>
            <td>
                <button class="action-btn" onclick="alert('Mark ${item.name} as ordered')">
                    <i class="fas fa-check"></i> Mark as Ordered
                </button>
            </td>
        `;
        
        reorderTableBody.appendChild(row);
    });
    
    // Usage Log Table
    const usageLogTableBody = document.getElementById('usageLogTableBody');
    usageLogTableBody.innerHTML = '';
    
    const usageLogData = [
        { date: '2025-03-25 09:15', item: 'Oil Filter', quantity: 1, type: 'Automatic Deduction', job: 'JOB-2025-123', user: 'John Smith' },
        { date: '2025-03-25 10:30', item: 'Synthetic Motor Oil (5W-30)', quantity: 5, type: 'Automatic Deduction', job: 'JOB-2025-123', user: 'John Smith' },
        { date: '2025-03-24 14:45', item: 'Brake Pads (Front)', quantity: 2, type: 'Automatic Deduction', job: 'JOB-2025-122', user: 'Sarah Johnson' },
        { date: '2025-03-24 16:20', item: 'Air Filter', quantity: 1, type: 'Automatic Deduction', job: 'JOB-2025-121', user: 'Sarah Johnson' },
        { date: '2025-03-23 11:10', item: 'Headlight Bulb (LED)', quantity: 2, type: 'Automatic Deduction', job: 'JOB-2025-120', user: 'Mike Anderson' },
        { date: '2025-03-23 13:45', item: 'Wiper Blades (20")', quantity: 2, type: 'Manual Adjustment', job: 'N/A', user: 'Admin User' },
        { date: '2025-03-22 09:30', item: 'Transmission Fluid', quantity: 5, type: 'Restock', job: 'N/A', user: 'Admin User' },
        { date: '2025-03-22 09:30', item: 'Cabin Air Filter', quantity: 10, type: 'Restock', job: 'N/A', user: 'Admin User' }
    ];
    
    usageLogData.forEach(log => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${log.date}</td>
            <td>${log.item}</td>
            <td>${log.quantity}</td>
            <td>${log.type}</td>
            <td>${log.job}</td>
            <td>${log.user}</td>
        `;
        
        usageLogTableBody.appendChild(row);
    });
    
    // Populate dropdown selections for modals
    populateRestockItemDropdown();
    populateAdjustItemDropdown();
}

/**
 * Populate restock item dropdown
 */
function populateRestockItemDropdown() {
    const restockItem = document.getElementById('restockItem');
    restockItem.innerHTML = '<option value="">Select Item</option>';
    
    const items = [
        { id: 1, name: 'Brake Pads (Front)', current: 15 },
        { id: 2, name: 'Brake Pads (Rear)', current: 28 },
        { id: 3, name: 'Oil Filter', current: 45 },
        { id: 10, name: 'Radiator Flush', current: 0 },
        { id: 11, name: 'Cabin Air Filter', current: 5 }
    ];
    
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        option.dataset.current = item.current;
        restockItem.appendChild(option);
    });
    
    // Add change event to update current quantity display
    restockItem.addEventListener('change', function() {
        const currentQty = document.getElementById('currentQuantity');
        const selectedOption = this.options[this.selectedIndex];
        
        if (selectedOption && selectedOption.dataset.current) {
            currentQty.value = selectedOption.dataset.current;
        } else {
            currentQty.value = '';
        }
    });
}