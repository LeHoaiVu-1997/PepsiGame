import React from 'react';
import {StyleSheet, View, SafeAreaView, Text, Dimensions} from 'react-native';

const ScanCode: React.FC = (props: any) => {
  const {navigation} = props;

  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e76e3',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 9,
  },
});

export default ScanCode;
