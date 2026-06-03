/**
 * CarPal by Citrus - Support Page JavaScript
 * This file contains all the JavaScript functionality for the Support Tools page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components and event listeners
    initializeTabNavigation();
    initializeTicketTabs();
    initializeModals();
    initializeUserProfile();
    initializeQuickActions();
    initializeTicketFilters();
    initializeTicketAssignment();
    initializeTicketActions();
    initializeKnowledgeBase();
    initializeReportToggles();
    initializeSettingsHandlers();
    initializeFormHandlers();
    initializeDarkMode();
});

/**
 * Initialize main tab navigation
 */
function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get corresponding tab content and activate it
            const tabId = this.getAttribute('data-tab');
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
}

/**
 * Initialize ticket tab navigation
 */
function initializeTicketTabs() {
    const ticketTabButtons = document.querySelectorAll('.ticket-tab-btn');
    const ticketTabContents = document.querySelectorAll('.ticket-tab-content');
    
    ticketTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all ticket tab buttons and contents
            ticketTabButtons.forEach(btn => btn.classList.remove('active'));
            ticketTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get corresponding ticket tab content and activate it
            const ticketTabId = this.getAttribute('data-ticket-tab');
            const activeTicketTab = document.getElementById(ticketTabId);
            if (activeTicketTab) {
                activeTicketTab.classList.add('active');
            }
        });
    });
}

/**
 * Initialize modal dialogs
 */
function initializeModals() {
    // Modal elements
    const modals = {
        createTicket: document.getElementById('create-ticket-modal'),
        ticketDetails: document.getElementById('ticket-details-modal'),
        replyTicket: document.getElementById('reply-ticket-modal'),
        reassignTicket: document.getElementById('reassign-ticket-modal'),
        createArticle: document.getElementById('create-article-modal'),
        exportData: document.getElementById('export-data-modal')
    };
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        for (const modalId in modals) {
            const modal = modals[modalId];
            if (event.target === modal) {
                closeModal(modal);
            }
        }
    });
    
    // Cancel buttons
    const cancelButtons = document.querySelectorAll('.cancel-btn, .cancel-reply-btn, .cancel-reassign-btn, .cancel-article-btn, .cancel-export-btn');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Prevent closing when clicking inside modal content
    const modalContents = document.querySelectorAll('.modal-content');
    modalContents.forEach(content => {
        content.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
}

/**
 * Open a modal dialog
 * @param {HTMLElement} modal - The modal element to open
 */
function openModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

/**
 * Close a modal dialog
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

/**
 * Initialize user profile dropdown
 */
function initializeUserProfile() {
    const profileIcon = document.getElementById('profile-icon');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function() {
            profileDropdown.style.display = 'none';
        });
        
        // Prevent closing dropdown when clicking inside it
        profileDropdown.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
}

/**
 * Initialize quick action buttons
 */
function initializeQuickActions() {
    // Create Ticket button
    const createTicketBtn = document.getElementById('createTicketBtn');
    const createTicketModal = document.getElementById('create-ticket-modal');
    
    if (createTicketBtn && createTicketModal) {
        createTicketBtn.addEventListener('click', function() {
            openModal(createTicketModal);
        });
    }
    
    // View All Tickets button
    const viewTicketsBtn = document.getElementById('viewTicketsBtn');
    if (viewTicketsBtn) {
        viewTicketsBtn.addEventListener('click', function() {
            // Find and click the Support Tickets tab
            const ticketsTab = document.querySelector('.tab-btn[data-tab="tickets"]');
            if (ticketsTab) {
                ticketsTab.click();
            }
        });
    }
    
    // Knowledge Base button
    const knowledgeBaseBtn = document.getElementById('knowledgeBaseBtn');
    if (knowledgeBaseBtn) {
        knowledgeBaseBtn.addEventListener('click', function() {
            // Find and click the Knowledge Base tab
            const kbTab = document.querySelector('.tab-btn[data-tab="knowledge-base"]');
            if (kbTab) {
                kbTab.click();
            }
        });
    }
    
    // View Metrics button
    const viewMetricsBtn = document.querySelector('.view-metrics-btn');
    if (viewMetricsBtn) {
        viewMetricsBtn.addEventListener('click', function() {
            // Navigate to detailed metrics view (for this demo, just open reports tab)
            const reportsTab = document.querySelector('.tab-btn[data-tab="reports"]');
            if (reportsTab) {
                reportsTab.click();
            }
        });
    }
}

/**
 * Initialize ticket filter functionality
 */
function initializeTicketFilters() {
    // Priority filter
    const priorityFilter = document.getElementById('priority-filter');
    if (priorityFilter) {
        priorityFilter.addEventListener('change', function() {
            filterTickets();
        });
    }
    
    // Status filter
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterTickets();
        });
    }
    
    // Date range filter
    const dateRangeFilter = document.getElementById('date-range-filter');
    if (dateRangeFilter) {
        dateRangeFilter.addEventListener('change', function() {
            filterResolvedTickets();
        });
    }
    
    // Resolution type filter
    const resolutionTypeFilter = document.getElementById('resolution-type-filter');
    if (resolutionTypeFilter) {
        resolutionTypeFilter.addEventListener('change', function() {
            filterResolvedTickets();
        });
    }
    
    // Search bars
    const searchBars = document.querySelectorAll('.search-bar');
    searchBars.forEach(searchBar => {
        searchBar.addEventListener('input', function() {
            // Determine which tab we're in
            const ticketTab = this.closest('.ticket-tab-content');
            if (ticketTab) {
                if (ticketTab.id === 'active-tickets') {
                    filterTickets();
                } else if (ticketTab.id === 'resolved-tickets') {
                    filterResolvedTickets();
                }
            }
        });
    });
    
    // Priority checkboxes (Priority Management section)
    const priorityCheckboxes = document.querySelectorAll('.priority-filter input[type="checkbox"]');
    priorityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Implement priority filtering logic here
            console.log(`Priority filter ${this.nextElementSibling.textContent} ${this.checked ? 'checked' : 'unchecked'}`);
            
            // For demo, simply update the table display
            filterTickets();
        });
    });
}

