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

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.toggle-icon i').className = 'fas fa-plus';
            }
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Update icon
            const icon = this.querySelector('.toggle-icon i');
            icon.className = item.classList.contains('active') 
                ? 'fas fa-minus' 
                : 'fas fa-plus';
        });
    });

    // Category Navigation
    const categoryLinks = document.querySelectorAll('.category-link');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetCategoryId = this.getAttribute('href').substring(1);
            
            // Update active link
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update active category
            faqCategories.forEach(category => {
                if (category.id === targetCategoryId) {
                    category.classList.add('active');
                } else {
                    category.classList.remove('active');
                }
            });
            
            // Add animation class to questions
            const targetQuestions = document.querySelectorAll(`#${targetCategoryId} .faq-item`);
            targetQuestions.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50 * index);
            });
            
            // Scroll to category on mobile
            if (window.innerWidth <= 1024) {
                const categorySection = document.getElementById(targetCategoryId);
                window.scrollTo({
                    top: categorySection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Support Resources Navigation
    const supportLinks = document.querySelectorAll('.support-box a');
    
    supportLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Show Support Resources category if it's not already shown
                const supportCat = document.getElementById('support-resources');
                
                if (!supportCat.classList.contains('active')) {
                    faqCategories.forEach(cat => cat.classList.remove('active'));
                    supportCat.classList.add('active');
                    
                    // Update category nav
                    categoryLinks.forEach(l => l.classList.remove('active'));
                }
                
                // Open the specific FAQ item
                const faqItem = targetElement.closest('.faq-item');
                
                if (faqItem && !faqItem.classList.contains('active')) {
                    // Close any open FAQ items
                    const openItems = document.querySelectorAll('.faq-item.active');
                    openItems.forEach(item => {
                        item.classList.remove('active');
                        item.querySelector('.toggle-icon i').className = 'fas fa-plus';
                    });
                    
                    // Open the target item
                    faqItem.classList.add('active');
                    faqItem.querySelector('.toggle-icon i').className = 'fas fa-minus';
                }
                
                // Scroll to the item
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Search Functionality
    const searchInput = document.getElementById('faq-search');
    const searchBtn = document.getElementById('search-btn');
    const faqContent = document.querySelector('.faq-content .container');
    
    // Create search results container
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.className = 'search-results';
    searchResultsContainer.innerHTML = `
        <h3>Search Results</h3>
        <ul class="results-list"></ul>
    `;
    faqContent.insertBefore(searchResultsContainer, faqContent.firstChild);
    
    const performSearch = () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm.length < 2) {
            searchResultsContainer.classList.remove('show');
            return;
        }
        
        const resultsList = searchResultsContainer.querySelector('.results-list');
        resultsList.innerHTML = '';
        
        // Get all FAQ questions and answers
        const allQuestions = document.querySelectorAll('.faq-question h3');
        const allAnswers = document.querySelectorAll('.faq-answer');
        
        let resultsFound = false;
        
        // Search in questions
        allQuestions.forEach((question, index) => {
            const questionText = question.textContent.toLowerCase();
            const answer = allAnswers[index];
            const answerText = answer.textContent.toLowerCase();
            
            const faqItem = question.closest('.faq-item');
            const category = faqItem.closest('.faq-category');
            const categoryName = category.querySelector('h2').textContent;
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                resultsFound = true;
                
                // Create result item
                const resultItem = document.createElement('li');
                
                // Highlight search term in question text
                let displayText = question.textContent;
                if (questionText.includes(searchTerm)) {
                    const startIndex = questionText.indexOf(searchTerm);
                    const endIndex = startIndex + searchTerm.length;
                    
                    displayText = 
                        displayText.substring(0, startIndex) + 
                        `<span class="highlight">${displayText.substring(startIndex, endIndex)}</span>` + 
                        displayText.substring(endIndex);
                }
                
                resultItem.innerHTML = `
                    <a href="#" data-category="${category.id}" data-item="${faqItem.id || 'faq-' + index}">${displayText}</a>
                    <div class="category">Category: ${categoryName}</div>
                `;
                
                resultsList.appendChild(resultItem);
            }
        });
        
        if (!resultsFound) {
            resultsList.innerHTML = `<div class="no-results">No results found for "${searchTerm}"</div>`;
        }
        
        searchResultsContainer.classList.add('show');
        
        // Add click event to result items
        const resultLinks = document.querySelectorAll('.results-list a');
        resultLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const categoryId = this.getAttribute('data-category');
                const itemId = this.getAttribute('data-item');
                
                // Show the category
                faqCategories.forEach(cat => {
                    cat.classList.remove('active');
                    if (cat.id === categoryId) {
                        cat.classList.add('active');
                    }
                });
                
                // Update category nav
                categoryLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${categoryId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Find the item
                let targetItem;
                if (itemId.startsWith('faq-')) {
                    // Using index (fallback)
                    const index = parseInt(itemId.replace('faq-', ''));
                    targetItem = document.querySelectorAll('.faq-item')[index];
                } else {
                    // Using ID
                    targetItem = document.getElementById(itemId);
                }
                
                if (targetItem) {
                    // Close any open FAQ items
                    const openItems = document.querySelectorAll('.faq-item.active');
                    openItems.forEach(item => {
                        item.classList.remove('active');
                        const icon = item.querySelector('.toggle-icon i');
                        if (icon) icon.className = 'fas fa-plus';
                    });
                    
                    // Open the target item
                    targetItem.classList.add('active');
                    const icon = targetItem.querySelector('.toggle-icon i');
                    if (icon) icon.className = 'fas fa-minus';
                    
                    // Scroll to the item
                    setTimeout(() => {
                        targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                    
                    // Hide search results
                    searchResultsContainer.classList.remove('show');
                    searchInput.value = '';
                }
            });
        });
    };
    
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Search on enter key
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
            
            // Clear results when search is cleared
            if (this.value.trim() === '') {
                searchResultsContainer.classList.remove('show');
            }
        });
    }

    // Preopen FAQ items from URL hash
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetElement = document.getElementById(hash);
        
        if (targetElement) {
            let categoryId;
            const faqItem = targetElement.closest('.faq-item');
            const category = targetElement.closest('.faq-category');
            
            if (category) {
                categoryId = category.id;
                
                // Show the category
                faqCategories.forEach(cat => {
                    cat.classList.remove('active');
                    if (cat.id === categoryId) {
                        cat.classList.add('active');
                    }
                });
                
                // Update category nav
                categoryLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${categoryId}`) {
                        link.classList.add('active');
                    }
                });
                
                if (faqItem) {
                    // Open the FAQ item
                    faqItem.classList.add('active');
                    const icon = faqItem.querySelector('.toggle-icon i');
                    if (icon) icon.className = 'fas fa-minus';
                    
                    // Scroll to the item after a short delay to ensure rendering
                    setTimeout(() => {
                        window.scrollTo({
                            top: faqItem.offsetTop - 120,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        }
    }

    // Add unique IDs to FAQ items for direct linking
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        const question = item.querySelector('.faq-question h3');
        const questionText = question.textContent.trim();
        const category = item.closest('.faq-category');
        
        // Create an ID based on the question text
        let itemId = questionText.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
            .replace(/-+/g, '-')         // Replace multiple hyphens with single hyphen
            .replace(/^-|-$/g, '');      // Remove leading/trailing hyphens
        
        // Ensure uniqueness by adding the category
        if (category) {
            itemId = `${category.id}-${itemId}`;
        }
        
        // If still no ID, use a fallback
        if (!itemId) {
            itemId = `faq-item-${index}`;
        }
        
        item.id = itemId;
        
        // Make question heading clickable for direct link
        const linkIcon = document.createElement('a');
        linkIcon.href = `#${itemId}`;
        linkIcon.className = 'question-link';
        linkIcon.innerHTML = '<i class="fas fa-link"></i>';
        linkIcon.style.marginLeft = '10px';
        linkIcon.style.fontSize = '0.8em';
        linkIcon.style.opacity = '0';
        linkIcon.style.transition = 'opacity 0.3s ease';
        
        question.appendChild(linkIcon);
        
        question.addEventListener('mouseover', () => {
            linkIcon.style.opacity = '0.7';
        });
        
        question.addEventListener('mouseout', () => {
            linkIcon.style.opacity = '0';
        });
        
        linkIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent toggling when clicking the link
            
            // Copy to clipboard
            const url = window.location.origin + window.location.pathname + `#${itemId}`;
            navigator.clipboard.writeText(url).then(() => {
                // Show a tooltip
                const tooltip = document.createElement('span');
                tooltip.textContent = 'Link copied!';
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
                tooltip.style.color = 'white';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '3px';
                tooltip.style.fontSize = '0.8em';
                tooltip.style.zIndex = '100';
                tooltip.style.top = '100%';
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                
                linkIcon.style.position = 'relative';
                linkIcon.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
        });
    });
});