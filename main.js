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

// IMC Calculator functionality
const calcularIMCBtn = document.getElementById('calcular-imc');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const imcResultado = document.querySelector('.imc-result');
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
  imcResultado.style.display = 'block';
});

// Contact form functionality
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const formProps = Object.fromEntries(formData);
  
  // Basic validation
  if (!formProps.email.includes('@')) {
    alert('Por favor, ingresa un email válido');
    return;
  }
  
  try {
    // You would replace this URL with your actual email service endpoint
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: 'YOUR_SERVICE_ID',
        template_id: 'YOUR_TEMPLATE_ID',
        user_id: 'YOUR_USER_ID',
        template_params: {
          from_name: formProps.nombre,
          reply_to: formProps.email,
          telefono: formProps.telefono,
          asunto: formProps.asunto,
          mensaje: formProps.mensaje
        }
      })
    });
    
    if (response.ok) {
      alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
      contactForm.reset();
    } else {
      throw new Error('Error al enviar el mensaje');
    }
  } catch (error) {
    alert('Lo sentimos, hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
    console.error('Error:', error);
  }
});
