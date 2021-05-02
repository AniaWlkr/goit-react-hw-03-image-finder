import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ previewURL, tags, pageURL }) => {
  return (
    <li className={styles.item}>
      <img
        src={previewURL}
        alt={tags}
        data-bigimg={pageURL}
        className={styles.img}
      />
    </li>
  );
};

export default ImageGalleryItem;
