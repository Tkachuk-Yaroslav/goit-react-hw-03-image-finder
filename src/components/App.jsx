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
  state = { searchQuery: '' };

  onFormSubmit = dataFromSearchbar => {
    this.setState({ searchQuery: dataFromSearchbar });
  };

  render() {
    return (
      <div>
        React homework template
        <Searchbar onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}
