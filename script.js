// Smooth scrolling for navigation links
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

// Order Form submission handler
const orderForm = document.querySelector('.order-form');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[name="name"]').value;
        const phone = this.querySelector('input[name="phone"]').value;
        const city = this.querySelector('input[name="city"]').value;
        const product = this.querySelector('select[name="product"]').value;
        const quantity = this.querySelector('input[name="quantity"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        // Create WhatsApp message
        const whatsappMessage = `नमस्ते! मैं ऑर्डर करना चाहता हूं:\n\nनाम: ${name}\nमोबाइल: ${phone}\nशहर: ${city}\nमिठाई: ${product}\nमात्रा: ${quantity} किलो\n${message ? 'विशेष निर्देश: ' + message : ''}`;
        
        // Open WhatsApp with pre-filled message
        const whatsappURL = `https://wa.me/919694018427?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappURL, '_blank');
        
        // Show confirmation
        alert('धन्यवाद! आपको WhatsApp पर भेजा जा रहा है। कृपया अपना ऑर्डर कन्फर्म करें।');
        
        // Reset form
        this.reset();
    });
}

// Add active class to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add scroll reveal animation for product and speciality cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.product-card, .speciality-card, .badge').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// WhatsApp floating button click tracking
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
    });
}

// Add festive animation to blessings
const blessing = document.querySelector('.blessing');
if (blessing) {
    setInterval(() => {
        blessing.style.transform = 'scale(1.05)';
        setTimeout(() => {
            blessing.style.transform = 'scale(1)';
        }, 500);
    }, 3000);
    blessing.style.transition = 'transform 0.5s ease';
}
