import { useEffect, useReducer } from 'react';
import styles from './ImagesPage.module.css';
import pictApi from '../../../services/api';
import Searchbar from '../../Searchbar';
import ImageGallery from '../../ImageGallery';
import Button from '../../Button';
import Loader from '../../Loader';
import Modal from '../../Modal';

const initialState = {
  pictures: [],
  currentPage: 1,
  searchQuery: '',
  error: null,
  isLoading: false,
  largeImgUrl: '',
  showModal: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'setIsLoading':
      return { ...state, isLoading: payload };
    case 'toggleModal':
      return { ...state, showModal: !state.showModal };
    case 'nextPage':
      return { ...state, currentPage: state.currentPage + 1 };
    case 'setQuery':
      return {
        ...state,
        searchQuery: payload,
        pictures: [],
        currentPage: 1,
        error: null,
      };
    case 'setPictures':
      return { ...state, pictures: payload };
    case 'getLargeImgUrl':
      return { ...state, largeImgUrl: payload, showModal: !state.showModal };
    case 'setError':
      return { ...state, error: payload };
    default:
      throw new Error();
  }
};

const ImagesPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    findImages();

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 700);
  }, [state.searchQuery, state.currentPage]);

  const queryUpdate = query => dispatch({ type: 'setQuery', payload: query });

  const getLargeImgUrl = imgUrl =>
    dispatch({ type: 'getLargeImgUrl', payload: imgUrl });

  const findImages = () => {
    dispatch({
      type: 'setIsLoading',
      payload: true,
    });

    pictApi
      .fetchImg(state.searchQuery, state.currentPage)
      .then(pictures => {
        dispatch({
          type: 'setPictures',
          payload: [...state.pictures, ...pictures],
        });
        dispatch({ type: 'nextPage' });
      })
      .catch(error => dispatch({ type: 'setError', payload: error.message }))
      .finally(() => dispatch({ type: 'setIsLoading', payload: false }));
  };

  const { pictures, error, isLoading, showModal, largeImgUrl } = this.state;

  return (
    <>
      <Searchbar findImages={queryUpdate} />
      {error && <h2>Something wrong happened 😔 Please try another search</h2>}
      <ImageGallery pictures={pictures} imgClick={getLargeImgUrl} />
      {isLoading && <Loader />}
      {pictures.length > 0 && !isLoading && (
        <Button
          btnLabel="Load more"
          handleClick={findImages}
          aria-label="Load more"
        />
      )}
      {showModal && (
        <Modal onClose={() => dispatch({ type: 'toggleModal' })}>
          <img src={largeImgUrl} alt="" className={styles.largeImgUrl} />
        </Modal>
      )}
    </>
  );
};

export default ImagesPage;
