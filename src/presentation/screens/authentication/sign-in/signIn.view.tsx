import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  THREECANONE,
  BUTTON_RED,
  BUTTON_WHITE,
} from '../../../../../resource/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInputField from '../../../components/inputs/TextInputField';
import RectangleButton from '../../../components/buttons/rectangle-button';
import {SCREEN_SIGN} from '../../../../../resource/images';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {saveConfirm} from '../../../redux/slices/authentication';
import {RootState} from '../../../redux/store';
import {signIn} from '../../../redux/actions/authentication.actions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const signInSchema = Yup.object({
  phoneNumber: Yup.string()
    .required('Cần nhập số điện thoại!')
    .min(9, 'Số điện thoại có tối thiểu 9 số.')
    .max(12, 'Số điện thoại có tối đa 12 số.')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ!'),
});

const SignIn: React.FC = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const isUserConfirmed = useSelector(
    (state: RootState) => state.authentication.isUserConfirmed,
  );
  const isLoading = useSelector(
    (state: RootState) => state.authentication.isAuthenticating,
  );

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    dispatch(signIn({phone_number: phoneNumber}));
    if (isUserConfirmed === true) {
      const confirmation = await auth().signInWithPhoneNumber('+84971721198');
      dispatch(saveConfirm(confirmation));
      navigation.navigate('VerifyOTP');
    } else {
      Alert.alert('Đăng nhập không thành công!');
    }
  };

  return (
    <View style={styles.fullScreenContainer}>
      <ImageBackground
        source={SCREEN_SIGN}
        resizeMode="cover"
        style={styles.fullScreenContainer}>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator animating={isLoading} size="large" />
          </View>
        )}
        <View style={styles.greetingContainer}>
          <Text style={styles.textWelcome}>{'Hey, chào mừng bạn đến với'}</Text>
          <Text style={styles.textTitle}>{'Pepsi Tết'}</Text>
        </View>
        <View style={styles.functionContainer}>
          <Text style={styles.textFunction}>{'Đăng nhập'}</Text>
          <Text style={styles.textPhoneNumber}>{'Số điện thoại'}</Text>
          <Formik
            initialValues={{phoneNumber: ''}}
            validationSchema={signInSchema}
            onSubmit={values => {
              // navigation.navigate('VerifyOTP');
              signInWithPhoneNumber(values.phoneNumber);
            }}>
            {formik => (
              <KeyboardAwareScrollView>
                <TextInputField
                  errorLabel={formik.errors.phoneNumber}
                  placeholder="Nhập số điện thoại"
                  numKeyboard={true}
                  inputProps={{
                    value: formik.values.phoneNumber,
                    onChangeText: (value: string) => {
                      formik.setFieldValue('phoneNumber', value, true);
                    },
                  }}
                />
                <Image
                  source={THREECANONE}
                  resizeMode="contain"
                  style={styles.image}
                />
                <RectangleButton
                  onPress={formik.submitForm}
                  title="Lấy mã OTP"
                  disabled={!formik.isValid}
                  backgroundImage={BUTTON_RED}
                />
                <Text style={styles.textOr}>{'Hoặc'}</Text>
                <RectangleButton
                  title="Đăng kí"
                  titleStyle={styles.titleSignUp}
                  activeStyle={styles.buttonSignUp}
                  onPress={() => navigation.navigate('Sign up')}
                  backgroundImage={BUTTON_WHITE}
                />
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    borderRadius: 20,
    flexDirection: 'column',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingContainer: {
    flex: 25,
    // backgroundColor: '#035efc',
    paddingTop: windowHeight * 0.1,
    alignItems: 'center',
  },
  functionContainer: {
    flex: 75,
    // backgroundColor: '#035efc',
    paddingHorizontal: windowWidth * 0.05,
  },
  textWelcome: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
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
  },
  textOr: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: -windowHeight * 0.015,
  },
  image: {
    alignSelf: 'center',
  },
  buttonSignUp: {
    width: '70%',
    height: windowHeight * 0.08,
    // backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginVertical: windowHeight * 0.01,
  },
  titleSignUp: {
    color: '#0063A7',
    fontSize: 25,
    alignSelf: 'center',
  },
});

export default SignIn;
