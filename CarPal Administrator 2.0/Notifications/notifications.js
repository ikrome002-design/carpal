/**
 * CarPal by Citrus - Notifications JavaScript
 * This file contains all the functionality for the Notifications page of the CarPal platform.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

/**
 * Initialize the application
 */
function initApp() {
    // Initialize all components
    initUserProfile();
    initTabNavigation();
    initNotificationActions();
    initBulkActions();
    initFiltersAndSorting();
    initNotificationDetails();
    initCreateNotification();
    initExportModal();
    initHistoricalLog();
    initNotificationPreferences();
    initPagination();
    initDarkMode();
    initMobileResponsiveness();
}

/**
 * Initialize user profile dropdown functionality
 */
function initUserProfile() {
    const userProfileBtn = document.getElementById('userProfileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (userProfileBtn && profileDropdown) {
        userProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target) && !userProfileBtn.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize tab navigation functionality
 */
function initTabNavigation() {
    const tabItems = document.querySelectorAll('.tab-item');
    const mainContent = document.querySelector('.notifications-dashboard');
    const preferencesContent = document.querySelector('.preferences-content');
    const historyContent = document.querySelector('.history-content');
    const notificationDetails = document.getElementById('notificationDetails');
    
    if (tabItems.length > 0) {
        tabItems.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show/hide content based on selected tab
                const tabType = this.getAttribute('data-tab');
                
                // Hide all content sections first
                if (mainContent) mainContent.style.display = 'none';
                if (preferencesContent) preferencesContent.style.display = 'none';
                if (historyContent) historyContent.style.display = 'none';
                if (notificationDetails) notificationDetails.style.display = 'none';
                
                // Show the appropriate content
                switch (tabType) {
                    case 'preferences':
                        if (preferencesContent) preferencesContent.style.display = 'block';
                        break;
                    case 'history':
                        if (historyContent) historyContent.style.display = 'block';
                        break;
                    default:
                        // For 'all', 'unread', and 'archived' tabs, show the main notifications list
                        if (mainContent) mainContent.style.display = 'block';
                        // Filter notifications based on tab
                        filterNotificationsByTab(tabType);
                        break;
                }
            });
        });
    }
}

/**
 * Filter notifications based on selected tab
 * @param {string} tabType - The type of tab selected (all, unread, archived)
 */
function filterNotificationsByTab(tabType) {
    const notifications = document.querySelectorAll('.notification-entry');
    
    if (notifications.length > 0) {
        notifications.forEach(notification => {
            notification.style.display = 'flex'; // Reset display
            
            switch (tabType) {
                case 'unread':
                    if (!notification.classList.contains('unread')) {
                        notification.style.display = 'none';
                    }
                    break;
                case 'archived':
                    // In a real implementation, archived items would have an 'archived' class
                    // For this demo, we'll assume none are archived yet
                    notification.style.display = 'none';
                    break;
                case 'all':
                default:
                    // Show all notifications
                    notification.style.display = 'flex';
                    break;
            }
        });
    }
    
    // Update the counter badge based on the filtered notifications
    updateUnreadCounter();
}

/**
 * Update the unread notifications counter
 */
function updateUnreadCounter() {
    const unreadNotifications = document.querySelectorAll('.notification-entry.unread');
    const counterBadges = document.querySelectorAll('.counter-badge, .tab-badge');
    const unreadCount = unreadNotifications.length;
    
    counterBadges.forEach(badge => {
        badge.textContent = unreadCount;
    });
    
    // If unread count is 0, potentially hide badges
    if (unreadCount === 0) {
        counterBadges.forEach(badge => {
            badge.style.display = 'none';
        });
    } else {
        counterBadges.forEach(badge => {
            badge.style.display = 'inline-flex';
        });
    }
}

/**
 * Initialize actions for individual notifications
 */
function initNotificationActions() {
    // Action menu buttons
    const actionMenuBtns = document.querySelectorAll('.action-menu-btn');
    
    actionMenuBtns.forEach(btn => {
        // Toggle menu visibility on click
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close all other open menus first
            document.querySelectorAll('.action-menu').forEach(menu => {
                if (menu !== this.nextElementSibling) {
                    menu.style.display = 'none';
                }
            });
            
            // Toggle the clicked menu
            const menu = this.nextElementSibling;
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });
    });
    
    // Close action menus when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.action-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
    
    // Action menu items (Mark as Read/Unread, Archive, Delete, View Details)
    setupActionMenuItems();
    
    // Setup notification entry clicks to view details
    setupNotificationEntryClicks();
}

/**
 * Setup action menu items functionality
 */
