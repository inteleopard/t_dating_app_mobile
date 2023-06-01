import {Button as PaperButton, Colors, Dialog, Paragraph, Portal} from 'react-native-paper';
import React from 'react';

export default function ConfirmationDialog({visible, title, content, onDismiss, confirmCallback}) {

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{content}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <PaperButton color={Colors.blue500} onPress={onDismiss}>{'Cancel'}</PaperButton>
          <PaperButton color={Colors.red500} onPress={confirmCallback}>{'Confirm'}</PaperButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
