// ===== CONFIGURATION & STATE MANAGEMENT =====
const siteConfig = {
    // Section visibility configuration
    sectionVisibility: {
        hero: true,
        aboutDoctor: false,
        aboutClinic: true,
        aboutHospital: false,
        services: true,
        departments: true,
        team: true,
        appointments: true,
        testimonials: true,
        blog: true,
        gallery: true,
        contact: true
    },
    
    // Theme configuration
    theme: {
        mode: 'light',
        colorPalette: 'default',
        font: 'inter'
    },
    
    // Services configuration
    services: {
        cardiology: { available: true },
        neurology: { available: true },
        orthopedics: { available: true },
        pediatrics: { available: false },
        emergency: { available: true },
        laboratory: { available: true }
    }
};

    // Hero section Slider
 class HeroSlider {
            constructor() {
                this.currentSlide = 0;
                this.slides = document.querySelectorAll('.hero-slider-slide');
                this.totalSlides = this.slides.length;
                this.sliderContainer = document.getElementById('sliderContainer');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.indicators = document.querySelectorAll('.hero-slider-dot');
                this.autoPlayInterval = null;
                this.autoPlayDelay = 5000; // 5 seconds

                this.init();
            }

            init() {
                this.setupEventListeners();
                this.startAutoPlay();
                this.updateSlider();
            }

            setupEventListeners() {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                this.nextBtn.addEventListener('click', () => this.nextSlide());

                this.indicators.forEach((dot, index) => {
                    dot.addEventListener('click', () => this.goToSlide(index));
                });

                // Pause autoplay on hover
                const sliderSection = document.getElementById('heroSlider');
                sliderSection.addEventListener('mouseenter', () => this.stopAutoPlay());
                sliderSection.addEventListener('mouseleave', () => this.startAutoPlay());

                // Handle keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prevSlide();
                    if (e.key === 'ArrowRight') this.nextSlide();
                });

                // Handle touch/swipe for mobile
                let startX = 0;
                let endX = 0;

                sliderSection.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });

                sliderSection.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;

                    if (Math.abs(diff) > 50) { // Minimum swipe distance
                        if (diff > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                    }
                });
            }

            prevSlide() {
                this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
                this.updateSlider();
                this.resetAutoPlay();
            }

            nextSlide() {
                this.currentSlide = this.currentSlide === this.totalSlides - 1 ? 0 : this.currentSlide + 1;
                this.updateSlider();
                this.resetAutoPlay();
            }

            goToSlide(index) {
                this.currentSlide = index;
                this.updateSlider();
                this.resetAutoPlay();
            }

            updateSlider() {
                // Update slides
                this.slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === this.currentSlide);
                });

                // Update indicators
                this.indicators.forEach((dot, index) => {
                    dot.classList.toggle('active', index === this.currentSlide);
                });

                // Move slider container
                const translateX = -this.currentSlide * 100;
                this.sliderContainer.style.transform = `translateX(${translateX}%)`;
            }

            startAutoPlay() {
                this.autoPlayInterval = setInterval(() => {
                    this.nextSlide();
                }, this.autoPlayDelay);
            }

            stopAutoPlay() {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                    this.autoPlayInterval = null;
                }
            }

            resetAutoPlay() {
                this.stopAutoPlay();
                this.startAutoPlay();
            }

            destroy() {
                this.stopAutoPlay();
                // Remove event listeners if needed
            }
        }

        // Initialize the slider when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new HeroSlider();
        });

// Global state
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
let testimonialInterval;

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function getStoredConfig() {
    const stored = localStorage.getItem('healthcareProConfig');
    return stored ? JSON.parse(stored) : siteConfig;
}

function saveConfig() {
    localStorage.setItem('healthcareProConfig', JSON.stringify(siteConfig));
}

