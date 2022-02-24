import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import ImageButton from '../buttons/image-button';
import {
  EXCHANGE_COMBO_RESULT,
  BUTTON_CLOSE_WHITE,
  REWARD_COINS,
  REWARD_HAT,
  BUTTON_BACKWARD_DISABLE,
  BUTTON_BACKWARD_ENABLE,
  BUTTON_FORWARD_DISABLE,
  BUTTON_FORWARD_ENDABLE,
} from '../../../../resource/images';
import ImageCarousel from '../listviews/ImagesCarousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface ModalGiftRevealProps {
  visible: boolean;
  onClose: () => void;
  payload?: any;
  backgoundImage?: any;
}

const ModalGiftReveal: React.FC<ModalGiftRevealProps> = props => {
  const {visible, onClose, payload, backgoundImage} = props;

  return (
    <Modal visible={visible} transparent={false} animationType="fade">
      <View style={styles.modalContainer}>
        <ImageBackground
          source={backgoundImage ? backgoundImage : EXCHANGE_COMBO_RESULT}
          style={styles.modalContentContainer}
          resizeMode="cover">
          <View style={styles.rewardSection}>
            {/* <Image source={REWARD_COINS} resizeMode="contain" /> */}
            <ImageCarousel
              images={payload.images}
              onPressBackward={() => {}}
              onPressForward={() => {}}
            />
          </View>
          <View style={styles.textSection}>
            <Text style={styles.text}>{'Bạn nhận được'}</Text>
          </View>
          <ImageButton imageSource={BUTTON_CLOSE_WHITE} onPress={onClose} />
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalContentContainer: {
    height: windowHeight * 0.7,
    alignItems: 'center',
    width: windowWidth,
    justifyContent: 'flex-end',
  },
  rewardSection: {
    marginBottom: windowHeight * 0.13,
  },
  textSection: {
    marginBottom: windowHeight * 0.1,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  textHightlight: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ModalGiftReveal;
