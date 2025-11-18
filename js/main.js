// ==========================================
// Amit Mishtan Bhandar - Main JavaScript
// ==========================================

(function() {
  'use strict';

  // ==========================================
  // Dynamic Image Slider
  // ==========================================
  function initImageSlider() {
    const sliderContainer = document.querySelector('.image-slider');
    if (!sliderContainer) return;

    const sliderWrapper = sliderContainer.querySelector('.slider-wrapper');
    const sliderTrack = sliderContainer.querySelector('.slider-track');
    const prevBtn = sliderContainer.querySelector('.slider-prev');
    const nextBtn = sliderContainer.querySelector('.slider-next');
    const dotsContainer = sliderContainer.querySelector('.slider-dots');

    // Dynamically load all images from slider folder
    const sliderImages = [];
    let currentSlide = 0;
    let slideInterval;

    // Fetch images from the slider directory
    async function loadSliderImages() {
      try {
        const sliderPath = 'images/slider/';
        
        // Hardcode known slider images to avoid 404 spam
        // Update this list when adding new slider images
        const knownImages = [
          'banner1.jpg',
          'banner2.jpg',
          'image1.jpg',
          'slide1.svg',
          'slide2.svg',
          'slide3.svg',
          'slide4.svg'
        ];
        
        // Verify each image exists
        const imagePromises = knownImages.map(img => 
          checkImageExists(`${sliderPath}${img}`)
        );

        const results = await Promise.all(imagePromises);
        const foundImages = results.filter(img => img !== null);
        
        if (foundImages.length > 0) {
          sliderImages.push(...foundImages);
          initSlider();
        } else {
          console.log('No slider images found');
        }
      } catch (error) {
        console.error('Error loading slider images:', error);
      }
    }

    // Check if image exists
    function checkImageExists(imagePath) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(imagePath);
        img.onerror = () => resolve(null);
        img.src = imagePath;
      });
    }

    // Initialize slider with loaded images
    function initSlider() {
      if (sliderImages.length === 0) return;

      // Create slides
      sliderImages.forEach((imageSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'slider-slide';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Slide ${index + 1}`;
        img.loading = 'lazy';
        
        slide.appendChild(img);
        sliderTrack.appendChild(slide);

        // Create dot indicator
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });

      // Set initial active states
      updateSlider();

      // Event listeners
      prevBtn?.addEventListener('click', prevSlide);
      nextBtn?.addEventListener('click', nextSlide);

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      });

      // Auto-play
      startAutoPlay();

      // Pause on hover
      sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
      sliderWrapper.addEventListener('mouseleave', startAutoPlay);

      // Touch swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
      }
    }

    function updateSlider() {
      const slides = sliderTrack.querySelectorAll('.slider-slide');
      const dots = dotsContainer.querySelectorAll('.slider-dot');

      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % sliderImages.length;
      updateSlider();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
      updateSlider();
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlider();
    }

    function startAutoPlay() {
      stopAutoPlay();
      slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopAutoPlay() {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    }

    // Load images and start slider
    loadSliderImages();
  }

  // ==========================================
  // Mobile Menu Toggle
  // ==========================================
  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (menuToggle && nav) {
      // Create overlay element
      const overlay = document.createElement('div');
      overlay.className = 'mobile-menu-overlay';
      document.body.appendChild(overlay);

      // Toggle menu on button click
      menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        menuToggle.textContent = isActive ? '✕' : '☰';
        overlay.classList.toggle('active', isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
      });

      // Close menu when clicking a link
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          closeMenu();
        });
      });

      // Close menu when clicking the overlay
      overlay.addEventListener('click', function() {
        closeMenu();
      });

      // Close menu on escape key
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && nav.classList.contains('active')) {
          closeMenu();
        }
      });

      // Handle window resize - close menu if resized to desktop
      window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
          closeMenu();
        }
      }, 250));

      function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
        document.body.style.overflow = '';
      }
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
    const whatsappNumber = '916375635619'; // Primary inquiry number

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
        const whatsappUrl = `https://wa.me/916375635619?text=${encodedMessage}`; // Primary inquiry number
        
        window.open(whatsappUrl, '_blank');
      });
    }
  }

  // ==========================================
  // Image Zoom for All Images (Menu, Gallery, About, Home)
  // ==========================================
  function initImageZoom() {
    // Create zoom overlay
    const overlay = document.createElement('div');
    overlay.className = 'image-zoom-overlay';
    overlay.innerHTML = '<span class="zoom-close">&times;</span><img src="" alt="Zoomed image">';
    document.body.appendChild(overlay);

    const zoomedImg = overlay.querySelector('img');
    const closeBtn = overlay.querySelector('.zoom-close');

    // Select all zoomable images from different sections
    const zoomableSelectors = [
      '.menu-item-image img',           // Menu page product images
      '.product-image img',             // Product cards
      '.gallery-item img',              // Gallery images
      '.hero-image img',                // Hero section images (home)
      '.blessing-card img',             // Blessing cards
      '.about-content img',             // About page images
      '.product-card img'               // Product cards on home page
    ];

    // Combine all selectors and get images
    const allImages = document.querySelectorAll(zoomableSelectors.join(', '));
    
    allImages.forEach(img => {
      // Add cursor pointer style to indicate clickable
      img.style.cursor = 'zoom-in';
      
      // Make parent clickable if it's a container
      const clickTarget = img.parentElement.classList.contains('menu-item-image') || 
                         img.parentElement.classList.contains('product-image') ||
                         img.parentElement.classList.contains('gallery-item') ||
                         img.parentElement.classList.contains('hero-image')
                         ? img.parentElement : img;
      
      clickTarget.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        zoomedImg.src = img.src;
        zoomedImg.alt = img.alt || 'Zoomed image';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close zoom on overlay click or close button
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay || e.target === closeBtn) {
        closeZoom();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeZoom();
      }
    });

    // Close zoom function
    function closeZoom() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Add pinch-to-zoom support for mobile
    let scale = 1;
    let panning = false;
    let pointX = 0;
    let pointY = 0;
    let start = { x: 0, y: 0 };

    // Touch events for mobile zoom
    zoomedImg.addEventListener('touchstart', function(e) {
      if (e.touches.length === 2) {
        e.preventDefault();
      }
    });

    zoomedImg.addEventListener('touchmove', function(e) {
      if (e.touches.length === 2) {
        e.preventDefault();
        // Pinch zoom logic could be added here
      }
    });
  }

  // ==========================================
  // Initialize All Functions on DOM Ready
  // ==========================================
  function init() {
    initThemeToggle();
    initImageSlider();
    initMobileMenu();
    initSmoothScroll();
    initWhatsAppOrdering();
    initLazyLoading();
    setActiveNavLink();
    initScrollAnimations();
    initFormValidation();
    initContactForm();
    initImageZoom();
    initMobileTouchOptimizations();
  }

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ==========================================
  // Theme Toggle (Light/Dark/Spiritual Mode)
  // ==========================================
  function initThemeToggle() {
    const themeOptions = document.querySelectorAll('.theme-option');
    if (themeOptions.length === 0) return;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Set active state on correct option
    themeOptions.forEach(option => {
      if (option.dataset.theme === currentTheme) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });

    // Listen for theme changes
    themeOptions.forEach(option => {
      option.addEventListener('click', function() {
        const selectedTheme = this.dataset.theme;
        
        // Update active state
        themeOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        
        // Apply theme
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
        
        // Show/hide music player based on spiritual theme
        const musicPlayer = document.getElementById('music-player');
        if (musicPlayer) {
          if (selectedTheme === 'spiritual') {
            musicPlayer.style.display = 'flex';
            initMusicPlayer();
          } else {
            musicPlayer.style.display = 'none';
            pauseMusic();
          }
        }
      });
    });
    
    // Auto-show music player if spiritual theme is active
    if (currentTheme === 'spiritual') {
      const musicPlayer = document.getElementById('music-player');
      if (musicPlayer) {
        musicPlayer.style.display = 'flex';
        initMusicPlayer();
      }
    }
  }

  // ==========================================
  // Background Music Player
  // ==========================================
  function initMusicPlayer() {
    const audio = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('play-pause');
    const volumeControl = document.getElementById('volume');
    const musicPlayer = document.getElementById('music-player');
    
    if (!audio || !playPauseBtn || !volumeControl) return;

    // Set initial volume
    audio.volume = volumeControl.value / 100;

    // Auto-play music (with user interaction required by browsers)
    const playMusic = () => {
      audio.play().then(() => {
        playPauseBtn.textContent = '🔇';
        if (musicPlayer) musicPlayer.style.display = 'flex';
      }).catch(err => {
        console.log('Auto-play prevented. User interaction required.');
        playPauseBtn.textContent = '🔊';
      });
    };

    // Play on first user interaction
    const startMusicOnInteraction = () => {
      playMusic();
      document.removeEventListener('click', startMusicOnInteraction);
      document.removeEventListener('touchstart', startMusicOnInteraction);
    };
    
    document.addEventListener('click', startMusicOnInteraction, { once: true });
    document.addEventListener('touchstart', startMusicOnInteraction, { once: true });

    // Play/Pause control (toggle mute/unmute)
    playPauseBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (audio.paused) {
        audio.play();
        this.textContent = '🔇';
      } else {
        audio.pause();
        this.textContent = '🔊';
      }
    });

    // Volume control
    volumeControl.addEventListener('input', function() {
      audio.volume = this.value / 100;
    });

    // Update play/pause button when audio state changes
    audio.addEventListener('play', () => {
      playPauseBtn.textContent = '🔇';
    });

    audio.addEventListener('pause', () => {
      playPauseBtn.textContent = '🔊';
    });
  }

  function pauseMusic() {
    const audio = document.getElementById('bg-music');
    if (audio) {
      audio.pause();
    }
  }

  // ==========================================
  // Utility Functions
  // ==========================================
  
  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Expose debounce to window for external use if needed
  window.debounce = debounce;

  // ==========================================
  // Mobile Touch Optimizations
  // ==========================================
  function initMobileTouchOptimizations() {
    // Improve tap responsiveness on mobile
    if ('ontouchstart' in window) {
      document.body.classList.add('touch-device');
      
      // Add active state for better touch feedback
      const interactiveElements = document.querySelectorAll('button, a, .btn, .menu-item, .product-card');
      
      interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
          this.classList.add('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
          setTimeout(() => {
            this.classList.remove('touch-active');
          }, 150);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
          this.classList.remove('touch-active');
        }, { passive: true });
      });
    }
    
    // Prevent zoom on double tap for specific elements
    const preventZoomElements = document.querySelectorAll('.btn, button, a');
    preventZoomElements.forEach(element => {
      element.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.target.click();
      }, { passive: false });
    });
  }

})();
