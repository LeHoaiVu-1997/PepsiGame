import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface IButton {
  activeStyle?: StyleProp<ViewStyle>;
  inactiveStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
  title: string;
  titleStyle?: TextStyle;
}

const RectangleButton: React.FC<IButton> = props => {
  const {activeStyle, inactiveStyle, disabled, onPress, title, titleStyle} =
    props;

  return (
    <TouchableOpacity
      style={
        disabled
          ? [styles.inactiveButton, inactiveStyle]
          : [styles.activeButton, activeStyle]
      }
      onPress={onPress}
      disabled={disabled}>
      <Text style={titleStyle ? titleStyle : styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activeButton: {
    width: '70%',
    height: windowHeight * 0.035,
    backgroundColor: '#FC3B3B',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: windowHeight * 0.01,
    borderRadius: 5,
  },
  inactiveButton: {
    width: '70%',
    height: windowHeight * 0.035,
    backgroundColor: '#8E8E8E',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: windowHeight * 0.01,
    borderRadius: 5,
  },
  title: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
  },
});

export default RectangleButton;
