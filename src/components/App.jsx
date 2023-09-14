// import getImg from 'services/gallaryApi';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import React, { Component } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
    page: 1,
    images: [],
    error: null,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('componentDidUpdate');
  //   const { searchQuery, page } = this.state;
  //   if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
  //     this.getImages(searchQuery, page);
  //   }
  // }

  // getImages = async (query, page) => {
  //   if (!query) {
  //     return console.log('return');
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

  onFormSubmit = dataFromSearchbar => {
    this.setState({ searchQuery: dataFromSearchbar });
  };

  render() {
    return (
      <div>
        React homework template
        <Searchbar onSubmit={this.onFormSubmit} />
        {this.state.isLoading && <Loader />}
      </div>
    );
  }
}
