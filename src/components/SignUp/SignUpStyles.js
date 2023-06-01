import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    width: '100%',
  },
  headerText: {
    color: Colors.black,
    marginLeft: 20,
    fontSize: 20,
  },
  formContainer: {
    flex: 2,
  },
  formItem: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    flex: 1,
  },
  errorMessage: {
    color: '#dd1707',
  },
  texInput: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 3,
    height: 50,
  },
  picker: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 3,
  },
  submitButton: {
    width: '90%',
    borderRadius: 10,
    position: 'absolute',
    bottom: 40,
  },
});
