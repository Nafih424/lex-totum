/**
 * LEX TOTUM - CLIENT-SIDE INTERACTIVE SCRIPTS
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. STICKY NAV & BACK-TO-TOP BUTTON SCROLL HANDLER
    const header = document.querySelector('.main-header');
    const backToTopBtn = document.getElementById('backToTop');
    
    const handleScrollEffects = () => {
        const scrollY = window.scrollY;
        
        // Sticky Header Toggle
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back To Top Visibility Toggle
        if (scrollY > 600) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };
    
    window.addEventListener('scroll', handleScrollEffects);
    
    // Smooth Scroll to Top on Button Click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 2. MOBILE NAVIGATION DRAWER
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMobileMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        mobileToggle.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
    };
    
    const closeMobileMenu = () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
    };
    
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once animated, no need to watch again
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% visible
        rootMargin: '0px 0px -50px 0px' // offset bottom slightly
    });
    
    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    // 4. ACTIVE NAVIGATION LINK ON WINDOW SCROLL
    const sections = document.querySelectorAll('section[id]');
    
    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        root: null,
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-20% 0px -50% 0px' // Adjust scroll focus box
    });
    
    sections.forEach(section => {
        activeLinkObserver.observe(section);
    });

    // 5. CONTACT FORM VALIDATION & HANDLING
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    const formFields = {
        name: {
            element: document.getElementById('formName'),
            error: document.getElementById('nameError'),
            validate: (val) => val.trim().length > 1
        },
        email: {
            element: document.getElementById('formEmail'),
            error: document.getElementById('emailError'),
            validate: (val) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(val.trim());
            }
        },
        subject: {
            element: document.getElementById('formSubject'),
            error: document.getElementById('subjectError'),
            validate: (val) => val.trim() !== ''
        },
        message: {
            element: document.getElementById('formMessage'),
            error: document.getElementById('messageError'),
            validate: (val) => val.trim().length > 9
        }
    };
    
    const validateField = (fieldKey) => {
        const field = formFields[fieldKey];
        const val = field.element.value;
        const isValid = field.validate(val);
        const group = field.element.closest('.form-group');
        
        if (isValid) {
            group.classList.remove('invalid');
        } else {
            group.classList.add('invalid');
        }
        
        return isValid;
    };
    
    // Add real-time validation feedback on input change
    Object.keys(formFields).forEach(key => {
        const input = formFields[key].element;
        input.addEventListener('blur', () => validateField(key));
        input.addEventListener('input', () => {
            const group = input.closest('.form-group');
            if (group.classList.contains('invalid')) {
                validateField(key);
            }
        });
    });
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        Object.keys(formFields).forEach(key => {
            const isFieldValid = validateField(key);
            if (!isFieldValid) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            formStatus.textContent = 'Please correct the invalid fields above.';
            formStatus.className = 'form-status error';
            return;
        }
        
        // Form is valid - Simulate premium submission animation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Securing Session Connection...';
        
        formStatus.style.display = 'none';
        
        setTimeout(() => {
            submitBtn.textContent = 'Sending Encrypted Data...';
            
            setTimeout(() => {
                // Success feedback
                formStatus.textContent = 'Case evaluation request received. A partner attorney will contact you securely within 12 hours.';
                formStatus.className = 'form-status success';
                
                // Clear the form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Remove visual status block after timeout
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 6000);
            }, 1200);
        }, 1000);
    });

    // 6. WHATSAPP WIDGET TOGGLE
    const whatsappBtn = document.getElementById('whatsappBtn');
    const whatsappPopup = document.getElementById('whatsappPopup');
    
    whatsappBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = whatsappPopup.classList.toggle('open');
        whatsappBtn.setAttribute('aria-expanded', isOpen);
    });
    
    // Close popup when clicking anywhere outside of it
    document.addEventListener('click', (e) => {
        if (!whatsappPopup.contains(e.target) && !whatsappBtn.contains(e.target)) {
            whatsappPopup.classList.remove('open');
            whatsappBtn.setAttribute('aria-expanded', 'false');
        }
    });
});
