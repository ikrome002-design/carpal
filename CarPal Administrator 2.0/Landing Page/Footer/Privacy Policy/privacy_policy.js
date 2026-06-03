/**
 * CarPal Privacy Policy JavaScript
 * Implements dynamic functionality for the privacy policy page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initDarkMode();
    initTableOfContents();
    initScrollToSection();
    initStickyHeader();
    initMobileNavigation();
    initScrollToTop();
    initExpandableContent();
    initAccessibilityFeatures();
    initCookieConsent();
    initExternalLinks();
    initImageLoader();
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
 * Table of Contents Generator
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
    const tocList = document.createElement('ul');
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
    tocToggle.innerHTML = 'Table of Contents <i class="fas fa-chevron-down"></i>';
    tocToggle.setAttribute('aria-expanded', 'false');
    tocToggle.setAttribute('aria-controls', 'toc-list');
    
    // Insert toggle before TOC list
    tocList.parentNode.insertBefore(tocToggle, tocList);
    
    // Toggle TOC on mobile
    tocToggle.addEventListener('click', () => {
        const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
        tocToggle.setAttribute('aria-expanded', !isExpanded);
        
        if (isExpanded) {
            tocList.style.maxHeight = '0';
            tocToggle.querySelector('i').className = 'fas fa-chevron-down';
        } else {
            tocList.style.maxHeight = tocList.scrollHeight + 'px';
            tocToggle.querySelector('i').className = 'fas fa-chevron-up';
        }
    });
    
    // Set initial state based on screen size
    function setInitialTocState() {
        if (window.innerWidth < 768) {
            tocList.style.maxHeight = '0';
            tocToggle.style.display = 'block';
        } else {
            tocList.style.maxHeight = '';
            tocToggle.style.display = 'none';
        }
    }
    
    setInitialTocState();
    window.addEventListener('resize', setInitialTocState);
}

/**
 * Smooth Scroll to Section
 */
function initScrollToSection() {
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.hash && e.target.hash.startsWith('#section-')) {
            e.preventDefault();
            
            const targetId = e.target.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, e.target.hash);
                
                // Set focus to the section
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                
                // Add active class to section for visual feedback
                document.querySelectorAll('.section.active').forEach(section => {
                    section.classList.remove('active');
                });
                targetElement.classList.add('active');
                
                // Highlight TOC item
                document.querySelectorAll('.toc-list a').forEach(link => {
                    link.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        }
    });
}

/**
 * Sticky Header on Scroll
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add sticky class when scrolling down
        if (scrollTop > 50) {
            header.classList.add('sticky');
            main.style.paddingTop = header.offsetHeight + 'px';
        } else {
            header.classList.remove('sticky');
            main.style.paddingTop = '0';
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 150) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Mobile Navigation Menu
 */
function initMobileNavigation() {
    const nav = document.querySelector('nav');
    
    // Create mobile menu toggle button
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Insert toggle button into nav
    const logo = document.querySelector('.logo');
    nav.insertBefore(mobileMenuToggle, logo.nextSibling);
    
    // Get nav links
    const navLinks = document.querySelector('.nav-links');
    
    // Add click event to toggle
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Update toggle icon
        if (navLinks.classList.contains('active')) {
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu when window is resized
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    // Create button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top of page');
    
    // Style the button
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.zIndex = '99';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
    scrollTopBtn.style.transition = 'opacity 0.3s, visibility 0.3s';
    
    // Add button to document
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
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
 * Expandable Content Sections
 */
function initExpandableContent() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        if (!heading) return;
        
        // Skip the first few sections (introduction, scope)
        if (section === sections[0] || section === sections[1]) return;
        
        // Add expand/collapse functionality
        heading.style.cursor = 'pointer';
        heading.setAttribute('role', 'button');
        heading.setAttribute('aria-expanded', 'true');
        heading.setAttribute('tabindex', '0');
        
        // Add toggle indicator
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        toggleIcon.innerHTML = '<i class="fas fa-chevron-up"></i>';
        heading.appendChild(toggleIcon);
        
        // Get section content (everything except the heading)
        const content = document.createElement('div');
        content.className = 'section-content';
        
        // Move all elements after the heading into the content div
        let nextElement = heading.nextElementSibling;
        while (nextElement) {
            const element = nextElement;
            nextElement = nextElement.nextElementSibling;
            content.appendChild(element);
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
    });
}

