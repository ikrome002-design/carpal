// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Charts
    initializeCharts();
    
    // Toggle Notifications Dropdown
    const notificationsIcon = document.getElementById('notificationsIcon');
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    
    notificationsIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationsDropdown.style.display = notificationsDropdown.style.display === 'block' ? 'none' : 'block';
        
        // Hide profile dropdown if open
        if (profileDropdown.style.display === 'block') {
            profileDropdown.style.display = 'none';
        }
    });
    
    // Toggle User Profile Dropdown
    const userProfileIcon = document.getElementById('userProfileIcon');
    const profileDropdown = document.getElementById('profileDropdown');
    
    userProfileIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        
        // Hide notifications dropdown if open
        if (notificationsDropdown.style.display === 'block') {
            notificationsDropdown.style.display = 'none';
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        notificationsDropdown.style.display = 'none';
        profileDropdown.style.display = 'none';
    });
    
    // Prevent closing when clicking inside dropdowns
    notificationsDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    profileDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Check-In Vehicle Button
    const checkInVehicleBtn = document.getElementById('checkInVehicleBtn');
    const checkInModal = document.getElementById('checkInModal');
    
    checkInVehicleBtn.addEventListener('click', function() {
        checkInModal.style.display = 'flex';
        
        // Redirect after 2 seconds
        setTimeout(function() {
            window.location.href = 'C:/Users/nderu/Documents/Development/Product/CarPal/CarPal Auto Repair Shop 3.0/Vehicle Check-In/check_in.html';
        }, 2000);
    });
    
    // Create Invoice Button
    const createInvoiceBtn = document.getElementById('createInvoiceBtn');
    const invoiceModal = document.getElementById('invoiceModal');
    
    createInvoiceBtn.addEventListener('click', function() {
        invoiceModal.style.display = 'flex';
        
        // Redirect after 2 seconds
        setTimeout(function() {
            window.location.href = 'C:/Users/nderu/Documents/Development/Product/CarPal/CarPal Auto Repair Shop 3.0/Billings & Payments/billings.html';
        }, 2000);
    });
    
    // Close Modal Buttons
    const closeButtons = document.querySelectorAll('.close-btn');
    
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            checkInModal.style.display = 'none';
            invoiceModal.style.display = 'none';
        });
    });
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check if dark mode preference is saved in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.replace('fa-moon', 'fa-sun');
    }
    
    darkModeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            darkModeToggle.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        } else {
            document.body.classList.add('dark-mode');
            darkModeToggle.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        }
    });
    
    // Add event listeners for data table rows
    initializeTableRowEvents();
});

/**
 * Initialize Chart.js charts for the dashboard metrics
 */
