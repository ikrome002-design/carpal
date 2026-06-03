// // Initialize dashboard.js
// import Dashboard from 'dashboard.js';

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeNotifications();
    initializeUserProfile();
    initializeSearchBar();
    initializeQuickActions();
    initializeDashboardMetrics();
    initializeDarkMode();
    initializeRefreshTimer();
});

// Notifications System
const initializeNotifications = () => {
    const notificationBell = document.querySelector('.notifications');
    const notificationBadge = document.querySelector('.notification-badge');
    let notifications = [];

    // Fetch notifications from API
    const fetchNotifications = async () => {
        try {
            // Simulated API call - replace with actual endpoint
            const response = await fetch('/api/notifications');
            const data = await response.json();
            notifications = data;
            updateNotificationBadge();
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const updateNotificationBadge = () => {
        const unreadCount = notifications.filter(n => !n.read).length;
        notificationBadge.textContent = unreadCount;
        notificationBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    };

    // Poll for new notifications every 5 minutes
    setInterval(fetchNotifications, 300000);
    fetchNotifications();
};

// User Profile Popup
const initializeUserProfile = () => {
    const userProfile = document.querySelector('.user-profile');
    const profilePopup = document.getElementById('userProfilePopup');

    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        profilePopup.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!profilePopup.contains(e.target) && !userProfile.contains(e.target)) {
            profilePopup.classList.remove('active');
        }
    });

    const logoutButton = document.querySelector('.logout-button');
    logoutButton.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    });
};

// Search Functionality
const initializeSearchBar = () => {
    const searchInput = document.querySelector('.search-bar input');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            const searchTerm = e.target.value.trim();
            if (searchTerm.length >= 2) {
                try {
                    const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
                    const results = await response.json();
                    displaySearchResults(results);
                } catch (error) {
                    console.error('Search failed:', error);
                }
            }
        }, 300);
    });
};

// Quick Actions
const initializeQuickActions = () => {
    const checkInButton = document.querySelector('.primary-button');
    const createInvoiceButton = document.querySelector('.secondary-button');

    checkInButton.addEventListener('click', () => {
        window.location.href = '/vehicle-checkin';
    });

    createInvoiceButton.addEventListener('click', () => {
        window.location.href = '/create-invoice';
    });
};

// Initialize Dashboard Metrics
const initializeDashboardMetrics = () => {
    const dashboard = new Dashboard({
        container: '.metrics-panel',
        theme: {
            primary: '#FFD700',
            background: '#FFFFFF',
            text: '#2D2D2D'
        }
    });

    // Revenue Widget
    dashboard.addWidget({
        type: 'line',
        title: 'Revenue Trends',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            series: [{
                name: 'Revenue',
                data: [4500, 5200, 4800, 5800, 6200, 5900]
            }]
        },
        options: {
            height: 200,
            animations: true,
            tooltip: true
        }
    });

    // Service Time Widget
    dashboard.addWidget({
        type: 'bar',
        title: 'Average Service Times',
        data: {
            labels: ['Oil Change', 'Brake Service', 'Tire Rotation', 'Engine Tune-up'],
            series: [{
                name: 'Hours',
                data: [1, 2.5, 0.75, 3.5]
            }]
        },
        options: {
            height: 200,
            stacked: false,
            tooltip: true
        }
    });

    // Check-ins vs Completions Widget
    dashboard.addWidget({
        type: 'area',
        title: 'Daily Service Flow',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
                {
                    name: 'Check-ins',
                    data: [8, 12, 15, 10, 14, 6, 4]
                },
                {
                    name: 'Completions',
                    data: [6, 10, 13, 8, 12, 5, 3]
                }
            ]
        },
        options: {
            height: 200,
            stacked: false,
            tooltip: true
        }
    });

    // Performance Gauges
    dashboard.addWidget({
        type: 'gauge',
        title: 'Shop Performance',
        data: {
            series: [75] // Percentage of target metrics met
        },
        options: {
            height: 150,
            min: 0,
            max: 100,
            thresholds: [
                { value: 30, color: '#F44336' },
                { value: 70, color: '#FFD700' },
                { value: 100, color: '#4CAF50' }
            ]
        }
    });

    // Update metrics data
    const updateMetricsData = async () => {
        try {
            const response = await fetch('/api/metrics');
            const data = await response.json();
            
            // Update dashboard widgets with new data
            dashboard.updateData(data);
            
            // Update metric cards
            updateMetricCards(data);
            
        } catch (error) {
            console.error('Error updating metrics:', error);
            handleError(error, 'metrics update');
        }
    };

    // Update metric cards with new data
    const updateMetricCards = (data) => {
        document.querySelector('[data-metric="total-checkins"] .metric-value').textContent = data.totalCheckins;
        document.querySelector('[data-metric="completed-services"] .metric-value').textContent = data.completedServices;
        document.querySelector('[data-metric="pending-assessments"] .metric-value').textContent = data.pendingAssessments;
        document.querySelector('[data-metric="average-service-time"] .metric-value').textContent = `${data.averageServiceTime}h`;
    };

    // Initial data load
    updateMetricsData();
    
    // Set up auto-refresh
    setInterval(updateMetricsData, 300000); // Refresh every 5 minutes
    
    return dashboard;
};

// Dark Mode Toggle
const initializeDarkMode = () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const dashboard = window.dashboardInstance;
    
    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        if (dashboard) {
            dashboard.setTheme({
                background: '#2D2D2D',
                text: '#FFFFFF',
                primary: '#FFD700'
            });
        }
    };
    
    const disableDarkMode = () => {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        if (dashboard) {
            dashboard.setTheme({
                background: '#FFFFFF',
                text: '#2D2D2D',
                primary: '#FFD700'
            });
        }
    };
    
    if (localStorage.getItem('darkMode') === 'enabled' || prefersDark.matches) {
        enableDarkMode();
    }
    
    darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
};

// Auto-refresh Timer
const initializeRefreshTimer = () => {
    setInterval(() => {
        const dashboard = window.dashboardInstance;
        if (dashboard) {
            dashboard.refresh();
        }
        updateMetricsData();
        initializeNotifications();
    }, 300000);
};

// Error Handler
const handleError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    showErrorNotification(`An error occurred in ${context}. Please try again.`);
};

// Show Error Notification
const showErrorNotification = (message) => {
    const notification = document.createElement('div');
    notification.classList.add('error-notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
};

// Export functions for testing
export {
    initializeNotifications,
    initializeUserProfile,
    initializeSearchBar,
    initializeQuickActions,
    initializeDashboardMetrics,
    initializeDarkMode,
    handleError
};