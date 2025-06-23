// FAQ Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion
    initFAQAccordion();
    
    // Initialize category filtering
    initCategoryFiltering();
    
    // Initialize search functionality
    initSearch();
    
    // Update cart count
    updateCartCount();
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
});

// Initialize FAQ accordion functionality
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        const answer = question.nextElementSibling;
        const answerId = `faq-${Math.random().toString(36).substr(2, 9)}`;
        
        // Set initial ARIA attributes
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answerId);
        answer.setAttribute('id', answerId);
        
        // Add click event
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Close all other open items
            if (!isExpanded) {
                document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(openQuestion => {
                    if (openQuestion !== question) {
                        openQuestion.setAttribute('aria-expanded', 'false');
                        const openAnswer = document.getElementById(openQuestion.getAttribute('aria-controls'));
                        openAnswer.style.maxHeight = '0';
                    }
                });
            }
            
            // Toggle the expanded state
            question.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the answer visibility with smooth animation
            if (isExpanded) {
                answer.style.maxHeight = '0';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                
                // Scroll to the question if it's near the bottom of the viewport
                const questionRect = question.getBoundingClientRect();
                if (questionRect.bottom > window.innerHeight - 100) {
                    question.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });
}

// Initialize category filtering
function initCategoryFiltering() {
    const categoryButtons = document.querySelectorAll('.faq-category');
    const faqItems = document.querySelectorAll('.faq-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active state
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show/hide FAQ items based on category
            faqItems.forEach(item => {
                const categories = item.getAttribute('data-categories').split(',');
                
                if (category === 'all' || categories.includes(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide section titles
            updateSectionTitles();
            
            // Scroll to top
            window.scrollTo({
                top: document.querySelector('.faq-categories').offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });
}

// Update section titles based on visible items
function updateSectionTitles() {
    const sectionTitles = document.querySelectorAll('.faq-section-title');
    
    sectionTitles.forEach(title => {
        const nextElements = [];
        let nextElement = title.nextElementSibling;
        
        // Get all FAQ items until the next section title
        while (nextElement && !nextElement.classList.contains('faq-section-title')) {
            if (nextElement.classList.contains('faq-item')) {
                nextElements.push(nextElement);
            }
            nextElement = nextElement.nextElementSibling;
        }
        
        // Check if any items in this section are visible
        const hasVisibleItems = nextElements.some(el => window.getComputedStyle(el).display !== 'none');
        title.style.display = hasVisibleItems ? 'block' : 'none';
    });
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('faqSearch');
    if (!searchInput) return;
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = `
        <i class="fas fa-search"></i>
        <h3>No results found</h3>
        <p>Try different keywords or check our <a href="contact.html">contact page</a> for help.</p>
    `;
    
    // Insert no results message after search input
    searchInput.parentNode.insertBefore(noResults, searchInput.nextSibling);
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let hasResults = false;
        
        if (searchTerm.length < 2) {
            // Show all items if search term is too short
            document.querySelectorAll('.faq-item').forEach(item => {
                item.style.display = 'block';
            });
            
            document.querySelectorAll('.faq-section-title').forEach(title => {
                title.style.display = 'block';
            });
            
            noResults.style.display = 'none';
            return;
        }
        
        // Search through questions and answers
        faqQuestions.forEach(question => {
            const answer = question.nextElementSibling;
            const questionText = question.textContent.trim().toLowerCase();
            const answerText = answer.textContent.trim().toLowerCase();
            const faqItem = question.closest('.faq-item');
            
            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                faqItem.style.display = 'block';
                hasResults = true;
                
                // Highlight matching text in question
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                const highlightedQuestion = questionText.replace(regex, '<span class="highlight">$1</span>');
                question.innerHTML = question.innerHTML.replace(questionText, highlightedQuestion);
                
                // Expand to show answer
                question.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                faqItem.style.display = 'none';
            }
        });
        
        // Show/hide section titles based on visible items
        updateSectionTitles();
        
        // Show no results message if no matches found
        noResults.style.display = hasResults ? 'none' : 'block';
    });
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    
    if (count > 0) {
        if (!cartCount) {
            const newCount = document.createElement('span');
            newCount.className = 'cart-count';
            document.querySelector('.cart-icon').appendChild(newCount);
            newCount.textContent = count;
        } else {
            cartCount.textContent = count;
        }
    } else if (cartCount) {
        cartCount.remove();
    }
}
