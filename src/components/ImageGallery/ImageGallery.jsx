// import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';

export default class ImageGallery extends Component {
  render() {
    return (
      <ul className="ImageGallery">
        {/*Набір <li> із зображеннями*/}
        {this.props.children}
      </ul>
    );
  }
}
