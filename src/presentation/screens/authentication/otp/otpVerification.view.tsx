import React, {useRef, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RectangleButton from '../../../components/buttons/rectangle-button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VerifyOtp: React.FC = (props: any) => {
  const {navigation} = props;
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const [wrongOtp, setWrongOtp] = useState(false);
  const [codeFilled, setCodeFilled] = useState(false);
  const passcode1Ref = useRef();
  const passcode2Ref = useRef();
  const passcode3Ref = useRef();
  const passcode4Ref = useRef();
  //   const passcodeRefs = useRef([true, false, false, false]);

  const checkCodeFilled = otpCode => {
    let notFilled = otpCode.filter(item => item === '');

    if (notFilled.length === 0) {
      setCodeFilled(true);
    } else {
      setCodeFilled(false);
    }
  };

  const handleChange = (text: string, index: number) => {
    let newOtp = otp;
    newOtp[index] = text;
    setOtp(newOtp);
    checkCodeFilled(newOtp);
  };

  const verifyOtp = () => {
    // Alert.alert('You pressed otp: ', otp.join(''));
    navigation.navigate('Main screen');
  };

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.textWelcome}>{'Hey, chào mừng bạn đến với'}</Text>
        <Text style={styles.textTitle}>{'Pepsi Tết'}</Text>
      </View>
      <View style={styles.functionContainer}>
        <Text style={styles.textFunction}>{'Xác minh OTP'}</Text>
        <Text style={styles.textPhoneNumber}>
          {'Nhập mã OTP vừa được gửi đến điện thoại của bạn'}
        </Text>
        <KeyboardAwareScrollView>
          <View style={styles.otpContainer}>
            <TextInput
              ref={passcode1Ref}
              style={
                wrongOtp
                  ? styles.passcodeContainerIncorrect
                  : styles.passcodeContainer
              }
              onChangeText={value => {
                handleChange(value, 0);
                if (value != '') passcode2Ref.current.focus();
              }}
              maxLength={1}
            />
            <TextInput
              ref={passcode2Ref}
              style={
                wrongOtp
                  ? styles.passcodeContainerIncorrect
                  : styles.passcodeContainer
              }
              onChangeText={value => {
                handleChange(value, 1);
                if (value != '') passcode3Ref.current.focus();
              }}
              maxLength={1}
            />
            <TextInput
              ref={passcode3Ref}
              style={
                wrongOtp
                  ? styles.passcodeContainerIncorrect
                  : styles.passcodeContainer
              }
              onChangeText={value => {
                handleChange(value, 2);
                if (value != '') passcode4Ref.current.focus();
              }}
              maxLength={1}
            />
            <TextInput
              ref={passcode4Ref}
              style={
                wrongOtp
                  ? styles.passcodeContainerIncorrect
                  : styles.passcodeContainer
              }
              onChangeText={value => handleChange(value, 3)}
              maxLength={1}
            />
          </View>
          <RectangleButton
            title={'Xác nhận'}
            onPress={verifyOtp}
            disabled={!codeFilled}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    // backgroundColor: '#035efc',
    borderRadius: 20,
    flexDirection: 'column',
  },
  greetingContainer: {
    flex: 25,
    backgroundColor: '#035efc',
    paddingTop: windowHeight * 0.1,
    alignItems: 'center',
  },
  functionContainer: {
    flex: 75,
    backgroundColor: '#035efc',
    paddingHorizontal: windowWidth * 0.05,
  },
  textWelcome: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  otpContainer: {
    flexDirection: 'row',
    alignContent: 'stretch',
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: windowHeight * 0.01,
  },
  passcodeContainer: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.05,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
  },
  passcodeContainerIncorrect: {
    width: windowWidth * 0.12,
    height: windowHeight * 0.05,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textTitle: {
    fontSize: 40,
    fontWeight: '400',
    color: 'white',
  },
  textFunction: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    alignSelf: 'center',
  },
  textPhoneNumber: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
    alignSelf: 'center',
  },
  textOr: {
    color: 'white',
    alignSelf: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  buttonActive: {
    width: '70%',
    height: windowHeight * 0.035,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: windowHeight * 0.05,
  },
  titleButton: {
    color: '#0063A7',
    fontSize: 25,
    alignSelf: 'center',
  },
});

export default VerifyOtp;