function setupActionMenuItems() {
    // Get all action menus
    const actionMenus = document.querySelectorAll('.action-menu');
    
    actionMenus.forEach(menu => {
        // Mark as Read/Unread
        const readAction = menu.querySelector('.read-action, .fa-envelope-open');
        if (readAction) {
            readAction.addEventListener('click', function(e) {
                e.preventDefault();
                const notificationEntry = findParentWithClass(this, 'notification-entry');
                
                if (notificationEntry) {
                    if (notificationEntry.classList.contains('unread')) {
                        notificationEntry.classList.remove('unread');
                        notificationEntry.classList.add('read');
                        this.innerHTML = '<i class="fas fa-envelope"></i> Mark as Unread';
                    } else {
                        notificationEntry.classList.remove('read');
                        notificationEntry.classList.add('unread');
                        this.innerHTML = '<i class="fas fa-envelope-open"></i> Mark as Read';
                    }
                    
                    // Update unread counter
                    updateUnreadCounter();
                }
                
                // Close the menu
                menu.style.display = 'none';
            });
        }
        
        // Archive
        const archiveAction = menu.querySelector('.archive-action, .fa-archive');
        if (archiveAction) {
            archiveAction.addEventListener('click', function(e) {
                e.preventDefault();
                const notificationEntry = findParentWithClass(this, 'notification-entry');
                
                if (notificationEntry) {
                    // In a real implementation, this would send an API request to archive the notification
                    // For this demo, we'll just hide the notification
                    notificationEntry.style.display = 'none';
                    
                    // Show success message
                    showToast('Notification archived successfully', 'success');
                    
                    // Update unread counter if needed
                    if (notificationEntry.classList.contains('unread')) {
                        updateUnreadCounter();
                    }
                }
                
                // Close the menu
                menu.style.display = 'none';
            });
        }
        
        // Delete
        const deleteAction = menu.querySelector('.delete-action, .fa-trash');
        if (deleteAction) {
            deleteAction.addEventListener('click', function(e) {
                e.preventDefault();
                const notificationEntry = findParentWithClass(this, 'notification-entry');
                
                if (notificationEntry) {
                    // Confirm deletion
                    if (confirm('Are you sure you want to delete this notification?')) {
                        // In a real implementation, this would send an API request to delete the notification
                        // For this demo, we'll just remove the notification from the DOM
                        notificationEntry.remove();
                        
                        // Show success message
                        showToast('Notification deleted successfully', 'success');
                        
                        // Update unread counter if needed
                        if (notificationEntry.classList.contains('unread')) {
                            updateUnreadCounter();
                        }
                    }
                }
                
                // Close the menu
                menu.style.display = 'none';
            });
        }
        
        // View Details
        const detailsAction = menu.querySelector('.details-action, .fa-eye');
        if (detailsAction) {
            detailsAction.addEventListener('click', function(e) {
                e.preventDefault();
                const notificationEntry = findParentWithClass(this, 'notification-entry');
                
                if (notificationEntry) {
                    // Show notification details
                    showNotificationDetails(notificationEntry);
                }
                
                // Close the menu
                menu.style.display = 'none';
            });
        }
    });
}

/**
 * Setup notification entry clicks to view details
 */
function setupNotificationEntryClicks() {
    const notificationEntries = document.querySelectorAll('.notification-entry');
    
    notificationEntries.forEach(entry => {
        // Get the click targets within the entry that should trigger details view
        const clickTargets = entry.querySelectorAll('.entry-details, .entry-title, .entry-preview');
        
        clickTargets.forEach(target => {
            target.addEventListener('click', function() {
                showNotificationDetails(entry);
            });
        });
    });
}

/**
 * Initialize bulk actions functionality
 */
