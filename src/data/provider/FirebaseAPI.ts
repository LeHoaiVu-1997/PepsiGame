import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
// import axios from 'axios';
import auth from '@react-native-firebase/auth';

// const baseUrl =
//   'https://firestore.googleapis.com/v1/projects/pepsigameauth/databases/(default)/documents';

export const getUser = async (phoneNumber: string) => {
  const doc = await firestore()
    .collection('users')
    .doc(phoneNumber)
    .get()
    .catch(e => {
      Alert.alert('Error: ', e);
    });

  let user = doc.data();
  if (user !== undefined) {
    user.phone_number = phoneNumber;
  }
  console.log('user: ', user);

  return user;
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
        collection: {
          coins: 0,
          pepsi_cans: 0,
          mirinda_cans: 0,
          sevenup_cans: 0,
        },
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

export const getReward = async () => {
  const doc = await firestore()
    .collection('rewards')
    .doc('1')
    .get()
    .catch(e => {
      Alert.alert('Error: ', e);
    });
  // console.log('reward: ', doc.data());

  if (doc.data() != undefined) {
    return {reward: doc.data(), success: true};
  } else {
    return {success: false, note: 'no reward'};
  }
};

export const updateUser = async (user: any) => {
  let tempUser = JSON.parse(JSON.stringify(user));
  delete tempUser.phone_number;
  // console.log('temp user: ', tempUser);
  await firestore().collection('users').doc(user.phone_number).update(tempUser);
  return {success: true, user: user};
};
