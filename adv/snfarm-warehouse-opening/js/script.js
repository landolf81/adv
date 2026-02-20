/**
 * 선남농협 영농자재센터 랜딩페이지 스크립트
 */

(function() {
    'use strict';

    // ========================================
    // 카운트다운 타이머
    // ========================================
    function initCountdown() {
        const eventDate = new Date('2026-02-23T09:00:00+09:00');
        const countdownEl = document.getElementById('countdown');
        const activeMsgEl = document.getElementById('eventActiveMsg');

        function updateCountdown() {
            const now = new Date();
            const diff = eventDate - now;

            // 행사 시작 후: 카운트다운 숨기고 "행사 진행중" 표시
            if (diff <= 0) {
                if (countdownEl) countdownEl.style.display = 'none';
                if (activeMsgEl) activeMsgEl.style.display = 'block';
                return;
            }

            // 행사 시작 전: 카운트다운 표시
            if (countdownEl) countdownEl.style.display = 'flex';
            if (activeMsgEl) activeMsgEl.style.display = 'none';

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

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        productCards.forEach(card => observer.observe(card));
    }

    // ========================================
    // 페이지 공유 기능
    // ========================================
    var LANDING_URL = 'https://nh.seonnam.com/adv/snfarm-warehouse-opening/';

    window.sharePage = function() {
        var shareText = '선남농협 영농자재센터 확장이전 기념 파격할인 행사!\n한정수량 특가 제품을 확인하세요.\n\n' + LANDING_URL;

        if (navigator.share) {
            navigator.share({
                title: '선남농협 영농자재센터 확장이전 기념 파격행사',
                text: '선남농협 영농자재센터 확장이전 기념 파격할인 행사!\n한정수량 특가 제품을 확인하세요.',
                url: LANDING_URL
            }).catch(function() {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareText).then(function() {
                alert('링크가 복사되었습니다!');
            }).catch(function() {
                fallbackCopyToClipboard(shareText);
            });
        } else {
            fallbackCopyToClipboard(shareText);
        }
    };

    function fallbackCopyToClipboard(text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            alert('링크가 복사되었습니다!');
        } catch (e) {
            alert('링크를 복사할 수 없습니다. 주소를 직접 복사해주세요.');
        }
        document.body.removeChild(textarea);
    }

    // ========================================
    // 페이지 로드 완료 시 초기화
    // ========================================
    function init() {
        initCountdown();
        initScrollAnimations();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
