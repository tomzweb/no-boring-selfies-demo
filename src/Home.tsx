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
import {Image as ImageProps} from './utilities/Types';
import SelfieImage from './components/SelfieImage';
import ImageCarousel from './domains/ImageCarousel';

const Home = () => {
  const [selfie, setSelfie] = useState<ImageProps | undefined>();

  const resultHandler = (result: ImagePickerResponse) => {
    const {assets} = result;
    if (assets && assets.length > 0) {
      setSelfie({
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
      {selfie !== undefined && (
        <ImageCarousel
          selfieUri={selfie.uri}
          selfieWidth={selfie.width}
          selfieHeight={selfie.height}
        />
      )}
      <View style={styles.selectContainer}>
        {selfie && selfie.uri !== undefined ? (
          <>
            <View>
              <SelfieImage uri={selfie.uri} width={200} height={200} />
            </View>
            <View style={styles.retakeContainer}>
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

export default Home;
