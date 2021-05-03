import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ pictures, imgClick }) => {
  return (
    <ul className={styles.list}>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          imgClick={imgClick}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.required,
      webformatURL: PropTypes.string,
      pageURL: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
};

export default ImageGallery;
