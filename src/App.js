import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import s from 'App.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    console.log(query);
    this.setState({ query });
  };
  // state = {
  //   images: null,
  //   loading: false,
  // }

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   fetch(`https://pixabay.com/api/?q=${this.props.query}&page=1&key=22041445-5ed2f4f2b816c2335628bcb5d&image_type=photo&orientation=horizontal&per_page=12`)
  //     .then(res => res.json())
  //     .then(images => {
  //       this.setState({ images })
  //       console.log('in then');
  //     })
  //     .finally(() => this.setState({loading: false}));
  // }

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* {this.state.images && <div>Тут будут картинки</div>} */}
        <ImageGallery query={this.state.query} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
