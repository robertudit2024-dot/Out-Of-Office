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