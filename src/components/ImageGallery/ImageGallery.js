import { Component } from 'react';
import s from 'components/ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import SearchError from 'components/SearchError/SearchError';
import Modal from 'components/Modal/Modal';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { fetchImages } from 'services/images-api';

class ImageGallery extends Component {
  state = {
    hiimagests: [],
    showModal: false,
    error: null,
    currentModalImage: null,
    page: 1,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const updatedQuery = this.props.query;

    if (prevQuery !== updatedQuery) {
      console.log('Изменился query');

      this.setState({ status: 'pending' });

      fetchImages(updatedQuery, this.page)
        .then(resData => resData.hits)
        .then(hits => this.setState({ images: hits, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
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

  render() {
    const { images, showModal, error, status, currentModalImage } = this.state;
    // const { query } = this.props;

    if (status === 'idle') {
      return <div>Enter your request</div>;
    }

    if (status === 'pending') {
      return (
        <Loader
          type="TailSpin"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={3000}
        />
      );
    }

    if (status === 'rejected') {
      return <SearchError message={error.message} />;
      // <h2>Sorry, we could not find images with the keyword {query}</h2>
    }

    if (status === 'resolved') {
      return (
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL }) => (
            <ImageGalleryItem
              onImageClick={this.onImageClick}
              key={id}
              id={id}
              webformatURL={webformatURL}
              // largeImageURL={largeImageURL}
            />
          ))}
          {showModal && (
            <Modal>
              <img src={currentModalImage} alt="" />
            </Modal>
          )}
        </ul>
      );
    }
  }
}

export default ImageGallery;
