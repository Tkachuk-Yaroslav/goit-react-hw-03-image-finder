import React from 'react';

const ImageGalleryItem = ({ images }) => {
  return images.map(image => {
    return (
      <li key={image.id} className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={image.webformatURL}
          alt={image.largeImageURL}
        />
      </li>
    );
  });
};

export default ImageGalleryItem;
