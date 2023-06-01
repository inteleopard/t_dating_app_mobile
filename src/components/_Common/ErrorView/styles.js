import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  content: {
    marginHorizontal: 20,
    fontSize: 19,
  },
  image: {
    width: '70%',
    aspectRatio: 1,
    alignSelf: 'center',
    tintColor: Colors.grey800,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
