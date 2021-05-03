import React from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, imgClick }) => {
  return (
    <li className={styles.item}>
      <img
        src={webformatURL}
        alt={tags}
        className={styles.img}
        onClick={() => imgClick(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  pageURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
