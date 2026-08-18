document.addEventListener('DOMContentLoaded', () => {
  // Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  // Mobile Menu
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.site-header nav');
  if(menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
    
    // Close menu on link click
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }

  // Thumbnails
  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const img = thumb.querySelector('img');
      if (mainImage && img) {
        mainImage.src = img.src;
        // Re-trigger animation
        mainImage.style.animation = 'none';
        mainImage.offsetHeight; /* trigger reflow */
        mainImage.style.animation = null;
      }
    });
  });

  // Color Selection
  const colors = document.querySelectorAll('.color-btn');
  const selectedColorText = document.getElementById('selectedColor');
  
  colors.forEach(btn => {
    btn.addEventListener('click', () => {
      colors.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      if(selectedColorText) {
        selectedColorText.textContent = btn.dataset.color;
      }
    });
  });

  // Quantity
  const minus = document.getElementById('minus');
  const plus = document.getElementById('plus');
  const qty = document.getElementById('qty');
  
  if (minus && plus && qty) {
    let currentQty = 1;
    minus.addEventListener('click', () => {
      if(currentQty > 1) {
        currentQty--;
        qty.textContent = currentQty;
      }
    });
    plus.addEventListener('click', () => {
      if(currentQty < 10) {
        currentQty++;
        qty.textContent = currentQty;
      }
    });
  }

  // Modals
  const checkoutBtn = document.getElementById('checkout');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  
  if (checkoutBtn && modal && closeModal) {
    const showModal = () => {
      modal.classList.add('show');
      document.body.classList.add('no-scroll');
    };
    const hideModal = () => {
      modal.classList.remove('show');
      document.body.classList.remove('no-scroll');
    };
    
    checkoutBtn.addEventListener('click', showModal);
    closeModal.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
      if(e.target === modal) hideModal();
    });
  }

  // Contact Modal
  const contactOpen = document.getElementById('contactOpen');
  const contactModal = document.getElementById('contactModal');
  const contactClose = document.getElementById('contactClose');
  const successClose = document.getElementById('successClose');
  const contactForm = document.getElementById('contactForm');
  const formView = document.getElementById('contactFormView');
  const successView = document.getElementById('contactSuccess');

  if (contactOpen && contactModal) {
    contactOpen.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.classList.add('show');
      document.body.classList.add('no-scroll');
      if(formView && successView) {
        formView.classList.remove('hide');
        successView.classList.remove('show');
      }
      if(contactForm) contactForm.reset();
      document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    });

    const closeContact = () => {
      contactModal.classList.remove('show');
      document.body.classList.remove('no-scroll');
    };
    
    if(contactClose) contactClose.addEventListener('click', closeContact);
    if(successClose) successClose.addEventListener('click', closeContact);
    contactModal.addEventListener('click', (e) => {
      if(e.target === contactModal) closeContact();
    });

    if(contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmail');
        const subject = document.getElementById('contactSubject');
        const message = document.getElementById('contactMessage');
        
        const setError = (el, msg) => {
          el.nextElementSibling.textContent = msg;
          el.style.borderColor = 'red';
        };
        
        const clearErrors = () => {
          document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
          [name, email, subject, message].forEach(el => el.style.borderColor = 'var(--border-color)');
        };
        
        clearErrors();
        
        if(!name.value.trim()) { setError(name, 'Name is required'); isValid = false; }
        if(!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) { setError(email, 'Valid email is required'); isValid = false; }
        if(!subject.value.trim()) { setError(subject, 'Subject is required'); isValid = false; }
        if(!message.value.trim()) { setError(message, 'Message is required'); isValid = false; }
        
        if(isValid) {
          document.getElementById('contactFormView').style.display = 'none';
          document.getElementById('contactSuccess').style.display = 'block';
          contactForm.reset();
        }
      });
    }
  }

  // Scroll Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(section => {
    observer.observe(section);
  });

  // Slider
  const slider = document.getElementById('slider');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  if (slider && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -300, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
});
