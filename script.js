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














//SIEMPRE AL FINAL
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOutOfOfficeUI, { once: true });
} else {
    initOutOfOfficeUI();
}