function initBulkActions() {
    // Select all checkboxes
    const checkboxes = document.querySelectorAll('.notification-entry .entry-checkbox input[type="checkbox"]');
    
    // Mark All as Read button
    const markAllReadBtn = document.querySelector('.bulk-actions .mark-read-btn');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', function() {
            const unreadNotifications = document.querySelectorAll('.notification-entry.unread');
            
            if (unreadNotifications.length > 0) {
                unreadNotifications.forEach(notification => {
                    notification.classList.remove('unread');
                    notification.classList.add('read');
                    
                    // Update the action menu text
                    const readAction = notification.querySelector('.action-menu .read-action');
                    if (readAction) {
                        readAction.innerHTML = '<i class="fas fa-envelope"></i> Mark as Unread';
                    }
                });
                
                // Update unread counter
                updateUnreadCounter();
                
                // Show success message
                showToast('All notifications marked as read', 'success');
            } else {
                showToast('No unread notifications to mark as read', 'info');
            }
        });
    }
    
    // Archive Selected button
    const archiveSelectedBtn = document.querySelector('.bulk-actions .archive-btn');
    if (archiveSelectedBtn) {
        archiveSelectedBtn.addEventListener('click', function() {
            const selectedCheckboxes = document.querySelectorAll('.notification-entry .entry-checkbox input[type="checkbox"]:checked');
            
            if (selectedCheckboxes.length > 0) {
                let unreadCount = 0;
                
                selectedCheckboxes.forEach(checkbox => {
                    const notificationEntry = findParentWithClass(checkbox, 'notification-entry');
                    
                    if (notificationEntry) {
                        // If the notification is unread, increment unread count
                        if (notificationEntry.classList.contains('unread')) {
                            unreadCount++;
                        }
                        
                        // In a real implementation, this would send an API request to archive the notification
                        // For this demo, we'll just hide the notification
                        notificationEntry.style.display = 'none';
                        
                        // Uncheck the checkbox
                        checkbox.checked = false;
                    }
                });
                
                // Update unread counter if needed
                if (unreadCount > 0) {
                    updateUnreadCounter();
                }
                
                // Show success message
                showToast(`${selectedCheckboxes.length} notification(s) archived successfully`, 'success');
            } else {
                showToast('No notifications selected to archive', 'info');
            }
        });
    }
    
    // Delete Selected button
    const deleteSelectedBtn = document.querySelector('.bulk-actions .delete-btn');
    if (deleteSelectedBtn) {
        deleteSelectedBtn.addEventListener('click', function() {
            const selectedCheckboxes = document.querySelectorAll('.notification-entry .entry-checkbox input[type="checkbox"]:checked');
            
            if (selectedCheckboxes.length > 0) {
                // Confirm deletion
                if (confirm(`Are you sure you want to delete ${selectedCheckboxes.length} selected notification(s)?`)) {
                    let unreadCount = 0;
                    
                    selectedCheckboxes.forEach(checkbox => {
                        const notificationEntry = findParentWithClass(checkbox, 'notification-entry');
                        
                        if (notificationEntry) {
                            // If the notification is unread, increment unread count
                            if (notificationEntry.classList.contains('unread')) {
                                unreadCount++;
                            }
                            
                            // In a real implementation, this would send an API request to delete the notification
                            // For this demo, we'll just remove the notification from the DOM
                            notificationEntry.remove();
                        }
                    });
                    
                    // Update unread counter if needed
                    if (unreadCount > 0) {
                        updateUnreadCounter();
                    }
                    
                    // Show success message
                    showToast(`${selectedCheckboxes.length} notification(s) deleted successfully`, 'success');
                }
            } else {
                showToast('No notifications selected to delete', 'info');
            }
        });
    }
}

/**
 * Initialize filters and sorting functionality
 */
function initFiltersAndSorting() {
    // Filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-dropdown .filter-option input[type="checkbox"]');
    if (filterCheckboxes.length > 0) {
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                // If 'All Notifications' is checked/unchecked, update all other checkboxes
                if (this.parentElement.querySelector('span').textContent === 'All Notifications') {
                    const isChecked = this.checked;
                    filterCheckboxes.forEach(cb => {
                        cb.checked = isChecked;
                    });
                }
                
                // Apply filters
                applyFilters();
            });
        });
    }
    
    // Sort radio buttons
    const sortRadios = document.querySelectorAll('.sort-dropdown .sort-option input[type="radio"]');
    if (sortRadios.length > 0) {
        sortRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    // Apply sorting
                    applySorting(this.parentElement.querySelector('span').textContent);
                }
            });
        });
    }
}

/**
 * Apply filters to the notifications list
 */
function applyFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-dropdown .filter-option input[type="checkbox"]');
    const activeFilters = [];
    
    // Get active filters
    filterCheckboxes.forEach(checkbox => {
        if (checkbox.checked && checkbox.parentElement.querySelector('span').textContent !== 'All Notifications') {
            activeFilters.push(checkbox.parentElement.querySelector('span').textContent);
        }
    });
    
    // Get all notifications
    const notifications = document.querySelectorAll('.notification-entry');
    
    // If no filters or 'All Notifications' is checked, show all notifications
    const allNotificationsChecked = document.querySelector('.filter-dropdown .filter-option input[type="checkbox"]:checked ~ span[textContent="All Notifications"]');
    
    if (activeFilters.length === 0 || allNotificationsChecked) {
        notifications.forEach(notification => {
            notification.style.display = 'flex';
        });
        return;
    }
    
    // Apply filters
    notifications.forEach(notification => {
        // Determine category based on icon class
        let category = '';
        if (notification.querySelector('.entry-icon.system-alert')) {
            category = 'System Alerts';
        } else if (notification.querySelector('.entry-icon.user-activity')) {
            category = 'User Activities';
        } else if (notification.querySelector('.entry-icon.business-update')) {
            category = 'Business Updates';
        } else if (notification.querySelector('.entry-icon.payment-alert')) {
            category = 'Payment Alerts';
        }
        
        // Show/hide based on filters
        if (activeFilters.includes(category)) {
            notification.style.display = 'flex';
        } else {
            notification.style.display = 'none';
        }
    });
}

/**
 * Apply sorting to the notifications list
 * @param {string} sortOption - The sort option selected (Newest First, Oldest First, Priority Level)
 */