/**
 * Filter the active tickets based on selected filters
 */
function filterTickets() {
    const priorityFilter = document.getElementById('priority-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchBar = document.querySelector('#active-tickets .search-bar');
    
    if (!priorityFilter || !statusFilter || !searchBar) return;
    
    const priority = priorityFilter.value;
    const status = statusFilter.value;
    const searchText = searchBar.value.toLowerCase();
    
    const ticketRows = document.querySelectorAll('#active-tickets .tickets-table tbody tr');
    
    ticketRows.forEach(row => {
        let priorityMatch = true;
        let statusMatch = true;
        let searchMatch = true;
        
        // Check priority filter
        if (priority) {
            const rowPriority = row.querySelector('.priority-badge').textContent.toLowerCase();
            priorityMatch = rowPriority.includes(priority);
        }
        
        // Check status filter
        if (status) {
            const rowStatus = row.querySelector('.status-badge').textContent.toLowerCase();
            statusMatch = rowStatus.includes(status);
        }
        
        // Check search text (across multiple columns)
        if (searchText) {
            const rowText = row.textContent.toLowerCase();
            searchMatch = rowText.includes(searchText);
        }
        
        // Show or hide based on filter results
        if (priorityMatch && statusMatch && searchMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Filter the resolved tickets based on selected filters
 */
function filterResolvedTickets() {
    const dateRangeFilter = document.getElementById('date-range-filter');
    const resolutionTypeFilter = document.getElementById('resolution-type-filter');
    const searchBar = document.querySelector('#resolved-tickets .search-bar');
    
    if (!dateRangeFilter || !resolutionTypeFilter || !searchBar) return;
    
    const dateRange = dateRangeFilter.value;
    const resolutionType = resolutionTypeFilter.value;
    const searchText = searchBar.value.toLowerCase();
    
    const ticketRows = document.querySelectorAll('#resolved-tickets .tickets-table tbody tr');
    
    ticketRows.forEach(row => {
        let dateMatch = true;
        let resolutionMatch = true;
        let searchMatch = true;
        
        // Check date range filter (simplified for demo)
        if (dateRange) {
            const resolvedDate = row.querySelector('td:nth-child(8)').textContent;
            
            // Simple implementation for demo purposes
            switch (dateRange) {
                case 'today':
                    dateMatch = resolvedDate.includes('Today');
                    break;
                case 'yesterday':
                    dateMatch = resolvedDate.includes('Yesterday');
                    break;
                case 'this-week':
                    dateMatch = resolvedDate.includes('Today') || 
                                resolvedDate.includes('Yesterday') || 
                                resolvedDate.includes('Mar 2025');
                    break;
                case 'last-week':
                    // Simplified for demo
                    dateMatch = true;
                    break;
                case 'this-month':
                    // Simplified for demo
                    dateMatch = resolvedDate.includes('Mar 2025');
                    break;
                default:
                    dateMatch = true;
            }
        }
        
        // Check resolution type filter
        if (resolutionType) {
            const rowResolution = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
            resolutionMatch = rowResolution.includes(resolutionType.toLowerCase());
        }
        
        // Check search text (across multiple columns)
        if (searchText) {
            const rowText = row.textContent.toLowerCase();
            searchMatch = rowText.includes(searchText);
        }
        
        // Show or hide based on filter results
        if (dateMatch && resolutionMatch && searchMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Initialize ticket assignment functionality
 */
function initializeTicketAssignment() {
    // Agent assign dropdowns
    const agentAssignDropdowns = document.querySelectorAll('.agent-assign-dropdown');
    agentAssignDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            const ticketId = this.parentElement.querySelector('.ticket-id').textContent;
            const agent = this.value;
            
            if (agent) {
                assignTicketToAgent(ticketId, agent);
            }
        });
    });
    
    // Bulk assign button
    const bulkAssignBtn = document.querySelector('.bulk-assign-btn');
    if (bulkAssignBtn) {
        bulkAssignBtn.addEventListener('click', function() {
            // Show a notification or confirmation dialog (simplified for demo)
            alert('Bulk assignment feature will be implemented in the next update.');
        });
    }
    
    // Auto-assign toggle
    const autoAssignToggle = document.getElementById('auto-assign-toggle');
    if (autoAssignToggle) {
        autoAssignToggle.addEventListener('change', function() {
            // Update auto-assignment setting
            console.log(`Auto-assignment ${this.checked ? 'enabled' : 'disabled'}`);
        });
    }
    
    // Assignment method selection
    const assignmentMethod = document.getElementById('assignment-method');
    if (assignmentMethod) {
        assignmentMethod.addEventListener('change', function() {
            // Update assignment method
            console.log(`Assignment method changed to: ${this.value}`);
        });
    }
    
    // Configure rules button
    const configureRulesBtn = document.querySelector('.configure-rules-btn');
    if (configureRulesBtn) {
        configureRulesBtn.addEventListener('click', function() {
            // Navigate to Automation Rules section in settings
            const settingsTab = document.querySelector('.tab-btn[data-tab="settings"]');
            if (settingsTab) {
                settingsTab.click();
                
                // Scroll to Automation Rules section (simplified for demo)
                setTimeout(() => {
                    const automationRulesCard = document.querySelector('.settings-card h3:contains("Automation Rules")');
                    if (automationRulesCard) {
                        automationRulesCard.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            }
        });
    }
}

/**
 * Assign a ticket to an agent
 * @param {string} ticketId - The ID of the ticket to assign
 * @param {string} agent - The agent to assign the ticket to
 */
function assignTicketToAgent(ticketId, agent) {
    console.log(`Assigning ticket ${ticketId} to agent: ${agent}`);
    
    // In a real application, this would be an API call
    // For demo, just update the UI
    const ticketRows = document.querySelectorAll('#active-tickets .tickets-table tbody tr');
    
    ticketRows.forEach(row => {
        const rowTicketId = row.querySelector('td:first-child').textContent;
        if (rowTicketId === ticketId) {
            row.querySelector('td:nth-child(7)').textContent = getAgentNameFromValue(agent);
        }
    });
    
    // Show notification of success
    showNotification(`Ticket ${ticketId} assigned to ${getAgentNameFromValue(agent)}`);
}

/**
 * Get agent name from dropdown value
 * @param {string} agentValue - The value from the agent dropdown
 * @returns {string} - The agent's full name
 */
function getAgentNameFromValue(agentValue) {
    switch (agentValue) {
        case 'james': return 'James Muthui';
        case 'lucy': return 'Lucy Wanja';
        case 'john': return 'John Kimani';
        case 'faith': return 'Faith Mutua';
        default: return 'Unknown Agent';
    }
}

/**
 * Show a notification message
 * @param {string} message - The message to display
 */
function showNotification(message) {
    // Create a notification element
    const notificationElement = document.createElement('div');
    notificationElement.className = 'notification-toast';
    notificationElement.textContent = message;
    notificationElement.style.position = 'fixed';
    notificationElement.style.bottom = '20px';
    notificationElement.style.right = '20px';
    notificationElement.style.backgroundColor = '#333';
    notificationElement.style.color = '#fff';
    notificationElement.style.padding = '10px 20px';
    notificationElement.style.borderRadius = '5px';
    notificationElement.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notificationElement.style.zIndex = '9999';
    notificationElement.style.opacity = '0';
    notificationElement.style.transition = 'opacity 0.3s ease';
    
    // Add to the document
    document.body.appendChild(notificationElement);
    
    // Fade in
    setTimeout(() => {
        notificationElement.style.opacity = '1';
    }, 10);
    
    // Remove after a few seconds
    setTimeout(() => {
        notificationElement.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notificationElement);
        }, 300);
    }, 3000);
}

/**
 * Initialize ticket action buttons
 */
function initializeTicketActions() {
    // View ticket buttons
    const viewTicketBtns = document.querySelectorAll('.view-ticket-btn');
    const ticketDetailsModal = document.getElementById('ticket-details-modal');
    
    viewTicketBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get ticket details from the row
            const row = this.closest('tr');
            if (row && ticketDetailsModal) {
                const ticketId = row.querySelector('td:first-child').textContent;
                const subject = row.querySelector('td:nth-child(2)').textContent;
                const customerName = row.querySelector('td:nth-child(3)').textContent;
                const businessName = row.querySelector('td:nth-child(4)').textContent;
                
                // Update the ticket details modal
                updateTicketDetailsModal(ticketId, subject, customerName, businessName);
                
                // Open the modal
                openModal(ticketDetailsModal);
            }
        });
    });
    
    // Reply button
    const replyBtn = document.querySelector('.reply-btn');
    const replyTicketModal = document.getElementById('reply-ticket-modal');
    
    if (replyBtn && replyTicketModal) {
        replyBtn.addEventListener('click', function() {
            // Get ticket ID from the details modal
            const ticketId = document.querySelector('.ticket-details-container .ticket-id').textContent;
            
            // Update the reply modal title
            const replyModalTitle = replyTicketModal.querySelector('.modal-header h2');
            if (replyModalTitle) {
                replyModalTitle.textContent = `Reply to Ticket ${ticketId}`;
            }
            
            // Clear any previous reply
            const replyComposer = document.getElementById('reply-composer');
            if (replyComposer) {
                replyComposer.value = '';
            }
            
            // Open the reply modal
            openModal(replyTicketModal);
        });
    }
    
    // Send reply button
    const sendReplyBtn = document.querySelector('.send-reply-btn');
    
    if (sendReplyBtn) {
        sendReplyBtn.addEventListener('click', function() {
            const replyComposer = document.getElementById('reply-composer');
            const internalNoteToggle = document.getElementById('internal-note-toggle');
            const statusUpdateCheckbox = document.getElementById('status-update-checkbox');
            
            if (replyComposer) {
                const replyContent = replyComposer.value.trim();
                
                if (replyContent) {
                    // In a real application, this would submit the reply to the server
                    
                    // Check if this is an internal note
                    const isInternal = internalNoteToggle && internalNoteToggle.checked;
                    
                    // Check if we need to update status
                    const updateStatus = statusUpdateCheckbox && statusUpdateCheckbox.checked;
                    
                    console.log(`Sending reply: ${replyContent}`);
                    console.log(`Internal note: ${isInternal}`);
                    console.log(`Update status: ${updateStatus}`);
                    
                    // Add the reply to the response timeline
                    addReplyToTimeline(replyContent, isInternal);
                    
                    // Update ticket status if needed
                    if (updateStatus) {
                        updateTicketStatus('in-progress');
                    }
                    
                    // Close the reply modal
                    closeModal(document.getElementById('reply-ticket-modal'));
                    
                    // Show notification
                    showNotification('Reply sent successfully');
                } else {
                    alert('Please enter a reply message');
                }
            }
        });
    }
    
    // Reassign button
    const reassignBtn = document.querySelector('.reassign-btn');
    const reassignTicketModal = document.getElementById('reassign-ticket-modal');
    
    if (reassignBtn && reassignTicketModal) {
        reassignBtn.addEventListener('click', function() {
            // Get ticket ID from the details modal
            const ticketId = document.querySelector('.ticket-details-container .ticket-id').textContent;
            
            // Update the reassign modal title
            const reassignModalTitle = reassignTicketModal.querySelector('.modal-header h2');
            if (reassignModalTitle) {
                reassignModalTitle.textContent = `Reassign Ticket ${ticketId}`;
            }
            
            // Open the reassign modal
            openModal(reassignTicketModal);
        });
    }
    
    // Team assignment toggle
    const teamAssignmentCheckbox = document.getElementById('team-assignment');
    const teamAssignmentOptions = document.querySelector('.team-assignment-options');
    
    if (teamAssignmentCheckbox && teamAssignmentOptions) {
        teamAssignmentCheckbox.addEventListener('change', function() {
            teamAssignmentOptions.style.display = this.checked ? 'block' : 'none';
        });
    }
    
    // Confirm reassignment button
    const confirmReassignBtn = document.querySelector('.confirm-reassign-btn');
    
    if (confirmReassignBtn) {
        confirmReassignBtn.addEventListener('click', function() {
            const reassignAgent = document.getElementById('reassign-agent');
            const teamAssignment = document.getElementById('team-assignment');
            const reassignTeam = document.getElementById('reassign-team');
            const reassignmentReason = document.getElementById('reassignment-reason');
            
            let assignTo = '';
            
            if (teamAssignment && teamAssignment.checked && reassignTeam) {
                assignTo = reassignTeam.options[reassignTeam.selectedIndex].text;
            } else if (reassignAgent) {
                assignTo = reassignAgent.options[reassignAgent.selectedIndex].text;
            }
            
            if (assignTo) {
                // In a real application, this would submit the reassignment to the server
                
                console.log(`Reassigning ticket to: ${assignTo}`);
                console.log(`Reason: ${reassignmentReason ? reassignmentReason.value : 'None'}`);
                
                // Close the reassign modal
                closeModal(document.getElementById('reassign-ticket-modal'));
                
                // Show notification
                showNotification(`Ticket reassigned to ${assignTo}`);
            } else {
                alert('Please select an agent or team');
            }
        });
    }
    
    // Update status button
    const updateStatusBtn = document.querySelector('.update-status-btn');
    
    if (updateStatusBtn) {
        updateStatusBtn.addEventListener('click', function() {
            const statusUpdateDropdown = document.getElementById('status-update-dropdown');
            
            if (statusUpdateDropdown && statusUpdateDropdown.value) {
                updateTicketStatus(statusUpdateDropdown.value);
                
                // Show notification
                showNotification(`Ticket status updated to ${statusUpdateDropdown.options[statusUpdateDropdown.selectedIndex].text}`);
            } else {
                alert('Please select a status');
            }
        });
    }
    
    // Close ticket button
    const closeTicketBtn = document.querySelector('.close-ticket-btn');
    
    if (closeTicketBtn) {
        closeTicketBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to close this ticket?')) {
                updateTicketStatus('closed');
                
                // Close the ticket details modal
                closeModal(document.getElementById('ticket-details-modal'));
                
                // Show notification
                showNotification('Ticket closed successfully');
            }
        });
    }
    
    // Escalate button
    const escalateBtn = document.querySelector('.escalate-btn');
    
    if (escalateBtn) {
        escalateBtn.addEventListener('click', function() {
            // For demo purposes, just show an alert
            alert('Ticket escalation feature will be implemented in the next update.');
        });
    }
}

