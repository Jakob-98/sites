import React from 'react';
import * as styles from './screenshotcard.module.css';

const ScreenshotCard = ({screenshotUrl, altDescription, websiteUrl, overlayText}) => {
    return (
        <div className={styles.screenshotCard}>
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                <div className={styles.imageContainer}>
                    <img className={styles.cardImage} src={screenshotUrl} alt={altDescription} />
                    <div className={styles.overlayText}>{overlayText}</div>
                </div>
            </a>
        </div>
    );
}

export default ScreenshotCard;