function applySorting(sortOption) {
    const notificationsList = document.querySelector('.notifications-list');
    const notifications = Array.from(document.querySelectorAll('.notification-entry'));
    
    if (notificationsList && notifications.length > 0) {
        // Sort notifications based on selected option
        notifications.sort((a, b) => {
            if (sortOption === 'Newest First') {
                // Sort by timestamp (newest first)
                const timeA = getTimestampValue(a.querySelector('.entry-timestamp').textContent);
                const timeB = getTimestampValue(b.querySelector('.entry-timestamp').textContent);
                return timeB - timeA;
            } else if (sortOption === 'Oldest First') {
                // Sort by timestamp (oldest first)
                const timeA = getTimestampValue(a.querySelector('.entry-timestamp').textContent);
                const timeB = getTimestampValue(b.querySelector('.entry-timestamp').textContent);
                return timeA - timeB;
            } else if (sortOption === 'Priority Level') {
                // Sort by priority level (high to low)
                const priorityA = getPriorityValue(a.querySelector('.priority-indicator').textContent);
                const priorityB = getPriorityValue(b.querySelector('.priority-indicator').textContent);
                return priorityB - priorityA;
            }
            
            return 0;
        });
        
        // Clear the list
        notificationsList.innerHTML = '';
        
        // Add sorted notifications back to the list
        notifications.forEach(notification => {
            notificationsList.appendChild(notification);
        });
    }
}

/**
 * Get a numeric value representing a timestamp for sorting
 * @param {string} timestamp - The timestamp string (e.g., "Today, 10:45 AM" or "Yesterday, 15:30 PM")
 * @returns {number} A numeric value for sorting
 */
function getTimestampValue(timestamp) {
    if (timestamp.includes('Today')) {
        return Date.now() - getTimeOfDayInMilliseconds(timestamp.split(', ')[1]);
    } else if (timestamp.includes('Yesterday')) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.getTime() - getTimeOfDayInMilliseconds(timestamp.split(', ')[1]);
    } else {
        // For other dates, just use a relative order
        return 0;
    }
}

/**
 * Convert a time string to milliseconds since midnight
 * @param {string} timeStr - Time string in format "10:45 AM"
 * @returns {number} Milliseconds since midnight
 */
function getTimeOfDayInMilliseconds(timeStr) {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }
    
    return ((hours * 60) + minutes) * 60 * 1000;
}

/**
 * Get a numeric value representing a priority level for sorting
 * @param {string} priority - The priority string (e.g., "High Priority", "Medium Priority", "Low Priority")
 * @returns {number} A numeric value for sorting
 */
function getPriorityValue(priority) {
    if (priority.includes('High')) {
        return 3;
    } else if (priority.includes('Medium')) {
        return 2;
    } else if (priority.includes('Low')) {
        return 1;
    }
    return 0;
}

/**
 * Initialize notification details functionality
 */
function initNotificationDetails() {
    const notificationDetails = document.getElementById('notificationDetails');
    
    if (notificationDetails) {
        // Back button
        const backBtn = notificationDetails.querySelector('.back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', function() {
                // Hide notification details
                notificationDetails.style.display = 'none';
                
                // Show the main notifications dashboard
                const mainContent = document.querySelector('.notifications-dashboard');
                if (mainContent) {
                    mainContent.style.display = 'block';
                }
            });
        }
        
        // Action buttons in details view
        const detailsActionBtns = notificationDetails.querySelectorAll('.details-actions .action-btn');
        detailsActionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (btn.classList.contains('mark-read-btn')) {
                    // Mark as Read/Unread button
                    if (btn.querySelector('span').textContent === 'Mark as Read') {
                        btn.querySelector('i').className = 'fas fa-envelope';
                        btn.querySelector('span').textContent = 'Mark as Unread';
                        showToast('Notification marked as read', 'success');
                    } else {
                        btn.querySelector('i').className = 'fas fa-envelope-open';
                        btn.querySelector('span').textContent = 'Mark as Read';
                        showToast('Notification marked as unread', 'success');
                    }
                } else if (btn.classList.contains('archive-btn')) {
                    // Archive button
                    showToast('Notification archived successfully', 'success');
                    
                    // Go back to main notifications list
                    notificationDetails.style.display = 'none';
                    const mainContent = document.querySelector('.notifications-dashboard');
                    if (mainContent) {
                        mainContent.style.display = 'block';
                    }
                } else if (btn.classList.contains('delete-btn')) {
                    // Delete button
                    if (confirm('Are you sure you want to delete this notification?')) {
                        showToast('Notification deleted successfully', 'success');
                        
                        // Go back to main notifications list
                        notificationDetails.style.display = 'none';
                        const mainContent = document.querySelector('.notifications-dashboard');
                        if (mainContent) {
                            mainContent.style.display = 'block';
                        }
                    }
                } else if (btn.classList.contains('related-page-btn')) {
                    // Go to Related Page button
                    // In a real implementation, this would navigate to the related page
                    showToast('Navigating to System Status page...', 'info');
                }
            });
        });
    }
}

/**
 * Show notification details for a specific notification
 * @param {Element} notificationEntry - The notification entry element
 */
