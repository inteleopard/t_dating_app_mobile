import React, {useCallback, useRef, useState} from 'react';
import {I18nManager, useWindowDimensions, View, Image} from 'react-native';
import {FlatList, GestureHandlerRootView, TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

import styles from './ImagesSliderStyles';
import NavigationService from '../../../services/navigationService';

const RenderItem = ({item: image, parentHeight, slideWidth, resizeMode, sliderImgStyle, slideContainerStyle}) => {
  return (
    <View key={image.id} style={[
      styles.slide,
      slideContainerStyle,
      {width: slideWidth},
      parentHeight && {height: parentHeight},
    ]}>
      <Image
        resizeMode={resizeMode}
        style={sliderImgStyle || styles.sliderImg}
        source={{uri: image.url}}
      />
    </View>
  );
};

const viewabilityConfig = {
  waitForInteraction: true,
  viewAreaCoveragePercentThreshold: 98,
};

export default function ImagesSlider({
                                       images,
                                       parentHeight,
                                       resizeMode = 'cover',
                                       imageViewerResizeMode = 'cover',
                                       sliderImgStyle,
                                       paginationStyle,
                                       slideWidth,
                                       slideContainerStyle,
                                       loadingContainerStyle,
                                     }) {

  const {width} = useWindowDimensions();
  const offset = useSharedValue(0);
  const [currentIdx, setCurrentIdx] = useState(0);

  const indicatorAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: (I18nManager.isRTL ? -1 : 1) * offset.value * (20 + 8)}],
    };
  });

  const scrollHandler = useCallback((event) => {
    offset.value = withSpring(
      interpolate(
        event.nativeEvent.contentOffset.x,
        [0, width * images.length - width],
        [0, images.length - 1]
      ),
      {
        mass: 0.1,
      }
    );
  }, [images.length, offset, width]);

  const onViewableItemsChanged = useCallback((event) => {
    setCurrentIdx(event.changed[0].index);
  }, []);

  const onTouchHandler = useCallback(() => {
    NavigationService.navigate('ImageViewerScreen', {
      images,
      currentIdx,
      resizeMode: imageViewerResizeMode,
    });
  }, [currentIdx, imageViewerResizeMode, images]);

  const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig, onViewableItemsChanged}]);

  return (
    <GestureHandlerRootView style={{flex: 1, width: slideWidth || width}}>
      <View style={{flex: 1}}>
        {images.length > 0 && (
          <TapGestureHandler onEnded={() => onTouchHandler(images)}>
            <FlatList
              onScroll={scrollHandler}
              viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
              initialScrollIndex={currentIdx}
              horizontal
              data={images}
              renderItem={({item}) => <RenderItem
                item={item}
                slideWidth={slideWidth || width}
                parentHeight={parentHeight}
                resizeMode={resizeMode}
                sliderImgStyle={sliderImgStyle}
                slideContainerStyle={slideContainerStyle}
              />}
              keyExtractor={(item) => item.id.toString()}
              snapToAlignment="start"
              decelerationRate={'fast'}
              snapToInterval={width}
              disableIntervalMomentum
              showsHorizontalScrollIndicator={false}
            />
          </TapGestureHandler>
        )}

        {images.length > 1 && (
          <View style={[
            styles.swiperPagination,
            paginationStyle,
          ]}>
            <Animated.View
              style={[
                styles.swiperPaginationItem,
                styles.swiperPaginationIndicator,
                indicatorAnimatedStyles,
              ]}
            />
            {Array(images.length).fill().map((e, idx) => (
              <Animated.View
                key={idx}
                style={styles.swiperPaginationItem}/>
            ))}
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
}
