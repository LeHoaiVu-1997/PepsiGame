import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Text,
} from 'react-native';
import Header from '../../../components/header/header';
import RectangleButton from '../../../components/buttons/rectangle-button';
import {
  SCREEN_COLLECTION,
  BUTTON_PLUS_ENABLE,
  BUTTON_PLUS_DISABLE,
  BUTTON_MINUS_ENABLE,
  BUTTON_MINUS_DISABLE,
  COIN_BADGE_BIGGER,
  CAN_PEPSI,
  CAN_MIRINDA,
  CAN_SEVENUP,
} from '../../../../../resource/images';
import LogoutPopup from '../../../components/popup/logout-popup';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Collection: React.FC = (props: any) => {
  const {navigation} = props;
  const [isPlusDisabled, setIsPlusDisable] = useState(false);
  const [isMinusDisabled, setIsMinusDisable] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [comboAmount, setComboAmount] = useState(0);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SCREEN_COLLECTION}
        style={styles.container}
        resizeMode="cover">
        <View style={styles.headerContainer}>
          <Header
            title="Bộ sưu tập"
            leftButtonAvailable={true}
            onPressLeftButton={() => navigation.goBack()}
            rightButtonAvailable={true}
            onPressRightButton={handleLogout}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            <Image
              source={COIN_BADGE_BIGGER}
              resizeMode="contain"
              style={styles.imageCoinBadge}
            />
            <Text style={styles.textCoinAmountExplainaion}>
              {'Số coins hiện tại của bạn'}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.cansSection}>
              <View style={styles.singleCanSection}>
                <Image source={CAN_PEPSI} style={styles.imageCan} />
                <Text style={styles.textCanAmount}>{'0'}</Text>
              </View>
              <View style={styles.singleCanSection}>
                <Image source={CAN_MIRINDA} style={styles.imageCan} />
                <Text style={styles.textCanAmount}>{'0'}</Text>
              </View>
              <View style={styles.singleCanSection}>
                <Image source={CAN_SEVENUP} style={styles.imageCan} />
                <Text style={styles.textCanAmount}>{'0'}</Text>
              </View>
            </View>
            <RectangleButton title="Đổi ngay" />
          </View>
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
  },
  headerContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 9,
  },
  topContainer: {
    flex: 3,
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 7,
  },
  cansSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.8,
    alignSelf: 'center',
  },
  singleCanSection: {
    alignItems: 'center',
  },
  imageCoinBadge: {
    marginTop: windowHeight * 0.04,
  },
  imageCan: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.25,
  },
  textCoinAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.03,
  },
  textCoinAmountExplainaion: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.01,
  },
  textCanAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.03,
  },
});

export default Collection;