function showNotificationDetails(notificationEntry) {
    const notificationDetails = document.getElementById('notificationDetails');
    const mainContent = document.querySelector('.notifications-dashboard');
    const preferencesContent = document.querySelector('.preferences-content');
    const historyContent = document.querySelector('.history-content');
    
    if (notificationDetails) {
        // Hide all content sections first
        if (mainContent) mainContent.style.display = 'none';
        if (preferencesContent) preferencesContent.style.display = 'none';
        if (historyContent) historyContent.style.display = 'none';
        
        // Show notification details
        notificationDetails.style.display = 'block';
        
        // In a real implementation, details would be fetched from a server/database
        // For this demo, we'll use the existing content from the notification entry
        
        // Update read/unread status in details view
        const markReadBtn = notificationDetails.querySelector('.mark-read-btn');
        if (markReadBtn) {
            if (notificationEntry.classList.contains('unread')) {
                markReadBtn.querySelector('i').className = 'fas fa-envelope-open';
                markReadBtn.querySelector('span').textContent = 'Mark as Read';
            } else {
                markReadBtn.querySelector('i').className = 'fas fa-envelope';
                markReadBtn.querySelector('span').textContent = 'Mark as Unread';
            }
        }
        
        // Mark the notification as read if it was unread
        if (notificationEntry.classList.contains('unread')) {
            notificationEntry.classList.remove('unread');
            notificationEntry.classList.add('read');
            
            // Update the action menu text
            const readAction = notificationEntry.querySelector('.action-menu .read-action');
            if (readAction) {
                readAction.innerHTML = '<i class="fas fa-envelope"></i> Mark as Unread';
            }
            
            // Update unread counter
            updateUnreadCounter();
        }
    }
}

/**
 * Initialize create notification functionality
 */
function initCreateNotification() {
    const createNotificationBtn = document.querySelector('.create-notification-btn');
    const createNotificationModal = document.getElementById('createNotificationModal');
    
    if (createNotificationBtn && createNotificationModal) {
        // Open modal when clicking the button
        createNotificationBtn.addEventListener('click', function() {
            createNotificationModal.style.display = 'flex';
        });
        
        // Close modal when clicking the close button
        const closeBtn = createNotificationModal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                createNotificationModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking the cancel button
        const cancelBtn = createNotificationModal.querySelector('.cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                createNotificationModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside the content
        createNotificationModal.addEventListener('click', function(e) {
            if (e.target === createNotificationModal) {
                createNotificationModal.style.display = 'none';
            }
        });
        
        // Recipient type selection
        const recipientTypeRadios = createNotificationModal.querySelectorAll('input[name="recipientType"]');
        const recipientCategoryDropdown = createNotificationModal.querySelector('.recipient-category-dropdown');
        const recipientSearch = createNotificationModal.querySelector('.recipient-search');
        
        if (recipientTypeRadios.length > 0) {
            recipientTypeRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.value === 'all') {
                        if (recipientCategoryDropdown) recipientCategoryDropdown.style.display = 'none';
                        if (recipientSearch) recipientSearch.style.display = 'none';
                    } else if (this.value === 'category') {
                        if (recipientCategoryDropdown) recipientCategoryDropdown.style.display = 'block';
                        if (recipientSearch) recipientSearch.style.display = 'none';
                    } else if (this.value === 'specific') {
                        if (recipientCategoryDropdown) recipientCategoryDropdown.style.display = 'none';
                        if (recipientSearch) recipientSearch.style.display = 'flex';
                    }
                });
            });
        }
        
        // Schedule delivery checkbox
        const scheduleDeliveryCheckbox = document.getElementById('scheduleDelivery');
        const scheduleDateTime = createNotificationModal.querySelector('.schedule-datetime');
        const scheduleBtn = createNotificationModal.querySelector('.schedule-btn');
        
        if (scheduleDeliveryCheckbox && scheduleDateTime && scheduleBtn) {
            scheduleDeliveryCheckbox.addEventListener('change', function() {
                scheduleDateTime.style.display = this.checked ? 'flex' : 'none';
                scheduleBtn.style.display = this.checked ? 'flex' : 'none';
            });
        }
        
        // Form submission - Send Now button
        const sendBtn = createNotificationModal.querySelector('.send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', function() {
                // Validate form
                const notificationTitle = document.getElementById('notificationTitle');
                const notificationBody = document.getElementById('notificationBody');
                
                if (notificationTitle && notificationBody) {
                    if (!notificationTitle.value.trim()) {
                        showToast('Please enter a notification title', 'error');
                        notificationTitle.focus();
                        return;
                    }
                    
                    if (!notificationBody.value.trim()) {
                        showToast('Please enter notification content', 'error');
                        notificationBody.focus();
                        return;
                    }
                    
                    // In a real implementation, this would send an API request to create the notification
                    // For this demo, we'll just show a success message and close the modal
                    showToast('Notification sent successfully', 'success');
                    createNotificationModal.style.display = 'none';
                    
                    // Reset form
                    const form = createNotificationModal.querySelector('form');
                    if (form) form.reset();
                    
                    // Reset dynamic elements
                    if (scheduleDateTime) scheduleDateTime.style.display = 'none';
                    if (scheduleBtn) scheduleBtn.style.display = 'none';
                    if (recipientCategoryDropdown) recipientCategoryDropdown.style.display = 'block';
                    if (recipientSearch) recipientSearch.style.display = 'none';
                }
            });
        }
        
        // Save as Draft button
        const saveDraftBtn = createNotificationModal.querySelector('.save-draft-btn');
        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', function() {
                // In a real implementation, this would save the notification as a draft
                // For this demo, we'll just show a success message and close the modal
                showToast('Notification saved as draft', 'success');
                createNotificationModal.style.display = 'none';
            });
        }
        
        // Schedule button
        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', function() {
                // Validate form
                const notificationTitle = document.getElementById('notificationTitle');
                const notificationBody = document.getElementById('notificationBody');
                const scheduleDate = document.getElementById('scheduleDate');
                const scheduleTime = document.getElementById('scheduleTime');
                
                if (notificationTitle && notificationBody && scheduleDate && scheduleTime) {
                    if (!notificationTitle.value.trim()) {
                        showToast('Please enter a notification title', 'error');
                        notificationTitle.focus();
                        return;
                    }
                    
                    if (!notificationBody.value.trim()) {
                        showToast('Please enter notification content', 'error');
                        notificationBody.focus();
                        return;
                    }
                    
                    if (!scheduleDate.value) {
                        showToast('Please select a date for scheduled delivery', 'error');
                        scheduleDate.focus();
                        return;
                    }
                    
                    if (!scheduleTime.value) {
                        showToast('Please select a time for scheduled delivery', 'error');
                        scheduleTime.focus();
                        return;
                    }
                    
                    // In a real implementation, this would send an API request to schedule the notification
                    // For this demo, we'll just show a success message and close the modal
                    showToast(`Notification scheduled for ${scheduleDate.value} at ${scheduleTime.value}`, 'success');
                    createNotificationModal.style.display = 'none';
                    
                    // Reset form
                    const form = createNotificationModal.querySelector('form');
                    if (form) form.reset();
                    
                    // Reset dynamic elements
                    if (scheduleDateTime) scheduleDateTime.style.display = 'none';
                    if (scheduleBtn) scheduleBtn.style.display = 'none';
                }
            });
        }
        
        // Remove recipient buttons
        const removeButtons = createNotificationModal.querySelectorAll('.remove-btn');
        if (removeButtons.length > 0) {
            removeButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const recipientItem = this.closest('.recipient-item');
                    if (recipientItem) {
                        recipientItem.remove();
                    }
                });
            });
        }
    }
}