/**
 * Update the ticket details modal with specific ticket information
 * @param {string} ticketId - The ID of the ticket
 * @param {string} subject - The subject of the ticket
 * @param {string} customerName - The name of the customer
 * @param {string} businessName - The name of the business
 */
function updateTicketDetailsModal(ticketId, subject, customerName, businessName) {
    // Update modal title
    const modalTitle = document.querySelector('#ticket-details-modal .modal-header h2');
    if (modalTitle) {
        modalTitle.textContent = `Ticket Details - ${ticketId}`;
    }
    
    // Update ticket ID in the container
    const ticketIdSpan = document.querySelector('.ticket-details-container .ticket-id');
    if (ticketIdSpan) {
        ticketIdSpan.textContent = ticketId;
    }
    
    // Update ticket subject
    const ticketSubject = document.querySelector('.ticket-details-container .ticket-subject h3');
    if (ticketSubject) {
        ticketSubject.textContent = subject;
    }
    
    // Update customer name
    const customerNameSpan = document.querySelector('.customer-name');
    if (customerNameSpan) {
        customerNameSpan.textContent = customerName;
    }
    
    // Update business name
    const businessNameSpan = document.querySelector('.business-name');
    if (businessNameSpan) {
        businessNameSpan.textContent = businessName;
    }
    
    // Set current date/time for the timestamps
    const currentTime = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    
    const currentDate = 'Today';
    
    const createDateSpan = document.querySelector('.create-date');
    if (createDateSpan) {
        createDateSpan.textContent = `Created: ${currentDate}, ${currentTime}`;
    }
    
    const updateDateSpan = document.querySelector('.update-date');
    if (updateDateSpan) {
        updateDateSpan.textContent = `Last Updated: ${currentDate}, ${currentTime}`;
    }
}