/**
 * Accessibility Enhancements
 */
function initAccessibilityFeatures() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ID to main content
    const main = document.querySelector('main');
    main.id = 'main';
    
    // Add aria-label to icons and buttons without text
    document.querySelectorAll('a[href], button').forEach(element => {
        if (element.textContent.trim() === '' && !element.hasAttribute('aria-label')) {
            // Check context to provide appropriate label
            if (element.classList.contains('dark-mode-toggle')) {
                element.setAttribute('aria-label', 'Toggle dark mode');
            } else if (element.classList.contains('scroll-top-btn')) {
                element.setAttribute('aria-label', 'Scroll to top');
            } else if (element.classList.contains('mobile-menu-toggle')) {
                element.setAttribute('aria-label', 'Toggle navigation menu');
            }
        }
    });
    
    // Improve focus visibility
    document.querySelectorAll('a, button, [tabindex]').forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', () => {
            element.classList.remove('focus-visible');
        });
    });
    
    // Add lang attribute to foreign language terms
    document.querySelectorAll('em').forEach(element => {
        // This is a simplification - in real implementation, you'd need more context
        if (/[^\u0000-\u007F]/.test(element.textContent)) {
            // Contains non-ASCII characters, might be a foreign term
            element.setAttribute('lang', 'sw'); // Assuming Swahili for Kenyan context
        }
    });
}

/**
 * Cookie Consent Banner
 */
function initCookieConsent() {
    // Check if user has already consented
    if (localStorage.getItem('cookieConsent') === 'accepted') return;
    
    // Create cookie consent banner
    const consentBanner = document.createElement('div');
    consentBanner.className = 'cookie-consent';
    consentBanner.innerHTML = `
        <div class="consent-content">
            <p>We use cookies to enhance your experience on our platform. By continuing to use this site, you agree to our use of cookies as described in our Privacy Policy.</p>
            <div class="consent-buttons">
                <button class="accept-cookies">Accept</button>
                <a href="#cookies-policy" class="learn-more">Learn More</a>
            </div>
        </div>
    `;
    
    // Style the banner
    consentBanner.style.position = 'fixed';
    consentBanner.style.bottom = '0';
    consentBanner.style.left = '0';
    consentBanner.style.right = '0';
    consentBanner.style.zIndex = '9999';
    consentBanner.style.padding = '1rem';
    
    // Add to document
    document.body.appendChild(consentBanner);
    
    // Accept cookies
    consentBanner.querySelector('.accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        consentBanner.style.display = 'none';
    });
    
    // Link to cookie policy section
    consentBanner.querySelector('.learn-more').addEventListener('click', (e) => {
        // Find cookies policy section
        const cookiesSection = document.querySelector('.section h2:contains("Cookies Policy")');
        if (cookiesSection) {
            e.preventDefault();
            
            // Scroll to section
            const cookiesSectionId = cookiesSection.parentElement.id;
            if (cookiesSectionId) {
                document.querySelector(`a[href="#${cookiesSectionId}"]`).click();
            }
        }
    });
    
    // Polyfill for :contains selector
    if (!HTMLElement.prototype.contains) {
        HTMLElement.prototype.contains = function(text) {
            return this.textContent.includes(text);
        };
    }
}

/**
 * External Link Handling
 */
function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        // Skip links that already have target or rel attributes
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
    printButton.className = 'print-button';
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Policy';
    
    // Add button to the page
    const main = document.querySelector('main');
    main.appendChild(printButton);
    
    // Style the button
    printButton.style.display = 'block';
    printButton.style.margin = '2rem auto';
    printButton.style.padding = '0.75rem 1.5rem';
    
    // Print function
    printButton.addEventListener('click', () => {
        window.print();
    });
}

/**
 * Analytics Tracking
 */
function initAnalytics() {
    // Basic page view tracking
    console.log('Page viewed:', window.location.pathname);
    
    // Track section views with Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const sectionTitle = entry.target.querySelector('h2').textContent;
                console.log('Section viewed:', sectionTitle, sectionId);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Track link clicks
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Link clicked:', link.href);
        });
    });
    
    // Track dark mode usage
    document.getElementById('darkModeToggle').addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        console.log('Dark mode toggled:', isDarkMode ? 'on' : 'off');
    });
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