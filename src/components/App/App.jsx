import { Component } from 'react';
import styles from './App.module.css';
import pictApi from '../../services/api';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../../components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    pictures: [],
    currentPage: 1,
    searchQuery: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.findImages();
    }
  }

  findImages = () => {
    const { searchQuery, currentPage } = this.state;

    pictApi
      .fetchImg(searchQuery, currentPage)
      .then(pictures => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
        }));
      })
      .catch(error => console.log(error));
  };

  queryUpdate = query => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { pictures } = this.state;

    return (
      <div className={styles.container}>
        <Searchbar findImages={this.queryUpdate} />
        {pictures.length && <ImageGallery pictures={pictures} />}
      </div>
    );
  }
}

export default App;