/**
 * Add a reply to the response timeline
 * @param {string} content - The content of the reply
 * @param {boolean} isInternal - Whether this is an internal note
 */
function addReplyToTimeline(content, isInternal) {
    const responseTimeline = document.querySelector('.response-timeline');
    if (!responseTimeline) return;
    
    // Create a new response item
    const responseItem = document.createElement('div');
    responseItem.className = `response-item ${isInternal ? 'internal-note' : 'agent'}`;
    
    // Get current time
    const currentTime = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    
    // Create HTML content for the response
    responseItem.innerHTML = `
        <div class="response-avatar">
            <img src="C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\Technical Writings\\Images\\Icons\\icons8-profile-picture-40.png" alt="Agent Avatar">
        </div>
        <div class="response-content">
            <div class="response-header">
                <span class="response-author">Support Agent</span>
                <span class="response-time">Today, ${currentTime}</span>
                ${isInternal ? '<span class="note-badge">Internal Note</span>' : ''}
            </div>
            <div class="response-body">
                <p>${content.replace(/\n/g, '</p><p>')}</p>
            </div>
        </div>
    `;
    
    // Add to the timeline
    responseTimeline.appendChild(responseItem);
}

/**
 * Update the ticket status
 * @param {string} status - The new status
 */
function updateTicketStatus(status) {
    // Update status badge
    const statusBadge = document.querySelector('.ticket-details-container .status-badge');
    if (statusBadge) {
        // Remove all existing status classes
        statusBadge.classList.remove('new', 'in-progress', 'pending', 'resolved', 'closed');
        
        // Add the new status class
        statusBadge.classList.add(status);
        
        // Update the text content
        let statusText = '';
        switch (status) {
            case 'new': statusText = 'New'; break;
            case 'in-progress': statusText = 'In Progress'; break;
            case 'pending': statusText = 'Pending Customer'; break;
            case 'resolved': statusText = 'Resolved'; break;
            case 'closed': statusText = 'Closed'; break;
            default: statusText = status.charAt(0).toUpperCase() + status.slice(1);
        }
        statusBadge.textContent = statusText;
    }
    
    // Update current status section
    const currentStatusBadge = document.querySelector('.current-status .status-badge');
    if (currentStatusBadge) {
        // Remove all existing status classes
        currentStatusBadge.classList.remove('new', 'in-progress', 'pending', 'resolved', 'closed');
        
        // Add the new status class
        currentStatusBadge.classList.add(status);
        
        // Update the text content
        let statusText = '';
        switch (status) {
            case 'new': statusText = 'New'; break;
            case 'in-progress': statusText = 'In Progress'; break;
            case 'pending': statusText = 'Pending Customer'; break;
            case 'resolved': statusText = 'Resolved'; break;
            case 'closed': statusText = 'Closed'; break;
            default: statusText = status.charAt(0).toUpperCase() + status.slice(1);
        }
        currentStatusBadge.textContent = statusText;
    }
    
    // Add to status history
    addStatusToHistory(status);
}

