import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  hadleChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.findImages(this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <button type="submit" className={styles.button}>
          🔎
        </button>
        <label>
          <input
            type="text"
            name="query"
            placeholder="Enter query"
            value={this.state.query}
            onChange={this.hadleChange}
            className={styles.input}
          ></input>
        </label>
      </form>
    );
  }
}
Searchbar.propTypes = {
  findImages: PropTypes.func,
};

export default Searchbar;