function applyConfig() {
    // Apply section visibility
    Object.keys(siteConfig.sectionVisibility).forEach(sectionKey => {
        const elements = document.querySelectorAll(`[data-section="${sectionKey}"]`);
        const isVisible = siteConfig.sectionVisibility[sectionKey];
        
        elements.forEach(element => {
            element.setAttribute('data-visible', isVisible);
            if (!isVisible) {
                element.style.display = 'none';
            } else {
                element.style.display = '';
            }
        });
    });
    
    // Apply service availability
    Object.keys(siteConfig.services).forEach(serviceKey => {
        const elements = document.querySelectorAll(`[data-service="${serviceKey}"]`);
        const isAvailable = siteConfig.services[serviceKey].available;
        
        elements.forEach(element => {
            element.setAttribute('data-available', isAvailable);
            if (!isAvailable) {
                element.style.opacity = '0.5';
                element.style.pointerEvents = 'none';
            } else {
                element.style.opacity = '';
                element.style.pointerEvents = '';
            }
        });
    });
    
    // Apply theme
    document.body.setAttribute('data-theme', siteConfig.theme.mode);
    document.body.setAttribute('data-color-theme', siteConfig.theme.colorPalette);
    document.body.setAttribute('data-font', siteConfig.theme.font);
}

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// ===== HEADER & NAVIGATION =====
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navMenu.classList.add('active');
    });
    
    navClose?.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const handleScroll = throttle(() => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update scroll to top button
        const scrollTop = document.getElementById('scroll-top');
        if (window.scrollY > 300) {
            scrollTop?.classList.add('visible');
        } else {
            scrollTop?.classList.remove('visible');
        }
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
    
    // Active nav link based on scroll position
    const updateActiveNavLink = throttle(() => {
        const sections = document.querySelectorAll('.section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    }, 50);
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== THEME CUSTOMIZATION =====
function initThemeCustomization() {
    const themeToggle = document.getElementById('theme-toggle');
    const colorPalette = document.getElementById('color-palette');
    const fontSelector = document.getElementById('font-selector');
    
    const colorPanel = document.getElementById('color-panel');
    const fontPanel = document.getElementById('font-panel');
    
    // Load saved theme
    const savedConfig = getStoredConfig();
    Object.assign(siteConfig, savedConfig);
    applyConfig();
    
    // Theme mode toggle
    themeToggle?.addEventListener('click', () => {
        siteConfig.theme.mode = siteConfig.theme.mode === 'light' ? 'dark' : 'light';
        applyConfig();
        saveConfig();
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.className = siteConfig.theme.mode === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
    
    // Color palette panel
    colorPalette?.addEventListener('click', (e) => {
        e.stopPropagation();
        colorPanel.classList.toggle('active');
        fontPanel.classList.remove('active');
    });
    
    // Font selector panel
    fontSelector?.addEventListener('click', (e) => {
        e.stopPropagation();
        fontPanel.classList.toggle('active');
        colorPanel.classList.remove('active');
    });
    
    // Close panels when clicking outside
    document.addEventListener('click', () => {
        colorPanel?.classList.remove('active');
        fontPanel?.classList.remove('active');
    });
    
    // Color theme selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            siteConfig.theme.colorPalette = theme;
            
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            applyConfig();
            saveConfig();
        });
    });
    
    // Font selection
    const fontOptions = document.querySelectorAll('.font-option');
    fontOptions.forEach(option => {
        option.addEventListener('click', () => {
            const font = option.getAttribute('data-font');
            siteConfig.theme.font = font;
            
            fontOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            applyConfig();
            saveConfig();
        });
    });
    
    // Set initial active states
    document.querySelector(`[data-theme="${siteConfig.theme.colorPalette}"]`)?.classList.add('active');
    document.querySelector(`[data-font="${siteConfig.theme.font}"]`)?.classList.add('active');
    
    // Update theme toggle icon
    const themeIcon = themeToggle?.querySelector('i');
    if (themeIcon) {
        themeIcon.className = siteConfig.theme.mode === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// ===== ANIMATED COUNTERS =====
function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== TESTIMONIALS SLIDER =====

function initTestimonialsSlider() {
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');
    const testimonials = Array.from(track.querySelectorAll('.testimonial-card'));
    let currentTestimonial = 0;
    let testimonialInterval;

    if (!testimonials.length) return;

    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.testimonial-dot');

    function updateTestimonials() {
        testimonials.forEach((card, index) => {
            card.classList.toggle('active', index === currentTestimonial);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });

        // Slide
        const offset = -currentTestimonial * 100;
        track.style.transform = `translateX(${offset}%)`;
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        updateTestimonials();
        resetAutoPlay();
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonials();
    }

    function prevTestimonial() {
        currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
        updateTestimonials();
    }

    function startAutoPlay() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function resetAutoPlay() {
        clearInterval(testimonialInterval);
        startAutoPlay();
    }

    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetAutoPlay();
    });

    const testimonialSection = document.getElementById('testimonials');
    testimonialSection.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    testimonialSection.addEventListener('mouseleave', startAutoPlay);

    updateTestimonials();
    startAutoPlay();
}


// ===== GALLERY FILTER =====
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const appointmentForm = document.getElementById('appointment-form');
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');
    
    // Set minimum date for appointment booking
    const appointmentDate = document.getElementById('appointment-date');
    if (appointmentDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        appointmentDate.min = tomorrow.toISOString().split('T')[0];
    }
    
    // Form submission handlers
    function handleFormSubmit(form, formType) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Show success message
                showNotification(`${formType} submitted successfully!`, 'success');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                console.log(`${formType} Data:`, data);
            }, 2000);
        });
    }
    
    if (appointmentForm) {
        handleFormSubmit(appointmentForm, 'Appointment');
    }
    
    if (contactForm) {
        handleFormSubmit(contactForm, 'Contact Form');
    }
    
    if (newsletterForm) {
        handleFormSubmit(newsletterForm, 'Newsletter Subscription');
    }
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .department-card, .team-member, .blog-card, .contact-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(element);
    });
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('.main');
    if (main) {
        main.id = 'main';
        main.setAttribute('role', 'main');
    }
    
    // Enhance form accessibility
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const label = form.querySelector(`label[for="${input.id}"]`);
            if (!label && input.id) {
                input.setAttribute('aria-label', input.placeholder || input.name);
            }
        });
    });
    
    // Add ARIA labels to buttons without text
    const iconButtons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    iconButtons.forEach(button => {
        const icon = button.querySelector('i');
        if (icon && !button.textContent.trim()) {
            const iconClass = icon.className;
            let label = 'Button';
            
            if (iconClass.includes('fa-bars')) label = 'Open menu';
            else if (iconClass.includes('fa-times')) label = 'Close menu';
            else if (iconClass.includes('fa-moon')) label = 'Toggle dark mode';
            else if (iconClass.includes('fa-sun')) label = 'Toggle light mode';
            else if (iconClass.includes('fa-palette')) label = 'Change color theme';
            else if (iconClass.includes('fa-font')) label = 'Change font';
            else if (iconClass.includes('fa-chevron-up')) label = 'Scroll to top';
            
            button.setAttribute('aria-label', label);
        }
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // Optimize images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.loading) {
            img.loading = 'lazy';
        }
        if (!img.decoding) {
            img.decoding = 'async';
        }
    });
}

