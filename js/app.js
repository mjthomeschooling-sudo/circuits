document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // Dynamic Sticky Navigation Shrink & Text Swap
  const nav = document.querySelector('nav');
  const banner = document.querySelector('.banner');
  const navLinks = document.querySelectorAll('nav a');
  
  window.addEventListener('scroll', () => {
    if (nav && banner) {
      if (window.scrollY > (banner.offsetHeight - 50)) {
        if (!nav.classList.contains('nav-compact')) {
          nav.classList.add('nav-compact');
          navLinks.forEach(link => {
            link.dataset.full = link.textContent;
            if (link.dataset.short) link.textContent = link.dataset.short;
          });
        }
      } else {
        if (nav.classList.contains('nav-compact')) {
          nav.classList.remove('nav-compact');
          navLinks.forEach(link => {
            if (link.dataset.full) link.textContent = link.dataset.full;
          });
        }
      }
    }
  });

  // Highlight active link in navigation
  const currentPath = window.location.pathname.split("/").pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // Global Image Lightbox logic
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox) {
    document.querySelectorAll('.clickable-img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    });
  }
});
