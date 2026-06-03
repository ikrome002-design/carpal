/**
 * CarPal FAQ Page JavaScript
 * Implements dynamic functionality for the FAQ page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initDarkMode();
    initFAQInteraction();
    initSearchFunctionality();
    initCategoryFilters();
    initMobileMenu();
    initBackToTop();
    initAccessibility();
    initCopyright();
    initAnalytics();
    initExternalLinks();
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

    // Check for system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial mode based on system preference if no saved preference
    if (darkMode === null && prefersDarkMode.matches) {
        enableDarkMode();
    }
    
    // Listen for changes in system preference
    prefersDarkMode.addEventListener('change', (event) => {
        // Only auto-switch if user hasn't manually set a preference
        if (localStorage.getItem('darkMode') === null) {
            if (event.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });
}

/**
 * FAQ Item Interaction
 */
function initFAQInteraction() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h2');
        
        // Make questions clickable and add ARIA attributes
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('tabindex', '0');
        
        // Add click event to toggle visibility
        question.addEventListener('click', () => toggleFAQ(item));
        
        // Add keyboard support
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(item);
            }
        });
    });
    
    function toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        const question = item.querySelector('h2');
        
        // Close all items first
        document.querySelectorAll('.faq-item.active').forEach(activeItem => {
            if (activeItem !== item) {
                activeItem.classList.remove('active');
                activeItem.querySelector('h2').setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
            question.setAttribute('aria-expanded', 'false');
        } else {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    }
    
    // Open the first FAQ item by default
    if (faqItems.length > 0) {
        toggleFAQ(faqItems[0]);
    }
}

/**
 * Search Functionality
 */
function initSearchFunctionality() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search for answers...';
    searchInput.setAttribute('aria-label', 'Search FAQs');
    
    // Create search icon
    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon';
    
    // Append elements
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchIcon);
    
    // Create no results message
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = 'No matching questions found. Please try another search term or contact us for help.';
    noResults.style.display = 'none';
    
    // Insert search container before FAQ container
    const faqSection = document.querySelector('.faq-section h1');
    faqSection.insertAdjacentElement('afterend', searchContainer);
    
    // Insert no results after FAQ container
    const faqContainer = document.querySelector('.faq-container');
    faqContainer.insertAdjacentElement('afterend', noResults);
    
    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const faqItems = document.querySelectorAll('.faq-item');
        let hasResults = false;
        
        faqItems.forEach(item => {
            const question = item.querySelector('h2').textContent.toLowerCase();
            const answer = item.querySelector('p') ? 
                item.querySelector('p').textContent.toLowerCase() : 
                item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm) || searchTerm === '') {
                item.style.display = 'block';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        noResults.style.display = hasResults ? 'none' : 'block';
    });
    
    // Clear search when ESC key is pressed
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            const event = new Event('input');
            searchInput.dispatchEvent(event);
            searchInput.blur();
        }
    });
}

/**
 * Category Filters
 */
function initCategoryFilters() {
    // Define categories based on FAQ content
    const categories = [
        { id: 'all', name: 'All' },
        { id: 'general', name: 'General' },
        { id: 'account', name: 'Account' },
        { id: 'features', name: 'Features' },
        { id: 'security', name: 'Security' },
        { id: 'payments', name: 'Payments' }
    ];
    
    // Create category filters container
    const categoryFilters = document.createElement('div');
    categoryFilters.className = 'category-filters';
    
    // Create filter buttons
    categories.forEach(category => {
        const filter = document.createElement('div');
        filter.className = 'category-filter';
        filter.dataset.category = category.id;
        filter.textContent = category.name;
        
        if (category.id === 'all') {
            filter.classList.add('active');
        }
        
        categoryFilters.appendChild(filter);
    });
    
    // Insert filters after search container
    const searchContainer = document.querySelector('.search-container');
    searchContainer.insertAdjacentElement('afterend', categoryFilters);
    
    // Assign categories to FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Map questions to categories (simplified approach)
    faqItems.forEach((item, index) => {
        let category;
        const question = item.querySelector('h2').textContent.toLowerCase();
        
        if (question.includes('account') || question.includes('password') || question.includes('login')) {
            category = 'account';
        } else if (question.includes('feature') || question.includes('dashboard') || question.includes('customize') || question.includes('tools')) {
            category = 'features';
        } else if (question.includes('secure') || question.includes('data') || question.includes('privacy')) {
            category = 'security';
        } else if (question.includes('cost') || question.includes('fee') || question.includes('payment') || question.includes('mpesa')) {
            category = 'payments';
        } else {
            category = 'general';
        }
        
        item.dataset.category = category;
    });
    
    // Add click event to filter buttons
    document.querySelectorAll('.category-filter').forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            const category = filter.dataset.category;
            
            // Filter FAQ items
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Reset search input
            const searchInput = document.querySelector('.search-input');
            searchInput.value = '';
            
            // Hide no results message
            document.querySelector('.no-results').style.display = 'none';
        });
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    // Create mobile menu toggle button
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Add hamburger icon
    const hamburgerIcon = document.createElement('i');
    hamburgerIcon.className = 'fas fa-bars';
    mobileMenuToggle.appendChild(hamburgerIcon);
    
    // Insert toggle button into nav
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');
    nav.insertBefore(mobileMenuToggle, logo.nextSibling);
    
    // Add click event
    mobileMenuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        
        // Toggle icon
        if (navLinks.classList.contains('active')) {
            hamburgerIcon.className = 'fas fa-times';
        } else {
            hamburgerIcon.className = 'fas fa-bars';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        const navLinks = document.querySelector('.nav-links');
        const isClickInside = navLinks.contains(event.target) || mobileMenuToggle.contains(event.target);
        
        if (!isClickInside && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburgerIcon.className = 'fas fa-bars';
        }
    });
    
    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 576) {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('active');
            hamburgerIcon.className = 'fas fa-bars';
        }
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    // Create button
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Scroll to top of page');
    backToTop.setAttribute('role', 'button');
    backToTop.setAttribute('tabindex', '0');
    
    // Add to document
    document.body.appendChild(backToTop);
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Keyboard support
    backToTop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