/**
 * Add a status update to the status history
 * @param {string} status - The new status
 */
function addStatusToHistory(status) {
    const statusTimeline = document.querySelector('.status-timeline');
    if (!statusTimeline) return;
    
    // Get current time
    const currentTime = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    
    // Create a new status item
    const statusItem = document.createElement('li');
    statusItem.className = 'status-item';
    
    // Create status badge span
    const statusBadge = document.createElement('span');
    statusBadge.className = `status-badge ${status}`;
    
    // Set status text
    let statusText = '';
    switch (status) {
        case 'new': statusText = 'New'; break;
        case 'in-progress': statusText = 'In Progress'; break;
        case 'pending': statusText = 'Pending Customer'; break;
        case 'resolved': statusText = 'Resolved'; break;
        case 'closed': statusText = 'Closed'; break;
        default: statusText = status.charAt(0).toUpperCase() + status.slice(1);
    }
    statusBadge.textContent = statusText;
    
    // Create time span
    const timeSpan = document.createElement('span');
    timeSpan.className = 'status-time';
    timeSpan.textContent = `Today, ${currentTime}`;
    
    // Create by span
    const bySpan = document.createElement('span');
    bySpan.className = 'status-by';
    bySpan.textContent = 'by Support Agent';
    
    // Add all spans to the status item
    statusItem.appendChild(statusBadge);
    statusItem.appendChild(timeSpan);
    statusItem.appendChild(bySpan);
    
    // Add to the timeline at the beginning
    statusTimeline.insertBefore(statusItem, statusTimeline.firstChild);
}

/**
 * Initialize Knowledge Base functionality
 */
