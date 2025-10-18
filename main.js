// Mostrar/ocultar botón "Volver arriba"
const btnVolverArriba = document.getElementById("btnVolverArriba");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btnVolverArriba.style.display = "block";
  } else {
    btnVolverArriba.style.display = "none";
  }
});

btnVolverArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animaciones al hacer scroll
const elementosAnimados = document.querySelectorAll('.fade-in');

const mostrarElemento = () => {
  const triggerBottom = window.innerHeight * 0.85;

  elementosAnimados.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', mostrarElemento);
window.addEventListener('load', mostrarElemento);