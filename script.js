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








//SIEMPRE AL FINAL
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOutOfOfficeUI, { once: true });
} else {
    initOutOfOfficeUI();
}