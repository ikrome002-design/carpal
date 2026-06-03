// technicians.js - JavaScript for the CarPal by Citrus Technicians functionality page

document.addEventListener('DOMContentLoaded', function() {
    // Sample data for technicians
    const techniciansData = [
        {
            id: 1,
            name: "John Smith",
            title: "Master Technician",
            specialties: ["Engine Specialist", "Diagnostics"],
            rating: 4.9,
            experience: "Over 15 years of experience specializing in engine repair and diagnostics. ASE Master Certified with expertise in European vehicles.",
            completedJobs: 876,
            satisfactionRate: "97%",
            avgCompletionTime: "3.5h",
            skills: ["Engine Repair", "Diagnostics", "European Vehicles", "Electrical Systems", "Performance Tuning"]
        },
        {
            id: 2,
            name: "Sarah Davis",
            title: "Senior Technician",
            specialties: ["Electrical Systems", "Hybrid Vehicles"],
            rating: 5.0,
            experience: "12 years experience with advanced certification in hybrid and electric vehicle systems. Specializes in complex electrical diagnostics and repairs.",
            completedJobs: 643,
            satisfactionRate: "99%",
            avgCompletionTime: "4.2h",
            skills: ["Hybrid Systems", "Electric Vehicles", "Electrical Diagnostics", "Computer Systems", "Battery Technology"]
        },
        {
            id: 3,
            name: "Michael Chen",
            title: "Transmission Specialist",
            specialties: ["Transmission", "Drivetrain"],
            rating: 4.2,
            experience: "8 years specializing in manual and automatic transmission repair and rebuilding. Expert in drivetrain diagnostics and repairs.",
            completedJobs: 421,
            satisfactionRate: "91%",
            avgCompletionTime: "5.8h",
            skills: ["Automatic Transmissions", "Manual Transmissions", "Drivetrain", "Clutch Systems", "Differential Repair"]
        },
        {
            id: 4,
            name: "Maria Rodriguez",
            title: "Brake & Suspension Expert",
            specialties: ["Brakes", "Suspension"],
            rating: 4.7,
            experience: "10 years of experience in brake system repairs and suspension work. Certified in high-performance suspension tuning.",
            completedJobs: 562,
            satisfactionRate: "95%",
            avgCompletionTime: "2.7h",
            skills: ["Brake Systems", "Suspension", "Alignment", "Performance Upgrades", "Steering Systems"]
        },
        {
            id: 5,
            name: "David Johnson",
            title: "Maintenance Technician",
            specialties: ["Preventive Maintenance", "Oil Services"],
            rating: 4.8,
            experience: "5 years experience in fast-paced maintenance department. Specializes in efficient preventive maintenance procedures.",
            completedJobs: 935,
            satisfactionRate: "96%",
            avgCompletionTime: "1.2h",
            skills: ["Oil Changes", "Filter Replacement", "Multi-point Inspections", "Fluid Services", "Light Repairs"]
        },
        {
            id: 6,
            name: "Ahmed Hassan",
            title: "Diagnostics Specialist",
            specialties: ["Computer Diagnostics", "Engine Performance"],
            rating: 4.6,
            experience: "7 years specializing in computer diagnostics and troubleshooting. Expert in using manufacturer-specific diagnostic equipment.",
            completedJobs: 489,
            satisfactionRate: "93%",
            avgCompletionTime: "3.1h",
            skills: ["Computer Diagnostics", "OBD Systems", "Engine Performance", "Drivability Issues", "Check Engine Light"]
        }
    ];

    // Initialize all features when the page loads
    initTechniciansPage();

    /**
     * Main function to initialize all features on the technicians page
     */
    function initTechniciansPage() {
        // Populate technicians list
        populateTechniciansList();
        
        // Initialize dropdown menus
        initDropdowns();
        
        // Initialize modal functionality
        initModals();
        
        // Initialize filter functionality
        initFilters();
        
        // Initialize dark mode toggle
        initDarkModeToggle();
        
        // Initialize dynamic form fields in modals
        initFormFields();
        
        // Populate select elements for technicians
        populateTechnicianSelects();
    }

    /**
     * Generate and display technician cards in the technicians list
     */
    function populateTechniciansList() {
        const techListContainer = document.querySelector('.technicians-list');
        if (!techListContainer) return;
        
        // Clear existing content
        techListContainer.innerHTML = '';
        
        // Generate cards for each technician
        techniciansData.forEach(tech => {
            const techCard = document.createElement('div');
            techCard.className = 'tech-card';
            techCard.dataset.techId = tech.id;
            
            // Generate specialties HTML
            const specialtiesHtml = tech.specialties.map(specialty => 
                `<span>${specialty}</span>`
            ).join('');
            
            // Generate stars for rating
            const starsHtml = generateStarsHtml(tech.rating);
            
            techCard.innerHTML = `
                <img src="C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Icons/icons8-profile-picture-64.png" alt="${tech.name}">
                <h3>${tech.name}</h3>
                <p class="tech-title">${tech.title}</p>
                <div class="tech-specialties">
                    ${specialtiesHtml}
                </div>
                <div class="tech-rating">
                    ${starsHtml}
                    <span>${tech.rating.toFixed(1)}</span>
                </div>
                <button class="view-profile-btn" data-tech-id="${tech.id}">View Profile</button>
            `;
            
            techListContainer.appendChild(techCard);
        });
        
        // Add event listeners to the view profile buttons
        const viewProfileButtons = document.querySelectorAll('.view-profile-btn');
        viewProfileButtons.forEach(button => {
            button.addEventListener('click', function() {
                const techId = this.dataset.techId;
                openTechnicianProfile(techId);
            });
        });
    }

    /**
     * Generate HTML for star ratings
     * @param {number} rating - The rating value (0-5)
     * @returns {string} HTML string of star icons
     */
    function generateStarsHtml(rating) {
        let starsHtml = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        // Add full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        
        // Add half star if needed
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Add empty stars
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        return starsHtml;
    }

    /**
     * Initialize dropdown menus for notifications and profile
     */
    function initDropdowns() {
        // Notifications dropdown
        const notificationsIcon = document.querySelector('.notifications');
        const notificationsDropdown = document.querySelector('.notifications-dropdown');
        
        if (notificationsIcon && notificationsDropdown) {
            notificationsIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                notificationsDropdown.style.display = notificationsDropdown.style.display === 'block' ? 'none' : 'block';
                
                // Hide profile dropdown if open
                if (profileDropdown) {
                    profileDropdown.style.display = 'none';
                }
            });
        }
        
        // Profile dropdown
        const profileIcon = document.querySelector('.user-profile');
        const profileDropdown = document.querySelector('.profile-dropdown');
        
        if (profileIcon && profileDropdown) {
            profileIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
                
                // Hide notifications dropdown if open
                if (notificationsDropdown) {
                    notificationsDropdown.style.display = 'none';
                }
            });
        }
        
        // Close dropdowns when clicking elsewhere on the page
        document.addEventListener('click', function() {
            if (notificationsDropdown) {
                notificationsDropdown.style.display = 'none';
            }
            if (profileDropdown) {
                profileDropdown.style.display = 'none';
            }
        });
    }

    /**
     * Initialize modal dialogs
     */
    function initModals() {
        // Get all modals
        const modals = document.querySelectorAll('.modal');
        
        // Get all elements that can open a modal
        const modalTriggers = {
            '.view-profile-btn': '#technician-profile-modal',
            '#assign-jobs-btn': '#job-assignment-modal',
            '#schedule-management-btn': '#schedule-modal',
            '#add-technician-btn': '#add-technician-modal',
            '.view-details': '#technician-profile-modal',
            '.update-status': '#progress-update-modal',
            '#contact-technician-btn': '#messaging-modal'
        };
        
        // Set up modal triggers
        for (const [triggerSelector, modalSelector] of Object.entries(modalTriggers)) {
            const triggers = document.querySelectorAll(triggerSelector);
            const modal = document.querySelector(modalSelector);
            
            if (triggers.length && modal) {
                triggers.forEach(trigger => {
                    trigger.addEventListener('click', function(e) {
                        e.preventDefault();
                        // Additional data handling for specific modals
                        if (modalSelector === '#technician-profile-modal' && this.dataset.techId) {
                            openTechnicianProfile(this.dataset.techId);
                        } else if (modalSelector === '#progress-update-modal') {
                            // Get service info from the row
                            const row = this.closest('tr');
                            const service = row.cells[2].textContent;
                            document.getElementById('service-info').value = service;
                        } else if (modalSelector === '#messaging-modal' && window.currentTechName) {
                            // Set the recipient field
                            document.getElementById('message-recipient').value = window.currentTechName;
                        } else {
                            modal.style.display = 'flex';
                        }
                    });
                });
            }
        }
        
        // Close modals when clicking the close button
        const closeButtons = document.querySelectorAll('.close-btn');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
        
        // Close modals when clicking outside the modal content
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                }
            });
        });
    }

    /**
     * Open technician profile modal with specific technician data
     * @param {string} techId - The ID of the technician to display
     */
    function openTechnicianProfile(techId) {
        const modal = document.getElementById('technician-profile-modal');
        const tech = techniciansData.find(t => t.id == techId);
        
        if (modal && tech) {
            // Store current technician name for use in other modals
            window.currentTechName = tech.name;
            
            // Update modal content with technician data
            document.getElementById('modal-tech-name').textContent = tech.name;
            document.getElementById('modal-tech-title').textContent = tech.title;
            document.getElementById('modal-tech-experience').textContent = tech.experience;
            document.getElementById('modal-tech-completed').textContent = tech.completedJobs;
            document.getElementById('modal-tech-satisfaction').textContent = tech.satisfactionRate;
            document.getElementById('modal-tech-time').textContent = tech.avgCompletionTime;
            
            // Generate skills HTML
            const skillsContainer = document.getElementById('modal-tech-skills');
            skillsContainer.innerHTML = '';
            tech.skills.forEach(skill => {
                const skillSpan = document.createElement('span');
                skillSpan.textContent = skill;
                skillsContainer.appendChild(skillSpan);
            });
            
            // Display the modal
            modal.style.display = 'flex';
        }
    }

    /**
     * Initialize filter functionality
     */
    function initFilters() {
        const applyFiltersBtn = document.getElementById('apply-filters');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', function() {
                const skillFilter = document.getElementById('skill-filter').value;
                const departmentFilter = document.getElementById('department-filter').value;
                
                // Apply filters (in a real app, this would filter the actual data)
                console.log(`Filtering by skill: ${skillFilter}, department: ${departmentFilter}`);
                
                // For demo purposes, just show an alert
                alert(`Filters Applied!\nSkill: ${skillFilter || 'All'}\nDepartment: ${departmentFilter || 'All'}`);
            });
        }
    }

    /**
     * Initialize dark mode toggle
     */
    function initDarkModeToggle() {
        const darkModeToggle = document.querySelector('.theme-toggle');
        if (darkModeToggle) {
            // Check if dark mode is already enabled in localStorage
            const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
            }
            
            darkModeToggle.addEventListener('click', function() {
                // Toggle dark mode class on body
                document.body.classList.toggle('dark-mode');
                
                // Update icon
                const icon = this.querySelector('i');
                if (document.body.classList.contains('dark-mode')) {
                    icon.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    icon.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('darkMode', 'disabled');
                }
            });
        }
    }

    /**
     * Initialize form field interactions in modals
     */
    function initFormFields() {
        // Initialize form submissions
        const forms = {
            'job-assignment-form': handleJobAssignment,
            'add-technician-form': handleAddTechnician,
            'progress-update-form': handleProgressUpdate,
            'messaging-form': handleMessaging
        };
        
        for (const [formId, handler] of Object.entries(forms)) {
            const form = document.getElementById(formId);
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    handler(this);
                });
            }
        }
    }

    /**
     * Populate select elements with technician data
     */
    function populateTechnicianSelects() {
        const technicianSelects = [
            document.getElementById('select-technician'),
            document.getElementById('schedule-technician')
        ];
        
        technicianSelects.forEach(select => {
            if (select) {
                // Clear existing options except the first one
                while (select.options.length > 1) {
                    select.remove(1);
                }
                
                // Add technician options
                techniciansData.forEach(tech => {
                    const option = document.createElement('option');
                    option.value = tech.id;
                    option.textContent = tech.name;
                    select.appendChild(option);
                });
            }
        });
    }

    /**
     * Handle job assignment form submission
     * @param {HTMLFormElement} form - The form element
     */
    function handleJobAssignment(form) {
        const jobId = form.querySelector('#select-job').value;
        const technicianId = form.querySelector('#select-technician').value;
        const priority = form.querySelector('#priority-level').value;
        const deadline = form.querySelector('#deadline').value;
        const notes = form.querySelector('#assignment-notes').value;
        
        // In a real app, this would send data to the server
        console.log('Job assigned:', {
            jobId,
            technicianId,
            priority,
            deadline,
            notes
        });
        
        // Show success message
        alert('Job successfully assigned to technician!');
        
        // Close the modal
        document.querySelector('#job-assignment-modal').style.display = 'none';
        
        // Reset the form
        form.reset();
    }

    /**
     * Handle add technician form submission
     * @param {HTMLFormElement} form - The form element
     */
    function handleAddTechnician(form) {
        // Get form values
        const firstName = form.querySelector('#tech-first-name').value;
        const lastName = form.querySelector('#tech-last-name').value;
        const jobTitle = form.querySelector('#tech-job-title').value;
        const email = form.querySelector('#tech-email').value;
        const phone = form.querySelector('#tech-phone').value;
        const department = form.querySelector('#tech-department').value;
        const experience = form.querySelector('#tech-experience').value;
        const accessLevel = form.querySelector('#tech-access-level').value;
        
        // Get selected skills
        const skillCheckboxes = form.querySelectorAll('input[name="skills"]:checked');
        const skills = Array.from(skillCheckboxes).map(cb => cb.value);
        
        // In a real app, this would send data to the server
        console.log('New technician added:', {
            name: `${firstName} ${lastName}`,
            jobTitle,
            email,
            phone,
            department,
            skills,
            experience,
            accessLevel
        });
        
        // Show success message
        alert(`Technician ${firstName} ${lastName} has been added successfully!`);
        
        // Close the modal
        document.querySelector('#add-technician-modal').style.display = 'none';
        
        // Reset the form
        form.reset();
    }

    /**
     * Handle progress update form submission
     * @param {HTMLFormElement} form - The form element
     */
    function handleProgressUpdate(form) {
        const service = form.querySelector('#service-info').value;
        const status = form.querySelector('#status-update').value;
        const notes = form.querySelector('#progress-notes').value;
        
        // In a real app, this would send data to the server
        console.log('Progress updated:', {
            service,
            status,
            notes
        });
        
        // Show success message
        alert('Service progress has been updated successfully!');
        
        // Close the modal
        document.querySelector('#progress-update-modal').style.display = 'none';
        
        // Reset the form
        form.reset();
    }

    /**
     * Handle messaging form submission
     * @param {HTMLFormElement} form - The form element
     */
    function handleMessaging(form) {
        const recipient = form.querySelector('#message-recipient').value;
        const subject = form.querySelector('#message-subject').value;
        const message = form.querySelector('#message-content').value;
        
        // In a real app, this would send data to the server
        console.log('Message sent:', {
            recipient,
            subject,
            message
        });
        
        // Show success message
        alert(`Message sent to ${recipient} successfully!`);
        
        // Close the modal
        document.querySelector('#messaging-modal').style.display = 'none';
        
        // Reset the form
        form.reset();
    }
});