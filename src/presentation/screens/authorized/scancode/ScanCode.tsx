import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Header from '../../../components/header/header';
import LogoutPopup from '../../../components/popup/logout-popup';
import RectangleButton from '../../../components/buttons/rectangle-button';
import {SCREEN_SCAN} from '../../../../../resource/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ScanCode: React.FC = (props: any) => {
  const {navigation} = props;
  const [codeContent, setCodeContent] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [camReactivate, setCamReactivate] = useState(false);

  let scanner;

  console.log(camReactivate);

  const onSuccess = e => {
    console.log('e: ', e);
  };

  const reactivateCamera = () => {
    // setCamReactivate(!camReactivate);
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
