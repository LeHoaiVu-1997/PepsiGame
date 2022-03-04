import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  ImageBackground,
} from 'react-native';
import RectangleButton from '../buttons/rectangle-button';
import {
  BUTTON_SCAN_NOW,
  POPUP_SCAN_CODE_SUCCESS,
  CLOSE_BUTTON,
} from '../../../../resource/images';
import {DoubleButtonsPopupProps} from './double-buttons-popup';
import ImageButton from '../buttons/image-button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ModalScanCodeSuccessful: React.FC<DoubleButtonsPopupProps> = props => {
  const {onPressFirst, onPressSecond, onClose, data, visible, backgroundImage} =
    props;

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          source={backgroundImage ? backgroundImage : POPUP_SCAN_CODE_SUCCESS}
          style={styles.modalContainer}>
          <ImageButton
            imageSource={CLOSE_BUTTON}
            imageStyle={styles.buttonClose}
            onPress={onClose}
          />
          <View style={styles.viewTextContent}>
            <Text style={styles.textTitle}>{'Bạn nhận được'}</Text>
          </View>
          <View style={styles.viewButton}>
            <RectangleButton
              title="Scan tiếp"
              titleStyle={styles.textButtonTitle}
              onPress={onPressFirst}
              backgroundImage={BUTTON_SCAN_NOW}
              activeStyle={styles.button}
            />
            <RectangleButton
              title="Chơi ngay"
              titleStyle={styles.textButtonTitle}
              onPress={onPressSecond}
              backgroundImage={BUTTON_SCAN_NOW}
              activeStyle={styles.button}
            />
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.6,
  },
  viewTextContent: {
    marginTop: windowHeight * 0.05,
  },
  textTitle: {
    fontSize: 21,
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  buttonClose: {
    alignSelf: 'flex-end',
    marginTop: windowHeight * 0.09,
    marginRight: windowWidth * 0.02,
  },
  viewButton: {
    marginTop: windowHeight * 0.02,
  },
  button: {
    width: windowWidth * 0.35,
    height: windowHeight * 0.05,
  },
  textButtonTitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
  },
});

export default ModalScanCodeSuccessful;