/**
 * Initialize export modal functionality
 */
function initExportModal() {
    const exportReportBtn = document.querySelector('.export-report-btn');
    const exportModal = document.getElementById('exportModal');
    
    if (exportReportBtn && exportModal) {
        // Open modal when clicking the button
        exportReportBtn.addEventListener('click', function() {
            exportModal.style.display = 'flex';
        });
        
        // Close modal when clicking the close button
        const closeBtn = exportModal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                exportModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking the cancel button
        const cancelBtn = exportModal.querySelector('.cancel-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                exportModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside the content
        exportModal.addEventListener('click', function(e) {
            if (e.target === exportModal) {
                exportModal.style.display = 'none';
            }
        });
        
        // Generate Report button
        const generateBtn = exportModal.querySelector('.generate-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', function() {
                // Get selected format
                const exportFormat = exportModal.querySelector('input[name="exportFormat"]:checked').value;
                
                // In a real implementation, this would generate a report based on the selected options
                // For this demo, we'll just show a success message and close the modal
                showToast(`Notification report generated in ${exportFormat.toUpperCase()} format`, 'success');
                exportModal.style.display = 'none';
            });
        }
    }
}

/**
 * Initialize historical log functionality
 */
function initHistoricalLog() {
    const historyContent = document.querySelector('.history-content');
    
    if (historyContent) {
        // Select all checkbox in the history table
        const selectAllHistory = document.getElementById('selectAllHistory');
        if (selectAllHistory) {
            selectAllHistory.addEventListener('change', function() {
                const checkboxes = historyContent.querySelectorAll('tbody input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
            });
        }
        
        // Date range preset buttons
        const presetButtons = historyContent.querySelectorAll('.preset-periods .preset-btn');
        if (presetButtons.length > 0) {
            presetButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all preset buttons
                    presetButtons.forEach(button => {
                        button.classList.remove('active');
                    });
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Set date range based on preset
                    const startDate = historyContent.querySelector('.date-input.start-date');
                    const endDate = historyContent.querySelector('.date-input.end-date');
                    
                    if (startDate && endDate) {
                        const today = new Date();
                        const preset = this.textContent.trim();
                        
                        if (preset === 'Today') {
                            startDate.value = formatDate(today);
                            endDate.value = formatDate(today);
                        } else if (preset === 'Week') {
                            const weekStart = new Date(today);
                            weekStart.setDate(today.getDate() - 7);
                            startDate.value = formatDate(weekStart);
                            endDate.value = formatDate(today);
                        } else if (preset === 'Month') {
                            const monthStart = new Date(today);
                            monthStart.setMonth(today.getMonth() - 1);
                            startDate.value = formatDate(monthStart);
                            endDate.value = formatDate(today);
                        } else if (preset === 'Year') {
                            const yearStart = new Date(today);
                            yearStart.setFullYear(today.getFullYear() - 1);
                            startDate.value = formatDate(yearStart);
                            endDate.value = formatDate(today);
                        }
                    }
                });
            });
        }
        
        // Search button
        const searchBtn = historyContent.querySelector('.keyword-search .search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                const searchInput = historyContent.querySelector('.keyword-search input');
                if (searchInput) {
                    const keyword = searchInput.value.trim().toLowerCase();
                    
                    if (keyword) {
                        // Search functionality would typically be server-side
                        // For this demo, we'll just show a message
                        showToast(`Searching for: ${keyword}`, 'info');
                    } else {
                        showToast('Please enter a keyword to search', 'error');
                    }
                }
            });
        }
        
        // View Details button
        const viewDetailsBtn = historyContent.querySelector('.view-details-btn');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function() {
                const selectedCheckboxes = historyContent.querySelectorAll('tbody input[type="checkbox"]:checked');
                
                if (selectedCheckboxes.length === 1) {
                    // Show details for the selected notification
                    // In a real implementation, this would fetch and display the notification details
                    
                    // Show notification details
                    const notificationDetails = document.getElementById('notificationDetails');
                    if (notificationDetails) {
                        historyContent.style.display = 'none';
                        notificationDetails.style.display = 'block';
                    }
                } else if (selectedCheckboxes.length === 0) {
                    showToast('Please select a notification to view details', 'error');
                } else {
                    showToast('Please select only one notification to view details', 'error');
                }
            });
        }
        
        // Bulk Delete button
        const bulkDeleteBtn = historyContent.querySelector('.bulk-delete-btn');
        if (bulkDeleteBtn) {
            bulkDeleteBtn.addEventListener('click', function() {
                const selectedCheckboxes = historyContent.querySelectorAll('tbody input[type="checkbox"]:checked');
                
                if (selectedCheckboxes.length > 0) {
                    // Confirm deletion
                    if (confirm(`Are you sure you want to delete ${selectedCheckboxes.length} selected notification(s)?`)) {
                        // In a real implementation, this would send an API request to delete the notifications
                        // For this demo, we'll just remove the rows from the table
                        selectedCheckboxes.forEach(checkbox => {
                            const row = checkbox.closest('tr');
                            if (row) {
                                row.remove();
                            }
                        });
                        
                        // Uncheck the "Select All" checkbox
                        if (selectAllHistory) {
                            selectAllHistory.checked = false;
                        }
                        
                        // Show success message
                        showToast(`${selectedCheckboxes.length} notification(s) deleted successfully`, 'success');
                    }
                } else {
                    showToast('No notifications selected to delete', 'error');
                }
            });
        }
        
        // View and Delete buttons in table rows
        const viewButtons = historyContent.querySelectorAll('.row-actions .view-btn');
        const deleteButtons = historyContent.querySelectorAll('.row-actions .delete-btn');
        
        if (viewButtons.length > 0) {
            viewButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Show details for the notification
                    const notificationDetails = document.getElementById('notificationDetails');
                    if (notificationDetails) {
                        historyContent.style.display = 'none';
                        notificationDetails.style.display = 'block';
                    }
                });
            });
        }
        
        if (deleteButtons.length > 0) {
            deleteButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const row = this.closest('tr');
                    
                    if (row) {
                        // Confirm deletion
                        if (confirm('Are you sure you want to delete this notification?')) {
                            // In a real implementation, this would send an API request to delete the notification
                            // For this demo, we'll just remove the row from the table
                            row.remove();
                            
                            // Show success message
                            showToast('Notification deleted successfully', 'success');
                        }
                    }
                });
            });
        }
    }
}

