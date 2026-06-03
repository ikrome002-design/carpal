/**
 * CarPal by Citrus - Notifications Page JavaScript
 * This script implements all interactive functionality for the notifications page
 * following the navigation map functionality requirements.
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // DOM Element References
    // ============================================
    
    // User Interface Elements
    const userProfile = document.getElementById('userProfile');
    const profileDropdown = document.getElementById('profileDropdown');
    const filterBtn = document.getElementById('filterBtn');
    const sortBtn = document.getElementById('sortBtn');
    const filterDropdown = document.getElementById('filterDropdown');
    const sortDropdown = document.getElementById('sortDropdown');
    const notifSettingsBtn = document.getElementById('notifSettingsBtn');
    const notifSettingsPanel = document.getElementById('notifSettingsPanel');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const archivedBtn = document.getElementById('archivedBtn');
    const archivedPanel = document.getElementById('archivedPanel');
    const closeArchivedBtn = document.getElementById('closeArchivedBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const notificationsFeed = document.getElementById('notificationsFeed');
    const realTimeAlert = document.getElementById('realTimeAlert');
    
    // Form inputs and buttons
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const sortOptions = document.querySelectorAll('input[name="sort"]');
    const applyFilterBtn = document.querySelector('.apply-filter-btn');
    const clearFilterBtn = document.querySelector('.clear-filter-btn');
    const applySortBtn = document.querySelector('.apply-sort-btn');
    const viewAlertBtn = document.querySelector('.view-alert-btn');
    const dismissAlertBtn = document.querySelector('.dismiss-alert-btn');
    
    // Settings toggles
    const appointmentToggle = document.getElementById('appointmentToggle');
    const inventoryToggle = document.getElementById('inventoryToggle');
    const billingToggle = document.getElementById('billingToggle');
    const inAppToggle = document.getElementById('inAppToggle');
    const emailToggle = document.getElementById('emailToggle');
    
    // ============================================
    // Data Storage and State Management
    // ============================================
    
    // Store all notifications including archived in-memory
    const notificationState = {
        activeNotifications: [],  // Active notifications in the feed
        archivedNotifications: [], // Archived notifications
        notificationSettings: {
            categories: {
                appointment: true,
                inventory: true,
                billing: true
            },
            channels: {
                inApp: true,
                email: true
            }
        },
        filters: {
            categories: [] // Active category filters
        },
        sorting: {
            method: "newest" // Current sort method
        }
    };
    
    // ============================================
    // Initialization Functions
    // ============================================
    
    /**
     * Initialize the page when loaded
     */
    function initializePage() {
        // Load any saved notification settings from localStorage
        loadSettings();
        
        // Capture the initial state of notifications
        captureInitialNotificationState();
        
        // Initialize notification count
        updateNotificationCount();
        
        // Initialize dark mode based on preference
        initializeDarkMode();
        
        // Set initial sort option
        sortOptions[0].checked = true; // Select "Newest First" by default
        
        // Initialize simulated real-time notifications
        initializeRealTimeAlerts();
    }
    
    /**
     * Capture the initial state of notifications in the DOM
     */
    function captureInitialNotificationState() {
        // Get all active notifications
        const notificationItems = document.querySelectorAll('.notification-item');
        
        notificationItems.forEach(item => {
            const notifObj = createNotificationObjectFromDOM(item);
            notificationState.activeNotifications.push(notifObj);
        });
        
        // Get all archived notifications
        const archivedItems = document.querySelectorAll('.archived-item');
        
        archivedItems.forEach(item => {
            const archiveObj = createArchivedObjectFromDOM(item);
            notificationState.archivedNotifications.push(archiveObj);
        });
    }
    
    /**
     * Create a notification object from DOM element
     * @param {HTMLElement} element - The notification element
     * @returns {Object} Notification object
     */
    function createNotificationObjectFromDOM(element) {
        const isUnread = element.classList.contains('unread');
        const isHighPriority = element.classList.contains('high-priority');
        const iconElement = element.querySelector('.notification-icon');
        
        // Determine category based on icon classes
        let category = '';
        if (iconElement.classList.contains('appointment')) {
            category = 'appointment';
        } else if (iconElement.classList.contains('inventory')) {
            category = 'inventory';
        } else if (iconElement.classList.contains('billing')) {
            category = 'billing';
        }
        
        return {
            id: 'notif_' + Math.random().toString(36).substr(2, 9), // Generate a random ID
            title: element.querySelector('h4').textContent,
            message: element.querySelector('p').textContent,
            timestamp: element.querySelector('.notification-time').textContent,
            category: category,
            isUnread: isUnread,
            isHighPriority: isHighPriority,
            iconClass: iconElement.querySelector('i').className,
            element: element // Store reference to DOM element
        };
    }
    
    /**
     * Create an archived notification object from DOM element
     * @param {HTMLElement} element - The archived notification element
     * @returns {Object} Archived notification object
     */
    function createArchivedObjectFromDOM(element) {
        const iconElement = element.querySelector('.notification-icon');
        
        // Determine category based on icon classes
        let category = '';
        if (iconElement.classList.contains('appointment')) {
            category = 'appointment';
        } else if (iconElement.classList.contains('inventory')) {
            category = 'inventory';
        } else if (iconElement.classList.contains('billing')) {
            category = 'billing';
        }
        
        return {
            id: 'arch_' + Math.random().toString(36).substr(2, 9), // Generate a random ID
            title: element.querySelector('h4').textContent,
            message: element.querySelector('p').textContent,
            timestamp: element.querySelector('.notification-time').textContent,
            category: category,
            iconClass: iconElement.querySelector('i').className,
            element: element // Store reference to DOM element
        };
    }
    
    /**
     * Initialize dark mode based on saved preference
     */
    function initializeDarkMode() {
        const darkModeSetting = localStorage.getItem('darkMode') === 'true';
        
        if (darkModeSetting) {
            document.body.classList.add('dark-mode');
            darkModeToggle.classList.remove('fa-moon');
            darkModeToggle.classList.add('fa-sun');
        }
    }
    
    /**
     * Load notification settings from localStorage
     */
    function loadSettings() {
        const savedSettings = localStorage.getItem('notificationSettings');
        
        if (savedSettings) {
            try {
                const parsedSettings = JSON.parse(savedSettings);
                notificationState.notificationSettings = parsedSettings;
                
                // Apply loaded settings to toggles
                appointmentToggle.checked = parsedSettings.categories.appointment;
                inventoryToggle.checked = parsedSettings.categories.inventory;
                billingToggle.checked = parsedSettings.categories.billing;
                inAppToggle.checked = parsedSettings.channels.inApp;
                emailToggle.checked = parsedSettings.channels.email;
                
                // Apply filter visibility based on settings
                applyNotificationSettings();
            } catch (e) {
                console.error('Error loading notification settings:', e);
            }
        }
    }
    
    /**
     * Apply notification settings by filtering out disabled categories
     */
    function applyNotificationSettings() {
        const settings = notificationState.notificationSettings;
        
        // First, show all notifications
        document.querySelectorAll('.notification-item').forEach(item => {
            item.style.display = 'flex';
        });
        
        // Then hide those from disabled categories
        if (!settings.categories.appointment) {
            document.querySelectorAll('.notification-icon.appointment').forEach(icon => {
                const notificationItem = icon.closest('.notification-item');
                if (notificationItem) {
                    notificationItem.style.display = 'none';
                }
            });
        }
        
        if (!settings.categories.inventory) {
            document.querySelectorAll('.notification-icon.inventory').forEach(icon => {
                const notificationItem = icon.closest('.notification-item');
                if (notificationItem) {
                    notificationItem.style.display = 'none';
                }
            });
        }
        
        if (!settings.categories.billing) {
            document.querySelectorAll('.notification-icon.billing').forEach(icon => {
                const notificationItem = icon.closest('.notification-item');
                if (notificationItem) {
                    notificationItem.style.display = 'none';
                }
            });
        }
    }
    
    /**
     * Update the notification count badge
     */
    function updateNotificationCount() {
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        const notificationCount = document.querySelector('.notification-count');
        
        if (unreadCount > 0) {
            notificationCount.textContent = unreadCount;
            notificationCount.style.display = 'flex';
        } else {
            notificationCount.style.display = 'none';
        }
    }
    
    /**
     * Initialize simulated real-time alerts
     */
    function initializeRealTimeAlerts() {
        // Simulate a real-time alert arriving after 5 seconds
        setTimeout(() => {
            showRealTimeAlert();
        }, 5000);
    }
    
    // ============================================
    // UI Interaction Event Handlers
    // ============================================
    
    /**
     * Toggle user profile dropdown visibility
     */
    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        
        // Close other dropdowns/panels when opening this one
        filterDropdown.style.display = 'none';
        sortDropdown.style.display = 'none';
    });
    
    /**
     * Toggle filter dropdown visibility
     */
    filterBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        filterDropdown.style.display = filterDropdown.style.display === 'block' ? 'none' : 'block';
        
        // Close other dropdowns/panels when opening this one
        sortDropdown.style.display = 'none';
        profileDropdown.style.display = 'none';
    });
    
    /**
     * Toggle sort dropdown visibility
     */
    sortBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        sortDropdown.style.display = sortDropdown.style.display === 'block' ? 'none' : 'block';
        
        // Close other dropdowns/panels when opening this one
        filterDropdown.style.display = 'none';
        profileDropdown.style.display = 'none';
    });
    
    /**
     * Open notification settings panel
     */
    notifSettingsBtn.addEventListener('click', function() {
        notifSettingsPanel.style.right = '0';
        
        // Close other dropdowns/panels when opening this one
        archivedPanel.style.right = '-380px';
        profileDropdown.style.display = 'none';
        filterDropdown.style.display = 'none';
        sortDropdown.style.display = 'none';
    });
    
    /**
     * Close notification settings panel
     */
    closeSettingsBtn.addEventListener('click', function() {
        notifSettingsPanel.style.right = '-380px';
    });
    
    /**
     * Save notification settings
     */
    saveSettingsBtn.addEventListener('click', function() {
        // Update notification settings state
        notificationState.notificationSettings.categories.appointment = appointmentToggle.checked;
        notificationState.notificationSettings.categories.inventory = inventoryToggle.checked;
        notificationState.notificationSettings.categories.billing = billingToggle.checked;
        notificationState.notificationSettings.channels.inApp = inAppToggle.checked;
        notificationState.notificationSettings.channels.email = emailToggle.checked;
        
        // Save to localStorage
        localStorage.setItem('notificationSettings', JSON.stringify(notificationState.notificationSettings));
        
        // Apply settings to filter notifications
        applyNotificationSettings();
        
        // Show success message and close panel
        showSuccessMessage('Notification settings saved successfully');
        notifSettingsPanel.style.right = '-380px';
    });
    
    /**
     * Open archived notifications panel
     */
    archivedBtn.addEventListener('click', function() {
        archivedPanel.style.right = '0';
        
        // Close other dropdowns/panels when opening this one
        notifSettingsPanel.style.right = '-380px';
        profileDropdown.style.display = 'none';
        filterDropdown.style.display = 'none';
        sortDropdown.style.display = 'none';
    });
    
    /**
     * Close archived notifications panel
     */
    closeArchivedBtn.addEventListener('click', function() {
        archivedPanel.style.right = '-380px';
    });
    
    /**
     * Toggle dark mode
     */
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Toggle icon between moon and sun
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.classList.remove('fa-moon');
            darkModeToggle.classList.add('fa-sun');
        } else {
            darkModeToggle.classList.remove('fa-sun');
            darkModeToggle.classList.add('fa-moon');
        }
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    /**
     * Close dropdowns when clicking outside
     */
    document.addEventListener('click', function(e) {
        if (!userProfile.contains(e.target)) {
            profileDropdown.style.display = 'none';
        }
        
        if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
            filterDropdown.style.display = 'none';
        }
        
        if (!sortBtn.contains(e.target) && !sortDropdown.contains(e.target)) {
            sortDropdown.style.display = 'none';
        }
    });
    
    // ============================================
    // Notification Action Handlers
    // ============================================
    
    /**
     * Handle notification item actions (Read, Unread, Archive, Dismiss)
     */
    notificationsFeed.addEventListener('click', function(e) {
        const target = e.target;
        
        // Find the closest notification item
        const notificationItem = target.closest('.notification-item');
        if (!notificationItem) return;
        
        // Mark as Read button
        if (target.classList.contains('mark-read-btn') || target.closest('.mark-read-btn')) {
            markNotificationAsRead(notificationItem);
        }
        
        // Mark as Unread button
        else if (target.classList.contains('mark-unread-btn') || target.closest('.mark-unread-btn')) {
            markNotificationAsUnread(notificationItem);
        }
        
        // Archive button
        else if (target.classList.contains('archive-btn') || target.closest('.archive-btn')) {
            archiveNotification(notificationItem);
        }
        
        // Dismiss button
        else if (target.classList.contains('dismiss-btn') || target.closest('.dismiss-btn')) {
            dismissNotification(notificationItem);
        }
        
        // View Details button
        else if (target.classList.contains('view-details-btn') || target.closest('.view-details-btn')) {
            viewNotificationDetails(notificationItem);
        }
    });
    
    /**
     * Mark a notification as read
     * @param {HTMLElement} notificationItem - The notification element
     */
    function markNotificationAsRead(notificationItem) {
        notificationItem.classList.remove('unread');
        
        // Replace the mark-read button with mark-unread button
        const markReadBtn = notificationItem.querySelector('.mark-read-btn');
        const newBtn = document.createElement('button');
        newBtn.className = 'mark-unread-btn';
        newBtn.innerHTML = '<i class="fas fa-envelope"></i>';
        markReadBtn.parentNode.replaceChild(newBtn, markReadBtn);
        
        // Update notification count
        updateNotificationCount();
        
        // Update the notification state
        updateNotificationState();
    }
    
    /**
     * Mark a notification as unread
     * @param {HTMLElement} notificationItem - The notification element
     */
    function markNotificationAsUnread(notificationItem) {
        notificationItem.classList.add('unread');
        
        // Replace the mark-unread button with mark-read button
        const markUnreadBtn = notificationItem.querySelector('.mark-unread-btn');
        const newBtn = document.createElement('button');
        newBtn.className = 'mark-read-btn';
        newBtn.innerHTML = '<i class="fas fa-check"></i>';
        markUnreadBtn.parentNode.replaceChild(newBtn, markUnreadBtn);
        
        // Update notification count
        updateNotificationCount();
        
        // Update the notification state
        updateNotificationState();
    }
    
    /**
     * Archive a notification
     * @param {HTMLElement} notificationItem - The notification element
     */
    function archiveNotification(notificationItem) {
        // Create archived notification element
        const archivedItem = createArchivedItem(notificationItem);
        
        // Add to archived list
        document.querySelector('.archived-list').appendChild(archivedItem);
        
        // Remove from active notifications
        notificationItem.remove();
        
        // Update notification count
        updateNotificationCount();
        
        // Update the notification state
        updateNotificationState();
        
        // Show confirmation message
        showSuccessMessage('Notification archived');
    }
    
    /**
     * Create an archived item element from active notification
     * @param {HTMLElement} notificationItem - The notification element
     * @returns {HTMLElement} The archived notification element
     */
    function createArchivedItem(notificationItem) {
        const title = notificationItem.querySelector('h4').textContent;
        const message = notificationItem.querySelector('p').textContent;
        const timestamp = notificationItem.querySelector('.notification-time').textContent;
        const iconClass = notificationItem.querySelector('.notification-icon i').className;
        const iconDiv = notificationItem.querySelector('.notification-icon').cloneNode(true);
        
        // Create new archived item element
        const archivedItem = document.createElement('div');
        archivedItem.className = 'archived-item';
        
        // Build the HTML structure
        archivedItem.innerHTML = `
            <div class="archive-content">
                <div class="notification-icon ${iconDiv.classList[1]}">
                    <i class="${iconClass}"></i>
                </div>
                <div class="notification-details">
                    <h4>${title}</h4>
                    <p>${message}</p>
                    <span class="notification-time">${timestamp}</span>
                </div>
            </div>
            <div class="archive-actions">
                <button class="restore-btn">Restore</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        // Add event listeners
        archivedItem.querySelector('.restore-btn').addEventListener('click', function() {
            restoreNotification(archivedItem);
        });
        
        archivedItem.querySelector('.delete-btn').addEventListener('click', function() {
            deleteArchivedNotification(archivedItem);
        });
        
        return archivedItem;
    }
    
    /**
     * Dismiss (remove) a notification
     * @param {HTMLElement} notificationItem - The notification element
     */
    function dismissNotification(notificationItem) {
        // Remove the notification
        notificationItem.remove();
        
        // Update notification count
        updateNotificationCount();
        
        // Update the notification state
        updateNotificationState();
        
        // Show confirmation message
        showSuccessMessage('Notification dismissed');
    }
    
    /**
     * View notification details (navigate to source)
     * @param {HTMLElement} notificationItem - The notification element
     */
    function viewNotificationDetails(notificationItem) {
        // Get notification category to determine where to navigate
        const iconElement = notificationItem.querySelector('.notification-icon');
        let destinationUrl = '';
        
        if (iconElement.classList.contains('appointment')) {
            destinationUrl = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Auto Repair Shop 3.0\\Service Hub\\service_hub.html';
        } else if (iconElement.classList.contains('inventory')) {
            destinationUrl = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Auto Repair Shop 3.0\\Inventory\\inventory.html';
        } else if (iconElement.classList.contains('billing')) {
            destinationUrl = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Auto Repair Shop 3.0\\Billings & Payments\\billings.html';
        } else {
            destinationUrl = 'C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Auto Repair Shop 3.0\\Dashboard\\dashboard.html';
        }
        
        // For demo purposes, show an alert instead of navigating
        alert(`Navigating to: ${destinationUrl}\nTo view details for: ${notificationItem.querySelector('h4').textContent}`);
        
        // Mark as read if it's unread
        if (notificationItem.classList.contains('unread')) {
            markNotificationAsRead(notificationItem);
        }
    }
    
    /**
     * Restore an archived notification
     * @param {HTMLElement} archivedItem - The archived item element
     */
    function restoreNotification(archivedItem) {
        // Create a new notification item from archived
        const title = archivedItem.querySelector('h4').textContent;
        const message = archivedItem.querySelector('p').textContent;
        const timestamp = archivedItem.querySelector('.notification-time').textContent;
        const iconClass = archivedItem.querySelector('.notification-icon i').className;
        const categoryClass = archivedItem.querySelector('.notification-icon').classList[1];
        
        // Create notification item element
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item';
        
        // Build the HTML structure
        notificationItem.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon ${categoryClass}">
                    <i class="${iconClass}"></i>
                </div>
                <div class="notification-details">
                    <h4>${title}</h4>
                    <p>${message}</p>
                    <span class="notification-time">${timestamp}</span>
                </div>
            </div>
            <div class="notification-actions">
                <button class="mark-unread-btn"><i class="fas fa-envelope"></i></button>
                <button class="view-details-btn">View Details</button>
                <button class="archive-btn"><i class="fas fa-archive"></i></button>
                <button class="dismiss-btn"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Add to notification feed at the top
        notificationsFeed.insertBefore(notificationItem, notificationsFeed.firstChild);
        
        // Remove from archived list
        archivedItem.remove();
        
        // Update notification state
        updateNotificationState();
        
        // Show confirmation message
        showSuccessMessage('Notification restored to active feed');
    }
    
    /**
     * Delete an archived notification permanently
     * @param {HTMLElement} archivedItem - The archived item element
     */
    function deleteArchivedNotification(archivedItem) {
        // Show confirmation dialog
        if (confirm('Are you sure you want to permanently delete this notification?')) {
            // Remove from archived list
            archivedItem.remove();
            
            // Update notification state
            updateNotificationState();
            
            // Show confirmation message
            showSuccessMessage('Notification permanently deleted');
        }
    }
    
    // ============================================
    // Filter and Sort Functions
    // ============================================
    
    /**
     * Apply category filters to notifications
     */
    applyFilterBtn.addEventListener('click', function() {
        // Get selected categories
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        
        // Update filter state
        notificationState.filters.categories = selectedCategories;
        
        // Apply filters to DOM
        applyFiltersToNotifications(selectedCategories);
        
        // Close filter dropdown
        filterDropdown.style.display = 'none';
    });
    
    /**
     * Clear all active filters
     */
    clearFilterBtn.addEventListener('click', function() {
        // Uncheck all category checkboxes
        categoryCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear filters in state
        notificationState.filters.categories = [];
        
        // Show all notifications (respecting settings)
        applyNotificationSettings();
        
        // Close filter dropdown
        filterDropdown.style.display = 'none';
    });
    
    /**
     * Apply filters to notifications based on selected categories
     * @param {Array} selectedCategories - Array of category names to filter by
     */
    function applyFiltersToNotifications(selectedCategories) {
        const notificationItems = document.querySelectorAll('.notification-item');
        
        if (selectedCategories.length === 0) {
            // If no filters selected, apply notification settings
            applyNotificationSettings();
        } else {
            // First make all notifications visible
            notificationItems.forEach(item => {
                item.style.display = 'flex';
            });
            
            // Hide notifications that don't match filters
            notificationItems.forEach(item => {
                const notificationIcon = item.querySelector('.notification-icon');
                
                // Determine category
                let category = '';
                if (notificationIcon.classList.contains('appointment')) {
                    category = 'appointment';
                } else if (notificationIcon.classList.contains('inventory')) {
                    category = 'inventory';
                } else if (notificationIcon.classList.contains('billing')) {
                    category = 'billing';
                }
                
                // Hide if category is not in selected categories
                if (!selectedCategories.includes(category)) {
                    item.style.display = 'none';
                }
                
                // Also hide if category is disabled in settings
                if (!notificationState.notificationSettings.categories[category]) {
                    item.style.display = 'none';
                }
            });
        }
    }
    
    /**
     * Apply sorting to notifications
     */
    applySortBtn.addEventListener('click', function() {
        // Get selected sort method
        const selectedSort = document.querySelector('input[name="sort"]:checked')?.value || 'newest';
        
        // Update sort state
        notificationState.sorting.method = selectedSort;
        
        // Sort notifications
        sortNotifications(selectedSort);
        
        // Close sort dropdown
        sortDropdown.style.display = 'none';
    });
    
    /**
     * Sort notifications based on selected method
     * @param {string} sortMethod - The sorting method to apply
     */
    function sortNotifications(sortMethod) {
        const notificationItems = Array.from(document.querySelectorAll('.notification-item'));
        
        // Empty the feed
        while (notificationsFeed.firstChild) {
            notificationsFeed.removeChild(notificationsFeed.firstChild);
        }
        
        // Sort the items based on the selected method
        if (sortMethod === 'newest') {
            // Sort by date - newest first (for demo we'll use reverse order of current DOM)
            notificationItems.reverse();
        } else if (sortMethod === 'oldest') {
            // Sort by date - oldest first (for demo we'll use current DOM order)
            // No change needed
        } else if (sortMethod === 'priority') {
            // Sort by priority - high to low
            notificationItems.sort((a, b) => {
                const aPriority = a.classList.contains('high-priority') ? 2 : 
                                 a.classList.contains('unread') ? 1 : 0;
                const bPriority = b.classList.contains('high-priority') ? 2 : 
                                 b.classList.contains('unread') ? 1 : 0;
                return bPriority - aPriority;
            });
        }
        
        // Add the sorted notifications back to the feed
        notificationItems.forEach(item => {
            notificationsFeed.appendChild(item);
        });
    }
    
    // ============================================
    // Real-time Alert Functions
    // ============================================
    
    /**
     * Show real-time alert for high priority notifications
     */
    function showRealTimeAlert() {
        realTimeAlert.style.display = 'block';
        
        // Auto-hide after 15 seconds
        setTimeout(() => {
            if (realTimeAlert.style.display === 'block') {
                realTimeAlert.style.display = 'none';
            }
        }, 15000);
    }
    
    /**
     * Handle view alert button click
     */
    viewAlertBtn.addEventListener('click', function() {
        // In a real app, this would navigate to the relevant source
        alert('Navigating to vehicle details for KZN 123A');
        realTimeAlert.style.display = 'none';
    });
    
    /**
     * Handle dismiss alert button click
     */
    dismissAlertBtn.addEventListener('click', function() {
        realTimeAlert.style.display = 'none';
    });
    
    // ============================================
    // Utility Functions
    // ============================================
    
    /**
     * Show a success message to the user
     * @param {string} message - The message to display
     */
    function showSuccessMessage(message) {
        // Create a toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Make visible with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300); // Wait for fade out animation
        }, 3000);
    }
    
    /**
     * Update notification state after changes
     */
    function updateNotificationState() {
        // Refresh active notifications array
        notificationState.activeNotifications = [];
        document.querySelectorAll('.notification-item').forEach(item => {
            const notifObj = createNotificationObjectFromDOM(item);
            notificationState.activeNotifications.push(notifObj);
        });
        
        // Refresh archived notifications array
        notificationState.archivedNotifications = [];
        document.querySelectorAll('.archived-item').forEach(item => {
            const archiveObj = createArchivedObjectFromDOM(item);
            notificationState.archivedNotifications.push(archiveObj);
        });
    }
    
    /**
     * Create a new notification (for simulation purposes)
     * @param {Object} notifData - Notification data
     */
    function createNewNotification(notifData) {
        // Create a new notification element
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item unread';
        
        if (notifData.isHighPriority) {
            notificationItem.classList.add('high-priority');
        }
        
        notificationItem.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon ${notifData.category}">
                    <i class="${notifData.iconClass}"></i>
                </div>
                <div class="notification-details">
                    <h4>${notifData.title}</h4>
                    <p>${notifData.message}</p>
                    <span class="notification-time">${notifData.timestamp}</span>
                </div>
            </div>
            <div class="notification-actions">
                <button class="mark-read-btn"><i class="fas fa-check"></i></button>
                <button class="view-details-btn">View Details</button>
                <button class="archive-btn"><i class="fas fa-archive"></i></button>
                <button class="dismiss-btn"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Insert at the top of the notifications feed
        notificationsFeed.insertBefore(notificationItem, notificationsFeed.firstChild);
        
        // Update notification count
        updateNotificationCount();
        
        // Update notification state
        updateNotificationState();
        
        // Show real-time alert if high priority
        if (notifData.isHighPriority) {
            // Use the notification data to create an alert
            document.querySelector('.alert-details h4').textContent = notifData.title;
            document.querySelector('.alert-details p').textContent = notifData.message;
            showRealTimeAlert();
        }
    }
    
    // ============================================
    // Demonstration / Simulation Functions
    // ============================================
    
    /**
     * Simulate periodic new notifications
     */
    function setupNotificationSimulation() {
        // Schedule periodic new notifications
        setTimeout(() => {
            // Create a new inventory alert notification
            const newInventoryNotif = {
                title: "Low Stock Alert: Windshield Wipers",
                message: "Inventory levels for windshield wipers are below threshold (3 items remaining).",
                timestamp: "Just now",
                category: "inventory",
                isHighPriority: false,
                iconClass: "fas fa-boxes"
            };
            
            createNewNotification(newInventoryNotif);
        }, 30000); // 30 seconds
        
        setTimeout(() => {
            // Create a new high priority billing notification
            const newBillingNotif = {
                title: "Payment Overdue: Invoice #INV-2025-0139",
                message: "Payment for KLM 456P is 7 days overdue. Amount: KES 42,300.",
                timestamp: "Just now",
                category: "billing",
                isHighPriority: true,
                iconClass: "fas fa-exclamation-triangle"
            };
            
            createNewNotification(newBillingNotif);
        }, 60000); // 60 seconds
    }
    
    // ============================================
    // Custom CSS for Toast Notifications
    // ============================================
    
    // Create and add the necessary CSS for toast notifications
    function addToastNotificationStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .toast-notification {
                position: fixed;
                bottom: 80px;
                right: 20px;
                background-color: rgba(76, 175, 80, 0.9);
                color: white;
                padding: 12px 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                z-index: 1050;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
                font-family: var(--font-primary);
                font-size: 14px;
            }
            
            .toast-notification.show {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // ============================================
    // Application Initialization
    // ============================================
    
    // Add custom toast notification styles
    addToastNotificationStyles();
    
    // Initialize the page
    initializePage();
    
    // Set up notification simulation for demonstration
    setupNotificationSimulation();
});