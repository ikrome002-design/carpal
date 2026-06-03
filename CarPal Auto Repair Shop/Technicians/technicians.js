// Sample technician data
let technicians = [
    {
        id: 1,
        name: "John Smith",
        specialization: "Engine Repair",
        bio: "15 years of experience in engine diagnostics and repair",
        certifications: ["ASE Master Technician", "BMW Certified"],
        rating: 4.8,
        availability: "available",
        image: "/api/placeholder/150/150",
        serviceCount: 0,
        reviews: []
    },
    // Add more sample technicians here
];

// DOM Elements
const techGrid = document.getElementById('techniciansGrid');
const searchInput = document.getElementById('techSearch');
const specialtyFilter = document.getElementById('specialtyFilter');
const availabilityFilter = document.getElementById('availabilityFilter');
const sortOrder = document.getElementById('sortOrder');
const addTechBtn = document.getElementById('addTechnicianBtn');
const userProfile = document.getElementById('userProfile');
const darkModeToggle = document.getElementById('darkModeToggle');

// Modal Elements
const userProfileModal = document.getElementById('userProfileModal');
const technicianModal = document.getElementById('technicianModal');
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const notificationsModal = document.getElementById('notificationsModal');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderTechnicians();
    initializeEventListeners();
    loadDarkModePreference();
});

// Event Listeners
function initializeEventListeners() {
    // Search and Filter Events
    searchInput.addEventListener('input', filterTechnicians);
    specialtyFilter.addEventListener('change', filterTechnicians);
    availabilityFilter.addEventListener('change', filterTechnicians);
    sortOrder.addEventListener('change', filterTechnicians);

    // Modal Events
    addTechBtn.addEventListener('click', () => showModal(technicianModal));
    userProfile.addEventListener('click', () => showModal(userProfileModal));
    
    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Close Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            hideModal(modal);
        });
    });

    // Form Submission
    document.getElementById('technicianForm').addEventListener('submit', handleTechnicianSubmit);
}

// Render Functions
function renderTechnicians(filteredTechs = technicians) {
    techGrid.innerHTML = '';
    filteredTechs.forEach(tech => {
        const card = createTechnicianCard(tech);
        techGrid.appendChild(card);
    });
}