/**
 * Initialize notification preferences functionality
 */
function initNotificationPreferences() {
    const preferencesContent = document.querySelector('.preferences-content');
    
    if (preferencesContent) {
        // Save Changes button
        const saveBtn = preferencesContent.querySelector('.save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                // In a real implementation, this would save the user's preferences
                // For this demo, we'll just show a success message
                showToast('Notification preferences saved successfully', 'success');
            });
        }
        
        // Reset to Default button
        const resetBtn = preferencesContent.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                // Confirm reset
                if (confirm('Are you sure you want to reset all notification preferences to default settings?')) {
                    // In a real implementation, this would reset the user's preferences
                    // For this demo, we'll just check all toggles and set frequency to real-time
                    const toggles = preferencesContent.querySelectorAll('.toggle-switch input[type="checkbox"]');
                    toggles.forEach(toggle => {
                        toggle.checked = true;
                    });
                    
                    const frequencyRadios = preferencesContent.querySelectorAll('input[name="frequency"]');
                    if (frequencyRadios.length > 0) {
                        frequencyRadios[0].checked = true; // Real-time option
                    }
                    
                    // Show success message
                    showToast('Notification preferences reset to default', 'success');
                }
            });
        }
    }
}

/**
 * Initialize pagination functionality
 */
function initPagination() {
    const paginationElements = document.querySelectorAll('.pagination');
    
    paginationElements.forEach(pagination => {
        const prevBtn = pagination.querySelector('.prev-btn');
        const nextBtn = pagination.querySelector('.next-btn');
        const pageNumbers = pagination.querySelectorAll('.page-number');
        
        // Initialize page number click events
        if (pageNumbers.length > 0) {
            pageNumbers.forEach(pageNumber => {
                pageNumber.addEventListener('click', function() {
                    // Remove active class from all page numbers
                    pageNumbers.forEach(num => {
                        num.classList.remove('active');
                    });
                    
                    // Add active class to clicked page number
                    this.classList.add('active');
                    
                    // Enable/disable prev/next buttons based on active page
                    updatePaginationButtons(pageNumbers, prevBtn, nextBtn);
                    
                    // In a real implementation, this would load the selected page of notifications
                    // For this demo, we'll just show a message
                    showToast(`Loading page ${this.textContent}`, 'info');
                });
            });
        }
        
        // Previous button click event
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (!this.hasAttribute('disabled')) {
                    const activePage = pagination.querySelector('.page-number.active');
                    if (activePage && activePage.previousElementSibling) {
                        // Click the previous page number
                        activePage.previousElementSibling.click();
                    }
                }
            });
        }
        
        // Next button click event
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (!this.hasAttribute('disabled')) {
                    const activePage = pagination.querySelector('.page-number.active');
                    if (activePage && activePage.nextElementSibling) {
                        // Click the next page number
                        activePage.nextElementSibling.click();
                    }
                }
            });
        }
        
        // Initial update of pagination buttons
        updatePaginationButtons(pageNumbers, prevBtn, nextBtn);
    });
}

