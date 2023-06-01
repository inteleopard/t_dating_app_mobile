import React from 'react';
import ErrorView from '../../Components/_Common/ErrorView/ErrorView';
import {useTranslation} from 'react-i18next';

export default function IosFcmErrorScreen() {
  const {t} = useTranslation();

  return (
    <ErrorView
      content={t('screens.error.allowNotifs')}
      imageSrc={require('src/Assets/images/notification.png')}
    />
  );
}
