function toggleTheme() {
  let root = document.documentElement;

  let theme = window.localStorage.getItem('theme');
  if (!theme || theme === 'dark') {
    root.style.setProperty('--background-color', 'var(--background-color-light)');
    root.style.setProperty('--primary-text-color', 'var(--primary-text-color-light)');
    root.style.setProperty('--secondary-text-color', 'var(--secondary-text-color-light)');
    root.style.setProperty('--link-color', 'var(--link-color-light)');
    root.style.setProperty('--link-hover-color', 'var(--link-hover-color-light)');
    
    window.localStorage.setItem('theme', 'light');
  } else {
    root.style.setProperty('--background-color', 'var(--background-color-dark)');
    root.style.setProperty('--primary-text-color', 'var(--primary-text-color-dark)');
    root.style.setProperty('--secondary-text-color', 'var(--secondary-text-color-dark)');
    root.style.setProperty('--link-color', 'var(--link-color-dark)');
    root.style.setProperty('--link-hover-color', 'var(--link-hover-color-dark)');
    
    window.localStorage.setItem('theme', 'dark');
  }
  return theme === 'dark' ? 'light' : 'dark';
}

export { toggleTheme };