/**
 * CarPal Administrator Landing Page JavaScript
 * Implements dynamic functionality for the landing page based on the navigation map
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initDarkMode();
    initSmoothScrolling();
    initFAQSearch();
    initFAQInteractions();
    initAnimations();
    initResponsiveNavigation();
    initYearUpdate();
    initImageLoader();
});

/**
 * Dark Mode Toggle Functionality
 */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    
    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');
    
    // If dark mode was previously enabled, apply it
    if (darkMode === 'enabled') {
        enableDarkMode();
    }
    
    darkModeToggle.addEventListener('click', () => {
        // Toggle dark mode
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });
    
    function enableDarkMode() {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    }
    
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only process if it's an internal anchor link
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for header height
                        behavior: 'smooth'
                    });
                    
                    // Update URL
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Check for hash in URL on page load
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            // Wait for page to fully load before scrolling
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}

/**
 * FAQ Search Functionality
 */
function initFAQSearch() {
    const searchInput = document.querySelector('.faq-search input');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            faqItems.forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                const answer = item.querySelector('p').textContent.toLowerCase();
                
                // Show/hide FAQ items based on search term
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show message if no results found
            const visibleItems = document.querySelectorAll('.faq-item[style="display: block"]');
            const noResultsMsg = document.querySelector('.no-results-message');
            
            if (visibleItems.length === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    const message = document.createElement('p');
                    message.textContent = 'No matching FAQs found. Please try a different search term.';
                    message.classList.add('no-results-message');
                    document.querySelector('.faq-grid').after(message);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });
    }
}

/**
 * FAQ Item Interactions (Expandable)
 */
function initFAQInteractions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Initially hide answers for cleaner look
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        // Add icon to indicate expandable
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-chevron-down');
        icon.style.marginLeft = '10px';
        icon.style.transition = 'transform 0.3s ease';
        question.appendChild(icon);
        
        // Make questions clickable
        question.style.cursor = 'pointer';
        question.addEventListener('click', () => {
            // Toggle FAQ answer visibility
            const isOpen = answer.style.maxHeight !== '0px';
            
            if (isOpen) {
                answer.style.maxHeight = '0';
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

/**
 * Animations for Page Elements
 */
function initAnimations() {
    // Animate elements when they enter viewport
    const elements = document.querySelectorAll('.feature, .about-content > div, .faq-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        // Add initial state for animation
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        observer.observe(element);
    });
    
    // Add class for animation when element is visible
    document.addEventListener('scroll', () => {
        elements.forEach(element => {
            if (element.classList.contains('visible')) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, { passive: true });
}

/**
 * Responsive Navigation Menu
 */
function initResponsiveNavigation() {
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.display = 'none';
    
    header.insertBefore(menuToggle, navMenu);
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            navMenu.classList.add('mobile');
            navMenu.style.display = 'none';
            
            // Style the toggle button
            menuToggle.style.background = 'none';
            menuToggle.style.border = 'none';
            menuToggle.style.fontSize = '24px';
            menuToggle.style.cursor = 'pointer';
            menuToggle.style.color = document.body.classList.contains('dark-mode') ? '#ffffff' : '#000000';
            
            // Style the mobile menu
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#000000' : '#ffffff';
            navMenu.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            navMenu.style.padding = '1rem';
            navMenu.style.zIndex = '1000';
        } else {
            menuToggle.style.display = 'none';
            navMenu.classList.remove('mobile');
            navMenu.style.display = 'flex';
            
            // Reset mobile menu styles
            navMenu.style.flexDirection = '';
            navMenu.style.position = '';
            navMenu.style.top = '';
            navMenu.style.left = '';
            navMenu.style.width = '';
            navMenu.style.backgroundColor = '';
            navMenu.style.boxShadow = '';
            navMenu.style.padding = '';
        }
    }
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
        if (navMenu.style.display === 'none' || navMenu.style.display === '') {
            navMenu.style.display = 'flex';
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navMenu.style.display = 'none';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Initial setup and listen for window resize
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Update menu color when dark mode changes
    document.getElementById('darkModeToggle').addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                menuToggle.style.color = document.body.classList.contains('dark-mode') ? '#ffffff' : '#000000';
                navMenu.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#000000' : '#ffffff';
            }, 50);
        }
    });
}

/**
 * Update copyright year automatically
 */
function initYearUpdate() {
    const copyrightYear = document.querySelector('.copyright p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace(/\d{4}/, currentYear);
    }
}

/**
 * Graceful Image Loading with Fallbacks
 */
function initImageLoader() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Create fallback function for image loading errors
        img.onerror = function() {
            console.warn(`Failed to load image: ${img.src}`);
            
            // Try to determine what type of image it is
            if (img.alt.toLowerCase().includes('logo')) {
                // For logo, use a text-based fallback
                const logoFallback = document.createElement('div');
                logoFallback.textContent = 'CarPal';
                logoFallback.style.fontFamily = 'Poppins, sans-serif';
                logoFallback.style.fontWeight = 'bold';
                logoFallback.style.fontSize = '24px';
                logoFallback.style.color = '#FFD700';
                img.parentNode.replaceChild(logoFallback, img);
            } else {
                // For other images, use a generic placeholder
                img.src = 'https://via.placeholder.com/800x400?text=CarPal+Image';
            }
        };
        
        // Add loading attribute for better performance
        img.loading = 'lazy';
    });
}

/**
 * Check for browser compatibility and show warning if needed
 */
(function checkBrowserCompatibility() {
    // Check for basic modern features
    const isCompatible = 'IntersectionObserver' in window && 
                         'localStorage' in window && 
                         'querySelector' in document;
    
    if (!isCompatible) {
        // Create warning message
        const warningBanner = document.createElement('div');
        warningBanner.style.backgroundColor = '#FFDD00';
        warningBanner.style.color = '#000000';
        warningBanner.style.padding = '10px';
        warningBanner.style.textAlign = 'center';
        warningBanner.style.position = 'fixed';
        warningBanner.style.top = '0';
        warningBanner.style.left = '0';
        warningBanner.style.right = '0';
        warningBanner.style.zIndex = '9999';
        
        warningBanner.innerHTML = 'Your browser may not support all features of this website. Please upgrade to a modern browser for the best experience.';
        
        document.body.insertBefore(warningBanner, document.body.firstChild);
    }
})();

/**
 * Analytics tracking (implementation would connect to your analytics service)
 */
function trackPageView() {
    // This would typically send data to your analytics service
    console.log('Page view tracked:', window.location.pathname);
}

// Track page view on load
trackPageView();

// Track outbound links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Log outbound link click
        console.log('Outbound link clicked:', this.href);
    });
});