function initializeKnowledgeBase() {
    // Category items (collapsible)
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const subcategoryList = this.nextElementSibling;
            if (subcategoryList && subcategoryList.classList.contains('subcategory-list')) {
                subcategoryList.style.display = subcategoryList.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
    
    // Article status filter
    const articleStatusFilter = document.getElementById('article-status-filter');
    
    if (articleStatusFilter) {
        articleStatusFilter.addEventListener('change', function() {
            filterArticles();
        });
    }
    
    // Knowledge Base search
    const articleSearchBar = document.querySelector('.article-management .search-bar');
    
    if (articleSearchBar) {
        articleSearchBar.addEventListener('input', function() {
            filterArticles();
        });
    }
    
    // Create Category button
    const createCategoryBtn = document.querySelector('.create-category-btn');
    
    if (createCategoryBtn) {
        createCategoryBtn.addEventListener('click', function() {
            // For demo purposes, just show an alert
            alert('Create Category feature will be implemented in the next update.');
        });
    }
    
    // Create Article button
    const createArticleBtn = document.querySelector('.create-article-btn');
    const createArticleModal = document.getElementById('create-article-modal');
    
    if (createArticleBtn && createArticleModal) {
        createArticleBtn.addEventListener('click', function() {
            openModal(createArticleModal);
        });
    }
    
    // Article Category change
    const articleCategory = document.getElementById('article-category');
    const articleSubcategory = document.getElementById('article-subcategory');
    
    if (articleCategory && articleSubcategory) {
        articleCategory.addEventListener('change', function() {
            // Clear existing options
            articleSubcategory.innerHTML = '<option value="">Select Subcategory</option>';
            
            // Add new options based on selected category
            const category = this.value;
            let subcategories = [];
            
            switch (category) {
                case 'getting-started':
                    subcategories = ['Account Setup', 'Basic Navigation', 'Dashboard Overview'];
                    break;
                case 'billing':
                    subcategories = ['Invoice Management', 'Payment Methods', 'Subscription Plans'];
                    break;
                case 'troubleshooting':
                    subcategories = ['Common Errors', 'Mobile App Issues', 'System Performance'];
                    break;
                case 'advanced':
                    subcategories = ['Reports and Analytics', 'Custom Integrations', 'API Documentation'];
                    break;
            }
            
            // Add options to dropdown
            subcategories.forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory.toLowerCase().replace(/\s+/g, '-');
                option.textContent = subcategory;
                articleSubcategory.appendChild(option);
            });
        });
    }
    
    // Article Visibility change
    const articleVisibility = document.getElementById('article-visibility');
    const businessSelection = document.querySelector('.business-selection');
    
    if (articleVisibility && businessSelection) {
        articleVisibility.addEventListener('change', function() {
            businessSelection.style.display = this.value === 'restricted' ? 'block' : 'none';
        });
    }
    
    // Rich text editor toolbar buttons
    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    const articleContent = document.getElementById('article-content');
    
    if (toolbarButtons.length > 0 && articleContent) {
        toolbarButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const command = this.getAttribute('title');
                let markup = '';
                
                switch (command) {
                    case 'Bold':
                        markup = '**bold text**';
                        break;
                    case 'Italic':
                        markup = '*italic text*';
                        break;
                    case 'Underline':
                        markup = '__underlined text__';
                        break;
                    case 'Heading':
                        markup = '## Heading';
                        break;
                    case 'Bullet List':
                        markup = '- List item\n- Another list item';
                        break;
                    case 'Numbered List':
                        markup = '1. First item\n2. Second item';
                        break;
                    case 'Insert Link':
                        markup = '[link text](https://example.com)';
                        break;
                    case 'Insert Image':
                        markup = '![image description](image-url.jpg)';
                        break;
                    case 'Insert Code':
                        markup = '```\ncode block\n```';
                        break;
                }
                
                // Insert at cursor position or append
                if (articleContent.selectionStart || articleContent.selectionStart === 0) {
                    const startPos = articleContent.selectionStart;
                    const endPos = articleContent.selectionEnd;
                    articleContent.value = articleContent.value.substring(0, startPos) + markup + articleContent.value.substring(endPos);
                    articleContent.focus();
                    articleContent.selectionStart = startPos + markup.length;
                    articleContent.selectionEnd = startPos + markup.length;
                } else {
                    articleContent.value += markup;
                }
            });
        });
    }
    
    // Publish Article button
    const publishArticleBtn = document.querySelector('.publish-article-btn');
    
    if (publishArticleBtn) {
        publishArticleBtn.addEventListener('click', function() {
            const articleTitle = document.getElementById('article-title');
            
            if (articleTitle && articleTitle.value.trim()) {
                // In a real application, this would submit the article to the server
                
                console.log(`Publishing article: ${articleTitle.value}`);
                
                // Close the modal
                closeModal(document.getElementById('create-article-modal'));
                
                // Show notification
                showNotification('Article published successfully');
            } else {
                alert('Please enter an article title');
            }
        });
    }
    
    // View Analytics button
    const viewAnalyticsBtn = document.querySelector('.view-analytics-btn');
    
    if (viewAnalyticsBtn) {
        viewAnalyticsBtn.addEventListener('click', function() {
            // For demo, navigate to the Reports tab
            const reportsTab = document.querySelector('.tab-btn[data-tab="reports"]');
            if (reportsTab) {
                reportsTab.click();
            }
        });
    }
    
    // View All Feedback button
    const viewAllFeedbackBtn = document.querySelector('.view-all-feedback-btn');
    
    if (viewAllFeedbackBtn) {
        viewAllFeedbackBtn.addEventListener('click', function() {
            // For demo purposes, just show an alert
            alert('Feedback analysis feature will be enhanced in the next update.');
        });
    }
    
    // Edit and View Article buttons
    const editArticleBtns = document.querySelectorAll('.edit-article-btn');
    const viewArticleBtns = document.querySelectorAll('.view-article-btn');
    
    editArticleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            if (row) {
                const title = row.querySelector('td:first-child').textContent;
                
                // Open the Create Article modal for editing
                const articleTitle = document.getElementById('article-title');
                if (articleTitle) {
                    articleTitle.value = title;
                }
                
                // Update modal title to indicate editing
                const modalTitle = document.querySelector('#create-article-modal .modal-header h2');
                if (modalTitle) {
                    modalTitle.textContent = `Edit Knowledge Base Article`;
                }
                
                // Open the modal
                openModal(document.getElementById('create-article-modal'));
            }
        });
    });
    
    viewArticleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            if (row) {
                const title = row.querySelector('td:first-child').textContent;
                alert(`Viewing article: ${title}`);
            }
        });
    });
}

/**
 * Filter articles based on selected filter and search text
 */
