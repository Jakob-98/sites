import React, { useState } from 'react';
import * as styles from './linkwithpreview.module.css';

const LinkWithPreview = ({ url, children, screenshotUrl }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className={styles.linkPreview} 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
    >
      <a href={url} target="_blank" rel="noreferrer">
        {children}
      </a>
      {hovered && (
        <div className={styles.preview}>
          {screenshotUrl ? (
            <img src={screenshotUrl} alt="Site preview" />
          ) : (
            <div className={styles.iframeContainer}>
              <iframe src={url} title="Site preview" className={styles.iframe} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkWithPreview;
