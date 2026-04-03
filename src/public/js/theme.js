document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const preferenceButton = document.getElementById('preferences-button');
  const preferencesPanel = document.getElementById('preferences-panel');

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  if (themeToggle) {
    themeToggle.checked = document.documentElement.classList.contains('dark');
    themeToggle.addEventListener('change', () => {
      const theme = themeToggle.checked ? 'dark' : 'light';
      applyTheme(theme);
      localStorage.setItem('theme', theme);
    });
  }

  if (preferenceButton && preferencesPanel) {
    preferenceButton.addEventListener('click', () => {
      preferencesPanel.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
      const clickedInsidePanel = preferencesPanel.contains(event.target);
      const clickedButton = preferenceButton.contains(event.target);
      if (!clickedInsidePanel && !clickedButton) {
        preferencesPanel.classList.add('hidden');
      }
    });
  }
});
