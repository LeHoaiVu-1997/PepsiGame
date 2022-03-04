import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Header from '../../../components/header/header';
import LogoutPopup from '../../../components/popup/logout-popup';
import RectangleButton from '../../../components/buttons/rectangle-button';
import {SCREEN_SCAN} from '../../../../../resource/images';
import ModalScanCodeFailed from '../../../components/popup/popup-scan-fail';
import ModalScanCodeSuccessful from '../../../components/popup/popup-scan-success';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ScanCode: React.FC = (props: any) => {
  const {navigation} = props;
  const [codeContent, setCodeContent] = useState('');
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [showModalScanFail, setShowModalScanFail] = useState(false);
  const [showModalScanSuccess, setShowModalScanSuccess] = useState(true);

  let scanner;

  const onSuccess = e => {
    let data = e.data;
    // Alert.alert('Mã QR code có nội dung: ', data);
    setShowModalScanFail(!showModalScanFail);
  };

  const reactivateCamera = () => {
    scanner.reactivate();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SCREEN_SCAN}
        resizeMode="cover"
        style={styles.container}>
        <View style={styles.headerContainer}>
          <Header
            leftButtonAvailable={true}
            onPressLeftButton={() => navigation.goBack()}
            rightButtonAvailable={true}
            onPressRightButton={() => {
              setLogoutModalVisible(!logoutModalVisible);
            }}
          />
        </View>
        <View style={styles.contentContainer}>
          <QRCodeScanner
            ref={node => (scanner = node)}
            onRead={onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            cameraStyle={styles.camStyle}
            // showMarker={true}
            cameraProps={{ratio: '5:3'}}
            fadeIn={true}
            // reactivate={true}
          />
          <RectangleButton title={'Quét mã'} onPress={reactivateCamera} />
        </View>
        <LogoutPopup
          visible={logoutModalVisible}
          onPressConfirm={() => {
            setLogoutModalVisible(!logoutModalVisible);
            navigation.popToTop();
          }}
          onPressCanel={() => setLogoutModalVisible(!logoutModalVisible)}
        />
        <ModalScanCodeFailed
          visible={showModalScanFail}
          onPress={() => setShowModalScanFail(!showModalScanFail)}
        />
        <ModalScanCodeSuccessful
          visible={showModalScanSuccess}
          onClose={() => setShowModalScanSuccess(!showModalScanSuccess)}
          onPressFirst={() => setShowModalScanSuccess(!showModalScanSuccess)}
          onPressSecond={() => setShowModalScanSuccess(!showModalScanSuccess)}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e76e3',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 9,
  },
  camStyle: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: windowHeight * 0.08,
  },
});

export default ScanCode;
