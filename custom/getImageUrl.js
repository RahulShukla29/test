import React from 'react';

const getImageUrl = (apiImageJson, imageTypeKey) => {
  // Grabs the image url from the specified image type
  // Designed for Airtable API

  var image_url;

  switch (imageTypeKey) {
    case 'thumbnails_large':
      image_url = apiImageJson[0]['thumbnails']['large']['url'];
      break;
    case 'thumbnails_small':
      image_url = apiImageJson[0]['thumbnails']['small']['url'];
      break;
    default:
      image_url = apiImageJson[0]['thumbnails']['large']['url'];
  }

  return image_url;
};

export default getImageUrl;
