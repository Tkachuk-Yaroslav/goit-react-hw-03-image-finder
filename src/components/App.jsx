import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';

// export const App = () => {
//   return (
//     <div>
//       React homework template
//       <Searchbar />
//     </div>
//   );
// };
import React, { Component } from 'react';

export default class App extends Component {
  state = { searchQuery: '', isLoading: false };

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
