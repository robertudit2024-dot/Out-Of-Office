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

function updateThemeUI() {
  const isDark = root.classList.contains('dark');

  if (themeToggleButton) {
    themeToggleButton.setAttribute(
      'aria-label',
      isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );

    themeToggleButton.setAttribute(
      'aria-pressed',
      String(isDark)
    );
  }

  if (themeIcon) {
    themeIcon.classList.toggle('fa-sun', !isDark);
    themeIcon.classList.toggle('fa-moon', isDark);
  }
}
// Actualiza las imágenes según el tema actual
function updateThemeImages() {
  const isDark = root.classList.contains('dark');

  $('.ooo-theme-image').each(function () {
    const imagePath = isDark
      ? $(this).attr('data-dark-src')
      : $(this).attr('data-light-src');

    if (imagePath) {
      $(this).attr('src', imagePath);
    }
  });
}

function applyTheme() {
  const savedTheme = localStorage.getItem('ooo-theme');

  root.classList.toggle('dark', savedTheme === 'dark');

  updateThemeUI();
  updateThemeImages();
}

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', function (event) {
    event.preventDefault();

    root.classList.toggle('dark');

    localStorage.setItem(
      'ooo-theme',
      root.classList.contains('dark') ? 'dark' : 'light'
    );

    updateThemeUI();
    updateThemeImages();
  });
}

applyTheme();


//FIN MODOS COLOR



// HEADER BACKGROUND
const globalHeader = document.getElementById('global-header');

function updateHeaderBackground() {
  const scrollPosition = window.scrollY || document.querySelector('main')?.scrollTop || 0;
  
  if (scrollPosition > 10) {
    globalHeader.classList.add('bg-gradient-to-b', 'from-black/50', 'to-transparent', 'backdrop-blur-xs');
  } else {
    globalHeader.classList.remove('bg-gradient-to-b', 'from-black/50', 'to-transparent', 'backdrop-blur-xs');
  }
}

window.addEventListener('scroll', updateHeaderBackground);
document.querySelector('main')?.addEventListener('scroll', updateHeaderBackground);



$(function () {
  const newsletterForm = $('#newsletter-form');
  const newsletterMessage = $('#form-message');

  if (newsletterForm.length && newsletterMessage.length) {
    newsletterForm.on('submit', function (event) {
      event.preventDefault();

      const inputEmail = $(this).find('input[name="email"]');
      const submittedEmail = inputEmail.val().trim();

      newsletterMessage.removeClass('hidden');

      if (!submittedEmail || !/^\S+@\S+\.\S+$/.test(submittedEmail)) {
        newsletterMessage
          .text('Escribe un email válido para entrar al club.')
          .css('color', '#000000');

        return;
      }

      newsletterMessage
        .text('Listo. La próxima pista será para ti.')
        .css('color', '#ffffff');

      this.reset();
    });
  } else {
    console.warn(
      'No se encontró #newsletter-form o #form-message'
    );
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contacto-formulario');
  const formStatusMessage = document.getElementById('form-status-message');

  if (contactForm && formStatusMessage) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Evita que se recargue la página automáticamente
      
      // Comprueba si falta algún campo obligatorio por rellenar
      if (!contactForm.checkValidity()) {
        formStatusMessage.textContent = 'Por favor, rellena todos los campos obligatorios correctamente.';
        formStatusMessage.classList.remove('text-amarillo');
        formStatusMessage.classList.add('text-red-500', 'font-semibold');
        return; // Detiene el proceso aquí si hay errores
      }
      
      // Si todo está correcto, muestra el mensaje de éxito
      formStatusMessage.textContent = '¡Se ha enviado tu consulta con éxito!';
      formStatusMessage.classList.remove('text-red-500');
      formStatusMessage.classList.add('text-amarillo', 'font-semibold');
      
      // Limpia el formulario después de enviarlo correctamente
      contactForm.reset();
    });
  }
});


const contactForm = document.getElementById('contacto-formulario');
const contactMessage = document.getElementById('contact-form-message');

if (contactForm && contactMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Verificamos si todos los campos requeridos son válidos usando la API nativa de validación
    if (contactForm.checkValidity()) {
      // Si todo está correcto:
      contactMessage.textContent = '¡Se ha enviado tu consulta con éxito!';
      contactMessage.classList.remove('text-red-500', 'text-naranja');
      contactMessage.classList.add('text-amarillo', 'font-semibold');
      
      contactForm.reset();
    } else {
      // Si falta algún campo por rellenar o hay un error:
      contactMessage.textContent = 'Por favor, rellena todos los campos obligatorios correctamente.';
      contactMessage.classList.remove('text-amarillo');
      contactMessage.classList.add('text-red-500', 'font-semibold');
    }
  });
}





//SIEMPRE AL FINAL
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOutOfOfficeUI, { once: true });
} else {
    initOutOfOfficeUI();
}