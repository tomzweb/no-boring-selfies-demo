import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import AppName from './components/AppName';
import Button from './components/Button';
import {FontWeight, Theme} from './theme/Theme';
import {defaultOptions} from './utilities/Utilities';
import {NavigationProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import InstructionText from './components/InstructionText';

interface Props {
  navigation: NavigationProp<any>;
}

const HomeScreen = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

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

  const iconColor = isDarkMode
    ? Theme.colors.greyLightest
    : Theme.colors.greyDark;

  return (
    <SafeAreaView style={styles.container}>
      <AppName />
      <InstructionText />
      <Button
        title="From your photo library"
        icon="ios-images"
        iconSize={Theme.fontSize.larger * 2}
        iconColor={iconColor}
        onPressHandler={onImagePickerHandler}
      />
      <Button
        title="Take a new selfie"
        icon="ios-camera"
        iconSize={Theme.fontSize.larger * 2}
        iconColor={iconColor}
        onPressHandler={onCameraPickerHandler}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.large,
    justifyContent: 'center',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default HomeScreen;
