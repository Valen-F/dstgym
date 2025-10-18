// main.js

// Fade-in
const fadeElems = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
fadeElems.forEach(elem => observer.observe(elem));

// Botón volver arriba
const btnTop = document.getElementById('btnVolverArriba');
window.addEventListener('scroll', () => {
  btnTop.style.display = window.scrollY > 200 ? 'block' : 'none';
});
btnTop.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Mostrar el botón al hacer scroll
const btnVolverArriba = document.getElementById('btnVolverArriba');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    btnVolverArriba.style.display = 'block';
  } else {
    btnVolverArriba.style.display = 'none';
  }
});

// Función para volver al inicio
btnVolverArriba.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
