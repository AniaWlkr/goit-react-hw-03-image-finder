import React from 'react';
import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ btnLabel, handleClick, ...allyProps }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      {...allyProps}
    >
      {btnLabel}
    </button>
  );
};

Button.propTypes = {
  btnLabel: PropTypes.string,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  btnLabel: 'Click me',
  handleClick: () => null,
};

export default Button;
