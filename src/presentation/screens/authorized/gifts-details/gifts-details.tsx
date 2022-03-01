import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/header/header';
import RectangleButton from '../../../components/buttons/rectangle-button';
import {
  SCREEN_GIFTS_DETAILS,
  COIN_BADGE_BIGGER,
  EMPTY_BOX,
  BACKGROUND_GIFT_AVAILABLE,
  BACKGROUND_GIFT_EXCHANGED,
  REWARD_COINS,
  REWARD_HAT,
  REWARD_BAG,
  REWARD_JACKET,
  REWARD_TUMBLER,
  BUTTON_WHITE,
} from '../../../../../resource/images';
import {RootState} from '../../../redux/store';
import {FlatList} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GiftsDetails: React.FC = (props: any) => {
  const {navigation} = props;
  const user = useSelector((state: RootState) => state.authorized.user);

  const renderButtonContent = () => {
    //  return renderExchangedGifts(user.gifts);
    return renderGiftStore(user.gifts);
  };

  const renderGiftStore = giftStore => {
    return (
      <View style={{alignItems: 'center'}}>
        <ImageBackground
          source={COIN_BADGE_BIGGER}
          resizeMode={'contain'}
          style={styles.imageCoinBadge}>
          <Text style={styles.textCoins}>{user.collection.coins}</Text>
        </ImageBackground>
        <View style={styles.viewTextCoinsExplaination}>
          <Text style={styles.textCoinsExplaination}>
            {'Số coins hiện tại của bạn'}
          </Text>
        </View>
        <View style={styles.flatlist}>
          <FlatList
            data={giftStore}
            renderItem={flatlistRenderItem_GiftStore}
            numColumns={2}
          />
        </View>
      </View>
    );
  };

  const flatlistRenderItem_GiftStore = ({item, index}) => {
    let imgSource = REWARD_COINS;
    switch (item.name) {
      case 'hat':
        imgSource = REWARD_HAT;
        break;
      case 'jacket':
        imgSource = REWARD_JACKET;
        break;
      case 'bag':
        imgSource = REWARD_BAG;
        break;
      case 'tumbler':
        imgSource = REWARD_TUMBLER;
        break;
      default:
        imgSource = REWARD_COINS;
    }
    return (
      <View style={styles.backgroundRed}>
        <ImageBackground
          source={BACKGROUND_GIFT_AVAILABLE}
          style={styles.backgroundRed}
          resizeMode="cover">
          <View style={styles.viewTextIndex}>
            <Text style={styles.textIndex}>{`${index + 1}`}</Text>
          </View>
          <View style={styles.viewImages}>
            <Image source={imgSource} resizeMode="contain" />
          </View>
          <View style={styles.viewTextDescription}>
            <Text style={styles.textDescriptionYellow}>{item.description}</Text>
            <View style={styles.viewTextDelivery}>
              <Text style={styles.textDeliveryStatus}>{'Trạng thái: '}</Text>
              <Text
                style={styles.textDeliveredTrue}>{`${item.delivered}`}</Text>
            </View>
          </View>
          <RectangleButton
            title="Đổi quà"
            titleStyle={styles.textButtonTitle}
            backgroundImage={BUTTON_WHITE}
            onPress={() => {}}
            activeStyle={styles.buttonExchangeGift}
          />
        </ImageBackground>
      </View>
    );
  };

  const renderExchangedGifts = userGifts => {
    if (userGifts.length < 1 || userGifts === undefined || userGifts === null) {
      return (
        <View>
          <Image
            source={EMPTY_BOX}
            resizeMode="contain"
            style={styles.imageEmptyBox}
          />
          <View style={styles.textEmptyBoxSection}>
            <Text style={styles.textEmptyBox}>
              {'Kho quà còn trống!\nHãy dùng coins của bạn để đổi quà'}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.flatlist}>
          <FlatList
            data={userGifts}
            renderItem={flatListRenderItem_GiftExchanged}
            numColumns={2}
          />
        </View>
      );
    }
  };

  const flatListRenderItem_GiftExchanged = ({item, index}) => {
    let imgSource = REWARD_COINS;
    switch (item.name) {
      case 'hat':
        imgSource = REWARD_HAT;
        break;
      case 'jacket':
        imgSource = REWARD_JACKET;
        break;
      case 'bag':
        imgSource = REWARD_BAG;
        break;
      case 'tumbler':
        imgSource = REWARD_TUMBLER;
        break;
      default:
        imgSource = REWARD_COINS;
    }
    return (
      <View style={styles.backgroundYellow}>
        <ImageBackground
          source={BACKGROUND_GIFT_EXCHANGED}
          style={styles.backgroundYellow}
          resizeMode="cover">
          <View style={styles.viewTextIndex}>
            <Text style={styles.textIndex}>{`${index + 1}`}</Text>
          </View>
          <View style={styles.viewImages}>
            <Image source={imgSource} resizeMode="contain" />
          </View>
          <View style={styles.viewTextDescription}>
            <Text style={styles.textDescriptionBlue}>{item.description}</Text>
            <View style={styles.viewTextDelivery}>
              <Text style={styles.textDeliveryStatus}>{'Trạng thái: '}</Text>
              <Text
                style={styles.textDeliveredTrue}>{`${item.delivered}`}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={SCREEN_GIFTS_DETAILS}
        style={styles.container}
        resizeMode="cover">
        <View style={styles.headerContainer}>
          <Header
            title="Chi tiết quà tặng"
            leftButtonAvailable={true}
            onPressLeftButton={() => navigation.goBack()}
            rightButtonAvailable={true}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.leftButton} onPress={() => {}}>
                <Text style={styles.textButton}>{'Đổi quà'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rightButton} onPress={() => {}}>
                <Text style={styles.textButton}>{'Quà của tôi'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>{renderButtonContent()}</View>
        </View>
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
    flex: 1,
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 9,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: windowHeight * 0.03,
  },
  leftButton: {
    backgroundColor: 'red',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: windowWidth * 0.38,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButton: {
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: windowWidth * 0.38,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 18,
    fontWeight: '800',
  },
  flatlist: {
    marginTop: windowWidth * 0.03,
  },
  imageCoinBadge: {
    width: windowWidth * 0.25,
    height: windowHeight * 0.125,
    justifyContent: 'center',
    marginTop: windowHeight * 0.03,
  },
  textCoins: {
    fontSize: 30,
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
  },
  viewTextCoinsExplaination: {
    marginTop: windowHeight * 0.01,
  },
  textCoinsExplaination: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backgroundRed: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.35,
    borderRadius: 20,
    marginHorizontal: windowWidth * 0.02,
    marginVertical: windowHeight * 0.01,
  },
  backgroundYellow: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.3,
    borderRadius: 20,
    marginHorizontal: windowWidth * 0.02,
    marginVertical: windowHeight * 0.01,
  },
  viewImages: {
    alignItems: 'center',
    width: '100%',
    height: windowHeight * 0.165,
  },
  viewTextIndex: {
    alignItems: 'flex-end',
    marginTop: windowHeight * 0.025,
    marginRight: windowWidth * 0.05,
  },
  textIndex: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
  },
  viewTextDescription: {
    marginTop: windowHeight * 0.012,
  },
  textDescriptionBlue: {
    fontWeight: '800',
    color: 'blue',
    fontSize: 16,
    textAlign: 'center',
  },
  viewTextDelivery: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: windowHeight * 0.006,
  },
  textDeliveryStatus: {
    color: 'blue',
    fontSize: 11,
  },
  textDeliveredTrue: {
    fontSize: 11,
    color: 'green',
    fontWeight: '900',
  },
  textDeliveredFalse: {
    fontSize: 11,
    color: 'red',
    fontWeight: '900',
  },
  imageEmptyBox: {
    alignSelf: 'center',
  },
  textEmptyBoxSection: {
    marginTop: windowHeight * 0.03,
  },
  textEmptyBox: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  buttonExchangeGift: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.06,
    borderRadius: 10,
  },
  textButtonTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'blue',
    textAlign: 'center',
  },
  textDescriptionYellow: {
    fontWeight: '800',
    color: 'yellow',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default GiftsDetails;
