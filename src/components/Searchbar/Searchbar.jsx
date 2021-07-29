import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import IconButton from '../../components/IconButton';
import { ReactComponent as SearchIcon } from '../../components/icons/search.svg';

class Searchbar extends Component {
  state = {
    query: '',
  };

  hadleChange = event => {
    this.setState({ query: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.findImages(this.state.query.trim());
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={styles.searchBar}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <IconButton type="submit" className={styles.button}>
            <SearchIcon className={styles.icon} />
          </IconButton>
          <label>
            <input
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search for images and photos"
              value={this.state.query}
              onChange={this.hadleChange}
              className={styles.input}
            ></input>
          </label>
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  findImages: PropTypes.func,
};

export default Searchbar;
