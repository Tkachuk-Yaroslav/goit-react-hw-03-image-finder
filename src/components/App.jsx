import getImg from 'services/gallaryApi';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const LIMIT = 12;
export default class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
    isLoadMore: false,
    // page: null,
    images: null,
    error: null,
  };
  pageDef = 1;
  currentPage = 1;
  incrementPage = () => {
    return (this.pageDef = this.pageDef + 1);
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery === '') {
      alert('Enter something');
      return;
    }

    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        this.currentPage = 1;
        this.pageDef = 1;
        this.setState({
          isLoading: true,
          // page: 1,
        });
        const data = await getImg(
          this.state.searchQuery,
          this.currentPage,
          LIMIT
        );

        if (!data.hits.length) {
          this.setState({
            images: null,
            isLoadMore: false,
          });
          alert('Nothing found');
          return;
        }

        if (data.totalHits / data.hits.length > 1) {
          this.setState({ isLoadMore: true });
        } else {
          this.setState({ isLoadMore: false });
        }
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

  handleLoadMore = async () => {
    try {
      console.log(
        'Клацнули на лоад мор, потрібно зробити перевірку стейта: серч квері і в залежності від цього міняти сторінку або скидати до одиниці'
      );

      this.currentPage += 1;
      console.log('currentPage', this.currentPage);

      this.setState(prev => ({
        isLoading: true,
        // page: prev.page + 1,
      }));

      const data = await getImg(
        this.state.searchQuery,
        this.incrementPage(),
        LIMIT
      );

      if (data.totalHits > LIMIT * this.currentPage) {
        this.setState({ isLoadMore: true });
      } else {
        this.setState({ isLoadMore: false });
      }

      this.setState(
        prevS => ({
          images: [...prevS.images, ...data.hits],
        }),
        () => console.log('imagesLoadMore', this.state.images, this.state.page)
      );
    } catch (error) {
      console.error('Помилка під час отримання даних:', error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  onFormSubmit = dataFromSearchbar => {
    this.setState({ searchQuery: dataFromSearchbar });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onFormSubmit} />

        {/* {this.state.isLoading && <Loader />} */}

        {this.state.images && (
          <ImageGallery>
            <ImageGalleryItem images={this.state.images} />
          </ImageGallery>
        )}

        {this.state.isLoading && <Loader />}

        {this.state.isLoadMore && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