function filterArticles() {
    const statusFilter = document.getElementById('article-status-filter');
    const searchBar = document.querySelector('.article-management .search-bar');
    
    if (!statusFilter || !searchBar) return;
    
    const status = statusFilter.value;
    const searchText = searchBar.value.toLowerCase();
    
    const articleRows = document.querySelectorAll('.articles-table tbody tr');
    
    articleRows.forEach(row => {
        let statusMatch = true;
        let searchMatch = true;
        
        // Check status filter
        if (status) {
            const rowStatus = row.querySelector('.status-badge').textContent.toLowerCase();
            statusMatch = rowStatus.includes(status);
        }
        
        // Check search text (across multiple columns)
        if (searchText) {
            const rowText = row.textContent.toLowerCase();
            searchMatch = rowText.includes(searchText);
        }
        
        // Show or hide based on filter results
        if (statusMatch && searchMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Initialize report toggles and actions
 */
function initializeReportToggles() {
    // Report period toggles
    const reportToggles = document.querySelectorAll('.toggle-btn');
    
    reportToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Find siblings
            const toggleGroup = this.parentElement;
            if (toggleGroup) {
                // Remove active class from all toggles in this group
                const toggles = toggleGroup.querySelectorAll('.toggle-btn');
                toggles.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked toggle
                this.classList.add('active');
                
                // Update chart data based on selected period (for demo purposes)
                const period = this.getAttribute('data-period');
                console.log(`Switching report to ${period} view`);
            }
        });
    });
    
    // Export Report buttons
    const exportReportBtns = document.querySelectorAll('.export-report-btn');
    const exportDataModal = document.getElementById('export-data-modal');
    
    exportReportBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (exportDataModal) {
                openModal(exportDataModal);
            }
        });
    });
    
    // Delivery method radio buttons
    const deliveryMethods = document.querySelectorAll('input[name="delivery-method"]');
    const emailDeliveryOptions = document.querySelector('.email-delivery-options');
    const scheduleDeliveryOptions = document.querySelector('.schedule-delivery-options');
    
    if (deliveryMethods.length > 0 && emailDeliveryOptions && scheduleDeliveryOptions) {
        deliveryMethods.forEach(method => {
            method.addEventListener('change', function() {
                switch (this.value) {
                    case 'email':
                        emailDeliveryOptions.style.display = 'block';
                        scheduleDeliveryOptions.style.display = 'none';
                        break;
                    case 'schedule':
                        emailDeliveryOptions.style.display = 'none';
                        scheduleDeliveryOptions.style.display = 'block';
                        break;
                    default: // download
                        emailDeliveryOptions.style.display = 'none';
                        scheduleDeliveryOptions.style.display = 'none';
                }
            });
        });
    }
    
    // Generate Export button
    const generateExportBtn = document.querySelector('.generate-export-btn');
    
    if (generateExportBtn) {
        generateExportBtn.addEventListener('click', function() {
            // For demo purposes, just show an notification
            showNotification('Export generated successfully');
            
            // Close the modal
            closeModal(document.getElementById('export-data-modal'));
        });
    }
}

/**
 * Initialize settings handlers
 */
function initializeSettingsHandlers() {
    // Status configuration checkboxes
    const statusCheckboxes = document.querySelectorAll('.settings-table input[type="checkbox"]');
    
    statusCheckboxes.forEach(checkbox => {
        if (!checkbox.disabled) {
            checkbox.addEventListener('change', function() {
                const statusName = this.closest('tr').querySelector('td:first-child').textContent;
                console.log(`Status "${statusName}" ${this.checked ? 'enabled' : 'disabled'}`);
            });
        }
    });
    
    // Edit status buttons
    const editStatusBtns = document.querySelectorAll('.edit-status-btn');
    
    editStatusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const statusName = this.closest('tr').querySelector('td:first-child').textContent;
            alert(`Editing status "${statusName}". This feature will be implemented in the next update.`);
        });
    });
    
    // Add Custom Status button
    const addStatusBtn = document.querySelector('.add-status-btn');
    
    if (addStatusBtn) {
        addStatusBtn.addEventListener('click', function() {
            alert('Add Custom Status feature will be implemented in the next update.');
        });
    }
    
    // Setting controls
    const settingControls = document.querySelectorAll('.setting-control');
    
    settingControls.forEach(control => {
        control.addEventListener('change', function() {
            const settingLabel = this.closest('.setting-item').querySelector('.setting-label').textContent;
            console.log(`Setting "${settingLabel}" changed to: ${this.value}`);
        });
    });
    
    // Business hours checkboxes
    const businessDayCheckboxes = document.querySelectorAll('.day-item input[type="checkbox"]');
    
    businessDayCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const dayName = this.parentElement.textContent.trim();
            console.log(`${dayName} ${this.checked ? 'enabled' : 'disabled'} for business hours`);
            
            // Enable/disable time inputs
            const timeInputs = this.closest('.day-item').querySelectorAll('input[type="time"]');
            timeInputs.forEach(input => {
                input.disabled = !this.checked;
            });
        });
    });
    
    // Hours range inputs
    const hoursRangeInputs = document.querySelectorAll('.hours-range input[type="time"]');
    
    hoursRangeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (!this.disabled) {
                const dayName = this.closest('.day-item').querySelector('label').textContent.trim();
                const isStartTime = this.closest('.hours-range').querySelector('span').textContent.includes('to');
                console.log(`${dayName} ${isStartTime ? 'start' : 'end'} time set to: ${this.value}`);
            }
        });
    });
    
    // Edit SLA buttons
    const editSLABtns = document.querySelectorAll('.edit-sla-btn');
    
    editSLABtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const priority = this.closest('tr').querySelector('td:first-child').textContent;
            alert(`Editing SLA for "${priority}" priority. This feature will be implemented in the next update.`);
        });
    });
    
    // Configure buttons
    const configureButtons = document.querySelectorAll('.configure-workflow-btn, .configure-escalation-btn, .configure-scheduled-btn');
    
    configureButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const configType = this.textContent.trim();
            alert(`${configType} feature will be implemented in the next update.`);
        });
    });
    
    // Edit rule buttons
    const editRuleBtns = document.querySelectorAll('.edit-rule-btn');
    
    editRuleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const ruleName = this.closest('tr').querySelector('td:first-child').textContent;
            alert(`Editing rule "${ruleName}". This feature will be implemented in the next update.`);
        });
    });
    
    // Add rule button
    const addRuleBtn = document.querySelector('.add-rule-btn');
    
    if (addRuleBtn) {
        addRuleBtn.addEventListener('click', function() {
            alert('Add New Rule feature will be implemented in the next update.');
        });
    }
    
    // Edit template buttons
    const editTemplateBtns = document.querySelectorAll('.edit-template-btn');
    
    editTemplateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const templateName = this.closest('tr').querySelector('td:first-child').textContent;
            alert(`Editing template "${templateName}". This feature will be implemented in the next update.`);
        });
    });
    
    // Add template button
    const addTemplateBtn = document.querySelector('.add-template-btn');
    
    if (addTemplateBtn) {
        addTemplateBtn.addEventListener('click', function() {
            alert('Add New Template feature will be implemented in the next update.');
        });
    }
    
    // Integration test buttons
    const testEmailBtn = document.querySelector('.test-email-btn');
    const testSMSBtn = document.querySelector('.test-sms-btn');
    
    if (testEmailBtn) {
        testEmailBtn.addEventListener('click', function() {
            alert('Test email sent successfully.');
        });
    }
    
    if (testSMSBtn) {
        testSMSBtn.addEventListener('click', function() {
            alert('Test SMS sent successfully.');
        });
    }
    
    // Configure API button
    const configAPIBtn = document.querySelector('.config-api-btn');
    
    if (configAPIBtn) {
        configAPIBtn.addEventListener('click', function() {
            alert('API Credentials configuration will be implemented in the next update.');
        });
    }
    
    // Configure integration buttons
    const configIntegrationBtns = document.querySelectorAll('.config-integration-btn');
    
    configIntegrationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const integrationName = this.closest('tr').querySelector('td:first-child').textContent;
            const isConnected = this.closest('tr').querySelector('.status-badge').classList.contains('active');
            
            if (isConnected) {
                alert(`Configuring ${integrationName} integration. This feature will be implemented in the next update.`);
            } else {
                alert(`Connecting to ${integrationName}. This feature will be implemented in the next update.`);
            }
        });
    });
    
    // Add integration button
    const addIntegrationBtn = document.querySelector('.add-integration-btn');
    
    if (addIntegrationBtn) {
        addIntegrationBtn.addEventListener('click', function() {
            alert('Add New Integration feature will be implemented in the next update.');
        });
    }
}