// ===== ERROR HANDLING =====
function initErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('JavaScript Error:', event.error);
        // You could send this to an error reporting service
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise Rejection:', event.reason);
        // You could send this to an error reporting service
    });
}

// ===== MAIN INITIALIZATION =====
function init() {
    // Load configuration
    const savedConfig = getStoredConfig();
    Object.assign(siteConfig, savedConfig);
    
    // Initialize all modules
    initPreloader();
    initNavigation();
    initThemeCustomization();
    initAnimatedCounters();
    initTestimonialsSlider();
    initGalleryFilter();
    initFormHandling();
    initScrollToTop();
    initScrollAnimations();
    initLazyLoading();
    initAccessibility();
    initPerformanceOptimizations();
    initErrorHandling();
    
    // Apply initial configuration
    applyConfig();
    
    console.log('HealthCare Pro initialized successfully!');
}

// ===== JQUERY INTEGRATION =====
$(document).ready(function() {
    // jQuery-specific enhancements
    
    // Smooth hover effects for service cards
    $('.service-card').hover(
        function() {
            $(this).find('.service-icon').addClass('animate__pulse');
        },
        function() {
            $(this).find('.service-icon').removeClass('animate__pulse');
        }
    );
    
    // Enhanced form validation
    $('form').on('submit', function(e) {
        const form = $(this);
        const requiredFields = form.find('[required]');
        let isValid = true;
        
        requiredFields.each(function() {
            const field = $(this);
            const value = field.val().trim();
            
            if (!value) {
                field.addClass('error');
                isValid = false;
            } else {
                field.removeClass('error');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showNotification('Please fill in all required fields.', 'error');
        }
    });
    
    // Remove error class on input
    $('input, select, textarea').on('input change', function() {
        $(this).removeClass('error');
    });
    
    // Appointment button click handlers
    $('.appointment-btn, .btn:contains("Book Appointment")').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#appointments').offset().top - 80
        }, 800);
    });
    
    // Service card interactions
    $('.service-btn').on('click', function(e) {
        e.preventDefault();
        const serviceCard = $(this).closest('.service-card');
        const serviceTitle = serviceCard.find('.service-title').text();
        
        showNotification(`Learn more about ${serviceTitle} - Feature coming soon!`, 'info');
    });
    
    // Team member social links
    $('.member-social a').on('click', function(e) {
        e.preventDefault();
        showNotification('Social media integration coming soon!', 'info');
    });
    
    // Gallery item clicks
    $('.gallery-btn').on('click', function(e) {
        e.preventDefault();
        const galleryItem = $(this).closest('.gallery-item');
        const title = galleryItem.find('h4').text();
        
        showNotification(`${title} - Full gallery view coming soon!`, 'info');
    });
    
    // Blog link clicks
    $('.blog-link').on('click', function(e) {
        e.preventDefault();
        const blogTitle = $(this).closest('.blog-card').find('.blog-title').text();
        
        showNotification(`"${blogTitle}" - Full article coming soon!`, 'info');
    });
    
    // Newsletter form enhancement
    $('#newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        
        if (email) {
            $(this).find('input').val('');
            showNotification('Thank you for subscribing to our newsletter!', 'success');
        }
    });
    
    // Parallax effect for hero section
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        const parallax = $('.hero');
        // const speed = 0.1;
        
        parallax.css('transform', `translateY(${scrolled * speed}px)`);
    });
    
    // Initialize tooltips for team member details
    $('.member-details span').each(function() {
        $(this).attr('title', $(this).text());
    });
    
    console.log('jQuery enhancements loaded successfully!');
});

