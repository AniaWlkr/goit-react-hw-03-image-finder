import React from 'react';
import styles from './IconButton.module.css';
import PropTypes from 'prop-types';

const IconButton = ({ children, type, handleClick, ...allyProps }) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={handleClick}
      {...allyProps}
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.func,
};

IconButton.defaultProps = {
  handleClick: () => null,
  children: [],
  type: 'button',
};

export default IconButton;
