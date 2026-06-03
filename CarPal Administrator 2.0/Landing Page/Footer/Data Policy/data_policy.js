/**
 * CarPal Data Policy JavaScript
 * Implements dynamic functionality for the Data Policy page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initDarkMode();
    initScrollToTop();
    initSubsectionToggle();
    initImageLoader();
    initExternalLinkHandling();
    initAccessibilityFeatures();
    initCopyright();
    initPrintFunctionality();
    initAnalytics();
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
 * Scroll To Top Button
 */
function initScrollToTop() {
    // Create the button element
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.classList.add('scroll-top');
    scrollTopBtn.title = 'Scroll to top';
    
    // Style the button
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.backgroundColor = '#FFD700';
    scrollTopBtn.style.color = '#000000';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.width = '40px';
    scrollTopBtn.style.height = '40px';
    scrollTopBtn.style.fontSize = '16px';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.style.zIndex = '999';
    scrollTopBtn.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    scrollTopBtn.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Add button to the body
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Subsection Toggle for Mobile
 */
function initSubsectionToggle() {
    // Only apply this on mobile devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
        const subsections = document.querySelectorAll('.subsection');
        
        subsections.forEach(subsection => {
            const heading = subsection.querySelector('h3');
            const content = subsection.querySelector('ul');
            
            // Initially hide content
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease';
            
            // Add toggle indicator
            const indicator = document.createElement('span');
            indicator.innerHTML = '+';
            indicator.style.float = 'right';
            indicator.style.fontSize = '1.2rem';
            indicator.style.marginRight = '10px';
            indicator.style.transition = 'transform 0.3s ease';
            heading.appendChild(indicator);
            
            // Make heading clickable
            heading.style.cursor = 'pointer';
            heading.addEventListener('click', () => {
                // Toggle content visibility
                if (content.style.maxHeight === '0px') {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    indicator.innerHTML = '-';
                } else {
                    content.style.maxHeight = '0';
                    indicator.innerHTML = '+';
                }
            });
        });
    }
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
            if (img.alt.includes('Logo')) {
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
 * External Link Handling
 */
function initExternalLinkHandling() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        // Add target="_blank" if not already present
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        
        // Add rel="noopener noreferrer" for security
        if (!link.hasAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Add icon to indicate external link
        if (!link.querySelector('.fa-external-link-alt')) {
            const icon = document.createElement('i');
            icon.classList.add('fas', 'fa-external-link-alt');
            icon.style.fontSize = '0.8em';
            icon.style.marginLeft = '0.3em';
            link.appendChild(icon);
        }
    });
}

/**
 * Accessibility Features
 */
function initAccessibilityFeatures() {
    // Add aria labels where needed
    document.querySelectorAll('button:not([aria-label])').forEach(button => {
        if (!button.textContent.trim()) {
            let label = '';
            if (button.id === 'darkModeToggle') {
                label = 'Toggle dark mode';
            } else if (button.classList.contains('scroll-top')) {
                label = 'Scroll to top';
            }
            
            if (label) {
                button.setAttribute('aria-label', label);
            }
        }
    });
    
    // Add keyboard navigation for subsections
    document.querySelectorAll('.subsection h3').forEach(heading => {
        if (heading.style.cursor === 'pointer') {
            heading.setAttribute('tabindex', '0');
            heading.setAttribute('role', 'button');
            heading.setAttribute('aria-expanded', 'false');
            
            heading.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    heading.click();
                    
                    // Update aria-expanded
                    const isExpanded = heading.getAttribute('aria-expanded') === 'true';
                    heading.setAttribute('aria-expanded', !isExpanded);
                }
            });
        }
    });
    
    // Add skip to content link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.textContent = 'Skip to main content';
    skipLink.href = '#main';
    skipLink.classList.add('skip-link');
    
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '100';
    skipLink.style.backgroundColor = '#FFD700';
    skipLink.style.color = '#000000';
    skipLink.style.transition = 'top 0.3s';
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add id to main for skip link
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main';
    }
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
 * Print Functionality
 */
function initPrintFunctionality() {
    // Create print button
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Policy';
    printButton.classList.add('print-button');
    
    // Style the button
    printButton.style.display = 'block';
    printButton.style.margin = '2rem auto 1rem';
    printButton.style.padding = '0.5rem 1rem';
    printButton.style.backgroundColor = '#2D2D2D';
    printButton.style.color = 'white';
    printButton.style.border = 'none';
    printButton.style.borderRadius = '4px';
    printButton.style.cursor = 'pointer';
    printButton.style.fontFamily = 'Poppins, sans-serif';
    printButton.style.fontSize = '0.9rem';
    
    // Handle dark mode
    const updatePrintButtonStyle = () => {
        if (document.body.classList.contains('dark-mode')) {
            printButton.style.backgroundColor = '#F0F0F0';
            printButton.style.color = '#2D2D2D';
        } else {
            printButton.style.backgroundColor = '#2D2D2D';
            printButton.style.color = 'white';
        }
    };
    
    // Initial style
    updatePrintButtonStyle();
    
    // Update when dark mode changes
    document.getElementById('darkModeToggle').addEventListener('click', updatePrintButtonStyle);
    
    // Add button to the page
    const main = document.querySelector('main');
    main.appendChild(printButton);
    
    // Print function
    printButton.addEventListener('click', () => {
        window.print();
    });
}

/**
 * Basic Analytics Tracking
 */
function initAnalytics() {
    // Simple pageview tracking
    const trackPageView = () => {
        console.log('Page viewed:', window.location.pathname);
        // This would typically send data to your analytics service
    };
    
    // Track clicks on important links
    const trackImportantLinks = () => {
        const links = document.querySelectorAll('a.login-btn, a.signup-btn, .legal-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Link clicked:', link.textContent.trim(), link.href);
                // This would typically send data to your analytics service
            });
        });
    };
    
    // Track external links
    const trackExternalLinks = () => {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('External link clicked:', link.href);
                // This would typically send data to your analytics service
            });
        });
    };
    
    // Initialize tracking
    trackPageView();
    trackImportantLinks();
    trackExternalLinks();
}

/**
 * Browser Compatibility Check
 */
(function checkBrowserCompatibility() {
    const isModernBrowser = 
        'querySelector' in document && 
        'localStorage' in window && 
        'addEventListener' in window;
    
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