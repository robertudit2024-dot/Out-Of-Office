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


// NEWSLETTER FORM
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
          .css('color', '#ffffff');

        return;
      }

      newsletterMessage
        .text('Listo. La próxima pista será para ti.')
        .css('color', '#ffffff');

      this.reset();
    });
  }
});

//CONTACTO FORM

$(function () {
  const $form = $('#contacto-formulario');
  const $status = $('#form-status-message');

  if ($form.length && $status.length) {
    $form.on('submit', function (e) {
      e.preventDefault();


      if (this.checkValidity()) {

        $status
          .removeClass('text-red-500 text-naranja')
          .addClass('text-amarillo font-semibold')
          .text('¡Se ha enviado tu consulta con éxito!');


        this.reset();
      } else {

        $status
          .removeClass('text-amarillo')
          .addClass('text-amarillo font-semibold')
          .text('Por favor, rellena todos los campos obligatorios correctamente.');

        this.reportValidity();
      }
    });
  }
});


// ANIMACIÓN DE MÁQUINA DE ESCRIBIR PARA NEWSLETTER
$(function() {
 
  if ($('#typed-newsletter').length) {
    new Typed('#typed-newsletter', {
      strings: [
        'antes que el restooo.',
        'de las mejores escapadas.',
        'de chollos exclusivos.'
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }
});

// ANIMACIÓN DE MÁQUINA DE ESCRIBIR PARA NOSOTROS
$(function() {
 
  if ($('#typed-nosotros').length) {
    new Typed('#typed-nosotros', {
      strings: [
        '"Un buen viaje no se mide por los kilómetros recorridos, sino por la forma en que vuelves a mirar lo cotidiano."'
      ],
      typeSpeed: 45,
      startDelay: 100,
      loop: false,
      showCursor: false,
    });
  }
});


//SIEMPRE AL FINAL
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOutOfOfficeUI, { once: true });
} else {
    initOutOfOfficeUI();
}