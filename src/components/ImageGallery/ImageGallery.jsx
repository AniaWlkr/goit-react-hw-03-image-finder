import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ pictures }) => {
  return (
    <ul className={styles.list}>
      {pictures.map(({ id, previewURL, pageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          previewURL={previewURL}
          pageURL={pageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.required,
      previewURL: PropTypes.string,
      pageURL: PropTypes.string,
      tags: PropTypes.string,
    }),
  ),
};

export default ImageGallery;
