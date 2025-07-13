// ==========================================
// HACKER PORTFOLIO JAVASCRIPT
// ==========================================

// Global variables
let matrixCanvas;
let matrixContext;
let matrixChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()[]{}|;:,.<>?";
let matrixColumns = [];
let matrixDrops = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initMatrix();
    initTypingAnimation();
    initNavbarToggle();
    initContactForm();
    initSkillsAnimation();
    initScrollAnimations();
    initThemeEffects();
});

// ==========================================
// MATRIX BACKGROUND ANIMATION
// ==========================================

function initMatrix() {
    matrixCanvas = document.getElementById('matrix-canvas');
    if (!matrixCanvas) return;
    
    matrixContext = matrixCanvas.getContext('2d');
    
    // Set canvas size
    resizeMatrix();
    
    // Initialize drops
    const fontSize = 14;
    matrixColumns = Math.floor(matrixCanvas.width / fontSize);
    
    for (let i = 0; i < matrixColumns; i++) {
        matrixDrops[i] = 1;
    }
    
    // Start animation
    setInterval(drawMatrix, 50);
    
    // Resize on window resize
    window.addEventListener('resize', resizeMatrix);
}

function resizeMatrix() {
    if (!matrixCanvas) return;
    
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
}

function drawMatrix() {
    if (!matrixContext) return;
    
    // Semi-transparent background to create fading effect
    matrixContext.fillStyle = 'rgba(10, 10, 10, 0.04)';
    matrixContext.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    // Matrix rain effect
    matrixContext.fillStyle = '#00ff41';
    matrixContext.font = '14px monospace';
    
    for (let i = 0; i < matrixDrops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        matrixContext.fillText(char, i * 14, matrixDrops[i] * 14);
        
        // Reset drop if it reaches bottom or random reset
        if (matrixDrops[i] * 14 > matrixCanvas.height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
        }
        
        matrixDrops[i]++;
    }
}

// ==========================================
// TYPING ANIMATION
// ==========================================

function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const messages = [
        "Welcome to Irfan's Cyber Space...",
        "Initializing security protocols...",
        "Accessing mainframe...",
        "Ready for digital exploration!"
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeMessage() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentMessage.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
        }
        
        setTimeout(typeMessage, typingSpeed);
    }
    
    // Start typing animation
    typeMessage();
}

// ==========================================
// NAVBAR TOGGLE
// ==========================================

function initNavbarToggle() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ==========================================
// CONTACT FORM
// ==========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button state
            btnText.style.display = 'flex';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Reset input borders
            document.querySelectorAll('.input-border').forEach(border => {
                border.style.width = '0';
            });
        }, 2000);
    });
    
    // Input focus effects
    const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const border = this.nextElementSibling;
            if (border && border.classList.contains('input-border')) {
                border.style.width = '100%';
            }
        });
        
        input.addEventListener('blur', function() {
            const border = this.nextElementSibling;
            if (border && border.classList.contains('input-border') && this.value === '') {
                border.style.width = '0';
            }
        });
    });
}

// ==========================================
// SKILLS ANIMATION
// ==========================================

function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const skillLevel = bar.getAttribute('data-skill');
            bar.style.width = skillLevel + '%';
        });
    };
    
    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const skillsSection = document.querySelector('.skills-preview');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    // Fade in animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .about-card, .access-card, .stat-card, .faq-item, .achievement-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// THEME EFFECTS
// ==========================================

