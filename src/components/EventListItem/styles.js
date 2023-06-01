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
    borderRadius: 15,
    backgroundColor: Colors.grey200,
  },
  imagesWrapper: {
    height: height * 0.25,
  },
  sliderPagination: {
    bottom: 15,
  },
  slideContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  slideLoadingContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventInfoContainer: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
  title: {
    color: Colors.black,
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 5,
    marginVertical: 5,
    textTransform: 'capitalize',
  },
  eventInfo: {
    marginHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventInfoLeftPart: {

  },
  priceContainer: {
    borderRadius: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  priceTag: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelIcon: {
    width: 25,
    aspectRatio: 1,
    tintColor: Colors.black,
    marginRight: 5,
  },
  labelText: {
    fontSize: 15,
  },
  eventDateContainer: {
    position: 'absolute',
    width: 55,
    height: 55,
    top: 10,
    right: 10,
    borderRadius: 100,
    zIndex: 50,
    backgroundColor: 'rgba(196,196,196,0.53)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDay: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  eventMonth: {
    color: Colors.white,
  },
});
