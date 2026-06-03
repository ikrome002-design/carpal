/**
 * CarPal by Citrus - Messaging Module JavaScript
 * This script handles all functionality for the messaging page of the CarPal application
 * Version: 1.0.0
 * Author: Citrus Labs
 */

// Wait for DOM content to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function () {

    // Application state
    const appState = {
        isScribbleLinked: false, // Tracks if user has linked their Scribble account
        darkModeEnabled: false, // Tracks dark mode state
        selectedContacts: [], // Tracks selected contacts for sharing
        unreadMessagesCount: 1, // Tracks number of unread messages
        activeFilter: 'all', // Current active message filter
        searchQuery: '' // Current search query for messages
    };

    // DOM Elements - Main UI
    const notificationIcon = document.querySelector('.notification-icon');
    const notificationPanel = document.querySelector('.notification-panel');
    const notificationCloseBtn = document.querySelector('.panel-header .close-btn');
    const userProfile = document.querySelector('.user-profile');
    const profileDropdown = document.querySelector('.profile-dropdown');
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const initialState = document.querySelector('.messaging-content.initial-state');
    const linkedState = document.querySelector('.messaging-content.linked-state');
    const linkScribbleBtn = document.querySelector('.link-scribble-btn');

    // DOM Elements - Linked State
    const connectContactsBtn = document.querySelector('.control-btn.connect-contacts');
    const openScribbleBtn = document.querySelector('.control-btn.open-scribble');
    const manageScribbleLinkBtn = document.querySelector('.control-btn.manage-link');
    const searchInput = document.querySelector('.search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const messageItems = document.querySelectorAll('.message-item');
    const viewMessageBtns = document.querySelectorAll('.action-icon.view');
    const replyMessageBtns = document.querySelectorAll('.action-icon.reply');
    const forwardMessageBtns = document.querySelectorAll('.action-icon.forward');
    const deleteMessageBtns = document.querySelectorAll('.action-icon.delete');

    // DOM Elements - Modals
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const cancelBtns = document.querySelectorAll('.cancel-btn');

    // Modal Specific Elements
    const linkConfirmModal = document.getElementById('linkConfirmModal');
    const contactSelectionModal = document.getElementById('contactSelectionModal');
    const linkDetailsModal = document.getElementById('linkDetailsModal');
    const unlinkConfirmModal = document.getElementById('unlinkConfirmModal');
    const messageDetailModal = document.getElementById('messageDetailModal');
    const termsAcceptCheckbox = document.getElementById('termsAccept');
    const dataSharingCheckbox = document.getElementById('dataSharing');
    const linkAccountBtn = document.querySelector('#linkConfirmModal .btn.primary');
    const selectAllContactsCheckbox = document.getElementById('selectAllContacts');
    const contactCheckboxes = document.querySelectorAll('.contact-item input[type="checkbox"]');
    const selectedCountDisplay = document.querySelector('.selected-count');
    const shareContactsBtn = document.querySelector('#contactSelectionModal .btn.primary');
    const unlinkBtn = document.querySelector('.detail-section .danger-btn');
    const confirmUnlinkBtn = document.querySelector('#unlinkConfirmModal .danger-btn');
    const verificationCodeInput = document.getElementById('verificationCode');
    const resendCodeBtn = document.querySelector('#unlinkConfirmModal .btn:not(.danger-btn):not(.cancel-btn)');

    // Initialize application
    function initApp() {
        // Check local storage for saved state
        checkLinkedStatus();
        checkDarkModePreference();

        // Set up event listeners
        setupEventListeners();

        // Update UI based on state
        updateUI();
    }

    // Check if user has previously linked their Scribble account
    function checkLinkedStatus() {
        const linkedStatus = localStorage.getItem('scribbleLinked');
        if (linkedStatus === 'true') {
            appState.isScribbleLinked = true;
        }
    }

    // Check if user has dark mode enabled
    function checkDarkModePreference() {
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'true') {
            appState.darkModeEnabled = true;
            document.body.classList.add('dark-mode');

            // Update dark mode icon
            const darkModeIcon = darkModeToggle.querySelector('i');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        }
    }

    // Set up all event listeners
    function setupEventListeners() {
        // Notification panel toggle
        notificationIcon.addEventListener('click', toggleNotificationPanel);
        notificationCloseBtn.addEventListener('click', closeNotificationPanel);

        // Profile dropdown toggle
        userProfile.addEventListener('click', toggleProfileDropdown);

        // Dark mode toggle
        darkModeToggle.addEventListener('click', toggleDarkMode);

        // Link Scribble button
        linkScribbleBtn.addEventListener('click', openLinkConfirmModal);

        // Linked state buttons
        if (connectContactsBtn) {
            connectContactsBtn.addEventListener('click', openContactSelectionModal);
        }

        if (openScribbleBtn) {
            openScribbleBtn.addEventListener('click', openScribbleWebsite);
        }

        if (manageScribbleLinkBtn) {
            manageScribbleLinkBtn.addEventListener('click', openLinkDetailsModal);
        }

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
        }

        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                setActiveFilter(button);
            });
        });

        // Message action buttons
        viewMessageBtns.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                openMessageDetailModal();
            });
        });

        replyMessageBtns.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                handleReplyMessage(button);
            });
        });

        forwardMessageBtns.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                handleForwardMessage(button);
            });
        });

        deleteMessageBtns.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                handleDeleteMessage(button);
            });
        });

        // Make message items clickable
        messageItems.forEach(item => {
            item.addEventListener('click', () => {
                openMessageDetailModal();

                // Mark as read if unread
                if (item.classList.contains('unread')) {
                    item.classList.remove('unread');
                    const statusBadge = item.querySelector('.status-badge');
                    if (statusBadge && statusBadge.classList.contains('new')) {
                        statusBadge.classList.remove('new');
                        statusBadge.classList.add('contacted');
                        statusBadge.textContent = 'Read';
                        updateUnreadMessagesCount();
                    }
                }
            });
        });

        // Modal close buttons
        closeModalBtns.forEach(button => {
            button.addEventListener('click', closeAllModals);
        });

        // Modal cancel buttons
        cancelBtns.forEach(button => {
            button.addEventListener('click', closeAllModals);
        });

        // Link account button
        linkAccountBtn.addEventListener('click', handleLinkAccount);

        // Select all contacts checkbox
        selectAllContactsCheckbox.addEventListener('change', handleSelectAllContacts);

        // Individual contact checkboxes
        contactCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateSelectedContactsCount);
        });

        // Share contacts button
        shareContactsBtn.addEventListener('click', handleShareContacts);

        // Unlink button
        unlinkBtn.addEventListener('click', openUnlinkConfirmModal);

        // Confirm unlink button
        confirmUnlinkBtn.addEventListener('click', handleUnlinkAccount);

        // Resend code button
        resendCodeBtn.addEventListener('click', handleResendCode);

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeAllModals();
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            // If click is outside notification panel and icon
            if (!e.target.closest('.notification-panel') &&
                !e.target.closest('.notification-icon')) {
                closeNotificationPanel();
            }

            // If click is outside profile dropdown and profile
            if (!e.target.closest('.profile-dropdown') &&
                !e.target.closest('.user-profile')) {
                closeProfileDropdown();
            }
        });

        // Reply and forward buttons in message detail modal
        const modalReplyBtn = document.querySelector('#messageDetailModal .modal-actions .action-btn:first-child');
        if (modalReplyBtn) {
            modalReplyBtn.addEventListener('click', () => {
                // Simulate opening reply form
                alert('Reply functionality would open here');
            });
        }

        const modalFooterReplyBtn = document.querySelector('#messageDetailModal .modal-footer .btn.primary');
        if (modalFooterReplyBtn) {
            modalFooterReplyBtn.addEventListener('click', () => {
                // Simulate opening reply form
                alert('Reply functionality would open here');
            });
        }

        const modalForwardBtn = document.querySelector('#messageDetailModal .modal-actions .action-btn:nth-child(2)');
        if (modalForwardBtn) {
            modalForwardBtn.addEventListener('click', () => {
                // Simulate opening forward form
                alert('Forward functionality would open here');
            });
        }

        // Delete button in message detail modal
        const modalDeleteBtn = document.querySelector('#messageDetailModal .modal-footer .btn.danger-btn');
        if (modalDeleteBtn) {
            modalDeleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this message?')) {
                    // Simulate message deletion
                    closeAllModals();
                    const firstMessage = document.querySelector('.message-item');
                    if (firstMessage) {
                        firstMessage.remove();
                        updateUnreadMessagesCount();
                    }
                    showNotification('Message Deleted', 'The message has been successfully deleted.', 'success');
                }
            });
        }

        // Archive button in message detail modal
        const archiveBtn = document.querySelector('#messageDetailModal .modal-footer .btn:not(.primary):not(.danger-btn)');
        if (archiveBtn) {
            archiveBtn.addEventListener('click', () => {
                // Simulate archiving message
                closeAllModals();
                showNotification('Message Archived', 'The message has been archived.', 'success');
            });
        }

        // Vehicle and history detail links
        const vehicleDetailsLink = document.querySelector('.view-details-link:first-of-type');
        if (vehicleDetailsLink) {
            vehicleDetailsLink.addEventListener('click', () => {
                alert('This would navigate to vehicle details page');
            });
        }

        const historyDetailsLink = document.querySelector('.view-details-link:last-of-type');
        if (historyDetailsLink) {
            historyDetailsLink.addEventListener('click', () => {
                alert('This would navigate to service history page');
            });
        }
    }

    // Update UI based on current state
    function updateUI() {
        // Show appropriate content based on linked status
        if (appState.isScribbleLinked) {
            initialState.classList.add('hidden');
            linkedState.classList.remove('hidden');
        } else {
            initialState.classList.remove('hidden');
            linkedState.classList.add('hidden');
        }

        // Update unread messages count
        updateUnreadMessagesCount();
    }

    // Toggle notification panel
    function toggleNotificationPanel(e) {
        e.stopPropagation();
        const isVisible = notificationPanel.style.display === 'block';
        notificationPanel.style.display = isVisible ? 'none' : 'block';
        closeProfileDropdown();
    }

    // Close notification panel
    function closeNotificationPanel() {
        notificationPanel.style.display = 'none';
    }

    // Toggle profile dropdown
    function toggleProfileDropdown(e) {
        e.stopPropagation();
        const isVisible = profileDropdown.style.display === 'block';
        profileDropdown.style.display = isVisible ? 'none' : 'block';
        closeNotificationPanel();
    }

    // Close profile dropdown
    function closeProfileDropdown() {
        profileDropdown.style.display = 'none';
    }

    // Toggle dark mode
    function toggleDarkMode() {
        appState.darkModeEnabled = !appState.darkModeEnabled;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', appState.darkModeEnabled);

        // Update dark mode icon
        const darkModeIcon = darkModeToggle.querySelector('i');
        if (appState.darkModeEnabled) {
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        } else {
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
        }
    }

    // Open the link confirmation modal
    function openLinkConfirmModal() {
        linkConfirmModal.style.display = 'flex';
    }

    // Open the contact selection modal
    function openContactSelectionModal() {
        contactSelectionModal.style.display = 'flex';
        resetContactSelection();
    }

    // Reset contact selection
    function resetContactSelection() {
        selectAllContactsCheckbox.checked = false;
        contactCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        appState.selectedContacts = [];
        updateSelectedContactsCount();
    }

    // Open Scribble website in a new tab
    function openScribbleWebsite() {
        window.open('https://scribble.ke/account/', '_blank');
    }

    // Open the link details modal
    function openLinkDetailsModal() {
        linkDetailsModal.style.display = 'flex';
    }

    // Open the unlink confirmation modal
    function openUnlinkConfirmModal() {
        unlinkConfirmModal.style.display = 'flex';
        linkDetailsModal.style.display = 'none';
    }

    // Open message detail modal
    function openMessageDetailModal() {
        messageDetailModal.style.display = 'flex';
    }

    // Close all modals
    function closeAllModals() {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // Handle linking account to Scribble
    function handleLinkAccount() {
        // Check if terms and data sharing are accepted
        if (!termsAcceptCheckbox.checked || !dataSharingCheckbox.checked) {
            alert('Please accept the terms and conditions and data sharing policy to continue.');
            return;
        }

        // Simulate redirect to Scribble for account creation
        alert('You will be redirected to Scribble to create your account');

        // Simulate successful linking after account creation
        setTimeout(() => {
            appState.isScribbleLinked = true;
            localStorage.setItem('scribbleLinked', 'true');

            // Update UI
            closeAllModals();
            updateUI();

            // Show success notification
            showNotification('Success', 'Your account has been successfully linked with Scribble!', 'success');
        }, 1000);
    }

    // Handle select all contacts checkbox
    function handleSelectAllContacts() {
        const isChecked = selectAllContactsCheckbox.checked;

        contactCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });

        if (isChecked) {
            // If checked, add all contact IDs to selected contacts
            appState.selectedContacts = Array.from(contactCheckboxes).map(checkbox => checkbox.id);
        } else {
            // If unchecked, clear selected contacts
            appState.selectedContacts = [];
        }

        updateSelectedContactsCount();
    }

    // Update selected contacts count
    function updateSelectedContactsCount() {
        // Count selected checkboxes
        const selectedCount = Array.from(contactCheckboxes).filter(checkbox => checkbox.checked).length;

        // Update display
        selectedCountDisplay.textContent = `${selectedCount} contacts selected`;

        // Update appState
        appState.selectedContacts = Array.from(contactCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id);
    }

    // Handle sharing contacts
    function handleShareContacts() {
        // Check if any contacts are selected
        if (appState.selectedContacts.length === 0) {
            alert('Please select at least one contact to share.');
            return;
        }

        // Simulate successful contact sharing
        closeAllModals();

        // Show success notification
        showNotification('Contacts Shared', `${appState.selectedContacts.length} contacts have been successfully shared with Scribble.`, 'success');

        // Add a notification to the panel
        addContactSharingNotification(appState.selectedContacts.length);
    }

    // Add contact sharing notification to panel
    function addContactSharingNotification(count) {
        // Create a new notification item
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item unread';
        notificationItem.innerHTML = `
            <div class="notif-icon task-notif">
                <i class="fas fa-share-nodes"></i>
            </div>
            <div class="notif-content">
                <div class="notif-title">Contacts Shared</div>
                <div class="notif-text">${count} contacts have been successfully shared with Scribble.</div>
                <div class="notif-time">Just now</div>
            </div>
        `;

        // Insert at the top of the list
        const notificationList = document.querySelector('.notification-list');
        notificationList.insertBefore(notificationItem, notificationList.firstChild);

        // Update notification badge
        const currentCount = parseInt(document.querySelector('.notification-badge').textContent);
        document.querySelector('.notification-badge').textContent = currentCount + 1;
    }

    // Handle unlinking account
    function handleUnlinkAccount() {
        // Check if verification code is entered
        const verificationCode = verificationCodeInput.value.trim();
        if (!verificationCode) {
            alert('Please enter the verification code sent to your email.');
            return;
        }

        // Verify code (in a real app, this would validate against a server)
        if (verificationCode !== '123456') { // Mock verification code
            alert('Invalid verification code. Please try again.');
            return;
        }

        // Simulate successful unlinking
        appState.isScribbleLinked = false;
        localStorage.setItem('scribbleLinked', 'false');

        // Update UI
        closeAllModals();
        updateUI();

        // Show success notification
        showNotification('Account Unlinked', 'Your account has been successfully unlinked from Scribble.', 'info');
    }

    // Handle resend verification code
    function handleResendCode() {
        // Simulate sending a new code
        showNotification('Code Sent', 'A new verification code has been sent to your email.', 'info');
    }

    // Handle search functionality
    function handleSearch() {
        appState.searchQuery = searchInput.value.toLowerCase().trim();
        filterMessages();
    }

    // Set active filter and apply filtering
    function setActiveFilter(buttonElement) {
        // Remove active class from all buttons
        filterButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Add active class to clicked button
        buttonElement.classList.add('active');

        // Update app state
        appState.activeFilter = buttonElement.textContent.toLowerCase();

        // Apply filtering
        filterMessages();
    }

    // Filter messages based on current filter and search query
    function filterMessages() {
        messageItems.forEach(item => {
            let shouldShow = true;

            // Filter by status
            if (appState.activeFilter !== 'all') {
                const statusBadge = item.querySelector('.status-badge');
                if (statusBadge) {
                    const status = statusBadge.textContent.toLowerCase();

                    switch (appState.activeFilter) {
                        case 'unread':
                            shouldShow = status === 'new';
                            break;
                        case 'important':
                            shouldShow = false; // No important tag in the current markup
                            break;
                        case 'archived':
                            shouldShow = false; // No archived tag in the current markup
                            break;
                    }
                }
            }

            // Filter by search query
            if (shouldShow && appState.searchQuery) {
                const sender = item.querySelector('.message-sender').textContent.toLowerCase();
                const preview = item.querySelector('.message-preview p').textContent.toLowerCase();

                shouldShow = sender.includes(appState.searchQuery) || preview.includes(appState.searchQuery);
            }

            // Show or hide the message
            item.style.display = shouldShow ? 'flex' : 'none';
        });
    }

    // Handle reply to message
    function handleReplyMessage(button) {
        // Get the message item
        const messageItem = button.closest('.message-item');

        // Open message detail modal with reply focus
        openMessageDetailModal();

        // Mark as read if unread
        if (messageItem.classList.contains('unread')) {
            messageItem.classList.remove('unread');
            const statusBadge = messageItem.querySelector('.status-badge');
            if (statusBadge && statusBadge.classList.contains('new')) {
                statusBadge.classList.remove('new');
                statusBadge.classList.add('contacted');
                statusBadge.textContent = 'Read';
                updateUnreadMessagesCount();
            }
        }

        // Simulate clicking reply button in modal
        setTimeout(() => {
            const modalReplyBtn = document.querySelector('#messageDetailModal .modal-footer .btn.primary');
            if (modalReplyBtn) {
                modalReplyBtn.click();
            }
        }, 500);
    }

    // Handle forward message
    function handleForwardMessage(button) {
        // Get the message item
        const messageItem = button.closest('.message-item');

        // Open message detail modal
        openMessageDetailModal();

        // Mark as read if unread
        if (messageItem.classList.contains('unread')) {
            messageItem.classList.remove('unread');
            const statusBadge = messageItem.querySelector('.status-badge');
            if (statusBadge && statusBadge.classList.contains('new')) {
                statusBadge.classList.remove('new');
                statusBadge.classList.add('contacted');
                statusBadge.textContent = 'Read';
                updateUnreadMessagesCount();
            }
        }

        // Simulate forward functionality
        setTimeout(() => {
            alert('Forward functionality would open here');
        }, 500);
    }

    // Handle delete message
    function handleDeleteMessage(button) {
        // Get the message item
        const messageItem = button.closest('.message-item');
        const sender = messageItem.querySelector('.message-sender').textContent;

        // Confirm deletion
        if (confirm(`Are you sure you want to delete this message from ${sender}?`)) {
            // Remove message item
            messageItem.remove();

            // Show success notification
            showNotification('Message Deleted', 'The message has been successfully deleted.', 'success');

            // Update unread count
            updateUnreadMessagesCount();
        }
    }

    // Update the unread messages count
    function updateUnreadMessagesCount() {
        const unreadMessages = document.querySelectorAll('.message-item.unread');
        appState.unreadMessagesCount = unreadMessages.length;

        // Update notification badge
        const notificationBadge = document.querySelector('.notification-badge');
        if (notificationBadge) {
            // Get current notification count
            let notificationCount = parseInt(notificationBadge.textContent);

            // If unread messages changed, update badge
            if (appState.unreadMessagesCount !== notificationCount) {
                notificationBadge.textContent = appState.unreadMessagesCount;
            }
        }
    }

    // Show notification to the user
    function showNotification(title, message, type) {
        // Create notification element
        const notificationElement = document.createElement('div');
        notificationElement.className = `app-notification ${type}`;
        notificationElement.innerHTML = `
            <div class="notification-header">
                <h4>${title}</h4>
                <button class="close-notification"><i class="fas fa-times"></i></button>
            </div>
            <div class="notification-body">
                <p>${message}</p>
            </div>
        `;

        // Add notification to the document
        document.body.appendChild(notificationElement);

        // Show notification
        setTimeout(() => {
            notificationElement.classList.add('show');
        }, 100);

        // Set up close button
        const closeButton = notificationElement.querySelector('.close-notification');
        closeButton.addEventListener('click', () => {
            closeNotification(notificationElement);
        });

        // Auto close after 5 seconds
        setTimeout(() => {
            closeNotification(notificationElement);
        }, 5000);
    }

    // Close notification
    function closeNotification(notificationElement) {
        notificationElement.classList.remove('show');
        setTimeout(() => {
            notificationElement.remove();
        }, 300);
    }

    // Custom CSS for notifications
    function addNotificationStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .app-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 300px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                transform: translateX(400px);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .app-notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .app-notification.success {
                border-left: 4px solid var(--success-green);
            }
            
            .app-notification.info {
                border-left: 4px solid var(--info-blue);
            }
            
            .app-notification.warning {
                border-left: 4px solid var(--warning-orange);
            }
            
            .app-notification.error {
                border-left: 4px solid var(--danger-red);
            }
            
            .notification-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 15px;
                border-bottom: 1px solid #eee;
            }
            
            .notification-header h4 {
                margin: 0;
                font-size: 16px;
            }
            
            .close-notification {
                background: none;
                border: none;
                cursor: pointer;
                color: #888;
            }
            
            .notification-body {
                padding: 15px;
            }
            
            .notification-body p {
                margin: 0;
                font-size: 14px;
                line-height: 1.4;
            }
            
            body.dark-mode .app-notification {
                background-color: #1a1a1a;
                color: white;
            }
            
            body.dark-mode .notification-header {
                border-color: #333;
            }
            
            body.dark-mode .close-notification {
                color: #aaa;
            }
        `;

        document.head.appendChild(styleElement);
    }

    // Initialize notification styles
    addNotificationStyles();

    // Initialize the application
    initApp();
});