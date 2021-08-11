import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from 'components/ImageGallery/ImageGallery.module.css';
class ImageGallery extends Component {
  state = {
    hits: [],
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const updatedQuery = this.props.query;

    if (prevQuery !== updatedQuery) {
      console.log('Изменился query');

      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${updatedQuery}&page=1&key=22041445-5ed2f4f2b816c2335628bcb5d&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(resData => resData.hits)
        .then(hits => this.setState({ hits }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { hits, loading } = this.state;
    const { query } = this.props;

    return (
      <div>
        {loading && <div>Loading...</div>}
        {!query && (
          <div>
            There are no images here yet, but they will appear if you enter your
            request
          </div>
        )}
        {hits && (
          <ul className={s.ImageGallery}>
            {hits.map(({ id, webformatURL }) => (
              <ImageGalleryItem id={id} webformatURL={webformatURL} />
            ))}
          </ul>
        )}
        <p></p>
      </div>
    );
  }
}

export default ImageGallery;