/**
 * Initialize form handlers
 */
function initializeFormHandlers() {
    // Reply template selection
    const replyTemplate = document.getElementById('reply-template');
    const replyComposer = document.getElementById('reply-composer');
    
    if (replyTemplate && replyComposer) {
        replyTemplate.addEventListener('change', function() {
            // Populate reply composer with selected template
            switch (this.value) {
                case 'greeting':
                    replyComposer.value = 'Dear Customer,\n\nThank you for contacting CarPal Support. I will be assisting you with your inquiry today.\n\nBest regards,\nSupport Team';
                    break;
                case 'troubleshooting':
                    replyComposer.value = 'Dear Customer,\n\nThank you for reporting this issue. To help us troubleshoot, could you please provide the following information:\n\n1. What steps led to the error?\n2. What error message are you seeing?\n3. What browser/device are you using?\n\nBest regards,\nSupport Team';
                    break;
                case 'escalation':
                    replyComposer.value = 'Dear Customer,\n\nThank you for your patience. Due to the complexity of the issue, I have escalated this to our technical team for further investigation. We will update you as soon as possible.\n\nBest regards,\nSupport Team';
                    break;
                case 'resolution':
                    replyComposer.value = 'Dear Customer,\n\nI am pleased to inform you that we have resolved the issue you reported. Please try the following solution and let us know if it addresses your concern:\n\n[Solution details here]\n\nBest regards,\nSupport Team';
                    break;
            }
        });
    }
    
    // Create ticket form
    const createTicketForm = document.querySelector('#create-ticket-modal .modal-content');
    const createTicketBtn = document.querySelector('#create-ticket-modal .create-ticket-btn');
    
    if (createTicketForm && createTicketBtn) {
        createTicketBtn.addEventListener('click', function() {
            const ticketSubject = document.getElementById('ticket-subject');
            
            if (ticketSubject && ticketSubject.value.trim()) {
                // In a real application, this would submit the form to the server
                
                console.log(`Creating ticket: ${ticketSubject.value}`);
                
                // Close the modal
                closeModal(document.getElementById('create-ticket-modal'));
                
                // Show notification
                showNotification('Ticket created successfully');
                
                // Switch to tickets tab
                const ticketsTab = document.querySelector('.tab-btn[data-tab="tickets"]');
                if (ticketsTab) {
                    ticketsTab.click();
                }
            } else {
                alert('Please enter a ticket subject');
            }
        });
    }
}

/**
 * Initialize dark mode toggle
 */
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (darkModeToggle) {
        // Check if user has already set a preference
        const darkModePreference = localStorage.getItem('darkMode');
        
        // If preference exists, set dark mode accordingly
        if (darkModePreference === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.querySelector('.dark-mode-icon').textContent = '☀️';
        }
        
        // Add click event listener
        darkModeToggle.addEventListener('click', function() {
            // Toggle dark mode class on body
            document.body.classList.toggle('dark-mode');
            
            // Update icon
            const isDarkMode = document.body.classList.contains('dark-mode');
            darkModeToggle.querySelector('.dark-mode-icon').textContent = isDarkMode ? '☀️' : '🌙';
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        });
    }
}

// Helper function to find element by containing text
Element.prototype.contains = function(text) {
    return this.textContent.includes(text);
};