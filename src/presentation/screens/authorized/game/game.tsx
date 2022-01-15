import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Dimensions} from 'react-native';
import HorizontalImageSwipeButton from '../../../components/buttons/horizotal-image-swipe-button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Game: React.FC = (props: any) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <HorizontalImageSwipeButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e76e3',
  },
});

export default Game;
