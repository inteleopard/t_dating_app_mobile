import React from 'react';
import ErrorView from '../../components/_Common/ErrorView/ErrorView';

export default function ErrorScreen() {

  return (
    <ErrorView
      content={'Something went wrong!'}
      imageSrc={require('src/assets/images/error.png')}
    />
  );
}
