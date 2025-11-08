// main.js

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Configuración de animaciones fade-in
  initializeFadeInAnimations();
  
  // Configuración de la navegación del sitio
  initializeNavigation();
  
  // Configuración del formulario de contacto
  initializeContactForm();

  // Configuración de la calculadora IMC
  initializeIMCCalculator();
});

// Función para inicializar las animaciones fade-in
function initializeFadeInAnimations() {
  const fadeElems = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  fadeElems.forEach(elem => observer.observe(elem));
}

// Función para inicializar la navegación del sitio
function initializeNavigation() {
  const btnNavegar = document.getElementById('btnNavegar');
  const logoLink = document.getElementById('logo-link');
  
  if (!btnNavegar && !logoLink) return;

  // Mostrar/ocultar botón de navegación según scroll
  window.addEventListener('scroll', () => {
    if (btnNavegar) {
      btnNavegar.style.display = window.scrollY > 200 ? 'block' : 'none';
    }
  });

  // Logo: ir al inicio de la página
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Inicializar navegación por secciones
  if (btnNavegar) {
    initializeSectionNavigation(btnNavegar);
  }
}

// Función específica para la navegación entre secciones
function initializeSectionNavigation(btnNavegar) {
  btnNavegar.addEventListener('click', (e) => {
    e.preventDefault();
    navigateToNextSection();
  });
}

// Función para navegar a la siguiente sección
function navigateToNextSection() {
  const sections = Array.from(document.querySelectorAll('section'));
  const currentPosition = window.scrollY + window.innerHeight / 2;
  
  // Encontrar la sección actual
  const currentSection = sections.find(section => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionBottom = sectionTop + rect.height;
    return currentPosition >= sectionTop && currentPosition < sectionBottom;
  });
  
  if (currentSection) {
    const currentIndex = sections.indexOf(currentSection);
    const nextSection = sections[currentIndex + 1];
    
    if (nextSection) {
      // Ir a la siguiente sección
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Si es la última sección, volver al inicio
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } else {
    // Si no se encuentra en ninguna sección, ir a la primera
    if (sections.length > 0) {
      sections[0].scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Función para inicializar la calculadora IMC
function initializeIMCCalculator() {
  const calcularIMCBtn = document.getElementById('calcular-imc-btn');
  if (!calcularIMCBtn) return;

  const pesoInput = document.getElementById('peso');
  const alturaInput = document.getElementById('altura');
  const resultadoDiv = document.getElementById('resultado-imc');
  const imcValor = document.getElementById('imc-valor');
  const imcCategoria = document.getElementById('imc-categoria');
  const imcRecomendacion = document.getElementById('imc-recomendacion');

  calcularIMCBtn.addEventListener('click', () => {
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value) / 100; // convertir cm a metros

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
      alert('Por favor, ingresa valores válidos');
      return;
    }

    const imc = peso / (altura * altura);
    imcValor.textContent = imc.toFixed(1);

    let categoria, recomendacion;
    if (imc < 18.5) {
      categoria = 'Bajo peso';
      recomendacion = 'Te recomendamos consultar con nuestros profesionales para un plan de alimentación y ejercicios para ganar masa muscular de forma saludable.';
    } else if (imc < 25) {
      categoria = 'Peso normal';
      recomendacion = '¡Excelente! Mantén tu rutina de ejercicios y alimentación saludable. Consulta nuestros planes de entrenamiento para mantener tu forma.';
    } else if (imc < 30) {
      categoria = 'Sobrepeso';
      recomendacion = 'Te sugerimos nuestros programas de entrenamiento cardiovascular y de fuerza, combinados con asesoramiento nutricional.';
    } else {
      categoria = 'Obesidad';
      recomendacion = 'Es importante comenzar un programa de ejercicios adaptado. Nuestros profesionales pueden diseñar un plan personalizado y seguro para ti.';
    }

    imcCategoria.textContent = `Categoría: ${categoria}`;
    imcRecomendacion.textContent = recomendacion;
    resultadoDiv.style.display = 'block';
  });
}

// Función para inicializar el formulario de contacto
function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    if (!formProps.email.includes('@')) {
      alert('Por favor, ingresa un email válido');
      return;
    }
    
    // Aquí iría la lógica de envío del formulario
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    contactForm.reset();
  });
}
