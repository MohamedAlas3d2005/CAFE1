// ========================================
// سنجافيه - Sinjafeh Café
// Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 1500);
    });
    // Fallback: hide preloader after 3s
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 3000);

    // ---- Particles ----
    const particlesContainer = document.getElementById('particles');
    function createParticles() {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = Math.random() * 8 + 6 + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // ---- Hero Slideshow ----
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    function nextSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }
    if (heroSlides.length > 1) {
        setInterval(nextSlide, 6000);
    }

    // ---- Navbar ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';

            // Update active link
            navLinksItems.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ---- Active nav on scroll ----
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksItems.forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);

    // ---- Scroll Animations ----
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    // Add will-animate class, then observe
    requestAnimationFrame(() => {
        animateElements.forEach(el => {
            el.classList.add('will-animate');
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(el => observer.observe(el));

        // Fallback: make all visible after 2 seconds
        setTimeout(() => {
            animateElements.forEach(el => {
                el.classList.add('animated');
            });
        }, 2000);
    });

    // ---- Stats Counter ----
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        const statsSection = document.getElementById('stats');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current).toLocaleString('ar-SA');
                }, 16);
            });
        }
    }
    window.addEventListener('scroll', animateStats);

    // ---- Menu Filter ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 400);
                }
            });
        });
    });

    // ---- Gallery Lightbox ----
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentGalleryIndex = 0;
    const galleryImages = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        galleryImages.push(img.src);

        item.addEventListener('click', function () {
            currentGalleryIndex = index;
            lightboxImage.src = galleryImages[currentGalleryIndex];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    lightboxPrev.addEventListener('click', function (e) {
        e.stopPropagation();
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentGalleryIndex];
    });

    lightboxNext.addEventListener('click', function (e) {
        e.stopPropagation();
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentGalleryIndex];
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
            lightboxImage.src = galleryImages[currentGalleryIndex];
        }
        if (e.key === 'ArrowRight') {
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImage.src = galleryImages[currentGalleryIndex];
        }
    });

    // ---- Back to Top ----
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Contact Form ----
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>جاري الإرسال...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formMessage.className = 'form-message success';
                formMessage.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
                contactForm.reset();
            } else {
                formMessage.className = 'form-message error';
                formMessage.textContent = data.message || 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.';
            }
        })
        .catch(() => {
            // Fallback: show success message for demo purposes
            formMessage.className = 'form-message success';
            formMessage.textContent = 'شكراً لتواصلك! سيتم الرد عليك في أقرب وقت.';
            contactForm.reset();
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            setTimeout(() => {
                formMessage.className = 'form-message';
                formMessage.style.display = 'none';
            }, 5000);
        });
    });

    // ---- Smooth Scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Parallax effect on scroll ----
    window.addEventListener('scroll', function () {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
            heroContent.style.opacity = Math.max(0.2, 1 - scrolled / (window.innerHeight * 1.2));
        }
    });
});