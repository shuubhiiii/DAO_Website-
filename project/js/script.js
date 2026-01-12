// ============================================
// NEXUS DAO - Premium Animations
// ============================================

console.log("🚀 NEXUS DAO Animations Loading...");

// ============================================
// REGISTRATION MODAL (Define early for button access)
// ============================================
window.openRegisterModal = function() {
  const modal = document.getElementById('registerModal');
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    console.log("Modal opened");
  } else {
    console.error("Modal not found!");
  }
};

window.closeRegisterModal = function() {
  const modal = document.getElementById('registerModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
};

window.selectTicket = function(type) {
  document.querySelectorAll('.ticket-card').forEach(card => {
    card.classList.remove('selected');
  });
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('selected');
  }
  const ticketInput = document.getElementById('ticketType');
  if (ticketInput) ticketInput.value = type;
};

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// SMOOTH SCROLL (Lenis)
// ============================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      x: e.clientX - 6,
      y: e.clientY - 6,
      duration: 0.1,
    });
    
    gsap.to(cursorFollower, {
      x: e.clientX - 20,
      y: e.clientY - 20,
      duration: 0.3,
    });
  });

  // Scale cursor on hover
  document.querySelectorAll('a, button, .project-card, .service-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 2, duration: 0.3 });
      gsap.to(cursorFollower, { scale: 1.5, opacity: 0.3, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(cursorFollower, { scale: 1, opacity: 0.5, duration: 0.3 });
    });
  });
}

// ============================================
// LOADER ANIMATION
// ============================================
const loader = document.querySelector('.loader');
const loaderText = document.querySelectorAll('.loader-text span');
const loaderBar = document.querySelector('.loader-bar');

// Hide loader after animation or timeout
function hideLoader() {
  if (loader) {
    gsap.to(loader, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        loader.style.display = 'none';
        initPageAnimations();
      }
    });
  } else {
    initPageAnimations();
  }
}

