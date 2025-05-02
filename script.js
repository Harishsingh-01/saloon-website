// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });
    testimonials[index].style.display = 'block';
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Initialize first testimonial
showTestimonial(0);

// Services Slider
const sliderContainer = document.querySelector('.slider-container');
const serviceCategories = document.querySelectorAll('.service-category');
const prevBtn = document.querySelector('.services-slider .prev-btn');
const nextBtn = document.querySelector('.services-slider .next-btn');
const sliderDots = document.querySelector('.slider-dots');
let currentSlide = 0;
let slideInterval;

// Create dots
serviceCategories.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dot');

function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % serviceCategories.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + serviceCategories.length) % serviceCategories.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Add event listeners
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

// Auto slide functionality
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Pause auto-slide on hover
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// Initialize slider
updateSlider();
startAutoSlide(); 