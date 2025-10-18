// main.js

// Fade-in animations
const fadeElems = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

// Observe all fade-in elements
fadeElems.forEach(elem => observer.observe(elem));

// Back to top button functionality
const btnVolverArriba = document.getElementById('btnVolverArriba');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
  btnVolverArriba.style.display = window.scrollY > 200 ? 'block' : 'none';
});

// Smooth scroll to top when clicking the button
btnVolverArriba.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
