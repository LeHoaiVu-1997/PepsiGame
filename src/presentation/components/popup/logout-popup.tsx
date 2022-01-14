import React from 'react';
import {View, StyleSheet, Text, Modal, Dimensions} from 'react-native';
import RectangleButton from '../buttons/rectangle-button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export interface LogoutPopup {
  onPressConfirm?: () => void;
  onPressCanel?: () => void;
  visible: boolean;
}

const LogoutPopup: React.FC<LogoutPopup> = props => {
  const {onPressConfirm, onPressCanel, visible} = props;
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{'Bạn có chắc chắn muốn'}</Text>
            <View style={styles.subTextContainer}>
              <Text style={styles.textBold}>{'đăng xuất'}</Text>
              <Text style={styles.text}>{' không?'}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <RectangleButton
              title="Đăng xuất"
              titleStyle={styles.textConfirmButton}
              activeStyle={styles.confirmButton}
              disabled={false}
              onPress={onPressConfirm}
            />
            <RectangleButton
              title="Huỷ"
              titleStyle={styles.textCancelButton}
              activeStyle={styles.canelButton}
              disabled={false}
              onPress={onPressCanel}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '50%',
    height: '20%',
    backgroundColor: '#fcd01e',
    borderRadius: 10,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: windowHeight * 0.01,
  },
  subTextContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text: {
    color: '#0063A7',
    fontSize: 13,
  },
  textBold: {
    color: '#0063A7',
    fontSize: 13,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: windowHeight * 0.02,
  },
  confirmButton: {
    backgroundColor: 'red',
    width: windowWidth * 0.25,
  },
  textConfirmButton: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
  },
  canelButton: {
    width: windowWidth * 0.25,
    backgroundColor: 'white',
  },
  textCancelButton: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LogoutPopup;