// ===== START APPLICATION =====
// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for potential external use
window.HealthCareProApp = {
    config: siteConfig,
    applyConfig,
    saveConfig,
    showNotification
};


document.addEventListener('DOMContentLoaded', function() {
            // Department Section data with slider functionality
            const departments = [
                {
                    icon: 'fa-heart',
                    title: 'Cardiology Department',
                    description: 'Advanced cardiac care with state-of-the-art equipment and experienced cardiologists.',
                    stats: [
                        { icon: 'fa-user-md', text: '8 Specialists' },
                        { icon: 'fa-bed', text: '25 Beds' }
                    ]
                },
                {
                    icon: 'fa-user-injured',
                    title: 'Emergency Department',
                    description: '24/7 emergency services with rapid response team for critical situations.',
                    stats: [
                        { icon: 'fa-user-md', text: '12 Specialists' },
                        { icon: 'fa-clock', text: '24/7 Available' }
                    ]
                },
                {
                    icon: 'fa-cut',
                    title: 'Surgery Department',
                    description: 'Modern operating theaters with advanced surgical equipment and expert surgeons.',
                    stats: [
                        { icon: 'fa-user-md', text: '15 Surgeons' },
                        { icon: 'fa-procedures', text: '8 OR Rooms' }
                    ]
                },
                {
                    icon: 'fa-x-ray',
                    title: 'Radiology Department',
                    description: 'Comprehensive imaging services including MRI, CT, X-ray, and ultrasound.',
                    stats: [
                        { icon: 'fa-user-md', text: '6 Radiologists' },
                        { icon: 'fa-microscope', text: 'Latest Tech' }
                    ]
                },
                {
                    icon: 'fa-brain',
                    title: 'Neurology Department',
                    description: 'Specialized care for disorders of the nervous system with cutting-edge treatments.',
                    stats: [
                        { icon: 'fa-user-md', text: '7 Neurologists' },
                        { icon: 'fa-brain', text: 'Advanced Care' }
                    ]
                },
                {
                    icon: 'fa-baby',
                    title: 'Pediatrics Department',
                    description: 'Compassionate care for infants, children and adolescents with specialized equipment.',
                    stats: [
                        { icon: 'fa-user-md', text: '10 Pediatricians' },
                        { icon: 'fa-child', text: 'Child-Friendly' }
                    ]
                }
            ];

            // Function to create department cards
            function createDepartmentCard(department) {
                const card = document.createElement('div');
                card.className = 'department-card';
                
                const header = document.createElement('div');
                header.className = 'department-header';
                
                const icon = document.createElement('i');
                icon.className = `fas ${department.icon}`;
                
                const title = document.createElement('h3');
                title.textContent = department.title;
                
                header.appendChild(icon);
                header.appendChild(title);
                
                const description = document.createElement('p');
                description.textContent = department.description;
                
                const statsContainer = document.createElement('div');
                statsContainer.className = 'department-stats';
                
                department.stats.forEach(stat => {
                    const statElement = document.createElement('span');
                    
                    const statIcon = document.createElement('i');
                    statIcon.className = `fas ${stat.icon}`;
                    
                    const statText = document.createTextNode(` ${stat.text}`);
                    
                    statElement.appendChild(statIcon);
                    statElement.appendChild(statText);
                    statsContainer.appendChild(statElement);
                });
                
                card.appendChild(header);
                card.appendChild(description);
                card.appendChild(statsContainer);
                
                return card;
            }

            // Insert cards into the track
            const track = document.getElementById('departments-track');
            departments.forEach(dept => {
                track.appendChild(createDepartmentCard(dept));
            });

            // Slider functionality
            const slider = document.querySelector('.departments-slider');
            const prevBtn = document.querySelector('.slider-nav.prev');
            const nextBtn = document.querySelector('.slider-nav.next');
            const cards = document.querySelectorAll('.department-card');
            
            if (cards.length > 0) {
                const cardStyle = window.getComputedStyle(cards[0]);
                const cardWidth = cards[0].offsetWidth + 
                                 parseInt(cardStyle.marginLeft) + 
                                 parseInt(cardStyle.marginRight);
                
                let currentPosition = 0;
                const cardsPerView = 3;
                const maxPosition = -(cards.length - cardsPerView) * cardWidth;
                
                function updateSlider() {
                    track.style.transform = `translateX(${currentPosition}px)`;
                    
                    // Disable/enable buttons based on position
                    prevBtn.disabled = currentPosition === 0;
                    nextBtn.disabled = currentPosition <= maxPosition;
                }
                
                prevBtn.addEventListener('click', () => {
                    currentPosition = Math.min(currentPosition + (cardWidth * cardsPerView), 0);
                    updateSlider();
                });
                
                nextBtn.addEventListener('click', () => {
                    currentPosition = Math.max(currentPosition - (cardWidth * cardsPerView), maxPosition);
                    updateSlider();
                });
                
                // Handle responsive changes
                function handleResize() {
                    const newCardWidth = cards[0].offsetWidth + 
                                     parseInt(window.getComputedStyle(cards[0]).marginLeft) + 
                                     parseInt(window.getComputedStyle(cards[0]).marginRight);
                    const newMaxPosition = -(cards.length - cardsPerView) * newCardWidth;
                    
                    // Adjust current position proportionally
                    if (cardWidth > 0 && newCardWidth > 0) {
                        currentPosition = (currentPosition / cardWidth) * newCardWidth;
                    }
                    
                    currentPosition = Math.max(currentPosition, newMaxPosition);
                    currentPosition = Math.min(currentPosition, 0);
                    
                    updateSlider();
                }
                
                window.addEventListener('resize', handleResize);
                
                // Initialize
                updateSlider();
            }
            
            // View All button functionality
            const viewAllBtn = document.querySelector('.view-all-btn');
            viewAllBtn.addEventListener('click', function() {
                alert('View all departments functionality would go here!');
                // In a real implementation, this might link to another page or expand all cards
            });
        });




         document.addEventListener('DOMContentLoaded', function() {
            // Team data
            const teamMembers = [
                {
                    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
                    name: 'Dr. Sarah Johnson',
                    role: 'Chief Cardiologist',
                    specialization: 'Interventional Cardiology',
                    details: [
                        { icon: 'fa-graduation-cap', text: 'Harvard Medical School' },
                        { icon: 'fa-award', text: '20+ Years Experience' }
                    ]
                },
                {
                    image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
                    name: 'Dr. Michael Chen',
                    role: 'Neurosurgeon',
                    specialization: 'Brain & Spine Surgery',
                    details: [
                        { icon: 'fa-graduation-cap', text: 'Johns Hopkins' },
                        { icon: 'fa-award', text: '15+ Years Experience' }
                    ]
                },
                {
                    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
                    name: 'Dr. Emily Davis',
                    role: 'Pediatrician',
                    specialization: 'Child Healthcare',
                    details: [
                        { icon: 'fa-graduation-cap', text: 'Stanford Medical' },
                        { icon: 'fa-award', text: '12+ Years Experience' }
                    ]
                },
                {
                    image: 'https://images.pexels.com/photos/8442820/pexels-photo-8442820.jpeg?auto=compress&cs=tinysrgb&w=400',
                    name: 'Dr. James Wilson',
                    role: 'Orthopedic Surgeon',
                    specialization: 'Joint Replacement',
                    details: [
                        { icon: 'fa-graduation-cap', text: 'Mayo Clinic' },
                        { icon: 'fa-award', text: '18+ Years Experience' }
                    ]
                },
                {
                    image: 'https://images.pexels.com/photos/8376181/pexels-photo-8376181.jpeg?auto=compress&cs=tinysrgb&w=400',
                    name: 'Dr. Rachel Kim',
                    role: 'Dermatologist',
                    specialization: 'Skin Care Specialist',
                    details: [
                        { icon: 'fa-graduation-cap', text: 'Yale Medical' },
                        { icon: 'fa-award', text: '10+ Years Experience' }
                    ]
                },
                {
                    image: 'https://images.pexels.com/photos/8376185/pexels-photo-8376185.jpeg?auto=compress&cs=tinysrgb&w=400',
                    name: 'Dr. David Miller',
                    role: 'Oncologist',
                    specialization: 'Cancer Treatment',
                    details: [
                        { icon: 'fa-graduation-cap', text: 'Duke University' },
                        { icon: 'fa-award', text: '14+ Years Experience' }
                    ]
                }
            ];

            // Function to create team member cards
            function createTeamMember(member) {
                const memberCard = document.createElement('div');
                memberCard.className = 'team-member';
                
                // Image with overlay
                const imageDiv = document.createElement('div');
                imageDiv.className = 'member-image';
                
                const img = document.createElement('img');
                img.src = member.image;
                img.alt = member.name;
                
                const overlay = document.createElement('div');
                overlay.className = 'member-overlay';
                
                const social = document.createElement('div');
                social.className = 'member-social';
                
                // Social links
                const socialLinks = [
                    { icon: 'fa-linkedin', url: '#' },
                    { icon: 'fa-twitter', url: '#' },
                    { icon: 'fa-envelope', url: '#' }
                ];
                
                socialLinks.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    
                    const i = document.createElement('i');
                    i.className = `fab ${link.icon}`;
                    if (link.icon === 'fa-envelope') {
                        i.className = `fas ${link.icon}`;
                    }
                    
                    a.appendChild(i);
                    social.appendChild(a);
                });
                
                overlay.appendChild(social);
                imageDiv.appendChild(img);
                imageDiv.appendChild(overlay);
                
                // Member info
                const infoDiv = document.createElement('div');
                infoDiv.className = 'member-info';
                
                const name = document.createElement('h3');
                name.className = 'member-name';
                name.textContent = member.name;
                
                const role = document.createElement('p');
                role.className = 'member-role';
                role.textContent = member.role;
                
                const specialization = document.createElement('p');
                specialization.className = 'member-specialization';
                specialization.textContent = member.specialization;
                
                const details = document.createElement('div');
                details.className = 'member-details';
                
                member.details.forEach(detail => {
                    const span = document.createElement('span');
                    
                    const icon = document.createElement('i');
                    icon.className = `fas ${detail.icon}`;
                    
                    const text = document.createTextNode(` ${detail.text}`);
                    
                    span.appendChild(icon);
                    span.appendChild(text);
                    details.appendChild(span);
                });
                
                infoDiv.appendChild(name);
                infoDiv.appendChild(role);
                infoDiv.appendChild(specialization);
                infoDiv.appendChild(details);
                
                memberCard.appendChild(imageDiv);
                memberCard.appendChild(infoDiv);
                
                return memberCard;
            }

            // Insert team members into the track
            const teamTrack = document.getElementById('team-track');
            teamMembers.forEach(member => {
                teamTrack.appendChild(createTeamMember(member));
            });

            // Slider functionality
            const slider = document.querySelector('.team-slider');
            const prevBtn = document.querySelector('.team-slider-nav.prev');
            const nextBtn = document.querySelector('.team-slider-nav.next');
            const members = document.querySelectorAll('.team-member');
            
            if (members.length > 0) {
                const memberStyle = window.getComputedStyle(members[0]);
                const memberWidth = members[0].offsetWidth + parseInt(memberStyle.marginRight);
                const membersPerView = 3;
                let currentPosition = 0;
                const maxPosition = -(teamMembers.length - membersPerView) * memberWidth;
                
                function updateSlider() {
                    teamTrack.style.transform = `translateX(${currentPosition}px)`;
                    
                    // Disable/enable buttons based on position
                    prevBtn.disabled = currentPosition === 0;
                    nextBtn.disabled = currentPosition <= maxPosition;
                }
                
                prevBtn.addEventListener('click', () => {
                    currentPosition = Math.min(currentPosition + (memberWidth * membersPerView), 0);
                    updateSlider();
                });
                
                nextBtn.addEventListener('click', () => {
                    currentPosition = Math.max(currentPosition - (memberWidth * membersPerView), maxPosition);
                    updateSlider();
                });
                
                // Handle responsive changes
                window.addEventListener('resize', function() {
                    const newMemberWidth = members[0].offsetWidth + parseInt(getComputedStyle(members[0]).marginRight);
                    const newMaxPosition = -(teamMembers.length - membersPerView) * newMemberWidth;
                    
                    // Adjust current position proportionally
                    if (memberWidth > 0 && newMemberWidth > 0) {
                        currentPosition = (currentPosition / memberWidth) * newMemberWidth;
                    }
                    
                    currentPosition = Math.max(currentPosition, newMaxPosition);
                    currentPosition = Math.min(currentPosition, 0);
                    
                    updateSlider();
                });
                
                // Initialize
                updateSlider();
            }
            
            // View All functionality
            const viewAllBtn = document.getElementById('team-view-all-btn');
            const teamGrid = document.getElementById('team-grid');
            const teamSection = document.querySelector('.team');
            
            // Create cards for grid view
            teamMembers.forEach(member => {
                teamGrid.appendChild(createTeamMember(member));
            });
            
            // View All button functionality
            viewAllBtn.addEventListener('click', function() {
                teamSection.classList.toggle('view-all-active');
                viewAllBtn.textContent = teamSection.classList.contains('view-all-active') 
                    ? 'Show Less' 
                    : 'View All Team Members';
            });
        });

          // Mini header interactive elements
        document.querySelectorAll('.healthcare-mini-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const text = item.querySelector('span').textContent;
                console.log(`Clicked: ${text}`);
                // Add your functionality here
            });
        });

        // Quick action buttons
        document.querySelectorAll('.healthcare-mini-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Quick action: ${btn.textContent.trim()}`);
                // Add your functionality here
            });
        });
        

    // Book Appointment section 2.0 Handlers of timing

         let selectedSlot = null;
        let currentDate = new Date('2025-06-24');

        function selectSlot(slot) {
            // Remove previous selection
            if (selectedSlot) {
                selectedSlot.classList.remove('doc-selected');
            }
            
            // Select new slot
            slot.classList.add('doc-selected');
            selectedSlot = slot;
            
            // Enable book button
            const bookButton = document.getElementById('bookButton');
            bookButton.disabled = false;
            bookButton.textContent = `Book Appointment - ${slot.textContent}`;
        }

        function changeDate(direction) {
            currentDate.setDate(currentDate.getDate() + direction);
            const dateElement = document.getElementById('currentDate');
            dateElement.textContent = currentDate.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            });
            
            // Clear selected slot when date changes
            if (selectedSlot) {
                selectedSlot.classList.remove('doc-selected');
                selectedSlot = null;
                const bookButton = document.getElementById('bookButton');
                bookButton.disabled = true;
                bookButton.textContent = 'Select Time Slot to Book';
            }
        }

        function bookAppointment() {
            if (selectedSlot) {
                const date = document.getElementById('currentDate').textContent;
                const time = selectedSlot.textContent;
                alert(`Appointment booked successfully!\n\nDoctor: Dr. Ganesh Sharma\nDate: ${date}\nTime: ${time}\n\nYou will receive a confirmation email shortly.`);
            }
        }