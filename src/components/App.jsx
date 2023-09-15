import getImg from 'services/gallaryApi';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
    isLoadMore: false,
    page: 1,
    images: [],
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery === '') {
      alert('Enter something');
      return;
    }

    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        this.setState({
          isLoading: true,
        });
        const data = await getImg(this.state.searchQuery);
        this.setState(
          prevS => ({
            images: data.hits,
          }),
          () => console.log('images', this.state.images)
        );
        console.log(data);
      } catch (error) {
        console.error('Помилка під час отримання даних:', error);
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('componentDidUpdate');
  //   const { searchQuery, page } = this.state;
  //   if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
  //     this.getImages(searchQuery, page);
  //   }
  // }

  // getImages = async (query, page) => {
  //   if (!query) {
  //     const t = console.log('return');
  //     return alert('Потрібно щось увести');
  //   }
  //   this.setState({
  //     searchQuery: query,
  //     page,
  //     isLoading: true,
  //   });
  //   try {
  //     const { hits, totalHits } = await getImg(query, page);
  //     console.log('hits>>', hits);
  //     if (hits.length === 0) {
  //       // this.setState({ loadMore: false });
  //       alert('Nothing was found for your request. Try something else');
  //     } else {
  //       this.setState(
  //         prevState => ({
  //           images: [...prevState.images, ...hits],
  //           //loadMore:
  //           //this.state.page < Math.ceil(totalHits / this.state.per_page),
  //           //status: Status.RESOLVED,
  //         }),
  //         () => console.log('КОЛБЕК', this.state)
  //       );
  //       console.log(this.state);
  //     }
  //   } catch (error) {
  //     // this.setState({ error: error.message, status: Status.REJECTED });
  //     console.log(error);
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };

  handleLoadMore = () => {
    console.log(
      'Клацнули на лоад мор, потрібно зробити перевірку стейта: серч квері і в залежності від цього міняти сторінку або скидати до одиниці'
    );
  };

  onFormSubmit = dataFromSearchbar => {
    this.setState({ searchQuery: dataFromSearchbar });
  };

  render() {
    return (
      <div className="App">
        {/* React homework template */}
        <Searchbar onSubmit={this.onFormSubmit} />
        {this.state.isLoading && <Loader />}
        <ImageGallery>
          <ImageGalleryItem images={this.state.images} />
        </ImageGallery>
        <Button handleLoadMore={this.handleLoadMore} />
      </div>
    );
  }
}
