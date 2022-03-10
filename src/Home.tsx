import React, {useState} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import AppName from './components/AppName';
import ImagePicker from './components/ImagePicker';
import {Theme} from './theme/Theme';
import CameraPicker from './components/CameraPicker';
import RetakeSelfie from './components/RetakeSelfie';
import {defaultOptions, windowHeight, windowWidth} from './utilities/Utilities';
import {Selfie} from './utilities/Types';
import SelfieImage from './components/SelfieImage';

const Home = () => {
  const [selfie, setSelfie] = useState<Selfie | undefined>();

  const onImagePickerHandler = async () => {
    await launchImageLibrary(defaultOptions).then(result =>
      resultHandler(result),
    );
  };

  const onCameraPickerHandler = async () => {
    await launchCamera(defaultOptions).then(result => resultHandler(result));
  };

  const resultHandler = (result: ImagePickerResponse) => {
    const {assets} = result;
    if (assets && assets.length > 0) {
      setSelfie({
        base64: assets[0].base64,
        width: assets[0].width,
        height: assets[0].height,
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppName />
      <View style={styles.selectContainer}>
        {selfie ? (
          <>
            <View style={styles.selfieContainer}>
              <SelfieImage
                uri={`data:image/jpeg;base64,${selfie.base64}`}
                width={selfie.width}
                height={selfie.height}
              />
            </View>
            <View>
              <RetakeSelfie onPressHandler={() => setSelfie(undefined)} />
            </View>
          </>
        ) : (
          <View style={styles.optionsContainer}>
            <ImagePicker onPressHandler={onImagePickerHandler} />
            <CameraPicker onPressHandler={onCameraPickerHandler} />
          </View>
        )}
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
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  selfieContainer: {
    width: (windowWidth - windowWidth / 3) / 2,
    marginHorizontal: 'auto',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Home;
