const initOutOfOfficeUI = () => {
    const mobileMenuButton = document.querySelector('#menu-toggle');
    const mobileMenuIcon = document.querySelector('.mobile-menu-button__glyph');
    const mobileNavigation = document.querySelector('#mobile-navigation');

    const updateMenuUI = (isOpen) => {
        if (!mobileMenuButton || !mobileNavigation) return;
        
        mobileNavigation.hidden = !isOpen;
        mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
        mobileMenuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        
        if (mobileMenuIcon) {
            if (isOpen) {
                mobileMenuIcon.className = 'ooo-icon-menu mobile-menu-button__glyph fa-solid fa-xmark';
            } else {
                mobileMenuIcon.className = 'ooo-icon-menu mobile-menu-button__glyph fa-solid fa-bars';
            }
        }
    };

    if (mobileMenuButton && mobileNavigation) {
        updateMenuUI(false);

        mobileMenuButton.addEventListener('click', (event) => {
            event.preventDefault();

            const isOpen = mobileNavigation.hidden;
            updateMenuUI(isOpen);
        });
        mobileNavigation.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => updateMenuUI(false));
        });
    }
};

//DARK LIGHT MODE
const root = document.documentElement;
  const themeToggleButton = document.querySelector('#theme-toggle');
  const themeIcon = document.querySelector('.ooo-icon-theme');

  const updateThemeUI = () => {
    const isDark = root.classList.contains('dark');
    if (themeToggleButton) {
      themeToggleButton.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      themeToggleButton.setAttribute('aria-pressed', String(isDark));
    }
    if (themeIcon) {
      themeIcon.classList.toggle('fa-sun', !isDark);
      themeIcon.classList.toggle('fa-moon', isDark);
    }
  };

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', (event) => {
      event.preventDefault();
      root.classList.toggle('dark');
      updateThemeUI();
    });
  }


//MAILLLL
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMessage = document.getElementById('form-message');

  if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const formData = new FormData(newsletterForm);
      const submittedEmail = formData.get('email');
    
      newsletterMessage.classList.remove('hidden');
      
      // Validar mail
      if (!submittedEmail || !/^\S+@\S+\.\S+$/.test(submittedEmail)) {
        newsletterMessage.textContent = 'Escribe un email válido para entrar al club.';
        newsletterMessage.style.color = '#EA3303'; // ERROR
        return;
      }
      
     
      newsletterMessage.textContent = 'Listo. La próxima pista será para ti.';
      newsletterMessage.style.color = '#002f1b'; // CORRECTO
      
      // Reset forms
      newsletterForm.reset();
    });
  } else {
    console.warn('No se encontró el formulario');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contacto-formulario');
  const contactMessage = document.getElementById('contact-form-message');

  if (contactForm && contactMessage) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que se recargue la página automáticamente
      
      // Comprueba si falta algún campo obligatorio por rellenar
      if (!contactForm.checkValidity()) {
        contactMessage.textContent = 'Campos no completados';
        contactMessage.style.color = '#EA3303'; // Color rojo/naranja de error
        contactMessage.classList.add('font-semibold');
        return; // Detiene el proceso aquí si hay errores
      }
      
      // Si todo está correcto, muestra el mensaje de éxito
      contactMessage.textContent = '¡Se ha enviado tu consulta con éxito!';
      contactMessage.style.color = '#FAA800'; // Color amarillo de éxito
      contactMessage.classList.add('font-semibold');
      
      // Limpia el formulario después de enviarlo correctamente
      contactForm.reset();
    });
  }
});







// MENSAJE FORMULARIO ENVIADO
const contactForm = document.getElementById('contacto-formulario');
const contactMessage = document.getElementById('contact-form-message');

if (contactForm && contactMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    contactMessage.textContent = '¡Se ha enviado tu consulta con éxito!';
    contactMessage.classList.add('text-amarillo', 'font-semibold');
    
    contactForm.reset();
  });
}







//SIEMPRE AL FINAL
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOutOfOfficeUI, { once: true });
} else {
    initOutOfOfficeUI();
}