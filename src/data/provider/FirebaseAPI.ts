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

  return doc.data();
};
