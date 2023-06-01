import React from 'react';
import ErrorView from '../../Components/_Common/ErrorView/ErrorView';
import {useTranslation} from 'react-i18next';

export default function PositionErrorScreen() {
  const {t} = useTranslation();

  return (
    <ErrorView
      content={t('screens.error.noPosition')}
      imageSrc={require('src/Assets/images/location_error.png')}
    />
  );
}
