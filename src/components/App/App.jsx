import { Component } from 'react';
import styles from './App.module.css';
import pictApi from '../../services/api';
import Searchbar from '../Searchbar';
import ImageGallery from '../../components/ImageGallery';
import Button from '../Button';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

class App extends Component {
  state = {
    pictures: [],
    currentPage: 1,
    searchQuery: '',
    error: null,
    isLoading: false,
    largeImgUrl: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.findImages();
    }
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 700);
  }

  findImages = () => {
    const { searchQuery, currentPage } = this.state;

    this.setState({ isLoading: true });

    pictApi
      .fetchImg(searchQuery, currentPage)
      .then(pictures => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  queryUpdate = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      pictures: [],
      error: null,
    });
  };

  getlargeImgUrl = imgUrl => {
    this.setState({ largeImgUrl: imgUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { pictures, error, isLoading, showModal, largeImgUrl } = this.state;

    return (
      <div className={styles.container}>
        <Searchbar findImages={this.queryUpdate} />
        {error && (
          <h2>Something wrong happened 😔 Please try another search</h2>
        )}

        <ImageGallery pictures={pictures} imgClick={this.getlargeImgUrl} />
        {isLoading && <Loader />}
        {pictures.length > 0 && !isLoading && (
          <Button
            btnLabel="Load more"
            handleClick={this.findImages}
            aria-label="Load more"
          />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImgUrl} alt="" className={styles.largeImgUrl} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
