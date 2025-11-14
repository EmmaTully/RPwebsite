// Recognition Physics Institute - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    if (navToggle && navMenu) {
        const body = document.body;
        const navLinks = navMenu.querySelectorAll('a');
        const toggleKeys = ['Enter', ' ', 'Space', 'Spacebar'];

        navToggle.setAttribute('role', 'button');
        navToggle.setAttribute('tabindex', '0');
        navToggle.setAttribute('aria-label', 'Toggle navigation');
        navToggle.setAttribute('aria-expanded', 'false');

        const closeMenu = () => {
            if (!navMenu.classList.contains('active')) {
                return;
            }
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            body.classList.remove('nav-open');
        };

        const toggleMenu = () => {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
            body.classList.toggle('nav-open', isOpen);
        };
        
        navToggle.addEventListener('click', toggleMenu);
        navToggle.addEventListener('keydown', (event) => {
            if (toggleKeys.includes(event.key)) {
                event.preventDefault();
                toggleMenu();
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        document.addEventListener('keyup', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        if (navContainer) {
            document.addEventListener('click', (event) => {
                if (!navContainer.contains(event.target)) {
                    closeMenu();
                }
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Newsletter signup form
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.email-input').value;
            
            if (email) {
                // Simulate form submission
                alert('Thank you for subscribing! You will receive updates about our latest research.');
                this.querySelector('.email-input').value = '';
            }
        });
    }

    // Animated counters for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-target') || +counter.innerText.replace('+', '');
                const data = +counter.innerText.replace('+', '') || 0;
                const time = value / speed;
                
                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    const originalText = counter.getAttribute('data-original') || counter.innerText;
                    counter.innerText = originalText;
                }
            };
            
            // Store original text
            if (!counter.getAttribute('data-original')) {
                counter.setAttribute('data-original', counter.innerText);
                counter.setAttribute('data-target', counter.innerText.replace('+', ''));
            }
            
            animate();
        });
    }

    // Trigger counter animation when stats come into view
    const observerOptions = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Foundation nodes interactive behavior
    const foundationNodes = document.querySelectorAll('.foundation-node');
    foundationNodes.forEach(node => {
        node.addEventListener('click', function() {
            // Add a subtle animation or link to detailed explanation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Header background opacity on scroll
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    // Card hover effects for better interaction
    const cards = document.querySelectorAll('.highlight-card, .publication-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading animation for images (if any are added later)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    console.log('Recognition Physics Institute website loaded successfully');
});
