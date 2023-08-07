import React from 'react';
import { AiFillGithub, AiOutlineTwitter, AiFillLinkedin, AiFillFacebook, AiFillCopyrightCircle } from 'react-icons/ai';
import * as styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr/>
      <p className={styles.loremText}>
        So long and thanks for all the fish.
      </p>
      <div className={styles.socials}>
        <a href="https://github.com/Jakob-98" target="_blank" rel="noreferrer" className={styles.navLink}>
          <AiFillGithub />
        </a>
        {/* <a href="https://twitter.com/" target="_blank" rel="noreferrer" className={styles.navLink}>
          <AiOutlineTwitter />
        </a> */}
        <a href="https://linkedin.com/in/serlier" target="_blank" rel="noreferrer" className={styles.navLink}>
          <AiFillLinkedin />
        </a>
        {/* <a href="https://facebook.com/" target="_blank" rel="noreferrer" className={styles.navLink}>
          <AiFillFacebook />
        </a> */}
      </div>
      <p className={styles.copyright}>
        copyright Jakob Serlier 2023-2023
      </p>
    </footer>
  );
}

export default Footer;
