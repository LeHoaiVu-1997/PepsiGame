import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

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
    let request = await firestore()
      .collection('users')
      .doc(credential.phone_number)
      .set({
        name: credential.name,
        play_time_free: 3,
        play_time_exchange: 0,
      });

    console.log('request: ', request);

    return {success: true, data: credential};
  } else {
    return {success: false, data: credential, note: 'user is aready exists'};
  }
};
