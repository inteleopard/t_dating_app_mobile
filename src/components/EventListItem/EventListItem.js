import {Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import navigationService from '../../services/navigationService';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function EventListItem({item}) {
  const {id, title, seats, address, orders, amount, currency} = item;

  return (
    <View style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => {
        navigationService.navigate('EventItemScreen', {eventId: id});
      }}>
        <View style={styles.itemContainer}>
          <View style={styles.eventInfoContainer}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.eventInfo}>
              <View style={styles.eventInfoLeftPart}>
                <View style={styles.labelWithIcon}>
                  <Text style={styles.labelText}>{address}</Text>
                </View>

                <View style={styles.labelWithIcon}>
                  <Text style={styles.labelText}>{orders?.length}/{seats}</Text>
                </View>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.priceTag}>{amount} {currency}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
