import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import AppName from './components/AppName';
import Button from './components/Button';
import {Theme} from './theme/Theme';
import {defaultOptions} from './utilities/Utilities';
import {NavigationProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  navigation: NavigationProp<any>;
}

const HomeScreen = ({navigation}: Props) => {
  const resultHandler = (result: ImagePickerResponse) => {
    const {assets} = result;
    if (assets && assets.length > 0) {
      navigation.navigate('Gallery', {
        uri: assets[0].uri,
        width: assets[0].width,
        height: assets[0].height,
      });
    }
  };

  const onImagePickerHandler = async () => {
    await launchImageLibrary(defaultOptions).then(result =>
      resultHandler(result),
    );
  };

  const onCameraPickerHandler = async () => {
    await launchCamera(defaultOptions).then(result => resultHandler(result));
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppName />
      <Button
        title="Select an image from your photo library"
        onPressHandler={onImagePickerHandler}
      />
      <Button title="Take a photo" onPressHandler={onCameraPickerHandler} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.large,
    justifyContent: 'center',
  },
});

export default HomeScreen;
