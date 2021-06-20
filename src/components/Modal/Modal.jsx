import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import IconButton from '../../components/IconButton';
import { ReactComponent as CloseIcon } from '../../components/icons/cross.svg';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUnmount(nextProps, nextState) {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeOnBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.backdrop} onClick={this.closeOnBackdrop}>
        <div className={styles.content}>{this.props.children}</div>
        <IconButton className={styles.button} onClick={this.props.onClose}>
          <CloseIcon className={styles.icon} />
        </IconButton>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
