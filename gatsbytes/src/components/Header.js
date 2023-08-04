import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { AiFillBulb, AiOutlineBulb } from 'react-icons/ai';
import { toggleTheme } from '../helper/helperfuncs';
import * as styles from './header.module.css';

const Header = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Get the initial theme from local storage or default to 'dark'
    const initialTheme = window.localStorage.getItem('theme') || 'dark';
    setTheme(initialTheme);
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
    // Update theme state
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.siteTitle}>
        <Link className={styles.navLink} to="/">Jakobs.dev</Link>
      </h1>
      <nav>
        <Link className={styles.navLink} to="/about">About</Link>
        <Link className={styles.navLink} to="/blog">Blog</Link>
        {/* Add a button to toggle the theme */}
        <button onClick={handleToggleTheme} className={styles.themeToggle}>
          {theme === 'dark' ? <AiOutlineBulb/> : <AiFillBulb />}
        </button>
      </nav>
    </header>
  );
}

export default Header;
