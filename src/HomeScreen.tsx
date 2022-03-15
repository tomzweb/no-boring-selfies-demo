import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import AppName from './components/AppName';
import ImagePicker from './components/ImagePicker';
import {Theme} from './theme/Theme';
import CameraPicker from './components/CameraPicker';
import RetakeSelfie from './components/RetakeSelfie';
import {defaultOptions} from './utilities/Utilities';
import SelfieImage from './components/SelfieImage';
import {NavigationProp} from '@react-navigation/native';

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
    <View style={styles.container}>
      <AppName />
      <View style={styles.selectContainer}>
        <View style={styles.optionsContainer}>
          <ImagePicker onPressHandler={onImagePickerHandler} />
          <CameraPicker onPressHandler={onCameraPickerHandler} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.large,
  },
  selectContainer: {
    flex: 1,
    marginTop: Theme.spacing.large,
    justifyContent: 'flex-start',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: Theme.spacing.large,
  },
  retakeContainer: {
    marginTop: Theme.spacing.large,
  },
});

export default HomeScreen;
