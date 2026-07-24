// --- 1. Scroll Progress ---
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      document.getElementById('progress-bar').style.width = `${scrollPercent}%`;
    });

    // --- 2. Image Handling (Loading & Missing) ---
    const images = document.querySelectorAll('.image-wrapper img');
    
    images.forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
        // Hide the placeholder if image loads successfully
        const placeholder = img.parentElement.querySelector('.placeholder-state');
        if(placeholder) placeholder.style.display = 'none';
      });

      img.addEventListener('error', () => {
        // If image fails to load, ensure the placeholder is visible
        const placeholder = img.parentElement.querySelector('.placeholder-state');
        if(placeholder) placeholder.style.display = 'flex';
      });
    });

    // --- 3. Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');
    const cards = document.querySelectorAll('.lab-card');

    function openLightbox(src) {
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      setTimeout(() => { lightboxImg.src = ''; }, 300); // Clear after fade out
      document.body.style.overflow = '';
    }

    // Click events
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if (img && img.src) openLightbox(img.src);
      });
      
      // Keyboard support
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const img = card.querySelector('img');
          if (img && img.src) openLightbox(img.src);
        }
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Esc key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
