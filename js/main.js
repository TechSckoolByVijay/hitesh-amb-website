// ==========================================
// Amit Mishtan Bhandar - Main JavaScript
// ==========================================

(function() {
  'use strict';

  // ==========================================
  // Mobile Menu Toggle
  // ==========================================
  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (menuToggle && nav) {
      menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        const isActive = nav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        menuToggle.textContent = isActive ? '✕' : '☰';
      });

      // Close menu when clicking a link
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          nav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.textContent = '☰';
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
          nav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.textContent = '☰';
        }
      });
    }
  }

  // ==========================================
  // Smooth Scrolling for Anchor Links
  // ==========================================
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault();
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ==========================================
  // WhatsApp Order Integration
  // ==========================================
  function initWhatsAppOrdering() {
    const whatsappButtons = document.querySelectorAll('[data-whatsapp-order]');
    const whatsappNumber = '919694018427';

    whatsappButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = this.getAttribute('data-product-name') || 'General Inquiry';
        const message = `Hello Amit Mishtan Bhandar! I would like to order: ${productName}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
      });
    });

    // Handle order form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
      orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const address = document.getElementById('address')?.value || '';
        const orderDetails = document.getElementById('orderDetails')?.value || '';

        const message = `New Order from Website:\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nOrder Details:\n${orderDetails}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
      });
    }
  }

  // ==========================================
  // Lazy Loading Images
  // ==========================================
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
            
            // Add loaded class for fade-in effect
            img.addEventListener('load', function() {
              img.style.opacity = '1';
            });
          }
        });
      }, {
        rootMargin: '50px'
      });

      lazyImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // ==========================================
  // Set Active Navigation Link
  // ==========================================
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage || 
          (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ==========================================
  // Scroll to Top on Page Load
  // ==========================================
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  // ==========================================
  // Add Animation on Scroll
  // ==========================================
  function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.product-card, .gallery-item, .blessing-card');

    if ('IntersectionObserver' in window) {
      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, {
        threshold: 0.1
      });

      animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
      });
    }
  }

  // ==========================================
  // Form Validation
  // ==========================================
  function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#DC143C';
            
            // Remove error styling on input
            field.addEventListener('input', function() {
              this.style.borderColor = '';
            }, { once: true });
          }
        });

        if (!isValid && form.id !== 'orderForm') {
          e.preventDefault();
          alert('Please fill in all required fields.');
        }
      });
    });
  }

  // ==========================================
  // Contact Form Handler
  // ==========================================
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName')?.value || '';
        const email = document.getElementById('contactEmail')?.value || '';
        const message = document.getElementById('contactMessage')?.value || '';
        
        const whatsappMessage = `Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/919694018427?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
      });
    }
  }

  // ==========================================
  // Initialize All Functions on DOM Ready
  // ==========================================
  function init() {
    initMobileMenu();
    initSmoothScroll();
    initWhatsAppOrdering();
    initLazyLoading();
    setActiveNavLink();
    initScrollAnimations();
    initFormValidation();
    initContactForm();
  }

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ==========================================
  // Utility Functions
  // ==========================================
  
  // Debounce function for performance
  window.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

})();
