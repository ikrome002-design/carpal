/**
 * CarPal by Citrus - Dashboard JavaScript
 * This file handles all interactive functionality for the Administrator Dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== DOM Elements =====
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const dashboardSettingsBtn = document.getElementById('dashboardSettingsBtn');
    const dashboardSettingsModal = document.getElementById('dashboardSettingsModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelSettingsBtn = document.getElementById('cancelSettingsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const refreshUpdatesBtn = document.getElementById('refreshUpdates');
    const viewAllAlertsBtn = document.getElementById('viewAllAlerts');
    const viewAllBusinessUpdatesBtn = document.getElementById('viewAllBusinessUpdates');
    
    // Quick Action Buttons
    const addNewUserBtn = document.getElementById('addNewUser');
    const addNewBusinessBtn = document.getElementById('addNewBusiness');
    const viewNotificationsBtn = document.getElementById('viewNotifications');
    const serviceUsageDetailsBtn = document.getElementById('serviceUsageDetails');
    
    // Dashboard Widget Toggles
    const kpiPanelToggle = document.getElementById('kpiPanelToggle');
    const quickActionsPanelToggle = document.getElementById('quickActionsPanelToggle');
    const realTimeUpdatesPanelToggle = document.getElementById('realTimeUpdatesPanelToggle');
    const analyticsPanelToggle = document.getElementById('analyticsPanelToggle');
    
    // Filter Elements
    const dateRangeSelect = document.getElementById('dateRange');
    const userTypeSelect = document.getElementById('userType');
    const businessSegmentSelect = document.getElementById('businessSegment');
    
    // Chart Controls
    const chartDateRanges = document.querySelectorAll('.chart-date-range');
    const timePeriodToggles = document.querySelectorAll('.toggle-btn');
    const businessTypeFilter = document.querySelector('.business-type-filter');
    const chartExportBtns = document.querySelectorAll('.chart-export-btn');
    
    // For mobile devices
    let sidebarElement = document.querySelector('.sidebar');
    let mobileMenuToggle;
    
    // Check if we need to add mobile menu toggle
    if (window.innerWidth <= 768) {
        addMobileMenuToggle();
    }

    // ===== Event Listeners =====
    
    // Profile Dropdown Toggle
    if (profileToggle) {
        profileToggle.addEventListener('click', function() {
            profileDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!profileToggle.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }
    
    // Dark Mode Toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Update icon
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('carpal-theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('carpal-theme', 'light');
            }
        });
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('carpal-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    // Dashboard Settings Modal
    if (dashboardSettingsBtn) {
        dashboardSettingsBtn.addEventListener('click', function() {
            dashboardSettingsModal.classList.add('show');
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            dashboardSettingsModal.classList.remove('show');
        });
    }
    
    if (cancelSettingsBtn) {
        cancelSettingsBtn.addEventListener('click', function() {
            dashboardSettingsModal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    dashboardSettingsModal.addEventListener('click', function(event) {
        if (event.target === dashboardSettingsModal) {
            dashboardSettingsModal.classList.remove('show');
        }
    });
    
    // Save Dashboard Settings
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            // Get settings values
            const kpiPanelVisible = kpiPanelToggle.checked;
            const quickActionsPanelVisible = quickActionsPanelToggle.checked;
            const realTimeUpdatesPanelVisible = realTimeUpdatesPanelToggle.checked;
            const analyticsPanelVisible = analyticsPanelToggle.checked;
            const layoutType = document.getElementById('layoutType').value;
            const refreshInterval = document.getElementById('refreshInterval').value;
            
            // Save to localStorage
            const settings = {
                kpiPanelVisible,
                quickActionsPanelVisible,
                realTimeUpdatesPanelVisible,
                analyticsPanelVisible,
                layoutType,
                refreshInterval
            };
            
            localStorage.setItem('dashboard-settings', JSON.stringify(settings));
            
            // Apply settings
            applyDashboardSettings(settings);
            
            // Close modal
            dashboardSettingsModal.classList.remove('show');
            
            // Show confirmation message
            showNotification('Settings saved successfully', 'success');
        });
    }
    
    // Apply Filter Button
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const dateRange = dateRangeSelect.value;
            const userType = userTypeSelect.value;
            const businessSegment = businessSegmentSelect.value;
            
            // Save filter state
            const filters = {
                dateRange,
                userType,
                businessSegment
            };
            
            localStorage.setItem('dashboard-filters', JSON.stringify(filters));
            
            // Apply filters to dashboard data
            applyFilters(filters);
            
            // Show confirmation message
            showNotification('Filters applied', 'info');
        });
    }
    
    // Reset Filter Button
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Reset filter selects to defaults
            dateRangeSelect.value = 'week';
            userTypeSelect.value = 'all';
            businessSegmentSelect.value = 'all';
            
            // Clear saved filters
            localStorage.removeItem('dashboard-filters');
            
            // Reset dashboard data
            resetFilters();
            
            // Show confirmation message
            showNotification('Filters reset to default', 'info');
        });
    }
    
    // Refresh Updates Button
    if (refreshUpdatesBtn) {
        refreshUpdatesBtn.addEventListener('click', function() {
            // Add spinner to indicate refresh
            const icon = refreshUpdatesBtn.querySelector('i');
            icon.classList.add('fa-spin');
            
            // Simulate refresh with timeout
            setTimeout(function() {
                fetchLatestUpdates();
                icon.classList.remove('fa-spin');
                showNotification('Updates refreshed', 'success');
            }, 1000);
        });
    }
    
    // Add New User Quick Action
    if (addNewUserBtn) {
        addNewUserBtn.addEventListener('click', function() {
            // Navigate to User Creation Form
            window.location.href = "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\User Management\\create_user.html";
        });
    }
    
    // Add New Business Quick Action
    if (addNewBusinessBtn) {
        addNewBusinessBtn.addEventListener('click', function() {
            // Navigate to Business Registration Form
            window.location.href = "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\Business Management\\register_business.html";
        });
    }
    
    // View Notifications Quick Action
    if (viewNotificationsBtn) {
        viewNotificationsBtn.addEventListener('click', function() {
            // Navigate to Notifications Panel
            window.location.href = "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\Notifications\\notifications.html";
        });
    }
    
    // View All Alerts Link
    if (viewAllAlertsBtn) {
        viewAllAlertsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to All Alerts View
            window.location.href = "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\Alerts\\all_alerts.html";
        });
    }
    
    // View All Business Updates Link
    if (viewAllBusinessUpdatesBtn) {
        viewAllBusinessUpdatesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to Business Updates List
            window.location.href = "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\Business Management\\business_updates.html";
        });
    }
    
    // Service Usage Details Link
    if (serviceUsageDetailsBtn) {
        serviceUsageDetailsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to Service Usage Details
            window.location.href = "C:\\Users\\nderu\\Documents\\Development\\Product\\CarPal\\CarPal Administrator 2.0\\Service Usage\\usage_details.html";
        });
    }
    
    // Chart Date Range Controls
    chartDateRanges.forEach(function(select) {
        select.addEventListener('change', function() {
            const chartCard = select.closest('.chart-card');
            const chartId = chartCard.querySelector('.chart-container').id;
            updateChart(chartId, { dateRange: select.value });
        });
    });
    
    // Time Period Toggle Buttons
    timePeriodToggles.forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove active class from all siblings
            const siblings = button.parentElement.querySelectorAll('.toggle-btn');
            siblings.forEach(sibling => sibling.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update chart with selected period
            const chartCard = button.closest('.chart-card');
            const chartId = chartCard.querySelector('.chart-container').id;
            updateChart(chartId, { period: button.dataset.period });
        });
    });
    
    // Business Type Filter
    if (businessTypeFilter) {
        businessTypeFilter.addEventListener('change', function() {
            const chartCard = businessTypeFilter.closest('.chart-card');
            const chartId = chartCard.querySelector('.chart-container').id;
            updateChart(chartId, { businessType: businessTypeFilter.value });
        });
    }
    
    // Chart Export Buttons
    chartExportBtns.forEach(function(button) {
        button.addEventListener('click', function() {
            const chartCard = button.closest('.chart-card');
            const chartId = chartCard.querySelector('.chart-container').id;
            const chartTitle = chartCard.querySelector('h3').textContent;
            exportChart(chartId, chartTitle);
        });
    });
    
    // Auto-refresh for real-time updates
    let autoRefreshInterval;
    
    function setupAutoRefresh() {
        // Get refresh interval from settings or use default (60 seconds)
        const settings = JSON.parse(localStorage.getItem('dashboard-settings')) || {};
        const refreshInterval = settings.refreshInterval || 60;
        
        // Clear existing interval if any
        if (autoRefreshInterval) {
            clearInterval(autoRefreshInterval);
        }
        
        // Skip setting up interval if manual refresh is selected
        if (refreshInterval === 'manual') {
            return;
        }
        
        // Set up new interval
        autoRefreshInterval = setInterval(function() {
            fetchLatestUpdates();
        }, refreshInterval * 1000);
    }
    
    // Window resize event
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                addMobileMenuToggle();
            }
        } else {
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileToggle) {
                mobileToggle.remove();
            }
            // Ensure sidebar is visible on larger screens
            sidebarElement.classList.remove('show');
        }
    });
    
    // ===== Helper Functions =====
    
    // Function to add mobile menu toggle
    function addMobileMenuToggle() {
        // Create mobile menu toggle button
        mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.appendChild(mobileMenuToggle);
        
        // Add click event
        mobileMenuToggle.addEventListener('click', function() {
            sidebarElement.classList.toggle('show');
            
            // Change icon based on sidebar state
            if (sidebarElement.classList.contains('show')) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Apply Dashboard Settings
    function applyDashboardSettings(settings) {
        const kpiPanel = document.querySelector('.kpi-panel');
        const quickActionsPanel = document.querySelector('.quick-actions-panel');
        const realTimeUpdates = document.querySelector('.real-time-updates');
        const analyticsDisplay = document.querySelector('.analytics-display');
        
        // Apply widget visibility
        if (kpiPanel) {
            kpiPanel.style.display = settings.kpiPanelVisible ? 'grid' : 'none';
        }
        
        if (quickActionsPanel) {
            quickActionsPanel.style.display = settings.quickActionsPanelVisible ? 'block' : 'none';
        }
        
        if (realTimeUpdates) {
            realTimeUpdates.style.display = settings.realTimeUpdatesPanelVisible ? 'block' : 'none';
        }
        
        if (analyticsDisplay) {
            analyticsDisplay.style.display = settings.analyticsPanelVisible ? 'block' : 'none';
        }
        
        // Apply layout changes
        const content = document.querySelector('.content');
        if (content) {
            // Remove existing layout classes
            content.classList.remove('layout-default', 'layout-compact', 'layout-expanded', 'layout-custom');
            
            // Add selected layout class
            content.classList.add(`layout-${settings.layoutType}`);
        }
        
        // Update auto-refresh interval
        setupAutoRefresh();
    }
    
    // Apply Filters to Dashboard
    function applyFilters(filters) {
        console.log('Applying filters:', filters);
        
        // Here we would normally make API calls to fetch filtered data
        // For demonstration, we'll simulate data update with dummy data
        
        // Update KPI values based on filters
        updateKPIData(filters);
        
        // Update charts based on filters
        updateChart('registrationTrendsChart', filters);
        updateChart('revenueGrowthChart', filters);
        updateChart('businessEngagementChart', filters);
        
        // Update real-time updates based on filters
        updateRealTimeData(filters);
    }
    
    // Reset Filters
    function resetFilters() {
        // Default filter values
        const defaultFilters = {
            dateRange: 'week',
            userType: 'all',
            businessSegment: 'all'
        };
        
        // Update UI to reflect default values
        dateRangeSelect.value = defaultFilters.dateRange;
        userTypeSelect.value = defaultFilters.userType;
        businessSegmentSelect.value = defaultFilters.businessSegment;
        
        // Apply default filters
        applyFilters(defaultFilters);
    }
    
    // Fetch Latest Updates
    function fetchLatestUpdates() {
        console.log('Fetching latest updates...');
        
        // Here we would normally make API calls to fetch the latest data
        // For demonstration, we'll simulate with random updates
        
        // Get random update time
        const currentTime = new Date();
        const minutes = Math.floor(Math.random() * 10);
        const timeText = minutes === 0 ? 'Just now' : `${minutes} minutes ago`;
        
        // Example of adding a new system alert
        const alertsList = document.querySelector('.updates-card:nth-child(1) .updates-list');
        if (alertsList) {
            // Create new alert item with random priority
            const priorities = ['high', 'medium', 'low'];
            const icons = ['fa-exclamation-triangle', 'fa-info-circle', 'fa-bell'];
            const priorityIndex = Math.floor(Math.random() * 3);
            
            const newAlertItem = document.createElement('li');
            newAlertItem.className = `update-item alert-${priorities[priorityIndex]}`;
            newAlertItem.innerHTML = `
                <div class="update-icon">
                    <i class="fas ${icons[priorityIndex]}"></i>
                </div>
                <div class="update-content">
                    <div class="update-title">System Update</div>
                    <div class="update-text">New system update available</div>
                    <div class="update-time">${timeText}</div>
                </div>
            `;
            
            // Add to the top of the list
            alertsList.insertBefore(newAlertItem, alertsList.firstChild);
            
            // Remove oldest item if more than 3
            if (alertsList.children.length > 3) {
                alertsList.removeChild(alertsList.lastChild);
            }
            
            // Update badge count
            const badge = document.querySelector('.updates-card:nth-child(1) .badge');
            if (badge) {
                badge.textContent = parseInt(badge.textContent) + 1;
            }
        }
    }
    
    // Update KPI Data
    function updateKPIData(filters) {
        console.log('Updating KPI data with filters:', filters);
        
        // In a real application, this would fetch data from an API based on filters
        // For demonstration, we'll simulate changes based on the filter selection
        
        const kpiValues = document.querySelectorAll('.kpi-value');
        const kpiTrends = document.querySelectorAll('.kpi-trend');
        
        // Generate random percentage changes
        const getRandomTrend = () => {
            const value = (Math.random() * 10 - 3).toFixed(1); // Random between -3% and +7%
            return value;
        };
        
        // Apply different data based on date range
        let multiplier = 1;
        switch(filters.dateRange) {
            case 'today':
                multiplier = 0.1;
                break;
            case 'week':
                multiplier = 1;
                break;
            case 'month':
                multiplier = 4;
                break;
            case 'quarter':
                multiplier = 12;
                break;
            case 'year':
                multiplier = 50;
                break;
        }
        
        // Update user count
        if (kpiValues[0]) {
            const baseUserCount = 15842;
            let adjustedCount = baseUserCount;
            
            // Adjust for user type filter
            if (filters.userType !== 'all') {
                switch(filters.userType) {
                    case 'admin':
                        adjustedCount = Math.round(baseUserCount * 0.05);
                        break;
                    case 'business':
                        adjustedCount = Math.round(baseUserCount * 0.2);
                        break;
                    case 'customer':
                        adjustedCount = Math.round(baseUserCount * 0.65);
                        break;
                    case 'driver':
                        adjustedCount = Math.round(baseUserCount * 0.1);
                        break;
                }
            }
            
            // Apply multiplier for date range
            adjustedCount = Math.round(adjustedCount * multiplier);
            
            // Format with commas
            kpiValues[0].textContent = adjustedCount.toLocaleString();
            
            // Update trend
            const trend = getRandomTrend();
            const trendElement = kpiTrends[0].querySelector('span');
            if (trendElement) {
                trendElement.textContent = `${trend}%`;
                
                // Update class based on positive/negative trend
                if (parseFloat(trend) >= 0) {
                    kpiTrends[0].classList.remove('negative');
                    kpiTrends[0].classList.add('positive');
                    kpiTrends[0].querySelector('i').className = 'fas fa-arrow-up';
                } else {
                    kpiTrends[0].classList.remove('positive');
                    kpiTrends[0].classList.add('negative');
                    kpiTrends[0].querySelector('i').className = 'fas fa-arrow-down';
                }
            }
        }
        
        // Similar updates for other KPIs - businesses, revenue, service usage
        // Apply business segment filter to business count
        if (kpiValues[1]) {
            const baseBusinessCount = 3256;
            let adjustedCount = baseBusinessCount;
            
            // Adjust for business segment filter
            if (filters.businessSegment !== 'all') {
                switch(filters.businessSegment) {
                    case 'transport':
                        adjustedCount = Math.round(baseBusinessCount * 0.3);
                        break;
                    case 'logistics':
                        adjustedCount = Math.round(baseBusinessCount * 0.25);
                        break;
                    case 'delivery':
                        adjustedCount = Math.round(baseBusinessCount * 0.35);
                        break;
                    case 'rental':
                        adjustedCount = Math.round(baseBusinessCount * 0.1);
                        break;
                }
            }
            
            // Apply multiplier for date range
            adjustedCount = Math.round(adjustedCount * multiplier);
            
            // Format with commas
            kpiValues[1].textContent = adjustedCount.toLocaleString();
            
            // Update trend
            const trend = getRandomTrend();
            const trendElement = kpiTrends[1].querySelector('span');
            if (trendElement) {
                trendElement.textContent = `${trend}%`;
                
                // Update class based on positive/negative trend
                if (parseFloat(trend) >= 0) {
                    kpiTrends[1].classList.remove('negative');
                    kpiTrends[1].classList.add('positive');
                    kpiTrends[1].querySelector('i').className = 'fas fa-arrow-up';
                } else {
                    kpiTrends[1].classList.remove('positive');
                    kpiTrends[1].classList.add('negative');
                    kpiTrends[1].querySelector('i').className = 'fas fa-arrow-down';
                }
            }
        }
        
        // Update revenue
        if (kpiValues[2]) {
            const baseRevenue = 428971;
            let adjustedRevenue = baseRevenue;
            
            // Apply business segment filter to revenue
            if (filters.businessSegment !== 'all') {
                switch(filters.businessSegment) {
                    case 'transport':
                        adjustedRevenue = Math.round(baseRevenue * 0.4);
                        break;
                    case 'logistics':
                        adjustedRevenue = Math.round(baseRevenue * 0.3);
                        break;
                    case 'delivery':
                        adjustedRevenue = Math.round(baseRevenue * 0.2);
                        break;
                    case 'rental':
                        adjustedRevenue = Math.round(baseRevenue * 0.1);
                        break;
                }
            }
            
            // Apply multiplier for date range
            adjustedRevenue = Math.round(adjustedRevenue * multiplier);
            
            // Format with dollar sign and commas
            kpiValues[2].textContent = `$${adjustedRevenue.toLocaleString()}`;
            
            // Update trend
            const trend = getRandomTrend();
            const trendElement = kpiTrends[2].querySelector('span');
            if (trendElement) {
                trendElement.textContent = `${trend}%`;
                
                // Update class based on positive/negative trend
                if (parseFloat(trend) >= 0) {
                    kpiTrends[2].classList.remove('negative');
                    kpiTrends[2].classList.add('positive');
                    kpiTrends[2].querySelector('i').className = 'fas fa-arrow-up';
                } else {
                    kpiTrends[2].classList.remove('positive');
                    kpiTrends[2].classList.add('negative');
                    kpiTrends[2].querySelector('i').className = 'fas fa-arrow-down';
                }
            }
        }
        
        // Update service usage
        if (kpiValues[3]) {
            const baseUsage = 74532;
            let adjustedUsage = baseUsage;
            
            // Apply user type filter to service usage
            if (filters.userType !== 'all') {
                switch(filters.userType) {
                    case 'admin':
                        adjustedUsage = Math.round(baseUsage * 0.02);
                        break;
                    case 'business':
                        adjustedUsage = Math.round(baseUsage * 0.3);
                        break;
                    case 'customer':
                        adjustedUsage = Math.round(baseUsage * 0.6);
                        break;
                    case 'driver':
                        adjustedUsage = Math.round(baseUsage * 0.08);
                        break;
                }
            }
            
            // Apply business segment filter to service usage
            if (filters.businessSegment !== 'all') {
                switch(filters.businessSegment) {
                    case 'transport':
                        adjustedUsage = Math.round(adjustedUsage * 0.3);
                        break;
                    case 'logistics':
                        adjustedUsage = Math.round(adjustedUsage * 0.25);
                        break;
                    case 'delivery':
                        adjustedUsage = Math.round(adjustedUsage * 0.35);
                        break;
                    case 'rental':
                        adjustedUsage = Math.round(adjustedUsage * 0.1);
                        break;
                }
            }
            
            // Apply multiplier for date range
            adjustedUsage = Math.round(adjustedUsage * multiplier);
            
            // Format with commas
            kpiValues[3].textContent = adjustedUsage.toLocaleString();
            
            // Update trend
            const trend = getRandomTrend();
            const trendElement = kpiTrends[3].querySelector('span');
            if (trendElement) {
                trendElement.textContent = `${trend}%`;
                
                // Update class based on positive/negative trend
                if (parseFloat(trend) >= 0) {
                    kpiTrends[3].classList.remove('negative');
                    kpiTrends[3].classList.add('positive');
                    kpiTrends[3].querySelector('i').className = 'fas fa-arrow-up';
                } else {
                    kpiTrends[3].classList.remove('positive');
                    kpiTrends[3].classList.add('negative');
                    kpiTrends[3].querySelector('i').className = 'fas fa-arrow-down';
                }
            }
        }
    }
    
    // Update Chart
    function updateChart(chartId, params) {
        console.log(`Updating chart ${chartId} with params:`, params);
        
        // In a real application, this would update the chart with new data
        // For demonstration, we'll update the placeholder text
        
        const chartContainer = document.getElementById(chartId);
        if (!chartContainer) return;
        
        const placeholder = chartContainer.querySelector('.chart-placeholder');
        if (!placeholder) return;
        
        let chartTypeText = '';
        let chartTypeDescription = '';
        
        switch(chartId) {
            case 'registrationTrendsChart':
                chartTypeText = 'Registration Trends Line Chart';
                chartTypeDescription = `Date Range: ${params.dateRange || 'Last 30 Days'}`;
                break;
            case 'revenueGrowthChart':
                chartTypeText = 'Revenue Growth Bar Chart';
                chartTypeDescription = `Time Period: ${params.period || 'Monthly'}`;
                break;
            case 'businessEngagementChart':
                chartTypeText = 'Business Engagement Heat Map';
                chartTypeDescription = `Business Type: ${params.businessType || 'All Business Types'}`;
                break;
        }
        
        placeholder.innerHTML = `<p>${chartTypeText}</p><p>${chartTypeDescription}</p><p>(Interactive chart would update with new data)</p>`;
    }
    
    // Update Real-Time Data
    function updateRealTimeData(filters) {
        console.log('Updating real-time data with filters:', filters);
        
        // In a real application, this would fetch and update the real-time data
        // For demonstration, we'll update the timestamps
        
        const updateTimes = document.querySelectorAll('.update-time');
        const currentTime = new Date();
        
        updateTimes.forEach((time, index) => {
            // Generate random times in the past
            const minutes = Math.floor(Math.random() * 60);
            time.textContent = minutes <= 0 ? 'Just now' : `${minutes} minutes ago`;
        });
    }
    
    // Export Chart
    function exportChart(chartId, chartTitle) {
        console.log(`Exporting chart ${chartId} with title: ${chartTitle}`);
        
        // In a real application, this would generate a CSV or PDF export
        // For demonstration, we'll show a notification
        
        showNotification(`Chart "${chartTitle}" exported successfully`, 'success');
    }
    
    // Show Notification
    function showNotification(message, type = 'info') {
        console.log(`Notification: ${message} (${type})`);
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        // Add to the DOM
        document.body.appendChild(notification);
        
        // Add event listener for close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Automatically remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Get Notification Icon
    function getNotificationIcon(type) {
        switch(type) {
            case 'success':
                return 'fa-check-circle';
            case 'error':
                return 'fa-times-circle';
            case 'warning':
                return 'fa-exclamation-triangle';
            case 'info':
            default:
                return 'fa-info-circle';
        }
    }
    
    // ===== Initialize Dashboard =====
    function initializeDashboard() {
        // Load saved settings if available
        const savedSettings = localStorage.getItem('dashboard-settings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            applyDashboardSettings(settings);
            
            // Update settings form with saved values
            if (kpiPanelToggle) kpiPanelToggle.checked = settings.kpiPanelVisible;
            if (quickActionsPanelToggle) quickActionsPanelToggle.checked = settings.quickActionsPanelVisible;
            if (realTimeUpdatesPanelToggle) realTimeUpdatesPanelToggle.checked = settings.realTimeUpdatesPanelVisible;
            if (analyticsPanelToggle) analyticsPanelToggle.checked = settings.analyticsPanelVisible;
            
            const layoutTypeSelect = document.getElementById('layoutType');
            if (layoutTypeSelect) layoutTypeSelect.value = settings.layoutType;
            
            const refreshIntervalSelect = document.getElementById('refreshInterval');
            if (refreshIntervalSelect) refreshIntervalSelect.value = settings.refreshInterval;
        }
        
        // Load saved filters if available
        const savedFilters = localStorage.getItem('dashboard-filters');
        if (savedFilters) {
            const filters = JSON.parse(savedFilters);
            
            // Update filter selects with saved values
            if (dateRangeSelect) dateRangeSelect.value = filters.dateRange;
            if (userTypeSelect) userTypeSelect.value = filters.userType;
            if (businessSegmentSelect) businessSegmentSelect.value = filters.businessSegment;
            
            // Apply the saved filters
            applyFilters(filters);
        } else {
            // Apply default filters on initial load
            const defaultFilters = {
                dateRange: dateRangeSelect ? dateRangeSelect.value : 'week',
                userType: userTypeSelect ? userTypeSelect.value : 'all',
                businessSegment: businessSegmentSelect ? businessSegmentSelect.value : 'all'
            };
            
            applyFilters(defaultFilters);
        }
        
        // Initialize charts
        initializeCharts();
        
        // Setup auto-refresh for real-time updates
        setupAutoRefresh();
    }
    
    // Initialize Charts
    function initializeCharts() {
        // In a real application, this would initialize the actual chart libraries
        // For demonstration, we'll update the placeholders
        
        // Registration Trends Chart
        updateChart('registrationTrendsChart', { 
            dateRange: document.querySelector('.chart-date-range') ? 
                document.querySelector('.chart-date-range').value : 'month' 
        });
        
        // Revenue Growth Chart
        const activePeriodBtn = document.querySelector('.toggle-btn.active');
        updateChart('revenueGrowthChart', { 
            period: activePeriodBtn ? activePeriodBtn.dataset.period : 'month' 
        });
        
        // Business Engagement Chart
        updateChart('businessEngagementChart', { 
            businessType: businessTypeFilter ? businessTypeFilter.value : 'all' 
        });
        
        console.log('Charts initialized');
    }
    
    // Call initialize function
    initializeDashboard();
});