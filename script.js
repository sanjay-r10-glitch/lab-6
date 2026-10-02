// ==========================================================================
// THE GRAND MIRAMARE - INTERACTIVE SCRIPT
// Handles navigation scroll effects, mobile menu, and form submission
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Header elevation on scroll
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
            header.style.borderBottomColor = 'rgba(223, 186, 115, 0.4)';
        } else {
            header.style.boxShadow = 'none';
            header.style.borderBottomColor = 'rgba(223, 186, 115, 0.18)';
        }
    });

    // 3. Active link highlighter on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Set minimum date for arrival input to today
    const arrivalInput = document.getElementById('arrival-date');
    if (arrivalInput) {
        const today = new Date().toISOString().split('T')[0];
        arrivalInput.min = today;
    }
});

// Form submission handler with visual feedback
function showConfirmation() {
    const nameInput = document.getElementById('guest-name');
    const emailInput = document.getElementById('guest-email');
    const feedbackEl = document.getElementById('form-feedback');
    const form = document.getElementById('inquiryForm');

    if (!nameInput.value || !emailInput.value) {
        return;
    }

    feedbackEl.className = 'form-feedback-message feedback-success';
    feedbackEl.innerHTML = `
        <i class="fa-solid fa-circle-check"></i> 
        Thank you, <strong>${nameInput.value}</strong>. Your private availability inquiry has been dispatched to our Head Concierge. An invitation response will be delivered to <em>${emailInput.value}</em> within 2 hours.
    `;

    form.reset();

    // Reset feedback after 8 seconds
    setTimeout(() => {
        feedbackEl.innerHTML = '';
        feedbackEl.className = 'form-feedback-message';
    }, 8000);
}
