import {I18nManager, StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

export default StyleSheet.create({
  swiperPagination: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    flexDirection: 'row',
    zIndex: 40,
    transform: [{scaleX: (I18nManager.isRTL ? -1 : 1)}],
  },
  swiperPaginationItem: {
    marginHorizontal: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 20,
    height: 4,
  },
  swiperPaginationIndicator: {
    position: 'absolute',
    backgroundColor: Colors.white,
    zIndex: 50,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    overflow: 'hidden',
  },
  sliderImg: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
