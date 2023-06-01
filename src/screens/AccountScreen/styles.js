import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 40,
  },
});
