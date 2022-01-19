import React, {useState} from 'react';
import {StyleSheet, Dimensions, View, ImageBackground} from 'react-native';
import Header from '../../../components/header/header';
import RectangleButton from '../../../components/buttons/rectangle-button';
import LogoutPopup from '../../../components/popup/logout-popup';
import {SCREEN_CONGRATULATION} from '../../../../../resource/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Congratulation: React.FC = (props: any) => {
  const {navigation} = props;

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SCREEN_CONGRATULATION}
        style={styles.container}
        resizeMode="cover">
        <View style={styles.headerContainer}>
          <Header
            leftButtonAvailable={false}
            rightButtonAvailable={true}
            onPressRightButton={() =>
              setLogoutModalVisible(!logoutModalVisible)
            }
          />
        </View>
        <View style={styles.contentContainer}>
          <RectangleButton
            title={'Xác nhận'}
            onPress={() => navigation.navigate('Main screen')}
          />
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
    justifyContent: 'center',
  },
});

export default Congratulation;