// Loader animation with fallback
if (loader && loaderText.length > 0 && loaderBar) {
  // Create loader bar inner element
  const loaderBarInner = document.createElement('div');
  loaderBarInner.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
    width: 0%;
  `;
  loaderBar.appendChild(loaderBarInner);
  
  const loaderTL = gsap.timeline({ onComplete: hideLoader });

  loaderTL
    .to(loaderText, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    })
    .to(loaderBarInner, { width: '100%', duration: 1.2, ease: "power2.inOut" }, "-=0.3")
    .to(loaderText, {
      opacity: 0,
      y: -50,
      duration: 0.4,
      stagger: 0.05,
      ease: "power3.in"
    }, "-=0.2");
} else {
  // Fallback: hide loader immediately and start animations
  if (loader) loader.style.display = 'none';
  setTimeout(initPageAnimations, 100);
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: (self) => {
    if (self.direction === 1) {
      document.querySelector('.navbar').classList.add('scrolled');
    } else if (window.scrollY < 80) {
      document.querySelector('.navbar').classList.remove('scrolled');
    }
  }
});

// ============================================
// PAGE ANIMATIONS
// ============================================
function initPageAnimations() {
  
  // Hero Animations
  const heroTL = gsap.timeline();
  
  heroTL
    .from('.hero-tag', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    })
    .from('.title-line .word', {
      opacity: 0,
      y: 100,
      rotationX: -90,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out"
    }, "-=0.4")
    .from('.hero-description', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from('.hero-buttons .btn', {
      opacity: 0,
      y: 30,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .from('.hero-stats .stat', {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.3")
    .from('.scroll-indicator', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2");

  // Animate stat numbers
  document.querySelectorAll('.stat-number').forEach(stat => {
    const value = parseInt(stat.dataset.value);
    gsap.to(stat, {
      innerText: value,
      duration: 2,
      ease: "power2.out",
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: stat,
        start: "top 80%"
      }
    });
  });

  // Floating orbs animation
  gsap.to('.orb-1', {
    x: 50,
    y: 30,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  
  gsap.to('.orb-2', {
    x: -40,
    y: -50,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  
  gsap.to('.orb-3', {
    x: 30,
    y: 40,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // Parallax effect on hero elements
  gsap.to('.hero-bg', {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: '.hero',
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // ============================================
  // SECTION ANIMATIONS
  // ============================================
  
  // About Conference animation
  const aboutConferenceTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-conference',
      start: "top 75%"
    }
  });

  aboutConferenceTL
    .from('.conference-info .section-tag', {
      opacity: 0,
      x: -30,
      duration: 0.5
    })
    .from('.conference-title', {
      opacity: 0,
      y: 40,
      duration: 0.6
    }, "-=0.3")
    .from('.conference-description', {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.2
    }, "-=0.3")
    .from('.highlight-item', {
      opacity: 0,
      y: 30,
      scale: 0.9,
      duration: 0.4,
      stagger: 0.1
    }, "-=0.2")
    .from('.conference-cta .btn', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.1
    }, "-=0.2")
    .from('.event-date-card', {
      opacity: 0,
      scale: 0.8,
      rotation: -5,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.8")
    .from('.float-tag', {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      stagger: 0.1
    }, "-=0.4");

  // Section headers animation
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: header,
        start: "top 80%"
      }
    });
  });

  // About cards animation
  gsap.utils.toArray('.about-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 80,
      duration: 0.8,
      delay: i * 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      }
    });
  });

  // Service items animation
  gsap.utils.toArray('.service-item').forEach((item, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 85%"
      }
    });
    
    tl.from(item, {
      opacity: 0,
      x: -50,
      duration: 0.6,
      ease: "power3.out"
    })
    .from(item.querySelector('.service-number'), {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .from(item.querySelector('.service-arrow'), {
      opacity: 0,
      x: -20,
      duration: 0.3
    }, "-=0.2");
  });

  // Project cards animation with stagger
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 100,
      scale: 0.9,
      duration: 0.8,
      delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%"
      }
    });
  });

  // Community section animation
  const communityTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.community',
      start: "top 70%"
    }
  });

  communityTL
    .from('.community-text .section-tag', {
      opacity: 0,
      x: -30,
      duration: 0.5
    })
    .from('.community-text .section-title', {
      opacity: 0,
      y: 40,
      duration: 0.6
    }, "-=0.3")
    .from('.community-text > p', {
      opacity: 0,
      y: 30,
      duration: 0.5
    }, "-=0.3")
    .from('.feature', {
      opacity: 0,
      x: -20,
      duration: 0.4,
      stagger: 0.1
    }, "-=0.2")
    .from('.community-buttons .btn', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.1
    }, "-=0.2")
    .from('.visual-blob', {
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .from('.center-logo', {
      opacity: 0,
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .from('.avatar-ring', {
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      stagger: 0.2
    }, "-=0.4");

  // Footer animation
  const footerTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.footer',
      start: "top 85%"
    }
  });

  footerTL
    .from('.footer-brand', {
      opacity: 0,
      y: 40,
      duration: 0.6
    })
    .from('.footer-col', {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.1
    }, "-=0.3")
    .from('.footer-bottom', {
      opacity: 0,
      y: 20,
      duration: 0.4
    }, "-=0.2");

  // ============================================
  // HOVER EFFECTS
  // ============================================
  
  // Magnetic effect on buttons
  document.querySelectorAll('.btn-glow').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });
    });
  });

  // Project card 3D tilt effect
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(card, {
        rotationY: x * 10,
        rotationX: -y * 10,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });
}

// ============================================
// REVEAL ON SCROLL ANIMATIONS
// ============================================
gsap.utils.toArray('.reveal-up').forEach(el => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%"
    }
  });
});

gsap.utils.toArray('.reveal-left').forEach(el => {
  gsap.to(el, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%"
    }
  });
});

gsap.utils.toArray('.reveal-right').forEach(el => {
  gsap.to(el, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%"
    }
  });
});

// ============================================
// REGISTRATION MODAL EVENTS
// ============================================
const registerModal = document.getElementById('registerModal');
const registrationForm = document.getElementById('registrationForm');

// Close modal on overlay click
if (registerModal) {
  registerModal.addEventListener('click', function(e) {
    if (e.target === this) {
      closeRegisterModal();
    }
  });
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('registerModal');
    if (modal && modal.classList.contains('active')) {
      closeRegisterModal();
    }
  }
});

// Form submission handling
if (registrationForm) {
  registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Log data (replace with actual submission)
    console.log('Registration Data:', data);
    
    // Show success animation
    const form = this;
    const submitBtn = form.querySelector('.form-submit');
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Processing...</span>
      <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 60"/>
      </svg>
    `;
    
    // Simulate API call
    setTimeout(() => {
      // Replace form with success message
      const modalContent = document.querySelector('.modal-content');
      modalContent.innerHTML = `
        <div class="register-form success">
          <div class="success-icon">✓</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.5rem;">Registration Successful!</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1rem;">
            Thank you for registering for IBW Gwalior 2025!
          </p>
          <p style="color: var(--text-muted); font-size: 0.9rem;">
            A confirmation email has been sent to <strong style="color: var(--accent-primary);">${data.email}</strong>
          </p>
          <div style="margin-top: 2rem;">
            <button class="btn btn-large btn-glow" onclick="closeRegisterModal(); location.reload();">
              <span>Done</span>
            </button>
          </div>
        </div>
      `;
      
      // Animate success
      gsap.from('.success-icon', { scale: 0, rotation: -180, duration: 0.6, ease: "back.out(1.7)" });
    }, 1500);
  });
}

// Spinner animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .spinner {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);

console.log("✅ GWL DAO Animations Loaded Successfully!");
