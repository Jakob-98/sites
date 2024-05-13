import React, { useState, useEffect } from 'react';
import { AiFillGithub, AiFillLinkedin, AiFillMail} from 'react-icons/ai';
import {BsRssFill} from 'react-icons/bs';
import ViewButton from './Views';
import * as styles from './footer.module.css';

const Footer = () => {
    const [currentURL, setCurrentURL] = useState('');

  useEffect(() => {
    // Set the current URL after component mounts
    setCurrentURL(window.location.href);
  }, []);
  return (
    <footer className={styles.footer}>
      <hr/>
      <p className={styles.loremText}>
        So long, and thanks for all the fish.
      </p>
      <div className={styles.socials}>
        <a href="https://github.com/Jakob-98" target="_blank" rel="noreferrer" className={styles.navLink}>
          <AiFillGithub />
        </a>
        <a href="https://linkedin.com/in/serlier" target="_blank" rel="noreferrer" className={styles.navLink}>
          <AiFillLinkedin />
        </a>
        <a href="/rss.xml" target="_blank" rel="noreferrer" className={styles.navLink}>
          <BsRssFill />
        </a>
        <a href="mailto:mail@jakobs.dev" target="_blank" rel="noreferrer" className={styles.navLink}>
          <AiFillMail />
        </a>
      </div>
      <div className={styles.viewButtonContainer}>
         <ViewButton url={currentURL} addViewOnMount={true} />
      </div>
      <p className={styles.copyright}>
        copyright Jakob Serlier 2023-2023 || contact: mail@jakobs.dev
      </p>
    </footer>
  );
}

export default Footer;
