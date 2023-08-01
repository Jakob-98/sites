import React from 'react';
import { Link } from 'gatsby';
import * as styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.siteTitle}>
        <Link className={styles.navLink} to="/">Jakobs.dev</Link>
      </h1>
      <nav>
        <Link className={styles.navLink} to="/about">About</Link>
        <Link className={styles.navLink} to="/blog">Blog</Link>
      </nav>
    </header>
  );
}

export default Header;