function initializeCharts() {
    // Service Type Distribution Chart
    const serviceTypeCtx = document.getElementById('serviceTypeChart').getContext('2d');
    const serviceTypeChart = new Chart(serviceTypeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Oil Change', 'Full Service', 'Brake Repair', 'Engine Repair', 'Tire Service'],
            datasets: [{
                label: 'Service Type Distribution',
                data: [35, 25, 15, 10, 15],
                backgroundColor: [
                    '#FFD700',
                    '#4CAF50',
                    '#2196F3',
                    '#F44336',
                    '#9C27B0'
                ],
                borderColor: [
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'Service Type Distribution',
                    font: {
                        family: 'Poppins',
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });
    
    // Monthly Revenue Chart
    const monthlyRevenueCtx = document.getElementById('monthlyRevenueChart').getContext('2d');
    const monthlyRevenueChart = new Chart(monthlyRevenueCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue (KES)',
                data: [250000, 320000, 280000, 450000, 380000, 520000],
                backgroundColor: '#FFD700',
                borderColor: '#E6C200',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Revenue (Last 6 Months)',
                    font: {
                        family: 'Poppins',
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'KES. ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Customer Satisfaction Chart
    const customerSatisfactionCtx = document.getElementById('customerSatisfactionChart').getContext('2d');
    const customerSatisfactionChart = new Chart(customerSatisfactionCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Satisfaction Score',
                data: [4.2, 4.3, 4.5, 4.4, 4.7, 4.8],
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                borderColor: '#FFD700',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Customer Satisfaction (Out of 5)',
                    font: {
                        family: 'Poppins',
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    min: 3.5,
                    max: 5,
                    ticks: {
                        stepSize: 0.5
                    }
                }
            }
        }
    });
    
    // Update charts on theme change
    document.getElementById('darkModeToggle').addEventListener('click', function() {
        updateChartsTheme(serviceTypeChart, monthlyRevenueChart, customerSatisfactionChart);
    });
}

/**
 * Updates chart themes based on current dark/light mode
 */
function updateChartsTheme(serviceTypeChart, monthlyRevenueChart, customerSatisfactionChart) {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#FFFFFF' : '#000000';
    
    // Update text colors for all charts
    [serviceTypeChart, monthlyRevenueChart, customerSatisfactionChart].forEach(chart => {
        chart.options.plugins.title.color = textColor;
        chart.options.plugins.legend.labels.color = textColor;
        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.y.ticks.color = textColor;
        chart.options.scales.x.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        chart.options.scales.y.grid.color = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        chart.update();
    });
}

/**
 * Initialize event listeners for data table rows
 */
function initializeTableRowEvents() {
    // Vehicle Check-In Table
    const checkInTableRows = document.querySelectorAll('.panel:nth-child(1) .data-table tbody tr');
    
    checkInTableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (!e.target.classList.contains('action-link')) {
                const licensePlate = this.querySelector('td:first-child').textContent;
                console.log('View details for vehicle with license plate:', licensePlate);
                // Implement view details functionality
            }
        });
    });
    
    // Pending Invoices Table
    const invoiceTableRows = document.querySelectorAll('.panel:nth-child(2) .data-table tbody tr');
    
    invoiceTableRows.forEach(row => {
        const viewInvoiceLink = row.querySelector('.action-link:first-child');
        const sendReminderLink = row.querySelector('.action-link:nth-child(2)');
        
        if (viewInvoiceLink) {
            viewInvoiceLink.addEventListener('click', function(e) {
                e.preventDefault();
                const invoiceNumber = row.querySelector('td:first-child').textContent;
                console.log('View invoice:', invoiceNumber);
                // Implement view invoice functionality
            });
        }
        
        if (sendReminderLink) {
            sendReminderLink.addEventListener('click', function(e) {
                e.preventDefault();
                const invoiceNumber = row.querySelector('td:first-child').textContent;
                console.log('Send payment reminder for invoice:', invoiceNumber);
                // Implement send reminder functionality
                this.textContent = 'Reminder Sent';
                this.style.color = '#4CAF50';
                this.style.cursor = 'default';
                
                // Restore after 3 seconds
                setTimeout(() => {
                    this.textContent = 'Send Reminder';
                    this.style.color = '';
                    this.style.cursor = 'pointer';
                }, 3000);
            });
        }
    });
    
    // Recent Vehicle Check-Outs Table
    const checkOutTableRows = document.querySelectorAll('.panel:nth-child(3) .data-table tbody tr');
    
    checkOutTableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (!e.target.classList.contains('action-link')) {
                const licensePlate = this.querySelector('td:first-child').textContent;
                console.log('View history for vehicle with license plate:', licensePlate);
                // Implement view history functionality
            }
        });
    });
}

/**
 * Function to handle search functionality
 */
document.querySelector('.search-bar input').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const searchQuery = this.value.trim().toLowerCase();
        
        if (searchQuery) {
            console.log('Searching for:', searchQuery);
            // Here you would implement the actual search functionality
            // For now, we'll just display a simple alert
            alert('Searching for: ' + searchQuery);
            this.value = '';
        }
    }
});

/**
 * Real-time clock update in header (if needed)
 */
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // If you want to add a clock to the UI, uncomment and add the element to HTML
    // document.getElementById('headerClock').textContent = timeString;
    
    setTimeout(updateClock, 1000);
}

// Uncomment to enable real-time clock
// updateClock();

/**
 * Check for notifications at intervals
 */
function checkNotifications() {
    // This is a placeholder function to simulate checking for new notifications
    // In a real application, this would be an API call
    
    console.log('Checking for new notifications...');
    
    // Simulation - randomly add a notification sometimes
    if (Math.random() > 0.7) {
        const notificationCount = document.querySelector('.notification-count');
        const currentCount = parseInt(notificationCount.textContent);
        notificationCount.textContent = currentCount + 1;
        
        // Flash the notification icon
        const notificationIcon = document.querySelector('.notifications i');
        notificationIcon.style.color = '#F44336';
        setTimeout(() => {
            notificationIcon.style.color = '';
        }, 1000);
    }
    
    // Check again after a random interval between 30-60 seconds
    const nextCheck = Math.floor(Math.random() * 30000) + 30000;
    setTimeout(checkNotifications, nextCheck);
}

// Uncomment to enable periodic notification checks
// setTimeout(checkNotifications, 10000); // First check after 10 seconds