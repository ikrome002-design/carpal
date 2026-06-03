document.addEventListener('DOMContentLoaded', function() {
    // Navigation - Mobile Menu Toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    navContainer.insertBefore(mobileMenuBtn, navLinks);
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
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

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatableElements = document.querySelectorAll('.feature-card, .step-card, .testimonial-card, .pricing-card, .about-content > div');
    animatableElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Add CSS to handle animation
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Sticky Navigation
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Form Validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    showSuccessMessage();
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#ff3860';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        input.style.borderColor = '#ff3860';
        errorElement.textContent = message;
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        input.style.borderColor = '';
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccessMessage() {
        const contactFormSection = document.querySelector('.contact-form');
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.backgroundColor = '#4CAF50';
        successMessage.style.color = 'white';
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '5px';
        successMessage.style.marginTop = '20px';
        successMessage.style.textAlign = 'center';
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        
        contactFormSection.appendChild(successMessage);
        
        setTimeout(() => {
            contactFormSection.removeChild(successMessage);
        }, 5000);
    }

    // Dynamic pricing tiers highlight
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => c.style.transform = 'scale(1)');
            this.style.transform = 'scale(1.05)';
            this.style.zIndex = '2';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1.03)';
            this.style.zIndex = '1';
        });
    });

    // Preload images for better performance
    const imagePaths = [
        'C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Website Screens/check_in.jpg',
        'C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Website Screens/hub.jpg',
        'C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Website Screens/billings.jpg',
        'C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Website Screens/history.jpg',
        'C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Website Screens/check_out.jpg',
        'C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Website Screens/service.jpg',
        'C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Website Images/mpesa.png',
        'C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Website Images/cic.png',
        'C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Website Images/icea.png',
        'C:/Users/nderu/Documents/Development/Product/CarPal/Technical Writings/Images/Website Images/ipay.png'
    ];
    
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });
    
    // Testimonial Carousel for mobile view
    function setupTestimonialCarousel() {
        if (window.innerWidth <= 768) {
            const testimonialGrid = document.querySelector('.testimonial-grid');
            const testimonials = document.querySelectorAll('.testimonial-card');
            
            if (testimonialGrid && testimonials.length > 1) {
                // Create carousel navigation
                const navContainer = document.createElement('div');
                navContainer.className = 'carousel-nav';
                navContainer.style.display = 'flex';
                navContainer.style.justifyContent = 'center';
                navContainer.style.marginTop = '20px';
                navContainer.style.gap = '10px';
                
                // Hide all testimonials except the first one
                testimonials.forEach((testimonial, index) => {
                    if (index > 0) {
                        testimonial.style.display = 'none';
                    }
                    
                    // Create navigation dot for each testimonial
                    const dot = document.createElement('button');
                    dot.className = 'carousel-dot';
                    dot.style.width = '12px';
                    dot.style.height = '12px';
                    dot.style.borderRadius = '50%';
                    dot.style.border = 'none';
                    dot.style.backgroundColor = index === 0 ? '#FFD700' : '#ccc';
                    dot.style.cursor = 'pointer';
                    dot.setAttribute('data-index', index);
                    
                    dot.addEventListener('click', function() {
                        const targetIndex = parseInt(this.getAttribute('data-index'));
                        
                        // Hide all testimonials
                        testimonials.forEach(item => {
                            item.style.display = 'none';
                        });
                        
                        // Show the selected testimonial
                        testimonials[targetIndex].style.display = 'block';
                        
                        // Update dots
                        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                            dot.style.backgroundColor = i === targetIndex ? '#FFD700' : '#ccc';
                        });
                    });
                    
                    navContainer.appendChild(dot);
                });
                
                const testimonialsSection = document.querySelector('.testimonials .container');
                testimonialsSection.appendChild(navContainer);
            }
        }
    }
    
    setupTestimonialCarousel();
    
    // Handle window resize for responsive features
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Remove existing carousel if exists
            const existingNav = document.querySelector('.carousel-nav');
            if (existingNav) {
                existingNav.remove();
            }
            
            // Reset testimonial display
            document.querySelectorAll('.testimonial-card').forEach(card => {
                card.style.display = 'block';
            });
            
            // Setup carousel if needed
            setupTestimonialCarousel();
        }, 250);
    });
});