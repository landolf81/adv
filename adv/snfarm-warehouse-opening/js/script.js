// Scroll Animation - Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    
    // Observe elements for scroll animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.animationPlayState = 'paused';
        animateOnScroll.observe(card);
    });

    // Observe sections
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(title);
    });

    // Handle section title animations
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-title').forEach(title => {
        titleObserver.observe(title);
    });

    // Contact button ripple effect
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Track scroll position for parallax-like effects
    let lastScrollY = window.scrollY;
    const headerBanner = document.querySelector('.header-banner');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Subtle parallax for header on scroll
        if (currentScrollY < 100) {
            headerBanner.style.transform = `translateY(${currentScrollY * 0.1}px)`;
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });

    // Prevent double-tap zoom on buttons
    document.querySelectorAll('.contact-btn, .product-card').forEach(el => {
        el.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        });
    });

    // Console welcome message
    console.log('🎉 선남농협 자재센터 확장이전 기념 파격행사 랜딩페이지');
    console.log('📱 모바일 최적화 페이지입니다.');
});
