import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import s from 'App.module.css';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Container from 'components/Container/Container';

class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    console.log(query);
    this.setState({ query });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Container>
          <ImageGallery query={this.state.query} />
          <ToastContainer autoClose={3000} />
        </Container>
      </div>
    );
  }
}

export default App;
