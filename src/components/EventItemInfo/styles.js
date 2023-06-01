import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    alignItems: 'flex-start',
    paddingTop: 150,
    width: '80%',
    alignSelf: 'center',
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 3,
    marginVertical: 6,
    marginBottom: 40,
  },
  imagesWrapper: {
    height: height * 0.38,
  },
  sliderPagination: {
    bottom: 15,
  },
  eventInfoContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 20,
    color: Colors.black,
  },
  eventInfo: {
  },
  eventDescription: {
    fontSize: 20,
    marginTop: 10,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: Colors.grey100,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 3,
  },
  labelIcon: {
    width: 30,
    aspectRatio: 1,
    tintColor: Colors.black,
    marginRight: 10,
  },
  labelText: {
    fontSize: 20,
    flex: 1,
  },
  labelIconBtn: {
    width: 30,
    aspectRatio: 1,
    tintColor: Colors.black,
  },
  button: {
    justifyContent: 'center', // Vertically center the label
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