function initThemeEffects() {
    // Glow effect on hover for interactive elements
    const glowElements = document.querySelectorAll('.btn, .nav-link, .social-link, .project-card, .skill-card');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Terminal cursor blink
    const cursors = document.querySelectorAll('.cursor');
    cursors.forEach(cursor => {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    });
    
    // Random glitch effect on terminal prompts
    const prompts = document.querySelectorAll('.terminal-prompt');
    prompts.forEach(prompt => {
        setInterval(() => {
            if (Math.random() > 0.98) {
                prompt.style.textShadow = '2px 0 #ff0000, -2px 0 #00ffff';
                setTimeout(() => {
                    prompt.style.textShadow = '';
                }, 100);
            }
        }, 100);
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff41' : '#ff0000'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-family: 'Fira Code', monospace;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ==========================================
// ADDITIONAL INTERACTIVE FEATURES
// ==========================================

// Terminal window minimize/maximize effects
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-minimize')) {
        const terminal = e.target.closest('.terminal-window');
        terminal.style.transform = 'scale(0.8)';
        terminal.style.opacity = '0.5';
        setTimeout(() => {
            terminal.style.transform = 'scale(1)';
            terminal.style.opacity = '1';
        }, 500);
    }
    
    if (e.target.classList.contains('btn-maximize')) {
        const terminal = e.target.closest('.terminal-window');
        terminal.style.transform = 'scale(1.05)';
        setTimeout(() => {
            terminal.style.transform = 'scale(1)';
        }, 300);
    }
    
    if (e.target.classList.contains('btn-close')) {
        const terminal = e.target.closest('.terminal-window');
        terminal.style.transform = 'scale(0)';
        terminal.style.opacity = '0';
        setTimeout(() => {
            terminal.style.transform = 'scale(1)';
            terminal.style.opacity = '1';
        }, 1000);
    }
});

// Project card image loading with placeholder
document.addEventListener('DOMContentLoaded', function() {
    const projectImages = document.querySelectorAll('.project-image img');
    
    projectImages.forEach(img => {
        // Create placeholder
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #111, #222);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00ff41;
            font-size: 2rem;
            position: absolute;
            top: 0;
            left: 0;
        `;
        placeholder.innerHTML = '<i class="fas fa-image"></i>';
        
        // Insert placeholder
        img.parentNode.insertBefore(placeholder, img);
        
        // Handle image load
        img.addEventListener('load', function() {
            placeholder.style.opacity = '0';
            setTimeout(() => {
                placeholder.remove();
            }, 500);
        });
        
        // Handle image error
        img.addEventListener('error', function() {
            placeholder.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            placeholder.style.color = '#ff0000';
        });
    });
});

// FAQ accordion effect
document.addEventListener('click', function(e) {
    if (e.target.closest('.faq-question')) {
        const faqItem = e.target.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        
        // Toggle answer visibility
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            answer.style.opacity = '0';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
        }
    }
});

// Status indicator animation
setInterval(() => {
    const statusValues = document.querySelectorAll('.status-value');
    statusValues.forEach(status => {
        if (Math.random() > 0.95) {
            status.style.textShadow = '0 0 5px currentColor';
            setTimeout(() => {
                status.style.textShadow = '';
            }, 200);
        }
    });
}, 1000);

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

// Konami code easter egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateHackerMode();
        konamiCode = [];
    }
});

function activateHackerMode() {
    // Add more intense matrix effect
    const style = document.createElement('style');
    style.textContent = `
        .matrix-bg { opacity: 0.3 !important; }
        .glow { animation-duration: 0.5s !important; }
        * { cursor: crosshair !important; }
    `;
    document.head.appendChild(style);
    
    // Show hacker message
    showNotification('🚀 HACKER MODE ACTIVATED! 🚀', 'success');
    
    // Remove after 10 seconds
    setTimeout(() => {
        document.head.removeChild(style);
        showNotification('Hacker mode deactivated', 'success');
    }, 10000);
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🚀 Page loaded in ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('⚠️  Page load time is slow. Consider optimizing images and scripts.');
        }
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('🔴 JavaScript Error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Console message for developers
console.log(`
    🚀 Welcome to Irfan's Cyber Space!
    
    ┌─────────────────────────────────────┐
    │  System Status: ONLINE              │
    │  Security Level: MAXIMUM            │
    │  Hacker Mode: Try the Konami Code!  │
    └─────────────────────────────────────┘
    
    Built with ❤️ and lots of ☕
    
    Looking for easter eggs? Try:
    ↑ ↑ ↓ ↓ ← → ← → B A
`);

// PWA Service Worker Registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add PWA functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}