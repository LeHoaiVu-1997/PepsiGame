import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const getUser = async (phoneNumber: string) => {
  console.log('phoneNumber: ', phoneNumber);

  let data = [];
  const submit = await firestore()
    .collection('users')
    .where('phone_number', '==', phoneNumber)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        data.push(doc.data());
      });
    })
    .catch(e => {
      Alert.alert('Error: ', e);
    });

  return data;
};
