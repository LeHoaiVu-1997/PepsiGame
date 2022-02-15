import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

const baseUrl =
  'https://firestore.googleapis.com/v1/projects/pepsigameauth/databases/(default)/documents';

export const getUser = async (phoneNumber: string) => {
  const doc = await firestore()
    .collection('users')
    .doc(phoneNumber)
    .get()
    .catch(e => {
      Alert.alert('Error: ', e);
    });
  console.log('data: ', doc.data());

  return doc.data();
};

export const signUp = async (credential: any) => {
  let user = await getUser(credential.phone_number);
  if (user === undefined) {
    await firestore()
      .collection('users')
      .doc(credential.phone_number)
      .set({
        name: credential.name,
        play_time_free: 3,
        play_time_exchange: 0,
      })
      .then(res => console.log('res: ', res));

    return {success: true, data: credential};
  } else {
    return {success: false, data: credential, note: 'user is aready exists'};
  }
};

// export const signUp = async (credential: any) => {
//   let user = await getUser(credential.phone_number);
//   if (user === undefined) {
//     let completeUrl = baseUrl.concat('/users/', credential.phone_number);
//     console.log('comple url: ', completeUrl);
//     await axios
//       .post(completeUrl, {
//         fields: {
//           name: credential.name,
//           play_time_exchange: 0,
//           play_time_free: 0,
//         },
//       })
//       .then(res => console.log('res: ', res))
//       .catch(err => console.log('err: ', err));
//     return {success: true, data: credential};
//   } else {
//     return {success: false, data: credential, note: 'user is aready exists'};
//   }
// };

export const requestOtp = async (phoneNumber: string) => {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  return {otp_confirmation: confirmation};
};

export const verifyOtp = async (otp: string, confirm: any) => {
  if (confirm !== undefined) {
    try {
      await confirm.confirm(otp);
      return {success: true};
    } catch {
      return {success: false, note: 'wrong otp code'};
    }
  } else {
    return {success: false, note: 'no otp confirmation'};
  }
};
