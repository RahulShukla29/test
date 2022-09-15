import React from 'react';

const formattedAuthorizeHeader = accessToken => {
  return `Bearer ${accessToken}`;
};

export default formattedAuthorizeHeader;
