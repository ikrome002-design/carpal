document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // Table of Contents Active Link
    const tocLinks = document.querySelectorAll('.toc a');
    const sections = document.querySelectorAll('.terms-section');
    
    // Add back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show back to top button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Update active TOC link on scroll
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active') && mobileMenuBtn) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight - 20,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
                
                // Remove active class from all links and add to clicked link
                tocLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Check if URL has a hash on page load
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);
        
        if (targetElement) {
            // Delay scrolling slightly to ensure page is fully loaded
            setTimeout(() => {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight - 20,
                    behavior: 'smooth'
                });
                
                // Set active class on the corresponding TOC link
                tocLinks.forEach(link => {
                    if (link.getAttribute('href') === hash) {
                        link.classList.add('active');
                    }
                });
            }, 300);
        }
    }
    
    // Section highlight animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe sections
    sections.forEach(section => {
        section.classList.add('animate-section');
        observer.observe(section);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-section {
            opacity: 0.7;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Terms';
    printButton.style.display = 'block';
    printButton.style.margin = '20px auto';
    printButton.style.padding = '10px 20px';
    printButton.style.backgroundColor = '#f5f5f5';
    printButton.style.border = 'none';
    printButton.style.borderRadius = '5px';
    printButton.style.cursor = 'pointer';
    printButton.style.fontWeight = 'bold';
    printButton.style.transition = 'all 0.3s ease';
    
    const ctaContainer = document.querySelector('.cta-container');
    if (ctaContainer) {
        ctaContainer.parentNode.insertBefore(printButton, ctaContainer);
    }
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    printButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#e0e0e0';
    });
    
    printButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#f5f5f5';
    });
    
    // Copy section link functionality
    sections.forEach(section => {
        const sectionHeader = section.querySelector('h2');
        if (sectionHeader) {
            sectionHeader.style.position = 'relative';
            
            const linkIcon = document.createElement('span');
            linkIcon.innerHTML = '<i class="fas fa-link"></i>';
            linkIcon.className = 'section-link-icon';
            linkIcon.style.position = 'absolute';
            linkIcon.style.right = '0';
            linkIcon.style.top = '50%';
            linkIcon.style.transform = 'translateY(-50%)';
            linkIcon.style.fontSize = '0.8em';
            linkIcon.style.opacity = '0';
            linkIcon.style.transition = 'opacity 0.3s ease';
            linkIcon.style.cursor = 'pointer';
            
            sectionHeader.appendChild(linkIcon);
            
            sectionHeader.addEventListener('mouseover', function() {
                linkIcon.style.opacity = '1';
            });
            
            sectionHeader.addEventListener('mouseout', function() {
                linkIcon.style.opacity = '0';
            });
            
            linkIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const sectionId = section.getAttribute('id');
                const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
                
                // Copy to clipboard
                navigator.clipboard.writeText(url).then(() => {
                    // Show copied notification
                    const notification = document.createElement('div');
                    notification.textContent = 'Link copied to clipboard!';
                    notification.style.position = 'fixed';
                    notification.style.bottom = '20px';
                    notification.style.left = '50%';
                    notification.style.transform = 'translateX(-50%)';
                    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    notification.style.color = 'white';
                    notification.style.padding = '10px 20px';
                    notification.style.borderRadius = '5px';
                    notification.style.zIndex = '1000';
                    
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.opacity = '0';
                        notification.style.transition = 'opacity 0.5s ease';
                        
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 500);
                    }, 2000);
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                });
            });
        }
    });
});