function createTechnicianCard(tech) {
    const card = document.createElement('div');
    card.className = 'tech-card fade-in';
    card.innerHTML = `
        <img src="${tech.image}" alt="${tech.name}" class="tech-photo">
        <h3>${tech.name}</h3>
        <p class="specialization">${tech.specialization}</p>
        <div class="ratings">
            ${generateStarRating(tech.rating)}
            <span>(${tech.rating})</span>
        </div>
        <div class="tech-status status-${tech.availability}">${
            tech.availability.charAt(0).toUpperCase() + tech.availability.slice(1)
        }</div>
        <div class="action-buttons">
            <button class="edit-btn" onclick="editTechnician(${tech.id})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-btn" onclick="confirmDelete(${tech.id})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    return card;
}

// Filter and Sort Functions
function filterTechnicians() {
    let filtered = technicians;

    // Search Filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(tech => 
            tech.name.toLowerCase().includes(searchTerm) ||
            tech.specialization.toLowerCase().includes(searchTerm)
        );
    }

    // Specialty Filter
    const specialty = specialtyFilter.value;
    if (specialty) {
        filtered = filtered.filter(tech => 
            tech.specialization.toLowerCase() === specialty.toLowerCase()
        );
    }

    // Availability Filter
    const availability = availabilityFilter.value;
    if (availability) {
        filtered = filtered.filter(tech => tech.availability === availability);
    }

    // Sort
    const sortBy = sortOrder.value;
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'experience':
                return b.experience - a.experience;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    renderTechnicians(filtered);
}

// Modal Functions
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Sample technician data
let technicians = [
    {
        id: 1,
        name: "John Smith",
        specialization: "Engine Repair",
        bio: "15 years of experience in engine diagnostics and repair",
        certifications: ["ASE Master Technician", "BMW Certified"],
        rating: 4.8,
        availability: "available",
        image: "/api/placeholder/150/150",
        serviceCount: 0,
        reviews: []
    },
    {
        id: 2,
        name: "Sarah Johnson",
        specialization: "Electrical Systems",
        bio: "Specialist in automotive electrical systems and diagnostics",
        certifications: ["ASE Certified", "Electric Vehicle Specialist"],
        rating: 4.9,
        availability: "busy",
        image: "/api/placeholder/150/150",
        serviceCount: 3,
        reviews: []
    }
];

// DOM Elements
const techGrid = document.getElementById('techniciansGrid');
const searchInput = document.getElementById('techSearch');
const specialtyFilter = document.getElementById('specialtyFilter');
const availabilityFilter = document.getElementById('availabilityFilter');
const sortOrder = document.getElementById('sortOrder');
const addTechBtn = document.getElementById('addTechnicianBtn');
const userProfile = document.getElementById('userProfile');
const darkModeToggle = document.getElementById('darkModeToggle');
const technicianForm = document.getElementById('technicianForm');

// Modal Elements
const userProfileModal = document.getElementById('userProfileModal');
const technicianModal = document.getElementById('technicianModal');
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const notificationsModal = document.getElementById('notificationsModal');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderTechnicians();
    initializeEventListeners();
    loadDarkModePreference();
    initializeNotifications();
});

// Event Listeners
function initializeEventListeners() {
    // Search and Filter Events
    searchInput.addEventListener('input', filterTechnicians);
    specialtyFilter.addEventListener('change', filterTechnicians);
    availabilityFilter.addEventListener('change', filterTechnicians);
    sortOrder.addEventListener('change', filterTechnicians);

    // Modal Events
    addTechBtn.addEventListener('click', () => {
        resetTechnicianForm();
        showModal(technicianModal);
    });
    userProfile.addEventListener('click', () => showModal(userProfileModal));
    
    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Close Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            hideModal(modal);
        });
    });

    // Form Submission
    technicianForm.addEventListener('submit', handleTechnicianSubmit);

    // Window click to close modals
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });

    // Mobile menu toggle
    document.querySelector('.menu-toggle')?.addEventListener('click', toggleMobileMenu);
}

// Render Functions
function renderTechnicians(filteredTechs = technicians) {
    techGrid.innerHTML = '';
    filteredTechs.forEach(tech => {
        const card = createTechnicianCard(tech);
        techGrid.appendChild(card);
    });
}

function createTechnicianCard(tech) {
    const card = document.createElement('div');
    card.className = 'tech-card fade-in';
    card.innerHTML = `
        <img src="${tech.image}" alt="${tech.name}" class="tech-photo">
        <h3>${tech.name}</h3>
        <p class="specialization">${tech.specialization}</p>
        <div class="ratings">
            ${generateStarRating(tech.rating)}
            <span>(${tech.rating})</span>
        </div>
        <div class="tech-status status-${tech.availability}">${
            tech.availability.charAt(0).toUpperCase() + tech.availability.slice(1)
        }</div>
        <div class="certifications">
            ${tech.certifications.map(cert => `<span class="certification-badge">${cert}</span>`).join('')}
        </div>
        <div class="action-buttons">
            <button class="edit-btn" onclick="editTechnician(${tech.id})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-btn" onclick="confirmDelete(${tech.id})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    return card;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return `
        ${Array(fullStars).fill('<i class="fas fa-star"></i>').join('')}
        ${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${Array(emptyStars).fill('<i class="far fa-star"></i>').join('')}
    `;
}

// Filter and Sort Functions
function filterTechnicians() {
    let filtered = [...technicians];

    // Search Filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(tech => 
            tech.name.toLowerCase().includes(searchTerm) ||
            tech.specialization.toLowerCase().includes(searchTerm)
        );
    }

    // Specialty Filter
    const specialty = specialtyFilter.value;
    if (specialty) {
        filtered = filtered.filter(tech => 
            tech.specialization.toLowerCase() === specialty.toLowerCase()
        );
    }

    // Availability Filter
    const availability = availabilityFilter.value;
    if (availability) {
        filtered = filtered.filter(tech => tech.availability === availability);
    }

    // Sort
    const sortBy = sortOrder.value;
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'rating':
                return b.rating - a.rating;
            case 'experience':
                return b.experience - a.experience;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    renderTechnicians(filtered);
}

// Form Handling
function handleTechnicianSubmit(e) {
    e.preventDefault();
    const formData = new FormData(technicianForm);
    const techData = {
        id: technicians.length + 1,
        name: formData.get('techName'),
        specialization: formData.get('techSpecialization'),
        bio: formData.get('techBio'),
        certifications: formData.get('techCertifications').split(',').map(cert => cert.trim()),
        rating: 0,
        availability: formData.get('techAvailability'),
        image: "/api/placeholder/150/150",
        serviceCount: 0,
        reviews: []
    };

    technicians.push(techData);
    renderTechnicians();
    hideModal(technicianModal);
    showNotification('Technician added successfully!');
}

// Modal Functions
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function editTechnician(techId) {
    const tech = technicians.find(t => t.id === techId);
    if (!tech) return;

    // Populate form
    document.getElementById('techName').value = tech.name;
    document.getElementById('techSpecialization').value = tech.specialization;
    document.getElementById('techBio').value = tech.bio;
    document.getElementById('techCertifications').value = tech.certifications.join(', ');
    document.getElementById('techAvailability').value = tech.availability;

    showModal(technicianModal);
}

function confirmDelete(techId) {
    const confirmBtn = document.getElementById('confirmDelete');
    confirmBtn.onclick = () => deleteTechnician(techId);
    showModal(deleteConfirmModal);
}

function deleteTechnician(techId) {
    technicians = technicians.filter(tech => tech.id !== techId);
    renderTechnicians();
    hideModal(deleteConfirmModal);
    showNotification('Technician deleted successfully!');
}

// Dark Mode Functions
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeIcon();
}

function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('i');
    const isDarkMode = document.body.classList.contains('dark-mode');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// Notification Functions
function initializeNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    // Sample notifications
    const notifications = [
        { message: 'New service request assigned', time: '5 minutes ago' },
        { message: 'John Smith completed a repair', time: '1 hour ago' }
    ];
    
    notificationsList.innerHTML = notifications.map(notif => `
        <div class="notification-item">
            <p>${notif.message}</p>
            <span class="notification-time">${notif.time}</span>
        </div>
    `).join('');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-toast fade-in';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    document.body.classList.toggle('nav-open');
}

// Initialize the page with some sample data
if (technicians.length === 0) {
    // Add sample technicians if none exist
    renderTechnicians();
}

// Set Chart.js defaults
Chart.defaults.font.family = "'Open Sans', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.legend.display = false;

// Initialize Completion Rate Chart
const completionRateChart = new Chart(
    document.getElementById('completionRateChart'),
    {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Completion Rate',
                    data: [92, 88, 95, 98],
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Target',
                    data: [90, 90, 90, 90],
                    borderColor: '#2D2D2D',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointStyle: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100,
                    ticks: {
                        callback: value => value + '%'
                    }
                }
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: context => {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    }
);

// Initialize Customer Satisfaction Chart
const satisfactionChart = new Chart(
    document.getElementById('satisfactionChart'),
    {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Satisfaction Score',
                    data: [4.6, 4.7, 4.8, 4.9],
                    backgroundColor: '#FFD700',
                    borderRadius: 5
                },
                {
                    label: 'Industry Average',
                    data: [4.2, 4.2, 4.2, 4.2],
                    backgroundColor: '#2D2D2D',
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3.5,
                    max: 5,
                    ticks: {
                        stepSize: 0.5
                    }
                }
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    }
);

// Time Range Filter Event Listener
document.getElementById('timeRange').addEventListener('change', function(e) {
    const timeRange = e.target.value;
    updateCharts(timeRange);
});

// Function to update charts based on time range
function updateCharts(timeRange) {
    // Sample data for different time ranges
    const data = {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            completion: [91, 87, 94, 96, 93, 97, 95],
            satisfaction: [4.5, 4.6, 4.7, 4.8, 4.7, 4.9, 4.8]
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            completion: [92, 88, 95, 98],
            satisfaction: [4.6, 4.7, 4.8, 4.9]
        },
        quarter: {
            labels: ['Month 1', 'Month 2', 'Month 3'],
            completion: [90, 93, 96],
            satisfaction: [4.5, 4.7, 4.8]
        },
        year: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            completion: [89

                // Set Chart.js defaults
Chart.defaults.font.family = "'Open Sans', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.legend.display = false;

// Initialize Completion Rate Chart
const completionRateChart = new Chart(
    document.getElementById('completionRateChart'),
    {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Completion Rate',
                    data: [92, 88, 95, 98],
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Target',
                    data: [90, 90, 90, 90],
                    borderColor: '#2D2D2D',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointStyle: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 80,
                    max: 100,
                    ticks: {
                        callback: value => value + '%'
                    }
                }
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: context => {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    }
);

// Initialize Customer Satisfaction Chart
const satisfactionChart = new Chart(
    document.getElementById('satisfactionChart'),
    {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Satisfaction Score',
                    data: [4.6, 4.7, 4.8, 4.9],
                    backgroundColor: '#FFD700',
                    borderRadius: 5
                },
                {
                    label: 'Industry Average',
                    data: [4.2, 4.2, 4.2, 4.2],
                    backgroundColor: '#2D2D2D',
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3.5,
                    max: 5,
                    ticks: {
                        stepSize: 0.5
                    }
                }
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    }
);

// Time Range Filter Event Listener
document.getElementById('timeRange').addEventListener('change', function(e) {
    const timeRange = e.target.value;
    updateCharts(timeRange);
});

// Function to update charts based on time range
function updateCharts(timeRange) {
    // Sample data for different time ranges
    const data = {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            completion: [91, 87, 94, 96, 93, 97, 95],
            satisfaction: [4.5, 4.6, 4.7, 4.8, 4.7, 4.9, 4.8]
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            completion: [92, 88, 95, 98],
            satisfaction: [4.6, 4.7, 4.8, 4.9]
        },
        quarter: {
            labels: ['Month 1', 'Month 2', 'Month 3'],
            completion: [90, 93, 96],
            satisfaction: [4.5, 4.7, 4.8]
        },
        year: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            completion: [89, 92, 94, 97],
            satisfaction: [4.4, 4.6, 4.7, 4.9]
        }
    };

    // Update Completion Rate Chart
    completionRateChart.data.labels = data[timeRange].labels;
    completionRateChart.data.datasets[0].data = data[timeRange].completion;
    completionRateChart.data.datasets[1].data = new Array(data[timeRange].labels.length).fill(90); // Target line
    completionRateChart.update();

    // Update Satisfaction Chart
    satisfactionChart.data.labels = data[timeRange].labels;
    satisfactionChart.data.datasets[0].data = data[timeRange].satisfaction;
    satisfactionChart.data.datasets[1].data = new Array(data[timeRange].labels.length).fill(4.2); // Industry average
    satisfactionChart.update();

    // Update summary statistics
    updateSummaryStats(timeRange);
}

// Function to update summary statistics
function updateSummaryStats(timeRange) {
    const summaryStats = {
        week: {
            services: { value: 58, change: '+8.2%' },
            time: { value: '2.2', change: '-0.2' },
            rating: { value: '4.7', change: '+0.1' }
        },
        month: {
            services: { value: 248, change: '+12.5%' },
            time: { value: '2.4', change: '+0.3' },
            rating: { value: '4.8', change: '+0.2' }
        },
        quarter: {
            services: { value: 742, change: '+15.8%' },
            time: { value: '2.3', change: '-0.1' },
            rating: { value: '4.7', change: '+0.3' }
        },
        year: {
            services: { value: 2964, change: '+22.4%' },
            time: { value: '2.5', change: '+0.2' },
            rating: { value: '4.6', change: '+0.4' }
        }
    };

    const stats = summaryStats[timeRange];
    
    // Update services completed
    document.querySelector('.summary-card:nth-child(1) .summary-value').textContent = stats.services.value;
    document.querySelector('.summary-card:nth-child(1) .summary-change').textContent = stats.services.change + ' vs previous period';
    
    // Update average completion time
    document.querySelector('.summary-card:nth-child(2) .summary-value').textContent = stats.time.value + ' hours';
    document.querySelector('.summary-card:nth-child(2) .summary-change').textContent = stats.time.change + ' hrs vs previous period';
    
    // Update average rating
    document.querySelector('.summary-card:nth-child(3) .summary-value').textContent = stats.rating.value + '/5.0';
    document.querySelector('.summary-card:nth-child(3) .summary-change').textContent = stats.rating.change + ' vs previous period';
}

// Initialize with monthly data
document.addEventListener('DOMContentLoaded', () => {
    updateCharts('month');
});