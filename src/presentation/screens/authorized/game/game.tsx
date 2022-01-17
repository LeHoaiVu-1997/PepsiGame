import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Dimensions} from 'react-native';
import HorizontalImageSwipeButton from '../../../components/buttons/horizotal-image-swipe-button';
import {HEAD} from '../../../../../resource/images';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Game: React.FC = (props: any) => {
  const {navigation} = props;
  const onFinish = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <HorizontalImageSwipeButton
        imageSource={HEAD}
        onFinish={() => console.log('finish')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e76e3',
    justifyContent: 'flex-end',
  },
});

export default Game;
