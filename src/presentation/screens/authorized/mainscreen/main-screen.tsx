import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {RootState} from '../../../redux/store';
import {useSelector} from 'react-redux';
import RectangleButton from '../../../components/buttons/rectangle-button';
import ImageButton from '../../../components/buttons/image-button';
import {HEAD, LOGOUT_BUTTON} from '../../../../../resource/images';
import LogoutPopup from '../../../components/popup/logout-popup';
import PlayTimesSelection from '../../../components/popup/double-buttons-popup';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MainScreen: React.FC = (props: any) => {
  const {navigation} = props;
  const playTimesExchange = useSelector(
    (state: RootState) => state.authorized.play_times_exchange,
  );
  const playTimesFree = useSelector(
    (state: RootState) => state.authorized.paly_times_free,
  );
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [ptsModalVisible, setPtsModalVisible] = useState(false);

  const renderPlayTimesLeft = (times: number) => {
    return (
      <View style={styles.subTextContainer}>
        <Text style={styles.subText}>{'Bạn có tổng cộng '}</Text>
        <Text style={styles.subTextHighlight}>{times}</Text>
        <Text style={styles.subText}>{' lượt chơi'}</Text>
      </View>
    );
  };

  const navigateToGame = () => {
    navigation.navigate('Game');
    setPtsModalVisible(!ptsModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <ImageButton
          imageSource={LOGOUT_BUTTON}
          onPress={() => setLogoutModalVisible(!logoutModalVisible)}
          buttonContainerStyle={styles.logoutButton}
        />
        <Image style={styles.headImage} source={HEAD} />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.textInstruction}>{'Hướng dẫn'}</Text>
        <RectangleButton
          title={'Chơi ngay'}
          activeStyle={styles.buttonRed}
          subComponent={renderPlayTimesLeft(playTimesExchange + playTimesFree)}
          onPress={() => {
            setPtsModalVisible(!ptsModalVisible);
          }}
        />
        <RectangleButton
          title={'Quét mã'}
          activeStyle={styles.buttonWhite}
          titleStyle={styles.textButton}
        />
        <RectangleButton
          title={'Bộ sưu tập'}
          activeStyle={styles.buttonWhite}
          titleStyle={styles.textButton}
        />
        <RectangleButton
          title={'Chi tiết quà tặng'}
          activeStyle={styles.buttonWhite}
          titleStyle={styles.textButton}
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
      <PlayTimesSelection
        visible={ptsModalVisible}
        onClose={() => setPtsModalVisible(!ptsModalVisible)}
        data={{playTimesFree, playTimesExchange}}
        onPressFirst={() => navigateToGame()}
        onPressSecond={() => navigateToGame()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e76e3',
  },
  topContainer: {
    flex: 5,
  },
  bottomContainer: {
    flex: 5,
  },
  textInstruction: {
    color: '#e3c91e',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  logoutButton: {
    alignSelf: 'flex-end',
    marginTop: windowHeight * 0.05,
    marginRight: windowWidth * 0.02,
    width: '6%',
  },
  textLogout: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'flex-end',
    marginRight: windowWidth * 0.02,
    marginTop: windowHeight * 0.01,
  },
  buttonRed: {
    backgroundColor: 'red',
    height: windowHeight * 0.06,
    width: '70%',
    borderRadius: 5,
  },
  buttonWhite: {
    backgroundColor: 'white',
    height: windowHeight * 0.05,
    width: '70%',
    borderRadius: 5,
  },
  headImage: {
    alignSelf: 'center',
    marginTop: windowHeight * 0.08,
  },
  textButton: {
    fontSize: 18,
    color: '#0063A7',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  subText: {
    fontSize: 12,
    color: 'white',
  },
  subTextHighlight: {
    fontSize: 13,
    color: 'yellow',
    fontWeight: 'bold',
  },
  subTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default MainScreen;
