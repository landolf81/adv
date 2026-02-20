/**
 * 선남농협 자재센터 랜딩페이지 스크립트
 */

(function() {
    'use strict';

    // ========================================
    // 카운트다운 타이머
    // ========================================
    function initCountdown() {
        const eventDate = new Date('2025-02-23T09:00:00+09:00'); // 행사 시작일
        
        function updateCountdown() {
            const now = new Date();
            const diff = eventDate - now;
            
            if (diff <= 0) {
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ========================================
    // 스크롤 애니메이션 (Intersection Observer)
    // ========================================
    function initScrollAnimations() {
        const productCards = document.querySelectorAll('.product-card');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        productCards.forEach(card => {
            observer.observe(card);
        });
    }

    // ========================================
    // 페이지 공유 기능
    // ========================================
    window.sharePage = function() {
        const shareData = {
            title: '선남농협 자재센터 확장이전 기념 파격행사',
            text: '선남농협 자재센터 확장이전 기념 파격할인 행사! 한정수량 특가 제품을 확인하세요.',
            url: window.location.href
        };
        
        if (navigator.share) {
            navigator.share(shareData)
                .catch(console.error);
        } else {
            // 클립보드에 복사
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = window.location.href;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert('링크가 복사되었습니다!');
        }
    };

    // ========================================
    // 스무스 스크롤
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ========================================
    // 이미지 레이지 로딩 폴백
    // ========================================
    function initLazyLoadFallback() {
        if ('loading' in HTMLImageElement.prototype) {
            return; // 브라우저가 네이티브 지원
        }
        
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // 터치 피드백 개선
    // ========================================
    function initTouchFeedback() {
        const touchElements = document.querySelectorAll('.product-card, .contact-card, .map-btn');
        
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            el.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }

    // ========================================
    // 페이지 로드 완료 시 초기화
    // ========================================
    function init() {
        initCountdown();
        initScrollAnimations();
        initSmoothScroll();
        initLazyLoadFallback();
        initTouchFeedback();
        
        // iOS Safari 100vh 버그 대응
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVh();
        window.addEventListener('resize', setVh);
    }

    // DOM 로드 완료 시 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
