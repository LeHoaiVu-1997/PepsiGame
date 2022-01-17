import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {HEAD, DOUBLE_ARROW_UP} from '../../../../resource/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BUTTON_HEIGHT = windowHeight * 0.4;
const BUTTON_WIDTH = windowWidth * 0.2;
const BUTON_PADDING = 10;
const SWIPEABLE_DIMENSON = BUTTON_WIDTH - 2 * BUTON_PADDING;
// const H_WAVE_RANGE = SWIPEABLE_DIMENSON + 2 * BUTON_PADDING;
const V_SWIPE_RANGE = BUTTON_HEIGHT - 2 * BUTON_PADDING - SWIPEABLE_DIMENSON;

console.log('BUTTON_HEIGHT: ', BUTTON_HEIGHT);
console.log('BUTTON_WIDTH: ', BUTTON_WIDTH);
console.log('SWIPEABLE_DIMENSON: ', SWIPEABLE_DIMENSON);
console.log('V_SWIPE_RANGE ', V_SWIPE_RANGE);

export interface HorizontalImageSwipeButtonProps {
  imageSource?: any;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
  onFinish?: () => void;
}

const HorizontalImageSwipeButton: React.FC<
  HorizontalImageSwipeButtonProps
> = props => {
  const {imageSource, buttonContainerStyle, disable, onFinish} = props;

  const Y = useSharedValue(50);
  console.log('Y: ', Y);

  const animatedGestureHandler = useAnimatedGestureHandler({
    onActive: e => {
      Y.value = e.translationY;
      console.log('active Y: ', Y.value);
    },
    onEnd: () => {
      console.log(
        'BUTTON_HEIGHT / 2 - SWIPEABLE_DIMENSON / 2: ',
        BUTTON_HEIGHT / 2 - SWIPEABLE_DIMENSON / 2,
      );
      //BUTTON_HEIGHT / 2 - SWIPEABLE_DIMENSON / 2

      if (Y.value < -100) {
        Y.value = withSpring(-V_SWIPE_RANGE);
        console.log('first Y: ', Y.value);
      } else {
        Y.value = withSpring(50);
        console.log('second Y: ', Y.value);
      }
    },
  });

  const InterpolateYInput = [V_SWIPE_RANGE, 0];
  const AnimatedStyle = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{translateY: Y.value}],
      };
    }),
    swipeArrow: useAnimatedStyle(() => {
      return {
        opacity: interpolate(Y.value, InterpolateYInput, [1, 0]),
        transform: [
          {
            translateY: interpolate(Y.value, InterpolateYInput, [
              0,
              BUTTON_HEIGHT / 2 - SWIPEABLE_DIMENSON,
            ]),
          },
        ],
      };
    }),
  };

  return (
    <View style={styles.buttonContainer}>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[styles.swipeAgent, AnimatedStyle.swipeable]}>
          <Image source={HEAD} />
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[AnimatedStyle.swipeArrow, styles.swipeArrow]}>
        <Image source={DOUBLE_ARROW_UP} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: BUTTON_HEIGHT,
    padding: BUTON_PADDING,
    // marginTop: windowHeight * 0.4,
  },
  swipeAgent: {
    // height: SWIPEABLE_DIMENSON,
    // width: SWIPEABLE_DIMENSON,
    // borderRadius: SWIPEABLE_DIMENSON,
    // backgroundColor: '#f0f',
    position: 'absolute',
    bottom: BUTON_PADDING,
    zIndex: 2,
  },
  swipeArrow: {
    marginTop: windowHeight * 0.6,
    alignSelf: 'center',
    zIndex: 3,
  },
});

export default HorizontalImageSwipeButton;
