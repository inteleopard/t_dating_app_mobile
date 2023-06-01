import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.black,
    padding: 0,
  },
  titleFocused: {
    fontWeight: 'bold',
  },
  badge: {
    marginLeft: 5,
    backgroundColor: Colors.red500,
    fontWeight: 'bold',
  },
});
