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
      <nav>
        <Link className={styles.navLink} to="/">Home</Link>{" - "}
        <Link className={styles.navLink} to="/about">About</Link>{" - "}
        <Link className={styles.navLink} to="/blog">Blog</Link>{" - "}
        <Link className={styles.navLink} to="/contact">Contact</Link>{" - "}
        <Link className={styles.navLink} to="/resume">Resume</Link>{" | "}
        <a className={styles.navLink} target="_blank" rel="noopener noreferrer" href="https://spoof1.com">LinkedIn</a>{" - "}
        <a className={styles.navLink} target="_blank" rel="noopener noreferrer" href="https://spoof2.com">GitHub</a>
        {/* Add a button to toggle the theme */}
      </nav>
        <button onClick={handleToggleTheme} className={styles.themeToggle}>
          {theme === 'dark' ? <AiOutlineBulb /> : <AiFillBulb />}
        </button>
    </header>
  );

}

export default Header;
