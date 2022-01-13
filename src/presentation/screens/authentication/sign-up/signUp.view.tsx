import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInputField from '../../../components/inputs/TextInputField';
import RectangleButton from '../../../components/buttons/rectangle-button';
import TextButton from '../../../components/buttons/text-button';
import CheckBox from '@react-native-community/checkbox';
import {Formik} from 'formik';
import * as Yup from 'yup';

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
  userName: Yup.string()
    .min(2, 'Tên phải có tối thiểu 2 kí tự')
    .max(100, 'Tên phải có tối đa 100 kí tự')
    .required('Cần nhập họ tên!'),
});

const SignUp: React.FC = (props: any) => {
  const {navigation} = props;
  const [termRead, setTermRead] = useState(false);

  const isAllTrue = (isTermRead: boolean, formikValid: boolean) => {
    if (isTermRead === true || formikValid === true) {
      return true;
    }
    return false;
  };

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <View style={styles.greetingContainer}>
        <Text style={styles.textWelcome}>{'Hey, chào mừng bạn đến với'}</Text>
        <Text style={styles.textTitle}>{'Pepsi Tết'}</Text>
      </View>
      <View style={styles.functionContainer}>
        <Text style={styles.textFunction}>{'Đăng ký'}</Text>
        <Formik
          initialValues={{phoneNumber: '', userName: ''}}
          validationSchema={signInSchema}
          onSubmit={values => {
            // Alert.alert(
            //   `You signed up with information: ${values.phoneNumber} and ${values.userName}`,
            // );
            navigation.navigate('VerifyOTP');
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
              <TextInputField
                errorLabel={formik.errors.userName}
                placeholder="Nhập họ tên"
                inputProps={{
                  value: formik.values.userName,
                  onChangeText: (value: string) => {
                    formik.setFieldValue('userName', value, true);
                  },
                }}
              />
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={termRead}
                  onValueChange={() => setTermRead(!termRead)}
                  boxType={'square'}
                  onFillColor={'white'}
                />
                <Text style={styles.checkboxText}>
                  {'Tôi đã đọc và đồng ý với'}
                </Text>
                <TextButton
                  title=" thể lệ chương trình "
                  onPress={() => navigation.navigate('Term of Service')}
                />
                <Text style={styles.checkboxText}>{'Pepsi Tết'}</Text>
              </View>
              <RectangleButton
                onPress={formik.submitForm}
                title="Lấy mã OTP"
                disabled={isAllTrue(!termRead, !formik.isValid)}
              />
              <Text style={styles.textOr}>{'Hoặc'}</Text>
              <RectangleButton
                title="Đăng nhập"
                titleStyle={styles.titleSignUp}
                activeStyle={styles.buttonSignUp}
                onPress={() => navigation.navigate('Sign in')}
              />
            </KeyboardAwareScrollView>
          )}
        </Formik>
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
  textOr: {
    color: 'white',
    alignSelf: 'center',
  },
  buttonSignUp: {
    width: '70%',
    height: windowHeight * 0.035,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: windowHeight * 0.01,
  },
  titleSignUp: {
    color: '#0063A7',
    fontSize: 25,
    alignSelf: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkboxText: {
    fontSize: 12,
    color: 'white',
  },
});

export default SignUp;
