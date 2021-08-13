import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import s from 'App.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Container from 'components/Container/Container';

import SearchError from 'components/SearchError/SearchError';
import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { fetchImages } from 'services/images-api';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    status: 'idle',
    loader: false,
    error: null,
    showModal: false,
    currentModalImage: null,
  };

  handleFormSubmit = query => {
    console.log(query);
    this.setState({ query, page: 1, images: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      console.log('Изменился query или Добавилась страница');

      this.setState({ loader: true });

      fetchImages(query, page)
        .then(resData => resData.hits)
        .then(hits => {
          if (prevState.page < page) {
            this.setState({
              images: [...prevState.images, ...hits],
              status: 'resolved',
            });
          } else {
            this.setState({ images: hits, status: 'resolved' });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => {
          if (this.state.images.length > 12) {
            this.scroll();
            this.setState({ loader: false });
          }
        });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = id => {
    const modalImage = this.state.images.find(image => image.id === id);
    const modalImageUrl = modalImage.largeImageURL;
    this.setState({
      currentModalImage: modalImageUrl,
    });
    this.toggleModal();
  };

  loadMoreImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loader: true,
    }));
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, showModal, error, status, currentModalImage, loader } =
      this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Container>
          {status === 'idle' && <div>Enter your request</div>}

          {status === 'rejected' && <SearchError message={error.message} />}

          {status === 'resolved' && (
            <ImageGallery images={images} onImageClick={this.onImageClick} />
          )}

          {loader && (
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={80}
              width={80}
              timeout={3000}
            />
          )}

          {images.length !== 0 && <Button onClick={this.loadMoreImages} />}

          {showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={currentModalImage} alt="" />
            </Modal>
          )}

          <ToastContainer autoClose={3000} />
        </Container>
      </div>
    );
  }
}

export default App;