/**
 * Update pagination buttons based on active page
 * @param {NodeList} pageNumbers - List of page number elements
 * @param {Element} prevBtn - Previous button element
 * @param {Element} nextBtn - Next button element
 */
function updatePaginationButtons(pageNumbers, prevBtn, nextBtn) {
    if (pageNumbers.length > 0) {
        const activePage = Array.from(pageNumbers).findIndex(page => page.classList.contains('active'));
        
        if (prevBtn) {
            if (activePage === 0) {
                prevBtn.setAttribute('disabled', 'disabled');
            } else {
                prevBtn.removeAttribute('disabled');
            }
        }
        
        if (nextBtn) {
            if (activePage === pageNumbers.length - 1) {
                nextBtn.setAttribute('disabled', 'disabled');
            } else {
                nextBtn.removeAttribute('disabled');
            }
        }
    }
}

/**
 * Initialize dark mode functionality
 */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // Check if user has a dark mode preference
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('carpal-theme');
        
        // Apply dark mode if user prefers it or has set it previously
        if (savedTheme === 'dark' || (savedTheme === null && userPrefersDark)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.querySelector('i').className = 'fas fa-sun';
        }
        
        // Toggle dark mode on button click
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('carpal-theme', 'dark');
                this.querySelector('i').className = 'fas fa-sun';
            } else {
                localStorage.setItem('carpal-theme', 'light');
                this.querySelector('i').className = 'fas fa-moon';
            }
        });
    }
}

/**
 * Initialize mobile responsiveness functionality
 */
function initMobileResponsiveness() {
    // Add mobile menu toggle button for small screens
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar && mainContent) {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Add button to main content
        const header = mainContent.querySelector('.top-header');
        if (header) {
            header.insertBefore(mobileMenuBtn, header.firstChild);
        }
        
        // Toggle sidebar on button click
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking on a menu item (for mobile)
        const menuItems = sidebar.querySelectorAll('.nav-menu li a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 576) {
                    sidebar.classList.remove('active');
                }
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 576) {
                sidebar.classList.remove('active');
            }
        });
    }
}

/**
 * Format a date object as YYYY-MM-DD for input[type="date"]
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, info)
 */
function showToast(message, type = 'info') {
    // Check if a toast container already exists
    let toastContainer = document.querySelector('.toast-container');
    
    // Create container if it doesn't exist
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
        
        // Add styles if they don't exist
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                .toast-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                }
                .toast {
                    min-width: 250px;
                    margin-bottom: 10px;
                    padding: 15px;
                    border-radius: 4px;
                    color: white;
                    font-weight: 500;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    animation: toast-in 0.3s ease, toast-out 0.3s ease 2.7s forwards;
                }
                .toast.success { background-color: #4caf50; }
                .toast.error { background-color: #f44336; }
                .toast.info { background-color: #2196f3; }
                .toast-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                    margin-left: 10px;
                }
                @keyframes toast-in {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes toast-out {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
    
    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            toast.remove();
        });
    }
}

/**
 * Find the closest parent element with a specific class
 * @param {Element} element - The starting element
 * @param {string} className - The class name to search for
 * @returns {Element|null} The found parent element or null
 */
function findParentWithClass(element, className) {
    while (element && !element.classList.contains(className)) {
        element = element.parentElement;
    }
    return element;
}