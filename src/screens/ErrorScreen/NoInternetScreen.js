import React from 'react';
import ErrorView from '../../components/_Common/ErrorView/ErrorView';

export default function NoInternetScreen() {

  return (
    <ErrorView
      content={'No internet connection'}
      imageSrc={require('src/assets/images/error.png')}
    />
  );
}