/**
 * Accessibility Enhancements
 */
function initAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ID to main content
    const main = document.querySelector('main');
    main.id = 'main';
    
    // Add proper aria labels
    document.querySelectorAll('a, button').forEach(element => {
        if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
            let label = '';
            
            if (element.classList.contains('dark-mode-toggle')) {
                label = 'Toggle dark mode';
            } else if (element.classList.contains('back-to-top')) {
                label = 'Back to top';
            }
            
            if (label) {
                element.setAttribute('aria-label', label);
            }
        }
    });
    
    // Make sure all links have proper attributes
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hasAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

/**
 * Update copyright year automatically
 */
function initCopyright() {
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        const copyrightText = copyrightElement.textContent;
        
        // Update the year only if different
        const yearPattern = /\d{4}/;
        if (yearPattern.test(copyrightText)) {
            const yearInText = copyrightText.match(yearPattern)[0];
            if (yearInText !== currentYear.toString()) {
                copyrightElement.textContent = copyrightText.replace(yearPattern, currentYear);
            }
        }
    }
}

/**
 * Analytics Tracking
 */
function initAnalytics() {
    // Track page view
    console.log('Page viewed:', window.location.pathname);
    
    // Track FAQ item interactions
    document.querySelectorAll('.faq-item h2').forEach(question => {
        question.addEventListener('click', () => {
            console.log('FAQ clicked:', question.textContent.trim());
            // This would send data to an analytics service in a real implementation
        });
    });
    
    // Track search queries
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        let lastSearchTerm = '';
        let searchTimeout;
        
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            
            // Only log after typing stops for 1 second
            searchTimeout = setTimeout(() => {
                const searchTerm = searchInput.value.trim();
                if (searchTerm && searchTerm !== lastSearchTerm) {
                    console.log('Search query:', searchTerm);
                    lastSearchTerm = searchTerm;
                }
            }, 1000);
        });
    }
    
    // Track category filter clicks
    document.querySelectorAll('.category-filter').forEach(filter => {
        filter.addEventListener('click', () => {
            console.log('Category selected:', filter.textContent.trim());
        });
    });
    
    // Track contact link clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Contact link clicked:', link.href);
        });
    });
}

/**
 * External Link Handling
 */
function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        // Add target="_blank" if not already present
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        
        // Add security attributes
        if (!link.hasAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Add external link icon if not already present
        if (!link.querySelector('.fa-external-link-alt')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-external-link-alt';
            icon.style.fontSize = '0.8em';
            icon.style.marginLeft = '0.3em';
            link.appendChild(icon);
        }
    });
}

/**
 * Image Loader with Error Handling
 */
function initImageLoader() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add error handling
        img.onerror = function() {
            console.warn('Failed to load image:', img.src);
            
            // Create fallback for logo
            if (img.classList.contains('logo')) {
                const logoFallback = document.createElement('div');
                logoFallback.textContent = 'CarPal';
                logoFallback.style.fontFamily = 'Poppins, sans-serif';
                logoFallback.style.fontWeight = 'bold';
                logoFallback.style.fontSize = '24px';
                logoFallback.style.color = '#FFD700';
                img.parentNode.replaceChild(logoFallback, img);
            } else {
                // For other images, use a placeholder
                img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3A%23868e96%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                img.alt = 'Image placeholder';
            }
        };
        
        // Add lazy loading for performance
        img.loading = 'lazy';
    });
}

/**
 * Browser Compatibility Check
 */
(function checkBrowserCompatibility() {
    const isModernBrowser = 
        'querySelector' in document && 
        'localStorage' in window && 
        'addEventListener' in window &&
        'classList' in document.documentElement;
    
    if (!isModernBrowser) {
        // Create warning for old browsers
        const warning = document.createElement('div');
        warning.style.padding = '10px';
        warning.style.backgroundColor = '#FFD700';
        warning.style.color = 'black';
        warning.style.textAlign = 'center';
        warning.style.position = 'fixed';
        warning.style.top = '0';
        warning.style.left = '0';
        warning.style.right = '0';
        warning.style.zIndex = '9999';
        warning.textContent = 'Your browser may not support all features of this website. Please update to a modern browser for the best experience.';
        
        document.body.insertBefore(warning, document.body.firstChild);
    }
})();