import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import ImageButton from '../buttons/image-button';
import {
  BUTTON_BACKWARD_DISABLE,
  BUTTON_BACKWARD_ENABLE,
  BUTTON_FORWARD_DISABLE,
  BUTTON_FORWARD_ENDABLE,
  REWARD_COINS,
  REWARD_HAT,
} from '../../../../resource/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface ImageCarouselProps {
  images: any;
  button_forward_enable?: any;
  button_forward_disable?: any;
  button_backward_enable?: any;
  button_backward_disable?: any;
  onPressForward: () => void;
  onPressBackward: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = props => {
  const {
    images,
    button_backward_disable,
    button_backward_enable,
    button_forward_enable,
    button_forward_disable,
    onPressBackward,
    onPressForward,
  } = props;

  const renderItem = item => {
    return (
      <Image
        source={item.name === 'coins' ? REWARD_COINS : REWARD_HAT}
        resizeMode="contain"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <ImageButton imageSource={BUTTON_BACKWARD_ENABLE} />
      </View>
      <View style={styles.centerContainer}>
        <FlatList
          data={images}
          renderItem={item => renderItem(item)}
          horizontal
          pagingEnabled
        />
      </View>
      <View style={styles.rightContainer}>
        <ImageButton imageSource={BUTTON_FORWARD_ENDABLE} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 8,
    alignItems: 'center',
  },
});

export default ImageCarousel;
