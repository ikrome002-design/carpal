/**
 * CarPal Terms and Conditions JavaScript
 * Implements dynamic functionality for the Terms and Conditions page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initDarkMode();
    initTableOfContents();
    initSectionNavigation();
    initScrollToTop();
    initStickyHeader();
    initMobileNavigation();
    initExpandableSections();
    initImageLoader();
    initAccessibilityFeatures();
    initExternalLinks();
    initPrintFunctionality();
    initCopyright();
    initAnalytics();
    cleanupLogoIssue();
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
 * Generate Table of Contents
 */
function initTableOfContents() {
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('.section');
    
    if (sections.length === 0) return;
    
    // Create TOC container
    const tocContainer = document.createElement('div');
    tocContainer.className = 'toc-container';
    tocContainer.innerHTML = '<h2>Table of Contents</h2>';
    
    // Create TOC list
    const tocList = document.createElement('ol');
    tocList.className = 'toc-list';
    
    // Add IDs to sections if they don't have one and create TOC items
    sections.forEach((section, index) => {
        const sectionHeading = section.querySelector('h2');
        if (!sectionHeading) return;
        
        // Create or use section ID
        const sectionId = section.id || `section-${index + 1}`;
        section.id = sectionId;
        
        // Create TOC item
        const tocItem = document.createElement('li');
        const tocLink = document.createElement('a');
        tocLink.href = `#${sectionId}`;
        tocLink.textContent = sectionHeading.textContent;
        tocItem.appendChild(tocLink);
        tocList.appendChild(tocItem);
    });
    
    // Add TOC to container
    tocContainer.appendChild(tocList);
    
    // Insert TOC after the main heading
    const mainHeading = main.querySelector('h1');
    if (mainHeading) {
        mainHeading.insertAdjacentElement('afterend', tocContainer);
    } else {
        main.insertBefore(tocContainer, main.firstChild);
    }
    
    // Add TOC toggle button for mobile
    const tocToggle = document.createElement('button');
    tocToggle.className = 'toc-toggle';
    tocToggle.innerHTML = 'Show Table of Contents <i class="fas fa-chevron-down"></i>';
    tocToggle.setAttribute('aria-expanded', 'false');
    tocToggle.setAttribute('aria-controls', 'toc-list');
    
    // Insert toggle before TOC list
    tocList.parentNode.insertBefore(tocToggle, tocList);
    
    // Style TOC list for toggle functionality
    tocList.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
    tocList.style.overflow = 'hidden';
    
    // Toggle TOC on mobile
    tocToggle.addEventListener('click', () => {
        const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
        tocToggle.setAttribute('aria-expanded', !isExpanded);
        
        if (isExpanded) {
            tocList.style.maxHeight = '0';
            tocList.style.opacity = '0';
            tocToggle.innerHTML = 'Show Table of Contents <i class="fas fa-chevron-down"></i>';
        } else {
            tocList.style.maxHeight = tocList.scrollHeight + 'px';
            tocList.style.opacity = '1';
            tocToggle.innerHTML = 'Hide Table of Contents <i class="fas fa-chevron-up"></i>';
        }
    });
    
    // Set initial state based on screen size
    function setInitialTocState() {
        if (window.innerWidth < 768) {
            tocList.style.maxHeight = '0';
            tocList.style.opacity = '0';
            tocToggle.style.display = 'block';
        } else {
            tocList.style.maxHeight = '';
            tocList.style.opacity = '1';
            tocToggle.style.display = 'none';
        }
    }
    
    setInitialTocState();
    window.addEventListener('resize', setInitialTocState);
}

/**
 * Section Navigation with Smooth Scrolling
 */
