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

  // Dynamic Sticky Navigation Shrink
  const nav = document.querySelector('nav');
  const banner = document.querySelector('.banner');
  
  window.addEventListener('scroll', () => {
    if (nav && banner) {
      if (window.scrollY > (banner.offsetHeight - 50)) {
        nav.classList.add('nav-compact');
      } else {
        nav.classList.remove('nav-compact');
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
