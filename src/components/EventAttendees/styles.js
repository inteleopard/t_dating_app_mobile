import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderColor: Colors.grey100,
    paddingVertical: 8,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyText: {
    marginTop: 100,
    width: '80%',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
});