function initSectionNavigation() {
    document.addEventListener('click', (e) => {
        // Check if the clicked element is a TOC link
        if (e.target.tagName === 'A' && e.target.parentNode.parentNode.classList.contains('toc-list')) {
            e.preventDefault();
            
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Adjust based on header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, e.target.getAttribute('href'));
                
                // Set focus to the section
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                
                // Highlight current section in TOC
                document.querySelectorAll('.toc-list a').forEach(link => {
                    link.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        }
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', debounce(() => {
        const sections = document.querySelectorAll('.section');
        const tocLinks = document.querySelectorAll('.toc-list a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }, 100));
    
    // Helper function to debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    // Create button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top of page');
    
    // Style the button
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.zIndex = '99';
    
    // Add to document
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Sticky Header
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('sticky');
            main.style.paddingTop = header.offsetHeight + 'px';
        } else {
            header.classList.remove('sticky');
            main.style.paddingTop = '0';
        }
    });
}

/**
 * Mobile Navigation Menu
 */
function initMobileNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu toggle button
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Insert toggle button into nav
    const logo = nav.querySelector('.logo');
    if (logo) {
        nav.insertBefore(mobileMenuToggle, logo.nextSibling);
    } else {
        nav.insertBefore(mobileMenuToggle, nav.firstChild);
    }
    
    // Add click event
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon based on menu state
        if (navLinks.classList.contains('active')) {
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close menu when window is resized
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

/**
 * Expandable Sections
 */
function initExpandableSections() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        const heading = section.querySelector('h2');
        if (!heading) return;
        
        // Skip the introduction section (first section) and the acknowledgment section (last section)
        if (index === 0 || index === sections.length - 1) return;
        
        // Add expand/collapse functionality
        heading.style.cursor = 'pointer';
        heading.style.position = 'relative';
        heading.setAttribute('role', 'button');
        heading.setAttribute('aria-expanded', 'true');
        heading.setAttribute('tabindex', '0');
        
        // Add toggle indicator
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        toggleIcon.innerHTML = '<i class="fas fa-chevron-up"></i>';
        toggleIcon.style.position = 'absolute';
        toggleIcon.style.right = '0';
        toggleIcon.style.top = '50%';
        toggleIcon.style.transform = 'translateY(-50%)';
        heading.appendChild(toggleIcon);
        
        // Get section content (everything except the heading)
        const content = document.createElement('div');
        content.className = 'section-content';
        content.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
        content.style.overflow = 'hidden';
        
        // Move all content after the heading into this div
        let nextElement = heading.nextElementSibling;
        while (nextElement) {
            const temp = nextElement;
            nextElement = nextElement.nextElementSibling;
            content.appendChild(temp);
        }
        
        section.appendChild(content);
        
        // Toggle function
        const toggleSection = () => {
            const isExpanded = heading.getAttribute('aria-expanded') === 'true';
            heading.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                toggleIcon.innerHTML = '<i class="fas fa-chevron-down"></i>';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                toggleIcon.innerHTML = '<i class="fas fa-chevron-up"></i>';
            }
        };
        
        // Add click event
        heading.addEventListener('click', toggleSection);
        
        // Add keyboard support
        heading.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSection();
            }
        });
        
        // Initially expand all sections
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
    });
}

/**
 * Image Loader with Error Handling
 */
function initImageLoader() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading="lazy" for better performance
        img.loading = 'lazy';
        
        // Add error handling
        img.onerror = function() {
            console.warn('Failed to load image:', img.src);
            
            // If it's a logo, create a text fallback
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
    });
}

/**
 * Accessibility Features
 */
function initAccessibilityFeatures() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ID to main content if not present
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main';
    }
    
    // Ensure proper aria labels
    document.querySelectorAll('button').forEach(button => {
        if (!button.hasAttribute('aria-label') && button.textContent.trim() === '') {
            if (button.classList.contains('dark-mode-toggle')) {
                button.setAttribute('aria-label', 'Toggle dark mode');
            } else if (button.classList.contains('scroll-to-top')) {
                button.setAttribute('aria-label', 'Scroll to top of page');
            } else if (button.classList.contains('mobile-menu-toggle')) {
                button.setAttribute('aria-label', 'Toggle navigation menu');
            }
        }
    });
    
    // Make sure all links have proper contrast and focus states
    document.querySelectorAll('a').forEach(link => {
        // Ensure proper focus visibility
        link.addEventListener('focus', () => {
            link.classList.add('focus-visible');
        });
        
        link.addEventListener('blur', () => {
            link.classList.remove('focus-visible');
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
            icon.setAttribute('aria-hidden', 'true');
            link.appendChild(icon);
        }
    });
}

/**
 * Print Functionality
 */
function initPrintFunctionality() {
    // Create print button
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Terms and Conditions';
    printButton.setAttribute('aria-label', 'Print Terms and Conditions');
    
    // Add button to the page
    const main = document.querySelector('main');
    main.appendChild(printButton);
    
    // Add click event
    printButton.addEventListener('click', () => {
        // Expand all sections before printing
        document.querySelectorAll('.section-content').forEach(content => {
            content.style.maxHeight = 'none';
            content.style.opacity = '1';
        });
        
        document.querySelectorAll('.section h2[aria-expanded="false"]').forEach(heading => {
            heading.setAttribute('aria-expanded', 'true');
            heading.querySelector('.toggle-icon').innerHTML = '<i class="fas fa-chevron-up"></i>';
        });
        
        // Print the page
        window.print();
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
        
        // Update only if the year is different
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
 * Basic Analytics Tracking
 */
function initAnalytics() {
    // Track page view
    console.log('Page viewed:', window.location.pathname);
    
    // Track section views
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const sectionHeading = entry.target.querySelector('h2');
                if (sectionHeading) {
                    console.log('Section viewed:', sectionHeading.textContent, sectionId);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Track external link clicks
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('External link clicked:', link.href);
        });
    });
    
    // Track print button clicks
    document.querySelector('.print-button')?.addEventListener('click', () => {
        console.log('Print button clicked');
    });
    
    // Track dark mode usage
    document.getElementById('darkModeToggle').addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        console.log('Dark mode toggled:', isDarkMode ? 'enabled' : 'disabled');
    });
}

/**
 * Fix duplicate logo issue in the header
 */
function cleanupLogoIssue() {
    // The HTML has a duplicate logo setup, let's clean it up
    const headerLinks = document.querySelectorAll('header > a.logo');
    if (headerLinks.length > 0) {
        headerLinks.forEach(link => {
            link.remove();
        });
    }
}

/**
 * Browser Compatibility Check
 */
(function checkBrowserCompatibility() {
    const isModernBrowser = 
        'querySelector' in document && 
        'localStorage' in window && 
        'addEventListener' in window &&
        'IntersectionObserver' in window;
    
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